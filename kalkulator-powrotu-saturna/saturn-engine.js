/**
 * NEOROMANTYCZNY — SATURN RETURN LOGIC & TRANSIT FINDER ENGINE
 * Precyzyjne wyznaczanie pętli retrogradacji i aspektów
 */
(function () {
  const SIGNS = [
    { key: 'Aries', name: 'Baran', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><path d="M 8.5 13.5 C 7.5 8.5, 14 7.5, 16 14.5 L 16 25 M 23.5 13.5 C 24.5 8.5, 18 7.5, 16 14.5"/></svg>' },
    { key: 'Taurus', name: 'Byk', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><circle cx="16" cy="19" r="5.2"/><path d="M 8.5 9.5 C 10.5 14, 21.5 14, 23.5 9.5"/></svg>' },
    { key: 'Gemini', name: 'Bliźnięta', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><path d="M 8.5 9 C 12.5 11.2, 19.5 11.2, 23.5 9 M 8.5 23 C 12.5 20.8, 19.5 20.8, 23.5 23 M 12.8 10.3 L 12.8 21.7 M 19.2 10.3 L 19.2 21.7"/></svg>' },
    { key: 'Cancer', name: 'Rak', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><circle cx="10.2" cy="13.5" r="3.2"/><circle cx="21.8" cy="18.5" r="3.2"/><path d="M 7.5 11.7 C 11 7.6, 19.5 7.6, 25 11 M 24.5 20.3 C 21 24.4, 12.5 24.4, 7 21"/></svg>' },
    { key: 'Leo', name: 'Lew', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><circle cx="10.5" cy="18.5" r="3"/><path d="M 12.8 16.2 C 11.5 9.5, 19.5 7.5, 20.5 13.5 C 21.2 17.5, 18.5 22, 22 22.5 C 23.5 22.7, 24.5 21.5, 24.5 20.2"/></svg>' },
    { key: 'Virgo', name: 'Panna', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><path d="M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20.5 C 18.4 23.5, 21 24.5, 23 23 M 18.4 15 C 21.5 12.5, 24.5 14.5, 22.5 18.5 C 21 21, 17.5 22.5, 15.8 24"/></svg>' },
    { key: 'Libra', name: 'Waga', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><path d="M 7.5 18.5 L 12.2 18.5 A 4.8 4.8 0 1 1 19.8 18.5 L 24.5 18.5 M 7.5 22.5 L 24.5 22.5"/></svg>' },
    { key: 'Scorpio', name: 'Skorpion', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><path d="M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20 C 18.4 23, 21.5 23, 24 19.5 M 21.2 19.2 L 24.2 19.2 L 24.2 22.2"/></svg>' },
    { key: 'Sagittarius', name: 'Strzelec', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><path d="M 8.5 23.5 L 23.5 8.5 M 16.5 8.5 L 23.5 8.5 L 23.5 15.5 M 11.5 14.5 L 17.5 20.5"/></svg>' },
    { key: 'Capricorn', name: 'Koziorożec', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><path d="M 7.5 11.5 L 10 10 L 13.2 20.5 L 16.8 11.5 C 18 9, 21.5 9.5, 21.5 13.5 C 21.5 18, 24.2 21, 21 23.5 C 18.5 25, 16.2 23, 17.2 20.5 C 18.2 18.5, 21.5 18.8, 24 21"/></svg>' },
    { key: 'Aquarius', name: 'Wodnik', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><path d="M 7.5 14.5 L 10.5 11.5 L 13.2 14.5 L 16 11.5 L 18.8 14.5 L 21.5 11.5 L 24.5 14.5 M 7.5 20.5 L 10.5 17.5 L 13.2 20.5 L 16 17.5 L 18.8 20.5 L 21.5 17.5 L 24.5 20.5"/></svg>' },
    { key: 'Pisces', name: 'Ryby', glyph: '<svg width="1.05em" height="1.05em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;" aria-hidden="true"><path d="M 10 8.5 C 14.5 12.5, 14.5 19.5, 10 23.5 M 22 8.5 C 17.5 12.5, 17.5 19.5, 22 23.5 M 7.5 16 L 24.5 16"/></svg>' }
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
