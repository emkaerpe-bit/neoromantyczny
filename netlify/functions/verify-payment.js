import https from 'https';
import crypto from 'crypto';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const EXPECTED_AMOUNTS = {
  prezentownik: 4700,
  synastria: 3900,
  astrokartografia: 3900,
  dyspozytorzy: 2900,
  saturn: 4700,
  chiron: 2900
};

function getCorsHeaders(event) {
  const origin = (event && event.headers && (event.headers.origin || event.headers.Origin)) || '';
  const allowOrigin = /^https:\/\/(www\.)?neoromantyczny\.pl$/.test(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ? origin
    : 'https://neoromantyczny.pl';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin',
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

  if (!STRIPE_SECRET_KEY) {
    return respond(headers, 500, { verified: false, error: 'Brak konfiguracji STRIPE_SECRET_KEY na serwerze.' });
  }

  let paymentIntentId = event.queryStringParameters?.payment_intent || '';
  let productKey = event.queryStringParameters?.product || '';
  let chartHash = event.queryStringParameters?.chartHash || '';

  if (event.httpMethod === 'POST' && event.body) {
    try {
      const body = JSON.parse(event.body);
      paymentIntentId = body.paymentIntentId || body.payment_intent || paymentIntentId;
      productKey = body.product || productKey;
      chartHash = body.chartHash || chartHash;
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
            return resolve(respond(headers, res.statusCode, { verified: false, error: parsed.error?.message || 'Błąd Stripe API.' }));
          }

          const metaProduct = parsed.metadata && parsed.metadata.product;
          const metaHash = (parsed.metadata && parsed.metadata.chart_hash) || '';
          const productMatch = !metaProduct || metaProduct === productKey;
          const hashMatch = !metaHash || (cleanChartHash && metaHash === cleanChartHash);
          const amountValid = parsed.amount >= expectedAmount && parsed.currency === 'pln';
          const verified = parsed.status === 'succeeded' && amountValid && productMatch && hashMatch;
          const boundHash = metaHash || cleanChartHash || productKey;
          const unlockToken = verified
            ? crypto.createHmac('sha256', STRIPE_SECRET_KEY.trim()).update(`${productKey}|${boundHash}|${paymentIntentId}`).digest('hex')
            : '';

          const responsePayload = {
            verified,
            status: parsed.status,
            amount: parsed.amount,
            currency: parsed.currency,
            product: productKey,
            chartHash: boundHash,
            paymentIntentId,
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

    req.on('error', (err) => resolve(respond(headers, 500, { verified: false, error: err.message })));
    req.end();
  });
}
