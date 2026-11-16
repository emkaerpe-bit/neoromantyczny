/**
 * NEOROMANTYCZNY — SATURN CONDITION STACK EXTRACTOR
 * Wyciąg faktów astronomicznych i tradycyjnych bez zmiany silnika orbitalnego
 */
(function () {
  const TRAD_RULERS = {
    Aries: 'mars', Taurus: 'venus', Gemini: 'mercury', Cancer: 'moon', Leo: 'sun', Virgo: 'mercury',
    Libra: 'venus', Scorpio: 'mars', Sagittarius: 'jupiter', Capricorn: 'saturn', Aquarius: 'saturn', Pisces: 'jupiter'
  };
  const SIGN_ORDER = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const DIGNITY_RULES = {
    sun: { dom: ['Leo'], ex: ['Aries'], det: ['Aquarius'], fall: ['Libra'] },
    moon: { dom: ['Cancer'], ex: ['Taurus'], det: ['Capricorn'], fall: ['Scorpio'] },
    mercury: { dom: ['Gemini', 'Virgo'], ex: ['Virgo'], det: ['Sagittarius', 'Pisces'], fall: ['Pisces'] },
    venus: { dom: ['Taurus', 'Libra'], ex: ['Pisces'], det: ['Aries', 'Scorpio'], fall: ['Virgo'] },
    mars: { dom: ['Aries', 'Scorpio'], ex: ['Capricorn'], det: ['Taurus', 'Libra'], fall: ['Cancer'] },
    jupiter: { dom: ['Sagittarius', 'Pisces'], ex: ['Cancer'], det: ['Gemini', 'Virgo'], fall: ['Capricorn'] },
    saturn: { dom: ['Capricorn', 'Aquarius'], ex: ['Libra'], det: ['Cancer', 'Leo'], fall: ['Aries'] }
  };

  function norm360(d) { return ((d % 360) + 360) % 360; }
  function angDiff(a, b) { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; }
  function signedDiff(a, b) { let d = (a - b) % 360; if (d > 180) d -= 360; if (d < -180) d += 360; return d; }

  function getPlanetDignity(key, signKey) {
    const r = DIGNITY_RULES[key];
    if (!r) return 'peregrine';
    if (r.dom.includes(signKey)) return 'domicile';
    if (r.ex.includes(signKey)) return 'exaltation';
    if (r.det.includes(signKey)) return 'detriment';
    if (r.fall.includes(signKey)) return 'fall';
    return 'peregrine';
  }

  function detectMoonSignBoundary(dateStr, city) {
    try {
      if (!dateStr || !window.SaturnMath || !window.__DISPOSITOR_ENGINE__) return { uncertain: false };
      const [y, m, d] = dateStr.split('-').map(Number);
      const offStart = window.__DISPOSITOR_ENGINE__.getTzOffset(y, m, d, 0, 0);
      const offEnd = window.__DISPOSITOR_ENGINE__.getTzOffset(y, m, d, 23, 59);
      const jd0 = new Date(Date.UTC(y, m - 1, d, -offStart, 0, 0)).getTime() / 86400000 + 2440587.5;
      const jd1 = new Date(Date.UTC(y, m - 1, d, 23 - offEnd, 59, 0)).getTime() / 86400000 + 2440587.5;
      const p0 = window.SaturnMath.calcPlanetaryPositions(jd0);
      const p1 = window.SaturnMath.calcPlanetaryPositions(jd1);
      const s0 = Math.floor(p0.moon / 30);
      const s1 = Math.floor(p1.moon / 30);
      return {
        uncertain: s0 !== s1,
        signStart: window.SaturnEngine.SIGNS[s0].name,
        signEnd: window.SaturnEngine.SIGNS[s1].name
      };
    } catch (e) { return { uncertain: false }; }
  }

  function analyzeTimelineState(satPlanet, transitLon, passes, nowMs) {
    const sd = signedDiff(transitLon, satPlanet.longitude);
    const orb = Math.abs(sd);
    const inSameSign = Math.floor(transitLon / 30) === Math.floor(satPlanet.longitude / 30);
    const firstMs = passes.length ? passes[0].date.getTime() : 0;
    const lastMs = passes.length ? passes[passes.length - 1].date.getTime() : 0;

    let phase = 'before';
    if (passes.length && nowMs > lastMs + 120 * 86400000) phase = 'completed';
    else if (orb <= 2.2) phase = 'peak_orb';
    else if (passes.length >= 2 && nowMs >= firstMs && nowMs <= lastMs) phase = 'between_passes';
    else if (orb <= 5.0) phase = sd < 0 ? 'approaching_orb' : 'separating_orb';
    else if (orb <= 10.0) phase = sd < 0 ? 'approaching_wide' : 'separating_wide';
    else if (inSameSign) phase = sd < 0 ? 'in_sign_approach' : 'in_sign_exit';

    const deg = satPlanet.deg || 0;
    const nearEdge = deg < 5 ? 'start' : (deg >= 25 ? 'end' : null);
    const passPattern = passes.length >= 2 ? 'triple_retrograde' : 'single_direct';
    return { phase, orb: Number(orb.toFixed(2)), signedDiff: Number(sd.toFixed(2)), nearEdge, passPattern };
  }

  function extractFacts(input) {
    const { chart, satPlanet, dispInfo, aspects, passes, transitLon, userAge, cycleNum, dateStr } = input;
    const hasTime = Boolean(chart.hasTime);
    const byKey = Object.fromEntries((chart.planets || []).map(p => [p.key, p]));
    const sun = byKey.sun;
    const ascLon = chart.ascendant ? chart.ascendant.longitude : 0;
    const birthYear = Number(String(dateStr || '').split('-')[0]) || 1995;
    const lat = chart.city ? Number(chart.city.lat) : 52.23;

    let sect = null;
    if (hasTime && sun) {
      const distAbove = norm360(sun.longitude - ascLon);
      sect = (distAbove >= 180 && distAbove < 360) ? 'day' : 'night';
    }

    const houseNum = hasTime ? satPlanet.house : null;
    const angularity = !hasTime ? null : ([1, 4, 7, 10].includes(houseNum) ? 'angular' : ([2, 5, 8, 11].includes(houseNum) ? 'succedent' : 'cadent'));
    const dignityKey = window.SaturnEngine.getDignityKey(satPlanet.signKey);

    let sunProximity = 'free';
    if (sun) {
      const sunDist = angDiff(satPlanet.longitude, sun.longitude);
      if (sunDist <= 0.283) sunProximity = 'cazimi';
      else if (sunDist <= 17) sunProximity = 'under_beams';
    }

    const dispRuler = dispInfo ? dispInfo.rulerKey : (TRAD_RULERS[satPlanet.signKey] || 'saturn');
    const dispObj = byKey[dispRuler];
    const dispDignity = dispObj ? getPlanetDignity(dispRuler, dispObj.signKey) : 'peregrine';
    const mutualReception = Boolean(dispObj && !dispInfo?.isSelfRuled && (dispObj.signKey === 'Capricorn' || dispObj.signKey === 'Aquarius'));

    let profection = null;
    if (hasTime && chart.ascSign) {
      const ageFloor = Math.max(0, Math.floor(userAge));
      const profHouse = (ageFloor % 12) + 1;
      const ascIdx = SIGN_ORDER.indexOf(chart.ascSign.key);
      const profSignKey = SIGN_ORDER[(ascIdx + profHouse - 1) % 12];
      const doubleActivation = profHouse === houseNum || profSignKey === 'Capricorn' || profSignKey === 'Aquarius' || profSignKey === satPlanet.signKey;
      profection = { profHouse, profSignKey, doubleActivation };
    }

    const moonBoundary = !hasTime ? detectMoonSignBoundary(dateStr, chart.city) : { uncertain: false };
    const timeline = analyzeTimelineState(satPlanet, transitLon, passes, Date.now());
    const visibleAspects = (aspects || []).filter(a => hasTime || a.planet !== 'fortune');

    return {
      hasTime, birthYear, pre1970: birthYear < 1970, polarFallback: Math.abs(lat) >= 66.55,
      userAge: Math.round(userAge), cycleNum, houseNum, angularity, sect, dignityKey,
      isNatalRx: Boolean(satPlanet.isRetrograde), sunProximity, dispDignity, mutualReception,
      isSelfRuled: Boolean(dispInfo && dispInfo.isSelfRuled), profection, moonBoundary,
      timeline, visibleAspects, byKey, houseSystemLabel: Math.abs(lat) >= 66.55 ? 'Whole Sign (fallback >66°33′)' : 'Placidus'
    };
  }

  window.SaturnContextFacts = { extractFacts, getPlanetDignity };
})();
