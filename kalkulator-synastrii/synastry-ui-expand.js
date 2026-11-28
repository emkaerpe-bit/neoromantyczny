/* === SYNASTRIA: ROZSZERZONE PANELE UI I HOOKI RENDERU === */
(function () {
  'use strict';
  const esc = (x) => String(x || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const zoneTag = (s, isFriction) => {
    if (isFriction) return s >= 76 ? 'Wysokie napięcie' : s >= 56 ? 'Wyraźne tarcie' : s >= 45 ? 'Umiarkowane tarcie' : 'Niskie napięcie';
    return s >= 76 ? 'Dominanta' : s >= 56 ? 'Wyraźny atut' : s >= 45 ? 'Strefa równowagi' : 'Słabszy wpływ';
  };

  function ensurePanelStyles() {
    if (typeof document === 'undefined' || !document.head || document.getElementById('syn-exp-panels-css')) return;
    const st = document.createElement('style');
    st.id = 'syn-exp-panels-css';
    st.textContent =
      '.syn-exp-evidence{width:100%;margin:0.35rem 0 1.4rem;border-radius:1rem;background:linear-gradient(155deg,rgba(24,24,34,0.8) 0%,rgba(13,13,20,0.92) 100%);border:1px solid rgba(201,169,110,0.24);transition:border-color .22s ease,box-shadow .22s ease;overflow:hidden;}' +
      '.syn-exp-evidence:hover,.syn-exp-evidence[open]{border-color:rgba(201,169,110,0.45);box-shadow:0 12px 30px rgba(0,0,0,0.35);}' +
      '.syn-ev-sum{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:0.75rem;padding:0.8rem 1rem;cursor:pointer;user-select:none;}' +
      '.syn-ev-sum::-webkit-details-marker{display:none;}' +
      '.syn-ev-sum-left{display:flex;align-items:baseline;flex-wrap:wrap;gap:0.42rem;font-size:0.84rem;font-weight:600;color:#C9A96E;}' +
      '.syn-ev-sum-sub{font-size:0.75rem;font-weight:400;color:rgba(250,248,245,0.55);}' +
      '.syn-ev-chev{color:#C9A96E;flex-shrink:0;transition:transform .22s ease;}' +
      '.syn-exp-evidence[open] .syn-ev-chev{transform:rotate(180deg);}' +
      '.syn-ev-body{border-top:1px solid rgba(255,255,255,0.07);padding:0.9rem 1rem 1rem;}' +
      '.syn-ev-label{font-family:"JetBrains Mono",monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:0.16em;color:rgba(201,169,110,0.82);margin-bottom:0.5rem;}' +
      '.syn-ev-chips{display:flex;flex-wrap:wrap;gap:0.48rem;margin-bottom:0.95rem;}' +
      '.syn-ev-chip{white-space:nowrap;display:inline-flex;align-items:center;gap:0.42rem;padding:0.35rem 0.72rem;border-radius:0.3rem;background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.09);border-left-width:2.5px;font-size:0.76rem;color:rgba(250,248,245,0.92);line-height:1.25;}' +
      '.syn-ev-orb{font-family:"JetBrains Mono",monospace;font-size:0.69rem;color:rgba(250,248,245,0.58);margin-left:0.18rem;padding-left:0.38rem;border-left:1px solid rgba(255,255,255,0.12);}' +
      '.syn-ev-metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(115px,1fr));gap:0.5rem;margin-top:0.45rem;}' +
      '.syn-ev-metric{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:0.65rem;padding:0.5rem 0.65rem;}' +
      '.syn-ev-m-k{font-size:0.71rem;color:rgba(250,248,245,0.62);margin-bottom:0.2rem;white-space:nowrap;}' +
      '.syn-ev-m-v{font-family:"JetBrains Mono",monospace;font-size:0.84rem;font-weight:700;color:#FAF8F5;white-space:nowrap;}';
    document.head.appendChild(st);
  }

  function renderTopBanners(d) {
    const res = document.getElementById('syn-results');
    if (!res) return;
    const old = document.getElementById('syn-exp-banners');
    if (old) old.remove();
    let html = '';
    if (!d.cA.hasTime || !d.cB.hasTime) {
      const who = (!d.cA.hasTime && !d.cB.hasTime) ? 'obu osób' : (!d.cA.hasTime ? esc(d.nameA) : esc(d.nameB));
      html += `<div style="margin-bottom:1rem;padding:0.85rem 1.15rem;border-radius:0.9rem;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.38);color:#FDE68A;font-size:0.84rem;line-height:1.55;"><strong>Tryb bez pełnej godziny urodzenia (${who}):</strong> osie AC/DC/MC/IC i domy pozostają ukryte, a pozycja Księżyca może różnić się nawet o &plusmn;6&deg;.</div>`;
    }
    if (Math.abs(d.cA.city.lat) >= 66.55 || Math.abs(d.cB.city.lat) >= 66.55) {
      html += `<div style="margin-bottom:1rem;padding:0.85rem 1.15rem;border-radius:0.9rem;background:rgba(52,211,153,0.09);border:1px solid rgba(52,211,153,0.35);color:#A7F3D0;font-size:0.84rem;line-height:1.55;"><strong>Strefa podbiegunowa (&ge; 66.55&deg;):</strong> dla szerokości polarnej zastosowano automatycznie system domów <em>Whole Sign</em> zamiast Placidusa.</div>`;
    }
    if (html) res.insertAdjacentHTML('afterbegin', `<div id="syn-exp-banners">${html}</div>`);
  }

  const AXIS_TIPS = (typeof window !== 'undefined' && window.__SYNASTRY_FREE_TEXTS__ && window.__SYNASTRY_FREE_TEXTS__.AXIS_TIPS) || [];

  function makeAxisTip(def, score, isFriction) {
    return `<span class="syn-asp-badge syn-exp-tip" tabindex="0" style="margin-left:5px;vertical-align:middle;"><span class="syn-info-pill" style="font-size:8px;padding:1px 5px;cursor:help;">ⓘ</span><span class="syn-asp-tip"><strong style="color:${def.c};display:block;margin-bottom:3px;font-size:0.8rem;">${def.t} &bull; ${score}%</strong>${def.d}<br><span style="opacity:0.8;font-size:0.74rem;display:block;margin-top:4px;">Strefa: ${zoneTag(score, isFriction)} (45–55% to strefa równowagi).</span></span></span>`;
  }

  function enhanceFiveAxes(d, dos) {
    ensurePanelStyles();
    const wc = document.getElementById('syn-wheel-container');
    const grid = wc && wc.closest('.syn-grid-2');
    const rightCol = grid && grid.children[1];
    if (!rightCol) return;
    rightCol.querySelectorAll('.syn-exp-zone, .syn-exp-tip, .syn-exp-extra-axes, .syn-exp-evidence').forEach((el) => el.remove());

    const baseScores = [d.syn.chemistry, d.syn.security, d.syn.friction];
    rightCol.querySelectorAll('.syn-bar-track').forEach((tr, i) => {
      const lblRow = tr.previousElementSibling;
      if (!lblRow || baseScores[i] === undefined) return;
      const isFric = i === 2;
      lblRow.style.gap = '8px'; lblRow.style.alignItems = 'baseline';
      const titleSpan = lblRow.firstElementChild, valSpan = lblRow.lastElementChild;
      if (titleSpan) titleSpan.insertAdjacentHTML('beforeend', makeAxisTip(AXIS_TIPS[i], baseScores[i], isFric));
      if (valSpan) {
        valSpan.style.whiteSpace = 'nowrap'; valSpan.style.flexShrink = '0';
        valSpan.insertAdjacentHTML('afterbegin', `<span class="syn-exp-zone" style="font-size:10px;opacity:0.75;margin-right:6px;font-weight:400;">(${zoneTag(baseScores[i], isFric)})</span>`);
      }
    });

    const anchor = Array.from(rightCol.querySelectorAll('.syn-card-tag')).find((el) => el.textContent.includes('KLUCZOWE ASPEKTY'));
    if (!anchor) return;
    const extraBars = [
      { idx: 3, val: dos.commFinal, grad: 'linear-gradient(90deg,#2563EB,#60A5FA)' },
      { idx: 4, val: dos.saturnFinal, grad: 'linear-gradient(90deg,#7C3AED,#A78BFA)' }
    ].map((x) => {
      const def = AXIS_TIPS[x.idx];
      return `<div class="syn-exp-extra-axes" style="margin-bottom:1.15rem;"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:0.9rem;font-weight:600;"><span>${def.t}${makeAxisTip(def, x.val, false)}</span><span style="color:${def.c};font-family:'JetBrains Mono',monospace;white-space:nowrap;flex-shrink:0;"><span style="font-size:10px;opacity:0.75;margin-right:6px;font-weight:400;">(${zoneTag(x.val, false)})</span>${x.val}%</span></div><div class="syn-bar-track"><div class="syn-bar-fill" style="width:${x.val}%;background:${x.grad};"></div></div></div>`;
    }).join('');

    const chips = (dos.fullAspects || []).slice(0, 5).map((a) => `<span class="syn-ev-chip" style="border-left-color:${a.color || '#C9A96E'};"><span>${a.bA.glyph} ${a.bA.label}</span><span style="color:${a.color || '#C9A96E'};font-weight:700;padding:0 2px;">${a.sym}</span><span>${a.bB.glyph} ${a.bB.label}</span><span class="syn-ev-orb">${a.orbStr}</span></span>`).join('') || '<span class="syn-ev-chip">Rozkład żywiołów pary</span>';
    const chev = '<svg class="syn-ev-chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    const evBox = `<details class="syn-exp-evidence"><summary class="syn-ev-sum"><span class="syn-ev-sum-left"><span>✦ Skąd wziął się ten wynik?</span><span class="syn-ev-sum-sub" style="opacity:0.45;">&bull;</span><span class="syn-ev-sum-sub">Zestawienie aspektów</span></span>${chev}</summary><div class="syn-ev-body"><div class="syn-ev-label">Najważniejsze aspekty w tym wyniku</div><div class="syn-ev-chips">${chips}</div><div class="syn-ev-label" style="margin-bottom:0;">Rezonans Ebertina 90&deg;</div><div class="syn-ev-metrics"><div class="syn-ev-metric"><div class="syn-ev-m-k">Oś Małżeństwa</div><div class="syn-ev-m-v">&Delta; ${dos.ebertinMarriageDelta.toFixed(1)}&deg;</div></div><div class="syn-ev-metric"><div class="syn-ev-m-k">Oś Pożądania</div><div class="syn-ev-m-v">&Delta; ${dos.ebertinDesireDelta.toFixed(1)}&deg;</div></div><div class="syn-ev-metric"><div class="syn-ev-m-k">Obsesja ♇&times;⚸</div><div class="syn-ev-m-v" style="color:#FB7185;">${dos.obsessionFinal}%</div></div></div></div></details>`;
    anchor.insertAdjacentHTML('beforebegin', extraBars + evBox);
  }

  function enhance(d, dos) {
    renderTopBanners(d);
    enhanceFiveAxes(d, dos);
  }

  window.__SYN_EXPAND_PANELS__ = { enhance, zoneTag };
})();

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

(function () {
  'use strict';
  const norm = (x) => ((x % 360) + 360) % 360;
  const esc = (x) => String(x || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const sep = (a, b) => { const d = Math.abs(norm(a) - norm(b)); return d > 180 ? 360 - d : d; };

  function getLon(key, dateObj) {
    const A = window.Astronomy, t = A.MakeTime(dateObj);
    const map = { Jupiter: 'Jupiter', Saturn: 'Saturn', Uranus: 'Uranus', Neptune: 'Neptune', Pluto: 'Pluto', Sun: 'Sun', Moon: 'Moon', Venus: 'Venus', Mars: 'Mars' };
    if (key === 'Sun') return norm(A.SunPosition(t).elon);
    if (key === 'Moon') return norm(A.EclipticGeoMoon(t).lon);
    return norm(A.SphereFromVector(A.RotateVector(A.Rotation_EQJ_ECT(t), A.GeoVector(map[key], t, true))).lon);
  }

  function revealCardDescriptions(chapEl) {
    if (!chapEl) return;
    chapEl.querySelectorAll('.syn-stat-box.syn-has-tooltip').forEach((card) => {
      const signBox = card.querySelector('.syn-tooltip-pop .syn-tt-def > div:last-child');
      const def = signBox || card.querySelector('.syn-tooltip-pop .syn-tt-def');
      if (!def || card.querySelector('.syn-exp-revealed')) return;
      const box = document.createElement('div');
      box.className = 'syn-exp-revealed';
      box.innerHTML = signBox ? signBox.outerHTML : `<div style="font-size:0.81rem;line-height:1.58;color:rgba(250,248,245,0.88);margin-top:0.55rem;padding-top:0.5rem;border-top:1px solid rgba(255,255,255,0.08);">${def.innerHTML}</div>`;
      card.appendChild(box);
    });
  }

  function calcCusps(c) {
    if (!c || !c.hasTime || !window.SaturnPlacidus) return null;
    const base = window.SaturnPlacidus.calcPlacidusCusps(c.jd, c.city.lat, c.city.lon);
    if (Math.abs(c.city.lat) < 66.55) return { ...base, sys: 'Placidus' };
    const s0 = Math.floor(base[1] / 30) * 30, ws = { armc: base.armc, eps: base.eps, lat: c.city.lat, sys: 'Whole Sign (strefa polarna)' };
    for (let h = 1; h <= 12; h++) ws[h] = norm(s0 + (h - 1) * 30);
    return ws;
  }

  function getHouse(lon, cusps) {
    if (!cusps) return 1;
    if (cusps.sys.startsWith('Whole Sign')) return Math.floor(norm(lon - cusps[1]) / 30) + 1;
    return window.SaturnPlacidus.getPlanetHousePlacidus(lon, cusps, cusps.lat, cusps.armc, cusps.eps);
  }

  function calcOuterAspects(d, dos, utcA, utcB) {
    const ED = window.__SYN_EXPAND_DATA__, pers = ['sun', 'moon', 'mercury', 'venus', 'mars'];
    const pLab = { sun: 'Słońce', moon: 'Księżyc', mercury: 'Merkury', venus: 'Wenus', mars: 'Mars' };
    const outA = { uranus: getLon('Uranus', utcA), neptune: getLon('Neptune', utcA) };
    const outB = { uranus: getLon('Uranus', utcB), neptune: getLon('Neptune', utcB) };
    const ASPS = [
      { n: 'Koniunkcja', s: '☌', deg: 0, tone: 'intense', col: '#C9A96E' }, { n: 'Trygon', s: '△', deg: 120, tone: 'harmony', col: '#34D399' },
      { n: 'Sekstyl', s: '⚹', deg: 60, tone: 'harmony', col: '#34D399' }, { n: 'Kwadratura', s: '□', deg: 90, tone: 'friction', col: '#FB7185' },
      { n: 'Opozycja', s: '☍', deg: 180, tone: 'polar', col: '#F59E0B' }
    ];
    const hits = [], scan = (oName, oSym, oLon, persPos, oSide, pSide) => pers.forEach((pk) => {
      const sp = sep(oLon, persPos[pk].lon);
      ASPS.forEach((a) => {
        const orb = Math.abs(sp - a.deg);
        if (orb > 5.0) return;
        const pairKey = [oName === 'Uran' ? 'uranus' : 'neptune', pk].sort().join('-');
        const txt = ED.OUTER_PAIRS[pairKey] ? (a.tone === 'harmony' || a.tone === 'intense' ? ED.OUTER_PAIRS[pairKey].h : ED.OUTER_PAIRS[pairKey].c) : 'Wyraźny impuls zmiany lub wysokie oczekiwania w tym kontakcie.';
        hits.push({ oSide, oSym, oName, pSide, pLabel: pLab[pk], sign: persPos[pk].name, asp: a, orb, txt });
      });
    });
    scan('Uran', '♅', outA.uranus, dos.posB, d.nameA, d.nameB); scan('Uran', '♅', outB.uranus, dos.posA, d.nameB, d.nameA);
    scan('Neptun', '♆', outA.neptune, dos.posB, d.nameA, d.nameB); scan('Neptun', '♆', outB.neptune, dos.posA, d.nameB, d.nameA);
    return hits.sort((x, y) => x.orb - y.orb).slice(0, 8);
  }

  function calcTransits12M(dos) {
    const cTargets = [{ k: 'sun', l: 'Słońce', lon: dos.compSun.lon }, { k: 'moon', l: 'Księżyc', lon: dos.compMoon.lon }, { k: 'venus', l: 'Wenus', lon: dos.compVen.lon }, { k: 'mars', l: 'Mars', lon: dos.compMar.lon }];
    const trs = [{ k: 'Jupiter', tk: 'jupiter', l: 'Jowisz' }, { k: 'Saturn', tk: 'saturn', l: 'Saturn' }, { k: 'Uranus', tk: 'uranus', l: 'Uran' }, { k: 'Pluto', tk: 'pluto', l: 'Pluton' }];
    const ASPS = [{ n: 'Koniunkcja', s: '☌', deg: 0, tone: 'intense' }, { n: 'Trygon', s: '△', deg: 120, tone: 'harmony' }, { n: 'Sekstyl', s: '⚹', deg: 60, tone: 'harmony' }, { n: 'Kwadratura', s: '□', deg: 90, tone: 'friction' }, { n: 'Opozycja', s: '☍', deg: 180, tone: 'polar' }];
    const now = Date.now(), best = new Map();
    for (let i = 0; i <= 36; i++) {
      const dt = new Date(now + i * 10 * 86400000);
      trs.forEach((tr) => {
        const tLon = getLon(tr.k, dt);
        cTargets.forEach((ct) => {
          const sp = sep(tLon, ct.lon);
          ASPS.forEach((a) => {
            const orb = Math.abs(sp - a.deg);
            if (orb > 2.2) return;
            const id = `${tr.tk}|${ct.k}|${a.n}`, cur = best.get(id), rawMo = dt.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
            if (!cur || orb < cur.orb) best.set(id, { tKey: tr.tk, tLabel: tr.l, cKey: ct.k, cLabel: ct.l, aspect: a.n, sym: a.s, tone: a.tone, orb, dt, month: rawMo.charAt(0).toUpperCase() + rawMo.slice(1) });
          });
        });
      });
    }
    return Array.from(best.values()).sort((a, b) => a.dt - b.dt).slice(0, 6);
  }

  function enhanceUnlocked(d, dos) {
    const ED = window.__SYN_EXPAND_DATA__, U = window.__SYNASTRY_DEEP_UTILS__, M = window.SynPlMorphology, C = window.SynNlgComposer;
    const dossier = document.getElementById('syn-locked-dossier');
    if (!dossier || !ED || !U || !window.Astronomy) return;
    const chaps = dossier.querySelectorAll('.syn-report-chapter');
    const nA = esc(d.nameA), nB = esc(d.nameB), houseHits = new Set();
    const gA = M ? M.inferGender(d.nameA, d.genderA) : d.genderA, gB = M ? M.inferGender(d.nameB, d.genderB) : d.genderB;
    const both = M ? M.pairBoth(gA, gB) : 'oboje';
    const utcA = new Date((d.cA.jd - 2440587.5) * 86400000), utcB = new Date((d.cB.jd - 2440587.5) * 86400000);

    const outerHits = calcOuterAspects(d, dos, utcA, utcB);
    if (chaps[0]) {
      const rows = outerHits.length ? outerHits.map((h) => `<tr><td data-label="Planeta:"><strong>${esc(h.oSide)}:</strong> ${h.oSym} ${h.oName}</td><td data-label="Aspekt:" style="color:${h.asp.col};font-family:'JetBrains Mono',monospace;font-weight:600;">${h.asp.s} ${h.asp.n} (${h.orb.toFixed(1)}&deg;)</td><td data-label="Partner:"><strong>${esc(h.pSide)}:</strong> ${h.pLabel} (${h.sign})</td><td data-label="Wpływ:" style="font-size:0.8rem;opacity:0.88;">${h.txt}</td></tr>`).join('') : '<tr><td colspan="4">Brak ścisłych aspektów Urana i Neptuna poniżej 5&deg; — relacja bez nagłych zwrotów z Urana i bez złudzeń typowych dla silnego Neptuna.</td></tr>';
      const br = C ? C.buildPolarityBridge(d, dos) : { hasParadox: false, bridgeSentence: '' };
      const contra = br.hasParadox ? br.bridgeSentence : `Chemia oraz poczucie bezpieczeństwa układają się tu równo. Zgrzyty biorą się głównie z różnego tempa działania, a nie z braku dobrej woli — im szybciej ${both} nazywacie potrzeby wprost, tym spokojniej mija tydzień.`;
      chaps[0].insertAdjacentHTML('beforeend', `<div style="margin-top:1.25rem;"><div class="syn-card-tag" style="color:#C9A96E;margin-bottom:0.5rem;">♅ URAN I ♆ NEPTUN — WOLNOŚĆ, ZMIANA I ZŁUDZENIA</div><div class="syn-table-wrap"><table class="syn-table"><thead><tr><th>Planeta zewnętrzna</th><th>Aspekt &amp; Orb</th><th>Planeta osobista</th><th>Psychologia kontaktu</th></tr></thead><tbody>${rows}</tbody></table></div><div class="syn-stat-box" style="margin-top:1rem;"><div class="syn-card-tag">SYNTEZA SPRZECZNOŚCI</div><p style="font-size:0.86rem;line-height:1.6;margin:0.35rem 0 0;">${contra}</p></div></div>`);
    }

    revealCardDescriptions(chaps[1]); revealCardDescriptions(chaps[2]);
    if (chaps[1]) {
      const compSat = U.formatPos(U.shortArcMidpoint(dos.posA.saturn.lon, dos.posB.saturn.lon));
      const toV = (c) => { const la = c.city.lat * Math.PI / 180, lo = c.city.lon * Math.PI / 180; return [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)]; };
      const [ax, ay, az] = toV(d.cA), [bx, by, bz] = toV(d.cB), sx = ax + bx, sy = ay + by, sz = az + bz, len = Math.hypot(sx, sy, sz) || 1;
      const dLat = Math.asin(Math.max(-1, Math.min(1, sz / len))) * 180 / Math.PI, dLon = Math.atan2(sy, sx) * 180 / Math.PI;
      const davDt = new Date((utcA.getTime() + utcB.getTime()) / 2);
      const dSun = U.formatPos(getLon('Sun', davDt)), dMoon = U.formatPos(getLon('Moon', davDt)), dVen = U.formatPos(getLon('Venus', davDt));
      const davDesc = `Wspólny środek czasu łączy Słońce w znaku ${dSun.gen} oraz Księżyc w znaku ${dMoon.gen}. W praktyce daje to klimat związku, w którym na zewnątrz pokazujecie siłę żywiołu ${M ? M.elemGen(dSun.element) : dSun.element}, a w domu ładujecie baterie przez żywioł ${M ? M.elemGen(dMoon.element) : dMoon.element}.`;
      chaps[1].insertAdjacentHTML('beforeend', `<div class="syn-grid-2" style="margin-top:1rem;margin-bottom:0;"><div class="syn-stat-box"><div class="syn-card-tag">♄ SATURN KOMPOZYTOWY (${compSat.name} ${compSat.formatted})</div><p style="font-size:0.84rem;line-height:1.6;margin:0.35rem 0 0;">${ED.COMP_SATURN[compSat.element] || ''}</p></div><div class="syn-stat-box"><div class="syn-card-tag">HOROSKOP DAVISONA 3D (${Math.abs(dLat).toFixed(1)}&deg;${dLat >= 0 ? 'N' : 'S'}, ${Math.abs(dLon).toFixed(1)}&deg;${dLon >= 0 ? 'E' : 'W'})</div><div class="syn-mono-meta" style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:#C9A96E;margin-top:0.35rem;">Środek czasu (${dos.davisonDate}): ☉ ${dSun.name} (${dSun.formatted}) &bull; ☽ ${dMoon.name} (${dMoon.formatted}) &bull; ♀ ${dVen.name} (${dVen.formatted})</div><p style="font-size:0.84rem;line-height:1.6;margin:0.45rem 0 0;">${davDesc}</p></div></div>`);
    }

    if (chaps[4]) {
      const cuA = calcCusps(d.cA), cuB = calcCusps(d.cB), tbody = chaps[4].querySelector('tbody');
      const keys = [{ k: 'sun', l: 'Słońce', g: '☉' }, { k: 'moon', l: 'Księżyc', g: '☽' }, { k: 'venus', l: 'Wenus', g: '♀' }, { k: 'mars', l: 'Mars', g: '♂' }, { k: 'lilith', l: 'Lilith', g: '⚸' }];
      if (tbody && (cuA || cuB)) {
        const ovRows = [], addOv = (guest, owner, gPos, cusps) => keys.forEach((b) => {
          const h = getHouse(gPos[b.k].lon, cusps); houseHits.add(h);
          ovRows.push(`<tr><td data-label="Planeta:"><strong>${esc(guest)}:</strong> ${b.g} ${b.l} (${gPos[b.k].name})</td><td data-label="W Domu:" style="color:#C9A96E;font-family:'JetBrains Mono',monospace;font-weight:700;">${h}. DOM <span style="font-size:0.7rem;opacity:0.7;">(${cusps.sys})</span></td><td data-label="W horoskopie:"><strong>${esc(owner)}</strong></td><td data-label="Wpływ:" style="font-size:0.81rem;opacity:0.9;">${ED.getPlanetHouseText(b.k, h)}</td></tr>`);
        });
        if (cuA) addOv(d.nameB, d.nameA, dos.posB, cuA); if (cuB) addOv(d.nameA, d.nameB, dos.posA, cuB);
        tbody.innerHTML = ovRows.join('');
      }
      let pA = 50, pB = 50;
      dos.fullAspects.forEach((a) => { if (['moon', 'venus'].includes(a.bB.key) && ['sun', 'mars', 'saturn', 'pluto'].includes(a.bA.key)) pA += 4; if (['moon', 'venus'].includes(a.bA.key) && ['sun', 'mars', 'saturn', 'pluto'].includes(a.bB.key)) pB += 4; });
      const pctA = Math.round((pA / (pA + pB)) * 100), pctB = 100 - pctA;
      const msaTxt = Math.abs(pctA - pctB) <= 8 ? `Równowaga zaangażowania — ${both} wnosicie do tej relacji podobną ilość inicjatywy i uwagi.` : (pctA > pctB ? `${nA} częściej nadaje kierunek zmianom w relacji, a ${nB} głębiej je przeżywa i reaguje na nie emocjonalnie.` : `${nB} częściej nadaje kierunek zmianom w relacji, a ${nA} głębiej je przeżywa i reaguje na nie emocjonalnie.`);
      chaps[4].insertAdjacentHTML('beforeend', `<div class="syn-stat-box" style="margin-top:1rem;"><div class="syn-card-tag">ASYMETRIA ZAANGAŻOWANIA (MSA): ${nA} ${pctA}% &harr; ${nB} ${pctB}%</div><div style="display:flex;height:8px;border-radius:999px;overflow:hidden;margin:8px 0;background:rgba(255,255,255,0.08);"><div style="width:${pctA}%;background:#C9A96E;"></div><div style="width:${pctB}%;background:rgba(250,248,245,0.45);"></div></div><p style="font-size:0.84rem;line-height:1.58;margin:0;">${msaTxt}</p></div>`);
    }

    if (chaps[5]) {
      const cards = chaps[5].querySelectorAll('.syn-stat-box');
      const applyScript = (card, moonEl, marsEl) => {
        if (!card) return;
        const p2 = card.querySelectorAll('p')[1];
        const disarm = ED.DISARM[moonEl] || ED.DISARM.Ziemia, trigs = ED.TRIGGERS[marsEl] || ED.TRIGGERS.Powietrze;
        if (p2) p2.outerHTML = `<div style="font-size:0.81rem;line-height:1.56;margin-top:0.55rem;border-top:1px solid rgba(255,255,255,0.08);padding-top:0.5rem;"><strong style="color:#34D399;">3 zdania rozbrajające:</strong><br>&bull; ${disarm.join('<br>&bull; ')}<br><br><strong style="color:#FB7185;">3 zapalniki do unikania:</strong><br>&bull; ${trigs.join('<br>&bull; ')}</div>`;
      };
      applyScript(cards[0], dos.posA.moon.element, dos.posA.mars.element);
      applyScript(cards[1], dos.posB.moon.element, dos.posB.mars.element);
    }

    if (chaps[6]) {
      const ms = ED.getSaturnMilestones(dos.saturnFinal, dos.posA.saturn.name, dos.posB.saturn.name, dos.karmaHits), trs = calcTransits12M(dos);
      const trHtml = trs.length ? trs.map((w) => `<div style="margin-bottom:6px;"><strong style="color:${(w.tone === 'harmony' || w.tone === 'intense') ? '#34D399' : '#FB7185'};">${w.month} (${w.orb.toFixed(1)}&deg;):</strong> ${ED.getTransitNote(w)}</div>`).join('') : 'Brak ścisłych tranzytów wolnych planet do Waszego Kompozytu w ciągu 12 miesięcy — spokojny rok budowania wspólnych rytuałów.';
      chaps[6].insertAdjacentHTML('beforeend', `<div class="syn-grid-2" style="margin-top:1rem;margin-bottom:0;"><div class="syn-stat-box"><div class="syn-card-tag">TEST CZASU SATURNA (ROK 1 / 3 / 7)</div><div style="font-size:0.83rem;line-height:1.6;margin-top:0.4rem;">&bull; ${ms.join('<br>&bull; ')}</div></div><div class="syn-stat-box"><div class="syn-card-tag">KLIMAT RELACJI NA 12 MIESIĘCY (TRANZYTY DO KOMPOZYTU)</div><div style="font-size:0.83rem;line-height:1.58;margin-top:0.4rem;">${trHtml}</div></div></div>`);
    }

    if (chaps[7]) {
      const gCards = chaps[7].querySelectorAll('.syn-stat-box');
      if (gCards[0]) gCards[0].insertAdjacentHTML('beforeend', `<p style="font-size:0.81rem;color:#C9A96E;margin-top:0.55rem;padding-top:0.45rem;border-top:1px solid rgba(255,255,255,0.08);"><strong>Rytuał bliskości:</strong> ${ED.getCoupleRitual(dos.posB.venus.idx, dos.posB.moon.element)}</p>`);
      if (gCards[1]) gCards[1].insertAdjacentHTML('beforeend', `<p style="font-size:0.81rem;color:#C9A96E;margin-top:0.55rem;padding-top:0.45rem;border-top:1px solid rgba(255,255,255,0.08);"><strong>Rytuał bliskości:</strong> ${ED.getCoupleRitual(dos.posA.venus.idx, dos.posA.moon.element)}</p>`);
    }
    if (window.__SYN_EXPAND_LIFE_UI__) window.__SYN_EXPAND_LIFE_UI__.renderUnlockedLife(d, dos, houseHits);
  }

  function applyPriceCopy(root) {
    if (!root) return;
    const btn = document.getElementById('syn-paywall-checkout-btn');
    if (btn) btn.innerHTML = btn.innerHTML.replace(/(?:39|69)\s*PLN/g, '53 zł');
    const cta = document.getElementById('syn-loss-modal-cta');
    if (cta) cta.innerHTML = cta.innerHTML.replace(/(?:39|69)\s*PLN/g, '53 zł');
  }

  function installHook() {
    if (typeof window.__SYNASTRY_REPORT_MOUNT__ !== 'function' || window.__SYN_EXPAND_HOOKED__) return;
    const origMount = window.__SYNASTRY_REPORT_MOUNT__;
    window.__SYN_EXPAND_HOOKED__ = true;
    window.__SYNASTRY_REPORT_MOUNT__ = function (mountEl, d, forceUnlock = false) {
      origMount(mountEl, d, forceUnlock);
      const sec = document.getElementById('syn-dossier-section');
      const isUnl = Boolean(sec && sec.classList.contains('is-unlocked'));
      applyPriceCopy(mountEl);
      if (window.__SYNASTRY_BUILD_DOSSIER__) {
        const safeD = { ...d, nameA: esc(d.nameA), nameB: esc(d.nameB) };
        const dos = window.__SYNASTRY_BUILD_DOSSIER__(safeD);
        if (window.__SYN_EXPAND_PANELS__) window.__SYN_EXPAND_PANELS__.enhance(d, dos, isUnl);
        if (window.__SYN_EXPAND_LIFE_UI__) window.__SYN_EXPAND_LIFE_UI__.renderTopMaturity(d, dos);
        if (isUnl) enhanceUnlocked(d, dos);
      }
    };
  }
  installHook();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installHook);
})();
