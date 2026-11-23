(function () {
  'use strict';
  const esc = (x) => String(x || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

  function ensureLifeStyles() {
    if (typeof document === 'undefined' || !document.head || document.getElementById('syn-exp-life-css')) return;
    const st = document.createElement('style');
    st.id = 'syn-exp-life-css';
    st.textContent =
      '.syn-life-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.9rem;margin-top:0.85rem;}' +
      '.syn-cmp-list{display:flex;flex-direction:column;gap:0.95rem;margin-top:0.85rem;}' +
      '.syn-cmp-block{background:rgba(255,255,255,0.025);border:1px solid rgba(201,169,110,0.22);border-radius:1.05rem;padding:1.05rem 1.15rem;}' +
      '.syn-cmp-cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:0.55rem;}' +
      '.syn-cmp-who{font-family:"JetBrains Mono",monospace;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;color:#FAF8F5;margin-bottom:0.3rem;font-weight:700;}' +
      '.syn-cmp-txt{font-size:0.84rem;line-height:1.58;color:rgba(250,248,245,0.88);margin:0;}' +
      '.syn-cmp-bridge{margin-top:0.75rem;padding-top:0.65rem;border-top:1px solid rgba(255,255,255,0.07);font-size:0.8rem;color:#C9A96E;line-height:1.5;}' +
      '.syn-exp-mat-meta{margin-top:0.75rem;padding-top:0.6rem;border-top:1px solid rgba(255,255,255,0.07);font-family:"JetBrains Mono",monospace;font-size:10.5px;color:rgba(201,169,110,0.85);letter-spacing:0.06em;}' +
      '.syn-exp-questions{margin-top:1.35rem;padding-top:1.25rem;border-top:1px solid rgba(201,169,110,0.22);}' +
      '.syn-q-list{display:flex;flex-direction:column;margin-top:0.8rem;}' +
      '.syn-q-item{display:grid;grid-template-columns:2rem minmax(0,1fr);column-gap:0.75rem;align-items:start;margin-bottom:0.65rem;background:rgba(255,255,255,0.028);border:1px solid rgba(201,169,110,0.2);border-radius:0.85rem;padding:0.85rem 1.05rem;}' +
      '.syn-q-item:last-child{margin-bottom:0;}' +
      '.syn-q-num{font-family:"JetBrains Mono",monospace;font-size:0.82rem;font-weight:700;color:#C9A96E;padding-top:0.1rem;}' +
      '.syn-q-tag{font-family:"JetBrains Mono",monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:0.14em;color:rgba(201,169,110,0.82);margin-bottom:0.2rem;}' +
      '.syn-q-txt{font-family:"Playfair Display",Georgia,serif;font-size:0.98rem;line-height:1.5;color:#FAF8F5;margin:0;}' +
      '@media(max-width:820px){.syn-life-grid-3,.syn-cmp-cols{grid-template-columns:1fr;}}' +
      '@media print{.syn-exp-life-chapter,.syn-cmp-block,.syn-q-item{break-inside:avoid;}.syn-q-item{border-color:rgba(201,169,110,0.45);}}';
    document.head.appendChild(st);
  }

  function renderTopMaturity(d, dos) {
    const LD = window.__SYN_EXPAND_LIFE_DATA__, res = document.getElementById('syn-results');
    if (!LD || !res) return;
    ensureLifeStyles();
    const arch = Array.from(res.querySelectorAll('.syn-card')).find((c) => (c.querySelector('.syn-card-tag')?.textContent || '').includes('ARCHITEKTURA RELACJI'));
    if (!arch) return;
    const lesson = LD.buildMaturityLesson(d, dos);
    const h3 = arch.querySelector('.syn-card-heading'), p = arch.querySelector('p');
    if (h3) h3.textContent = lesson.title;
    if (p) p.textContent = lesson.body;
    let meta = arch.querySelector('.syn-exp-mat-meta');
    if (!meta) {
      meta = document.createElement('div');
      meta.className = 'syn-exp-mat-meta';
      arch.appendChild(meta);
    }
    meta.textContent = lesson.meta;
  }

  function renderUnlockedLife(d, dos, houseHits) {
    const LD = window.__SYN_EXPAND_LIFE_DATA__, dossier = document.getElementById('syn-locked-dossier');
    if (!LD || !dossier) return;
    ensureLifeStyles();
    dossier.querySelectorAll('.syn-exp-life-chapter, .syn-exp-questions').forEach((el) => el.remove());

    const chaps = dossier.querySelectorAll(':scope > .syn-report-chapter');
    const nA = esc(d.nameA), nB = esc(d.nameB);

    if (chaps[0]) {
      const blocks = LD.buildOneToOneData(d, dos).map((b) => `
        <div class="syn-cmp-block">
          <div class="syn-card-tag">${b.glyph} ${b.title}</div>
          <div class="syn-cmp-cols">
            <div><div class="syn-cmp-who">${nA} (${esc(b.signA)})</div><p class="syn-cmp-txt">${esc(b.textA)}</p></div>
            <div><div class="syn-cmp-who">${nB} (${esc(b.signB)})</div><p class="syn-cmp-txt">${esc(b.textB)}</p></div>
          </div>
          <div class="syn-cmp-bridge">${esc(b.bridge)}</div>
        </div>`).join('');
      chaps[0].insertAdjacentHTML('afterend', `<div class="syn-report-chapter syn-exp-life-chapter"><div class="syn-chapter-num">ROZDZIAŁ II-B &bull; PORÓWNANIE 1:1: ROZMOWA, DZIAŁANIE I BLISKOŚĆ</div><h4 class="syn-chapter-title">Jak myślicie, działacie i okazujecie uczucia?</h4><div class="syn-cmp-list">${blocks}</div></div>`);
    }

    if (chaps[5]) {
      const cards = LD.buildLifeDomains(d, dos, houseHits).map((c) => `
        <div class="syn-stat-box">
          <div class="syn-card-tag">${esc(c.tag)}</div>
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:1.05rem;font-weight:700;color:#FAF8F5;margin-bottom:0.35rem;">${esc(c.title)}</div>
          <p style="font-size:0.83rem;line-height:1.58;color:rgba(250,248,245,0.86);margin:0;">${esc(c.body)}</p>
        </div>`).join('');
      chaps[5].insertAdjacentHTML('afterend', `<div class="syn-report-chapter syn-exp-life-chapter"><div class="syn-chapter-num">ROZDZIAŁ V-B &bull; CODZIENNOŚĆ, PIENIĄDZE I WSPÓLNY DOM</div><h4 class="syn-chapter-title">Trzy strefy wspólnego życia po pierwszym zauroczeniu</h4><div class="syn-life-grid-3">${cards}</div></div>`);
    }

    if (chaps[7]) {
      const qHtml = LD.buildFiveQuestions(d, dos).map((item, idx) => `
        <div class="syn-q-item">
          <div class="syn-q-num">0${idx + 1}</div>
          <div><div class="syn-q-tag">${esc(item.tag)}</div><p class="syn-q-txt">${esc(item.q)}</p></div>
        </div>`).join('');
      const wrap = `<div class="syn-exp-questions"><div class="syn-card-tag">NA WIECZÓR WE DWOJE</div><h4 style="font-family:'Playfair Display',Georgia,serif;font-size:1.22rem;color:#FAF8F5;margin:0.15rem 0 0.2rem;">5 pytań dobranych pod Wasz horoskop</h4><div class="syn-q-list">${qHtml}</div></div>`;
      const actions = chaps[7].querySelector('.syn-no-print');
      if (actions) actions.insertAdjacentHTML('beforebegin', wrap);
      else chaps[7].insertAdjacentHTML('beforeend', wrap);
    }
  }

  window.__SYN_EXPAND_LIFE_UI__ = { renderTopMaturity, renderUnlockedLife };
})();
