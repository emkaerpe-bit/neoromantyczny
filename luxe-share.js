(function () {
  'use strict';

  function buildShareUrl() {
    var url = new URL(window.location.href);
    url.searchParams.delete('payment_intent');
    url.searchParams.delete('payment_intent_client_secret');
    url.searchParams.delete('redirect_status');
    url.searchParams.set('utm_source', 'viral_share');
    return url.toString();
  }

  function createShareBar(shareText) {
    var box = document.createElement('div');
    box.className = 'neo-viral-share-bar';
    box.setAttribute('data-nosnippet', 'true');
    box.style.cssText = 'margin:1.35rem auto 0;padding:1rem 1.25rem;border-radius:1rem;background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.28);display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:0.75rem;';

    var label = document.createElement('div');
    label.style.cssText = 'font-size:0.84rem;color:#FAF8F5;line-height:1.45;';
    label.innerHTML = '<strong style="color:#C9A84C;">Wyślij ten test komuś bliskiemu</strong><br><span style="font-size:0.76rem;color:rgba(250,248,245,0.68);">Sprawdźcie nawzajem swoje kosmogramy lub udostępnij link na Stories / WhatsApp.</span>';

    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:0.5rem;';

    var btnCopy = document.createElement('button');
    btnCopy.type = 'button';
    btnCopy.textContent = 'Kopiuj link';
    btnCopy.style.cssText = 'background:rgba(255,255,255,0.08);color:#FAF8F5;border:1px solid rgba(255,255,255,0.2);border-radius:9999px;padding:0.5rem 1rem;font-size:0.78rem;font-weight:600;cursor:pointer;';
    btnCopy.onclick = function () {
      var u = buildShareUrl();
      if (navigator.share) {
        navigator.share({ title: document.title, text: shareText, url: u }).catch(function () {});
        return;
      }
      if (navigator.clipboard) {
        navigator.clipboard.writeText(u).then(function () {
          btnCopy.textContent = 'Skopiowano!';
          setTimeout(function () { btnCopy.textContent = 'Kopiuj link'; }, 1800);
        });
      }
    };

    var btnWa = document.createElement('a');
    btnWa.target = '_blank';
    btnWa.rel = 'noopener noreferrer';
    btnWa.textContent = 'WhatsApp →';
    btnWa.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(shareText + ' ' + buildShareUrl());
    btnWa.style.cssText = 'background:#C9A84C;color:#0D0D12;border-radius:9999px;padding:0.5rem 1.05rem;font-size:0.78rem;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;';

    actions.appendChild(btnCopy);
    actions.appendChild(btnWa);
    box.appendChild(label);
    box.appendChild(actions);
    return box;
  }

  function mountIfMissing(container, shareText) {
    if (!container || container.querySelector('.neo-viral-share-bar')) return;
    container.appendChild(createShareBar(shareText));
  }

  function scan() {
    var moonBar = document.querySelector('#moonResults .viral-poster-bar');
    if (moonBar && moonBar.parentNode && !moonBar.parentNode.querySelector('.neo-viral-share-bar')) {
      moonBar.insertAdjacentElement('afterend', createShareBar('Sprawdź, czy nasze Księżyce z dnia narodzin tworzą Pełnię:'));
    }
    var acgRes = document.getElementById('acgResultsSection');
    if (acgRes) mountIfMissing(acgRes, 'Zobacz swoją mapę planetarną (Linia Wenus i Jowisza) w darmowym kalkulatorze:');
    var dispRes = document.getElementById('disp-results');
    if (dispRes && dispRes.style.display !== 'none') {
      mountIfMissing(dispRes, 'Sprawdź swój kosmogram w kalkulatorze Neoromantyczny:');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    scan();
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style', 'class'] });
  });
})();
