/* === SYNASTRIA: TEKSTY PELNEGO RAPORTU (PAYWALL PRO) === */
// 1. Pary planetarne (A + B)
(function () {
  window.__SYN_PAIR_TEXTS__ = window.__SYN_PAIR_TEXTS__ || {};
  const P = window.__SYN_PAIR_TEXTS__;
  const u = (ctx) => ctx.reactor.nom ? `u ${ctx.reactor.gen}` : 'po drugiej stronie';
  const aN = (ctx) => ctx.actor.nom || 'Pierwsza osoba';
  const rN = (ctx) => ctx.reactor.nom || 'druga osoba';
  P['sun-sun'] = (ctx, h) => h
    ? `Dobrze dogadujecie się w ważnych decyzjach, bo pewność siebie ${ctx.actor.gen} naturalnie dodaje odwagi ${u(ctx)}.`
    : `Kiedy brakuje jasnego podziału ról, ${aN(ctx)} i ${rN(ctx)} zaczynają rywalizować o wpływ na wspólne decyzje.`;
  P['moon-sun'] = (ctx, h) => h
    ? `Zdecydowanie ${ctx.actor.gen} daje ciepłe poczucie bezpieczeństwa i spokoju wrażliwości ${u(ctx)}.`
    : `Gdy ${aN(ctx)} działa zbyt stanowczo bez krótkiego wyjaśnienia, ${rN(ctx)} zamyka się w sobie z poczucia chłodu.`;
  P['mercury-sun'] = (ctx, h) => h
    ? `Rozmawiacie bardzo lekko i rzeczowo, a słowa ${ctx.actor.gen} pomagają uporządkować wątpliwości ${u(ctx)}.`
    : `Łatwo wciągacie się w spór o rację, w którym jedna wypowiedź brzmi pouczająco, a partner czuje się lekceważony.`;
  P['sun-venus'] = (ctx, h) => h
    ? `Od pierwszego spotkania czujecie naturalną sympatię i potraficie cieszyć się nawet zwykłym wspólnym wieczorem.`
    : `Próbujecie utrzymać miłą atmosferę kosztem przemilczanej zadry, dopóki drobna uwaga nie wywoła nagłego żalu.`;
  P['mars-sun'] = (ctx, h) => h
    ? `Wzajemnie mobilizujecie się do działania, a energia ${ctx.actor.gen} wyraźnie budzi śmiałość i zapał ${u(ctx)}.`
    : `Silne przyciąganie szybko miesza się tu ze sporem o to, kto ma narzucać tempo w trudniejszym dniu.`;
  P['jupiter-sun'] = (ctx, h) => h
    ? `Przy ${ctx.actor.loc || ctx.actor.nom} rośnie poczucie humoru, swoboda oraz odwaga do podejmowania wspólnych, śmielszych planów.`
    : `Łatwo składacie sobie wielkie obietnice w dobrym nastroju, po których w zwykły wtorek brakuje pilnowania konkretów.`;
  P['saturn-sun'] = (ctx, h) => h
    ? `Możecie na sobie polegać w trudniejszym momencie, bo słowo dane przez ${ctx.actor.acc} zachowuje swoją wagę.`
    : `${rN(ctx)} potrafi odbierać powagę ${ctx.actor.gen} zbyt osobiście, co studzi spontaniczną radość oraz czułość.`;
  P['node-sun'] = (ctx, h) => h
    ? `Obecność ${ctx.actor.gen} wyraźnie porusza ważne decyzje ${u(ctx)} i skłania do poważniejszego spojrzenia w przyszłość.`
    : `Kontakt z ${ctx.actor.ins} szybko wybija z wygodnych przyzwyczajeń, dlatego na starcie pojawia się wewnętrzny opór.`;
  P['moon-moon'] = (ctx, h) => h
    ? `Macie podobny rytm odpoczynku w domu i bez długich tłumaczeń czujecie, kiedy potrzeba ciszy albo rozmowy.`
    : `W stresie reagujecie zupełnie inaczej, ponieważ to, co ${aN(ctx)} chce od razu przegadać, ${rN(ctx)} woli przeczekać osobno.`;
  P['mercury-moon'] = (ctx, h) => h
    ? `${aN(ctx)} potrafi łagodnie nazwać emocje i tęsknoty ${u(ctx)}, nie raniąc przy tym wrażliwej natury.`
    : `Chłodna logika ${ctx.actor.gen} dotyka czułego miejsca ${u(ctx)}, gdy w trudnej chwili bardziej potrzeba ciepła niż argumentów.`;
  P['moon-venus'] = (ctx, h) => h
    ? `Wspólne mieszkanie szybko daje Wam poczucie ukojenia, czułości oraz spokojnego odpoczynku po długim dniu.`
    : `Różnicie się w potrzebie bliskości, ponieważ jedno z Was szuka przytulenia od razu, a partner potrzebuje odrobiny dystansu.`;
  P['mars-moon'] = (ctx, h) => h
    ? `Silna potrzeba opieki oraz namiętność ${ctx.actor.gen} dają ${ctx.reactor.dat} poczucie ważności i wyraźnego zaangażowania.`
    : `Ostre słowo rzucone w nerwach przez ${ctx.actor.acc} trafia w czuły punkt ${u(ctx)}, zanim opadną pierwsze emocje.`;
  P['jupiter-moon'] = (ctx, h) => h
    ? `Dajecie sobie dużo wyrozumiałości oraz przestrzeni, nie wypominając drobnych błędów przy zwykłym zmęczeniu.`
    : `Przesadna serdeczność lub brak umiaru w wydatkach i planach potrafią wprowadzić pod koniec tygodnia zbędny zamęt.`;
  P['moon-saturn'] = (ctx, h) => h
    ? `Lojalność i spokój ${ctx.actor.gen} dają Wam trwałe oparcie wtedy, gdy wokół pojawia się gorszy nastrój.`
    : `Obowiązki biorą górę nad czułością, przez co potrzeba bliskości odbija się nieraz od chłodnego opanowania ${ctx.actor.gen}.`;
  P['moon-node'] = (ctx, h) => h
    ? `Od pierwszego spotkania pojawia się między Wami ciche poczucie swojskości i łatwe zrozumienie emocji.`
    : `Dawne nawyki wyniesione z rodzinnych domów zmuszają Was do szukania własnego, bardziej świadomego sposobu na bliskość.`;
  P['mercury-mercury'] = (ctx, h) => h
    ? `Rozmawiacie bardzo płynnie, błyskawicznie łapiecie wspólne żarty i potraficie przegadać cały wieczór bez zmęczenia.`
    : `Podczas sprzeczki przerzucacie się ciętymi ripostami, przez co ważniejszy staje się ton głosu niż prawdziwy żal pod spodem.`;
  P['mercury-venus'] = (ctx, h) => h
    ? `Ciepłe wiadomości i uważne słowa zostają w pamięci na długo, podtrzymując między Wami naturalną sympatię.`
    : `Owijacie trudne sprawy w nadmierną grzeczność, żeby nie zepsuć wieczoru, przez co ważne pytania zostają bez odpowiedzi.`;
  P['mars-mercury'] = (ctx, h) => h
    ? `Szybko przechodzicie od rozmowy do wspólnego działania, a żywy dowcip łatwo rozładowuje drobne napięcia.`
    : `Ostra ironia ${ctx.actor.gen} potrafi w złości zranić głębiej niż krzyk i trudno potem cofnąć zdanie rzucone z uśmiechem.`;
  P['jupiter-mercury'] = (ctx, h) => h
    ? `Wspólne dyskusje otwierają głowy na nowe pomysły oraz uczą patrzeć na życiowe wybory bez lęku.`
    : `Przeskakujecie konkretne fakty w obronie wielkich tez, spierając się o rację zamiast spokojnie się wysłuchać.`;
  P['mercury-saturn'] = (ctx, h) => h
    ? `Rozmawiacie poważnie i rzetelnie, dlatego dane obietnice oraz wspólne plany mają realne pokrycie w czynach.`
    : `Krytyczny ton ${ctx.actor.gen} wytykający drobne pomyłki szybko studzi zapał i zamyka chęć rozmowy ${u(ctx)}.`;
  P['mercury-node'] = (ctx, h) => h
    ? `Jedno trafne spostrzeżenie ${ctx.actor.gen} potrafi uporządkować ważne plany i podsunąć mądre wyjście z kłopotu.`
    : `Słowa ${ctx.actor.gen} budzą na początku opór, ponieważ zmuszają do porzucenia starych wymówek i nawyków.`;
  P['venus-venus'] = (ctx, h) => h
    ? `Macie zbliżone wyczucie estetyki oraz czułości, dzięki czemu łatwo tworzycie przyjemną atmosferę we dwoje.`
    : `Różnicie się oceną tego, w jakim geście widać uważność, co bywa powodem cichych porównań o drobne przywileje.`;
  P['mars-venus'] = (ctx, h) => h
    ? `Inicjatywa ${ctx.actor.gen} oraz zmysłowość ${u(ctx)} natychmiast się uzupełniają, tworząc żywe przyciąganie fizyczne.`
    : `Silne pragnienie w sypialni miesza się z zazdrością oraz napięciem o to, kto ma wyznaczać tempo zbliżenia.`;
  P['jupiter-venus'] = (ctx, h) => h
    ? `Chętnie celebrujecie wspólny czas, okazujecie sobie hojność i wnosicie do związku dużo szczerej radości.`
    : `Łatwo ulegacie pokusie przyjemności ponad stan, odkładając zwykłe rachunki oraz poważniejsze rozmowy na później.`;
  P['saturn-venus'] = (ctx, h) => h
    ? `Uczucia dojrzewają tu spokojnie i nabierają trwałej wierności, która nie słabnie przy gorszym tygodniu.`
    : `Obawa przed zranieniem chowa się za chłodną rezerwą, przez co ${aN(ctx)} długo czeka na dowody zaangażowania.`;
  P['node-venus'] = (ctx, h) => h
    ? `Spotkanie z ${ctx.actor.ins} otwiera serce na czułość po długiej ostrożności i uczy zaufania w relacji.`
    : `Bliskość uczy Was odróżniać dawny głód miłości od dojrzałego wyboru i realnych możliwości partnera.`;
  P['mars-mars'] = (ctx, h) => h
    ? `Macie podobny temperament działania i apetyt na bliskość, dzięki czemu zgodnie ruszacie po wspólne cele.`
    : `Dwa uparte charaktery bez wspólnego zadania szybko obracają nadmiar energii we wzajemne docinki.`;
  P['jupiter-mars'] = (ctx, h) => h
    ? `Razem podejmujecie śmielsze decyzje i łatwiej przełamujecie wahanie przed ważną zmianą w życiu.`
    : `W gniewie lub ryzyku podbijacie stawkę zbyt wysoko, zapominając o rozsądnych granicach oraz konsekwencjach.`;
  P['mars-saturn'] = (ctx, h) => h
    ? `Zapał zyskuje tu cierpliwość oraz plan, więc potraficie wspólnie przetrwać trudniejszy okres bez pęknięcia.`
    : `Zapał ${ctx.actor.gen} zderza się z twardą ostrożnością ${u(ctx)}, co bywa odbierane jako celowe blokowanie ruchu.`;
  P['mars-node'] = (ctx, h) => h
    ? `Kontakt daje Wam odwagę do zrobienia kroku naprzód dokładnie tam, gdzie od dawna brakowało decyzji.`
    : `Gorące spięcie uczy stawiać granice otwarcie i mówić nie bez chowania żalu pod uprzejmością.`;
  P['jupiter-jupiter'] = (ctx, h) => h
    ? `Dzielicie podobne zasady życiowe, poczucie honoru oraz pragnienie rozwoju, które naturalnie spajają Waszą drogę.`
    : `Każde z Was broni własnej racji z poczuciem nieomylności zamiast sprawdzić, czego naprawdę obawia się partner.`;
  P['jupiter-saturn'] = (ctx, h) => h
    ? `Optymizm i rozmach jednej osoby spotykają się z trzeźwym planem partnera, dając rzadką równowagę w decyzjach.`
    : `Przeciągacie linę między śmiałym pomysłem a lękiem o jutro, dopóki obu osobom nie zabraknie cierpliwości.`;
  P['jupiter-node'] = (ctx, h) => h
    ? `Obecność ${ctx.actor.gen} wnosi sprzyjające okazje, poszerza grono życzliwych ludzi i dodaje wiary we własne siły.`
    : `Łatwo uwierzyć tu w sam szczęśliwy traf zamiast dopilnować zwykłej konsekwencji oraz pracowitości.`;
  P['saturn-saturn'] = (ctx, h) => h
    ? `Podobnie szanujecie czas, rzetelną pracę i dotrzymane słowo, budując bardzo przewidywalne, spokojne oparcie.`
    : `Podwójna surowość sprawia, że bez świadomego luzu oraz śmiechu związek zamienia się w sam obowiązek.`;
  P['node-saturn'] = (ctx, h) => h
    ? `Więź uczy dojrzałej odpowiedzialności i pokazuje z biegiem miesięcy, co ma między Wami trwałą wartość.`
    : `Ciężar dawnych, niedomkniętych spraw wraca i zmusza do uczciwego uporządkowania wzajemnych zobowiązań.`;
  P['node-node'] = (ctx, h) => h
    ? `Dzielicie zbliżone doświadczenia pokoleniowe i intuicyjnie rozumiecie, w jakim kierunku chcecie się rozwijać.`
    : `Różne kierunki rozwoju sprawiają, że bezpieczna przeszłość dla jednego z Was staje się przeszkodą dla partnera.`;
  P['pluto-venus'] = (ctx, h) => h
    ? `Głębokie przyciąganie fizyczne nie zostawia miejsca na letni dystans i wyraźnie zmienia Wasze spojrzenie na bliskość.`
    : `Silna potrzeba wyłączności oraz wpływu wymaga od Was jasnych granic i wzajemnego szacunku w sypialni.`;
  P['mars-pluto'] = (ctx, h) => h
    ? `Łączy Was ogromna determinacja i żywa namiętność, a w poważnej próbie potraficie zachować zimną krew.`
    : `Starcie dwóch bardzo silnych woli zamienia namiętność w cichą walkę o przewagę, gdy brakuje pełnej szczerości.`;
  P['moon-pluto'] = (ctx, h) => h
    ? `Błyskawicznie czytacie swoje nastroje jeszcze przed rozmową i potraficie przyjąć swoje najczulsze lęki.`
    : `Lęk o pełne zaufanie skłania ${ctx.actor.acc} do nadmiernej kontroli zamiast spokojnego pytania o potrzeby.`;
  P['pluto-sun'] = (ctx, h) => h
    ? `Przy ${ctx.actor.loc || ctx.actor.nom} łatwiej odrzucić udawane role, odkryć własną siłę i stanąć w pełni otwartej relacji.`
    : `Duma podpowiada twardy opór przed silnym wpływem ${ctx.actor.gen}, co rodzi niepotrzebne napięcie o niezależność.`;
  P['lilith-venus'] = (ctx, h) => h
    ? `Za zamkniętymi drzwiami opadają wszelkie zahamowania, budząc odważną zmysłowość oraz swobodę dotyku.`
    : `Powstaje napięcie między grzecznym wizerunkiem na zewnątrz a silnym pragnieniem bliskości bez ograniczeń.`;
  P['lilith-mars'] = (ctx, h) => h
    ? `Przyciąganie ciał pojawia się tu bardzo spontanicznie, z pełną szczerością i bez sztucznej dyplomacji.`
    : `Gdy przewidywalny tydzień odbiera Wam oddech, ${aN(ctx)} reaguje ostrym buntem oraz prowokacją.`;
  P['lilith-moon'] = (ctx, h) => h
    ? `Przy sobie możecie otwarcie okazać słabość oraz łzy, nie obawiając się oceny czy chłodnego odrzucenia.`
    : `Potrzeba spokojnego domu zderza się tu z dawnym lękiem przed odrzuceniem, który wraca wieczorami.`;
  P['lilith-sun'] = (ctx, h) => h
    ? `Najmocniej przyciąga Was wzajemna niezależność od cudzych opinii oraz niechęć do grania narzuconych ról.`
    : `Pojawia się ciche sprawdzanie cierpliwości i prowokowanie dumy zamiast powiedzenia wprost, czego naprawdę brakuje.`;
  P['lilith-pluto'] = (ctx, h) => h
    ? `Rozumiecie swoje najgłębsze pragnienia bez wstydu i potraficie rozmawiać szczerze nawet o trudnych tematach.`
    : `Silne emocje oparte na dyskrecji i niedopowiedzeniach wciągają bardzo szybko, choć wymagają dużej uczciwości.`;
})();

// 2. Archetypy kompozytowe, midpointy i domy
(function () {
  const COMPOSITE_ARCHETYPES = [
    'Wasz związek żyje ruchem i prawdą prosto z mostu. Gdy jednak usiądziecie wieczorem bez żadnego celu i pomysłu na ruch, ta sama iskra szybko zamienia się w spór o drobiazg.',
    'Ta relacja buduje świat z dotyku, wspólnego stołu i wierności, która nie drży przy pierwszym chłodzie. Czas gra na Waszą korzyść, jeśli pamiętacie o pragnieniu ponad zwykłym przyzwyczajeniem.',
    'Trzyma Was razem żywe słowo i ciekawość tego, co druga osoba powie przed snem. Zbliża wspólna podróż oraz żart w biegu, lecz chłód wchodzi wtedy, gdy błyskotliwość zastępuje czułość.',
    'Razem stawiacie cichy dom za własnymi drzwiami. Waszą siłą jest pamięć o drobnych gestach oraz obrona prywatnego spokoju przed zewnętrznym zgiełkiem, jeśli tylko mówicie o żalach na głos.',
    'Wasz sojusz oddycha dumą, hojnością gestu i potrzebą blasku. Jesteście dla siebie lustrem odwagi, dopóki okazujecie sobie zachwyt nie tylko od wielkiego święta.',
    'Miłość nosi tu strój konkretnego czynu zamiast głośnych toastów przy winie. Pomagacie sobie porządkować chaos dnia; uważajcie jedynie, by krytyczne oko nie zagasiło spontanicznej radości.',
    'Związek krojony z wyczuciem taktu, miary i klasy przy wspólnym stole. Potrzebujecie ładnej oprawy i spokoju rozmowy, w której żadne z Was nie musi opuszczać głowy ze wstydu.',
    'Więź bez gierek. Najwięcej zaufania daje Wam tutaj pełna szczerość, która wyprzedza domysły, ciche podejrzenia i półprawdy w gorszym tygodniu.',
    'Wasze „My” potrzebuje oddechu większego niż ciasne mieszkanie. Ożywia Was wspólny wyjazd, śmiech w nowym mieście i horyzont, którego nie zasłaniają bieżące troski.',
    'Dyskretny sojusz budowany z myślą o dekadach, nie o jednej wiośnie. Czas sprawdza tu ciężar danego słowa, a wspólny spokój staje się cenniejszy niż chwilowe fajerwerki.',
    'Przyjaźń bez masek. Łączy Was niechęć do grania cudzych ról przy rodzinnym stole i szacunek dla odrębności, który oddycha bez kontroli.',
    'Wyczuwacie swoje napięcie i zmęczenie jeszcze przed pierwszą rozmową. Tworzycie własny świat osłonięty od hałasu ulicy, pod warunkiem że nie gubicie w tej bliskości własnych granic.'
  ];

  function getVerdict(d, dos) {
    return window.__SYNASTRY_FREE_TEXTS__ ? window.__SYNASTRY_FREE_TEXTS__.getVerdict(d, dos) : { title: '', summary: '' };
  }

  const MIDPOINT_SIGN_DESCRIPTIONS = {
    compSun: [
      'Odwaga pierwszego kroku bez asekuracji; związek gaśnie w nudzie i letnich kompromisach.',
      'Budowanie spokojnego domu z dotyku, wspólnego stołu i wierności odpornej na trudniejszy czas.',
      'Nocne rozmowy do późna, ciekawość myśli i brak ciężkich przyzwyczajeń bez oddechu.',
      'Prywatny azyl za własnymi drzwiami, w którym można odpuścić czujność i odpocząć.',
      'Wspólne światło, duma z obecności obok i hojność gestu bez drobnych rachunków.',
      'Uważna obecność w czynach, dbałość o detale i porządkowanie życiowego zamieszania.',
      'Spokój miary, elegancja sporu i wspólne szukanie ładu w zwykłym tygodniu.',
      'Odwaga pełnej prawdy — najbardziej zbliża rozmowa bez masek o tym, co naprawdę wrażliwe.',
      'Otwarty horyzont, wspólny wyjazd bez mapy i wiara większa niż ciasne lęki.',
      'Dyskretna siła na lata; czas działa tu na korzyść słowa dotrzymanego bez świadków.',
      'Przyjaźń wolnych ludzi bez grania narzuconych ról przy niedzielnym stole.',
      'Ciche wyczucie nastrojów i bliskość za progiem osłoniętym od hałasu ulicy.'
    ],
    compMoon: [
      'Gorący klimat w domu; napięcia oczyszcza krótka wymiana zdań i szczerość od progu.',
      'Spokój w kuchni, miękka pościel, zapach świeżego chleba i powolny poranek bez gonitwy.',
      'Regeneracja przez rozmowę przy stole, wspólny śmiech i zmianę otoczenia.',
      'Głęboka troska oraz wyczuwanie nastroju, zanim padnie pierwsze słowo po powrocie.',
      'Ciepło domu karmione wzajemnym podziwem, dobrym światłem i brakiem uszczypliwości.',
      'Bezpieczeństwo osadzone w drobnych gestach poranka i niezawodności bez wymówek.',
      'Pokoje wolne od krzyku; spokój wraca tam, gdzie panuje umiar i miękki głos.',
      'Gęsta intymność i pragnienie wyłączności — przetrwanie trudnych nocy spaja jak stal.',
      'Dom otwarty na wyjazdy, humor i oddech większy niż rachunki na blacie.',
      'Wierność bez głośnych deklaracji; zaufanie rośnie powoli jak dąb na wietrze.',
      'Powietrze pod wspólnym dachem — odpoczywacie wtedy, gdy nikt nikogo nie trzyma za rękaw.',
      'Miękka cisza, w której rozumiecie swoje zmęczenie bez tłumaczenia całego dnia.'
    ],
    compVenus: [
      'Miłość pełna niespodzianek, śmiałego gestu i gorącego uścisku na progu.',
      'Dyskretny komfort, dobre wino i czułość bez oglądania się na zegarek.',
      'Błyskotliwy flirt słowem, spontaniczne bilety i upominek z ciekawą historią.',
      'Ciepło zapisane w pamiątkach, kolacji przy świecy i trosce o pamięć chwil.',
      'Szczodre gesty bez liczenia minut i radość celebrowania siebie ponad zwykły tydzień.',
      'Delikatna troska schowana w detalu dobranym tak trafnie, że zapiera dech.',
      'Klasyczna elegancja spotkania, półmrok kawiarni, teatr i szacunek w każdym dotyku.',
      'Wieczorne napięcie, osobiste prezenty z podtekstem i bliskość bez zasłon wstydu.',
      'Spotkania w drodze, smak nieznanych ulic i wspólne otwieranie mapy przed snem.',
      'Cicha klasa rzeczy trwałych — szlachetny materiał i wierność ponad kaprys mody.',
      'Niepowtarzalna oprawa chwil, której nikt nie podrobi z gotowego katalogu.',
      'Muzyka z płyty winylowej, półmrok i czułość odrywająca od twardej prozy dnia.'
    ],
    compMars: [
      'Szybka decyzja, namiętność bez wahań i energia gotowa ruszyć z miejsca w minutę.',
      'Cierpliwa siła i wytrzymałość — jak woda drążąca kamień rok po roku.',
      'Zwinność w działaniu i spory rozbrajane celnym żartem zamiast zaciśniętych pięści.',
      'Energia wstaje od razu w obronie domu oraz tych, którzy są Wam bliscy.',
      'Odwaga dużego kroku, wspólna duma i żar niebojący się otwartej sceny.',
      'Chłodna precyzja i rzemiosło — wspólne cele dowozicie bez zbędnego zamieszania.',
      'Dyplomacja i urok zamiast brutalnej siły, dopóki nie przekroczy się granicy taktu.',
      'Bezkompromisowa determinacja i ciemny żar w sypialni bez letnich uników.',
      'Rozmach i apetyt na ryzyko wyprowadzające Was daleko poza bezpieczne opłotki.',
      'Długa strategia i chłodne nerwy w burzy — z czasem Wasza siła tylko krzepnie.',
      'Nieszablonowy krok z dala od cudzego szeregu; działa u Was to, co łamie schemat.',
      'Miękka siła przeczucia i ciche dopasowanie ciał bez potrzeby głośnego sporu.'
    ],
    marriage: [
      'Wspólnota potrzebuje tu ognia i partnerów o własnym zdaniu, którzy nie boją się szczerości.',
      'Fundamentem jest ciało, stałość dłoni i wspólny stół bezpieczny od nagłych wahań.',
      'Żywy dialog przez lata — długotrwała więź opiera się tu najpierw na prawdziwej przyjaźni.',
      'Bezpieczny azyl za zamkniętym oknem, gdzie czułość i lojalność chronią przed chłodem świata.',
      'Wspólna duma i zachwyt, przy których bez lęku stajecie wyprostowani w pełnym świetle.',
      'Cicha niezawodność zwykłych czynów ważąca tysiąc razy więcej niż głośne przysięgi.',
      'Elegancja spotkania, równe zasady i spór prowadzony bez poniżania żadnej ze stron.',
      'Głębokie przymierze bez półprawd — potrzeba tu bliskości, przy której da się odłożyć ostrożność.',
      'Wspólny horyzont, humor w gorszym dniu i powietrze dające każdej ze stron prawo do własnych skrzydeł.',
      'Mocna architektura zaufania na dekady, budowana powoli i ponad chwilową burzą.',
      'Sojusz wolnych ludzi oparty na szacunku dla odrębności zamiast ciasnych przyzwyczajeń.',
      'Cisza zrozumienia bez tysiąca tłumaczeń i wrażliwość otulona wspólną czułością.'
    ],
    desire: [
      'Szybki zapłon od iskry spojrzenia, pewności kroku i dotyku bez wahania.',
      'Gęste pragnienie budowane przez smak, dotyk skóry, ciepły materiał i czas bez zegarka.',
      'Napięcie rodzące się w słowie, półuśmiechu i aluzji rzuconej ponad stołem.',
      'Pożądanie rozkwita dopiero wtedy, gdy drzwi są zamknięte, a serce czuje spokojny dom.',
      'Żar rośnie w świetle podziwu i uwagi skierowanej wyłącznie na jedną osobę.',
      'Dyskretny magnetyzm opanowania, czystości linii i dłoni uważnej na najmniejsze drgnięcie.',
      'Sztuka powolnego uwodzenia w półmroku, miękki jedwab i napięcie wiszące w powietrzu.',
      'Silny nurt przyciągania — uważne spojrzenie, potrzeba wyłączności i bliskość bez wahań.',
      'Spontaniczność w podróży, poczucie humoru i brak sztywnego scenariusza wieczoru.',
      'Ciemny płomień pod opanowaniem — rozpala tu siła charakteru i powolne zdejmowanie dystansu.',
      'Elektryzująca obietnica czegoś nowego i wolność bez przewidywalnej nudy.',
      'Półmrok, ulubiona muzyka w tle i łagodna bliskość z dala od presji dnia.'
    ]
  };

  const HOUSE_MEANINGS = {
    1: 'Od pierwszych chwil widać silne wrażenie fizyczne — naturalnie poprawiacie przy sobie sylwetkę i szukacie kontaktu wzrokowego.',
    2: 'Dotyka spraw poczucia wartości, dotyku oraz tego, jak razem podchodzicie do wspólnych pieniędzy i wygody.',
    3: 'Rozmowy płyną tu szeroko do późna: mnożą się wiadomości, żarty i wspólna ciekawość drobiazgów dnia.',
    4: 'Budzi poczucie spokojnego domu i prywatnego azylu — przy tej osobie szybciej schodzi napięcie po pracy.',
    5: 'Podkręca flirt, śmiech i zmysłową zabawę, dzięki czemu nawet po latach łatwiej wracać do randek.',
    6: 'Przekłada się na praktyczną troskę w zwykłym tygodniu, podział spraw domowych i dbanie o zdrowie.',
    7: 'Klasyczny ślad stałego partnerstwa: w tym kontakcie naturalnie szuka się równego głosu i poważnych deklaracji.',
    8: 'Wchodzi w strefę sypialni, zaufania oraz wspólnych zasobów finansowych — tu mało co zostaje na powierzchni.',
    9: 'Poszerza wspólny horyzont poprzez wyjazdy, rozmowy o wartościach i odwagę wychodzenia poza stare nawyki.',
    10: 'Wzmacnia wspólne ambicje i odbiór na zewnątrz — wspieracie swoje cele zawodowe i pozycję.',
    11: 'Wzmacnia przyjaźń, wspólne towarzystwo oraz rozmowy o planach na kolejne lata bez sztywnych ról.',
    12: 'Działa po cichu za kulisami: budzi silną intuicję na nastroje partnera, ale wymaga pilnowania jasnych granic.'
  };

  window.__SYN_COMPOSITE_TEXTS__ = { COMPOSITE_ARCHETYPES, getVerdict, MIDPOINT_SIGN_DESCRIPTIONS, HOUSE_MEANINGS };
})();

// 3. Profile prezentowe i sfery bliskosci
(function () {
  window.__SYN_GIFT_PROFILES__ = [
    {
      sign: 'Baran',
      m: {
        conflict: 'Reaguje od razu i mówi wprost, co myśli. Zamiast dwóch dni oficjalnej ciszy w domu woli pięć minut szczerej, ostrej wymiany zdań.',
        venusGift: 'Lubi gesty śmiałe i bez kalkulacji. Zachowawcze drobiazgi go nudzą; potrzebuje sygnału, że potrafisz spakować torbę wieczorem i ruszyć w drogę bez wahania.',
        openKey: 'Proste zdanie bez aluzji, brak gierek i szacunek dla jego prawa do pierwszego kroku.',
        secretGift: 'Nocna jazda po pustym torze lub flakon wyrazistych perfum z nutą skóry, dymu i czarnego pieprzu.'
      },
      f: {
        conflict: 'Zapala się w kilka sekund, gdy wyczuje lekceważenie. Odkładanie trudnej rozmowy na bliżej nieokreślone jutro odbiera jak zbywanie jej emocji.',
        venusGift: 'Ceni gesty odważne i żywe. Pociąga ją partner, który w napiętej chwili zachowuje spokój, bierze inicjatywę i nadaje rytm wieczoru.',
        openKey: 'Konkret bez kręcenia, własna inicjatywa i odwaga spojrzenia jej prosto w oczy.',
        secretGift: 'Niszowy ekstrakt perfum z nutą różowego pieprzu i żywicy albo dwa bilety wręczone godzinę przed wyjazdem.'
      }
    },
    {
      sign: 'Byk',
      m: {
        conflict: 'W napięciu zamyka się i broni własnego tempa. Pod naciskiem nie przyspiesza, tylko wycofuje się w uparte milczenie, aż w mieszkaniu znów wróci spokój.',
        venusGift: 'Otwiera go namacalna jakość i zmysłowy spokój: kolacja bez gonitwy, miękki kaszmir w dotyku oraz rzeczy szlachetniejące z upływem lat.',
        openKey: 'Spokojna dłoń na karku, cichy głos w kuchni i wierność bez nerwowych wahań.',
        secretGift: 'Ciężki szlafrok z czesanego kaszmiru albo rzemieślnicza woda kolońska z figowcem i sandałowcem.'
      },
      f: {
        conflict: 'Kiedy w relacji brakuje jej oparcia i taktu, wycofuje się w chłodną rezerwę. Nie podnosi głosu, tylko ogranicza czułość i sprawdza uważność partnera.',
        venusGift: 'Kocha prawdę materii wyczuwalną pod palcami. Gładki jedwab, stare drewno, spokojną kolację przy jednej lampce i piękno odporne na mody.',
        openKey: 'Cierpliwa obecność, dotyk bez gonitwy i pewność, że obietnica znaczy więcej niż nastrój.',
        secretGift: 'Jedwabny szlafrok w kolorze szampana albo ciężka świeca o zapachu figowca i drzewa sandałowego.'
      }
    },
    {
      sign: 'Bliźnięta',
      m: {
        conflict: 'Zasłania się błyskotliwym żartem i szybką ripostą. Im cięższa atmosfera w mieszkaniu, tym chętniej zmienia temat albo ucieka w ironię.',
        venusGift: 'Budzi go rozmowa z drugim dnem, zaskoczenie i błyskotliwy flirt ponad stołem. Podarunek bez historii usypia jego ciekawość od razu.',
        openKey: 'Lekkość słów, świeża myśl i brak ciężkiego przesłuchania za zamkniętymi drzwiami.',
        secretGift: 'Limitowany album fotograficzny albo bilety na nocny spektakl w innym mieście przed wspólną kolacją.'
      },
      f: {
        conflict: 'Gdy czuje ciężar wyrzutów i próbę zamknięcia w nudzie, odpala ciętą ripostę albo znika z rozmowy za szybą własnych spraw.',
        venusGift: 'Porywa ją dowcip, gra skojarzeń i gest otwierający okno na świat. Ceni przedmioty z ukrytą historią zamiast banałów z głównej witryny.',
        openKey: 'Żywy umysł, brak zazdrości o jej krąg i swoboda w zmianie planów przed zmierzchem.',
        secretGift: 'Kolekcjonerska księga sztuki albo koperta z zagadką prowadząca do nieznanej restauracji na końcu miasta.'
      }
    },
    {
      sign: 'Rak',
      m: {
        conflict: 'Wycofuje się w ciszę i obserwuje, czy zauważysz dystans. Długo pamięta szorstki ton głosu, bo pod spodem bardzo boi się odrzucenia.',
        venusGift: 'Pragnie domowego spokoju i rzeczy świadczących o pamięci. Najmocniej trafia gest mówiący wprost: pamiętam, co jest dla Ciebie ważne.',
        openKey: 'Bezpieczne schronienie, czułość bez świadków i zero kpin z jego miękkich miejsc.',
        secretGift: 'Zegarek lub spinki z grawerunkiem współrzędnych pierwszego spotkania albo ciężki koc z wełny merynosów.'
      },
      f: {
        conflict: 'Cichnie wśród zwykłych zajęć i czeka, aż sama obecność podpowie Ci, co ją zabolało. Niewypowiedziane żale potrafi długo nosić w sobie.',
        venusGift: 'Szuka ciepła z dala od hałasu ulicy. Najcenniejsze są drobiazgi niosące wspomnienie wspólnego świtu i troskę o jej spokój.',
        openKey: 'Stałość obecności, ramię odgradzające od cudzej szorstkości i pamięć o ważnych datach.',
        secretGift: 'Złoty medalion z wyrytą datą albo pościel z ciężkiego morwowego jedwabiu.'
      }
    },
    {
      sign: 'Lew',
      m: {
        conflict: 'Kiedy czuje się traktowany z chłodem i bez uważności, chowa zranienie za urażoną dumą. Najtrudniej znosi poczucie bycia na drugim planie.',
        venusGift: 'Potrzebuje rozmachu, światła i gestu, przy którym pokój na chwilę milknie. Rzecz dla niego ma nieść wyrazisty znak szacunku.',
        openKey: 'Lojalność przy ludziach, zachwyt bez fałszu i miejsce honorowe przy Twoim boku.',
        secretGift: 'Rzemieślniczy sygnet z 18-karatowego złota albo prywatna degustacja rocznikowej whisky wieczorem.'
      },
      f: {
        conflict: 'Gdy czuje się pomijana w planie tygodnia, szybko traci ciepło w głosie. Nie lubi dopraszać się o uwagę i wycofuje się z dystansem.',
        venusGift: 'Lubi pełny format i światło bez oszczędzania na detalu. Prezent ma jej przypominać, że jest wybrana ponad cały gwar ulicy.',
        openKey: 'Otwarty zachwyt w oczach innych, hojność bez liczenia minut i odwaga wielkiego gestu.',
        secretGift: 'Rzeźbiarska biżuteria ze złota albo kolacja przy świecach nad ciemną panoramą miasta.'
      }
    },
    {
      sign: 'Panna',
      m: {
        conflict: 'Zamiast podnosić głos, przechodzi do suchego wyliczania potknięć. Ta surowość pomaga mu opanować niepokój, gdy wokół robi się chaotycznie.',
        venusGift: 'Czyta miłość w drobiazgach niewidocznych dla tłumu. Porywa go szlachetne rzemiosło, czysta forma i rzecz rozwiązująca zwykły kłopot.',
        openKey: 'Punktualność, słowność w małych sprawach i szacunek do porządku w jego pokoju.',
        secretGift: 'Japońskie pióro wieczne o czystej linii albo skórzana teczka podróżna szyta ręcznie we Florencji.'
      },
      f: {
        conflict: 'Kiedy zmęczenie odbiera jej cierpliwość, zaczyna poprawiać drobiazgi w organizacji domu, osłaniając własny lęk przed utratą kontroli.',
        venusGift: 'Wycisza ją minimalizm bez krzykliwych metek, naturalny surowiec i gest odciążający ją bez pytania.',
        openKey: 'Czyn mocniejszy niż obietnica i przejęcie jednego trudnego ciężaru z jej listy.',
        secretGift: 'Apteczny flakon czystych olejków albo dyskretny pierścionek z surowym kamieniem.'
      }
    },
    {
      sign: 'Waga',
      m: {
        conflict: 'Unika ostrego krzyku i chaotycznych scen. Wycofuje się w uprzejmy dystans, waży w myślach proporcje zaangażowania i czeka na spokojną rozmowę.',
        venusGift: 'Oddycha miarą, światłem i taktem. Przypadkowy drobiazg bez stylu potrafi zgasić w nim cały zachwyt.',
        openKey: 'Kultura rozmowy, ładna oprawa wieczoru i uwaga bez zerkania na zegarek.',
        secretGift: 'Flakon niszowych perfum z paryskiego domu albo kolekcjonerski album dawnej architektury.'
      },
      f: {
        conflict: 'Zachowuje nienaganną formę przy stole, nawet gdy w środku narasta żal. Długo przemilcza zgrzyty w imię spokoju, zanim oddali się emocjonalnie.',
        venusGift: 'Szuka harmonii w dotyku, proporcji i głosie. Nerwowe tempo i brak taktu zabijają jej pragnienie jeszcze przed deserem.',
        openKey: 'Delikatność sporu, wieczór dopięty w szczegółach i pełna obecność bez rozpraszania.',
        secretGift: 'Flakon niszowych perfum z Paryża albo rzeźbiarski wazon z ciężkiego szkła Murano.'
      }
    },
    {
      sign: 'Skorpion',
      m: {
        conflict: 'Źle znosi półprawdy i wymijające odpowiedzi. W sporze milknie, uważnie słucha tonu głosu i bezbłędnie wyczuwa moment przemilczenia.',
        venusGift: 'Omija powierzchowne błahostki. Pragnie rzeczy z głębią i charakterem — takich, które niosą osobisty ładunek oraz pamięć chwil.',
        openKey: 'Naga szczerość bez pudru i odwaga zostania przy nim, gdy zapada noc.',
        secretGift: 'Ekstrakt perfum z czarnym oudem, skórą i kadzidłem albo bibliofilskie wydanie klasyki o namiętności.'
      },
      f: {
        conflict: 'Drobna nieszczerość budzi w niej silną rezerwę. Wycofuje czułość i z dystansu sprawdza, czy druga strona postawi na otwartą prawdę.',
        venusGift: 'Czeka na intensywność i autentyczność. Upominek ma nieść zmysłowe napięcie, dyskretną tajemnicę albo wyraźny znak wyłączności.',
        openKey: 'Prawda prosto w oczy, wyłączność bez cienia gry i siła, która nie drży pod jej wzrokiem.',
        secretGift: 'Obsydianowy jedwab nocny albo ciężki ekstrakt z ciemnej róży, oudu i żywicy.'
      }
    },
    {
      sign: 'Strzelec',
      m: {
        conflict: 'Kiedy wyczuje duszny ciężar wyrzutów albo kontrolę czasu, rzuca zbyt dosadne słowo bez dyplomacji i wychodzi przewietrzyć głowę.',
        venusGift: 'Kocha przestrzeń, daleki horyzont i śmiech w biegu. Prezent ma obiecywać przygodę, książkę pisaną w drodze albo smak nowego miasta.',
        openKey: 'Oddech bez kontroli, wspólny żart w złej chwili i zero prób przypinania go do krzesła.',
        secretGift: 'Skórzana torba weekendowa z biletem w kieszeni albo rzadki trunek przywieziony z daleka.'
      },
      f: {
        conflict: 'W dusznej powtarzalności zaczyna się szarpać. W złości mówi o dwa zdania za dużo, lecz gdy minie napięcie, nie nosi starej urazy.',
        venusGift: 'Ożywia ją ruch, horyzont i odwaga wyobraźni. Poruszają ją rzeczy otwierające nową drogę albo wyrywające z piątkowej nudy.',
        openKey: 'Wolność kroku, żywy entuzjazm i rola towarzysza drogi zamiast domowego strażnika.',
        secretGift: 'Ręcznie szyty dziennik podróży z biletem w okładce albo biżuteria ze wzorem dawnych map nieba.'
      }
    },
    {
      sign: 'Koziorożec',
      m: {
        conflict: 'Zamyka się za biurkiem z ciemnego drewna i chłodzi głos. Odcina czułość, chowając za obowiązkami obawę, że okaże słabość.',
        venusGift: 'Rozumie cichą klasę bez krzykliwych metek. Szlachetny metal, stara skóra i rzecz kupiona na dwadzieścia lat znaczą więcej niż sezonowy szał.',
        openKey: 'Słowo twarde jak kamień, szacunek do jego pracy i pokój, w którym nie stoi na warcie.',
        secretGift: 'Klasyczny zegarek na pasku ze skóry, aktówka z włoskiej licówki albo rocznikowa butelka z prywatnej piwnicy.'
      },
      f: {
        conflict: 'Chowa emocje za nienaganną uprzejmością i cichnie bez awantury. Pod samowystarczalnością nosi obawę, że w kryzysie zostanie bez oparcia.',
        venusGift: 'Ceni dyskretną doskonałość formy i rzeczy odporne na czas. Omija głośne nowości; wybiera rzemiosło o spokojnej, ponadczasowej klasie.',
        openKey: 'Spójność czynu ze słowem i przejęcie ciężaru bez proszenia po raz trzeci.',
        secretGift: 'Ciężki szal z czystego kaszmiru, prosta torebka bez logo albo pierścień z matowego onyksu.'
      }
    },
    {
      sign: 'Wodnik',
      m: {
        conflict: 'Wyłącza zaangażowanie w ułamku sekundy i ogląda spór z chłodnego dystansu. Im mocniejszy nacisk na wyznania, tym bardziej potrzebuje osobności.',
        venusGift: 'Pociąga go osobliwość i przedmiot nie z tego katalogu. Masowa produkcja ze sklepowej sieci od razu go nudzi.',
        openKey: 'Przyjaźń mocniejsza niż zaborczość, ostra myśl i zgoda na jego własny rytm nocy.',
        secretGift: 'Surowy gramofon o czystym brzmieniu, rzadki sprzęt audio albo sygnowana grafika młodego artysty.'
      },
      f: {
        conflict: 'Chowa się za chłodną uprzejmością i ucieka myślami mimo wspólnego wieczoru. Próba wtłoczenia w gotowy schemat zamyka ją we własnym świecie.',
        venusGift: 'Otwiera ją to, co osobne, nieoczywiste i wolne od schematu. Szuka znaku, że dostrzegasz w niej prawdziwą indywidualność.',
        openKey: 'Rozmowa na równej wysokości, zachwyt jej innością i prywatny pokój dla własnych myśli.',
        secretGift: 'Rzeźbiarska biżuteria z małej pracowni, zapach o mineralnej nucie albo winyl z archiwum.'
      }
    },
    {
      sign: 'Ryby',
      m: {
        conflict: 'Silnie przejmuje napięcie domu, po czym ucieka w sen, muzykę albo milczenie. Przy szorstkim tonie zamyka się w sobie, chroniąc wrażliwość.',
        venusGift: 'Wypatruje znaków między wierszami i nastroju chwili. Najmocniej działają rzeczy budzące wspomnienia, spokój i cichą wyobraźnię.',
        openKey: 'Miękka dłoń, słuchanie tego, co zostało przemilczane, i ucieczka od wrzasku ulicy.',
        secretGift: 'Winyl z nocną muzyką filmową, porządne słuchawki albo żywiczne kadzidło o zapachu cedru i dymu.'
      },
      f: {
        conflict: 'Głęboko przeżywa cudzy gniew, szybko cichnie ze wzruszenia albo chowa się za niedopowiedzeniem. Ostry ton rani ją mocniej niż przedmiot sporu.',
        venusGift: 'Pragnie poezji w zwykłym geście i ciepła po zachodzie słońca. Upominek ma wyciszać zmysły i budować spokojny wieczór.',
        openKey: 'Czułość zanim padną zarzuty, wiara w jej przeczucie i zamknięcie drzwi przed zgiełkiem.',
        secretGift: 'Wieczorny zestaw kąpielowy z solą morską i różą damasceńską albo jedwabna opaska na oczy.'
      }
    }
  ];
})();

// 4. Planety zewnetrzne, domy, skrypty i tranzyty
(function () {
  'use strict';

  const EL_GEN = { Ogień: 'Ognia', Ziemia: 'Ziemi', Powietrze: 'Powietrza', Woda: 'Wody' };
  const COMP_GEN = { sun: 'Słońca', moon: 'Księżyca', venus: 'Wenus', mars: 'Marsa', Słońce: 'Słońca', Księżyc: 'Księżyca', Wenus: 'Wenus', Mars: 'Marsa' };
  const COMP_INS = { sun: 'ze Słońcem', moon: 'z Księżycem', venus: 'z Wenus', mars: 'z Marsem', Słońce: 'ze Słońcem', Księżyc: 'z Księżycem', Wenus: 'z Wenus', Mars: 'z Marsem' };

  const OUTER_PAIRS = {
    'sun-uranus': { h: 'Przy sobie łatwiej odpuścić cudze oczekiwania i wybrać własny, autentyczny sposób na wspólne życie.', c: 'Pojawiają się nagłe zmiany decyzji i ostry sprzeciw wtedy, gdy któreś z Was poczuje zbyt mocny nacisk.' },
    'moon-uranus': { h: 'Potraficie rozładować domowe napięcie celnym żartem oraz okazać sobie czułość w nieoczekiwanym momencie.', c: 'Gdy w mieszkaniu robi się zbyt ciasno od emocji, pojawia się nagła potrzeba dystansu i wyjścia w swoje sprawy.' },
    'uranus-venus': { h: 'Od pierwszego spotkania towarzyszy Wam żywa iskra oraz ciekawość, dzięki którym trudno tu o nudę.', c: 'Potrzeba własnej swobody odzywa się często dokładnie wtedy, gdy partner czeka już na spokojną deklarację.' },
    'mars-uranus': { h: 'Wnosicie do sypialni śmiały temperament oraz odwagę do działania od razu bez długiego wahania.', c: 'W złości potraficie wybuchnąć w jednej sekundzie i równie nagle przerwać rozmowę przed wyciszeniem emocji.' },
    'mercury-uranus': { h: 'Łączą Was szybkie skojarzenia, wspólne pomysły oraz błyskotliwe poczucie humoru ratujące gorszy dzień.', c: 'Niecierpliwe przerywanie w pół zdania i skakanie po tematach utrudniają spokojne dokończenie ważnej rozmowy.' },
    'neptune-sun': { h: 'Wyczuwacie swoje nastroje z dużą wrażliwością i potraficie wybaczać sobie drobne potknięcia w trudniejszym czasie.', c: 'Niedopowiedzenia oraz brak twardych ustaleń sprawiają, że łatwo uwierzyć w wyobrażenie zamiast sprawdzić fakty.' },
    'moon-neptune': { h: 'Odgadujecie nastrój partnera jeszcze zanim cokolwiek powie i potraficie otoczyć się łagodną troską.', c: 'Zacierają się wyraźne granice, przez co łatwo o ciche żale, że partner sam nie domyślił się potrzeby.' },
    'neptune-venus': { h: 'Tworzycie nastrojowe wieczory pełne muzyki, czułości oraz delikatności oderwanej od biegu tygodnia.', c: 'Łatwo tu zakochać się we własnym wyobrażeniu i przeżyć rozczarowanie przy zderzeniu ze zwykłą prozą dnia.' },
    'mars-neptune': { h: 'Bliskość opiera się na uważnym dotyku oraz zmysłowości, w której liczy się wspólny nastrój chwili.', c: 'Zamiast otwartego sporu pojawia się bierny opór oraz wymijające odpowiedzi tam, gdzie potrzeba prostej decyzji.' },
    'mercury-neptune': { h: 'Rozmawiacie o muzyce, snach i skojarzeniach, rozumiejąc swoje intencje bez długiego tłumaczenia.', c: 'Ważne ustalenia oraz daty łatwo gubią się w niedopowiedzeniach, dlatego warto potwierdzać je jasno na głos.' }
  };

  const PLANET_HOUSE = {
    sun: {
      1: 'Od pierwszych minut przy tej osobie łatwiej wyprostować plecy i poczuć pewność siebie.',
      4: 'Wieczory we wspólnym mieszkaniu szybciej spuszczają ciśnienie po pracy.',
      5: 'Rozbudza flirt, wspólną zabawę i ochotę pokazywania się razem między ludźmi.',
      7: 'Przyciąga partnerską uwagę — naturalnie szuka się tu bliskości i równego głosu.',
      8: 'Wchodzi w strefę intymności, zaufania i wspólnych pieniędzy, gdzie mało co bywa powierzchowne.',
      10: 'Wzmacnia wspólne ambicje — nawzajem dodajecie sobie odwagi i wspieracie swoją pozycję.',
      12: 'Działa dyskretnie za kulisami: budzi silne przeczucia, ale sprzyja przemilczaniu pretensji.'
    },
    moon: {
      1: 'Daje natychmiastowe wyczucie nastroju drugiej osoby już przy porannej kawie.',
      4: 'Tworzy poczucie bezpiecznego domu — obecność tej osoby wycisza nerwy po trudnym dniu.',
      5: 'Łączy czułość z lekkością i dotykiem; łatwo tu o bliskość bez sztywnej powagi.',
      7: 'Wiąże nastrój całego dnia z klimatem relacji — rośnie potrzeba bliskości i wspólnych decyzji.',
      8: 'Odsłania najgłębsze pragnienia i lęki w sypialni, gdzie trudno udawać obojętność.',
      10: 'Sprawia, że spokój z domu wprost przekłada się na stabilność w sprawach zawodowych.',
      12: 'Wyczuwa cudze zmęczenie przez ścianę — pilnujcie granic, by nie przejmować całego stresu.'
    },
    venus: {
      1: 'Wnosi wyraźny urok i lekkość — sam sposób bycia tej osoby przyciąga wzrok.',
      4: 'Wnosi przyjemny ład do mieszkania: dobre światło, wspólny stół i chęć dbania o dom.',
      5: 'Podtrzymuje romans i zmysłową ciekawość, dzięki czemu nawet po latach wracacie do randek.',
      7: 'Łagodzi spięcia i daje przyjemność ze zwykłego bycia razem pod jednym dachem.',
      8: 'Łączy silne pożądanie z pragnieniem wyłączności oraz pełnego zaufania w łóżku.',
      10: 'Dodaje taktu w sprawach publicznych i ociepla to, jak jesteście odbierani przez otoczenie.',
      12: 'Budzi cichą, prywatną czułość za zamkniętymi drzwiami — przywiązanie mocniejsze niż słowa.'
    },
    mars: {
      1: 'Błyskawicznie podnosi temperaturę: budzi zarówno pożądanie, jak i chęć rywalizacji.',
      4: 'Wnosi mnóstwo energii do spraw domowych — świetny do remontu, ostry przy sprzeczce w kuchni.',
      5: 'Przynosi odważną namiętność i śmiałą inicjatywę w sypialni bez czekania na zachętę.',
      7: 'Wywołuje otwarte spory, które szybciej oczyszczają atmosferę niż chowanie żalu po kątach.',
      8: 'Niesie mocne napięcie erotyczne oraz tarcia wokół wspólnych pieniędzy, zazdrości i granic.',
      10: 'Napędza wspólne cele i ambicje, dopóki nie walczycie o to, czyje zdanie będzie na wierzchu.',
      12: 'Potrafi wracać jako cicha irytacja — lepiej mówić o pretensjach od razu, zanim zamienią się w chłód.'
    },
    lilith: {
      1: 'Przyciąga surową pewnością siebie i niechęcią do grzecznych masek na pokaz.',
      4: 'Porusza dawne nawyki wyniesione z domu rodzinnego i uczy szczerości za zamkniętymi drzwiami.',
      5: 'Rozbudza śmiały flirt i potrzebę namiętności wolnej od grzecznych zasad.',
      7: 'Sprawdza na bieżąco, ile prawdziwej swobody mieści się w Waszym związku.',
      8: 'Otwiera sferę tabu, zazdrości i bezkompromisowej intensywności w łóżku.',
      10: 'Prowokuje komentarze otoczenia i każe bronić własnych wyborów po swojemu.',
      12: 'Budzi ukryte pragnienia, które w dzień rzadko padają przy kuchennym stole.'
    }
  };
  const FALLBACK_SPHERE = {
    2: 'poczucie własnej wartości, dotyk i decyzje o wspólnych pieniądzach.',
    3: 'rozmowy na co dzień, wiadomości i zwykłe spieranie się o drobiazgi.',
    6: 'wzajemną troskę w tygodniu, podział obowiązków i dbanie o zdrowie.',
    9: 'plany wyjazdów, naukę oraz odwagę wychodzenia poza stare przyzwyczajenia.',
    11: 'przyjaźń, wspólne towarzystwo oraz rozmowy o planach na kolejne lata.'
  };
  const FALLBACK_ACT = {
    sun: 'Wyraźnie ożywia', moon: 'Otwiera emocjonalnie i pogłębia', venus: 'Ociepla i wnosi czułość w',
    mars: 'Mocno nakręca, choć czasem zaostrza', lilith: 'Odziera z pozorów i sprawdza'
  };
  const COMP_SATURN = {
    Ogień: 'Trwałość rośnie tu wtedy, gdy duma ustępuje miejsca wzajemnemu szacunkowi i cierpliwości.',
    Ziemia: 'Daje twardy grunt — wspólne zobowiązania, dom oraz finanse krzepną z każdym rokiem.',
    Powietrze: 'Trzyma więź przez jasne ustalenia i rozmowę; chłód wchodzi przy unikaniu konkretów.',
    Woda: 'Sprawdza dojrzałość uczuć: zamiast sprawdzać się milczeniem, mówcie o obawach wprost.'
  };
  const DISARM = {
    Ogień: ['„Widzę, że bardzo Cię to rusza. Powiedz mi wprost, o co chodzi, tylko spokojniej.”', '„Nie uciekam od tej rozmowy, jestem tutaj. Powiedz bez nerwów, czego teraz potrzebujesz.”', '„Zróbmy pięć minut przerwy, napijmy się wody i wróćmy do tego ciszej.”'],
    Ziemia: ['„Nie musisz odpowiadać w tej sekundzie. Odpocznijmy chwilę i wrócimy do tego za pół godziny.”', '„Rozumiem, gdzie jest Twoja granica. Ustalmy jedną rzecz, którą załatwimy dzisiaj od razu.”', '„Możesz na mnie liczyć na co dzień, nawet jeśli w tej jednej sprawie nie zgadzamy się od razu.”'],
    Powietrze: ['„Zatrzymajmy na chwilę tę kłótnię i przejdźmy się dziesięć minut, żeby nie kręcić się w kółko.”', '„Nie szukam winnego ani nie chcę Cię rozliczać — po prostu chcę usłyszeć, jak Ty to widzisz.”', '„Powiedzmy sobie po jednym najważniejszym zdaniu bez przerywania.”'],
    Woda: ['„Nigdzie nie idę, nawet gdy jest trudno. Powiedz spokojnie, co Cię w tym zabolało.”', '„Nie chcę zbywać tego samymi argumentami. Chodź na chwilę, usiądźmy blisko.”', '„Wiem, jak bardzo jest to dla Ciebie czuły punkt — nie chcę obracać tego przeciwko Tobie.”']
  };
  const TRIGGERS = {
    Ogień: ['Przerywanie w pół zdania z ironicznym uśmieszkiem.', 'Obrażanie się na kilka dni i zamykanie drzwi bez wyjaśnienia.', 'Podważanie decyzji przy znajomych.'],
    Ziemia: ['Popędzanie w nerwach i stawianie ultimatum w środku nocy.', 'Niedotrzymywanie drobnych obietnic oraz lekceważenie budżetu.', 'Wyśmiewanie potrzeby spokoju.'],
    Powietrze: ['Ciężki patos i przesłuchania o każdą wiadomość w telefonie.', 'Sarkastyczne poprawianie słów zamiast słuchania uczuć.', 'Sztywna kontrola czasu i znajomych.'],
    Woda: ['Podnoszenie głosu i zimny cynizm w chwili słabości.', 'Straszenie rozstaniem w zwykłej sprzeczce.', 'Kpina z przeczuć i obaw drugiej strony.']
  };
  const RITUALS = [
    'Spontaniczny wyjazd bez sztywnego planu albo kolacja w nowym miejscu przed powrotem do domu.',
    'Wieczór bez zegarka: telefony w drugim pokoju, ciepłe światło, dobre wino i dotyk.',
    'Długa nocna rozmowa w spokojnej kawiarni o sprawach, na które w tygodniu brakuje czasu.',
    'Domowy wieczór przy zasłoniętych oknach: wspólne gotowanie, ulubiona muzyka i spokój.',
    'Wyjście bez okazji w eleganckim stroju — szczery komplement i pełna uwaga przez cały wieczór.',
    'Przejęcie jednego uciążliwego obowiązku w tygodniu i spokojny poranek we dwoje.',
    'Wyjście z klasą: półmrok kawiarni, teatr albo jazz i rozmowa bez sprawdzania telefonu.',
    'Bliskość bez cenzury — jedna szczera rozmowa przy zgaszonej lampie.',
    'Weekendowy wyjazd do innego miasta bez listy zwiedzania i spacer nowymi ulicami.',
    'Spokojny wieczór bez rozpraszaczy oraz rozmowa o jednym wspólnym celu na najbliższy rok.',
    'Niespodziewana zmiana planów w środku tygodnia bez wcześniejszej zapowiedzi.',
    'Wieczór przy muzyce z płyty bez ekranów — zwykła obecność ważniejsza niż długie dyskusje.'
  ];

  function getSaturnMilestones(score, satA, satB, karmaHits) {
    const kTxt = karmaHits === 0 ? 'bez ścisłych aktywacji Węzła' : (karmaHits === 1 ? 'z jedną ścisłą aktywacją Węzła' : `z ${karmaHits} aktywacjami Węzła`);
    const satTxt = satA === satB ? `ten sam znak Saturna (${satA})` : `zestawienie Saturna (${satA} i ${satB})`;
    return [
      score >= 65 ? 'Rok 1 (po pierwszych emocjach): płynne przejście do zwykłego rytmu bez utraty wzajemnego szacunku.' : 'Rok 1 (po pierwszych emocjach): wyraźna różnica tempa — warto od razu nazwać oczekiwania na głos zamiast zgadywać.',
      `Rok 3 (próba zwykłego życia): ${satTxt} sprawdza podział obowiązków, pieniędzy i granic domu.`,
      `Rok 7 (dojrzały układ): układ trwałości (${kTxt}) sprawdza umiejętność dbania o pragnienie ponad przyzwyczajeniem.`
    ];
  }
  function getTransitNote(w) {
    const h = w.tone === 'harmony' || w.tone === 'intense';
    const target = w.aspect === 'Koniunkcja' ? (COMP_INS[w.cKey] || COMP_INS[w.cLabel] || `z ${w.cLabel}`) : `do ${COMP_GEN[w.cKey] || COMP_GEN[w.cLabel] || w.cLabel}`;
    const map = { jupiter: h ? 'lżejszy czas i więcej swobody we wspólnych planach' : 'pokusa przesady i składania obietnic na wyrost', saturn: h ? 'utrwalenie więzi i dojrzałe decyzje na lata' : 'próba granic wymagająca uczciwej rozmowy', uranus: h ? 'świeży impuls przełamujący przewidywalność' : 'napięcie wokół swobody — warto poluzować sztywny grafik', pluto: h ? 'pogłębienie zaufania bez uników' : 'test zazdrości — nie warto wchodzić w ciche sprawdziany' };
    return `${w.tLabel} (${w.aspect} ${w.sym} ${target} kompozytu) — ${map[w.tKey] || 'ważna zmiana rytmu'}.`;
  }
  function getCoupleRitual(venIdx, moonEl) {
    const anchor = moonEl === 'Woda' ? 'ciepło i poczucie wyłączności' : moonEl === 'Ziemia' ? 'spokój oraz uważny dotyk' : moonEl === 'Powietrze' ? 'swobodna rozmowa' : 'śmiała inicjatywa';
    return `${RITUALS[venIdx % 12]} Najbardziej regeneruje Was wtedy ${anchor}.`;
  }
  function getPlanetHouseText(key, h) {
    if (PLANET_HOUSE[key] && PLANET_HOUSE[key][h]) return PLANET_HOUSE[key][h];
    if (FALLBACK_SPHERE[h] && FALLBACK_ACT[key]) return `${FALLBACK_ACT[key]} ${FALLBACK_SPHERE[h]}`;
    return 'Wyraźnie porusza tę sferę w zwykłym kontakcie między Wami.';
  }

  window.__SYN_EXPAND_DATA__ = { OUTER_PAIRS, COMP_SATURN, DISARM, TRIGGERS, getSaturnMilestones, getTransitNote, getCoupleRitual, getPlanetHouseText };
})();

// 5. Porownanie 1:1 (Merkury, Mars, Wenus)
(function () {
  'use strict';

  const MERC_12 = [
    'Mówi prosto z mostu. Decyzje podejmuje w kilka minut, a długie kazania albo wytykanie błędów od razu podnoszą mu ciśnienie.',
    'Słowa dobiera spokojnie i z namysłem. Potrzebuje czasu przed ważną deklaracją, a pod naciskiem krytyki twardo trzyma się swojego zdania.',
    'Myśli szybciej, niż zdąży skończyć zdanie. Kiedy atmosfera robi się zbyt gęsta, najchętniej ucieka w celny żart lub zmianę tematu.',
    'Najpierw wyłapuje ton głosu. Ostrożnie waży decyzje; po jednej szorstkiej uwadze zamyka się od razu.',
    'Pewność siebie w rozmowie przychodzi mu naturalnie. Decyduje śmiało, choć uwaga rzucona przy obcych potrafi zaboleć jak ujma.',
    'Zanim cokolwiek postanowi, sprawdza fakty na stole. Wyłapuje detale umykające reszcie i każdą uwagę o sobie bierze bardzo poważnie.',
    'Długo waży racje obu stron, unikając ostrego tonu. W sytuacjach wymagających decyzji w biegu czuje się wyraźnie nieswojo.',
    'Czyta między wierszami. Drąży temat do samego końca, nie decyduje pochopnie i zamyka się w milczeniu przy półprawdach.',
    'Patrzy szeroko zamiast grzęznąć w szczegółach. Mówi szczerze bez dyplomacji, szybko nudząc się długim sporem o drobiazg.',
    'Konkret i jasny plan ceni ponad długie wstępy. Wybory podejmuje po sprawdzeniu kosztów, bo emocjonalne dygresje odbierają mu cierpliwość.',
    'Rozmawia lekko, zupełnie po swojemu. Narzucanie jedynej słusznej opinii kończy się tu odsunięciem krzesła jeszcze przed argumentem.',
    'Mówi obrazami, wyczuwając nastrój w pokoju. Z twardą decyzją zwleka, dopóki oschły ton nie odbierze chęci do dialogu.'
  ];

  const MARS_12 = [
    'Działa bez długiego wstępu. W kryzysie od razu przejmuje ster, wybucha krótko i równie szybko wraca do zgody bez chowania urazy.',
    'Rozpędza się powoli, lecz zawsze dowozi sprawę do końca. Pod presją stawia twardy opór i długo pamięta naruszone granice.',
    'Łapie kilka spraw naraz. Złość rozładowuje w szybkiej wymianie zdań i po kwadransie potrzebuje już świeżego tematu.',
    'Rzadko atakuje wprost. W obronie bliskich ma ogromną siłę, choć w stresie częściej wycofuje się w ciszę albo rzuca cichą szpilę.',
    'Inicjuje z dużym rozmachem. W trudnej chwili broni godności, a złość mija dopiero wtedy, gdy poczuje szczere uznanie.',
    'Rozkłada problem na konkretne zadania. W nerwach zaczyna wytykać drobiazgi i porządkuje wszystko wokół.',
    'Z pierwszym krokiem czeka na zgodę. Unika głośnych awantur; przy zbyt mocnym nacisku potrafi nagle odciąć kontakt.',
    'Działa po cichu, z pełnym zaangażowaniem. W gniewie nie krzyczy, lecz długo pamięta każdy brak lojalności.',
    'Rzuca się w nowe plany z entuzjazmem. Gdy napięcie rośnie, ucieka w ruch lub wyjazd.',
    'Idzie naprzód cierpliwie według planu. W trudnym tygodniu chłodzi emocje i przekłada złość na konsekwentną pracę.',
    'Reaguje po swojemu. Pod presją ucina emocje i zamyka spór z chłodnego dystansu.',
    'Kieruje się wyczuciem chwili. Unika ostrego starcia, a po kłótni potrzebuje kwadransa ciszy.'
  ];

  const VENUS_12 = [
    'Okazuje uczucia wprost i lubi szybkie zbliżenie. Przewidywalna nuda oraz ciągła ostrożność bardzo szybko studzą tu zapał.',
    'Bliskość buduje przez dotyk, dobre jedzenie i stałość. Brak czasu oraz nerwowa niepewność potrafią zepsuć smak najlepszego wieczoru.',
    'Zakochuje się przez rozmowę i błyskotliwe wiadomości. Ciężka powaga bez odrobiny lekkości gasi chemię szybciej niż różnica zdań.',
    'Potrzebuje bezpiecznego progu z dala od obcych oczu. Chłód albo żarty z uczuć potrafią zamknąć otwartość na kilka dni.',
    'Kocha wyraźne gesty, ciepło i wzajemny podziw. Brak uwagi albo zwykłe tygodnie bez świętowania ranią najbardziej.',
    'Przekłada miłość na uważne drobiazgi i dotyk bez pośpiechu. Chaos oraz niesłowność odpychają tu najskuteczniej.',
    'Szuka taktu, ładnej oprawy wieczoru i równego dialogu. Podniesiony głos oraz brak delikatności od razu gaszą pragnienie.',
    'Pragnie mocnej wyłączności bez półprawd. Letnie kompromisy i udawana grzeczność nudzą już na starcie.',
    'Łączy bliskość z ruchem, śmiechem i wyjazdami. Zaborczość i pilnowanie każdej godziny wywołują tu natychmiastową chęć ucieczki.',
    'Okazuje uczucia przez wierność i czyny na lata. Lekkomyślność wobec wspólnych ustaleń bardzo szybko podkopuje zaufanie.',
    'Potrzebuje w związku przyjaźni oraz własnego powietrza. Sztywne role i wymuszanie deklaracji od razu chłodzą więź.',
    'Karmi czułość muzyką, nastrojem i łagodnością. Szorstki pragmatyzm oraz brak delikatności ranią tu najmocniej.'
  ];

  function pairBridge(dos, key, sameMsg, mixMsg) {
    const pA = dos.posA[key], pB = dos.posB[key];
    const asp = (dos.fullAspects || []).find((a) => a.bA.key === key && a.bB.key === key);
    const orbWord = asp ? (asp.orb <= 1.5 ? 'bardzo ścisły' : (asp.orb <= 3.5 ? 'wyraźny' : 'lekki')) : '';
    const hit = asp ? ` Między Wami działa też ${orbWord} ${asp.name.toLowerCase()}.` : '';
    if (pA.element === pB.element) return `${sameMsg}.${hit}`;
    return `${mixMsg}.${hit}`;
  }

  function buildOneToOneData(d, dos) {
    return [
      { glyph: '☿', title: 'STYL ROZMOWY I DECYZJI (MERKURY × MERKURY)', signA: dos.posA.mercury.name, signB: dos.posB.mercury.name, textA: MERC_12[dos.posA.mercury.idx], textB: MERC_12[dos.posB.mercury.idx], bridge: pairBridge(dos, 'mercury', 'Macie podobne tempo myślenia i wymiany zdań', 'Różni Was tempo analizy oraz podejmowania decyzji') },
      { glyph: '♂', title: 'STYL DZIAŁANIA I INICJATYWY (MARS × MARS)', signA: dos.posA.mars.name, signB: dos.posB.mars.name, textA: MARS_12[dos.posA.mars.idx], textB: MARS_12[dos.posB.mars.idx], bridge: pairBridge(dos, 'mars', 'Macie zbliżony temperament w działaniu i sporach', 'Macie inny rytm inicjatywy i rozładowywania złości') },
      { glyph: '♀', title: 'STYL BLISKOŚCI I SYPIALNI (WENUS × WENUS)', signA: dos.posA.venus.name, signB: dos.posB.venus.name, textA: VENUS_12[dos.posA.venus.idx], textB: VENUS_12[dos.posB.venus.idx], bridge: pairBridge(dos, 'venus', 'Mówicie bardzo podobnym językiem czułości i gustu', 'Macie inne oczekiwania wobec tempa bliskości i gestów') }
    ];
  }

  window.__SYN_ONE_TO_ONE_DATA__ = { buildOneToOneData };
})();

// 6. Trzy strefy wspolnego zycia i 5 pytan na wieczor
(function () {
  'use strict';

  function buildMaturityLesson(d, dos) {
    return window.__SYNASTRY_FREE_TEXTS__ ? window.__SYNASTRY_FREE_TEXTS__.buildMaturityLesson(d, dos) : { title: '', body: '', meta: '' };
  }

  function buildLifeDomains(d, dos, houseHits) {
    const M = typeof window !== 'undefined' ? window.SynPlMorphology : null;
    const gA = M ? M.inferGender(d.nameA, d.genderA) : (d.genderA || 'f');
    const gB = M ? M.inferGender(d.nameB, d.genderB) : (d.genderB || 'm');
    const both = M ? M.pairBoth(gA, gB) : 'oboje';
    const has = (h) => Boolean(houseHits && houseHits.has(h));
    const vA = dos.posA.venus.element, vB = dos.posB.venus.element;
    const fA = M ? M.inflectName(d.nameA, gA) : { nom: d.nameA, gen: d.nameA };
    const fB = M ? M.inflectName(d.nameB, gB) : { nom: d.nameB, gen: d.nameB };
    const isImp = (e) => e === 'Ogień' || e === 'Powietrze';

    let money = `${fA.nom} i ${fB.nom} patrzą na wygodę oraz wydatki przez inny pryzmat, więc prosty podział na wspólne rachunki oraz własną pulę chroni przed wyrzutami.`;
    if ((vA === 'Ziemia' && isImp(vB)) || (vB === 'Ziemia' && isImp(vA))) {
      const earthN = vA === 'Ziemia' ? fA.nom : fB.nom, impN = vA === 'Ziemia' ? fB.nom : fA.nom;
      money = `${earthN} pilnuje rezerw i trwałości zakupu, podczas gdy ${impN} wydaje pod wpływem chwili, więc pomaga jasny limit wspólnych decyzji.`;
    } else if (!isImp(vA) && !isImp(vB)) {
      money = `${both.charAt(0).toUpperCase() + both.slice(1)} cenicie finansowy spokój, więc rzadko grożą Wam nieprzemyślane zakupy, dopóki nie odmawiacie sobie przyjemności ze wspólnych wyjazdów.`;
    } else if (isImp(vA) && isImp(vB)) {
      money = `${both.charAt(0).toUpperCase() + both.slice(1)} lubicie wydawać na wrażenia oraz spontaniczne wyjścia, dlatego warto automatycznie odkładać stałą kwotę jeszcze przed startem miesiąca.`;
    }
    if (has(2)) money += ' Finanse mocno łączą się tu z poczuciem bezpieczeństwa.';

    const mA = dos.posA.moon.element, mB = dos.posB.moon.element;
    const quiet = (e) => e === 'Ziemia' || e === 'Woda';
    let home = '';
    if (quiet(mA) && quiet(mB)) home = `${both.charAt(0).toUpperCase() + both.slice(1)} najlepiej odpoczywacie za zamkniętymi drzwiami z dala od nadmiaru gości, budując spokojną przystań, jeśli pamiętacie o wspólnych wyjściach.`;
    else if (!quiet(mA) && !quiet(mB)) home = `${both.charAt(0).toUpperCase() + both.slice(1)} lubicie ruch, rozmowy do późna i otwarty dom, więc dla złapania oddechu warto pilnować jednego spokojnego wieczoru tylko we dwoje.`;
    else home = `${quiet(mA) ? fA.nom : fB.nom} odpoczywa w ciszy domu, natomiast ${quiet(mA) ? fB.nom : fA.nom} po pracy potrzebuje rozmowy lub wyjścia, dlatego pomaga godzina spokoju na start.`;
    if (has(4) || has(6)) home += ' Ład w mieszkaniu wpływa tu wprost na klimat.';

    const rA = dos.posA.mars.element, rB = dos.posB.mars.element;
    let work = `${fA.nom} i ${fB.nom} inaczej rozkładają tempo wspólnych zadań, więc najmniej spięć daje prosty podział ról już na samym początku.`;
    if (rA === rB) work = `${both.charAt(0).toUpperCase() + both.slice(1)} macie podobny styl działania w remoncie lub podróży, trzeba tylko uważać w sporze, by oba upory nie walczyły o ster.`;
    else if ((rA === 'Ogień' && rB === 'Ziemia') || (rB === 'Ogień' && rA === 'Ziemia')) work = `${rA === 'Ogień' ? fA.nom : fB.nom} nadaje rozpęd, a ${rA === 'Ziemia' ? fA.nom : fB.nom} pilnuje terminów oraz kosztów, tworząc skuteczny tandem bez niepotrzebnych tarć.`;
    if (has(10)) work += ' Sprzyja Wam także wspólny cel zawodowy.';

    return [
      { title: 'Budżet i styl wydawania', tag: 'WENUS • SATURN' + (has(2) ? ' • 2. DOM' : ''), body: money },
      { title: 'Rytm mieszkania i odpoczynku', tag: 'KSIĘŻYCE' + (has(4) || has(6) ? ' • 4./6. DOM' : ''), body: home },
      { title: 'Wspólne działanie i projekty', tag: 'MARS • MERKURY' + (has(10) ? ' • 10. DOM' : ''), body: work }
    ];
  }

  function buildFiveQuestions(d, dos) {
    const out = [], seen = new Set(), add = (id, tag, q) => { if (!seen.has(id) && out.length < 5) { seen.add(id); out.push({ tag, q }); } };
    const moonTense = (dos.fullAspects || []).some((a) => a.bA.key === 'moon' && a.bB.key === 'moon' && (a.tone === 'friction' || a.tone === 'polar'));
    if (moonTense || d.syn.security < 58) add('moon', 'RYTM EMOCJI I DOMU', 'Po ciężkim dniu czego bardziej potrzebujesz ode mnie na progu — 20 minut ciszy, przytulenia bez rad czy krótkiej rozmowy od razu?');
    if (dos.obsessionFinal >= 68 || (dos.tabooAspects && dos.tabooAspects.length > 0)) add('taboo', 'ZAUFANIE I GRANICE', 'Jakie jedno moje zachowanie albo niedopowiedzenie najszybciej uruchamia u Ciebie nieufność lub zazdrość — i co wtedy najlepiej je gasi?');
    if (d.syn.friction >= 55) add('fric', 'BEZPIECZNIK W KŁÓTNI', 'Jakie jedno umówione hasło albo gest ma dla nas znaczyć „zatrzymujemy rozmowę na kwadrans”, zanim złość zaprowadzi nas za daleko?');
    if (dos.commFinal <= 55 || dos.posA.mercury.element !== dos.posB.mercury.element) add('comm', 'STYL ROZMOWY', 'Kiedy opowiadasz o jakimś kłopocie, skąd mam wiedzieć, czy chcesz tylko wysłuchania, czy wspólnego szukania rozwiązania?');
    if (dos.saturnFinal < 60) add('sat_low', 'SŁOWO I OBOWIĄZKI', 'W jakiej jednej zwykłej sprawie masz poczucie, że nosisz więcej niż połowę ciężaru — i co mogę przejąć od tego tygodnia na stałe?');
    else add('sat_hi', 'PRZYSZŁOŚĆ I ŚWIEŻOŚĆ', 'Co z naszych stałych przyzwyczajeń daje Ci najwięcej spokoju, a co warto odświeżyć w tym miesiącu, żebyśmy nie żyli samym grafikiem?');
    if (dos.posA.venus.element !== dos.posB.venus.element) add('ven', 'JĘZYK BLISKOŚCI', 'Jaki drobny, zwykły gest z mojej strony sprawia, że czujesz, iż naprawdę Cię pragnę i nie biorę naszej bliskości za oczywistość?');
    add('money', 'PIENIĄDZE I PLANY', 'Na co nie warto nam nigdy żałować wspólnych pieniędzy i czasu, nawet gdy w danym miesiącu pilnujemy wydatków?');
    add('proud', 'WSPARCIE NA ZEWNĄTRZ', 'Kiedy przy znajomych lub rodzinie czujesz ode mnie najwięcej lojalności, a kiedy masz wrażenie, że zostajesz z tym w pojedynkę?');
    return out;
  }

  const oneToOne = (typeof window !== 'undefined' && window.__SYN_ONE_TO_ONE_DATA__) || {};
  window.__SYN_EXPAND_LIFE_DATA__ = {
    buildMaturityLesson,
    buildOneToOneData: oneToOne.buildOneToOneData || (() => []),
    buildLifeDomains,
    buildFiveQuestions
  };
})();
