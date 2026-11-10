/**
 * Name Numerology Engine (Pythagorean Standard with Polish Diacritics)
 * Calculates: Soul Urge (Vowels), Personality (Consonants), and Destiny / Expression (All Letters).
 */

import { reduceNumber, getBaseDigit } from './numerology-engine.js';

const PYTHAGOREAN_MAP = {
  a: 1, ą: 1, j: 1, s: 1, ś: 1,
  b: 2, k: 2, t: 2,
  c: 3, ć: 3, l: 3, ł: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, ę: 5, n: 5, ń: 5, w: 5,
  f: 6, o: 6, ó: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8, ż: 8, ź: 8,
  i: 9, r: 9
};

const VOWELS = new Set(['a', 'ą', 'e', 'ę', 'i', 'o', 'ó', 'u', 'y']);

export function calculateTextVibration(text) {
  if (!text) return null;
  const clean = text.toLowerCase().replace(/[^a-ząćęłńóśźż]/g, '');
  if (!clean.length) return null;
  let sum = 0;
  for (const char of clean) {
    const val = PYTHAGOREAN_MAP[char];
    if (val) sum += val;
  }
  if (sum === 0) return null;
  const num = reduceNumber(sum, true);
  return {
    number: num,
    baseDigit: getBaseDigit(num),
    isMaster: num === 11 || num === 22 || num === 33
  };
}

export function calculateBalanceNumber(fullName) {
  if (!fullName) return null;
  const words = fullName.trim().split(/[\s-]+/).filter(Boolean);
  if (!words.length) return null;
  let initialsSum = 0;
  for (const word of words) {
    const cleanWord = word.toLowerCase().replace(/[^a-ząćęłńóśźż]/g, '');
    if (cleanWord.length > 0) {
      const val = PYTHAGOREAN_MAP[cleanWord[0]];
      if (val) initialsSum += val;
    }
  }
  if (initialsSum === 0) return null;
  const num = reduceNumber(initialsSum, false);
  return {
    number: num,
    baseDigit: num
  };
}

export function calculateMaturityNumber(lifePathNumber, destinyNumber) {
  if (!lifePathNumber || !destinyNumber) return null;
  const sum = lifePathNumber + destinyNumber;
  const num = reduceNumber(sum, true);
  return {
    number: num,
    baseDigit: getBaseDigit(num),
    isMaster: num === 11 || num === 22 || num === 33
  };
}

export function calculateNameNumerology(fullName) {
  if (!fullName) return null;
  const clean = fullName.toLowerCase().replace(/[^a-ząćęłńóśźż]/g, '');
  if (!clean.length) return null;

  let vowelsSum = 0;
  let consonantsSum = 0;
  let totalSum = 0;

  for (const char of clean) {
    const val = PYTHAGOREAN_MAP[char];
    if (val) {
      totalSum += val;
      if (VOWELS.has(char)) {
        vowelsSum += val;
      } else {
        consonantsSum += val;
      }
    }
  }

  if (totalSum === 0) return null;

  const soul = vowelsSum > 0 ? reduceNumber(vowelsSum, true) : 1;
  const personality = consonantsSum > 0 ? reduceNumber(consonantsSum, true) : 1;
  const destiny = reduceNumber(totalSum, true);

  const words = fullName.trim().split(/\s+/).filter(Boolean);
  const firstNameStr = words[0] || '';
  const surnameStr = words.length > 1 ? words.slice(1).join(' ') : '';

  return {
    fullName,
    firstNameStr,
    surnameStr,
    firstNameVibration: calculateTextVibration(firstNameStr),
    surnameVibration: surnameStr ? calculateTextVibration(surnameStr) : null,
    balance: calculateBalanceNumber(fullName),
    soul: {
      number: soul,
      baseDigit: getBaseDigit(soul),
      isMaster: soul === 11 || soul === 22 || soul === 33
    },
    personality: {
      number: personality,
      baseDigit: getBaseDigit(personality),
      isMaster: personality === 11 || personality === 22
    },
    destiny: {
      number: destiny,
      baseDigit: getBaseDigit(destiny),
      isMaster: destiny === 11 || destiny === 22 || destiny === 33
    }
  };
}
