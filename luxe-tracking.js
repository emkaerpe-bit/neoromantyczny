(function () {
  'use strict';
  if (window.__neoHasInlineTracking || window.__neoGlobalTrackingBound) return;
  window.__neoGlobalTrackingBound = true;

  var gaDone = false;
  var fbDone = false;

  function boot(c) {
    if (!c) return;
    if (c.analytics && !gaDone) {
      gaDone = true;
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== 'function') {
        window.gtag = function () { window.dataLayer.push(arguments); };
      }
      if (!window.__neoGtmLoaded) {
        window.__neoGtmLoaded = true;
        var gs = document.createElement('script');
        gs.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PBP5CDDN';
        gs.async = true;
        document.head.appendChild(gs);
        window.gtag('js', new Date());
      }

      (function (c2, l, a, r, i, t, y) {
        c2[a] = c2[a] || function () { (c2[a].q = c2[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', 'vwqhwp92jz');

      try {
        var rawPath = (location.pathname || '/').replace(/\/index\.html$/i, '/').replace(/\.html$/i, '');
        var cleanPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');
        var pageSlug = cleanPath === '/' ? 'home' : cleanPath.replace(/^\/+/, '');
        var pageGroup = 'landing';
        if (cleanPath.indexOf('/kalkulator-') === 0) pageGroup = 'kalkulator';
        else if (cleanPath === '/blog') pageGroup = 'blog-hub';
        else if (cleanPath.indexOf('/blog/') === 0) pageGroup = 'blog-artykul';
        else if (cleanPath.indexOf('/zodiakalny-prezentownik') === 0 || cleanPath.indexOf('/konsultacja-') === 0) pageGroup = 'oferta';
        else if (cleanPath.indexOf('/sukces-') === 0) pageGroup = 'sukces-zakupu';

        window.clarity('consentv2', {
          ad_Storage: c.marketing ? 'granted' : 'denied',
          analytics_Storage: 'granted'
        });
        window.clarity('set', 'page_slug', pageSlug);
        window.clarity('set', 'page_path', cleanPath);
        window.clarity('set', 'page_group', pageGroup);
        if (document.title) {
          window.clarity('set', 'page_title', document.title.replace(/\s*[|–—-]\s*Neoromantyczny.*$/i, '').trim());
        }
      } catch (_e) {}
    }
    if (c.marketing && !fbDone) {
      fbDone = true;
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.defer = !0; t.src = v;
        s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', '2083061389142070');
      window.fbq('track', 'PageView');
    }
  }

  document.addEventListener('click', function (e) {
    var cta = e.target.closest('a[href*="stripe.com"]:not([data-luxe-checkout]):not(.js-open-checkout)');
    if (!cta || !window.neoConsent) return;
    var c = window.neoConsent.get();
    if (!c) return;
    var prod = cta.getAttribute('data-luxe-checkout') || 'prezentownik';
    if (c.marketing && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', { content_name: prod, currency: 'PLN' });
    }
    if (c.analytics && typeof window.gtag === 'function') {
      window.gtag('event', 'begin_checkout', { currency: 'PLN', item_id: prod });
    }
    if (c.analytics && typeof window.clarity === 'function') {
      window.clarity('set', 'checkout_product', prod);
      window.clarity('event', 'begin_checkout');
    }
  });

  if (window.neoConsent) window.neoConsent.onChange(boot);

  function bindMicroConversions() {
    var raw = (location.pathname || '/').replace(/\/index\.html$/i, '/').replace(/\.html$/i, '');
    var slug = raw === '/' ? 'home' : raw.replace(/^\/+|\/+$/g, '');
    var isCalc = slug.indexOf('kalkulator-') === 0;
    var calcSent = false;
    var paywallSent = false;
    var s50 = false;
    var s90 = false;

    function fire(name, params) {
      var c = window.neoConsent ? window.neoConsent.get() : null;
      if (!c || !c.analytics) return;
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
      if (typeof window.clarity === 'function') window.clarity('event', name);
    }

    if (isCalc) {
      document.addEventListener('submit', function () {
        if (calcSent) return;
        calcSent = true;
        if (typeof window.clarity === 'function') window.clarity('set', 'calculator_used', slug);
        fire('calculator_submit', { calculator: slug });
      }, true);
    }

    if (typeof IntersectionObserver === 'function') {
      var pwTargets = document.querySelectorAll('[data-luxe-checkout], .js-open-checkout, .paywall-blur, .lock-overlay, #paywall, .locked-section, a[href*="stripe.com"]');
      if (pwTargets.length) {
        var obs = new IntersectionObserver(function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting && !paywallSent) {
              paywallSent = true;
              if (typeof window.clarity === 'function') window.clarity('set', 'saw_paywall', 'true');
              fire('paywall_view', { page_slug: slug });
              obs.disconnect();
              break;
            }
          }
        }, { threshold: 0.25 });
        for (var j = 0; j < pwTargets.length; j++) obs.observe(pwTargets[j]);
      }
    }

    window.addEventListener('scroll', function () {
      var doc = document.documentElement;
      var max = (doc.scrollHeight || 0) - (window.innerHeight || 0);
      if (max <= 0) return;
      var pct = ((window.scrollY || doc.scrollTop || 0) / max) * 100;
      if (!s50 && pct >= 50) { s50 = true; fire('scroll_50', { page_slug: slug }); }
      if (!s90 && pct >= 90) { s90 = true; fire('scroll_90', { page_slug: slug }); }
    }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindMicroConversions);
  else bindMicroConversions();
})();
