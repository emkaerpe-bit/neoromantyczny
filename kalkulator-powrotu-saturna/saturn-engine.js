/**
 * NEOROMANTYCZNY — SATURN RETURN LOGIC & TRANSIT FINDER ENGINE
 * Precyzyjne wyznaczanie pętli retrogradacji i aspektów
 */
(function () {
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

  function getSignFromLon(lon) {
    const idx = Math.floor(lon / 30) % 12;
    const deg = Math.floor(lon % 30);
    const min = Math.floor((lon % 1) * 60);
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

  function getDignityKey(signKey) {
    if (signKey === 'Capricorn' || signKey === 'Aquarius') return 'domicile';
    if (signKey === 'Libra') return 'exaltation';
    if (signKey === 'Aries') return 'fall';
    if (signKey === 'Cancer' || signKey === 'Leo') return 'detriment';
    return 'peregrine';
  }

  function getAngularDiff(a, b) {
    let diff = Math.abs(a - b) % 360;
    return diff > 180 ? 360 - diff : diff;
  }

  function findAspects(saturnLon, planets) {
    const aspects = [];
    const ASPECT_TYPES = [
      { name: 'Koniunkcja', angle: 0, orb: 7, type: 'hard' },
      { name: 'Opozycja', angle: 180, orb: 7, type: 'hard' },
      { name: 'Kwadratura', angle: 90, orb: 6.5, type: 'hard' },
      { name: 'Trygon', angle: 120, orb: 6.5, type: 'soft' },
      { name: 'Sekstyl', angle: 60, orb: 5, type: 'soft' }
    ];

    Object.keys(planets).forEach(k => {
      if (k === 'saturn') return;
      const pLon = planets[k];
      const diff = getAngularDiff(saturnLon, pLon);

      for (let a of ASPECT_TYPES) {
        if (Math.abs(diff - a.angle) <= a.orb) {
          aspects.push({
            planet: k,
            aspectName: a.name,
            aspectType: a.type,
            angle: a.angle,
            exactOrb: (diff - a.angle).toFixed(2),
            planetLon: pLon
          });
          break;
        }
      }
    });
    return aspects;
  }

  function findSaturnReturns(birthDate, natalLon, cycleNum = 1) {
    const cycleYears = cycleNum === 2 ? 58.9 : 29.45;
    const centerTime = birthDate.getTime() + cycleYears * 365.25 * 86400000;
    const windowDays = 480; // +/- 240 days around center
    const startTime = centerTime - windowDays * 86400000;
    const endTime = centerTime + windowDays * 86400000;

    let hits = [];
    const stepDays = 2.5;

    function distSigned(lon, target) {
      let d = (lon - target) % 360;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      return d;
    }

    let prevT = startTime;
    let prevJd = window.SaturnMath.getJdFromDate(new Date(prevT));
    let prevDiff = distSigned(window.SaturnMath.calcSaturnGeocentricLon(prevJd), natalLon);

    for (let t = startTime + stepDays * 86400000; t <= endTime; t += stepDays * 86400000) {
      const curJd = window.SaturnMath.getJdFromDate(new Date(t));
      const curDiff = distSigned(window.SaturnMath.calcSaturnGeocentricLon(curJd), natalLon);

      if ((prevDiff < 0 && curDiff >= 0) || (prevDiff > 0 && curDiff <= 0)) {
        // Bisection
        let left = prevT, right = t;
        for (let iter = 0; iter < 12; iter++) {
          const mid = (left + right) / 2;
          const midJd = window.SaturnMath.getJdFromDate(new Date(mid));
          const midDiff = distSigned(window.SaturnMath.calcSaturnGeocentricLon(midJd), natalLon);
          if (midDiff * prevDiff <= 0) {
            right = mid;
          } else {
            left = mid;
          }
        }
        const hitDate = new Date((left + right) / 2);
        // Sprawdź czy retro czy direct w chwili przejścia
        const hitJd = window.SaturnMath.getJdFromDate(hitDate);
        const lon1 = window.SaturnMath.calcSaturnGeocentricLon(hitJd);
        const lon2 = window.SaturnMath.calcSaturnGeocentricLon(hitJd + 0.1);
        const isRetro = ((lon2 - lon1 + 360) % 360) > 180;

        hits.push({
          date: hitDate,
          isRetro,
          type: isRetro ? 'Retrogradacja (Fala 2)' : (hits.length === 0 ? 'Pierwsze Wejście (Fala 1)' : 'Ostateczne Domknięcie (Fala 3)')
        });
      }
      prevT = t;
      prevDiff = curDiff;
    }

    return hits;
  }

  window.SaturnEngine = {
    SIGNS,
    getSignFromLon,
    getDignityKey,
    getAngularDiff,
    findAspects,
    findSaturnReturns
  };
})();
