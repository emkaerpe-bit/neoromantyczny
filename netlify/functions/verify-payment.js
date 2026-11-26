import https from 'https';
import crypto from 'crypto';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const EXPECTED_AMOUNTS = {
  prezentownik: 3700,
  synastria: 5300,
  astrokartografia: 3900,
  dyspozytorzy: 2900,
  saturn: 4700,
  solariusz: 3900
};

const ipRateBuckets = new Map();
const RATE_WINDOW_MS = 60000;
const RATE_MAX_REQ = 20;

function isRateLimited(event) {
  const hdrs = (event && event.headers) || {};
  const rawIp = hdrs['x-nf-client-connection-ip'] || hdrs['client-ip'] || hdrs['x-forwarded-for'] || 'unknown';
  const ip = String(rawIp).split(',')[0].trim();
  const now = Date.now();
  if (ipRateBuckets.size > 500) {
    for (const [k, v] of ipRateBuckets.entries()) {
      if (now - v.start > RATE_WINDOW_MS) ipRateBuckets.delete(k);
    }
  }
  const bucket = ipRateBuckets.get(ip);
  if (!bucket || now - bucket.start > RATE_WINDOW_MS) {
    ipRateBuckets.set(ip, { start: now, count: 1 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_MAX_REQ;
}

function isAllowedOrigin(event) {
  const origin = (event && event.headers && (event.headers.origin || event.headers.Origin)) || '';
  const isDevEnv = process.env.NETLIFY_DEV === 'true' || (typeof process.env.CONTEXT === 'string' && process.env.CONTEXT !== 'production');
  if (/^https:\/\/(www\.)?neoromantyczny\.pl$/.test(origin)) return true;
  if (isDevEnv && (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin) || /^https:\/\/[a-z0-9-]+\.netlify\.app$/.test(origin))) {
    return true;
  }
  return false;
}

function getCorsHeaders(event) {
  const origin = (event && event.headers && (event.headers.origin || event.headers.Origin)) || '';
  const allowOrigin = isAllowedOrigin(event) ? origin : 'https://neoromantyczny.pl';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8'
  };
}

function respond(headers, statusCode, payload) {
  return { statusCode, headers, body: JSON.stringify(payload) };
}

export async function handler(event) {
  const headers = getCorsHeaders(event);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return respond(headers, 405, { verified: false, error: 'Method Not Allowed' });
  }

  if (!isAllowedOrigin(event)) {
    return respond(headers, 403, { verified: false, error: 'Niedozwolone źródło żądania.' });
  }

  if (isRateLimited(event)) {
    return respond(headers, 429, { verified: false, error: 'Zbyt wiele prób weryfikacji. Odczekaj chwilę i spróbuj ponownie.' });
  }

  if (event.body && event.body.length > 4096) {
    return respond(headers, 413, { verified: false, error: 'Zbyt duży rozmiar żądania.' });
  }

  if (!STRIPE_SECRET_KEY) {
    return respond(headers, 500, { verified: false, error: 'Usługa weryfikacji płatności jest chwilowo niedostępna.' });
  }

  let paymentIntentId = '';
  let productKey = '';
  let chartHash = '';
  let mode = '';
  let clientUnlockTs = 0;
  let clientUnlockToken = '';

  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      paymentIntentId = body.paymentIntentId || body.payment_intent || '';
      productKey = body.product || '';
      chartHash = body.chartHash || '';
      mode = String(body.mode || '');
      clientUnlockTs = Number(body.unlockTs) || 0;
      clientUnlockToken = String(body.unlockToken || '');
    } catch (_e) {
      return respond(headers, 400, { verified: false, error: 'Nieprawidłowy format JSON.' });
    }
  }
  const cleanChartHash = String(chartHash || '').replace(/[^a-zA-Z0-9_|:.,-]/g, '').slice(0, 140);

  if (!/^pi_[a-zA-Z0-9_]+$/.test(paymentIntentId)) {
    return respond(headers, 400, { verified: false, error: 'Nieprawidłowy identyfikator płatności.' });
  }

  const expectedAmount = EXPECTED_AMOUNTS[productKey];
  if (!expectedAmount) {
    return respond(headers, 400, { verified: false, error: 'Nieznany lub brakujący produkt.' });
  }

  if (mode === 'check_token' && clientUnlockTs > 0 && /^[a-f0-9]{64}$/i.test(clientUnlockToken)) {
    const boundFast = cleanChartHash || productKey;
    const expectedHex = crypto.createHmac('sha256', STRIPE_SECRET_KEY.trim())
      .update(`${productKey}|${boundFast}|${paymentIntentId}|${clientUnlockTs}`)
      .digest('hex');
    const aBuf = Buffer.from(clientUnlockToken.toLowerCase(), 'hex');
    const bBuf = Buffer.from(expectedHex, 'hex');
    if (aBuf.length === bBuf.length && crypto.timingSafeEqual(aBuf, bBuf)) {
      return respond(headers, 200, {
        verified: true,
        hmacValid: true,
        product: productKey,
        chartHash: boundFast,
        paymentIntentId,
        unlockTs: clientUnlockTs,
        unlockToken: expectedHex
      });
    }
  }

  return new Promise((resolve) => {
    const req = https.request({
      hostname: 'api.stripe.com',
      port: 443,
      path: `/v1/payment_intents/${encodeURIComponent(paymentIntentId)}`,
      method: 'GET',
      headers: { Authorization: 'Bearer ' + STRIPE_SECRET_KEY.trim() }
    }, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode < 200 || res.statusCode >= 300) {
            if (mode === 'check_token' && res.statusCode === 404) {
              return resolve(respond(headers, 402, { verified: false, forged: true, error: 'Nieprawidłowy token odblokowania.' }));
            }
            const safeMsg = res.statusCode >= 500
              ? 'Błąd operatora płatności. Spróbuj ponownie za chwilę.'
              : (parsed.error?.message || 'Błąd Stripe API.');
            return resolve(respond(headers, res.statusCode, { verified: false, error: safeMsg }));
          }

          const metaProduct = parsed.metadata && parsed.metadata.product;
          const metaHash = (parsed.metadata && parsed.metadata.chart_hash) || '';
          const productMatch = metaProduct ? metaProduct === productKey : productKey === 'prezentownik';
          const hashMatch = productKey === 'prezentownik' || Boolean(metaHash && cleanChartHash && metaHash === cleanChartHash);
          const amountValid = parsed.amount >= expectedAmount && parsed.currency === 'pln';
          const verified = parsed.status === 'succeeded' && amountValid && productMatch && hashMatch;
          const boundHash = metaHash || cleanChartHash || productKey;
          const unlockTs = Date.now();
          const unlockToken = verified
            ? crypto.createHmac('sha256', STRIPE_SECRET_KEY.trim()).update(`${productKey}|${boundHash}|${paymentIntentId}|${unlockTs}`).digest('hex')
            : '';

          const responsePayload = {
            verified,
            status: parsed.status,
            amount: parsed.amount,
            currency: parsed.currency,
            product: productKey,
            chartHash: boundHash,
            paymentIntentId,
            unlockTs,
            unlockToken
          };
          if (verified && productKey === 'prezentownik' && process.env.EBOOK_URL) {
            responsePayload.downloadUrl = process.env.EBOOK_URL;
          }
          return resolve(respond(headers, verified ? 200 : 402, responsePayload));
        } catch (_e) {
          return resolve(respond(headers, 500, { verified: false, error: 'Błąd przetwarzania odpowiedzi Stripe.' }));
        }
      });
    });

    req.on('error', (_err) => resolve(respond(headers, 500, { verified: false, error: 'Błąd weryfikacji połączenia ze Stripe.' })));
    req.end();
  });
}
