/**
 * NEOROMANTYCZNY — SILNIK PEŁNEGO RAPORTU SYNASTRII, KOMPOZYTU I KOSMOBIOLOGII EBERTINA
 * Architektura Ground Truth: Efemerydy JPL/Meeus, Midpointy Krótkiego Łuku, Tarcza 90°, Davison & Paywall CRO
 */
(function () {
  const DEG = Math.PI / 180;
  const RAD = 180 / Math.PI;
  const ZODIAC_NAMES = ['Baran','Byk','Bliźnięta','Rak','Lew','Panna','Waga','Skorpion','Strzelec','Koziorożec','Wodnik','Ryby'];
  const ZODIAC_GEN = ['Barana','Byka','Bliźniąt','Raka','Lwa','Panny','Wagi','Skorpiona','Strzelca','Koziorożca','Wodnika','Ryb'];
  const ZODIAC_GLYPHS = ['♈︎','♉︎','♊︎','♋︎','♌︎','♍︎','♎︎','♏︎','♐︎','♑︎','♒︎','♓︎'];
  const ELEMENTS = ['Ogień','Ziemia','Powietrze','Woda'];
  const MODALITIES = ['Kardynalna','Stała','Zmienna'];
  const RULERS = ['Mars','Wenus','Merkury','Księżyc','Słońce','Merkury','Wenus','Pluton (Mars)','Jowisz','Saturn','Uran (Saturn)','Neptun (Jowisz)'];

  function norm360(d) { return ((d % 360) + 360) % 360; }

  function solveKepler(M_deg, e) {
    let Mk = norm360(M_deg) * DEG;
    let E = Mk;
    for (let i = 0; i < 7; i++) E = E - (E - e * Math.sin(E) - Mk) / (1 - e * Math.cos(E));
    return E;
  }

  function helioXY(a, e, I, L, wbar, Omega) {
    const w = (wbar - Omega) * DEG, Om = Omega * DEG, inc = I * DEG;
    const E = solveKepler(L - wbar, e);
    const xv = a * (Math.cos(E) - e);
    const yv = a * Math.sqrt(1 - e * e) * Math.sin(E);
    const x = (Math.cos(w) * Math.cos(Om) - Math.sin(w) * Math.sin(Om) * Math.cos(inc)) * xv
            + (-Math.sin(w) * Math.cos(Om) - Math.cos(w) * Math.sin(Om) * Math.cos(inc)) * yv;
    const y = (Math.cos(w) * Math.sin(Om) + Math.sin(w) * Math.cos(Om) * Math.cos(inc)) * xv
            + (-Math.sin(w) * Math.sin(Om) + Math.cos(w) * Math.cos(Om) * Math.cos(inc)) * yv;
    return { x, y };
  }

  function calcExtendedBodies(dateStr, timeStr, baseChart) {
    let jd = baseChart && baseChart.jd;
    if (!jd) {
      const [y, m, d] = dateStr.split('-').map(Number);
      const hasTime = Boolean(timeStr && timeStr.includes(':'));
      const [hh, mm] = hasTime ? timeStr.split(':').map(Number) : [12, 0];
      const tzOffset = (m >= 4 && m <= 10) ? 2 : 1;
      const utcDate = new Date(Date.UTC(y, m - 1, d, hh - tzOffset, mm, 0));
      jd = utcDate.getTime() / 86400000 + 2440587.5;
    }
    const T = (jd - 2451545.0) / 36525.0;

    const earthH = helioXY(1.00000261 + 0.00000562 * T, 0.01671123 - 0.00004392 * T, -0.00001531 - 0.01294668 * T, 100.46457166 + 35999.37244981 * T, 102.93768193 + 0.32327364 * T, 0.0);
    const mercH  = helioXY(0.38709927 + 0.00000037 * T, 0.20563593 + 0.00001906 * T, 7.00497902 - 0.00594749 * T, 252.25032350 + 149472.67411175 * T, 77.45779628 + 0.16047689 * T, 48.33076593 - 0.12534081 * T);
    const jupH   = helioXY(5.20288700 - 0.00011607 * T, 0.04838624 - 0.00013253 * T, 1.30439695 - 0.00183714 * T, 34.39644051 + 3034.74612775 * T, 14.72847983 + 0.21252668 * T, 100.47390909 + 0.20469106 * T);
    const satH   = helioXY(9.53667594 - 0.00125060 * T, 0.05386179 - 0.00050991 * T, 2.48599187 + 0.00193609 * T, 49.95424423 + 1222.49362201 * T, 92.59887831 - 0.41897216 * T, 113.66242448 - 0.28867794 * T);
    const plutoH = helioXY(39.48211675 - 0.00031596 * T, 0.24882730 + 0.00005170 * T, 17.14001206 + 0.00004818 * T, 238.92903833 + 145.20780515 * T, 224.06891629 - 0.04062942 * T, 110.30393684 - 0.01183482 * T);

    const mercury = norm360(Math.atan2(mercH.y - earthH.y, mercH.x - earthH.x) * RAD);
    const jupiter = norm360(Math.atan2(jupH.y - earthH.y, jupH.x - earthH.x) * RAD);
    const saturn  = norm360(Math.atan2(satH.y - earthH.y, satH.x - earthH.x) * RAD);
    const pluto   = norm360(Math.atan2(plutoH.y - earthH.y, plutoH.x - earthH.x) * RAD);
    const node    = norm360(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
    const lilith  = norm360(83.3532465 + 180.0 + 4069.0137287 * T - 0.0103200 * T * T);

    return {
      jd,
      sun: baseChart.sun,
      moon: baseChart.moon,
      mercury,
      venus: baseChart.venus,
      mars: baseChart.mars,
      jupiter,
      saturn,
      pluto,
      lilith,
      node,
      asc: baseChart.asc,
      hasTime: baseChart.hasTime
    };
  }

  function formatPos(lon) {
    const n = norm360(lon);
    const idx = Math.floor(n / 30);
    const rem = n % 30;
    const deg = Math.floor(rem);
    const min = Math.floor((rem - deg) * 60);
    return {
      lon: n,
      idx,
      name: ZODIAC_NAMES[idx],
      gen: ZODIAC_GEN[idx],
      glyph: ZODIAC_GLYPHS[idx],
      element: ELEMENTS[idx % 4],
      modality: MODALITIES[idx % 3],
      ruler: RULERS[idx],
      deg,
      min,
      formatted: `${String(deg).padStart(2, '0')}°${String(min).padStart(2, '0')}'`
    };
  }

  // Short-Arc Midpoint (Ebertin / Composite Standard)
  function shortArcMidpoint(lon1, lon2) {
    const a = norm360(lon1), b = norm360(lon2);
    const diff = Math.abs(a - b);
    let mp = (a + b) / 2;
    if (diff > 180) mp = norm360(mp + 180);
    return norm360(mp);
  }

  function jdToDateString(jd) {
    const ms = (jd - 2440587.5) * 86400000;
    const dt = new Date(ms);
    return dt.toLocaleDateString('pl-PL', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  window.__SYNASTRY_DEEP_UTILS__ = {
    ZODIAC_NAMES, ZODIAC_GEN, ZODIAC_GLYPHS, ELEMENTS, MODALITIES, RULERS,
    norm360, calcExtendedBodies, formatPos, shortArcMidpoint, jdToDateString
  };
})();

(function () {
  const U = window.__SYNASTRY_DEEP_UTILS__;

  const PAIR_TEXTS = {
    'sun-sun': {
      h: 'Zgodność rdzeni tożsamości. Wasze ambicje, styl życia i potrzeba autentyczności wzajemnie się napędzają bez walki o terytorium.',
      c: 'Konfrontacja dwóch silnych autonomii. Relacja wymaga wyraźnego podziału sfer wpływu, by uniknąć cichej rywalizacji o dominację.'
    },
    'moon-sun': {
      h: 'Klasyczny aspekt małżeński (Yin–Yang). Świadoma wola jednej strony naturalnie chroni i zasila emocjonalne bezpieczeństwo drugiej.',
      c: 'Zderzenie życiowego kierunku z podświadomym nawykiem. Wymaga oddzielenia dumy ego od dziecięcej potrzeby bycia zaopiekowanym.'
    },
    'mercury-sun': {
      h: 'Sojusz woli i intelektu. Rozmowy stają się kuźnią wspólnych planów, a głos partnera wzmacnia poczucie własnej sprawczości.',
      c: 'Różnica między deklaracją a intencją — słowa mogą być odbierane jako autorytarne lub uderzające w osobistą dumę.'
    },
    'sun-venus': {
      h: 'Złoty promień czułości i zachwytu. Obecność partnera zmiękcza pancerz obronny, wnosząc w codzienność piękno, romans i aprobatę.',
      c: 'Rozdźwięk między stylem kochania a potrzebą uznania; ryzyko przedkładania pozornej harmonii nad trudną prawdę.'
    },
    'mars-sun': {
      h: 'Potężny generator witalności, odwagi i pasji. Działacie na siebie jak katalizator — od sypialni po wspólne zdobywanie celów.',
      c: 'Wysokie napięcie woli i temperamentu. Iskra pożądania łatwo przechodzi w spór o to, kto nadaje ton i tempo relacji.'
    },
    'jupiter-sun': {
      h: 'Królewski aspekt ekspansji i hojności ducha. Przy tym partnerze rośnie wiara we własne możliwości, optymizm i rozmach życiowy.',
      c: 'Tendencja do składania obietnic ponad miarę lub wspólnego przesadzania z ryzykiem kosztem przyziemnego realizmu.'
    },
    'saturn-sun': {
      h: 'Architektura dojrzałej odpowiedzialności. Poczucie, że na partnerze można oprzeć całe życie, budujące respekt i długofalowe imperium.',
      c: 'Dynamika mistrza i cenzora — nieuświadomiony lęk przed oceną może chłodzić spontaniczną radość i ekspresję.'
    },
    'node-sun': {
      h: 'Światło na ścieżce przeznaczenia. Jedna osoba staje się dla drugiej kluczowym przewodnikiem ku jej najwyższemu potencjałowi.',
      c: 'Karmiczny imperatyw zmiany — spotkanie wyrywa ze strefy komfortu i wymusza przedefiniowanie życiowej tożsamości.'
    },
    'moon-moon': {
      h: 'Empatyczna osmoza i wspólny rytm domowy. Wasze układy nerwowe wyciszają się w identycznych warunkach intymności.',
      c: 'Odmienne kody regulacji emocji — to, co jedną stronę koi (np. cisza lub rozmowa), drugą może wprowadzać w niepokój.'
    },
    'mercury-moon': {
      h: 'Umysł tłumaczący niewypowiedziane uczucia. Potraficie nazwać lęki i pragnienia partnera bez oceniania ich logiką.',
      c: 'Konflikt racjonalizacji z wrażliwością: próba logicznego „naprawienia” nastroju partnera bywa odbierana jako brak empatii.'
    },
    'moon-venus': {
      h: 'Kwintesencja czułości, domowego luksusu i zmysłowego ukojenia. Jedno z najsłodszych połączeń dających poczucie bycia kochanym.',
      c: 'Niezgodność języków troski — głód emocjonalny ściera się z potrzebą estetycznego dystansu lub nadmiernym dogadzaniem.'
    },
    'mars-moon': {
      h: 'Surowy, instynktowny magnetyzm. Głęboka emocjonalność spotyka bezkompromisową ochronę i gorący impuls fizyczny.',
      c: 'Wysoka reaktywność emocjonalna: niecierpliwość lub ostry ton Marsa może ranić kruchą, podświadomą sferę Księżyca.'
    },
    'jupiter-moon': {
      h: 'Emocjonalny azyl i wielkoduszność. Wzajemne wybaczanie, ciepło rodzinne i poczucie wewnętrznego bezpieczeństwa przy partnerze.',
      c: 'Zalew emocjonalny lub wyolbrzymianie nastrojów; obietnice opieki mogą rozmywać się w braku codziennej konsekwencji.'
    },
    'moon-saturn': {
      h: 'Niezłomna kotwica w kryzysie. Kiedy świat wokół drży, ta więź zapewnia trzeźwość, wierność i ochronny mur bezpieczeństwa.',
      c: 'Emocjonalna powściągliwość i chłód: potrzeba czułości może odbijać się od muru obowiązku, dyscypliny lub milczenia.'
    },
    'moon-node': {
      h: 'Karmiczne rozpoznanie dusz. Natychmiastowe poczucie przynależności, jakbyście kontynuowali więź sprzed obecnego wcielenia.',
      c: 'Intensywny dług emocjonalny zmuszający oboje do porzucenia dawnych rodzinnych schematów i mechanizmów obronnych.'
    },
    'mercury-mercury': {
      h: 'Intelektualne lustro. Rozumiecie podteksty, ironię, architekturę myśli i poczucie humoru bez konieczności kończenia zdań.',
      c: 'Odmienny rytm przetwarzania informacji — w stresie łatwo o spór o definicje, słowa i nadinterpretację tonu głosu.'
    },
    'mercury-venus': {
      h: 'Poetycka czułość w komunikacji. Słowa mają tu moc afrodyzjaku i balsamu — łatwość mówienia o uczuciach, sztuce i pięknie.',
      c: 'Rozbieżność między deklaracją słowną a realnym gestem miłosnym; wygładzanie trudnych tematów z lęku przed utratą harmonii.'
    },
    'mars-mercury': {
      h: 'Błyskawiczny refleks intelektualny i odwaga mówienia wprost. Dyskusje są gorące, inspirujące i natychmiast przekuwane w czyn.',
      c: 'Ostrze sarkazmu i werbalny pojedynek — w gniewie słowa stają się pociskami, które trudno cofnąć po opadnięciu emocji.'
    },
    'jupiter-mercury': {
      h: 'Szeroki horyzont myślowy, filozoficzne nocne rozmowy i wzajemne inspirowanie się do nauki, podróży oraz wielkich wizji.',
      c: 'Zderzenie wielkiej teorii z detalami codzienności — ryzyko moralizowania lub gubienia faktów w nadmiarze dygresji.'
    },
    'mercury-saturn': {
      h: 'Architektura dojrzałego dialogu. Słowa ważą tu tyle co podpisany kontrakt: trzeźwy osąd, mądre doradztwo i intelektualny szacunek.',
      c: 'Ciężar niewypowiedzianej krytyki — rygor logiczny może blokować spontaniczną wymianę myśli lub wywoływać obronne milczenie.'
    },
    'mercury-node': {
      h: 'Rozmowy zmieniające bieg życia. Jedna myśl lub rada partnera potrafi przestawić zwrotnicę na właściwy tor przeznaczenia.',
      c: 'Niepokojące przebudzenie mentalne — słowa partnera kwestionują stare dogmaty i zmuszają do nowego sposobu myślenia.'
    },
    'venus-venus': {
      h: 'Wspólny kod estetyczny, zmysłowy i towarzyski. Kochacie ten sam rodzaj piękna, dotyku, prezentów i celebrowania chwili.',
      c: 'Odmienne definicje luksusu i okazywania czułości; co dla jednej strony jest dowodem miłości, dla drugiej bywa zbyt powierzchowne.'
    },
    'mars-venus': {
      h: 'Magnetyzm czystej alchemii erotycznej. Pragnienie (Mars) i powab (Wenus) splatają się w niewymuszonym tańcu polaryzacji.',
      c: 'Iskra o wysokim napięciu: obsesyjna fascynacja fizyczna przeplata się z walką o dominację, zazdrością i testowaniem granic.'
    },
    'jupiter-venus': {
      h: 'Królewski aspekt obfitości, radości życia i hojności serca. Razem przyciągacie szczęście, towarzyski blask i zmysłowy rozmach.',
      c: 'Hedonistyczne rozleniwienie lub rozrzutność — ryzyko ucieczki w przyjemności zamiast konfrontacji z realnymi wyzwaniami.'
    },
    'saturn-venus': {
      h: 'Wierność ponad czasem. Miłość traktowana jako święte przymierze, lojalność w próbach i inwestycja uczuciowa na dekady.',
      c: 'Lęk przed odrzuceniem maskowany chłodem lub warunkowaniem uczuć; wymaga świadomego rozmrażania czułości każdego dnia.'
    },
    'node-venus': {
      h: 'Karmiczny dar serca. Relacja otwiera zdolność do głębszego, bezwarunkowego kochania i uzdrawia dawne rany odrzucenia.',
      c: 'Uwodzicielska iluzja przeszłości — konieczność odróżnienia nawykowego przywiązania od dojrzałego wyboru partnerskiego.'
    },
    'mars-mars': {
      h: 'Wspólny wektor działania i niespożyta energia. W łóżku i w projektach życiowych nadajecie na tej samej częstotliwości adrenaliny.',
      c: 'Zderzenie dwóch taranów. Brak bufora w gniewie wymaga przekierowania nadmiaru ognia na wspólny sport, pasję lub cel zewnętrzny.'
    },
    'jupiter-mars': {
      h: 'Triumfalna synergia odwagi i sukcesu. Razem podejmujecie śmiałe decyzje, mnożąc swoją sprawczość, pasję i apetyt na życie.',
      c: 'Brawura i przelicytowanie sił — skłonność do nakręcania się nawzajem w gniewie lub podejmowania zbyt ryzykownych szarż.'
    },
    'mars-saturn': {
      h: 'Stalowa wytrzymałość i strategiczna moc. Impuls jednej strony zyskuje dyscyplinę drugiej, tworząc niezniszczalny tandem w działaniu.',
      c: 'Układ gazu i hamulca: bolesna frustracja, gdy inicjatywa i pożądanie Marsa zderzają się z kontrolą lub oporem Saturna.'
    },
    'mars-node': {
      h: 'Katalizator odwagi karmicznej. Partner popycha Cię do działania tam, gdzie wcześniej paraliżował Cię strach lub wahanie.',
      c: 'Karmiczne pole bitwy — gwałtowne pragnienie i konflikt uczą stawiania czystych granic bez uciekania się do agresji.'
    },
    'jupiter-jupiter': {
      h: 'Zgodność światopoglądowa, etyczna i duchowa. Patrzymy w tę samą stronę horyzontu, dzieląc wspólny system wartości.',
      c: 'Spór ideologiczny lub rywalizacja o rację moralną — wymaga szacunku dla odmiennej filozofii życiowej partnera.'
    },
    'jupiter-saturn': {
      h: 'Królewska równowaga wizji i struktury. Jedna strona wnosi skrzydła ekspansji, druga fundament, na którym można bezpiecznie lądować.',
      c: 'Przeciąganie liny między optymizmem a sceptycyzmem; wymaga połączenia śmiałych marzeń z twardym planem realizacji.'
    },
    'jupiter-node': {
      h: 'Błogosławieństwo na ścieżce rozwoju. Wspólny wzrost społeczny, duchowy i materialny zapisany w potencjale spotkania.',
      c: 'Pokusa pójścia na skróty — obietnica łatwego sukcesu wymaga zakotwiczenia w autentycznej pracy nad relacją.'
    },
    'saturn-saturn': {
      h: 'Pokoleniowa i strukturalna jednomyślność. Podobne rozumienie granic, obowiązków, finansów i architektury bezpieczeństwa.',
      c: 'Podwójny rygor i nadmiar kontroli — relacja potrzebuje świadomego wpuszczania lekkości, zabawy i spontaniczności.'
    },
    'node-saturn': {
      h: 'Karmiczny filar dojrzałości. Spotkanie uczy najwyższej formy odpowiedzialności za drugiego człowieka i wspólne dzieło.',
      c: 'Ciężka lekcja czasu i granic: konieczność spłacenia dawnych zobowiązań i zamknięcia niedojrzałych rozdziałów przeszłości.'
    },
    'node-node': {
      h: 'Wspólny wektor pokoleniowy i duchowy. Idziecie przez życie z tym samym kompasem ewolucyjnym i poczuciem misji.',
      c: 'Opozycja węzłów karmicznych (pełnia przeznaczenia) — to, co dla jednej osoby jest przeszłością, dla drugiej stanowi przyszłość.'
    },
    'pluto-venus': {
      h: 'Hipnotyczna alchemia pożądania i emocjonalnego zespolenia. Miłość o plutonicznej głębi, która odrzuca powierzchowność i przemienia oboje.',
      c: 'Indeks obsesji: magnetyczne uzależnienie, zazdrość i gra o władzę nad sercem partnera — więź niemal niemożliwa do zerwania.'
    },
    'mars-pluto': {
      h: 'Pierwotna, nieokiełznana siła seksualna i wola przetrwania. Razem stanowicie niepokonaną potęgę zdolną przenosić góry.',
      c: 'Starcie tytanów: ekstremalne napięcie erotyczne i walka o dominację. Wymaga absolutnej uczciwości, by pasja nie zmieniła się w wojnę.'
    },
    'moon-pluto': {
      h: 'Psychologiczna rentgenowska bliskość. Wyczuwacie swoje niewypowiedziane lęki i pragnienia na poziomie podświadomym.',
      c: 'Emocjonalny wir i zaborczość: lęk przed utratą kontroli prowadzi do testowania wierności i prób zawłaszczenia duszy partnera.'
    },
    'pluto-sun': {
      h: 'Głęboka regeneracja i przebudzenie osobistej mocy. Obecność partnera wydobywa z Ciebie charyzmę, o której istnieniu nie wiedziałeś.',
      c: 'Walka o suwerenność ego: silny opór przed zdominowaniem przez magnetyczną osobowość drugiej strony.'
    },
    'lilith-venus': {
      h: 'Uwolnienie zmysłowego tabu. Bezpieczna przestrzeń na dzikość, estetyczną śmiałość i spełnienie ukrytych fantazji miłosnych.',
      c: 'Zakazany owoc: fascynacja tym, co nieosiągalne lub niebezpieczne; napięcie między oficjalną rolą partnera a cieniem pożądania.'
    },
    'lilith-mars': {
      h: 'Surowy, bezwstydny magnetyzm cielesny. Instynktowne rozpoznanie swoich najgłębszych impulsów erotycznych bez cenzury.',
      c: 'Prowokacja i nieposkromiony bunt: dzika chemia fizyczna, która nie toleruje podporządkowania ani domowej rutyny.'
    },
    'lilith-moon': {
      h: 'Uzdrowienie odrzuconych części duszy. Akceptacja mroczniejszych nastrojów i pierwotnej intuicji partnera.',
      c: 'Konfrontacja bezpieczeństwa domowego z lękiem przed opuszczeniem i emocjonalnym wygnaniem.'
    },
    'lilith-sun': {
      h: 'Magnetyzm autentyczności. Partner fascynuje swoją niezależnością, niepokornością i odmową grania społecznych ról.',
      c: 'Cień dumy: podświadome testowanie granic autonomii i prowokowanie autorytetu drugiej strony.'
    },
    'lilith-pluto': {
      h: 'Podwójny kod cienia i transformacji. Zdolność do wspólnego zejścia w najgłębsze warstwy psychiki i tabu bez lęku.',
      c: 'Skrajna intensywność podświadoma — przyciąganie oparte na tajemnicy, obsesji i nieujawnionych pragnieniach.'
    }
  };

  const JUPITER_GLYPH = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style="display:inline-block;vertical-align:-2px;" xmlns="http://www.w3.org/2000/svg"><g transform="translate(12,12)"><path d="M-5,-4 C-5,-8 1,-8 1,-4 C1,1 -5,1 -5,4 L7,4 M3,-4 L3,10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></svg>';

  function buildFullDossier(d) {
    const extA = U.calcExtendedBodies(d.dateA, document.getElementById('timeA')?.value || '', d.cA);
    const extB = U.calcExtendedBodies(d.dateB, document.getElementById('timeB')?.value || '', d.cB);

    const bodyDefs = [
      { key: 'sun', label: 'Słońce', glyph: '☉', role: 'Rdzeń Ego' },
      { key: 'moon', label: 'Księżyc', glyph: '☽', role: 'Baza Emocji' },
      { key: 'mercury', label: 'Merkury', glyph: '☿', role: 'Kod Komunikacji' },
      { key: 'venus', label: 'Wenus', glyph: '♀', role: 'Estetyka i Miłość' },
      { key: 'mars', label: 'Mars', glyph: '♂', role: 'Pożądanie i Gniew' },
      { key: 'jupiter', label: 'Jowisz', glyph: JUPITER_GLYPH, role: 'Ekspansja i Dar' },
      { key: 'saturn', label: 'Saturn', glyph: '♄', role: 'Trwałość i Granice' },
      { key: 'pluto', label: 'Pluton', glyph: '♇', role: 'Obsesja i Władza' },
      { key: 'lilith', label: 'Lilith', glyph: '⚸', role: 'Tabu i Cień Pożądania' },
      { key: 'node', label: 'Węzeł Płn.', glyph: '☊', role: 'Oś Przeznaczenia' }
    ];

    const posA = {}, posB = {};
    const elemCount = { 'Ogień': 0, 'Ziemia': 0, 'Powietrze': 0, 'Woda': 0 };
    const modCount  = { 'Kardynalna': 0, 'Stała': 0, 'Zmienna': 0 };

    bodyDefs.forEach(b => {
      posA[b.key] = U.formatPos(extA[b.key]);
      posB[b.key] = U.formatPos(extB[b.key]);
      if (b.key !== 'pluto' && b.key !== 'lilith') {
        elemCount[posA[b.key].element]++;
        elemCount[posB[b.key].element]++;
        modCount[posA[b.key].modality]++;
        modCount[posB[b.key].modality]++;
      }
    });

    const fullAspects = [];
    const tabooAspects = [];
    const PERSONAL_KEYS = new Set(['sun', 'moon', 'mercury', 'venus', 'mars']);
    const EROTIC_CORE_KEYS = new Set(['sun', 'moon', 'venus', 'mars']);
    const SLOW_KEYS = new Set(['jupiter', 'saturn', 'pluto', 'node']);

    const elemCompat = (el1, el2) => {
      if (el1 === el2) return 1.0;
      if ((el1 === 'Ogień' && el2 === 'Powietrze') || (el1 === 'Powietrze' && el2 === 'Ogień')) return 0.65;
      if ((el1 === 'Ziemia' && el2 === 'Woda') || (el1 === 'Woda' && el2 === 'Ziemia')) return 0.65;
      return -0.55;
    };

    // 1. Bazowa Komunikacja (Merkury A x Merkury B + pomost emocjonalny Merkury x Księżyc)
    let commScore = 56;
    commScore += elemCompat(posA.mercury.element, posB.mercury.element) * 8.0;
    commScore += elemCompat(posA.mercury.element, posB.moon.element) * 3.5;
    commScore += elemCompat(posB.mercury.element, posA.moon.element) * 3.5;
    commScore += (elemCount['Powietrze'] - 3.5) * 1.4;
    const mercDiff = Math.abs(extA.mercury - extB.mercury);
    const mercAngle = mercDiff > 180 ? 360 - mercDiff : mercDiff;
    if (Math.abs(mercAngle - 150) <= 5.0) commScore -= 5.5;

    // 2. Bazowa Trwałość (Saturn + żywioł Ziemi + jakość Stała + stabilność Słońc i Księżyców)
    let saturnBond = 54;
    saturnBond += (elemCount['Ziemia'] - 3.5) * 2.0;
    if (modCount['Stała'] >= 4 && modCount['Stała'] <= 7) saturnBond += 4.5;
    else if (modCount['Stała'] <= 1) saturnBond -= 5.0;
    else if (modCount['Stała'] >= 9) saturnBond -= 2.5;
    saturnBond += elemCompat(posA.sun.element, posB.sun.element) * 3.5;
    saturnBond += elemCompat(posA.moon.element, posB.moon.element) * 4.0;

    // 3. Bazowy Indeks Obsesji i Tabu (Pluton x Lilith + sygnatura Skorpiona)
    let obsessionScore = 36;
    ['sun', 'moon', 'venus', 'mars'].forEach(k => {
      if (posA[k].name === 'Skorpion') obsessionScore += 3.5;
      if (posB[k].name === 'Skorpion') obsessionScore += 3.5;
    });
    if (posA.lilith.name === 'Skorpion') obsessionScore += 2.5;
    if (posB.lilith.name === 'Skorpion') obsessionScore += 2.5;

    let karmaHits = 0;
    const orbWeight = (orb, maxOrb) => Math.max(0.15, Math.pow(1 - (orb / maxOrb), 1.4));

    for (const bA of bodyDefs) {
      for (const bB of bodyDefs) {
        // Odrzucenie pokoleniowego szumu (wolna planeta do wolnej planety, np. Pluton-Pluton, Saturn-Pluton)
        if (SLOW_KEYS.has(bA.key) && SLOW_KEYS.has(bB.key)) continue;
        if (bA.key === 'lilith' && bB.key === 'lilith' && Math.abs(extA.jd - extB.jd) < 150) continue;

        const diff = Math.abs(extA[bA.key] - extB[bB.key]);
        const angle = diff > 180 ? 360 - diff : diff;
        const hasLilith = (bA.key === 'lilith' || bB.key === 'lilith');
        const hasPlutoOrSat = (bA.key === 'pluto' || bB.key === 'pluto' || bA.key === 'saturn' || bB.key === 'saturn');

        const maxConj = hasLilith ? 5.2 : (hasPlutoOrSat ? 6.2 : 7.6);
        const maxTrine = hasLilith ? 4.6 : (hasPlutoOrSat ? 5.6 : 6.8);
        const maxSext = hasLilith ? 3.8 : (hasPlutoOrSat ? 4.6 : 5.5);
        const maxSq = hasLilith ? 4.6 : (hasPlutoOrSat ? 5.6 : 6.5);
        const maxOpp = hasLilith ? 5.2 : (hasPlutoOrSat ? 6.2 : 7.2);

        let asp = null;
        if (angle <= maxConj) asp = { name: 'Koniunkcja', sym: '☌', exact: 0, orb: angle, maxOrb: maxConj, tone: 'intense', color: '#C9A96E' };
        else if (Math.abs(angle - 120) <= maxTrine) asp = { name: 'Trygon', sym: '△', exact: 120, orb: Math.abs(angle - 120), maxOrb: maxTrine, tone: 'harmony', color: '#34D399' };
        else if (Math.abs(angle - 60) <= maxSext) asp = { name: 'Sekstyl', sym: '⚹', exact: 60, orb: Math.abs(angle - 60), maxOrb: maxSext, tone: 'harmony', color: '#34D399' };
        else if (Math.abs(angle - 90) <= maxSq) asp = { name: 'Kwadratura', sym: '□', exact: 90, orb: Math.abs(angle - 90), maxOrb: maxSq, tone: 'friction', color: '#FB7185' };
        else if (Math.abs(angle - 180) <= maxOpp) asp = { name: 'Opozycja', sym: '☍', exact: 180, orb: Math.abs(angle - 180), maxOrb: maxOpp, tone: 'polar', color: '#F59E0B' };

        if (asp) {
          const pairKey = [bA.key, bB.key].sort().join('-');
          const isHarm = asp.tone === 'harmony' || asp.tone === 'intense';
          const w = orbWeight(asp.orb, asp.maxOrb);

          // A) Algorytm Merkurego (Komunikacja)
          if (bA.key === 'mercury' || bB.key === 'mercury') {
            const other = bA.key === 'mercury' ? bB.key : bA.key;
            if (['mercury', 'sun', 'moon', 'venus', 'jupiter', 'node'].includes(other)) {
              const mWeight = other === 'mercury' ? 1.35 : (other === 'moon' || other === 'sun' ? 1.15 : 0.95);
              if (asp.tone === 'harmony' || asp.tone === 'intense') commScore += 11.0 * w * mWeight;
              else if (asp.tone === 'polar') commScore -= 4.5 * w * mWeight;
              else commScore -= 8.0 * w * mWeight;
            } else if (other === 'mars') {
              if (asp.tone === 'harmony') commScore += 5.5 * w;
              else if (asp.tone === 'intense') commScore -= 4.5 * w;
              else commScore -= 9.5 * w;
            } else if (other === 'saturn') {
              if (asp.tone === 'harmony') commScore += 6.5 * w;
              else if (asp.tone === 'intense') commScore -= 4.0 * w;
              else commScore -= 10.5 * w;
            } else if (other === 'pluto' || other === 'lilith') {
              if (asp.tone === 'harmony') commScore += 4.0 * w;
              else commScore -= 5.5 * w;
            }
          }

          // B) Algorytm Saturna (Trwałość i Granice — tylko kontakty z planetami osobistymi i Węzłem)
          if (bA.key === 'saturn' || bB.key === 'saturn') {
            const other = bA.key === 'saturn' ? bB.key : bA.key;
            if (PERSONAL_KEYS.has(other) || other === 'node') {
              const coreWeight = (other === 'sun' || other === 'moon' || other === 'venus') ? 1.3 : 0.85;
              if (asp.tone === 'harmony') saturnBond += 13.0 * w * coreWeight;
              else if (asp.tone === 'intense') saturnBond += (other === 'mars' ? 2.5 : (other === 'moon' ? 6.5 : 10.5)) * w * coreWeight;
              else if (asp.tone === 'polar') saturnBond -= 6.5 * w * coreWeight;
              else if (asp.tone === 'friction') saturnBond -= 9.5 * w * coreWeight;
            }
          }

          // C) Aktywacje Węzła Północnego (tylko z planetami osobistymi lub Lilith)
          if ((bA.key === 'node' && PERSONAL_KEYS.has(bB.key)) || (bB.key === 'node' && PERSONAL_KEYS.has(bA.key))) {
            karmaHits++;
            if (asp.tone === 'harmony' || asp.tone === 'intense') saturnBond += 3.5 * w;
          }

          // D) Algorytm Obsesji i Tabu (Pluton x Lilith w kontakcie z planetami osobistymi lub nawzajem)
          const isPlutoOrLilithA = (bA.key === 'pluto' || bA.key === 'lilith');
          const isPlutoOrLilithB = (bB.key === 'pluto' || bB.key === 'lilith');
          let isTabooHit = false;
          if (isPlutoOrLilithA || isPlutoOrLilithB) {
            const other = isPlutoOrLilithA ? bB.key : bA.key;
            const validTabooPair = EROTIC_CORE_KEYS.has(other)
              || (other === 'mercury' && (asp.tone === 'intense' || asp.tone === 'friction' || asp.tone === 'polar'))
              || (isPlutoOrLilithA && isPlutoOrLilithB && !(bA.key === 'pluto' && bB.key === 'pluto'));

            if (validTabooPair) {
              isTabooHit = true;
              const mult = (other === 'venus' || other === 'mars') ? 1.4
                         : (other === 'moon' || other === 'lilith' || other === 'pluto') ? 1.15
                         : (other === 'sun' ? 1.0 : 0.65);
              const basePts = asp.tone === 'intense' ? 16.5
                            : (asp.tone === 'friction' || asp.tone === 'polar') ? 14.0
                            : 7.5;
              obsessionScore += basePts * w * mult;
            }
          }

          const flowLead = isHarm
            ? `Harmonijny przepływ między sferą „${bA.role}” (${d.nameA}) a „${bB.role}” (${d.nameB}).`
            : `Dynamiczne tarcie między sferą „${bA.role}” (${d.nameA}) a „${bB.role}” (${d.nameB}).`;
          const pairDetail = PAIR_TEXTS[pairKey]
            ? (isHarm ? PAIR_TEXTS[pairKey].h : PAIR_TEXTS[pairKey].c)
            : (isHarm
                ? `Naturalna synergia żywiołów (${posA[bA.key].element} i ${posB[bB.key].element}), która wzmacnia wzajemne zaufanie.`
                : `Konfrontacja odmiennych jakości (${posA[bA.key].element} i ${posB[bB.key].element}), wymagająca świadomej integracji.`);
          const customDesc = `${flowLead} ${pairDetail}`;

          const item = {
            bA, bB, posA: posA[bA.key], posB: posB[bB.key],
            ...asp,
            orbStr: `${asp.orb.toFixed(1)}°`,
            desc: customDesc
          };
          fullAspects.push(item);
          if (isTabooHit) {
            tabooAspects.push(item);
          }
        }
      }
    }

    fullAspects.sort((a, b) => a.orb - b.orb);
    tabooAspects.sort((a, b) => a.orb - b.orb);

    const HOUSE_MEANINGS = {
      1: '1. Dom (Tożsamość i Magnetyzm Fizyczny) — natychmiastowa fascynacja wyglądem, aurą i mową ciała.',
      2: '2. Dom (Zmysłowość i Zasoby) — budowanie wspólnego dobrobytu, poczucia wartości i dotyku.',
      3: '3. Dom (Umysł i Codzienny Dialog) — telepatyczne porozumienie, rozmowy do świtu i wspólna ciekawość.',
      4: '4. Dom (Dom, Korzenie i Intymny Azyl) — głębokie poczucie „powrotu do domu” i bezpieczeństwa rodzinnego.',
      5: '5. Dom (Romans, Pasja i Kreacja) — czysta radość flirtu, gorąca zabawa erotyczna i motyle w brzuchu.',
      6: '6. Dom (Rytuały Codzienności i Troska) — praktyczne wsparcie, uważność i wzajemne dbanie o zdrowie.',
      7: '7. Dom (Oś Małżeństwa i Partnerstwa) — klasyczny wskaźnik długoterminowego związku i dopełnienia.',
      8: '8. Dom (Seks, Tabu i Fuzja Finansowa) — hipnotyczne, obsesyjne zespolenie ciał, tajemnic i wspólnych zasobów.',
      9: '9. Dom (Podróże i Wspólny Horyzont) — wzajemna inspiracja filozoficzna, rozwój i dalekie wyprawy.',
      10: '10. Dom (Status, Ambicja i Prestiż) — para jako „Power Couple” budująca wspólny autorytet w świecie.',
      11: '11. Dom (Przyjaźń i Wspólna Przyszłość) — więź bratnich dusz, wolność i realizacja wspólnych marzeń.',
      12: '12. Dom (Podświadomość, Sny i Karma) — mistyczna, ukryta przed światem telepatia i duchowe zespolenie.'
    };

    const getHouse = (lon, asc) => Math.floor(U.norm360(lon - asc) / 30) + 1;
    const houseOverlays = [];
    const overlayTargets = [
      { key: 'sun', label: 'Słońce', glyph: '☉' },
      { key: 'moon', label: 'Księżyc', glyph: '☽' },
      { key: 'venus', label: 'Wenus', glyph: '♀' },
      { key: 'mars', label: 'Mars', glyph: '♂' },
      { key: 'lilith', label: 'Lilith', glyph: '⚸' }
    ];

    if (extA.hasTime && extA.asc !== null) {
      const ascPosA = U.formatPos(extA.asc);
      overlayTargets.forEach(t => {
        const h = getHouse(extB[t.key], extA.asc);
        const deltaDeg = U.norm360(extB[t.key] - extA.asc).toFixed(1);
        const cuspStart = U.formatPos(extA.asc + (h - 1) * 30);
        const cuspEnd = U.formatPos(extA.asc + h * 30);
        houseOverlays.push({
          owner: d.nameA, guest: d.nameB, body: t, bodyPos: posB[t.key],
          ascPos: ascPosA, cuspStart, cuspEnd, deltaDeg,
          house: h, meaning: HOUSE_MEANINGS[h]
        });
      });
    }
    if (extB.hasTime && extB.asc !== null) {
      const ascPosB = U.formatPos(extB.asc);
      overlayTargets.forEach(t => {
        const h = getHouse(extA[t.key], extB.asc);
        const deltaDeg = U.norm360(extA[t.key] - extB.asc).toFixed(1);
        const cuspStart = U.formatPos(extB.asc + (h - 1) * 30);
        const cuspEnd = U.formatPos(extB.asc + h * 30);
        houseOverlays.push({
          owner: d.nameB, guest: d.nameA, body: t, bodyPos: posA[t.key],
          ascPos: ascPosB, cuspStart, cuspEnd, deltaDeg,
          house: h, meaning: HOUSE_MEANINGS[h]
        });
      });
    }

    // Composite & Davison & Ebertin Midpoints
    const compSun  = U.formatPos(U.shortArcMidpoint(extA.sun, extB.sun));
    const compMoon = U.formatPos(U.shortArcMidpoint(extA.moon, extB.moon));
    const compVen  = U.formatPos(U.shortArcMidpoint(extA.venus, extB.venus));
    const compMar  = U.formatPos(U.shortArcMidpoint(extA.mars, extB.mars));
    const meanJD   = (extA.jd + extB.jd) / 2;
    const davisonDate = U.jdToDateString(meanJD);

    const mpSunMoonA = U.formatPos(U.shortArcMidpoint(extA.sun, extA.moon));
    const mpSunMoonB = U.formatPos(U.shortArcMidpoint(extB.sun, extB.moon));
    const mpVenMarA  = U.formatPos(U.shortArcMidpoint(extA.venus, extA.mars));
    const mpVenMarB  = U.formatPos(U.shortArcMidpoint(extB.venus, extB.mars));

    // Ebertin 90° Dial Cross-Hits (Orb <= 2.5° on 90° dial)
    const dial90Diff = (x, y) => {
      const d90 = Math.abs((x % 90) - (y % 90));
      return d90 > 45 ? 90 - d90 : d90;
    };
    const ebertinMarriageDelta = dial90Diff(mpSunMoonA.lon, mpSunMoonB.lon);
    const ebertinDesireDelta   = dial90Diff(mpVenMarA.lon, mpVenMarB.lon);

    if (ebertinMarriageDelta <= 4.5) saturnBond += (5.0 - ebertinMarriageDelta);
    if (ebertinDesireDelta <= 4.5) obsessionScore += (5.5 - ebertinDesireDelta);

    // Wpływ Nakładki Domów (jeśli podano godzinę urodzenia)
    if (houseOverlays.length > 0) {
      houseOverlays.forEach(o => {
        if (o.house === 3) commScore += 2.5;
        if (o.house === 7 || o.house === 4) saturnBond += 2.5;
        if (o.house === 8) obsessionScore += 4.5;
      });
    }

    const clamp = (v, min, max) => Math.max(min, Math.min(max, Math.round(v)));
    const commFinal = clamp(commScore, 34, 96);
    const saturnFinal = clamp(saturnBond, 35, 95);
    const obsessionFinal = clamp(obsessionScore, 29, 96);
    const totalIndex = clamp((d.syn.chemistry * 0.3 + d.syn.security * 0.3 + commFinal * 0.2 + saturnFinal * 0.2), 42, 97);

    return {
      bodyDefs, posA, posB, elemCount, modCount,
      fullAspects: fullAspects.slice(0, 16),
      tabooAspects: tabooAspects.slice(0, 6),
      houseOverlays,
      compSun, compMoon, compVen, compMar, davisonDate, meanJD, jdA: extA.jd, jdB: extB.jd,
      mpSunMoonA, mpSunMoonB, mpVenMarA, mpVenMarB,
      ebertinMarriageDelta, ebertinDesireDelta,
      commFinal, saturnFinal, obsessionFinal, karmaHits, totalIndex
    };
  }

  window.__SYNASTRY_BUILD_DOSSIER__ = buildFullDossier;
})();

(function () {
  const COMPOSITE_ARCHETYPES = [
    'Dynamiczny Katalizator (Kompozyt w Baranie) — Wasz związek żyje ruchem, pasją, inicjatywą i wspólnym zdobywaniem świata. Trzecia Encja tej relacji nie znosi stagnacji: potrzebujecie wspólnych wyzwań, by iskra nie zmieniła się w zniecierpliwienie.',
    'Zmysłowe Imperium (Kompozyt w Byku) — Trzecia Encja Waszej relacji dąży do budowania namacalnego piękna, bezpieczeństwa materialnego, rytuałów dotyku i niezachwianej lojalności. To architektura spokoju, w której liczy się jakość, smak i czas.',
    'Intelektualny Salon (Kompozyt w Bliźniętach) — Fundamentem Waszego „My” jest nieustanny dialog, wymiana idei, wspólne podróże i ciekawość, która nigdy się nie starzeje. Zbliża Was rozmowa do świtu i wspólne odkrywanie nowych perspektyw.',
    'Intymne Sanktuarium (Kompozyt w Raku) — Wasza relacja tworzy zamknięty, głęboko chroniony azyl emocjonalny. Razem budujecie dom dusz, w którym można zrzucić każdą społeczną maskę i doświadczyć bezwarunkowej czułości.',
    'Królewska Scena (Kompozyt we Lwie) — Wasz sojusz promieniuje ciepłem, dumą, hojnością i rozmachem. Jesteście dla siebie nawzajem lustrem wielkości i życiowej kreacji — relacja kwitnie, gdy okazujecie sobie podziw i królewski gest.',
    'Alchemia Precyzji (Kompozyt w Pannie) — Wasza więź opiera się na codziennej uważności, wzajemnym wsparciu w rozwoju i trosce wyrażanej przez konkretne czyny, nie puste obietnice. Razem doskonalicie swoje życie i dajecie sobie realne oparcie.',
    'Estetyczna Harmonia (Kompozyt w Wadze) — Relacja zaprojektowana jak dzieło sztuki. Szukacie w sobie piękna, dyplomacji, symetrii i wyrafinowanego partnerstwa, w którym żaden głos nie dominuje kosztem drugiego.',
    'Magnetyczny Węzeł (Kompozyt w Skorpionie) — Więź o ekstremalnej głębi psychologicznej, intymnej i transformacyjnej. Ta relacja nie toleruje półśrodków ani powierzchowności: wymaga całkowitego obnażenia prawdy i absolutnej wierności.',
    'Wspólny Horyzont (Kompozyt w Strzelcu) — Wasz związek to ekspedycja filozoficzna, duchowa i podróżnicza. Dajecie sobie wiatr w skrzydła, wolność oddechową i wizję życia znacznie większego niż szara codzienność.',
    'Ponadczasowa Twierdza (Kompozyt w Koziorożcu) — Relacja o architekturze Old Money: dyskretna, poważna, obliczona na dekady wspólnego budowania statusu, autorytetu i nienaruszalnego zaufania.',
    'Awangardowy Sojusz (Kompozyt w Wodniku) — Wasze „My” łamie utarte schematy społeczne. Łączycie głęboką przyjaźń intelektualną z bezwzględnym szacunkiem dla indywidualnej przestrzeni i oryginalności partnera.',
    'Mistyczna Osmoza (Kompozyt w Rybach) — Więź telepatyczna, poetycka i duchowa. Rozumiecie swoje nastroje, sny i wrażliwość bez słów, tworząc własny, intymny mikroświat chroniony przed hałasem świata.'
  ];

  function getVerdict(d, dos) {
    const { chemistry, security, friction } = d.syn;
    if (chemistry >= 80 && dos.karmaHits >= 2) {
      return {
        title: 'ARCHETYP PRZEZNACZENIA (KARMICZNA ALCHEMIA)',
        summary: `Między ${d.nameA} (${d.sunA.name}) a ${d.nameB} (${d.sunB.name}) zachodzi rzadki rezonans osi karmicznej (${dos.karmaHits} ścisłych aktywacji Węzła Północnego ☊) połączony z potężnym magnetyzmem (${chemistry}%). To relacja o charakterze inicjacyjnym — spotkanie aktywuje najgłębsze warstwy podświadomości i zmienia trajektorię obu życiorysów.`
      };
    }
    if (chemistry >= 78 && friction >= 60) {
      return {
        title: 'MAGNETYCZNY PARADOKS (OGIEŃ I LÓD)',
        summary: `Ekstremalne przyciąganie Wenus–Mars (${chemistry}%) ściera się tu z wysokim ładunkiem napięcia dynamicznego (${friction}%). Wasza relacja generuje potężną temperaturę emocjonalną: ta sama polaryzacja, która wywołuje fascynację od pierwszego spojrzenia, w chwilach stresu wymaga dojrzałego zarządzania granicami.`
      };
    }
    if (security >= 75 && dos.saturnFinal >= 70) {
      return {
        title: 'KRÓLEWSKA TWIERDZA (SOJUSZ DŁUGODYSTANSOWY)',
        summary: `Wyjątkowa harmonia świateł horoskopu (${security}%) wsparta silną sferą Trwałości i Granic Saturna (${dos.saturnFinal}%). Wasze kosmogramy tworzą stabilną, dyskretną architekturę zaufania, w której namiętność i bliskość mają szansę dojrzewać przez lata bez lęku o fundamenty.`
      };
    }
    return {
      title: 'SOJUSZ EWOLUCYJNY (LUSTRO TRANSFORMACJI)',
      summary: `Wielowymiarowy układ kosmogramów (Indeks Całkowity: ${dos.totalIndex}%), w którym różnice temperamentów ${d.nameA} (${d.sunA.name}, Księżyc w znaku ${dos.posA.moon.gen}) i ${d.nameB} (${d.sunB.name}, Księżyc w znaku ${dos.posB.moon.gen}) działają jak katalizator dojrzałości emocjonalnej, erotycznej i intelektualnej.`
    };
  }

  const MIDPOINT_SIGN_DESCRIPTIONS = {
    desire: [
      'Pożądanie zapala się natychmiastowym żarem, bezpośredniością i zuchwałą inicjatywą; nie znosi gierek ani czekania.',
      'Zmysłowość gęsta, powolna i namacalna; rozpala ją dotyk skóry, zapach, wykwintne jedzenie i brak pośpiechu.',
      'Zapłon erotyczny zaczyna się w głowie; błyskotliwy flirt, szermierka słowna, prowokujący żart i dwuznaczność.',
      'Namiętność spleciona z czułością i zaufaniem; otwiera się w pełni dopiero w intymnym, bezpiecznym azylu.',
      'Pożądanie karmi się podziwem, celebracją i dumą; pragnie królewskiego gestu, adoracji i poczucia bycia kimś jedynym.',
      'Zmysłowość dyskretna, wysublimowana i uważna; rozbraja ją czystość intencji i uważność na subtelne sygnały ciała.',
      'Erotyka jako sztuka harmonii i uwodzenia; kluczem jest estetyka, nastrojowa oprawa, gra spojrzeń i partnerska równość.',
      'Ekstremalny magnetyzm, namiętność totalna i bezkompromisowa; szuka połączenia na krawędzi tabu bez cenzury.',
      'Pożądanie dzikie, radosne i pełne wolności; zapala się w przygodzie i śmiechu, a gaśnie przy próbach kontroli.',
      'Wytrawny, głęboki żar ukryty pod powściągliwością; zyskuje z czasem, rozpala go siła charakteru, dojrzałość i klasa.',
      'Elektryzująca, niekonwencjonalna fascynacja; pociąga to, co wymyka się schematom, wolność i oryginalność.',
      'Namiętność mistyczna, romantyczna i bezgraniczna; rozpala ją poezja chwili, zmysłowa melancholia i zatracenie granic.'
    ],
    marriage: [
      'Partnerstwo oparte na wspólnej odwadze, szczerości i działaniu; spełnienie daje partner, który nie gasi autonomii.',
      'Związek jako bezpieczna, trwała twierdza; wymaga zmysłowego spokoju, lojalności i wspólnego budowania dobrostanu.',
      'Więź oparta na przyjaźni, ciągłej rozmowie i ciekawości świata; harmonia rodzi się z lekkości i swobody myśli.',
      'Głębokie gniazdo emocjonalne i czuła troska; jedność buduje się przez chronienie swoich wrażliwości i domowe ciepło.',
      'Sojusz pełen dumy i wzajemnego podziwu; spełnienie daje partner, przy którym można błyszczeć i czuć szacunek.',
      'Cicha lojalność, szacunek i codzienna troska; bezpieczeństwo płynie z niezawodności w trudach i wzajemnej pomocy.',
      'Małżeństwo jako idealna harmonia, dyplomacja i symetria; spełnienie daje poczucie równości i kultura bycia.',
      'Nierozerwalny pakt dusz bez miejsca na półprawdy; spełnienie wymaga bezwzględnej lojalności i całkowitego zaufania.',
      'Sojusz wolnych dusz ku wspólnemu horyzontowi; więź umacniają wspólne idee, podróże i przestrzeń na własny oddech.',
      'Ponadczasowa architektura zaufania; małżeństwo jak projekt na dekady budowany na odpowiedzialności i klasie.',
      'Nowoczesne partnerstwo oparte na lojalnej przyjaźni i równości; spełnienie daje brak sztywnych konwenansów.',
      'Więź duchowa i bezwarunkowa; poczucie „człowieka na całe życie” rodzi się ze zrozumienia bez słów i empatii.'
    ],
    compSun: [
      'Wspólną tożsamością jest odwaga i przecieranie nowych szlaków; relacja rozkwita przy wspólnych wyzwaniach.',
      'Misją związku jest budowanie trwałego dobrostanu, spokoju, piękna i zmysłowej stabilności na lata.',
      'Tożsamość oparta na dialogu, wymianie myśli i podróżach; zbliża Was stymulacja umysłowa i wspólny humor.',
      'Związek istnieje, by stworzyć intymny azyl emocjonalny, w którym oboje zrzucacie każdą społeczną maskę.',
      'Para stworzona, by promieniować ciepłem, dumą i twórczym rozmachem; relacja kwitnie przy wzajemnym podziwie.',
      'Uważność, porządek i realne wsparcie w codzienności; razem doskonalicie życie i dajecie sobie praktyczne oparcie.',
      'Związek jak dzieło sztuki — poszukiwanie harmonii, estetyki, dyplomacji i wyrafinowanego partnerstwa.',
      'Więź o potężnym ładunku transformacji; istniejecie, by poznać najgłębszą prawdę o sobie i uzdrowić dawne rany.',
      'Życie jako wielka wyprawa filozoficzno-podróżnicza; dajecie sobie nawzajem optymizm i wiarę w wielkie cele.',
      'Związek w stylu Old Money: dyskretny, poważny, obliczony na wspólne budowanie autorytetu i nienaruszalnej pozycji.',
      'Łamanie utartych schematów; łączycie głębokie partnerstwo intelektualne z szacunkiem dla wolności partnera.',
      'Więź poetycka i duchowa; rozumiecie swoje nastroje bez słów, tworząc intymny mikroświat chroniony przed zgiełkiem.'
    ],
    compMoon: [
      'Klimat domowy gorący, szczery i pełen ognia; napięcia oczyszczacie natychmiastową rozmową i spontanicznością.',
      'Zmysłowy relaks, ciepło i spokój w czterech ścianach; dom jest bezpieczną twierdzą o niespiesznym rytmie.',
      'Klimat karmi się rozmową; ulgę przynosi wspólny śmiech, dyskusje i lekkość — dusi Was ciężka atmosfera.',
      'Głęboka intymność, czułość i wzajemne wyczuwanie nastrojów; Wasz dom staje się sanktuarium czułości.',
      'W domowym azylu potrzebujecie serdeczności i komplementów; uczucia rozkwitają przy szczerym zachwycie.',
      'Spokój przynoszą codzienne rytuały, troska wyrażana czynami i porządek; bezpieczeństwo daje wzajemna niezawodność.',
      'Najważniejszy jest spokój, delikatność i brak agresji; regenerujecie się w pięknym, harmonijnym otoczeniu.',
      'Skrajna głębia emocjonalna i potrzeba wyłączności; przetrwanie wspólnych kryzysów cementuje Wasze serca.',
      'Domowy klimat pełen optymizmu, luzu i humoru; emocjonalną regenerację przynosi planowanie nowych wyjazdów.',
      'Emocje powściągliwe, ale niesamowicie wierne i trwałe; bezpieczeństwo daje odpowiedzialność i obecność.',
      'Swoboda emocjonalna bez duszącej kontroli; odpoczywacie, dając sobie nawzajem przestrzeń na pasje i autonomię.',
      'Oceaniczna czułość, intuicyjne współodczuwanie i poezja; atmosfera marzeń, empatii i duchowego schronienia.'
    ],
    compVenus: [
      'Miłość pełna żaru, niespodzianek i śmiałych gestów; randki z adrenaliną i podarunki wywołujące szybsze bicie serca.',
      'Zmysłowy luksus, wykwintne kolacje, jedwab i aromaty; miłość wyraża się przez dotyk, komfort i namacalne piękno.',
      'Flirt słowny, wspólne wyjścia, spontaniczne bilety i upominki z dowcipem; w miłości podnieca Was świeżość i lekkość.',
      'Romantyzm intymny, pamiątki z historią i kolacje we dwoje mówiące: „chronię to, co między nami najczulsze”.',
      'Królewski gest, hojność, celebracja randek i prezenty podkreślające wyjątkowość ukochanej osoby i blask relacji.',
      'Czułość ukryta w dyskretnej trosce; prezenty perfekcyjnie dobrane pod potrzeby partnera i dbałość o wspólny spokój.',
      'Klasyczny romantyzm: harmonia formy, Quiet Luxury, sztuka, teatr, kwiaty i kultura wzajemnego uwodzenia.',
      'Zmysłowe napięcie, intrygujące prezenty z nutą tajemnicy, nocne rozmowy i bliskość bez barier intymnych.',
      'Randki w drodze, bilety lotnicze, egzotyczne smaki i obdarowywanie się doświadczeniami, które otwierają horyzont.',
      'Elegancja Old Money, szlachetne materiały, rocznikowe trunki i przedmioty, które zyskują na wartości z czasem.',
      'Niszowe perfumy, awangardowy design i randki łamiące schematy; łączy Was oryginalność i szacunek dla odmienności.',
      'Magia, nastrojowa muzyka, zmysłowe kadzidła i prezenty odwołujące się do Waszych snów i duchowej bliskości.'
    ],
    compMars: [
      'Błyskawiczna inicjatywa, pasja i gorąca temperatura w sypialni; decyzje podejmujecie szybko i bez wahania.',
      'Wytrwałość, upór i zmysłowa, niespieszna siła; w intymności liczy się trwałość, cierpliwość i konsekwencja.',
      'Spryt, elastyczność i erotyka stymulowana umysłowo; napięcia rozładowujecie celnym żartem lub dynamicznym dialogiem.',
      'Działanie napędzane obroną relacji i bezpieczeństwem; w intymności potrzebujecie delikatności i emocjonalnej ochrony.',
      'Twórczy rozmach, odwaga i namiętność pełna żaru; działacie z dumą i pewnością siebie, celebrując sukcesy.',
      'Przemyślana strategia, precyzja i skuteczność; wspólne cele osiągacie dzięki żelaznej dyscyplinie i organizacji.',
      'Działanie przez dyplomację, wdzięk i negocjacje; w sporach dążycie do sprawiedliwego kompromisu bez agresji.',
      'Niepowstrzymana determinacja i hipnotyczny magnetyzm w sypialni; w trudnych chwilach działacie z chirurgiczną precyzją.',
      'Entuzjazm, rozmach i apetyt na ryzyko; wspólna energia popycha Was do śmiałych planów i dalekich podróży.',
      'Długofalowe, strategiczne parcie do przodu; Wasza wspólna sprawczość i odporność rosną z każdym rokiem.',
      'Oryginalne, nieszablonowe metody działania; spory rozwiązujecie chłodnym dystansem, nie pozwalając na rutynę.',
      'Intuicyjne, subtelne działanie; w sferze intymnej szukacie całkowitego stopienia dusz i ciał z głęboką wrażliwością.'
    ],
    marriage: [
      'Więź potrzebuje ognia i wyrazistej tożsamości; szukasz partnera odważnego, gotowego iść ramię w ramię bez kompleksów.',
      'Fundamentem jest wierność, dotyk i namacalne bezpieczeństwo; dom musi być stabilną oazą wolną od finansowej i emocjonalnej chwiejności.',
      'Więź karmi się intelektualnym porozumieniem; partner musi być Twoim najlepszym przyjacielem, z którym przegadasz każdą noc.',
      'Głęboka potrzeba intymnego schronienia; partner musi dawać bezwarunkowe ciepło, czułość i absolutną ochronę domowego azylu.',
      'Pragnienie dumy ze związku; partner imponuje klasą i sercem, a wzajemny podziw i lojalność są tlenem dla Waszej miłości.',
      'Bezpieczeństwo rodzi się z codziennej troski, słowności i wzajemnego dbania o zdrowie; liczą się czyny, nie puste deklaracje.',
      'Poszukiwanie harmonii i kultury dialogu; związek ma być estetyczną równowagą, w której spory gasi się z klasą i szacunkiem.',
      'Pragnienie bezwzględnej prawdy i fuzji dusz; partnerstwo na całe życie, które nie boi się kryzysów i odrzuca powierzchowność.',
      'Więź oparta na wspólnym horyzoncie, wolności i humorze; szukasz towarzysza wielkich życiowych podróży i poszerzania granic.',
      'Dojrzały sojusz na dekady; szukasz partnera odpowiedzialnego, z którym zbudujesz niezłomną pozycję i trwałe dziedzictwo.',
      'Partnerstwo wolnych dusz; szacunek dla inności, głęboka lojalność intelektualna i brak duszacych ról społecznych.',
      'Telepatyczna bliskość i duchowe zespolenie; szukasz partnera o wielkiej wrażliwości, z którym słowa stają się zbędne.'
    ],
    desire: [
      'Błyskawiczny zapłon przez śmiałość, inicjatywę i bezpośredni magnetyzm; podnieca bezkompromisowa pewność siebie i ogień.',
      'Zmysłowy zapłon przez dotyk, niespieszne pieszczoty, luksusowe tkaniny, zmysłowe aromaty i cielesne ciepło partnera.',
      'Erotyka stymulowana umysłowo — flirt słowny, szermierka spojrzeń, intrygujące wiadomości i wzajemna ciekawość ciał.',
      'Namiętność rozkwita w poczuciu bezpieczeństwa i bezgranicznej czułości; dotyk musi nieść intymne zaufanie i opiekę.',
      'Królewski zapłon zmysłów; pożądanie rośnie, gdy partner celebruje Twoją atrakcyjność i adoruje Cię z magnetycznym zachwytem.',
      'Zapłon przez dyskretną uważność, estetyczną czystość i zmysłowy detal; pociąga wyczucie, opanowanie i czułość gestu.',
      'Uwodzenie w stylu Quiet Luxury: wyrafinowana gra spojrzeń, nastrojowe światło, wdzięk i nienaganna kultura intymna.',
      'Hipnotyczny, mroczny magnetyzm; zapłon przez intensywne spojrzenie, dotyk na granicy tabu i całkowite zatracenie w partnerze.',
      'Namiętność podsycana spontanicznością i przygodą; erotyczna swoboda, humor i randki poza utartym schematem.',
      'Głęboki, nieposkromiony żar pod chłodną maską; pociąga siła charakteru, prestiż i powolne rozbrajanie dystansu.',
      'Zmysłowa fascynacja oryginalnością i swobodą; podnieca intelektualne porozumienie i wolność od przewidywalności.',
      'Poetycka ekstaza zmysłów; stopienie ciał w nastrojowej muzyce, magicznej aurze i całkowitej emocjonalnej fuzji.'
    ]
  };

  function buildMidpointCardDef(def, signObj, type) {
    const list = MIDPOINT_SIGN_DESCRIPTIONS[type] || [];
    const signText = list[signObj.idx] || '';
    return `
      <div style="line-height:1.55;color:rgba(250,248,245,0.92);">${def}</div>
      <div style="margin-top:0.65rem;padding:0.6rem 0.75rem;background:rgba(201,169,110,0.08);border:1px solid rgba(201,169,110,0.28);border-radius:0.65rem;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:9.5px;text-transform:uppercase;letter-spacing:0.12em;color:var(--champagne);font-weight:700;margin-bottom:0.25rem;">
          ✦ W ZNAKU ${signObj.name.toUpperCase()} (${signObj.glyph})
        </div>
        <div style="font-size:0.79rem;line-height:1.55;color:rgba(250,248,245,0.95);">${signText}</div>
      </div>`;
  }

  function renderTooltipCard(tag, bodyHtml, defText, basisText = '', extraStyle = '') {
    return `
      <div class="syn-stat-box syn-has-tooltip" tabindex="0" ${extraStyle ? `style="${extraStyle}"` : ''}>
        <div class="syn-tag-row">
          <div class="syn-card-tag">${tag}</div>
          <span class="syn-info-pill">ⓘ ZNACZENIE</span>
        </div>
        ${bodyHtml}
        <div class="syn-tooltip-pop" role="tooltip">
          <span class="syn-tt-label">✦ Znaczenie w Waszym Związku</span>
          <div class="syn-tt-def">${defText}</div>
          ${basisText ? `
            <span class="syn-tt-label" style="margin-top:0.65rem;">⚙ Na Jakiej Podstawie Wyliczane</span>
            <div style="font-size:0.77rem;line-height:1.52;color:rgba(201,169,110,0.92);">${basisText}</div>
          ` : ''}
        </div>
      </div>`;
  }

  window.__SYNASTRY_NARRATIVES__ = { COMPOSITE_ARCHETYPES, getVerdict, renderTooltipCard, buildMidpointCardDef };
})();

(function () {
  const N = window.__SYNASTRY_NARRATIVES__;

  function renderChaptersOneToFour(d, dos, verdict) {
    const isTestEnv = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.search.includes('test=true')));
    const priceDisplay = isTestEnv ? '0 PLN (Test)' : '39 PLN';
    const planetRows = dos.bodyDefs.map(b => {
      const pA = dos.posA[b.key];
      const pB = dos.posB[b.key];
      return `
        <tr>
          <td data-label="Punkt:"><span class="syn-glyph">${b.glyph}</span> <strong>${b.label}</strong> <span style="opacity:0.55;font-size:0.75rem;">(${b.role})</span></td>
          <td data-label="${d.nameA}:"><span class="syn-glyph">${pA.glyph}</span> ${pA.name} <span style="font-family:'JetBrains Mono',monospace;color:#C9A96E;font-size:0.78rem;">${pA.formatted}</span></td>
          <td data-label="${d.nameB}:"><span class="syn-glyph">${pB.glyph}</span> ${pB.name} <span style="font-family:'JetBrains Mono',monospace;color:#C9A96E;font-size:0.78rem;">${pB.formatted}</span></td>
          <td data-label="Żywioły:" style="font-size:0.78rem;opacity:0.8;">${pA.element} × ${pB.element}</td>
        </tr>`;
    }).join('');

    const aspectRows = dos.fullAspects.map(a => {
      const tip = (window.__GET_ASPECT_MUGOL_TIP__ && window.__GET_ASPECT_MUGOL_TIP__(a.name)) || {
        title: `${a.name} (${a.sym})`,
        desc: 'Wzajemne oddziaływanie energii planetarnych w Waszej relacji.'
      };
      return `
        <tr>
          <td data-label="Planeta:"><strong>${d.nameA}:</strong> <span class="syn-glyph">${a.bA.glyph}</span> ${a.bA.label} (${a.posA.name})</td>
          <td data-label="Aspekt:" style="color:${a.color};font-family:'JetBrains Mono',monospace;font-weight:600;">
            <span class="syn-asp-badge" tabindex="0">
              <span style="white-space:nowrap;">${a.sym} ${a.name} (${a.orbStr}) <span class="syn-info-pill" style="font-size:8px;padding:1px 5px;margin-left:2px;">ⓘ</span></span>
              <span class="syn-asp-tip">
                <strong style="color:${a.color};display:block;margin-bottom:3px;font-size:0.8rem;">${tip.title}</strong>
                ${tip.desc}
              </span>
            </span>
          </td>
          <td data-label="Partner:"><strong>${d.nameB}:</strong> <span class="syn-glyph">${a.bB.glyph}</span> ${a.bB.label} (${a.posB.name})</td>
          <td data-label="Znaczenie:" style="font-size:0.8rem;opacity:0.86;">${a.desc}</td>
        </tr>`;
    }).join('');

    const tabooAspectRows = (dos.tabooAspects || []).map(a => {
      const tip = (window.__GET_ASPECT_MUGOL_TIP__ && window.__GET_ASPECT_MUGOL_TIP__(a.name)) || {
        title: `${a.name} (${a.sym})`,
        desc: 'Wzajemne oddziaływanie energii planetarnych w Waszej relacji.'
      };
      return `
        <tr>
          <td data-label="Planeta:"><strong>${d.nameA}:</strong> <span class="syn-glyph">${a.bA.glyph}</span> ${a.bA.label} (${a.posA.name})</td>
          <td data-label="Aspekt:" style="color:${a.color};font-family:'JetBrains Mono',monospace;font-weight:600;">
            <span class="syn-asp-badge" tabindex="0">
              <span style="white-space:nowrap;">${a.sym} ${a.name} (${a.orbStr}) <span class="syn-info-pill" style="font-size:8px;padding:1px 5px;margin-left:2px;">ⓘ</span></span>
              <span class="syn-asp-tip">
                <strong style="color:${a.color};display:block;margin-bottom:3px;font-size:0.8rem;">${tip.title}</strong>
                ${tip.desc}
              </span>
            </span>
          </td>
          <td data-label="Partner:"><strong>${d.nameB}:</strong> <span class="syn-glyph">${a.bB.glyph}</span> ${a.bB.label} (${a.posB.name})</td>
          <td data-label="Znaczenie:" style="font-size:0.8rem;opacity:0.86;">${a.desc}</td>
        </tr>`;
    }).join('');

    const compArchText = N.COMPOSITE_ARCHETYPES[dos.compSun.idx];

    const marriageResonance = dos.ebertinMarriageDelta <= 4.5
      ? `Ścisły rezonans osi małżeńskich na tarczy 90° (odchylenie zaledwie ${dos.ebertinMarriageDelta.toFixed(1)}°) — klasyczna sygnatura głębokiego poczucia przynależności i naturalnej integracji życia codziennego.`
      : `Odmienne kąty nachylenia osi ☉/☽ na tarczy 90° (różnica ${dos.ebertinMarriageDelta.toFixed(1)}°) wskazują, że Wasza jedność buduje się poprzez świadome docieranie rytmów domowych, a nie automatyczny nawyk.`;

    const T = N.renderTooltipCard;
    const M = N.buildMidpointCardDef;

    return `
      <!-- ROZDZIAŁ I (WIDOCZNY WSTĘP) -->
      <div class="syn-report-chapter" style="border-color:rgba(201,169,110,0.35);">
        <div class="syn-chapter-num">ROZDZIAŁ I • SYNTEZA GŁÓWNA I MATRYCA ŻYWIOŁÓW</div>
        <h4 class="syn-chapter-title">${verdict.title}</h4>
        <p style="font-size:0.95rem;line-height:1.7;color:rgba(250,248,245,0.9);margin-bottom:1.25rem;">${verdict.summary}</p>
        <div class="syn-pill-grid">
          ${T(
            'KOMUNIKACJA (MERKURY)',
            `<div style="font-size:1.35rem;font-family:'JetBrains Mono',monospace;color:#C9A96E;font-weight:700;">${dos.commFinal}%</div>
             <div style="font-size:0.78rem;opacity:0.65;margin-top:0.2rem;">Zrozumienie werbalne i styl sporu</div>`,
            'Określa łatwość porozumienia, wspólne poczucie humoru i zdolność do szybkiego gaszenia nieporozumień słownych bez cichych dni i złośliwości.',
            'Wskaźnik uwzględnia zgodność żywiołów Merkurego i Księżyca oraz ścisłość aspektów (ważoną orbem) z planetami osobistymi partnera. Harmonijne kąty ze Słońcem, Księżycem, Wenus i Jowiszem podnoszą płynność dialogu, natomiast kwadratury i opozycje z Marsem lub Saturnem odejmują punkty, wskazując na ostrzejszy ton w sporze.'
          )}
          ${T(
            'TRWAŁOŚĆ I GRANICE (SATURN)',
            `<div style="font-size:1.35rem;font-family:'JetBrains Mono',monospace;color:#34D399;font-weight:700;">${dos.saturnFinal}%</div>
             <div style="font-size:0.78rem;opacity:0.65;margin-top:0.2rem;">Stabilność długoterminowa i lojalność</div>`,
            'Pokazuje fundament wierności i dojrzałości. To siła, która sprawia, że Wasza więź wytrzymuje próbę czasu i trudniejsze momenty życiowe.',
            'Obliczane na podstawie uziemienia kosmogramów (żywioł Ziemi i jakość Stała), rezonansu Osi Małżeństwa (☉/☽) oraz aspektów Saturna wyłącznie do planet osobistych i Węzła Północnego partnera (z pominięciem pokoleniowego tła). Trygony, sekstyle i koniunkcje budują trwały cement, a kwadratury odejmują punkty, sygnalizując chłód lub obronny dystans.'
          )}
          ${T(
            'PUNKT CZASOPRZESTRZENNY DAVISONA',
            `<div style="font-size:1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;margin-top:0.15rem;">${dos.davisonDate}</div>
             <div style="font-size:0.78rem;opacity:0.65;margin-top:0.2rem;">Astronomiczny środek czasu Waszych narodzin</div>`,
            'To data symbolicznych narodzin Waszego związku jako odrębnego bytu — pokazuje unikalną tożsamość i przeznaczenie Waszej relacji.'
          )}
          ${T(
            'BILANS ŻYWIOŁÓW PARY (16 PUNKTÓW)',
            `<div style="font-size:0.82rem;font-family:'JetBrains Mono',monospace;color:#FAF8F5;margin-top:0.25rem;">
               🔥${dos.elemCount['Ogień']} • 🌍${dos.elemCount['Ziemia']} • 💨${dos.elemCount['Powietrze']} • 💧${dos.elemCount['Woda']}
             </div>
             <div style="font-size:0.76rem;opacity:0.65;margin-top:0.2rem;">Kardynalne: ${dos.modCount['Kardynalna']} | Stałe: ${dos.modCount['Stała']} | Zmienne: ${dos.modCount['Zmienna']}</div>`,
            'Wypadkowa Waszych temperamentów: Ogień daje pasję, Ziemia stabilność i zmysłowość, Powietrze rozmowę, a Woda bliskość emocjonalną.'
          )}
          ${T(
            'INDEKS OBSESJI I TABU (♇ PLUTON × ⚸ LILITH)',
            `<div style="font-size:1.35rem;font-family:'JetBrains Mono',monospace;color:#FB7185;font-weight:700;">${dos.obsessionFinal}%</div>
             <div style="font-size:0.78rem;opacity:0.7;margin-top:0.2rem;">♇ ${dos.posA.pluto.name}/${dos.posB.pluto.name} • ⚸ Lilith: ${dos.posA.lilith.name} × ${dos.posB.lilith.name}</div>`,
            'Mierzy siłę podświadomego magnetyzmu seksualnego, pokusy, zazdrości i tzw. „zakazanego owocu”. Wysoki wskaźnik oznacza więź, z której nie sposób się wyzwolić.',
            'Algorytm odrzuca pokoleniowe aspekty Pluton–Pluton, badając wyłącznie bezpośrednie uderzenia Plutona i Czarnego Księżyca Lilith w planety osobiste partnera (szczególnie Wenus, Marsa, Księżyc i Słońce), obsadę w Skorpionie/8. Domu oraz ścisłość kątową (im mniejszy orb, tym silniejszy ładunek obsesji).'
          )}
          ${T(
            'NAKŁADKA DOMÓW PARTNERSKICH (HOUSE OVERLAYS)',
            dos.houseOverlays.length > 0
              ? `<div style="font-size:0.92rem;font-family:'Playfair Display',serif;color:#C9A96E;font-weight:700;margin-top:0.15rem;">Aktywne Domy: ${dos.houseOverlays.slice(0, 3).map(o => `${o.body.glyph}→${o.house}. Dom`).join(' • ')}</div>
                 <div style="font-size:0.76rem;opacity:0.7;margin-top:0.2rem;">Wyliczono dokładną projekcję planet na 12 domów Ascendentu</div>`
              : `<div style="font-size:0.9rem;font-family:'Playfair Display',serif;color:rgba(250,248,245,0.75);margin-top:0.15rem;">Wpisz godzinę urodzenia wyżej ↑</div>
                 <div style="font-size:0.76rem;opacity:0.65;margin-top:0.2rem;">Odblokowuje 7. Dom Małżeński i 8. Dom Seksualności</div>`,
            'Pokazuje, w którą sferę Twojego życia (np. 7. Dom Małżeństwa, 8. Dom Intymności i Tabu, 5. Dom Romansu) bezpośrednio uderzają planety partnera.',
            'Wymaga podania godziny urodzenia przynajmniej jednej osoby, aby wyznaczyć dokładny stopień Ascendentu i siatkę 12 domów horoskopowych.'
          )}
        </div>
      </div>

      <!-- LOSS AVERSION POPUP / GATEWAY (POKAZUJE ILE % CIĘ OMINĘŁO) -->
      <div class="syn-loss-gate" id="syn-loss-gate">
        <div class="syn-loss-badge">
          <span class="syn-loss-dot"></span>
          <span>⚠️ OMIJA CIĘ 86% ANALIZY RELACJI</span>
        </div>
        <h4 class="syn-loss-title">Widzisz zaledwie 14% Waszego Kosmogramu</h4>
        <p class="syn-loss-desc">
          Wstępny zarys to za mało, by uniknąć relacyjnych błędów. <strong>Aż 86% kluczowych danych</strong> — w tym punkty zapalne w kłótniach, podświadoma obsesja erotyczna (Pluton ♇ × Lilith ⚸) oraz klucz gaszenia gniewu partnera — pozostaje zablokowane poniżej:
        </p>
        <div class="syn-loss-meter">
          <div class="syn-loss-meter-labels">
            <span>Odkryto: <strong style="color:#C9A96E;">14%</strong></span>
            <span>Ukryto przed Tobą: <strong style="color:#FB7185;">86% analizy</strong></span>
          </div>
          <div class="syn-loss-bar">
            <div class="syn-loss-bar-fill" style="width:14%;"></div>
          </div>
        </div>
        <div class="syn-loss-grid">
          <div class="syn-loss-item">
            <span class="syn-loss-icon">🔒</span>
            <div><strong>Punkty Krytyczne & Zwarcia (Aspektarium)</strong><p>16 kątów planetarnych wyznaczających punkty zapalne w relacji</p></div>
          </div>
          <div class="syn-loss-item">
            <span class="syn-loss-icon">🔒</span>
            <div><strong>Indeks Obsesji & Sfera Tabu (Pluton × Lilith)</strong><p>Podświadomy magnetyzm, zazdrość i niewypowiedziane pragnienia</p></div>
          </div>
          <div class="syn-loss-item">
            <span class="syn-loss-icon">🔒</span>
            <div><strong>Nakładka 12 Domów od Twojego Ascendentu</strong><p>W które dokładnie sfery Twojego życia uderzają planety partnera</p></div>
          </div>
          <div class="syn-loss-item">
            <span class="syn-loss-icon">🔒</span>
            <div><strong>Instrukcja Gaszenia Gniewu & Cienia</strong><p>Psychologiczny klucz do rozbrajania mechanizmów obronnych partnera</p></div>
          </div>
        </div>
        <div style="margin-top:1.25rem;text-align:center;">
          <button type="button" class="syn-btn-paywall syn-loss-cta" id="syn-paywall-checkout-btn">
            <span>Odblokuj Pozostałe 86% Raportu — ${priceDisplay} &rarr;</span>
          </button>
          <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:rgba(250,248,245,0.65);margin-top:0.45rem;">
            ✓ Płatność jednorazowa • Natychmiastowy dostęp do 7 rozdziałów + Druk A4
          </div>
        </div>
      </div>

      <!-- ZABLOKOWANA CZĘŚĆ DOSSIER (ROZDZIAŁY II - VII) -->
      <div class="syn-locked-content" id="syn-locked-dossier">
        <div class="syn-report-chapter">
          <div class="syn-chapter-num">ROZDZIAŁ II • PEŁNA EFEMERYDA 10 PUNKTÓW (Z PLUTONEM I LILITH) & ASPEKTARIUM</div>
          <h4 class="syn-chapter-title">Pozycje Planetarne i Ścisłe Aspekty Międzyplanetarne</h4>
          <div class="syn-table-wrap">
            <table class="syn-table">
              <thead>
                <tr><th>Punkt / Planeta</th><th>${d.nameA} (Ty)</th><th>${d.nameB} (Partner/ka)</th><th>Interakcja Żywiołów</th></tr>
              </thead>
              <tbody>${planetRows}</tbody>
            </table>
          </div>
          <div class="syn-table-wrap" style="margin-top:1.25rem;">
            <table class="syn-table">
              <thead>
                <tr><th>Planeta (${d.nameA})</th><th>Aspekt & Orb</th><th>Planeta (${d.nameB})</th><th>Znaczenie Psychologiczne</th></tr>
              </thead>
              <tbody>${aspectRows}</tbody>
            </table>
          </div>
        </div>

        <div class="syn-report-chapter">
          <div class="syn-chapter-num">ROZDZIAŁ III • HOROSKOP KOMPOZYTOWY (TRZECIA ENCJA) & DAVISON</div>
          <h4 class="syn-chapter-title">Kim jesteście jako „My”? Analiza Punktów Środkowych Krótkiego Łuku</h4>
          <p style="font-size:0.92rem;line-height:1.68;color:rgba(250,248,245,0.88);margin-bottom:1rem;">
            ${compArchText} Wasz horoskop czasoprzestrzenny Davisona (wyznaczony na dokładny środek czasu Waszych narodzin: <strong>${dos.davisonDate}</strong>) spaja indywidualne temperamenty w osobny organizm psychologiczny, którym rządzi planeta <strong>${dos.compSun.ruler}</strong>.
          </p>
          <div class="syn-pill-grid">
            ${T(
              'SŁOŃCE KOMPOZYTOWE (CEL ZWIĄZKU)',
              `<div style="font-size:1.1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;"><span class="syn-glyph">${dos.compSun.glyph}</span> ${dos.compSun.name} (${dos.compSun.formatted})</div>
               <div style="font-size:0.78rem;opacity:0.75;margin-top:0.35rem;">Żywioł ${dos.compSun.element} (${dos.compSun.modality}): główna misja, tożsamość i duma Waszej pary.</div>`,
              M('Midpoint Słońc obu osób — kręgosłup i cel Waszej Trzeciej Encji. Pokazuje, kim stajecie się razem, jaką energię emanujecie na zewnątrz i do czego podświadomie dąży Wasz związek.', dos.compSun, 'compSun')
            )}
            ${T(
              'KSIĘŻYC KOMPOZYTOWY (EMOCJE PARY)',
              `<div style="font-size:1.1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;"><span class="syn-glyph">${dos.compMoon.glyph}</span> ${dos.compMoon.name} (${dos.compMoon.formatted})</div>
               <div style="font-size:0.78rem;opacity:0.75;margin-top:0.35rem;">Wewnętrzny klimat domowy i sposób, w jaki relacja regeneruje się po kryzysie (${dos.compMoon.element}).</div>`,
              M('Midpoint Księżyców obu osób — emocjonalne serce Waszego domu. Określa intymny klimat relacji, to, jak czujecie się razem w czterech ścianach i jak wspólnie regenerujecie się po stresie.', dos.compMoon, 'compMoon')
            )}
            ${T(
              'WENUS KOMPOZYTOWA (KOD MIŁOŚCI)',
              `<div style="font-size:1.1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;"><span class="syn-glyph">${dos.compVen.glyph}</span> ${dos.compVen.name} (${dos.compVen.formatted})</div>
               <div style="font-size:0.78rem;opacity:0.75;margin-top:0.35rem;">Język czułości, estetyki, wspólnych przyjemności i rytuałów romantycznych w znaku ${dos.compVen.gen}.</div>`,
              M('Midpoint Wenus obu osób — wspólny kod miłości, estetyki i przyjemności. Wskazuje styl Waszych randek, sposób obdarowywania się prezentami i to, czym wspólnie się zachwycacie.', dos.compVen, 'compVenus')
            )}
            ${T(
              'MARS KOMPOZYTOWY (SIŁA I EROTYKA)',
              `<div style="font-size:1.1rem;font-family:'Playfair Display',serif;color:#FAF8F5;font-weight:700;"><span class="syn-glyph">${dos.compMar.glyph}</span> ${dos.compMar.name} (${dos.compMar.formatted})</div>
               <div style="font-size:0.78rem;opacity:0.75;margin-top:0.35rem;">Temperatura sypialni, wspólna inicjatywa i sposób rozładowywania gniewu w znaku ${dos.compMar.gen}.</div>`,
              M('Midpoint Marsów obu osób — motor napędowy i temperatura pożądania. Pokazuje, jak podejmujecie wspólne decyzje, jak radzicie sobie ze sporami i jaka dynamika panuje w Waszej sypialni.', dos.compMar, 'compMars')
            )}
          </div>
        </div>

        <div class="syn-report-chapter">
          <div class="syn-chapter-num">ROZDZIAŁ IV • KOSMOBIOLOGIA EBERTINA (TARCZA 90° • OŚ MAŁŻEŃSTWA I POŻĄDANIA)</div>
          <h4 class="syn-chapter-title">Punkty Czułe Słońce/Księżyc (☉/☽) oraz Wenus/Mars (♀/♂)</h4>
          <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.86);margin-bottom:1rem;">
            W kosmobiologii Reinholda Ebertina (Szkoła Hamburska) najważniejszym punktem integracji pary jest midpoint <strong>Słońce/Księżyc (☉/☽ — Oś Małżeństwa)</strong> oraz <strong>Wenus/Mars (♀/♂ — Oś Magnetyzmu Erotycznego)</strong>. ${marriageResonance}
          </p>
          <div class="syn-pill-grid">
            ${T(
              `OŚ MAŁŻEŃSTWA ☉/☽ (${d.nameA})`,
              `<div style="font-size:1rem;color:#C9A96E;font-weight:600;"><span class="syn-glyph">${dos.mpSunMoonA.glyph}</span> ${dos.mpSunMoonA.name} ${dos.mpSunMoonA.formatted} <span style="opacity:0.65;font-size:0.8rem;">(Mod 90°: ${(dos.mpSunMoonA.lon % 90).toFixed(1)}°)</span></div>
               <div style="font-size:0.76rem;opacity:0.7;margin-top:0.3rem;">Wewnętrzny wzorzec partnerstwa i integracji Yin–Yang u ${d.nameA}.</div>`,
              M(`Midpoint Słońca i Księżyca — punkt integracji świadomej woli z głęboką potrzebą bezpieczeństwa emocjonalnego. Wskazuje wewnętrzny archetyp partnerstwa idealnego u ${d.nameA} i warunek konieczny, by w związku czuć się w pełni sobą.`, dos.mpSunMoonA, 'marriage')
            )}
            ${T(
              `OŚ MAŁŻEŃSTWA ☉/☽ (${d.nameB})`,
              `<div style="font-size:1rem;color:#C9A96E;font-weight:600;"><span class="syn-glyph">${dos.mpSunMoonB.glyph}</span> ${dos.mpSunMoonB.name} ${dos.mpSunMoonB.formatted} <span style="opacity:0.65;font-size:0.8rem;">(Mod 90°: ${(dos.mpSunMoonB.lon % 90).toFixed(1)}°)</span></div>
               <div style="font-size:0.76rem;opacity:0.7;margin-top:0.3rem;">Punkt czuły więzi małżeńskiej i zaufania intymnego u ${d.nameB}.</div>`,
              M(`Midpoint Słońca i Księżyca — punkt integracji świadomej woli z potrzebą bliskości. Wskazuje wewnętrzny archetyp partnerstwa u ${d.nameB} i to, jakie cechy partnera dają mu/jej poczucie: „to człowiek na całe życie”.`, dos.mpSunMoonB, 'marriage')
            )}
            ${T(
              `OŚ POŻĄDANIA ♀/♂ (${d.nameA})`,
              `<div style="font-size:1rem;color:#FAF8F5;font-weight:600;"><span class="syn-glyph">${dos.mpVenMarA.glyph}</span> ${dos.mpVenMarA.name} ${dos.mpVenMarA.formatted} <span style="opacity:0.65;font-size:0.8rem;">(Mod 90°: ${(dos.mpVenMarA.lon % 90).toFixed(1)}°)</span></div>
               <div style="font-size:0.76rem;opacity:0.7;margin-top:0.3rem;">Kod pasji, uwodzenia i reaktywności zmysłowej (${dos.mpVenMarA.element}).</div>`,
              M(`Osobisty punkt zapłonu erotycznego (midpoint Wenus i Marsa). Określa, jaki rodzaj aury, energii, dotyku i zmysłowego impulsu natychmiast rozbraja zmysły ${d.nameA} i rozpala namiętność.`, dos.mpVenMarA, 'desire')
            )}
            ${T(
              `OŚ POŻĄDANIA ♀/♂ (${d.nameB})`,
              `<div style="font-size:1rem;color:#FAF8F5;font-weight:600;"><span class="syn-glyph">${dos.mpVenMarB.glyph}</span> ${dos.mpVenMarB.name} ${dos.mpVenMarB.formatted} <span style="opacity:0.65;font-size:0.8rem;">(Mod 90°: ${(dos.mpVenMarB.lon % 90).toFixed(1)}°)</span></div>
               <div style="font-size:0.76rem;opacity:0.7;margin-top:0.3rem;">Punkt zapłonu erotycznego i ekspresji uczuć (${dos.mpVenMarB.element}, Δ90°: ${dos.ebertinDesireDelta.toFixed(1)}°).</div>`,
              M(`Osobisty punkt zapłonu erotycznego (midpoint Wenus i Marsa). Określa, jaki rodzaj aury, energii, dotyku i zmysłowego impulsu natychmiast rozbraja zmysły ${d.nameB} i rozpala namiętność.`, dos.mpVenMarB, 'desire')
            )}
          </div>
        </div>

        <div class="syn-report-chapter" style="border-color:rgba(251,113,133,0.35);background:rgba(251,113,133,0.03);">
          <div class="syn-chapter-num" style="color:#FB7185;">ROZDZIAŁ IV-B • CIEMNY MAGNETYZM: PLUTON (♇) I CZARNY KSIĘŻYC LILITH (⚸)</div>
          <h4 class="syn-chapter-title">Indeks Obsesji i Sfera Tabu (${dos.obsessionFinal}%)</h4>
          <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.88);margin-bottom:1rem;">
            Podczas gdy Wenus i Mars odpowiadają za widoczny flirt, <strong>Pluton (♇)</strong> oraz <strong>Czarny Księżyc Lilith (⚸ — apogeum księżycowe)</strong> rządzą podświadomą obsesją, dominacją, zazdrością i ukrytym pożądaniem, o którym nie mówi się przy świetle dnia. U <strong>${d.nameA}</strong> Lilith przebywa w znaku <strong>${dos.posA.lilith.gen} (${dos.posA.lilith.formatted})</strong>, a Pluton w znaku <strong>${dos.posA.pluto.gen} (${dos.posA.pluto.formatted})</strong>; u <strong>${d.nameB}</strong> Lilith znajduje się w znaku <strong>${dos.posB.lilith.gen} (${dos.posB.lilith.formatted})</strong>, a Pluton w znaku <strong>${dos.posB.pluto.gen} (${dos.posB.pluto.formatted})</strong>.
          </p>
          <div class="syn-grid-2" style="margin-bottom:0;">
            <div class="syn-stat-box" style="border-color:rgba(251,113,133,0.3);">
              <div class="syn-card-tag" style="color:#FB7185;">⚸ KOD LILITH: ${d.nameA} (${dos.posA.lilith.name})</div>
              <p style="font-size:0.86rem;line-height:1.62;margin-top:0.35rem;">
                Punkt nieposkromionej autonomii i erotycznego cienia w znaku ${dos.posA.lilith.gen} (${dos.posA.lilith.element}). Uruchamia się, gdy partner próbuje narzucić ramy lub ograniczyć autentyczność — zamieniając uległość w magnetyczny bunt.
              </p>
            </div>
            <div class="syn-stat-box" style="border-color:rgba(251,113,133,0.3);">
              <div class="syn-card-tag" style="color:#FB7185;">⚸ KOD LILITH: ${d.nameB} (${dos.posB.lilith.name})</div>
              <p style="font-size:0.86rem;line-height:1.62;margin-top:0.35rem;">
                Ukryty wyzwalacz pożądania w znaku ${dos.posB.lilith.gen} (${dos.posB.lilith.element}). Aby utrzymać hipnotyczną fascynację ${d.nameB}, relacja nie może stać się całkowicie przewidywalna — potrzebuje odrobiny tajemnicy i niedopowiedzenia.
              </p>
            </div>
          </div>
          ${dos.tabooAspects.length > 0 ? `
            <div style="margin-top:1.35rem;">
              <div class="syn-card-tag" style="color:#FB7185;margin-bottom:0.6rem;font-weight:700;">
                ⚡ AKTYWNE ZWARCIA PLUTON / LILITH W WASZYM KOSMOGRAMIE (${dos.tabooAspects.length})
              </div>
              <div class="syn-table-wrap">
                <table class="syn-table">
                  <thead>
                    <tr>
                      <th>Planeta (${d.nameA})</th>
                      <th>Aspekt & Orb</th>
                      <th>Planeta (${d.nameB})</th>
                      <th>Znaczenie Psychologiczne</th>
                    </tr>
                  </thead>
                  <tbody>${tabooAspectRows}</tbody>
                </table>
              </div>
            </div>
          ` : `
            <div style="margin-top:1.15rem;padding:0.9rem 1.1rem;background:rgba(0,0,0,0.25);border-radius:0.85rem;border:1px dashed rgba(251,113,133,0.25);font-size:0.85rem;line-height:1.6;color:rgba(250,248,245,0.78);">
              Brak ścisłych aspektów napięciowych z udziałem Plutona i Lilith (orby poniżej 4.5°) — Wasza relacja nie niesie ciężkich podświadomych gier o władzę ani destrukcyjnej obsesji.
            </div>
          `}
        </div>

        <div class="syn-report-chapter">
          <div class="syn-chapter-num">ROZDZIAŁ IV-C • NAKŁADKA DOMÓW PARTNERSKICH (HOUSE OVERLAYS)</div>
          <h4 class="syn-chapter-title" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.6rem;">
            <span>W które sfery życia uderzają planety partnera?</span>
            <span class="syn-asp-badge" tabindex="0" style="font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:#C9A96E;">
              <span class="syn-info-pill" style="font-size:9px;padding:0.2rem 0.65rem;cursor:help;">ⓘ O CO W TYM CHODZI?</span>
              <span class="syn-asp-tip">
                <strong style="color:#C9A96E;display:block;margin-bottom:4px;font-size:0.82rem;">✦ Czym są Domy Partnerskie?</strong>
                Na podstawie godziny urodzenia horoskop dzieli się na <strong>12 Domów</strong>, czyli 12 obszarów życia (np. 1. Dom = wygląd i pierwsze wrażenie, 4. Dom = dom i rodzina, 5. Dom = randki i pasja, 7. Dom = stały związek, 8. Dom = seks i intymność).<br/><br/>
                Zestawienie pokazuje po prostu, <strong>w którym Domu u jednej osoby znajduje się planeta drugiej osoby</strong> — i którą sferę Waszego życia ta planeta najmocniej porusza.
              </span>
            </span>
          </h4>
          ${dos.houseOverlays.length > 0 ? `
            <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.86);margin-bottom:1rem;">
              Poniższa tabela pokazuje, w którym Domu u jednej osoby znajdują się planety drugiej osoby oraz jak wpływa to na Waszą codzienność i intymność:
            </p>
            <div class="syn-table-wrap">
              <table class="syn-table">
                <thead>
                  <tr><th>Planeta</th><th>Znajduje się w Domu</th><th>W horoskopie osoby</th><th>Co to oznacza dla Waszej relacji?</th></tr>
                </thead>
                <tbody>
                  ${dos.houseOverlays.map(o => `
                    <tr>
                      <td data-label="Planeta:"><strong>${o.guest}:</strong> <span class="syn-glyph">${o.body.glyph}</span> ${o.body.label} <span style="opacity:0.7;font-size:0.78rem;">(${o.bodyPos.name})</span></td>
                      <td data-label="W Domu:" style="color:#C9A96E;font-family:'JetBrains Mono',monospace;font-weight:700;">
                        <span class="syn-asp-badge" tabindex="0">
                          <span style="white-space:nowrap;">${o.house}. DOM <span class="syn-info-pill" style="font-size:8px;padding:1px 5px;margin-left:3px;">ⓘ</span></span>
                          <span class="syn-asp-tip">
                            <strong style="color:#C9A96E;display:block;margin-bottom:4px;font-size:0.82rem;">${o.body.glyph} ${o.body.label} (${o.guest}) znajduje się w ${o.house}. Domu (${o.owner})</strong>
                            ${o.meaning}<br/><br/>
                            <span style="opacity:0.85;font-size:0.76rem;">Oznacza to, że planeta <strong>${o.body.label}</strong> u osoby <strong>${o.guest}</strong> trafia bezpośrednio do <strong>${o.house}. Domu</strong> w horoskopie osoby <strong>${o.owner}</strong> i naturalnie pobudza tę sferę między Wami.</span>
                          </span>
                        </span>
                      </td>
                      <td data-label="W horoskopie:"><strong>${o.owner}</strong></td>
                      <td data-label="Wpływ na relację:" style="font-size:0.81rem;opacity:0.88;">${o.meaning}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.82);">
              Aby odblokować tabelę <strong>Nakładki Domów Partnerskich</strong> (w tym 7. Dom Małżeństwa, 8. Dom Seksualności i Finansów oraz 5. Dom Romansu), uzupełnij godzinę urodzenia przynajmniej jednej osoby w formularzu na górze strony.
            </p>
          `}
        </div>`;
  }

  window.__SYNASTRY_RENDER_CH1_4__ = renderChaptersOneToFour;
})();

(function () {
  let isReportUnlocked = false;

  function renderChaptersFiveToSevenAndPaywall(d, dos, verdict) {
    const isTestEnv = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.search.includes('test=true')));
    const priceDisplay = isTestEnv ? '0 PLN (Test)' : '39 PLN';
    const isFemA = d.genderA === 'f';
    const isFemB = d.genderB === 'f';
    const profSunA = d.sunA.profile[isFemA ? 'f' : 'm'];
    const profSunB = d.sunB.profile[isFemB ? 'f' : 'm'];
    const profMoonA = d.moonA.profile[isFemA ? 'f' : 'm'];
    const profMoonB = d.moonB.profile[isFemB ? 'f' : 'm'];
    const profVenA = d.venA.profile[isFemA ? 'f' : 'm'];
    const profVenB = d.venB.profile[isFemB ? 'f' : 'm'];

    const mailSubject = encodeURIComponent(`Konsultacja Synastrii Partnerskiej 1:1: ${d.nameA} (${d.sunA.name}) & ${d.nameB} (${d.sunB.name})`);
    const mailBody = encodeURIComponent(
      `Dzień dobry,\n\nProszę o prywatną analizę synastrii partnerskiej 1:1:\n` +
      `- Osoba 1 (${d.nameA}): ur. ${d.dateA} | Słońce: ${d.sunA.name}, Księżyc: ${d.moonA.name}, Wenus: ${d.venA.name}, Mars: ${d.marA.name}\n` +
      `- Osoba 2 (${d.nameB}): ur. ${d.dateB} | Słońce: ${d.sunB.name}, Księżyc: ${d.moonB.name}, Wenus: ${d.venB.name}, Mars: ${d.marB.name}\n` +
      `- Wyliczone indeksy: Zgodność całkowita ${dos.totalIndex}%, Chemia ${d.syn.chemistry}%, Bezpieczeństwo ${d.syn.security}%, Napięcie ${d.syn.friction}%\n\n` +
      `Najważniejsze pytanie dotyczące naszej relacji:\n`
    );

    const ch1_4 = window.__SYNASTRY_RENDER_CH1_4__(d, dos, verdict);

    return `
      <section class="syn-paywall-section ${isReportUnlocked ? 'is-unlocked' : ''}" id="syn-dossier-section">
        <div class="syn-paywall-header">
          <div>
            <div class="syn-card-tag">✦ PEŁNA ANALIZA SYNASTRII • 7 ROZDZIAŁÓW</div>
            <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:1.75rem;color:#FAF8F5;margin:0.2rem 0 0 0;">
              Pełny Raport Zgodności: ${d.nameA} <span style="color:#C9A96E;">&times;</span> ${d.nameB}
            </h3>
          </div>
          <div style="display:flex;align-items:center;gap:0.85rem;flex-wrap:wrap;">
            <div style="background:rgba(201,169,110,0.14);border:1px solid rgba(201,169,110,0.4);padding:0.5rem 1.1rem;border-radius:9999px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#C9A96E;font-weight:700;">
              INDEKS ZGODNOŚCI: ${dos.totalIndex}%
            </div>
            <button type="button" id="syn-print-pdf-top" class="syn-btn-secondary syn-no-print" style="${isReportUnlocked ? 'display:inline-flex;' : 'display:none;'}">
              <span>⤓ Pobierz / Drukuj PDF (A4)</span>
            </button>
          </div>
        </div>

        <div class="syn-teaser-body">
          ${ch1_4}

            <div class="syn-report-chapter">
              <div class="syn-chapter-num">ROZDZIAŁ V • PROTOKÓŁ DEESKALACJI KRYZYSU I PSYCHOLOGIA CIENIA</div>
              <h4 class="syn-chapter-title">Instrukcja Obsługi Napięcia, Gniewu (♂) i Bezpieczeństwa (☽)</h4>
              <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.86);margin-bottom:1rem;">
                W sytuacjach przeciążenia emocjonalnego <strong>${d.nameA}</strong> reaguje z poziomu Księżyca w znaku <strong>${dos.posA.moon.gen}</strong> oraz Marsa w znaku <strong>${dos.posA.mars.gen} (${dos.posA.mars.element})</strong>, natomiast <strong>${d.nameB}</strong> uruchamia mechanizm obronny Księżyca w znaku <strong>${dos.posB.moon.gen}</strong> i Marsa w znaku <strong>${dos.posB.mars.gen} (${dos.posB.mars.element})</strong>. Zamiast walczyć z objawem, zastosujcie poniższy klucz rozbrajania pancerza obronnego:
              </p>
              <div class="syn-grid-2" style="margin-bottom:0;">
                <div class="syn-stat-box">
                  <div class="syn-card-tag">KLUCZ OTWARCIA DLA: ${d.nameA} (${d.sunA.name} • ☽ ${dos.posA.moon.name})</div>
                  <p style="font-size:0.88rem;line-height:1.65;margin-top:0.4rem;">${profSunA.openKey}</p>
                  <p style="font-size:0.8rem;opacity:0.82;line-height:1.55;margin-top:0.55rem;border-top:1px solid rgba(255,255,255,0.08);padding-top:0.5rem;"><strong style="color:#C9A96E;">Cień w stresie (☽ ${dos.posA.moon.name}):</strong> ${profMoonA.conflict}</p>
                </div>
                <div class="syn-stat-box">
                  <div class="syn-card-tag">KLUCZ OTWARCIA DLA: ${d.nameB} (${d.sunB.name} • ☽ ${dos.posB.moon.name})</div>
                  <p style="font-size:0.88rem;line-height:1.65;margin-top:0.4rem;">${profSunB.openKey}</p>
                  <p style="font-size:0.8rem;opacity:0.82;line-height:1.55;margin-top:0.55rem;border-top:1px solid rgba(255,255,255,0.08);padding-top:0.5rem;"><strong style="color:#C9A96E;">Cień w stresie (☽ ${dos.posB.moon.name}):</strong> ${profMoonB.conflict}</p>
                </div>
              </div>
            </div>

            <div class="syn-report-chapter">
              <div class="syn-chapter-num">ROZDZIAŁ VI • KONTRAKT KARMICZNY (WĘZŁY KSIĘŻYCOWE ☊) I TRWAŁOŚĆ SATURNA (♄)</div>
              <h4 class="syn-chapter-title">Przeznaczenie, Granice i Architektura Długoterminowa</h4>
              <p style="font-size:0.9rem;line-height:1.68;color:rgba(250,248,245,0.88);">
                Węzeł Północny (${d.nameA}) w znaku <strong>${dos.posA.node.name} (${dos.posA.node.formatted})</strong> oraz Węzeł Północny (${d.nameB}) w znaku <strong>${dos.posB.node.name} (${dos.posB.node.formatted})</strong> wyznaczają ewolucyjny kierunek Waszego spotkania (aktywacje karmiczne: <strong>${dos.karmaHits}</strong>). Sfera <strong>„Trwałość i Granice” (Saturn ♄)</strong> — położona u ${d.nameA} w znaku <strong>${dos.posA.saturn.gen} (${dos.posA.saturn.formatted})</strong>, a u ${d.nameB} w znaku <strong>${dos.posB.saturn.gen} (${dos.posB.saturn.formatted})</strong> — buduje wskaźnik stabilności na poziomie <strong>${dos.saturnFinal}%</strong>. To dojrzały fundament lojalności, szacunku dla granic i dotrzymywania słowa, który utrzymuje relację, gdy opadnie pierwszy haj dopaminowy.
              </p>
            </div>

            <div class="syn-report-chapter" style="border-color:rgba(201,169,110,0.5);background:rgba(201,169,110,0.05);">
              <div class="syn-chapter-num">ROZDZIAŁ VII • ZŁOTY KOD PREZENTOWY I ZMYSŁOWY KLUCZ WENUS</div>
              <h4 class="syn-chapter-title">Co podarować, by trafić prosto w podświadomość?</h4>
              <div class="syn-grid-2" style="margin-bottom:0;">
                <div class="syn-stat-box" style="border-color:rgba(201,169,110,0.4);">
                  <div class="syn-card-tag">ZŁOTY PREZENT DLA: ${d.nameB} (${d.sunB.name} / Wenus: ${d.venB.name})</div>
                  <p style="font-size:0.95rem;line-height:1.65;color:#FAF8F5;font-family:'Playfair Display',serif;font-style:italic;margin-top:0.4rem;">„${profSunB.secretGift}”</p>
                  <p style="font-size:0.82rem;opacity:0.75;margin-top:0.5rem;">${profVenB.venusGift}</p>
                </div>
                <div class="syn-stat-box" style="border-color:rgba(201,169,110,0.4);">
                  <div class="syn-card-tag">ZŁOTY PREZENT DLA: ${d.nameA} (${d.sunA.name} / Wenus: ${d.venA.name})</div>
                  <p style="font-size:0.95rem;line-height:1.65;color:#FAF8F5;font-family:'Playfair Display',serif;font-style:italic;margin-top:0.4rem;">„${profSunA.secretGift}”</p>
                  <p style="font-size:0.82rem;opacity:0.75;margin-top:0.5rem;">${profVenA.venusGift}</p>
                </div>
              </div>
              <div class="syn-no-print" style="margin-top:1.5rem;text-align:center;display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
                <button type="button" id="syn-print-pdf-bottom" class="syn-btn-main" style="padding:0.95rem 2.2rem;font-size:0.85rem;">
                  <span>⤓ Pobierz Pełny Raport Synastrii (PDF / Druk A4)</span>
                </button>
                <a href="mailto:kontakt@neoromantyczny.pl?subject=Indywidualna%20Analiza%20Synastrii" class="syn-btn-secondary">
                  <span>✦ Zamów Konsultację Indywidualną 1:1 z Astrologiem &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- LOSS AVERSION POPUP MODAL (#syn-loss-modal) -->
        <div class="syn-modal-backdrop" id="syn-loss-modal" role="dialog" aria-modal="true" aria-hidden="true">
          <div class="syn-modal-card">
            <button type="button" class="syn-modal-close" id="syn-loss-modal-close" aria-label="Zamknij">&times;</button>
            <div class="syn-loss-badge">
              <span class="syn-loss-dot"></span>
              <span>⚠️ OMIJA CIĘ 86% ANALIZY RELACJI</span>
            </div>
            <h3 class="syn-loss-title" style="margin-top:0.35rem;">Widzisz zaledwie 14% Waszego Kosmogramu</h3>
            <p class="syn-loss-desc">
              Wstępny zarys to za mało, by uniknąć relacyjnych błędów. <strong>Aż 86% kluczowych danych</strong> — w tym punkty zapalne w kłótniach, podświadoma obsesja erotyczna (Pluton ♇ × Lilith ⚸) oraz klucz gaszenia gniewu partnera — pozostaje zablokowane:
            </p>
            <div class="syn-loss-meter">
              <div class="syn-loss-meter-labels">
                <span>Odkryto: <strong style="color:#C9A96E;">14%</strong></span>
                <span>Ukryto przed Tobą: <strong style="color:#FB7185;">86% analizy</strong></span>
              </div>
              <div class="syn-loss-bar">
                <div class="syn-loss-bar-fill" style="width:14%;"></div>
              </div>
            </div>
            <div class="syn-loss-grid">
              <div class="syn-loss-item">
                <span class="syn-loss-icon">🔒</span>
                <div><strong>Punkty Krytyczne & Zwarcia (Aspektarium)</strong><p>16 kątów planetarnych wyznaczających punkty zapalne w relacji</p></div>
              </div>
              <div class="syn-loss-item">
                <span class="syn-loss-icon">🔒</span>
                <div><strong>Indeks Obsesji & Sfera Tabu (Pluton × Lilith)</strong><p>Podświadomy magnetyzm, zazdrość i niewypowiedziane pragnienia</p></div>
              </div>
              <div class="syn-loss-item">
                <span class="syn-loss-icon">🔒</span>
                <div><strong>Nakładka 12 Domów od Twojego Ascendentu</strong><p>W które dokładnie sfery Twojego życia uderzają planety partnera</p></div>
              </div>
              <div class="syn-loss-item">
                <span class="syn-loss-icon">🔒</span>
                <div><strong>Instrukcja Gaszenia Gniewu & Cienia</strong><p>Psychologiczny klucz do rozbrajania mechanizmów obronnych partnera</p></div>
              </div>
            </div>
            <div style="margin-top:1.35rem;text-align:center;">
              <button type="button" class="syn-btn-paywall syn-loss-cta" id="syn-loss-modal-cta">
                <span>Odblokuj Pozostałe 86% Raportu — ${priceDisplay} &rarr;</span>
              </button>
              <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:rgba(250,248,245,0.65);margin-top:0.45rem;">
                ✓ Płatność jednorazowa • Natychmiastowy dostęp do 7 rozdziałów + Druk A4
              </div>
            </div>
          </div>
        </div>

        <!-- STRIPE DIRECT CHECKOUT MODAL (#syn-stripe-modal) -->
        <div class="syn-modal-backdrop" id="syn-stripe-modal" role="dialog" aria-modal="true" aria-hidden="true">
          <div class="syn-modal-card syn-stripe-card">
            <button type="button" class="syn-modal-close" id="syn-stripe-modal-close" aria-label="Zamknij">&times;</button>
            <div class="syn-stripe-header">
              <div class="syn-card-tag">BEZPOŚREDNIA PŁATNOŚĆ</div>
              <h3 class="syn-card-heading" style="font-size:1.45rem;margin:0.25rem 0 0.35rem;">Odblokuj Pełny Raport Synastrii</h3>
              <p style="font-size:0.85rem;color:rgba(250,248,245,0.75);margin:0;">
                Dostęp do wszystkich 7 rozdziałów dla pary <strong>${d.nameA} &times; ${d.nameB}</strong>.
              </p>
              <div class="syn-stripe-badges">
                <span class="syn-stripe-badge"> Apple Pay</span>
                <span class="syn-stripe-badge">G Pay</span>
                <span class="syn-stripe-badge">BLIK</span>
                <span class="syn-stripe-badge">Karta / Link</span>
                <span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#34D399;font-weight:700;margin-left:auto;">${isTestEnv ? '0,00 PLN (Test)' : '39,00 PLN'}</span>
              </div>
            </div>

            ${isTestEnv ? `
              <div style="margin-bottom:1.15rem;text-align:center;">
                <button type="button" id="syn-test-bypass-btn" class="syn-btn-secondary" style="width:100%;border-color:#34D399;color:#34D399;font-weight:600;padding:0.75rem 1rem;font-size:12px;">
                  <span>⚡ Odblokuj natychmiast bez płatności (0 PLN — Test) &rarr;</span>
                </button>
              </div>
            ` : ''}

            <div id="syn-payment-element-mount">
              <div class="syn-stripe-loader" id="syn-stripe-loader">
                <div class="syn-stripe-spinner"></div>
                <span>Inicjacja bezpiecznego połączenia...</span>
              </div>
            </div>

            <div id="syn-stripe-error"></div>

            <div style="margin-top:1rem;text-align:center;">
              <button type="button" class="syn-btn-paywall syn-loss-cta" id="syn-stripe-submit-btn" style="display:none;width:100%;">
                <span>Zapłać ${isTestEnv ? '0,00 PLN (Test)' : '39,00 PLN'} i Odblokuj Raport &rarr;</span>
              </button>
              <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(250,248,245,0.6);margin-top:0.6rem;">
                🔒 Szyfrowanie 256-bit SSL • Płatność obsługiwana przez Stripe.com
              </div>
            </div>
          </div>
        </div>
      </section>`;
  }

  window.__SYNASTRY_REPORT_MOUNT__ = function (mountEl, d) {
    if (!mountEl || !window.__SYNASTRY_BUILD_DOSSIER__) return;
    const dos = window.__SYNASTRY_BUILD_DOSSIER__(d);
    const verdict = window.__SYNASTRY_NARRATIVES__.getVerdict(d, dos);
    mountEl.innerHTML = renderChaptersFiveToSevenAndPaywall(d, dos, verdict);

    const section = document.getElementById('syn-dossier-section');
    const paywallBtn = document.getElementById('syn-paywall-checkout-btn');
    const printTop = document.getElementById('syn-print-pdf-top');
    const printBot = document.getElementById('syn-print-pdf-bottom');

    const performUnlock = (instant = false) => {
      isReportUnlocked = true;
      if (section) section.classList.add('is-unlocked');
      if (printTop) printTop.style.display = 'inline-flex';
      if (!instant && section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const isTestEnv = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.search.includes('test=true')));

    if (paywallBtn) {
      paywallBtn.addEventListener('click', () => {
        if (isTestEnv) {
          paywallBtn.innerHTML = '<span>⚡ Odblokowywanie Raportu (0 PLN — Test)...</span>';
          setTimeout(() => {
            try { localStorage.setItem('neo_synastry_unlocked', 'true'); } catch (e) {}
            performUnlock(false);
          }, 300);
          return;
        }
        if (window.NEO_SYNASTRY_CHECKOUT_URL) {
          window.location.href = window.NEO_SYNASTRY_CHECKOUT_URL;
          return;
        }
        openStripeCheckout();
      });
    }

    const stripeModal = document.getElementById('syn-stripe-modal');
    const stripeModalClose = document.getElementById('syn-stripe-modal-close');
    const stripeSubmitBtn = document.getElementById('syn-stripe-submit-btn');
    const stripeErrorBox = document.getElementById('syn-stripe-error');
    const stripeLoader = document.getElementById('syn-stripe-loader');
    const stripeMount = document.getElementById('syn-payment-element-mount');

    const STRIPE_PK = 'pk_live_51UYWld665tgVOXNONMRtB5ENfc0M22rrNXL5BIRvTw4BNSt3oYOuUtIjFhT3mf6On5QJ3PqkYdMLKSSsESvdJQNA00phk5bG3f';
    let stripeInstance = null;
    let stripeElementsInstance = null;
    let isStripeLoading = false;

    const closeStripeModal = () => {
      if (!stripeModal) return;
      stripeModal.classList.remove('is-active');
      stripeModal.setAttribute('aria-hidden', 'true');
    };

    if (stripeModalClose) stripeModalClose.addEventListener('click', closeStripeModal);
    if (stripeModal) {
      stripeModal.addEventListener('click', (e) => {
        if (e.target === stripeModal) closeStripeModal();
      });
    }

    const testBypassBtn = document.getElementById('syn-test-bypass-btn');
    if (testBypassBtn) {
      testBypassBtn.addEventListener('click', () => {
        closeStripeModal();
        try { localStorage.setItem('neo_synastry_unlocked', 'true'); } catch (e) {}
        performUnlock(false);
      });
    }

    const openStripeCheckout = async () => {
      if (isReportUnlocked || !stripeModal) return;
      closeLossModal();
      stripeModal.classList.add('is-active');
      stripeModal.setAttribute('aria-hidden', 'false');

      if (stripeElementsInstance) return;
      if (isStripeLoading) return;
      isStripeLoading = true;

      try {
        if (typeof window.Stripe === 'undefined') {
          throw new Error('Biblioteka Stripe.js nie została załadowana. Sprawdź połączenie.');
        }

        stripeInstance = window.Stripe(STRIPE_PK, { locale: 'pl' });

        const endpoint = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? '/api/create-payment-intent'
          : '/.netlify/functions/create-payment-intent';

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pair: `${d.nameA} x ${d.nameB}` })
        });

        const data = await res.json();
        if (!res.ok || !data.clientSecret) {
          throw new Error(data.error || 'Nie udało się zainicjalizować sesji płatności Stripe.');
        }

        const appearance = {
          theme: 'night',
          variables: {
            colorPrimary: '#C9A96E',
            colorBackground: '#14141F',
            colorText: '#FAF8F5',
            colorDanger: '#FB7185',
            fontFamily: 'Inter, sans-serif',
            borderRadius: '10px'
          }
        };

        stripeElementsInstance = stripeInstance.elements({
          clientSecret: data.clientSecret,
          appearance
        });

        const paymentElement = stripeElementsInstance.create('payment', {
          layout: 'tabs'
        });

        paymentElement.mount(stripeMount);
        paymentElement.on('ready', () => {
          if (stripeLoader) stripeLoader.style.display = 'none';
          if (stripeSubmitBtn) stripeSubmitBtn.style.display = 'block';
        });

      } catch (err) {
        if (stripeLoader) stripeLoader.style.display = 'none';
        if (stripeErrorBox) {
          stripeErrorBox.innerHTML = `⚠️ ${err.message}`;
        }
      } finally {
        isStripeLoading = false;
      }
    };

    if (stripeSubmitBtn) {
      stripeSubmitBtn.addEventListener('click', async () => {
        if (!stripeInstance || !stripeElementsInstance) return;
        stripeSubmitBtn.disabled = true;
        stripeSubmitBtn.innerHTML = '<span>⏳ Autoryzacja płatności (BLIK / Apple Pay)...</span>';
        if (stripeErrorBox) stripeErrorBox.innerHTML = '';

        try {
          const { error, paymentIntent } = await stripeInstance.confirmPayment({
            elements: stripeElementsInstance,
            confirmParams: {
              return_url: window.location.href.split('?')[0] + '?paid=true'
            },
            redirect: 'if_required'
          });

          if (error) {
            stripeErrorBox.innerHTML = `⚠️ ${error.message}`;
            stripeSubmitBtn.disabled = false;
            stripeSubmitBtn.innerHTML = '<span>Zapłać 39,00 PLN i Odblokuj Raport &rarr;</span>';
          } else if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
            try { localStorage.setItem('neo_synastry_unlocked', 'true'); } catch (e) {}
            closeStripeModal();
            performUnlock(false);
          }
        } catch (e) {
          stripeErrorBox.innerHTML = `⚠️ Błąd połączenia: ${e.message}`;
          stripeSubmitBtn.disabled = false;
          stripeSubmitBtn.innerHTML = '<span>Zapłać 39,00 PLN i Odblokuj Raport &rarr;</span>';
        }
      });
    }

    if (typeof window !== 'undefined') {
      try {
        if (localStorage.getItem('neo_synastry_unlocked') === 'true') {
          performUnlock(true);
        }
      } catch (e) {}
      if (window.location && window.location.search) {
        if (window.location.search.includes('unlocked=true') || window.location.search.includes('paid=true')) {
          try { localStorage.setItem('neo_synastry_unlocked', 'true'); } catch (e) {}
          performUnlock(true);
        }
      }
    }

    const modal = document.getElementById('syn-loss-modal');
    const modalClose = document.getElementById('syn-loss-modal-close');
    const modalCta = document.getElementById('syn-loss-modal-cta');
    const lockedDossier = document.getElementById('syn-locked-dossier');

    let modalHasTriggered = false;
    const openLossModal = () => {
      if (isReportUnlocked || !modal) return;
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
    };
    const closeLossModal = () => {
      if (!modal) return;
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
    };

    if (modalClose) modalClose.addEventListener('click', closeLossModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLossModal();
      });
    }
    if (modalCta && paywallBtn) {
      modalCta.addEventListener('click', () => {
        closeLossModal();
        paywallBtn.click();
      });
    }
    if (lockedDossier) {
      lockedDossier.addEventListener('click', () => {
        if (!isReportUnlocked) openLossModal();
      });
      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !modalHasTriggered && !isReportUnlocked) {
              modalHasTriggered = true;
              setTimeout(openLossModal, 700);
            }
          });
        }, { threshold: 0.25 });
        obs.observe(lockedDossier);
      }
    }

    const triggerPrint = () => {
      isReportUnlocked = true;
      closeLossModal();
      if (section) section.classList.add('is-unlocked');
      window.print();
    };
    if (printTop) printTop.addEventListener('click', triggerPrint);
    if (printBot) printBot.addEventListener('click', triggerPrint);
  };

  // GLOBAL PORTAL FLOATING TOOLTIP (ALWAYS #1 LAYER ON DOCUMENT.BODY)
  function initPortalTooltip() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    let portal = document.getElementById('syn-portal-tooltip');
    if (!portal) {
      if (!document.body) return;
      portal = document.createElement('div');
      portal.id = 'syn-portal-tooltip';
      document.body.appendChild(portal);
    }
    document.body.classList.add('has-syn-portal');

    let activeAnchor = null;

    function positionPortal(anchor) {
      if (!portal || !anchor) return;
      const rect = anchor.getBoundingClientRect();
      const pRect = portal.getBoundingClientRect();
      let left = rect.left + (rect.width / 2) - (pRect.width / 2);
      const minLeft = 14;
      const maxLeft = Math.max(minLeft, window.innerWidth - pRect.width - 14);
      left = Math.max(minLeft, Math.min(maxLeft, left));

      let top;
      if (rect.top >= pRect.height + 18) {
        top = rect.top - pRect.height - 10;
      } else {
        top = rect.bottom + 10;
      }
      top = Math.max(12, Math.min(window.innerHeight - pRect.height - 12, top));
      portal.style.left = `${Math.round(left)}px`;
      portal.style.top = `${Math.round(top)}px`;
    }

    function showTooltip(anchor) {
      activeAnchor = anchor;
      let html = '';
      const tipEl = anchor.querySelector('.syn-tooltip-pop, .syn-asp-tip');
      if (tipEl) {
        html = tipEl.innerHTML;
      }
      if (!html) return;
      portal.innerHTML = html;
      portal.classList.add('is-visible');
      positionPortal(anchor);
    }

    function hideTooltip(target) {
      if (activeAnchor && (!target || activeAnchor === target || activeAnchor.contains(target))) {
        portal.classList.remove('is-visible');
        activeAnchor = null;
      }
    }

    document.addEventListener('mouseover', (e) => {
      const anchor = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (anchor) showTooltip(anchor.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || anchor);
    });

    document.addEventListener('mouseout', (e) => {
      const anchor = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (anchor) hideTooltip(anchor.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || anchor);
    });

    document.addEventListener('focusin', (e) => {
      const anchor = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (anchor) showTooltip(anchor.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || anchor);
    });

    document.addEventListener('focusout', (e) => {
      const anchor = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (anchor) hideTooltip(anchor.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || anchor);
    });

    document.addEventListener('click', (e) => {
      const raw = e.target.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip, .syn-info-pill');
      if (raw) {
        const anchor = raw.closest('.syn-asp-badge, .syn-stat-box.syn-has-tooltip') || raw;
        showTooltip(anchor);
      } else if (activeAnchor) {
        portal.classList.remove('is-visible');
        activeAnchor = null;
      }
    });

    window.addEventListener('scroll', () => {
      if (activeAnchor) portal.classList.remove('is-visible');
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (activeAnchor) positionPortal(activeAnchor);
    }, { passive: true });
  }

  window.__INIT_PORTAL_TOOLTIP__ = initPortalTooltip;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortalTooltip);
  } else {
    initPortalTooltip();
  }
})();
