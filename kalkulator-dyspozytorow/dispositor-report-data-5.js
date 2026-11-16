(function () {
  'use strict';
  window.__DISPOSITOR_REPORT_NLG_DATA__ = window.__DISPOSITOR_REPORT_NLG_DATA__ || {};

  function formatPathString(keys, byKey, lexicon) {
    return (keys || []).map(k => {
      const p = byKey[k];
      return p ? `${p.glyph} ${lexicon.planetCase(k, 'M')} (${p.signName})` : lexicon.planetCase(k, 'M');
    }).join(' → ');
  }

  function formatBasinsCode(analysis, profiles) {
    const cycles = analysis.cur.sortedBasinIdx.map(cid => analysis.cur.cycles[cid] || []);
    const keys = cycles.slice(0, 2).map(c => c[0]).filter(Boolean);
    return keys.map(k => (profiles[k] && profiles[k].code3) || k.slice(0, 3).toUpperCase()).join('/');
  }

  function buildSharedEdgeSummary(analysis, lexicon) {
    const groups = Object.entries(analysis.groupedByTarget)
      .map(([target, list]) => ({ target, subjects: list.filter(k => k !== target) }))
      .filter(g => g.subjects.length >= 2)
      .sort((a, b) => b.subjects.length - a.subjects.length);

    if (!groups.length) return '';
    const top = groups[0];
    const subNames = lexicon.joinList(top.subjects.map(k => lexicon.planetCase(k, 'M')), 'oraz');
    return `${subNames} podlegają tutaj bezpośrednio ${lexicon.planetCase(top.target, 'C')}, dlatego w stresującym momencie ich potrzeby łączą się w jeden wspólny odruch.`;
  }

  function getSignProf(data, pObj) {
    return (data.SIGN_PROFILES && pObj && data.SIGN_PROFILES[pObj.signKey]) || {};
  }

  function buildSectionsPart1(analysis, ctx) {
    const { L, data, gender, leadKey, topo, leadProf } = ctx;
    const { byKey, cur, trace } = analysis;
    const rules = data.PAIR_AND_AXIS_RULES;
    const sunP = byKey.sun;
    const leadP = byKey[leadKey];
    const leadSignP = getSignProf(data, leadP);
    const sunSignText = sunP ? L.planetInSign('sun', sunP.signKey, 'M') : 'Słońce';
    const subCount = Math.max(0, analysis.primaryBasin.length - analysis.primaryCycle.length);

    const cycleNodesText = analysis.primaryCycle.map(k => {
      const p = byKey[k];
      return p ? L.planetInSign(k, p.signKey, 'M') : L.planetCase(k, 'M');
    });
    const cycleLabel = cur.configType === 'MUTUAL_RECEPTION'
      ? cycleNodesText.join(' ↔ ')
      : cycleNodesText.join(' → ');

    const secondCid = cur.sortedBasinIdx[1];
    const secondHeadKey = secondCid !== undefined && cur.cycles[secondCid] ? cur.cycles[secondCid][0] : null;
    const secondHeadP = secondHeadKey ? byKey[secondHeadKey] : null;

    let driftNote = '';
    if (analysis.changedEdges.length > 0) {
      const chNames = L.joinList(analysis.changedEdges.map(k => L.planetCase(k, 'D')), 'i');
      driftNote = `Po przełączeniu trybu tradycyjnego na nowoczesny zmienia się kierunek dla ${chNames} (${analysis.modernDriftPct}% różnicy).`;
    } else {
      driftNote = 'Obie szkoły (tradycyjna i nowoczesna) prowadzą ten horoskop dokładnie w ten sam sposób.';
    }

    const elemMap = rules.SIGN_ELEMENTS || {};
    const leadElem = elemMap[leadP.signKey] || 'fire';
    const secElem = secondHeadP ? (elemMap[secondHeadP.signKey] || 'earth') : leadElem;

    let openingLead = '';
    if (cur.configType === 'MULTI_BASIN' && secondHeadKey && secondHeadP) {
      openingLead = (leadElem === 'fire' || leadElem === 'air')
        ? `W Twojej karcie nie rządzi jedna centrala. Główny nurt prowadzi ${L.planetInSign(leadKey, leadP.signKey, 'M')} (${leadSignP.style || 'nadaje kierunek decyzjom'}), ale odrębne zasady wyznacza także ${L.planetInSign(secondHeadKey, secondHeadP.signKey, 'M')}.`
        : `Decyzje w tym wykresie rozkładają się między kilka ośrodków. Pierwsze skrzypce gra ${L.planetInSign(leadKey, leadP.signKey, 'M')} (${leadSignP.style || 'porządkuje działania'}), natomiast w innym obszarze życia stery przejmuje ${L.planetInSign(secondHeadKey, secondHeadP.signKey, 'M')}.`;
    } else {
      openingLead = `${topo.introMechanics} Główna instancja (${L.planetInSign(leadKey, leadP.signKey, 'M')}) ${leadSignP.style || 'nadaje ton wyborom'}.`;
    }

    const basinClause = subCount > 0
      ? `Główny ośrodek (${cycleLabel}) skupia pod sobą ${L.cldrPlural(subCount, { one: '# planetę podległą', few: '# planety podległe', many: '# planet podległych', other: '# planety podległej' })}.`
      : `Główny ośrodek (${cycleLabel}) zamyka się we własnym gronie bez dodatkowych planet podległych.`;
    const sharedSummary = buildSharedEdgeSummary(analysis, L);

    const introBlocks = [
      {
        badge: 'GŁÓWNY UKŁAD DECYZJI',
        text: L.resolveGender([openingLead, basinClause, sharedSummary, driftNote].filter(Boolean).join(' '), gender),
        sourceEdges: formatPathString(analysis.primaryCycle, byKey, L),
        focusPlanet: leadKey
      }
    ];

    let maskText = '';
    if (analysis.hasTime && analysis.ascRulerKey) {
      const ascRulerKey = analysis.ascRulerKey;
      const ascSignKey = ctx.chart.ascSign.key;
      const ascP = byKey[ascRulerKey];
      const ascTrace = trace(ascRulerKey);
      const endP = byKey[ascTrace.endKey];
      const endSignP = getSignProf(data, endP);
      const endAction = (rules.CRISIS_END_BEHAVIOR && rules.CRISIS_END_BEHAVIOR[ascTrace.endKey]) || endSignP.style || 'trzymasz się własnych zasad';
      const isSelfAligned = ascTrace.endKey === ascRulerKey;
      const sameSunAsEnd = sunP && endP && sunP.signKey === endP.signKey;

      if (isSelfAligned) {
        maskText = `${sunSignText} pokazuje jedynie część Twojej tożsamości. Pierwsze wrażenie w kontaktach nadaje Władca Ascendentu (${L.signCase(ascSignKey, 'D')}) poprzez ${L.planetInSign(ascRulerKey, ascP.signKey, 'B')}. W trudniejszych chwilach zachowujesz się spójnie z tym pierwszym odbiorem i wtedy ${endAction}.`;
      } else if (sameSunAsEnd) {
        maskText = `${sunSignText} pokazuje jedynie część Twojej tożsamości. Na zewnątrz ludzie poznają Cię najpierw przez ${L.planetInSign(ascRulerKey, ascP.signKey, 'B')} (Władcę Ascendentu ${L.signCase(ascSignKey, 'D')}). Pod presją decyzja wraca jednak przez ${L.planetInSign(ascTrace.endKey, endP.signKey, 'B')} do znaku Twojego Słońca: wtedy ${endAction}.`;
      } else {
        maskText = `${sunSignText} pokazuje jedynie część Twojej tożsamości. Codzienny styl rozmowy wyznacza Władca Ascendentu (${L.signCase(ascSignKey, 'D')}) przez ${L.planetInSign(ascRulerKey, ascP.signKey, 'B')}. Gdy rośnie napięcie, głos przejmuje ${L.planetInSign(ascTrace.endKey, endP.signKey, 'M')}, więc ${endAction}.`;
      }
    } else {
      maskText = `${sunSignText} pokazuje jedynie część Twojej tożsamości, natomiast w trudnych wyborach ostateczne słowo należy do ${cycleLabel}. ${rules.ITC_NOTICES.noTime}`;
    }

    introBlocks.push({
      badge: 'PIERWSZE WRAŻENIE A REAKCJA W KRYZYSIE',
      text: L.resolveGender(maskText, gender),
      sourceEdges: formatPathString(analysis.hasTime && analysis.ascRulerKey ? trace(analysis.ascRulerKey).path : ['sun', leadKey], byKey, L),
      focusPlanet: analysis.ascRulerKey || 'sun'
    });

    const hubKey = analysis.dominantHub || leadKey;
    const hubP = byKey[hubKey];
    const hubProf = data.PLANET_PROFILES[hubKey] || leadProf;
    const hubSignP = getSignProf(data, hubP);
    const hubDirectSubs = (analysis.groupedByTarget[hubKey] || []).filter(k => k !== hubKey);
    const hubSubsTxt = hubDirectSubs.length
      ? `: ${L.joinList(hubDirectSubs.map(k => L.planetCase(k, 'M')), 'i')}`
      : '';
    const hubInDeg = L.cldrPlural(cur.inDegree[hubKey], {
      one: '# bezpośrednia zależność', few: '# bezpośrednie zależności', many: '# bezpośrednich zależności', other: '# bezpośredniej zależności'
    });
    const hubIntro = hubKey === leadKey
      ? `Najsilniejsze oparcie w karcie buduje ${L.planetInSign(hubKey, hubP.signKey, 'M')} (${hubInDeg}${hubSubsTxt}), który ${hubSignP.style || 'porządkuje działania'}.`
      : `Choć główny kurs wyznacza ${L.planetCase(leadKey, 'M')}, największy ruch zbiera ${L.planetInSign(hubKey, hubP.signKey, 'M')} (${hubInDeg}${hubSubsTxt}) i ${hubSignP.style || 'stabilizuje codzienne decyzje'}.`;

    const tensionOpening = cur.configType === 'MULTI_BASIN' && secondHeadKey && secondHeadP
      ? (leadElem === secElem
        ? `Dwa równorzędne ośrodki (${L.planetInSign(leadKey, leadP.signKey, 'M')} i ${L.planetInSign(secondHeadKey, secondHeadP.signKey, 'M')}) rywalizują tu podobnym temperamentem o Twoją uwagę.`
        : `Największe zużycie sił powstaje między wymaganiami ${L.planetInSign(leadKey, leadP.signKey, 'D')} a osobnym nurtem ${L.planetInSign(secondHeadKey, secondHeadP.signKey, 'D')}.`)
      : topo.discomforts[0];
    const leafProfAlt = data.PLANET_PROFILES[analysis.deepestLeaf] || hubProf;
    const secondDiscomfort = hubKey !== leadKey ? hubProf.discomforts[0] : (leafProfAlt.discomforts[1] || leadProf.discomforts[1]);

    const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');
    const strengthsBlocks = [
      {
        badge: 'NA CZYM MOŻESZ POLEGAĆ',
        text: L.resolveGender(`${hubIntro} ${hubProf.topRole}`, gender),
        sourceEdges: formatPathString([hubKey], byKey, L),
        focusPlanet: hubKey
      },
      {
        badge: 'GDZIE TRACISZ NAJWIĘCEJ ENERGII',
        text: L.resolveGender(`${tensionOpening} W znaku ${L.signCase(leadP.signKey, 'D')} ${leadSignP.trap || ''}. ${leadProf.discomforts[0]} ${secondDiscomfort}`, gender),
        sourceEdges: formatPathString(analysis.primaryCycle, byKey, L),
        focusPlanet: leadKey
      }
    ];

    const vTrace = trace('venus');
    const vP = byKey.venus;
    const vSignP = getSignProf(data, vP);
    const mP = byKey.moon;
    const mSignP = getSignProf(data, mP);
    const mTrace = trace('moon');
    const vRule = rules.VENUS_RULER_MODES[vTrace.endKey] || '';
    const vLead = L.describeSingleControl('venus', vP.signKey, vTrace.endKey, 'jest we własnym znaku i sama dyktuje warunki', 'podlega');
    const mLead = mTrace.endKey === 'moon'
      ? `Księżyc ${L.signIn(mP.signKey)} jest u siebie i sam pilnuje Twojego bezpieczeństwa`
      : `Księżyc ${L.signIn(mP.signKey)} podlega ${L.planetCase(mTrace.endKey, 'C')}`;
    const venusOpening = vTrace.path.includes('moon')
      ? `Twoja ${vLead}: ${vRule}, więc bliskość łączy się tu wprost z poczuciem domowego zaufania.`
      : `Twoja ${vLead}: ${vRule}.`;
    const romanceBlocks = [
      {
        badge: 'CZEGO SZUKASZ W RELACJI (WENUS)',
        text: L.resolveGender(`${venusOpening} Z natury Wenus ${L.signIn(vP.signKey)} ${vSignP.love || ''}. ${leadProf.romanceAxis}`, gender),
        sourceEdges: formatPathString(vTrace.path, byKey, L),
        focusPlanet: 'venus'
      },
      {
        badge: 'JAK REAGUJESZ NA CHŁÓD I NAPIĘCIE (KSIĘŻYC)',
        text: L.resolveGender(`${mLead}. Przy Księżycu ${L.signIn(mP.signKey)} w stresie ${mSignP.emotion || ''}, a wpływ ${L.planetCase(mTrace.endKey, 'D')} ${data.PLANET_PROFILES[mTrace.endKey].asFilter}`, gender),
        sourceEdges: formatPathString(mTrace.path, byKey, L),
        focusPlanet: 'moon'
      }
    ];

    const marTrace = trace('mars');
    const merTrace = trace('mercury');
    const merSignP = getSignProf(data, byKey.mercury);
    const conflictText = L.describePairControl(
      'mercury', byKey.mercury.signKey, merTrace.endKey,
      'mars', byKey.mars.signKey, marTrace.endKey,
      rules.DISPUTE_STYLES
    );
    const sameVenusMars = cur.visitedGlobal.venus === cur.visitedGlobal.mars;
    const socialBridge = sameVenusMars
      ? `Wenus (${L.signIn(vP.signKey)}) oraz Mars (${L.signIn(byKey.mars.signKey)}) spotykają się we wspólnym nurcie, więc łatwość nawiązywania kontaktu idzie u Ciebie w parze z obroną granic.`
      : `Wenus (${L.signIn(vP.signKey)}) oraz Mars (${L.signIn(byKey.mars.signKey)}) działają z osobnych ośrodków: inaczej dobierasz znajomych do rozmów, a inaczej zamykasz drzwi po zawodzie.`;

    const friendBlocks = [
      {
        badge: 'JAK ZACHOWUJESZ SIĘ W KŁÓTNI',
        text: L.resolveGender(`${conflictText} Przy ${L.planetInSign('mercury', byKey.mercury.signKey, 'Ms')} styl rozmowy ${merSignP.style || ''}${byKey.mercury.isRetrograde ? ' (retrogradacja Merkurego skłania do przemyślenia riposty po czasie)' : ''}.`, gender),
        sourceEdges: `${formatPathString(merTrace.path, byKey, L)} | ${formatPathString(marTrace.path, byKey, L)}`,
        focusPlanet: 'mercury'
      },
      {
        badge: 'KOGO DOPUSZCZASZ BLISKO',
        text: L.resolveGender(`${socialBridge} ${vSignP.peerRole ? capFirst(vSignP.peerRole) + '.' : ''} ${leadProf.friendshipAxis}`, gender),
        sourceEdges: formatPathString(['mars', marTrace.endKey], byKey, L),
        focusPlanet: 'mars'
      }
    ];

    return [
      { id: 'intro', num: '01', tabLabel: '01. Wprowadzenie', heading: 'Kto Naprawdę Pociąga za Sznurki', isFree: true, blocks: introBlocks },
      { id: 'strengths', num: '02', tabLabel: '02. Siła i Pułapki', heading: 'Twoje Atuty i Wzorce Sabotażu', isFree: false, blocks: strengthsBlocks },
      { id: 'romance', num: '03', tabLabel: '03. Miłość i Bliskość', heading: 'Styl Przywiązania, Lęk i Granice w Parze', isFree: false, blocks: romanceBlocks },
      { id: 'friendships', num: '04', tabLabel: '04. Przyjaźnie i Spory', heading: 'Komunikacja w Sporze i Dobór Sojuszy', isFree: false, blocks: friendBlocks }
    ];
  }

  window.__DISPOSITOR_REPORT_NLG_DATA__.helpers = { formatPathString, formatBasinsCode, buildSectionsPart1 };
})();
