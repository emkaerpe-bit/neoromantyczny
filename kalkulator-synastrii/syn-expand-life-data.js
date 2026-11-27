(function () {
  'use strict';

  function buildMaturityLesson(d, dos) {
    const M = typeof window !== 'undefined' ? window.SynPlMorphology : null;
    const gA = M ? M.inferGender(d.nameA, d.genderA) : (d.genderA || 'f');
    const gB = M ? M.inferGender(d.nameB, d.genderB) : (d.genderB || 'm');
    const between = M ? M.betweenPair(d.nameA, gA, d.nameB, gB) : 'między Wami';
    const both = M ? M.pairBoth(gA, gB) : 'oboje';
    const chem = d.syn.chemistry, sec = d.syn.security, fric = d.syn.friction;
    const comm = dos.commFinal, sat = dos.saturnFinal, obs = dos.obsessionFinal;
    const pair = [dos.posA.moon.element, dos.posB.moon.element].sort().join('+');
    const meta = `Chemia ${chem}% • Bezpieczeństwo ${sec}% • Tarcie ${fric}% • Księżyce: ${d.moonA.name} i ${d.moonB.name}`;

    if (chem >= 72 && fric >= 58) {
      return {
        title: 'Wysokie Napięcie i Sztuka Granic',
        body: `Przy tak mocnym przyciąganiu ta relacja rzadko bywa letnia. Ta sama różnica temperamentów, która budzi iskrę ${between}, w zmęczeniu potrafi wywołać ostry spór o drobiazg. Dojrzałość zaczyna się wtedy, gdy ${both} umawiacie się na krótką przerwę, zanim złość przejmie ster.`,
        meta
      };
    }
    if (sec >= 70 && sat >= 65) {
      return {
        title: 'Spokojny Grunt i Odwaga Świeżości',
        body: `Macie tu rzadki spokój. W zwykłych sprawach łatwo o zaufanie, ale z czasem przewidywalny rytm domu i obowiązków potrafi niepostrzeżenie wyprzeć randki z kalendarza. Zostawcie miejsce na dotyk.`,
        meta
      };
    }
    if (comm <= 48 || ((pair === 'Ogień+Woda' || pair === 'Powietrze+Woda') && fric >= 52)) {
      return {
        title: 'Dwa Inne Kody Reakcji',
        body: `Emocje płyną w różnym tempie. W stresie jedna osoba szuka konkretu albo natychmiastowej rozmowy, a druga potrzebuje chwili spokoju i ciepła przed otwarciem. Inne tempo to nie chłód.`,
        meta
      };
    }
    if (obs >= 75) {
      return {
        title: 'Głębia Zamiast Gier o Kontrolę',
        body: `Ta więź wciąga od razu. Łatwo tu wyczuć własne lęki i sprawdzać granice lojalności w milczeniu, zanim jeszcze padną najważniejsze pytania między Wami. Szczerość oszczędza tu nerwów.`,
        meta
      };
    }
    if (comm >= 72) {
      return {
        title: 'Porozumienie Słów i Obecność w Czynach',
        body: `Łapiecie wspólny język błyskawicznie. Zdarza się jednak, że błyskotliwa dyskusja zaczyna zasłaniać zwykłą czułość albo przyznanie się do zwykłego ludzkiego zmęczenia. Pomaga prosty dotyk.`,
        meta
      };
    }
    return {
      title: 'Lojalność i Szacunek do Innego Tempa',
      body: `To układ na długi dystans. Łączy momenty naturalnej bliskości z miejscami, w których musicie wypracować własne zasady bez poprawiania partnera na własny wzór. Liczy się małe słowo.`,
      meta
    };
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
