(function () {
  window.SATURN_SIGNS_DATA = window.SATURN_SIGNS_DATA || {};

  const SIGNS_PART_2 = {
    Libra: {
      sign: 'Waga',
      archetype: 'Archetyp: Dyplomata',
      dignityStatus: 'Wywyższenie (Exaltation)',
      wound: 'Widziałeś zbyt wiele cichego napięcia między bliskimi i uwierzyłeś, że konflikt oznacza koniec więzi. Od wczesnych lat bierzesz odpowiedzialność za nastrój w pokoju kosztem własnych granic.',
      preReturnArmor: 'Przed trzydziestką zgadzasz się na niekorzystne umowy zawodowe oraz asymetryczne związki, uśmiechając się uprzejmie wtedy, gdy wewnątrz narasta złość o brak wzajemności.',
      auditCrisis: 'W trakcie Powrotu Saturna każda niedopowiedziana nierówność w partnerstwie lub spółce pęka z hukiem. Życie sprawdza, czy potrafisz podpisać jasne warunki i odmówić bez poczucia winy.',
      matureGift: 'Zyskujesz charyzmę dojrzałego negocjatora, który zawiera uczciwe sojusze bez poświęcania własnego kręgosłupa dla cudzej wygody.',
      lifeLesson: 'Trwały związek powstaje wyłącznie wtedy, gdy obie strony znają dokładną cenę swoich granic i respektują wzajemne „nie”.'
    },
    Scorpio: {
      sign: 'Skorpion',
      archetype: 'Archetyp: Strateg',
      dignityStatus: 'Wodny Kryzys Kontroli',
      wound: 'Doświadczyłeś sytuacji, w której otwartość obrócono przeciwko Tobie lub przerwano więź bez ostrzeżenia. Zbudowałeś nawyk czytania ukrytych motywów ludzi, zanim jeszcze podadzą Ci rękę.',
      preReturnArmor: 'Do 28. roku życia trzymasz karty przy piersi w finansach i uczuciach, sprawdzając lojalność partnerów testami milczenia albo unikając pełnego zaangażowania ze strachu przed zdradą.',
      auditCrisis: 'Między 28. a 30. rokiem życia rozliczenia podatkowe, kredyty, głębokie kryzysy intymności lub zazdrość zmuszają Cię do zejścia z wieży obserwacyjnej i nazwania lęku wprost.',
      matureGift: 'Przekształcasz podejrzliwość w przenikliwą odwagę — umiesz rozmawiać o pieniądzach, strachu i pożądaniu bez manipulacji oraz gier o władzę.',
      lifeLesson: 'Całkowita kontrola chroni przed zranieniem jedynie za cenę samotności; zaufanie zaczyna się tam, gdzie przestajesz sprawdzać intencje pod lupą.'
    },
    Sagittarius: {
      sign: 'Strzelec',
      archetype: 'Archetyp: Wizjoner',
      dignityStatus: 'Ognista Dyscyplina Sensu',
      wound: 'Obietnice autorytetów okazywały się puste albo narzucano Ci ciasny światopogląd bez miejsca na pytania. W dorosłość weszłeś z nieufnością wobec wielkich planów i lękiem przed uwiązaniem w jednym miejscu.',
      preReturnArmor: 'Kiedy w pracy lub relacji robi się ciężko, zmieniasz miasto, kierunek studiów albo partnera, nazywając ucieczkę potrzebą rozwoju i szukaniem wyższej wolności.',
      auditCrisis: 'Powrót Saturna zatrzymuje Cię w miejscu bez drogi ewakuacyjnej. Musisz zostać przy jednym projekcie albo jednym związku wystarczająco długo, żeby zobaczyć owoce nudnej systematyczności.',
      matureGift: 'Łączysz szerokie horyzonty z konkretną etyką pracy — przestajesz tylko snuć wizje, bo zaczynasz dowozić realne wyniki miesiąc po miesiącu.',
      lifeLesson: 'Wolność bez zakorzenienia zamienia się w bezcelowe krążenie; dopiero wybrany kierunek i wierność jemu nadają drodze znaczenie.'
    },
    Capricorn: {
      sign: 'Koziorożec',
      archetype: 'Archetyp: Architekt',
      dignityStatus: 'Władztwo (Domicile)',
      wound: 'Od najmłodszych lat czułeś presję, by być najrozsądniejszą osobą w domu i nie sprawiać kłopotów. Zaszczepiło to w Tobie przekonanie, że odpoczynek jest lenistwem, na które trzeba zasłużyć latami wyrzeczeń.',
      preReturnArmor: 'Przed trzydziestką wyciskasz z siebie nadgodziny ponad miarę i mierzysz własną wartość wyłącznie pozycją w hierarchii, spychając bliskość, ciało i przyjemność na koniec listy.',
      auditCrisis: 'Około dwudziestego dziewiątego roku życia pusta góra zdobytych celów bez satysfakcji osobistej wymusza rewizję priorytetów. Jeśli fundamentem kariery był lęk przed bezwartościowością, konstrukcja trzeszczy.',
      matureGift: 'Stajesz się spokojnym architektem długoterminowego sukcesu, który umie równie mądrze zarządzać firmą, jak i własnym czasem na odpoczynek.',
      lifeLesson: 'Dojrzałość przychodzi w chwili, gdy budujesz własne życie z szacunku do swojej energii, zamykając rozdział udowadniania czegokolwiek surowym głosom z przeszłości.'
    },
    Aquarius: {
      sign: 'Wodnik',
      archetype: 'Archetyp: Reformator',
      dignityStatus: 'Władztwo Tradycyjne (Domicile)',
      wound: 'W grupie rówieśniczej czułeś się jak obserwator z innego świata i szybko zrozumiałeś, że bezkrytyczne dopasowanie oznacza utratę własnego głosu. Chłód intelektualny stał się sposobem na przetrwanie.',
      preReturnArmor: 'Do 28. roku życia stoisz z boku wydarzeń, analizując ludzi i trendy z ironicznego dystansu, byle nie przywiązać się za mocno i nie uzależnić swojej przyszłości od wspólnych struktur.',
      auditCrisis: 'Powrót Saturna wrzuca Cię w obowiązek budowania konkretnego zespołu, rodziny lub społecznego zobowiązania, z którego nie można wycofać się samą teorią. Liczy się obecność tu i teraz.',
      matureGift: 'Wcielasz nowoczesne pomysły w stabilne instytucje i przyjaźnie, zachowując pełną niezależność myśli połączoną z lojalnością wobec konkretnych ludzi.',
      lifeLesson: 'Prawdziwa oryginalność sprawdza się dopiero wśród żywych relacji i realnych zobowiązań, gdzie Twoja wizja służy komuś więcej niż własnemu ego.'
    },
    Pisces: {
      sign: 'Ryby',
      archetype: 'Archetyp: Mistyk',
      dignityStatus: 'Wodna Struktura Formy',
      wound: 'Twoja wrażliwość chłonęła napięcia otoczenia bez żadnego filtra, przez co rzeczywistość często wydawała się zbyt głośna i brutalna. Szukałeś ukojenia w marzeniach lub rozmytych obietnicach.',
      preReturnArmor: 'Przed trzydziestką odsuwasz od siebie rachunki, trudne daty i prozaiczne obowiązki, licząc po cichu, że chaos rozwiąże się sam albo wyręczy Cię bardziej zaradny partner.',
      auditCrisis: 'Między 28. a 30. rokiem życia brak jasnych umów, zaległości i rozczarowanie w relacjach bez granic zmuszają Cię do twardego stanięcia na ziemi i uregulowania własnej codzienności.',
      matureGift: 'Nadajesz swojej intuicji konkretny harmonogram pracy, budżetu i higieny snu — dzięki temu Twoja empatia leczy innych bez wypalania Ciebie samego.',
      lifeLesson: 'Wrażliwość bez jasnych granic tonie w chaosie; twardy plan dnia chroni Twoją wyobraźnię lepiej niż ucieczka od trudnych faktów.'
    }
  };

  Object.assign(window.SATURN_SIGNS_DATA, SIGNS_PART_2);
})();
