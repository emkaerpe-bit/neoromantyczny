(function () {
  'use strict';
  window.__DISPOSITOR_REPORT_NLG_DATA__ = window.__DISPOSITOR_REPORT_NLG_DATA__ || {};

  function getSignProf(data, pObj) {
    return (data.SIGN_PROFILES && pObj && data.SIGN_PROFILES[pObj.signKey]) || {};
  }

  function buildSectionsPart2(analysis, ctx) {
    const { L, data, gender, leadKey, topo, leadProf } = ctx;
    const { byKey, cur, trace } = analysis;
    const { formatPathString } = data.helpers;
    const rules = data.PAIR_AND_AXIS_RULES;

    const mTrace = trace('moon');
    const sTrace = trace('saturn');
    const moonP = byKey.moon;
    const satP = byKey.saturn;
    const moonSignP = getSignProf(data, moonP);
    const satSignP = getSignProf(data, satP);
    let msKey = 'splitBasins';
    if (mTrace.path.includes('saturn') && sTrace.path.includes('moon')) msKey = 'sameBasin';
    else if (mTrace.path.includes('saturn')) msKey = 'moonUnderSaturn';
    else if (sTrace.path.includes('moon')) msKey = 'saturnUnderMoon';
    else if (cur.visitedGlobal.moon === cur.visitedGlobal.saturn) msKey = 'sameBasin';

    const hubKey = analysis.dominantHub || leadKey;
    const hubProf = data.PLANET_PROFILES[hubKey] || leadProf;

    const elemMap = rules.SIGN_ELEMENTS || {};
    const sameMoonSat = elemMap[moonP.signKey] === elemMap[satP.signKey];
    const msBlend = sameMoonSat
      ? `Oba te punkty (${L.planetInSign('moon', moonP.signKey, 'M')} i ${L.planetInSign('saturn', satP.signKey, 'M')}) dzielą podobny żywioł, więc troska idzie w parze z zasadami (${moonSignP.emotion || ''}).`
      : `Przy Księżycu ${L.signIn(moonP.signKey)} ${moonSignP.emotion || ''}, tymczasem Saturn ${L.signIn(satP.signKey)} ${satSignP.style || ''}.`;

    const parentingBlocks = [
      {
        badge: 'RELACJA KSIĘŻYCA I SATURNA',
        text: L.resolveGender(`${rules.MOON_SATURN_PATTERNS[msKey]} ${msBlend} ${hubProf.parentingCare}`, gender),
        sourceEdges: `${formatPathString(mTrace.path, byKey, L)} | ${formatPathString(sTrace.path, byKey, L)}`,
        focusPlanet: 'moon'
      }
    ];

    const hubP = byKey[hubKey];
    const hubSignP = getSignProf(data, hubP);
    const jupP = byKey.jupiter;
    const marsP = byKey.mars;
    const jupSignP = getSignProf(data, jupP);
    const marsSignP = getSignProf(data, marsP);
    const jTrace = trace('jupiter');
    const careerLower = hubProf.careerAxis ? hubProf.careerAxis.charAt(0).toLowerCase() + hubProf.careerAxis.slice(1) : '';
    const sameJupSat = cur.visitedGlobal.jupiter === cur.visitedGlobal.saturn;
    const jupSatLead = sameJupSat
      ? `Jowisz (${L.signIn(jupP.signKey)}) oraz Saturn (${L.signIn(satP.signKey)}) podlegają wspólnemu nurtowi, więc odważny rozwój (${L.planetCase(jTrace.endKey, 'M')}) łatwiej uzgadniasz z twardym budżetem.`
      : `Rozmach (${L.planetInSign('jupiter', jupP.signKey, 'M')} pod ${L.planetCase(jTrace.endKey, 'N')}) i ostrożność (${L.planetInSign('saturn', satP.signKey, 'M')} pod ${L.planetCase(sTrace.endKey, 'N')}) działają z osobnych ośrodków.`;

    const careerBlocks = [
      {
        badge: 'ŚRODOWISKO PRACY I RYZYKO WYPALENIA',
        text: L.resolveGender(`Główny węzeł karty (${L.planetInSign(hubKey, hubP.signKey, 'M')}) ustawia Twój rytm pracy: ${hubSignP.work || ''}. Codzienne tempo podkręca ${L.planetInSign('mars', marsP.signKey, 'M')}. Sprawdzone kierunki to ${careerLower}`, gender),
        sourceEdges: formatPathString([hubKey, 'mars'], byKey, L),
        focusPlanet: hubKey
      },
      {
        badge: 'WZROST (JOWISZ) A OBOWIĄZKI (SATURN)',
        text: L.resolveGender(`${jupSatLead} Przez Jowisza ${jupSignP.work || ''}. Od strony Saturna pilnuj typowej pułapki jego położenia: ${satSignP.trap || ''}, zaś w zadaniach bieżących przez ${L.planetInSign('mars', marsP.signKey, 'B')} ${marsSignP.work || ''}.`, gender),
        sourceEdges: `${formatPathString(jTrace.path, byKey, L)} • ${formatPathString(sTrace.path, byKey, L)}`,
        focusPlanet: 'jupiter'
      }
    ];

    const merP = byKey.mercury;
    const merTrace = trace('mercury');
    const leadP = byKey[leadKey];
    const merSignP = getSignProf(data, merP);
    const leadSignP = getSignProf(data, leadP);
    const leafKey = analysis.deepestLeaf || 'sun';
    const leafP = byKey[leafKey];
    const leafProf = data.PLANET_PROFILES[leafKey] || leadProf;
    const leafSignP = getSignProf(data, leafP);
    const leafTrace = trace(leafKey);
    const leafDepth = cur.depths[leafKey] || 0;
    const leafStepsLabel = L.cldrPlural(leafDepth, {
      one: '# ogniwo pośrednie', few: '# ogniwa pośrednie', many: '# ogniw pośrednich', other: '# ogniwa pośredniego'
    });
    const viaNode = leafTrace.path.length > 2 ? ` po przejściu przez ${L.planetCase(leafTrace.path[1], 'B')}` : '';
    const leafBehaviorClause = leafP.signKey === merP.signKey
      ? `W codziennej rutynie tego odcinka ${leafSignP.peerRole || ''}`
      : `Na tym odcinku ${leafSignP.subRole || ''}`;
    const depthWorkText = leafDepth === 0
      ? `Wszystkie główne planety stoją bezpośrednio w cyklu końcowym, więc ${merSignP.subRole || 'od razu przekładasz ustalenia na działanie'}.`
      : `Najdłuższy łańcuch wychodzi od ${L.planetInSign(leafKey, leafP.signKey, 'D')} (${leafStepsLabel}): zanim pierwszy pomysł trafi do czynu, przechodzi przez wymagania ${L.planetCase(leafTrace.endKey, 'D')}${viaNode}. ${leafBehaviorClause}.`;

    const subSentence = merTrace.depth === 0
      ? `Pod własnym szefem (${L.planetInSign('mercury', merP.signKey, 'M')}) myślisz bez pośrednich ogniw: ${merSignP.subRole || ''}.`
      : `W pracy wykonawczej impuls ${L.planetInSign('mercury', merP.signKey, 'D')} trafia pod osąd ${L.planetCase(merTrace.endKey, 'D')}: ${merSignP.subRole || ''}.`;
    const peerSentence = hubKey === leadKey
      ? `Współpracując na równym poziomie (${L.planetInSign(hubKey, hubP.signKey, 'M')}), ${hubSignP.peerRole || ''}.`
      : `W zespole przejmujesz rolę punktu skupienia (${L.planetInSign(hubKey, hubP.signKey, 'M')}): ${hubSignP.peerRole || ''}.`;

    const workBlocks = [
      {
        badge: 'PODWŁADNY • WSPÓŁPRACOWNIK • LIDER',
        text: L.resolveGender(`${subSentence} ${peerSentence} Prowadząc innych (${L.planetInSign(leadKey, leadP.signKey, 'M')}), ${leadSignP.leaderRole || ''}, przy codziennym tempie ${L.planetInSign('mars', marsP.signKey, 'D')}.`, gender),
        sourceEdges: formatPathString([leadKey, hubKey, 'mercury'], byKey, L),
        focusPlanet: leadKey
      },
      {
        badge: 'JAK PODEJMUJESZ CODZIENNE ZADANIA',
        text: L.resolveGender(depthWorkText, gender),
        sourceEdges: formatPathString(leafTrace.path, byKey, L),
        focusPlanet: leafKey
      }
    ];

    const q2Source = leafKey !== leadKey ? leafProf : (byKey.sun && leadKey !== 'sun' ? data.PLANET_PROFILES.sun : data.PLANET_PROFILES.moon);
    const q3Dynamic = hubKey !== 'moon'
      ? `Czy skupiając całą uwagę na wymaganiach ${L.planetInSign(hubKey, hubP.signKey, 'D')}, nie spycham dzisiaj potrzeb ${L.planetInSign('moon', moonP.signKey, 'D')} na ostatnie miejsce?`
      : `Czy w natłoku spraw pamiętam o tym, co naprawdę uruchamia ${L.planetInSign(leafKey, leafP.signKey, 'M')} w mojej codzienności?`;
    const chosenAxiom = hubKey !== leadKey
      ? hubProf.axiom
      : (leafKey !== leadKey && cur.configType === 'MULTI_BASIN' ? leafProf.axiom : leadProf.axiom);
    const rxNote = leadP.isRetrograde ? ' Ponieważ planeta wiodąca jest w retrogradacji, odpowiedź dojrzewa u Ciebie lepiej po przespanej nocy.' : '';

    let shadowIntro = '';
    if (leafDepth === 0) {
      shadowIntro = `W tym układzie żadna planeta nie czeka na końcu długiego łańcucha podrzędnego, więc główne impulsy działają bez zewnętrznych filtrów. ${topo.shadowGrowth}`;
    } else if (leafDepth === 1) {
      shadowIntro = `Pod bezpośrednim nadzorem ${L.planetCase(leafTrace.endKey, 'D')} stoi ${L.planetInSign(leafKey, leafP.signKey, 'M')}: ${leafProf.whenSubordinate} Zwróć uwagę na nawyk znaku (${L.signCase(leafP.signKey, 'D')}): ${leafSignP.trap || ''}.`;
    } else {
      shadowIntro = `Najdłuższą drogę (${leafDepth} szczeble do ${L.planetCase(leafTrace.endKey, 'D')}) pokonuje ${L.planetInSign(leafKey, leafP.signKey, 'M')}: ${leafProf.whenSubordinate} W codziennych wyborach pilnuj pułapki znaku (${L.signCase(leafP.signKey, 'D')}): ${leafSignP.trap || ''}.`;
    }

    const shadowBlocks = [
      {
        badge: 'STŁUMIONA POTRZEBA NA KOŃCU ŁAŃCUCHA',
        text: L.resolveGender(shadowIntro, gender),
        sourceEdges: formatPathString(leafTrace.path, byKey, L),
        focusPlanet: leafKey
      },
      {
        badge: 'CO ZROBIĆ W DNIU PRZECIĄŻENIA (24H)',
        text: L.resolveGender(`${leadProf.somaticReset} Dla równowagi Księżyca ${L.signIn(moonP.signKey)}: ${moonSignP.reset || ''}.${rxNote}`, gender),
        sourceEdges: formatPathString([leadKey, 'moon'], byKey, L),
        focusPlanet: leadKey
      }
    ];

    return [
      { id: 'parenting', num: '05', tabLabel: '05. Dom i Opieka', heading: 'Jak Budujesz Bezpieczeństwo i Stawiasz Zasady', isFree: false, blocks: parentingBlocks },
      { id: 'career', num: '06', tabLabel: '06. Praca i Rynek', heading: 'Naturalna Strefa Wpływu i Źródła Zmęczenia', isFree: false, blocks: careerBlocks },
      { id: 'work', num: '07', tabLabel: '07. Nawyki w Zespole', heading: 'Jak Działasz Jako Podwładny, Partner i Lider', isFree: false, blocks: workBlocks },
      {
        id: 'shadow', num: '08', tabLabel: '08. Praca z Cieniem', heading: 'Oswajanie Zapomnianych Potrzeb i Reset 24h', isFree: false,
        blocks: shadowBlocks,
        questions: [(leadProf.questions || [])[0], (q2Source.questions || [])[0], q3Dynamic].filter(Boolean).map(q => L.resolveGender(q, gender)),
        axiom: chosenAxiom && chosenAxiom.quote
          ? { quote: L.resolveGender(chosenAxiom.quote, gender), author: chosenAxiom.author }
          : (typeof chosenAxiom === 'string' ? L.resolveGender(chosenAxiom, gender) : null),
        itcNotice: rules.ITC_NOTICES.epistemic
      }
    ];
  }

  function buildReportDocument(chart, dispDataLegacy, options) {
    const opts = options || {};
    const gender = opts.gender || 'n';
    const useModern = Boolean(opts.useModern !== undefined ? opts.useModern : (dispDataLegacy && dispDataLegacy.useModern));
    const L = window.__DISPOSITOR_LEXICON__;
    const E = window.__DISPOSITOR_REPORT_ENGINE__;
    const data = window.__DISPOSITOR_REPORT_NLG_DATA__;

    const analysis = E.buildFullAnalysis(chart, useModern);
    const { cur, byKey } = analysis;
    const topo = data.TOPOLOGY_PROFILES[cur.configType] || data.TOPOLOGY_PROFILES.MULTI_BASIN;
    const leadKey = (analysis.primaryCycle && analysis.primaryCycle[0]) || analysis.dominantHub || 'sun';
    const leadProf = data.PLANET_PROFILES[leadKey] || data.PLANET_PROFILES.sun;
    const { formatBasinsCode, buildSectionsPart1 } = data.helpers;

    const basinsCode = formatBasinsCode(analysis, data.PLANET_PROFILES);
    const suffix = analysis.hasTime ? (analysis.identityPct >= 50 ? '-A' : '-T') : '';
    const profileCode = `${topo.codePrefix}-${basinsCode}${suffix}`;

    let title = `${topo.name}: ${L.planetCase(leadKey, 'M')}`;
    if (cur.configType === 'SINGLE_FINAL_DISPOSITOR' && byKey[leadKey]) {
      title = `${topo.name}: ${L.planetInSign(leadKey, byKey[leadKey].signKey, 'M')}`;
    } else if (cur.configType === 'MUTUAL_RECEPTION') {
      title = `${topo.name}: ${analysis.primaryCycle.map(k => L.planetCase(k, 'M')).join(' ↔ ')}`;
    } else if (cur.configType === 'SHADOW_LOOP') {
      title = `${topo.name}: ${analysis.primaryCycle.map(k => L.planetCase(k, 'M')).join(' → ')}`;
    } else if (cur.configType === 'MULTI_BASIN') {
      const basinHeads = cur.sortedBasinIdx.slice(0, 3).map(cid => (cur.cycles[cid] || [])[0]).filter(Boolean);
      title = `${topo.name}: ${L.joinList(basinHeads.map(k => L.planetCase(k, 'M')), '&')}`;
    }

    const ctx = { L, data, gender, leadKey, topo, leadProf, chart };
    const sections = [...buildSectionsPart1(analysis, ctx), ...buildSectionsPart2(analysis, ctx)];
    const axesWithText = analysis.axes.map(ax => Object.assign({}, ax, {
      narrative: data.PAIR_AND_AXIS_RULES.buildAxisNarrative(ax, gender, analysis, chart),
      popup: data.PAIR_AND_AXIS_RULES.buildAxisPopup(ax, analysis, chart)
    }));

    const S = window.__DISPOSITOR_ASTRO_STATS__;
    const astro = analysis.astro || {};
    const domSignObj = astro.topSigns && astro.topSigns[0];
    const astroChips = S && astro.elemPct ? [
      `Żywioł: ${S.LABELS_PL.elem[astro.dominantElem]} (${astro.elemPct[astro.dominantElem]}%)`,
      `Jakość: ${S.LABELS_PL.mod[astro.dominantMod]} (${astro.modPct[astro.dominantMod]}%)`,
      domSignObj ? `Silny znak: ${L.signCase(domSignObj.signKey, 'M')} (${domSignObj.pct}%)` : '',
      astro.dominantPlanets && astro.dominantPlanets.length
        ? `Dominanty: ${astro.dominantPlanets.slice(0, 3).map(p => L.planetCase(p.key, 'M')).join(', ')}`
        : ''
    ].filter(Boolean) : [];

    return {
      profileCode, title, archetype: `${topo.name} • ${leadProf.archetype}`, subtitle: topo.subtitle,
      modeLabel: useModern ? 'System Nowoczesny (10 ciał)' : 'System Tradycyjny (7 władców)',
      hasTime: analysis.hasTime, gender, axes: axesWithText, sections, analysis, astroChips
    };
  }

  window.__DISPOSITOR_REPORT_NLG__ = { buildReportDocument };
  window.__DISPOSITOR_REPORT_DATA__ = window.__DISPOSITOR_REPORT_DATA__ || {};
  window.__DISPOSITOR_REPORT_DATA__.getReportForHierarchy = function (hierarchy, planets, chart, options) {
    if (!chart) return {};
    return buildReportDocument(chart, hierarchy, options);
  };
})();
