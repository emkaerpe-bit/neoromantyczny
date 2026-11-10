import https from 'https';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const PRODUCTS = {
  'prezentownik': { amount: '4700', description: 'Zodiakalny Prezentownik (E-book PDF)' },
  'synastria': { amount: '3900', description: 'Pełny Raport Synastrii Partnerskiej (7 Rozdziałów + PDF A4)' },
  'astrokartografia': { amount: '3900', description: 'Atlas Astrokartograficzny (Pełny Raport Relokacyjny)' },
  'numerologia': { amount: '4700', description: 'Pełny Portret Numerologiczny (Potencjał i Cykle)' },
  'dyspozytorzy': { amount: '2000', description: 'Architektura Podświadomości: Raport Władcy Horoskopu' }
};

export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  if (!STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Brak konfiguracji STRIPE_SECRET_KEY w środowisku serwera Netlify.' })
    };
  }

  return new Promise((resolve) => {
    let productKey = 'synastria';
    let pairInfo = '';
    if (event.body) {
      try {
        const payload = JSON.parse(event.body);
        if (payload.product && PRODUCTS[payload.product]) {
          productKey = payload.product;
        } else if (payload.pair) {
          productKey = 'synastria';
          pairInfo = ' dla pary ' + payload.pair;
        }
      } catch (e) {}
    }

    const prod = PRODUCTS[productKey] || PRODUCTS['synastria'];
    const description = prod.description + pairInfo;

    const postData = new URLSearchParams({
      amount: prod.amount,
      currency: 'pln',
      'automatic_payment_methods[enabled]': 'true',
      description: description
    }).toString();

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
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
              },
              body: JSON.stringify({
                clientSecret: parsed.client_secret,
                amount: parsed.amount,
                currency: parsed.currency,
                product: productKey
              })
            });
          } else {
            resolve({
              statusCode: res.statusCode,
              headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify({ error: parsed.error?.message || 'Błąd Stripe API' })
            });
          }
        } catch (e) {
          resolve({
            statusCode: 500,
            headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'Błąd przetwarzania odpowiedzi Stripe.' })
          });
        }
      });
    });

    req.on('error', (err) => {
      resolve({
        statusCode: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: err.message })
      });
    });

    req.write(postData);
    req.end();
  });
}
