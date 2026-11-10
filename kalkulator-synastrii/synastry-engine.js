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
    const clean = String(rawInput || '').trim();
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
    { name: 'Baran', glyph: '♈', elem: 'Ogień • Kardynalny', meaning: 'Śmiałość, bezkompromisowa autentyczność, natychmiastowy żar i potrzeba wolności.' },
    { name: 'Byk', glyph: '♉', elem: 'Ziemia • Stały', meaning: 'Zmysłowy spokój, wierność, potrzeba dotyku i budowania trwałego bezpieczeństwa.' },
    { name: 'Bliźnięta', glyph: '♊', elem: 'Powietrze • Zmienny', meaning: 'Błyskotliwy dialog, intelektualny flirt, szermierka słowna i ciągła ciekawość partnera.' },
    { name: 'Rak', glyph: '♋', elem: 'Woda • Kardynalny', meaning: 'Głęboka czułość, intuicyjne wyczuwanie nastrojów, opiekuńczość i domowy azyl.' },
    { name: 'Lew', glyph: '♌', elem: 'Ogień • Stały', meaning: 'Królewski magnetyzm, duma, hojność w uczuciach i celebracja wyjątkowości partnera.' },
    { name: 'Panna', glyph: '♍', elem: 'Ziemia • Zmienny', meaning: 'Dyskretna troska, wierność w codzienności, porządek i realna pomoc w trudach.' },
    { name: 'Waga', glyph: '♎', elem: 'Powietrze • Kardynalny', meaning: 'Estetyka, harmonia formy, kultura dialogu i poszukiwanie idealnej równowagi.' },
    { name: 'Skorpion', glyph: '♏', elem: 'Woda • Stały', meaning: 'Hipnotyczna głębia, bezkompromisowa prawda, erotyczna siła i nierozerwalna więź.' },
    { name: 'Strzelec', glyph: '♐', elem: 'Ogień • Zmienny', meaning: 'Wspólny horyzont, radość z odkrywania świata, optymizm i przestrzeń na oddech.' },
    { name: 'Koziorożec', glyph: '♑', elem: 'Ziemia • Stały', meaning: 'Ponadczasowa architektura zaufania, powaga, dojrzałość i lojalność na dekady.' },
    { name: 'Wodnik', glyph: '♒', elem: 'Powietrze • Stały', meaning: 'Nieszablonowa przyjaźń, porozumienie dusz, brak konwenansów i szacunek dla inności.' },
    { name: 'Ryby', glyph: '♓', elem: 'Woda • Zmienny', meaning: 'Telepatyczna bliskość, poetycka wrażliwość, czułość i stopienie granic emocjonalnych.' }
  ];

  const WHEEL_BODY_DEFS = {
    sun: { label: 'Słońce', role: 'Świadome Ja, rdzeń tożsamości, wola życiowa i styl, w jakim partner wyraża siebie.' },
    moon: { label: 'Księżyc', role: 'Świat emocjonalny, potrzeby intymnego bezpieczeństwa, nawyki domowe i wrażliwość.' },
    venus: { label: 'Wenus', role: 'Język miłości, potrzeba piękna, styl uwodzenia, czułość i to, co zachwyca w partnerze.' },
    mars: { label: 'Mars', role: 'Temperatura pożądania, energia działania, styl zdobywania i sposób rozładowywania gniewu.' }
  };

  function renderBiWheelSvg(chartA, chartB, aspects, nameA = 'Osoba A', nameB = 'Osoba B') {
    const cx = 160, cy = 160, rOuter = 138, rMid = 104, rInner = 74;
    const glyphs = ['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];

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
          <text x="${gx.toFixed(1)}" y="${(gy + 4).toFixed(1)}" text-anchor="middle" fill="rgba(201,169,110,0.75)" font-size="11" font-family="Segoe UI Symbol, Apple Symbols, monospace" class="syn-sign-text">${glyphs[i]}</text>
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
           data-planets="${nameA} (${asp.pA.glyph} ${asp.pA.label}) &harr; ${nameB} (${asp.pB.glyph} ${asp.pB.label})"
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
           data-person="${nameA}"
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
           data-person="${nameB}"
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

// Part 2A: Zodiac Synastry Profiles 1–6 (Baran -> Panna) with Male (m) & Female (f) forms
const SYNASTRY_PROFILES_A = [
  {
    sign: 'Baran',
    m: {
      conflict: 'Reaguje błyskawicznym wyrzutem adrenaliny. Cisza i odkładanie rozmowy na później są dla niego jak policzek — woli krótkie, głośne starcie niż ciche dni.',
      venusGift: 'Kocha gesty zuchwałe, spontaniczne i pełne ryzyka. Nudzą go bezpieczne klasyki; potrzebuje dowodu, że jesteś gotowa rzucić wszystko i ruszyć z nim w nieznane.',
      openKey: 'Bezpośredni komunikat bez podtekstów i wyzwań rzucanych jego autonomii.',
      secretGift: 'Voucher na nocny przejazd sportowym autem po torze lub niszowe perfumy z nutą skóry, czarnego pieprzu i dymu'
    },
    f: {
      conflict: 'Reaguje błyskawicznym wyrzutem adrenaliny. Cisza i odkładanie rozmowy na później są dla niej jak policzek — woli krótkie, gorące starcie niż ciche dni.',
      venusGift: 'Kocha gesty zuchwałe, odważne i nieprzewidywalne. Nudzą ją grzeczne klasyki; potrzebuje dowodu, że nie boisz się jej ognia i dotrzymasz jej kroku.',
      openKey: 'Bezpośredni komunikat bez podtekstów, inicjatywa i szacunek dla jej niezależności.',
      secretGift: 'Niszowy ekstrakt perfum z nutą różowego pieprzu i ambry lub spontaniczny wypad weekendowy z biletem wręczonym na godzinę przed odlotem'
    }
  },
  {
    sign: 'Byk',
    m: {
      conflict: 'Wchodzi w tryb oblężonej twierdzy. Gdy czuje presję, zamyka się w ciężkim milczeniu i potrafi tygodniami nie ustąpić ani o milimetr.',
      venusGift: 'Jego językiem miłości jest namacalny, ciężki luksus. Dotyk, kaszmir, obłędne jedzenie i przedmioty, które starzeją się z klasą.',
      openKey: 'Fizyczna obecność, spokój głosu i niepodważalne poczucie bezpieczeństwa oraz lojalności.',
      secretGift: 'Ciężki szlafrok z czesanego kaszmiru lub rzemieślnicza woda kolońska o zapachu figowca i starego drzewa sandałowego'
    },
    f: {
      conflict: 'Wchodzi w tryb oblężonej twierdzy. Gdy czuje presję lub chaos, zamyka się w zmysłowym chłodzie i potrafi tygodniami nie ustąpić ani o milimetr.',
      venusGift: 'Jej językiem miłości jest zmysłowy, namacalny luksus. Jedwab, dotyk, wyrafinowane smaki i przedmioty o ponadczasowej urodzie.',
      openKey: 'Cierpliwa czułość, spokój głosu i niepodważalne poczucie bezpieczeństwa materialno-emocjonalnego.',
      secretGift: 'Jedwabny szlafrok w odcieniu szampana lub rzemieślnicza świeca o zapachu figowca, tuberozy i drzewa sandałowego'
    }
  },
  {
    sign: 'Bliźnięta',
    m: {
      conflict: 'Ucieka w intelektualną ironię, sarkazm lub zmianę tematu. Gdy robi się zbyt duszno emocjonalnie, odcina się słowem jak skalpelem.',
      venusGift: 'Podnieca go stymulacja umysłowa, nieprzewidywalność i błyskotliwy flirt. Prezent musi mieć historię, drugie dno lub prowokować do rozmowy.',
      openKey: 'Intryga intelektualna, lekkość w komunikacji i brak emocjonalnego szantażu.',
      secretGift: 'Limitowane wydanie albumu fotograficznego Taschen lub bilety-niespodzianki na nocny spektakl w innym mieście'
    },
    f: {
      conflict: 'Ucieka w błyskotliwą ironię, chłód słowny lub zmianę tematu. Gdy czuje się osaczona ciężkimi emocjami, potrafi odciąć się jednym celnym zdaniem.',
      venusGift: 'Podnieca ją intelektualny flirt, zaskoczenie i gra skojarzeń. Prezent dla niej musi mieć drugie dno, dowcip lub intrygującą historię.',
      openKey: 'Stymulacja umysłowa, lekkość bycia i przestrzeń na jej zmienny rytm dnia.',
      secretGift: 'Kolekcjonerski album mody/sztuki Taschen lub koperta z zagadką prowadzącą do ukrytej kolacji w nieznanym jej miejscu'
    }
  },
  {
    sign: 'Rak',
    m: {
      conflict: 'Wycofuje się do pancerza, sprawdzając, czy zauważysz jego milczenie. Pamięta ton głosu i jedno nieostrożne słowo sprzed trzech lat.',
      venusGift: 'Szuka intymnego azylu i emocjonalnej głębi. Najbardziej poruszają go przedmioty, które mówią: „Znam Twoje najczulsze wspomnienia i chronię Twój spokój”.',
      openKey: 'Cierpliwa czułość, zapewnienie o wyłączności i ochrona jego wrażliwego wnętrza przed światem.',
      secretGift: 'Zegarek lub spinki z dyskretnym grawerunkiem współrzędnych Waszego pierwszego spotkania lub ciężki koc z wełny merino'
    },
    f: {
      conflict: 'Wycofuje się do pancerza, testując, czy pójdziesz za nią. Pamięta ton głosu i jedno nieostrożne słowo sprzed trzech lat.',
      venusGift: 'Szuka intymnego azylu, nostalgii i czułości. Najbardziej poruszają ją przedmioty, które mówią: „Pamiętam każdą naszą chwilę i chronię Twoje serce”.',
      openKey: 'Cierpliwa czułość, poczucie wyłączności i bezpieczna przystań wolna od szorstkości.',
      secretGift: 'Złoty medalion z grawerunkiem współrzędnych Waszego pierwszego spotkania lub pościel z czystego jedwabiu morwowego'
    }
  },
  {
    sign: 'Lew',
    m: {
      conflict: 'Gdy czuje się zignorowany lub niedoceniony, jego duma zamienia się w królewski chłód. Najgorszą zbrodnią jest dla niego obojętność i brak podziwu.',
      venusGift: 'Pragnie zachwytu, rozmachu i celebracji. Prezent dla niego musi wyglądać jak trofeum — coś, co podkreśla jego wyjątkowy status w Twoich oczach.',
      openKey: 'Publiczna lojalność, szczery podziw i traktowanie go jak absolutnego centrum Twojego wszechświata.',
      secretGift: 'Rzemieślniczy sygnet lub spinki z 18-karatowego złota albo prywatna degustacja rocznikowych whisky z sommelierem'
    },
    f: {
      conflict: 'Gdy czuje się zignorowana lub traktowana zwyczajnie, jej duma zamienia się w królewski chłód. Najgorszą zbrodnią jest dla niej bylejakość.',
      venusGift: 'Pragnie zachwytu, blasku i wielkiego gestu. Prezent dla niej musi przypominać klejnot koronny — dowód, że jest jedyną królową w Twoim życiu.',
      openKey: 'Publiczny zachwyt, pełna lojalność i celebrowanie jej obecności bez czekania na specjalną okazję.',
      secretGift: 'Biżuteria z 18-karatowego złota o rzeźbiarskiej formie lub prywatna kolacja degustacyjna przy świecach z widokiem na panoramę miasta'
    }
  },
  {
    sign: 'Panna',
    m: {
      conflict: 'Zamiast krzyczeć, zaczyna punktować błędy z chirurgiczną precyzją. Jego chłód i perfekcjonizm to tarcza przed chaosem, którego panicznie się boi.',
      venusGift: 'Miłość wyraża przez uważność na mikro-detale. Docenia czystą formę, mistrzowską inżynierię i przedmioty, które rozwiązują problem, zanim go nazwie.',
      openKey: 'Dotrzymywanie słowa w najdrobniejszych sprawach i szacunek dla jego uporządkowanego świata.',
      secretGift: 'Japońskie pióro wieczne o minimalistycznej linii lub skórzany organizer podróżny wykonany ręcznie we Florencji'
    },
    f: {
      conflict: 'Zamiast krzyczeć, zaczyna punktować błędy z chirurgiczną precyzją. Jej chłód i perfekcjonizm to tarcza przed chaosem, którego panicznie się boi.',
      venusGift: 'Miłość wyraża przez uważność na mikro-detale. Docenia czystą estetykę, organiczny skład i przedmioty, które koją jej przebodźcowany umysł.',
      openKey: 'Dotrzymywanie słowa w najdrobniejszych sprawach i odciążenie jej z codziennego napięcia.',
      secretGift: 'Zestaw niszowych olejków adaptogennych w aptecznym szkle lub minimalistyczna biżuteria z surowym kamieniem szlachetnym'
    }
  }
];


// Part 2B: Zodiac Synastry Profiles 7–12 (Waga -> Ryby) with Male (m) & Female (f) forms
const SYNASTRY_PROFILES_B = [
  {
    sign: 'Waga',
    m: {
      conflict: 'Za wszelką cenę unika otwartej wojny i wulgarności, wycofując się w uprzejmy dystans. Długo waży racje, by nagle podjąć chłodną, ostateczną decyzję.',
      venusGift: 'Oddycha estetyką, symetrią i klasą. Brzydkie opakowanie lub przypadkowy gadżet potrafią fizycznie zgasić jego zaangażowanie.',
      openKey: 'Kultura sporu, wyrafinowana oprawa wspólnych chwil i partnerska równowaga w dawaniu uwagi.',
      secretGift: 'Flakon niszowych perfum z paryskiej perfumerii lub kolekcjonerski album designu i architektury'
    },
    f: {
      conflict: 'Za wszelką cenę unika otwartej wojny, uśmiechając się, gdy w środku narasta żal. Długo tłumi frustrację, by nagle zamknąć drzwi na zawsze.',
      venusGift: 'Oddycha estetyką, harmonią i wyrafinowaniem. Brak wyczucia smaku lub pośpiech potrafią fizycznie zgasić jej pożądanie.',
      openKey: 'Kultura sporu, piękna oprawa wspólnych wieczorów i uwaga poświęcona jej bez rozpraszaczy.',
      secretGift: 'Flakon niszowych perfum z paryskiego domu zapachowego lub rzeźbiarski wazon z dmuchanego szkła Murano'
    }
  },
  {
    sign: 'Skorpion',
    m: {
      conflict: 'Nie wybacza półprawd. W konflikcie schodzi na sam dół psychiki — milczy, obserwuje i uderza dokładnie w ten punkt, który najbardziej ukrywasz.',
      venusGift: 'Gardzi powierzchownością. Pragnie magnetyzmu, tajemnicy, tabu i przedmiotów, które mają ładunek władzy, mroku lub intymnej głębi.',
      openKey: 'Absolutna, nawet bolesna szczerość i odwaga do zejścia w jego mrok bez oceniania.',
      secretGift: 'Ekstrakt perfum z czarnym oudem, kadzidłem i skórą lub limitowane wydanie książki o psychologii władzy i cienia'
    },
    f: {
      conflict: 'Nie wybacza półprawd ani zdrady emocjonalnej. W konflikcie zamienia się w lód i prześwietla Cię na wylot, wyczuwając każdy fałszywy ton.',
      venusGift: 'Gardzi powierzchownością. Pragnie magnetyzmu, tajemnicy, zmysłowego napięcia i przedmiotów o silnym ładunku erotycznym lub symbolicznym.',
      openKey: 'Absolutna, nawet bolesna szczerość, magnetyczna wyłączność i odwaga do spotkania z jej głębią.',
      secretGift: 'Jedwabna bielizna nocna w kolorze obsydianu lub ekstrakt perfum z czarnym oudem, ciemną różą i ambrą'
    }
  },
  {
    sign: 'Strzelec',
    m: {
      conflict: 'Gdy czuje klatkę, kontrolę lub moralizowanie, natychmiast szuka wyjścia ewakuacyjnego. Mówi brutalną prawdę prosto w oczy, nie rozumiejąc, dlaczego to zabolało.',
      venusGift: 'Kocha horyzont, wolność i wielkie idee. Najlepszy prezent dla niego to taki, który pachnie dalekim światem, filozofią albo spontaniczną wyprawą.',
      openKey: 'Przestrzeń na niezależność, wspólny śmiech i brak prób udomowienia go na siłę.',
      secretGift: 'Skórzana torba weekendowa z biletem lotniczym w środku lub rzadki, starzony trunek z odległego zakątka świata'
    },
    f: {
      conflict: 'Gdy czuje zaborczość, rutynę lub kontrolę, natychmiast dusi się i ucieka. Mówi szczerą do bólu prawdę w emocjach, ale nie chowa urazy na długo.',
      venusGift: 'Kocha przestrzeń, przygodę i rozmach intelektualny. Najbardziej porywają ją prezenty, które otwierają nowe horyzonty lub zabierają ją w drogę.',
      openKey: 'Przestrzeń na wolność, autentyczny entuzjazm i bycie jej towarzyszem podróży, a nie strażnikiem.',
      secretGift: 'Ręcznie oprawiony dziennik podróżny z ukrytym w środku biletem lotniczym lub biżuteria inspirowana dawną astronomią'
    }
  },
  {
    sign: 'Koziorożec',
    m: {
      conflict: 'Zamraża emocje i przechodzi w tryb zarządu kryzysowego. Buduje mur z faktów i obowiązków, pod którym ukrywa lęk przed utratą kontroli i szacunku.',
      venusGift: 'Szacunek i klasa Old Money. Ceni rzeczy ponadczasowe, dyskretne, bez krzykliwego logo, które świadczą o mistrzowskim rzemiośle i trwałości.',
      openKey: 'Niezawodność, szacunek dla jego ambicji i stworzenie bezpiecznej przystani, w której nie musi być niezniszczalny.',
      secretGift: 'Klasyczny zegarek na skórzanym pasku, aktówka z włoskiej skóry licowej lub rocznikowe wino z prywatnej winnicy'
    },
    f: {
      conflict: 'Zamraża emocje i przechodzi w tryb chłodnej dyplomacji. Buduje mur z samowystarczalności, pod którym ukrywa lęk przed rozczarowaniem i słabością.',
      venusGift: 'Klasa Quiet Luxury. Ceni przedmioty szlachetne, dyskretne i trwałe — gardzi tanią pokazówką, doceniając kunszt, który przetrwa dekady.',
      openKey: 'Słowność, podziw dla jej siły oraz zdjęcie z jej barków konieczności kontrolowania wszystkiego.',
      secretGift: 'Kaszmirowy szal o architektonicznym splocie, klasyczna skórzana torebka bez krzykliwego logo lub biżuteria z czarnym onyksem'
    }
  },
  {
    sign: 'Wodnik',
    m: {
      conflict: 'Włącza emocjonalny dystans i patrzy na kłótnię jak naukowiec przez szybę laboratorium. Im bardziej naciskasz na dramat, tym bardziej staje się nieuchwytny.',
      venusGift: 'Fascynuje go unikatowość, futuryzm i wszystko, co wyłamuje się ze schematu. Prezent musi być jedyny w swoim rodzaju — masówka go obraża.',
      openKey: 'Przyjaźń jako fundament relacji, poszanowanie jego autonomii umysłowej i brak zaborczości.',
      secretGift: 'Gramofon o surowym, industrialnym designie, niszowy gadżet audiofilski lub sygnowana grafika sztuki nowoczesnej'
    },
    f: {
      conflict: 'Włącza chłodny, intelektualny dystans i staje się emocjonalnie przezroczysta. Gdy próbujesz zamknąć ją w konwenansach, znika bez uprzedzenia.',
      venusGift: 'Fascynuje ją oryginalność, awangarda i wolność myśli. Prezent dla niej musi być niszowy i niepowtarzalny — sieciówkowa klasyka ją nudzi.',
      openKey: 'Partnerstwo intelektualne, fascynacja jej odmiennością i pełne poszanowanie jej przestrzeni osobistej.',
      secretGift: 'Autorska biżuteria od niszowego rzeźbiarza, molekularne perfumy niszowe lub winylowe wydanie muzyki alternatywnej'
    }
  },
  {
    sign: 'Ryby',
    m: {
      conflict: 'Chłonie cudze napięcie jak gąbka, po czym wycofuje się we mgłę, ciszę lub melancholię. Gdy rzeczywistość staje się zbyt brutalna, ucieka w swój wewnętrzny świat.',
      venusGift: 'Szuka magii, głębi i duchowego porozumienia bez słów. Najmocniej trafiają do niego prezenty, które działają na wyobraźnię, muzykę i podświadomość.',
      openKey: 'Delikatność, empatyczne słuchanie między wierszami i wspólne rytuały odcinające od zgiełku świata.',
      secretGift: 'Winylowe wydanie nastrojowej muzyki filmowej, słuchawki studyjne lub rzemieślnicze kadzidła z żywicy i cedru'
    },
    f: {
      conflict: 'Chłonie Twoje emocje jak gąbka, po czym rozpływa się w milczeniu, łzach lub niedomówieniach. Szorstki ton głosu rani ją głębiej niż jakiekolwiek argumenty.',
      venusGift: 'Szuka poezji, magii i mistycznego zespolenia. Najgłębiej poruszają ją prezenty, które działają na zmysły, sen, zapach i podświadomość.',
      openKey: 'Czuła obecność, czytanie między wierszami i stworzenie dla niej baśniowego azylu z dala od hałasu świata.',
      secretGift: 'Rytualny zestaw kąpielowy z solą z Morza Martwego i olejkiem z róży damasceńskiej lub jedwabna opaska na oczy z aromaterapią'
    }
  }
];
const SYNASTRY_PROFILES = SYNASTRY_PROFILES_A.concat(SYNASTRY_PROFILES_B);


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

  const loveTitleB = `Jak kocha ${nameB}?`;
  const pronounGenB = isFemB ? 'jej' : 'jego';
  const pronounAccB = isFemB ? 'ją' : 'go';
  const sunNounB    = isFemB ? `Urodzeniowe Słońce partnerki` : `Urodzeniowe Słońce partnera`;

  const jungianDiag = (typeof window !== 'undefined' && window.__GENERATE_JUNGIAN_DIAGNOSIS__ && window.__GENERATE_JUNGIAN_DIAGNOSIS__(d)) || {
    title: 'Ciche Przymierze czy Narkotyczny Magnes?',
    hook: 'W synastrii ten układ oznacza spotkanie dwóch światów, które w ułamku sekundy rozpoznają w sobie nawzajem to, co dawno zostało wyparte ze świadomości.',
    moonTitle: 'Dynamika Emocjonalna',
    moonDesc: 'Zderzenie dwóch podświadomych światów wymaga dojrzałości i zrozumienia granic.'
  };

  const ascTextB = cB.asc !== null ? `${ZODIAC_GLYPHS_MAP(cB.asc)}` : 'Brak godziny';

  function ZODIAC_GLYPHS_MAP(lon) {
    const names = ['Baran','Byk','Bliźnięta','Rak','Lew','Panna','Waga','Skorpion','Strzelec','Koziorożec','Wodnik','Ryby'];
    const glyphs = ['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];
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

  const ASPECT_MUGOL_MAP = {
    'Koniunkcja': { title: 'Koniunkcja (0°) — Fuzja i Zespolenie', desc: 'Planety stoją w tym samym miejscu nieba. Działacie tu jak jeden organizm — Wasze energie zlewają się w jedno, dając potężny magnetyzm i natychmiastowe porozumienie.' },
    'Trygon': { title: 'Trygon (120°) — Naturalna Harmonia', desc: 'Najszczęśliwszy kąt w astrologii. Energia płynie między Wami bez wysiłku. Doskonale się w tej sferze rozumiecie i nie musicie niczego sobie udowadniać.' },
    'Sekstyl': { title: 'Sekstyl (60°) — Przyjazna Szansa', desc: 'Zgodne żywioły dają wzajemną sympatię, lekkość i chęć wspólnego działania — wystarczy odrobina inicjatywy, by rozwinąć skrzydła.' },
    'Kwadratura': { title: 'Kwadratura (90°) — Napięcie i Iskra', desc: 'Kąt prosty wywołujący tarcie. Prowokuje silne pożądanie, ale też spory o dominację. To twórczy motor rozwoju, który nie pozwala na nudę.' },
    'Opozycja': { title: 'Opozycja (180°) — Przyciąganie Przeciwieństw', desc: 'Planety naprzeciwko siebie jak w lustrze. Fascynacja drugą naturą partnera. Wymaga kompromisu, by przyciąganie nie zmieniło się w przeciąganie liny.' }
  };
  window.__GET_ASPECT_MUGOL_TIP__ = function (name) {
    for (const key in ASPECT_MUGOL_MAP) {
      if (name.includes(key)) return ASPECT_MUGOL_MAP[key];
    }
    return { title: name, desc: 'Wzajemne oddziaływanie energii planetarnych w Waszej relacji.' };
  };

  const aspectItems = syn.aspects.map(a => {
    const tip = window.__GET_ASPECT_MUGOL_TIP__(a.name);
    return `
      <div class="syn-key-aspect-card" style="border-left-color:${a.color};">
        <div class="syn-key-aspect-planets">
          <span class="syn-ka-partner"><strong>${nameA}:</strong> <span class="syn-glyph">${a.pA.glyph}</span> ${a.pA.label}</span>
          <span class="syn-ka-arrow">&harr;</span>
          <span class="syn-ka-partner"><strong>${nameB}:</strong> <span class="syn-glyph">${a.pB.glyph}</span> ${a.pB.label}</span>
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

  const cityInfoA = cA.city ? `${cA.city.name} (${cA.tzLabel.split(',')[0]})` : 'Polska';
  const cityInfoB = cB.city ? `${cB.city.name} (${cB.tzLabel.split(',')[0]})` : 'Polska';

  container.innerHTML = `
    <!-- 1. GŁÓWNA DIAGNOZA ARCHETYPOWA -->
    <div class="syn-card syn-jungian-hero-card" style="margin-bottom: 2rem; border-color: rgba(201,169,110,0.35); background: linear-gradient(180deg, rgba(24,24,32,0.96) 0%, rgba(13,13,19,0.96) 100%); box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(201,169,110,0.1);">
      <div class="syn-card-tag" style="letter-spacing:0.18em;color:#C9A96E;">✦ ARCHETYP RELACJI & DIAGNOZA WIĘZI</div>
      <h2 class="syn-card-heading" style="font-size:1.6rem;color:#FAF8F5;border:none;padding-bottom:0.25rem;margin-bottom:0.75rem;line-height:1.3;">
        ${jungianDiag.title}
      </h2>
      <p style="font-size:1.02rem;line-height:1.75;color:rgba(250,248,245,0.92);margin-bottom:1.35rem;font-weight:300;">
        ${jungianDiag.hook}
      </p>
      <div style="padding:1.15rem 1.35rem;background:rgba(201,169,110,0.06);border-left:3px solid #C9A96E;border-radius:0.75rem;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#C9A96E;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.35rem;">
          PRAWDA O ŚWIECIE EMOCJONALNYM: ${jungianDiag.moonTitle} (${moonA.name} &times; ${moonB.name})
        </div>
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
          <h3 class="syn-card-heading" style="border:none;padding-bottom:0.2rem;margin-bottom:0.35rem;">${nameA} <span style="color:#C9A96E;">&times;</span> ${nameB}</h3>
          <p style="font-size:0.8rem;color:rgba(250,248,245,0.62);margin-bottom:0.85rem;line-height:1.5;">
            Biel: <strong>${nameA}</strong> (${cityInfoA}) • Złoto: <strong>${nameB}</strong> (${cityInfoB})
          </p>
          <div class="syn-wheel-container" id="syn-wheel-container">
            ${svgWheel}
            <div id="syn-wheel-popover" class="syn-wheel-popover" style="display:none;" aria-live="polite"></div>
          </div>
          <div id="syn-wheel-active-info" class="syn-wheel-info-bar">
            <div class="syn-wib-body" style="opacity:0.75;text-align:center;">
              ✦ Dotknij lub najedź na dowolną planetę, znak lub aspekt na kole, aby odkryć jego znaczenie
            </div>
          </div>
          <div class="syn-no-print" style="text-align:center;margin-top:1.1rem;display:flex;gap:0.6rem;justify-content:center;flex-wrap:wrap;">
            <button type="button" id="syn-share-link-btn" class="syn-btn-secondary" style="padding:0.55rem 1.15rem;font-size:10.5px;display:inline-flex;align-items:center;gap:6px;">
              <span>🔗 Skopiuj link</span>
            </button>
            <a id="syn-share-whatsapp-btn" href="#" target="_blank" rel="noopener noreferrer" class="syn-btn-secondary" style="padding:0.55rem 1.15rem;font-size:10.5px;color:#34D399;border-color:rgba(52,211,153,0.35);text-decoration:none;display:inline-flex;align-items:center;gap:6px;background:rgba(52,211,153,0.08);border-radius:9999px;font-family:'Inter',sans-serif;font-weight:600;letter-spacing:0.05em;transition:all 0.25s ease;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              <span>Wyślij na WhatsApp</span>
            </a>
          </div>
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
            <strong>${nameA}</strong> • Księżyc w znaku ${moonA.name} <span class="syn-glyph">${moonA.glyph}</span>, Mars w ${marA.name}
          </div>
          <p style="font-size:0.92rem;line-height:1.7;color:rgba(250,248,245,0.88);margin:0;">
            ${jProfMoonA.conflict}
          </p>
        </div>

        <div style="margin-bottom:1.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#C9A96E;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.45rem;">
            <strong>${nameB}</strong> • Księżyc w znaku ${moonB.name} <span class="syn-glyph">${moonB.glyph}</span>, Mars w ${marB.name}
          </div>
          <p style="font-size:0.92rem;line-height:1.7;color:rgba(250,248,245,0.88);margin:0;">
            ${jProfMoonB.conflict}
          </p>
        </div>

        <div style="padding:0.95rem 1.15rem;background:rgba(201,169,110,0.06);border-left:3px solid #C9A96E;border-radius:0.75rem;margin-top:1.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#C9A96E;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.35rem;font-weight:600;">
            ✦ Co zamyka ${isFemB ? 'partnerkę' : 'partnera'} (${nameB}) na bliskość:
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
        
        <p style="font-size:0.88rem;line-height:1.6;color:rgba(250,248,245,0.7);margin-bottom:1.15rem;font-family:'JetBrains Mono',monospace;">
          ${sunNounB}: <strong>${sunB.name} (<span class="syn-glyph">${sunB.glyph}</span> ${sunB.deg}°)</strong> • Wenus: <strong>${venB.name} (<span class="syn-glyph">${venB.glyph}</span> ${venB.deg}°)</strong>${cB.asc !== null ? ` • Ascendent: ${ascTextB}` : ''}
        </p>

        <div style="margin-bottom:1.25rem;">
          <p style="font-size:0.92rem;line-height:1.7;color:rgba(250,248,245,0.88);margin:0;">
            ${jProfVenB.sensory || profVenB.venusGift}
          </p>
        </div>

        <div style="padding:1rem 1.25rem;background:rgba(201,169,110,0.08);border:1px solid rgba(201,169,110,0.3);border-radius:0.85rem;margin-top:1.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#C9A96E;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.35rem;">
            ✦ Jak rozbroić ${isFemB ? 'jej' : 'jego'} pancerz:
          </div>
          <p style="font-size:0.88rem;line-height:1.6;color:rgba(250,248,245,0.9);margin:0;">
            ${jProfVenB.disarm || profSunB.openKey}
          </p>
        </div>
      </div>
    </div>

    <!-- 4. KARTA ARCHITEKTURY RELACJI -->
    <div class="syn-card" style="margin-top: 1.5rem; border-color: rgba(201,169,110,0.2); background: linear-gradient(180deg, rgba(20,20,28,0.7) 0%, rgba(12,12,18,0.7) 100%);">
      <div class="syn-card-tag" style="letter-spacing:0.15em;color:#C9A96E;">✦ ARCHITEKTURA RELACJI: CO NAPRAWDĘ WAS TRZYMA?</div>
      <h3 class="syn-card-heading" style="color:#FAF8F5;border:none;margin-bottom:0.65rem;">Lekcja Dojrzałości i Granic</h3>
      <p style="font-size:0.95rem;line-height:1.75;color:rgba(250,248,245,0.88);margin:0;">
        W horoskopie porównawczym to spotkanie nie jest sielanką z komedii romantycznej — jest zwierciadłem, w którym przeglądają się Wasze niezagojone miejsca z przeszłości. Jeśli wracacie do siebie po kryzysach, nie dzieje się tak z powodu przypadku, lecz dlatego, że podświadomie wyczuwacie w partnerze szansę na stanięcie w prawdzie. Dojrzałość w tej relacji nie polega na unikaniu różnic, lecz na rezygnacji z prób zmieniania drugiej osoby na własne podobieństwo i zamianie wzajemnego ranienia na cichą, niezłomną lojalność.
      </p>
    </div>
    <div id="syn-paywall-mount"></div>
  `;

    const shareBtn = document.getElementById('syn-share-link-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
          shareBtn.innerHTML = '<span style="color:#34D399;">✓ Skopiowano link!</span>';
          setTimeout(() => {
            shareBtn.innerHTML = '<span>🔗 Skopiuj link</span>';
          }, 3000);
        });
      }
    });
  }

  const waBtn = document.getElementById('syn-share-whatsapp-btn');
  if (waBtn) {
    const waText = `Sprawdź nasz kosmogram partnerski: Chemia ${syn.chemistry}%, Stabilność ${syn.security}%. Zobacz bi-wheel i naszą synastrię: ${window.location.href}`;
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
        ✦ Dotknij lub najedź na dowolną planetę, znak lub aspekt na kole, aby odkryć jego znaczenie
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
          <div class="syn-wib-body"><strong>Archetyp w Synastrii:</strong> ${p.meaning}</div>`;
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
    window.__SYNASTRY_REPORT_MOUNT__(document.getElementById('syn-paywall-mount'), d);
  }
  if (window.__INIT_PORTAL_TOOLTIP__) {
    window.__INIT_PORTAL_TOOLTIP__();
  }
};


// Part 3: Interactive UI & Results View with Gender Toggle for Kalkulator Synastrii Partnerskiej
(function () {
  const ZODIAC_NAMES = ['Baran','Byk','Bliźnięta','Rak','Lew','Panna','Waga','Skorpion','Strzelec','Koziorożec','Wodnik','Ryby'];
  const ZODIAC_GLYPHS = ['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];

  const ZODIAC_GEN = ['Barana','Byka','Bliźniąt','Raka','Lwa','Panny','Wagi','Skorpiona','Strzelca','Koziorożca','Wodnika','Ryb'];

  const STORAGE_KEY = 'neoromantyczny_synastry_v4';
  let genderA = 'f';
  let genderB = 'm';
  let hasCalculated = false;

  function getSignInfo(lon) {
    const idx = Math.floor((((lon % 360) + 360) % 360) / 30);
    const deg = Math.floor(lon % 30);
    return { idx, name: ZODIAC_NAMES[idx], gen: ZODIAC_GEN[idx], glyph: ZODIAC_GLYPHS[idx], deg, profile: SYNASTRY_PROFILES[idx] };
  }

  function loadInitialState() {
    const isTestEnv = (typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.') ||
      window.location.search.includes('test=true')
    ));

    const def = isTestEnv ? {
      nameA: 'Kasia', genderA: 'f', dateA: '2002-03-16', timeA: '12:05', cityA: 'Warszawa',
      nameB: 'Michał', genderB: 'm', dateB: '1999-04-30', timeB: '14:25', cityB: 'Kraków'
    } : {
      nameA: '', genderA: 'f', dateA: '', timeA: '', cityA: '',
      nameB: '', genderB: 'm', dateB: '', timeB: '', cityB: ''
    };
    try {
      localStorage.removeItem('neoromantyczny_synastry_v2');
      localStorage.removeItem('neoromantyczny_synastry_v3');
      const sp = new URLSearchParams(window.location.search);
      if (sp.has('dA') && sp.has('dB') && sp.get('dA') && sp.get('dB')) {
        return {
          nameA: sp.get('nA') || def.nameA,
          genderA: sp.get('gA') === 'm' ? 'm' : 'f',
          dateA: sp.get('dA') || def.dateA,
          timeA: sp.get('tA') !== null ? sp.get('tA') : def.timeA,
          cityA: sp.get('cA') || def.cityA,
          nameB: sp.get('nB') || def.nameB,
          genderB: sp.get('gB') === 'f' ? 'f' : 'm',
          dateB: sp.get('dB') || def.dateB,
          timeB: sp.get('tB') !== null ? sp.get('tB') : def.timeB,
          cityB: sp.get('cB') || def.cityB
        };
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
          <p class="syn-subtitle">Zestaw Wasze daty, godziny i miasta urodzenia. Obliczamy rzeczywiste kąty planetarne oraz Ascendent z automatyczną korektą czasu letniego/zimowego (CET/CEST).</p>
        </header>

        <form id="syn-form" onsubmit="return false;">
          <div class="syn-grid-2">
            <section class="syn-card">
              <div class="syn-card-tag">OSOBA PIERWSZA (TY)</div>
              <h3 class="syn-card-heading">Twój Kosmogram</h3>
              <div class="syn-field">
                <label class="syn-label">Twoja Płeć</label>
                <div class="syn-gender-group" id="gender-group-A">
                  <button type="button" class="syn-gender-btn ${genderA === 'f' ? 'active' : ''}" data-gender="f"><span class="syn-glyph">♀</span> Kobieta</button>
                  <button type="button" class="syn-gender-btn ${genderA === 'm' ? 'active' : ''}" data-gender="m"><span class="syn-glyph">♂</span> Mężczyzna</button>
                </div>
              </div>
              <div class="syn-field">
                <label class="syn-label" for="nameA">Twoje Imię (opcjonalnie)</label>
                <input class="syn-input" id="nameA" type="text" value="${init.nameA}" />
              </div>
              <div class="syn-field">
                <label class="syn-label" for="dateA">Data Urodzenia *</label>
                <input class="syn-input" id="dateA" type="date" value="${init.dateA}" required />
              </div>
              <div class="syn-field">
                <label class="syn-label" for="timeA">Godzina Urodzenia (opcjonalnie – dla Ascendentu)</label>
                <input class="syn-input" id="timeA" type="time" value="${init.timeA}" />
              </div>
              <div class="syn-field">
                <label class="syn-label" for="cityA">Miejsce narodzin (dla precyzyjnego Ascendentu)</label>
                <div class="syn-input-relative">
                  <input class="syn-input syn-input-with-icon" id="cityA" type="text" placeholder="np. Warszawa" value="${init.cityA || ''}" autocomplete="off" />
                  <svg class="syn-input-pin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
              </div>
            </section>

            <section class="syn-card">
              <div class="syn-card-tag">OSOBA DRUGA (PARTNER / PARTNERKA)</div>
              <h3 class="syn-card-heading">Kosmogram Partnera</h3>
              <div class="syn-field">
                <label class="syn-label">Płeć Partnera / Partnerki</label>
                <div class="syn-gender-group" id="gender-group-B">
                  <button type="button" class="syn-gender-btn ${genderB === 'f' ? 'active' : ''}" data-gender="f"><span class="syn-glyph">♀</span> Kobieta</button>
                  <button type="button" class="syn-gender-btn ${genderB === 'm' ? 'active' : ''}" data-gender="m"><span class="syn-glyph">♂</span> Mężczyzna</button>
                </div>
              </div>
              <div class="syn-field">
                <label class="syn-label" for="nameB">Imię Partnera / Partnerki</label>
                <input class="syn-input" id="nameB" type="text" value="${init.nameB}" />
              </div>
              <div class="syn-field">
                <label class="syn-label" for="dateB">Data Urodzenia Partnera *</label>
                <input class="syn-input" id="dateB" type="date" value="${init.dateB}" required />
              </div>
              <div class="syn-field">
                <label class="syn-label" for="timeB">Godzina Urodzenia (opcjonalnie)</label>
                <input class="syn-input" id="timeB" type="time" value="${init.timeB}" />
              </div>
              <div class="syn-field">
                <label class="syn-label" for="cityB">Miejsce narodzin Partnera (opcjonalnie)</label>
                <div class="syn-input-relative">
                  <input class="syn-input syn-input-with-icon" id="cityB" type="text" placeholder="np. Warszawa" value="${init.cityB || ''}" autocomplete="off" />
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
      computeAndRender(false);
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
      if (window.history && window.history.replaceState) {
        const sp = new URLSearchParams(window.location.search);
        sp.set('nA', rawNameA); sp.set('gA', genderA); sp.set('dA', dateA); sp.set('tA', timeA); sp.set('cA', cityA);
        sp.set('nB', rawNameB); sp.set('gB', genderB); sp.set('dB', dateB); sp.set('tB', timeB); sp.set('cB', cityB);
        window.history.replaceState(null, '', window.location.pathname + '?' + sp.toString() + window.location.hash);
      }
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
