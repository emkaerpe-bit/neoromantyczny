/**
 * NEOROMANTYCZNY — SILNIK SYNASTRII ASTRONOMICZNEJ & BI-WHEEL SVG
 */
(function () {
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;

  function norm360(d) { return ((d % 360) + 360) % 360; }

  const SYNASTRY_CITIES = [
    { id: 'warszawa', name: 'Warszawa', lat: 52.2297, lon: 21.0122, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'krakow', name: 'Kraków', lat: 50.0647, lon: 19.9450, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'wroclaw', name: 'Wrocław', lat: 51.1079, lon: 17.0385, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'poznan', name: 'Poznań', lat: 52.4064, lon: 16.9252, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'gdansk', name: 'Gdańsk', lat: 54.3520, lon: 18.6466, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'gdynia', name: 'Gdynia', lat: 54.5189, lon: 18.5305, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'sopot', name: 'Sopot', lat: 54.4416, lon: 18.5601, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'lodz', name: 'Łódź', lat: 51.7592, lon: 19.4560, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'katowice', name: 'Katowice', lat: 50.2649, lon: 19.0238, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'gliwice', name: 'Gliwice', lat: 50.2945, lon: 18.6714, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'zabrze', name: 'Zabrze', lat: 50.3249, lon: 18.7857, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'bytom', name: 'Bytom', lat: 50.3484, lon: 18.9157, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'rybnik', name: 'Rybnik', lat: 50.1022, lon: 18.5463, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'tychy', name: 'Tychy', lat: 50.1371, lon: 18.9664, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'sosnowiec', name: 'Sosnowiec', lat: 50.2863, lon: 19.1041, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'szczecin', name: 'Szczecin', lat: 53.4285, lon: 14.5528, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'lublin', name: 'Lublin', lat: 51.2465, lon: 22.5684, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'bydgoszcz', name: 'Bydgoszcz', lat: 53.1235, lon: 18.0084, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'torun', name: 'Toruń', lat: 53.0138, lon: 18.5984, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'bialystok', name: 'Białystok', lat: 53.1325, lon: 23.1688, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'rzeszow', name: 'Rzeszów', lat: 50.0412, lon: 21.9991, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'olsztyn', name: 'Olsztyn', lat: 53.7784, lon: 20.4801, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'kielce', name: 'Kielce', lat: 50.8661, lon: 20.6286, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'opole', name: 'Opole', lat: 50.6751, lon: 17.9213, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'zielona_gora', name: 'Zielona Góra', lat: 51.9356, lon: 15.5062, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'gorzow', name: 'Gorzów Wielkopolski', lat: 52.7325, lon: 15.2369, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'czestochowa', name: 'Częstochowa', lat: 50.8118, lon: 19.1203, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'radom', name: 'Radom', lat: 51.4027, lon: 21.1471, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'bielsko', name: 'Bielsko-Biała', lat: 49.8224, lon: 19.0444, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'tarnow', name: 'Tarnów', lat: 50.0121, lon: 20.9858, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'plock', name: 'Płock', lat: 52.5463, lon: 19.7065, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'koszalin', name: 'Koszalin', lat: 54.1944, lon: 16.1715, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'kalisz', name: 'Kalisz', lat: 51.7673, lon: 18.0853, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'legnica', name: 'Legnica', lat: 51.2070, lon: 16.1553, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'walbrzych', name: 'Wałbrzych', lat: 50.7714, lon: 16.2843, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'wloclawek', name: 'Włocławek', lat: 52.6483, lon: 19.0677, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'elblag', name: 'Elbląg', lat: 54.1561, lon: 19.4045, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'slupsk', name: 'Słupsk', lat: 54.4641, lon: 17.0285, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'nowy_sacz', name: 'Nowy Sącz', lat: 49.6175, lon: 20.7153, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'jelenia_gora', name: 'Jelenia Góra', lat: 50.9044, lon: 15.7194, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'siedlce', name: 'Siedlce', lat: 52.1676, lon: 22.2902, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'konin', name: 'Konin', lat: 52.2230, lon: 18.2511, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'pila', name: 'Piła', lat: 53.1515, lon: 16.7378, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'zamosc', name: 'Zamość', lat: 50.7231, lon: 23.2519, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'przemysl', name: 'Przemyśl', lat: 49.7838, lon: 22.7678, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'suwalki', name: 'Suwałki', lat: 54.1115, lon: 22.9308, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'kolobrzeg', name: 'Kołobrzeg', lat: 54.1759, lon: 15.5833, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'zakopane', name: 'Zakopane', lat: 49.2992, lon: 19.9496, tz: 'Europe/Warsaw', group: 'Polska' },
    { id: 'londyn', name: 'Londyn (UK)', lat: 51.5074, lon: -0.1278, tz: 'Europe/London', group: 'Zagranica' },
    { id: 'berlin', name: 'Berlin (DE)', lat: 52.5200, lon: 13.4050, tz: 'Europe/Berlin', group: 'Zagranica' },
    { id: 'paryz', name: 'Paryż (FR)', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris', group: 'Zagranica' },
    { id: 'amsterdam', name: 'Amsterdam (NL)', lat: 52.3676, lon: 4.9041, tz: 'Europe/Amsterdam', group: 'Zagranica' },
    { id: 'wieden', name: 'Wiedeń (AT)', lat: 48.2082, lon: 16.3738, tz: 'Europe/Vienna', group: 'Zagranica' },
    { id: 'rzym', name: 'Rzym (IT)', lat: 41.9028, lon: 12.4964, tz: 'Europe/Rome', group: 'Zagranica' },
    { id: 'madryt', name: 'Madryt (ES)', lat: 40.4168, lon: -3.7038, tz: 'Europe/Madrid', group: 'Zagranica' },
    { id: 'oslo', name: 'Oslo (NO)', lat: 59.9139, lon: 10.7522, tz: 'Europe/Oslo', group: 'Zagranica' },
    { id: 'sztokholm', name: 'Sztokholm (SE)', lat: 59.3293, lon: 18.0686, tz: 'Europe/Stockholm', group: 'Zagranica' },
    { id: 'nowy_jork', name: 'Nowy Jork (USA)', lat: 40.7128, lon: -74.0060, tz: 'America/New_York', group: 'Zagranica' },
    { id: 'chicago', name: 'Chicago (USA)', lat: 41.8781, lon: -87.6298, tz: 'America/Chicago', group: 'Zagranica' },
    { id: 'dubaj', name: 'Dubaj (UAE)', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai', group: 'Zagranica' }
  ];

  function normCityKey(s) {
    return String(s || '').toLowerCase().trim()
      .replace(/ł/g, 'l').replace(/ą/g, 'a').replace(/ę/g, 'e')
      .replace(/ś/g, 's').replace(/ć/g, 'c').replace(/ń/g, 'n')
      .replace(/ó/g, 'o').replace(/ź/g, 'z').replace(/ż/g, 'z');
  }

  function getCityById(rawInput) {
    const clean = String(rawInput || '').replace(/[<>"'`&]/g, '').trim().slice(0, 80);
    if (!clean) {
      return { id: 'default', name: 'Warszawa', lat: 52.05, lon: 20.43, tz: 'Europe/Warsaw', group: 'Polska' };
    }
    const nk = normCityKey(clean);

    // 1. Sprawdź bazę ACG_CITIES_DB jeśli załadowana (240+ miast Polski i świata)
    if (typeof window !== 'undefined' && window.ACG_CITIES_DB && Array.isArray(window.ACG_CITIES_DB.allCities)) {
      const match = window.ACG_CITIES_DB.allCities.find(c => {
        const cn = normCityKey(c.name);
        return cn === nk || cn.startsWith(nk) || nk.startsWith(cn);
      });
      if (match) return { id: nk, name: match.name, lat: match.lat, lon: match.lon, tz: match.tz || 'Europe/Warsaw', group: match.isPL ? 'Polska' : 'Zagranica' };
    }

    // 2. Sprawdź wbudowaną listę SYNASTRY_CITIES
    const exact = SYNASTRY_CITIES.find(c => c.id === nk || normCityKey(c.name) === nk);
    if (exact) return exact;
    const partial = SYNASTRY_CITIES.find(c => normCityKey(c.name).startsWith(nk) || nk.startsWith(normCityKey(c.name)));
    if (partial) return { ...partial, name: clean };

    // 3. Fallback do standardu centrum Polski (52.05, 20.43 - kalkulator ascendentu)
    return { id: 'custom', name: clean, lat: 52.05, lon: 20.43, tz: 'Europe/Warsaw', group: 'Polska' };
  }

  function getTzOffsetHours(y, m, d, hh, mm, tz) {
    try {
      const approxUtc = Date.UTC(y, m - 1, d, hh, mm, 0);
      const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });
      const parts = dtf.formatToParts(new Date(approxUtc));
      const map = {};
      parts.forEach(p => { map[p.type] = p.value; });
      const hr = map.hour === '24' ? 0 : Number(map.hour);
      const localAsUtc = Date.UTC(Number(map.year), Number(map.month) - 1, Number(map.day), hr, Number(map.minute), 0);
      return Math.round((localAsUtc - approxUtc) / 3600000);
    } catch (e) {
      return (m >= 4 && m <= 10) ? 2 : 1;
    }
  }

  function calcChart(dateStr, timeStr, cityId = 'warszawa') {
    const city = getCityById(cityId);
    const [y, m, d] = dateStr.split('-').map(Number);
    const hasTime = Boolean(timeStr && timeStr.includes(':'));
    const [hh, mm] = hasTime ? timeStr.split(':').map(Number) : [12, 0];

    const tzOffset = getTzOffsetHours(y, m, d, hh, mm, city.tz);
    const tzLabel = city.tz === 'Europe/Warsaw'
      ? (tzOffset === 2 ? 'CEST (UTC+2, czas letni)' : 'CET (UTC+1, czas zimowy)')
      : `UTC${tzOffset >= 0 ? '+' : ''}${tzOffset}`;

    const utcDate = new Date(Date.UTC(y, m - 1, d, hh - tzOffset, mm, 0));
    const jd = utcDate.getTime() / 86400000 + 2440587.5;
    const T = (jd - 2451545.0) / 36525.0;

    // 1. Słońce (Meeus)
    const L0 = norm360(280.46646 + 36000.76983 * T);
    const M = norm360(357.52911 + 35999.05029 * T);
    const C = (1.914602 - 0.004817 * T) * Math.sin(M * DEG) + 0.019993 * Math.sin(2 * M * DEG);
    const sun = norm360(L0 + C);

    // 2. Księżyc (Meeus ELP2000)
    const Lp = norm360(218.31645 + 481267.88123 * T);
    const D = norm360(297.85019 + 445267.11140 * T);
    const Mp = norm360(134.96340 + 477198.86751 * T);
    const F = norm360(93.27210 + 483202.01752 * T);
    const moon = norm360(
      Lp + 6.28877 * Math.sin(Mp * DEG)
      + 1.27403 * Math.sin((2 * D - Mp) * DEG)
      + 0.65831 * Math.sin(2 * D * DEG)
      + 0.21362 * Math.sin(2 * Mp * DEG)
      - 0.18512 * Math.sin(M * DEG)
      - 0.11433 * Math.sin(2 * F * DEG)
    );

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

    const venus = norm360(Math.atan2(venusH.y - earthH.y, venusH.x - earthH.x) * RAD);
    const mars  = norm360(Math.atan2(marsH.y - earthH.y, marsH.x - earthH.x) * RAD);

    // 4. Ascendent (jeśli znana godzina, dokładna szerokość i długość miasta + czas letni/zimowy)
    let asc = null;
    if (hasTime) {
      const gmst = norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0));
      const lst = norm360(gmst + city.lon);
      const eps = 23.43929 - 0.01300 * T;
      const yAsc = Math.cos(lst * DEG);
      const xAsc = -(Math.sin(eps * DEG) * Math.tan(city.lat * DEG) + Math.cos(eps * DEG) * Math.sin(lst * DEG));
      asc = norm360(Math.atan2(yAsc, xAsc) * RAD);
    }

    return { sun, moon, venus, mars, asc, hasTime, jd, city, tzOffset, tzLabel };
  }

  function analyzeSynastry(chartA, chartB) {
    const bodies = [
      { key: 'sun', label: 'Słońce', glyph: '☉' },
      { key: 'moon', label: 'Księżyc', glyph: '☽' },
      { key: 'venus', label: 'Wenus', glyph: '♀' },
      { key: 'mars', label: 'Mars', glyph: '♂' }
    ];

    const aspects = [];
    let chemistryRaw = 52;
    let securityRaw = 54;
    let frictionRaw = 26;

    const orbW = (orb, max) => Math.max(0.22, Math.pow(1 - (orb / max), 1.25));

    for (const bA of bodies) {
      for (const bB of bodies) {
        const diff = Math.abs(chartA[bA.key] - chartB[bB.key]);
        const angle = diff > 180 ? 360 - diff : diff;
        const isEroticPair = (bA.key === 'venus' || bA.key === 'mars') && (bB.key === 'venus' || bB.key === 'mars' || bB.key === 'sun' || bB.key === 'moon');
        const isMoonPair = (bA.key === 'moon' || bB.key === 'moon');
        const isMarsPair = (bA.key === 'mars' || bB.key === 'mars');

        let type = null;
        if (angle <= 8.0) {
          const w = orbW(angle, 8.0);
          type = { name: 'Koniunkcja (0°)', nature: 'intense', color: '#C9A96E', orb: angle };
          chemistryRaw += (isEroticPair ? 14.5 : 8.5) * w;
          if (isMoonPair && !isMarsPair) securityRaw += 11.5 * w;
          else if (isMarsPair && isMoonPair) { chemistryRaw += 6.0 * w; frictionRaw += 9.5 * w; securityRaw -= 3.5 * w; }
          else securityRaw += 5.5 * w;
        } else if (Math.abs(angle - 120) <= 7.0) {
          const orb = Math.abs(angle - 120);
          const w = orbW(orb, 7.0);
          type = { name: 'Trygon (120°)', nature: 'harmony', color: '#34D399', orb };
          securityRaw += (isMoonPair ? 12.0 : 8.5) * w;
          chemistryRaw += (isEroticPair ? 11.0 : 5.5) * w;
          frictionRaw -= 4.5 * w;
        } else if (Math.abs(angle - 60) <= 5.8) {
          const orb = Math.abs(angle - 60);
          const w = orbW(orb, 5.8);
          type = { name: 'Sekstyl (60°)', nature: 'harmony', color: '#34D399', orb };
          securityRaw += (isMoonPair ? 8.5 : 6.0) * w;
          chemistryRaw += (isEroticPair ? 8.5 : 4.5) * w;
          frictionRaw -= 2.5 * w;
        } else if (Math.abs(angle - 90) <= 6.8) {
          const orb = Math.abs(angle - 90);
          const w = orbW(orb, 6.8);
          type = { name: 'Kwadratura (90°)', nature: 'friction', color: '#FB7185', orb };
          frictionRaw += (isMarsPair || isMoonPair ? 13.5 : 9.5) * w;
          chemistryRaw += (isEroticPair ? 9.0 : 1.5) * w;
          securityRaw -= (isMoonPair ? 8.5 : 5.0) * w;
        } else if (Math.abs(angle - 180) <= 7.5) {
          const orb = Math.abs(angle - 180);
          const w = orbW(orb, 7.5);
          type = { name: 'Opozycja (180°)', nature: 'magnetic_polar', color: '#F59E0B', orb };
          chemistryRaw += (isEroticPair ? 12.5 : 7.5) * w;
          frictionRaw += (isMarsPair ? 10.5 : 7.0) * w;
          securityRaw -= (isMoonPair && isMarsPair ? 6.5 : 2.5) * w;
        }

        if (type) {
          aspects.push({
            pA: bA,
            pB: bB,
            lonA: chartA[bA.key],
            lonB: chartB[bB.key],
            angle: Math.round(angle),
            ...type
          });
        }
      }
    }

    aspects.sort((a, b) => (a.orb || 0) - (b.orb || 0));

    const elCompat = (lon1, lon2) => {
      const e1 = Math.floor(lon1 / 30) % 4;
      const e2 = Math.floor(lon2 / 30) % 4;
      if (e1 === e2) return 1.0;
      if ((e1 + e2) % 2 === 0) return 0.65;
      return -0.5;
    };

    securityRaw += elCompat(chartA.sun, chartB.sun) * 6.5 + elCompat(chartA.moon, chartB.moon) * 8.0 + elCompat(chartA.sun, chartB.moon) * 4.0;
    chemistryRaw += elCompat(chartA.venus, chartB.mars) * 6.0 + elCompat(chartB.venus, chartA.mars) * 6.0 + elCompat(chartA.sun, chartB.sun) * 3.5;
    if (elCompat(chartA.moon, chartB.moon) < 0) frictionRaw += 6.5;
    if (elCompat(chartA.mars, chartB.mars) < 0) frictionRaw += 5.0;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, Math.round(v)));
    return {
      chemistry: clamp(chemistryRaw, 38, 96),
      security: clamp(securityRaw, 31, 96),
      friction: clamp(frictionRaw, 18, 92),
      aspects: aspects.slice(0, 7)
    };
  }

  function declusterRing(planets, minGap = 16) {
    const n = planets.length;
    if (n <= 1) return planets.map(p => ({ ...p, displayLon: p.lon }));

    let list = planets.map((p, idx) => ({ ...p, origIdx: idx, displayLon: (p.lon % 360 + 360) % 360 }));

    list.sort((a, b) => a.displayLon - b.displayLon);
    let maxGap = -1;
    let cutIdx = 0;
    for (let i = 0; i < n; i++) {
      const nextIdx = (i + 1) % n;
      let gap = list[nextIdx].displayLon - list[i].displayLon;
      if (nextIdx === 0) gap += 360;
      if (gap > maxGap) {
        maxGap = gap;
        cutIdx = nextIdx;
      }
    }

    const cutAngle = list[cutIdx].displayLon;
    for (let i = 0; i < n; i++) {
      list[i].relAngle = (list[i].displayLon - cutAngle + 360) % 360;
    }
    list.sort((a, b) => a.relAngle - b.relAngle);

    for (let iter = 0; iter < 35; iter++) {
      let moved = false;
      for (let i = 0; i < n - 1; i++) {
        const diff = list[i + 1].relAngle - list[i].relAngle;
        if (diff < minGap) {
          const overlap = (minGap - diff) / 2;
          list[i].relAngle -= overlap;
          list[i + 1].relAngle += overlap;
          moved = true;
        }
      }
      if (!moved) break;
    }

    for (let i = 0; i < n; i++) {
      list[i].displayLon = (list[i].relAngle + cutAngle + 360) % 360;
    }

    list.sort((a, b) => a.origIdx - b.origIdx);
    return list;
  }


  const WHEEL_SIGN_INFO = [
    { name: 'Baran', glyph: '♈', elem: 'Ogień • Kardynalny', meaning: 'Śmiałość, bezpośredniość, szybki żar i potrzeba własnej przestrzeni.' },
    { name: 'Byk', glyph: '♉', elem: 'Ziemia • Stały', meaning: 'Zmysłowy spokój, wierność, potrzeba dotyku i budowania trwałego oparcia.' },
    { name: 'Bliźnięta', glyph: '♊', elem: 'Powietrze • Zmienny', meaning: 'Żywy dialog, intelektualny flirt, gra słowna i ciekawość partnera.' },
    { name: 'Rak', glyph: '♋', elem: 'Woda • Kardynalny', meaning: 'Głęboka czułość, wyczuwanie nastrojów, opiekuńczość i domowe ciepło.' },
    { name: 'Lew', glyph: '♌', elem: 'Ogień • Stały', meaning: 'Wyrazisty magnetyzm, duma, hojność w uczuciach i docenianie partnera.' },
    { name: 'Panna', glyph: '♍', elem: 'Ziemia • Zmienny', meaning: 'Dyskretna troska, słowność w małych sprawach, ład i konkretna pomoc.' },
    { name: 'Waga', glyph: '♎', elem: 'Powietrze • Kardynalny', meaning: 'Estetyka, takt, kultura dialogu i szukanie równowagi w parze.' },
    { name: 'Skorpion', glyph: '♏', elem: 'Woda • Stały', meaning: 'Głębokie zaangażowanie, prawda bez uników, erotyczna siła i wyłączność.' },
    { name: 'Strzelec', glyph: '♐', elem: 'Ogień • Zmienny', meaning: 'Wspólny horyzont, radość z odkrywania świata, humor i oddech.' },
    { name: 'Koziorożec', glyph: '♑', elem: 'Ziemia • Stały', meaning: 'Spokojne zaufanie na lata, powaga, dojrzałość i dotrzymywanie słowa.' },
    { name: 'Wodnik', glyph: '♒', elem: 'Powietrze • Stały', meaning: 'Nieszablonowa przyjaźń, porozumienie myśli, brak sztywnych ról i szacunek dla odrębności.' },
    { name: 'Ryby', glyph: '♓', elem: 'Woda • Zmienny', meaning: 'Ciche wyczucie, miękka wrażliwość, czułość i bliskość bez udawania.' }
  ];

  const WHEEL_BODY_DEFS = {
    sun: { label: 'Słońce', role: 'Świadome Ja, rdzeń tożsamości, wola życiowa i styl wyrażania siebie.' },
    moon: { label: 'Księżyc', role: 'Świat emocji, potrzeba bezpiecznego domu, nawyki i wrażliwość.' },
    venus: { label: 'Wenus', role: 'Język miłości, poczucie piękna, styl uwodzenia i to, co zachwyca.' },
    mars: { label: 'Mars', role: 'Temperatura pożądania, inicjatywa i sposób rozładowywania gniewu.' }
  };

  function renderBiWheelSvg(chartA, chartB, aspects, nameA = 'Osoba A', nameB = 'Osoba B') {
    const escSvg = (s) => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const safeA = escSvg(nameA);
    const safeB = escSvg(nameB);
    const cx = 160, cy = 160, rOuter = 138, rMid = 104, rInner = 74;
    const ZODIAC_SVG_PATHS = ["<path d=\"M 8.5 13.5 C 7.5 8.5, 14 7.5, 16 14.5 L 16 25 M 23.5 13.5 C 24.5 8.5, 18 7.5, 16 14.5\"/>","<circle cx=\"16\" cy=\"19\" r=\"5.2\"/><path d=\"M 8.5 9.5 C 10.5 14, 21.5 14, 23.5 9.5\"/>","<path d=\"M 8.5 9 C 12.5 11.2, 19.5 11.2, 23.5 9 M 8.5 23 C 12.5 20.8, 19.5 20.8, 23.5 23 M 12.8 10.3 L 12.8 21.7 M 19.2 10.3 L 19.2 21.7\"/>","<circle cx=\"10.2\" cy=\"13.5\" r=\"3.2\"/><circle cx=\"21.8\" cy=\"18.5\" r=\"3.2\"/><path d=\"M 7.5 11.7 C 11 7.6, 19.5 7.6, 25 11 M 24.5 20.3 C 21 24.4, 12.5 24.4, 7 21\"/>","<circle cx=\"10.5\" cy=\"18.5\" r=\"3\"/><path d=\"M 12.8 16.2 C 11.5 9.5, 19.5 7.5, 20.5 13.5 C 21.2 17.5, 18.5 22, 22 22.5 C 23.5 22.7, 24.5 21.5, 24.5 20.2\"/>","<path d=\"M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20.5 C 18.4 23.5, 21 24.5, 23 23 M 18.4 15 C 21.5 12.5, 24.5 14.5, 22.5 18.5 C 21 21, 17.5 22.5, 15.8 24\"/>","<path d=\"M 7.5 18.5 L 12.2 18.5 A 4.8 4.8 0 1 1 19.8 18.5 L 24.5 18.5 M 7.5 22.5 L 24.5 22.5\"/>","<path d=\"M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20 C 18.4 23, 21.5 23, 24 19.5 M 21.2 19.2 L 24.2 19.2 L 24.2 22.2\"/>","<path d=\"M 8.5 23.5 L 23.5 8.5 M 16.5 8.5 L 23.5 8.5 L 23.5 15.5 M 11.5 14.5 L 17.5 20.5\"/>","<path d=\"M 7.5 11.5 L 10 10 L 13.2 20.5 L 16.8 11.5 C 18 9, 21.5 9.5, 21.5 13.5 C 21.5 18, 24.2 21, 21 23.5 C 18.5 25, 16.2 23, 17.2 20.5 C 18.2 18.5, 21.5 18.8, 24 21\"/>","<path d=\"M 7.5 14.5 L 10.5 11.5 L 13.2 14.5 L 16 11.5 L 18.8 14.5 L 21.5 11.5 L 24.5 14.5 M 7.5 20.5 L 10.5 17.5 L 13.2 20.5 L 16 17.5 L 18.8 20.5 L 21.5 17.5 L 24.5 20.5\"/>","<path d=\"M 10 8.5 C 14.5 12.5, 14.5 19.5, 10 23.5 M 22 8.5 C 17.5 12.5, 17.5 19.5, 22 23.5 M 7.5 16 L 24.5 16\"/>"];

    let ticks = '';
    for (let i = 0; i < 12; i++) {
      const a1 = (i * 30 - 90) * DEG;
      const aMid = (i * 30 + 15 - 90) * DEG;
      const x1 = cx + rMid * Math.cos(a1), y1 = cy + rMid * Math.sin(a1);
      const x2 = cx + rOuter * Math.cos(a1), y2 = cy + rOuter * Math.sin(a1);
      const gx = cx + ((rOuter + rMid) / 2) * Math.cos(aMid);
      const gy = cy + ((rOuter + rMid) / 2) * Math.sin(aMid);
      const s = WHEEL_SIGN_INFO[i];
      ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(201,169,110,0.25)" stroke-width="1"/>`;
      ticks += `
        <g class="syn-wheel-hit" tabindex="0" role="button"
           data-type="sign"
           data-name="${s.name}"
           data-glyph="${s.glyph}"
           data-elem="${s.elem}"
           data-meaning="${s.meaning}"
           data-color="#C9A96E"
           data-cx="${gx.toFixed(1)}"
           data-cy="${gy.toFixed(1)}">
          <circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="14" fill="transparent" class="syn-hit-area"/>
          <g transform="translate(${(gx - 7).toFixed(1)}, ${(gy - 7).toFixed(1)}) scale(0.4375)" fill="none" stroke="rgba(201,169,110,0.8)" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="syn-sign-text">${ZODIAC_SVG_PATHS[i]}</g>
        </g>`;
    }

    const rawA = [
      { key: 'sun', g: '☉', label: 'Słońce', lon: chartA.sun },
      { key: 'moon', g: '☽', label: 'Księżyc', lon: chartA.moon },
      { key: 'venus', g: '♀', label: 'Wenus', lon: chartA.venus },
      { key: 'mars', g: '♂', label: 'Mars', lon: chartA.mars }
    ];
    const rawB = [
      { key: 'sun', g: '☉', label: 'Słońce', lon: chartB.sun },
      { key: 'moon', g: '☽', label: 'Księżyc', lon: chartB.moon },
      { key: 'venus', g: '♀', label: 'Wenus', lon: chartB.venus },
      { key: 'mars', g: '♂', label: 'Mars', lon: chartB.mars }
    ];

    const pListA = declusterRing(rawA, 17);
    const pListB = declusterRing(rawB, 14);

    const mapA = {}, mapB = {};
    pListA.forEach(p => mapA[p.key] = p);
    pListB.forEach(p => mapB[p.key] = p);

    let lines = '';
    for (const asp of aspects) {
      const dispLonA = mapA[asp.pA.key] ? mapA[asp.pA.key].displayLon : asp.lonA;
      const dispLonB = mapB[asp.pB.key] ? mapB[asp.pB.key].displayLon : asp.lonB;
      const aA = (dispLonA - 90) * DEG;
      const aB = (dispLonB - 90) * DEG;
      const x1 = cx + rInner * Math.cos(aA), y1 = cy + rInner * Math.sin(aA);
      const x2 = cx + rMid * Math.cos(aB), y2 = cy + rMid * Math.sin(aB);
      const midX = ((x1 + x2) / 2).toFixed(1);
      const midY = ((y1 + y2) / 2).toFixed(1);
      const tip = (window.__GET_ASPECT_MUGOL_TIP__ && window.__GET_ASPECT_MUGOL_TIP__(asp.name)) || { desc: 'Interakcja planetarna' };
      const safeDesc = (tip.desc || '').replace(/"/g, '&quot;');
      lines += `
        <g class="syn-wheel-hit" tabindex="0" role="button"
           data-type="aspect"
           data-name="${asp.name}"
           data-color="${asp.color}"
           data-planets="${safeA} (${asp.pA.glyph} ${asp.pA.label}) &harr; ${safeB} (${asp.pB.glyph} ${asp.pB.label})"
           data-meaning="${safeDesc}"
           data-cx="${midX}"
           data-cy="${midY}">
          <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="transparent" stroke-width="14" class="syn-hit-area"/>
          <line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${asp.color}" stroke-width="1.25" stroke-opacity="0.75" class="syn-aspect-visible-line"/>
        </g>`;
    }

    let leaderLines = '';
    let dots = '';

    for (const p of pListA) {
      const aDisp = (p.displayLon - 90) * DEG;
      const xA = cx + rInner * Math.cos(aDisp), yA = cy + rInner * Math.sin(aDisp);

      const diff = Math.abs(p.displayLon - p.lon);
      const angleDiff = diff > 180 ? 360 - diff : diff;
      if (angleDiff > 1.8) {
        const aTrue = (p.lon - 90) * DEG;
        const xTrue = cx + (rInner - 3) * Math.cos(aTrue), yTrue = cy + (rInner - 3) * Math.sin(aTrue);
        const xTick = cx + (rInner + 3) * Math.cos(aTrue), yTick = cy + (rInner + 3) * Math.sin(aTrue);
        leaderLines += `<line x1="${xTrue.toFixed(1)}" y1="${yTrue.toFixed(1)}" x2="${xTick.toFixed(1)}" y2="${yTick.toFixed(1)}" stroke="#FAF8F5" stroke-width="1.2" stroke-opacity="0.6"/>`;
        leaderLines += `<line x1="${xTick.toFixed(1)}" y1="${yTick.toFixed(1)}" x2="${xA.toFixed(1)}" y2="${yA.toFixed(1)}" stroke="#FAF8F5" stroke-width="0.75" stroke-dasharray="1.5,1.5" stroke-opacity="0.45"/>`;
      }

      const sIdx = Math.floor((((p.lon % 360) + 360) % 360) / 30);
      const degInSign = Math.floor(p.lon % 30);
      const sign = WHEEL_SIGN_INFO[sIdx] || WHEEL_SIGN_INFO[0];
      const def = WHEEL_BODY_DEFS[p.key] || { label: p.key, role: 'Wpływ planetarny' };

      dots += `
        <g class="syn-wheel-hit" tabindex="0" role="button"
           data-type="planet"
           data-person="${safeA}"
           data-role="Biel (Ty)"
           data-label="${def.label}"
           data-glyph="${p.g}"
           data-sign="${sign.name}"
           data-sign-glyph="${sign.glyph}"
           data-deg="${degInSign}°"
           data-meaning="${def.role}"
           data-color="#FAF8F5"
           data-cx="${xA.toFixed(1)}"
           data-cy="${yA.toFixed(1)}">
          <circle cx="${xA.toFixed(1)}" cy="${yA.toFixed(1)}" r="14" fill="transparent" class="syn-hit-area"/>
          <circle cx="${xA.toFixed(1)}" cy="${yA.toFixed(1)}" r="9" fill="#0D0D12" stroke="#FAF8F5" stroke-width="1.2" class="syn-node-circle"/>
          <text x="${xA.toFixed(1)}" y="${(yA + 3.5).toFixed(1)}" text-anchor="middle" fill="#FAF8F5" font-size="10" pointer-events="none">${p.g}</text>
        </g>`;
    }

    for (const p of pListB) {
      const aDisp = (p.displayLon - 90) * DEG;
      const xB = cx + rMid * Math.cos(aDisp), yB = cy + rMid * Math.sin(aDisp);

      const diff = Math.abs(p.displayLon - p.lon);
      const angleDiff = diff > 180 ? 360 - diff : diff;
      if (angleDiff > 1.8) {
        const aTrue = (p.lon - 90) * DEG;
        const xTrue = cx + (rMid - 3) * Math.cos(aTrue), yTrue = cy + (rMid - 3) * Math.sin(aTrue);
        const xTick = cx + (rMid + 3) * Math.cos(aTrue), yTick = cy + (rMid + 3) * Math.sin(aTrue);
        leaderLines += `<line x1="${xTrue.toFixed(1)}" y1="${yTrue.toFixed(1)}" x2="${xTick.toFixed(1)}" y2="${yTick.toFixed(1)}" stroke="#C9A96E" stroke-width="1.2" stroke-opacity="0.6"/>`;
        leaderLines += `<line x1="${xTick.toFixed(1)}" y1="${yTick.toFixed(1)}" x2="${xB.toFixed(1)}" y2="${yB.toFixed(1)}" stroke="#C9A96E" stroke-width="0.75" stroke-dasharray="1.5,1.5" stroke-opacity="0.45"/>`;
      }

      const sIdx = Math.floor((((p.lon % 360) + 360) % 360) / 30);
      const degInSign = Math.floor(p.lon % 30);
      const sign = WHEEL_SIGN_INFO[sIdx] || WHEEL_SIGN_INFO[0];
      const def = WHEEL_BODY_DEFS[p.key] || { label: p.key, role: 'Wpływ planetarny' };

      dots += `
        <g class="syn-wheel-hit" tabindex="0" role="button"
           data-type="planet"
           data-person="${safeB}"
           data-role="Złoto (Partner)"
           data-label="${def.label}"
           data-glyph="${p.g}"
           data-sign="${sign.name}"
           data-sign-glyph="${sign.glyph}"
           data-deg="${degInSign}°"
           data-meaning="${def.role}"
           data-color="#C9A96E"
           data-cx="${xB.toFixed(1)}"
           data-cy="${yB.toFixed(1)}">
          <circle cx="${xB.toFixed(1)}" cy="${yB.toFixed(1)}" r="14" fill="transparent" class="syn-hit-area"/>
          <circle cx="${xB.toFixed(1)}" cy="${yB.toFixed(1)}" r="9" fill="#0D0D12" stroke="#C9A96E" stroke-width="1.2" class="syn-node-circle"/>
          <text x="${xB.toFixed(1)}" y="${(yB + 3.5).toFixed(1)}" text-anchor="middle" fill="#C9A96E" font-size="10" pointer-events="none">${p.g}</text>
        </g>`;
    }

    return `<svg viewBox="0 0 320 320" style="width:100%;max-width:290px;height:auto;margin:0 auto;display:block;">
      <circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="none" stroke="rgba(201,169,110,0.4)" stroke-width="1.2"/>
      <circle cx="${cx}" cy="${cy}" r="${rMid}" fill="rgba(255,255,255,0.015)" stroke="rgba(201,169,110,0.3)" stroke-width="1"/>
      <circle cx="${cx}" cy="${cy}" r="${rInner}" fill="rgba(13,13,18,0.9)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      ${ticks}${lines}${leaderLines}${dots}
    </svg>`;
  }


  window.__SYNASTRY_ASTRO__ = { calcChart, analyzeSynastry, renderBiWheelSvg, SYNASTRY_CITIES, getCityById };
})();

// Part 2: Profile prezentowe ładowane z synastry-texts-pro.js
const SYNASTRY_PROFILES = (typeof window !== 'undefined' && window.__SYN_GIFT_PROFILES__) || [];

const DEFAULT_WHEEL_HINT = '✦ Dotknij lub najedź na dowolną planetę, znak lub aspekt na kole, aby odkryć jego znaczenie';

function escapeHtmlSyn(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function buildRelationalCollisionBridge(chartA, chartB, rawNameA, rawNameB, syn, gAIn, gBIn) {
  const F = typeof window !== 'undefined' && window.__SYNASTRY_FREE_TEXTS__;
  if (F && typeof F.buildMoonCollision === 'function') {
    return F.buildMoonCollision(chartA, chartB, rawNameA, rawNameB, syn, gAIn, gBIn);
  }
  return '';
}


// Part 4: Synastry Results Dashboard Renderer (Gender-aware: Male 'm' & Female 'f')
window.__SYNASTRY_UI_RENDER__ = function (container, d) {
  const { nameA, genderA, dateA, nameB, genderB, dateB, cA, cB, syn, svgWheel, sunA, moonA, venA, marA, sunB, moonB, venB, marB } = d;

  function inferGenderFromName(name, fallbackGender) {
    if (!name || typeof name !== 'string' || !name.trim()) return fallbackGender;
    const trimmed = name.trim().toLowerCase();
    if (trimmed.length < 2) return fallbackGender;
    const maleExceptions = ['kuba', 'barnaba', 'kosma', 'bonawentura', 'jarema', 'zawisza'];
    if (maleExceptions.includes(trimmed)) return 'm';
    const femaleExceptions = ['noemi', 'inez', 'carmen', 'miriam', 'beatrycze'];
    if (femaleExceptions.includes(trimmed)) return 'f';
    if (trimmed.endsWith('a')) return 'f';
    return 'm';
  }

  const effectiveGenderA = inferGenderFromName(nameA, genderA);
  const effectiveGenderB = inferGenderFromName(nameB, genderB);

  const isFemA = effectiveGenderA === 'f';
  const isFemB = effectiveGenderB === 'f';

  const jData = (typeof window !== 'undefined' && window.__JUNGIAN_PROFILES__) || {};
  const jProfMoonA = (jData[moonA.idx] && jData[moonA.idx][isFemA ? 'f' : 'm']) || moonA.profile[isFemA ? 'f' : 'm'];
  const jProfMoonB = (jData[moonB.idx] && jData[moonB.idx][isFemB ? 'f' : 'm']) || moonB.profile[isFemB ? 'f' : 'm'];
  const jProfVenB  = (jData[venB.idx] && jData[venB.idx][isFemB ? 'f' : 'm']) || venB.profile[isFemB ? 'f' : 'm'];
  const jProfSunB  = (jData[sunB.idx] && jData[sunB.idx][isFemB ? 'f' : 'm']) || sunB.profile[isFemB ? 'f' : 'm'];

  const safeNameA = escapeHtmlSyn(nameA);
  const safeNameB = escapeHtmlSyn(nameB);
  const loveTitleB = `Jak kocha ${safeNameB}?`;
  const pronounGenB = isFemB ? 'jej' : 'jego';
  const pronounAccB = isFemB ? 'ją' : 'go';
  const sunNounB    = isFemB ? `Urodzeniowe Słońce partnerki` : `Urodzeniowe Słońce partnera`;

  const jungianDiag = (typeof window !== 'undefined' && window.__GENERATE_JUNGIAN_DIAGNOSIS__ && window.__GENERATE_JUNGIAN_DIAGNOSIS__(d)) || {
    title: 'Ciche Przymierze i Głębia Przyciągania',
    hook: 'W synastrii ten układ odsłania spotkanie dwojga ludzi, którzy szybko rozpoznają u siebie nawzajem zarówno naturalną bliskość, jak i czułe miejsca wymagające uważności.',
    moonTitle: 'Dynamika Emocjonalna',
    moonDesc: 'Spotkanie dwóch wrażliwości sprzyja bliskości, gdy towarzyszy mu spokój i szacunek dla granic.'
  };

  const ascTextB = cB.asc !== null ? `${ZODIAC_GLYPHS_MAP(cB.asc)}` : 'Brak godziny';

  function ZODIAC_GLYPHS_MAP(lon) {
    const names = ['Baran','Byk','Bliźnięta','Rak','Lew','Panna','Waga','Skorpion','Strzelec','Koziorożec','Wodnik','Ryby'];
    const glyphs = ["<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 8.5 13.5 C 7.5 8.5, 14 7.5, 16 14.5 L 16 25 M 23.5 13.5 C 24.5 8.5, 18 7.5, 16 14.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><circle cx=\"16\" cy=\"19\" r=\"5.2\"/><path d=\"M 8.5 9.5 C 10.5 14, 21.5 14, 23.5 9.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 8.5 9 C 12.5 11.2, 19.5 11.2, 23.5 9 M 8.5 23 C 12.5 20.8, 19.5 20.8, 23.5 23 M 12.8 10.3 L 12.8 21.7 M 19.2 10.3 L 19.2 21.7\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><circle cx=\"10.2\" cy=\"13.5\" r=\"3.2\"/><circle cx=\"21.8\" cy=\"18.5\" r=\"3.2\"/><path d=\"M 7.5 11.7 C 11 7.6, 19.5 7.6, 25 11 M 24.5 20.3 C 21 24.4, 12.5 24.4, 7 21\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><circle cx=\"10.5\" cy=\"18.5\" r=\"3\"/><path d=\"M 12.8 16.2 C 11.5 9.5, 19.5 7.5, 20.5 13.5 C 21.2 17.5, 18.5 22, 22 22.5 C 23.5 22.7, 24.5 21.5, 24.5 20.2\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20.5 C 18.4 23.5, 21 24.5, 23 23 M 18.4 15 C 21.5 12.5, 24.5 14.5, 22.5 18.5 C 21 21, 17.5 22.5, 15.8 24\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 18.5 L 12.2 18.5 A 4.8 4.8 0 1 1 19.8 18.5 L 24.5 18.5 M 7.5 22.5 L 24.5 22.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20 C 18.4 23, 21.5 23, 24 19.5 M 21.2 19.2 L 24.2 19.2 L 24.2 22.2\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 8.5 23.5 L 23.5 8.5 M 16.5 8.5 L 23.5 8.5 L 23.5 15.5 M 11.5 14.5 L 17.5 20.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 11.5 L 10 10 L 13.2 20.5 L 16.8 11.5 C 18 9, 21.5 9.5, 21.5 13.5 C 21.5 18, 24.2 21, 21 23.5 C 18.5 25, 16.2 23, 17.2 20.5 C 18.2 18.5, 21.5 18.8, 24 21\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 14.5 L 10.5 11.5 L 13.2 14.5 L 16 11.5 L 18.8 14.5 L 21.5 11.5 L 24.5 14.5 M 7.5 20.5 L 10.5 17.5 L 13.2 20.5 L 16 17.5 L 18.8 20.5 L 21.5 17.5 L 24.5 20.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 10 8.5 C 14.5 12.5, 14.5 19.5, 10 23.5 M 22 8.5 C 17.5 12.5, 17.5 19.5, 22 23.5 M 7.5 16 L 24.5 16\"/></svg>"];
    const i = Math.floor((((lon % 360) + 360) % 360) / 30);
    return `<span class="syn-glyph">${glyphs[i]}</span> ${names[i]} ${Math.floor(lon % 30)}°`;
  }

  const mailSubject = encodeURIComponent(`Konsultacja Synastrii Partnerskiej: ${nameA} (${sunA.name}) & ${nameB} (${sunB.name})`);
  const mailBody = encodeURIComponent(
    `Dzień dobry,\n\nProszę o prywatną analizę synastrii partnerskiej 1:1:\n` +
    `- Osoba 1 (${nameA}, ${isFemA ? 'Kobieta' : 'Mężczyzna'}): ur. ${dateA} | Słońce: ${sunA.name}, Księżyc: ${moonA.name}, Wenus: ${venA.name}, Mars: ${marA.name}\n` +
    `- Osoba 2 (${nameB}, ${isFemB ? 'Kobieta' : 'Mężczyzna'}): ur. ${dateB} | Słońce: ${sunB.name}, Księżyc: ${moonB.name}, Wenus: ${venB.name}, Mars: ${marB.name}\n` +
    `- Wyliczone indeksy: Chemia ${syn.chemistry}%, Bezpieczeństwo ${syn.security}%, Napięcie ${syn.friction}%\n\n` +
    `Najważniejsze pytanie dotyczące naszej relacji:\n`
  );

  const aspectItems = syn.aspects.map(a => {
    const tip = (window.__GET_ASPECT_MUGOL_TIP__ && window.__GET_ASPECT_MUGOL_TIP__(a.name)) || { title: a.name, desc: 'Aspekt planetarny.' };
    return `
      <div class="syn-key-aspect-card" style="border-left-color:${a.color};">
        <div class="syn-key-aspect-planets">
          <span class="syn-ka-partner"><strong>${safeNameA}:</strong> <span class="syn-glyph">${a.pA.glyph}</span> ${a.pA.label}</span>
          <span class="syn-ka-arrow">&harr;</span>
          <span class="syn-ka-partner"><strong>${safeNameB}:</strong> <span class="syn-glyph">${a.pB.glyph}</span> ${a.pB.label}</span>
        </div>
        <div class="syn-key-aspect-badge-wrap">
          <span class="syn-asp-badge" tabindex="0" style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:${a.color};">
            <span style="white-space:nowrap;">${a.name} <span class="syn-info-pill" style="font-size:8px;padding:1px 5px;margin-left:3px;">ⓘ</span></span>
            <span class="syn-asp-tip">
              <strong style="color:${a.color};display:block;margin-bottom:4px;font-size:0.8rem;">${tip.title}</strong>
              ${tip.desc}
            </span>
          </span>
        </div>
      </div>`;
  }).join('');

  const cityInfoA = cA.city ? `${escapeHtmlSyn(cA.city.name)} (${escapeHtmlSyn(cA.tzLabel.split(',')[0])})` : 'Polska';
  const cityInfoB = cB.city ? `${escapeHtmlSyn(cB.city.name)} (${escapeHtmlSyn(cB.tzLabel.split(',')[0])})` : 'Polska';

  container.innerHTML = `
    <!-- 1. GŁÓWNA DIAGNOZA WIĘZI -->
    <div class="syn-card syn-jungian-hero-card" style="margin-bottom: 2rem; border-color: rgba(201,169,110,0.35); background: linear-gradient(180deg, rgba(24,24,32,0.96) 0%, rgba(13,13,19,0.96) 100%); box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(201,169,110,0.1);">
      <div class="syn-card-tag" style="letter-spacing:0.18em;color:#C9A96E;">✦ GŁĘBIA RELACJI & DIAGNOZA WIĘZI</div>
      <h2 class="syn-card-heading" style="font-size:1.6rem;color:#FAF8F5;border:none;padding-bottom:0.25rem;margin-bottom:0.75rem;line-height:1.3;">
        ${jungianDiag.title}
      </h2>
      <p style="font-size:1.02rem;line-height:1.75;color:rgba(250,248,245,0.92);margin-bottom:1.35rem;font-weight:300;">
        ${jungianDiag.hook}
      </p>
      <div style="padding:1.15rem 1.35rem;background:rgba(201,169,110,0.06);border-left:3px solid #C9A96E;border-radius:0.75rem;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#C9A96E;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.35rem;">
          PRAWDA O ŚWIECIE EMOCJONALNYM (${moonA.name} &times; ${moonB.name})
        </div>
        ${jungianDiag.moonLegend ? `<div class="syn-mono-meta" style="font-family:'Inter',sans-serif;font-size:0.82rem;color:rgba(250,248,245,0.76);margin-bottom:0.55rem;padding-bottom:0.45rem;border-bottom:1px solid rgba(201,169,110,0.16);line-height:1.5;">${jungianDiag.moonLegend}</div>` : ''}
        <p style="font-size:0.92rem;line-height:1.65;color:rgba(250,248,245,0.85);margin:0;">
          ${jungianDiag.moonDesc}
        </p>
      </div>
    </div>

    <!-- 2. BI-WHEEL & INDEKSY -->
    <div class="syn-card" style="margin-bottom: 2rem;">
      <div class="syn-grid-2" style="align-items:center; margin-bottom:0;">
        <div>
          <div class="syn-card-tag">PODWÓJNE KOŁO SYNASTRYCZNE (BI-WHEEL)</div>
          <h3 class="syn-card-heading" style="border:none;padding-bottom:0.2rem;margin-bottom:0.35rem;">${safeNameA} <span style="color:#C9A96E;">&times;</span> ${safeNameB}</h3>
          <p style="font-size:0.8rem;color:rgba(250,248,245,0.62);margin-bottom:0.85rem;line-height:1.5;">
            Biel: <strong>${safeNameA}</strong> (${cityInfoA}) • Złoto: <strong>${safeNameB}</strong> (${cityInfoB})
          </p>
          <div class="syn-wheel-container" id="syn-wheel-container">
            ${svgWheel}
            <div id="syn-wheel-popover" class="syn-wheel-popover" style="display:none;" aria-live="polite"></div>
          </div>
          <div id="syn-wheel-active-info" class="syn-wheel-info-bar">
            <div class="syn-wib-body" style="opacity:0.75;text-align:center;">
              ${DEFAULT_WHEEL_HINT}
            </div>
          </div>
          <div class="syn-no-print" style="text-align:center;margin-top:1.1rem;display:flex;gap:0.6rem;justify-content:center;flex-wrap:wrap;">
            <button type="button" id="syn-share-link-btn" class="syn-btn-secondary" aria-live="polite" style="padding:0.55rem 1.15rem;font-size:10.5px;display:inline-flex;align-items:center;gap:6px;position:relative;">
              <svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;pointer-events:none;" aria-hidden="true"><path d="M13 19l6-6" stroke-width="1.35"/><path d="M10.5 14.5l-3 3a4.2 4.2 0 0 0 6 6l3-3" stroke-width="1.55"/><path d="M21.5 17.5l3-3a4.2 4.2 0 0 0-6-6l-3 3" stroke-width="1.55"/></svg>
              <span id="syn-share-link-label" style="pointer-events:none;">Skopiuj link</span>
            </button>
            <a id="syn-share-whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer" class="syn-btn-secondary" style="padding:0.55rem 1.15rem;font-size:10.5px;color:#34D399;border-color:rgba(52,211,153,0.35);text-decoration:none;display:inline-flex;align-items:center;gap:6px;background:rgba(52,211,153,0.08);border-radius:9999px;font-family:'Inter',sans-serif;font-weight:600;letter-spacing:0.05em;transition:all 0.25s ease;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              <span style="pointer-events:none;">Wyślij na WhatsApp</span>
            </a>
          </div>
          <div id="syn-share-feedback" class="syn-no-print" aria-live="polite" style="display:none;text-align:center;margin-top:0.55rem;font-size:0.76rem;color:#34D399;font-family:'JetBrains Mono',monospace;"></div>
        </div>
        <div>
          <div class="syn-card-tag">INDEKSY DYNAMIKI RELACJI</div>
          <div style="margin-bottom:1.25rem; margin-top:0.75rem;">
            <div style="display:flex;justify-content:space-between;font-size:0.9rem;font-weight:600;">
              <span>Magnetyzm i Chemia (Wenus–Mars)</span>
              <span style="color:#C9A96E;font-family:'JetBrains Mono',monospace;">${syn.chemistry}%</span>
            </div>
            <div class="syn-bar-track"><div class="syn-bar-fill" style="width:${syn.chemistry}%;background:linear-gradient(90deg,#C9A96E,#FDE68A);"></div></div>
          </div>

          <div style="margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;font-size:0.9rem;font-weight:600;">
              <span>Bezpieczeństwo Emocjonalne (Księżyc–Słońce)</span>
              <span style="color:#34D399;font-family:'JetBrains Mono',monospace;">${syn.security}%</span>
            </div>
            <div class="syn-bar-track"><div class="syn-bar-fill" style="width:${syn.security}%;background:linear-gradient(90deg,#059669,#34D399);"></div></div>
          </div>

          <div style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;font-size:0.9rem;font-weight:600;">
              <span>Indeks Tarcia i Napięcia (Mars–Księżyc)</span>
              <span style="color:#FB7185;font-family:'JetBrains Mono',monospace;">${syn.friction}%</span>
            </div>
            <div class="syn-bar-track"><div class="syn-bar-fill" style="width:${syn.friction}%;background:linear-gradient(90deg,#E11D48,#FB7185);"></div></div>
          </div>

          <div class="syn-card-tag" style="margin-bottom:0.6rem;">KLUCZOWE ASPEKTY MIĘDZYPLANETARNE</div>
          ${aspectItems}
        </div>
      </div>
    </div>

    <!-- 3. DWIE GŁÓWNE KARTY ANALIZY -->
    <div class="syn-grid-2">
      <!-- KARTA LEWA: EMOCJE I REAKCJA NA KRYZYS -->
      <div class="syn-card">
        <div class="syn-card-tag" style="color:#C9A96E;letter-spacing:0.14em;">✦ DYNAMIKA EMOCJONALNA W KRYZYSIE</div>
        <h3 class="syn-card-heading" style="color:#FAF8F5;">Gdzie rodzi się między Wami chłód?</h3>
        
        <div style="margin-bottom:1.25rem;padding-bottom:1.15rem;border-bottom:1px solid rgba(255,255,255,0.06);">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#C9A96E;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.45rem;">
            <strong>${safeNameA}</strong> • Księżyc w znaku ${moonA.gen} <span class="syn-glyph">${moonA.glyph}</span> • Mars w znaku ${marA.gen}
          </div>
          <p style="font-size:0.92rem;line-height:1.7;color:rgba(250,248,245,0.88);margin:0;">
            ${jProfMoonA.conflict}
          </p>
        </div>

        <div style="margin-bottom:1.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#C9A96E;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.45rem;">
            <strong>${safeNameB}</strong> • Księżyc w znaku ${moonB.gen} <span class="syn-glyph">${moonB.glyph}</span> • Mars w znaku ${marB.gen}
          </div>
          <p style="font-size:0.92rem;line-height:1.7;color:rgba(250,248,245,0.88);margin:0;">
            ${jProfMoonB.conflict}
          </p>
        </div>

        ${buildRelationalCollisionBridge({ moon: moonA, mars: marA }, { moon: moonB, mars: marB }, nameA, nameB, syn, effectiveGenderA, effectiveGenderB)}

        <div style="padding:0.95rem 1.15rem;background:rgba(201,169,110,0.06);border-left:3px solid #C9A96E;border-radius:0.75rem;margin-top:1.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#C9A96E;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.35rem;font-weight:600;">
            ✦ Co gasi otwartość ${(window.SynPlMorphology && window.SynPlMorphology.atPerson(nameB, effectiveGenderB)) || escapeHtmlSyn(nameB)}:
          </div>
          <p style="font-size:0.86rem;line-height:1.6;color:rgba(250,248,245,0.85);margin:0;">
            ${jProfMoonB.forbidden || 'Chłód, cynizm i nielojalność.'}
          </p>
        </div>
      </div>

      <!-- KARTA PRAWA: POŻĄDANIE I ZMYSŁY -->
      <div class="syn-card">
        <div class="syn-card-tag" style="color:#C9A96E;letter-spacing:0.14em;">✦ ARCHITEKTURA POŻĄDANIA & BLISKOŚĆ</div>
        <h3 class="syn-card-heading" style="color:#FAF8F5;">${loveTitleB}</h3>
        
        <div class="syn-mono-meta" style="font-size:0.86rem;line-height:1.6;color:rgba(250,248,245,0.7);margin-bottom:1.15rem;font-family:'JetBrains Mono',monospace;">
          ${sunNounB}: <strong>${sunB.name} (<span class="syn-glyph">${sunB.glyph}</span> ${sunB.deg}°)</strong> • Wenus: <strong>${venB.name} (<span class="syn-glyph">${venB.glyph}</span> ${venB.deg}°)</strong>${cB.asc !== null ? ` • Ascendent: ${ascTextB}` : ''}
        </div>

        <div style="margin-bottom:1.25rem;">
          <p style="font-size:0.92rem;line-height:1.7;color:rgba(250,248,245,0.88);margin:0;">
            ${jProfVenB.sensory || jProfVenB.venusGift}
          </p>
        </div>

        <div style="padding:1rem 1.25rem;background:rgba(201,169,110,0.08);border:1px solid rgba(201,169,110,0.3);border-radius:0.85rem;margin-top:1.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#C9A96E;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.35rem;">
            ✦ Jak rozładować napięcie ${(window.SynPlMorphology && window.SynPlMorphology.atPerson(nameB, effectiveGenderB)) || escapeHtmlSyn(nameB)}:
          </div>
          <p style="font-size:0.88rem;line-height:1.6;color:rgba(250,248,245,0.9);margin:0;">
            ${jProfVenB.disarm || jProfSunB.openKey}
          </p>
        </div>
      </div>
    </div>

    <!-- 4. KARTA ARCHITEKTURY RELACJI -->
    <div class="syn-card" style="margin-top: 1.5rem; border-color: rgba(201,169,110,0.2); background: linear-gradient(180deg, rgba(20,20,28,0.7) 0%, rgba(12,12,18,0.7) 100%);">
      <div class="syn-card-tag" style="letter-spacing:0.15em;color:#C9A96E;">✦ ARCHITEKTURA RELACJI: CO NAPRAWDĘ WAS TRZYMA?</div>
      <h3 class="syn-card-heading" style="color:#FAF8F5;border:none;margin-bottom:0.65rem;">Lekcja Dojrzałości i Granic</h3>
      <p style="font-size:0.95rem;line-height:1.75;color:rgba(250,248,245,0.88);margin:0;">
        W tej relacji widać wyraźnie zarówno Wasze najmocniejsze punkty oparcia, jak i dawne obawy o zaufanie. Powroty do rozmowy po trudniejszych dniach pokazują, że pod różnicami temperamentu kryje się prawdziwa chęć porozumienia. Najwięcej spokoju daje tu rezygnacja z poprawiania drugiej osoby na własny wzór i zwykła lojalność wobec jej odrębnego tempa.
      </p>
    </div>
    <div id="syn-paywall-mount"></div>
  `;

  function buildShareUrl() {
    const base = window.location.origin + window.location.pathname;
    const rawA = (document.getElementById('nameA') && document.getElementById('nameA').value || '').trim();
    const rawB = (document.getElementById('nameB') && document.getElementById('nameB').value || '').trim();
    const pairs = [
      ['dA', d.dateA || ''],
      ['dB', d.dateB || ''],
      ['gA', d.genderA === 'm' ? 'm' : 'f'],
      ['gB', d.genderB === 'f' ? 'f' : 'm']
    ];
    if (rawA) pairs.push(['nA', rawA]);
    if (d.timeA) pairs.push(['tA', d.timeA]);
    if (d.cityA) pairs.push(['cA', d.cityA]);
    if (rawB) pairs.push(['nB', rawB]);
    if (d.timeB) pairs.push(['tB', d.timeB]);
    if (d.cityB) pairs.push(['cB', d.cityB]);
    const frag = pairs
      .filter(p => p[1] !== '')
      .map(p => encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1]))
      .join('&');
    return frag ? `${base}#${frag}` : base;
  }

  function copyTextToClipboard(text) {
    let copied = false;
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '0';
      ta.style.left = '-9999px';
      ta.style.opacity = '0';
      ta.style.pointerEvents = 'none';
      document.body.appendChild(ta);
      ta.focus({ preventScroll: true });
      ta.select();
      ta.setSelectionRange(0, text.length);
      copied = document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (e) {}
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        navigator.clipboard.writeText(text).catch(function () {});
        copied = true;
      } catch (e) {}
    }
    return copied;
  }

  const shareUrl = buildShareUrl();
  const shareBtn = document.getElementById('syn-share-link-btn');
  const shareLabel = document.getElementById('syn-share-link-label');
  const shareFeedback = document.getElementById('syn-share-feedback');
  let shareResetTimer = null;

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const targetUrl = buildShareUrl();
      const ok = copyTextToClipboard(targetUrl);
      if (shareResetTimer) clearTimeout(shareResetTimer);

      shareBtn.classList.add('is-copied');
      shareBtn.setAttribute('data-copied', '1');
      shareBtn.style.borderColor = 'rgba(52,211,153,0.65)';
      shareBtn.style.color = '#34D399';
      shareBtn.style.background = 'rgba(52,211,153,0.12)';
      if (shareLabel) {
        shareLabel.textContent = '✓ Skopiowano link!';
      }
      if (shareFeedback) {
        shareFeedback.style.display = 'block';
        if (ok) {
          shareFeedback.textContent = '✓ Skopiowano bezpośredni link do Waszego wyniku synastrii';
        } else {
          shareFeedback.innerHTML = '';
          const inp = document.createElement('input');
          inp.type = 'text';
          inp.readOnly = true;
          inp.value = targetUrl;
          inp.className = 'syn-input';
          inp.style.cssText = 'font-size:11px;padding:0.4rem 0.65rem;max-width:290px;margin:0.25rem auto 0;text-align:center;';
          shareFeedback.appendChild(inp);
          inp.focus({ preventScroll: true });
          inp.select();
        }
      }

      shareResetTimer = setTimeout(() => {
        shareBtn.classList.remove('is-copied');
        shareBtn.removeAttribute('data-copied');
        shareBtn.style.borderColor = '';
        shareBtn.style.color = '';
        shareBtn.style.background = '';
        if (shareLabel) {
          shareLabel.textContent = 'Skopiuj link';
        }
        if (shareFeedback && ok) {
          shareFeedback.style.display = 'none';
        }
      }, 3500);
    });
  }

  const waBtn = document.getElementById('syn-share-whatsapp-btn');
  if (waBtn) {
    const waText = `Sprawdź nasz kosmogram partnerski (${nameA} × ${nameB}): Chemia ${syn.chemistry}%, Stabilność ${syn.security}%. Zobacz bi-wheel i naszą synastrię: ${shareUrl}`;
    waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
  }

  function initWheelInteractions() {
    const container = document.getElementById('syn-wheel-container');
    const popover = document.getElementById('syn-wheel-popover');
    const infoBar = document.getElementById('syn-wheel-active-info');
    if (!container || !popover || !infoBar) return;

    let lockedTarget = null;
    const defaultInfoHtml = `
      <div class="syn-wib-body" style="opacity:0.75;text-align:center;">
        ${DEFAULT_WHEEL_HINT}
      </div>`;

    function updateView(hit) {
      if (!hit) {
        popover.style.display = 'none';
        infoBar.classList.remove('is-highlight');
        infoBar.innerHTML = defaultInfoHtml;
        container.querySelectorAll('.syn-wheel-hit').forEach(el => el.classList.remove('is-active'));
        return;
      }

      container.querySelectorAll('.syn-wheel-hit').forEach(el => el.classList.remove('is-active'));
      hit.classList.add('is-active');

      const type = hit.dataset.type;
      const cx = parseFloat(hit.dataset.cx);
      const cy = parseFloat(hit.dataset.cy);
      const color = hit.dataset.color || '#C9A96E';

      let popHtml = '';
      let infoHtml = '';

      if (type === 'planet') {
        const p = hit.dataset;
        popHtml = `
          <strong style="color:${color};display:block;margin-bottom:2px;font-size:0.82rem;">${p.person}: ${p.glyph} ${p.label}</strong>
          <span style="opacity:0.85;font-size:0.75rem;">${p.sign} (${p.deg}) • ${p.role}</span>`;
        infoHtml = `
          <div class="syn-wib-header">
            <span class="syn-wib-title" style="color:${color};">${p.person} • ${p.glyph} ${p.label} w znaku ${p.sign} (${p.deg})</span>
            <span class="syn-wib-tag" style="color:${color};font-family:'JetBrains Mono',monospace;">${p.role}</span>
          </div>
          <div class="syn-wib-body"><strong>Rola w Synastrii:</strong> ${p.meaning}</div>`;
      } else if (type === 'sign') {
        const s = hit.dataset;
        popHtml = `
          <strong style="color:#C9A96E;display:block;margin-bottom:2px;font-size:0.82rem;">${s.glyph} ${s.name}</strong>
          <span style="opacity:0.85;font-size:0.75rem;">${s.elem}</span>`;
        infoHtml = `
          <div class="syn-wib-header">
            <span class="syn-wib-title" style="color:#C9A96E;">Znak Zodiaku: ${s.glyph} ${s.name}</span>
            <span class="syn-wib-tag" style="color:var(--champagne);font-family:'JetBrains Mono',monospace;">${s.elem}</span>
          </div>
          <div class="syn-wib-body">${s.meaning}</div>`;
      } else if (type === 'aspect') {
        const a = hit.dataset;
        popHtml = `
          <strong style="color:${color};display:block;margin-bottom:2px;font-size:0.82rem;">${a.name}</strong>
          <span style="opacity:0.85;font-size:0.75rem;">${a.planets}</span>`;
        infoHtml = `
          <div class="syn-wib-header">
            <span class="syn-wib-title" style="color:${color};">Aspekt: ${a.name}</span>
            <span class="syn-wib-tag" style="color:${color};font-family:'JetBrains Mono',monospace;">${a.planets}</span>
          </div>
          <div class="syn-wib-body">${a.meaning}</div>`;
      }

      const pctX = (cx / 320) * 100;
      const pctY = (cy / 320) * 100;
      popover.innerHTML = popHtml;
      popover.style.left = `${pctX}%`;
      popover.style.top = `${pctY}%`;
      popover.style.display = 'block';

      infoBar.classList.add('is-highlight');
      infoBar.innerHTML = infoHtml;
    }

    container.addEventListener('mouseover', (e) => {
      if (lockedTarget) return;
      const hit = e.target.closest('.syn-wheel-hit');
      if (hit) updateView(hit);
    });

    container.addEventListener('mouseout', (e) => {
      if (lockedTarget) return;
      const hit = e.relatedTarget ? e.relatedTarget.closest('.syn-wheel-hit') : null;
      if (!hit) updateView(null);
    });

    container.addEventListener('click', (e) => {
      const hit = e.target.closest('.syn-wheel-hit');
      if (hit) {
        if (lockedTarget === hit) {
          lockedTarget = null;
          updateView(null);
        } else {
          lockedTarget = hit;
          updateView(hit);
        }
      } else {
        lockedTarget = null;
        updateView(null);
      }
    });

    container.addEventListener('touchstart', (e) => {
      const hit = e.target.closest('.syn-wheel-hit');
      if (hit) {
        e.preventDefault();
        lockedTarget = hit;
        updateView(hit);
      }
    }, { passive: false });
  }

  initWheelInteractions();

  if (window.__SYNASTRY_REPORT_MOUNT__) {
    const safeReportData = Object.assign({}, d, { nameA: safeNameA, nameB: safeNameB });
    window.__SYNASTRY_REPORT_MOUNT__(document.getElementById('syn-paywall-mount'), safeReportData);
  }
  if (window.__INIT_PORTAL_TOOLTIP__) {
    window.__INIT_PORTAL_TOOLTIP__();
  }
};


// Part 3: Interactive UI & Results View with Gender Toggle for Kalkulator Synastrii Partnerskiej
(function () {
  const ZODIAC_NAMES = ['Baran','Byk','Bliźnięta','Rak','Lew','Panna','Waga','Skorpion','Strzelec','Koziorożec','Wodnik','Ryby'];
  const ZODIAC_GLYPHS = ["<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 8.5 13.5 C 7.5 8.5, 14 7.5, 16 14.5 L 16 25 M 23.5 13.5 C 24.5 8.5, 18 7.5, 16 14.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><circle cx=\"16\" cy=\"19\" r=\"5.2\"/><path d=\"M 8.5 9.5 C 10.5 14, 21.5 14, 23.5 9.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 8.5 9 C 12.5 11.2, 19.5 11.2, 23.5 9 M 8.5 23 C 12.5 20.8, 19.5 20.8, 23.5 23 M 12.8 10.3 L 12.8 21.7 M 19.2 10.3 L 19.2 21.7\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><circle cx=\"10.2\" cy=\"13.5\" r=\"3.2\"/><circle cx=\"21.8\" cy=\"18.5\" r=\"3.2\"/><path d=\"M 7.5 11.7 C 11 7.6, 19.5 7.6, 25 11 M 24.5 20.3 C 21 24.4, 12.5 24.4, 7 21\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><circle cx=\"10.5\" cy=\"18.5\" r=\"3\"/><path d=\"M 12.8 16.2 C 11.5 9.5, 19.5 7.5, 20.5 13.5 C 21.2 17.5, 18.5 22, 22 22.5 C 23.5 22.7, 24.5 21.5, 24.5 20.2\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20.5 C 18.4 23.5, 21 24.5, 23 23 M 18.4 15 C 21.5 12.5, 24.5 14.5, 22.5 18.5 C 21 21, 17.5 22.5, 15.8 24\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 18.5 L 12.2 18.5 A 4.8 4.8 0 1 1 19.8 18.5 L 24.5 18.5 M 7.5 22.5 L 24.5 22.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20 C 18.4 23, 21.5 23, 24 19.5 M 21.2 19.2 L 24.2 19.2 L 24.2 22.2\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 8.5 23.5 L 23.5 8.5 M 16.5 8.5 L 23.5 8.5 L 23.5 15.5 M 11.5 14.5 L 17.5 20.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 11.5 L 10 10 L 13.2 20.5 L 16.8 11.5 C 18 9, 21.5 9.5, 21.5 13.5 C 21.5 18, 24.2 21, 21 23.5 C 18.5 25, 16.2 23, 17.2 20.5 C 18.2 18.5, 21.5 18.8, 24 21\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 7.5 14.5 L 10.5 11.5 L 13.2 14.5 L 16 11.5 L 18.8 14.5 L 21.5 11.5 L 24.5 14.5 M 7.5 20.5 L 10.5 17.5 L 13.2 20.5 L 16 17.5 L 18.8 20.5 L 21.5 17.5 L 24.5 20.5\"/></svg>","<svg width=\"1.05em\" height=\"1.05em\" viewBox=\"0 0 32 32\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"display:inline-block;vertical-align:-0.18em;flex-shrink:0;\" aria-hidden=\"true\"><path d=\"M 10 8.5 C 14.5 12.5, 14.5 19.5, 10 23.5 M 22 8.5 C 17.5 12.5, 17.5 19.5, 22 23.5 M 7.5 16 L 24.5 16\"/></svg>"];

  const ZODIAC_GEN = ['Barana','Byka','Bliźniąt','Raka','Lwa','Panny','Wagi','Skorpiona','Strzelca','Koziorożca','Wodnika','Ryb'];

  const STORAGE_KEY = 'neoromantyczny_synastry_v5';
  let genderA = 'f';
  let genderB = 'm';
  let hasCalculated = false;
  let loadedFromSharedLink = false;

  function getSignInfo(lon) {
    const idx = Math.floor((((lon % 360) + 360) % 360) / 30);
    const deg = Math.floor(lon % 30);
    return { idx, name: ZODIAC_NAMES[idx], gen: ZODIAC_GEN[idx], glyph: ZODIAC_GLYPHS[idx], deg, profile: SYNASTRY_PROFILES[idx] };
  }

  function loadInitialState() {
    const def = {
      nameA: '', genderA: 'f', dateA: '', timeA: '', cityA: '',
      nameB: '', genderB: 'm', dateB: '', timeB: '', cityB: ''
    };
    try {
      localStorage.removeItem('neoromantyczny_synastry_v2');
      localStorage.removeItem('neoromantyczny_synastry_v3');
      localStorage.removeItem('neoromantyczny_synastry_v4');
      const rawHash = (window.location.hash || '').replace(/^#/, '');
      const hp = new URLSearchParams(rawHash);
      const sp = new URLSearchParams(window.location.search);
      const sharedParams = (hp.has('dA') && hp.has('dB') && hp.get('dA') && hp.get('dB'))
        ? hp
        : ((sp.has('dA') && sp.has('dB') && sp.get('dA') && sp.get('dB')) ? sp : null);
      if (sharedParams) {
        loadedFromSharedLink = true;
        if (rawHash && sharedParams === hp && window.history && typeof window.history.replaceState === 'function') {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
        return {
          nameA: sharedParams.get('nA') || def.nameA,
          genderA: sharedParams.get('gA') === 'm' ? 'm' : 'f',
          dateA: sharedParams.get('dA') || def.dateA,
          timeA: sharedParams.get('tA') !== null ? sharedParams.get('tA') : def.timeA,
          cityA: sharedParams.get('cA') || def.cityA,
          nameB: sharedParams.get('nB') || def.nameB,
          genderB: sharedParams.get('gB') === 'f' ? 'f' : 'm',
          dateB: sharedParams.get('dB') || def.dateB,
          timeB: sharedParams.get('tB') !== null ? sharedParams.get('tB') : def.timeB,
          cityB: sharedParams.get('cB') || def.cityB
        };
      }
      const isPaymentReturn = sp.has('payment_intent')
        || sp.get('luxe_product') === 'synastria'
        || sessionStorage.getItem('neo_just_unlocked') === 'synastria';
      if (isPaymentReturn) {
        const savedRaw = localStorage.getItem(STORAGE_KEY);
        if (savedRaw) {
          const saved = JSON.parse(savedRaw);
          if (saved && saved.dateA && saved.dateB) {
            return {
              nameA: saved.nameA || def.nameA,
              genderA: saved.genderA === 'm' ? 'm' : 'f',
              dateA: saved.dateA,
              timeA: saved.timeA || def.timeA,
              cityA: saved.cityA || def.cityA,
              nameB: saved.nameB || def.nameB,
              genderB: saved.genderB === 'f' ? 'f' : 'm',
              dateB: saved.dateB,
              timeB: saved.timeB || def.timeB,
              cityB: saved.cityB || def.cityB
            };
          }
        }
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {}
    return def;
  }

  function buildCityDatalistHtml() {
    const cities = window.__SYNASTRY_ASTRO__.SYNASTRY_CITIES || [];
    return cities.map(c => `<option value="${c.name}"></option>`).join('');
  }

  function renderApp() {
    const root = document.getElementById('synastry-app');
    if (!root) return;

    const init = loadInitialState();
    genderA = init.genderA;
    genderB = init.genderB;

    root.innerHTML = `
      <h1 class="sr-only-h1">Kalkulator Synastrii Partnerskiej i Horoskop Porównawczy z Daty Urodzenia</h1>
      <nav id="luxe-header-nav" class="syn-nav">
        <a href="/" class="nav-brand">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-sparkle">
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
            <path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle>
          </svg>
          <span class="nav-title" id="luxe-header-text">Neoromantyczny</span>
        </a>
        <div class="nav-links">
          <a href="/">Główna</a>
          <a href="/blog/">Artykuły</a>
          <a href="/kalkulator-prezentowy/">Kalkulator</a>
          <a href="/faq/">Baza Wiedzy</a>
        </div>
        <a href="/blog/" class="nav-cta" id="nav-cta-synastry">
          <span>Powrót na bloga</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-arrow">
            <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </nav>

      <main class="syn-container">
        <header class="syn-hero">
          <div class="syn-badge"><span class="syn-glyph">✦</span> Magia dzieje się Teraz</div>
          <h2 class="syn-title">Chemia czy <em>Toksyczność?</em></h2>
          <p class="syn-subtitle">Wpisz daty urodzenia obojga (godzina i miasto są opcjonalne — odblokowują Ascendent i 12 Domów). Obliczamy rzeczywiste aspekty planetarne między Waszymi kosmogramami.</p>
        </header>

        <form id="syn-form" onsubmit="return false;">
          <div class="syn-grid-2">
            <section class="syn-card">
              <div class="syn-card-tag">OSOBA PIERWSZA (TY)</div>
              <h3 class="syn-card-heading">Twój Kosmogram</h3>
              <div class="syn-field">
                <label class="syn-label">Twoja Płeć *</label>
                <div class="syn-gender-group" id="gender-group-A">
                  <button type="button" class="syn-gender-btn ${genderA === 'f' ? 'active' : ''}" data-gender="f"><span class="syn-glyph">♀</span> Kobieta</button>
                  <button type="button" class="syn-gender-btn ${genderA === 'm' ? 'active' : ''}" data-gender="m"><span class="syn-glyph">♂</span> Mężczyzna</button>
                </div>
              </div>
              <div class="syn-field">
                <label class="syn-label" for="nameA">Twoje Imię</label>
                <input class="syn-input" id="nameA" type="text" value="${escapeHtmlSyn(init.nameA)}" />
              </div>
              <div class="syn-field">
                <label class="syn-label" for="dateA">Data Urodzenia *</label>
                <div class="syn-input-relative">
                  <input class="syn-input syn-input-with-icon" id="dateA" type="date" value="${escapeHtmlSyn(init.dateA)}" required />
                  <svg class="syn-input-pin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>
              <div class="syn-field">
                <label class="syn-label" for="timeA">Godzina Urodzenia</label>
                <div class="syn-input-relative">
                  <input class="syn-input syn-input-with-icon" id="timeA" type="time" value="${escapeHtmlSyn(init.timeA)}" />
                  <svg class="syn-input-pin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline></svg>
                </div>
              </div>
              <div class="syn-field">
                <label class="syn-label" for="cityA">Miejsce Narodzin</label>
                <div class="syn-input-relative">
                  <input class="syn-input syn-input-with-icon" id="cityA" type="text" value="${escapeHtmlSyn(init.cityA || '')}" autocomplete="off" />
                  <svg class="syn-input-pin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
              </div>
            </section>

            <section class="syn-card">
              <div class="syn-card-tag">OSOBA DRUGA (PARTNER / PARTNERKA)</div>
              <h3 class="syn-card-heading">Kosmogram Partnera</h3>
              <div class="syn-field">
                <label class="syn-label">Płeć Partnera / Partnerki *</label>
                <div class="syn-gender-group" id="gender-group-B">
                  <button type="button" class="syn-gender-btn ${genderB === 'f' ? 'active' : ''}" data-gender="f"><span class="syn-glyph">♀</span> Kobieta</button>
                  <button type="button" class="syn-gender-btn ${genderB === 'm' ? 'active' : ''}" data-gender="m"><span class="syn-glyph">♂</span> Mężczyzna</button>
                </div>
              </div>
              <div class="syn-field">
                <label class="syn-label" for="nameB">Imię Partnera / Partnerki</label>
                <input class="syn-input" id="nameB" type="text" value="${escapeHtmlSyn(init.nameB)}" />
              </div>
              <div class="syn-field">
                <label class="syn-label" for="dateB">Data Urodzenia Partnera *</label>
                <div class="syn-input-relative">
                  <input class="syn-input syn-input-with-icon" id="dateB" type="date" value="${escapeHtmlSyn(init.dateB)}" required />
                  <svg class="syn-input-pin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
              </div>
              <div class="syn-field">
                <label class="syn-label" for="timeB">Godzina Urodzenia</label>
                <div class="syn-input-relative">
                  <input class="syn-input syn-input-with-icon" id="timeB" type="time" value="${escapeHtmlSyn(init.timeB)}" />
                  <svg class="syn-input-pin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15.5 14"></polyline></svg>
                </div>
              </div>
              <div class="syn-field">
                <label class="syn-label" for="cityB">Miejsce Narodzin Partnera</label>
                <div class="syn-input-relative">
                  <input class="syn-input syn-input-with-icon" id="cityB" type="text" value="${escapeHtmlSyn(init.cityB || '')}" autocomplete="off" />
                  <svg class="syn-input-pin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
              </div>
            </section>
          </div>

          <div style="text-align:center; margin-bottom: 3rem;">
            <button type="submit" id="syn-submit-btn" class="syn-btn-main">
              <span>Oblicz Synastrię i Napięcie Relacji</span>
              <span>&rarr;</span>
            </button>
            <p style="margin:0.85rem 0 0;font-size:0.75rem;color:rgba(250,248,245,0.52);line-height:1.5;">
              100% prywatności — Wasze daty urodzenia nie trafiają do żadnej bazy danych ani nie są nikomu udostępniane. <a href="/polityka-prywatnosci/" style="color:#C9A84C;text-decoration:underline;">Polityka Prywatności</a>
            </p>
          </div>
        </form>

        <div id="syn-results"></div>
      </main>
    `;

    function bindGenderGroup(groupId, isA) {
      const grp = document.getElementById(groupId);
      const btns = grp.querySelectorAll('.syn-gender-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const g = btn.getAttribute('data-gender');
          if (isA) {
            genderA = g;
          } else {
            genderB = g;
          }
          if (hasCalculated) computeAndRender(false);
        });
      });
    }

    bindGenderGroup('gender-group-A', true);
    bindGenderGroup('gender-group-B', false);

    ['nameA', 'dateA', 'timeA', 'cityA', 'nameB', 'dateB', 'timeB', 'cityB'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => {
        if (hasCalculated) computeAndRender(false);
      });
    });

    document.getElementById('syn-form').addEventListener('submit', () => {
      computeAndRender(true);
    });

    if (init.dateA && init.dateB) {
      let shouldAutoScroll = false;
      try {
        const sp = new URLSearchParams(window.location.search);
        const notJustUnlocked = sessionStorage.getItem('neo_just_unlocked') !== 'synastria';
        shouldAutoScroll = sp.get('autoscroll') === '1' || ((loadedFromSharedLink || (sp.has('dA') && sp.has('dB'))) && notJustUnlocked);
      } catch (e) {}
      computeAndRender(shouldAutoScroll);
    }
  }

  function computeAndRender(scrollToView) {
    const rawNameA = (document.getElementById('nameA').value || '').trim();
    const dateA = document.getElementById('dateA').value;
    const timeA = document.getElementById('timeA').value || '';
    const cityA = document.getElementById('cityA') ? document.getElementById('cityA').value : '';

    const rawNameB = (document.getElementById('nameB').value || '').trim();
    const dateB = document.getElementById('dateB').value;
    const timeB = document.getElementById('timeB').value || '';
    const cityB = document.getElementById('cityB') ? document.getElementById('cityB').value : '';

    if (!dateA || !dateB) return;
    hasCalculated = true;

    const nameA = rawNameA || (genderA === 'f' ? 'Ona' : 'On');
    const nameB = rawNameB || (genderB === 'f' ? 'Ona' : 'On');

    try {
      const stateObj = { nameA: rawNameA, genderA, dateA, timeA, cityA, nameB: rawNameB, genderB, dateB, timeB, cityB };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
    } catch (e) {}

    const astro = window.__SYNASTRY_ASTRO__;
    const cA = astro.calcChart(dateA, timeA, cityA);
    const cB = astro.calcChart(dateB, timeB, cityB);
    const syn = astro.analyzeSynastry(cA, cB);
    const svgWheel = astro.renderBiWheelSvg(cA, cB, syn.aspects, nameA, nameB);

    const sunA = getSignInfo(cA.sun), moonA = getSignInfo(cA.moon), venA = getSignInfo(cA.venus), marA = getSignInfo(cA.mars);
    const sunB = getSignInfo(cB.sun), moonB = getSignInfo(cB.moon), venB = getSignInfo(cB.venus), marB = getSignInfo(cB.mars);

    window.__SYNASTRY_UI_RENDER__(
      document.getElementById('syn-results'),
      { nameA, genderA, dateA, timeA, cityA, nameB, genderB, dateB, timeB, cityB, cA, cB, syn, svgWheel, sunA, moonA, venA, marA, sunB, moonB, venB, marB }
    );

    if (scrollToView) {
      document.getElementById('syn-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
  } else {
    renderApp();
  }
})();
