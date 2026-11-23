(function () {
  window.__neoHasInlineTracking = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
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
  var clarityLoaded = false;
  var marketingLoaded = false;
  try {
    var saved = JSON.parse(localStorage.getItem('neo_cookie_consent_v1') || 'null');
    if (saved && typeof saved.analytics === 'boolean') {
      window.gtag('consent', 'update', {
        analytics_storage: saved.analytics ? 'granted' : 'denied',
        ad_storage: saved.marketing ? 'granted' : 'denied',
        ad_user_data: saved.marketing ? 'granted' : 'denied',
        ad_personalization: saved.marketing ? 'granted' : 'denied'
      });
    }
  } catch (_e) {}
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1' && !window.__neoGtmLoaded) {
    window.__neoGtmLoaded = true;
    var gtmScript = document.createElement('script');
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-PBP5CDDN';
    gtmScript.async = true;
    document.head.appendChild(gtmScript);
    window.gtag('js', new Date());
    window.gtag('config', 'GTM-TL82W42Q');
    window.gtag('config', 'AW-18591369003');
  }
  function loadAnalytics(c) {
    if (clarityLoaded) return;
    clarityLoaded = true;
    (function (c2, l, a, r, i, t, y) {
      c2[a] = c2[a] || function () { (c2[a].q = c2[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'vwqhwp92jz');
    try {
      window.clarity('consentv2', {
        ad_Storage: c && c.marketing ? 'granted' : 'denied',
        analytics_Storage: 'granted'
      });
      window.clarity('set', 'page_slug', 'home');
      window.clarity('set', 'page_path', '/');
      window.clarity('set', 'page_group', 'landing');
      if (document.title) {
        window.clarity('set', 'page_title', document.title.replace(/\s*[|–—-]\s*Neoromantyczny.*$/i, '').trim());
      }
    } catch (_e) {}
  }
  function loadMarketing() {
    if (marketingLoaded) return;
    marketingLoaded = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.defer = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      // biome-ignore lint/security/noSecrets: public Meta Pixel SDK script URL
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    var pageViewId = 'pv-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    // biome-ignore lint/security/noSecrets: public Meta Pixel ID
    window.fbq('init', '2083061389142070');
    window.fbq('track', 'PageView', {}, { eventID: pageViewId });
    window.pixelPageViewId = pageViewId;
  }
  function bindConsent() {
    if (!window.neoConsent) return false;
    window.neoConsent.onChange(function (c) {
      if (c.analytics) loadAnalytics(c);
      if (c.marketing) loadMarketing();
    });
    return true;
  }
  if (!bindConsent()) {
    window.addEventListener('load', function () {
      if (!bindConsent()) setTimeout(bindConsent, 200);
    });
  }
})();
