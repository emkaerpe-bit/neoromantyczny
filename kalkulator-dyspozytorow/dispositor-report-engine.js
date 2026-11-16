(function () {
  'use strict';

  const MAIN_KEYS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
  const TRAD_RULERS = {
    Aries: 'mars', Taurus: 'venus', Gemini: 'mercury', Cancer: 'moon', Leo: 'sun', Virgo: 'mercury',
    Libra: 'venus', Scorpio: 'mars', Sagittarius: 'jupiter', Capricorn: 'saturn', Aquarius: 'saturn', Pisces: 'jupiter'
  };
  const MOD_RULERS = {
    Aries: 'mars', Taurus: 'venus', Gemini: 'mercury', Cancer: 'moon', Leo: 'sun', Virgo: 'mercury',
    Libra: 'venus', Scorpio: 'pluto', Sagittarius: 'jupiter', Capricorn: 'saturn', Aquarius: 'uranus', Pisces: 'neptune'
  };

  function analyzeFunctionalGraph(placements, useModern) {
    const rulers = useModern ? MOD_RULERS : TRAD_RULERS;
    const nodes = MAIN_KEYS.filter(k => placements[k]);
    const edges = {};
    nodes.forEach(p => { edges[p] = rulers[placements[p]]; });

    const visitedGlobal = {};
    const cycles = [];

    nodes.forEach(start => {
      if (start in visitedGlobal) return;
      const path = [];
      const pathIdx = {};
      let curr = start;
      while (!(curr in visitedGlobal) && !(curr in pathIdx)) {
        pathIdx[curr] = path.length;
        path.push(curr);
        curr = edges[curr];
        if (!curr || !(curr in placements)) break;
      }
      let compId;
      if (curr in pathIdx) {
        cycles.push(path.slice(pathIdx[curr]));
        compId = cycles.length - 1;
      } else {
        compId = visitedGlobal[curr] !== undefined ? visitedGlobal[curr] : -1;
      }
      path.forEach(n => { visitedGlobal[n] = compId; });
    });

    const inDegree = Object.fromEntries(nodes.map(n => [n, 0]));
    Object.entries(edges).forEach(([p, target]) => {
      if (p !== target && target in inDegree) inDegree[target] += 1;
    });

    const cycleNodes = new Set(cycles.flat());
    const depths = {};
    nodes.forEach(p => {
      let d = 0, curr = p;
      while (!cycleNodes.has(curr) && edges[curr] && d <= nodes.length) {
        curr = edges[curr];
        d += 1;
      }
      depths[p] = d;
    });

    const basinsByCycleIndex = {};
    Object.entries(visitedGlobal).forEach(([node, cid]) => {
      if (cid < 0) return;
      if (!basinsByCycleIndex[cid]) basinsByCycleIndex[cid] = [];
      basinsByCycleIndex[cid].push(node);
    });

    const sortedBasinIdx = Object.keys(basinsByCycleIndex)
      .map(Number)
      .sort((a, b) => basinsByCycleIndex[b].length - basinsByCycleIndex[a].length);

    const maxBasin = Math.max(0, ...Object.values(basinsByCycleIndex).map(b => b.length));
    const centralizationPct = Number(((maxBasin / Math.max(1, nodes.length)) * 100).toFixed(1));
    const maxCycleLen = Math.max(1, ...cycles.map(c => c.length));
    const loopTensionPct = Number(Math.min(100, ((maxCycleLen - 1) / 3) * 70 + (Math.min(cycles.length, 4) - 1) * 10).toFixed(1));
    const maxDepth = Math.max(0, ...Object.values(depths));
    const hierarchyDepthPct = Number(Math.min(100, (maxDepth / 5) * 100).toFixed(1));

    let configType = 'MULTI_BASIN';
    if (cycles.length === 1) {
      if (cycles[0].length === 1) configType = 'SINGLE_FINAL_DISPOSITOR';
      else if (cycles[0].length === 2) configType = 'MUTUAL_RECEPTION';
      else configType = 'SHADOW_LOOP';
    }

    return {
      nodes, edges, cycles, configType, centralizationPct, loopTensionPct,
      hierarchyDepthPct, maxDepth, depths, inDegree, basinsByCycleIndex,
      sortedBasinIdx, cycleNodes, visitedGlobal
    };
  }

  function tracePlanetPath(startKey, edges) {
    const path = [];
    const seen = new Set();
    let curr = startKey;
    while (curr && !seen.has(curr) && path.length <= 12) {
      path.push(curr);
      seen.add(curr);
      const next = edges[curr];
      if (!next || next === curr) break;
      curr = next;
    }
    return { path, endKey: path[path.length - 1], depth: Math.max(0, path.length - 1) };
  }

  function isBorderline(pct) {
    return typeof pct === 'number' && pct > 43 && pct < 57;
  }

  function buildFullAnalysis(chart, useModern) {
    const placements = {};
    const byKey = {};
    (chart.planets || []).forEach(p => {
      byKey[p.key] = p;
      if (MAIN_KEYS.includes(p.key)) placements[p.key] = p.signKey || p.sign;
    });

    const cur = analyzeFunctionalGraph(placements, useModern);
    const alt = analyzeFunctionalGraph(placements, !useModern);
    const changedEdges = cur.nodes.filter(k => cur.edges[k] !== alt.edges[k]);
    const modernDriftPct = Number(((changedEdges.length / Math.max(1, cur.nodes.length)) * 100).toFixed(1));

    const primaryCid = cur.sortedBasinIdx[0] !== undefined ? cur.sortedBasinIdx[0] : 0;
    const primaryBasin = cur.basinsByCycleIndex[primaryCid] || [];
    const primaryCycle = cur.cycles[primaryCid] || [];

    const hasTime = Boolean(chart.hasTime && chart.ascSign);
    const rulers = useModern ? MOD_RULERS : TRAD_RULERS;
    const ascRulerKey = hasTime ? rulers[chart.ascSign.key] : null;
    const dominantHub = [...cur.nodes].sort((a, b) => (cur.inDegree[b] - cur.inDegree[a]) || (cur.depths[a] - cur.depths[b]))[0];
    const deepestLeaf = [...cur.nodes].sort((a, b) => (cur.depths[b] - cur.depths[a]) || (cur.inDegree[a] - cur.inDegree[b]))[0];

    const groupedByTarget = {};
    cur.nodes.forEach(k => {
      const target = cur.edges[k];
      if (!groupedByTarget[target]) groupedByTarget[target] = [];
      groupedByTarget[target].push(k);
    });

    const S = window.__DISPOSITOR_ASTRO_STATS__;
    const astro = S ? S.computeAstroProfile(chart, cur) : {
      elemPct: { fire: 25, earth: 25, air: 25, water: 25 },
      modPct: { cardinal: 33, fixed: 34, mutable: 33 },
      dominantElem: 'fire', weakestElem: 'earth', dominantMod: 'fixed',
      topSigns: [], dominantSign: 'Aries', dominantPlanets: [], dignities: {}, avgDepth: 1
    };

    const clamp = (lo, hi, v) => Math.max(lo, Math.min(hi, Math.round(v)));
    const top2SignsPct = (astro.topSigns[0] ? astro.topSigns[0].pct : 0) + (astro.topSigns[1] ? astro.topSigns[1].pct : 0);
    const strongDigs = Object.values(astro.dignities).filter(d => d.score >= 4).length;
    const retroPers = (chart.planets || []).filter(p => ['mercury', 'venus', 'mars', 'jupiter', 'saturn'].includes(p.key) && p.isRetrograde).length;
    const digOf = (k) => (astro.dignities[k] ? astro.dignities[k].score : 0);

    const centralPct = clamp(12, 90, 26 + (astro.modPct.fixed - astro.modPct.mutable) * 0.58 + top2SignsPct * 0.52 + strongDigs * 2.5 - Math.max(0, cur.cycles.length - 1) * 4);
    const fastDrive = astro.elemPct.fire * 0.55 + astro.modPct.cardinal * 0.45 + (digOf('mars') > 0 ? 10 : 0);
    const slowDelib = astro.elemPct.air * 0.52 + astro.elemPct.water * 0.48 + (cur.cycles[0] && cur.cycles[0].length > 1 ? 8 : 0) + (digOf('mercury') >= 4 ? 6 : 0) + retroPers * 4;
    const choicePct = clamp(12, 90, 48 + (slowDelib - fastDrive) * 1.15);

    const earthCtrl = astro.elemPct.earth * 0.58 + astro.modPct.fixed * 0.25 + (digOf('saturn') > 0 ? 12 : (digOf('saturn') < 0 ? 0 : 5));
    const fireSpont = astro.elemPct.fire * 0.58 + astro.modPct.cardinal * 0.22 + (digOf('mars') > 0 ? 10 : 3);
    const filterPct = clamp(12, 90, 34 + (earthCtrl - fireSpont) * 1.05 + Math.min(28, astro.avgDepth * 12));

    const habitSide = astro.elemPct.earth * 0.52 + astro.modPct.fixed * 0.48;
    const changeSide = astro.elemPct.air * 0.45 + astro.elemPct.fire * 0.22 + astro.modPct.mutable * 0.35 + (digOf('uranus') > 0 ? 12 : 0) + modernDriftPct * 0.16;
    const changePct = clamp(12, 90, 46 + (changeSide - habitSide) * 1.25);

    let identityPct = null;
    if (hasTime && ascRulerKey && S) {
      const ascTr = tracePlanetPath(ascRulerKey, cur.edges);
      const ascEl = S.SIGN_ELEMENT[chart.ascSign.key];
      const sunEl = byKey.sun ? S.SIGN_ELEMENT[byKey.sun.signKey] : ascEl;
      const moonEl = byKey.moon ? S.SIGN_ELEMENT[byKey.moon.signKey] : ascEl;
      const ascMd = S.SIGN_MODALITY[chart.ascSign.key];
      const endMd = byKey[ascTr.endKey] ? S.SIGN_MODALITY[byKey[ascTr.endKey].signKey] : ascMd;
      const dAsc = cur.depths[ascRulerKey] || 0;
      const ascDig = digOf(ascRulerKey);
      identityPct = clamp(12, 92, 54 + (ascEl === sunEl ? 12 : -6) + (ascEl === moonEl ? 8 : -3) + (ascMd === endMd ? 8 : -4) + (ascRulerKey === ascTr.endKey ? 10 : -dAsc * 5) + Math.sign(ascDig) * 5);
    }

    const axes = [
      { id: 'centralization', label: 'Oś Decyzji', leftPole: 'Wiele ról naraz', rightPole: 'Jeden głos wiodący', pct: centralPct, isBorderline: isBorderline(centralPct), available: true },
      { id: 'loopTension', label: 'Sposób Wyboru', leftPole: 'Szybkie rozstrzygnięcie', rightPole: 'Wewnętrzna debata', pct: choicePct, isBorderline: isBorderline(choicePct), available: true },
      { id: 'hierarchyDepth', label: 'Filtr Impulsów', leftPole: 'Odruch od razu', rightPole: 'Kroki pośrednie', pct: filterPct, isBorderline: isBorderline(filterPct), available: true },
      { id: 'modernDrift', label: 'Nawyki a Zmiana', leftPole: 'Stałość nawyków', rightPole: 'Impuls zmiany', pct: changePct, isBorderline: isBorderline(changePct), available: true },
      { id: 'identity', label: 'Twarz a Kryzys', leftPole: 'Inna reakcja w stresie', rightPole: 'Spójność pod presją', pct: identityPct, isBorderline: isBorderline(identityPct), available: hasTime }
    ];

    return {
      useModern, placements, byKey, cur, alt, changedEdges, modernDriftPct,
      primaryCid, primaryBasin, primaryCycle, hasTime, ascRulerKey, identityPct,
      dominantHub, deepestLeaf, groupedByTarget, axes, astro,
      trace: (k) => tracePlanetPath(k, cur.edges)
    };
  }

  window.__DISPOSITOR_REPORT_ENGINE__ = {
    MAIN_KEYS, TRAD_RULERS, MOD_RULERS, analyzeFunctionalGraph, tracePlanetPath, buildFullAnalysis
  };
})();
