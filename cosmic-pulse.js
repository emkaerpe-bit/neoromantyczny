/**
 * NEOROMANTYCZNY — DEDYKOWANY ARKUSZ STYLÓW KONSOLI „PULS KOSMOSU”
 * Niezależny od bundla CSS, gwarantuje 100% identyczny wygląd Midnight Luxe na każdej podstronie.
 */
(function () {
  if (document.getElementById('neoromantyczny-cosmic-pulse-styles')) return;
  const style = document.createElement('style');
  style.id = 'neoromantyczny-cosmic-pulse-styles';
  style.textContent = `
    .cp-console {
      position: relative;
      border-radius: 2rem;
      border: 1px solid rgba(201, 169, 110, 0.28);
      background: linear-gradient(145deg, rgba(16, 16, 22, 0.95) 0%, rgba(11, 11, 16, 0.98) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      padding: 2rem 2.25rem;
      box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.9), 0 0 45px rgba(201, 169, 110, 0.08);
      color: #FAF8F5;
      font-family: 'Inter', -apple-system, sans-serif;
      overflow: hidden;
      text-align: left;
    }
    .cp-glow {
      position: absolute;
      top: -6rem;
      right: -6rem;
      width: 18rem;
      height: 18rem;
      border-radius: 9999px;
      background: radial-gradient(circle, rgba(201, 169, 110, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .cp-topbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding-bottom: 1.25rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .cp-badge-live {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.22em;
      color: #C9A96E;
      font-weight: 600;
    }
    .cp-dot-wrap {
      position: relative;
      display: inline-flex;
      width: 9px;
      height: 9px;
    }
    .cp-dot-ping {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 9999px;
      background: #C9A96E;
      opacity: 0.75;
      animation: cpPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    .cp-dot-core {
      position: relative;
      width: 9px;
      height: 9px;
      border-radius: 9999px;
      background: #C9A96E;
    }
    @keyframes cpPing {
      75%, 100% { transform: scale(2.4); opacity: 0; }
    }
    .cp-telemetry {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      letter-spacing: 0.16em;
      color: rgba(250, 248, 245, 0.65);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.6rem;
    }
    .cp-cards-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .cp-tab-card {
      appearance: none;
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.25rem;
      padding: 1.1rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      text-align: left;
      cursor: pointer;
      transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      color: #FAF8F5;
      width: 100%;
    }
    .cp-tab-card:hover {
      border-color: rgba(201, 169, 110, 0.45);
      background: rgba(201, 169, 110, 0.06);
      transform: translateY(-2px);
    }
    .cp-tab-card.cp-active {
      background: rgba(201, 169, 110, 0.12);
      border-color: rgba(201, 169, 110, 0.65);
      box-shadow: 0 10px 30px -10px rgba(201, 169, 110, 0.2);
    }
    .cp-icon-circle {
      width: 48px;
      height: 48px;
      border-radius: 9999px;
      border: 1px solid rgba(201, 169, 110, 0.4);
      background: rgba(201, 169, 110, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      color: #C9A96E;
      flex-shrink: 0;
    }
    .cp-card-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #C9A96E;
      margin-bottom: 0.2rem;
    }
    .cp-glyph {
      font-family: 'Segoe UI Symbol', 'Apple Symbols', 'Noto Sans Symbols 2', -apple-system, sans-serif;
      color: #C9A96E;
      font-weight: 400;
      font-style: normal;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      line-height: 1;
      height: 1.2em;
      position: relative;
      top: -0.05em;
    }
    .cp-chem-title {
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .cp-chem-item {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      line-height: 1.25;
    }
    .cp-chem-sep {
      color: rgba(201, 169, 110, 0.55);
      font-size: 0.85rem;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      user-select: none;
    }
    .cp-focus-deg {
      color: #C9A96E !important;
      font-weight: 600 !important;
    }
    .cp-card-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #FAF8F5;
      line-height: 1.25;
    }
    .cp-card-sub {
      font-size: 11px;
      color: rgba(250, 248, 245, 0.6);
      margin-top: 0.2rem;
    }
    .cp-briefing {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.5rem;
      padding: 1.5rem 1.75rem;
      margin-bottom: 1.5rem;
    }
    .cp-briefing-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .cp-element-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: #C9A96E;
      background: rgba(201, 169, 110, 0.12);
      border: 1px solid rgba(201, 169, 110, 0.3);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
    }
    .cp-insights-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1rem;
      margin-top: 1.25rem;
    }
    .cp-insight-box {
      padding: 1rem 1.15rem;
      border-radius: 1rem;
      font-size: 0.85rem;
      line-height: 1.55;
    }
    .cp-box-green { background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.22); }
    .cp-box-red { background: rgba(244, 63, 94, 0.06); border: 1px solid rgba(244, 63, 94, 0.22); }
    .cp-box-gold { background: rgba(201, 169, 110, 0.08); border: 1px solid rgba(201, 169, 110, 0.25); }
    .cp-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .cp-btn-outline {
      padding: 0.65rem 1.25rem;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FAF8F5;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      text-decoration: none;
      transition: all 0.25s;
    }
    .cp-btn-outline:hover { background: rgba(255, 255, 255, 0.12); border-color: #C9A96E; }
    .cp-btn-gold {
      padding: 0.65rem 1.35rem;
      border-radius: 9999px;
      background: #C9A96E;
      color: #0D0D12;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      text-decoration: none;
      transition: all 0.25s;
      box-shadow: 0 8px 25px rgba(201, 169, 110, 0.25);
    }
    .cp-btn-gold:hover { background: #FAF8F5; transform: translateY(-1px); }
    @media (max-width: 900px) {
      .cp-cards-grid, .cp-insights-grid { grid-template-columns: 1fr; }
      .cp-console { padding: 1.35rem 1.15rem; border-radius: 1.5rem; }
      .cp-briefing { padding: 1.15rem; }
    }
  `;
  document.head.appendChild(style);
})();


/**
 * NEOROMANTYCZNY — ASTRAL PRECISION ENGINE (LIVE EPHEMERIS)
 * Obliczenia astronomiczne w czasie rzeczywistym (Meeus / VSOP87 / ELP2000-82 uproszczone)
 */
(function () {
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;

  function norm360(deg) {
    return ((deg % 360) + 360) % 360;
  }

  function getJulianDay(date) {
    return date.getTime() / 86400000 + 2440587.5;
  }

  function computeSky(date) {
    const jd = getJulianDay(date);
    const T = (jd - 2451545.0) / 36525.0;

    // 1. Słońce (Meeus Ch. 25)
    const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
    const Mrad = M * DEG;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
            + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
            + 0.000289 * Math.sin(3 * Mrad);
    const sunLon = norm360(L0 + C);

    // 2. Księżyc (Meeus Ch. 47 - główne wyrazy perturbacyjne)
    const Lp = norm360(218.3164477 + 481267.88123421 * T);
    const D = norm360(297.8501921 + 445267.1114034 * T);
    const Mp = norm360(134.9633964 + 477198.8675055 * T);
    const F = norm360(93.2720950 + 483202.0175233 * T);

    const dL = 6.288774 * Math.sin(Mp * DEG)
             + 1.274027 * Math.sin((2 * D - Mp) * DEG)
             + 0.658314 * Math.sin(2 * D * DEG)
             + 0.213618 * Math.sin(2 * Mp * DEG)
             - 0.185116 * Math.sin(M * DEG)
             - 0.114332 * Math.sin(2 * F * DEG)
             + 0.058793 * Math.sin((2 * D - 2 * Mp) * DEG)
             + 0.057066 * Math.sin((2 * D - M - Mp) * DEG)
             + 0.053322 * Math.sin((2 * D + Mp) * DEG);
    const moonLon = norm360(Lp + dL);

    // 3. Wenus i Mars (Pełna transformacja Heliocentryczna Kepler/JPL -> Geocentryczna Ekliptyczna)
    function solveKepler(M_deg, e) {
      let Mk = norm360(M_deg) * DEG;
      let E = Mk;
      for (let i = 0; i < 6; i++) E = E - (E - e * Math.sin(E) - Mk) / (1 - e * Math.cos(E));
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
    const earthH = helioXY(1.00000261 + 0.00000562 * T, 0.01671123 - 0.00004392 * T, -0.00001531 - 0.01294668 * T, 100.46457166 + 35999.37244981 * T, 102.93768193 + 0.32327364 * T, 0.0);
    const venusH = helioXY(0.72333566 + 0.00000390 * T, 0.00677672 - 0.00004107 * T, 3.39467605 - 0.00078890 * T, 181.97909950 + 58517.81538729 * T, 131.60246718 + 0.00268329 * T, 76.67984255 - 0.27769418 * T);
    const marsH  = helioXY(1.52371034 + 0.00001847 * T, 0.09339410 + 0.00007882 * T, 1.84969142 - 0.00813131 * T, -4.55343205 + 19140.30268499 * T, -23.94362959 + 0.44441088 * T, 49.55953891 - 0.29257343 * T);

    const venusLon = norm360(Math.atan2(venusH.y - earthH.y, venusH.x - earthH.x) * RAD);
    const marsLon  = norm360(Math.atan2(marsH.y - earthH.y, marsH.x - earthH.x) * RAD);

    // 4. Faza Księżyca i oświetlenie tarczy
    const phaseAngle = norm360(moonLon - sunLon);
    const illumination = (1 - Math.cos(phaseAngle * DEG)) / 2;

    let phaseName = 'Nów Księżyca';
    if (phaseAngle >= 15 && phaseAngle < 75) phaseName = 'Sierp Przybywający';
    else if (phaseAngle >= 75 && phaseAngle < 105) phaseName = 'Pierwsza Kwadra';
    else if (phaseAngle >= 105 && phaseAngle < 165) phaseName = 'Garbaty Przybywający';
    else if (phaseAngle >= 165 && phaseAngle < 195) phaseName = 'Pełnia Księżyca';
    else if (phaseAngle >= 195 && phaseAngle < 255) phaseName = 'Garbaty Ubywający';
    else if (phaseAngle >= 255 && phaseAngle < 285) phaseName = 'Ostatnia Kwadra';
    else if (phaseAngle >= 285 && phaseAngle < 345) phaseName = 'Sierp Ubywający';

    return {
      jd,
      sunLon,
      moonLon,
      venusLon,
      marsLon,
      phaseAngle,
      illumination: Math.round(illumination * 100),
      phaseName
    };
  }

  function formatDegree(lon) {
    const signIndex = Math.floor(norm360(lon) / 30);
    const rem = norm360(lon) % 30;
    const deg = Math.floor(rem);
    const minFloat = (rem - deg) * 60;
    const min = Math.floor(minFloat);
    const sec = Math.floor((minFloat - min) * 60);
    return {
      signIndex,
      deg,
      min,
      sec,
      formatted: `${String(deg).padStart(2, '0')}° ${String(min).padStart(2, '0')}' ${String(sec).padStart(2, '0')}"`
    };
  }

  function renderMoonSvg(phaseAngle) {
    // Rysuje realistyczną złotą fazę Księżyca w SVG
    const r = 22;
    const isWaxing = phaseAngle <= 180;
    const cosPhase = Math.cos(phaseAngle * DEG);
    const rx = Math.abs(r * cosPhase);
    const sweepOuter = isWaxing ? 1 : 0;
    const sweepInner = (phaseAngle > 90 && phaseAngle < 270) ? (isWaxing ? 1 : 0) : (isWaxing ? 0 : 1);

    const d = `M 28 ${28 - r} A ${r} ${r} 0 0 ${sweepOuter} 28 ${28 + r} A ${rx.toFixed(2)} ${r} 0 0 ${sweepInner} 28 ${28 - r} Z`;
    return `<svg viewBox="0 0 56 56" class="w-14 h-14 shrink-0" aria-hidden="true">
      <circle cx="28" cy="28" r="25" fill="none" stroke="rgba(201,169,110,0.2)" stroke-width="1" stroke-dasharray="2 3"/>
      <circle cx="28" cy="28" r="${r}" fill="rgba(255,255,255,0.04)" stroke="rgba(201,169,110,0.45)" stroke-width="1.2"/>
      <path d="${d}" fill="url(#moonGoldGrad)"/>
      <defs>
        <linearGradient id="moonGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F5E6C4"/>
          <stop offset="100%" stop-color="#C9A96E"/>
        </linearGradient>
      </defs>
    </svg>`;
  }

  window.__NEOROMANTYCZNY_ASTRONOMY__ = { computeSky, formatDegree, renderMoonSvg };
})();


/**
 * NEOROMANTYCZNY — BAZA PSYCHOLOGII TRANZYTÓW (MIDNIGHT LUXE)
 */
(function () {
  const ZODIAC_DATA = [
    {
      name: 'Baran', genitive: 'Barana', symbol: '♈\uFE0E', element: 'Ogień', ruler: 'Mars',
      slug: '/blog/prezent-dla-barana-co-kupic',
      aura: 'Dzień bezpośrednich impulsów i magnetycznej szczerości. Napięcie w relacjach szuka natychmiastowego ujścia – półsłówka i dyplomatyczne uniki działają dziś jak płachta na byka.',
      greenLight: 'Spontaniczne zaproszenie w ostatniej chwili, odważny komplement, prezenty związane z adrenaliną, niszowym rzemiosłem i wyzwaniem.',
      redFlag: 'Przeciąganie decyzji, bierna agresja, zmuszanie partnera do długich i nużących analiz przeszłości.',
      scent: 'Czarny pieprz, czerwony grejpfrut, skóra i palone drewno cedrowe'
    },
    {
      name: 'Byk', genitive: 'Byka', symbol: '♉\uFE0E', element: 'Ziemia', ruler: 'Wenus',
      slug: '/blog/prezent-dla-byka-jak-trafic-w-gust',
      aura: 'Czas zmysłowego uziemienia i hedonistycznego spokoju. Emocje reagują dziś wyłącznie na dotyk, jakość materii, zapach i poczucie fizycznego bezpieczeństwa.',
      greenLight: 'Kolacja przy świecach, kaszmir, ciężkie flakony perfum, masaż i namacalne dowody obecności bez pośpiechu.',
      redFlag: 'Poganianie, zmiana planów w ostatniej chwili oraz plastikowe lub powierzchowne substytuty jakości.',
      scent: 'Figa śródziemnomorska, drzewo sandałowe, wanilia bourbon i wetyweria'
    },
    {
      name: 'Bliźnięta', genitive: 'Bliźniąt', symbol: '♊\uFE0E', element: 'Powietrze', ruler: 'Merkury',
      slug: '/blog/prezent-dla-blizniat-co-kupic',
      aura: 'Intelektualne iskrzenie i ciekawość, która nie znosi rutyny. Droga do bliskości prowadzi dziś wyłącznie przez błyskotliwą rozmowę, ironię i grę skojarzeń.',
      greenLight: 'Nieoczywista wiadomość w ciągu dnia, album konceptualny, limitowany gadżet lub wspólne odkrywanie nowego miejsca.',
      redFlag: 'Ciężki, dramatyczny ton rozmów, zazdrosne przesłuchania oraz przewidywalność.',
      scent: 'Bergamotka, biała herbata, kardamon i chłodny ozon'
    },
    {
      name: 'Rak', genitive: 'Raka', symbol: '♋\uFE0E', element: 'Woda', ruler: 'Księżyc',
      slug: '/blog/prezent-dla-raka-co-kupic',
      aura: 'Niezwykła wyostrzona intuicja i pamięć emocjonalna. Ludzie słyszą dziś ton Twojego głosu głośniej niż same słowa – każdy fałsz zostanie natychmiast wyczuty.',
      greenLight: 'Kameralny wieczór we dwoje, upominek nawiązujący do wspólnego wspomnienia, troska o detale domowego rytuału.',
      redFlag: 'Chłód emocjonalny, ironizowanie z cudzej wrażliwości oraz publiczne omawianie prywatnych spraw.',
      scent: 'Bursztyn, mleko migdałowe, irys i morska sól'
    },
    {
      name: 'Lew', genitive: 'Lwa', symbol: '♌\uFE0E', element: 'Ogień', ruler: 'Słońce',
      slug: '/blog/prezent-dla-lwa-co-kupic',
      aura: 'Aura królewskiego rozmachu i pragnienia bycia dostrzeżonym. W relacjach liczy się dziś gest z klasą, duma z partnera i autentyczny podziw.',
      greenLight: 'Spektakularna oprawa prezentu, złote akcenty, niszowa biżuteria i gest, który pokazuje, że druga osoba jest absolutnym priorytetem.',
      redFlag: 'Skąpstwo emocjonalne lub materialne, ignorowanie starań partnera oraz bylejakość.',
      scent: 'Szafran, kwiat pomarańczy, żywica benzoesowa i ciepłe złote piżmo'
    },
    {
      name: 'Panna', genitive: 'Panny', symbol: '♍\uFE0E', element: 'Ziemia', ruler: 'Merkury',
      slug: '/blog/prezent-dla-panny-co-kupic',
      aura: 'Analityczna precyzja i cichy język miłości wyrażany przez uważność. Dziś największe wrażenie robi to, że pamiętasz o drobiazgu, o którym ktoś wspomniał miesiąc temu.',
      greenLight: 'Minimalistyczny design, perfekcyjnie zaplanowany wieczór, japońska ceramika, luksusowa pielęgnacja i porządek w działaniu.',
      redFlag: 'Chaos, spóźnialstwo, krzykliwy kicz oraz nieprzemyślane zakupy na ostatnią chwilę.',
      scent: 'Hinoki (japoński cyprys), czysta bawełna, szałwia muszkatołowa i zielona herbata'
    },
    {
      name: 'Waga', genitive: 'Wagi', symbol: '♎\uFE0E', element: 'Powietrze', ruler: 'Wenus',
      slug: '/blog/prezent-dla-wagi-co-kupic',
      aura: 'Estetyczna wrażliwość podniesiona do rangi sztuki. Harmonia wizualna, takt i symetria w relacji decydują dziś o tym, czy między dwojgiem ludzi pojawi się chemia.',
      greenLight: 'Sztuka, autorskie flakony perfum, jedwab, galeria lub restauracja o nienagannym wnętrzu i wyrafinowany flirt.',
      redFlag: 'Wulgarność, podniesiony głos, brak wyczucia stylu oraz stawianie partnera pod ścianą.',
      scent: 'Róża damasceńska, różowy pieprz, białe piżmo i drzewo kaszmirowe'
    },
    {
      name: 'Skorpion', genitive: 'Skorpiona', symbol: '♏\uFE0E', element: 'Woda', ruler: 'Pluton',
      slug: '/blog/prezent-dla-skorpiona-co-kupic',
      aura: 'Magnetyczna głębia, psychologia cienia i zero tolerancji dla powierzchowności. Rozmowy schodzą dziś pod powierzchnię – liczy się wyłącznie absolutna prawda i intymność.',
      greenLight: 'Tajemniczy, hipnotyzujący zapach, literatura psychologiczna, zmysłowa bielizna i rozmowa w cztery oczy bez masek.',
      redFlag: 'Kłamstwa, wymuszone „small talki”, wścibskie pytania przy obcych i banalne upominki.',
      scent: 'Oud (agar), czarna skóra, kadzidło kościelne, tytoń i ciemna śliwka'
    },
    {
      name: 'Strzelec', genitive: 'Strzelca', symbol: '♐\uFE0E', element: 'Ogień', ruler: 'Jowisz',
      slug: '/blog/prezent-dla-strzelca-co-kupic',
      aura: 'Głód przestrzeni, filozoficznego rozmachu i wolności. Relacje potrzebują dziś świeżego powietrza, inspiracji i wyjścia poza utarte cztery ściany.',
      greenLight: 'Bilety w nieznane, rzemieślnicze akcesoria podróżne, egzotyczne smaki i rozmowy o wielkich wizjach.',
      redFlag: 'Zaborczość, małostkowe wypominanie drobiazgów oraz zamykanie relacji w sztywnych ramach.',
      scent: 'Kadzidło frankońskie, cynamon cejloński, jałowiec i dziki cedr'
    },
    {
      name: 'Koziorożec', genitive: 'Koziorożca', symbol: '♑\uFE0E', element: 'Ziemia', ruler: 'Saturn',
      slug: '/blog/prezent-dla-koziorozca-jak-przetrwac-bezlitosny-audyt',
      aura: 'Szlachetny minimalizm, dyscyplina i szacunek dla czasu. Uczucia wyraża się dziś poprzez niezawodność, konkret, lojalność i ponadczasowy status.',
      greenLight: 'Klasyka gatunku (skóra licowa, stal, pióro wieczne, wyselekcjonowany rocznik) oraz dotrzymane słowo bez zbędnych deklaracji.',
      redFlag: 'Infantylny dramatyzm, brak punktualności, obietnice bez pokrycia i tania tandeta.',
      scent: 'Wetyweria haitańska, mech dębowy, gorzka pomarańcza i chłodny grafit'
    },
    {
      name: 'Wodnik', genitive: 'Wodnika', symbol: '♒\uFE0E', element: 'Powietrze', ruler: 'Uran',
      slug: '/blog/prezent-dla-wodnika-jak-obdarowac-kogos-kto-zameldowal-sie-w-xxii-wieku',
      aura: 'Magnetyzm oryginalności i bunt przeciwko schematom. Największym afrodyzjakiem jest dziś intelektualna niezależność i zaskoczenie czymś unikatowym.',
      greenLight: 'Niszowy winyl, awangardowy obiekt designu, nowoczesna technologia i szacunek dla osobistej przestrzeni.',
      redFlag: 'Szantaż emocjonalny, oczekiwanie sztampowych zachowań oraz próby kontrolowania.',
      scent: 'Molekuły ambroksanu, metaliczny aldehyd, czarny bez i chłodny eukaliptus'
    },
    {
      name: 'Ryby', genitive: 'Ryb', symbol: '♓\uFE0E', element: 'Woda', ruler: 'Neptun',
      slug: '/blog/prezent-dla-ryb-jak-obdarowac-kogos-kto-operuje-w-zupelnie-innej-gestosci',
      aura: 'Oniryczna wrażliwość, empatia i poetycki odbiór rzeczywistości. Granice między słowem a przeczuciem zacierają się – dziś rządzi nastrój, muzyka i symbolika.',
      greenLight: 'Rytuał kąpielowy, analogowa fotografia, sztuka, niszowe świece zapachowe i czułość bez słów.',
      redFlag: 'Chłodny cynizm, brutalny pragmatyzm oraz wyśmiewanie marzeń i intuicji.',
      scent: 'Mirra, biała lilia wodna, drzewo gwajakowe i szara ambra'
    }
  ];

  window.__NEOROMANTYCZNY_ZODIAC_PULSE__ = ZODIAC_DATA;
})();


/**
 * NEOROMANTYCZNY — KONSOLA OBSERWATORIUM „PULS KOSMOSU NA ŻYWO”
 */
(function () {
  function initCosmicPulse() {
    const mount = document.getElementById('cosmic-pulse-mount');
    if (!mount || !window.__NEOROMANTYCZNY_ASTRONOMY__ || !window.__NEOROMANTYCZNY_ZODIAC_PULSE__) return;

    const { computeSky, formatDegree, renderMoonSvg } = window.__NEOROMANTYCZNY_ASTRONOMY__;
    const ZODIAC = window.__NEOROMANTYCZNY_ZODIAC_PULSE__;

    let activeTab = 'moon';

    function getSnapshot() {
      const now = new Date();
      const sky = computeSky(now);
      const sunPos = formatDegree(sky.sunLon);
      const moonPos = formatDegree(sky.moonLon);
      const venusPos = formatDegree(sky.venusLon);
      const marsPos = formatDegree(sky.marsLon);

      return {
        now,
        sky,
        sunPos,
        moonPos,
        venusPos,
        marsPos,
        sunSign: ZODIAC[sunPos.signIndex],
        moonSign: ZODIAC[moonPos.signIndex],
        venusSign: ZODIAC[venusPos.signIndex],
        marsSign: ZODIAC[marsPos.signIndex]
      };
    }

    function formatPlDate(d) {
      return d.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
    }

    function formatTime(d) {
      return d.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    function renderConsole() {
      const s = getSnapshot();
      const focusSign = activeTab === 'sun' ? s.sunSign : (activeTab === 'chemistry' ? s.venusSign : s.moonSign);
      const focusTitle = activeTab === 'sun'
        ? `Sezon ${s.sunSign.genitive} (<span class="cp-glyph">${s.sunSign.symbol}</span> <span class="cp-focus-deg" style="color:#C9A96E !important;">${s.sunPos.deg}°</span>)`
        : (activeTab === 'chemistry'
            ? `Wenus w znaku ${s.venusSign.genitive} <span class="cp-glyph">${s.venusSign.symbol}</span> × Mars w znaku ${s.marsSign.genitive} <span class="cp-glyph">${s.marsSign.symbol}</span>`
            : `Księżyc w znaku ${s.moonSign.genitive} (<span class="cp-glyph">${s.moonSign.symbol}</span> <span class="cp-focus-deg" style="color:#C9A96E !important;">${s.moonPos.deg}°</span>)`);

      mount.innerHTML = `
        <div class="cp-console" data-nosnippet>
          <div class="cp-glow"></div>

          <!-- Top Live Telemetry Bar -->
          <div class="cp-topbar">
            <div class="cp-badge-live">
              <span class="cp-dot-wrap">
                <span class="cp-dot-ping"></span>
                <span class="cp-dot-core"></span>
              </span>
              <span>Puls Kosmosu na Żywo • Efemeryda Astronomiczna</span>
            </div>
            <div class="cp-telemetry">
              <span id="cp-live-date">${formatPlDate(s.now)}</span>
              <span style="color:rgba(201,169,110,0.4);">•</span>
              <span id="cp-live-clock" style="color:#FAF8F5;">${formatTime(s.now)} CET</span>
              <span style="color:rgba(201,169,110,0.4);">•</span>
              <span id="cp-live-jd" style="color:#C9A96E;">JD ${s.sky.jd.toFixed(5)}</span>
            </div>
          </div>

          <!-- Planetary Cards Row -->
          <div class="cp-cards-grid">
            <button type="button" data-cp-tab="moon" class="cp-tab-card ${activeTab === 'moon' ? 'cp-active' : ''}">
              <div style="width:52px;height:52px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">${renderMoonSvg(s.sky.phaseAngle)}</div>
              <div style="min-width:0;">
                <div class="cp-card-label">☽ Tranzyt Księżyca (Aura Dnia)</div>
                <div class="cp-card-title">${s.moonSign.name} <span class="cp-glyph">${s.moonSign.symbol}</span> <span id="cp-moon-deg" style="font-family:monospace;font-size:12px;font-weight:400;color:#C9A96E;">${s.moonPos.formatted}</span></div>
                <div class="cp-card-sub">${s.sky.phaseName} (${s.sky.illumination}% oświetlenia)</div>
              </div>
            </button>

            <button type="button" data-cp-tab="sun" class="cp-tab-card ${activeTab === 'sun' ? 'cp-active' : ''}">
              <div class="cp-icon-circle">☉</div>
              <div style="min-width:0;">
                <div class="cp-card-label">☉ Słońce (Sezon Zodiakalny)</div>
                <div class="cp-card-title">${s.sunSign.name} <span class="cp-glyph">${s.sunSign.symbol}</span> <span id="cp-sun-deg" style="font-family:monospace;font-size:12px;font-weight:400;color:#C9A96E;">${s.sunPos.formatted}</span></div>
                <div class="cp-card-sub">Żywioł: ${s.sunSign.element} • Władca: ${s.sunSign.ruler}</div>
              </div>
            </button>

            <button type="button" data-cp-tab="chemistry" class="cp-tab-card ${activeTab === 'chemistry' ? 'cp-active' : ''}">
              <div class="cp-icon-circle" title="Wenus × Mars">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
                  <circle cx="8.5" cy="11.5" r="4.5"></circle>
                  <line x1="8.5" y1="16" x2="8.5" y2="21"></line>
                  <line x1="6" y1="18.5" x2="11" y2="18.5"></line>
                  <circle cx="15.5" cy="11.5" r="4.5"></circle>
                  <line x1="18.7" y1="8.3" x2="22" y2="5"></line>
                  <polyline points="18.5 5 22 5 22 8.5"></polyline>
                </svg>
              </div>
              <div style="min-width:0;">
                <div class="cp-card-label">♀ Wenus × ♂ Mars (Chemia)</div>
                <div class="cp-card-title cp-chem-title">
                  <span class="cp-chem-item">
                    <span>${s.venusSign.name}</span>
                    <span class="cp-glyph">${s.venusSign.symbol}</span>
                  </span>
                  <span class="cp-chem-sep">•</span>
                  <span class="cp-chem-item">
                    <span>${s.marsSign.name}</span>
                    <span class="cp-glyph">${s.marsSign.symbol}</span>
                  </span>
                </div>
                <div class="cp-card-sub">Wektor estetyki, bliskości i prezentów</div>
              </div>
            </button>
          </div>

          <!-- Active Psychological Briefing -->
          <div class="cp-briefing">
            <div class="cp-briefing-header">
              <div>
                <div style="font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.22em;color:#C9A96E;">Dzisiejszy Barometr Relacyjny i Prezentowy</div>
                <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:1.65rem;color:#FAF8F5;margin:0.25rem 0 0 0;font-weight:400;">${focusTitle}</h3>
              </div>
              <span class="cp-element-pill">Żywioł: ${focusSign.element}</span>
            </div>

            <p style="color:rgba(250,248,245,0.85);font-size:1rem;line-height:1.65;font-weight:300;margin:0;">${focusSign.aura}</p>

            <div class="cp-insights-grid">
              <div class="cp-insight-box cp-box-green">
                <div style="font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#34D399;margin-bottom:0.4rem;font-weight:600;">✓ Zielone światło (Co dziś działa)</div>
                <p style="color:rgba(250,248,245,0.82);margin:0;">${focusSign.greenLight}</p>
              </div>
              <div class="cp-insight-box cp-box-red">
                <div style="font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#FB7185;margin-bottom:0.4rem;font-weight:600;">✕ Czerwona flaga (Czego unikać)</div>
                <p style="color:rgba(250,248,245,0.82);margin:0;">${focusSign.redFlag}</p>
              </div>
              <div class="cp-insight-box cp-box-gold">
                <div style="font-family:monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#C9A96E;margin-bottom:0.4rem;font-weight:600;">✦ Signature Scent Dnia</div>
                <p style="color:rgba(250,248,245,0.88);margin:0;font-family:'Playfair Display',Georgia,serif;font-style:italic;">${focusSign.scent}</p>
              </div>
            </div>
          </div>

          <!-- Bottom Action Bar -->
          <div class="cp-footer">
            <a href="${focusSign.slug}" style="font-family:monospace;font-size:11.5px;text-transform:uppercase;letter-spacing:0.15em;color:#C9A96E;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;">
              <span>Czytaj pełny przewodnik dla znaku: ${focusSign.name} <span class="cp-glyph">${focusSign.symbol}</span></span>
              <span>&rarr;</span>
            </a>
            
          </div>
        </div>
      `;

      mount.querySelectorAll('.cp-tab-card').forEach(btn => {
        btn.addEventListener('click', () => {
          activeTab = btn.getAttribute('data-cp-tab');
          renderConsole();
        });
      });
    }

    renderConsole();

    setInterval(() => {
      const s = getSnapshot();
      const clockEl = document.getElementById('cp-live-clock');
      const jdEl = document.getElementById('cp-live-jd');
      const moonDegEl = document.getElementById('cp-moon-deg');
      const sunDegEl = document.getElementById('cp-sun-deg');
      if (clockEl) clockEl.textContent = `${formatTime(s.now)} CET`;
      if (jdEl) jdEl.textContent = `JD ${s.sky.jd.toFixed(5)}`;
      if (moonDegEl) moonDegEl.textContent = s.moonPos.formatted;
      if (sunDegEl) sunDegEl.textContent = s.sunPos.formatted;
    }, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCosmicPulse);
  } else {
    initCosmicPulse();
  }
})();
