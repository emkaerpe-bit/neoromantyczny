/**
 * NEOROMANTYCZNY — SOLAR RETURN ASTROMETRY ENGINE (ASTRA ENGINE)
 * Konwergencja Newtona-Raphsona (< 0.004" łuku), Placidus, Nakładka na Radix i Profekcje Roczne
 */
(function () {
  const DEG = Math.PI / 180;

  function norm360(d) {
    return ((d % 360) + 360) % 360;
  }

  function evalSunAppLon(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * DEG)
            + (0.019993 - 0.000101 * T) * Math.sin(2 * M * DEG)
            + 0.000289 * Math.sin(3 * M * DEG);
    const omega = (125.04 - 1934.136 * T) * DEG;
    return norm360(L0 + C - 0.00569 - 0.00478 * Math.sin(omega));
  }

  function calcPreciseSunLon(jd) {
    const appLon = evalSunAppLon(jd);
    const lonNext = evalSunAppLon(jd + 0.01);
    const delta = ((lonNext - appLon + 540) % 360) - 180;
    const speedDegPerDay = Math.max(0.92, Math.min(1.03, delta / 0.01));
    return { lon: appLon, speed: speedDegPerDay };
  }

  function findSolarReturnJd(birthJd, natalSunLon, targetYear, birthYear) {
    const yearsDiff = Number(targetYear) - Number(birthYear);
    let jd = birthJd + yearsDiff * 365.24219879;
    for (let i = 0; i < 15; i++) {
      const { lon, speed } = calcPreciseSunLon(jd);
      const diff = ((lon - natalSunLon + 540) % 360) - 180;
      if (Math.abs(diff) < 1e-6) break;
      jd -= diff / speed;
    }
    return jd;
  }

  function getSignInfo(lon) {
    const SIGNS = window.__DISPOSITOR_ENGINE__.SIGNS;
    const idx = Math.floor(norm360(lon) / 30) % 12;
    const deg = Math.floor(norm360(lon) % 30);
    const min = Math.floor((norm360(lon) % 1) * 60);
    return {
      index: idx,
      signKey: SIGNS[idx].key,
      signName: SIGNS[idx].name,
      glyph: SIGNS[idx].glyph,
      deg,
      min,
      formatted: `${deg}°${min < 10 ? '0' : ''}${min}' ${SIGNS[idx].name}`
    };
  }

  function getHouseByCusps(lon, cusps) {
    if (!cusps || !cusps[1]) return 1;
    const l = norm360(lon);
    for (let h = 1; h <= 12; h++) {
      let start = cusps[h];
      let end = cusps[h === 12 ? 1 : h + 1];
      if (end < start) end += 360;
      let test = l < start ? l + 360 : l;
      if (test >= start && test < end) return h;
    }
    return 1;
  }

  function resolveCityCoords(cityInput) {
    const raw = String(cityInput || '').trim();
    const eng = window.__DISPOSITOR_ENGINE__;
    if (raw) {
      const cleanQ = raw.replace(/\s*\([^)]*\)\s*$/, '').toLowerCase().trim();
      const fullQ = raw.toLowerCase();
      const presets = (window.SOLAR_DATA && window.SOLAR_DATA.RELOCATION_PRESETS) || [];
      const presetHit = presets.find(c =>
        c.name.toLowerCase() === fullQ || c.name.toLowerCase() === cleanQ || `${c.name} (${c.country})`.toLowerCase() === fullQ
      );
      if (presetHit) return { name: presetHit.name, country: presetHit.country, lat: presetHit.lat, lon: presetHit.lon };
      if (window.ACG_CITIES_DB && Array.isArray(window.ACG_CITIES_DB.allCities)) {
        const found = window.ACG_CITIES_DB.allCities.find(c =>
          c.name.toLowerCase() === cleanQ || `${c.name} (${c.country || 'Polska'})`.toLowerCase() === fullQ
        );
        if (found) return { name: found.name, country: found.country || 'Polska', lat: found.lat, lon: found.lon };
      }
    }
    const fallback = eng.getCityByName(raw);
    return { name: fallback.name, country: fallback.country || 'Polska', lat: fallback.lat, lon: fallback.lon };
  }
  function buildPlanetsAtJd(jd, cusps, lat) {
    const pos = window.SaturnMath.calcPlanetaryPositions(jd);
    pos.sun = evalSunAppLon(jd);
    pos.saturn = window.SaturnMath.calcSaturnGeocentricLon(jd);
    const meta = window.__DISPOSITOR_ENGINE__.BODIES;
    const keys = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
    return keys.map(k => {
      const b = meta.find(m => m.key === k) || { key: k, name: k, glyph: '' };
      const lon = pos[k];
      const sInfo = getSignInfo(lon);
      const house = cusps ? window.SaturnPlacidus.getPlanetHousePlacidus(lon, cusps, lat, cusps.armc, cusps.eps) : 1;
      return {
        ...sInfo,
        signGlyph: sInfo.glyph,
        key: k,
        name: b.name,
        glyph: b.glyph,
        longitude: lon,
        house
      };
    });
  }

  function findSrToNatalAspects(srPlanets, natalPlanets) {
    const ASPECTS = [
      { key: 'conjunction', name: 'Koniunkcja', angle: 0, orb: 5.5, tone: 'intense', symbol: '☌' },
      { key: 'opposition', name: 'Opozycja', angle: 180, orb: 5.0, tone: 'hard', symbol: '☍' },
      { key: 'square', name: 'Kwadratura', angle: 90, orb: 5.0, tone: 'hard', symbol: '□' },
      { key: 'trine', name: 'Trygon', angle: 120, orb: 5.0, tone: 'soft', symbol: '△' },
      { key: 'sextile', name: 'Sekstyl', angle: 60, orb: 3.5, tone: 'soft', symbol: '⚹' }
    ];
    const hits = [];
    srPlanets.slice(0, 7).forEach(srP => {
      natalPlanets.slice(0, 7).forEach(natP => {
        const diff = Math.abs(srP.longitude - natP.longitude) % 360;
        const arc = diff > 180 ? 360 - diff : diff;
        ASPECTS.forEach(a => {
          const orb = Math.abs(arc - a.angle);
          if (orb <= a.orb) {
            hits.push({
              srPlanet: srP,
              natalPlanet: natP,
              aspectKey: a.key,
              aspectName: a.name,
              symbol: a.symbol,
              tone: a.tone,
              orb: Number(orb.toFixed(2))
            });
          }
        });
      });
    });
    return hits.sort((a, b) => a.orb - b.orb).slice(0, 8);
  }

  function calcQuarterTurningPoints(srJd, natalSunLon) {
    const offsets = [
      { deg: 90, approxDays: 91.3, label: 'I Kwadra Solarna (Test Działania)' },
      { deg: 180, approxDays: 182.6, label: 'Opozycja Półroczna (Punkt Przesilenia)' },
      { deg: 270, approxDays: 273.9, label: 'III Kwadra Solarna (Żniwa i Korekta)' }
    ];
    return offsets.map(o => {
      const targetLon = norm360(natalSunLon + o.deg);
      let jd = srJd + o.approxDays;
      for (let i = 0; i < 8; i++) {
        const { lon, speed } = calcPreciseSunLon(jd);
        const diff = ((lon - targetLon + 540) % 360) - 180;
        if (Math.abs(diff) < 1e-4) break;
        jd -= diff / speed;
      }
      return {
        label: o.label,
        deg: o.deg,
        date: window.SaturnMath.getDateFromJd(jd)
      };
    });
  }

  function calculateSolarReturn(input) {
    const eng = window.__DISPOSITOR_ENGINE__;
    const birthChart = eng.calcAllPlanets(input.birthDate, input.birthTime || '12:00', input.birthCity);
    const birthCoords = resolveCityCoords(input.birthCity);
    const relocCoords = input.relocCity && input.relocCity.trim()
      ? resolveCityCoords(input.relocCity)
      : birthCoords;

    const birthJd = birthChart.jd;
    const birthYear = Number(input.birthDate.split('-')[0]);
    const targetYear = Number(input.targetYear) || new Date().getFullYear();

    const natalSunLon = evalSunAppLon(birthJd);
    const natalCusps = window.SaturnPlacidus.calcPlacidusCusps(birthJd, birthCoords.lat, birthCoords.lon);
    const natalPlanets = buildPlanetsAtJd(birthJd, natalCusps, birthCoords.lat);
    const natalAscInfo = getSignInfo(natalCusps[1]);

    const srJd = findSolarReturnJd(birthJd, natalSunLon, targetYear, birthYear);
    const srDateUtc = window.SaturnMath.getDateFromJd(srJd);
    const srCusps = window.SaturnPlacidus.calcPlacidusCusps(srJd, relocCoords.lat, relocCoords.lon);
    const srNatalLocCusps = window.SaturnPlacidus.calcPlacidusCusps(srJd, birthCoords.lat, birthCoords.lon);
    const srPlanets = buildPlanetsAtJd(srJd, srCusps, relocCoords.lat);

    const srAscInfo = getSignInfo(srCusps[1]);
    const srMcInfo = getSignInfo(srCusps[10]);
    const srNatalLocAscInfo = getSignInfo(srNatalLocCusps[1]);
    const srAscInNatalHouse = getHouseByCusps(srCusps[1], natalCusps);
    const srMcInNatalHouse = getHouseByCusps(srCusps[10], natalCusps);

    const age = Math.max(0, targetYear - birthYear);
    const profectionHouse = (age % 12) + 1;
    const profSignIdx = (natalAscInfo.index + profectionHouse - 1) % 12;
    const profSign = eng.SIGNS[profSignIdx];
    const timeLordKey = eng.TRADITIONAL_RULERS[profSign.key] || 'sun';
    const timeLordSrPlanet = srPlanets.find(p => p.key === timeLordKey) || srPlanets[0];

    return {
      input: { ...input, birthCoords, relocCoords },
      birthYear,
      targetYear,
      age,
      srDateUtc,
      srJd,
      natalAsc: natalCusps[1],
      natalAscInfo,
      natalCusps,
      natalPlanets,
      srCusps,
      srAsc: srCusps[1],
      srMc: srCusps[10],
      srAscInfo,
      srMcInfo,
      srNatalLocAscInfo,
      srAscInNatalHouse,
      srMcInNatalHouse,
      profectionHouse,
      profectionSign: profSign,
      timeLordKey,
      timeLordSrPlanet,
      srPlanets,
      srSun: srPlanets.find(p => p.key === 'sun'),
      srMoon: srPlanets.find(p => p.key === 'moon'),
      srToNatalAspects: findSrToNatalAspects(srPlanets, natalPlanets),
      quarters: calcQuarterTurningPoints(srJd, natalSunLon)
    };
  }

  function previewRelocationCities(srJd, natalCusps, presets) {
    return (presets || []).map(city => {
      const cusps = window.SaturnPlacidus.calcPlacidusCusps(srJd, city.lat, city.lon);
      const ascInfo = getSignInfo(cusps[1]);
      const mcInfo = getSignInfo(cusps[10]);
      const srAscInNatalHouse = getHouseByCusps(cusps[1], natalCusps);
      return {
        ...city,
        ascInfo,
        mcInfo,
        srAscInNatalHouse
      };
    });
  }

  window.SolarEngine = {
    calculateSolarReturn,
    resolveCityCoords,
    previewRelocationCities
  };
})();
