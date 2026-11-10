/**
 * Numerology Relationship Engine (Neoromantyczny World-Class Architecture)
 * Calculates: Life Path (with Master Numbers 11, 22, 33),
 * Relationship Vibration, Bridge Number, Personal Year, and Karmic Debts.
 */

export function sumDigits(num) {
  let s = 0;
  String(num).replace(/\D/g, '').split('').forEach(d => s += parseInt(d, 10));
  return s;
}

export function reduceNumber(num, allowMaster = true) {
  while (num > 9) {
    if (allowMaster && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    num = sumDigits(num);
  }
  return num;
}

export function getBaseDigit(num) {
  while (num > 9) {
    num = sumDigits(num);
  }
  return num;
}

export function calculateLifePath(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10);
  const d = parseInt(parts[2], 10);
  
  const redY = reduceNumber(y, true);
  const redM = reduceNumber(m, true);
  const redD = reduceNumber(d, true);
  
  const total = redY + redM + redD;
  const finalNum = reduceNumber(total, true);

  // Podwibracja wg szkoły Gladys Lobos (suma wszystkich cyfr daty)
  const cleanStr = dateStr.replace(/\D/g, '');
  let rawDigitSum = 0;
  for (const ch of cleanStr) {
    rawDigitSum += parseInt(ch, 10);
  }
  
  return {
    number: finalNum,
    baseDigit: getBaseDigit(finalNum),
    isMaster: finalNum === 11 || finalNum === 22 || finalNum === 33,
    rawDigitSum,
    subVibration: {
      rawSum: rawDigitSum,
      str: `${rawDigitSum}/${finalNum}`,
      isKarmic: rawDigitSum === 13 || rawDigitSum === 14 || rawDigitSum === 16 || rawDigitSum === 19,
      isMaster: rawDigitSum === 11 || rawDigitSum === 22 || rawDigitSum === 33 || rawDigitSum === 44
    },
    day: d,
    month: m,
    year: y
  };
}

export function calculateRelationshipVibration(lp1, lp2) {
  const sum = lp1.number + lp2.number;
  const vib = reduceNumber(sum, true);
  return {
    number: vib,
    baseDigit: getBaseDigit(vib),
    isMaster: vib === 11 || vib === 22,
    rawSum: sum,
    subVibrationStr: `${sum}/${vib}`,
    isKarmic: sum === 13 || sum === 14 || sum === 16 || sum === 19
  };
}

export function calculateBridgeNumber(lp1, lp2) {
  const diff = Math.abs(lp1.baseDigit - lp2.baseDigit);
  return {
    number: diff
  };
}

export function calculatePersonalYear(dateStr, targetYear = 2026) {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  const m = parseInt(parts[1], 10);
  const d = parseInt(parts[2], 10);
  
  const redD = reduceNumber(d, false);
  const redM = reduceNumber(m, false);
  const redY = reduceNumber(targetYear, false);
  
  const sum = redD + redM + redY;
  return reduceNumber(sum, false);
}

export function detectKarmicDebts(dateStr) {
  if (!dateStr) return [];
  const parts = dateStr.split('-');
  const d = parseInt(parts[2], 10);
  const debts = [];
  
  if (d === 13) debts.push({ code: 13, name: "Dług Karmy Pracy i Cierpliwości" });
  if (d === 14) debts.push({ code: 14, name: "Dług Karmy Wolności i Umiaru" });
  if (d === 16) debts.push({ code: 16, name: "Dług Karmy Relacji i Pychy Ego" });
  if (d === 19) debts.push({ code: 19, name: "Dług Karmy Samowystarczalności i Władzy" });
  
  return debts;
}

export function calculateHarmonyScores(lp1, lp2) {
  const diff = Math.abs(lp1.baseDigit - lp2.baseDigit);
  // Psychological harmony matrix calculation
  let emotional = 82;
  let stability = 78;
  let friction = 25;
  
  if (diff === 0) { emotional = 95; stability = 80; friction = 35; }
  else if (diff === 1) { emotional = 86; stability = 74; friction = 30; }
  else if (diff === 2) { emotional = 90; stability = 88; friction = 20; }
  else if (diff === 3) { emotional = 72; stability = 68; friction = 45; }
  else if (diff === 4) { emotional = 68; stability = 62; friction = 55; }
  
  if (lp1.isMaster || lp2.isMaster) {
    emotional = Math.min(98, emotional + 6);
    friction = Math.min(85, friction + 8);
  }
  
  const overall = Math.round((emotional * 0.45) + (stability * 0.4) - (friction * 0.15));
  return { emotional, stability, friction, overall: Math.min(99, Math.max(55, overall)) };
}

export function calculateBirthdayNumber(dateStr) {
  if (!dateStr) return null;
  const d = parseInt(dateStr.split('-')[2], 10);
  const base = reduceNumber(d, true);
  const talents = {
    1: "Inicjatywa, odwaga i bezpośredniość w okazywaniu uczuć",
    2: "Wyjątkowa empatia, czułość i wyczulenie na nastroje partnera",
    3: "Błyskotliwość, poczucie humoru i dar rozładowywania napięć",
    4: "Niezawodność, lojalność i troska wyrażana czynami",
    5: "Magnetyzm, zmysłowa ciekawość i wnoszenie świeżości",
    6: "Troskliwość, dbałość o azyl domowy i lojalność serca",
    7: "Głębia psychologiczna, wierność zasadom i selektywność",
    8: "Siła charakteru, opiekuńczość i wsparcie w celach życiowych",
    9: "Wielkoduszność, wyrozumiałość i zdolność do wybaczenia",
    11: "Intuicja mistrzowska, telepatia i wyczucie intencji",
    22: "Charyzma, siła budowania wspólnej przyszłości"
  };
  return {
    day: d,
    number: base,
    talent: talents[base] || talents[getBaseDigit(base)] || "Lojalność i obecność"
  };
}

export function getNumerologyElement(num) {
  const base = getBaseDigit(num);
  if ([1, 3, 9].includes(base)) {
    return { name: "Ogień", symbol: "🔥", trait: "Inicjatywa, pasja i bezpośredniość" };
  }
  if ([4, 8].includes(base)) {
    return { name: "Ziemia", symbol: "🌍", trait: "Stabilność, realizm i niezawodność" };
  }
  if ([5].includes(base)) {
    return { name: "Powietrze", symbol: "💨", trait: "Wolność, dialog i lekkość myśli" };
  }
  return { name: "Woda", symbol: "💧", trait: "Empatia, zmysłowość i głębia intymna" };
}

export function calculateChallengeNumber(d1, d2) {
  if (!d1 || !d2) return 0;
  const m1 = parseInt(d1.split('-')[1], 10);
  const m2 = parseInt(d2.split('-')[1], 10);
  return Math.abs(m1 - m2);
}

export function calculateMasterVerdict(name1, name2, lp1, lp2, vib, bridge, scores, debts1, debts2) {
  const isMasterUnion = lp1.isMaster || lp2.isMaster || vib.isMaster;
  const hasKarmicDebts = (debts1 && debts1.length > 0) || (debts2 && debts2.length > 0);

  if (isMasterUnion && scores.overall >= 80) {
    return {
      badge: "ARCHETYP PRZEZNACZENIA • WIBRACJA MISTRZOWSKA",
      title: "MISTYCZNE PRZYMIERZE DUSZ (ALCHEMIA WYŻSZEJ ŚWIADOMOŚCI)",
      summary: `Między ${name1} (Droga ${lp1.number}) a ${name2} (Droga ${lp2.number}) zachodzi rzadka konfiguracja wibracji o wysokiej częstotliwości. Wasze spotkanie nie ma charakteru przypadkowego flirtu – to połączenie inicjacyjne. Relacja generuje potężny magnetyzm duchowy i zmysłowy (${scores.overall}%), zmuszając obie strony do zrzucenia wszelkich masek i wejścia w autentyczną dojrzałość.`
    };
  }

  if (bridge.number === 0) {
    return {
      badge: "ZWIEWIERCIADŁO KARMICZNE • BLIŹNIACZY REZONANS",
      title: "ALCHEMIA LUSTRA (POŁĄCZENIE O TEJ SAMEJ DRODZE ŻYCIA)",
      summary: `Dzielicie tę samą Drogę Życia (${lp1.number}). Związek działa jak idealne lustro psychologiczne – to, co zachwyca Cię w partnerze, jest Twoją własną siłą, a to, co drażni, odzwierciedla Twój własny ukryty cień. Rozbrajając potrzebę rywalizacji i racji, tworzycie sojusz o niespotykanym zrozumieniu bez słów.`
    };
  }

  if (hasKarmicDebts) {
    return {
      badge: "KARMICZNY WĘZEŁ EWOLUCYJNY • PŁASZCZYZNA WZROSTU",
      title: "KARMICZNA TRANSFORMACJA (SOJUSZ DOJRZAŁOŚCI I PRÓBY)",
      summary: `W Waszych datach urodzenia ujawniają się długi karmiczne, co oznacza, że Wasz związek ma wymiar głęboko transformujący. Przyciągnęliście się, aby raz na zawsze uzdrowić dawne schematy ego (lęk przed zależnością, kontrolę lub ucieczkę). Pokonując pierwsze kryzysy za pomocą Liczby Mostu (${bridge.number}), budujecie więź nie do złamania.`
    };
  }

  if (scores.friction >= 45) {
    return {
      badge: "DYNAMICZNA POLARYZACJA • OGIEŃ I MAGNETYZM",
      title: "MAGNETYCZNY PARADOKS (ZDERZENIE DWÓCH SILNYCH BIEGUNÓW)",
      summary: `Wasza relacja generuje elektryzujące napięcie – wysoka namiętność i zmysłowość przeplatają się z okresami walki o suwerenność. Ta sama energia, która wywołuje fascynację, w momentach zmęczenia może prowadzić do nieporozumień. Kluczem do Waszego sukcesu jest świadome stosowanie Mostu Porozumienia (${bridge.number}).`
    };
  }

  return {
    badge: "ZŁOTA HARMONIA • ORGANICZNE POROZUMIENIE",
    title: "KRÓLEWSKA TWIERDZA (NATURALNY REZONANS I SPOKÓJ)",
    summary: `Temperamenty ${name1} (Droga ${lp1.number}) i ${name2} (Droga ${lp2.number}) doskonale się uzupełniają (${scores.overall}% rezonansu). Łączy Was naturalny szacunek dla wzajemnych granic i wspólna wizja bezpieczeństwa. Związek staje się bezpieczną przystanią, w której oboje rozwijacie skrzydła bez poczucia presji.`
  };
}
