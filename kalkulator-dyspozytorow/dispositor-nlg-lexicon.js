(function () {
  'use strict';

  const PLANETS = {
    sun:     { g: 'n',  c: { M: 'Słońce', D: 'Słońca', C: 'Słońcu', B: 'Słońce', N: 'Słońcem', Ms: 'Słońcu', W: 'Słońce' } },
    moon:    { g: 'm',  c: { M: 'Księżyc', D: 'Księżyca', C: 'Księżycowi', B: 'Księżyc', N: 'Księżycem', Ms: 'Księżycu', W: 'Księżycu' } },
    mercury: { g: 'm',  c: { M: 'Merkury', D: 'Merkurego', C: 'Merkuremu', B: 'Merkurego', N: 'Merkurym', Ms: 'Merkurym', W: 'Merkury' } },
    venus:   { g: 'f',  c: { M: 'Wenus', D: 'Wenus', C: 'Wenus', B: 'Wenus', N: 'Wenus', Ms: 'Wenus', W: 'Wenus' } },
    mars:    { g: 'm',  c: { M: 'Mars', D: 'Marsa', C: 'Marsowi', B: 'Marsa', N: 'Marsem', Ms: 'Marsie', W: 'Marsie' } },
    jupiter: { g: 'm',  c: { M: 'Jowisz', D: 'Jowisza', C: 'Jowiszowi', B: 'Jowisza', N: 'Jowiszem', Ms: 'Jowiszu', W: 'Jowiszu' } },
    saturn:  { g: 'm',  c: { M: 'Saturn', D: 'Saturna', C: 'Saturnowi', B: 'Saturna', N: 'Saturnem', Ms: 'Saturnie', W: 'Saturnie' } },
    uranus:  { g: 'm',  c: { M: 'Uran', D: 'Urana', C: 'Uranowi', B: 'Urana', N: 'Uranem', Ms: 'Uranie', W: 'Uranie' } },
    neptune: { g: 'm',  c: { M: 'Neptun', D: 'Neptuna', C: 'Neptunowi', B: 'Neptuna', N: 'Neptunem', Ms: 'Neptunie', W: 'Neptunie' } },
    pluto:   { g: 'm',  c: { M: 'Pluton', D: 'Plutona', C: 'Plutonowi', B: 'Plutona', N: 'Plutonem', Ms: 'Plutonie', W: 'Plutonie' } },
    chiron:  { g: 'm',  c: { M: 'Chiron', D: 'Chirona', C: 'Chironowi', B: 'Chirona', N: 'Chironem', Ms: 'Chironie', W: 'Chironie' } },
    lilith:  { g: 'f',  c: { M: 'Lilith', D: 'Lilith', C: 'Lilith', B: 'Lilith', N: 'Lilith', Ms: 'Lilith', W: 'Lilith' } },
    node:    { g: 'm',  c: { M: 'Węzeł Północny', D: 'Węzła Północnego', C: 'Węzłowi Północnemu', B: 'Węzeł Północny', N: 'Węzłem Północnym', Ms: 'Węźle Północnym', W: 'Węźle Północny' } },
    fortune: { g: 'm',  c: { M: 'Punkt Szczęścia', D: 'Punktu Szczęścia', C: 'Punktowi Szczęścia', B: 'Punkt Szczęścia', N: 'Punktem Szczęścia', Ms: 'Punkcie Szczęścia', W: 'Punkcie Szczęścia' } }
  };

  const SIGNS = {
    Aries:       { g: 'm',  w: 'w Baranie',     c: { M: 'Baran', D: 'Barana', C: 'Baranowi', B: 'Barana', N: 'Baranem', Ms: 'Baranie', W: 'Baranie' } },
    Taurus:      { g: 'm',  w: 'w Byku',        c: { M: 'Byk', D: 'Byka', C: 'Bykowi', B: 'Byka', N: 'Bykiem', Ms: 'Byku', W: 'Byku' } },
    Gemini:      { g: 'pl', w: 'w Bliźniętach', c: { M: 'Bliźnięta', D: 'Bliźniąt', C: 'Bliźniętom', B: 'Bliźnięta', N: 'Bliźniętami', Ms: 'Bliźniętach', W: 'Bliźnięta' } },
    Cancer:      { g: 'm',  w: 'w Raku',        c: { M: 'Rak', D: 'Raka', C: 'Rakowi', B: 'Raka', N: 'Rakiem', Ms: 'Raku', W: 'Raku' } },
    Leo:         { g: 'm',  w: 'we Lwie',       c: { M: 'Lew', D: 'Lwa', C: 'Lwu', B: 'Lwa', N: 'Lwem', Ms: 'Lwie', W: 'Lwie' } },
    Virgo:       { g: 'f',  w: 'w Pannie',      c: { M: 'Panna', D: 'Panny', C: 'Pannie', B: 'Pannę', N: 'Panną', Ms: 'Pannie', W: 'Panno' } },
    Libra:       { g: 'f',  w: 'w Wadze',       c: { M: 'Waga', D: 'Wagi', C: 'Wadze', B: 'Wagę', N: 'Wagą', Ms: 'Wadze', W: 'Wago' } },
    Scorpio:     { g: 'm',  w: 'w Skorpionie',  c: { M: 'Skorpion', D: 'Skorpiona', C: 'Skorpionowi', B: 'Skorpiona', N: 'Skorpionem', Ms: 'Skorpionie', W: 'Skorpionie' } },
    Sagittarius: { g: 'm',  w: 'w Strzelcu',    c: { M: 'Strzelec', D: 'Strzelca', C: 'Strzelcowi', B: 'Strzelca', N: 'Strzelcem', Ms: 'Strzelcu', W: 'Strzelcu' } },
    Capricorn:   { g: 'm',  w: 'w Koziorożcu',  c: { M: 'Koziorożec', D: 'Koziorożca', C: 'Koziorożcowi', B: 'Koziorożca', N: 'Koziorożcem', Ms: 'Koziorożcu', W: 'Koziorożcu' } },
    Aquarius:    { g: 'm',  w: 'w Wodniku',     c: { M: 'Wodnik', D: 'Wodnika', C: 'Wodnikowi', B: 'Wodnika', N: 'Wodnikiem', Ms: 'Wodniku', W: 'Wodniku' } },
    Pisces:      { g: 'pl', w: 'w Rybach',      c: { M: 'Ryby', D: 'Ryb', C: 'Rybom', B: 'Ryby', N: 'Rybami', Ms: 'Rybach', W: 'Ryby' } }
  };

  function planetCase(key, gramCase) {
    const item = PLANETS[key];
    return item ? (item.c[gramCase || 'M'] || item.c.M) : String(key || '');
  }

  function signCase(signKey, gramCase) {
    const item = SIGNS[signKey];
    return item ? (item.c[gramCase || 'M'] || item.c.M) : String(signKey || '');
  }

  function signIn(signKey) {
    return SIGNS[signKey] ? SIGNS[signKey].w : ('w ' + signCase(signKey, 'Ms'));
  }

  function planetInSign(planetKey, signKey, gramCase) {
    return planetCase(planetKey, gramCase || 'M') + ' ' + signIn(signKey);
  }

  function cldrCategory(n) {
    const num = Math.abs(Math.floor(Number(n) || 0));
    if (num === 1) return 'one';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'few';
    return 'many';
  }

  function cldrPlural(n, forms) {
    const cat = cldrCategory(n);
    const tpl = forms[cat] !== undefined ? forms[cat] : (forms.other || '');
    return String(tpl).replace(/#/g, String(n));
  }

  function verbGatherPlanets(n) {
    return cldrPlural(n, {
      one: 'skupia się # planeta podległa',
      few: 'skupiają się # planety podległe',
      many: 'skupia się # planet podległych',
      other: 'skupia się # planety podległej'
    });
  }

  function countBodiesLabel(n) {
    return cldrPlural(n, {
      one: '# ciało',
      few: '# ciała',
      many: '# ciał',
      other: '# ciała'
    });
  }

  function joinList(items, conj) {
    const arr = (items || []).filter(Boolean);
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr[0] + ' ' + (conj || 'i') + ' ' + arr[1];
    return arr.slice(0, -1).join(', ') + ' ' + (conj || 'i') + ' ' + arr[arr.length - 1];
  }

  function gSelect(gender, forms) {
    const key = gender === 'f' ? 'f' : (gender === 'm' ? 'm' : 'n');
    return forms[key] !== undefined ? forms[key] : (forms.n || forms.m || '');
  }

  function resolveGender(text, gender) {
    const idx = gender === 'f' ? 0 : (gender === 'm' ? 1 : 2);
    return String(text || '').replace(/\[\[([^|\]]+)\|([^|\]]+)\|([^\]]+)\]\]/g, (_, f, m, n) => {
      return [f, m, n][idx] || n;
    });
  }

  function describeSingleControl(pKey, signKey, endKey, selfPhrase, subVerb) {
    const pLoc = planetInSign(pKey, signKey, 'M');
    if (pKey === endKey) {
      return `${pLoc} ${selfPhrase || 'jest we własnym znaku i sama dyktuje warunki'}`;
    }
    return `${pLoc} ${subVerb || 'podlega'} ${planetCase(endKey, 'C')}`;
  }

  function describePairControl(p1Key, s1, end1, p2Key, s2, end2, styleMap) {
    const p1Loc = planetInSign(p1Key, s1, 'M');
    const p2Loc = planetInSign(p2Key, s2, 'M');
    if (end1 === end2) {
      const style = (styleMap && styleMap[end1]) || '';
      if (end1 === p2Key || end1 === p1Key) {
        const domKey = end1 === p2Key ? p2Key : p1Key;
        const domSign = end1 === p2Key ? s2 : s1;
        const subKey = end1 === p2Key ? p1Key : p2Key;
        const subSign = end1 === p2Key ? s1 : s2;
        return `${planetInSign(domKey, domSign, 'M')} jest we własnym znaku i dyktuje warunki także ${planetCase(subKey, 'C')} (${signIn(subSign)}), dlatego w konflikcie ${style}.`;
      }
      return `Zarówno ${p1Loc}, jak i ${p2Loc} podlegają ${planetCase(end1, 'C')} — dlatego podczas konfliktu ${style}.`;
    }
    const lead1 = p1Key === end1
      ? `${p1Loc} stoi we własnym znaku i nadaje ton rozmowie`
      : `${p1Loc} słucha ${planetCase(end1, 'D')}`;
    const lead2 = describeSingleControl(p2Key, s2, end2, 'działa bezpośrednio na własnych zasadach', 'podlega');
    const st1 = (styleMap && styleMap[end1]) || '';
    const st2 = (styleMap && styleMap[end2]) || '';
    return `${lead1}: ${st1}. Z kolei ${lead2}, przez co w samym starciu ${st2}.`;
  }

  window.__DISPOSITOR_LEXICON__ = {
    PLANETS,
    SIGNS,
    planetCase,
    signCase,
    signIn,
    planetInSign,
    cldrCategory,
    cldrPlural,
    verbGatherPlanets,
    countBodiesLabel,
    joinList,
    gSelect,
    resolveGender,
    describeSingleControl,
    describePairControl
  };
})();
