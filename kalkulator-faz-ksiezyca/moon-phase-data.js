/**
 * BAZA WIEDZY KALKULATORA FAZ KSIĘŻYCA DNIA NARODZIN (SOULMATE MOON PHASE)
 * Dojrzała, ludzka narracja relacyjna — bez podręcznikowych schematów.
 */

window.MOON_PHASE_DATA = {
  phases: [
    {
      id: 'new_moon',
      name: 'Nów Księżyca',
      enName: 'New Moon',
      angleRange: [0, 45],
      icon: '✦',
      archetype: 'Cisza Przed Pierwszym Słowem',
      loveStyle: 'Wchodzi w bliskość bez gotowych reguł i cudzych oczekiwań. Najbardziej kocha moment, w którym świat za oknem przestaje istnieć — nocne rozmowy w zaparkowanym aucie, pakowanie walizek na ostatnią chwilę i poczucie, że budujecie coś zupełnie własnego. Nie znosi udawania przed znajomymi ani życia według cudzego kalendarza.',
      shadowHabit: 'Kiedy czuje, że ktoś próbuje go kontrolować albo zasypuje pretensjami, nie robi scen. Po prostu gaśnie, odkłada telefon ekranem do dołu i zamyka się w sobie tak szczelnie, że trudno do niego zapukać.'
    },
    {
      id: 'waxing_crescent',
      name: 'Przybywający Sierp',
      enName: 'Waxing Crescent',
      angleRange: [45, 90],
      icon: '☽',
      archetype: 'Głód Nowego Horyzontu',
      loveStyle: 'Kocha ruch, obietnicę jutra i napięcie tuż przed tym, jak coś się wydarzy. Wnosi do domu energię człowieka, który zawsze ma w głowie kolejny krok: zmianę mieszkania, nową podróż, wspólny cel. Przyciągają go ludzie z iskrą w oku, którzy czegoś od życia chcą i nie boją się zaryzykować.',
      shadowHabit: 'Najtrudniej znosi stagnację. Gdy w związku przez wiele tygodni nic się nie zmienia, zaczyna szukać dziury w całym tylko po to, by znów poczuć żywe emocje.'
    },
    {
      id: 'first_quarter',
      name: 'Pierwsza Kwadra',
      enName: 'First Quarter',
      angleRange: [90, 135],
      icon: '◑',
      archetype: 'Miłość Jako Decyzja',
      loveStyle: 'Nie wierzy w puste zapewnienia — wierzy w czyny. Kiedy wokół Was wali się świat, to właśnie ta osoba zachowuje trzeźwą głowę, załatwia sprawy i staje za Tobą murem. W relacji potrzebuje partnera z kręgosłupem, z którym można się uczciwie pokłócić o osiemnastej, a o dwudziestej zjeść razem kolację bez chowania urazy.',
      shadowHabit: 'W stresie zamienia się w sztab kryzysowy. Zamiast po prostu usiąść obok i przytulić, od razu szuka rozwiązań, daje rady i niecierpliwi się, gdy druga strona potrzebuje po prostu popłakać.'
    },
    {
      id: 'waxing_gibbous',
      name: 'Przybywający Księżyc Garbaty',
      enName: 'Waxing Gibbous',
      angleRange: [135, 180],
      icon: '◕',
      archetype: 'Czułość w Detalach',
      loveStyle: 'Widzi rzeczy, których inni nawet nie rejestrują: minimalną zmianę w Twoim głosie przez telefon, to, jak odkładasz kubek, gdy jesteś zmęczony, albo o czym wspomniałeś mimochodem trzy miesiące temu. Kocha poprzez uważność i dbanie o to, by między Wami nie zostało nic niedopowiedzianego.',
      shadowHabit: 'Potrafi zamęczyć siebie i partnera rozkładaniem każdego zdania na czynniki pierwsze. Jedno krótsze „dobranoc” w wiadomości wystarczy, by przez pół nocy zastanawiał się, co poszło nie tak.'
    },
    {
      id: 'full_moon',
      name: 'Pełnia Księżyca',
      enName: 'Full Moon',
      angleRange: [180, 225],
      icon: '●',
      archetype: 'Życie w Pełnym Świetle',
      loveStyle: 'Urodzeni podczas Pełni noszą w sobie naturalne napięcie między sercem a rozumem, dlatego najpełniej ożywają dopiero w obecności drugiego człowieka. Nie potrafią kochać na pół gwizdka. Jeśli są z Tobą, oddają całą swoją uwagę, pasję i lojalność, oczekując w zamian dokładnie takiej samej prawdy.',
      shadowHabit: 'Trudno im znieść chłód i obojętność. Milczenie partnera odbierają jak fizyczny cios, dlatego czasem wolą wywołać burzę, niż siedzieć w pokoju pełnym niedomówień.'
    },
    {
      id: 'waning_gibbous',
      name: 'Ubywający Księżyc Garbaty',
      enName: 'Waning Gibbous',
      angleRange: [225, 270],
      icon: '◔',
      archetype: 'Bezpieczna Przystań',
      loveStyle: 'Ma w sobie dojrzałe ciepło kogoś, przed kim nie trzeba niczego udawać. Przy tej osobie opadają maski, zwalnia oddech i nagle okazuje się, że o najtrudniejszych rzeczach można porozmawiać przy herbacie o drugiej w nocy. Kocha mądrze, cierpliwie i z ogromnym szacunkiem do ludzkich słabości.',
      shadowHabit: 'Zbyt często bierze na siebie ciężar cudzych nastrojów. Tak długo tłumaczy, rozumie i usprawiedliwia partnera, aż w końcu zapomina powiedzieć, czego sama potrzebuje.'
    },
    {
      id: 'last_quarter',
      name: 'Trzecia Kwadra',
      enName: 'Last Quarter',
      angleRange: [270, 315],
      icon: '◐',
      archetype: 'Wierność Bez Złudzeń',
      loveStyle: 'Nie kupisz go tanim komplementem ani teatralnym gestem. Ceni ludzi prawdziwych, ma świetny, nieco ironiczny zmysł obserwacji i daje w związku rzadkie poczucie solidności. Jeśli wpuści Cię do swojego świata, możesz na nim polegać w każdej życiowej zawierusze — pod warunkiem, że zostawisz mu przestrzeń na własny oddech.',
      shadowHabit: 'Gdy poczuje się zraniony lub przyparty do muru, w ułamku sekundy włącza chłodny, rzeczowy ton. Z zewnątrz wygląda wtedy jak skała, choć w środku wszystko w nim drży.'
    },
    {
      id: 'waning_crescent',
      name: 'Ubywający Sierp (Balsamiczny)',
      enName: 'Waning Crescent',
      angleRange: [315, 360],
      icon: '☾',
      archetype: 'Pamięć Podskórna',
      loveStyle: 'Wyczuwa nastrój w mieszkaniu, zanim jeszcze przekręci klucz w zamku. Nie potrzebuje wielu słów ani wielkich wyjść — najbliżej czuje się wtedy, gdy możecie leżeć obok siebie w ciszy, słuchać deszczu o parapet i wiedzieć, że żadne z Was nie musi grać żadnej roli.',
      shadowHabit: 'Łatwo ulega przebodźcowaniu hałasem i cudzymi emocjami. Musi mieć prawo do samotnych wieczorów, inaczej zaczyna uciekać myślami daleko od wspólnego stołu.'
    }
  ],
  composites: {
    yin_yang_full: {
      title: 'Zwierciadlane Dopełnienie Pełni (Układ Yin–Yang)',
      badge: 'Pełne Domknięcie Tarczy',
      summary: 'Wasze Księżyce z nocy narodzin oświetlają przeciwległe strony tarczy. Kiedy nakładacie je na siebie, światło jednej osoby pada dokładnie w to miejsce, które u drugiej pozostawało w cieniu — domykając krąg do pełnego blasku.',
      dynamic: 'W prawdziwym życiu oznacza to więź ludzi, którzy nie muszą być swoimi kopiami, żeby stworzyć całość. Kiedy jedno z Was traci grunt pod nogami i panikuje, drugie zachowuje zimną krew; kiedy jedno zamyka się w milczeniu, drugie potrafi rozładować atmosferę jednym zdaniem w kuchni. Przyciągacie się właśnie dlatego, że każde z Was ma w sobie ten brakujący kawałek odwagi albo spokoju, którego drugiemu czasem brakuje.',
      advice: 'Nie próbujcie przerabiać partnera na swoją modłę. To, co czasem irytuje Was jako „zupełnie inne podejście do życia”, jest dokładnie tym samym mechanizmem, który ratuje Wasz związek, gdy robi się ciężko.'
    },
    twin_phase: {
      title: 'Bliźniaczy Rezonans Nocy (Wspólna Faza)',
      badge: 'Jednakowy Rytm Krwi',
      summary: 'Przyszliście na świat pod niemal identycznym kątem oświetlenia Księżyca. Wasze tarcze nakładają się na siebie jak dwie dłonie, wzmacniając dokładnie ten sam fragment światła i chroniąc tę samą strefę cienia.',
      dynamic: 'Między Wami działa ciche porozumienie ludzi ulepionych z tej samej gliny. Nie musicie sobie tłumaczyć, dlaczego po trudnym tygodniu nie macie ochoty nikogo oglądać albo dlaczego nagle o północy chcecie wyjechać za miasto. Daje to rzadkie w związkach poczucie głębokiej ulgi — przy tej drugiej osobie wreszcie nie czujesz się „zbyt jakiś” ani niezrozumiany.',
      advice: 'Ponieważ macie te same czułe punkty i podobne odruchy obronne, w chwilach kryzysu możecie oboje jednocześnie wycofać się w chłód albo oboje dolać oliwy do ognia. Warto wcześniej wiedzieć, kto pierwszy wyciąga rękę, gdy emocje biorą górę.'
    },
    axis_new_full: {
      title: 'Magnetyczna Oś Nowiu i Pełni (Światło w Objęciach Ciszy)',
      badge: 'Przyciąganie Biegunów',
      summary: 'Jedno z Was urodziło się w ciemności Nowiu (lub bardzo cienkiego sierpa), a drugie w pełnym, rozświetlonym blasku tarczy. Po nałożeniu Waszych Księżyców nocny spokój jednej osoby zostaje całkowicie otulony światłem drugiej.',
      dynamic: 'To spotkanie żywiołu, który wszystko widać na dłoni, z kimś, kto chowa swoje najgłębsze skarby pod powierzchnią. Osoba „pełniowa” wnosi do domu temperaturę, śmiech, intensywność i potrzebę mówienia o wszystkim wprost, podczas gdy osoba „nowiowa” daje głębokie uziemienie i azyl, w którym można wreszcie odpocząć od zgiełku świata.',
      advice: 'Ten układ wymaga wzajemnej delikatności: strona bardziej ekspresyjna nie powinna traktować ciszy partnera jako obojętności, a strona wyciszona nie może gasić emocji drugiej połówki chłodnym dystansem.'
    },
    quarter_bridge: {
      title: 'Most Kwadr (Przymierze Czynu i Czułości)',
      badge: 'Siła Wspólnego Kroku',
      summary: 'Wasze tarcze łączą różne etapy drogi Księżyca — od rosnącego sierpa po dojrzałe światło fazy ubywającej. Razem tworzą gęste, mocne jądro blasku w samym środku wspólnego kręgu.',
      dynamic: 'Jesteście parą, która sprawdza się nie tylko na zdjęciach z wakacji, ale przede wszystkim wtedy, gdy trzeba wspólnie przejść przez prawdziwe życie. Jedno z Was wnosi impuls, odwagę do zmian i świeże powietrze, a drugie — cierpliwość, wyczucie momentu i umiejętność zadbania o domowe ciepło. Obok siebie stajecie się po prostu silniejsi niż w pojedynkę.',
      advice: 'W codziennym biegu łatwo wpaść w pułapkę załatwiania spraw, rachunków i obowiązków. Pilnujcie, żeby pośród wspólnych planów zawsze zostało miejsce na zwykłą, bezinteresowną czułość.'
    },
    double_luminance: {
      title: 'Podwójna Korona Blasku (Spotkanie Dwóch Pełni)',
      badge: 'Wysoka Temperatura Uczuć',
      summary: 'Oboje urodziliście się pod mocno rozświetloną tarczą Księżyca. Nałożone na siebie fazy wypełniają niemal cały okrąg gęstym, jasnym światłem, zostawiając bardzo niewiele miejsca na cień.',
      dynamic: 'W Waszej relacji nic nie dzieje się letnio. Jeśli kochacie, to całą szerokością serca; jeśli się spieracie, to powietrze w pokoju aż gęstnieje. Jest w tym ogromna uczciwość — nie umiecie długo udawać, że nic się nie stało, ani żyć obok siebie jak lokatorzy. Chcecie od siebie prawdy, obecności i pełnego zaangażowania.',
      advice: 'Nawet najbliżsi sobie ludzie potrzebują czasem zamknąć drzwi i pobyć godzinę w samotności. Dajcie sobie prawo do gorszego dnia i chwili ciszy, bez natychmiastowego pytania, czy coś się między Wami psuje.'
    },
    crescent_sanctuary: {
      title: 'Przymierze Półcienia (Dwa Sierpy Nocy)',
      badge: 'Intymność Za Zamkniętymi Drzwiami',
      summary: 'Oba Wasze urodzeniowe Księżyce to smukłe, subtelne sierpy wyłaniające się z cienia. Połączone razem tworzą delikatny, świetlisty łuk chroniący spokojne, prywatne wnętrze.',
      dynamic: 'Nie jesteście parą na pokaz i nie potrzebujecie udowadniać światu, jak bardzo się kochacie. Najlepsze rzeczy między Wami dzieją się wtedy, gdy zamykacie drzwi od środka: w półsłówkach, wspólnym poczuciu humoru, dotknięciu dłoni w kuchni i umiejętności czytania swoich myśli bez jednego słowa.',
      advice: 'Wasz wspólny świat bywa tak bezpieczny i wygodny, że łatwo odciąć się w nim od reszty życia. Od czasu do czasu zróbcie razem coś nowego, co wyrwie Was z dobrze znanej rutyny.'
    }
  },
  moonSigns: {
    'Baran': {
      need: 'Potrzebuje w relacji bezpośredniości, energii i partnera, który potrafi stanąć z nim twarzą w twarz bez owijania w bawełnę.',
      giftHook: 'Nie znosi nudnych prezentów z przymusu. Zaimponujesz mu rzeczą z charakterem: od biletu na emocjonujące wydarzenie po wyrazisty flakon perfum o pieprznych nutach.'
    },
    'Byk': {
      need: 'Kocha zmysłowy spokój, powolne poranki, pyszne jedzenie i poczucie, że w domu nic mu nie zagraża.',
      giftHook: 'Dla Księżyca w Byku liczy się dotyk, ciężar i jakość: szlachetny wełniany szal, ciężka świeca sojowa z nutą sandałowca lub kolacja w miejscu, gdzie nikt nie pogania.'
    },
    'Bliźnięta': {
      need: 'Karmi się rozmową, humorem i wspólnym odkrywaniem świata — musi mieć z kim przegadać pół nocy.',
      giftHook: 'Nudzi go powtarzalność. Trafisz w punkt albumem o intrygującej architekturze, grą konwersacyjną dla dwojga, rzadkim winylem albo spontanicznym biletem na weekendowy wypad.'
    },
    'Rak': {
      need: 'Szuka czułości, prawdziwego azylu przed światem i pewności, że pamiętasz o Waszych wspólnych chwilach.',
      giftHook: 'Dla niego liczy się ładunek emocjonalny: subtelna biżuteria ze znaczeniem, analogowe odbitki ze wspólnego wyjazdu lub miękki pled stworzony do seansów filmowych we dwoje.'
    },
    'Lew': {
      need: 'Potrzebuje czuć się podziwiany i traktowany wyjątkowo — pragnie dumy z partnera i wzajemnego zachwytu.',
      giftHook: 'Wyczuje bylejakość z daleka. Wybierz jeden dopracowany akcent: złoty detal, autorski ekstrakt zapachowy albo wieczór zaplanowany z dbałością o każdy drobiazg.'
    },
    'Panna': {
      need: 'Docenia dbałość, dotrzymywanie słowa i to, gdy ktoś zdejmuje z jej barków codzienny chaos.',
      giftHook: 'Ceni mistrzowską jakość i praktyczną elegancję: solidny skórzany portfel, japońskie naczynia ceramiczne lub kosmetyki o minimalistycznym, naturalnym składzie.'
    },
    'Waga': {
      need: 'Pragnie harmonii, pięknej oprawy, wzajemnego szacunku i rozmów bez podnoszenia głosu.',
      giftHook: 'Dla niej estetyka to podstawa: designerski wazon ze szkła dmuchanego, jedwabna poszewka lub zaproszenie na kameralny koncert w nastrojowej przestrzeni.'
    },
    'Skorpion': {
      need: 'Szuka bezgranicznej lojalności, głębokiego magnetyzmu i prawdy bez jakichkolwiek masek.',
      giftHook: 'Gardzi sieciówkową sztampą. Trafisz w sedno dymnymi niszowymi perfumami (skóra, oud, czarny bursztyn), zmysłową oprawą wieczoru lub czymś bardzo osobistym tylko dla Was.'
    },
    'Strzelec': {
      need: 'Wymaga przestrzeni, wspólnego śmiechu do utraty tchu i planów na kolejne przygody.',
      giftHook: 'Dla niego najlepszym prezentem są emocje: bilety lotnicze w nieznane, skórzany notatnik podróżnika lub sprzęt, który przyda się na kolejnym szlaku.'
    },
    'Koziorożec': {
      need: 'Ceni niezawodność, powściągliwość i partnera, na którego można liczyć w każdej sytuacji.',
      giftHook: 'Wybiera rzeczy ponadczasowe, które z wiekiem zyskują klasę: doskonała torba weekendowa, klasyczny zegarek lub rocznikowe wino z małej winnicy.'
    },
    'Wodnik': {
      need: 'Pragnie intelektualnej więzi, wolności bycia sobą i partnerstwa opartego na szczerej przyjaźni.',
      giftHook: 'Uwielbia niebanalne koncepty: rzadki plakat artystyczny, designerski przedmiot z historią lub warsztaty z czegoś, czego nigdy wcześniej nie próbowaliście.'
    },
    'Ryby': {
      need: 'Potrzebuje głębokiego azylu, miękkości, empatii i więzi, w której nie trzeba niczego udowadniać.',
      giftHook: 'Poruszy je prezent z duszą: dźwięk winylu przy zgaszonym świetle, niszowy zapach do domu, kamień księżycowy w oprawie lub wyjazd do drewnianej chaty nad jeziorem.'
    }
  }
};
