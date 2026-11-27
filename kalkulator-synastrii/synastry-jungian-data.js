(function () {
  const MOON_COMBOS = {
    'Ogień-Ogień': {
      title: 'Dwa Wysokie Temperamenty w Jednym Domu',
      desc: 'W dobrych dniach przyciągacie się z ogromnym entuzjazmem. W kłótni oba upory walczą jednak o pierwszeństwo, co szybko zamienia drobną różnicę zdań w głośny spór bez hamulców. Zgoda wraca dopiero wtedy, gdy któreś z Was odpuści dumę jako pierwsze.'
    },
    'Ogień-Ziemia': {
      title: 'Szybki Impuls i Spokojna Rachuba',
      desc: 'Jedna osoba chce decydować od razu, druga liczy koszty, terminy oraz ryzyko i właśnie z tej różnicy wynika tu większość zgrzytów. Wystarczy szacunek dla innego tempa.'
    },
    'Ogień-Powietrze': {
      title: 'Rozmowa, Która Nakręca Działanie',
      desc: 'Słowa i pomysły płyną tu lekko. Rzadko się przy sobie nudzicie, ale bez kilku stałych nawyków w tygodniu wysoki poziom bodźców szybko prowadzi do zmęczenia i rozproszenia. Krótka chwila ciszy wieczorem ratuje równowagę.'
    },
    'Ogień-Woda': {
      title: 'Krótki Wybuch i Długa Pamięć Serca',
      desc: 'Ogień wyrzuca złość i po kwadransie zapomina o sporze. Woda nosi szorstki ton głosu jeszcze przez kilka dni i zamyka zaufanie, zanim zdąży opaść kurz po kłótni. Silna chemia prosi tu o łagodniejszy język w nerwach.'
    },
    'Ziemia-Ziemia': {
      title: 'Pewny Grunt na Długie Lata',
      desc: 'Nikt nie grozi tu odejściem po gorszym wieczorze. Działacie konsekwentnie i szanujecie dane słowo, choć z czasem łatwo wpaść w samą logistykę bez zmysłowej spontaniczności. Warto pilnować randek ponad zwykłym grafikiem.'
    },
    'Ziemia-Powietrze': {
      title: 'Konkret Faktu i Swoboda Myśli',
      desc: 'Ziemia pyta o budżet i jasny plan, Powietrze analizuje dziesięć możliwości naraz. Jeśli nie oddzielicie rozmowy o uczuciach od ustaleń w kalendarzu, szybko zaczniecie mówić obok siebie. Proste podsumowanie kończy większość sporów.'
    },
    'Ziemia-Woda': {
      title: 'Oparcie, Które Uspokaja Nastrój',
      desc: 'To jedno z najcieplejszych połączeń bliskości. Stałość jednej osoby koi wahania nastroju drugiej, a miękka czułość ociepla zwykłą dyscyplinę domu i wspólnych spraw. Łatwo tu poczuć prawdziwy spokój.'
    },
    'Powietrze-Powietrze': {
      title: 'Wspólny Język i Poczucie Humoru',
      desc: 'Tematów nie brakuje Wam nawet po latach. Pułapka pojawia się wtedy, gdy celny żart albo długa dyskusja zaczynają zasłaniać zwykłą czułość i trudne emocje. Czasem trzeba odłożyć argumenty i po prostu usiąść blisko.'
    },
    'Powietrze-Woda': {
      title: 'Logika w Zderzeniu z Czułością',
      desc: 'Powietrze szuka rozwiązania w argumentach, Woda potrzebuje najpierw zwykłego przytulenia i wysłuchania bez wykładu. Gdy dopasujecie kolejność tych dwóch kroków, zniknie większość nieporozumień. Najpierw ciepło, potem analiza.'
    },
    'Woda-Woda': {
      title: 'Ciche Wyczucie Bez Długich Wyjaśnień',
      desc: 'Zmianę nastroju wyczuwacie u siebie jeszcze przed pierwszym pytaniem, co daje głęboką bliskość, dopóki pilnujecie granicy między własnym zmęczeniem a stresem partnera. Pomaga rozmowa na głos.'
    }
  };

  function getComboKey(elA, elB) {
    if (MOON_COMBOS[`${elA}-${elB}`]) return `${elA}-${elB}`;
    if (MOON_COMBOS[`${elB}-${elA}`]) return `${elB}-${elA}`;
    return 'Ziemia-Woda';
  }

  const _esc = (s) => String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const getSignEl = (nm) => ['Baran', 'Lew', 'Strzelec'].includes(nm) ? 'Ogień' :
    ['Byk', 'Panna', 'Koziorożec'].includes(nm) ? 'Ziemia' :
    ['Bliźnięta', 'Waga', 'Wodnik'].includes(nm) ? 'Powietrze' : 'Woda';

  window.__GENERATE_JUNGIAN_DIAGNOSIS__ = function (d) {
    const M = typeof window !== 'undefined' ? window.SynPlMorphology : null;
    const C = typeof window !== 'undefined' ? window.SynNlgComposer : null;
    const { moonA, moonB, sunA, sunB, venA, marB, syn } = d;
    const chem = syn.chemistry, sec = syn.security, fric = syn.friction;

    const gA = M ? M.inferGender(d.nameA, d.genderA) : (d.genderA || 'f');
    const gB = M ? M.inferGender(d.nameB, d.genderB) : (d.genderB || 'm');
    const both = M ? M.pairBoth(gA, gB) : 'oboje';
    const between = M ? M.betweenPair(d.nameA, gA, d.nameB, gB) : 'między Wami';
    const sA = (sunA && sunA.name) || 'Baran';
    const sB = (sunB && sunB.name) || 'Waga';
    const pairTag = `${sA} &times; ${sB}`;

    const elA = getSignEl(moonA.name), elB = getSignEl(moonB.name);
    const sunElA = getSignEl(sA), sunElB = getSignEl(sB);
    const dynamics = MOON_COMBOS[getComboKey(elA, elB)] || MOON_COMBOS['Ziemia-Woda'];

    const topAsp = syn.aspects && syn.aspects[0];
    let aspAnchor = `Układ żywiołów Waszych Słońc oraz Wenus w znaku ${M ? M.signGen((venA && venA.name) || sA) : sA} wyznacza ton tej relacji. `;
    if (topAsp && C) {
      const flow = C.resolveDirectionalAspect({ bA: topAsp.pA, bB: topAsp.pB }, d);
      aspAnchor = `Główny ton nadaje tu ścisły kontakt, w którym ${flow.canonicalFlow}. `;
    }

    let title = '';
    let hook = '';
    if (chem >= 74 && fric >= 56) {
      title = `Wysokie Napięcie i Magnetyzm: ${pairTag}`;
      hook = `${aspAnchor}Przyciąganie jest tu natychmiastowe, ale tarcie charakterów potrafi zapalić spór w kilka sekund, gdy ${both} jesteście zmęczeni. Iskry lecą szybko.`;
    } else if (chem >= 68 && sec >= 68 && fric < 56) {
      title = `Iskra i Spokój w Jednym Miejscu: ${pairTag}`;
      hook = `${aspAnchor}Wysoka chemia idzie tu w parze z naturalnym zaufaniem, więc przy sobie możecie być blisko i bezpiecznie bez udawania chłodu. To rzadka równowaga.`;
    } else if (sec >= 70 && fric <= 48) {
      title = `Spokojna Przystań Bez Gier: ${pairTag}`;
      hook = `${aspAnchor}Dominuje tu rzadkie poczucie ukojenia, przy którym z barków schodzi napięcie, choć trzeba czasem świadomie podkręcać randki ponad przyzwyczajenie. Spokój jest podstawą.`;
    } else if (sec >= 62 && fric > 48) {
      title = `Głęboka Więź w Ogniu Różnic: ${pairTag}`;
      hook = `${aspAnchor}Silne oparcie emocjonalne spaja ten związek, choć w stresie odpalacie zupełnie inne odruchy i łatwo zahaczyć o dumę. Rozmowa szybko czyści powietrze.`;
    } else if (chem >= 65 && sec < 62) {
      title = `Gorący Impuls i Test Zaufania: ${pairTag}`;
      hook = `${aspAnchor}Fizyczna uwaga zapala się tu szybciej niż gotowość do zaufania na co dzień, dlatego prawdziwa bliskość potrzebuje czasu, zanim ${both} odłożycie ostrożność. Magnetyzm wyprzedza spokój.`;
    } else if (fric >= 58) {
      title = `Zderzenie Silnych Charakterów: ${pairTag}`;
      hook = `${aspAnchor}Spotkały się tu dwie mocne wole o wyraźnej potrzebie własnego zdania, więc ten związek źle znosi niedomówienia i kwitnie przy jasnych zasadach. Liczy się konkret.`;
    } else if (sec - chem >= 10) {
      title = `Lojalne Przymierze Szukające Iskry: ${pairTag}`;
      hook = `${aspAnchor}Bezpieczeństwo wyraźnie wyprzedza tu spontaniczny ogień pierwszych randek, więc potraficie zbudować solidny dom, jeśli pamiętacie o dotyku ponad grafikiem. Stałość daje oparcie.`;
    } else if (chem - sec >= 10) {
      title = `Magnetyzm Kontra Ostrożność: ${pairTag}`;
      hook = `${aspAnchor}Zmysłowe przyciąganie działa tu mocniej niż gotowość do odsłonięcia własnych lęków, dlatego pod pozornym dystansem czyny ważą więcej niż deklaracje. Czas buduje zaufanie.`;
    } else if (sunElA === sunElB) {
      title = `Wspólny Kod Żywiołu ${M ? M.elemGen(sunElA) : sunElA}: ${pairTag}`;
      hook = `${aspAnchor}Wnosicie podobny temperament i szybko czytacie swoje motywacje, choć w gorszym tygodniu łatwo odbijać w sobie te same uparte nawyki. Podobieństwo bywa lustrem.`;
    } else if ((sunElA === 'Ogień' && sunElB === 'Powietrze') || (sunElA === 'Powietrze' && sunElB === 'Ogień') || (sunElA === 'Ziemia' && sunElB === 'Woda') || (sunElA === 'Woda' && sunElB === 'Ziemia')) {
      title = `Naturalne Dopełnienie Temperamentów: ${pairTag}`;
      hook = `${aspAnchor}Wasze temperamenty uzupełniają się od pierwszych rozmów — jedna strona wnosi inicjatywę z Marsa w znaku ${M ? M.signGen((marB && marB.name) || sB) : sB}, druga domyka szczegóły. Różnice pracują razem.`;
    } else {
      title = `Przyciąganie Odmiennych Światów: ${pairTag}`;
      hook = `${aspAnchor}Spotkanie żywiołów ${M ? M.elemGen(sunElA) : sunElA} i ${M ? M.elemGen(sunElB) : sunElB} wybija Was z utartych schematów tym, jak inaczej reagujecie na bliskość i ryzyko. Różnorodność budzi ciekawość.`;
    }

    return { title: _esc(title), hook, moonTitle: dynamics.title, moonDesc: dynamics.desc };
  };
})();
