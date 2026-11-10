/**
 * NEOROMANTYCZNY — SATURN MATHEMATICAL EPHEMERIS CORE
 * Algorytmy Meeus / Keplerian Orbits dla Ziemi i Saturna
 */
(function () {
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;

  function norm360(d) {
    return ((d % 360) + 360) % 360;
  }

  function solveKepler(M_deg, e) {
    let Mk = norm360(M_deg) * DEG;
    let E = Mk;
    for (let i = 0; i < 7; i++) {
      E = E - (E - e * Math.sin(E) - Mk) / (1 - e * Math.cos(E));
    }
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

  function getJdFromDate(dateObj) {
    return dateObj.getTime() / 86400000 + 2440587.5;
  }

  function getDateFromJd(jd) {
    return new Date((jd - 2440587.5) * 86400000);
  }

  function calcSaturnGeocentricLon(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    const earthH = helioXY(
      1.00000261 + 0.00000562 * T,
      0.01671123 - 0.00004392 * T,
      -0.00001531 - 0.01294668 * T,
      100.46457166 + 35999.37244981 * T,
      102.93768193 + 0.32327364 * T,
      0.0
    );
    const satH = helioXY(
      9.53667594 - 0.00125060 * T,
      0.05386179 - 0.00050991 * T,
      2.48599187 + 0.00193609 * T,
      49.95424423 + 1222.49362201 * T,
      92.59887831 - 0.41897216 * T,
      113.66242448 - 0.28867794 * T
    );
    return norm360(Math.atan2(satH.y - earthH.y, satH.x - earthH.x) * RAD);
  }

  function calcPlanetaryPositions(jd) {
    const T = (jd - 2451545.0) / 36525.0;
    const L0 = norm360(280.46646 + 36000.76983 * T);
    const M = norm360(357.52911 + 35999.05029 * T);
    const C = (1.914602 - 0.004817 * T) * Math.sin(M * DEG) + 0.019993 * Math.sin(2 * M * DEG);
    const sunLon = norm360(L0 + C);

    const Lp = norm360(218.31645 + 481267.88123 * T);
    const D = norm360(297.85019 + 445267.11140 * T);
    const Mp = norm360(134.96340 + 477198.86751 * T);
    const F = norm360(93.27210 + 483202.01752 * T);
    const moonLon = norm360(Lp + 6.289 * Math.sin(Mp * DEG) - 1.274 * Math.sin((Mp - 2*D) * DEG) + 0.658 * Math.sin(2*D * DEG) - 0.186 * Math.sin(M * DEG) - 0.114 * Math.sin(2*F * DEG));

    const earthH = helioXY(1.00000261 + 0.00000562 * T, 0.01671123 - 0.00004392 * T, -0.00001531 - 0.01294668 * T, 100.46457166 + 35999.37244981 * T, 102.93768193 + 0.32327364 * T, 0.0);
    const mercH  = helioXY(0.38709927 + 0.00000037 * T, 0.20563593 + 0.00001906 * T, 7.00497902 - 0.00594749 * T, 252.25032350 + 149472.67411175 * T, 77.45779628 + 0.16047689 * T, 48.33076593 - 0.12534081 * T);
    const venusH = helioXY(0.72333566 + 0.00000390 * T, 0.00677672 - 0.00004107 * T, 3.39467605 - 0.00078890 * T, 181.97909950 + 58517.81538729 * T, 131.60246718 + 0.00268329 * T, 76.67984255 - 0.27769418 * T);
    const marsH  = helioXY(1.52371034 + 0.00001847 * T, 0.09339410 + 0.00007882 * T, 1.84969142 - 0.00813131 * T, -4.55343205 + 19140.30268499 * T, -23.94362959 + 0.44441088 * T, 49.55953891 - 0.29257343 * T);
    const jupH   = helioXY(5.20288700 - 0.00011607 * T, 0.04838624 - 0.00013253 * T, 1.30439695 - 0.00183714 * T, 34.39644051 + 3034.74612775 * T, 14.72847983 + 0.21252668 * T, 100.47390909 + 0.20469106 * T);
    const satH   = helioXY(9.53667594 - 0.00125060 * T, 0.05386179 - 0.00050991 * T, 2.48599187 + 0.00193609 * T, 49.95424423 + 1222.49362201 * T, 92.59887831 - 0.41897216 * T, 113.66242448 - 0.28867794 * T);
    const uranH  = helioXY(19.18916464 - 0.00203876 * T, 0.04725744 - 0.00004397 * T, 0.77263783 - 0.00055246 * T, 313.23810451 + 428.46788481 * T, 170.95427630 + 0.40805281 * T, 74.01692503 + 0.04240589 * T);
    const nepH   = helioXY(30.06992276 + 0.00026291 * T, 0.00860619 + 0.00002132 * T, 1.77004347 - 0.00025547 * T, -55.12002969 + 218.48620020 * T, 44.96476227 - 0.32241464 * T, 131.78422574 - 0.00593206 * T);
    const plutoH = helioXY(39.48211675 - 0.00031596 * T, 0.24882730 + 0.00005170 * T, 17.14001206 + 0.00004818 * T, 238.92903833 + 145.20780515 * T, 224.06891629 - 0.04062942 * T, 110.30393684 - 0.01183482 * T);

    return {
      sun: sunLon,
      moon: moonLon,
      mercury: norm360(Math.atan2(mercH.y - earthH.y, mercH.x - earthH.x) * RAD),
      venus:   norm360(Math.atan2(venusH.y - earthH.y, venusH.x - earthH.x) * RAD),
      mars:    norm360(Math.atan2(marsH.y - earthH.y, marsH.x - earthH.x) * RAD),
      jupiter: norm360(Math.atan2(jupH.y - earthH.y, jupH.x - earthH.x) * RAD),
      saturn:  norm360(Math.atan2(satH.y - earthH.y, satH.x - earthH.x) * RAD),
      uranus:  norm360(Math.atan2(uranH.y - earthH.y, uranH.x - earthH.x) * RAD),
      neptune: norm360(Math.atan2(nepH.y - earthH.y, nepH.x - earthH.x) * RAD),
      pluto:   norm360(Math.atan2(plutoH.y - earthH.y, plutoH.x - earthH.x) * RAD)
    };
  }

  window.SaturnMath = {
    norm360,
    getJdFromDate,
    getDateFromJd,
    calcSaturnGeocentricLon,
    calcPlanetaryPositions
  };
})();
