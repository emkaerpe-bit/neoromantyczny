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
    const isPolar = Math.abs(c.city.lat) >= 66.55;
    if (!isPolar) return { ...base, sys: 'Placidus' };
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
      { n: 'Koniunkcja', s: '☌', deg: 0, tone: 'intense', col: '#C9A96E' },
      { n: 'Trygon', s: '△', deg: 120, tone: 'harmony', col: '#34D399' },
      { n: 'Sekstyl', s: '⚹', deg: 60, tone: 'harmony', col: '#34D399' },
      { n: 'Kwadratura', s: '□', deg: 90, tone: 'friction', col: '#FB7185' },
      { n: 'Opozycja', s: '☍', deg: 180, tone: 'polar', col: '#F59E0B' }
    ];
    const hits = [], scan = (oName, oSym, oLon, persPos, oSide, pSide) => pers.forEach((pk) => {
      const sp = sep(oLon, persPos[pk].lon);
      ASPS.forEach((a) => {
        const orb = Math.abs(sp - a.deg);
        if (orb > 5.0) return;
        const oKey = oName === 'Uran' ? 'uranus' : 'neptune';
        const pairKey = [oKey, pk].sort().join('-');
        const txt = ED.OUTER_PAIRS[pairKey] ? (a.tone === 'harmony' || a.tone === 'intense' ? ED.OUTER_PAIRS[pairKey].h : ED.OUTER_PAIRS[pairKey].c) : 'Wyraźny impuls zmiany lub silne emocjonalne oczekiwania w tym kontakcie.';
        hits.push({ oSide, oSym, oName, pSide, pLabel: pLab[pk], sign: persPos[pk].name, asp: a, orb, txt });
      });
    });
    scan('Uran', '♅', outA.uranus, dos.posB, d.nameA, d.nameB);
    scan('Uran', '♅', outB.uranus, dos.posA, d.nameB, d.nameA);
    scan('Neptun', '♆', outA.neptune, dos.posB, d.nameA, d.nameB);
    scan('Neptun', '♆', outB.neptune, dos.posA, d.nameB, d.nameA);
    return hits.sort((x, y) => x.orb - y.orb).slice(0, 8);
  }

  function calcTransits12M(dos) {
    const cTargets = [
      { k: 'sun', l: 'Słońce', lon: dos.compSun.lon }, { k: 'moon', l: 'Księżyc', lon: dos.compMoon.lon },
      { k: 'venus', l: 'Wenus', lon: dos.compVen.lon }, { k: 'mars', l: 'Mars', lon: dos.compMar.lon }
    ];
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
            const id = `${tr.tk}|${ct.k}|${a.n}`, cur = best.get(id);
            const rawMo = dt.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
            const mo = rawMo.charAt(0).toUpperCase() + rawMo.slice(1);
            if (!cur || orb < cur.orb) best.set(id, { tKey: tr.tk, tLabel: tr.l, cKey: ct.k, cLabel: ct.l, aspect: a.n, sym: a.s, tone: a.tone, orb, dt, month: mo });
          });
        });
      });
    }
    return Array.from(best.values()).sort((a, b) => a.dt - b.dt).slice(0, 6);
  }

  function applyPriceCopy(root, isUnlocked) {
    if (!root) return;
    const btn = document.getElementById('syn-paywall-checkout-btn');
    if (btn) btn.innerHTML = btn.innerHTML.replace(/(?:39|69)\s*PLN/g, '67 PLN');
    const cta = document.getElementById('syn-loss-modal-cta');
    if (cta) cta.innerHTML = cta.innerHTML.replace(/(?:39|69)\s*PLN/g, '67 PLN');
    if (isUnlocked) return;
    const gateItems = root.querySelectorAll('#syn-loss-gate .syn-loss-item p');
    if (gateItems.length >= 4) {
      gateItems[0].textContent = '16 głównych kątów + aspekty Urana i Neptuna oraz porównanie 1:1 (rozmowa, działanie, sypialnia)';
      gateItems[1].textContent = 'Pluton × Lilith, Kompozyt, Davison 3D oraz Oś Ebertina 90°';
      gateItems[2].textContent = 'Dokładna siatka Placidus (Planeta × Dom), codzienność (finanse i dom) i Asymetria Zaangażowania';
      gateItems[3].textContent = '3 gotowe zdania na kłótnię, test Saturna 1–3–7 lat, Kalendarz 12M i 5 pytań we dwoje';
    }
  }

  function enhanceUnlocked(d, dos) {
    const ED = window.__SYN_EXPAND_DATA__, U = window.__SYNASTRY_DEEP_UTILS__;
    const dossier = document.getElementById('syn-locked-dossier');
    if (!dossier || !ED || !U || !window.Astronomy) return;
    const chaps = dossier.querySelectorAll('.syn-report-chapter');
    const nA = esc(d.nameA), nB = esc(d.nameB), houseHits = new Set();
    const utcA = new Date((d.cA.jd - 2440587.5) * 86400000), utcB = new Date((d.cB.jd - 2440587.5) * 86400000);

    // Ch II (chaps[0]): Uranus/Neptune + Contradictions
    const outerHits = calcOuterAspects(d, dos, utcA, utcB);
    if (chaps[0]) {
      const rows = outerHits.length ? outerHits.map((h) => `<tr><td data-label="Planeta:"><strong>${esc(h.oSide)}:</strong> ${h.oSym} ${h.oName}</td><td data-label="Aspekt:" style="color:${h.asp.col};font-family:'JetBrains Mono',monospace;font-weight:600;">${h.asp.s} ${h.asp.n} (${h.orb.toFixed(1)}&deg;)</td><td data-label="Partner:"><strong>${esc(h.pSide)}:</strong> ${h.pLabel} (${h.sign})</td><td data-label="Wpływ:" style="font-size:0.8rem;opacity:0.88;">${h.txt}</td></tr>`).join('') : '<tr><td colspan="4">Brak ścisłych aspektów Urana i Neptuna poniżej 5&deg; — relacja bez gwałtownych zwrotów z Urana i bez złudzeń typowych dla silnego Neptuna.</td></tr>';
      const contra = (d.syn.chemistry >= 70 && d.syn.friction >= 55)
        ? `Wysokiej chemii (${d.syn.chemistry}%) towarzyszy tu wyraźne tarcie (${d.syn.friction}%). To mocny związek: namiętność idzie w parze z ostrymi starciami, więc potrzebujecie jasnych granic w kłótni.`
        : (d.syn.security >= 70
          ? `Silne bezpieczeństwo (${d.syn.security}%) przeważa nad tarciem (${d.syn.friction}%). Więź ma spokojny grunt, choć czasem trzeba świadomie podkręcać w niej spontaniczność.`
          : `Chemia (${d.syn.chemistry}%) i bezpieczeństwo (${d.syn.security}%) układają się równo — codzienne spięcia biorą się głównie z innego tempa działania.`);
      chaps[0].insertAdjacentHTML('beforeend', `<div style="margin-top:1.25rem;"><div class="syn-card-tag" style="color:#C9A96E;margin-bottom:0.5rem;">♅ URAN I ♆ NEPTUN — WOLNOŚĆ, ZMIANA I ZŁUDZENIA</div><div class="syn-table-wrap"><table class="syn-table"><thead><tr><th>Planeta zewnętrzna</th><th>Aspekt &amp; Orb</th><th>Planeta osobista</th><th>Psychologia kontaktu</th></tr></thead><tbody>${rows}</tbody></table></div><div class="syn-stat-box" style="margin-top:1rem;"><div class="syn-card-tag">SYNTEZA SPRZECZNOŚCI</div><p style="font-size:0.86rem;line-height:1.6;margin:0.35rem 0 0;">${contra}</p></div></div>`);
    }

    // Ch III (chaps[1]) & Ch IV (chaps[2]): reveal tooltips + Composite Saturn + Davison 3D
    revealCardDescriptions(chaps[1]);
    revealCardDescriptions(chaps[2]);
    if (chaps[1]) {
      const compSat = U.formatPos(U.shortArcMidpoint(dos.posA.saturn.lon, dos.posB.saturn.lon));
      const toV = (c) => { const la = c.city.lat * Math.PI / 180, lo = c.city.lon * Math.PI / 180; return [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)]; };
      const [ax, ay, az] = toV(d.cA), [bx, by, bz] = toV(d.cB), sx = ax + bx, sy = ay + by, sz = az + bz, len = Math.hypot(sx, sy, sz) || 1;
      const dLat = Math.asin(Math.max(-1, Math.min(1, sz / len))) * 180 / Math.PI, dLon = Math.atan2(sy, sx) * 180 / Math.PI;
      const davDt = new Date((utcA.getTime() + utcB.getTime()) / 2);
      const dSun = U.formatPos(getLon('Sun', davDt)), dMoon = U.formatPos(getLon('Moon', davDt)), dVen = U.formatPos(getLon('Venus', davDt));
      chaps[1].insertAdjacentHTML('beforeend', `<div class="syn-grid-2" style="margin-top:1rem;margin-bottom:0;"><div class="syn-stat-box"><div class="syn-card-tag">♄ SATURN KOMPOZYTOWY (${compSat.name} ${compSat.formatted})</div><p style="font-size:0.84rem;line-height:1.6;margin:0.35rem 0 0;">${ED.COMP_SATURN[compSat.element] || ''}</p></div><div class="syn-stat-box"><div class="syn-card-tag">HOROSKOP DAVISONA 3D (${Math.abs(dLat).toFixed(1)}&deg;${dLat >= 0 ? 'N' : 'S'}, ${Math.abs(dLon).toFixed(1)}&deg;${dLon >= 0 ? 'E' : 'W'})</div><p style="font-size:0.84rem;line-height:1.6;margin:0.35rem 0 0;">Środek czasu (${dos.davisonDate}): Słońce w znaku ${dSun.gen} (${dSun.formatted}) &bull; Księżyc w znaku ${dMoon.gen} (${dMoon.formatted}) &bull; Wenus w znaku ${dVen.gen} (${dVen.formatted}).</p></div></div>`);
    }

    // Ch IV-C (chaps[4]): Placidus Planet×House + MSA Asymmetry
    if (chaps[4]) {
      const cuA = calcCusps(d.cA), cuB = calcCusps(d.cB), tbody = chaps[4].querySelector('tbody');
      const keys = [{ k: 'sun', l: 'Słońce', g: '☉' }, { k: 'moon', l: 'Księżyc', g: '☽' }, { k: 'venus', l: 'Wenus', g: '♀' }, { k: 'mars', l: 'Mars', g: '♂' }, { k: 'lilith', l: 'Lilith', g: '⚸' }];
      if (tbody && (cuA || cuB)) {
        const ovRows = [], addOv = (guest, owner, gPos, cusps) => keys.forEach((b) => {
          const h = getHouse(gPos[b.k].lon, cusps);
          houseHits.add(h);
          ovRows.push(`<tr><td data-label="Planeta:"><strong>${esc(guest)}:</strong> ${b.g} ${b.l} (${gPos[b.k].name})</td><td data-label="W Domu:" style="color:#C9A96E;font-family:'JetBrains Mono',monospace;font-weight:700;">${h}. DOM <span style="font-size:0.7rem;opacity:0.7;">(${cusps.sys})</span></td><td data-label="W horoskopie:"><strong>${esc(owner)}</strong></td><td data-label="Wpływ:" style="font-size:0.81rem;opacity:0.9;">${ED.getPlanetHouseText(b.k, h)}</td></tr>`);
        });
        if (cuA) addOv(d.nameB, d.nameA, dos.posB, cuA);
        if (cuB) addOv(d.nameA, d.nameB, dos.posA, cuB);
        tbody.innerHTML = ovRows.join('');
      }
      let pA = 50, pB = 50;
      dos.fullAspects.forEach((a) => {
        if (['moon', 'venus'].includes(a.bB.key) && ['sun', 'mars', 'saturn', 'pluto'].includes(a.bA.key)) pA += 4;
        if (['moon', 'venus'].includes(a.bA.key) && ['sun', 'mars', 'saturn', 'pluto'].includes(a.bB.key)) pB += 4;
      });
      const pctA = Math.round((pA / (pA + pB)) * 100), pctB = 100 - pctA;
      const msaTxt = Math.abs(pctA - pctB) <= 8
        ? 'Równowaga zaangażowania — oboje wnosicie do tej relacji podobną ilość inicjatywy i emocji.'
        : (pctA > pctB
          ? `${nA} częściej nadaje kierunek zmianom w relacji, a ${nB} głębiej je przeżywa i reaguje na nie emocjonalnie.`
          : `${nB} częściej nadaje kierunek zmianom w relacji, a ${nA} głębiej je przeżywa i reaguje na nie emocjonalnie.`);
      chaps[4].insertAdjacentHTML('beforeend', `<div class="syn-stat-box" style="margin-top:1rem;"><div class="syn-card-tag">ASYMETRIA ZAANGAŻOWANIA (MSA): ${nA} ${pctA}% &harr; ${nB} ${pctB}%</div><div style="display:flex;height:8px;border-radius:999px;overflow:hidden;margin:8px 0;background:rgba(255,255,255,0.08);"><div style="width:${pctA}%;background:#C9A96E;"></div><div style="width:${pctB}%;background:rgba(250,248,245,0.45);"></div></div><p style="font-size:0.84rem;line-height:1.58;margin:0;">${msaTxt}</p></div>`);
    }

    // Ch V (chaps[5]): Replace duplicated conflict paragraph with fresh scripts
    if (chaps[5]) {
      const cards = chaps[5].querySelectorAll('.syn-stat-box');
      const applyScript = (card, moonEl, marsEl, name, gender) => {
        if (!card) return;
        const sc = ED.getCrisisScripts(moonEl, marsEl, esc(name), gender);
        const dup = card.querySelectorAll('p')[1];
        if (dup) dup.innerHTML = `<strong style="color:#34D399;">3 zdania rozbrajające:</strong><br>&bull; ${sc.disarm.join('<br>&bull; ')}<br><br><strong style="color:#FB7185;">3 zapalniki do unikania:</strong><br>&bull; ${sc.triggers.join('<br>&bull; ')}`;
      };
      applyScript(cards[0], dos.posA.moon.element, dos.posA.mars.element, d.nameA, d.genderA);
      applyScript(cards[1], dos.posB.moon.element, dos.posB.mars.element, d.nameB, d.genderB);
    }

    // Ch VI (chaps[6]): Year 1/3/7 Milestones + 12-Month Transits to Composite
    if (chaps[6]) {
      const ms = ED.getSaturnMilestones(dos.saturnFinal, dos.posA.saturn.name, dos.posB.saturn.name, dos.karmaHits);
      const trs = calcTransits12M(dos);
      const trHtml = trs.length ? trs.map((w) => `<div style="margin-bottom:6px;"><strong style="color:${(w.tone === 'harmony' || w.tone === 'intense') ? '#34D399' : '#FB7185'};">${w.month} (${w.orb.toFixed(1)}&deg;):</strong> ${ED.getTransitNote(w)}</div>`).join('') : 'Brak ścisłych tranzytów wolnych planet do Waszego Kompozytu w ciągu 12 miesięcy — spokojny rok budowania wspólnych rytuałów.';
      chaps[6].insertAdjacentHTML('beforeend', `<div class="syn-grid-2" style="margin-top:1rem;margin-bottom:0;"><div class="syn-stat-box"><div class="syn-card-tag">TEST CZASU SATURNA (ROK 1 / 3 / 7)</div><div style="font-size:0.83rem;line-height:1.6;margin-top:0.4rem;">&bull; ${ms.join('<br>&bull; ')}</div></div><div class="syn-stat-box"><div class="syn-card-tag">KLIMAT RELACJI NA 12 MIESIĘCY (TRANZYTY DO KOMPOZYTU)</div><div style="font-size:0.83rem;line-height:1.58;margin-top:0.4rem;">${trHtml}</div></div></div>`);
    }

    // Ch VII (chaps[7]): Couple Rituals
    if (chaps[7]) {
      const gCards = chaps[7].querySelectorAll('.syn-stat-box');
      if (gCards[0]) gCards[0].insertAdjacentHTML('beforeend', `<p style="font-size:0.81rem;color:#C9A96E;margin-top:0.55rem;padding-top:0.45rem;border-top:1px solid rgba(255,255,255,0.08);"><strong>Rytuał bliskości:</strong> ${ED.getCoupleRitual(dos.posB.venus.idx, dos.posB.moon.element)}</p>`);
      if (gCards[1]) gCards[1].insertAdjacentHTML('beforeend', `<p style="font-size:0.81rem;color:#C9A96E;margin-top:0.55rem;padding-top:0.45rem;border-top:1px solid rgba(255,255,255,0.08);"><strong>Rytuał bliskości:</strong> ${ED.getCoupleRitual(dos.posA.venus.idx, dos.posA.moon.element)}</p>`);
    }
    if (window.__SYN_EXPAND_LIFE_UI__) window.__SYN_EXPAND_LIFE_UI__.renderUnlockedLife(d, dos, houseHits);
  }

  function installHook() {
    if (typeof window.__SYNASTRY_REPORT_MOUNT__ !== 'function' || window.__SYN_EXPAND_HOOKED__) return;
    const origMount = window.__SYNASTRY_REPORT_MOUNT__;
    window.__SYN_EXPAND_HOOKED__ = true;
    window.__SYNASTRY_REPORT_MOUNT__ = function (mountEl, d, forceUnlock = false) {
      origMount(mountEl, d, forceUnlock);
      const sec = document.getElementById('syn-dossier-section');
      const isUnl = Boolean(sec && sec.classList.contains('is-unlocked'));
      applyPriceCopy(mountEl, isUnl);
      if (window.__SYNASTRY_BUILD_DOSSIER__) {
        const safeD = { ...d, nameA: esc(d.nameA), nameB: esc(d.nameB) };
        const dos = window.__SYNASTRY_BUILD_DOSSIER__(safeD);
        if (window.__SYN_EXPAND_PANELS__) window.__SYN_EXPAND_PANELS__.enhance(d, dos, isUnl);
        if (window.__SYN_EXPAND_POLISH__) window.__SYN_EXPAND_POLISH__.polishAll(d, dos, isUnl);
        if (window.__SYN_EXPAND_LIFE_UI__) window.__SYN_EXPAND_LIFE_UI__.renderTopMaturity(d, dos);
        if (isUnl) enhanceUnlocked(d, dos);
      }
    };
  }

  installHook();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installHook);
})();
