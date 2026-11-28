/**
 * NEOROMANTYCZNY — SILNIK PEŁNEGO RAPORTU SYNASTRII, KOMPOZYTU I KOSMOBIOLOGII EBERTINA
 * Architektura Ground Truth: Efemerydy JPL/Meeus, Midpointy Krótkiego Łuku, Tarcza 90°, Davison & Paywall CRO
 */
(function () {
  const _neoEsc = (x) => String(x || "").replace(/[&<>"']/g, (m) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;
  const ZODIAC_NAMES = ['Baran','Byk','Bliźnięta','Rak','Lew','Panna','Waga','Skorpion','Strzelec','Koziorożec','Wodnik','Ryby'];
  const ZODIAC_GEN = ['Barana','Byka','Bliźniąt','Raka','Lwa','Panny','Wagi','Skorpiona','Strzelca','Koziorożca','Wodnika','Ryb'];
  const ZODIAC_GLYPHS = ["<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 8.5 13.5 C 7.5 8.5, 14 7.5, 16 14.5 L 16 25 M 23.5 13.5 C 24.5 8.5, 18 7.5, 16 14.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><circle cx=\"16\" cy=\"19\" r=\"5.2\"/><path d=\"M 8.5 9.5 C 10.5 14, 21.5 14, 23.5 9.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 8.5 9 C 12.5 11.2, 19.5 11.2, 23.5 9 M 8.5 23 C 12.5 20.8, 19.5 20.8, 23.5 23 M 12.8 10.3 L 12.8 21.7 M 19.2 10.3 L 19.2 21.7\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><circle cx=\"10.2\" cy=\"13.5\" r=\"3.2\"/><circle cx=\"21.8\" cy=\"18.5\" r=\"3.2\"/><path d=\"M 7.5 11.7 C 11 7.6, 19.5 7.6, 25 11 M 24.5 20.3 C 21 24.4, 12.5 24.4, 7 21\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><circle cx=\"10.5\" cy=\"18.5\" r=\"3\"/><path d=\"M 12.8 16.2 C 11.5 9.5, 19.5 7.5, 20.5 13.5 C 21.2 17.5, 18.5 22, 22 22.5 C 23.5 22.7, 24.5 21.5, 24.5 20.2\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20.5 C 18.4 23.5, 21 24.5, 23 23 M 18.4 15 C 21.5 12.5, 24.5 14.5, 22.5 18.5 C 21 21, 17.5 22.5, 15.8 24\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 18.5 L 12.2 18.5 A 4.8 4.8 0 1 1 19.8 18.5 L 24.5 18.5 M 7.5 22.5 L 24.5 22.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20 C 18.4 23, 21.5 23, 24 19.5 M 21.2 19.2 L 24.2 19.2 L 24.2 22.2\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 8.5 23.5 L 23.5 8.5 M 16.5 8.5 L 23.5 8.5 L 23.5 15.5 M 11.5 14.5 L 17.5 20.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 11.5 L 10 10 L 13.2 20.5 L 16.8 11.5 C 18 9, 21.5 9.5, 21.5 13.5 C 21.5 18, 24.2 21, 21 23.5 C 18.5 25, 16.2 23, 17.2 20.5 C 18.2 18.5, 21.5 18.8, 24 21\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 14.5 L 10.5 11.5 L 13.2 14.5 L 16 11.5 L 18.8 14.5 L 21.5 11.5 L 24.5 14.5 M 7.5 20.5 L 10.5 17.5 L 13.2 20.5 L 16 17.5 L 18.8 20.5 L 21.5 17.5 L 24.5 20.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 10 8.5 C 14.5 12.5, 14.5 19.5, 10 23.5 M 22 8.5 C 17.5 12.5, 17.5 19.5, 22 23.5 M 7.5 16 L 24.5 16\"/></svg>"];
  const ELEMENTS = ['Ogień','Ziemia','Powietrze','Woda'];
  const MODALITIES = ['Kardynalna','Stała','Zmienna'];
  const RULERS = ['Mars','Wenus','Merkury','Księżyc','Słońce','Merkury','Wenus','Pluton (Mars)','Jowisz','Saturn','Uran (Saturn)','Neptun (Jowisz)'];

  function norm360(d) { return ((d % 360) + 360) % 360; }

  function solveKepler(M_deg, e) {
    let Mk = norm360(M_deg) * DEG;
    let E = Mk;
    for (let i = 0; i < 7; i++) E = E - (E - e * Math.sin(E) - Mk) / (1 - e * Math.cos(E));
    return E;
  }

  function helioXY(a, e, I, L, wbar, Omega) {
    const w = (wbar - Omega) * DEG, Om = Omega * DEG, inc = I * DEG;
    const E = solveKepler(L - wbar, e);
    const xv = a * (Math.cos(E) - e);
    const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
    const x = (Math.cos(w) * Math.cos(Om) - Math.sin(w) * Math.sin(Om) * Math.cos(inc)) * xv
            + (-Math.sin(w) * Math.cos(Om) - Math.cos(w) * Math.sin(Om) * Math.cos(inc)) * yv;
    const y = (Math.cos(w) * Math.sin(Om) + Math.sin(w) * Math.cos(Om) * Math.cos(inc)) * xv
            + (-Math.sin(w) * Math.sin(Om) + Math.cos(w) * Math.cos(Om) * Math.cos(inc)) * yv;
    return { x, y };
  }

  function calcExtendedBodies(dateStr, timeStr, baseChart) {
    let jd = baseChart && baseChart.jd;
    if (!jd) {
      const [y, m, d] = dateStr.split('-').map(Number);
      const hasTime = Boolean(timeStr && timeStr.includes(':'));
      const [hh, mm] = hasTime ? timeStr.split(':').map(Number) : [12, 0];
      const tzOffset = (m >= 4 && m <= 10) ? 2 : 1;
      const utcDate = new Date(Date.UTC(y, m - 1, d, hh - tzOffset, mm, 0));
      jd = utcDate.getTime() / 86400000 + 2440587.5;
    }
    const T = (jd - 2451545.0) / 36525.0;

    const earthH = helioXY(1.00000261 + 0.00000562 * T, 0.01671123 - 0.00004392 * T, -0.00001531 - 0.01294668 * T, 100.46457166 + 35999.37244981 * T, 102.93768193 + 0.32327364 * T, 0.0);
    const mercH  = helioXY(0.38709927 + 0.00000037 * T, 0.20563593 + 0.00001906 * T, 7.00497902 - 0.00594749 * T, 252.25032350 + 149472.67411175 * T, 77.45779628 + 0.16047689 * T, 48.33076593 - 0.12534081 * T);
    const jupH   = helioXY(5.20288700 - 0.00011607 * T, 0.04838624 - 0.00013253 * T, 1.30439695 - 0.00183714 * T, 34.39644051 + 3034.74612775 * T, 14.72847983 + 0.21252668 * T, 100.47390909 + 0.20469106 * T);
    const satH   = helioXY(9.53667594 - 0.00125060 * T, 0.05386179 - 0.00050991 * T, 2.48599187 + 0.00193609 * T, 49.95424423 + 1222.49362201 * T, 92.59887831 - 0.41897216 * T, 113.66242448 - 0.28867794 * T);
    const plutoH = helioXY(39.48211675 - 0.00031596 * T, 0.24882730 + 0.00005170 * T, 17.14001206 + 0.00004818 * T, 238.92903833 + 145.20780515 * T, 224.06891629 - 0.04062942 * T, 110.30393684 - 0.01183482 * T);

    const mercury = norm360(Math.atan2(mercH.y - earthH.y, mercH.x - earthH.x) * RAD);
    const jupiter = norm360(Math.atan2(jupH.y - earthH.y, jupH.x - earthH.x) * RAD);
    const saturn  = norm360(Math.atan2(satH.y - earthH.y, satH.x - earthH.x) * RAD);
    const pluto   = norm360(Math.atan2(plutoH.y - earthH.y, plutoH.x - earthH.x) * RAD);
    const node    = norm360(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
    const lilith  = norm360(83.3532465 + 180.0 + 4069.0137287 * T - 0.0103200 * T * T);

    return {
      jd,
      sun: baseChart.sun,
      moon: baseChart.moon,
      mercury,
      venus: baseChart.venus,
      mars: baseChart.mars,
      jupiter,
      saturn,
      pluto,
      lilith,
      node,
      asc: baseChart.asc,
      hasTime: baseChart.hasTime
    };
  }

  function formatPos(lon) {
    const n = norm360(lon);
    const idx = Math.floor(n / 30);
    const rem = n % 30;
    const deg = Math.floor(rem);
    const min = Math.floor((rem - deg) * 60);
    return {
      lon: n,
      idx,
      name: ZODIAC_NAMES[idx],
      gen: ZODIAC_GEN[idx],
      glyph: ZODIAC_GLYPHS[idx],
      element: ELEMENTS[idx % 4],
      modality: MODALITIES[idx % 3],
      ruler: RULERS[idx],
      deg,
      min,
      formatted: `${String(deg).padStart(2, '0')}°${String(min).padStart(2, '0')}'`
    };
  }

  // Short-Arc Midpoint (Ebertin / Composite Standard)
  function shortArcMidpoint(lon1, lon2) {
    const a = norm360(lon1), b = norm360(lon2);
    const diff = Math.abs(a - b);
    let mp = (a + b) / 2;
    if (diff > 180) mp = norm360(mp + 180);
    return norm360(mp);
  }

  function jdToDateString(jd) {
    const ms = (jd - 2440587.5) * 86400000;
    const dt = new Date(ms);
    return dt.toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  window.__SYNASTRY_DEEP_UTILS__ = {
    ZODIAC_NAMES, ZODIAC_GEN, ZODIAC_GLYPHS, ELEMENTS, MODALITIES, RULERS,
    norm360, calcExtendedBodies, formatPos, shortArcMidpoint, jdToDateString
  };
})();

(function () {
  const U = window.__SYNASTRY_DEEP_UTILS__;

  const PAIR_TEXTS = (typeof window !== 'undefined' && window.__SYN_PAIR_TEXTS__) || {};
  // Pary planetarne ładowane z synastry-texts-pro.js

  const JUPITER_GLYPH = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="display:inline-block;vertical-align:-2px;" xmlns="http://www.w3.org/2000/svg"><g transform="translate(12,12)"><path d="M-5,-4 C-5,-8 1,-8 1,-4 C1,1 -5,1 -5,4 L7,4 M3,-4 L3,10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></svg>';

  function buildFullDossier(d) {
    const extA = U.calcExtendedBodies(d.dateA, document.getElementById('timeA')?.value || '', d.cA);
    const extB = U.calcExtendedBodies(d.dateB, document.getElementById('timeB')?.value || '', d.cB);

    const bodyDefs = [
      { key: 'sun', label: 'Słońce', glyph: '☉', role: 'Rdzeń Ego' },
      { key: 'moon', label: 'Księżyc', glyph: '☽', role: 'Baza Emocji' },
      { key: 'mercury', label: 'Merkury', glyph: '☿', role: 'Kod Komunikacji' },
      { key: 'venus', label: 'Wenus', glyph: '♀', role: 'Estetyka i Miłość' },
      { key: 'mars', label: 'Mars', glyph: '♂', role: 'Pożądanie i Gniew' },
      { key: 'jupiter', label: 'Jowisz', glyph: JUPITER_GLYPH, role: 'Ekspansja i Dar' },
      { key: 'saturn', label: 'Saturn', glyph: '♄', role: 'Trwałość i Granice' },
      { key: 'pluto', label: 'Pluton', glyph: '♇', role: 'Obsesja i Władza' },
      { key: 'lilith', label: 'Lilith', glyph: '⚸', role: 'Tabu i Cień Pożądania' },
      { key: 'node', label: 'Węzeł Płn.', glyph: '☊', role: 'Oś Przeznaczenia' }
    ];

    const posA = {}, posB = {};
    const elemCount = { 'Ogień': 0, 'Ziemia': 0, 'Powietrze': 0, 'Woda': 0 };
    const modCount  = { 'Kardynalna': 0, 'Stała': 0, 'Zmienna': 0 };

    bodyDefs.forEach(b => {
      posA[b.key] = U.formatPos(extA[b.key]);
      posB[b.key] = U.formatPos(extB[b.key]);
      if (b.key !== 'pluto' && b.key !== 'lilith') {
        elemCount[posA[b.key].element]++;
        elemCount[posB[b.key].element]++;
        modCount[posA[b.key].modality]++;
        modCount[posB[b.key].modality]++;
      }
    });

    const fullAspects = [];
    const tabooAspects = [];
    const PERSONAL_KEYS = new Set(['sun', 'moon', 'mercury', 'venus', 'mars']);
    const EROTIC_CORE_KEYS = new Set(['sun', 'moon', 'venus', 'mars']);
    const SLOW_KEYS = new Set(['jupiter', 'saturn', 'pluto', 'node']);

    const elemCompat = (el1, el2) => {
      if (el1 === el2) return 1.0;
      if ((el1 === 'Ogień' && el2 === 'Powietrze') || (el1 === 'Powietrze' && el2 === 'Ogień')) return 0.65;
      if ((el1 === 'Ziemia' && el2 === 'Woda') || (el1 === 'Woda' && el2 === 'Ziemia')) return 0.65;
      return -0.55;
    };

    // 1. Bazowa Komunikacja (Merkury A x Merkury B + pomost emocjonalny Merkury x Księżyc)
    let commScore = 56;
    commScore += elemCompat(posA.mercury.element, posB.mercury.element) * 8.0;
    commScore += elemCompat(posA.mercury.element, posB.moon.element) * 3.5;
    commScore += elemCompat(posB.mercury.element, posA.moon.element) * 3.5;
    commScore += (elemCount['Powietrze'] - 3.5) * 1.4;
    const mercDiff = Math.abs(extA.mercury - extB.mercury);
    const mercAngle = mercDiff > 180 ? 360 - mercDiff : mercDiff;
    if (Math.abs(mercAngle - 150) <= 5.0) commScore -= 5.5;

    // 2. Bazowa Trwałość (Saturn + żywioł Ziemi + jakość Stała + stabilność Słońc i Księżyców)
    let saturnBond = 54;
    saturnBond += (elemCount['Ziemia'] - 3.5) * 2.0;
    if (modCount['Stała'] >= 4 && modCount['Stała'] <= 7) saturnBond += 4.5;
    else if (modCount['Stała'] <= 1) saturnBond -= 5.0;
    else if (modCount['Stała'] >= 9) saturnBond -= 2.5;
    saturnBond += elemCompat(posA.sun.element, posB.sun.element) * 3.5;
    saturnBond += elemCompat(posA.moon.element, posB.moon.element) * 4.0;

    // 3. Bazowy Indeks Obsesji i Tabu (Pluton x Lilith + sygnatura Skorpiona)
    let obsessionScore = 36;
    ['sun', 'moon', 'venus', 'mars'].forEach(k => {
      if (posA[k].name === 'Skorpion') obsessionScore += 3.5;
      if (posB[k].name === 'Skorpion') obsessionScore += 3.5;
    });
    if (posA.lilith.name === 'Skorpion') obsessionScore += 2.5;
    if (posB.lilith.name === 'Skorpion') obsessionScore += 2.5;

    let karmaHits = 0;
    const orbWeight = (orb, maxOrb) => Math.max(0.15, Math.pow(1 - (orb / maxOrb), 1.4));

    for (const bA of bodyDefs) {
      for (const bB of bodyDefs) {
        // Odrzucenie pokoleniowego szumu (wolna planeta do wolnej planety, np. Pluton-Pluton, Saturn-Pluton)
        if (SLOW_KEYS.has(bA.key) && SLOW_KEYS.has(bB.key)) continue;
        if (bA.key === 'lilith' && bB.key === 'lilith' && Math.abs(extA.jd - extB.jd) < 150) continue;

        const diff = Math.abs(extA[bA.key] - extB[bB.key]);
        const angle = diff > 180 ? 360 - diff : diff;
        const hasLilith = (bA.key === 'lilith' || bB.key === 'lilith');
        const hasPlutoOrSat = (bA.key === 'pluto' || bB.key === 'pluto' || bA.key === 'saturn' || bB.key === 'saturn');

        const maxConj = hasLilith ? 5.2 : (hasPlutoOrSat ? 6.2 : 7.6);
        const maxTrine = hasLilith ? 4.6 : (hasPlutoOrSat ? 5.6 : 6.8);
        const maxSext = hasLilith ? 3.8 : (hasPlutoOrSat ? 4.6 : 5.5);
        const maxSq = hasLilith ? 4.6 : (hasPlutoOrSat ? 5.6 : 6.5);
        const maxOpp = hasLilith ? 5.2 : (hasPlutoOrSat ? 6.2 : 7.2);

        let asp = null;
        if (angle <= maxConj) asp = { name: 'Koniunkcja', sym: '☌', exact: 0, orb: angle, maxOrb: maxConj, tone: 'intense', color: '#C9A96E' };
        else if (Math.abs(angle - 120) <= maxTrine) asp = { name: 'Trygon', sym: '△', exact: 120, orb: Math.abs(angle - 120), maxOrb: maxTrine, tone: 'harmony', color: '#34D399' };
        else if (Math.abs(angle - 60) <= maxSext) asp = { name: 'Sekstyl', sym: '⚹', exact: 60, orb: Math.abs(angle - 60), maxOrb: maxSext, tone: 'harmony', color: '#34D399' };
        else if (Math.abs(angle - 90) <= maxSq) asp = { name: 'Kwadratura', sym: '□', exact: 90, orb: Math.abs(angle - 90), maxOrb: maxSq, tone: 'friction', color: '#FB7185' };
        else if (Math.abs(angle - 180) <= maxOpp) asp = { name: 'Opozycja', sym: '☍', exact: 180, orb: Math.abs(angle - 180), maxOrb: maxOpp, tone: 'polar', color: '#F59E0B' };

        if (asp) {
          const pairKey = [bA.key, bB.key].sort().join('-');
          const isHarm = asp.tone === 'harmony' || asp.tone === 'intense';
          const w = orbWeight(asp.orb, asp.maxOrb);

          // A) Algorytm Merkurego (Komunikacja)
          if (bA.key === 'mercury' || bB.key === 'mercury') {
            const other = bA.key === 'mercury' ? bB.key : bA.key;
            if (['mercury', 'sun', 'moon', 'venus', 'jupiter', 'node'].includes(other)) {
              const mWeight = other === 'mercury' ? 1.35 : (other === 'moon' || other === 'sun' ? 1.15 : 0.95);
              if (asp.tone === 'harmony' || asp.tone === 'intense') commScore += 11.0 * w * mWeight;
              else if (asp.tone === 'polar') commScore -= 4.5 * w * mWeight;
              else commScore -= 8.0 * w * mWeight;
            } else if (other === 'mars') {
              if (asp.tone === 'harmony') commScore += 5.5 * w;
              else if (asp.tone === 'intense') commScore -= 4.5 * w;
              else commScore -= 9.5 * w;
            } else if (other === 'saturn') {
              if (asp.tone === 'harmony') commScore += 6.5 * w;
              else if (asp.tone === 'intense') commScore -= 4.0 * w;
              else commScore -= 10.5 * w;
            } else if (other === 'pluto' || other === 'lilith') {
              if (asp.tone === 'harmony') commScore += 4.0 * w;
              else commScore -= 5.5 * w;
            }
          }

          // B) Algorytm Saturna (Trwałość i Granice — tylko kontakty z planetami osobistymi i Węzłem)
          if (bA.key === 'saturn' || bB.key === 'saturn') {
            const other = bA.key === 'saturn' ? bB.key : bA.key;
            if (PERSONAL_KEYS.has(other) || other === 'node') {
              const coreWeight = (other === 'sun' || other === 'moon' || other === 'venus') ? 1.3 : 0.85;
              if (asp.tone === 'harmony') saturnBond += 13.0 * w * coreWeight;
              else if (asp.tone === 'intense') saturnBond += (other === 'mars' ? 2.5 : (other === 'moon' ? 6.5 : 10.5)) * w * coreWeight;
              else if (asp.tone === 'polar') saturnBond -= 6.5 * w * coreWeight;
              else if (asp.tone === 'friction') saturnBond -= 9.5 * w * coreWeight;
            }
          }

          // C) Aktywacje Węzła Północnego (tylko z planetami osobistymi lub Lilith)
          if ((bA.key === 'node' && PERSONAL_KEYS.has(bB.key)) || (bB.key === 'node' && PERSONAL_KEYS.has(bA.key))) {
            karmaHits++;
            if (asp.tone === 'harmony' || asp.tone === 'intense') saturnBond += 3.5 * w;
          }

          // D) Algorytm Obsesji i Tabu (Pluton x Lilith w kontakcie z planetami osobistymi lub nawzajem)
          const isPlutoOrLilithA = (bA.key === 'pluto' || bA.key === 'lilith');
          const isPlutoOrLilithB = (bB.key === 'pluto' || bB.key === 'lilith');
          let isTabooHit = false;
          if (isPlutoOrLilithA || isPlutoOrLilithB) {
            const other = isPlutoOrLilithA ? bB.key : bA.key;
            const validTabooPair = EROTIC_CORE_KEYS.has(other)
              || (other === 'mercury' && (asp.tone === 'intense' || asp.tone === 'friction' || asp.tone === 'polar'))
              || (isPlutoOrLilithA && isPlutoOrLilithB && !(bA.key === 'pluto' && bB.key === 'pluto'));

            if (validTabooPair) {
              isTabooHit = true;
              const mult = (other === 'venus' || other === 'mars') ? 1.4
                         : (other === 'moon' || other === 'lilith' || other === 'pluto') ? 1.15
                         : (other === 'sun' ? 1.0 : 0.65);
              const basePts = asp.tone === 'intense' ? 16.5
                            : (asp.tone === 'friction' || asp.tone === 'polar') ? 14.0
                            : 7.5;
              obsessionScore += basePts * w * mult;
            }
          }

          const dirCtx = (window.SynNlgComposer && window.SynNlgComposer.resolveDirectionalAspect)
            ? window.SynNlgComposer.resolveDirectionalAspect({ bA, bB }, d)
            : { actor: { nom: d.nameA, gen: d.nameA, acc: d.nameA, ins: d.nameA }, reactor: { nom: d.nameB, gen: d.nameB, dat: d.nameB } };
          const pairEntry = PAIR_TEXTS[pairKey];
          const M = window.SynPlMorphology;
          const elGA = M ? M.elemGen(posA[bA.key].element) : posA[bA.key].element;
          const elGB = M ? M.elemGen(posB[bB.key].element) : posB[bB.key].element;
          const customDesc = typeof pairEntry === 'function'
            ? pairEntry(dirCtx, isHarm)
            : (isHarm
              ? `Naturalne zgranie żywiołów ${elGA} i ${elGB}, które wzmacnia zaufanie.`
              : `Zderzenie żywiołów ${elGA} i ${elGB}, wymagające cierpliwości oraz szczerych rozmów.`);

          const item = {
            bA, bB, posA: posA[bA.key], posB: posB[bB.key],
            ...asp,
            orbStr: `${asp.orb.toFixed(1)}°`,
            desc: customDesc
          };
          fullAspects.push(item);
          if (isTabooHit) {
            tabooAspects.push(item);
          }
        }
      }
    }

    fullAspects.sort((a, b) => a.orb - b.orb);
    tabooAspects.sort((a, b) => a.orb - b.orb);

    const HOUSE_MEANINGS = (window.__SYN_COMPOSITE_TEXTS__ && window.__SYN_COMPOSITE_TEXTS__.HOUSE_MEANINGS) || {};

    const getHouse = (lon, asc) => Math.floor(U.norm360(lon - asc) / 30) + 1;
    const houseOverlays = [];
    const overlayTargets = [
      { key: 'sun', label: 'Słońce', glyph: '☉' },
      { key: 'moon', label: 'Księżyc', glyph: '☽' },
      { key: 'venus', label: 'Wenus', glyph: '♀' },
      { key: 'mars', label: 'Mars', glyph: '♂' },
      { key: 'lilith', label: 'Lilith', glyph: '⚸' }
    ];

    if (extA.hasTime && extA.asc !== null) {
      const ascPosA = U.formatPos(extA.asc);
      overlayTargets.forEach(t => {
        const h = getHouse(extB[t.key], extA.asc);
        const deltaDeg = U.norm360(extB[t.key] - extA.asc).toFixed(1);
        const cuspStart = U.formatPos(extA.asc + (h - 1) * 30);
        const cuspEnd = U.formatPos(extA.asc + h * 30);
        houseOverlays.push({
          owner: d.nameA, guest: d.nameB, body: t, bodyPos: posB[t.key],
          ascPos: ascPosA, cuspStart, cuspEnd, deltaDeg,
          house: h, meaning: HOUSE_MEANINGS[h]
        });
      });
    }
    if (extB.hasTime && extB.asc !== null) {
      const ascPosB = U.formatPos(extB.asc);
      overlayTargets.forEach(t => {
        const h = getHouse(extA[t.key], extB.asc);
        const deltaDeg = U.norm360(extA[t.key] - extB.asc).toFixed(1);
        const cuspStart = U.formatPos(extB.asc + (h - 1) * 30);
        const cuspEnd = U.formatPos(extB.asc + h * 30);
        houseOverlays.push({
          owner: d.nameB, guest: d.nameA, body: t, bodyPos: posA[t.key],
          ascPos: ascPosB, cuspStart, cuspEnd, deltaDeg,
          house: h, meaning: HOUSE_MEANINGS[h]
        });
      });
    }

    // Composite & Davison & Ebertin Midpoints
    const compSun  = U.formatPos(U.shortArcMidpoint(extA.sun, extB.sun));
    const compMoon = U.formatPos(U.shortArcMidpoint(extA.moon, extB.moon));
    const compVen  = U.formatPos(U.shortArcMidpoint(extA.venus, extB.venus));
    const compMar  = U.formatPos(U.shortArcMidpoint(extA.mars, extB.mars));
    const meanJD   = (extA.jd + extB.jd) / 2;
    const davisonDate = U.jdToDateString(meanJD);

    const mpSunMoonA = U.formatPos(U.shortArcMidpoint(extA.sun, extA.moon));
    const mpSunMoonB = U.formatPos(U.shortArcMidpoint(extB.sun, extB.moon));
    const mpVenMarA  = U.formatPos(U.shortArcMidpoint(extA.venus, extA.mars));
    const mpVenMarB  = U.formatPos(U.shortArcMidpoint(extB.venus, extB.mars));

    // Ebertin 90° Dial Cross-Hits (Orb <= 2.5° on 90° dial)
    const dial90Diff = (x, y) => {
      const d90 = Math.abs((x % 90) - (y % 90));
      return d90 > 45 ? 90 - d90 : d90;
    };
    const ebertinMarriageDelta = dial90Diff(mpSunMoonA.lon, mpSunMoonB.lon);
    const ebertinDesireDelta   = dial90Diff(mpVenMarA.lon, mpVenMarB.lon);

    if (ebertinMarriageDelta <= 4.5) saturnBond += (5.0 - ebertinMarriageDelta);
    if (ebertinDesireDelta <= 4.5) obsessionScore += (5.5 - ebertinDesireDelta);

    // Wpływ Nakładki Domów (jeśli podano godzinę urodzenia)
    if (houseOverlays.length > 0) {
      houseOverlays.forEach(o => {
        if (o.house === 3) commScore += 2.5;
        if (o.house === 7 || o.house === 4) saturnBond += 2.5;
        if (o.house === 8) obsessionScore += 4.5;
      });
    }

    const clamp = (v, min, max) => Math.max(min, Math.min(max, Math.round(v)));
    const commFinal = clamp(commScore, 34, 96);
    const saturnFinal = clamp(saturnBond, 35, 95);
    const obsessionFinal = clamp(obsessionScore, 29, 96);
    const totalIndex = clamp((d.syn.chemistry * 0.3 + d.syn.security * 0.3 + commFinal * 0.2 + saturnFinal * 0.2), 42, 97);

    return {
      bodyDefs, posA, posB, elemCount, modCount,
      fullAspects: fullAspects.slice(0, 16),
      tabooAspects: tabooAspects.slice(0, 6),
      houseOverlays,
      compSun, compMoon, compVen, compMar, davisonDate, meanJD, jdA: extA.jd, jdB: extB.jd,
      mpSunMoonA, mpSunMoonB, mpVenMarA, mpVenMarB,
      ebertinMarriageDelta, ebertinDesireDelta,
      commFinal, saturnFinal, obsessionFinal, karmaHits, totalIndex
    };
  }

  window.__SYNASTRY_BUILD_DOSSIER__ = buildFullDossier;
})();

(function () {
  const CT = () => (typeof window !== 'undefined' && window.__SYN_COMPOSITE_TEXTS__) || {};
  const COMPOSITE_ARCHETYPES = new Proxy([], {
    get(_, prop) {
      const arr = CT().COMPOSITE_ARCHETYPES || [];
      return Reflect.get(arr, prop);
    }
  });
  function getVerdict(d, dos) {
    return CT().getVerdict ? CT().getVerdict(d, dos) : { title: '', summary: '' };
  }

  function buildMidpointCardDef(def, signObj, type) {
    const map = (CT().MIDPOINT_SIGN_DESCRIPTIONS) || {};
    const list = map[type] || [];
    const signText = list[signObj.idx] || '';
    const genLabel = (signObj.gen || signObj.name).toUpperCase();
    return `
      <div style="line-height:1.55;color:rgba(250,248,245,0.92);">${def}</div>
      <div style="margin-top:0.65rem;padding:0.6rem 0.75rem;background:rgba(201,169,110,0.08);border:1px solid rgba(201,169,110,0.28);border-radius:0.65rem;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:0.12em;color:var(--champagne);font-weight:700;margin-bottom:0.25rem;">
          ✦ W ZNAKU ${genLabel} (${signObj.glyph})
        </div>
        <div style="font-size:0.79rem;line-height:1.55;color:rgba(250,248,245,0.95);">${signText}</div>
      </div>`;
  }

  function renderTooltipCard(tag, bodyHtml, defText, basisText = '', extraStyle = '') {
    return `
      <div class="syn-stat-box syn-has-tooltip" tabindex="0" ${extraStyle ? `style="${extraStyle}"` : ''}>
        <div class="syn-tag-row">
          <div class="syn-card-tag">${tag}</div>
          <span class="syn-info-pill">ⓘ ZNACZENIE</span>
        </div>
        ${bodyHtml}
        <div class="syn-tooltip-pop" role="tooltip">
          <span class="syn-tt-label">✦ Znaczenie w Waszym Związku</span>
          <div class="syn-tt-def">${defText}</div>
          ${basisText ? `
            <span class="syn-tt-label" style="margin-top:0.65rem;"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><circle cx="16" cy="16" r="4" stroke-width="1.5"/><circle cx="16" cy="16" r="8.2" stroke-width="2.2" stroke-dasharray="2.4 4.05"/><circle cx="16" cy="16" r="10.8" stroke-width="0.7" opacity="0.45"/></svg>Na Jakiej Podstawie Wyliczane</span>
            <div style="font-size:0.77rem;line-height:1.52;color:rgba(201,169,110,0.92);">${basisText}</div>
          ` : ''}
        </div>
      </div>`;
  }

  window.__SYNASTRY_NARRATIVES__ = { COMPOSITE_ARCHETYPES, getVerdict, renderTooltipCard, buildMidpointCardDef };
})();

(function () {
  const N = window.__SYNASTRY_NARRATIVES__;

  function renderChaptersOneToFour(d, dos, verdict, unlocked = false) {
    const priceDisplay = '<s style="opacity:0.55;font-weight:500;margin-right:4px;">67 zł</s>53 zł';
    const planetRows = dos.bodyDefs.map(b => {
      const pA = dos.posA[b.key];
      const pB = dos.posB[b.key];
      return `
        <tr>
          <td data-label="Punkt:"><span class="syn-glyph">${b.glyph}</span> <strong>${b.label}</strong> <span style="opacity:0.55;font-size:0.75rem;">(${b.role})</span></td>
          <td data-label="${d.nameA}:"><span class="syn-glyph">${pA.glyph}</span> ${pA.name} <span style="font-family:'JetBrains Mono',monospace;color:#C9A96E;font-size:0.78rem;">${pA.formatted}</span></td>
          <td data-label="${d.nameB}:"><span class="syn-glyph">${pB.glyph}</span> ${pB.name} <span style="font-family:'JetBrains Mono',monospace;color:#C9A96E;font-size:0.78rem;">${pB.formatted}</span></td>
          <td data-label="Żywioły:" style="font-size:0.78rem;opacity:0.8;">${pA.element} × ${pB.element}</td>
        </tr>`;
    }).join('');

    const aspectRows = dos.fullAspects.map(a => {
      const tip = (window.__GET_ASPECT_MUGOL_TIP__ && window.__GET_ASPECT_MUGOL_TIP__(a.name)) || {
        title: `${a.name} (${a.sym})`,
        desc: 'Wzajemne oddziaływanie energii planetarnych w Waszej relacji.'
      };
      return `
        <tr>
          <td data-label="Planeta:"><strong>${d.nameA}:</strong> <span class="syn-glyph">${a.bA.glyph}</span> ${a.bA.label} (${a.posA.name})</td>
          <td data-label="Aspekt:" style="color:${a.color};font-family:'JetBrains Mono',monospace;font-weight:600;">
            <span class="syn-asp-badge" tabindex="0">
              <span style="white-space:nowrap;">${a.sym} ${a.name} (${a.orbStr}) <span class="syn-info-pill" style="font-size:8px;padding:1px 5px;margin-left:2px;">ⓘ</span></span>
              <span class="syn-asp-tip">
                <strong style="color:${a.color};display:block;margin-bottom:3px;font-size:0.8rem;">${tip.title}</strong>
                ${tip.desc}
              </span>
            </span>
          </td>
          <td data-label="Partner:"><strong>${d.nameB}:</strong> <span class="syn-glyph">${a.bB.glyph}</span> ${a.bB.label} (${a.posB.name})</td>
          <td data-label="Znaczenie:" style="font-size:0.8rem;opacity:0.86;">${a.desc}</td>
        </tr>`;
    }).join('');

    const tabooAspectRows = (dos.tabooAspects || []).map(a => {
      const tip = (window.__GET_ASPECT_MUGOL_TIP__ && window.__GET_ASPECT_MUGOL_TIP__(a.name)) || {
        title: `${a.name} (${a.sym})`,
        desc: 'Wzajemne oddziaływanie energii planetarnych w Waszej relacji.'
      };
      return `
        <tr>
          <td data-label="Planeta:"><strong>${d.nameA}:</strong> <span class="syn-glyph">${a.bA.glyph}</span> ${a.bA.label} (${a.posA.name})</td>
          <td data-label="Aspekt:" style="color:${a.color};font-family:'JetBrains Mono',monospace;font-weight:600;">
            <span class="syn-asp-badge" tabindex="0">
              <span style="white-space:nowrap;">${a.sym} ${a.name} (${a.orbStr}) <span class="syn-info-pill" style="font-size:8px;padding:1px 5px;margin-left:2px;">ⓘ</span></span>
              <span class="syn-asp-tip">
                <strong style="color:${a.color};display:block;margin-bottom:3px;font-size:0.8rem;">${tip.title}</strong>
                ${tip.desc}
              </span>
            </span>
          </td>
          <td data-label="Partner:"><strong>${d.nameB}:</strong> <span class="syn-glyph">${a.bB.glyph}</span> ${a.bB.label} (${a.posB.name})</td>
          <td data-label="Znaczenie:" style="font-size:0.8rem;opacity:0.86;">${a.desc}</td>
        </tr>`;
    }).join('');

    const compArchText = N.COMPOSITE_ARCHETYPES[dos.compSun.idx];

    const marriageResonance = dos.ebertinMarriageDelta <= 4.5
      ? 'Osie małżeńskie na tarczy schodzą się tu bardzo blisko, co daje naturalne poczucie przynależności i łatwiejsze dogrywanie zwykłych spraw domowych.'
      : 'Różne nachylenie obu osi pokazuje, że Wasza jedność powstaje przez świadome docieranie domowych rytmów, a nie z samego automatu.';

    const T = N.renderTooltipCard;
    const M = N.buildMidpointCardDef;
    const Morph = window.SynPlMorphology;
    const atA = Morph ? Morph.atPerson(d.nameA, d.genderA) : d.nameA;
    const atB = Morph ? Morph.atPerson(d.nameB, d.genderB) : d.nameB;
    const genA = Morph ? Morph.inflectName(d.nameA, d.genderA).gen : d.nameA;
    const genB = Morph ? Morph.inflectName(d.nameB, d.genderB).gen : d.nameB;

    return `
      <!-- ROZDZIAŁ I (WIDOCZNY WSTĘP) -->
      <div class="syn-report-chapter" style="border-color:rgba(201,169,110,0.35);">
        <div class="syn-chapter-num">ROZDZIAŁ I • SYNTEZA GŁÓWNA I MATRYCA ŻYWIOŁÓW</div>
        <h4 class="syn-chapter-title">${verdict.title}</h4>
        <p style="font-size:0.95rem;line-height:1.7;color:rgba(250,248,245,0.9);margin-bottom:1.25rem;">${verdict.summary}</p>
        <div class="syn-pill-grid">
          ${T(
            'KOMUNIKACJA (MERKURY)',
            `<div style="font-size:1.35rem;font-family:'JetBrains Mono',monospace;color:#C9A96E;font-weight:700;">${dos.commFinal}%</div>
             <div style="font-size:0.78rem;opacity:0.65;margin-top:0.2rem;">Zrozumienie werbalne i styl sporu</div>`,
            'Określa łatwość porozumienia, wspólne poczucie humoru i zdolność do szybkiego gaszenia nieporozumień bez obrażania się w milczeniu.',
            'Wskaźnik uwzględnia zgodność żywiołów Merkurego i Księżyca oraz ścisłość aspektów (ważoną orbem) z planetami osobistymi partnera. Harmonijne kąty ze Słońcem, Księżycem, Wenus i Jowiszem podnoszą płynność dialogu, natomiast kwadratury i opozycje z Marsem lub Saturnem odejmują punkty, wskazując na ostrzejszy ton w sporze.'
          )}
          ${T(
            'TRWAŁOŚĆ I GRANICE (SATURN)',
            `<div style="font-size:1.35rem;font-family:'JetBrains Mono',monospace;color:#34D399;font-weight:700;">${dos.saturnFinal}%</div>
             <div style="font-size:0.78rem;opacity:0.65;margin-top:0.2rem;">Stabilność długoterminowa i lojalność</div>`,
            'Pokazuje fundament wierności i dojrzałości. To siła, która sprawia, że Wasza więź wytrzymuje próbę czasu i trudniejsze momenty życiowe.',
            'Obliczane na podstawie uziemienia kosmogramów (żywioł Ziemi i jakość Stała), rezonansu Osi Małżeństwa (☉/☽) oraz aspektów Saturna wyłącznie do planet osobistych i Węzła Północnego partnera (z pominięciem pokoleniowego tła). Trygony, sekstyle i koniunkcje wzmacniają trwałość więzi, a kwadratury odejmują punkty, sygnalizując chłód lub obronny dystans.'
          )}
          ${T(
            'PUNKT CZASOPRZESTRZENNY DAVISONA',
            `<div style="font-size:1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;margin-top:0.15rem;">${dos.davisonDate}</div>
             <div style="font-size:0.78rem;opacity:0.65;margin-top:0.2rem;">Astronomiczny środek czasu Waszych narodzin</div>`,
            'To data symbolicznych narodzin Waszego związku — pokazuje odrębny charakter i kierunek Waszej relacji.'
          )}
          ${T(
            'BILANS ŻYWIOŁÓW PARY (16 PUNKTÓW)',
            `<div style="font-size:0.82rem;font-family:'JetBrains Mono',monospace;color:#FAF8F5;margin-top:0.25rem;">
               <svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.22em 0 0;color:#C9A96E" aria-hidden="true"><path d="M16.5 4.8C13.8 9.2 9.5 13 9.5 18.2a6.5 6.5 0 0 0 13 0c0-3.2-1.8-5.6-3.2-7.8c-.4 1.6-1.4 2.5-2.3 2.5c.2-2.6-.2-5.4-.5-8.1Z" stroke-width="1.65"/><path d="M16 15.8c1.2 1.8 1.5 3.3 1 4.6a1.8 1.8 0 0 1-2.5-.2c-.3-1.4.4-2.8 1.5-4.4Z" stroke-width="0.9" fill="currentColor" fill-opacity="0.28"/><line x1="11" y1="26.8" x2="21" y2="26.8" stroke-width="1" opacity="0.65"/></svg>${dos.elemCount['Ogień']} • <svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.22em 0 0;color:#C9A96E" aria-hidden="true"><path d="M9.5 26.8C12 20 14.5 13.5 20.5 6" stroke-width="1.6"/><path d="M17.2 11.2c-4.8-.8-7.5-3.2-6.8-6.4c3.5.4 6 2.5 6.8 6.4Z" stroke-width="1.45"/><path d="M14.2 17.8c4.6-1 8-.2 9.5 2.5c-3 2-6.5 1.2-9.5-2.5Z" stroke-width="1.45"/><path d="M11.8 22.5c-3.8-.5-6-.2-6.8 2.2c2.8 1.4 5.2.5 6.8-2.2Z" stroke-width="1.15" opacity="0.75"/></svg>${dos.elemCount['Ziemia']} • <svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.22em 0 0;color:#C9A96E" aria-hidden="true"><path d="M4.8 13.5c4.5-2.5 10.2-2 15.2-2a3.2 3.2 0 1 0-3-4.2" stroke-width="1.65"/><path d="M6.5 18.2h17a3 3 0 1 1-2.6 4.4" stroke-width="1.35"/><path d="M5.5 23.2c3.2 0 6.8 0 9.5 0a2 2 0 1 1-1.8 2.9" stroke-width="0.95" opacity="0.7"/></svg>${dos.elemCount['Powietrze']} • <svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.22em 0 0;color:#C9A96E" aria-hidden="true"><path d="M4.5 20.5c3.5-4.8 6.2-6 9.5-4.5c2.2 1 2.2 4.2 0 4.5c-1.8.2-2.6-1.2-1.8-2.2" stroke-width="1.65"/><path d="M12.5 22c4.5 1.8 8.8.8 14.5-2.5" stroke-width="1.5"/><path d="M22.2 6.5c1.8 2.8 2.8 4.4 2.8 5.8a2.8 2.8 0 1 1-5.6 0c0-1.4 1-3 2.8-5.8Z" stroke-width="1.3" fill="currentColor" fill-opacity="0.22"/></svg>${dos.elemCount['Woda']}
             </div>
             <div style="font-size:0.76rem;opacity:0.65;margin-top:0.2rem;">Kardynalne: ${dos.modCount['Kardynalna']} | Stałe: ${dos.modCount['Stała']} | Zmienne: ${dos.modCount['Zmienna']}</div>`,
            'Wypadkowa Waszych temperamentów: Ogień daje pasję, Ziemia stabilność i zmysłowość, Powietrze rozmowę, a Woda bliskość emocjonalną.'
          )}
          ${T(
            'INDEKS OBSESJI I TABU (♇ PLUTON × ⚸ LILITH)',
            `<div style="font-size:1.35rem;font-family:'JetBrains Mono',monospace;color:#FB7185;font-weight:700;">${dos.obsessionFinal}%</div>
             <div style="font-size:0.78rem;opacity:0.7;margin-top:0.2rem;">♇ ${dos.posA.pluto.name}/${dos.posB.pluto.name} • ⚸ Lilith: ${dos.posA.lilith.name} × ${dos.posB.lilith.name}</div>`,
            'Mierzy siłę podświadomego magnetyzmu seksualnego, pokusy, zazdrości i tzw. „zakazanego owocu”. Wysoki wskaźnik oznacza więź o bardzo silnym, trudnym do zignorowania przyciąganiu.',
            'Algorytm odrzuca pokoleniowe aspekty Pluton–Pluton, badając wyłącznie bezpośrednie kontakty Plutona i Czarnego Księżyca Lilith z planetami osobistymi partnera (szczególnie Wenus, Marsa, Księżyc i Słońce), obsadę w Skorpionie/8. Domu oraz ścisłość kątową (im mniejszy orb, tym silniejszy ładunek emocjonalny).'
          )}
          ${T(
            'NAKŁADKA DOMÓW PARTNERSKICH (HOUSE OVERLAYS)',
            dos.houseOverlays.length > 0
              ? `<div style="font-size:0.92rem;font-family:'Playfair Display',serif;color:#C9A96E;font-weight:700;margin-top:0.15rem;">Aktywne Domy: ${dos.houseOverlays.slice(0, 3).map(o => `${o.body.glyph}→${o.house}. Dom`).join(' • ')}</div>
                 <div style="font-size:0.76rem;opacity:0.7;margin-top:0.2rem;">Wyliczono dokładne położenie planet w 12 domach Ascendentu</div>`
              : `<div style="font-size:0.9rem;font-family:'Playfair Display',serif;color:rgba(250,248,245,0.75);margin-top:0.15rem;">Wpisz godzinę urodzenia wyżej ↑</div>
                 <div style="font-size:0.76rem;opacity:0.65;margin-top:0.2rem;">Odblokowuje 7. Dom Małżeński i 8. Dom Seksualności</div>`,
            'Pokazuje, którą sferę Twojego życia (np. 7. Dom Małżeństwa, 8. Dom Intymności i Zaufania, 5. Dom Romansu) najmocniej poruszają planety partnera.',
            'Wymaga podania godziny urodzenia przynajmniej jednej osoby, aby wyznaczyć dokładny stopień Ascendentu i siatkę 12 domów horoskopowych.'
          )}
        </div>
      </div>

      <!-- LOSS AVERSION POPUP / GATEWAY (POKAZUJE ILE % CIĘ OMINĘŁO) -->
      <div class="syn-loss-gate" id="syn-loss-gate">
        <div class="syn-loss-badge">
          <span class="syn-loss-dot"></span>
          <span><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M16 5.2L26.8 25.5H5.2L16 5.2Z" stroke-width="1.55"/><line x1="16" y1="12.2" x2="16" y2="19.2" stroke-width="1.35"/><circle cx="16" cy="22.3" r="1.05" stroke="none" fill="currentColor"/></svg>UKRYTE 86% PRAWDY O WASZEJ WIĘZI</span>
        </div>
        <h4 class="syn-loss-title">Chemia na starcie to dopiero 14% historii. Co wyjdzie na jaw, gdy opadną pierwsze emocje?</h4>
        <p class="syn-loss-desc">
          Pierwsza iskra potrafi zmylić nawet najbardziej świadomych ludzi. Zanim zainwestujesz kolejne miesiące uczuć albo przeoczysz cichy sygnał ostrzegawczy, odkryj <strong>pozostałe 86% analizy</strong> — od podświadomego pożądania i układu sił po twardy test przetrwania na lata:
        </p>
        <div class="syn-loss-meter">
          <div class="syn-loss-meter-labels">
            <span>Odkryto: <strong style="color:#C9A96E;">14% (zarys)</strong></span>
            <span>Ukryto przed Tobą: <strong style="color:#FB7185;">86% głębokiej analizy</strong></span>
          </div>
          <div class="syn-loss-bar">
            <div class="syn-loss-bar-fill" style="width:14%;"></div>
          </div>
        </div>
        <div class="syn-loss-grid">
          <div class="syn-loss-item">
            <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
            <div><strong>Sprawdź, czy Wasz związek przetrwa próbę czasu <span class="syn-loss-planet">(Aspekty Saturna ♄)</span></strong><p>Twardy werdykt trwałości na progu 1, 3 i 7 lat — zobacz, czy łączy Was fundament na lata, czy chwilowe zauroczenie, które słabnie przy pierwszym kryzysie.</p></div>
          </div>
          <div class="syn-loss-item">
            <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
            <div><strong>Kto kogo bardziej pragnie — i kto ma nad kim przewagę? <span class="syn-loss-planet">(Pluton ♇ i Lilith ⚸)</span></strong><p>Ukryty magnetyzm, zazdrość, układ sił i odpowiedź na pytanie, kto w tej relacji budzi w drugiej osobie najsilniejsze, trudne do uciszenia pragnienie.</p></div>
          </div>
          <div class="syn-loss-item">
            <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
            <div><strong>Komu zależy mocniej, a kto trzyma dystans? <span class="syn-loss-planet">(Asymetria Uczuć %)</span></strong><p>Procentowy rozkład zaangażowania między Wami — sprawdź, kto nadaje ton relacji, a kto głębiej przeżywa każdy chłód i niedopowiedzenie.</p></div>
          </div>
          <div class="syn-loss-item">
            <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
            <div><strong>O co będziecie się ranić — i jak przerwać ciche dni? <span class="syn-loss-planet">(Mars × Księżyc, Uran, Neptun)</span></strong><p>Wasze najczulsze punkty zapalne, ryzyko złudzeń lub nagłego chłodu oraz 3 gotowe zdania, które natychmiast rozbrajają gniew partnera.</p></div>
          </div>
          <div class="syn-loss-item">
            <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
            <div><strong>Kim dla siebie będziecie pod jednym dachem, bez masek? <span class="syn-loss-planet">(12 Domów i Kompozyt)</span></strong><p>Prawda o wspólnej codzienności po opadnięciu zauroczenia: lojalność, pieniądze, granice i intymność w zderzeniu z prozą życia.</p></div>
          </div>
          <div class="syn-loss-item">
            <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
            <div><strong>Kiedy przyjdzie próba — i jak rozpalić bliskość na nowo? <span class="syn-loss-planet">(Kalendarz 12M i Wenus ♀)</span></strong><p>Osobista mapa napięć i przełomów na najbliższe 12 miesięcy, tajny kod zmysłów Wenus oraz 5 pytań na noc szczerej rozmowy we dwoje.</p></div>
          </div>
        </div>
        <div class="syn-live-preview-grid" aria-label="Podgląd gotowych wyliczeń dla Waszej pary">
          <div class="syn-live-preview-card">
            <div class="syn-live-preview-label">✦ Asymetria zaangażowania</div>
            <div class="syn-live-preview-val">
              <strong>${d.nameA}</strong> <span class="syn-live-mask" aria-hidden="true">██%</span>
              <span style="opacity:0.55;">vs</span>
              <strong>${d.nameB}</strong> <span class="syn-live-mask" aria-hidden="true">██%</span>
            </div>
          </div>
          <div class="syn-live-preview-card">
            <div class="syn-live-preview-label">✦ Najtrudniejszy miesiąc (12M)</div>
            <div class="syn-live-preview-val">
              <span>Okno próby dla ${d.nameA} i ${d.nameB}:</span>
              <span class="syn-live-mask" aria-hidden="true">████ 2027</span>
            </div>
          </div>
        </div>
        <div style="margin-top:1.2rem;text-align:center;">
          <div style="font-family:'Inter',sans-serif;font-size:0.82rem;color:#F5E4A0;font-weight:500;margin-bottom:0.65rem;">
            ✦ Black Weekend — cena promocyjna tylko do poniedziałku (30.11) do 23:59
          </div>
          <button type="button" class="syn-btn-paywall syn-loss-cta" id="syn-paywall-checkout-btn">
            <span>Odblokuj Całą Prawdę o Waszej Relacji — ${priceDisplay} &rarr;</span>
          </button>
          <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:rgba(250,248,245,0.72);margin-top:0.5rem;">
            ✓ BLIK / Apple Pay / Karta • Bez zakładania konta • Natychmiastowy dostęp + PDF
          </div>
          <div style="font-family:'Inter',sans-serif;font-size:11px;color:rgba(250,248,245,0.44);margin-top:0.28rem;">
            Najniższa cena z ostatnich 30 dni: 67 zł
          </div>
        </div>
      </div>

      <!-- ZABLOKOWANA CZĘŚĆ DOSSIER (ROZDZIAŁY II - VII) -->
      <div class="syn-locked-content" id="syn-locked-dossier">
        ${!unlocked ? `
        <div class="syn-report-chapter"><div class="syn-chapter-num">ROZDZIAŁ II • PEŁNA EFEMERYDA 10 PUNKTÓW & ASPEKTARIUM</div><p style="opacity:0.65;">Szczegółowa tabela pozycji i aspektów międzyplanetarnych zostanie wygenerowana po odblokowaniu raportu.</p></div>
        <div class="syn-report-chapter"><div class="syn-chapter-num">ROZDZIAŁ III • HOROSKOP KOMPOZYTOWY & DAVISON</div><p style="opacity:0.65;">Analiza wspólnego kompozytu oraz punktów środkowych Słońce/Księżyc/Wenus/Mars dostępna po odblokowaniu.</p></div>
        <div class="syn-report-chapter"><div class="syn-chapter-num">ROZDZIAŁ IV • KOSMOBIOLOGIA EBERTINA, PLUTON/LILITH & DOMY</div><p style="opacity:0.65;">Indeks obsesji i nakładka domów partnerskich otwierają się natychmiast po zakupie.</p></div>` : `
        <div class="syn-report-chapter">
          <div class="syn-chapter-num">ROZDZIAŁ II • PEŁNA EFEMERYDA 10 PUNKTÓW (Z PLUTONEM I LILITH) & ASPEKTARIUM</div>
          <h4 class="syn-chapter-title">Pozycje Planetarne i Ścisłe Aspekty Międzyplanetarne</h4>
          <div class="syn-table-wrap">
            <table class="syn-table">
              <thead>
                <tr><th>Punkt / Planeta</th><th>${d.nameA} (Ty)</th><th>${d.nameB} (Partner/ka)</th><th>Interakcja Żywiołów</th></tr>
              </thead>
              <tbody>${planetRows}</tbody>
            </table>
          </div>
          <div class="syn-table-wrap" style="margin-top:1.25rem;">
            <table class="syn-table">
              <thead>
                <tr><th>Planeta (${d.nameA})</th><th>Aspekt & Orb</th><th>Planeta (${d.nameB})</th><th>Znaczenie Psychologiczne</th></tr>
              </thead>
              <tbody>${aspectRows}</tbody>
            </table>
          </div>
        </div>

        <div class="syn-report-chapter">
          <div class="syn-chapter-num">ROZDZIAŁ III • HOROSKOP KOMPOZYTOWY &amp; DAVISON</div>
          <h4 class="syn-chapter-title">Kim jesteście jako „My”? Analiza Punktów Środkowych Krótkiego Łuku</h4>
          <p style="font-size:0.92rem;line-height:1.68;color:rgba(250,248,245,0.88);margin-bottom:1rem;">
            ${compArchText} Całości przewodzi tutaj <strong>${dos.compSun.ruler}</strong>.
          </p>
          <div class="syn-pill-grid">
            ${T(
              'SŁOŃCE KOMPOZYTOWE (CEL ZWIĄZKU)',
              `<div style="font-size:1.1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;"><span class="syn-glyph">${dos.compSun.glyph}</span> ${dos.compSun.name} (${dos.compSun.formatted})</div>
               <div style="font-size:0.78rem;opacity:0.75;margin-top:0.35rem;">Żywioł: ${dos.compSun.element} &bull; Jakość: ${dos.compSun.modality.toLowerCase()} &mdash; główna misja i tożsamość Waszej pary.</div>`,
              M('Midpoint Słońc obu osób — wspólny kierunek i kręgosłup Waszego związku. Pokazuje, kim stajecie się razem i jaką energię wnosicie na zewnątrz.', dos.compSun, 'compSun')
            )}
            ${T(
              'KSIĘŻYC KOMPOZYTOWY (EMOCJE PARY)',
              `<div style="font-size:1.1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;"><span class="syn-glyph">${dos.compMoon.glyph}</span> ${dos.compMoon.name} (${dos.compMoon.formatted})</div>
               <div style="font-size:0.78rem;opacity:0.75;margin-top:0.35rem;">Wewnętrzny klimat domu i sposób regeneracji po kryzysie (${dos.compMoon.element}).</div>`,
              M('Midpoint Księżyców obu osób — emocjonalne serce Waszego domu. Określa intymny klimat relacji, to, jak czujecie się razem w czterech ścianach i jak wspólnie odpoczywacie po stresie.', dos.compMoon, 'compMoon')
            )}
            ${T(
              'WENUS KOMPOZYTOWA (KOD MIŁOŚCI)',
              `<div style="font-size:1.1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;"><span class="syn-glyph">${dos.compVen.glyph}</span> ${dos.compVen.name} (${dos.compVen.formatted})</div>
               <div style="font-size:0.78rem;opacity:0.75;margin-top:0.35rem;">Język czułości, estetyki, wspólnych przyjemności i randek w znaku ${dos.compVen.gen}.</div>`,
              M('Midpoint Wenus obu osób — wspólny kod miłości, estetyki i przyjemności. Wskazuje styl Waszych randek, sposób obdarowywania się i to, czym wspólnie się zachwycacie.', dos.compVen, 'compVenus')
            )}
            ${T(
              'MARS KOMPOZYTOWY (SIŁA I EROTYKA)',
              `<div style="font-size:1.1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;"><span class="syn-glyph">${dos.compMar.glyph}</span> ${dos.compMar.name} (${dos.compMar.formatted})</div>
               <div style="font-size:0.78rem;opacity:0.75;margin-top:0.35rem;">Temperatura sypialni, inicjatywa i sposób rozładowywania gniewu w znaku ${dos.compMar.gen}.</div>`,
              M('Midpoint Marsów obu osób — motor napędowy i temperatura pożądania. Pokazuje, jak podejmujecie wspólne decyzje, jak radzicie sobie ze sporami i jaka dynamika panuje w Waszej sypialni.', dos.compMar, 'compMars')
            )}
          </div>
        </div>

        <div class="syn-report-chapter">
          <div class="syn-chapter-num">ROZDZIAŁ IV • KOSMOBIOLOGIA EBERTINA (TARCZA 90° • OŚ MAŁŻEŃSTWA I POŻĄDANIA)</div>
          <h4 class="syn-chapter-title">Punkty Czułe Słońce/Księżyc (☉/☽) oraz Wenus/Mars (♀/♂)</h4>
          <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.86);margin-bottom:1rem;">
            W ujęciu szkoły hamburskiej kluczowe są punkty środkowe Słońca z Księżycem oraz Wenus z Marsem. ${marriageResonance}
          </p>
          <div class="syn-pill-grid">
            ${T(
              `OŚ MAŁŻEŃSTWA ☉/☽ (${d.nameA})`,
              `<div style="font-size:1rem;color:#C9A96E;font-weight:600;"><span class="syn-glyph">${dos.mpSunMoonA.glyph}</span> ${dos.mpSunMoonA.name} ${dos.mpSunMoonA.formatted} <span style="opacity:0.65;font-size:0.8rem;">(Mod 90°: ${(dos.mpSunMoonA.lon % 90).toFixed(1)}°)</span></div>
               <div style="font-size:0.76rem;opacity:0.7;margin-top:0.3rem;">Wzorzec stałego partnerstwa i zaufania ${atA}.</div>`,
              M(`Punkt spotkania woli z potrzebą bezpiecznego domu. Odsłania cichy wzorzec miłości ${atA} oraz warunek, bez którego w tym związku zaczyna brakować tlenu.`, dos.mpSunMoonA, 'marriage')
            )}
            ${T(
              `OŚ MAŁŻEŃSTWA ☉/☽ (${d.nameB})`,
              `<div style="font-size:1rem;color:#C9A96E;font-weight:600;"><span class="syn-glyph">${dos.mpSunMoonB.glyph}</span> ${dos.mpSunMoonB.name} ${dos.mpSunMoonB.formatted} <span style="opacity:0.65;font-size:0.8rem;">(Mod 90°: ${(dos.mpSunMoonB.lon % 90).toFixed(1)}°)</span></div>
               <div style="font-size:0.76rem;opacity:0.7;margin-top:0.3rem;">Punkt czuły więzi i długoterminowego zaufania ${atB}.</div>`,
              M(`Punkt spotkania świadomego wyboru z potrzebą czułości. Pokazuje cichy wzorzec więzi ${atB} i to, przy kim da się odłożyć ostrożność na lata.`, dos.mpSunMoonB, 'marriage')
            )}
            ${T(
              `OŚ POŻĄDANIA ♀/♂ (${d.nameA})`,
              `<div style="font-size:1rem;color:#FAF8F5;font-weight:600;"><span class="syn-glyph">${dos.mpVenMarA.glyph}</span> ${dos.mpVenMarA.name} ${dos.mpVenMarA.formatted} <span style="opacity:0.65;font-size:0.8rem;">(Mod 90°: ${(dos.mpVenMarA.lon % 90).toFixed(1)}°)</span></div>
               <div style="font-size:0.76rem;opacity:0.7;margin-top:0.3rem;">Kod pasji, uwodzenia i temperamentu (${dos.mpVenMarA.element}).</div>`,
              M(`Punkt napięcia między pragnieniem bliskości a sposobem działania (midpoint Wenus i Marsa). Wskazuje bodziec, który najszybciej przełamuje rezerwę ${atA} i uruchamia fizyczne przyciąganie.`, dos.mpVenMarA, 'desire')
            )}
            ${T(
              `OŚ POŻĄDANIA ♀/♂ (${d.nameB})`,
              `<div style="font-size:1rem;color:#FAF8F5;font-weight:600;"><span class="syn-glyph">${dos.mpVenMarB.glyph}</span> ${dos.mpVenMarB.name} ${dos.mpVenMarB.formatted} <span style="opacity:0.65;font-size:0.8rem;">(Mod 90°: ${(dos.mpVenMarB.lon % 90).toFixed(1)}°)</span></div>
               <div style="font-size:0.76rem;opacity:0.7;margin-top:0.3rem;">Punkt zapłonu erotycznego i ekspresji uczuć (${dos.mpVenMarB.element}, Δ90°: ${dos.ebertinDesireDelta.toFixed(1)}°).</div>`,
              M(`Bezpośredni klucz temperamentu seksualnego (punkt środkowy Wenus i Marsa). Określa styl inicjatywy, tempa i dotyku, na który ${d.nameB} reaguje najmocniej.`, dos.mpVenMarB, 'desire')
            )}
          </div>
        </div>

        <div class="syn-report-chapter" style="border-color:rgba(251,113,133,0.35);background:rgba(251,113,133,0.03);">
          <div class="syn-chapter-num" style="color:#FB7185;">ROZDZIAŁ IV-B • CIEMNY MAGNETYZM: PLUTON (♇) I CZARNY KSIĘŻYC LILITH (⚸)</div>
          <h4 class="syn-chapter-title">Indeks Intensywności i Sfera Tabu (${dos.obsessionFinal}%)</h4>
          <div class="syn-mono-meta" style="font-family:'JetBrains Mono',monospace;font-size:0.78rem;color:rgba(250,248,245,0.75);margin-bottom:0.75rem;">
            <strong>${d.nameA}:</strong> ⚸ Lilith ${dos.posA.lilith.name} (${dos.posA.lilith.formatted}) &bull; ♇ Pluton ${dos.posA.pluto.name} (${dos.posA.pluto.formatted}) &nbsp;|&nbsp;
            <strong>${d.nameB}:</strong> ⚸ Lilith ${dos.posB.lilith.name} (${dos.posB.lilith.formatted}) &bull; ♇ Pluton ${dos.posB.pluto.name} (${dos.posB.pluto.formatted})
          </div>
          <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.88);margin-bottom:1rem;">
            Podczas gdy Wenus i Mars odpowiadają za widoczny flirt, <strong>Pluton</strong> oraz <strong>Czarny Księżyc Lilith</strong> dotykają zazdrości, potrzeby wpływu oraz pragnień, o których rzadko mówi się przy świetle dnia. Tutaj wychodzi na jaw to, co w Waszym przyciąganiu bywa najbardziej osobiste i bezkompromisowe.
          </p>
          <div class="syn-grid-2" style="margin-bottom:0;">
            <div class="syn-stat-box" style="border-color:rgba(251,113,133,0.3);">
              <div class="syn-card-tag" style="color:#FB7185;">⚸ KOD LILITH: ${d.nameA} (${dos.posA.lilith.name})</div>
              <p style="font-size:0.86rem;line-height:1.62;margin-top:0.35rem;">
                Czuły punkt niezależności ${atA} leży w znaku ${dos.posA.lilith.gen}. Ta strona budzi się natychmiast, gdy druga osoba próbuje narzucać sztywne ramy albo ograniczać swobodę wyboru.
              </p>
            </div>
            <div class="syn-stat-box" style="border-color:rgba(251,113,133,0.3);">
              <div class="syn-card-tag" style="color:#FB7185;">⚸ KOD LILITH: ${d.nameB} (${dos.posB.lilith.name})</div>
              <p style="font-size:0.86rem;line-height:1.62;margin-top:0.35rem;">
                Ukryty wyzwalacz pożądania ${atB} w znaku ${dos.posB.lilith.gen}. Aby utrzymać silne przyciąganie, ta relacja potrzebuje własnej tajemnicy i niedopowiedzenia, bo całkowita przewidywalność szybko chłodzi tu zmysły.
              </p>
            </div>
          </div>
          ${dos.tabooAspects.length > 0 ? `
            <div style="margin-top:1.35rem;">
              <div class="syn-card-tag" style="color:#FB7185;margin-bottom:0.6rem;font-weight:700;">
                <svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M18.2 4.5L9 16.5h6.5l-2 11L23 14.5h-6.5l1.7-10Z" stroke-width="1.65" fill="currentColor" fill-opacity="0.14"/></svg>AKTYWNE ZWARCIA PLUTON / LILITH W WASZYM KOSMOGRAMIE (${dos.tabooAspects.length})
              </div>
              <div class="syn-table-wrap">
                <table class="syn-table">
                  <thead>
                    <tr>
                      <th>Planeta (${d.nameA})</th>
                      <th>Aspekt & Orb</th>
                      <th>Planeta (${d.nameB})</th>
                      <th>Znaczenie Psychologiczne</th>
                    </tr>
                  </thead>
                  <tbody>${tabooAspectRows}</tbody>
                </table>
              </div>
            </div>
          ` : `
            <div style="margin-top:1.15rem;padding:0.9rem 1.1rem;background:rgba(0,0,0,0.25);border-radius:0.85rem;border:1px dashed rgba(251,113,133,0.25);font-size:0.85rem;line-height:1.6;color:rgba(250,248,245,0.78);">
              Brak ścisłych aspektów napięciowych z udziałem Plutona i Lilith (orby poniżej 4.5°) — Wasza relacja nie niesie ciężkich podświadomych gier o władzę ani destrukcyjnej obsesji.
            </div>
          `}
        </div>

        <div class="syn-report-chapter">
          <div class="syn-chapter-num">ROZDZIAŁ IV-C • NAKŁADKA DOMÓW PARTNERSKICH (HOUSE OVERLAYS)</div>
          <h4 class="syn-chapter-title" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.6rem;">
            <span>Które sfery życia najmocniej poruszają planety partnera?</span>
            <span class="syn-asp-badge" tabindex="0" style="font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:#C9A96E;">
              <span class="syn-info-pill" style="font-size:9px;padding:0.2rem 0.65rem;cursor:help;">ⓘ O CO W TYM CHODZI?</span>
              <span class="syn-asp-tip">
                <strong style="color:#C9A96E;display:block;margin-bottom:4px;font-size:0.82rem;">✦ Czym są Domy Partnerskie?</strong>
                Na podstawie godziny urodzenia horoskop dzieli się na <strong>12 Domów</strong>, czyli 12 obszarów życia (np. 1. Dom = wygląd i pierwsze wrażenie, 4. Dom = dom i rodzina, 5. Dom = randki i pasja, 7. Dom = stały związek, 8. Dom = seks i intymność).<br/><br/>
                Zestawienie pokazuje po prostu, <strong>w którym Domu u jednej osoby znajduje się planeta drugiej osoby</strong> — i którą sferę Waszego życia ta planeta najmocniej porusza.
              </span>
            </span>
          </h4>
          ${dos.houseOverlays.length > 0 ? `
            <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.86);margin-bottom:1rem;">
              Poniższa tabela pokazuje, w którym Domu u jednej osoby znajdują się planety drugiej osoby oraz jak wpływa to na Waszą codzienność i intymność:
            </p>
            <div class="syn-table-wrap">
              <table class="syn-table">
                <thead>
                  <tr><th>Planeta</th><th>Znajduje się w Domu</th><th>W horoskopie osoby</th><th>Co to oznacza dla Waszej relacji?</th></tr>
                </thead>
                <tbody>
                  ${dos.houseOverlays.map(o => `
                    <tr>
                      <td data-label="Planeta:"><strong>${o.guest}:</strong> <span class="syn-glyph">${o.body.glyph}</span> ${o.body.label} <span style="opacity:0.7;font-size:0.78rem;">(${o.bodyPos.name})</span></td>
                      <td data-label="W Domu:" style="color:#C9A96E;font-family:'JetBrains Mono',monospace;font-weight:700;">
                        <span class="syn-asp-badge" tabindex="0">
                          <span style="white-space:nowrap;">${o.house}. DOM <span class="syn-info-pill" style="font-size:8px;padding:1px 5px;margin-left:3px;">ⓘ</span></span>
                          <span class="syn-asp-tip">
                            <strong style="color:#C9A96E;display:block;margin-bottom:4px;font-size:0.82rem;">${o.body.glyph} ${o.body.label} (${o.guest}) znajduje się w ${o.house}. Domu (${o.owner})</strong>
                            ${o.meaning}<br/><br/>
                            <span style="opacity:0.85;font-size:0.76rem;">Oznacza to, że planeta <strong>${o.body.label}</strong> u osoby <strong>${o.guest}</strong> trafia bezpośrednio do <strong>${o.house}. Domu</strong> w horoskopie osoby <strong>${o.owner}</strong> i naturalnie pobudza tę sferę między Wami.</span>
                          </span>
                        </span>
                      </td>
                      <td data-label="W horoskopie:"><strong>${o.owner}</strong></td>
                      <td data-label="Wpływ na relację:" style="font-size:0.81rem;opacity:0.88;">${o.meaning}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.82);">
              Aby odblokować tabelę nakładki domów partnerskich — w tym siódmy dom małżeństwa, ósmy dom intymności oraz piąty dom romansu — uzupełnij godzinę urodzenia przynajmniej jednej osoby w formularzu na górze strony.
            </p>
          `}
        </div>`}`;
  }

  window.__SYNASTRY_RENDER_CH1_4__ = renderChaptersOneToFour;
})();

(function () {
  const _neoEsc = (x) => String(x || "").replace(/[&<>"']/g, (m) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));
  let isReportUnlocked = false;
  let currentSynHash = '';
  let lastSynMountEl = null;
  let lastSynRawData = null;

  function getSynChartHash(d) {
    if (!window.NeoChartLock || !d) return '';
    return window.NeoChartLock.buildHash('synastria', {
      dateA: d.dateA, timeA: d.timeA, cityA: d.cityA,
      latA: d.cA && d.cA.city && d.cA.city.lat, lonA: d.cA && d.cA.city && d.cA.city.lon,
      dateB: d.dateB, timeB: d.timeB, cityB: d.cityB,
      latB: d.cB && d.cB.city && d.cB.city.lat, lonB: d.cB && d.cB.city && d.cB.city.lon
    });
  }

  function renderChaptersFiveToSevenAndPaywall(d, dos, verdict, unlocked = false, rawD = null) {
    const mailD = rawD || d;
    const priceDisplay = '<s style="opacity:0.55;font-weight:500;margin-right:4px;">67 zł</s>53 zł';
    const isFemA = d.genderA === 'f';
    const isFemB = d.genderB === 'f';
    const profSunA = d.sunA.profile[isFemA ? 'f' : 'm'];
    const profSunB = d.sunB.profile[isFemB ? 'f' : 'm'];
    const profMoonA = d.moonA.profile[isFemA ? 'f' : 'm'];
    const profMoonB = d.moonB.profile[isFemB ? 'f' : 'm'];
    const profVenA = d.venA.profile[isFemA ? 'f' : 'm'];
    const profVenB = d.venB.profile[isFemB ? 'f' : 'm'];

    const mailSubject = encodeURIComponent(`Konsultacja Synastrii Partnerskiej 1:1: ${mailD.nameA} (${mailD.sunA.name}) & ${mailD.nameB} (${mailD.sunB.name})`);
    const mailBody = encodeURIComponent(
      `Dzień dobry,\n\nProszę o prywatną analizę synastrii partnerskiej 1:1:\n` +
      `- Osoba 1 (${mailD.nameA}): ur. ${mailD.dateA} | Słońce: ${mailD.sunA.name}, Księżyc: ${mailD.moonA.name}, Wenus: ${mailD.venA.name}, Mars: ${mailD.marA.name}\n` +
      `- Osoba 2 (${mailD.nameB}): ur. ${mailD.dateB} | Słońce: ${mailD.sunB.name}, Księżyc: ${mailD.moonB.name}, Wenus: ${mailD.venB.name}, Mars: ${mailD.marB.name}\n` +
      `- Wyliczone indeksy: Zgodność całkowita ${dos.totalIndex}%, Chemia ${mailD.syn.chemistry}%, Bezpieczeństwo ${mailD.syn.security}%, Napięcie ${mailD.syn.friction}%\n\n` +
      `Najważniejsze pytanie dotyczące naszej relacji:\n`
    );

    const ch1_4 = window.__SYNASTRY_RENDER_CH1_4__(d, dos, verdict, unlocked);

    return `
      <section class="syn-paywall-section ${isReportUnlocked ? 'is-unlocked' : ''}" id="syn-dossier-section">
        <div class="syn-paywall-header">
          <div>
            <div class="syn-card-tag">✦ PEŁNA ANALIZA SYNASTRII • 7 ROZDZIAŁÓW</div>
            <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:1.75rem;color:#FAF8F5;margin:0.2rem 0 0 0;">
              Pełny Raport Zgodności: ${d.nameA} <span style="color:#C9A96E;">&times;</span> ${d.nameB}
            </h3>
          </div>
          <div style="display:flex;align-items:center;gap:0.85rem;flex-wrap:wrap;">
            <div style="background:rgba(201,169,110,0.14);border:1px solid rgba(201,169,110,0.4);padding:0.5rem 1.1rem;border-radius:9999px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#C9A96E;font-weight:700;">
              INDEKS ZGODNOŚCI: ${dos.totalIndex}%
            </div>
            <button type="button" id="syn-print-pdf-top" class="syn-btn-secondary syn-no-print" style="${isReportUnlocked ? 'display:inline-flex;' : 'display:none;'}">
              <span>⤓ Pobierz / Drukuj PDF (A4)</span>
            </button>
          </div>
        </div>

        <div class="syn-teaser-body">
          ${ch1_4}

            ${!unlocked ? `
            <div class="syn-report-chapter"><div class="syn-chapter-num">ROZDZIAŁ V–VII • TRUDNE CHWILE, KONTRAKT KARMICZNY I ZŁOTY PREZENT</div><p style="opacity:0.65;">Wskazówki wyciszania napięć oraz psychologiczny profil prezentowy Wenus dostępne po odblokowaniu.</p></div>
          </div>` : `
            <div class="syn-report-chapter">
              <div class="syn-chapter-num">ROZDZIAŁ V • JAK WRACAĆ DO SIEBIE PO SPIĘCIU</div>
              <h4 class="syn-chapter-title">Co pomaga rozładować gniew i zamknięcie w stresie</h4>
              <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.86);margin-bottom:1rem;">
                W chwili przeciążenia <strong>${d.nameA}</strong> reaguje odruchami Księżyca w znaku <strong>${dos.posA.moon.gen}</strong> oraz Marsa w znaku <strong>${dos.posA.mars.gen}</strong>, natomiast <strong>${d.nameB}</strong> broni spokoju po swojemu przez Księżyc w znaku <strong>${dos.posB.moon.gen}</strong> i Marsa w znaku <strong>${dos.posB.mars.gen}</strong>. Zamiast nakręcać spór, użyjcie poniższych zdań i unikajcie zapalników z listy:
              </p>
              <div class="syn-grid-2" style="margin-bottom:0;">
                <div class="syn-stat-box">
                  <div class="syn-card-tag">KLUCZ DO ROZMOWY — ${d.nameA} (${d.sunA.name} • ☽ ${dos.posA.moon.name})</div>
                  <p style="font-size:0.88rem;line-height:1.65;margin-top:0.4rem;">${profSunA.openKey}</p>
                  <p style="font-size:0.8rem;opacity:0.82;line-height:1.55;margin-top:0.55rem;border-top:1px solid rgba(255,255,255,0.08);padding-top:0.5rem;"><strong style="color:#C9A96E;">Cień w stresie (☽ ${dos.posA.moon.name}):</strong> ${profMoonA.conflict}</p>
                </div>
                <div class="syn-stat-box">
                  <div class="syn-card-tag">KLUCZ DO ROZMOWY — ${d.nameB} (${d.sunB.name} • ☽ ${dos.posB.moon.name})</div>
                  <p style="font-size:0.88rem;line-height:1.65;margin-top:0.4rem;">${profSunB.openKey}</p>
                  <p style="font-size:0.8rem;opacity:0.82;line-height:1.55;margin-top:0.55rem;border-top:1px solid rgba(255,255,255,0.08);padding-top:0.5rem;"><strong style="color:#C9A96E;">Cień w stresie (☽ ${dos.posB.moon.name}):</strong> ${profMoonB.conflict}</p>
                </div>
              </div>
            </div>

            <div class="syn-report-chapter">
              <div class="syn-chapter-num">ROZDZIAŁ VI • KIERUNEK SPOTKANIA (WĘZŁY ☊) I TRWAŁOŚĆ SATURNA (♄)</div>
              <h4 class="syn-chapter-title">Wspólna Droga, Granice i Horyzont na Lata</h4>
              <div class="syn-mono-meta" style="font-family:'JetBrains Mono',monospace;font-size:0.78rem;color:#C9A96E;margin-bottom:0.65rem;">
                ☊ Węzły: ${d.nameA} (${dos.posA.node.name} ${dos.posA.node.formatted}) &bull; ${d.nameB} (${dos.posB.node.name} ${dos.posB.node.formatted}) &nbsp;|&nbsp; ♄ Saturn: ${dos.posA.saturn.name} &times; ${dos.posB.saturn.name} (${dos.saturnFinal}%)
              </div>
              <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.88);">
                Kierunek spotkania wyznacza Węzeł Północny w znaku <strong>${dos.posA.node.gen}</strong> i w znaku <strong>${dos.posB.node.gen}</strong>. O trwałości i poszanowaniu granic decyduje natomiast układ Saturna, który sprawdza słowność dokładnie wtedy, gdy opadną pierwsze emocje zauroczenia. To jest prawdziwy fundament.
              </p>
            </div>

            <div class="syn-report-chapter" style="border-color:rgba(201,169,110,0.5);background:rgba(201,169,110,0.05);">
              <div class="syn-chapter-num">ROZDZIAŁ VII • ZŁOTY KOD PREZENTOWY I ZMYSŁOWY KLUCZ WENUS</div>
              <h4 class="syn-chapter-title">Co podarować, by trafić prosto w gust drugiej osoby?</h4>
              <div class="syn-grid-2" style="margin-bottom:0;">
                <div class="syn-stat-box" style="border-color:rgba(201,169,110,0.4);">
                  <div class="syn-card-tag">ZŁOTY PREZENT — ${d.nameB} (${d.sunB.name} / Wenus: ${d.venB.name})</div>
                  <p style="font-size:0.95rem;line-height:1.65;color:#FAF8F5;font-family:'Playfair Display',serif;font-style:italic;margin-top:0.4rem;">„${profSunB.secretGift}”</p>
                  <p style="font-size:0.82rem;opacity:0.75;margin-top:0.5rem;">${profVenB.venusGift}</p>
                </div>
                <div class="syn-stat-box" style="border-color:rgba(201,169,110,0.4);">
                  <div class="syn-card-tag">ZŁOTY PREZENT — ${d.nameA} (${d.sunA.name} / Wenus: ${d.venA.name})</div>
                  <p style="font-size:0.95rem;line-height:1.65;color:#FAF8F5;font-family:'Playfair Display',serif;font-style:italic;margin-top:0.4rem;">„${profSunA.secretGift}”</p>
                  <p style="font-size:0.82rem;opacity:0.75;margin-top:0.5rem;">${profVenA.venusGift}</p>
                </div>
              </div>
              <div class="syn-no-print" style="margin-top:1.5rem;text-align:center;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
                <button type="button" id="syn-print-pdf-bottom" class="syn-btn-main" style="padding:0.95rem 2.2rem;font-size:0.85rem;">
                  <span>⤓ Pobierz Pełny Raport Synastrii (PDF / Druk A4)</span>
                </button>
                <a href="mailto:kontakt@neoromantyczny.pl?subject=Indywidualna%20Analiza%20Synastrii" class="syn-btn-secondary">
                  <span>✦ Zamów Konsultację Indywidualną 1:1 z Astrologiem &rarr;</span>
                </a>
              </div>
            </div>
          </div>`}
        </div>

        <!-- LOSS AVERSION POPUP MODAL (#syn-loss-modal) -->
        <div class="syn-modal-backdrop" id="syn-loss-modal" role="dialog" aria-modal="true" aria-hidden="true">
          <div class="syn-modal-card">
            <button type="button" class="syn-modal-close" id="syn-loss-modal-close" aria-label="Zamknij">&times;</button>
            <div class="syn-loss-badge">
              <span class="syn-loss-dot"></span>
              <span><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg>SEKCJA DOSSIER WYMAGA ODBLOKOWANIA</span>
            </div>
            <h3 class="syn-loss-title">Najtrudniejsze pytania o Waszą relację są o krok</h3>
            <p class="syn-loss-desc">
              Widzisz dopiero wstęp (14%). Prawdziwe napięcie, układ sił i test przetrwania otwierają się natychmiast w rozdziałach II–VII:
            </p>
            <div class="syn-loss-meter">
              <div class="syn-loss-meter-labels">
                <span>Odkryto: <strong style="color:#C9A96E;">14% (zarys)</strong></span>
                <span>Zamknięte: <strong style="color:#FB7185;">86% (6 rozdziałów)</strong></span>
              </div>
              <div class="syn-loss-bar">
                <div class="syn-loss-bar-fill" style="width:14%;"></div>
              </div>
            </div>
            <div class="syn-loss-grid">
              <div class="syn-loss-item">
                <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
                <div><strong>Czy Wasz związek przetrwa próbę czasu? <span class="syn-loss-planet">(Saturn ♄)</span></strong><p>Werdykt na progu 1, 3 i 7 lat — fundament na lata czy chwilowe zauroczenie?</p></div>
              </div>
              <div class="syn-loss-item">
                <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
                <div><strong>Kto kogo bardziej pragnie? <span class="syn-loss-planet">(Pluton ♇ i Lilith ⚸)</span></strong><p>Ukryty magnetyzm, zazdrość i to, kto ma nad kim cichą przewagę</p></div>
              </div>
              <div class="syn-loss-item">
                <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
                <div><strong>Komu zależy mocniej? <span class="syn-loss-planet">(Asymetria Uczuć %)</span></strong><p>Procentowy rozkład sił — kto nadaje ton, a kto mocniej przeżywa chłód</p></div>
              </div>
              <div class="syn-loss-item">
                <span class="syn-loss-icon"><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg></span>
                <div><strong>O co będziecie się ranić? <span class="syn-loss-planet">(Klucz Kryzysowy)</span></strong><p>Zapalniki kłótni, ciche dni i 3 zdania natychmiast gaszące gniew</p></div>
              </div>
            </div>
            <div style="margin-top:0.8rem;text-align:center;">
              <div style="font-family:'Inter',sans-serif;font-size:0.74rem;color:#F5E4A0;font-weight:500;margin-bottom:0.45rem;">
                Black Weekend — cena promocyjna tylko do poniedziałku (30.11) do 23:59
              </div>
              <button type="button" class="syn-btn-paywall syn-loss-cta" id="syn-loss-modal-cta">
                <span>Przejdź do pełnej analizy (${priceDisplay}) &rarr;</span>
              </button>
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(250,248,245,0.68);margin-top:0.32rem;">
                ✓ BLIK / Apple Pay / Karta • Bez zakładania konta • Natychmiastowy dostęp + PDF
              </div>
              <div style="font-family:'Inter',sans-serif;font-size:10px;color:rgba(250,248,245,0.42);margin-top:0.18rem;">
                Najniższa cena z ostatnich 30 dni: 67 zł
              </div>
            </div>
          </div>
        </div>

        <!-- STRIPE DIRECT CHECKOUT MODAL (#syn-stripe-modal) -->
        <div class="syn-modal-backdrop" id="syn-stripe-modal" role="dialog" aria-modal="true" aria-hidden="true">
          <div class="syn-modal-card syn-stripe-card">
            <button type="button" class="syn-modal-close" id="syn-stripe-modal-close" aria-label="Zamknij">&times;</button>
            <div class="syn-stripe-header">
              <div class="syn-card-tag">BEZPOŚREDNIA PŁATNOŚĆ</div>
              <h3 class="syn-card-heading" style="font-size:1.45rem;margin:0.25rem 0 0.35rem;">Odblokuj Pełny Raport Synastrii</h3>
              <p style="font-size:0.85rem;color:rgba(250,248,245,0.75);margin:0;">
                Dostęp do wszystkich 7 rozdziałów dla pary <strong>${d.nameA} &times; ${d.nameB}</strong>.
              </p>
              <div class="syn-stripe-badges">
                <span class="syn-stripe-badge"> Apple Pay</span>
                <span class="syn-stripe-badge">G Pay</span>
                <span class="syn-stripe-badge">BLIK</span>
                <span class="syn-stripe-badge">Karta / Link</span>
                <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#34D399;font-weight:700;margin-left:auto;"><s style="opacity:0.52;color:rgba(250,248,245,0.7);font-weight:400;margin-right:6px;">67,00 PLN</s>53,00 PLN</span>
              </div>
            </div>

            <div id="syn-payment-element-mount">
              <div class="syn-stripe-loader" id="syn-stripe-loader">
                <div class="syn-stripe-spinner"></div>
                <span>Inicjacja bezpiecznego połączenia...</span>
              </div>
            </div>

            <div id="syn-stripe-error"></div>

            <div style="margin-top:1rem;text-align:center;">
              <button type="button" class="syn-btn-paywall syn-loss-cta" id="syn-stripe-submit-btn" style="display:none;width:100%;">
                <span>Zapłać 53,00 PLN i Odblokuj Raport &rarr;</span>
              </button>
              <div style="font-family:'Inter',sans-serif;font-size:10.5px;color:rgba(250,248,245,0.46);margin-top:0.4rem;">
                Najniższa cena z ostatnich 30 dni: 67 zł
              </div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(250,248,245,0.6);margin-top:0.6rem;">
                <svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg>Szyfrowanie 256-bit SSL • Płatność obsługiwana przez Stripe.com
              </div>
            </div>
          </div>
        </div>
      </section>`;
  }

  window.__SYNASTRY_REPORT_MOUNT__ = function (mountEl, d, forceUnlock = false) {
    if (!mountEl || !window.__SYNASTRY_BUILD_DOSSIER__) return;
    const IS_LOCAL_HOST = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (IS_LOCAL_HOST && !document.getElementById('syn-local-test-bar') && document.body) {
      const bar = document.createElement('div');
      bar.id = 'syn-local-test-bar';
      bar.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:9998;display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:999px;background:rgba(14,12,18,0.94);border:1px solid rgba(201,168,76,0.45);box-shadow:0 10px 28px rgba(0,0,0,0.45);font-family:Inter,system-ui,sans-serif;font-size:12px;color:#FAF8F5;backdrop-filter:blur(10px);';
      bar.innerHTML = '<span id="syn-test-status" style="color:#C9A84C;font-weight:600;">LOCALHOST · PAYWALL</span><button type="button" id="syn-test-toggle" style="cursor:pointer;border:1px solid rgba(201,168,76,0.55);background:rgba(201,168,76,0.16);color:#F5E4A0;padding:5px 12px;border-radius:999px;font-size:11px;font-weight:700;">Odblokuj za 0 zł</button>';
      document.body.appendChild(bar);
      document.getElementById('syn-test-toggle').addEventListener('click', () => {
        window.__SYN_LOCAL_UNLOCK__ = !window.__SYN_LOCAL_UNLOCK__;
        const st = document.getElementById('syn-test-status');
        const btn = document.getElementById('syn-test-toggle');
        if (st) st.textContent = window.__SYN_LOCAL_UNLOCK__ ? 'LOCALHOST · ODBLOKOWANY (0 zł)' : 'LOCALHOST · PAYWALL';
        if (btn) btn.textContent = window.__SYN_LOCAL_UNLOCK__ ? 'Przywróć Paywall' : 'Odblokuj za 0 zł';
        if (lastSynMountEl && lastSynRawData) {
          window.__SYNASTRY_REPORT_MOUNT__(lastSynMountEl, lastSynRawData, Boolean(window.__SYN_LOCAL_UNLOCK__));
        }
      });
    }
    lastSynMountEl = mountEl;
    lastSynRawData = d;
    currentSynHash = getSynChartHash(d);
    isReportUnlocked = Boolean(forceUnlock || (IS_LOCAL_HOST && window.__SYN_LOCAL_UNLOCK__) || (window.NeoChartLock && window.NeoChartLock.isUnlocked('synastria', currentSynHash)));
    const safeD = { ...d, nameA: _neoEsc(d.nameA), nameB: _neoEsc(d.nameB) };
    const dos = window.__SYNASTRY_BUILD_DOSSIER__(safeD);
    const verdict = window.__SYNASTRY_NARRATIVES__.getVerdict(safeD, dos);
    mountEl.innerHTML = renderChaptersFiveToSevenAndPaywall(safeD, dos, verdict, isReportUnlocked, d);

    const section = document.getElementById('syn-dossier-section');
    const paywallBtn = document.getElementById('syn-paywall-checkout-btn');
    const printTop = document.getElementById('syn-print-pdf-top');
    const printBot = document.getElementById('syn-print-pdf-bottom');

    const performUnlock = (instant = false) => {
      if (!isReportUnlocked && lastSynMountEl && lastSynRawData) {
        window.__SYNASTRY_REPORT_MOUNT__(lastSynMountEl, lastSynRawData, true);
        const sec = document.getElementById('syn-dossier-section');
        if (sec && !instant) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      isReportUnlocked = true;
      if (section) section.classList.add('is-unlocked');
      if (printTop) printTop.style.display = 'inline-flex';
      if (!instant && section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (paywallBtn) {
      paywallBtn.addEventListener('click', () => {
        closeLossModal();
        if (typeof window.openLuxeCheckout === 'function') {
          window.openLuxeCheckout('synastria', () => {
            performUnlock(false);
          }, { chartHash: currentSynHash, pair: `${d.nameA} x ${d.nameB}` });
          return;
        }
        openStripeCheckout();
      });
      mountEl.querySelectorAll('.syn-loss-item').forEach((item) => {
        item.addEventListener('click', () => {
          if (!isReportUnlocked) paywallBtn.click();
        });
      });
    }

    const stripeModal = document.getElementById('syn-stripe-modal');
    const stripeModalClose = document.getElementById('syn-stripe-modal-close');
    const stripeSubmitBtn = document.getElementById('syn-stripe-submit-btn');
    const stripeErrorBox = document.getElementById('syn-stripe-error');
    const stripeLoader = document.getElementById('syn-stripe-loader');
    const stripeMount = document.getElementById('syn-payment-element-mount');

    const STRIPE_PK = 'pk_live_51UYWld665tgVOXNONMRtB5ENfc0M22rrNXL5BIRvTw4BNSt3oYOuUtIjFhT3mf6On5QJ3PqkYdMLKSSsESvdJQNA00phk5bG3f';
    let stripeInstance = null;
    let stripeElementsInstance = null;
    let isStripeLoading = false;

    const closeStripeModal = () => {
      if (!stripeModal) return;
      stripeModal.classList.remove('is-active');
      stripeModal.setAttribute('aria-hidden', 'true');
    };

    if (stripeModalClose) stripeModalClose.addEventListener('click', closeStripeModal);
    if (stripeModal) {
      stripeModal.addEventListener('click', (e) => {
        if (e.target === stripeModal) closeStripeModal();
      });
    }

    const openStripeCheckout = async () => {
      if (isReportUnlocked || !stripeModal) return;
      closeLossModal();
      if (typeof window.trackLuxeBeginCheckout === 'function') {
        window.trackLuxeBeginCheckout('synastria');
      }
      stripeModal.classList.add('is-active');
      stripeModal.setAttribute('aria-hidden', 'false');

      if (stripeElementsInstance) return;
      if (isStripeLoading) return;
      isStripeLoading = true;

      try {
        if (typeof window.Stripe === 'undefined') {
          throw new Error('Biblioteka Stripe.js nie została załadowana. Sprawdź połączenie.');
        }

        stripeInstance = window.Stripe(STRIPE_PK, { locale: 'pl' });

        const endpoint = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? '/api/create-payment-intent'
          : '/.netlify/functions/create-payment-intent';

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product: 'synastria', pair: `${d.nameA} x ${d.nameB}`, chartHash: currentSynHash })
        });

        const data = await res.json();
        if (!res.ok || !data.clientSecret) {
          throw new Error(data.error || 'Nie udało się zainicjalizować sesji płatności Stripe.');
        }

        const appearance = {
          theme: 'night',
          variables: {
            colorPrimary: '#C9A96E',
            colorBackground: '#14141F',
            colorText: '#FAF8F5',
            colorDanger: '#FB7185',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '10px'
          }
        };

        stripeElementsInstance = stripeInstance.elements({
          clientSecret: data.clientSecret,
          appearance
        });

        const paymentElement = stripeElementsInstance.create('payment', {
          layout: 'tabs'
        });

        paymentElement.mount(stripeMount);
        paymentElement.on('ready', () => {
          if (stripeLoader) stripeLoader.style.display = 'none';
          if (stripeSubmitBtn) stripeSubmitBtn.style.display = 'block';
        });

      } catch (err) {
        if (stripeLoader) stripeLoader.style.display = 'none';
        if (stripeErrorBox) {
          stripeErrorBox.innerHTML = `<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M16 5.2L26.8 25.5H5.2L16 5.2Z" stroke-width="1.55"/><line x1="16" y1="12.2" x2="16" y2="19.2" stroke-width="1.35"/><circle cx="16" cy="22.3" r="1.05" stroke="none" fill="currentColor"/></svg>${_neoEsc(err.message)}`;
        }
      } finally {
        isStripeLoading = false;
      }
    };

    if (stripeSubmitBtn) {
      stripeSubmitBtn.addEventListener('click', async () => {
        if (!stripeInstance || !stripeElementsInstance) return;
        stripeSubmitBtn.disabled = true;
        stripeSubmitBtn.innerHTML = '<span><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M8.5 5.2h15M8.5 26.8h15" stroke-width="1.65"/><path d="M9.8 5.2v21.6M22.2 5.2v21.6" stroke-width="0.8" opacity="0.45"/><path d="M11.8 5.2c0 5.4 4.2 8.2 4.2 10.8c0-2.6 4.2-5.4 4.2-10.8" stroke-width="1.45"/><path d="M11.8 26.8c0-5.4 4.2-8.2 4.2-10.8c0 2.6 4.2 5.4 4.2 10.8" stroke-width="1.45"/><path d="M13.5 26.8L16 23.2l2.5 3.6Z" stroke="none" fill="currentColor" fill-opacity="0.42"/></svg>Autoryzacja płatności (BLIK / Apple Pay)...</span>';
        if (stripeErrorBox) stripeErrorBox.innerHTML = '';

        try {
          const { error, paymentIntent } = await stripeInstance.confirmPayment({
            elements: stripeElementsInstance,
            confirmParams: {
              return_url: (() => {
                const u = new URL(window.location.href);
                u.searchParams.delete('payment_intent');
                u.searchParams.delete('payment_intent_client_secret');
                u.searchParams.delete('redirect_status');
                u.searchParams.set('luxe_product', 'synastria');
                if (currentSynHash) u.searchParams.set('luxe_chart', currentSynHash);
                return u.toString();
              })()
            },
            redirect: 'if_required'
          });

          if (error) {
            stripeErrorBox.innerHTML = `<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M16 5.2L26.8 25.5H5.2L16 5.2Z" stroke-width="1.55"/><line x1="16" y1="12.2" x2="16" y2="19.2" stroke-width="1.35"/><circle cx="16" cy="22.3" r="1.05" stroke="none" fill="currentColor"/></svg>${_neoEsc(error.message)}`;
            stripeSubmitBtn.disabled = false;
            stripeSubmitBtn.innerHTML = '<span>Zapłać 53,00 PLN i Odblokuj Raport &rarr;</span>';
          } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            const verifyUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
              ? '/api/verify-payment'
              : '/.netlify/functions/verify-payment';
            const vRes = await fetch(verifyUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentIntentId: paymentIntent.id, product: 'synastria', chartHash: currentSynHash })
            });
            const vData = await vRes.json();
            if (!vRes.ok || !vData.verified) {
              throw new Error(vData.error || 'Płatność nie została jeszcze potwierdzona przez Stripe.');
            }
            if (window.NeoChartLock) window.NeoChartLock.markUnlocked('synastria', currentSynHash, vData);
            if (typeof window.trackLuxePurchase === 'function') {
              window.trackLuxePurchase(paymentIntent.id, 'synastria');
            }
            closeStripeModal();
            performUnlock(false);
          } else if (paymentIntent && paymentIntent.status === 'processing') {
            stripeErrorBox.innerHTML = '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M8.5 5.2h15M8.5 26.8h15" stroke-width="1.65"/><path d="M9.8 5.2v21.6M22.2 5.2v21.6" stroke-width="0.8" opacity="0.45"/><path d="M11.8 5.2c0 5.4 4.2 8.2 4.2 10.8c0-2.6 4.2-5.4 4.2-10.8" stroke-width="1.45"/><path d="M11.8 26.8c0-5.4 4.2-8.2 4.2-10.8c0 2.6 4.2 5.4 4.2 10.8" stroke-width="1.45"/><path d="M13.5 26.8L16 23.2l2.5 3.6Z" stroke="none" fill="currentColor" fill-opacity="0.42"/></svg>Płatność jest w trakcie przetwarzania przez bank. Odśwież stronę za chwilę.';
          }
        } catch (e) {
          stripeErrorBox.innerHTML = `<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M16 5.2L26.8 25.5H5.2L16 5.2Z" stroke-width="1.55"/><line x1="16" y1="12.2" x2="16" y2="19.2" stroke-width="1.35"/><circle cx="16" cy="22.3" r="1.05" stroke="none" fill="currentColor"/></svg>Błąd połączenia: ${_neoEsc(e.message)}`;
          stripeSubmitBtn.disabled = false;
          stripeSubmitBtn.innerHTML = '<span>Zapłać 53,00 PLN i Odblokuj Raport &rarr;</span>';
        }
      });
    }

    if (typeof window !== 'undefined' && isReportUnlocked) {
      try {
        if (sessionStorage.getItem('neo_just_unlocked') === 'synastria') {
          sessionStorage.removeItem('neo_just_unlocked');
          setTimeout(() => {
            if (section) section.scrollIntoView({ behavior: 'auto', block: 'start' });
          }, 60);
        }
      } catch (e) {}
    }

    const modal = document.getElementById('syn-loss-modal');
    const modalClose = document.getElementById('syn-loss-modal-close');
    const modalCta = document.getElementById('syn-loss-modal-cta');
    const lockedDossier = document.getElementById('syn-locked-dossier');

    let modalHasTriggered = false;
    const openLossModal = () => {
      if (isReportUnlocked || !modal) return;
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
    };
    const closeLossModal = () => {
      if (!modal) return;
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
    };

    if (modalClose) modalClose.addEventListener('click', closeLossModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLossModal();
      });
    }
    if (!window.__synLossEscBound) {
      window.__synLossEscBound = true;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const activeMod = document.getElementById('syn-loss-modal');
          if (activeMod && activeMod.classList.contains('is-active')) {
            activeMod.classList.remove('is-active');
            activeMod.setAttribute('aria-hidden', 'true');
          }
        }
      });
    }
    if (modalCta && paywallBtn) {
      modalCta.addEventListener('click', () => {
        closeLossModal();
        paywallBtn.click();
      });
    }
    if (lockedDossier) {
      lockedDossier.addEventListener('click', () => {
        if (!isReportUnlocked) openLossModal();
      });
    }

    // Dyskretny dolny pasek sticky (zamiast automatycznego popupa po 700 ms)
    const oldSticky = document.getElementById('syn-sticky-bar');
    if (oldSticky) oldSticky.remove();
    if (!isReportUnlocked && paywallBtn) {
      const sticky = document.createElement('div');
      sticky.id = 'syn-sticky-bar';
      sticky.className = 'syn-sticky-bar syn-no-print';
      sticky.setAttribute('role', 'region');
      sticky.setAttribute('aria-label', 'Odblokuj pełny raport synastrii');
      sticky.innerHTML = `
        <div class="syn-sticky-text">
          <span class="syn-sticky-title">Pełny raport 7 rozdziałów — <s style="opacity:0.55;font-weight:400;">67 zł</s> 53 zł</span>
          <span class="syn-sticky-sub">BLIK • Bez konta • Dostęp od razu + PDF</span>
        </div>
        <div class="syn-sticky-actions">
          <button type="button" class="syn-sticky-cta" id="syn-sticky-cta-btn">Odblokuj &rarr;</button>
          <button type="button" class="syn-sticky-close" id="syn-sticky-close-btn" aria-label="Ukryj pasek">&times;</button>
        </div>`;
      document.body.appendChild(sticky);
      let stickyDismissed = false;
      const closeBtn = sticky.querySelector('#syn-sticky-close-btn');
      const ctaBtn = sticky.querySelector('#syn-sticky-cta-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => { stickyDismissed = true; sticky.classList.remove('is-visible'); });
      if (ctaBtn) ctaBtn.addEventListener('click', () => { paywallBtn.click(); });
      const syncSticky = () => {
        if (stickyDismissed || isReportUnlocked || !document.body.contains(sticky)) {
          sticky.classList.remove('is-visible');
          return;
        }
        const resEl = document.getElementById('syn-results');
        const gateCta = document.getElementById('syn-paywall-checkout-btn');
        const resRect = resEl ? resEl.getBoundingClientRect() : null;
        const ctaRect = gateCta ? gateCta.getBoundingClientRect() : null;
        const inResults = Boolean(resRect && resRect.top < 140 && resRect.bottom > 180);
        const gateVisible = Boolean(ctaRect && ctaRect.top >= -20 && ctaRect.bottom <= window.innerHeight + 30);
        sticky.classList.toggle('is-visible', inResults && !gateVisible);
      };
      if (window.__synStickyScrollFn) window.removeEventListener('scroll', window.__synStickyScrollFn);
      window.__synStickyScrollFn = syncSticky;
      window.addEventListener('scroll', syncSticky, { passive: true });
      setTimeout(syncSticky, 250);
    }

    const triggerPrint = () => {
      if (!isReportUnlocked) return;
      closeLossModal();
      if (section) section.classList.add('is-unlocked');
      window.print();
    };
    if (printTop) printTop.addEventListener('click', triggerPrint);
    if (printBot) printBot.addEventListener('click', triggerPrint);
  };

  // GLOBAL PORTAL FLOATING TOOLTIP (ALWAYS #1 LAYER ON DOCUMENT.BODY)
  function initPortalTooltip() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    let portal = document.getElementById('syn-portal-tooltip');
    if (!portal) {
      if (!document.body) return;
      portal = document.createElement('div');
      portal.id = 'syn-portal-tooltip';
      document.body.appendChild(portal);
    }
    document.body.classList.add('has-syn-portal');
    if (window.__SYN_PORTAL_BOUND__) return;
    window.__SYN_PORTAL_BOUND__ = true;

    let activeAnchor = null;

    function positionPortal(anchor) {
      if (!portal || !anchor) return;
      const rect = anchor.getBoundingClientRect();
      const pRect = portal.getBoundingClientRect();
      let left = rect.left + (rect.width / 2) - (pRect.width / 2);
      const minLeft = 14;
      const maxLeft = Math.max(minLeft, window.innerWidth - pRect.width - 14);
      left = Math.max(minLeft, Math.min(maxLeft, left));

      let top;
      if (rect.top >= pRect.height + 18) {
        top = rect.top - pRect.height - 10;
      } else {
        top = rect.bottom + 10;
      }
      top = Math.max(12, Math.min(window.innerHeight - pRect.height - 12, top));
      portal.style.left = `${Math.round(left)}px`;
      portal.style.top = `${Math.round(top)}px`;
    }

    function showTooltip(anchor) {
      activeAnchor = anchor;
      let html = '';
      const tipEl = anchor.querySelector('.syn-tooltip-pop, .syn-asp-tip');
      if (tipEl) {
        html = tipEl.innerHTML;
      }
      if (!html) return;
      portal.innerHTML = html;
      portal.classList.add('is-visible');
      positionPortal(anchor);
    }

    function hideTooltip(target) {
      if (activeAnchor && (!target || activeAnchor === target || activeAnchor.contains(target))) {
        portal.classList.remove('is-visible');
        activeAnchor = null;
      }
    }

    document.addEventListener('mouseover', (e) => {
      const anchor = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (anchor) showTooltip(anchor.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || anchor);
    });

    document.addEventListener('mouseout', (e) => {
      const anchor = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (anchor) hideTooltip(anchor.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || anchor);
    });

    document.addEventListener('focusin', (e) => {
      const anchor = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (anchor) showTooltip(anchor.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || anchor);
    });

    document.addEventListener('focusout', (e) => {
      const anchor = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (anchor) hideTooltip(anchor.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || anchor);
    });

    document.addEventListener('click', (e) => {
      const raw = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (raw) {
        const anchor = raw.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || raw;
        showTooltip(anchor);
      } else if (activeAnchor) {
        portal.classList.remove('is-visible');
        activeAnchor = null;
      }
    });

    window.addEventListener('scroll', () => {
      if (activeAnchor) portal.classList.remove('is-visible');
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (activeAnchor) positionPortal(activeAnchor);
    }, { passive: true });
  }

  window.__INIT_PORTAL_TOOLTIP__ = initPortalTooltip;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortalTooltip);
  } else {
    initPortalTooltip();
  }
})();
