/**
 * NEOROMANTYCZNY — SILNIK DYSPOZYTORÓW & HIERARCHII PLANETARNEJ
 * Obliczenia astronomiczne Meeus/Kepler + Algorytm Łańcuchów Dyspozytorów (DAG)
 */
(function () {
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;
  function norm360(d) { return ((d % 360) + 360) % 360; }

  const SIGNS = [
    { key: 'Aries', name: 'Baran', glyph: '♈' },
    { key: 'Taurus', name: 'Byk', glyph: '♉' },
    { key: 'Gemini', name: 'Bliźnięta', glyph: '♊' },
    { key: 'Cancer', name: 'Rak', glyph: '♋' },
    { key: 'Leo', name: 'Lew', glyph: '♌' },
    { key: 'Virgo', name: 'Panna', glyph: '♍' },
    { key: 'Libra', name: 'Waga', glyph: '♎' },
    { key: 'Scorpio', name: 'Skorpion', glyph: '♏' },
    { key: 'Sagittarius', name: 'Strzelec', glyph: '♐' },
    { key: 'Capricorn', name: 'Koziorożec', glyph: '♑' },
    { key: 'Aquarius', name: 'Wodnik', glyph: '♒' },
    { key: 'Pisces', name: 'Ryby', glyph: '♓' }
  ];

  // Astra Engine: Jupiter SVG glyph eliminates mirrored/inverted glyph on Windows fonts
  const JUPITER_GLYPH_HTML = '<svg width="1.05em" height="1.05em" viewBox="0 0 24 24" fill="none" style="display:inline-block;vertical-align:-0.18em;" xmlns="http://www.w3.org/2000/svg"><g transform="translate(12, 12)"><path d="M-5,-4 C-5,-8 1,-8 1,-4 C1,1 -5,1 -5,4 L7,4 M3,-4 L3,10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></svg>';

  const BODIES = [
    { key: 'sun', name: 'Słońce', glyph: '☉' },
    { key: 'moon', name: 'Księżyc', glyph: '☽' },
    { key: 'mercury', name: 'Merkury', glyph: '☿' },
    { key: 'venus', name: 'Wenus', glyph: '♀' },
    { key: 'mars', name: 'Mars', glyph: '♂' },
    { key: 'jupiter', name: 'Jowisz', glyph: JUPITER_GLYPH_HTML },
    { key: 'saturn', name: 'Saturn', glyph: '♄' },
    { key: 'uranus', name: 'Uran', glyph: '♅' },
    { key: 'neptune', name: 'Neptun', glyph: '♆' },
    { key: 'pluto', name: 'Pluton', glyph: '♇' },
    { key: 'chiron', name: 'Chiron', glyph: '⚷' },
    { key: 'lilith', name: 'Lilith', glyph: '⚸' },
    { key: 'node', name: 'Węzeł Północny', glyph: '☊' },
    { key: 'fortune', name: 'Punkt Szczęścia', glyph: '⊗' }
  ];

  const TRADITIONAL_RULERS = {
    Aries: 'mars', Taurus: 'venus', Gemini: 'mercury', Cancer: 'moon', Leo: 'sun', Virgo: 'mercury',
    Libra: 'venus', Scorpio: 'mars', Sagittarius: 'jupiter', Capricorn: 'saturn', Aquarius: 'saturn', Pisces: 'jupiter'
  };

  const MODERN_RULERS = {
    Aries: 'mars', Taurus: 'venus', Gemini: 'mercury', Cancer: 'moon', Leo: 'sun', Virgo: 'mercury',
    Libra: 'venus', Scorpio: 'pluto', Sagittarius: 'jupiter', Capricorn: 'saturn', Aquarius: 'uranus', Pisces: 'neptune'
  };

  const CITIES = [
    { id: 'warszawa', name: 'Warszawa', lat: 52.2297, lon: 21.0122, tz: 'Europe/Warsaw' },
    { id: 'krakow', name: 'Kraków', lat: 50.0647, lon: 19.9450, tz: 'Europe/Warsaw' },
    { id: 'wroclaw', name: 'Wrocław', lat: 51.1079, lon: 17.0385, tz: 'Europe/Warsaw' },
    { id: 'poznan', name: 'Poznań', lat: 52.4064, lon: 16.9252, tz: 'Europe/Warsaw' },
    { id: 'gdansk', name: 'Gdańsk', lat: 54.3520, lon: 18.6466, tz: 'Europe/Warsaw' },
    { id: 'lodz', name: 'Łódź', lat: 51.7592, lon: 19.4560, tz: 'Europe/Warsaw' },
    { id: 'katowice', name: 'Katowice', lat: 50.2649, lon: 19.0238, tz: 'Europe/Warsaw' },
    { id: 'szczecin', name: 'Szczecin', lat: 53.4285, lon: 14.5528, tz: 'Europe/Warsaw' },
    { id: 'lublin', name: 'Lublin', lat: 51.2465, lon: 22.5684, tz: 'Europe/Warsaw' },
    { id: 'bydgoszcz', name: 'Bydgoszcz', lat: 53.1235, lon: 18.0084, tz: 'Europe/Warsaw' },
    { id: 'bialystok', name: 'Białystok', lat: 53.1325, lon: 23.1688, tz: 'Europe/Warsaw' },
    { id: 'rzeszow', name: 'Rzeszów', lat: 50.0412, lon: 21.9991, tz: 'Europe/Warsaw' }
  ];

  const DEFAULT_FALLBACK_CITY = {
    id: 'default',
    name: 'Warszawa',
    lat: 52.05,
    lon: 20.43,
    tz: 'Europe/Warsaw'
  };

  function normalizeCityName(s) {
    return String(s || '').toLowerCase().trim()
      .replace(/ł/g, 'l').replace(/ą/g, 'a').replace(/ę/g, 'e')
      .replace(/ś/g, 's').replace(/ć/g, 'c').replace(/ń/g, 'n')
      .replace(/ó/g, 'o').replace(/ź/g, 'z').replace(/ż/g, 'z')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function getCityByName(name) {
    if (!name || !name.trim()) return DEFAULT_FALLBACK_CITY;
    const clean = normalizeCityName(name);

    // 1. Sprawdź bazę ACG_CITIES_DB jeśli załadowana (240+ miast Polski i świata)
    if (typeof window !== 'undefined' && window.ACG_CITIES_DB && Array.isArray(window.ACG_CITIES_DB.allCities)) {
      const match = window.ACG_CITIES_DB.allCities.find(c => {
        const nc = normalizeCityName(c.name);
        return nc === clean || nc.startsWith(clean) || clean.startsWith(nc);
      });
      if (match) return { id: clean, name: match.name, lat: match.lat, lon: match.lon, tz: match.tz || 'Europe/Warsaw' };
    }

    // 2. Sprawdź wbudowaną listę CITIES
    const found = CITIES.find(c => normalizeCityName(c.name) === clean || c.id === clean);
    if (found) return found;
    const partial = CITIES.find(c => normalizeCityName(c.name).startsWith(clean) || clean.startsWith(normalizeCityName(c.name)));
    if (partial) return partial;

    // 3. Fallback do precyzyjnego standardu centrum Polski (52.05, 20.43 - identyczny jak w kalkulatorze ascendentu)
    return { id: 'custom', name: name.trim(), lat: 52.05, lon: 20.43, tz: 'Europe/Warsaw' };
  }

  function getTzOffset(y, m, d, hh, mm) {
    try {
      const approxUtc = Date.UTC(y, m - 1, d, hh, mm, 0);
      const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Warsaw',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });
      const parts = {};
      dtf.formatToParts(new Date(approxUtc)).forEach(p => { parts[p.type] = p.value; });
      const hr = parts.hour === '24' ? 0 : Number(parts.hour);
      const localAsUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), hr, Number(parts.minute), 0);
      return Math.round((localAsUtc - approxUtc) / 3600000);
    } catch (e) {
      return (m >= 4 && m <= 10) ? 2 : 1;
    }
  }

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
  function calcAllPlanets(dateStr, timeStr, cityName) {
    const city = getCityByName(cityName);
    const [y, m, d] = dateStr.split('-').map(Number);
    const hasTime = Boolean(timeStr && timeStr.includes(':'));
    const [hh, mm] = hasTime ? timeStr.split(':').map(Number) : [12, 0];
    const tzOffset = getTzOffset(y, m, d, hh, mm);
    const utcDate = new Date(Date.UTC(y, m - 1, d, hh - tzOffset, mm, 0));
    const jd = utcDate.getTime() / 86400000 + 2440587.5;
    const T = (jd - 2451545.0) / 36525.0;

    // 1. Słońce
    const L0 = norm360(280.46646 + 36000.76983 * T);
    const M = norm360(357.52911 + 35999.05029 * T);
    const C = (1.914602 - 0.004817 * T) * Math.sin(M * DEG) + 0.019993 * Math.sin(2 * M * DEG);
    const sunLon = norm360(L0 + C);

    // 2. Księżyc
    const Lp = norm360(218.31645 + 481267.88123 * T);
    const D = norm360(297.85019 + 445267.11140 * T);
    const Mp = norm360(134.96340 + 477198.86751 * T);
    const F = norm360(93.27210 + 483202.01752 * T);
    const moonLon = norm360(Lp + 6.289 * Math.sin(Mp * DEG) - 1.274 * Math.sin((Mp - 2*D) * DEG) + 0.658 * Math.sin(2*D * DEG) - 0.186 * Math.sin(M * DEG) - 0.114 * Math.sin(2*F * DEG));

    // 3. Planety heliocentryczne -> geocentryczne
    const earthH = helioXY(1.00000261 + 0.00000562 * T, 0.01671123 - 0.00004392 * T, -0.00001531 - 0.01294668 * T, 100.46457166 + 35999.37244981 * T, 102.93768193 + 0.32327364 * T, 0.0);
    const mercH  = helioXY(0.38709927 + 0.00000037 * T, 0.20563593 + 0.00001906 * T, 7.00497902 - 0.00594749 * T, 252.25032350 + 149472.67411175 * T, 77.45779628 + 0.16047689 * T, 48.33076593 - 0.12534081 * T);
    const venusH = helioXY(0.72333566 + 0.00000390 * T, 0.00677672 - 0.00004107 * T, 3.39467605 - 0.00078890 * T, 181.97909950 + 58517.81538729 * T, 131.60246718 + 0.00268329 * T, 76.67984255 - 0.27769418 * T);
    const marsH  = helioXY(1.52371034 + 0.00001847 * T, 0.09339410 + 0.00007882 * T, 1.84969142 - 0.00813131 * T, -4.55343205 + 19140.30268499 * T, -23.94362959 + 0.44441088 * T, 49.55953891 - 0.29257343 * T);
    const jupH   = helioXY(5.20288700 - 0.00011607 * T, 0.04838624 - 0.00013253 * T, 1.30439695 - 0.00183714 * T, 34.39644051 + 3034.74612775 * T, 14.72847983 + 0.21252668 * T, 100.47390909 + 0.20469106 * T);
    const satH   = helioXY(9.53667594 - 0.00125060 * T, 0.05386179 - 0.00050991 * T, 2.48599187 + 0.00193609 * T, 49.95424423 + 1222.49362201 * T, 92.59887831 - 0.41897216 * T, 113.66242448 - 0.28867794 * T);
    const uranH  = helioXY(19.18916464 - 0.00203876 * T, 0.04725744 - 0.00004397 * T, 0.77263783 - 0.00055246 * T, 313.23810451 + 428.46788481 * T, 170.95427630 + 0.40805281 * T, 74.01692503 + 0.04240589 * T);
    const nepH   = helioXY(30.06992276 + 0.00026291 * T, 0.00860619 + 0.00002132 * T, 1.77004347 - 0.00025547 * T, -55.12002969 + 218.48620020 * T, 44.96476227 - 0.32241464 * T, 131.78422574 - 0.00593206 * T);
    const plutoH = helioXY(39.48211675 - 0.00031596 * T, 0.24882730 + 0.00005170 * T, 17.14001206 + 0.00004818 * T, 238.92903833 + 145.20780515 * T, 224.06891629 - 0.04062942 * T, 110.30393684 - 0.01183482 * T);

    const mercLon  = norm360(Math.atan2(mercH.y - earthH.y, mercH.x - earthH.x) * RAD);
    const venusLon = norm360(Math.atan2(venusH.y - earthH.y, venusH.x - earthH.x) * RAD);
    const marsLon  = norm360(Math.atan2(marsH.y - earthH.y, marsH.x - earthH.x) * RAD);
    const jupLon   = norm360(Math.atan2(jupH.y - earthH.y, jupH.x - earthH.x) * RAD);
    const satLon   = norm360(Math.atan2(satH.y - earthH.y, satH.x - earthH.x) * RAD);
    const uranLon  = norm360(Math.atan2(uranH.y - earthH.y, uranH.x - earthH.x) * RAD);
    const nepLon   = norm360(Math.atan2(nepH.y - earthH.y, nepH.x - earthH.x) * RAD);
    const plutoLon = norm360(Math.atan2(plutoH.y - earthH.y, plutoH.x - earthH.x) * RAD);

    // 4. Chiron (Kepler orbit heliocentric -> geocentric, NASA JPL J2000 epoch)
    const chironH = helioXY(13.65, 0.3806, 6.94, 217.58 + 713.58 * T, 188.86, 209.38);
    const chironLon = norm360(Math.atan2(chironH.y - earthH.y, chironH.x - earthH.x) * RAD);

    // 5. Węzeł Północny (Mean Lunar Node)
    const nodeLon = norm360(125.04452 - 1934.136261 * T + 0.0020708 * T * T);

    // 6. Lilith (Czarny Księżyc - Mean Lunar Apogee = Perigee + 180°)
    const lilithLon = norm360(83.353243 + 4069.0137287 * T - 0.01032 * T * T + 180.0);

    // 7. Ascendent
    let ascLon = null;
    if (hasTime) {
      const gmst = norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0));
      const lst = norm360(gmst + city.lon);
      const eps = 23.43929 - 0.01300 * T;
      const yAsc = Math.cos(lst * DEG);
      const xAsc = -(Math.sin(eps * DEG) * Math.tan(city.lat * DEG) + Math.cos(eps * DEG) * Math.sin(lst * DEG));
      ascLon = norm360(Math.atan2(yAsc, xAsc) * RAD);
    }
    const refAsc = ascLon !== null ? ascLon : 0;

    // 8. Punkt Szczęścia (Pars Fortunae)
    const sunDist = norm360(sunLon - refAsc);
    const isDay = (sunDist >= 180 && sunDist < 360);
    const fortuneLon = norm360(isDay ? (refAsc + moonLon - sunLon) : (refAsc + sunLon - moonLon));

    const rawLons = {
      sun: sunLon, moon: moonLon, mercury: mercLon, venus: venusLon, mars: marsLon,
      jupiter: jupLon, saturn: satLon, uranus: uranLon, neptune: nepLon, pluto: plutoLon,
      chiron: chironLon, lilith: lilithLon, node: nodeLon, fortune: fortuneLon
    };

    const planets = BODIES.map(b => {
      const lon = rawLons[b.key];
      const signIdx = Math.floor(lon / 30);
      const sign = SIGNS[signIdx];
      const degInSign = Math.floor(lon % 30);
      const minInSign = Math.floor((lon % 1) * 60);
      const degreeInSign = `${degInSign}°${minInSign < 10 ? '0' : ''}${minInSign}'`;
      return {
        key: b.key,
        name: b.name,
        glyph: b.glyph,
        longitude: lon,
        sign: sign.key,
        signKey: sign.key,
        signName: sign.name,
        signGlyph: sign.glyph,
        deg: degInSign,
        min: minInSign,
        degInSign: degInSign,
        minInSign: minInSign,
        degreeInSign: degreeInSign
      };
    });

    const ascSignIdx = ascLon !== null ? Math.floor(ascLon / 30) : null;
    const ascSign = ascSignIdx !== null ? SIGNS[ascSignIdx] : null;
    const houseCusps = Array.from({ length: 12 }, (_, i) => ({
      house: i + 1,
      longitude: norm360(refAsc + i * 30)
    }));

    return {
      planets,
      ascLon,
      ascSign,
      ascendant: {
        longitude: refAsc,
        sign: ascSign ? ascSign.key : 'Aries',
        signKey: ascSign ? ascSign.key : 'Aries',
        signName: ascSign ? ascSign.name : 'Baran',
        glyph: ascSign ? ascSign.glyph : '♈'
      },
      houses: { cusps: houseCusps, system: 'Equal' },
      city,
      hasTime,
      jd
    };
  }
  function calculateDispositorChain(planets, useModern = true) {
    const rulers = useModern ? MODERN_RULERS : TRADITIONAL_RULERS;
    const activeBodies = useModern ? BODIES : BODIES.filter(b => !['uranus', 'neptune', 'pluto'].includes(b.key));
    const activePlanets = planets.filter(p => activeBodies.some(b => b.key === p.key));

    const chain = {};
    activePlanets.forEach(p => {
      chain[p.key] = rulers[p.sign];
    });

    const summary = {};
    const finalDispositors = [];
    const mutualReceptions = [];
    const loops = [];

    activePlanets.forEach(p => {
      let current = p.key;
      const path = [current];
      const visited = new Set([current]);

      while (true) {
        const next = chain[current];
        if (!next) break;

        if (next === current) {
          if (!finalDispositors.includes(next)) finalDispositors.push(next);
          break;
        }

        if (visited.has(next)) {
          const cycleStartIdx = path.indexOf(next);
          const cycle = path.slice(cycleStartIdx);
          if (cycle.length === 2) {
            const sortedPair = [...cycle].sort().join('-');
            if (!mutualReceptions.some(r => r.sort().join('-') === sortedPair)) {
              mutualReceptions.push(cycle);
            }
          } else if (cycle.length > 2) {
            const sortedLoop = [...cycle].sort().join('-');
            if (!loops.some(l => l.sort().join('-') === sortedLoop)) {
              loops.push(cycle);
            }
          }
          break;
        }

        path.push(next);
        visited.add(next);
        current = next;
      }
    });

    activePlanets.forEach(p => {
      summary[p.key] = {
        planet: p,
        rulerKey: chain[p.key],
        directSubjects: [],
        indirectSubjects: [],
        totalWeight: 0,
        percentage: 0,
        directCount: 0,
        indirectCount: 0
      };
    });

    activePlanets.forEach(startP => {
      let curr = startP.key;
      const visitedOnPath = new Set([curr]);
      let depth = 0;

      while (chain[curr] && depth < 20) {
        const master = chain[curr];
        if (!master) break;

        // If cycle encountered on current path, stop loop immediately
        if (visitedOnPath.has(master)) {
          if (master !== startP.key && summary[master]) {
            if (depth === 0) {
              if (!summary[master].directSubjects.includes(startP.key)) {
                summary[master].directSubjects.push(startP.key);
              }
            } else {
              if (!summary[master].directSubjects.includes(startP.key) && !summary[master].indirectSubjects.includes(startP.key)) {
                summary[master].indirectSubjects.push(startP.key);
              }
            }
          }
          break;
        }

        if (master !== startP.key && summary[master]) {
          summary[master].totalWeight += (1 / (depth + 1));
          if (depth === 0) {
            if (!summary[master].directSubjects.includes(startP.key)) {
              summary[master].directSubjects.push(startP.key);
            }
          } else {
            if (!summary[master].directSubjects.includes(startP.key) && !summary[master].indirectSubjects.includes(startP.key)) {
              summary[master].indirectSubjects.push(startP.key);
            }
          }
        }

        // Domicile planet rules itself
        if (master === curr) break;

        visitedOnPath.add(master);
        curr = master;
        depth++;
      }
    });

    activePlanets.forEach(p => {
      const s = summary[p.key];
      if (s) {
        s.directCount = s.directSubjects.length;
        s.indirectCount = s.indirectSubjects.length;
      }
    });

    // Planeta w domicylu ma bonus wagi
    finalDispositors.forEach(fd => {
      if (summary[fd]) summary[fd].totalWeight += 2.0;
    });

    const totalWeight = Object.values(summary).reduce((acc, s) => acc + s.totalWeight, 0);
    Object.keys(summary).forEach(k => {
      summary[k].percentage = totalWeight > 0 ? (summary[k].totalWeight / totalWeight) * 100 : 0;
    });

    const summaryArray = Object.keys(summary)
      .filter(k => summary[k].directCount > 0 || summary[k].indirectCount > 0 || ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].includes(k))
      .map(k => ({
        planet: k,
        ruler: chain[k],
        directSubjects: summary[k].directSubjects,
        indirectSubjects: summary[k].indirectSubjects,
        totalSubjects: summary[k].directSubjects.length + summary[k].indirectSubjects.length,
        percentage: Math.round(summary[k].percentage),
        weight: summary[k].totalWeight
      })).sort((a, b) => b.weight - a.weight);

    const chainArray = activePlanets.map(p => ({
      planet: p.key,
      ruler: chain[p.key],
      subjects: summary[p.key] ? summary[p.key].directSubjects : []
    }));

    return {
      summary: summaryArray,
      summaryMap: summary,
      finalDispositors,
      mutualReceptions,
      loops,
      chain: chainArray,
      chainMap: chain,
      activePlanets,
      useModern
    };
  }

  window.__DISPOSITOR_ENGINE__ = {
    calcAllPlanets,
    calculateDispositorChain,
    CITIES,
    BODIES,
    SIGNS,
    TRADITIONAL_RULERS,
    MODERN_RULERS
  };
})();
