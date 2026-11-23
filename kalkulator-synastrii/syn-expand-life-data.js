(function () {
  'use strict';
  const EL_GEN = { Ogień: 'Ognia', Ziemia: 'Ziemi', Powietrze: 'Powietrza', Woda: 'Wody' };

  const MERC_12 = [
    'Mówi wprost i bez ogródek, podejmuje decyzje w kilka minut, a na długie uwagi krytyczne reaguje niecierpliwością.',
    'Rozmawia spokojnie i konkretnie, potrzebuje czasu do namysłu, a pod presją krytyki twardo obstaje przy swoim.',
    'Przeskakuje szybko między wątkami, decyduje błyskawicznie, a z napięcia najczęściej ucieka w żart lub ironię.',
    'Słucha przede wszystkim tonu głosu, woli ostrożne decyzje i łatwo zamyka się po szorstkiej uwadze.',
    'Wypowiada się pewnie i z rozmachem, decyduje odważnie, ale krytykę przy osobach trzecich odbiera jak ujmę.',
    'Wylicza konkretne fakty i poprawia nieścisłości; zanim zdecyduje, sprawdza szczegóły, a krytykę odbiera bardzo osobiście.',
    'Długo waży argumenty obu stron, unika ostrego tonu i z trudem podejmuje twarde decyzje w pośpiechu.',
    'Czyta między wierszami i drąży temat do skutku; nie decyduje pochopnie, a na fałsz reaguje chłodną rezerwą.',
    'Patrzy na duży obraz zamiast drobiazgów, mówi szczerze bez dyplomacji i szybko się nudzi drobnym sporem.',
    'Ceni krótki konkret i plan działania, decyduje chłodno po rozważeniu kosztów i nie lubi emocjonalnych uwag.',
    'Rozmawia lekko i nieszablonowo, nie znosi narzucania zdania, a przy osobistej krytyce od razu nabiera dystansu.',
    'Mówi obrazami i wyczuwa nastrój rozmówcy, zwleka z twardą decyzją i źle znosi oschły, bezwzględny ton.'
  ];
  const MARS_12 = [
    'Działa natychmiast bez długiego wstępu, przejmuje ster w kryzysie i szybko wybucha, ale równie szybko odpuszcza.',
    'Rozpędza się powoli, lecz dowozi rzeczy do końca; pod presją stawia twardy opór i długo trzyma urazę.',
    'Łapie kilka spraw naraz, wyładowuje złość w ostrej wymianie zdań i szybko potrzebuje zmiany tematu.',
    'Walczy w obronie bliskich, ale wprost rzadko atakuje — pod napięciem raczej wycofuje się lub wbija cichą szpilę.',
    'Inicjuje z rozmachem i lubi prowadzić, w kryzysie broni godności, a złość mija dopiero po szczerym uznaniu.',
    'Rozkłada problem na zadania i działa dokładnie; w nerwach krytykuje każdy drobiazg i rozładowuje stres przez porządek.',
    'Czeka z pierwszym krokiem na wspólną zgodę, unika otwartej awantury, ale pod naciskiem potrafi się nagle wycofać.',
    'Działa po cichu, za to z pełnym zaangażowaniem; w złości pamięta długo i nie zapomina naruszonych granic.',
    'Rzuca się w nowe plany z entuzjazmem, pod presją ucieka w ruch lub wyjazd i szybko zrzuca z siebie napięcie.',
    'Idzie naprzód cierpliwie i planowo, w trudnej sytuacji chłodzi emocje i złość przekłada na twardą pracę.',
    'Reaguje po swojemu i nie słucha nacisków; pod presją odcina emocje i zamyka spór z chłodnego dystansu.',
    'Kieruje się wyczuciem chwili zamiast planu, unika ostrego starcia i potrzebuje chwili spokoju po kłótni.'
  ];
  const VENUS_12 = [
    'Okazuje uczucia wprost i lubi szybkie zbliżenie, ale codzienna nuda i ciągła ostrożność szybko studzą zapał.',
    'Buduje bliskość powoli przez dotyk, wspólne jedzenie i stałość — pośpiech oraz niepewność odbierają smak chwil.',
    'Zakochuje się przez rozmowę, żart i błyskotliwe wiadomości; ciężka powaga bez lekkości szybko gasi chemię.',
    'Potrzebuje bezpiecznego progu i czułości z dala od obcych; chłód i żarty z uczuć zamykają otwartość od razu.',
    'Lubi wyraźne gesty, ciepło i wzajemny podziw; brak uwagi lub rutyna bez świętowania ranią najbardziej.',
    'Przekłada miłość na uważne drobiazgi i dotyk bez pośpiechu, a chaos i niesłowność odpychają najskuteczniej.',
    'Szuka taktu, ładnej oprawy wieczoru i równego dialogu — krzyk oraz brak delikatności gaszą pragnienie.',
    'Pragnie intensywnej wyłączności bez półprawd; letnie kompromisy i udawana uprzejmość nudzą od razu.',
    'Łączy miłość z ruchem, śmiechem i podróżami — zaborczość i pilnowanie każdej godziny wywołują chęć ucieczki.',
    'Okazuje uczucia przez wierność i czyny na lata, nie puste słowa; lekkomyślność szybko niszczy zaufanie.',
    'Potrzebuje w związku przyjaźni i osobnej przestrzeni; sztywne role i wymuszanie deklaracji od razu chłodzą więź.',
    'Karmi bliskość muzyką, nastrojem i łagodnością — szorstki pragmatyzm oraz brak delikatności ranią najmocniej.'
  ];

  function buildMaturityLesson(d, dos) {
    const chem = d.syn.chemistry, sec = d.syn.security, fric = d.syn.friction;
    const comm = dos.commFinal, sat = dos.saturnFinal, obs = dos.obsessionFinal;
    const pair = [dos.posA.moon.element, dos.posB.moon.element].sort().join('+');
    const meta = `Chemia ${chem}% • Bezpieczeństwo ${sec}% • Tarcie ${fric}% • Księżyce: ${d.moonA.name} i ${d.moonB.name}`;
    if (chem >= 72 && fric >= 58) return { title: 'Wysokie Napięcie i Sztuka Granic', body: `Przy tak mocnym przyciąganiu (${chem}%) i tarciu (${fric}%) ta relacja rzadko bywa letnia. Ta sama różnica charakterów, która budzi chemię między ${d.nameA} a ${d.nameB}, w chwilach zmęczenia potrafi wywołać ostry spór. Dojrzałość zaczyna się wtedy, gdy przestajecie walczyć o ostatnie słowo i umawiacie się na uczciwą przerwę, zanim emocje przejmą ster.`, meta };
    if (sec >= 70 && sat >= 65) return { title: 'Spokojny Grunt i Odwaga Świeżości', body: `Silne bezpieczeństwo (${sec}%) i stabilność Saturna (${sat}%) dają Wam rzadki komfort zaufania w codziennych sprawach. Jedyną pułapką takiego układu staje się z czasem zbyt przewidywalny rytm domu i obowiązków. Prawdziwa dojrzałość polega tu na świadomym pilnowaniu, żeby obok wspólnych spraw zostało miejsce na randkę, dotyk i ciekawość siebie.`, meta };
    if (comm <= 48 || ((pair === 'Ogień+Woda' || pair === 'Powietrze+Woda') && fric >= 52)) return { title: 'Dwa Inne Kody Reakcji', body: `Wasze emocje poruszają się w innym tempie (Księżyce: ${d.moonA.name} i ${d.moonB.name}, komunikacja ${comm}%). Kiedy pojawia się stres, jedno z Was może szukać natychmiastowego konkretu lub rozmowy, a drugie potrzebuje chwili spokoju i ciepła, zanim się otworzy. Zrozumienie tej różnicy oszczędza obojgu poczucia odrzucenia tam, gdzie chodzi po prostu o inne tempo.`, meta };
    if (obs >= 75) return { title: 'Głębia Zamiast Gier o Kontrolę', body: `Wysoki wskaźnik intensywności (${obs}%) pokazuje więź, obok której trudno przejść obojętnie. Łatwo tu wyczuć własne lęki i sprawdzać granice lojalności, zanim jeszcze padną trudne słowa. Najwięcej spokoju daje Wam tutaj prosta szczerość bez niedomówień i rezygnacja z cichego sprawdzania intencji.`, meta };
    if (comm >= 72) return { title: 'Porozumienie Słów i Obecność w Czynach', body: `Wysoka zgodność rozmów (${comm}%) ułatwia Wam dogadanie się przy codziennych sprawach i wspólnych planach. Zdarza się jednak, że błyskotliwa dyskusja zastępuje zwykłą czułość albo przyznanie się do własnego zmęczenia. Równowaga przychodzi wtedy, gdy po dobrej rozmowie pojawiają się też proste gesty bliskości na co dzień.`, meta };
    return { title: 'Codzienna Lojalność i Równe Tempo', body: `Ten układ stawia przed Wami zadanie na dłuższy dystans: łączy momenty bliskości z miejscami, w których musicie wypracować własne zasady (zgodność ogólna ${dos.totalIndex}%). Najbardziej służy Wam rezygnacja z poprawiania drugiej osoby na własną modłę i trzymanie się małych, dotrzymywanych na co dzień obietnic.`, meta };
  }

  function pairBridge(dos, key, label, sameEl, mixEl) {
    const pA = dos.posA[key], pB = dos.posB[key];
    const asp = (dos.fullAspects || []).find((a) => a.bA.key === key && a.bB.key === key);
    const hit = asp ? ` Dodatkowo działa między Wami ścisły aspekt: ${asp.name} (${asp.orbStr}).` : '';
    if (pA.element === pB.element) return `${sameEl} (${label} w żywiole ${EL_GEN[pA.element]}).${hit}`;
    return `${mixEl} (${EL_GEN[pA.element]} i ${EL_GEN[pB.element]}).${hit}`;
  }

  function buildOneToOneData(d, dos) {
    return [
      { glyph: '☿', title: 'STYL ROZMOWY I DECYZJI (MERKURY × MERKURY)', signA: dos.posA.mercury.name, signB: dos.posB.mercury.name, textA: MERC_12[dos.posA.mercury.idx], textB: MERC_12[dos.posB.mercury.idx], bridge: pairBridge(dos, 'mercury', 'Merkury', 'Podobne tempo myślenia i wymiany zdań', 'Inne tempo analizy i podejmowania decyzji') },
      { glyph: '♂', title: 'STYL DZIAŁANIA I INICJATYWY (MARS × MARS)', signA: dos.posA.mars.name, signB: dos.posB.mars.name, textA: MARS_12[dos.posA.mars.idx], textB: MARS_12[dos.posB.mars.idx], bridge: pairBridge(dos, 'mars', 'Mars', 'Zbliżony temperament w działaniu i w sporze', 'Odmienny rytm inicjatywy i rozładowywania złości') },
      { glyph: '♀', title: 'STYL BLISKOŚCI I SYPIALNI (WENUS × WENUS)', signA: dos.posA.venus.name, signB: dos.posB.venus.name, textA: VENUS_12[dos.posA.venus.idx], textB: VENUS_12[dos.posB.venus.idx], bridge: pairBridge(dos, 'venus', 'Wenus', 'Naturalnie zbieżny język czułości i gustu', 'Różne oczekiwania wobec tempa bliskości i gestów') }
    ];
  }

  function buildLifeDomains(d, dos, houseHits) {
    const has = (h) => Boolean(houseHits && houseHits.has(h));
    const vA = dos.posA.venus.element, vB = dos.posB.venus.element, sat = dos.saturnFinal;
    const isImp = (e) => e === 'Ogień' || e === 'Powietrze';
    let money = `${d.nameA} (${d.venA.name}) i ${d.nameB} (${d.venB.name}) patrzą na komfort przez inny pryzmat (${sat}% trwałości). Prosty podział na wspólne rachunki oraz własną pulę bez tłumaczenia drobnych wydatków chroni przed cichymi wyrzutami.`;
    if ((vA === 'Ziemia' && isImp(vB)) || (vB === 'Ziemia' && isImp(vA))) {
      const earthN = vA === 'Ziemia' ? d.nameA : d.nameB, impN = vA === 'Ziemia' ? d.nameB : d.nameA;
      money = `${earthN} pilnuje rezerw i patrzy na trwałość zakupu, podczas gdy ${impN} chętniej wydaje pod wpływem chwili i na wspólne wrażenia. W budżecie najlepiej sprawdza się stały limit, powyżej którego decyzję podejmujecie razem.`;
    } else if (!isImp(vA) && !isImp(vB)) {
      money = `Oboje cenicie finansowy spokój (${EL_GEN[vA]} i ${EL_GEN[vB]} przy trwałości ${sat}%), więc rzadko grożą Wam nieprzemyślane zakupy. Uważajcie jedynie, by ostrożność nie odbierała przyjemności ze wspólnych wyjazdów.`;
    } else if (isImp(vA) && isImp(vB)) {
      money = `Oboje lubicie wydawać na wrażenia, wyjścia i nagłe pomysły (${EL_GEN[vA]} i ${EL_GEN[vB]}). Przy takim duecie warto automatycznie odkładać stałą kwotę na początku miesiąca, zanim ruszą bieżące plany.`;
    }
    if (has(2)) money += ' Nakładka 2. Domu sprawia, że finanse i prezenty mocno dotykają tu poczucia bezpieczeństwa.';

    const mA = dos.posA.moon.element, mB = dos.posB.moon.element;
    const quiet = (e) => e === 'Ziemia' || e === 'Woda';
    let home = '';
    if (quiet(mA) && quiet(mB)) home = 'Oboje odpoczywacie najlepiej za zamkniętymi drzwiami, bez nadmiaru bodźców i niespodziewanych gości. Wasz dom szybko staje się spokojnym miejscem, o ile pamiętacie o wspólnych wyjściach.';
    else if (!quiet(mA) && !quiet(mB)) home = 'Oboje lubicie ruch, rozmowy do późna i otwarte drzwi dla znajomych. Żeby mieszkanie nie zamieniło się w poczekalnię bez wytchnienia, dobrze mieć choć jeden spokojny wieczór w tygodniu tylko we dwoje.';
    else home = `${quiet(mA) ? d.nameA : d.nameB} regeneruje się w ciszy i stałym rytmie domu, natomiast ${quiet(mA) ? d.nameB : d.nameA} szuka po pracy rozmowy lub zmiany otoczenia. Sprawdza się godzina spokoju na start przed wspólnym wyjściem.`;
    if (has(4) || has(6)) home += ' Aktywny 4. lub 6. Dom przekłada codzienny porządek wprost na klimat relacji.';

    const rA = dos.posA.mars.element, rB = dos.posB.mars.element;
    let work = `${d.nameA} (${d.marA.name}) i ${d.nameB} (${d.marB.name}) inaczej rozkładają tempo pracy (komunikacja ${dos.commFinal}%). Najmniej spięć daje jasny podział na starcie: kto zaczyna i wybiera kierunek, a kto domyka szczegóły.`;
    if (rA === rB) work = `Oboje macie podobny styl działania (Mars w żywiole ${EL_GEN[rA]}), więc w remoncie czy podróży ruszacie w jednym rytmie — uważajcie jedynie w sporze, by oba upory nie walczyły naraz o ster.`;
    else if ((rA === 'Ogień' && rB === 'Ziemia') || (rB === 'Ogień' && rA === 'Ziemia')) work = `${rA === 'Ogień' ? d.nameA : d.nameB} nadaje rozpęd i odważne decyzje, a ${rA === 'Ziemia' ? d.nameA : d.nameB} pilnuje kosztów i terminów. To bardzo skuteczny tandem, jeśli nie mylicie rozwagi z brakiem zapału.`;
    if (has(10)) work += ' Nakładka 10. Domu sprzyja wspólnym projektom i wzajemnemu wsparciu w sprawach zawodowych.';

    return [
      { title: 'Budżet i styl wydawania', tag: 'WENUS • SATURN' + (has(2) ? ' • 2. DOM' : ''), body: money },
      { title: 'Rytm mieszkania i odpoczynku', tag: 'KSIĘŻYCE' + (has(4) || has(6) ? ' • 4./6. DOM' : ''), body: home },
      { title: 'Wspólne działanie i projekty', tag: 'MARS • MERKURY' + (has(10) ? ' • 10. DOM' : ''), body: work }
    ];
  }

  function buildFiveQuestions(d, dos) {
    const out = [], seen = new Set(), add = (id, tag, q) => { if (!seen.has(id) && out.length < 5) { seen.add(id); out.push({ tag, q }); } };
    const moonTense = (dos.fullAspects || []).some((a) => a.bA.key === 'moon' && a.bB.key === 'moon' && (a.tone === 'friction' || a.tone === 'polar'));
    if (moonTense || d.syn.security < 58) add('moon', 'RYTM EMOCJI I DOMU', 'Po ciężkim dniu czego bardziej potrzebujesz ode mnie na progu — 20 minut ciszy dla siebie, przytulenia bez rad czy krótkiej rozmowy od razu?');
    if (dos.obsessionFinal >= 68 || (dos.tabooAspects && dos.tabooAspects.length > 0)) add('taboo', 'ZAUFANIE I GRANICE', 'Jakie jedno moje zachowanie albo niedopowiedzenie najszybciej uruchamia u Ciebie nieufność lub zazdrość — i co wtedy najlepiej je gasi?');
    if (d.syn.friction >= 55) add('fric', 'BEZPIECZNIK W KŁÓTNI', 'Jakie jedno umówione hasło albo gest ma dla nas znaczyć „zatrzymujemy rozmowę na 15 minut”, zanim złość zaprowadzi nas za daleko?');
    if (dos.commFinal <= 55 || dos.posA.mercury.element !== dos.posB.mercury.element) add('comm', 'STYL ROZMOWY', 'Kiedy opowiadasz o jakimś kłopocie, skąd mam wiedzieć, czy chcesz tylko wysłuchania, czy wspólnego szukania gotowego rozwiązania?');
    if (dos.saturnFinal < 60) add('sat_low', 'SŁOWO I OBOWIĄZKI', 'W jakiej jednej codziennej sprawie masz poczucie, że nosisz więcej niż połowę ciężaru — i co mogę przejąć od tego tygodnia na stałe?');
    else add('sat_hi', 'PRZYSZŁOŚĆ I ŚWIEŻOŚĆ', 'Co z naszych stałych przyzwyczajeń daje Ci najwięcej spokoju, a co warto odświeżyć w tym miesiącu, żebyśmy nie żyli samym grafikiem?');
    if (dos.posA.venus.element !== dos.posB.venus.element) add('ven', 'JĘZYK BLISKOŚCI', 'Jaki drobny, zwykły gest z mojej strony sprawia, że czujesz, iż naprawdę Cię pragnę i nie biorę naszej bliskości za oczywistość?');
    add('money', 'PIENIĄDZE I PLANY', 'Na co nie warto nam nigdy żałować wspólnych pieniędzy i czasu, nawet gdy w danym miesiącu pilnujemy wydatków?');
    add('proud', 'WSPARCIE NA ZEWNĄTRZ', 'Kiedy przy znajomych lub rodzinie czujesz ode mnie najwięcej lojalności, a kiedy masz wrażenie, że zostajesz z tym w pojedynkę?');
    return out;
  }

  window.__SYN_EXPAND_LIFE_DATA__ = { buildMaturityLesson, buildOneToOneData, buildLifeDomains, buildFiveQuestions };
})();
