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
    const M = typeof window !== 'undefined' ? window.SynPlMorphology : null;
    const gA = M ? M.inferGender(d.nameA, d.genderA) : (d.genderA || 'f');
    const gB = M ? M.inferGender(d.nameB, d.genderB) : (d.genderB || 'm');
    const between = M ? M.betweenPair(d.nameA, gA, d.nameB, gB) : 'między Wami';
    const both = M ? M.pairBoth(gA, gB) : 'oboje';
    const { chemistry, security, friction } = d.syn;

    if (chemistry >= 80 && dos.karmaHits >= 2) {
      return {
        title: 'RZADKI REZONANS DROGI I SILNY MAGNETYZM',
        summary: `Spotkanie ${between} łączy rzadką zbieżność Węzła Północnego z bardzo mocnym przyciąganiem fizycznym, które od pierwszego dnia przestawia kierunek Waszych wyborów na długo. Tu nie ma obojętności.`
      };
    }
    if (chemistry >= 78 && friction >= 60) {
      return {
        title: 'ŻAR I WYRAŹNE GRANICE W JEDNYM UKŁADZIE',
        summary: `Wysoka temperatura pożądania ściera się tu z ostrym temperamentem w sporze, więc jedno spojrzenie potrafi rozgrzać wieczór albo wywołać iskrę w sekundę. Tutaj liczy się takt.`
      };
    }
    if (security >= 75 && dos.saturnFinal >= 70) {
      return {
        title: 'SPOKOJNA PRZYSTAŃ I SOJUSZ NA LATA',
        summary: `Zgodność emocjonalna idzie tu w parze z dojrzałą lojalnością Saturna, dzięki czemu budujecie bezpieczny dach nad głową bez ciągłego sprawdzania intencji. Czas gra z Wami.`
      };
    }
    return {
      title: 'SPOTKANIE DWÓCH TEMPERAMENTÓW (PRÓBA DOJRZAŁOŚCI)',
      summary: `Zestawienie ${between} łączy odmienne nawyki z wyraźną ciekawością siebie, więc różnice w stresie nie pozwalają na letnią wygodę i zmuszają do szczerości. Wygrywa tu bliskość.`
    };
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
