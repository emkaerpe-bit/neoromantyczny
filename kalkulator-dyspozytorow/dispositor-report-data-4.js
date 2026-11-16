(function () {
  'use strict';
  window.__DISPOSITOR_REPORT_NLG_DATA__ = window.__DISPOSITOR_REPORT_NLG_DATA__ || {};

  const VENUS_RULER_MODES = {
    sun: 'szukasz w relacji dumy i otwartego podziwu — chłodna obojętność partnera potrafi zamknąć Twoje uczucie w jedną noc',
    moon: 'łączysz bliskość z potrzebą bezpiecznego domu, dlatego na brak ciepła reagujesz cichym wycofaniem i zamykaniem emocji',
    mercury: 'musisz najpierw czuć lekkość rozmowy i wspólne poczucie humoru, zanim pozwolisz sobie na pełne zaufanie',
    venus: 'oczekujesz równej wymiany i klasy w codzienności, a przy powtarzalnym braku szacunku wycofujesz się bez awantury',
    mars: 'przyspieszasz tempo relacji, wnosząc szczery ogień oraz gotowość do krótkiego sporu zamiast wielodniowego focha',
    jupiter: 'potrzebujesz przestrzeni do wspólnego rozwoju, wyjazdów oraz poczucia sensu większego niż zwykłe zakupy',
    saturn: 'sprawdzasz lojalność w trudniejszych miesiącach — liczysz realne czyny i dotrzymane słowo w miejsce pięknych obietnic',
    uranus: 'bronisz wolności w związku, przez co próby kontrolowania Twojego czasu wywołują nagły dystans lub ucieczkę',
    neptune: 'czytając półtony, łatwo idealizujesz nową osobę na początku znajomości, zanim sprawdzisz jej codzienne nawyki',
    pluto: 'odrzucasz puste flirty na rzecz pełnej głębi, wymagając bezwzględnej szczerości bez ukrywania intencji'
  };

  const DISPUTE_STYLES = {
    sun: 'w sporze bronisz swojej godności i źle znosisz publiczne podważanie własnych decyzji przy innych',
    moon: 'pod presją wycofujesz się w długie milczenie i pamiętasz chłód w tonie głosu znacznie dłużej niż same argumenty',
    mercury: 'zamiast krzyczeć, spokojnie wytykasz luki w faktach oraz sprzeczne zdania drugiej osoby',
    venus: 'łagodzisz napięcie uprzejmością, ale po przekroczeniu miary po prostu odcinasz dostęp do swojej uwagi',
    mars: 'wolisz krótką, otwartą rozmowę twarzą w twarz niż wielodniowe obrażanie się w ciszy',
    jupiter: 'bronisz szerszej zasady i szybko tracisz cierpliwość do kłótni o drobne formalności',
    saturn: 'wyłączasz emocje w ułamku sekundy i przechodzisz na chłodny, rzeczowy komunikat z twardą granicą',
    uranus: 'ucinasz rozmowę i zmieniasz kierunek jednym ruchem, gdy ktoś próbuje wymusić na Tobie uległość',
    neptune: 'unikasz ostrych starć, odkładając trudną rozmowę tak długo, aż napięcie samo zmusi Cię do działania',
    pluto: 'celujesz spokojnym słowem w najczulszy punkt rozmówcy, odkrywając ukryty interes stojący za sporem'
  };

  const MOON_SATURN_PATTERNS = {
    moonUnderSaturn: 'W Twoim układzie Księżyc słucha Saturna, więc troska o bliskich ma twardą formę: dajesz realne oparcie oraz wyraźną strukturę dnia, choć trudniej przychodzi Ci okazywanie miękkości w słabszą chwilę.',
    saturnUnderMoon: 'Saturn podlega tutaj Księżycowi, dlatego nawet surowe wymagania stawiasz przez pryzmat atmosfery w domu oraz ochrony bliskiej więzi.',
    sameBasin: 'Księżyc i Saturn spływają do wspólnego ośrodka, dzięki czemu codzienna czułość współpracuje z poczuciem obowiązku bez ciągłego rozszczepienia reguł.',
    splitBasins: 'Księżyc oraz Saturn rządzą z osobnych ośrodków, więc przy bliskich stale szukasz równowagi między ciepłą spontanicznością a surową dyscypliną.'
  };

  const ITC_NOTICES = {
    epistemic: 'Raport opisuje dynamikę charakteru według reguł astrologicznych — nie zastępuje diagnozy psychologicznej ani klinicznej.',
    romance: 'Opis pokazuje indywidualny styl relacji oraz reakcji na napięcie — o dopasowaniu pary decyduje porównanie dwóch kart.',
    career: 'Opis dotyczy rytmu pracy i źródeł zmęczenia — nie zastępuje twardych kwalifikacji zawodowych.',
    noTime: 'Bez godziny urodzenia obliczenia przyjmują południe (12:00) — bez Władcy Ascendentu piąty wymiar pozostaje nieaktywny.'
  };

  const SIGN_ELEMENTS = {
    Aries: 'fire', Leo: 'fire', Sagittarius: 'fire',
    Taurus: 'earth', Virgo: 'earth', Capricorn: 'earth',
    Gemini: 'air', Libra: 'air', Aquarius: 'air',
    Cancer: 'water', Scorpio: 'water', Pisces: 'water'
  };

  const CRISIS_END_BEHAVIOR = {
    sun: 'bronisz własnego zdania oraz godności i przestajesz dostosowywać się do cudzych oczekiwań',
    moon: 'zamykasz dostęp do swoich emocji i sprawdzasz intencje rozmówcy z bezpiecznej odległości',
    mercury: 'porządkujesz napięcie chłodnymi faktami i wyłapujesz sprzeczności zamiast ulegać emocjom',
    venus: 'szukasz uczciwej proporcji albo po cichu wygaszasz zaangażowanie bez awantury',
    mars: 'przestajesz łagodzić ton i przechodzisz od razu do bezpośredniego rozstrzygnięcia sporu',
    jupiter: 'stawiasz sprawę szerzej, wymagając przestrzeni i rezygnując z drobiazgowych targów',
    saturn: 'odcinasz zbędne obietnice i stawiasz twardą granicę opartą na realnych kosztach',
    uranus: 'ucinasz układ jednym krótkim ruchem, gdy tylko poczujesz próbę kontroli',
    neptune: 'wycofujesz się za cichą zasłonę milczenia lub odkładasz ostrą decyzję na później',
    pluto: 'sięgasz w sam środek ukrytego problemu i odrzucasz półśrodki bez sentymentu'
  };

  function buildAxisNarrative(axis, gender, analysis, chart) {
    const L = window.__DISPOSITOR_LEXICON__;
    if (!axis.available) return ITC_NOTICES.noTime;
    const S = window.__DISPOSITOR_ASTRO_STATS__;
    const astro = (analysis && analysis.astro) || {};
    const elemPct = astro.elemPct || { fire: 25, earth: 25, air: 25, water: 25 };
    const modPct = astro.modPct || { cardinal: 33, fixed: 34, mutable: 33 };
    const topSigns = astro.topSigns || [];
    const top1Sign = topSigns[0] ? L.signCase(topSigns[0].signKey, 'D') : 'Barana';
    const top2Sign = topSigns[1] ? L.signCase(topSigns[1].signKey, 'D') : top1Sign;
    const domPl = (astro.dominantPlanets && astro.dominantPlanets[0]) || { key: 'sun', signKey: 'Aries' };
    const cur = (analysis && analysis.cur) || {};
    const byKey = (analysis && analysis.byKey) || {};
    const p = Number(axis.pct) || 0;

    if (axis.id === 'centralization') {
      const cycCount = (cur.cycles && cur.cycles.length) || 2;
      const torLabel = L.cldrPlural(cycCount, { one: '# osobny tor', few: '# osobne tory', many: '# osobnych torów', other: '# osobnego toru' });
      const txt = p >= 57
        ? `Skupienie w znakach ${top1Sign} oraz ${top2Sign} wraz z jakością stałą (${modPct.fixed}%) łączy decyzje wokół ${L.planetInSign(domPl.key, domPl.signKey, 'D')}.`
        : (p <= 43
          ? `Jakość zmienna (${modPct.mutable}%) i rozkład poza znakiem ${top1Sign} dzielą siły między ${torLabel}.`
          : `Znaki ${top1Sign} i ${top2Sign} tworzą rdzeń z udziałem jakości stałej (${modPct.fixed}%), równoważąc rozproszenie karty.`);
      return L.resolveGender(txt, gender);
    }
    if (axis.id === 'loopTension') {
      const txt = p >= 57
        ? `Przewaga Powietrza (${elemPct.air}%) i Wody (${elemPct.water}%) każe najpierw przeanalizować tło decyzji, zanim zrobisz krok.`
        : (p <= 43
          ? `Silny Ogień (${elemPct.fire}%) i Kardynalność (${modPct.cardinal}%) przyspieszają rozstrzygnięcie jeszcze przed długimi naradami.`
          : `Ogień (${elemPct.fire}%) równoważy tu namysł Wody i Powietrza (${elemPct.air + elemPct.water}%), dając wyważone tempo wyboru.`);
      return L.resolveGender(txt, gender);
    }
    if (axis.id === 'hierarchyDepth') {
      const satDig = (astro.dignities && astro.dignities.saturn) ? astro.dignities.saturn.label : 'neutralna';
      const txt = p >= 57
        ? `Ziemia (${elemPct.earth}%) wraz z pozycją Saturna (${satDig}) i głębokością łańcucha filtrują pierwszy zryw przed działaniem.`
        : (p <= 43
          ? `Przy mniejszym udziale Ziemi (${elemPct.earth}%) oraz żywym Ogniem (${elemPct.fire}%) impuls szybciej zamienia się w czyn.`
          : `Ziemia (${elemPct.earth}%) oraz Ogień (${elemPct.fire}%) utrzymują średnią drogę filtra między odruchem a decyzją.`);
      return L.resolveGender(txt, gender);
    }
    if (axis.id === 'modernDrift') {
      const urP = byKey.uranus;
      const urTxt = urP ? L.planetInSign('uranus', urP.signKey, 'D') : 'Urana';
      const airFire = elemPct.air + elemPct.fire;
      const txt = p >= 57
        ? `Jakość zmienna (${modPct.mutable}%) i żywioły ruchu (${airFire}% Powietrze+Ogień) przy roli ${urTxt} ciągną Cię ku zmianom.`
        : (p <= 43
          ? `Ziemia (${elemPct.earth}%) wraz z jakością stałą (${modPct.fixed}%) chronią sprawdzone nawyki przed pochopną rewolucją.`
          : `Stałość Ziemi (${elemPct.earth}%) i jakości stałej (${modPct.fixed}%) równoważy tu zmienność (${modPct.mutable}%) oraz ${urTxt}.`);
      return L.resolveGender(txt, gender);
    }
    const ascName = chart && chart.ascSign ? L.signCase(chart.ascSign.key, 'Ms') : 'Baranie';
    const rKey = analysis.ascRulerKey || 'sun';
    const rSign = byKey[rKey] ? byKey[rKey].signKey : 'Aries';
    const sunEl = S && byKey.sun ? S.LABELS_PL.elem[S.SIGN_ELEMENT[byKey.sun.signKey]] : 'Ogień';
    const ascEl = S && chart && chart.ascSign ? S.LABELS_PL.elem[S.SIGN_ELEMENT[chart.ascSign.key]] : sunEl;
    return L.resolveGender(p >= 57
      ? `Ascendent w ${ascName} (${ascEl}) współgra ze Słońcem (${sunEl}) poprzez ${L.planetInSign(rKey, rSign, 'B')}, utrzymując spójną linię pod presją.`
      : `Żywioł Ascendentu (${ascEl} przez ${L.planetInSign(rKey, rSign, 'B')}) różni się od osi Słońca (${sunEl}), zmieniając ton reakcji w stresie.`, gender);
  }

  function buildAxisPopup(axis, analysis, chart) {
    const L = window.__DISPOSITOR_LEXICON__;
    const S = window.__DISPOSITOR_ASTRO_STATS__;
    const astro = analysis.astro || { elemPct: {}, modPct: {}, topSigns: [], dominantPlanets: [], dignities: {} };
    const { elemPct, modPct, topSigns, dominantPlanets, dignities } = astro;
    const { cur, byKey, changedEdges, primaryCycle } = analysis;

    const top3Signs = (topSigns || []).slice(0, 3).map(s => `${L.signCase(s.signKey, 'M')} (${s.pct}%)`).join(', ');
    const top3Pl = (dominantPlanets || []).slice(0, 3).map(p => `${L.planetCase(p.key, 'M')} ${L.signIn(p.signKey)} [${p.dignity.label}]`).join('; ');

    const top2Sum = (topSigns[0] ? topSigns[0].pct : 0) + (topSigns[1] ? topSigns[1].pct : 0);
    if (axis.id === 'centralization') {
      return {
        title: `Skąd ${axis.pct}% w Osi Decyzji?`,
        formula: `Stała ${modPct.fixed}% vs Zmienna ${modPct.mutable}% • Top 2 znaki: ${top2Sum}%`,
        facts: [
          `Najsilniejsze znaki wykresu: ${top3Signs}.`,
          `Dominujące planety (z godnością): ${top3Pl}.`
        ]
      };
    }
    if (axis.id === 'loopTension') {
      const cycTxt = primaryCycle.map(k => L.planetCase(k, 'M')).join(primaryCycle.length === 2 ? ' ↔ ' : ' → ');
      const domEl = S ? S.LABELS_PL.elem[astro.dominantElem] : '';
      const domMd = S ? S.LABELS_PL.mod[astro.dominantMod] : '';
      return {
        title: `Skąd wynik Sposobu Wyboru?`,
        formula: `Ogień ${elemPct.fire}% + Kard. ${modPct.cardinal}% vs Powietrze+Woda ${elemPct.air + elemPct.water}%`,
        facts: [
          `Wiodący żywioł: ${domEl} (${elemPct[astro.dominantElem]}%), dominująca jakość: ${domMd} (${modPct[astro.dominantMod]}%).`,
          `Szybkość korygują Mars (${dignities.mars ? dignities.mars.label : 'neutralna'}) oraz obieg szczytu (${cycTxt}).`
        ]
      };
    }
    if (axis.id === 'hierarchyDepth') {
      const tr = analysis.trace(analysis.deepestLeaf);
      const chain = tr.path.map(k => `${L.planetCase(k, 'M')} (${byKey[k].signName})`).join(' → ');
      const satDig = dignities.saturn ? dignities.saturn.label : 'neutralna';
      return {
        title: `Skąd wynik Filtra Impulsów?`,
        formula: `Ziemia ${elemPct.earth}% (Saturn: ${satDig}) vs Ogień ${elemPct.fire}% • Śr. głębokość: ${astro.avgDepth || 0}`,
        facts: [
          `Ziemia (${elemPct.earth}%) i siła Saturna dodają kontroli; Ogień (${elemPct.fire}%) i Mars przyspieszają czyn.`,
          cur.maxDepth > 0 ? `Najdłuższy łańcuch w karcie: ${chain}.` : 'Wszystkie planety stoją bezpośrednio w cyklu końcowym.'
        ]
      };
    }
    if (axis.id === 'modernDrift') {
      const chNames = changedEdges.length ? L.joinList(changedEdges.map(k => L.planetCase(k, 'M')), 'i') : 'brak zmian';
      const urDig = dignities.uranus ? dignities.uranus.label : 'neutralna';
      return {
        title: `Skąd ${axis.pct}% w Nawykach a Zmianie?`,
        formula: `Ziemia+Stała (${elemPct.earth}% / ${modPct.fixed}%) vs Powietrze+Zmienna (${elemPct.air}% / ${modPct.mutable}%)`,
        facts: [
          `Potencjalną potrzebę zmian wzmacniają Powietrze (${elemPct.air}%), Uran (${urDig}) oraz ruch między szkołami (${chNames}).`,
          `Stałość nawyków zakotwiczają Ziemia (${elemPct.earth}%) i znaki jakości stałej (${modPct.fixed}%).`
        ]
      };
    }
    if (!axis.available) {
      return {
        title: 'Dlaczego wymiar Twarz a Kryzys jest ukryty?',
        formula: 'Brak godziny urodzenia w formularzu',
        facts: ['Ocena spójności wymaga Ascendentu oraz jego żywiołu, jakości i godności Władcy Ascendentu.']
      };
    }
    const rKey = analysis.ascRulerKey;
    const ascEl = S ? S.LABELS_PL.elem[S.SIGN_ELEMENT[chart.ascSign.key]] : '';
    const sunEl = S && byKey.sun ? S.LABELS_PL.elem[S.SIGN_ELEMENT[byKey.sun.signKey]] : '';
    const moonEl = S && byKey.moon ? S.LABELS_PL.elem[S.SIGN_ELEMENT[byKey.moon.signKey]] : '';
    const ascDig = dignities[rKey] ? dignities[rKey].label : 'neutralna';
    const rTr = analysis.trace(rKey);
    return {
      title: `Skąd ${axis.pct}% w Twarzy a Kryzysie?`,
      formula: `Ascendent (${ascEl}) vs Słońce (${sunEl}) i Księżyc (${moonEl})`,
      facts: [
        `Władca Ascendentu to ${L.planetInSign(rKey, byKey[rKey].signKey, 'M')} [${ascDig}].`,
        `W napięciu kierunek zamyka ${L.planetInSign(rTr.endKey, byKey[rTr.endKey].signKey, 'M')} (${ascEl === sunEl ? 'zgodny żywioł ze Słońcem wzmacnia spójność' : 'różnica żywiołów ze Słońcem zmienia reakcję pod presją'}).`
      ]
    };
  }

  window.__DISPOSITOR_REPORT_NLG_DATA__.PAIR_AND_AXIS_RULES = {
    VENUS_RULER_MODES, DISPUTE_STYLES, MOON_SATURN_PATTERNS, ITC_NOTICES,
    SIGN_ELEMENTS, CRISIS_END_BEHAVIOR, buildAxisNarrative, buildAxisPopup
  };
})();
