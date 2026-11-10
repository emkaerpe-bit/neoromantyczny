/**
 * Advanced Decoz-Goodwin World-Class Numerology Engine
 * Calculates: Rational Thought, Hidden Passion, Karmic Lessons (Missing Numbers), and Personal Month.
 */

import { reduceNumber, getBaseDigit } from './numerology-engine.js';
import { calculateTextVibration } from './name-numerology.js';

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

export function calculateRationalThoughtNumber(firstNameStr, birthDay) {
  if (!firstNameStr || !birthDay) return null;
  const fVib = calculateTextVibration(firstNameStr);
  if (!fVib) return null;
  const dayVal = parseInt(birthDay, 10);
  if (isNaN(dayVal)) return null;
  const sum = fVib.number + dayVal;
  const num = reduceNumber(sum, true);
  return {
    number: num,
    baseDigit: getBaseDigit(num),
    isMaster: num === 11 || num === 22
  };
}

export function calculateNameFrequencies(fullName) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  if (!fullName) return { counts, hiddenPassion: [], karmicLessons: [] };
  const clean = fullName.toLowerCase().replace(/[^a-ząćęłńóśźż]/g, '');
  for (const char of clean) {
    const val = PYTHAGOREAN_MAP[char];
    if (val) counts[val] = (counts[val] || 0) + 1;
  }

  // Hidden Passion: digits with maximum frequency > 0
  let maxCount = 0;
  for (let i = 1; i <= 9; i++) {
    if (counts[i] > maxCount) maxCount = counts[i];
  }
  const hiddenPassion = [];
  if (maxCount > 0) {
    for (let i = 1; i <= 9; i++) {
      if (counts[i] === maxCount) hiddenPassion.push(i);
    }
  }

  // Karmic Lessons: digits with frequency === 0
  const karmicLessons = [];
  for (let i = 1; i <= 9; i++) {
    if (counts[i] === 0) karmicLessons.push(i);
  }

  return { counts, hiddenPassion, karmicLessons, maxCount };
}

export function calculatePersonalMonth(personalYear, monthIndex) {
  // monthIndex 1-12
  const sum = personalYear + monthIndex;
  const num = reduceNumber(sum, false);
  return num;
}
