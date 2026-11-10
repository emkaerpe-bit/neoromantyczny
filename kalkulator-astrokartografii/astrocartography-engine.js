/**
 * NEOROMANTYCZNY — SILNIK ASTROKARTOGRAFII SFERYCZNEJ & RELOKACJI (MEEUS / JIM LEWIS STANDARD)
 * 1. Konwersja strefy czasowej IANA (Intl.DateTimeFormat) -> dokładny UTC i Dzień Juliański (JD).
 * 2. Nutacja (Δψ, Δε), Nachylenie Ekliptyki (ε) i Pozorny Czas Gwiazdowy Greenwich (GAST).
 * 3. Współrzędne ekliptyczne (λ, β) -> Równikowe: Rektascensja (α) i Deklinacja (δ).
 * 4. Ortodroma Haversine (km) do krzywych MC, IC, AC i DC oraz wysokość horyzontalna h°.
 */
(function () {
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;
  const EARTH_RADIUS_KM = 6371.0;

  function norm360(x) {
    return ((x % 360) + 360) % 360;
  }

  function norm180(x) {
    let a = ((x + 180) % 360 + 360) % 360 - 180;
    return a === -180 ? 180 : a;
  }

  function getTzOffsetHours(timeZone, y, m, d, hh, mm) {
    try {
      const utcGuess = new Date(Date.UTC(y, m - 1, d, hh, mm, 0));
      const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone || 'Europe/Warsaw',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      });
      const parts = {};
      fmt.formatToParts(utcGuess).forEach(p => { parts[p.type] = p.value; });
      const hr = parseInt(parts.hour, 10) === 24 ? 0 : parseInt(parts.hour, 10);
      const localAsUtc = Date.UTC(
        parseInt(parts.year, 10),
        parseInt(parts.month, 10) - 1,
        parseInt(parts.day, 10),
        hr,
        parseInt(parts.minute, 10),
        0
      );
      return (localAsUtc - utcGuess.getTime()) / 3600000;
    } catch (e) {
      const isSummer = m >= 4 && m <= 9;
      return isSummer ? 2 : 1;
    }
  }

  function computeJulianDay(y, m, d, utHours) {
    let Y = y, M = m;
    if (M <= 2) { Y -= 1; M += 12; }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + (utHours / 24.0) + B - 1524.5;
  }

  function computeNutationAndObliquity(T) {
    const omega = norm360(125.04452 - 1934.136261 * T);
    const Lsun = norm360(280.4665 + 36000.7698 * T);
    const Lmoon = norm360(218.3165 + 481267.8813 * T);
    const dPsiArcsec = -17.20 * Math.sin(omega * DEG) - 1.32 * Math.sin(2 * Lsun * DEG) - 0.23 * Math.sin(2 * Lmoon * DEG) + 0.21 * Math.sin(2 * omega * DEG);
    const dEpsArcsec = 9.20 * Math.cos(omega * DEG) + 0.57 * Math.cos(2 * Lsun * DEG) + 0.10 * Math.cos(2 * Lmoon * DEG) - 0.09 * Math.cos(2 * omega * DEG);
    const eps0 = 23.4392911 - 0.0130042 * T;
    const eps = eps0 + (dEpsArcsec / 3600.0);
    const dPsi = dPsiArcsec / 3600.0;
    return { eps, dPsi };
  }

  function computeGAST(jd, T, eps, dPsi) {
    const gmst = norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T);
    const eqEq = dPsi * Math.cos(eps * DEG);
    return norm360(gmst + eqEq);
  }

  function eclipticToEquatorial(lonDeg, latDeg, epsDeg) {
    const lam = lonDeg * DEG;
    const bet = (latDeg || 0) * DEG;
    const eps = epsDeg * DEG;
    const sinDec = Math.sin(bet) * Math.cos(eps) + Math.cos(bet) * Math.sin(eps) * Math.sin(lam);
    const dec = Math.asin(Math.max(-1, Math.min(1, sinDec))) * RAD;
    const y = Math.sin(lam) * Math.cos(eps) - Math.tan(bet) * Math.sin(eps);
    const x = Math.cos(lam);
    const ra = norm360(Math.atan2(y, x) * RAD);
    return { ra, dec };
  }

  function haversineKm(lat1, lon1, lat2, lon2) {
    const dLat = (lat2 - lat1) * DEG;
    const dLon = norm180(lon2 - lon1) * DEG;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * DEG) * Math.cos(lat2 * DEG) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
  }

  function heliocentric3D(T, L0, L1, a, e, iDeg, omDeg, wBarDeg) {
    const L = norm360(L0 + L1 * T);
    const M = norm360(L - wBarDeg) * DEG;
    const E = M + e * Math.sin(M) * (1.0 + e * Math.cos(M));
    const xv = a * (Math.cos(E) - e);
    const yv = a * Math.sqrt(1.0 - e * e) * Math.sin(E);
    const v = Math.atan2(yv, xv) * RAD;
    const r = Math.sqrt(xv * xv + yv * yv);
    const u = (v + wBarDeg - omDeg) * DEG;
    const om = omDeg * DEG;
    const inc = iDeg * DEG;
    const x = r * (Math.cos(om) * Math.cos(u) - Math.sin(om) * Math.sin(u) * Math.cos(inc));
    const y = r * (Math.sin(om) * Math.cos(u) + Math.cos(om) * Math.sin(u) * Math.cos(inc));
    const z = r * (Math.sin(u) * Math.sin(inc));
    return { x, y, z };
  }

  function computeAllPlanets(dateStr, timeStr, birthCity) {
    const [y, m, d] = dateStr.split('-').map(Number);
    const [hh, mm] = (timeStr || '12:00').split(':').map(Number);
    const tzName = (birthCity && birthCity.tz) ? birthCity.tz : 'Europe/Warsaw';
    const tzOffset = getTzOffsetHours(tzName, y, m, d, hh, mm);
    const utHours = hh + (mm / 60.0) - tzOffset;

    const jd = computeJulianDay(y, m, d, utHours);
    const T = (jd - 2451545.0) / 36525.0;
    const { eps, dPsi } = computeNutationAndObliquity(T);
    const gast = computeGAST(jd, T, eps, dPsi);

    const earth = heliocentric3D(T, 100.46646, 35999.37283, 1.000001, 0.0167086, 0.0, 0.0, 102.93735);
    const sunLon = norm360(Math.atan2(-earth.y, -earth.x) * RAD + dPsi);

    // Moon with principal periodic terms in longitude and latitude (Meeus Ch. 47)
    const Lp = norm360(218.3164477 + 481267.88123421 * T);
    const D = norm360(297.8501921 + 445267.1114034 * T) * DEG;
    const Ms = norm360(357.5291092 + 35999.0502909 * T) * DEG;
    const Mm = norm360(134.9633964 + 477198.8675055 * T) * DEG;
    const F = norm360(93.2720950 + 483202.0175233 * T) * DEG;
    const moonLon = norm360(
      Lp + 6.288774 * Math.sin(Mm) + 1.274027 * Math.sin(2 * D - Mm) +
      0.658314 * Math.sin(2 * D) + 0.213618 * Math.sin(2 * Mm) -
      0.185116 * Math.sin(Ms) - 0.114332 * Math.sin(2 * F) + dPsi
    );
    const moonLat = 5.128122 * Math.sin(F) + 0.280602 * Math.sin(Mm + F) +
                    0.277693 * Math.sin(Mm - F) + 0.173237 * Math.sin(2 * D - F);

    const rawElements = {
      mercury: [252.2509, 149472.6746, 0.387098, 0.205630, 7.005, 48.331, 77.456],
      venus:   [181.9798,  58517.8156, 0.723332, 0.006772, 3.395, 76.680, 131.564],
      mars:    [355.4330,  19140.2993, 1.523679, 0.093400, 1.850, 49.558, 336.060],
      jupiter: [ 34.3515,   3034.9057, 5.202603, 0.048498, 1.303, 100.464, 14.331],
      saturn:  [ 50.0774,   1222.1138, 9.554909, 0.055508, 2.485, 113.665, 93.057],
      pluto:   [238.9288,    145.2078, 39.48168, 0.248808, 17.140, 110.303, 224.067]
    };

    const bodies = {
      sun: { lon: sunLon, lat: 0.0 },
      moon: { lon: moonLon, lat: moonLat }
    };

    Object.keys(rawElements).forEach(k => {
      const p = heliocentric3D(T, ...rawElements[k]);
      const gx = p.x - earth.x;
      const gy = p.y - earth.y;
      const gz = p.z - earth.z;
      const distXY = Math.sqrt(gx * gx + gy * gy);
      bodies[k] = {
        lon: norm360(Math.atan2(gy, gx) * RAD + dPsi),
        lat: Math.atan2(gz, distXY) * RAD
      };
    });

    const planets = {};
    Object.keys(bodies).forEach(k => {
      const eq = eclipticToEquatorial(bodies[k].lon, bodies[k].lat, eps);
      const mcLon = norm180(eq.ra - gast);
      const icLon = norm180(mcLon + 180);
      planets[k] = {
        key: k,
        lon: bodies[k].lon,
        lat: bodies[k].lat,
        ra: eq.ra,
        dec: eq.dec,
        mcLon,
        icLon
      };
    });

    return { jd, T, eps, dPsi, gast, tzOffset, tzName, planets };
  }

  function getAcDcLonAtLat(planet, latDeg) {
    const val = -Math.tan(latDeg * DEG) * Math.tan(planet.dec * DEG);
    if (val < -1 || val > 1) return null;
    const H0 = Math.acos(val) * RAD;
    return {
      acLon: norm180(planet.mcLon - H0),
      dcLon: norm180(planet.mcLon + H0)
    };
  }

  function computeAscendantAndMC(gast, eps, latDeg, lonDeg) {
    const lst = norm360(gast + lonDeg);
    const ramc = lst * DEG;
    const e = eps * DEG;
    const phi = latDeg * DEG;
    const mcLon = norm360(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(e)) * RAD);
    const y = Math.cos(ramc);
    const x = -Math.sin(ramc) * Math.cos(e) - Math.tan(phi) * Math.sin(e);
    const ascLon = norm360(Math.atan2(y, x) * RAD);
    return { ascLon, mcLon, lst };
  }

  function distanceToAcDcCurveKm(planet, axis, cityLat, cityLon) {
    // 1. Sample along the oblique AC/DC horizon curve around cityLat (-16° to +16°) for exact minimum Haversine distance
    let minKm = Infinity;
    const minLat = Math.max(-64, cityLat - 16);
    const maxLat = Math.min(64, cityLat + 16);
    for (let lat = minLat; lat <= maxLat; lat += 1.0) {
      const acdc = getAcDcLonAtLat(planet, lat);
      if (!acdc) continue;
      const curveLon = axis === 'AC' ? acdc.acLon : acdc.dcLon;
      const dKm = haversineKm(cityLat, cityLon, lat, curveLon);
      if (dKm < minKm) minKm = dKm;
    }
    return Math.round(minKm);
  }

  function scoreCityForChart(city, chart) {
    const reloc = computeAscendantAndMC(chart.gast, chart.eps, city.lat, city.lon);
    const ascSignIdx = Math.floor(reloc.ascLon / 30);
    const mcSignIdx = Math.floor(reloc.mcLon / 30);

    const activeLines = [];

    Object.keys(chart.planets).forEach(pKey => {
      const p = chart.planets[pKey];

      // Exact geodesic distance to MC and IC meridians
      const distMC = Math.round(haversineKm(city.lat, city.lon, city.lat, p.mcLon));
      const distIC = Math.round(haversineKm(city.lat, city.lon, city.lat, p.icLon));
      activeLines.push({ planet: pKey, axis: 'MC', distKm: distMC, lonDiff: Math.abs(norm180(city.lon - p.mcLon)) });
      activeLines.push({ planet: pKey, axis: 'IC', distKm: distIC, lonDiff: Math.abs(norm180(city.lon - p.icLon)) });

      // Exact geodesic cross-track distance to oblique AC and DC horizon curves
      const distAC = distanceToAcDcCurveKm(p, 'AC', city.lat, city.lon);
      const distDC = distanceToAcDcCurveKm(p, 'DC', city.lat, city.lon);
      if (isFinite(distAC)) {
        activeLines.push({ planet: pKey, axis: 'AC', distKm: distAC, lonDiff: distAC / 85 });
      }
      if (isFinite(distDC)) {
        activeLines.push({ planet: pKey, axis: 'DC', distKm: distDC, lonDiff: distDC / 85 });
      }
    });

    activeLines.sort((a, b) => a.distKm - b.distKm);

    function proximityWeight(km) {
      return Math.max(0, 100 * Math.exp(-(km * km) / (650 * 650)));
    }

    // Zasada Czystości Linii (Jim Lewis Standard): jeśli przez miasto przebiega silna linia Saturna lub Plutona (<360 km),
    // nakładamy tłumienie na linie dobroczynne w tym samym punkcie, aby nie polecać strefy ciężaru jako „lekkiego sukcesu”.
    const minMaleficKm = Math.min(
      ...activeLines.filter(l => l.planet === 'saturn' || l.planet === 'pluto').map(l => l.distKm)
    );
    const maleficPenalty = minMaleficKm < 360 ? Math.round(48 * (1 - minMaleficKm / 360)) : 0;

    function bestLineFromSet(pairs, applyMaleficShield) {
      let best = null;
      let bestScore = -1;
      pairs.forEach(([pk, ax, mult]) => {
        const found = activeLines.find(l => l.planet === pk && l.axis === ax);
        if (found) {
          let sc = proximityWeight(found.distKm) * mult;
          if (applyMaleficShield && maleficPenalty > 0) {
            sc = Math.max(5, sc - maleficPenalty);
          }
          if (sc > bestScore) {
            bestScore = sc;
            best = { ...found, score: Math.round(sc), maleficPenalty };
          }
        }
      });
      return best;
    }

    const loveBest = bestLineFromSet([
      ['venus', 'DC', 1.22], ['venus', 'AC', 1.18], ['venus', 'MC', 1.10],
      ['moon', 'DC', 1.04],  ['sun', 'DC', 1.00],   ['jupiter', 'DC', 0.98]
    ], true);

    const wealthBest = bestLineFromSet([
      ['jupiter', 'MC', 1.24], ['jupiter', 'AC', 1.16], ['sun', 'MC', 1.14],
      ['mercury', 'MC', 1.10], ['venus', 'MC', 1.04],   ['jupiter', 'DC', 1.00], ['mercury', 'AC', 0.98]
    ], true);

    const homeBest = bestLineFromSet([
      ['moon', 'IC', 1.20], ['venus', 'IC', 1.18], ['jupiter', 'IC', 1.14],
      ['sun', 'IC', 1.05],  ['moon', 'AC', 1.00],  ['venus', 'AC', 0.96]
    ], true);

    const shadowBest = bestLineFromSet([
      ['saturn', 'MC', 1.18], ['saturn', 'AC', 1.16], ['pluto', 'MC', 1.15],
      ['pluto', 'AC', 1.15],  ['saturn', 'IC', 1.12], ['pluto', 'DC', 1.10], ['mars', 'AC', 0.98]
    ], false);

    const pSignIdx = Math.floor(chart.planets[activeLines[0].planet].lon / 30);
    const relocHouse = ((pSignIdx - ascSignIdx + 12) % 12) + 1;

    return {
      city,
      ascSignIdx,
      mcSignIdx,
      lst: reloc.lst,
      closest: activeLines[0],
      secondClosest: activeLines[1],
      relocHouse,
      loveBest,
      wealthBest,
      homeBest,
      shadowBest
    };
  }

  const VIEWPORTS = {
    world:  { lonMin: -180, lonMax: 180, latMin: -62, latMax: 74, w: 1080, h: 540 },
    europe: { lonMin: -24,  lonMax: 44,  latMin: 27,  latMax: 66, w: 1080, h: 540 }
  };

  function lonToX(lon, vp) {
    return ((lon - vp.lonMin) / (vp.lonMax - vp.lonMin)) * vp.w;
  }

  function latToY(lat, vp) {
    return ((vp.latMax - lat) / (vp.latMax - vp.latMin)) * vp.h;
  }

  function renderWorldMapSVG(chart, filterCategory, scoredCities, regionMode) {
    const data = window.ACG_DATA;
    const wm = window.ACG_WORLDMAP;
    const vp = VIEWPORTS[regionMode || 'world'] || VIEWPORTS.world;
    const isEuro = (regionMode === 'europe');

    let allowedPlanets = ['venus', 'jupiter', 'sun', 'moon', 'mercury', 'saturn', 'pluto'];
    if (filterCategory === 'love') allowedPlanets = ['venus', 'moon', 'sun'];
    if (filterCategory === 'wealth') allowedPlanets = ['jupiter', 'sun', 'mercury', 'mars'];
    if (filterCategory === 'shadow') allowedPlanets = ['saturn', 'pluto', 'mars'];

    let gridSvg = '';
    const lonStep = isEuro ? 10 : 30;
    const latStep = isEuro ? 10 : 20;

    for (let lon = Math.ceil(vp.lonMin / lonStep) * lonStep; lon <= vp.lonMax; lon += lonStep) {
      const x = lonToX(lon, vp).toFixed(1);
      const isPrime = lon === 0;
      gridSvg += `<line x1="${x}" y1="0" x2="${x}" y2="${vp.h}" stroke="${isPrime ? 'rgba(201,169,110,0.22)' : 'rgba(255,255,255,0.045)'}" stroke-width="${isPrime ? '1.1' : '0.7'}"/>`;
      gridSvg += `<text x="${Number(x) + 4}" y="${vp.h - 8}" fill="rgba(250,248,245,0.26)" font-size="8.5" font-family="JetBrains Mono,monospace">${lon > 0 ? lon + '°E' : (lon < 0 ? Math.abs(lon) + '°W' : '0°')}</text>`;
    }

    for (let lat = Math.ceil(vp.latMin / latStep) * latStep; lat <= vp.latMax; lat += latStep) {
      const y = latToY(lat, vp).toFixed(1);
      const isEq = lat === 0;
      gridSvg += `<line x1="0" y1="${y}" x2="${vp.w}" y2="${y}" stroke="${isEq ? 'rgba(201,169,110,0.24)' : 'rgba(255,255,255,0.045)'}" stroke-width="${isEq ? '1.1' : '0.7'}"/>`;
      gridSvg += `<text x="8" y="${Number(y) - 4}" fill="rgba(250,248,245,0.26)" font-size="8.5" font-family="JetBrains Mono,monospace">${lat > 0 ? lat + '°N' : (lat < 0 ? Math.abs(lat) + '°S' : 'Równik 0°')}</text>`;
    }

    let landSvg = '';
    if (wm && wm.LAND_POLYGONS) {
      wm.LAND_POLYGONS.forEach(poly => {
        const d = wm.polyToPath(poly.pts, lon => lonToX(lon, vp), lat => latToY(lat, vp));
        landSvg += `<path d="${d}" fill="rgba(201,169,110,0.11)" stroke="rgba(201,169,110,0.44)" stroke-width="${isEuro ? '1.25' : '0.95'}" stroke-linejoin="round"/>`;
      });
    }
    if (wm && wm.WATER_POLYGONS) {
      wm.WATER_POLYGONS.forEach(poly => {
        const d = wm.polyToPath(poly.pts, lon => lonToX(lon, vp), lat => latToY(lat, vp));
        landSvg += `<path d="${d}" fill="#090C15" stroke="rgba(201,169,110,0.40)" stroke-width="${isEuro ? '1.15' : '0.85'}" stroke-linejoin="round"/>`;
      });
    }
    if (wm && wm.COUNTRY_BORDERS && wm.lineToPath) {
      wm.COUNTRY_BORDERS.forEach((pts, idx) => {
        const d = wm.lineToPath(pts, lon => lonToX(lon, vp), lat => latToY(lat, vp));
        const isPL = idx === 0;
        landSvg += `<path d="${d}" fill="${isPL ? 'rgba(201,169,110,0.06)' : 'none'}" stroke="${isPL ? 'rgba(229,195,132,0.52)' : 'rgba(250,248,245,0.15)'}" stroke-width="${isPL ? (isEuro ? '1.25' : '0.85') : '0.65'}" ${isPL ? '' : 'stroke-dasharray="2.5,2.5"'} stroke-linejoin="round"/>`;
      });
    }

    let linesSvg = '';
    let badgesSvg = '';
    const placedBadges = [];

    function placeBadge(x, yPref, text, color) {
      if (x < 28 || x > vp.w - 28) return;
      let y = yPref;
      for (let attempt = 0; attempt < 10; attempt++) {
        const conflict = placedBadges.some(b => Math.abs(b.x - x) < 48 && Math.abs(b.y - y) < 19);
        if (!conflict) break;
        y += (attempt % 2 === 0 ? 20 : -20);
      }
      y = Math.max(18, Math.min(vp.h - 22, y));
      placedBadges.push({ x, y });
      badgesSvg += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)})" style="pointer-events:none;">
        <rect x="-23" y="-9.5" width="46" height="18" rx="5" fill="#0B0D16" fill-opacity="0.92" stroke="${color}" stroke-width="1"/>
        <text x="0" y="3.2" text-anchor="middle" fill="${color}" font-size="9.5" font-weight="600" font-family="JetBrains Mono,monospace">${text}</text>
      </g>`;
    }

    allowedPlanets.forEach((pKey, pIdx) => {
      const p = chart.planets[pKey];
      const meta = data.PLANET_META[pKey];
      if (!p || !meta) return;

      if (p.mcLon >= vp.lonMin && p.mcLon <= vp.lonMax) {
        const xMC = lonToX(p.mcLon, vp);
        linesSvg += `<g class="acg-map-line" data-planet="${pKey}" data-axis="MC">
          <line x1="${xMC.toFixed(1)}" y1="0" x2="${xMC.toFixed(1)}" y2="${vp.h}" stroke="${meta.color}" stroke-width="2.1" opacity="0.88"/>
        </g>`;
        placeBadge(xMC, 24 + (pIdx % 3) * 18, `${meta.symbol} MC`, meta.color);
      }

      if (p.icLon >= vp.lonMin && p.icLon <= vp.lonMax) {
        const xIC = lonToX(p.icLon, vp);
        linesSvg += `<g class="acg-map-line" data-planet="${pKey}" data-axis="IC">
          <line x1="${xIC.toFixed(1)}" y1="0" x2="${xIC.toFixed(1)}" y2="${vp.h}" stroke="${meta.color}" stroke-width="1.45" stroke-dasharray="5,5" opacity="0.62"/>
        </g>`;
        placeBadge(xIC, vp.h - 28 - (pIdx % 3) * 18, `${meta.symbol} IC`, meta.color);
      }

      ['acLon', 'dcLon'].forEach(curveKey => {
        const axisCode = curveKey === 'acLon' ? 'AC' : 'DC';
        const isSolid = axisCode === 'AC';
        let dPath = '';
        let prevX = null;
        let midPt = null;

        for (let lat = -60; lat <= 64; lat += 2) {
          const acdc = getAcDcLonAtLat(p, lat);
          if (!acdc) continue;
          const lon = acdc[curveKey];
          const x = lonToX(lon, vp);
          const y = latToY(lat, vp);
          if (prevX !== null && Math.abs(x - prevX) > vp.w * 0.35) {
            dPath += ` M ${x.toFixed(1)} ${y.toFixed(1)}`;
          } else {
            dPath += (dPath === '' ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : ` L ${x.toFixed(1)} ${y.toFixed(1)}`);
          }
          if (Math.abs(lat - (isEuro ? 46 : 22)) <= 2 && lon >= vp.lonMin && lon <= vp.lonMax) {
            midPt = { x, y };
          }
          prevX = x;
        }
        if (dPath) {
          linesSvg += `<g class="acg-map-line" data-planet="${pKey}" data-axis="${axisCode}">
            <path d="${dPath}" fill="none" stroke="${meta.color}" stroke-width="${isSolid ? '2.0' : '1.45'}" ${isSolid ? '' : 'stroke-dasharray="6,4"'} opacity="${isSolid ? '0.84' : '0.62'}"/>
          </g>`;
          if (midPt) placeBadge(midPt.x, midPt.y, `${meta.symbol} ${axisCode}`, meta.color);
        }
      });
    });

    let pinsSvg = '';
    if (scoredCities && scoredCities.length) {
      const topSet = new Set([
        scoredCities.slice().sort((a, b) => (b.loveBest?.score || 0) - (a.loveBest?.score || 0))[0]?.city.name,
        scoredCities.slice().sort((a, b) => (b.wealthBest?.score || 0) - (a.wealthBest?.score || 0))[0]?.city.name,
        scoredCities.slice().sort((a, b) => (b.homeBest?.score || 0) - (a.homeBest?.score || 0))[0]?.city.name,
        scoredCities.slice().sort((a, b) => (b.shadowBest?.score || 0) - (a.shadowBest?.score || 0))[0]?.city.name
      ]);

      const placedCityLabels = [];
      scoredCities.forEach(sc => {
        const c = sc.city;
        if (c.lon < vp.lonMin || c.lon > vp.lonMax || c.lat < vp.latMin || c.lat > vp.latMax) return;
        const cx = lonToX(c.lon, vp);
        const cy = latToY(c.lat, vp);
        const isTop = topSet.has(c.name);
        const pColor = data.PLANET_META[sc.closest.planet]?.color || '#C9A96E';
        const shortName = c.name.split('(')[0].split('&')[0].trim();

        let showLabel = isTop || isEuro;
        let ly = cy - 9;
        if (showLabel) {
          const hit = placedCityLabels.some(l => Math.abs(l.x - cx) < 58 && Math.abs(l.y - ly) < 14);
          if (hit && !isTop) {
            showLabel = false;
          } else if (hit && isTop) {
            ly = cy + 15;
          }
          if (showLabel) placedCityLabels.push({ x: cx, y: ly });
        }

        pinsSvg += `<g class="acg-city-pin" data-city="${c.name}" style="cursor:pointer;">
          ${isTop ? `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="10" fill="${pColor}" opacity="0.22"/>` : ''}
          <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${isTop ? '4.5' : '2.8'}" fill="${isTop ? pColor : '#FAF8F5'}" stroke="#07080E" stroke-width="1.3"/>
          ${showLabel ? `<text x="${cx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" fill="${isTop ? '#FAF8F5' : 'rgba(250,248,245,0.72)'}" font-size="${isTop ? '10.5' : '9'}" font-weight="${isTop ? '600' : '400'}" font-family="Inter,sans-serif" style="paint-order:stroke;stroke:#07080E;stroke-width:3px;stroke-linejoin:round;">${shortName}</text>` : ''}
        </g>`;
      });
    }

    return `<svg viewBox="0 0 ${vp.w} ${vp.h}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="display:block; background:radial-gradient(circle at 50% 45%, #111626 0%, #070910 100%);">
      <defs>
        <clipPath id="acgViewportClip"><rect x="0" y="0" width="${vp.w}" height="${vp.h}"/></clipPath>
      </defs>
      <g clip-path="url(#acgViewportClip)">
        ${gridSvg}
        ${landSvg}
        ${linesSvg}
        ${pinsSvg}
        ${badgesSvg}
      </g>
    </svg>`;
  }

  function formatLonLat(deg, posChar, negChar) {
    const abs = Math.abs(deg);
    const d = Math.floor(abs);
    const m = Math.round((abs - d) * 60);
    return `${d}°${String(m).padStart(2, '0')}' ${deg >= 0 ? posChar : negChar}`;
  }

  function renderEphemerisTable(chart) {
    const data = window.ACG_DATA;
    const signs = data.ZODIAC_SIGNS;
    const metaEl = document.getElementById('acgSiderealMeta');
    if (metaEl) {
      const tzSign = chart.tzOffset >= 0 ? `+${chart.tzOffset}` : `${chart.tzOffset}`;
      metaEl.textContent = `JD: ${chart.jd.toFixed(4)} • Strefa: ${chart.tzName} (UTC${tzSign}h) • GAST: ${chart.gast.toFixed(2)}° • Nachylenie ε: ${chart.eps.toFixed(4)}°`;
    }
    const order = ['sun', 'moon', 'venus', 'jupiter', 'mercury', 'mars', 'saturn', 'pluto'];
    let rows = '';
    order.forEach(k => {
      const p = chart.planets[k];
      const pm = data.PLANET_META[k];
      const sIdx = Math.floor(p.lon / 30);
      const sDeg = p.lon % 30;
      const degInt = Math.floor(sDeg);
      const minInt = Math.round((sDeg - degInt) * 60);
      rows += `<tr>
        <td style="color:${pm.color}; font-weight:600;">${pm.symbol} ${pm.name}</td>
        <td>${degInt}°${String(minInt).padStart(2, '0')}' ${signs[sIdx]} (${p.lon.toFixed(2)}°)</td>
        <td>${p.ra.toFixed(2)}° (${(p.ra / 15).toFixed(2)}h)</td>
        <td>${p.dec >= 0 ? '+' : ''}${p.dec.toFixed(2)}°</td>
        <td style="color:#E5C384;">${formatLonLat(p.mcLon, 'E', 'W')}</td>
        <td style="color:rgba(250,248,245,0.65);">${formatLonLat(p.icLon, 'E', 'W')}</td>
      </tr>`;
    });

    return `<table class="acg-ephemeris-table">
      <thead>
        <tr>
          <th>Planeta</th>
          <th>Długość Ekliptyczna (λ)</th>
          <th>Rektascensja (α)</th>
          <th>Deklinacja (δ)</th>
          <th>Południk Zenitu (Linia MC)</th>
          <th>Południk Nadiru (Linia IC)</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>` + renderBundlesCallout(chart);
  }

  function renderBundlesCallout(chart) {
    const data = window.ACG_DATA;
    const keys = ['sun', 'moon', 'venus', 'jupiter', 'mercury', 'mars', 'saturn', 'pluto'];
    const bundles = [];
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const p1 = chart.planets[keys[i]];
        const p2 = chart.planets[keys[j]];
        const m1 = data.PLANET_META[keys[i]];
        const m2 = data.PLANET_META[keys[j]];
        const diffMC = Math.abs(norm180(p1.mcLon - p2.mcLon));
        const diffOpp = Math.abs(norm180(p1.mcLon - p2.icLon));
        if (diffMC <= 5.5) {
          bundles.push(`<strong>${m1.symbol} ${m1.name} MC</strong> oraz <strong>${m2.symbol} ${m2.name} MC</strong> (koniunkcja południkowa Δ = ${diffMC.toFixed(1)}° w okolicach południka ${formatLonLat(p1.mcLon, 'E', 'W')})`);
        } else if (diffOpp <= 5.5) {
          bundles.push(`<strong>${m1.symbol} ${m1.name} MC</strong> oraz <strong>${m2.symbol} ${m2.name} IC</strong> (opozycja 180° na osi zenit–nadir, Δ = ${diffOpp.toFixed(1)}° w okolicach południka ${formatLonLat(p1.mcLon, 'E', 'W')})`);
        }
      }
    }
    if (!bundles.length) return '';
    return `<div style="margin-top:0.95rem; padding:0.9rem 1.15rem; background:rgba(201,169,110,0.07); border:1px solid rgba(201,169,110,0.26); border-radius:0.85rem; font-size:0.83rem; line-height:1.65; color:rgba(250,248,245,0.86);">
      <strong style="color:#E5C384;">✦ Dlaczego niektóre Twoje linie biegną blisko siebie przez te same kraje? (Wiązki Aspektów Urodzeniowych):</strong><br>
      W momencie Twoich narodzin wybrane planety tworzyły na niebie ścisłą koniunkcję lub opozycję (180°). W astronomii sferycznej oznacza to, że ich południki górowania (MC) i dołowania (IC) nakładają się na ten sam korytarz geograficzny: ${bundles.join(' • ')}. Nasz algorytm automatycznie oddziela w rankingach czyste linie dobroczynne (Wenus, Jowisz) od korytarzy obciążonych Saturnem lub Plutonem.
    </div>`;
  }

  function renderCityCardHtml(sc, lineObj, categoryLabel, accentColor) {
    const data = window.ACG_DATA;
    const pMeta = data.PLANET_META[lineObj.planet];
    const axName = data.AXIS_NAMES[lineObj.axis];
    const interp = (data.LINE_INTERPRETATIONS[lineObj.planet] && data.LINE_INTERPRETATIONS[lineObj.planet][lineObj.axis]) || '';
    const ascSign = data.ZODIAC_SIGNS[sc.ascSignIdx];
    const mcSign = data.ZODIAC_SIGNS[sc.mcSignIdx];

    return `
      <div class="acg-kicker" style="color:${accentColor};">${categoryLabel}</div>
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.75rem; margin-bottom:0.65rem;">
        <div>
          <h3 class="acg-h3" style="margin-bottom:0.2rem; font-size:1.35rem;">${sc.city.name}</h3>
          <div style="font-size:0.8rem; color:rgba(250,248,245,0.62);">${sc.city.country} • ${formatLonLat(sc.city.lat, 'N', 'S')}, ${formatLonLat(sc.city.lon, 'E', 'W')}</div>
        </div>
        <span style="background:rgba(201,169,110,0.12); border:1px solid ${pMeta.color}; color:${pMeta.color}; font-family:'JetBrains Mono',monospace; font-size:11px; padding:0.3rem 0.65rem; border-radius:99px; white-space:nowrap;">
          ${pMeta.symbol} ${pMeta.name} ${lineObj.axis} (${lineObj.distKm} km)
        </span>
      </div>
      <p style="font-size:0.82rem; color:#E5C384; font-style:italic; margin-bottom:0.65rem;">„${sc.city.vibe}”</p>
      <p style="font-size:0.88rem; line-height:1.65; color:rgba(250,248,245,0.86); margin-bottom:0.85rem;">${interp}</p>
      <div style="padding-top:0.7rem; border-top:1px solid rgba(255,255,255,0.08); font-family:'JetBrains Mono',monospace; font-size:10.5px; color:rgba(250,248,245,0.68); display:flex; flex-wrap:wrap; gap:0.75rem;">
        <span>Relokacyjny ASC: <strong style="color:#FAF8F5;">${ascSign}</strong></span>
        <span>Relokacyjne MC: <strong style="color:#FAF8F5;">${mcSign}</strong></span>
        <span>Oś: <strong style="color:#FAF8F5;">${axName}</strong></span>
      </div>
    `;
  }

  function renderDossierRowHtml(sc, lineObj, rankIdx) {
    const data = window.ACG_DATA;
    const pMeta = data.PLANET_META[lineObj.planet];
    const interp = (data.LINE_INTERPRETATIONS[lineObj.planet] && data.LINE_INTERPRETATIONS[lineObj.planet][lineObj.axis]) || '';
    const ascSign = data.ZODIAC_SIGNS[sc.ascSignIdx];

    return `
      <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(201,169,110,0.2); border-radius:1rem; padding:1.1rem 1.25rem; margin-bottom:0.9rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
          <div style="font-family:'Playfair Display',Georgia,serif; font-size:1.12rem; color:#FAF8F5; font-weight:600;">
            #${rankIdx + 1} ${sc.city.name} <span style="font-size:0.82rem; font-family:'Inter',sans-serif; color:rgba(250,248,245,0.55); font-weight:400;">(${sc.city.country})</span>
          </div>
          <span style="font-family:'JetBrains Mono',monospace; font-size:10.5px; color:${pMeta.color}; border:1px solid ${pMeta.color}; padding:0.2rem 0.55rem; border-radius:99px;">
            ${pMeta.symbol} ${pMeta.name} ${lineObj.axis} • ${lineObj.distKm} km
          </span>
        </div>
        <p style="font-size:0.84rem; line-height:1.6; color:rgba(250,248,245,0.82); margin-bottom:0.45rem;">${interp}</p>
        <div style="font-family:'JetBrains Mono',monospace; font-size:10px; color:rgba(201,169,110,0.88);">
          ✦ Horoskop Relokacyjny w tym mieście: Ascendent przesuwa się w znak <strong>${ascSign}</strong> • Klimat: ${sc.city.vibe}
        </div>
      </div>
    `;
  }

  function renderCityTesterOutput(sc) {
    const data = window.ACG_DATA;
    const p1 = data.PLANET_META[sc.closest.planet];
    const p2 = data.PLANET_META[sc.secondClosest.planet];
    const i1 = (data.LINE_INTERPRETATIONS[sc.closest.planet] && data.LINE_INTERPRETATIONS[sc.closest.planet][sc.closest.axis]) || '';
    const i2 = (data.LINE_INTERPRETATIONS[sc.secondClosest.planet] && data.LINE_INTERPRETATIONS[sc.secondClosest.planet][sc.secondClosest.axis]) || '';
    const ascSign = data.ZODIAC_SIGNS[sc.ascSignIdx];
    const mcSign = data.ZODIAC_SIGNS[sc.mcSignIdx];

    let intensityBadge = 'Wpływ Subtelny (Tło Relokacyjne)';
    let intensityColor = '#94A3B8';
    if (sc.closest.distKm <= 250) {
      intensityBadge = '⚡ Ścisła Strefa Mocy (Zenit / Koniunkcja z Osią)';
      intensityColor = '#34D399';
    } else if (sc.closest.distKm <= 600) {
      intensityBadge = '✦ Silne Pole Magnetyczne Linii';
      intensityColor = '#E5C384';
    }

    return `
      <div class="acg-grid-2" style="margin-bottom:0;">
        <div style="background:rgba(255,255,255,0.025); border:1px solid rgba(201,169,110,0.22); border-radius:1rem; padding:1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.65rem;">
            <span class="acg-kicker" style="margin:0; color:${p1.color};">Główna Linia: ${p1.symbol} ${p1.name} na osi ${sc.closest.axis} (${sc.closest.distKm} km)</span>
            <span style="font-family:'JetBrains Mono',monospace; font-size:10px; color:${intensityColor}; border:1px solid ${intensityColor}; padding:0.18rem 0.55rem; border-radius:99px;">${intensityBadge}</span>
          </div>
          <h4 style="font-family:'Playfair Display',Georgia,serif; font-size:1.3rem; color:#FAF8F5; margin-bottom:0.35rem;">${sc.city.name} (${sc.city.country})</h4>
          <div style="font-family:'JetBrains Mono',monospace; font-size:10.5px; color:rgba(201,169,110,0.82); margin-bottom:0.55rem;">
            Współrzędne: ${formatLonLat(sc.city.lat, 'N', 'S')}, ${formatLonLat(sc.city.lon, 'E', 'W')} • Lokalny Czas Gwiazdowy LST: ${sc.lst.toFixed(1)}°
          </div>
          <p style="font-size:0.88rem; line-height:1.65; color:rgba(250,248,245,0.86); margin-bottom:0.85rem;">${i1}</p>
          <div style="font-size:0.82rem; color:rgba(250,248,245,0.72); border-top:1px solid rgba(255,255,255,0.08); padding-top:0.65rem;">
            <strong>Drugi wektor w tym regionie:</strong> ${p2.symbol} ${p2.name} ${sc.secondClosest.axis} (odległość ortodromiczna: ${sc.secondClosest.distKm} km) — ${i2}
          </div>
        </div>
        <div style="background:rgba(255,255,255,0.025); border:1px solid rgba(201,169,110,0.22); border-radius:1rem; padding:1.25rem; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="acg-kicker">Twój Horoskop Relokacyjny po Lądowaniu</div>
            <h4 style="font-family:'Playfair Display',Georgia,serif; font-size:1.2rem; color:#FAF8F5; margin-bottom:0.6rem;">Nowy Ascendent: ${ascSign} • Nowe MC: ${mcSign}</h4>
            <p style="font-size:0.86rem; line-height:1.65; color:rgba(250,248,245,0.82); margin-bottom:0.9rem;">
              Po przyjeździe do miasta <strong>${sc.city.name}</strong> Twoja lokalna oś horyzontu przesuwa się w znak <strong>${ascSign}</strong>, a szczyt 10. domu (Kariera i Status) trafia w znak <strong>${mcSign}</strong>. Główna planeta tego miejsca (${p1.name}) operuje w Twoim <strong>${sc.relocHouse}. domu relokacyjnym</strong>.
            </p>
          </div>
          <div style="background:rgba(201,169,110,0.08); border:1px solid rgba(201,169,110,0.24); border-radius:0.85rem; padding:0.85rem 1rem; font-size:0.82rem; color:#E5C384;">
            ✦ <strong>Charakter miejsca:</strong> ${sc.city.vibe}
          </div>
        </div>
      </div>
    `;
  }

  function createCityAutocomplete(inputEl, dropdownEl, pool, onSelect) {
    if (!inputEl || !dropdownEl) return;
    const norm = window.ACG_CITIES_DB ? window.ACG_CITIES_DB.normalize : (s => (s || '').toLowerCase());
    let currentMatches = [];
    let activeIdx = -1;

    function renderList(query) {
      const q = norm(query).trim();
      if (!q) {
        currentMatches = pool.slice(0, 45);
      } else {
        const starts = [];
        const contains = [];
        pool.forEach(c => {
          const nName = norm(c.name);
          const nCountry = norm(c.country);
          if (nName.startsWith(q)) starts.push(c);
          else if (nName.includes(q) || nCountry.includes(q)) contains.push(c);
        });
        currentMatches = starts.concat(contains).slice(0, 50);
      }

      activeIdx = currentMatches.length ? 0 : -1;
      if (!currentMatches.length) {
        dropdownEl.innerHTML = `<div class="acg-autocomplete-empty">Nie znaleziono miasta „${query}”. Spróbuj wpisać sąsiednie większe miasto.</div>`;
        dropdownEl.classList.add('is-open');
        return;
      }

      dropdownEl.innerHTML = currentMatches.map((c, idx) => `
        <div class="acg-autocomplete-item ${idx === 0 ? 'is-active' : ''}" data-idx="${idx}" role="option">
          <div>
            <span class="acg-autocomplete-name">${c.name}</span>
            <span class="acg-autocomplete-country">(${c.country})</span>
          </div>
          <span class="acg-autocomplete-coords">${formatLonLat(c.lat, 'N', 'S')}, ${formatLonLat(c.lon, 'E', 'W')}</span>
        </div>
      `).join('');
      dropdownEl.classList.add('is-open');

      dropdownEl.querySelectorAll('.acg-autocomplete-item').forEach(item => {
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          const chosen = currentMatches[Number(item.getAttribute('data-idx'))];
          if (chosen) selectItem(chosen);
        });
      });
    }

    function selectItem(city) {
      inputEl.value = `${city.name} (${city.shortCountry || city.country})`;
      dropdownEl.classList.remove('is-open');
      if (onSelect) onSelect(city);
    }

    inputEl.addEventListener('focus', () => {
      inputEl.select();
      renderList('');
    });

    inputEl.addEventListener('input', () => {
      renderList(inputEl.value);
    });

    inputEl.addEventListener('keydown', (e) => {
      if (!dropdownEl.classList.contains('is-open')) return;
      const items = dropdownEl.querySelectorAll('.acg-autocomplete-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(currentMatches.length - 1, activeIdx + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(0, activeIdx - 1);
      } else if (e.key === 'Enter' && activeIdx >= 0 && currentMatches[activeIdx]) {
        e.preventDefault();
        selectItem(currentMatches[activeIdx]);
        return;
      } else if (e.key === 'Escape') {
        dropdownEl.classList.remove('is-open');
        return;
      }
      items.forEach((el, i) => el.classList.toggle('is-active', i === activeIdx));
      if (items[activeIdx]) items[activeIdx].scrollIntoView({ block: 'nearest' });
    });

    document.addEventListener('mousedown', (e) => {
      if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
        dropdownEl.classList.remove('is-open');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const db = window.ACG_CITIES_DB;
    const data = window.ACG_DATA;
    const allBirthPool = db ? db.allCities : data.BIRTH_CITIES;
    const allRelocPool = db ? db.worldCities.concat(db.plCities) : data.WORLD_CITIES;

    let selectedBirthCity = allBirthPool[0];
    let selectedTesterCity = allRelocPool[0];
    let currentChart = null;
    let currentScored = [];
    let currentFilter = 'all';
    let currentRegion = 'world';

    const birthInput = document.getElementById('acgCityInput');
    const birthDropdown = document.getElementById('acgCityDropdown');
    createCityAutocomplete(birthInput, birthDropdown, allBirthPool, (city) => {
      selectedBirthCity = city;
    });

    const testerInput = document.getElementById('cityTesterInput');
    const testerDropdown = document.getElementById('cityTesterDropdown');
    createCityAutocomplete(testerInput, testerDropdown, allRelocPool, (city) => {
      selectedTesterCity = city;
      if (currentChart) {
        const sc = scoreCityForChart(city, currentChart);
        document.getElementById('cityTesterOutput').innerHTML = renderCityTesterOutput(sc);
      }
    });

    function renderFilterDefinitionBox(chart, filterKey, activeHover) {
      const defBox = document.getElementById('acgFilterDefinitionBox');
      if (!defBox || !chart) return;

      const FILTER_DEFS = {
        all: {
          badge: '✦ KOMPLETNA SIATKA ASTROKARTOGRAFICZNA • 4 OSIE KĄTOWE',
          color: '#E5C384',
          title: 'O co chodzi w tym widoku? Wszystkie Twoje Główne Osie Mocy na Ziemi',
          desc: 'Widzisz rzut swojego nieba urodzeniowego na kulę ziemską. Każda linia łączy miejsca na Ziemi, w których w ułamku sekundy Twoich narodzin dana planeta znajdowała się dokładnie na jednej z 4 osi kardynalnych: górowała w zenicie nad głową (MC), dołowała pod stopami (IC), wschodziła na wschodnim horyzoncie (AC) lub zachodziła na zachodzie (DC).',
          planets: ['venus', 'jupiter', 'sun', 'moon', 'mercury', 'saturn', 'pluto']
        },
        love: {
          badge: '♀ FILTR RELACYJNY • WENUS, KSIĘŻYC I SŁOŃCE',
          color: '#F472B6',
          title: 'O co chodzi w Liniach Miłości i Domu? (Wenus / Księżyc / Słońce)',
          desc: 'Ten widok izoluje planety odpowiadające za uczucia, magnetyzm cielesny, małżeństwo oraz poczucie bezpieczeństwa. Najważniejsza dla miłości jest linia przerywana DC (Descendent – 7. dom partnerstwa: gdzie najłatwiej spotkać miłość życia i gdzie lecieć w podróż poślubną), linia ciągła AC (Ascendent – 1. dom: gdzie budzi się Twój osobisty urok) oraz linia IC (4. dom: gdzie najłatwiej stworzyć spokojny dom).',
          planets: ['venus', 'moon', 'sun']
        },
        wealth: {
          badge: '♃ FILTR EKSPANSJI • JOWISZ, SŁOŃCE, MERKURY I MARS',
          color: '#34D399',
          title: 'O co chodzi w Liniach Pieniędzy i Kariery? (Jowisz / Słońce / Merkury)',
          desc: 'Ten widok pokazuje wektory sukcesu finansowego, awansu, handlu i autorytetu. Kluczowa jest tu pionowa linia ciągła MC (Medium Coeli – szczyt 10. domu kariery i statusu społecznego), na której planeta stoi w samym zenicie, otwierając drzwi do dużych pieniędzy, inwestorów i rozpoznawalności, oraz łukowata linia AC (1. dom rozmachu i inicjatywy).',
          planets: ['jupiter', 'sun', 'mercury', 'mars']
        },
        shadow: {
          badge: '⚠ FILTR STREF CIENIA • SATURN, PLUTON I MARS',
          color: '#FB7185',
          title: 'O co chodzi w Strefach Cienia i Ciężaru? (Saturn / Pluton / Mars)',
          desc: 'Ten widok ujawnia miejsca, w których w chwili Twoich narodzin na osiach kątowych (MC, IC, AC, DC) stały planety tarcia, dyscypliny i gwałtownej transformacji. Na linii Saturna (♄) życie zdejmuje różowe okulary: pojawia się ciężka praca, opóźnienia, chłód emocjonalny i surowe egzaminy dojrzałości. Na linii Plutona (♇) dochodzi do głębokich kryzysów, obsesji i palenia starych mostów, a linia Marsa (♂) przynosi adrenalinę, pośpiech i spory.',
          planets: ['saturn', 'pluto', 'mars']
        }
      };

      const cfg = FILTER_DEFS[filterKey] || FILTER_DEFS.all;
      const pillsHtml = cfg.planets.map(pk => {
        const p = chart.planets[pk];
        const m = data.PLANET_META[pk];
        if (!p || !m) return '';
        const sIdx = Math.floor(p.lon / 30);
        const sDeg = Math.floor(p.lon % 30);
        return `<span style="display:inline-flex; align-items:center; gap:0.35rem; background:rgba(255,255,255,0.04); border:1px solid ${m.color}55; border-radius:99px; padding:0.22rem 0.65rem; font-family:'JetBrains Mono',monospace; font-size:10.5px; color:#FAF8F5;">
          <strong style="color:${m.color};">${m.symbol} ${m.name}</strong> (${sDeg}° ${data.ZODIAC_SIGNS[sIdx]}) • Zenit MC: <strong style="color:#E5C384;">${formatLonLat(p.mcLon, 'E', 'W')}</strong> • Dekl. δ: ${p.dec >= 0 ? '+' : ''}${p.dec.toFixed(1)}°
        </span>`;
      }).join('');

      let hoverFormulaHtml = '';
      if (activeHover && chart.planets[activeHover.planet]) {
        const hp = chart.planets[activeHover.planet];
        const hm = data.PLANET_META[activeHover.planet];
        const ax = activeHover.axis;
        const isMeridian = (ax === 'MC' || ax === 'IC');
        const lonVal = ax === 'MC' ? hp.mcLon : hp.icLon;
        hoverFormulaHtml = `<div style="margin-top:0.75rem; padding:0.65rem 0.9rem; background:rgba(201,169,110,0.11); border-left:3px solid ${hm.color}; border-radius:0.5rem; font-size:0.81rem; color:#FAF8F5;">
          <strong style="color:${hm.color};">🔍 Aktywna linia pod kursorem — ${hm.symbol} ${hm.name} ${ax} (${data.AXIS_NAMES[ax]}):</strong>
          ${isMeridian
            ? `Jest to <strong>pionowy południk geograficzny ${formatLonLat(lonVal, 'E', 'W')}</strong>. Wyznaczono go z równania <code>λ_${ax} = α − GAST${ax === 'IC' ? ' + 180°' : ''}</code>, gdzie Rektascensja ${hm.name} wynosi <strong>α = ${hp.ra.toFixed(2)}°</strong>, a Czas Gwiazdowy Greenwich <strong>GAST = ${chart.gast.toFixed(2)}°</strong>.`
            : `Jest to <strong>łukowata krzywa horyzontu (${ax === 'AC' ? 'wschodu' : 'zachodu'})</strong>. Wyznaczono ją dla każdej szerokości geograficznej φ z równania półłuku dziennego <code>cos H₀ = −tan(φ) · tan(${hp.dec.toFixed(2)}°)</code> wokół południka ${formatLonLat(hp.mcLon, 'E', 'W')}.`}
        </div>`;
      }

      defBox.innerHTML = `
        <div class="acg-grid-2" style="margin-bottom:0.65rem; gap:1.1rem;">
          <div>
            <div style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:${cfg.color}; margin-bottom:0.3rem;">${cfg.badge}</div>
            <h4 style="font-family:'Playfair Display',Georgia,serif; font-size:1.18rem; color:#FAF8F5; margin:0 0 0.45rem 0;">${cfg.title}</h4>
            <p style="font-size:0.83rem; line-height:1.62; color:rgba(250,248,245,0.82); margin:0;">${cfg.desc}</p>
          </div>
          <div style="background:rgba(255,255,255,0.025); border:1px solid rgba(201,169,110,0.2); border-radius:0.85rem; padding:0.85rem 1rem;">
            <div style="font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:#C9A96E; margin-bottom:0.35rem;">⚙ Na jakiej podstawie tworzy się taka linia na mapie?</div>
            <div style="font-size:0.8rem; line-height:1.58; color:rgba(250,248,245,0.82);">
              <div style="margin-bottom:0.35rem;">• <strong>Pionowe linie proste (MC ciągła / IC przerywana):</strong> powstają z różnicy <em>Rektascensji planety (α)</em> i <em>Czasu Gwiazdowego Ziemi (GAST)</em> w minucie Twoich narodzin (<code>λ_MC = α − GAST</code>). Wskazują dokładny południk, nad którym planeta stała pionowo w zenicie (MC) lub pod stopami po drugiej stronie globu (IC).</div>
              <div>• <strong>Ukośne fale i łuki (AC ciągła / DC przerywana):</strong> powstają z <em>Deklinacji planety (δ)</em> i kąta nachylenia lokalnego horyzontu (<code>cos H₀ = −tan φ · tan δ</code>). Łączą wszystkie miejsca na Ziemi, w których planeta dokładnie w tej sekundzie wschodziła nad horyzont (AC) lub zachodziła (DC).</div>
            </div>
          </div>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:0.45rem; padding-top:0.6rem; border-top:1px solid rgba(255,255,255,0.07);">
          ${pillsHtml}
        </div>
        ${hoverFormulaHtml}
      `;
    }

    function refreshMap() {
      if (!currentChart) return;
      renderFilterDefinitionBox(currentChart, currentFilter, null);
      const mapMount = document.getElementById('acgMapMount');
      mapMount.innerHTML = renderWorldMapSVG(currentChart, currentFilter, currentScored, currentRegion);

      const inspector = document.getElementById('acgMapInspector');
      mapMount.querySelectorAll('.acg-map-line').forEach(el => {
        el.addEventListener('mouseenter', () => {
          const pk = el.getAttribute('data-planet');
          const ax = el.getAttribute('data-axis');
          const pm = data.PLANET_META[pk];
          const txt = data.LINE_INTERPRETATIONS[pk]?.[ax] || '';
          renderFilterDefinitionBox(currentChart, currentFilter, { planet: pk, axis: ax });
          if (inspector && pm) {
            inspector.innerHTML = `<strong style="color:${pm.color};">${pm.symbol} Linia ${pm.name} na osi ${ax} (${data.AXIS_NAMES[ax]}):</strong> ${txt}`;
          }
        });
      });

      mapMount.querySelectorAll('.acg-city-pin').forEach(el => {
        el.addEventListener('click', () => {
          const cName = el.getAttribute('data-city');
          const found = currentScored.find(s => s.city.name === cName);
          if (found) {
            selectedTesterCity = found.city;
            if (testerInput) testerInput.value = `${found.city.name} (${found.city.shortCountry || found.city.country})`;
            document.getElementById('cityTesterOutput').innerHTML = renderCityTesterOutput(found);
            if (inspector) {
              const pm = data.PLANET_META[found.closest.planet];
              inspector.innerHTML = `📍 <strong>${cName} (${found.city.country}):</strong> Najbliższa linia to <span style="color:${pm.color}; font-weight:600;">${pm.symbol} ${pm.name} ${found.closest.axis}</span> (${found.closest.distKm} km) • Relokacyjny Ascendent: <strong>${data.ZODIAC_SIGNS[found.ascSignIdx]}</strong>.`;
            }
          }
        });
      });
    }

    function pickDiverseTop5(list, propKey, usedCityNames) {
      const sorted = [...list].sort((a, b) => (b[propKey]?.score || 0) - (a[propKey]?.score || 0));
      const picked = [];
      const lineCounts = {};
      const countryCounts = {};

      for (const item of sorted) {
        if (picked.length >= 5) break;
        const cName = item.city.name;
        if (usedCityNames.has(cName)) continue;
        const lineObj = item[propKey];
        if (!lineObj) continue;
        const lineKey = `${lineObj.planet}_${lineObj.axis}`;
        const countryKey = item.city.shortCountry || item.city.country;

        if ((lineCounts[lineKey] || 0) >= 2) continue;
        if ((countryCounts[countryKey] || 0) >= 1) continue;

        picked.push(item);
        usedCityNames.add(cName);
        lineCounts[lineKey] = (lineCounts[lineKey] || 0) + 1;
        countryCounts[countryKey] = (countryCounts[countryKey] || 0) + 1;
      }
      return picked;
    }

    function runCalculation(dateStr, timeStr) {
      currentChart = computeAllPlanets(dateStr, timeStr, selectedBirthCity);
      const worldPool = db ? db.worldCities : data.WORLD_CITIES;
      currentScored = worldPool.map(c => scoreCityForChart(c, currentChart));

      const usedCities = new Set();
      // Najpierw wyznaczamy czarną listę Saturna/Plutona, aby żadne miasto ze ścisłej strefy cienia nie trafiło do kategorii pozytywnych
      const shadowRanked = pickDiverseTop5(currentScored, 'shadowBest', usedCities);
      const loveRanked = pickDiverseTop5(currentScored, 'loveBest', usedCities);
      const wealthRanked = pickDiverseTop5(currentScored, 'wealthBest', usedCities);
      const homeRanked = pickDiverseTop5(currentScored, 'homeBest', usedCities);

      refreshMap();

      const ephMount = document.getElementById('acgEphemerisMount');
      if (ephMount) ephMount.innerHTML = renderEphemerisTable(currentChart);

      document.getElementById('freeLoveCard').innerHTML = renderCityCardHtml(loveRanked[0], loveRanked[0].loveBest, '♀ Twoje Miasto Miłości Nr 1', '#F472B6');
      document.getElementById('freeWealthCard').innerHTML = renderCityCardHtml(wealthRanked[0], wealthRanked[0].wealthBest, '♃ Twoja Stolica Pieniędzy Nr 1', '#34D399');
      document.getElementById('freeShadowCard').innerHTML = renderCityCardHtml(shadowRanked[0], shadowRanked[0].shadowBest, '⚠ Strefa Ciężaru Nr 1 (Unikaj)', '#FB7185');

      const startTesterCity = loveRanked[1] ? loveRanked[1].city : selectedTesterCity;
      selectedTesterCity = startTesterCity;
      if (testerInput) testerInput.value = `${startTesterCity.name} (${startTesterCity.shortCountry || startTesterCity.country})`;
      document.getElementById('cityTesterOutput').innerHTML = renderCityTesterOutput(scoreCityForChart(startTesterCity, currentChart));

      document.getElementById('dossierLoveList').innerHTML = loveRanked.slice(0, 5).map((sc, i) => renderDossierRowHtml(sc, sc.loveBest, i)).join('');
      document.getElementById('dossierWealthList').innerHTML = wealthRanked.slice(0, 5).map((sc, i) => renderDossierRowHtml(sc, sc.wealthBest, i)).join('');
      document.getElementById('dossierHomeList').innerHTML = homeRanked.slice(0, 5).map((sc, i) => renderDossierRowHtml(sc, sc.homeBest, i)).join('');
      document.getElementById('dossierShadowList').innerHTML = shadowRanked.slice(0, 5).map((sc, i) => renderDossierRowHtml(sc, sc.shadowBest, i)).join('');

      document.getElementById('dossierRemoteActivation').innerHTML = `
        <div class="acg-grid-2" style="margin-bottom:0;">
          <div style="background:rgba(244,114,182,0.06); border:1px solid rgba(244,114,182,0.28); border-radius:1rem; padding:1.25rem;">
            <div class="acg-kicker" style="color:#F472B6;">Zdalna Aktywacja Linii Wenus (${loveRanked[0].city.name})</div>
            <p style="font-size:0.86rem; line-height:1.65; color:rgba(250,248,245,0.85); margin:0;">
              Twoja najsilniejsza linia magnetyzmu przebiega przez <strong>${loveRanked[0].city.name} (${loveRanked[0].city.country})</strong>. Otocz się estetyką, muzyką, perfumami lub kuchnią tego regionu w swojej sypialni i na randkach — w astrokartografii rezonans kulturowy miejsca uruchamia tę samą oś 7. domu bez pakowania walizek.
            </p>
          </div>
          <div style="background:rgba(52,211,153,0.06); border:1px solid rgba(52,211,153,0.28); border-radius:1rem; padding:1.25rem;">
            <div class="acg-kicker" style="color:#34D399;">Zdalna Aktywacja Linii Jowisza (${wealthRanked[0].city.name})</div>
            <p style="font-size:0.86rem; line-height:1.65; color:rgba(250,248,245,0.85); margin:0;">
              Twój wektor ekspansji finansowej kulminuje w pobliżu miasta <strong>${wealthRanked[0].city.name} (${wealthRanked[0].city.country})</strong>. Szukaj klientów, pracodawców, rynków zbytu lub partnerów biznesowych powiązanych z tym krajem — kontrakty z tego kierunku geograficznego idą najłatwiej.
            </p>
          </div>
        </div>
      `;

      const resSec = document.getElementById('acgResultsSection');
      resSec.classList.add('is-visible');
      resSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    document.querySelectorAll('.acg-pill-btn[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.acg-pill-btn[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        refreshMap();
      });
    });

    document.querySelectorAll('.acg-pill-btn[data-region]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.acg-pill-btn[data-region]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentRegion = btn.getAttribute('data-region');
        refreshMap();
      });
    });

    const form = document.getElementById('acgForm');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const dateEl = document.getElementById('acgDate');
      const timeEl = document.getElementById('acgTime');
      const d = dateEl ? dateEl.value : '';
      const t = (timeEl && timeEl.value) ? timeEl.value : '12:00';
      if (!d) {
        if (dateEl) {
          dateEl.focus();
          dateEl.style.boxShadow = '0 0 0 3px rgba(251, 113, 133, 0.45)';
          setTimeout(() => { dateEl.style.boxShadow = ''; }, 2500);
        }
        return;
      }
      if (birthInput && birthInput.value.trim() && db) {
        const q = db.normalize(birthInput.value.split('(')[0].trim());
        const exact = allBirthPool.find(c => db.normalize(c.name) === q || db.normalize(c.name).startsWith(q));
        if (exact) selectedBirthCity = exact;
      }
      if (!selectedBirthCity) selectedBirthCity = allBirthPool[0];
      try {
        runCalculation(d, t);
      } catch (err) {
        console.error('Błąd obliczeń astrokartografii:', err);
      }
    });

    const paywallWrap = document.getElementById('acgPaywallWrap');
    const modal = document.getElementById('acgStripeModal');
    const unlockBtn = document.getElementById('acgUnlockBtn');
    const closeBtn = document.getElementById('acgModalClose');
    const bypassBtn = document.getElementById('acgLocalBypassBtn');

    function unlockAtlas() {
      paywallWrap.classList.add('is-unlocked');
      modal.classList.remove('is-active');
      localStorage.setItem('neo_acg_unlocked', '1');
    }

    if (localStorage.getItem('neo_acg_unlocked') === '1' || new URLSearchParams(window.location.search).get('unlocked') === 'true') {
      paywallWrap.classList.add('is-unlocked');
    }
    if (unlockBtn) unlockBtn.addEventListener('click', () => {
      if (typeof window.openLuxeCheckout === 'function') {
        window.openLuxeCheckout('astrokartografia', unlockAtlas);
      } else if (modal) {
        modal.classList.add('is-active');
      }
    });
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('is-active'));
    if (bypassBtn) bypassBtn.addEventListener('click', unlockAtlas);
  });
})();
