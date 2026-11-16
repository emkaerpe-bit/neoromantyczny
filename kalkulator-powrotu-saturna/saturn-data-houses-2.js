(function () {
  window.SATURN_HOUSES_DATA = window.SATURN_HOUSES_DATA || {};

  const HOUSES_PART_2 = {
    7: {
      house: 7,
      title: 'Związki Partnerskie, Małżeństwo i Spółki',
      area: 'Bliskie relacje jeden na jeden, umowy małżeńskie i biznesowe, równowaga brania i dawania.',
      meaning: 'Wahasz się między wysokim murem dystansu a wchodzeniem w układy, w których udowadniasz użyteczność zamiast oczekiwać równego partnerstwa.',
      audit: 'Tranzyt weryfikuje każdy niedomówiony układ w parze i w spółce. Więzi podtrzymywane wyłącznie przyzwyczajeniem albo lękiem przed samotnością wymagają nowej umowy.',
      gift: 'Budujesz dojrzałą relację opartą na wzajemnym szacunku, jasnych granicach oraz współodpowiedzialności obu stron za wspólny kurs.',
      battlefieldScenario: 'Asymetria wkładu w związku lub firmie staje się niemożliwa do przeoczenia: ciche napięcie wychodzi na jaw podczas kryzysu codziennych obowiązków.',
      costlyMistake: 'Testowanie lojalności drugiej osoby milczeniem albo godzenie się na krzywdzące warunki, żeby tylko uniknąć otwartego sporu.',
      operationalProtocol: 'Przeprowadź rzeczową rozmowę o wspólnych celach, finansach oraz podziale zadań i nazwij granice, których nie zamierzasz przekraczać.',
      relationalImpact: 'Relacja przechodzi z romantycznej mgły w świadome przymierze: albo obie strony biorą odpowiedzialność, albo odchodzą z szacunkiem.'
    },
    8: {
      house: 8,
      title: 'Intymność, Wspólne Finanse i Kryzysy',
      area: 'Kredyty, podatki, wspólny majątek, głęboka bliskość oraz lęk przed oddaniem kontroli.',
      meaning: 'Najtrudniejszym krokiem jest obdarzenie drugiej osoby zaufaniem tam, gdzie w grę wchodzą wspólne pieniądze, przyszłość lub odsłonięcie słabości.',
      audit: 'Na wierzch wychodzą kwestie długów, spadków, wspólnego budżetu albo tłumionej zazdrości. Odkładanie trudnych rozliczeń przestaje chronić przed stratą.',
      gift: 'Zyskujesz psychiczną odporność w sytuacjach granicznych, trzeźwość w zarządzaniu kapitałem oraz odważną bliskość wolną od manipulacji.',
      battlefieldScenario: 'Wspólne zobowiązanie finansowe, sprawa spadkowa lub kryzys zaufania wymuszają odsłonięcie kart, które dotąd pozostawały w cieniu.',
      costlyMistake: 'Ukrywanie rzeczywistego stanu długów lub używanie przewagi materialnej jako cichego zabezpieczenia przed bliskością.',
      operationalProtocol: 'Uporządkuj zaległe kwestie prawno-podatkowe z doradcą i ćwicz mówienie o lęku oraz zazdrości wprost, bez ukrytych testów.',
      relationalImpact: 'Oczyszczenie finansowe i emocjonalne zdejmuje z pary ciężar podejrzliwości, otwierając przestrzeń na prawdziwą lojalność.'
    },
    9: {
      house: 9,
      title: 'Światopogląd, Prawo, Studia i Kierunek',
      area: 'System wartości, edukacja wyższa, sprawy urzędowe, dalekie podróże oraz filozofia życiowa.',
      meaning: 'Zamiast sprawdzać jedną drogę w praktyce, wahasz się między cynicznym sceptycyzmem wobec idei a sztywnym trzymaniem się cudzych autorytetów.',
      audit: 'Sprawdzian obejmuje studia, certyfikaty, procedury prawne lub emigrację. Teoria bez pokrycia w praktyce kruszy się w zderzeniu z rzeczywistością.',
      gift: 'Wypracowujesz spójny kompas moralny i praktyczną ekspertyzę, ucząc innych poprzez własne doświadczenie zamiast książkowych haseł.',
      battlefieldScenario: 'Wielka wizja zderza się z formalnościami, barierą językową albo koniecznością potwierdzenia kwalifikacji twardym egzaminem.',
      costlyMistake: 'Ucieczka w kolejny kurs, certyfikat lub daleki wyjazd dokładnie w momencie, gdy trzeba dokończyć rozpoczęte dzieło na miejscu.',
      operationalProtocol: 'Wybierz jedną specjalizację wartą wieloletniej pracy, zamknij zaległe sprawy urzędowe i zamień poglądy w namacalny warsztat.',
      relationalImpact: 'Rozmowy z partnerem i otoczeniem zyskują spójny horyzont etyczny; przestajesz szukać guru poza własnym doświadczeniem.'
    },
    10: {
      house: 10,
      title: 'Kariera, Powołanie i Status Publiczny',
      area: 'Pozycja zawodowa, reputacja w branży, ambicje życiowe oraz relacja z przełożonymi.',
      meaning: 'Towarzyszy Ci presja, że osiągnięcia wciąż nie dorastają do oczekiwań — przez to bierzesz niepasujące stanowiska albo sabotujesz awans z lęku przed oceną.',
      audit: 'Widowiskowy punkt zwrotny cyklu: jeśli wspinasz się po cudzej drabinie dla aprobaty otoczenia, nadchodzi pora zmiany branży lub przejęcia własnych sterów.',
      gift: 'Osiągasz trwałą pozycję zawodową opartą na własnym nazwisku, rzetelności i umiejętności prowadzenia zespołu ze spokojnym autorytetem.',
      battlefieldScenario: 'Konflikt z przełożonym, wypalenie w prestiżowej roli albo nagły awans bez gotowego zaplecza stawiają pytanie o sens Twojej marki.',
      costlyMistake: 'Trwanie latami w cieniu mniej kompetentnych osób z obawy przed odpowiedzialnością lub gwałtowne rzucanie posady bez planu awaryjnego.',
      operationalProtocol: 'Spisz cel zawodowy na najbliższe trzy lata, wystąp o adekwatny zakres decyzyjności lub uruchom własny projekt krok po kroku.',
      relationalImpact: 'Odejście od pogoni za zewnętrznym poklaskiem zmniejsza napięcie w domu i pozwala jasno rozdzielić urząd od życia prywatnego.'
    },
    11: {
      house: 11,
      title: 'Przyjaźnie, Społeczność i Plany na Dekadę',
      area: 'Kręgi towarzyskie, sieć zawodowa, praca grupowa i długofalowa wizja przyszłości.',
      meaning: 'W grupach przyjmujesz rolę chłodnego obserwatora z obawy, że głębsze wejście we wspólnotę skończy się rozczarowaniem lub utratą niezależności.',
      audit: 'Krąg znajomych naturalnie się przerzedza: przypadkowe kontakty bez wspólnych zasad odchodzą, zostawiając miejsce dla nielicznych, rzetelnych sojuszników.',
      gift: 'Otaczasz się ludźmi o podobnej etyce działania i tworzysz realistyczne plany, w których współpraca wzmacnia wolność zamiast ją ograniczać.',
      battlefieldScenario: 'Wspólny projekt środowiskowy pęka przez brak jasnych ról, a część dawnych znajomości okazuje się jednostronnym pożeraczem czasu.',
      costlyMistake: 'Stanie zawsze na uboczu zespołu z poczucia wyższości lub odwrotnie — branie odpowiedzialności za chaos całej grupy.',
      operationalProtocol: 'Zainwestuj energię w trzy sprawdzone relacje branżowe, określ wykonalny plan celów na dekadę i odetnij puste spotkania.',
      relationalImpact: 'Zyskujesz grono dorosłych sojuszników, przy których nie musisz zmniejszać ambicji ani udawać bezproblemowej zgody.'
    },
    12: {
      house: 12,
      title: 'Podświadomość, Wyciszenie i Ukryte Nawyki',
      area: 'Niewidoczne mechanizmy samosabotażu, regeneracja psychiczna, lęki nocne oraz praca za kulisami.',
      meaning: 'Najwięcej sił ucieka po cichu na wewnętrznego krytyka i wyparte żale, które rzadko trafiają do głośnej rozmowy z kimkolwiek.',
      audit: 'Saturn zaprasza do bezlitosnej, lecz uzdrawiającej szczerości ze sobą podczas samotnych wieczorów lub terapii. Przemęczenie zmusza do zdjęcia nogi z gazu.',
      gift: 'Odkrywasz niewzruszony spokój wewnętrzny, kończysz nawyk podcinania sobie skrzydeł i budujesz trzeźwą intuicję odporną na chaos.',
      battlefieldScenario: 'Bezsenność, nagły spadek motywacji do głośnych projektów lub powracające echa dawnych porażek wyciągają na wierzch potrzebę zatrzymania.',
      costlyMistake: 'Zapychanie każdej wolnej chwili kolejnymi zadaniami, ekranem lub używkami, żeby tylko nie usłyszeć własnych myśli w ciszy.',
      operationalProtocol: 'Ogranicz toksyczne bodźce, wprowadź higienę snu i nazwij powtarzalne nawyki ucieczkowe podczas terapii albo szczerych zapisków.',
      relationalImpact: 'Koniec cichego wycofywania się w urazę: uczysz się prosić o przestrzeń bez zrywania kontaktu z bliskimi.'
    }
  };

  Object.assign(window.SATURN_HOUSES_DATA, HOUSES_PART_2);
})();
