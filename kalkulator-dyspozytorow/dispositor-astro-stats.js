(function () {
  'use strict';

  const BODY_WEIGHTS = {
    sun: 3.0, moon: 3.0, mercury: 2.2, venus: 2.2, mars: 2.2,
    jupiter: 1.5, saturn: 1.5, uranus: 1.0, neptune: 1.0, pluto: 1.0
  };

  const SIGN_ELEMENT = {
    Aries: 'fire', Leo: 'fire', Sagittarius: 'fire',
    Taurus: 'earth', Virgo: 'earth', Capricorn: 'earth',
    Gemini: 'air', Libra: 'air', Aquarius: 'air',
    Cancer: 'water', Scorpio: 'water', Pisces: 'water'
  };

  const SIGN_MODALITY = {
    Aries: 'cardinal', Cancer: 'cardinal', Libra: 'cardinal', Capricorn: 'cardinal',
    Taurus: 'fixed', Leo: 'fixed', Scorpio: 'fixed', Aquarius: 'fixed',
    Gemini: 'mutable', Virgo: 'mutable', Sagittarius: 'mutable', Pisces: 'mutable'
  };

  const DIGNITY_TABLE = {
    sun:     { dom: ['Leo'], ex: ['Aries'], det: ['Aquarius'], fall: ['Libra'] },
    moon:    { dom: ['Cancer'], ex: ['Taurus'], det: ['Capricorn'], fall: ['Scorpio'] },
    mercury: { dom: ['Gemini', 'Virgo'], ex: ['Virgo'], det: ['Sagittarius', 'Pisces'], fall: ['Pisces'] },
    venus:   { dom: ['Taurus', 'Libra'], ex: ['Pisces'], det: ['Aries', 'Scorpio'], fall: ['Virgo'] },
    mars:    { dom: ['Aries', 'Scorpio'], ex: ['Capricorn'], det: ['Taurus', 'Libra'], fall: ['Cancer'] },
    jupiter: { dom: ['Sagittarius', 'Pisces'], ex: ['Cancer'], det: ['Gemini', 'Virgo'], fall: ['Capricorn'] },
    saturn:  { dom: ['Capricorn', 'Aquarius'], ex: ['Libra'], det: ['Cancer', 'Leo'], fall: ['Aries'] },
    uranus:  { dom: ['Aquarius'], ex: ['Scorpio'], det: ['Leo'], fall: ['Taurus'] },
    neptune: { dom: ['Pisces'], ex: ['Cancer'], det: ['Virgo'], fall: ['Capricorn'] },
    pluto:   { dom: ['Scorpio'], ex: ['Leo'], det: ['Taurus'], fall: ['Aquarius'] }
  };

  const LABELS_PL = {
    elem: { fire: 'Ogień', earth: 'Ziemia', air: 'Powietrze', water: 'Woda' },
    mod:  { cardinal: 'Kardynalna', fixed: 'Stała', mutable: 'Zmienna' },
    dig:  { dom: 'domicyl (+5)', ex: 'wywyższenie (+4)', det: 'wygnanie (-5)', fall: 'upadek (-4)', per: 'neutralna (0)' }
  };

  function getDignity(planetKey, signKey) {
    const row = DIGNITY_TABLE[planetKey];
    if (!row || !signKey) return { code: 'per', score: 0, label: LABELS_PL.dig.per };
    if (row.dom.includes(signKey)) return { code: 'dom', score: 5, label: LABELS_PL.dig.dom };
    if (row.ex.includes(signKey))  return { code: 'ex', score: 4, label: LABELS_PL.dig.ex };
    if (row.fall.includes(signKey)) return { code: 'fall', score: -4, label: LABELS_PL.dig.fall };
    if (row.det.includes(signKey))  return { code: 'det', score: -5, label: LABELS_PL.dig.det };
    return { code: 'per', score: 0, label: LABELS_PL.dig.per };
  }

  function computeAstroProfile(chart, cur) {
    const elemRaw = { fire: 0, earth: 0, air: 0, water: 0 };
    const modRaw = { cardinal: 0, fixed: 0, mutable: 0 };
    const signScores = {};
    const planetScores = [];
    const dignities = {};
    let totalW = 0;

    (chart.planets || []).forEach(p => {
      const wBase = BODY_WEIGHTS[p.key];
      if (!wBase || !p.signKey) return;
      const dig = getDignity(p.key, p.signKey);
      dignities[p.key] = dig;

      const el = SIGN_ELEMENT[p.signKey];
      const md = SIGN_MODALITY[p.signKey];
      const inDeg = (cur && cur.inDegree && cur.inDegree[p.key]) || 0;
      const effW = wBase + inDeg * 0.35 + (dig.score > 0 ? 0.5 : 0);

      if (el) elemRaw[el] += effW;
      if (md) modRaw[md] += effW;
      totalW += effW;

      signScores[p.signKey] = (signScores[p.signKey] || 0) + wBase + (dig.score > 0 ? 1.5 : 0);
      planetScores.push({
        key: p.key,
        signKey: p.signKey,
        score: Number((wBase + inDeg * 1.15 + dig.score * 0.45 + (p.key === (cur && cur.cycles && cur.cycles[0] && cur.cycles[0][0]) ? 1.6 : 0)).toFixed(2)),
        dignity: dig
      });
    });

    if (chart.hasTime && chart.ascSign && chart.ascSign.key) {
      const aSign = chart.ascSign.key;
      const aW = 2.5;
      if (SIGN_ELEMENT[aSign]) elemRaw[SIGN_ELEMENT[aSign]] += aW;
      if (SIGN_MODALITY[aSign]) modRaw[SIGN_MODALITY[aSign]] += aW;
      totalW += aW;
      signScores[aSign] = (signScores[aSign] || 0) + aW;
    }

    const norm = (val) => Math.round((val / Math.max(1, totalW)) * 100);
    const elemPct = { fire: norm(elemRaw.fire), earth: norm(elemRaw.earth), air: norm(elemRaw.air), water: norm(elemRaw.water) };
    const modPct = { cardinal: norm(modRaw.cardinal), fixed: norm(modRaw.fixed), mutable: norm(modRaw.mutable) };

    const sortedElems = Object.entries(elemPct).sort((a, b) => b[1] - a[1]);
    const sortedMods = Object.entries(modPct).sort((a, b) => b[1] - a[1]);
    const topSigns = Object.entries(signScores)
      .sort((a, b) => b[1] - a[1])
      .map(([signKey, pts]) => ({ signKey, pct: Math.round((pts / Math.max(1, totalW)) * 100), pts: Number(pts.toFixed(1)) }));
    planetScores.sort((a, b) => b.score - a.score);

    const avgDepth = cur && cur.nodes && cur.nodes.length
      ? Object.values(cur.depths || {}).reduce((s, d) => s + d, 0) / cur.nodes.length
      : 0;

    return {
      elemPct, modPct,
      dominantElem: sortedElems[0][0], weakestElem: sortedElems[sortedElems.length - 1][0],
      dominantMod: sortedMods[0][0],
      topSigns, dominantSign: topSigns[0] ? topSigns[0].signKey : 'Aries',
      dominantPlanets: planetScores,
      dignities, totalW: Number(totalW.toFixed(1)), avgDepth: Number(avgDepth.toFixed(2))
    };
  }

  window.__DISPOSITOR_ASTRO_STATS__ = {
    BODY_WEIGHTS, SIGN_ELEMENT, SIGN_MODALITY, LABELS_PL, getDignity, computeAstroProfile
  };
})();
