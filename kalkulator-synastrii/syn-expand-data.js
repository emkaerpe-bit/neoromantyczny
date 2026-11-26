(function () {
  'use strict';

  const EL_GEN = { Ogień: 'Ognia', Ziemia: 'Ziemi', Powietrze: 'Powietrza', Woda: 'Wody' };
  const COMP_GEN = { sun: 'Słońca', moon: 'Księżyca', venus: 'Wenus', mars: 'Marsa', Słońce: 'Słońca', Księżyc: 'Księżyca', Wenus: 'Wenus', Mars: 'Marsa' };
  const COMP_INS = { sun: 'ze Słońcem', moon: 'z Księżycem', venus: 'z Wenus', mars: 'z Marsem', Słońce: 'ze Słońcem', Księżyc: 'z Księżycem', Wenus: 'z Wenus', Mars: 'z Marsem' };

  const OUTER_PAIRS = {
    'sun-uranus': { h: 'Przy sobie łatwiej odpuścić cudze oczekiwania i wybrać życie po swojemu.', c: 'Gwałtowne zmiany decyzji i ostry sprzeciw, gdy któreś z Was czuje presję.' },
    'moon-uranus': { h: 'Nieoczekiwana czułość i umiejętność rozładowania napięcia w domu jednym celnym żartem.', c: 'Nagła potrzeba dystansu i zamykanie się we własnych sprawach, gdy w domu robi się ciasno.' },
    'uranus-venus': { h: 'Żywa iskra od pierwszego spotkania — w tej relacji trudno o nudę i przewidywalność.', c: 'Silna potrzeba niezależności pojawia się wtedy, gdy druga strona czeka na stałą deklarację.' },
    'mars-uranus': { h: 'Mocny temperament w sypialni i odwaga działania od razu, bez długiego wahania.', c: 'Wybuch w sekundzie i równie gwałtowne urwanie rozmowy jednym trzaśnięciem drzwiami.' },
    'mercury-uranus': { h: 'Szybkie skojarzenia, wspólne pomysły i poczucie humoru ratujące gorszy dzień.', c: 'Niecierpliwe przerywanie w pół zdania i skakanie po tematach zamiast spokojnej rozmowy.' },
    'neptune-sun': { h: 'Wspólna wrażliwość, wyczucie nastroju i gotowość do wybaczenia w gorszym czasie.', c: 'Niedopowiedzenia i brak jasnych ustaleń — łatwo tu uwierzyć w obrazek zamiast twardych faktów.' },
    'moon-neptune': { h: 'Ciche wyczuwanie nastroju drugiej osoby jeszcze zanim zamknie za sobą drzwi.', c: 'Zacieranie granic i ciche żale o to, że druga strona nie domyśliła się wszystkiego sama.' },
    'neptune-venus': { h: 'Miękki urok wspólnych wieczorów, muzyki i czułości oderwanej od pośpiechu dnia.', c: 'Łatwo tu zakochać się we własnym wyobrażeniu i rozczarować przy zwykłych porankach.' },
    'mars-neptune': { h: 'Uważny dotyk i zmysłowość bez pośpiechu, w której liczy się nastrój chwili.', c: 'Uniki, bierny opór albo wymijające odpowiedzi zamiast prostego „tak” lub „nie”.' },
    'mercury-neptune': { h: 'Rozmowy o muzyce, snach i półsłówkach, które rozumiecie bez tłumaczenia.', c: 'Gubienie ustaleń i domysły w ciszy — ważne daty i obietnice lepiej potwierdzać na głos.' }
  };

  const PLANET_HOUSE = {
    sun: {
      1: 'Słońce w 1. Domu wzmacnia pierwsze wrażenie — przy tej osobie łatwiej o wyprostowaną postawę i pewność siebie.',
      4: 'Słońce w 4. Domu ociepla codzienność w mieszkaniu; przy tej osobie szybciej odpuszcza się napięcie po pracy.',
      5: 'Słońce w 5. Domu rozbudza flirt, wspólną zabawę i chęć pokazywania się razem.',
      7: 'Słońce w 7. Domu przyciąga partnerską uwagę — w tym kontakcie naturalnie szuka się bliskości i równego głosu.',
      8: 'Słońce w 8. Domu wchodzi w strefę intymności, zaufania i wspólnych pieniędzy — tu mało co zostaje powierzchowne.',
      10: 'Słońce w 10. Domu wzmacnia wspólne ambicje — nawzajem dodajecie sobie odwagi i wspieracie swoją pozycję zawodową.',
      12: 'Słońce w 12. Domu działa dyskretnie — budzi silne przeczucia, ale sprzyja przemilczaniu własnych pretensji.'
    },
    moon: {
      1: 'Księżyc w 1. Domu daje szybkie wyczucie nastroju drugiej osoby już przy porannej kawie.',
      4: 'Księżyc w 4. Domu daje poczucie bezpiecznego domu — obecność tej osoby wycisza codzienne napięcie.',
      5: 'Księżyc w 5. Domu łączy czułość z lekkością i dotykiem; łatwo tu o bliskość bez nadęcia.',
      7: 'Księżyc w 7. Domu uzależnia nastrój dnia od relacji — rośnie potrzeba bliskości i wspólnych decyzji.',
      8: 'Księżyc w 8. Domu odsłania najgłębsze pragnienia i lęki w sypialni — tu trudno udawać obojętność.',
      10: 'Księżyc w 10. Domu sprawia, że wsparcie z domu bezpośrednio przekłada się na spokój w sprawach zawodowych.',
      12: 'Księżyc w 12. Domu wyczuwa cudze zmęczenie przez ścianę — warto pilnować granic, by nie przejmować całego stresu.'
    },
    venus: {
      1: 'Wenus w 1. Domu daje wyraźny urok i lekkość — sam sposób bycia tej osoby przyciąga wzrok.',
      4: 'Wenus w 4. Domu wnosi przyjemny porządek do mieszkania: dobre światło, wspólny stół i chęć dbania o dom.',
      5: 'Wenus w 5. Domu podtrzymuje romans i zmysłową ciekawość — nawet po latach łatwiej wracać do randek.',
      7: 'Wenus w 7. Domu łagodzi codzienne spory i daje przyjemność ze zwykłego bycia razem.',
      8: 'Wenus w 8. Domu łączy silne pożądanie z pragnieniem wyłączności i pełnego zaufania w sypialni.',
      10: 'Wenus w 10. Domu wnosi takt do spraw publicznych i wzmacnia to, jak jesteście odbierani przez otoczenie.',
      12: 'Wenus w 12. Domu budzi cichą, prywatną czułość za zamkniętymi drzwiami — przywiązanie silniejsze niż deklaracje.'
    },
    mars: {
      1: 'Mars w 1. Domu natychmiast podnosi temperaturę: obecność tej osoby budzi zarówno pożądanie, jak i chęć rywalizacji.',
      4: 'Mars w 4. Domu daje dużo energii w domu — świetny do wspólnego działania, ostry przy domowej kłótni.',
      5: 'Mars w 5. Domu przynosi odważną namiętność i śmiałą inicjatywę w sypialni bez czekania na zachętę.',
      7: 'Mars w 7. Domu wywołuje otwarte spory, które szybciej oczyszczają atmosferę niż chowanie żalu po kątach.',
      8: 'Mars w 8. Domu niesie wysokie napięcie erotyczne oraz tarcia wokół wspólnych pieniędzy, zazdrości i granic.',
      10: 'Mars w 10. Domu napędza wspólne cele i ambicje, o ile nie walczycie o to, czyje zdanie będzie ostatnie.',
      12: 'Mars w 12. Domu potrafi wracać jako cicha irytacja — lepiej mówić o pretensjach od razu, zanim zastygną w chłód.'
    },
    lilith: {
      1: 'Lilith w 1. Domu przyciąga surową pewnością siebie i niechęcią do grzecznych masek.',
      4: 'Lilith w 4. Domu porusza dawne nawyki wyniesione z domu i uczy szczerości za zamkniętymi drzwiami.',
      5: 'Lilith w 5. Domu rozbudza śmiały flirt i potrzebę namiętności bez grzecznych zasad.',
      7: 'Lilith w 7. Domu sprawdza, ile prawdziwej swobody mieści się w Waszym związku.',
      8: 'Lilith w 8. Domu otwiera strefę tabu, zazdrości i bezkompromisowej intensywności w łóżku.',
      10: 'Lilith w 10. Domu prowokuje komentarze z zewnątrz i każe Wam bronić własnych wyborów.',
      12: 'Lilith w 12. Domu budzi ukryte pragnienia, które w dzień rzadko padają przy kuchennym stole.'
    }
  };
  const FALLBACK_VERB = {
    sun: 'wyraźnie ożywia',
    moon: 'otwiera emocjonalnie i pogłębia',
    venus: 'ociepla i wnosi więcej czułości w',
    mars: 'mocno nakręca, ale czasem zaostrza',
    lilith: 'odziera z masek i wystawia na próbę'
  };
  const FALLBACK_SPHERE = {
    2: 'poczucie własnej wartości, dotyk oraz codzienne decyzje o wspólnych pieniądzach.',
    3: 'rozmowy na co dzień, częste wiadomości i zwykłe spieranie się o drobiazgi.',
    6: 'codzienną troskę, podział obowiązków w domu oraz dbanie o zdrowie.',
    9: 'wspólne plany wyjazdów, naukę i odwagę wychodzenia poza stare przyzwyczajenia.',
    11: 'przyjaźń, wspólne towarzystwo oraz rozmowy o planach na kolejne lata.'
  };
  const P_NAMES = { sun: 'Słońce', moon: 'Księżyc', venus: 'Wenus', mars: 'Mars', lilith: 'Lilith' };
  const COMP_SATURN = {
    Ogień: 'Saturn w żywiole Ognia sprawdza cierpliwość: trwałość rośnie wtedy, gdy duma ustępuje miejsca wzajemnemu szacunkowi.',
    Ziemia: 'Saturn w żywiole Ziemi daje twardy grunt — wspólne zobowiązania, dom i finanse krzepną z każdym rokiem.',
    Powietrze: 'Saturn w żywiole Powietrza trzyma więź przez jasne ustalenia i rozmowę; chłód wchodzi przy unikaniu konkretów.',
    Woda: 'Saturn w żywiole Wody sprawdza dojrzałość uczuć: zamiast sprawdzać się milczeniem, mówcie o obawach wprost.'
  };
  const DISARM = {
    Ogień: ['„Widzę, że bardzo Cię to rusza. Powiedz mi wprost, o co chodzi, tylko spokojniej.”', '„Nie uciekam od tej rozmowy, jestem tutaj. Powiedz bez pośpiechu, czego teraz potrzebujesz.”', '„Zróbmy pięć minut przerwy, napijmy się wody i wróćmy do tego bez podnoszenia głosu.”'],
    Ziemia: ['„Nie musisz odpowiadać w tej sekundzie. Odpocznijmy chwilę i wrócimy do tego za pół godziny.”', '„Rozumiem, gdzie jest Twoja granica. Ustalmy jedną rzecz, którą załatwimy dzisiaj od razu.”', '„Możesz na mnie liczyć na co dzień, nawet jeśli w tej jednej sprawie nie zgadzamy się od razu.”'],
    Powietrze: ['„Zatrzymajmy na chwilę tę kłótnię i przejdźmy się dziesięć minut, żeby nie kręcić się w kółko.”', '„Nie chcę szukać winnego ani Cię rozliczać — po prostu chcę usłyszeć, jak Ty to widzisz.”', '„Powiedzmy sobie po jednym najważniejszym zdaniu bez przerywania.”'],
    Woda: ['„Nigdzie nie idę, nawet gdy jest trudno. Powiedz spokojnie, co Cię w tym zabolało.”', '„Nie chcę zbywać tego samymi argumentami. Chodź na chwilę, usiądźmy blisko.”', '„Wiem, jak bardzo jest to dla Ciebie czuły punkt — nie chcę obracać tego przeciwko Tobie.”']
  };
  const TRIGGERS = {
    Ogień: ['Przerywanie w pół zdania z ironicznym uśmieszkiem.', 'Ciche dni jako kara i zamykanie drzwi bez wyjaśnienia.', 'Podważanie decyzji przy znajomych.'],
    Ziemia: ['Popędzanie w nerwach i stawianie ultimatum w środku nocy.', 'Niedotrzymywanie drobnych obietnic oraz lekceważenie budżetu.', 'Wyśmiewanie potrzeby spokoju.'],
    Powietrze: ['Ciężki patos i przesłuchania o każdą wiadomość w telefonie.', 'Sarkastyczne poprawianie słów zamiast słuchania uczuć.', 'Sztywna kontrola czasu i znajomych.'],
    Woda: ['Podnoszenie głosu i zimny cynizm w chwili słabości.', 'Straszenie rozstaniem w zwykłej sprzeczce.', 'Kpina z przeczuć i obaw drugiej strony.']
  };
  const RITUALS = [
    'Spontaniczny wyjazd bez wielkiego planu albo kolacja w nowym miejscu przed powrotem do mieszkania.',
    'Wieczór bez pośpiechu: telefony w drugim pokoju, ciepłe światło, dobre wino i dotyk bez zegarka.',
    'Długa nocna rozmowa w spokojnej kawiarni o sprawach, na które w tygodniu zawsze brakuje czasu.',
    'Domowy wieczór przy zasłoniętych oknach: wspólne gotowanie, ulubiona muzyka i spokój z dala od hałasu.',
    'Wyjście bez okazji w eleganckim stroju — szczery komplement i pełna uwaga przez cały wieczór.',
    'Przejęcie jednego uciążliwego obowiązku drugiej osoby w tygodniu i spokojny poranek we dwoje.',
    'Wyjście z klasą: półmrok kawiarni, teatr albo jazz i rozmowa bez sprawdzania telefonu.',
    'Bliskość bez cenzury i pośpiechu — jedna szczera rozmowa przy zgaszonej lampie.',
    'Weekendowy wyjazd do innego miasta bez sztywnej listy zwiedzania i spacer nowymi ulicami.',
    'Spokojny wieczór bez rozpraszaczy i rozmowa o jednym wspólnym celu na najbliższy rok.',
    'Niespodziewana zmiana planów w środku tygodnia bez wcześniejszej zapowiedzi.',
    'Wieczór przy muzyce z płyty bez ekranów — zwykła obecność ważniejsza niż długie rozmowy.'
  ];

  function getCrisisScripts(moonEl, marsEl, name, gender) {
    const word = gender === 'f' ? 'zraniona' : 'zraniony';
    const mEl = EL_GEN[moonEl] || moonEl;
    const rEl = EL_GEN[marsEl] || marsEl;
    return {
      loop: `Gdy ${name} czuje się ${word} pod presją, napięcie Księżyca (żywioł ${mEl}) od razu uruchamia obronną reakcję Marsa (żywioł ${rEl}) zamiast zwykłej prośby o bliskość.`,
      disarm: DISARM[moonEl] || DISARM.Ziemia,
      triggers: TRIGGERS[marsEl] || TRIGGERS.Powietrze
    };
  }
  function getSaturnMilestones(score, satA, satB, karmaHits) {
    const kTxt = karmaHits === 0 ? 'bez ścisłych aktywacji Węzła' : (karmaHits === 1 ? 'z 1 ścisłą aktywacją Węzła' : `z ${karmaHits} ścisłymi aktywacjami Węzła`);
    const satTxt = satA === satB ? `Saturn obojga w tym samym znaku (${satA})` : `zestawienie Saturna (${satA} i ${satB})`;
    return [
      score >= 65 ? 'Rok 1 (po pierwszych emocjach): płynne przejście do codziennego rytmu bez utraty wzajemnego szacunku.' : 'Rok 1 (po pierwszych emocjach): wyraźna różnica tempa — najlepiej od razu nazwać oczekiwania na głos zamiast zgadywać.',
      `Rok 3 (próba codzienności): ${satTxt} sprawdza podział obowiązków, pieniędzy i granic domu.`,
      `Rok 7 (dojrzały układ): wskaźnik trwałości (${score}%, ${kTxt}) sprawdza umiejętność dbania o pragnienie ponad rutyną.`
    ];
  }
  function getTransitNote(w) {
    const h = w.tone === 'harmony' || w.tone === 'intense';
    const target = w.aspect === 'Koniunkcja' ? (COMP_INS[w.cKey] || COMP_INS[w.cLabel] || `z ${w.cLabel}`) : `do ${COMP_GEN[w.cKey] || COMP_GEN[w.cLabel] || w.cLabel}`;
    const map = { jupiter: h ? 'lżejszy czas i więcej swobody w podejmowaniu wspólnych planów' : 'pokusa przesady i składania obietnic na wyrost', saturn: h ? 'utrwalenie więzi i dojrzałe decyzje na lata' : 'próba granic wymagająca uczciwej rozmowy', uranus: h ? 'świeży impuls przełamujący rutynę' : 'napięcie wokół swobody — warto poluzować sztywny grafik', pluto: h ? 'pogłębienie zaufania bez uników' : 'test zazdrości — nie warto wchodzić w próby sił' };
    return `${w.tLabel} (${w.aspect} ${w.sym} ${target} kompozytu) — ${map[w.tKey] || 'ważna zmiana rytmu'}.`;
  }
  function getCoupleRitual(venIdx, moonEl) {
    const anchor = moonEl === 'Woda' ? 'ciepło i poczucie wyłączności' : moonEl === 'Ziemia' ? 'spokój i uważny dotyk' : moonEl === 'Powietrze' ? 'swobodna rozmowa' : 'śmiała inicjatywa';
    return `${RITUALS[venIdx % 12]} (Przy Księżycu w żywiole ${EL_GEN[moonEl] || moonEl} najbardziej regeneruje Was ${anchor}.)`;
  }
  function getPlanetHouseText(key, h) {
    if (PLANET_HOUSE[key] && PLANET_HOUSE[key][h]) return PLANET_HOUSE[key][h];
    if (FALLBACK_SPHERE[h] && FALLBACK_VERB[key]) return `${P_NAMES[key]} w ${h}. Domu ${FALLBACK_VERB[key]} ${FALLBACK_SPHERE[h]}`;
    return 'Wyraźnie porusza tę sferę życia w codziennym kontakcie między Wami.';
  }

  window.__SYN_EXPAND_DATA__ = { OUTER_PAIRS, COMP_SATURN, getCrisisScripts, getSaturnMilestones, getTransitNote, getCoupleRitual, getPlanetHouseText };
})();
