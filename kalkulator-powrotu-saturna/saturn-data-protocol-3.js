/**
 * NEOROMANTYCZNY — THE CHRONOS PROTOCOL (PART 3: 4 DOMAINS & CHAPTER V)
 * Domyka 8 obszarów 16P oraz dynamiczne podsumowanie cyklu bez powtórzeń
 */
(function () {
  function findAsp(aspects, key) {
    return (aspects || []).find(a => a.planet === key);
  }

  function buildLifeDomains(ctx, satPlanet) {
    const f = ctx.facts;
    const asps = f.visibleAspects || [];
    const venusAsp = findAsp(asps, 'venus');
    const moonAsp = findAsp(asps, 'moon');
    const sunAsp = findAsp(asps, 'sun');
    const marsAsp = findAsp(asps, 'mars');
    const jupAsp = findAsp(asps, 'jupiter');

    let relations = 'Relacje i Zobowiązania: ';
    if (venusAsp || moonAsp) {
      const target = venusAsp ? `Wenus (${venusAsp.aspectName}, orb ${Math.abs(parseFloat(venusAsp.exactOrb)).toFixed(1)}°)` : `Księżyca (${moonAsp.aspectName}, orb ${Math.abs(parseFloat(moonAsp.exactOrb)).toFixed(1)}°)`;
      relations += `Aktywny kontakt do ${target} bezpośrednio filtruje bliskość — sprawdzian dotyczy lojalności w trudnych chwilach oraz odwagi mówienia wprost o potrzebach.`;
    } else if (f.hasTime && [5, 7, 8].includes(f.houseNum)) {
      relations += `Położenie Saturna w ${f.houseNum}. domu stawia bliskie związki oraz wspólne decyzje w samym centrum weryfikacji całego okresu.`;
    } else {
      relations += 'W tym wykresie partnerstwo sprawdza się przede wszystkim przez spójność między słowem a codzienną obecnością oraz brak przemilczeń finansowych.';
    }

    const social = 'Przyjaźnie i Społeczność: ' + (ctx.profile.stratKey.startsWith('Z')
      ? `Twój styl (${ctx.profile.strategy.name}) skłania do aktywnego porządkowania kręgów zawodowych i selekcji sojuszników, którzy dowożą ustalenia.`
      : `Przy strategii (${ctx.profile.strategy.name}) naturalnie ograniczasz liczbę powierzchownych spotkań, stawiając na garstkę sprawdzonych osób.`)
      + (jupAsp ? ` Kontakt Jowisz–Saturn (${jupAsp.aspectName}) uczy równowagi między własną autonomią a odpowiedzialnością grupową.` : '');

    let roots = 'Korzenie, Rodzina i Autorytet: ';
    if (f.isNatalRx) {
      roots += 'Natalny Saturn Rx uwypukla napięcie z dawnymi wzorcami autorytetu: zamiast szukać pozwolenia na własny głos, oddzielasz swój realny standard od krytycznych ech z domu.';
    } else if (sunAsp || f.sunProximity !== 'free') {
      roots += 'Ścisła relacja ze Słońcem stawia na ostrzu noża temat szacunku do przełożonych i przejścia z roli ucznia na własną pozycję decyzyjną.';
    } else if (f.hasTime && (f.houseNum === 4 || f.houseNum === 10)) {
      roots += `Oś ${f.houseNum}. domu wyciąga wprost sprawy granic rodzinnych oraz odpowiedzialności pod własnym nazwiskiem.`;
    } else {
      roots += 'Audyt wymaga spokojnego oddzielenia starych lojalności rodzinnych od decyzji podejmowanych z myślą o Twojej własnej przyszłości.';
    }

    const cycCareer = (window.SATURN_CYCLES_DATA.cycles[f.cycleNum] || window.SATURN_CYCLES_DATA.cycles[1]).careerFocus;
    const profText = f.profection && f.profection.doubleActivation
      ? ` Dodatkowo Roczna Profekcja aktywuje ${f.profection.profHouse}. dom z Saturnem jako Władcą Roku — unikaj gwałtownych zmian w szczycie orbu ±1°–2°.`
      : ' Większe decyzje zawodowe podejmuj po spokojnym policzeniu rezerwy czasowej oraz budżetowej.';
    const marsText = marsAsp ? ` Aspekt z Marsem (${marsAsp.aspectName}) uczy rozkładać energię na długi dystans bez nerwowych zrywów.` : '';
    const careerAndHabits = `Ścieżka Kariery i Nawyki Pracy: ${cycCareer}${profText}${marsText}`;

    return [relations, social, roots, careerAndHabits];
  }

  function getChapter5(ctx) {
    const f = ctx.facts;
    const cyc = (window.SATURN_CYCLES_DATA.cycles[f.cycleNum] || window.SATURN_CYCLES_DATA.cycles[1]);
    const isS = ctx.axes.stability.modifier === 'S';
    const subMap = {
      1: 'Siedem reguł pozwalających przejść pierwszy próg dorosłości z własnym kręgosłupem.',
      2: 'Siedem reguł ochrony dorobku, zdrowia i spokojnego starszeństwa w drugim cyklu.',
      3: 'Siedem prostych zasad porządku, spokoju i akceptacji w dojrzałym bilansie.'
    };
    const rule1Title = f.cycleNum === 1 ? 'Koniec szukania winnych w przeszłości' : 'Decyzje oparte na tym, co jest teraz';
    const rule1Desc = f.cycleNum === 1
      ? 'Nieważne, jak rozłożono karty na starcie młodości. Od chwili tego przejścia długopis spoczywa w Twojej dłoni, a szukanie winnych z przeszłości oddaje innym ster nad dniem dzisiejszym.'
      : 'Bogate doświadczenie ubiegłych dekad staje się zasobem tylko wtedy, gdy służy świadomym wyborom dzisiaj, zamiast ciążyć jako lista niespełnionych oczekiwań.';

    const rules = [
      { num: 'I', title: rule1Title, desc: rule1Desc },
      { num: 'II', title: 'Jasne liczby, terminy i pisemne umowy', desc: 'Zanim złożysz podpis albo obietnicę, policz realny czas i koszt. Przejrzyste rachunki oraz uporządkowana dokumentacja dają spokojniejszy sen niż najpiękniejsze deklaracje.' },
      { num: 'III', title: 'Codzienna regularność ważniejsza niż szybki efekt', desc: 'Trwały dorobek rośnie w ciszy powtarzalnych tygodni. Kto potrafi pielęgnować warsztat bez potrzeby natychmiastowego poklasku, tego nie wywróci chwilowe zawirowanie.' },
      { num: 'IV', title: 'Sen, zdrowie i regeneracja jako stały punkt dnia', desc: 'Kręgosłup, zęby, stawy i regeneracja pamiętają każdą zarwaną noc. Traktuj sen oraz ruch jak warunek utrzymania jasności umysłu, a nie nagrodę po zakończeniu pracy.' },
      { num: 'V', title: 'Znajomości podtrzymywane szacunkiem, nie przyzwyczajeniem', desc: 'Odsuń znajomości utrzymywane wyłącznie z litości albo starego przyzwyczajenia. Zostaw w pobliżu ludzi, przy których możesz mówić wprost bez pomniejszania własnych celów.' },
      { num: 'VI', title: 'Najpierw wykonanie, potem ogłaszanie planów', desc: 'Nie rozdaj energii na głośne przechwałki, zanim projekt nie stanie na twardym fundamencie. Spokojne wykonanie buduje autorytet szybciej niż najefektowniejsza zapowiedź.' },
      { num: 'VII', title: 'Koniec czekania, aż ktoś załatwi to za Ciebie', desc: 'Uwalniająca prawda tego cyklu brzmi prosto: nikt z zewnątrz nie przeżyje za Ciebie codziennych wyborów. Gdy przestajesz czekać na pozwolenie, zaczynasz naprawdę prowadzić własne życie.' }
    ];

    const closingSummary = isS
      ? `${cyc.closingPerspective} Profil skonsolidowany (-S) sprzyja wzmacnianiu tego, co już działa — skoryguj jedynie pojedyncze nieszczelne granice bez wyburzania zdrowych filarów.`
      : `${cyc.closingPerspective} Profil turbulentny (-T) oznacza, że presja odsiać ma rozwiązania tymczasowe; to, co przetrwa korektę po wyjściu z orbu ±5°, stanie się wyjątkowo odporne na przyszłość.`;

    return { number: 'Rozdział V', title: '7 Żelaznych Reguł Dojrzałości', subtitle: subMap[f.cycleNum] || subMap[1], rules, closingSummary };
  }

  window.SATURN_PROTOCOL_PART3 = { buildLifeDomains, getChapter5 };
})();
