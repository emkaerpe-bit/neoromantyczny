(function () {
  'use strict';

  const EL_GEN = { Ogień: 'Ognia', Ziemia: 'Ziemi', Powietrze: 'Powietrza', Woda: 'Wody' };
  const COMP_GEN = { sun: 'Słońca', moon: 'Księżyca', venus: 'Wenus', mars: 'Marsa', Słońce: 'Słońca', Księżyc: 'Księżyca', Wenus: 'Wenus', Mars: 'Marsa' };
  const COMP_INS = { sun: 'ze Słońcem', moon: 'z Księżycem', venus: 'z Wenus', mars: 'z Marsem', Słońce: 'ze Słońcem', Księżyc: 'z Księżycem', Wenus: 'z Wenus', Mars: 'z Marsem' };

  const OUTER_PAIRS = {
    'sun-uranus': { h: 'Przy sobie łatwiej odpuścić cudze oczekiwania i wybrać życie po swojemu.', c: 'Nagłe zwroty decyzji i ostry sprzeciw, gdy któreś z Was poczuje nacisk.' },
    'moon-uranus': { h: 'Nieoczekiwana czułość i rozładowanie napięcia w domu jednym celnym żartem.', c: 'Nagła potrzeba dystansu i zamykanie się we własnych sprawach, gdy robi się ciasno.' },
    'uranus-venus': { h: 'Żywa iskra od pierwszego spotkania — w tym układzie trudno o nudę i przewidywalność.', c: 'Potrzeba swobody pojawia się dokładnie wtedy, gdy druga strona czeka na stałą deklarację.' },
    'mars-uranus': { h: 'Mocny temperament w sypialni i odwaga działania od razu, bez długiego wahania.', c: 'Wybuch w sekundzie i równie nagłe urwanie rozmowy trzaśnięciem drzwi.' },
    'mercury-uranus': { h: 'Szybkie skojarzenia, wspólne pomysły i poczucie humoru ratujące gorszy dzień.', c: 'Niecierpliwe przerywanie w pół zdania i skakanie po tematach zamiast spokojnego słuchania.' },
    'neptune-sun': { h: 'Wspólna wrażliwość, wyczucie nastroju i gotowość do wybaczenia w gorszym czasie.', c: 'Niedopowiedzenia i brak jasnych ustaleń — łatwo tu uwierzyć w wyobrażenie zamiast faktów.' },
    'moon-neptune': { h: 'Ciche wyczuwanie nastroju partnera jeszcze zanim zamknie za sobą drzwi.', c: 'Zacieranie granic i ciche żale o to, że druga osoba nie domyśliła się wszystkiego sama.' },
    'neptune-venus': { h: 'Miękki urok wspólnych wieczorów, muzyki i czułości oderwanej od biegu dnia.', c: 'Łatwo tu zakochać się we własnym obrazku i rozczarować przy zwykłych porankach.' },
    'mars-neptune': { h: 'Uważny dotyk i zmysłowość bez gonitwy, w której liczy się nastrój chwili.', c: 'Uniki, bierny opór albo wymijające odpowiedzi zamiast prostego „tak” lub „nie”.' },
    'mercury-neptune': { h: 'Rozmowy o muzyce, snach i półsłówkach, które rozumiecie bez długiego tłumaczenia.', c: 'Gubienie ustaleń i domysły w ciszy — ważne daty oraz obietnice lepiej potwierdzać na głos.' }
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
