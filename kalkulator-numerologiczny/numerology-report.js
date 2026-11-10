/**
 * Numerology Report Renderer (Synastry Standard)
 * Generates: Master Verdict, Interactive Metric Cards with Portal Popups,
 * Responsive Comparison Dossier Table, Bridge Protocol, and 5 Paid Modules.
 */

import {
  calculateLifePath,
  calculateRelationshipVibration,
  calculateBridgeNumber,
  calculatePersonalYear,
  detectKarmicDebts,
  calculateHarmonyScores,
  calculateBirthdayNumber,
  getNumerologyElement,
  calculateChallengeNumber,
  calculateMasterVerdict
} from './numerology-engine.js';

import { LIFE_PATH_DATA } from './data-life-paths.js';
import { RELATIONSHIP_VIBRATIONS } from './data-relationship-vibrations.js';
import { BRIDGE_NUMBER_DATA } from './data-bridge-numbers.js';
import { KARMIC_DEBT_INTERPRETATIONS, PERSONAL_YEAR_INTERPRETATIONS, INTIMACY_BLUEPRINTS } from './data-paid-modules.js';
import { NUMEROLOGY_GLOSSARY } from './data-numerology-glossary.js';
import { calculateNameNumerology, calculateMaturityNumber } from './name-numerology.js';
import { SOUL_URGE_DATA, PERSONALITY_DATA, DESTINY_DATA } from './data-name-numerology.js';
import { SURNAME_VIBRATION_DATA, FIRST_NAME_VIBRATION_DATA } from './data-surname-numerology.js';
import { MATURITY_DATA, BALANCE_DATA } from './data-maturity-numerology.js';
import { calculateRationalThoughtNumber, calculateNameFrequencies, calculatePersonalMonth } from './advanced-numerology.js';
import { RATIONAL_THOUGHT_DATA, HIDDEN_PASSION_DATA, KARMIC_LESSONS_DATA } from './data-advanced-numerology.js';
import { SUBVIBRATION_DATA } from './data-subvibrations.js';

// Portal Tooltip Initializer (Synastry Standard - Zero Flicker Protocol)
export function initPortalTooltip() {
  let portal = document.getElementById('num-portal-tooltip');
  if (!portal) {
    portal = document.createElement('div');
    portal.id = 'num-portal-tooltip';
    portal.setAttribute('role', 'tooltip');
    document.body.appendChild(portal);
  }

  let activeAnchor = null;

  function positionPortal(anchor) {
    if (!portal || !anchor) return;
    const rect = anchor.getBoundingClientRect();
    const pRect = portal.getBoundingClientRect();
    let left = rect.left + (rect.width / 2) - (pRect.width / 2);
    const minLeft = 14;
    const maxLeft = Math.max(minLeft, window.innerWidth - pRect.width - 14);
    left = Math.max(minLeft, Math.min(maxLeft, left));

    let top;
    if (rect.top >= pRect.height + 18) {
      top = rect.top - pRect.height - 10;
    } else {
      top = rect.bottom + 10;
    }
    top = Math.max(12, Math.min(window.innerHeight - pRect.height - 12, top));
    portal.style.left = `${Math.round(left)}px`;
    portal.style.top = `${Math.round(top)}px`;
  }

  function showTooltip(anchor) {
    activeAnchor = anchor;
    const tipEl = anchor.querySelector('.num-tooltip-pop, .num-asp-tip');
    if (!tipEl) return;
    portal.innerHTML = tipEl.innerHTML;
    portal.classList.add('is-visible');
    positionPortal(anchor);
  }

  function hideTooltip(target) {
    if (activeAnchor && (!target || activeAnchor === target || activeAnchor.contains(target))) {
      portal.classList.remove('is-visible');
      activeAnchor = null;
    }
  }

  document.addEventListener('mouseover', (e) => {
    const anchor = e.target.closest('.num-asp-badge, .num-stat-box.num-has-tooltip, .num-badge-badge, .num-info-pill');
    if (!anchor) return;
    const targetAnchor = anchor.closest('.num-asp-badge, .num-stat-box.num-has-tooltip, .num-badge-badge') || anchor;
    if (activeAnchor === targetAnchor && portal.classList.contains('is-visible')) return;
    showTooltip(targetAnchor);
  });

  document.addEventListener('mouseout', (e) => {
    const anchor = e.target.closest('.num-asp-badge, .num-stat-box.num-has-tooltip, .num-badge-badge, .num-info-pill');
    if (!anchor) return;
    const targetAnchor = anchor.closest('.num-asp-badge, .num-stat-box.num-has-tooltip, .num-badge-badge') || anchor;
    if (e.relatedTarget && targetAnchor.contains(e.relatedTarget)) {
      return; // Still inside anchor
    }
    hideTooltip(targetAnchor);
  });

  document.addEventListener('click', (e) => {
    const raw = e.target.closest('.num-asp-badge, .num-stat-box.num-has-tooltip, .num-badge-badge, .num-info-pill');
    if (raw) {
      const anchor = raw.closest('.num-asp-badge, .num-stat-box.num-has-tooltip, .num-badge-badge') || raw;
      if (activeAnchor === anchor && portal.classList.contains('is-visible')) {
        portal.classList.remove('is-visible');
        activeAnchor = null;
      } else {
        showTooltip(anchor);
      }
    } else if (activeAnchor) {
      portal.classList.remove('is-visible');
      activeAnchor = null;
    }
  });

  window.addEventListener('scroll', () => {
    if (activeAnchor) {
      portal.classList.remove('is-visible');
      activeAnchor = null;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (activeAnchor) positionPortal(activeAnchor);
  }, { passive: true });
}

function createTooltipHtml(glossaryItem, actualValueStr = '', valueMeaningStr = '', options = {}) {
  if (!glossaryItem) return '';
  const isRel = options.isRelationship ?? (glossaryItem.scope === 'relationship');
  const personName = options.personName || '';

  const scopeBadge = isRel
    ? `<span class="num-tt-scope scope-rel">ANALIZA ZWIĄZKOWA • ENERGIA PARY</span>`
    : `<span class="num-tt-scope scope-indiv">PROFIL INDYWIDUALNY ${personName ? `• ${personName.toUpperCase()}` : ''}</span>`;

  const valueHeading = actualValueStr ? `
    <div style="color:var(--gold);font-weight:700;margin-bottom:0.35rem;font-size:0.86rem;">
      ✦ ${isRel ? 'Wspólny Wynik Pary: W tym miejscu wyszła Wam' : `Wynik Indywidualny (${personName || 'Osoba'}):`} ${actualValueStr}
    </div>
  ` : '';

  const adviceHeading = isRel
    ? `<strong>Wskazówka dla Waszego Związku:</strong>`
    : (personName ? `<strong>Wpływ cechy na relację z ${personName}:</strong>` : `<strong>Wpływ cechy na relację:</strong>`);

  return `
    <div class="num-tooltip-pop">
      ${scopeBadge}
      <span class="num-tt-label">✦ ${glossaryItem.tag}</span>
      <div class="num-tt-def"><strong>${glossaryItem.title}</strong><br>${glossaryItem.def}</div>
      <div class="num-tt-basis">
        ${valueHeading}
        ${valueMeaningStr ? `
          <div style="line-height:1.55;color:rgba(250,248,245,0.95);font-size:0.82rem;margin-bottom:0.35rem;">
            ${valueMeaningStr}
          </div>
        ` : ''}
        <div style="font-size:0.75rem;color:rgba(250,248,245,0.65);">
          ${adviceHeading} ${glossaryItem.tip}
        </div>
      </div>
    </div>`;
}

function renderIndividualTable(personName, birthDate, lp, bday, elem, py, debts, nameNum, lpData) {
  const soulData = nameNum ? (SOUL_URGE_DATA[nameNum.soul.number] || SOUL_URGE_DATA[nameNum.soul.baseDigit]) : null;
  const persData = nameNum ? (PERSONALITY_DATA[nameNum.personality.number] || PERSONALITY_DATA[nameNum.personality.baseDigit]) : null;
  const destData = nameNum ? (DESTINY_DATA[nameNum.destiny.number] || DESTINY_DATA[nameNum.destiny.baseDigit]) : null;

  const surnameNum = nameNum?.surnameVibration;
  const surnameData = surnameNum ? (SURNAME_VIBRATION_DATA[surnameNum.number] || SURNAME_VIBRATION_DATA[surnameNum.baseDigit]) : null;

  const firstNameNum = nameNum?.firstNameVibration;
  const firstNameData = firstNameNum ? (FIRST_NAME_VIBRATION_DATA[firstNameNum.number] || FIRST_NAME_VIBRATION_DATA[firstNameNum.baseDigit]) : null;

  const maturityNum = nameNum ? calculateMaturityNumber(lp.number, nameNum.destiny.number) : null;
  const maturityData = maturityNum ? (MATURITY_DATA[maturityNum.number] || MATURITY_DATA[maturityNum.baseDigit]) : null;

  const balanceNum = nameNum?.balance;
  const balanceData = balanceNum ? BALANCE_DATA[balanceNum.number] : null;

  const rationalThought = nameNum ? calculateRationalThoughtNumber(nameNum.firstNameStr, bday.day) : null;
  const rationalData = rationalThought ? (RATIONAL_THOUGHT_DATA[rationalThought.number] || RATIONAL_THOUGHT_DATA[rationalThought.baseDigit]) : null;

  const frequencies = nameNum ? calculateNameFrequencies(nameNum.fullName) : null;
  const hiddenPassionNum = frequencies?.hiddenPassion?.[0] || null;
  const hiddenPassionData = hiddenPassionNum ? HIDDEN_PASSION_DATA[hiddenPassionNum] : null;
  const karmicLessons = frequencies?.karmicLessons || [];

  const pMonth = calculatePersonalMonth(py, 11);
  const subVib = lp.subVibration;
  const subData = subVib ? (SUBVIBRATION_DATA[subVib.rawSum] || null) : null;

  const indivTooltip = (item, valStr, meaningStr) =>
    createTooltipHtml(item, valStr, meaningStr, { personName, isRelationship: false });

  return `
    <div class="num-indiv-card">
      <div class="num-tag-row">
        <span class="num-card-tag" style="background:rgba(201,168,76,0.12);color:var(--champagne);border:1px solid rgba(201,168,76,0.3);padding:0.2rem 0.65rem;border-radius:9999px;">
          ✦ PROFIL INDYWIDUALNY
        </span>
        <span class="num-badge" style="margin-bottom:0;background:rgba(201,168,76,0.15);border-color:var(--gold);">${elem.symbol} ${elem.name}</span>
      </div>
      <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:1.35rem;color:var(--ivory);margin:0.25rem 0 0.35rem;">
        ${personName}
      </h3>
      <div style="font-size:0.78rem;color:var(--slate);margin-bottom:0.85rem;font-family:'JetBrains Mono',monospace;">
        Data narodzin: <span style="color:var(--champagne);">${birthDate}</span>
      </div>

      <table class="num-indiv-table">
        <tbody>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Droga Życia <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.lifePath, `Liczba ${lp.number} (${lpData.title})`, `Dla ${personName} wyszła Droga Życia ${lp.number} (${subVib ? subVib.str : ''}). Styl w miłości: ${lpData.relationalStyle}`)}
              </span>
            </td>
            <td><span style="color:var(--gold);font-weight:700;">Liczba ${lp.number}</span> <span style="font-size:0.75rem;color:var(--champagne);">(${subVib ? subVib.str : ''})</span></td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Podwibracja (Lobos) <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.subVibration, subVib ? `Podwibracja ${subVib.str}` : '—', subData ? `${subData.name}: ${subData.essence}` : `Suma składowa daty urodzenia: ${subVib ? subVib.str : ''}`)}
              </span>
            </td>
            <td><span style="color:var(--gold);font-weight:700;">${subVib ? subVib.str : '—'}</span> <span style="font-size:0.74rem;color:var(--champagne);">(${subData ? subData.name.split('(')[0].trim() : ''})</span></td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Wibracja Nazwiska <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.surnameVibration, surnameNum ? `Liczba ${surnameNum.number} (${surnameData ? surnameData.archetype : ''})` : '—', surnameData ? `Dziedzictwo rodowe: ${surnameData.impact}` : 'Wpisz nazwisko, aby poznać wibrację rodu.')}
              </span>
            </td>
            <td>${surnameNum ? `<span style="color:var(--gold);font-weight:700;">Liczba ${surnameNum.number}</span> <span style="font-size:0.74rem;color:var(--champagne);">(${surnameData ? surnameData.archetype.split('&')[0].trim() : ''})</span>` : '<span style="color:var(--slate);font-size:0.75rem;">Brak nazwiska</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Liczba Duszy (Serce) <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.soulUrge, nameNum ? `Liczba ${nameNum.soul.number}` : '—', nameNum ? `Pragnienie Serca: ${soulData ? soulData.title : ''}. ${soulData ? soulData.desire : ''}` : 'Wyliczana z samogłosek imienia i nazwiska.')}
              </span>
            </td>
            <td>${nameNum ? `<span style="color:var(--gold);font-weight:700;">Liczba ${nameNum.soul.number}</span>` : '<span style="color:var(--slate);font-size:0.75rem;">Brak</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Liczba Osobowości <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.personalityNumber, nameNum ? `Liczba ${nameNum.personality.number}` : '—', nameNum ? `Styl ekspresji i pancerz ego: ${persData ? persData.mask : ''}` : 'Wyliczana ze spółgłosek imienia i nazwiska.')}
              </span>
            </td>
            <td>${nameNum ? `<span style="color:var(--gold);font-weight:700;">Liczba ${nameNum.personality.number}</span>` : '<span style="color:var(--slate);font-size:0.75rem;">Brak</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Liczba Ekspresji <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.destinyNumber, nameNum ? `Liczba ${nameNum.destiny.number}` : '—', nameNum ? `Rola życiowa: ${destData ? destData.role : ''}. Misja: ${destData ? destData.mission : ''}` : 'Wyliczana z pełnej sumy liter.')}
              </span>
            </td>
            <td>${nameNum ? `<span style="color:var(--gold);font-weight:700;">Liczba ${nameNum.destiny.number}</span>` : '<span style="color:var(--slate);font-size:0.75rem;">Brak</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Liczba Dojrzałości <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.maturityNumber, maturityNum ? `Liczba ${maturityNum.number}` : '—', maturityData ? `Cel po 35. roku życia: ${maturityData.goal}. ${maturityData.style}` : 'Synteza Drogi Życia i Ekspresji.')}
              </span>
            </td>
            <td>${maturityNum ? `<span style="color:var(--gold);font-weight:700;">Liczba ${maturityNum.number}</span> <span style="font-size:0.74rem;color:var(--champagne);">(${maturityData ? maturityData.goal.split(' ')[0] : ''})</span>` : '<span style="color:var(--slate);font-size:0.75rem;">Brak</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Liczba Równowagi <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.balanceNumber, balanceNum ? `Liczba ${balanceNum.number}` : '—', balanceData ? `Reakcja w kryzysie: ${balanceData.reaction}. ${balanceData.advice}` : 'Wyliczana z inicjałów.')}
              </span>
            </td>
            <td>${balanceNum ? `<span style="color:var(--champagne);">Liczba ${balanceNum.number}</span> <span style="font-size:0.74rem;color:var(--slate);">(${balanceData ? balanceData.reaction.split(' ')[0] : ''})</span>` : '<span style="color:var(--slate);font-size:0.75rem;">Brak</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Wibracja Imienia <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.firstNameVibration, firstNameNum ? `Liczba ${firstNameNum.number}` : '—', firstNameData ? `Dźwięk wołania: ${firstNameData.spark}. ${firstNameData.tone}` : 'Wibracja pierwszego imienia.')}
              </span>
            </td>
            <td>${firstNameNum ? `<span style="color:var(--champagne);">Liczba ${firstNameNum.number}</span>` : '<span style="color:var(--slate);font-size:0.75rem;">Brak</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Myślenie Racjonalne <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.rationalThought, rationalThought ? `Liczba ${rationalThought.number} (${rationalData ? rationalData.style : ''})` : '—', rationalData ? `Styl logiczny w sporze: ${rationalData.mind}` : 'Wyliczana z imienia i dnia narodzin.')}
              </span>
            </td>
            <td>${rationalThought ? `<span style="color:var(--gold);font-weight:700;">Liczba ${rationalThought.number}</span> <span style="font-size:0.74rem;color:var(--champagne);">(${rationalData ? rationalData.style.split(' ')[0] : ''})</span>` : '<span style="color:var(--slate);font-size:0.75rem;">Brak</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Ukryta Pasja <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.hiddenPassion, hiddenPassionNum ? `Liczba ${hiddenPassionNum} (${hiddenPassionData ? hiddenPassionData.passion : ''})` : '—', hiddenPassionData ? `Wewnętrzny motor: ${hiddenPassionData.drive}` : 'Dominująca cyfra w imieniu.')}
              </span>
            </td>
            <td>${hiddenPassionNum ? `<span style="color:var(--gold);font-weight:700;">Liczba ${hiddenPassionNum}</span> <span style="font-size:0.74rem;color:var(--slate);">(${hiddenPassionData ? hiddenPassionData.passion.split('&')[0].trim() : ''})</span>` : '<span style="color:var(--slate);font-size:0.75rem;">Brak</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Lekcje Karmiczne <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.karmicLessons, karmicLessons.length ? `Brakujące cyfry: ${karmicLessons.join(', ')}` : 'Pełny Zestaw (Brak luk)', karmicLessons.length ? `Ślepe plamy do integracji: ${karmicLessons.map(k=>KARMIC_LESSONS_DATA[k]?.missing || k).join(', ')}` : 'Wszystkie cyfry od 1 do 9 są obecne w Twoim imieniu.')}
              </span>
            </td>
            <td>${karmicLessons.length ? `<span style="color:#FB7185;font-weight:700;">Brak ${karmicLessons.join(', ')}</span>` : '<span style="color:var(--gold);">Pełna Matryca</span>'}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Dzień Narodzin <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.birthdayNumber, `Dzień ${bday.day} (${bday.number})`, `Wrodzony talent komunikacyjny: ${bday.talent}`)}
              </span>
            </td>
            <td>Dzień ${bday.day} <span style="color:var(--champagne);font-size:0.78rem;">(${bday.number})</span></td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Rok Osobisty 2026 <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.personalYear, `Rok ${py}`, `W 2026 roku faza: ${PERSONAL_YEAR_INTERPRETATIONS[py]}`)}
              </span>
            </td>
            <td><span style="color:var(--champagne);">Rok ${py}</span></td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Miesiąc Osobisty <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.personalYear, `Miesiąc ${pMonth} (Listopad 2026)`, `Bieżące tempo i nastrój relacji w tym miesiącu: Wibracja ${pMonth}.`)}
              </span>
            </td>
            <td><span style="color:var(--champagne);">Miesiąc ${pMonth} (XI)</span></td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Żywioł Wibracji <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.elementResonance, `${elem.name} (${elem.symbol})`, `Temperament żywiołu: ${elem.trait}`)}
              </span>
            </td>
            <td>${elem.symbol} ${elem.name}</td>
          </tr>
          <tr>
            <td>
              <span class="num-asp-badge" tabindex="0">
                Długi Karmiczne <span class="num-info-pill">ℹ️</span>
                ${indivTooltip(NUMEROLOGY_GLOSSARY.karmicDebts, debts.length ? debts.map(d=>d.code).join(', ') : 'Brak', debts.length ? `Wykryto obciążenia: ${debts.map(d=>d.name).join(', ')}` : 'Czysta Karta Karmiczna.')}
              </span>
            </td>
            <td>${debts.length ? `<span style="color:#FB7185;">${debts.map(d=>d.code).join(', ')}</span>` : '<span style="color:var(--gold);">Czysta Karta</span>'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

export function buildNumerologyReportHtml(d1, d2, name1, name2, unlocked = false) {
  const lp1 = calculateLifePath(d1);
  const lp2 = calculateLifePath(d2);
  const vib = calculateRelationshipVibration(lp1, lp2);
  const bridge = calculateBridgeNumber(lp1, lp2);
  const scores = calculateHarmonyScores(lp1, lp2);
  const bday1 = calculateBirthdayNumber(d1);
  const bday2 = calculateBirthdayNumber(d2);
  const elem1 = getNumerologyElement(lp1.number);
  const elem2 = getNumerologyElement(lp2.number);
  const py1 = calculatePersonalYear(d1, 2026);
  const py2 = calculatePersonalYear(d2, 2026);
  const debts1 = detectKarmicDebts(d1);
  const debts2 = detectKarmicDebts(d2);
  const challenge = calculateChallengeNumber(d1, d2);
  const nameNum1 = calculateNameNumerology(name1);
  const nameNum2 = calculateNameNumerology(name2);
  const maturity1 = nameNum1 ? calculateMaturityNumber(lp1.number, nameNum1.destiny.number) : null;
  const maturity2 = nameNum2 ? calculateMaturityNumber(lp2.number, nameNum2.destiny.number) : null;
  const rational1 = nameNum1 ? calculateRationalThoughtNumber(nameNum1.firstNameStr, bday1.day) : null;
  const rational2 = nameNum2 ? calculateRationalThoughtNumber(nameNum2.firstNameStr, bday2.day) : null;

  const lp1Data = LIFE_PATH_DATA[lp1.number] || LIFE_PATH_DATA[lp1.baseDigit];
  const lp2Data = LIFE_PATH_DATA[lp2.number] || LIFE_PATH_DATA[lp2.baseDigit];
  const vibData = RELATIONSHIP_VIBRATIONS[vib.number] || RELATIONSHIP_VIBRATIONS[vib.baseDigit];
  const bridgeData = BRIDGE_NUMBER_DATA[bridge.number] || BRIDGE_NUMBER_DATA[0];
  const verdict = calculateMasterVerdict(name1, name2, lp1, lp2, vib, bridge, scores, debts1, debts2);

  const checkoutUrl = `https://buy.stripe.com/dRm28k8iRbUb4K2fT4cwg00?client_reference_id=num_${lp1.number}_${lp2.number}`;

  return `
    <!-- SEKCJA 1: OBLICZENIA INDYWIDUALNE DWÓCH OSÓB (PRZED ANALIZĄ ZWIĄZKOWĄ) -->
    <div style="margin-bottom: 2.75rem;">
      <div style="text-align:center;margin-bottom:1.5rem;">
        <span class="num-badge-gold" style="letter-spacing:0.18em;font-size:0.74rem;padding:0.35rem 0.95rem;">
          CZĘŚĆ 1 • OBLICZENIA INDYWIDUALNE
        </span>
        <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:1.85rem;color:var(--ivory);margin:0.55rem 0 0.35rem;">
          Osobiste Profile Psychologiczne: ${name1} & ${name2}
        </h2>
        <p style="font-size:0.88rem;color:rgba(250,248,245,0.76);max-width:680px;margin:0 auto;line-height:1.6;">
          Poniższe wskaźniki wynikają <strong>wyłącznie z osobistej daty urodzenia i imienia danej osoby</strong>, niezależnie od obecności partnera. Reprezentują niezmienny kod tożsamości, temperament, podwibrację i lekcje życiowe, z jakimi wchodzicie w relację.
        </p>
      </div>

      <div class="num-grid-2">
        ${renderIndividualTable(name1, d1, lp1, bday1, elem1, py1, debts1, nameNum1, lp1Data)}
        ${renderIndividualTable(name2, d2, lp2, bday2, elem2, py2, debts2, nameNum2, lp2Data)}
      </div>
    </div>

    <!-- SEKCJA 2: OBLICZENIA ZWIĄZKOWE I KOMPOZYTOWE -->
    <div style="text-align:center;margin: 2.75rem 0 1.5rem;">
      <span class="num-badge-gold" style="letter-spacing:0.18em;font-size:0.74rem;padding:0.35rem 0.95rem;background:rgba(201,168,76,0.22);border-color:var(--gold);">
        CZĘŚĆ 2 • OBLICZENIA ZWIĄZKOWE & KOMPOZYT
      </span>
      <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:1.85rem;color:var(--ivory);margin:0.55rem 0 0.35rem;">
        Wspólna Dynamika Relacyjna: ${name1} + ${name2}
      </h2>
      <p style="font-size:0.88rem;color:rgba(250,248,245,0.76);max-width:680px;margin:0 auto;line-height:1.6;">
        W tym miejscu Wasze osobiste kody łączą się w <strong>Wibrację Związku</strong>. Poniższe wskaźniki istnieją <em>wyłącznie w tej parze</em> – badają synergię, kod porozumienia w kryzysie oraz zderzenie żywiołów.
      </p>
    </div>

    <!-- MASTER VERDICT (SYNASTRY STANDARD) -->
    <div class="num-verdict-card">
      <div class="num-verdict-badge">✦ SYNTEZA ZWIĄZKOWA • MASTER VERDICT</div>
      <h2 class="num-verdict-title">${verdict.title}</h2>
      <p class="num-verdict-text">${verdict.summary}</p>
      <div class="num-badge-wrap" style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.25rem;">
        <span class="num-badge" style="border-color:rgba(201,168,76,0.35);"><strong style="color:var(--gold);">Indywidualnie:</strong> ${name1} • Droga ${lp1.number} (${lp1.subVibration ? lp1.subVibration.str : lp1.number} · ${elem1.name} ${elem1.symbol})</span>
        <span class="num-badge" style="border-color:rgba(201,168,76,0.35);"><strong style="color:var(--gold);">Indywidualnie:</strong> ${name2} • Droga ${lp2.number} (${lp2.subVibration ? lp2.subVibration.str : lp2.number} · ${elem2.name} ${elem2.symbol})</span>
        <span class="num-badge" style="background:rgba(201,168,76,0.22);border-color:var(--gold);"><strong style="color:var(--champagne);">Związkowo:</strong> Wibracja Związku ${vib.number} (${vib.subVibrationStr || vib.number})</span>
      </div>
    </div>

    <!-- 4 WSKAŹNIKI HARMONII I POLARYZACJI Z POP-UPAMI -->
    <div class="num-card num-mt">
      <div class="num-tag-row">
        <span class="num-card-tag">WSKAŹNIKI ZWIĄZKOWE • REZONANS I DYNAMIKA RELACJI</span>
        <span class="num-asp-badge" tabindex="0">
          <span class="num-info-pill">ℹ️ JAK CZYTAĆ</span>
          ${createTooltipHtml(NUMEROLOGY_GLOSSARY.relationshipVibration, `Wibracja Związku: Liczba ${vib.number}`, `W tym miejscu wyszła Wam Wibracja ${vib.number} (${vibData.name}), co oznacza wspólną misję: ${vibData.mission}`, { isRelationship: true })}
        </span>
      </div>
      <div class="num-score-header">
        <span style="font-size:0.95rem;font-weight:600;color:var(--ivory);">Ogólny Indeks Rezonansu Partnerskiego</span>
        <span class="num-score-val" style="font-size:1.35rem;font-weight:700;color:var(--gold);">${scores.overall}%</span>
      </div>
      <div class="num-bar-bg"><div class="num-bar-fill" style="width: ${scores.overall}%"></div></div>

      <div class="num-grid-2" style="margin-top:1.5rem;gap:1rem;">
        <div class="num-stat-box num-has-tooltip" tabindex="0" style="padding:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem;">
          <div class="num-tag-row">
            <span style="font-size:0.8rem;color:var(--champagne);">Zmysłowość & Przyciąganie</span>
            <span class="num-info-pill">ℹ️</span>
          </div>
          <div style="font-size:1.25rem;font-weight:700;color:var(--ivory);">${scores.emotional}%</div>
          <div style="font-size:0.76rem;color:rgba(250,248,245,0.65);margin-top:0.25rem;">Polaryzacja pierwiastków Yin/Yang</div>
          ${createTooltipHtml(NUMEROLOGY_GLOSSARY.elementResonance, `Zderzenie żywiołów: ${elem1.name} (${elem1.symbol}) i ${elem2.name} (${elem2.symbol})`, `W tym miejscu wyszła Wam zmysłowość ${scores.emotional}%, co oznacza ${elem1.name === elem2.name ? 'organiczną i kojącą zgodność potrzeb cielesnych.' : 'silny, iskrzący magnetyzm i erotyczne napięcie.'}`, { isRelationship: true })}
        </div>

        <div class="num-stat-box num-has-tooltip" tabindex="0" style="padding:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem;">
          <div class="num-tag-row">
            <span style="font-size:0.8rem;color:var(--champagne);">Stabilność & Trwałość</span>
            <span class="num-info-pill">ℹ️</span>
          </div>
          <div style="font-size:1.25rem;font-weight:700;color:var(--ivory);">${scores.stability}%</div>
          <div style="font-size:0.76rem;color:rgba(250,248,245,0.65);margin-top:0.25rem;">Fundament długoterminowego azylu</div>
          ${createTooltipHtml(NUMEROLOGY_GLOSSARY.relationshipVibration, `Stabilność fundamentu: ${scores.stability}%`, `W tym miejscu wyszła Wam stabilność ${scores.stability}%, co oznacza siłę przetrwania trudnych momentów w oparciu o Wibrację ${vib.number}.`, { isRelationship: true })}
        </div>

        <div class="num-stat-box num-has-tooltip" tabindex="0" style="padding:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem;">
          <div class="num-tag-row">
            <span style="font-size:0.8rem;color:var(--champagne);">Most Porozumienia w Kłótni</span>
            <span class="num-info-pill">ℹ️</span>
          </div>
          <div style="font-size:1.25rem;font-weight:700;color:var(--ivory);">Most ${bridge.number} (${100 - bridge.number * 8}%)</div>
          <div style="font-size:0.76rem;color:rgba(250,248,245,0.65);margin-top:0.25rem;">Łatwość wygaszania cichych dni</div>
          ${createTooltipHtml(NUMEROLOGY_GLOSSARY.bridgeNumber, `Liczba Mostu ${bridge.number}`, `W tym miejscu wyszła Wam Liczba Mostu ${bridge.number}, co oznacza, że Waszym kluczem do zażegnania kryzysu jest: ${bridgeData.lesson}. Słowo-klucz: „${bridgeData.secretWord}”.`, { isRelationship: true })}
        </div>

        <div class="num-stat-box num-has-tooltip" tabindex="0" style="padding:1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem;">
          <div class="num-tag-row">
            <span style="font-size:0.8rem;color:var(--champagne);">Napięcie Dynamiczne & Ego</span>
            <span class="num-info-pill">ℹ️</span>
          </div>
          <div style="font-size:1.25rem;font-weight:700;color:var(--ivory);">${scores.friction}%</div>
          <div style="font-size:0.76rem;color:rgba(250,248,245,0.65);margin-top:0.25rem;">Ryzyko walki o dominację i rację</div>
          ${createTooltipHtml(NUMEROLOGY_GLOSSARY.challengeNumber, `Wyzwanie relacyjne: Liczba ${challenge}`, `W tym miejscu wyszło Wam napięcie na poziomie ${scores.friction}%, co oznacza, że punktem drażliwym przy zmęczeniu jest niecierpliwość i chęć forsowania swojego zdania.`, { isRelationship: true })}
        </div>
      </div>
    </div>

    <!-- TABELA PORÓWNAWCZA WSKAŹNIKÓW (SYNASTRY DOSSIER STANDARD) -->
    <div class="num-card num-mt">
      <div class="num-tag-row">
        <span class="num-card-tag">DOSSIER PORÓWNAWCZE: WSKAŹNIKI INDYWIDUALNE VS SYNTEZA ZWIĄZKOWA</span>
        <span class="num-badge" style="margin-bottom:0;">KLIKNIJ DOWOLNY PUNKT DLA DEFINICJI</span>
      </div>
      <div class="num-table-wrap">
        <table class="num-table">
          <thead>
            <tr>
              <th>Typ & Wskaźnik</th>
              <th>${name1} (Indywidualnie)</th>
              <th>${name2} (Indywidualnie)</th>
              <th>Wypadkowa w Waszym Związku</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">1</span> <strong>Droga Życia</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.lifePath, `Drogi ${lp1.number} i ${lp2.number}`, `W tym miejscu wyszło połączenie Dróg ${lp1.number} (${lp1Data.archetype.split(',')[0]}) oraz ${lp2.number} (${lp2Data.archetype.split(',')[0]}).`, { isRelationship: true })}
                </span>
              </td>
              <td><span style="color:var(--gold);font-weight:700;">Liczba ${lp1.number}</span> (${lp1Data.archetype.split(',')[0]})</td>
              <td><span style="color:var(--gold);font-weight:700;">Liczba ${lp2.number}</span> (${lp2Data.archetype.split(',')[0]})</td>
              <td>W tym miejscu wyszło połączenie Dróg ${lp1.number} i ${lp2.number}, co oznacza sojusz: ${lp1Data.archetype.split(',')[0]} + ${lp2Data.archetype.split(',')[0]}</td>
            </tr>
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">✦</span> <strong>Podwibracja (Lobos)</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.subVibration, `${lp1.subVibration ? lp1.subVibration.str : lp1.number} & ${lp2.subVibration ? lp2.subVibration.str : lp2.number}`, `Dla ${name1} wyszła podwibracja ${lp1.subVibration ? lp1.subVibration.str : ''} (${SUBVIBRATION_DATA[lp1.subVibration?.rawSum]?.name || ''}), a dla ${name2}: ${lp2.subVibration ? lp2.subVibration.str : ''} (${SUBVIBRATION_DATA[lp2.subVibration?.rawSum]?.name || ''}).`, { isRelationship: true })}
                </span>
              </td>
              <td><span style="color:var(--gold);font-weight:700;">${lp1.subVibration ? lp1.subVibration.str : lp1.number}</span> <span style="font-size:0.74rem;color:var(--champagne);">(${SUBVIBRATION_DATA[lp1.subVibration?.rawSum]?.name.split('(')[0].trim() || ''})</span></td>
              <td><span style="color:var(--gold);font-weight:700;">${lp2.subVibration ? lp2.subVibration.str : lp2.number}</span> <span style="font-size:0.74rem;color:var(--champagne);">(${SUBVIBRATION_DATA[lp2.subVibration?.rawSum]?.name.split('(')[0].trim() || ''})</span></td>
              <td>W tym miejscu spotykają się podwibracje ${lp1.subVibration ? lp1.subVibration.str : ''} i ${lp2.subVibration ? lp2.subVibration.str : ''}, określające specyficzny odcień realizacji Dróg Życia</td>
            </tr>
            ${nameNum1?.surnameVibration && nameNum2?.surnameVibration ? `
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">2</span> <strong>Wibracja Nazwiska</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.surnameVibration, `Rody ${nameNum1.surnameVibration.number} i ${nameNum2.surnameVibration.number}`, `Zderzenie modeli domów rodzinnych obu stron`, { isRelationship: true })}
                </span>
              </td>
              <td><span style="color:var(--gold);font-weight:700;">Liczba ${nameNum1.surnameVibration.number}</span></td>
              <td><span style="color:var(--gold);font-weight:700;">Liczba ${nameNum2.surnameVibration.number}</span></td>
              <td>W tym miejscu zderzają się nieświadome wzorce wyniesione z domów rodzinnych obu stron</td>
            </tr>
            ` : ''}
            ${nameNum1 && nameNum2 ? `
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">${nameNum1.surnameVibration && nameNum2.surnameVibration ? '3' : '2'}</span> <strong>Liczba Duszy (Serce)</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.soulUrge, `Dusze ${nameNum1.soul.number} i ${nameNum2.soul.number}`, `Zderzenie intymnych tęsknot: ${SOUL_URGE_DATA[nameNum1.soul.number]?.title || ''} oraz ${SOUL_URGE_DATA[nameNum2.soul.number]?.title || ''}`, { isRelationship: true })}
                </span>
              </td>
              <td><span style="color:var(--gold);font-weight:700;">Liczba ${nameNum1.soul.number}</span></td>
              <td><span style="color:var(--gold);font-weight:700;">Liczba ${nameNum2.soul.number}</span></td>
              <td>W tym miejscu spotykają się pragnienia serca: ${SOUL_URGE_DATA[nameNum1.soul.number]?.title.split('&')[0].trim() || ''} + ${SOUL_URGE_DATA[nameNum2.soul.number]?.title.split('&')[0].trim() || ''}</td>
            </tr>
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">${nameNum1.surnameVibration && nameNum2.surnameVibration ? '4' : '3'}</span> <strong>Liczba Osobowości</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.personalityNumber, `Osobowości ${nameNum1.personality.number} i ${nameNum2.personality.number}`, `Maski obronne i pierwsze wrażenie: Liczba ${nameNum1.personality.number} i Liczba ${nameNum2.personality.number}`, { isRelationship: true })}
                </span>
              </td>
              <td>Liczba ${nameNum1.personality.number}</td>
              <td>Liczba ${nameNum2.personality.number}</td>
              <td>W tym miejscu zderzają się aury społeczne obu stron</td>
            </tr>
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">${nameNum1.surnameVibration && nameNum2.surnameVibration ? '5' : '4'}</span> <strong>Liczba Ekspresji</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.destinyNumber, `Ekspresje ${nameNum1.destiny.number} i ${nameNum2.destiny.number}`, `Wspólny wektor życiowy: ${DESTINY_DATA[nameNum1.destiny.number]?.role || ''} + ${DESTINY_DATA[nameNum2.destiny.number]?.role || ''}`, { isRelationship: true })}
                </span>
              </td>
              <td><span style="color:var(--champagne);">Liczba ${nameNum1.destiny.number}</span></td>
              <td><span style="color:var(--champagne);">Liczba ${nameNum2.destiny.number}</span></td>
              <td>W tym miejscu łączy się potencjał: ${DESTINY_DATA[nameNum1.destiny.number]?.role.split('&')[0].trim() || ''} + ${DESTINY_DATA[nameNum2.destiny.number]?.role.split('&')[0].trim() || ''}</td>
            </tr>
            ${maturity1 && maturity2 ? `
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">${nameNum1.surnameVibration && nameNum2.surnameVibration ? '6' : '5'}</span> <strong>Liczba Dojrzałości</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.maturityNumber, `Dojrzałość ${maturity1.number} i ${maturity2.number}`, `Kierunek ewolucji w wieku 35+`, { isRelationship: true })}
                </span>
              </td>
              <td><span style="color:var(--gold);font-weight:700;">Liczba ${maturity1.number}</span></td>
              <td><span style="color:var(--gold);font-weight:700;">Liczba ${maturity2.number}</span></td>
              <td>W tym miejscu kształtuje się Wasz dojrzały sojusz po 35. roku życia</td>
            </tr>
            ` : ''}
            ${rational1 && rational2 ? `
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">✦</span> <strong>Myślenie Racjonalne</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.rationalThought, `Style: ${rational1.number} i ${rational2.number}`, `Zderzenie logiki w trudnych sytuacjach: ${RATIONAL_THOUGHT_DATA[rational1.number]?.style || ''} i ${RATIONAL_THOUGHT_DATA[rational2.number]?.style || ''}`, { isRelationship: true })}
                </span>
              </td>
              <td>Liczba ${rational1.number}</td>
              <td>Liczba ${rational2.number}</td>
              <td>W tym miejscu spotykają się Wasze style myślenia w sporze: ${RATIONAL_THOUGHT_DATA[rational1.number]?.style.split(' ')[0] || ''} + ${RATIONAL_THOUGHT_DATA[rational2.number]?.style.split(' ')[0] || ''}</td>
            </tr>
            ` : ''}
            ` : ''}
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">${nameNum1 && nameNum2 ? '5' : '2'}</span> <strong>Dzień Narodzin</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.birthdayNumber, `Dni ${bday1.day} i ${bday2.day}`, `W tym miejscu dla ${name1} wyszedł wrodzony dar: ${bday1.talent}, a dla ${name2}: ${bday2.talent}.`, { isRelationship: true })}
                </span>
              </td>
              <td>Dzień ${bday1.day} (Wibracja ${bday1.number})</td>
              <td>Dzień ${bday2.day} (Wibracja ${bday2.number})</td>
              <td>W tym miejscu wyszły talenty: ${bday1.talent.split(',')[0]} oraz ${bday2.talent.split(',')[0]}</td>
            </tr>
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">${nameNum1 && nameNum2 ? '6' : '3'}</span> <strong>Rok Osobisty 2026</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.personalYear, `Rok ${py1} dla ${name1} i Rok ${py2} dla ${name2}`, `W tym miejscu ${name1} przechodzi fazę: ${PERSONAL_YEAR_INTERPRETATIONS[py1]}, a ${name2}: ${PERSONAL_YEAR_INTERPRETATIONS[py2]}.`, { isRelationship: true })}
                </span>
              </td>
              <td><span style="color:var(--champagne);">Rok ${py1}</span></td>
              <td><span style="color:var(--champagne);">Rok ${py2}</span></td>
              <td>W tym miejscu wyszła asymetria: ${Math.abs(py1 - py2)} lat różnicy fazy w 9-letnim cyklu ewolucyjnym</td>
            </tr>
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">${nameNum1 && nameNum2 ? '7' : '4'}</span> <strong>Żywioł Wibracji</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.elementResonance, `Zderzenie żywiołów: ${elem1.name} i ${elem2.name}`, `W tym miejscu spotykają się ${elem1.trait} i ${elem2.trait}.`, { isRelationship: true })}
                </span>
              </td>
              <td>${elem1.symbol} ${elem1.name}</td>
              <td>${elem2.symbol} ${elem2.name}</td>
              <td>W tym miejscu wyszło zderzenie ${elem1.name} + ${elem2.name}, co oznacza ${elem1.name === elem2.name ? 'organiczną zgodność temperamentów' : 'silną, namiętną polaryzację zmysłów'}</td>
            </tr>
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-indiv">Indywidualny</span> <span class="num-badge-num">${nameNum1 && nameNum2 ? '8' : '5'}</span> <strong>Długi Karmiczne</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.karmicDebts, `${(debts1.length || debts2.length) ? 'długi ' + debts1.concat(debts2).map(d=>d.code).join(', ') : 'Czysta Karta Karmiczna'}`, `${(debts1.length || debts2.length) ? 'W tym miejscu ujawniły się obciążenia karmiczne, co oznacza konkretne lekcje do uzdrowienia.' : 'W tym miejscu wyszedł brak dawnych obciążeń, co oznacza czystą przestrzeń relacji.'}`, { isRelationship: true })}
                </span>
              </td>
              <td>${debts1.length ? debts1.map(d=>d.code).join(', ') : 'Czysta Karta'}</td>
              <td>${debts2.length ? debts2.map(d=>d.code).join(', ') : 'Czysta Karta'}</td>
              <td>${(debts1.length || debts2.length) ? `W tym miejscu wyszły długi ${debts1.concat(debts2).map(d=>d.code).join(', ')}, co oznacza lekcje do uzdrowienia` : 'W tym miejscu wyszła Czysta Karta, co oznacza brak dawnych obciążeń karmicznych'}</td>
            </tr>
            <tr>
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-rel">Związkowy</span> <span class="num-badge-num">✦</span> <strong>Wyzwanie Relacji</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.challengeNumber, `Liczba Wyzwania: ${challenge}`, `W tym miejscu wyszła Wam liczba ${challenge}, co oznacza punkt drażliwy przy zmęczeniu i pośpiechu.`, { isRelationship: true })}
                </span>
              </td>
              <td colspan="2" style="text-align:center;"><span style="color:var(--gold);font-weight:700;">Wynik: Liczba ${challenge}</span></td>
              <td>W tym miejscu wyszła Wam liczba ${challenge}, co oznacza podświadomy punkt drażliwy przy zmęczeniu</td>
            </tr>
            <tr style="background:rgba(201,168,76,0.06);">
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-rel">Związkowy</span> <span class="num-badge-num">★</span> <strong>Wibracja Związku (Kompozyt)</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.relationshipVibration, `Wibracja Związku: Liczba ${vib.number} (${vib.subVibrationStr || vib.number})`, `W tym miejscu wyszła Wam Wibracja ${vib.number} (${vibData.name}), co oznacza wspólną misję: ${vibData.mission}`, { isRelationship: true })}
                </span>
              </td>
              <td colspan="2" style="text-align:center;"><span style="color:var(--gold);font-weight:700;">Wibracja ${vib.number} (${vib.subVibrationStr || vib.number})</span> <span style="font-size:0.75rem;color:var(--champagne);">– ${vibData.name}</span></td>
              <td>Wspólna misja pary: ${vibData.mission}</td>
            </tr>
            <tr style="background:rgba(201,168,76,0.06);">
              <td>
                <span class="num-asp-badge" tabindex="0">
                  <span class="num-pill-scope-rel">Związkowy</span> <span class="num-badge-num">★</span> <strong>Most Porozumienia (Kryzys)</strong> <span class="num-info-pill">ℹ️</span>
                  ${createTooltipHtml(NUMEROLOGY_GLOSSARY.bridgeNumber, `Liczba Mostu: ${bridge.number}`, `W tym miejscu wyszła Wam Liczba Mostu ${bridge.number}, co oznacza, że Waszym kluczem do zażegnania kryzysu jest: ${bridgeData.lesson}. Słowo-klucz: „${bridgeData.secretWord}”.`, { isRelationship: true })}
                </span>
              </td>
              <td colspan="2" style="text-align:center;"><span style="color:var(--gold);font-weight:700;">Most ${bridge.number}</span> <span style="font-size:0.75rem;color:var(--champagne);">(„${bridgeData.secretWord}”)</span></td>
              <td>Klucz do porozumienia w kłótni: ${bridgeData.lesson}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- KARTY DRÓG ŻYCIA (ARCHETYPY INDYWIDUALNE W RELACJI) -->
    <div class="num-grid-2 num-mt">
      <div class="num-card">
        <div class="num-tag-row">
          <span class="num-card-tag">PROFIL INDYWIDUALNY • ${name1.toUpperCase()} (DROGA ${lp1.number})</span>
          <span class="num-asp-badge" tabindex="0">
            <span class="num-info-pill">ℹ️ ZNACZENIE</span>
            ${createTooltipHtml(NUMEROLOGY_GLOSSARY.lifePath, `Droga Życia ${lp1.number}`, `Dla ${name1} wyszła Droga ${lp1.number} (${lp1Data.title}), co oznacza rdzeń tożsamości: ${lp1Data.archetype}. Styl w miłości: ${lp1Data.relationalStyle}`, { personName: name1, isRelationship: false })}
          </span>
        </div>
        <h3 class="num-h3">${lp1Data.title}</h3>
        <p class="num-p"><strong>Główny Dar:</strong> ${bday1.talent}</p>
        <p class="num-p"><strong>W miłości:</strong> ${lp1Data.relationalStyle}</p>
        <p class="num-p" style="color:var(--champagne);"><strong>Cień / Punkt ślepy:</strong> ${lp1Data.blindSpot}</p>
      </div>

      <div class="num-card">
        <div class="num-tag-row">
          <span class="num-card-tag">PROFIL INDYWIDUALNY • ${name2.toUpperCase()} (DROGA ${lp2.number})</span>
          <span class="num-asp-badge" tabindex="0">
            <span class="num-info-pill">ℹ️ ZNACZENIE</span>
            ${createTooltipHtml(NUMEROLOGY_GLOSSARY.lifePath, `Droga Życia ${lp2.number}`, `Dla ${name2} wyszła Droga ${lp2.number} (${lp2Data.title}), co oznacza rdzeń tożsamości: ${lp2Data.archetype}. Styl w miłości: ${lp2Data.relationalStyle}`, { personName: name2, isRelationship: false })}
          </span>
        </div>
        <h3 class="num-h3">${lp2Data.title}</h3>
        <p class="num-p"><strong>Główny Dar:</strong> ${bday2.talent}</p>
        <p class="num-p"><strong>W miłości:</strong> ${lp2Data.relationalStyle}</p>
        <p class="num-p" style="color:var(--champagne);"><strong>Cień / Punkt ślepy:</strong> ${lp2Data.blindSpot}</p>
      </div>
    </div>

    <!-- WIBRACJA ZWIĄZKU (TRZECIA ISTOTA) -->
    <div class="num-card num-mt">
      <div class="num-tag-row">
        <span class="num-card-tag">ANALIZA ZWIĄZKOWA • TRZECIA ENCJA (WIBRACJA RELACJI ${vib.number})</span>
        <span class="num-asp-badge" tabindex="0">
          <span class="num-info-pill">ℹ️ ZNACZENIE</span>
          ${createTooltipHtml(NUMEROLOGY_GLOSSARY.relationshipVibration, `liczba ${vib.number} (${vibData.name})`, `W tym miejscu wyszła Wam Wibracja ${vib.number}, co oznacza, że Wasz sojusz ma misję: ${vibData.mission} Duchowy dar relacji to: ${vibData.gift}`, { isRelationship: true })}
        </span>
      </div>
      <h3 class="num-h3" style="color:var(--gold);">${vibData.name}</h3>
      <p class="num-p"><strong>Misja Waszego „My”:</strong> ${vibData.mission}</p>
      <p class="num-p" style="line-height:1.75;">${vibData.summary}</p>
      <div style="margin-top:1rem;padding:0.85rem 1rem;background:rgba(201,168,76,0.08);border-left:3px solid var(--gold);border-radius:0 0.5rem 0.5rem 0;">
        <strong style="color:var(--gold);">Duchowy Dar Tej Relacji:</strong>
        <p style="margin:0.25rem 0 0;font-size:0.88rem;color:rgba(250,248,245,0.9);">${vibData.gift}</p>
      </div>
    </div>

    <!-- MOST POROZUMIENIA (BRIDGE NUMBER) -->
    <div class="num-card num-mt">
      <div class="num-tag-row">
        <span class="num-card-tag">ANALIZA ZWIĄZKOWA • MOST POROZUMIENIA (LICZBA ${bridge.number})</span>
        <span class="num-asp-badge" tabindex="0">
          <span class="num-info-pill">ℹ️ ZNACZENIE</span>
          ${createTooltipHtml(NUMEROLOGY_GLOSSARY.bridgeNumber, `liczba ${bridge.number} (${bridgeData.title})`, `W tym miejscu wyszła Wam Liczba Mostu ${bridge.number}, co oznacza, że Waszym kluczem do zażegnania kryzysu jest: ${bridgeData.lesson}. Słowo-klucz: „${bridgeData.secretWord}”.`, { isRelationship: true })}
        </span>
      </div>
      <h3 class="num-h3">${bridgeData.title}</h3>
      <p class="num-p"><strong>Wspólna Lekcja Ewolucyjna:</strong> ${bridgeData.lesson}</p>
      <p class="num-p"><strong>Rytuał Rozbrajania Kłótni:</strong> ${bridgeData.crisisProtocol}</p>
      <div class="num-gold-quote">
        <strong>Słowo-Klucz Porozumienia:</strong> „${bridgeData.secretWord}”
      </div>
    </div>

    <!-- PŁATNE POGŁĘBIONE DOSSIER (5 MODUŁÓW & PAYWALL CRO) -->
    <div class="num-paywall-wrap num-mt ${unlocked ? 'num-unlocked' : ''}">
      <div class="num-section-header" style="text-align:center;margin:3rem 0 2rem;">
        <div class="num-badge-gold">GŁĘBOKIE DOSSIER PARTNERSKIE • PŁATNY RAPORT ZAAWANSOWANY</div>
        <h2 class="num-h2" style="font-family:'Playfair Display',Georgia,serif;font-size:2rem;margin:0.5rem 0 0.75rem;">5 Psychologicznych Filarów Waszej Relacji</h2>
        <p class="num-lead" style="max-width:650px;margin:0 auto;font-size:0.95rem;color:rgba(250,248,245,0.75);">
          Odkryj ukryte mechanizmy podświadomości, punkty zapalne ego oraz erotyczny kod bliskości.
        </p>
      </div>

      <!-- MODUŁ 1: ANATOMIA CIENIA -->
      <div class="num-card num-mt num-premium-module">
        <div class="num-card-tag">MODUŁ 1 • ANATOMIA CIENIA & ZDERZENIE DRÓG ${lp1.number} I ${lp2.number}</div>
        <h3 class="num-h3">Gdzie Droga ${lp1.number} podświadomie rani Drogę ${lp2.number}</h3>
        <p class="num-p"><strong>Cień ${name1}:</strong> ${lp1Data.blindSpot}</p>
        <p class="num-p"><strong>Cień ${name2}:</strong> ${lp2Data.blindSpot}</p>
        <div class="num-lock-content">
          <p><strong>Mechanizm kryzysu ego:</strong> Gdy zderzają się Wasze cienie, dochodzi do natychmiastowej asymetrii obronnej. Jedno zamyka się w chłodzie, drugie eskaluje napięcie. Prawdziwym zapalnikiem nie są codzienne błędy, lecz lęk przed utratą tożsamości.</p>
        </div>
      </div>

      <!-- MODUŁ 2: PROTOKÓŁ LICZBY MOSTU -->
      <div class="num-card num-mt num-premium-module">
        <div class="num-card-tag">MODUŁ 2 • W TYM MIEJSCU WYSZŁA WAM LICZBA ${bridge.number} (PROTOKÓŁ MOSTU)</div>
        <h3 class="num-h3">${bridgeData.title}</h3>
        <p class="num-p"><strong>Lekcja do odrobienia:</strong> ${bridgeData.lesson}</p>
        <div class="num-lock-content">
          <p><strong>Instrukcja gaszenia kłótni:</strong> ${bridgeData.crisisProtocol}</p>
          <p class="num-gold-quote"><strong>Słowo-klucz porozumienia:</strong> „${bridgeData.secretWord}”</p>
        </div>
      </div>

      <!-- MODUŁ 3: DŁUGI KARMICZNE -->
      <div class="num-card num-mt num-premium-module">
        <div class="num-card-tag">MODUŁ 3 • KARMA RELACYJNA I PRZEZNACZENIE</div>
        <h3 class="num-h3">Karmiczne punkty obciążenia w Waszych datach</h3>
        <div class="num-lock-content">
          ${debts1.length || debts2.length ? `
            ${debts1.map(d => `<p><strong>${name1} niesie ${d.name}:</strong> ${KARMIC_DEBT_INTERPRETATIONS[d.code]?.relationalImpact || ''}</p>`).join('')}
            ${debts2.map(d => `<p><strong>${name2} niesie ${d.name}:</strong> ${KARMIC_DEBT_INTERPRETATIONS[d.code]?.relationalImpact || ''}</p>`).join('')}
          ` : `<p>Brak obciążeń destrukcyjnymi długami 13, 14, 16, 19. Wasza relacja ma status czystego zapisu (tzw. Czysta Karta Karmiczna).</p>`}
        </div>
      </div>

      <!-- MODUŁ 4: ASYMETRIA LAT OSOBISTYCH -->
      <div class="num-card num-mt num-premium-module">
        <div class="num-card-tag">MODUŁ 4 • BIEŻĄCY CYKL 2026 ROKU: WYSZEDŁ ROK ${py1} ORAZ ROK ${py2}</div>
        <h3 class="num-h3">${name1} (Rok Osobisty ${py1}) & ${name2} (Rok Osobisty ${py2})</h3>
        <div class="num-lock-content">
          <p><strong>Dynamika ${name1}:</strong> ${PERSONAL_YEAR_INTERPRETATIONS[py1]}</p>
          <p><strong>Dynamika ${name2}:</strong> ${PERSONAL_YEAR_INTERPRETATIONS[py2]}</p>
        </div>
      </div>

      <!-- MODUŁ 5: SFERA INTYMNA -->
      <div class="num-card num-mt num-premium-module">
        <div class="num-card-tag">MODUŁ 5 • INTYMNOŚĆ I JĘZYK POŻĄDANIA</div>
        <h3 class="num-h3">Podświadome potrzeby erotyczne i czułości</h3>
        <div class="num-lock-content">
          <p><strong>Zmysłowość ${name1} (Liczba ${lp1.number}):</strong> ${INTIMACY_BLUEPRINTS[lp1.baseDigit]}</p>
          <p><strong>Zmysłowość ${name2} (Liczba ${lp2.number}):</strong> ${INTIMACY_BLUEPRINTS[lp2.baseDigit]}</p>
        </div>
      </div>

      ${!unlocked ? `
        <!-- PAYWALL CTA BANNER -->
        <div class="num-paywall-cta">
          <div class="num-cta-box">
            <h3 class="num-cta-title">Odblokuj Pełne Dossier Partnerskie (5 Modułów)</h3>
            <p class="num-cta-desc">Poznaj całą prawdę o Waszych punktach zapalnych, protokole gaszenia cichych dni i ukrytych potrzebach intymnych.</p>
            <div class="num-price-tag">47 PLN <span class="num-old-price">129 PLN</span></div>
            <a href="${checkoutUrl}" class="num-btn-primary">
              Odblokuj Raport Natychmiast (Stripe / Blik / Apple Pay)
            </a>
            <div class="num-guarantee">Natychmiastowy dostęp w przeglądarce • Bezpieczna płatność 256-bit SSL</div>
          </div>
        </div>
      ` : `
        <div class="num-unlocked-banner">
          <p>✨ <strong>Raport Odblokowany:</strong> Masz pełny dostęp do analizy partnerskiej.</p>
          <button onclick="window.print()" class="num-btn-secondary">Drukuj / Zapisz Raport do PDF</button>
        </div>
      `}
    </div>
  `;
}
