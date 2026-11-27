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
