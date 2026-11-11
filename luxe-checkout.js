(function() {
  'use strict';

  const STRIPE_PK = 'pk_live_51UYWld665tgVOXNONMRtB5ENfc0M22rrNXL5BIRvTw4BNSt3oYOuUtIjFhT3mf6On5QJ3PqkYdMLKSSsESvdJQNA00phk5bG3f';
  let stripeInstance = null;
  let stripeElementsInstance = null;
  let paymentElement = null;
  let isStripeLoading = false;
  let isStripeReady = false;
  let activeProduct = 'prezentownik';
  let activeCallback = null;

  const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  const PRODUCTS_CONFIG = {
    'prezentownik': {
      tag: 'NATYCHMIASTOWY DOSTĘP CYFROWY (PDF)',
      title: 'Zodiakalny Prezentownik',
      sub: 'Praktyczny podręcznik trafionych prezentów dla 12 znaków zodiaku.',
      price: '47,00 PLN',
      btn: 'Zapłać 47,00 PLN i Odbierz E-book &rarr;',
      successHeading: 'Płatność zakończona pomyślnie!',
      successSub: 'Twój e-book Zodiakalny Prezentownik jest gotowy do pobrania.',
      downloadUrl: '/success.html',
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
    'numerologia': {
      tag: 'PORTRET NUMEROLOGICZNY',
      title: 'Kompletny Portret Liczb',
      sub: 'Droga Życia, Wibracja Urodzeniowa i Osobiste Cykle.',
      price: '47,00 PLN',
      btn: 'Zapłać 47,00 PLN i Odbierz Portret &rarr;',
      successHeading: 'Portret został odblokowany!',
      successSub: 'Twój pełny profil numerologiczny jest już dostępny.'
    },
    'dyspozytorzy': {
      tag: 'ARCHITEKTURA PODŚWIADOMOŚCI',
      title: 'Raport Władcy Horoskopu',
      sub: 'Pełna matryca łańcuchów dyspozycji i protokół zasilania władcy.',
      price: '20,00 PLN',
      btn: 'Zapłać 20,00 PLN i Odbierz Raport &rarr;',
      successHeading: 'Raport został odblokowany!',
      successSub: 'Analiza psychologii głębi i władcy horoskopu jest gotowa.',
      unlockKey: 'neo_dispositor_unlocked',
      directUrl: 'https://buy.stripe.com/fZufZacz78HZgsK6iucwg01'
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
            🔒 SSL 256-bit • Bezpieczne szyfrowanie Stripe
          </div>
        </div>

        <div id="luxe-checkout-success" style="display:none;text-align:center;padding:1.5rem 0.5rem;">
          <div style="font-size:42px;margin-bottom:0.75rem;">✨</div>
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

  function openModal(productKey = 'prezentownik', callback = null) {
    activeProduct = productKey || 'prezentownik';
    activeCallback = callback;

    const prod = PRODUCTS_CONFIG[activeProduct] || PRODUCTS_CONFIG['prezentownik'];
    if (prod && prod.directUrl && (typeof Stripe === 'undefined' || activeProduct === 'saturn')) {
      window.location.href = prod.directUrl;
      return;
    }

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

  function showSuccess() {
    const prod = PRODUCTS_CONFIG[activeProduct] || PRODUCTS_CONFIG['prezentownik'];
    const cBody = document.getElementById('luxe-checkout-body');
    const sBody = document.getElementById('luxe-checkout-success');
    const sHead = document.getElementById('luxe-success-heading');
    const sSub = document.getElementById('luxe-success-sub');
    const sBtn = document.getElementById('luxe-success-download-btn');

    if (prod.unlockKey) {
      try { localStorage.setItem(prod.unlockKey, 'true'); } catch (e) {}
    }

    if (sHead) sHead.innerText = prod.successHeading;
    if (sSub) sSub.innerText = prod.successSub;
    if (sBtn) {
      sBtn.innerText = prod.unlockKey ? 'Przejdź do Raportu &rarr;' : 'Pobierz E-book &rarr;';
      sBtn.href = prod.downloadUrl || '#';
      if (prod.unlockKey) {
        sBtn.onclick = (e) => {
          e.preventDefault();
          closeModal();
          window.location.reload();
        };
      }
    }

    if (cBody) cBody.style.display = 'none';
    if (sBody) sBody.style.display = 'block';

    if (typeof activeCallback === 'function') {
      activeCallback(activeProduct);
    }
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
      if (typeof Stripe === 'undefined') {
        throw new Error('Biblioteka Stripe nie mogła zostać załadowana. Sprawdź połączenie.');
      }
      if (!stripeInstance) {
        stripeInstance = Stripe(STRIPE_PK, { locale: 'pl' });
      }

      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productKey })
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
      const prod = PRODUCTS_CONFIG[productKey];
      if (prod && prod.directUrl) {
        window.location.href = prod.directUrl;
        return;
      } else {
        if (errorBox) errorBox.innerHTML = `⚠️ ${err.message}`;
      }
    }
  }

  async function handleSubmit() {
    if (!stripeInstance || !stripeElementsInstance) return;
    const submitBtn = document.getElementById('luxe-stripe-submit-btn');
    const errorBox = document.getElementById('luxe-stripe-error');
    const prod = PRODUCTS_CONFIG[activeProduct] || PRODUCTS_CONFIG['prezentownik'];

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>⏳ Autoryzacja płatności...</span>';
    }
    if (errorBox) errorBox.innerHTML = '';

    try {
      const { error, paymentIntent } = await stripeInstance.confirmPayment({
        elements: stripeElementsInstance,
        redirect: 'if_required'
      });

      if (error) {
        if (errorBox) errorBox.innerHTML = `⚠️ ${error.message}`;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>${prod.btn}</span>`;
        }
      } else if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
        showSuccess();
      }
    } catch (err) {
      if (errorBox) errorBox.innerHTML = `⚠️ Błąd: ${err.message}`;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>${prod.btn}</span>`;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Intercept checkout triggers
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
