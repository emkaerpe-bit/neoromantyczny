(function() {
  'use strict';

  const _neoEsc = (x) => String(x || "").replace(/[&<>"']/g, (m) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
  const STRIPE_PK = 'pk_live_51UYWld665tgVOXNONMRtB5ENfc0M22rrNXL5BIRvTw4BNSt3oYOuUtIjFhT3mf6On5QJ3PqkYdMLKSSsESvdJQNA00phk5bG3f';
  let stripeInstance = null;
  let stripeElementsInstance = null;
  let paymentElement = null;
  let isStripeLoading = false;
  let isStripeReady = false;
  let activeProduct = 'prezentownik';
  let activeCallback = null;
  let activeChartHash = '';
  let activePairLabel = '';

  const UNLOCKS_STORAGE_KEY = 'neo_chart_unlocks_v1';
  const LEGACY_UNLOCK_KEYS = ['neo_saturn_unlocked', 'neo_dispositor_unlocked', 'neo_acg_unlocked', 'neo_synastry_unlocked', 'neo_chiron_unlocked'];
  try {
    LEGACY_UNLOCK_KEYS.forEach((k) => { localStorage.removeItem(k); });
  } catch (e) {}

  function normLocToken(val) {
    const map = { 'ą':'a','ć':'c','ę':'e','ł':'l','ń':'n','ó':'o','ś':'s','ź':'z','ż':'z' };
    return String(val || '')
      .split('(')[0]
      .trim()
      .toLowerCase()
      .replace(/[ąćęłńóśźż]/g, (c) => map[c] || c)
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'pl';
  }

  function formatCoordsOrCity(city, lat, lon) {
    if (lat != null && lon != null && !isNaN(Number(lat)) && !isNaN(Number(lon))) {
      return Number(lat).toFixed(2) + ',' + Number(lon).toFixed(2);
    }
    return normLocToken(city);
  }

  const NeoChartLock = {
    buildHash(productKey, inputs) {
      const p = String(productKey || 'calc').replace(/[^a-z0-9_-]/gi, '').toLowerCase();
      const d = inputs || {};
      if (p === 'synastria') {
        const dA = String(d.dateA || '').trim();
        const tA = String(d.timeA || '12:00').trim();
        const cA = formatCoordsOrCity(d.cityA, d.latA, d.lonA);
        const dB = String(d.dateB || '').trim();
        const tB = String(d.timeB || '12:00').trim();
        const cB = formatCoordsOrCity(d.cityB, d.latB, d.lonB);
        return `${p}|${dA}|${tA}|${cA}|${dB}|${tB}|${cB}`.slice(0, 140);
      }
      const dt = String(d.date || '').trim();
      const tm = String(d.time || '12:00').trim();
      const loc = formatCoordsOrCity(d.city, d.lat, d.lon);
      return `${p}|${dt}|${tm}|${loc}`.slice(0, 140);
    },
    readStore() {
      try {
        const raw = localStorage.getItem(UNLOCKS_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return (parsed && typeof parsed === 'object') ? parsed : {};
      } catch (e) {
        return {};
      }
    },
    writeStore(store) {
      try { localStorage.setItem(UNLOCKS_STORAGE_KEY, JSON.stringify(store)); } catch (e) {}
    },
    clearProduct(productKey) {
      const st = this.readStore();
      delete st[productKey];
      this.writeStore(st);
    },
    isUnlocked(productKey, chartHash) {
      try {
        const sp = new URLSearchParams(window.location.search);
        if (sp.get('reset') === '1' || sp.get('lock') === '1') {
          this.clearProduct(productKey);
          try {
            sp.delete('reset');
            sp.delete('lock');
            const qs = sp.toString();
            window.history.replaceState({}, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
          } catch (err) {}
          return false;
        }
      } catch (e) {}
      if (!productKey || !chartHash) return false;
      const st = this.readStore();
      const entry = st[productKey] && st[productKey][chartHash];
      return Boolean(
        entry &&
        typeof entry.pi === 'string' && /^pi_[a-zA-Z0-9_]+$/.test(entry.pi) &&
        typeof entry.token === 'string' && /^[a-f0-9]{64}$/i.test(entry.token)
      );
    },
    markUnlocked(productKey, chartHash, verifyData) {
      const targetHash = (verifyData && verifyData.chartHash) || chartHash;
      if (!productKey || !targetHash || !verifyData || !verifyData.verified) return false;
      if (!/^pi_[a-zA-Z0-9_]+$/.test(verifyData.paymentIntentId || '')) return false;
      if (!/^[a-f0-9]{64}$/i.test(verifyData.unlockToken || '')) return false;
      const st = this.readStore();
      if (!st[productKey] || typeof st[productKey] !== 'object') st[productKey] = {};
      st[productKey][targetHash] = {
        pi: verifyData.paymentIntentId,
        token: verifyData.unlockToken,
        ts: Date.now()
      };
      this.writeStore(st);
      return true;
    }
  };
  window.NeoChartLock = NeoChartLock;

  const PRODUCTS_CONFIG = {
    'prezentownik': {
      tag: 'NATYCHMIASTOWY DOSTĘP CYFROWY (PDF)',
      title: 'Zodiakalny Prezentownik',
      sub: 'Praktyczny podręcznik trafionych prezentów dla 12 znaków zodiaku.',
      price: '47,00 PLN',
      btn: 'Zapłać 47,00 PLN i Odbierz E-book &rarr;',
      successHeading: 'Płatność zakończona pomyślnie!',
      successSub: 'Twój e-book Zodiakalny Prezentownik jest gotowy do pobrania.',
      directUrl: 'https://buy.stripe.com/dRm28k8iRbUb4K2fT4cwg00'
    },
    'synastria': {
      tag: 'PEŁNY RAPORT SYNASTRII (7 ROZDZIAŁÓW)',
      title: 'Raport Synastrii Partnerskiej',
      sub: 'Kompletna analiza relacyjna dla Waszej pary + wersja PDF A4.',
      price: '39,00 PLN',
      btn: 'Zapłać 39,00 PLN i Odblokuj Raport &rarr;',
      successHeading: 'Raport został odblokowany!',
      successSub: 'Wszystkie 7 rozdziałów analizy partnerskiej jest już aktywnych.',
      unlockKey: 'neo_synastry_unlocked'
    },
    'astrokartografia': {
      tag: 'ATLAS ASTROKARTOGRAFICZNY',
      title: 'Pełny Raport Relokacyjny',
      sub: 'Dostęp do wszystkich linii planetarnych i stref mocy.',
      price: '39,00 PLN',
      btn: 'Zapłać 39,00 PLN i Odblokuj Atlas &rarr;',
      successHeading: 'Atlas został odblokowany!',
      successSub: 'Wszystkie strefy relokacji są aktywne na mapie.',
      unlockKey: 'neo_acg_unlocked'
    },
    'dyspozytorzy': {
      tag: 'ARCHITEKTURA PODŚWIADOMOŚCI',
      title: 'Raport Władcy Horoskopu',
      sub: 'Pełna matryca łańcuchów dyspozycji i protokół zasilania władcy.',
      price: '29,00 PLN',
      btn: 'Zapłać 29,00 PLN i Odbierz Raport &rarr;',
      successHeading: 'Raport został odblokowany!',
      successSub: 'Analiza psychologii głębi i władcy horoskopu jest gotowa.',
      unlockKey: 'neo_dispositor_unlocked',
      directUrl: 'https://buy.stripe.com/bJeeV67eN0bt7We4amcwg04'
    },
    'saturn': {
      tag: 'THE CHRONOS PROTOCOL • ZAMKNIĘTY RAPORT TRANSFORMACJI',
      title: 'Protokół Przetrwania Powrotu Saturna',
      sub: 'Indywidualna instrukcja przejścia tranzytu 28–30 r.ż., kalendarz 3 fal i Kodeks Rezyliencji.',
      price: '47,00 PLN',
      btn: 'Zapłać 47,00 PLN i Odblokuj Raport &rarr;',
      successHeading: 'Raport został odblokowany!',
      successSub: 'Wszystkie 5 rozdziałów Protokołu Chronosa jest już aktywnych.',
      unlockKey: 'neo_saturn_unlocked',
      directUrl: 'https://buy.stripe.com/bJecMY8iRe2jdgy9uGcwg03'
    },
    'chiron': {
      tag: 'KLUCZ CHIRONA • RAPORT TRANSFORMACJI',
      title: 'Raport Pierwotnej Rany i Złotego Daru Chirona',
      sub: 'Pełna psychologia rany, aspekty do planet osobistych, kalendarz Powrotu Chirona i alchemia uzdrowienia.',
      price: '29,00 PLN',
      btn: 'Zapłać 29,00 PLN i Odblokuj Raport &rarr;',
      successHeading: 'Raport został odblokowany!',
      successSub: 'Wszystkie 5 rozdziałów Klucza Chirona jest już aktywnych.',
      unlockKey: 'neo_chiron_unlocked',
      directUrl: 'https://buy.stripe.com/bJeeV67eN0bt7We4amcwg04'
    }
  };

  function ensureModalMounted() {
    if (document.getElementById('luxe-stripe-modal')) return;

    const modalHtml = `
    <div class="luxe-modal-backdrop" id="luxe-stripe-modal" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="luxe-modal-card">
        <button type="button" class="luxe-modal-close" id="luxe-stripe-modal-close" aria-label="Zamknij">&times;</button>
        
        <div id="luxe-checkout-body">
          <div class="luxe-card-tag" id="luxe-modal-tag">BEZPOŚREDNIA PŁATNOŚĆ</div>
          <h3 class="luxe-card-heading" id="luxe-modal-heading">Zodiakalny Prezentownik</h3>
          <p class="luxe-card-sub" id="luxe-modal-sub">Dostęp natychmiast po opłaceniu.</p>
          
          <div class="luxe-stripe-badges">
            <span class="luxe-badge" style="border-color:rgba(52,211,153,0.5);color:#34D399;font-weight:700;">BLIK</span>
            <span class="luxe-badge">Karta / Google Pay</span>
            <span class="luxe-badge">Apple Pay</span>
            <span class="luxe-badge-price" id="luxe-modal-price">47,00 PLN</span>
          </div>

          <div id="luxe-stripe-loader" class="luxe-stripe-loader">
            <div class="luxe-stripe-spinner"></div>
            <span>Bezpieczne szyfrowanie sesji...</span>
          </div>

          <div id="luxe-payment-element-mount"></div>
          <div id="luxe-stripe-error"></div>

          <button type="button" id="luxe-stripe-submit-btn" class="luxe-btn-submit" style="display:none;">
            <span id="luxe-submit-label">Zapłać i Odbierz &rarr;</span>
          </button>

          <div class="luxe-stripe-footer">
            <svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg>SSL 256-bit • Bezpieczne szyfrowanie Stripe<br>
            <span style="font-size:0.74rem;opacity:0.8;">Zasady płatności i RODO: <a href="/polityka-prywatnosci/" style="color:#C9A84C;text-decoration:underline;">Polityka Prywatności</a></span>
          </div>
        </div>

        <div id="luxe-checkout-success" style="display:none;text-align:center;padding:1.5rem 0.5rem;">
          <div style="font-size:42px;margin-bottom:0.75rem;color:#C9A84C;"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><polygon points="15.5,4 17.3,14.2 25.5,16 17.3,17.8 15.5,28 13.7,17.8 5.5,16 13.7,14.2" stroke-width="1.25" fill="currentColor" fill-opacity="0.18"/><path d="M10.8 11.3l9.4 9.4M20.2 11.3l-9.4 9.4" stroke-width="0.85" opacity="0.75"/><circle cx="24.5" cy="7.5" r="1.1" stroke="none" fill="currentColor"/></svg></div>
          <h3 class="luxe-card-heading" id="luxe-success-heading" style="font-size:1.5rem;">Płatność zakończona!</h3>
          <p class="luxe-card-sub" id="luxe-success-sub" style="margin-bottom:1.5rem;">Twój dostęp został aktywowany.</p>
          <a href="/success.html" id="luxe-success-download-btn" class="luxe-btn-download">
            Pobierz Materiały &rarr;
          </a>
        </div>
      </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    bindModalEvents();
  }

  function bindModalEvents() {
    const modal = document.getElementById('luxe-stripe-modal');
    const closeBtn = document.getElementById('luxe-stripe-modal-close');
    const submitBtn = document.getElementById('luxe-stripe-submit-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
    if (submitBtn) submitBtn.addEventListener('click', handleSubmit);
  }

  function openModal(productKey = 'prezentownik', callback = null, opts = null) {
    activeProduct = productKey || 'prezentownik';
    activeCallback = callback;
    activeChartHash = (opts && opts.chartHash) ? String(opts.chartHash).slice(0, 140) : `${activeProduct}|default`;
    activePairLabel = (opts && opts.pair) ? String(opts.pair).slice(0, 80) : '';

    ensureModalMounted();

    const modal = document.getElementById('luxe-stripe-modal');
    if (!modal) return;

    // Reset view
    const cBody = document.getElementById('luxe-checkout-body');
    const sBody = document.getElementById('luxe-checkout-success');
    if (cBody) cBody.style.display = 'block';
    if (sBody) sBody.style.display = 'none';

    // Apply Product Text
    const prod = PRODUCTS_CONFIG[activeProduct] || PRODUCTS_CONFIG['prezentownik'];
    const tagEl = document.getElementById('luxe-modal-tag');
    const headEl = document.getElementById('luxe-modal-heading');
    const subEl = document.getElementById('luxe-modal-sub');
    const priceEl = document.getElementById('luxe-modal-price');
    const labelEl = document.getElementById('luxe-submit-label');

    if (tagEl) tagEl.innerText = prod.tag;
    if (headEl) headEl.innerText = prod.title;
    if (subEl) subEl.innerText = prod.sub;
    if (priceEl) priceEl.innerText = prod.price;
    if (labelEl) labelEl.innerHTML = prod.btn;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Mount or re-mount Stripe
    initStripe(activeProduct);
  }

  function closeModal() {
    const modal = document.getElementById('luxe-stripe-modal');
    if (!modal) return;
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function showSuccess(verifiedDownloadUrl, verifyData) {
    const prod = PRODUCTS_CONFIG[activeProduct] || PRODUCTS_CONFIG['prezentownik'];
    const cBody = document.getElementById('luxe-checkout-body');
    const sBody = document.getElementById('luxe-checkout-success');
    const sHead = document.getElementById('luxe-success-heading');
    const sSub = document.getElementById('luxe-success-sub');
    const sBtn = document.getElementById('luxe-success-download-btn') || document.getElementById('luxe-download-btn');

    if (prod.unlockKey) {
      NeoChartLock.markUnlocked(activeProduct, activeChartHash, verifyData);
    }

    const dlUrl = (verifiedDownloadUrl && /^https:\/\//i.test(verifiedDownloadUrl)) ? verifiedDownloadUrl : '';
    if (sHead) sHead.innerText = prod.successHeading;
    if (sSub) sSub.innerText = prod.successSub;
    if (sBtn) {
      sBtn.innerHTML = prod.unlockKey ? 'Przejdź do Raportu &rarr;' : 'Pobierz Zodiakalny Prezentownik (PDF) &darr;';
      sBtn.href = dlUrl || '#';
      if (!prod.unlockKey && dlUrl) {
        sBtn.setAttribute('target', '_blank');
        sBtn.setAttribute('rel', 'noopener noreferrer');
      }
      if (prod.unlockKey) {
        sBtn.onclick = (e) => {
          e.preventDefault();
          closeModal();
          try { sessionStorage.setItem('neo_just_unlocked', activeProduct); } catch (err) {}
          window.location.reload();
        };
      }
    }

    if (cBody) cBody.style.display = 'none';
    if (sBody) sBody.style.display = 'block';

    if (typeof activeCallback === 'function') {
      activeCallback(activeProduct, activeChartHash, verifyData);
    }
  }

  async function ensureStripeLoaded() {
    if (typeof window.Stripe !== 'undefined') return true;

    let s = document.querySelector('script[src*="js.stripe.com"]');
    if (!s) {
      s = document.createElement('script');
      s.src = 'https://js.stripe.com/v3/';
      s.async = true;
      document.head.appendChild(s);
    }

    const start = Date.now();
    while (Date.now() - start < 4500) {
      if (typeof window.Stripe !== 'undefined') return true;
      await new Promise(r => setTimeout(r, 80));
    }
    return typeof window.Stripe !== 'undefined';
  }

  async function initStripe(productKey) {
    const loader = document.getElementById('luxe-stripe-loader');
    const errorBox = document.getElementById('luxe-stripe-error');
    const submitBtn = document.getElementById('luxe-stripe-submit-btn');
    const mount = document.getElementById('luxe-payment-element-mount');

    if (loader) loader.style.display = 'flex';
    if (errorBox) errorBox.innerHTML = '';
    if (submitBtn) submitBtn.style.display = 'none';
    if (mount) mount.innerHTML = '';
    isStripeReady = false;

    try {
      await ensureStripeLoaded();
      if (typeof window.Stripe === 'undefined') {
        throw new Error('Biblioteka Stripe nie mogła zostać załadowana (sprawdź połączenie lub wyłącz bloker skryptów).');
      }
      if (!stripeInstance) {
        stripeInstance = window.Stripe(STRIPE_PK, { locale: 'pl' });
      }

      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productKey, chartHash: activeChartHash, pair: activePairLabel })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Nie udało się nawiązać bezpiecznego połączenia ze Stripe.');
      }

      stripeElementsInstance = stripeInstance.elements({
        clientSecret: data.clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#C9A84C',
            colorBackground: '#13131A',
            colorText: '#FAF8F5',
            colorDanger: '#FB7185',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            borderRadius: '12px',
            fontSizeBase: '16px'
          }
        }
      });

      paymentElement = stripeElementsInstance.create('payment');
      paymentElement.mount(mount);
      paymentElement.on('ready', () => {
        if (loader) loader.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'flex';
        isStripeReady = true;
      });

    } catch (err) {
      if (loader) loader.style.display = 'none';
      const prod = PRODUCTS_CONFIG[productKey] || PRODUCTS_CONFIG['prezentownik'];
      if (errorBox) {
        errorBox.innerHTML = `
          <div style="padding:0.85rem; border:1px solid rgba(201,168,76,0.3); background:rgba(201,168,76,0.06); border-radius:10px; margin-top:0.75rem; font-size:0.85rem; color:#FAF8F5; text-align:center; line-height:1.5;">
            <p style="margin:0 0 0.5rem; color:rgba(250,248,245,0.85);"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M16 5.2L26.8 25.5H5.2L16 5.2Z" stroke-width="1.55"/><line x1="16" y1="12.2" x2="16" y2="19.2" stroke-width="1.35"/><circle cx="16" cy="22.3" r="1.05" stroke="none" fill="currentColor"/></svg>${_neoEsc(err.message)}</p>
            ${prod && prod.directUrl ? `
              <p style="margin:0 0 0.75rem; font-size:0.8rem; color:rgba(250,248,245,0.65);">Możesz bezpiecznie sfinalizować transakcję w nowej karcie:</p>
              <a href="${prod.directUrl}" target="_blank" rel="noopener noreferrer" class="luxe-btn-submit" style="display:inline-flex; align-items:center; justify-content:center; text-decoration:none; padding:0.75rem 1.4rem; font-size:0.88rem;">
                Przejdź do Kasy Stripe (${prod.price}) &rarr;
              </a>
            ` : ''}
          </div>
        `;
      }
    }
  }

  function buildReturnUrl(productKey, chartHash) {
    if (productKey === 'prezentownik') {
      return `${window.location.origin}/success?product=prezentownik`;
    }
    const url = new URL(window.location.href);
    url.searchParams.delete('payment_intent');
    url.searchParams.delete('payment_intent_client_secret');
    url.searchParams.delete('redirect_status');
    url.searchParams.set('luxe_product', productKey);
    if (chartHash) url.searchParams.set('luxe_chart', chartHash);
    return url.toString();
  }

  async function verifyPaymentOnServer(paymentIntentId, productKey, chartHash) {
    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentIntentId, product: productKey, chartHash: chartHash || '' })
    });
    const data = await res.json();
    if (!res.ok || !data.verified) {
      throw new Error(data.error || 'Płatność nie została jeszcze potwierdzona przez Stripe.');
    }
    return data;
  }

  async function handleSubmit() {
    if (!stripeInstance || !stripeElementsInstance) return;
    const submitBtn = document.getElementById('luxe-stripe-submit-btn');
    const errorBox = document.getElementById('luxe-stripe-error');
    const prod = PRODUCTS_CONFIG[activeProduct] || PRODUCTS_CONFIG['prezentownik'];

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M8.5 5.2h15M8.5 26.8h15" stroke-width="1.65"/><path d="M9.8 5.2v21.6M22.2 5.2v21.6" stroke-width="0.8" opacity="0.45"/><path d="M11.8 5.2c0 5.4 4.2 8.2 4.2 10.8c0-2.6 4.2-5.4 4.2-10.8" stroke-width="1.45"/><path d="M11.8 26.8c0-5.4 4.2-8.2 4.2-10.8c0 2.6 4.2 5.4 4.2 10.8" stroke-width="1.45"/><path d="M13.5 26.8L16 23.2l2.5 3.6Z" stroke="none" fill="currentColor" fill-opacity="0.42"/></svg>Autoryzacja płatności...</span>';
    }
    if (errorBox) errorBox.innerHTML = '';

    try {
      const { error, paymentIntent } = await stripeInstance.confirmPayment({
        elements: stripeElementsInstance,
        confirmParams: { return_url: buildReturnUrl(activeProduct, activeChartHash) },
        redirect: 'if_required'
      });

      if (error) {
        if (errorBox) errorBox.innerHTML = `<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M16 5.2L26.8 25.5H5.2L16 5.2Z" stroke-width="1.55"/><line x1="16" y1="12.2" x2="16" y2="19.2" stroke-width="1.35"/><circle cx="16" cy="22.3" r="1.05" stroke="none" fill="currentColor"/></svg>${_neoEsc(error.message)}`;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>${prod.btn}</span>`;
        }
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        const verifyData = await verifyPaymentOnServer(paymentIntent.id, activeProduct, activeChartHash);
        showSuccess(verifyData && verifyData.downloadUrl, verifyData);
      } else if (paymentIntent && paymentIntent.status === 'processing') {
        if (errorBox) errorBox.innerHTML = '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M8.5 5.2h15M8.5 26.8h15" stroke-width="1.65"/><path d="M9.8 5.2v21.6M22.2 5.2v21.6" stroke-width="0.8" opacity="0.45"/><path d="M11.8 5.2c0 5.4 4.2 8.2 4.2 10.8c0-2.6 4.2-5.4 4.2-10.8" stroke-width="1.45"/><path d="M11.8 26.8c0-5.4 4.2-8.2 4.2-10.8c0 2.6 4.2 5.4 4.2 10.8" stroke-width="1.45"/><path d="M13.5 26.8L16 23.2l2.5 3.6Z" stroke="none" fill="currentColor" fill-opacity="0.42"/></svg>Płatność jest w trakcie przetwarzania przez bank. Odśwież stronę za chwilę.';
      }
    } catch (err) {
      if (errorBox) errorBox.innerHTML = `<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M16 5.2L26.8 25.5H5.2L16 5.2Z" stroke-width="1.55"/><line x1="16" y1="12.2" x2="16" y2="19.2" stroke-width="1.35"/><circle cx="16" cy="22.3" r="1.05" stroke="none" fill="currentColor"/></svg>Błąd: ${_neoEsc(err.message)}`;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>${prod.btn}</span>`;
      }
    }
  }

  async function handleRedirectReturn() {
    const params = new URLSearchParams(window.location.search);
    const paymentIntentId = params.get('payment_intent');
    const redirectStatus = params.get('redirect_status');
    const productKey = params.get('luxe_product');
    const chartHashParam = params.get('luxe_chart') || '';
    if (!paymentIntentId || !productKey || redirectStatus !== 'succeeded') return;

    try {
      const verifyData = await verifyPaymentOnServer(paymentIntentId, productKey, chartHashParam);
      const prod = PRODUCTS_CONFIG[productKey];
      if (prod && prod.unlockKey) {
        NeoChartLock.markUnlocked(productKey, verifyData.chartHash || chartHashParam, verifyData);
      }
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('payment_intent');
      cleanUrl.searchParams.delete('payment_intent_client_secret');
      cleanUrl.searchParams.delete('redirect_status');
      cleanUrl.searchParams.delete('luxe_product');
      cleanUrl.searchParams.delete('luxe_chart');
      window.history.replaceState({}, '', cleanUrl.toString());
      if (prod && prod.unlockKey) {
        try { sessionStorage.setItem('neo_just_unlocked', productKey); } catch (e) {}
        window.location.reload();
      }
    } catch (err) {
      console.error('Weryfikacja płatności nie powiodła się:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    handleRedirectReturn();
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-luxe-checkout], .js-open-checkout');
      if (btn) {
        e.preventDefault();
        const prod = btn.getAttribute('data-luxe-checkout') || btn.getAttribute('data-product') || 'prezentownik';
        openModal(prod);
      }
    });
  });

  window.openLuxeCheckout = openModal;
  window.closeLuxeCheckout = closeModal;
})();
