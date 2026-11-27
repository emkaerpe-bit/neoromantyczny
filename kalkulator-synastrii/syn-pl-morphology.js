(function () {
  'use strict';
  const MALE_A = new Set(['kuba', 'barnaba', 'kosma', 'bonawentura', 'jarema', 'zawisza']);
  const FEM_EX = new Set(['inez', 'noemi', 'carmen', 'miriam', 'beatrycze', 'nel', 'ruth', 'karen', 'ester']);
  const INDECL = new Set(['inez', 'noemi', 'carmen', 'miriam', 'beatrycze', 'nel', 'ruth', 'karen', 'ester', 'alex', 'max', 'nicole', 'chloe', 'lili', 'gabi', 'pati']);
  const SOFT_IA = new Set(['ania', 'hania', 'mania', 'frania', 'dania', 'sonia', 'monia', 'bunia', 'tosia', 'zosia', 'basia', 'kasia', 'krysia', 'zuzia', 'gosia', 'asia', 'rysia', 'kocia']);
  const MALE_MAP = {
    maciek: ['Maćk', 'Maćku'], marek: ['Mark', 'Marku'], tomek: ['Tomk', 'Tomku'], bartek: ['Bartk', 'Bartku'],
    wojtek: ['Wojtk', 'Wojtku'], przemek: ['Przemk', 'Przemku'], jacek: ['Jack', 'Jacku'], franek: ['Frank', 'Franku'],
    janek: ['Jank', 'Janku'], czarek: ['Czark', 'Czarku'], darek: ['Dark', 'Darku'], leszek: ['Leszk', 'Leszku'],
    paweł: ['Pawł', 'Pawle'], gaweł: ['Gawł', 'Gawle'], piotr: ['Piotr', 'Piotrze'], kacper: ['Kacpr', 'Kacprze'],
    aleksander: ['Aleksandr', 'Aleksandrze'], michał: ['Michał', 'Michale'], rafał: ['Rafał', 'Rafale'],
    kamil: ['Kamil', 'Kamilu'], karol: ['Karol', 'Karolu'], igor: ['Igor', 'Igorze'], wiktor: ['Wiktor', 'Wiktorze'],
    artur: ['Artur', 'Arturze'], filip: ['Filip', 'Filipie'], jakub: ['Jakub', 'Jakubie'], adam: ['Adam', 'Adamie'],
    dawid: ['Dawid', 'Dawidzie'], marcin: ['Marcin', 'Marcinie'], sebastian: ['Sebastian', 'Sebastianie'],
    damian: ['Damian', 'Damianie'], adrian: ['Adrian', 'Adrianie'], szymon: ['Szymon', 'Szymonie'],
    jan: ['Jan', 'Janie'], krzysztof: ['Krzysztof', 'Krzysztofie']
  };
  const SIGN_GEN = {
    Baran: 'Barana', Byk: 'Byka', 'Bliźnięta': 'Bliźniąt', Rak: 'Raka', Lew: 'Lwa', Panna: 'Panny',
    Waga: 'Wagi', Skorpion: 'Skorpiona', Strzelec: 'Strzelca', 'Koziorożec': 'Koziorożca', Wodnik: 'Wodnika', Ryby: 'Ryb'
  };
  const EL_GEN = { Ogień: 'Ognia', Ziemia: 'Ziemi', Powietrze: 'Powietrza', Woda: 'Wody' };

  function inferGender(name, fallback) {
    const t = String(name || '').trim().toLowerCase();
    if (t.length < 2) return fallback === 'm' ? 'm' : 'f';
    if (MALE_A.has(t)) return 'm';
    if (FEM_EX.has(t)) return 'f';
    if (t.endsWith('a')) return 'f';
    return fallback === 'f' || fallback === 'm' ? fallback : 'm';
  }

  function inflectName(rawName, gender) {
    const raw = String(rawName || '').trim();
    const g = inferGender(raw, gender);
    const low = raw.toLowerCase();
    if (low === 'ona') return { raw, nom: 'Ona', gen: 'jej', dat: 'jej', acc: 'ją', ins: 'nią', loc: 'niej', declinable: false, gender: 'f' };
    if (low === 'on') return { raw, nom: 'On', gen: 'jego', dat: 'mu', acc: 'go', ins: 'nim', loc: 'nim', declinable: false, gender: 'm' };
    const fixed = (decl) => ({ raw, nom: raw, gen: raw, dat: raw, acc: raw, ins: raw, loc: raw, declinable: decl, gender: g });
    if (raw.length < 2 || !/^\p{L}{2,}$/u.test(raw) || INDECL.has(low) || (g === 'f' && !low.endsWith('a'))) return fixed(false);
    const nom = raw.charAt(0).toUpperCase() + raw.slice(1);
    const base = nom.slice(0, -1);

    if (g === 'f' || MALE_A.has(low)) {
      if (low === 'maja' || low === 'kaja') {
        const s = nom.slice(0, -2);
        return { raw, nom, gen: s + 'i', dat: s + 'i', acc: base + 'ę', ins: base + 'ą', loc: s + 'i', declinable: true, gender: g };
      }
      if (low.endsWith('ia')) {
        const gdl = (SOFT_IA.has(low) || /(?:sia|zia|cia|dzia)$/.test(low)) ? base : base + 'i';
        return { raw, nom, gen: gdl, dat: gdl, acc: base + 'ę', ins: base + 'ą', loc: gdl, declinable: true, gender: g };
      }
      if (/(?:cja|sja|zja)$/.test(low)) {
        const gdl = nom.slice(0, -2) + 'ji';
        return { raw, nom, gen: gdl, dat: gdl, acc: base + 'ę', ins: base + 'ą', loc: gdl, declinable: true, gender: g };
      }
      if (low.endsWith('la')) return { raw, nom, gen: base + 'i', dat: base + 'i', acc: base + 'ę', ins: base + 'ą', loc: base + 'i', declinable: true, gender: g };
      if (low.endsWith('ka')) return { raw, nom, gen: base + 'i', dat: base.slice(0, -1) + 'ce', acc: base + 'ę', ins: base + 'ą', loc: base.slice(0, -1) + 'ce', declinable: true, gender: g };
      if (low.endsWith('ga')) return { raw, nom, gen: base + 'i', dat: base.slice(0, -1) + 'dze', acc: base + 'ę', ins: base + 'ą', loc: base.slice(0, -1) + 'dze', declinable: true, gender: g };
      if (low.endsWith('cha')) return { raw, nom, gen: base + 'y', dat: base.slice(0, -2) + 'sze', acc: base + 'ę', ins: base + 'ą', loc: base.slice(0, -2) + 'sze', declinable: true, gender: g };
      if (low.endsWith('sza')) return { raw, nom, gen: base + 'y', dat: base + 'y', acc: base + 'ę', ins: base + 'ą', loc: base + 'y', declinable: true, gender: g };
      const dl = low.endsWith('ta') ? base.slice(0, -1) + 'cie' : low.endsWith('da') ? base.slice(0, -1) + 'dzie' : low.endsWith('ra') ? base + 'ze' : low.endsWith('ła') ? base.slice(0, -1) + 'le' : base + 'ie';
      return { raw, nom, gen: base + 'y', dat: dl, acc: base + 'ę', ins: base + 'ą', loc: dl, declinable: true, gender: g };
    }

    const mapped = MALE_MAP[low];
    const stem = mapped ? mapped[0] : (low.endsWith('ek') && raw.length >= 5 ? nom.slice(0, -2) + 'k' : nom);
    const ins = /[kg]$/i.test(stem) ? stem + 'iem' : stem + 'em';
    const loc = mapped ? mapped[1] : (/(?:k|g|ch|sz|cz|rz|ż|c|dz|j|l|ś|ć|ń|ź)$/i.test(stem) ? stem + 'u' : (stem.endsWith('t') ? stem.slice(0, -1) + 'cie' : stem.endsWith('d') ? stem.slice(0, -1) + 'dzie' : stem.endsWith('r') ? stem + 'ze' : stem + 'ie'));
    return { raw, nom, gen: stem + 'a', dat: stem + 'owi', acc: stem + 'a', ins, loc, declinable: true, gender: g };
  }

  function atPerson(name, gender) {
    const f = inflectName(name, gender);
    if (!f.nom || f.nom === 'Ona' || f.nom === 'On') return (f.gender === 'f') ? 'u niej' : 'u niego';
    return 'u ' + f.gen;
  }

  function betweenPair(nA, gA, nB, gB) {
    const fA = inflectName(nA, gA), fB = inflectName(nB, gB);
    if (!fA.nom || !fB.nom) return 'między Wami';
    return 'między ' + fA.ins + ' a ' + fB.ins;
  }

  function forPerson(name, gender) {
    const f = inflectName(name, gender);
    return f.nom ? 'dla ' + f.gen : 'dla drugiej osoby';
  }

  function toPerson(name, gender) {
    const f = inflectName(name, gender);
    if (!f.nom) return (inferGender(name, gender) === 'f') ? 'jej' : 'mu';
    return f.declinable ? f.dat : 'wobec ' + f.nom;
  }

  function pairBoth(gA, gB) {
    if (gA === 'f' && gB === 'f') return 'obie';
    if (gA === 'm' && gB === 'm') return 'obaj';
    return 'oboje';
  }

  function pairDative(gA, gB) {
    return (gA === gB) ? 'obu' : 'obojgu';
  }

  window.SynPlMorphology = {
    inferGender, inflectName, atPerson, betweenPair, forPerson, toPerson, pairBoth, pairDative,
    signGen: (s) => SIGN_GEN[s] || s,
    elemGen: (e) => EL_GEN[e] || e
  };
})();
