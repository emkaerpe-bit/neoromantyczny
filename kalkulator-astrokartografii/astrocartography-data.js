/**
 * BAZA DANYCH ASTROKARTOGRAFII I RELOKACJI (MIASTA ŚWIATA, LINIE PLANETARNE, MAPA SVG)
 */

window.ACG_DATA = {
  birthCities: [
    { name: 'Warszawa', lat: 52.2297, lon: 21.0122 },
    { name: 'Kraków', lat: 50.0647, lon: 19.9450 },
    { name: 'Wrocław', lat: 51.1079, lon: 17.0385 },
    { name: 'Poznań', lat: 52.4064, lon: 16.9252 },
    { name: 'Gdańsk', lat: 54.3520, lon: 18.6466 },
    { name: 'Łódź', lat: 51.7592, lon: 19.4560 },
    { name: 'Katowice', lat: 50.2649, lon: 19.0238 },
    { name: 'Szczecin', lat: 53.4285, lon: 14.5528 },
    { name: 'Lublin', lat: 51.2465, lon: 22.5684 },
    { name: 'Bydgoszcz', lat: 53.1235, lon: 18.0084 },
    { name: 'Białystok', lat: 53.1325, lon: 23.1688 },
    { name: 'Rzeszów', lat: 50.0412, lon: 21.9991 },
    { name: 'Toruń', lat: 53.0138, lon: 18.5984 },
    { name: 'Olsztyn', lat: 53.7784, lon: 20.4801 },
    { name: 'Kielce', lat: 50.8661, lon: 20.6286 },
    { name: 'Opole', lat: 50.6751, lon: 17.9213 },
    { name: 'Zielona Góra', lat: 51.9356, lon: 15.5062 },
    { name: 'Częstochowa', lat: 50.8118, lon: 19.1203 },
    { name: 'Gdynia', lat: 54.5189, lon: 18.5305 },
    { name: 'Zakopane', lat: 49.2992, lon: 19.9496 },
    { name: 'Londyn (UK)', lat: 51.5074, lon: -0.1278 },
    { name: 'Berlin (Niemcy)', lat: 52.5200, lon: 13.4050 },
    { name: 'Chicago (USA)', lat: 41.8781, lon: -87.6298 }
  ],

  worldCities: [
    { name: 'Paryż', country: 'Francja', lat: 48.8566, lon: 2.3522, vibe: 'Bulwary nad Sekwaną, sztuka, niszowe perfumerie i nocne bistro' },
    { name: 'Rzym', country: 'Włochy', lat: 41.9028, lon: 12.4964, vibe: 'Wieczne Miasto, gorący kamień, długie kolacje na Zatybrzu i zmysłowy rozmach' },
    { name: 'Barcelona', country: 'Hiszpania', lat: 41.3874, lon: 2.1686, vibe: 'Śródziemnomorska bryza, modernizm, tapas o północy i lekkość bytu' },
    { name: 'Lizbona', country: 'Portugalia', lat: 38.7223, lon: -9.1393, vibe: 'Złote światło nad Tagiem, melancholia fado i oceaniczny oddech' },
    { name: 'Mediolan', country: 'Włochy', lat: 45.4642, lon: 9.1900, vibe: 'Stolica krawiectwa, designu, dużych pieniędzy i szybkich decyzji' },
    { name: 'Wenecja', country: 'Włochy', lat: 45.4408, lon: 12.3155, vibe: 'Mgła nad kanałami, teatralna tajemnica i miłość poza czasem' },
    { name: 'Florencja', country: 'Włochy', lat: 43.7696, lon: 11.2558, vibe: 'Toskańskie wzgórza, renesansowe rzemiosło i wino o zachodzie słońca' },
    { name: 'Wybrzeże Amalfi (Neapol)', country: 'Włochy', lat: 40.6333, lon: 14.6029, vibe: 'Cytrynowe tarasy nad klifem, południowy temperament i czyste kino' },
    { name: 'Nicea & Monako', country: 'Lazurowe Wybrzeże', lat: 43.7102, lon: 7.2620, vibe: 'Stare pieniądze, jachty, kasyno w Monte Carlo i śródziemnomorski blask' },
    { name: 'Madryt', country: 'Hiszpania', lat: 40.4168, lon: -3.7038, vibe: 'Królewska duma, galerie sztuki i miasto, które nigdy nie idzie spać wcześnie' },
    { name: 'Sewilla & Malaga', country: 'Andaluzja', lat: 37.3891, lon: -5.9845, vibe: 'Zapach kwiatu pomarańczy, flamenco i gorący południowy temperament' },
    { name: 'Majorka (Palma)', country: 'Baleary', lat: 39.5696, lon: 2.6502, vibe: 'Kamienne finci w górach Serra de Tramuntana i turkusowe zatoki' },
    { name: 'Teneryfa & Wyspy Kanaryjskie', country: 'Hiszpania', lat: 28.2916, lon: -16.6291, vibe: 'Wulkaniczny ocean, wieczna wiosna i ucieczka od europejskiej zimy' },
    { name: 'Madera (Funchal)', country: 'Portugalia', lat: 32.6669, lon: -16.9241, vibe: 'Zielone klify nad Atlantykiem, mgliste lasy wawrzynowe i dziki spokój' },
    { name: 'Londyn', country: 'Wielka Brytania', lat: 51.5074, lon: -0.1278, vibe: 'Globalna finansjera, prywatne kluby Mayfair i potężna dźwignia kariery' },
    { name: 'Zurych & Genewa', country: 'Szwajcaria', lat: 47.3769, lon: 8.5417, vibe: 'Dyskretny kapitał, alpejska precyzja, jezioro i najwyższy standard życia' },
    { name: 'Wiedeń', country: 'Austria', lat: 48.2082, lon: 16.3738, vibe: 'Cesarska architektura, kawiarnie, opera i uporządkowana elegancja' },
    { name: 'Praga', country: 'Czechy', lat: 50.0755, lon: 14.4378, vibe: 'Gotycki urok, alchemiczne zaułki i nocne spacery nad Wełtawą' },
    { name: 'Amsterdam', country: 'Holandia', lat: 52.3676, lon: 4.9041, vibe: 'Domy nad kanałami, wolność obyczajowa, handel i kreatywny luz' },
    { name: 'Berlin', country: 'Niemcy', lat: 52.5200, lon: 13.4050, vibe: 'Surowa awangarda, nocne kluby, startupy i pełna anonimowość' },
    { name: 'Kopenhaga', country: 'Dania', lat: 55.6761, lon: 12.5683, vibe: 'Skandynawski minimalizm, restauracje z gwiazdkami Michelin i spokój' },
    { name: 'Sztokholm', country: 'Szwecja', lat: 59.3293, lon: 18.0686, vibe: 'Miasto na archipelagu wysp, czysta woda, technologia i chłodna klasa' },
    { name: 'Oslo', country: 'Norwegia', lat: 59.9139, lon: 10.7522, vibe: 'Fiordy, nowoczesna architektura i głęboki oddech północy' },
    { name: 'Reykjavik', country: 'Islandia', lat: 64.1466, lon: -21.9426, vibe: 'Zorza polarna, czarne plaże, gejzery i surowe oczyszczenie głowy' },
    { name: 'Ateny & Santorini', country: 'Grecja', lat: 37.9838, lon: 23.7275, vibe: 'Białe kaldery nad Morzem Egejskim, mitologia i słony wiatr' },
    { name: 'Dubrownik & Split', country: 'Chorwacja', lat: 42.6507, lon: 18.0944, vibe: 'Kamienne mury nad Adriatykiem, sosny, cykady i ciepłe wieczory' },
    { name: 'Valletta', country: 'Malta', lat: 35.8989, lon: 14.5146, vibe: 'Złoty wapień, zakonny rozmach i słońce przez trzysta dni w roku' },
    { name: 'Pafos & Larnaka', country: 'Cypr', lat: 34.7720, lon: 32.4297, vibe: 'Wyspa Afrodyty, ciepłe morze i łagodny lewantyński rytm' },
    { name: 'Stambuł', country: 'Turcja', lat: 41.0082, lon: 28.9784, vibe: 'Skzyżowanie Europy i Azji nad Bosforem, zapach kardamonu i handel' },
    { name: 'Dubaj', country: 'Zjednoczone Emiraty Arabskie', lat: 25.2048, lon: 55.2708, vibe: 'Pustynny rozmach, bezpodatkowy kapitał, wieżowce i wielka skala' },
    { name: 'Marrakesz', country: 'Maroko', lat: 31.6295, lon: -7.9811, vibe: 'Ukryte riady, ogrody Majorelle, zapach cedru i hipnotyczny orient' },
    { name: 'Kair', country: 'Egipt', lat: 30.0444, lon: 31.2357, vibe: 'Starożytna oś Nilu, pustynny wiatr i monumentalna historia' },
    { name: 'Kapsztad', country: 'RPA', lat: -33.9249, lon: 18.4241, vibe: 'Góra Stołowa, winnice Stellenbosch i spotkanie dwóch oceanów' },
    { name: 'Nowy Jork', country: 'USA', lat: 40.7128, lon: -74.0060, vibe: 'Elektryczna ambicja Manhattanu, wielkie tempo, sztuka i giełda' },
    { name: 'Miami', country: 'USA', lat: 25.7617, lon: -80.1918, vibe: 'Art Deco nad oceanem, gorące noce, jachty i latynoska energia' },
    { name: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437, vibe: 'Złota godzina nad Pacyfikiem, przemysł marzeń, kreacja i wizerunek' },
    { name: 'San Francisco', country: 'USA', lat: 37.7749, lon: -122.4194, vibe: 'Most w chmurach, Dolina Krzemowa, innowacje i przełomy technologiczne' },
    { name: 'Chicago', country: 'USA', lat: 41.8781, lon: -87.6298, vibe: 'Wietrzna metropolia nad jeziorem Michigan, architektura i konkretny biznes' },
    { name: 'Toronto & Vancouver', country: 'Kanada', lat: 43.6532, lon: -79.3832, vibe: 'Bezpieczna przestrzeń, wielokulturowy rozmach i bliskość natury' },
    { name: 'Tulum & Cancun', country: 'Meksyk', lat: 20.2114, lon: -87.4654, vibe: 'Biały piasek Karaibów, święte cenoty, dżungla i zmysłowy reset' },
    { name: 'Rio de Janeiro', country: 'Brazylia', lat: -22.9068, lon: -43.1729, vibe: 'Góry wyrastające z oceanu, bossa nova, cielesność i czysta radość życia' },
    { name: 'Buenos Aires', country: 'Argentyna', lat: -34.6037, lon: -58.3816, vibe: 'Paryż Południa, nocne tango, psychoanaliza, wino i literacki klimat' },
    { name: 'Tokio', country: 'Japonia', lat: 35.6762, lon: 139.6503, vibe: 'Neonowa przyszłość spleciona z rytuałem, perfekcją i absolutnym szacunkiem' },
    { name: 'Kioto', country: 'Japonia', lat: 35.0116, lon: 135.7681, vibe: 'Bambusowe gaje, drewniane świątynie, herbata matcha i głęboka cisza' },
    { name: 'Bali (Ubud & Canggu)', country: 'Indonezja', lat: -8.4095, lon: 115.1889, vibe: 'Tarasy ryżowe, oceaniczny surf, kadzidła i duchowe uzdrowienie' },
    { name: 'Bangkok & Phuket', country: 'Tajlandia', lat: 13.7563, lon: 100.5018, vibe: 'Złote świątynie, nocny street-food, tropikalne wyspy i wolność' },
    { name: 'Singapur', country: 'Azja Południowo-Wschodnia', lat: 1.3521, lon: 103.8198, vibe: 'Futurystyczne ogrody, azjatycki hub finansowy, bezpieczeństwo i luksus' },
    { name: 'Seul', country: 'Korea Południowa', lat: 37.5665, lon: 126.9780, vibe: 'Estetyka, tempo nowoczesnej metropolii, design i nocne życie' },
    { name: 'Sydney & Melbourne', country: 'Australia', lat: -33.8688, lon: 151.2093, vibe: 'Słoneczny ocean, wysoka jakość życia, przestrzeń i świeży start' },
    { name: 'Warszawa', country: 'Polska', lat: 52.2297, lon: 21.0122, vibe: 'Najszybsze tempo w kraju, kariera, biznes, media i nowe kontakty' },
    { name: 'Kraków', country: 'Polska', lat: 50.0647, lon: 19.9450, vibe: 'Stare mury, kultura, niespieszne wieczory na Kazimierzu i historia' },
    { name: 'Trójmiasto (Gdańsk & Sopot)', country: 'Polska', lat: 54.4416, lon: 18.5601, vibe: 'Morski wiatr, bursztynowe światło, szerokie plaże i oddech od zgiełku' }
  ],
  planetProfiles: {
    Venus: {
      plName: 'Wenus',
      glyph: '♀',
      color: '#F472B6',
      category: 'love',
      headline: 'Linia Miłości, Magnetyzmu i Zmysłowej Rozkoszy',
      angles: {
        DC: 'W tym miejscu świata łatwiej się zakochać niż gdziekolwiek indziej. Ludzie patrzą na Ciebie łagodniej, rozmowy przy stoliku kleją się same, a jeśli jedziesz tu z partnerem — wraca między Was czułość z pierwszych tygodni znajomości. Idealna oś na podróż poślubną, rocznicę albo otwarcie serca po trudnym rozstaniu.',
        AC: 'Na linii Wenus AC budzi się Twój osobisty urok. Chodzisz inaczej, ubierasz się odważniej, przyciągasz spojrzenia na ulicy i nagle znika z Twoich ramion codzienny ciężar. Czujesz się tu atrakcyjnie we własnej skórze bez najmniejszego wysiłku.',
        MC: 'Miejsce, w którym zarabiasz przez styl, relacje, sztukę i klasę osobistą. Tutaj Twoja praca spotyka się z życzliwością wpływowych ludzi, a wizerunek publiczny nabiera szlachetnego blasku.',
        IC: 'Twój zmysłowy azyl. W tym regionie świata najłatwiej stworzyć piękny, spokojny dom, w którym pachnie świeżą kawą, drewnem i świętym spokojem.'
      },
      remoteKey: 'Wprowadź do sypialni i garderoby estetykę kraju, przez który biegnie Twoja linia Wenus: od niszowych perfum z tego regionu, przez muzykę w tle podczas kolacji, aż po planowanie tam kolejnego urlopu we dwoje.'
    },
    Jupiter: {
      plName: 'Jowisz',
      glyph: '♃',
      color: '#34D399',
      category: 'wealth',
      headline: 'Linia Wielkich Pieniędzy, Ekspansji i Szczęśliwych Zbiegów Okoliczności',
      angles: {
        MC: 'Królewska oś kariery i finansów. W miastach leżących na linii Jowisz MC drzwi otwierają się szybciej, kontrakty opiewają na wyższe kwoty, a Twoje nazwisko budzi naturalne zaufanie. Jeśli szukasz przełomu zawodowego lub inwestorów — patrz dokładnie tutaj.',
        AC: 'W tym miejscu rośnie Twoja odwaga i apetyt na życie. Znikają kompleksy, zaczynasz myśleć z rozmachem i przyciągasz „szczęśliwe przypadki” — właściwych ludzi spotkanych o właściwej porze na lotnisku lub w hotelowym lobby.',
        DC: 'Oś zamożnych, hojnych partnerów życiowych i biznesowych. Spotykasz tu ludzi o szerokich horyzontach, którzy ciągną Cię w górę i dzielą się swoimi możliwościami.',
        IC: 'Ziemia obfitości i wewnętrznego bezpieczeństwa. Świetny kierunek na zakup nieruchomości, dłuższy pobyt zimowy lub spokojne budowanie majątku rodzinnego.'
      },
      remoteKey: 'Nawiązuj relacje handlowe, szukaj klientów, rynków zbytu lub inspiracji zawodowych w miastach na Twojej linii Jowisza — nawet praca zdalna z firmami z tej strefy uruchamia jej potencjał finansowy.'
    },
    Sun: {
      plName: 'Słońce',
      glyph: '☉',
      color: '#FBBF24',
      category: 'wealth',
      headline: 'Linia Witalności, Autorytetu i Życia w Pełnym Blasku',
      angles: {
        MC: 'Szczyt widoczności społecznej. Na linii Słońca MC nie da się schować w tłumie — naturalnie przejmujesz stery, budzisz respekt i zbierasz owoce swojej ambicji.',
        AC: 'Fizyczny zastrzyk energii. Wracają Ci tu siły witalne, poprawia się nastrój, a decyzje, które w domu odkładałeś miesiącami, podejmujesz w jedno popołudnie.',
        DC: 'Przyciągasz tu silne, charyzmatyczne osobowości. Dla par to miejsce, w którym związek wychodzi z szarej rutyny i odzyskuje dumę oraz ogień.',
        IC: 'Głębokie poczucie zakorzenienia i dumy z własnej drogi. Miejsce, które daje wewnętrzny kręgosłup.'
      },
      remoteKey: 'Wystaw swoją markę osobistą lub twórczość na kontakt z kulturą tego regionu; to kierunek geograficzny, który najmocniej zasila Twoją pewność siebie.'
    },
    Moon: {
      plName: 'Księżyc',
      glyph: '☽',
      color: '#A78BFA',
      category: 'love',
      headline: 'Linia Domowego Ciepła, Intuicji i Głębokiej Bliskości',
      angles: {
        IC: 'Najbardziej domowe miejsce na całej mapie Ziemi. Wysiadasz z samolotu i masz dziwne wrażenie, że już kiedyś tu mieszkałeś. Ciało puszcza napięcie, sen staje się głęboki, a serce odpoczywa.',
        DC: 'Oś czułej, rodzinnej bliskości. W tym miejscu ludzie otwierają przed Tobą duszę w pięć minut, a relacje partnerskie nabierają niezwykłej intymności i opiekuńczości.',
        AC: 'Wzmacnia Twoją wrażliwość, empatię i pamięć emocjonalną. Czujesz tu mocniej każdy zapach, smak i dotyk.',
        MC: 'Sprzyja zawodowemu kontaktowi z szeroką publicznością, gastronomią, hotelarstwem, psychologią i troską o innych.'
      },
      remoteKey: 'Kuchnia, domowe rytuały i przedmioty codziennego użytku pochodzące z tego kraju przyniosą Ci najszybsze ukojenie po przebodźcowanym tygodniu.'
    },
    Mercury: {
      plName: 'Merkury',
      glyph: '☿',
      color: '#38BDF8',
      category: 'wealth',
      headline: 'Linia Intelektu, Handlu, Negocjacji i Szybkich Pomysłów',
      angles: {
        MC: 'Doskonałe miejsce na konferencje, podpisywanie umów, pisanie książki, naukę języka lub prowadzenie zdalnego biznesu. Umysł pracuje tu na najwyższych obrotach.',
        AC: 'Stajesz się tu błyskotliwy, towarzyski i ciekawy każdego zaułka. Idealny kierunek na intensywny city-break pełen rozmów i inspiracji.',
        DC: 'Przyciągasz tu inteligentnych rozmówców, doradców i partnerów, z którymi można przegadać całą noc do świtu.',
        IC: 'Miejsce sprzyjające pracy twórczej, pisaniu i porządkowaniu życiowych planów.'
      },
      remoteKey: 'Ucz się języka tego regionu, czytaj literaturę stamtąd lub prowadź z tym krajem wymianę handlową i intelektualną.'
    },
    Mars: {
      plName: 'Mars',
      glyph: '♂',
      color: '#F97316',
      category: 'shadow',
      headline: 'Linia Pasji, Adrenaliny, Pożądania i Konfrontacji',
      angles: {
        AC: 'Czysta adrenalina. Masz tu odwagę walczyć o swoje, trenować i przełamywać bariery, ale łatwo też o niecierpliwość i wybuchowość.',
        DC: 'Oś gorącej namiętności, ale i ostrych sporów. Między partnerami lecą tu iskry — świetne miejsce na przełamanie chłodu w sypialni, gorsze na spokojne negocjacje.',
        MC: 'Miejsce bezwzględnej walki o karierę i szybkich, odważnych ruchów biznesowych.',
        IC: 'Trudny kierunek na spokojne mieszkanie na stałe — w domu może być za dużo pośpiechu i napięcia.'
      },
      remoteKey: 'Wykorzystaj tę energię przez sport, ruch i odważne projekty, unikając podejmowania decyzji w gniewie.'
    },
    Saturn: {
      plName: 'Saturn',
      glyph: '♄',
      color: '#FB7185',
      category: 'shadow',
      headline: 'Linia Ciężaru, Surowej Dyscypliny i Egzaminu Dojrzałości',
      angles: {
        AC: 'W tym miejscu życie zdejmuje różowe okulary. Możesz czuć tu większe zmęczenie fizyczne, powagę i samotność, choć to również strefa budowania żelaznej odporności.',
        DC: 'Trudna oś na romantyczny wyjazd. Relacje przechodzą tu bezlitosny test prawdy i odpowiedzialności — wychodzą na jaw wszystkie przemilczane żale.',
        MC: 'Wymaga ciężkiej, wieloletniej pracy bez dróg na skróty. Daje trwały autorytet, ale kosztuje dużo zdrowia i nerwów.',
        IC: 'Poczucie chłodu lub ciężaru obowiązków domowych. Nie jest to kierunek na beztroski wypoczynek.'
      },
      remoteKey: 'Traktuj ten kierunek z respektem: jedź tam w celach konkretnej pracy lub nauki dyscypliny, ale nie wybieraj go na miesiąc miodowy.'
    },
    Pluto: {
      plName: 'Pluton',
      glyph: '♇',
      color: '#E11D48',
      category: 'shadow',
      headline: 'Linia Głębokiego Przełomu, Obsesji i Spalenia Starych Mostów',
      angles: {
        AC: 'Miejsce totalnej metamorfozy. Jedziesz tam jako jedna osoba, a wracasz jako ktoś zupełnie inny. Wyciąga na powierzchnię skrywane lęki i ukrytą siłę.',
        DC: 'Oś magnetycznych, niemal obsesyjnych spotkań, które wywracają życie do góry nogami. Zero letnich emocji — wszystko albo nic.',
        MC: 'Walka o władzę, wielkie wpływy lub całkowitą zmianę zawodu po spaleniu dotychczasowej ścieżki.',
        IC: 'Głębokie konfrontacje z historią rodzinną i przeszłością. Bardzo intensywne miejsce do życia.'
      },
      remoteKey: 'Używaj energii tej linii, gdy świadomie chcesz zamknąć stary rozdział życia i zacząć od czystej karty.'
    }
  },
  relocationHouses: [
    'Dom I (Osobisty Magnetyzm i Nowa Tożsamość): W tym mieście wychodzisz na pierwszy plan, szybciej podejmujesz decyzje i narzucasz własne tempo.',
    'Dom II (Pieniądze, Majątek i Zmysły): To miasto zasila Twoje konto bankowe, daje apetyt na luksus i pomaga dobrze wyceniać własną pracę.',
    'Dom III (Kontakty, Handel i Ruch): Tętniąca życiem strefa spotkań, krótkich podróży, pisania, mediów i błyskawicznych znajomości.',
    'Dom IV (Dom, Korzenie i Święty Spokój): Miejsce, w którym czujesz się u siebie — idealne na zakup mieszkania, założenie rodziny i głęboki odpoczynek.',
    'Dom V (Romans, Flirt, Kreacja i Radość Życia): Najlepsza strefa na randki, namiętność, sztukę, zabawę i poczucie, że znów masz dwadzieścia lat.',
    'Dom VI (Praca, Rzemiosło i Zdrowie): Miasto sprzyjające porządkowi dnia, trosce o ciało, medycynie i perfekcyjnemu dopinaniu projektów.',
    'Dom VII (Wielka Miłość, Małżeństwo i Spółki): Kluczowy sektor relacji jeden na jeden — tutaj najłatwiej spotkać partnera na życie lub podpisać lukratywny kontrakt.',
    'Dom VIII (Namiętność, Duży Kapitał i Tajemnica): Strefa głębokiej chemii intymnej, inwestycji, cudzych pieniędzy i psychologicznej transformacji.',
    'Dom IX (Szerokie Horyzonty, Prestiż i Rozmach): Miasto, które otwiera umysł, sprzyja studiom, publikacjom, podróżom i międzynarodowej skali.',
    'Dom X (Szczyt Kariery, Status i Władza): Najpotężniejszy sektor zawodowy — tutaj budujesz nazwisko, awansujesz i zdobywasz uznanie społeczne.',
    'Dom XI (Elitarne Kręgi, Przyjaciele i Przyszłość): Miejsce, w którym trafiasz na właściwych protektorów, sieci kontaktów i nowoczesne projekty.',
    'Dom XII (Ukryty Azyl, Cisza i Regeneracja): Strefa odcięcia od hałasu świata — doskonała na samotny reset i uzdrowienie, trudniejsza na głośny biznes.'
  ],

  // Kontury kontynentów w układzie [lon, lat] do rysowania na mapie SVG (1000x500)
  continentPolygons: [
    // Ameryka Północna
    [[-165,64],[-140,70],[-125,70],[-95,72],[-75,62],[-55,50],[-68,44],[-75,35],[-81,25],[-83,10],[-78,8],[-90,16],[-105,20],[-117,32],[-124,48],[-140,60],[-165,62]],
    // Ameryka Południowa
    [[-78,10],[-62,10],[-50,0],[-35,-6],[-38,-18],[-48,-28],[-58,-36],[-68,-54],[-74,-48],[-72,-30],[-70,-18],[-80,-4],[-78,10]],
    // Europa
    [[-10,36],[-9,43],[-2,44],[-4,48],[2,51],[8,54],[10,58],[5,62],[16,69],[28,71],[42,66],[60,60],[55,48],[40,44],[28,41],[24,38],[15,38],[12,44],[5,43],[-5,36],[-10,36]],
    // Wielka Brytania i Irlandia
    [[-6,50],[-5,58],[-1,58],[1,51],[-6,50]],
    // Afryka
    [[-17,15],[-13,28],[-6,35],[10,37],[32,31],[43,12],[51,11],[40,-10],[35,-25],[20,-35],[18,-34],[12,-17],[9,4],[-8,5],[-17,15]],
    // Azja
    [[28,41],[45,40],[35,32],[48,30],[56,26],[68,24],[77,8],[88,22],[100,14],[104,1],[109,22],[122,31],[130,42],[140,54],[170,66],[170,60],[135,35],[120,23],[105,10],[95,16],[80,15],[72,21],[60,25],[50,15],[43,12],[34,28],[28,41]],
    // Japonia
    [[130,31],[136,35],[141,41],[145,44],[140,35],[130,31]],
    // Indonezja / Bali
    [[96,5],[106,-6],[116,-8],[125,-8],[120,-4],[105,0],[96,5]],
    // Australia
    [[114,-22],[122,-16],[136,-12],[142,-11],[153,-26],[148,-38],[138,-35],[130,-32],[115,-34],[114,-22]],
    // Nowa Zelandia
    [[167,-46],[178,-37],[175,-41],[167,-46]]
  ]
};

(function() {
  const pMeta = {
    sun: { name: 'Słońce', symbol: '☉', color: '#FBBF24' },
    moon: { name: 'Księżyc', symbol: '☽', color: '#A78BFA' },
    venus: { name: 'Wenus', symbol: '♀', color: '#F472B6' },
    jupiter: { name: 'Jowisz', symbol: '♃', color: '#34D399' },
    mercury: { name: 'Merkury', symbol: '☿', color: '#38BDF8' },
    mars: { name: 'Mars', symbol: '♂', color: '#F97316' },
    saturn: { name: 'Saturn', symbol: '♄', color: '#FB7185' },
    pluto: { name: 'Pluton', symbol: '♇', color: '#E11D48' }
  };
  const lineInterps = {};
  if (window.ACG_DATA && window.ACG_DATA.planetProfiles) {
    Object.keys(pMeta).forEach(k => {
      const capKey = k.charAt(0).toUpperCase() + k.slice(1);
      const prof = window.ACG_DATA.planetProfiles[capKey];
      if (prof) {
        lineInterps[k] = prof.angles;
        pMeta[k].name = prof.plName || pMeta[k].name;
        pMeta[k].symbol = prof.glyph || pMeta[k].symbol;
        pMeta[k].color = prof.color || pMeta[k].color;
      }
    });
  }

  window.ACG_DATA.PLANET_META = pMeta;
  window.ACG_DATA.LINE_INTERPRETATIONS = lineInterps;
  window.ACG_DATA.AXIS_NAMES = {
    MC: 'Medium Coeli (Zenit • Kariera & Status)',
    IC: 'Imum Coeli (Nadir • Dom & Bezpieczeństwo)',
    AC: 'Ascendent (Wschód • Wizerunek & Nowy Początek)',
    DC: 'Descendent (Zachód • Miłość, Partner & Ślub)'
  };
  window.ACG_DATA.ZODIAC_SIGNS = [
    'Baran', 'Byk', 'Bliźnięta', 'Rak', 'Lew', 'Panna',
    'Waga', 'Skorpion', 'Strzelec', 'Koziorożec', 'Wodnik', 'Ryby'
  ];
  window.ACG_DATA.WORLD_CITIES = window.ACG_DATA.worldCities || [];
  window.ACG_DATA.BIRTH_CITIES = window.ACG_DATA.birthCities || [];
})();
