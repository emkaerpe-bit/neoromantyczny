(function () {
  'use strict';
  var LS_KEY = 'neo_cookie_consent_v1';
  var CK_KEY = 'neo_consent';
  var listeners = [];

  function ensureCss(cb) {
    var existing = document.getElementById('neo-consent-css');
    if (existing) {
      if (cb) cb();
      return;
    }
    var l = document.createElement('link');
    l.id = 'neo-consent-css';
    l.rel = 'stylesheet';
    l.href = '/luxe-consent.css?v=1.0';
    if (cb) {
      var done = false;
      var run = function () { if (!done) { done = true; cb(); } };
      l.onload = run;
      l.onerror = run;
      setTimeout(run, 300);
    }
    document.head.appendChild(l);
  }

  function readConsent() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed.analytics === 'boolean' && typeof parsed.marketing === 'boolean') return parsed;
      }
    } catch (_e) {}
    return null;
  }

  function writeCookie(val) {
    var sec = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = CK_KEY + '=' + encodeURIComponent(JSON.stringify(val)) + '; Path=/; SameSite=Lax; Max-Age=15552000' + sec;
  }

  function clearOptionalCookies() {
    var names = ['_ga', '_gid', '_gat', '_gcl_aw', '_gcl_dc', '_gcl_au', '_fbp', '_fbc', '_clck', '_clsk', 'CLID'];
    var host = location.hostname;
    var domains = ['', host, '.' + host.replace(/^www\./, '')];
    names.forEach(function (n) {
      domains.forEach(function (d) {
        document.cookie = n + '=; Path=/; Max-Age=0' + (d ? '; Domain=' + d : '');
      });
    });
  }

  function syncGtag(c) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted'
    });
  }

  function ensureTrackingLoaded(c) {
    if (!c || (!c.analytics && !c.marketing) || window.__neoHasInlineTracking) return;
    if (document.getElementById('neo-tracking-js')) return;
    var s = document.createElement('script');
    s.id = 'neo-tracking-js';
    s.src = '/luxe-tracking.js?v=1.2';
    document.head.appendChild(s);
  }

  function saveConsent(analytics, marketing) {
    var state = { necessary: true, analytics: !!analytics, marketing: !!marketing, updatedAt: new Date().toISOString() };
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (_e) {}
    writeCookie({ n: 1, a: state.analytics ? 1 : 0, m: state.marketing ? 1 : 0 });
    if (!state.analytics || !state.marketing) clearOptionalCookies();
    syncGtag(state);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'neo_consent_update',
      neo_analytics: state.analytics,
      neo_marketing: state.marketing
    });
    if (typeof window.gtag === 'function') {
      var choice = (state.analytics && state.marketing) ? 'accept_all' : (state.analytics ? 'analytics_only' : (state.marketing ? 'marketing_only' : 'necessary_only'));
      window.gtag('event', 'consent_choice', {
        consent_action: choice,
        neo_analytics: state.analytics,
        neo_marketing: state.marketing
      });
    }
    hideBanner();
    closeSettings();
    ensureTrackingLoaded(state);
    listeners.forEach(function (fn) { try { fn(state); } catch (_e) {} });
    return state;
  }

  function hideBanner() {
    var b = document.getElementById('neo-cookie-banner');
    if (b) b.hidden = true;
  }

  function closeSettings() {
    var m = document.getElementById('neo-consent-modal');
    if (m) m.hidden = true;
  }

  function openSettings() {
    ensureCss();
    var m = document.getElementById('neo-consent-modal');
    if (!m) {
      var html = [
        '<div id="neo-consent-modal" data-nosnippet="true" role="dialog" aria-modal="true" aria-labelledby="neo-cm-h">',
        '<div class="neo-cm-card"><div class="neo-cm-head"><div>',
        // biome-ignore lint/security/noSecrets: static Polish consent UI label
        '<div class="neo-cb-kicker">Prywatność i Cookies</div>',
        '<h2 class="neo-cm-title" id="neo-cm-h">Ustawienia Twoich Zgód</h2></div>',
        // biome-ignore lint/security/noSecrets: static consent modal button HTML
        '<button type="button" class="neo-cm-close" id="neo-cm-x" aria-label="Zamknij">&times;</button></div>',
        '<p class="neo-cb-text">Wybierz, jakie pliki cookies i technologie mogą być używane w serwisie Neoromantyczny. Więcej szczegółów znajdziesz w <a href="/polityka-prywatnosci/">Polityce Prywatności</a>.</p>',
        // biome-ignore lint/security/noSecrets: static Polish consent modal row HTML
        '<div class="neo-cm-row"><div><strong>Niezbędne i płatnicze (zawsze aktywne)</strong><span>Zapis preferencji zgód, pamięć lokalna kalkulatorów (<code>localStorage</code>) oraz techniczne cookies operatora Stripe dla płatności BLIK/kartą.</span></div><input type="checkbox" class="neo-cm-switch" checked disabled aria-label="Niezbędne cookies"></div>',
        // biome-ignore lint/security/noSecrets: static Polish consent modal row HTML
        '<div class="neo-cm-row"><div><strong>Analityczne (GA4, Microsoft Clarity)</strong><span>Pomagają zrozumieć, które artykuły i kalkulatory są najbardziej pomocne. Aktywowane wyłącznie po Twojej zgodzie.</span></div><input type="checkbox" class="neo-cm-switch" id="neo-tog-analytics"></div>',
        // biome-ignore lint/security/noSecrets: static Polish consent modal row HTML
        '<div class="neo-cm-row"><div><strong>Marketingowe (Google Ads, Meta Pixel)</strong><span>Służą do pomiaru skuteczności komunikacji i konwersji. Aktywowane wyłącznie po Twojej zgodzie.</span></div><input type="checkbox" class="neo-cm-switch" id="neo-tog-marketing"></div>',
        '<div class="neo-cm-foot"><button type="button" class="neo-cb-btn neo-cb-btn-outline" id="neo-cm-min">Tylko niezbędne</button>',
        '<div style="display:flex;gap:0.6rem;flex-wrap:wrap;"><button type="button" class="neo-cb-btn neo-cb-btn-outline" id="neo-cm-save">Zapisz wybór</button>',
        '<button type="button" class="neo-cb-btn neo-cb-btn-gold" id="neo-cm-all">Akceptuj wszystkie</button></div></div></div></div>'
      ].join('');
      document.body.insertAdjacentHTML('beforeend', html);
      m = document.getElementById('neo-consent-modal');
      document.getElementById('neo-cm-x').onclick = closeSettings;
      document.getElementById('neo-cm-min').onclick = function () { saveConsent(false, false); };
      document.getElementById('neo-cm-all').onclick = function () { saveConsent(true, true); };
      document.getElementById('neo-cm-save').onclick = function () {
        saveConsent(document.getElementById('neo-tog-analytics').checked, document.getElementById('neo-tog-marketing').checked);
      };
      m.addEventListener('click', function (e) { if (e.target === m) closeSettings(); });
    }
    var cur = readConsent() || { analytics: false, marketing: false };
    document.getElementById('neo-tog-analytics').checked = !!cur.analytics;
    document.getElementById('neo-tog-marketing').checked = !!cur.marketing;
    m.hidden = false;
  }

  function showBanner() {
    if (location.pathname.indexOf('/admin') === 0 || document.getElementById('neo-cookie-banner')) return;
    ensureCss(function () {
      if (document.getElementById('neo-cookie-banner') || readConsent()) return;
      var bHtml = [
        '<aside id="neo-cookie-banner" data-nosnippet="true" role="dialog" aria-label="Informacja o plikach cookies">',
        // biome-ignore lint/security/noSecrets: static Polish consent banner label
        '<div class="neo-cb-kicker">Prywatność i Pliki Cookies</div>',
        '<p class="neo-cb-text">Używamy niezbędnych technologii przeglądarki (m.in. dla kalkulatorów i bezpiecznych płatności Stripe) oraz – wyłącznie za Twoją zgodą – analitycznych i marketingowych cookies (GA4, Microsoft Clarity, Google Ads, Meta Pixel). Szczegóły w <a href="/polityka-prywatnosci/">Polityce Prywatności</a>.</p>',
        '<div class="neo-cb-actions">',
        '<button type="button" class="neo-cb-btn neo-cb-btn-ghost" id="neo-cb-cfg">Ustawienia</button>',
        '<button type="button" class="neo-cb-btn neo-cb-btn-outline" id="neo-cb-min">Tylko niezbędne</button>',
        '<button type="button" class="neo-cb-btn neo-cb-btn-gold" id="neo-cb-all">Akceptuj wszystkie</button>',
        '</div></aside>'
      ].join('');
      document.body.insertAdjacentHTML('beforeend', bHtml);
      document.getElementById('neo-cb-cfg').onclick = openSettings;
      document.getElementById('neo-cb-min').onclick = function () { saveConsent(false, false); };
      document.getElementById('neo-cb-all').onclick = function () { saveConsent(true, true); };
    });
  }

  window.neoConsent = {
    get: readConsent,
    save: saveConsent,
    openSettings: openSettings,
    onChange: function (cb) {
      if (typeof cb !== 'function') return;
      listeners.push(cb);
      var cur = readConsent();
      if (cur) cb(cur);
    }
  };

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-cookie-settings]')) {
      e.preventDefault();
      openSettings();
    }
  });

  function bootGoogleTag() {
    if (window.__neoHasInlineTracking || window.__neoGtmLoaded) return;
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
    window.__neoGtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function () { window.dataLayer.push(arguments); };
    }
    window.gtag('set', 'url_passthrough', true);
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500
    });
    var cur = readConsent();
    if (cur) syncGtag(cur);
    var gs = document.createElement('script');
    gs.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PBP5CDDN';
    gs.async = true;
    document.head.appendChild(gs);
    if (!document.querySelector('script[src*="gtag/js?id=GTM-TL82W42Q"]')) {
      var gt = document.createElement('script');
      gt.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-TL82W42Q';
      gt.async = true;
      document.head.appendChild(gt);
    }
    window.gtag('js', new Date());
    window.gtag('config', 'GTM-TL82W42Q');
    window.gtag('config', 'AW-18591369003');
  }

  bootGoogleTag();

  function init() {
    var cur = readConsent();
    if (cur) { syncGtag(cur); ensureTrackingLoaded(cur); }
    else showBanner();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
