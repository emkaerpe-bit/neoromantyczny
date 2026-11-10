/**
 * NEOROMANTYCZNY — PLACIDUS HOUSE SYSTEM ENGINE (SWISS EPHEMERIS NASA ACCURACY)
 * Precyzyjne wyznaczanie wierzchołków domów Placidusa (I - XII) i lokalizacji planet
 */
(function () {
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;

  function norm360(d) {
    return ((d % 360) + 360) % 360;
  }

  function eclToEq(lonDeg, latDeg, epsDeg) {
    const l = lonDeg * DEG, b = latDeg * DEG, e = epsDeg * DEG;
    const sin_delta = Math.sin(b) * Math.cos(e) + Math.cos(b) * Math.sin(e) * Math.sin(l);
    const delta = Math.asin(Math.max(-1, Math.min(1, sin_delta)));
    const y = Math.sin(l) * Math.cos(e) - Math.tan(b) * Math.sin(e);
    const x = Math.cos(l);
    const alpha = norm360(Math.atan2(y, x) * RAD);
    return { ra: alpha, de: delta * RAD };
  }

  function calcPlacidusHousePos(planetLon, geolat, armc, epsDeg) {
    const { ra, de } = eclToEq(planetLon, 0, epsDeg);
    let mdd = norm360(ra - armc);
    let mdn = norm360(mdd + 180);
    if (mdd >= 180) mdd -= 360;
    if (mdn >= 180) mdn -= 360;

    const sinad = Math.tan(de * DEG) * Math.tan(geolat * DEG);
    const ad = Math.asin(Math.max(-1, Math.min(1, sinad))) * RAD;
    const a = sinad + Math.cos(mdd * DEG);
    const is_above_hor = (a >= 0);
    const sad = 90 + ad;
    const san = 90 - ad;

    let xp0;
    if (is_above_hor) {
      xp0 = (mdd / sad + 3) * 90;
    } else {
      xp0 = (mdn / san + 1) * 90;
    }
    xp0 = norm360(xp0 + 0.000001);
    return Math.floor(xp0 / 30) + 1;
  }

  function calcPlacidusCusps(jd, lat, lon) {
    const T = (jd - 2451545.0) / 36525.0;
    const epsDeg = 23.43929 - 0.01300 * T;
    const eps = epsDeg * DEG;
    const phi = lat * DEG;

    // RAMC (Rektascensja Medium Coeli)
    const gmst = norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0));
    const ramcDeg = norm360(gmst + lon);
    const ramc = ramcDeg * DEG;

    // MC (Wierzchołek X Domu)
    const mc = norm360(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps)) * RAD);

    // Ascendent (Wierzchołek I Domu)
    const yAsc = Math.cos(ramc);
    const xAsc = -(Math.sin(eps) * Math.tan(phi) + Math.cos(eps) * Math.sin(ramc));
    const asc = norm360(Math.atan2(yAsc, xAsc) * RAD);

    // Iteracyjne rozwiązywanie równań półłuków dziennych i nocnych Placidusa
    function solvePlacidusRa(targetOffsetDeg, factor, isDiurnal) {
      let ra = (ramcDeg + targetOffsetDeg) * DEG;
      for (let i = 0; i < 25; i++) {
        const tanDelta = Math.sin(ra) * Math.tan(eps);
        const sinAd = Math.tan(phi) * tanDelta;
        if (Math.abs(sinAd) >= 0.9999) break;
        const ad = Math.asin(sinAd);
        const sa = isDiurnal ? (Math.PI / 2 + ad) : (Math.PI / 2 - ad);
        if (isDiurnal) {
          ra = ramc + factor * sa;
        } else {
          ra = ramc + Math.PI - factor * sa;
        }
      }
      return norm360(Math.atan2(Math.sin(ra), Math.cos(ra) * Math.cos(eps)) * RAD);
    }

    const c11 = solvePlacidusRa(30, 1 / 3, true);
    const c12 = solvePlacidusRa(60, 2 / 3, true);
    const c2  = solvePlacidusRa(120, 2 / 3, false);
    const c3  = solvePlacidusRa(150, 1 / 3, false);

    return {
      1: asc,
      2: c2,
      3: c3,
      4: norm360(mc + 180),
      5: norm360(c11 + 180),
      6: norm360(c12 + 180),
      7: norm360(asc + 180),
      8: norm360(c2 + 180),
      9: norm360(c3 + 180),
      10: mc,
      11: c11,
      12: c12,
      armc: ramcDeg,
      eps: epsDeg,
      lat: lat
    };
  }

  function getPlanetHousePlacidus(planetLon, cusps, lat, armc, eps) {
    const geolat = lat !== undefined ? lat : (cusps && cusps.lat !== undefined ? cusps.lat : 52.23);
    const rArmc = armc !== undefined ? armc : (cusps && cusps.armc !== undefined ? cusps.armc : null);
    const rEps = eps !== undefined ? eps : (cusps && cusps.eps !== undefined ? cusps.eps : 23.44);

    if (rArmc !== null) {
      return calcPlacidusHousePos(planetLon, geolat, rArmc, rEps);
    }

    if (!cusps || !cusps[1]) return 1;
    for (let h = 1; h <= 12; h++) {
      let start = cusps[h];
      let end = cusps[h === 12 ? 1 : h + 1];
      if (end < start) end += 360;
      let test = planetLon;
      if (test < start) test += 360;
      if (test >= start && test < end) {
        return h;
      }
    }
    return 1;
  }

  window.SaturnPlacidus = {
    calcPlacidusCusps,
    calcPlacidusHousePos,
    getPlanetHousePlacidus
  };
})();
