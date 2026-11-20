import https from 'https';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const PRODUCTS = {
  'prezentownik': { amount: '4700', description: 'Zodiakalny Prezentownik (E-book PDF)' },
  'synastria': { amount: '3900', description: 'Pełny Raport Synastrii Partnerskiej (7 Rozdziałów + PDF A4)' },
  'astrokartografia': { amount: '3900', description: 'Atlas Astrokartograficzny (Pełny Raport Relokacyjny)' },
  'dyspozytorzy': { amount: '2900', description: 'Architektura Podświadomości: Raport Władcy Horoskopu' },
  'saturn': { amount: '4700', description: 'Protokół Przetrwania Powrotu Saturna (The Chronos Protocol)' },
  'chiron': { amount: '2900', description: 'Klucz Chirona: Raport Pierwotnej Rany i Uzdrowienia' },
  'solariusz': { amount: '3900', description: 'Pełny Raport Solariusza (6 Rozdziałów + PDF A4)' }
};

const ipRateBuckets = new Map();
const RATE_WINDOW_MS = 60000;
const RATE_MAX_REQ = 15;

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
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8'
  };
}

export async function handler(event, context) {
  const corsHeaders = getCorsHeaders(event);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  if (!isAllowedOrigin(event)) {
    return { statusCode: 403, headers: corsHeaders, body: JSON.stringify({ error: 'Niedozwolone źródło żądania.' }) };
  }

  if (isRateLimited(event)) {
    return { statusCode: 429, headers: corsHeaders, body: JSON.stringify({ error: 'Zbyt wiele prób. Odczekaj chwilę i spróbuj ponownie.' }) };
  }

  if (!STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Usługa płatności jest chwilowo niedostępna.' })
    };
  }

  let productKey = 'synastria';
  let pairInfo = '';
  let chartHash = '';
  if (event.body) {
    try {
      const payload = JSON.parse(event.body);
      if (payload.product !== undefined) {
        if (!PRODUCTS[payload.product]) {
          return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Nieznany produkt.' }) };
        }
        productKey = payload.product;
      } else if (payload.pair) {
        productKey = 'synastria';
      }
      if (payload.pair) {
        pairInfo = ' dla pary ' + String(payload.pair).slice(0, 80);
      }
      if (payload.chartHash) {
        chartHash = String(payload.chartHash).replace(/[^a-zA-Z0-9_|:.,-]/g, '').slice(0, 140);
      }
    } catch (e) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Nieprawidłowy format JSON.' }) };
    }
  }

  if (productKey !== 'prezentownik' && !chartHash) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Brak identyfikatora wykresu.' }) };
  }

  return new Promise((resolve) => {
    const prod = PRODUCTS[productKey] || PRODUCTS['synastria'];
    const description = prod.description + pairInfo;

    const params = {
      amount: prod.amount,
      currency: 'pln',
      'automatic_payment_methods[enabled]': 'true',
      description: description,
      'metadata[product]': productKey
    };
    if (chartHash) {
      params['metadata[chart_hash]'] = chartHash;
    }
    const postData = new URLSearchParams(params).toString();

    const options = {
      hostname: 'api.stripe.com',
      port: 443,
      path: '/v1/payment_intents',
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + STRIPE_SECRET_KEY.trim(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({
              statusCode: 200,
              headers: corsHeaders,
              body: JSON.stringify({
                clientSecret: parsed.client_secret,
                amount: parsed.amount,
                currency: parsed.currency,
                product: productKey
              })
            });
          } else {
            const safeMsg = res.statusCode >= 500
              ? 'Błąd operatora płatności. Spróbuj ponownie za chwilę.'
              : (parsed.error?.message || 'Błąd Stripe API');
            resolve({
              statusCode: res.statusCode,
              headers: corsHeaders,
              body: JSON.stringify({ error: safeMsg })
            });
          }
        } catch (e) {
          resolve({
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Błąd przetwarzania odpowiedzi Stripe.' })
          });
        }
      });
    });

    req.on('error', (_err) => {
      resolve({
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Błąd połączenia z operatorem płatności Stripe.' })
      });
    });

    req.write(postData);
    req.end();
  });
}
