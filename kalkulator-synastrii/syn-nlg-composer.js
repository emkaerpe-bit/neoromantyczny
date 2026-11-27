(function () {
  'use strict';

  function getMorph() {
    return (typeof window !== 'undefined' && window.SynPlMorphology) || null;
  }

  const DRIVER_PRIORITY = {
    pluto: 9, lilith: 8, mars: 7, saturn: 6, sun: 5, jupiter: 4, mercury: 3, venus: 2, moon: 1, node: 0
  };

  function resolveDirectionalAspect(asp, d) {
    const M = getMorph();
    const nA = (d && d.nameA) || '';
    const nB = (d && d.nameB) || '';
    const gA = M ? M.inferGender(nA, d && d.genderA) : ((d && d.genderA) || 'f');
    const gB = M ? M.inferGender(nB, d && d.genderB) : ((d && d.genderB) || 'm');

    const bA = (asp && asp.bA) || { key: 'sun', label: 'Słońce' };
    const bB = (asp && asp.bB) || { key: 'moon', label: 'Księżyc' };
    const prioA = DRIVER_PRIORITY[bA.key] ?? 3;
    const prioB = DRIVER_PRIORITY[bB.key] ?? 3;

    // Zachowujemy A jako inicjatora dla priorytetu >= lub gdy obie strony są równe
    const aLeads = prioA >= prioB;
    const actorRaw = aLeads ? { side: 'A', body: bA, name: nA, gender: gA } : { side: 'B', body: bB, name: nB, gender: gB };
    const reactorRaw = aLeads ? { side: 'B', body: bB, name: nB, gender: gB } : { side: 'A', body: bA, name: nA, gender: gA };

    const infA = M ? M.inflectName(actorRaw.name, actorRaw.gender) : { nom: actorRaw.name, gen: actorRaw.name, dat: actorRaw.name, acc: actorRaw.name, ins: actorRaw.name, loc: actorRaw.name, gender: actorRaw.gender };
    const infR = M ? M.inflectName(reactorRaw.name, reactorRaw.gender) : { nom: reactorRaw.name, gen: reactorRaw.name, dat: reactorRaw.name, acc: reactorRaw.name, ins: reactorRaw.name, loc: reactorRaw.name, gender: reactorRaw.gender };

    const actorPoss = (!actorRaw.name || actorRaw.name === 'On' || actorRaw.name === 'Ona')
      ? `${infA.gen} ${actorRaw.body.label}`
      : `${actorRaw.body.label} ${infA.gen}`;
    const flowLabel = actorRaw.name && reactorRaw.name
      ? `${actorPoss} porusza ${reactorRaw.body.label} ${M ? M.atPerson(reactorRaw.name, reactorRaw.gender) : 'u ' + infR.gen}`
      : `${actorRaw.body.label} wchodzi w kontakt z ${reactorRaw.body.label}`;

    return {
      directedKey: `${actorRaw.body.key}->${reactorRaw.body.key}`,
      actorSide: actorRaw.side,
      actorBody: actorRaw.body,
      reactorBody: reactorRaw.body,
      actor: infA,
      reactor: infR,
      canonicalFlow: flowLabel
    };
  }

  function createRegTracker(nameA, genderA, nameB, genderB) {
    const M = getMorph();
    const gA = M ? M.inferGender(nameA, genderA) : (genderA || 'f');
    const gB = M ? M.inferGender(nameB, genderB) : (genderB || 'm');
    const fA = M ? M.inflectName(nameA, gA) : { nom: nameA, gen: nameA, dat: nameA, acc: nameA, ins: nameA, loc: nameA, gender: gA };
    const fB = M ? M.inflectName(nameB, gB) : { nom: nameB, gen: nameB, dat: nameB, acc: nameB, ins: nameB, loc: nameB, gender: gB };

    let counts = { A: 0, B: 0 };
    const PRONOUNS = {
      f: { nom: 'ona', gen: 'jej', dat: 'jej', acc: 'ją', ins: 'z nią', loc: 'niej' },
      m: { nom: 'on', gen: 'jego', dat: 'mu', acc: 'go', ins: 'z nim', loc: 'nim' }
    };

    return {
      resetParagraph() { counts = { A: 0, B: 0 }; },
      mention(side, kase = 'nom') {
        const f = side === 'A' ? fA : fB;
        const n = counts[side] || 0;
        counts[side] = n + 1;
        const p = PRONOUNS[f.gender] || PRONOUNS.m;
        if (!f.nom) return kase === 'nom' ? (n === 1 ? '' : p.nom) : (p[kase] || p.gen);
        if (n === 0) return kase === 'ins' ? `z ${f.ins}` : (f[kase] || f.nom);
        if (kase === 'nom') return n === 1 ? '' : p.nom;
        return p[kase] || f[kase] || f.nom;
      }
    };
  }

  function buildPolarityBridge(d, dos) {
    const M = getMorph();
    const syn = (d && d.syn) || { chemistry: 55, security: 55, friction: 45 };
    const gA = M ? M.inferGender(d && d.nameA, d && d.genderA) : ((d && d.genderA) || 'f');
    const gB = M ? M.inferGender(d && d.nameB, d && d.genderB) : ((d && d.genderB) || 'm');
    const both = M ? M.pairBoth(gA, gB) : 'oboje';
    const between = M ? M.betweenPair(d && d.nameA, gA, d && d.nameB, gB) : 'między Wami';
    const sat = (dos && dos.saturnFinal) || 55;
    const obs = (dos && dos.obsessionFinal) || 40;
    const comm = (dos && dos.commFinal) || 55;

    if (syn.chemistry >= 72 && syn.friction >= 56) {
      return {
        hasParadox: true,
        code: 'CHEM_VS_FRICTION',
        bridgeSentence: `To napięcie ${between} ma dwa oblicza: to samo, co natychmiast rozpala bliskość, przy zmęczeniu zamienia się w szybki spór o rację. Dopiero gdy ${both} przestajecie szukać winnego, żar wraca na właściwe tory.`
      };
    }
    if (syn.security >= 68 && syn.friction >= 52) {
      return {
        hasParadox: true,
        code: 'SAFE_VS_FRICTION',
        bridgeSentence: `W tle jest prawdziwe oparcie, choć na co dzień łatwo zahaczyć o drobiazgi i inny rytm reakcji. Zgrzyty w rozmowie nie przekreślają zaufania, jeśli ${both} pilnujecie, by nie zamykać się w milczeniu.`
      };
    }
    if (syn.chemistry >= 70 && sat <= 52) {
      return {
        hasParadox: true,
        code: 'CHEM_VS_SATURN',
        bridgeSentence: `Przyciąganie przyszło tu szybciej niż gotowość do wspólnych ustaleń na dłużej. Żeby iskra ${between} nie wypaliła się po pierwszym zauroczeniu, potrzebujecie prostych, dotrzymywanych obietnic.`
      };
    }
    if (syn.security >= 70 && syn.chemistry <= 54) {
      return {
        hasParadox: true,
        code: 'SAFE_VS_LOW_SPARK',
        bridgeSentence: `Spokój i zaufanie budują się tu niemal bez wysiłku, ale właśnie w wygodnej przewidywalności łatwo zgubić napięcie. Jeśli ${both} nie zadbacie o czas tylko dla siebie, ciepło może zamienić się w zwykłe koleżeństwo.`
      };
    }
    if (obs >= 72 && comm <= 52) {
      return {
        hasParadox: true,
        code: 'OBSESSION_VS_COMM',
        bridgeSentence: `Ciała rozumieją się tu szybciej niż słowa, dlatego w trudniejszej chwili tak łatwo o domysły zamiast prostego pytania. Im bardziej ${both} mówicie wprost o swoich granicach, tym mniej miejsca zostaje na zazdrość.`
      };
    }
    return { hasParadox: false, code: 'BALANCED', bridgeSentence: '' };
  }

  window.SynNlgComposer = { resolveDirectionalAspect, createRegTracker, buildPolarityBridge };
})();
