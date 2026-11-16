/**
 * NEOROMANTYCZNY — SATURN 16P SCORING, CONFLICT RESOLVER & CONVEYED-FACTS TRACKER
 */
(function () {
  function clamp(lo, hi, v) { return Math.max(lo, Math.min(hi, Math.round(v))); }

  function shadeTier(pct) {
    const d = Math.abs(pct - 50);
    if (d <= 7) return 'borderline';
    if (d <= 24) return 'moderate';
    return 'dominant';
  }

  function computeAxes(facts, satPlanet) {
    const digMap = { domicile: 28, exaltation: 22, peregrine: 0, fall: -18, detriment: -22 };
    const angBias = facts.angularity === 'angular' ? 22 : (facts.angularity === 'cadent' ? -18 : 2);
    const rxBias = facts.isNatalRx ? -20 : 14;
    const sunBias = facts.sunProximity === 'under_beams' ? -10 : (facts.sunProximity === 'cazimi' ? 8 : 0);
    const expression = clamp(8, 92, 50 + angBias + rxBias + sunBias);

    const dispBonus = (facts.dispDignity === 'domicile' || facts.dispDignity === 'exaltation') ? 12 : (facts.dispDignity === 'fall' || facts.dispDignity === 'detriment' ? -10 : 0);
    const recBonus = facts.mutualReception ? 14 : 0;
    const resource = clamp(8, 92, 50 + (digMap[facts.dignityKey] || 0) + dispBonus + recBonus);

    let hardW = 0, softW = 0;
    (facts.visibleAspects || []).forEach(a => {
      const orb = Math.abs(parseFloat(a.exactOrb) || 5);
      const w = Math.max(1, 8 - orb);
      if (a.aspectType === 'hard') hardW += w;
      else softW += w;
    });
    const sectFriction = facts.sect === 'night' ? 12 : (facts.sect === 'day' ? -8 : 0);
    const aspectFriction = clamp(8, 92, 48 + (hardW - softW) * 2.4 + sectFriction);

    const passBias = facts.timeline.passPattern === 'triple_retrograde' ? 18 : -16;
    const profBias = (facts.profection && facts.profection.doubleActivation) ? 20 : 0;
    const peakBias = facts.timeline.phase === 'peak_orb' ? 14 : 0;
    const timeDensity = clamp(8, 92, 50 + passBias + profBias + peakBias);

    const stabilityScore = 52
      + (facts.sect === 'day' ? 14 : (facts.sect === 'night' ? -14 : 0))
      + (digMap[facts.dignityKey] || 0) * 0.6
      + (facts.isNatalRx ? -10 : 6)
      + recBonus
      - Math.min(24, hardW * 1.1)
      + Math.min(18, softW * 0.9);
    const stability = clamp(8, 92, stabilityScore);
    const modifier = stability >= 50 ? 'S' : 'T';

    return {
      expression: { pct: expression, tier: shadeTier(expression), side: expression >= 50 ? 'Ekspresja Zewnętrzna' : 'Praca Wewnętrzna' },
      resource: { pct: resource, tier: shadeTier(resource), side: resource >= 50 ? 'Zasób Struktury' : 'Zasób Adaptacji' },
      aspectFriction: { pct: aspectFriction, tier: shadeTier(aspectFriction), side: aspectFriction >= 50 ? 'Tarcie Aspektowe' : 'Wsparcie Kątowe' },
      timeDensity: { pct: timeDensity, tier: shadeTier(timeDensity), side: timeDensity >= 50 ? 'Skumulowana Presja' : 'Rytm Rozłożony' },
      stability: { pct: stability, tier: shadeTier(stability), modifier, side: modifier === 'S' ? 'Skonsolidowany (-S)' : 'Turbulentny (-T)' }
    };
  }

  function classifyRoleAndStrategy(axes, facts, satPlanet) {
    const ext = axes.expression.pct >= 50;
    const str = axes.resource.pct >= 50;
    let roleKey = 'RW';
    if (ext && str) roleKey = 'AS';
    else if (ext && !str) roleKey = 'SS';
    else if (!ext && str) roleKey = 'SG';

    const stratKey = (ext ? 'Z' : 'W') + '-' + axes.stability.modifier;
    const code = `${roleKey}-${axes.stability.modifier}`;
    const ROLES = {
      AS: { name: 'Jawna odpowiedzialność', domain: 'trwałe systemy i decyzje widoczne na zewnątrz' },
      SS: { name: 'Praca przez relacje', domain: 'negocjacje, rola społeczna i granice w układach' },
      SG: { name: 'Cichy warsztat', domain: 'samodzielne rzemiosło i własny standard działania' },
      RW: { name: 'Wewnętrzna przebudowa', domain: 'korekta nawyków i odcięcie narzuconych ról' }
    };
    const STRATEGIES = {
      'Z-S': { name: 'Spokojne porządkowanie', mode: 'jawne domykanie umów i stopniowe przejmowanie sterów' },
      'Z-T': { name: 'Stanowcza korekta', mode: 'korekta napiętych układów pod presją widocznych wydarzeń' },
      'W-S': { name: 'Systematyczny rytm', mode: 'metodyczne domykanie zaległości we własnym tempie' },
      'W-T': { name: 'Wyciszenie presji', mode: 'oddzielenie faktów od nadmiernego samokrytycyzmu' }
    };
    return {
      code, roleKey, stratKey, modifier: axes.stability.modifier,
      role: ROLES[roleKey], strategy: STRATEGIES[stratKey]
    };
  }

  function resolveConflicts(facts, axes, satPlanet, dispInfo) {
    const directives = [];
    if ((facts.dignityKey === 'domicile' || facts.dignityKey === 'exaltation') && facts.isNatalRx) {
      directives.push({
        id: 'high_dignity_rx',
        title: 'Wysokie narzędzia przy wewnętrznym hamulcu (Rx)',
        text: 'Posiadasz silne zaplecze do budowania własnej pozycji, lecz ruch wsteczny kieruje wymagania do środka i uruchamia wątpliwość, czy masz prawo stanąć na czele. Zamiast kopiować cudze szczeble awansu, buduj kompetencje na własnych zasadach.'
      });
    }
    if (facts.isSelfRuled) {
      directives.push({
        id: 'self_ruled',
        title: 'Samodzielna instancja decyzji',
        text: 'Saturn włada własnym znakiem, więc zewnętrzny pośrednik nie przejmie ciężaru wyborów. Korekta przychodzi wyłącznie przez własną konsekwencję w kalendarzu oraz rezygnację z szukania zezwolenia u starszych rangą.'
      });
    } else if (facts.mutualReception || facts.dispDignity === 'domicile' || facts.dispDignity === 'exaltation') {
      directives.push({
        id: 'mitigated_friction',
        title: 'Czynnik łagodzący przez dyspozytora',
        text: `Choć sam punkt Saturna może generować tarcie, mocna pozycja ${dispInfo ? dispInfo.name : 'jego władcy'}${facts.mutualReception ? ' we wzajemnej recepcji' : ''} zamienia ślepą blokadę w wyjście przez mądre negocjacje, umowę lub celową współpracę.`
      });
    }
    if (facts.sunProximity === 'cazimi') {
      directives.push({ id: 'cazimi', title: 'Ścisłe Cazimi ze Słońcem', text: 'Bliskość jądra Słońca daje wyjątkową klarowność woli: gdy oddzielisz własny cel od presji ojca lub przełożonych, zyskujesz precyzję decyzji rzadko spotykaną u rówieśników.' });
    } else if (facts.sunProximity === 'under_beams') {
      directives.push({ id: 'under_beams', title: 'Saturn pod promieniami Słońca', text: 'Bliskie sąsiedztwo Słońca (≤17°) bywa jak praca w zbyt jaskrawym świetle reflektorów: łatwo czuć, że autorytet przygniata spontaniczność, dopóki nie wyznaczysz własnej strefy działania.' });
    }
    if (facts.profection && facts.profection.doubleActivation) {
      directives.push({ id: 'double_profection', title: 'Podwójna aktywacja Roczną Profekcją', text: `Obecny rok życia aktywuje ${facts.profection.profHouse}. dom horoskopu i oddaje ster Czasu bezpośrednio Saturnowi. Zbieg tranzytu z Władcą Roku zagęszcza wydarzenia i przyspiesza decyzje zawodowe.` });
    }
    if (!directives.length) {
      directives.push({
        id: 'balanced_synthesis',
        title: `Wektor ${axes.stability.side}`,
        text: axes.stability.modifier === 'S'
          ? 'Warunki wykresu sprzyjają spokojnej konsolidacji: zamiast gwałtownego wyburzania dotychczasowej ścieżki wystarczy konsekwentnie usunąć nieszczelne zobowiązania.'
          : 'Układ niesie podwyższone tarcie, które nie oznacza porażki: wymaga po prostu większej dyscypliny odpoczynku i rezygnacji z półśrodków.'
      });
    }
    return directives;
  }

  function buildContext(input) {
    const facts = window.SaturnContextFacts.extractFacts(input);
    const axes = computeAxes(facts, input.satPlanet);
    const profile = classifyRoleAndStrategy(axes, facts, input.satPlanet);
    const directives = resolveConflicts(facts, axes, input.satPlanet, input.dispInfo);

    const conveyed = new Set();
    const locMap = (window.SaturnDispositor && window.SaturnDispositor.SIGN_LOCATIVE) || {};
    const signLoc = locMap[input.satPlanet.signKey] || input.satPlanet.signName;
    const signPhrase = input.satPlanet.signKey === 'Leo' ? 'Saturn we Lwie' : `Saturn w ${signLoc}`;
    const angLabel = facts.angularity === 'angular' ? 'kątowy' : (facts.angularity === 'succedent' ? 'następujący' : 'upadający');

    const evidenceChips = [
      { label: signPhrase, tipKey: 'dignity_' + facts.dignityKey },
      facts.hasTime
        ? { label: `${facts.houseNum}. dom (${angLabel})`, tipKey: 'house_' + facts.angularity }
        : { label: 'tryb bez godziny', tipKey: 'houseSystem' },
      facts.sect
        ? { label: facts.sect === 'day' ? 'wykres dzienny (w sekcie)' : 'wykres nocny (poza sektą)', tipKey: 'sect_' + facts.sect }
        : null,
      { label: facts.isNatalRx ? 'natalny Saturn Rx' : 'natalny Saturn prosty', tipKey: facts.isNatalRx ? 'natal_rx' : 'natal_direct' },
      { label: facts.timeline.passPattern === 'triple_retrograde' ? 'pętla 3 przejść' : 'pojedyncze przejście', tipKey: facts.timeline.passPattern === 'triple_retrograde' ? 'pass_triple' : 'pass_single' },
      (facts.profection && facts.profection.doubleActivation) ? { label: `profekcja: ${facts.profection.profHouse}. dom`, tipKey: 'profection' } : null
    ].filter(Boolean);

    const evidenceParts = evidenceChips.map(c => c.label);

    return {
      facts, axes, profile, directives, evidenceChips,
      evidenceLine: evidenceParts.join(' • '),
      markConveyed: (k) => conveyed.add(k),
      hasConveyed: (k) => conveyed.has(k)
    };
  }

  window.SaturnContext = { buildContext };
})();
