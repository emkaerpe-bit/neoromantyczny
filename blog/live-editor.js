(function () {
  'use strict';
  if (window.__NEO_LIVE_EDITOR_LOADED__) return;
  window.__NEO_LIVE_EDITOR_LOADED__ = true;

  var slug = location.pathname.replace(/^\/blog\//, '').replace(/\/$/, '');
  var articleEl = document.querySelector('article');
  var h1El = document.querySelector('header h1') || document.querySelector('h1');
  if (!slug || slug.indexOf('/') !== -1 || !articleEl) return;

  localStorage.removeItem('neo_admin_token');
  var isAuthed = false;
  var isEditing = false;

  var css = document.createElement('style');
  css.textContent =
    '#neo-live-bar{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:999999;background:rgba(13,13,18,.96);backdrop-filter:blur(18px);border:1px solid rgba(201,168,76,.45);border-radius:999px;padding:8px 14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;box-shadow:0 12px 40px rgba(0,0,0,.6);font-family:system-ui,sans-serif;font-size:12px;color:#FAF8F5;max-width:95vw}' +
    '#neo-live-bar button,#neo-live-bar a{border-radius:999px;padding:6px 12px;font-weight:700;font-size:12px;cursor:pointer;text-decoration:none;border:none;display:inline-flex;align-items:center;gap:5px}' +
    '.nlb-gold{background:#C9A84C;color:#0D0D12}.nlb-ghost{background:rgba(255,255,255,.08);color:#FAF8F5;border:1px solid rgba(255,255,255,.15)!important}' +
    '#neo-live-bar input{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:#FAF8F5;border-radius:999px;padding:6px 12px;font-size:12px;outline:none;width:150px}' +
    '[data-live-ed="true"]{outline:1px dashed rgba(201,168,76,.45);outline-offset:4px;border-radius:6px;transition:outline-color .15s}' +
    '[data-live-ed="true"]:focus{outline:2px solid #C9A84C;background:rgba(201,168,76,.06)}';
  document.head.appendChild(css);

  var bar = document.createElement('div');
  bar.id = 'neo-live-bar';
  document.body.appendChild(bar);

  function setStatus(msg, color) {
    var st = document.getElementById('nlb-status');
    if (st) { st.textContent = msg; st.style.color = color || '#C9A84C'; }
  }

  function toggleEditing(enable) {
    isEditing = enable;
    if (enable) {
      articleEl.querySelectorAll('.luxe-term').forEach(function (sp) {
        sp.replaceWith(document.createTextNode(sp.textContent));
      });
      articleEl.normalize();
    }
    var pill = document.getElementById('reading-pulse-pill');
    if (pill) pill.style.display = enable ? 'none' : '';
    var targets = articleEl.querySelectorAll('h2,h3,h4,p,td,th,summary,details>div,li');
    targets.forEach(function (el) {
      if (el.closest('[data-nosnippet]') || el.closest('#silos-relacje') || el.closest('.p-12')) return;
      if (enable) {
        var det = el.closest('details');
        if (det) det.open = true;
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('data-live-ed', 'true');
      } else {
        el.removeAttribute('contenteditable');
        el.removeAttribute('data-live-ed');
      }
    });
    if (h1El) {
      if (enable) { h1El.setAttribute('contenteditable', 'true'); h1El.setAttribute('data-live-ed', 'true'); }
      else { h1El.removeAttribute('contenteditable'); h1El.removeAttribute('data-live-ed'); }
    }
    var btn = document.getElementById('nlb-edit');
    if (btn) btn.innerHTML = isEditing ? '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M18.5 7l6.5 6.5l-3 3l-6.5-6.5Z" stroke-width="1.45"/><path d="M15.5 10L8.5 14L6 26l12-2.5L22 16.5" stroke-width="1.55"/><path d="M6 26l7.5-7.5" stroke-width="0.95" opacity="0.75"/><circle cx="14.2" cy="17.8" r="1.2" stroke="none" fill="currentColor"/></svg>Edycja aktywna' : '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M18.5 7l6.5 6.5l-3 3l-6.5-6.5Z" stroke-width="1.45"/><path d="M15.5 10L8.5 14L6 26l12-2.5L22 16.5" stroke-width="1.55"/><path d="M6 26l7.5-7.5" stroke-width="0.95" opacity="0.75"/><circle cx="14.2" cy="17.8" r="1.2" stroke="none" fill="currentColor"/></svg>Włącz edycję';
  }

  articleEl.addEventListener('click', function (e) {
    if (isEditing && e.target.closest('summary')) e.preventDefault();
  });

  async function saveLive() {
    setStatus('Zapisywanie...', '#C9A84C');
    var clone = articleEl.cloneNode(true);
    clone.querySelectorAll('.luxe-term').forEach(function (sp) {
      sp.replaceWith(document.createTextNode(sp.textContent));
    });
    clone.querySelectorAll('[contenteditable],[data-live-ed]').forEach(function (el) {
      el.removeAttribute('contenteditable');
      el.removeAttribute('data-live-ed');
    });
    try {
      var res = await fetch('/api/live-cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ slug: slug, h1: h1El ? h1El.textContent.trim() : '', articleInnerHtml: clone.innerHTML })
      });
      var data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Błąd zapisu');
      setStatus('✓ Zapisano na żywo (0s)', '#4ade80');
    } catch (err) {
      setStatus('Błąd: ' + err.message, '#f87171');
    }
  }

  async function resetLive() {
    if (!confirm('Przywrócić pierwotny statyczny tekst z repozytorium?')) return;
    setStatus('Przywracanie...', '#C9A84C');
    var res = await fetch('/api/live-cms?slug=' + encodeURIComponent(slug), {
      method: 'DELETE', credentials: 'same-origin'
    });
    if (res.ok) location.reload();
    else setStatus('Błąd przywracania', '#f87171');
  }

  function renderBar() {
    if (!isAuthed) {
      bar.innerHTML = '<span style="color:#C9A84C;font-weight:700">Live CMS</span><input id="nlb-pw" type="password" placeholder="Hasło admina"/><button id="nlb-login" class="nlb-gold">Odblokuj</button><span id="nlb-status"></span>';
      var pw = document.getElementById('nlb-pw');
      var doLogin = async function () {
        var r = await fetch('/api/live-cms/login', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin',
          body: JSON.stringify({ password: (pw.value || '').trim() })
        });
        if (!r.ok) { setStatus('Błędne hasło', '#f87171'); return; }
        isAuthed = true; localStorage.setItem('neo_cms_ui', '1');
        renderBar(); toggleEditing(true);
      };
      document.getElementById('nlb-login').onclick = doLogin;
      pw.onkeydown = function (e) { if (e.key === 'Enter') doLogin(); };
      return;
    }
    bar.innerHTML =
      '<button id="nlb-edit" class="nlb-gold"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M18.5 7l6.5 6.5l-3 3l-6.5-6.5Z" stroke-width="1.45"/><path d="M15.5 10L8.5 14L6 26l12-2.5L22 16.5" stroke-width="1.55"/><path d="M6 26l7.5-7.5" stroke-width="0.95" opacity="0.75"/><circle cx="14.2" cy="17.8" r="1.2" stroke="none" fill="currentColor"/></svg>Włącz edycję</button>' +
      '<button id="nlb-save" class="nlb-gold"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><circle cx="16" cy="13.5" r="7" stroke-width="1.6"/><circle cx="16" cy="13.5" r="4.2" stroke-width="0.8" opacity="0.55"/><path d="M12.5 19.8V27l3.5-2.2l3.5 2.2v-7.2" stroke-width="1.35"/></svg>Zapisz na żywo (0s)</button>' +
      '<button id="nlb-reset" class="nlb-ghost">↺ Oryginał</button>' +
      '<a href="/admin/" class="nlb-ghost"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><circle cx="16" cy="16" r="4" stroke-width="1.5"/><circle cx="16" cy="16" r="8.2" stroke-width="2.2" stroke-dasharray="2.4 4.05"/><circle cx="16" cy="16" r="10.8" stroke-width="0.7" opacity="0.45"/></svg>Panel</a>' +
      '<button id="nlb-out" class="nlb-ghost">Wyloguj</button>' +
      '<span id="nlb-status" style="padding:0 4px"></span>';
    document.getElementById('nlb-edit').onclick = function () { toggleEditing(!isEditing); };
    document.getElementById('nlb-save').onclick = saveLive;
    document.getElementById('nlb-reset').onclick = resetLive;
    document.getElementById('nlb-out').onclick = async function () {
      await fetch('/api/live-cms/logout', { method: 'POST', credentials: 'same-origin' });
      localStorage.removeItem('neo_cms_ui'); toggleEditing(false); bar.remove();
    };
    if (location.search.indexOf('edit=1') !== -1) toggleEditing(true);
  }

  fetch('/api/live-cms', { credentials: 'same-origin' }).then(function (r) {
    isAuthed = r.ok;
    if (isAuthed) localStorage.setItem('neo_cms_ui', '1');
    else localStorage.removeItem('neo_cms_ui');
    renderBar();
  }).catch(renderBar);
})();
