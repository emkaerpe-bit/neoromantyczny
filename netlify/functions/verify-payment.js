import https from 'https';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const EXPECTED_AMOUNTS = {
  prezentownik: 4700,
  synastria: 3900,
  astrokartografia: 3900,
  numerologia: 4700,
  dyspozytorzy: 2000,
  saturn: 4700
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8'
};

function respond(statusCode, payload) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(payload) };
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (!STRIPE_SECRET_KEY) {
    return respond(500, { verified: false, error: 'Brak konfiguracji STRIPE_SECRET_KEY na serwerze.' });
  }

  let paymentIntentId = event.queryStringParameters?.payment_intent || '';
  let productKey = event.queryStringParameters?.product || '';

  if (event.httpMethod === 'POST' && event.body) {
    try {
      const body = JSON.parse(event.body);
      paymentIntentId = body.paymentIntentId || body.payment_intent || paymentIntentId;
      productKey = body.product || productKey;
    } catch (_e) {
      return respond(400, { verified: false, error: 'Nieprawidłowy format JSON.' });
    }
  }

  if (!/^pi_[a-zA-Z0-9_]+$/.test(paymentIntentId)) {
    return respond(400, { verified: false, error: 'Nieprawidłowy identyfikator płatności.' });
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
            return resolve(respond(res.statusCode, { verified: false, error: parsed.error?.message || 'Błąd Stripe API.' }));
          }

          const expectedAmount = EXPECTED_AMOUNTS[productKey];
          const amountValid = !expectedAmount || (parsed.amount >= expectedAmount && parsed.currency === 'pln');
          const verified = parsed.status === 'succeeded' && amountValid;

          return resolve(respond(verified ? 200 : 402, {
            verified,
            status: parsed.status,
            amount: parsed.amount,
            currency: parsed.currency,
            product: productKey || null
          }));
        } catch (_e) {
          return resolve(respond(500, { verified: false, error: 'Błąd przetwarzania odpowiedzi Stripe.' }));
        }
      });
    });

    req.on('error', (err) => resolve(respond(500, { verified: false, error: err.message })));
    req.end();
  });
}
