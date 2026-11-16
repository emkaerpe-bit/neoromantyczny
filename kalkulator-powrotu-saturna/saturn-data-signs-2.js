(function () {
  window.SATURN_SIGNS_DATA = window.SATURN_SIGNS_DATA || {};

  const SIGNS_PART_2 = {
    Libra: {
      sign: 'Waga',
      archetype: 'Żywioł Powietrza • Jakość kardynalna',
      dignityStatus: 'Wywyższenie',
      wound: 'Zbyt wiele cichego napięcia w otoczeniu utrwaliło lęk, że każdy spór oznacza koniec więzi. Od wczesnych lat bierzesz odpowiedzialność za nastrój w pokoju kosztem własnych granic.',
      preReturnArmor: 'Zgadzasz się na asymetryczne umowy zawodowe i relacje bez równowagi, uśmiechając się uprzejmie wtedy, gdy wewnątrz narasta złość o brak wzajemności.',
      auditCrisis: 'W trakcie Powrotu Saturna każda przemilczana nierówność w partnerstwie lub spółce pęka z hukiem. Życie sprawdza, czy potrafisz odmówić jasno bez poczucia winy.',
      matureGift: 'Zyskujesz takt i siłę dojrzałego mediatora, który zawiera uczciwe sojusze bez poświęcania własnego kręgosłupa dla cudzej wygody.',
      lifeLesson: 'Trwały związek powstaje wyłącznie tam, gdzie obie strony znają dokładną cenę swoich granic i szanują wzajemne „nie”.'
    },
    Scorpio: {
      sign: 'Skorpion',
      archetype: 'Żywioł Wody • Jakość stała',
      dignityStatus: 'Peregryn',
      wound: 'Pamięć sytuacji, w których otwartość obrócono przeciwko Tobie lub zerwano więź bez uprzedzenia, wykształciła nawyk prześwietlania cudzych motywów jeszcze przed uściskiem dłoni.',
      preReturnArmor: 'Trzymasz karty przy piersi w sprawach finansowych i uczuciowych, sprawdzając lojalność otoczenia testami milczenia albo unikając pełnego zaufania ze strachu przed zdradą.',
      auditCrisis: 'Wspólne rozliczenia, kredyty, podatki lub głębokie próby intymności zmuszają do zejścia z wieży obserwacyjnej i nazwania lęku wprost.',
      matureGift: 'Przekształcasz podejrzliwość w spokojną przenikliwość: umiesz rozmawiać o pieniądzach, strachu i pożądaniu bez manipulacji oraz gier o przewagę.',
      lifeLesson: 'Całkowita kontrola chroni przed zranieniem jedynie za cenę samotności; zaufanie zaczyna się tam, gdzie przestajesz sprawdzać intencje pod lupą.'
    },
    Sagittarius: {
      sign: 'Strzelec',
      archetype: 'Żywioł Ognia • Jakość zmienna',
      dignityStatus: 'Peregryn',
      wound: 'Puste obietnice autorytetów albo narzucanie ciasnych dogmatów bez miejsca na pytania zaszczepiły w Tobie nieufność wobec wielkich planów i lęk przed uwiązaniem w jednym punkcie.',
      preReturnArmor: 'Kiedy w pracy lub relacji robi się ciasno, zmieniasz miasto, kierunek studiów albo partnera, nazywając ucieczkę potrzebą rozwoju i szukaniem wolności.',
      auditCrisis: 'Powrót Saturna zatrzymuje Cię w miejscu bez bocznego wyjścia. Musisz zostać przy jednym projekcie lub jednej więzi wystarczająco długo, by zebrać plon nudnej systematyczności.',
      matureGift: 'Łączysz szerokie horyzonty z twardą etyką pracy: przestajesz wyłącznie szkicować wizje, bo zaczynasz dowozić wymierne efekty miesiąc po miesiącu.',
      lifeLesson: 'Wolność bez zakorzenienia zamienia się w bezcelowe krążenie; dopiero wybrany kierunek i wierność jemu nadają drodze ciężar gatunkowy.'
    },
    Capricorn: {
      sign: 'Koziorożec',
      archetype: 'Żywioł Ziemi • Jakość kardynalna',
      dignityStatus: 'Domicyl',
      wound: 'Wczesna presja, by zawsze zachowywać się jak najrozsądniejsza osoba w domu i nie sprawiać kłopotu, wpoiła przekonanie, że na odpoczynek trzeba zasłużyć latami wyrzeczeń.',
      preReturnArmor: 'Wyciskasz z siebie nadgodziny ponad miarę i mierzysz własną wartość wyłącznie pozycją w hierarchii, spychając bliskość, sen i przyjemność na koniec kolejki.',
      auditCrisis: 'Zdobyte szczyty bez osobistej satysfakcji wymuszają rewizję priorytetów. Jeśli fundamentem ambicji był lęk przed bezwartościowością, cała konstrukcja zaczyna trzeszczeć.',
      matureGift: 'Stajesz się spokojnym architektem długiej gry, który równie mądrze zarządza zespołem i własnym prawem do regeneracji.',
      lifeLesson: 'Dojrzałość przychodzi w chwili, gdy budujesz własne życie z szacunku do energii, kończąc udowadnianie czegokolwiek surowym głosom z przeszłości.'
    },
    Aquarius: {
      sign: 'Wodnik',
      archetype: 'Żywioł Powietrza • Jakość stała',
      dignityStatus: 'Domicyl',
      wound: 'Poczucie bycia obserwatorem z innego świata w grupie rówieśniczej nauczyło Cię, że bezkrytyczne dopasowanie grozi utratą własnego głosu. Chłód intelektualny stał się bezpiecznym schronieniem.',
      preReturnArmor: 'Stoisz z boku wydarzeń, analizując ludzi i trendy z ironicznego dystansu, byle nie przywiązać się za mocno i nie uzależnić przyszłości od wspólnych struktur.',
      auditCrisis: 'Tranzyt wrzuca Cię w obowiązek współtworzenia trwałego zespołu, rodziny lub instytucji, z których nie da się wycofać samą teorią. Liczy się obecność na miejscu.',
      matureGift: 'Wcielasz odważne pomysły w stabilne projekty i sojusze, zachowując niezależność myśli połączoną z lojalnością wobec żywych ludzi.',
      lifeLesson: 'Oryginalność sprawdza się dopiero wśród realnych zobowiązań, gdzie Twoja wizja służy komuś więcej niż własnemu dystansowi.'
    },
    Pisces: {
      sign: 'Ryby',
      archetype: 'Żywioł Wody • Jakość zmienna',
      dignityStatus: 'Peregryn',
      wound: 'Wysoka wrażliwość chłonęła napięcia otoczenia bez żadnego filtra, przez co twarda rzeczywistość wydawała się zbyt głośna. Szukasz wtedy ukojenia w marzeniach albo rozmytych obietnicach.',
      preReturnArmor: 'Odsuwasz od siebie rachunki, trudne terminy i przyziemne obowiązki, licząc po cichu, że chaos rozwiąże się sam albo wyręczy Cię bardziej zaradny partner.',
      auditCrisis: 'Brak jasnych umów, zaległości i rozczarowanie w relacjach bez granic zmuszają do stanięcia na ziemi i uporządkowania codzienności punkt po punkcie.',
      matureGift: 'Oprawiasz intuicję w czytelny harmonogram pracy, budżetu i higieny snu — dzięki temu Twoja empatia leczy innych bez wypalania Ciebie.',
      lifeLesson: 'Wrażliwość bez jasnych granic tonie w chaosie; prosty plan dnia chroni wyobraźnię lepiej niż ucieczka od trudnych faktów.'
    }
  };

  Object.assign(window.SATURN_SIGNS_DATA, SIGNS_PART_2);
})();
