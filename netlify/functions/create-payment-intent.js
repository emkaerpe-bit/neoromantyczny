import https from 'https';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

const PRODUCTS = {
  'prezentownik': { amount: '4700', description: 'Zodiakalny Prezentownik (E-book PDF)' },
  'synastria': { amount: '3900', description: 'Pełny Raport Synastrii Partnerskiej (7 Rozdziałów + PDF A4)' },
  'astrokartografia': { amount: '3900', description: 'Atlas Astrokartograficzny (Pełny Raport Relokacyjny)' },
  'dyspozytorzy': { amount: '2900', description: 'Architektura Podświadomości: Raport Władcy Horoskopu' },
  'saturn': { amount: '4700', description: 'Protokół Przetrwania Powrotu Saturna (The Chronos Protocol)' },
  'chiron': { amount: '2900', description: 'Klucz Chirona: Raport Pierwotnej Rany i Uzdrowienia' },
  'solariusz': { amount: '3900', description: 'Architektura Roku: Pełny Raport Solariusza (6 Rozdziałów + PDF A4)' }
};

function getCorsHeaders(event) {
  const origin = (event && event.headers && (event.headers.origin || event.headers.Origin)) || '';
  const allowOrigin = /^https:\/\/(www\.)?neoromantyczny\.pl$/.test(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    ? origin
    : 'https://neoromantyczny.pl';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
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

  if (!STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Brak konfiguracji STRIPE_SECRET_KEY w środowisku serwera Netlify.' })
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
            resolve({
              statusCode: res.statusCode,
              headers: corsHeaders,
              body: JSON.stringify({ error: parsed.error?.message || 'Błąd Stripe API' })
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

    req.on('error', (err) => {
      resolve({
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: err.message })
      });
    });

    req.write(postData);
    req.end();
  });
}
