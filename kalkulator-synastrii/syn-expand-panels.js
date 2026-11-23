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

  const AXIS_TIPS = [
    { t: 'Magnetyzm i Chemia (Wenus–Mars)', c: '#C9A96E', d: 'Mierzy siłę fizycznego przyciągania, zmysłową iskrę i napięcie między Wenus, Marsem a Słońcem w obu kosmogramach.' },
    { t: 'Bezpieczeństwo Emocjonalne (Księżyc–Słońce)', c: '#34D399', d: 'Pokazuje zgodność rytmu domowego, intuicyjną czułość oraz to, jak łatwo dajecie sobie spokój i oparcie.' },
    { t: 'Indeks Tarcia i Napięcia (Mars–Księżyc)', c: '#FB7185', d: 'Wskazuje częstotliwość ostrych spięć, różnic tempa reakcji i punktów zapalnych wymagających jasnych granic.' },
    { t: 'Dialog i Zrozumienie (Merkury)', c: '#60A5FA', d: 'Ocenia płynność rozmów, humor oraz zdolność do gaszenia nieporozumień bez cichych dni i złośliwości.' },
    { t: 'Trwałość i Granice (Saturn / Węzły)', c: '#A78BFA', d: 'Sprawdza trwałość więzi po pierwszym zauroczeniu, szacunek dla granic oraz zbieżność Osi Małżeństwa (☉/☽).' }
  ];

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
