/**
 * NEOROMANTYCZNY — THE CHRONOS PROTOCOL (PART 1: CHAPTER I & II)
 * Dynamiczne rozdziały I-II bez duplikacji darmowych opisów i bez stałego wieku 28-30
 */
(function () {
  function getChapter1(ctx, satPlanet) {
    const C = window.SATURN_CYCLES_DATA || {};
    const f = ctx.facts;
    const cyc = (C.cycles && C.cycles[f.cycleNum]) || C.cycles[1];
    const timelineTxt = (C.timelinePhases && C.timelinePhases[f.timeline.phase]) || '';
    const patternTxt = (C.passPatterns && C.passPatterns[f.timeline.passPattern]) || '';
    const edgeTxt = f.timeline.nearEdge && C.edgeWarning ? C.edgeWarning[f.timeline.nearEdge] : '';
    const sectTxt = f.hasTime && f.sect && window.SATURN_DIGNITY_DATA.sect
      ? window.SATURN_DIGNITY_DATA.sect[f.sect].text
      : 'Brak podanej godziny urodzenia wyłącza ocenę sekty wykresu (dzienny/nocny), dlatego poniższy raport opiera się wyłącznie na zweryfikowanej geometrii znaku i aspektów.';

    const sections = [
      {
        heading: `1. Kontekst Cyklu (${cyc.ageLabel})`,
        text: `${cyc.summary} ${C.sadeSatiNote || ''}`
      },
      {
        heading: '2. Mechanika Twojej Osi Czasu i Wzorzec Przejścia',
        text: `${patternTxt} ${timelineTxt}${edgeTxt ? ' ' + edgeTxt : ''}`
      },
      {
        heading: '3. Profil Funkcjonowania pod Presją',
        text: `Dominujący sposób działania to <strong>${ctx.profile.role.name}</strong> — oś przełomu koncentruje się wokół ${ctx.profile.role.domain} (${ctx.profile.strategy.name.toLowerCase()}). ${sectTxt}`
      }
    ];

    ctx.markConveyed('ch1_cycle_timeline');
    return {
      number: 'Rozdział I',
      title: cyc.headline,
      lead: `Pozycja natalna: Saturn w znaku ${satPlanet.signName} (${satPlanet.degreeInSign}) • ${ctx.evidenceLine}.`,
      sections
    };
  }

  function getHouseGuidelines(houseNum, houseData, ctx) {
    const f = ctx.facts;
    if (!f.hasTime) {
      return {
        houseName: 'Tryb Bez Godziny Urodzenia (Sektor Domowy Wstrzymany)',
        battlefield: 'Ponieważ nie podano dokładnej godziny narodzin, system celowo nie przypisuje Saturna do żadnego z 12 domów — wykres na sztywną godzinę 12:00 wygenerowałby fałszywy Ascendent i błędny sektor życia.',
        auditMandate: 'W tym trybie pełny ciężar analizy przenosi się na znak Saturna, jego dyspozytora, aspekty z pozostałymi planetami oraz dokładny rytm uderzeń czasowych.',
        dangerZone: 'Najczęstszym błędem przy nieznanej godzinie jest dopasowywanie na siłę opisów konkretnego domu (np. 1. czy 10.) zamiast obserwowania realnych twardych aspektów.',
        strategicVictory: `Gdy zdobędziesz godzinę z aktu urodzenia, odblokujesz także domową mapę sektora, kątowość oraz Roczną Profekcję.${f.moonBoundary.uncertain ? ` Uwaga: w dniu Twoich narodzin Księżyc zmieniał znak (${f.moonBoundary.signStart} → ${f.moonBoundary.signEnd}).` : ''}`
      };
    }

    const h = houseData || {};
    const angNote = (window.SATURN_DIGNITY_DATA.angularity && window.SATURN_DIGNITY_DATA.angularity[f.angularity]) || '';
    const directive = ctx.directives[0] ? ctx.directives[0].text : '';
    ctx.markConveyed('ch2_house_operational');

    return {
      houseName: `${houseNum}. Dom — ${h.title || ''}`,
      battlefield: `${h.battlefieldScenario || ''} ${angNote}`.trim(),
      auditMandate: h.costlyMistake || 'Unikanie jasnych granic w sprawach tego domu podnosi koszt późniejszej korekty.',
      dangerZone: h.operationalProtocol || 'Wprowadź policzalny termin i jasny podział odpowiedzialności w tym obszarze.',
      strategicVictory: `${h.relationalImpact || ''} ${directive}`.trim()
    };
  }

  window.SATURN_PROTOCOL_PART1 = {
    meta: { title: 'The Chronos Protocol — Audyt Powrotu Saturna', version: '3.0' },
    getChapter1,
    chapter2: {
      number: 'Rozdział II',
      title: 'Operacyjna Mapa Sektora',
      getHouseGuidelines
    }
  };
})();
