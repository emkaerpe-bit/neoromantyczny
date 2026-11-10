/**
 * SILNIK ASTRONOMICZNY I WIZUALNY: KALKULATOR FAZ KSIĘŻYCA DNIA NARODZIN
 * Oblicza długości ekliptyczne Słońca i Księżyca (Meeus ELP2000), kąt fazy ψ,
 * % oświetlenia tarczy, wiek Księżyca oraz indeks dopełnienia pary.
 */

(function () {
  'use strict';

  const ZODIAC_SIGNS = [
    'Baran', 'Byk', 'Bliźnięta', 'Rak', 'Lew', 'Panna',
    'Waga', 'Skorpion', 'Strzelec', 'Koziorożec', 'Wodnik', 'Ryby'
  ];

  function norm360(deg) {
    return ((deg % 360) + 360) % 360;
  }

  function d2r(deg) {
    return (deg * Math.PI) / 180;
  }

  function toJulianDay(dateStr, timeStr) {
    const parts = (dateStr || '1996-06-15').split('-').map(Number);
    const tParts = (timeStr || '12:00').split(':').map(Number);
    let Y = parts[0] || 1996;
    let M = parts[1] || 6;
    const D = (parts[2] || 15) + ((tParts[0] || 12) + (tParts[1] || 0) / 60 - 1) / 24;
    if (M <= 2) {
      Y -= 1;
      M += 12;
    }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
  }

  function calculateLunarProfile(dateStr, timeStr) {
    const jd = toJulianDay(dateStr, timeStr);
    const T = (jd - 2451545.0) / 36525.0;

    // Słońce (długość ekliptyczna)
    const L0 = norm360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    const M = norm360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
    const C = (1.914602 - 0.004817 * T) * Math.sin(d2r(M))
            + 0.019993 * Math.sin(d2r(2 * M))
            + 0.000289 * Math.sin(d2r(3 * M));
    const sunLon = norm360(L0 + C);

    // Księżyc (Meeus rozdział 47 — główne wyrazy okresowe ELP2000)
    const Lp = norm360(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T);
    const D = norm360(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T);
    const Mp = norm360(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T);
    const F = norm360(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T);

    let dL = 6.288774 * Math.sin(d2r(Mp))
           + 1.274027 * Math.sin(d2r(2 * D - Mp))
           + 0.658314 * Math.sin(d2r(2 * D))
           + 0.213618 * Math.sin(d2r(2 * Mp))
           - 0.185596 * Math.sin(d2r(M))
           - 0.114336 * Math.sin(d2r(2 * F))
           + 0.058793 * Math.sin(d2r(2 * D - 2 * Mp))
           + 0.057212 * Math.sin(d2r(2 * D - M - Mp))
           + 0.053320 * Math.sin(d2r(2 * D + Mp))
           + 0.045874 * Math.sin(d2r(2 * D - M))
           - 0.040923 * Math.sin(d2r(M - Mp))
           - 0.034720 * Math.sin(d2r(D))
           - 0.030383 * Math.sin(d2r(M + Mp));

    const moonLon = norm360(Lp + dL);
    const phaseAngle = norm360(moonLon - sunLon); // 0 = Nów, 180 = Pełnia
    const illumFraction = (1 - Math.cos(d2r(phaseAngle))) / 2;
    const illuminationPct = Math.round(illumFraction * 1000) / 10;
    const lunarAgeDays = Math.round((phaseAngle / 360) * 29.53059 * 10) / 10;

    const moonSignIdx = Math.floor(moonLon / 30) % 12;
    const sunSignIdx = Math.floor(sunLon / 30) % 12;
    const moonDeg = Math.floor(moonLon % 30);
    const sunDeg = Math.floor(sunLon % 30);

    const phases = (window.MOON_PHASE_DATA && window.MOON_PHASE_DATA.phases) || [];
    const phaseIndex = Math.min(7, Math.floor(norm360(phaseAngle + 22.5) / 45) % 8);
    const phaseObj = phases[phaseIndex] || phases[0];

    return {
      dateStr,
      timeStr: timeStr || '12:00',
      sunLon,
      moonLon,
      phaseAngle,
      illumFraction,
      illuminationPct,
      lunarAgeDays,
      moonSign: ZODIAC_SIGNS[moonSignIdx],
      moonDeg,
      sunSign: ZODIAC_SIGNS[sunSignIdx],
      sunDeg,
      phaseIndex,
      phase: phaseObj
    };
  }
  /**
   * Zwraca ścieżkę SVG oświetlonej części tarczy Księżyca o promieniu R w punkcie (cx, cy)
   * dla dowolnego kąta fazy ψ ∈ [0, 360).
   */
  function getTerminatorPath(cx, cy, R, phaseAngle) {
    const psi = norm360(phaseAngle);
    if (psi < 1.5 || psi > 358.5) {
      return ''; // Nów (prawie pełny cień)
    }
    if (Math.abs(psi - 180) < 1.5) {
      return `M ${cx} ${cy - R} A ${R} ${R} 0 1 1 ${cx} ${cy + R} A ${R} ${R} 0 1 1 ${cx} ${cy - R} Z`;
    }

    const isWaxing = psi < 180;
    const cosPsi = Math.cos(d2r(psi));
    const rx = Math.max(0.5, Math.abs(cosPsi) * R);

    // Półokrąg zewnętrzny (prawy dla przybywającego, lewy dla ubywającego)
    const outerSweep = isWaxing ? 1 : 0;
    // Półelipsa terminatora od dołu (cy + R) do góry (cy - R)
    let innerSweep;
    if (isWaxing) {
      innerSweep = psi < 90 ? 0 : 1;
    } else {
      innerSweep = psi < 270 ? 0 : 1;
    }

    return `M ${cx} ${cy - R} A ${R} ${R} 0 0 ${outerSweep} ${cx} ${cy + R} A ${rx.toFixed(2)} ${R} 0 0 ${innerSweep} ${cx} ${cy - R} Z`;
  }

  function renderCraterDetails(cx, cy, R, opacity) {
    return `<g opacity="${opacity}" fill="#767D92">
      <ellipse cx="${cx - R * 0.28}" cy="${cy - R * 0.22}" rx="${R * 0.22}" ry="${R * 0.16}" transform="rotate(-18 ${cx - R * 0.28} ${cy - R * 0.22})" />
      <ellipse cx="${cx + R * 0.18}" cy="${cy - R * 0.12}" rx="${R * 0.18}" ry="${R * 0.14}" transform="rotate(14 ${cx + R * 0.18} ${cy - R * 0.12})" />
      <ellipse cx="${cx + R * 0.32}" cy="${cy + R * 0.08}" rx="${R * 0.14}" ry="${R * 0.11}" />
      <ellipse cx="${cx - R * 0.36}" cy="${cy + R * 0.18}" rx="${R * 0.21}" ry="${R * 0.15}" transform="rotate(22 ${cx - R * 0.36} ${cy + R * 0.18})" />
      <circle cx="${cx - R * 0.06}" cy="${cy + R * 0.48}" r="${R * 0.08}" opacity="0.75" />
      <circle cx="${cx + R * 0.12}" cy="${cy - R * 0.44}" r="${R * 0.06}" opacity="0.55" />
    </g>`;
  }

  function buildMoonSVG(phaseAngle, idPrefix, isGoldAccent) {
    const size = 200;
    const cx = 100, cy = 100, R = 84;
    const pathD = getTerminatorPath(cx, cy, R, phaseAngle);
    const litColorStart = isGoldAccent ? '#FFF6E0' : '#F8FAFF';
    const litColorMid = isGoldAccent ? '#E5C384' : '#D8DFEE';
    const litColorEdge = isGoldAccent ? '#A88444' : '#9AA4BC';

    return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dark_${idPrefix}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#1A1D29" />
          <stop offset="82%" stop-color="#0F111A" />
          <stop offset="100%" stop-color="#08090E" />
        </radialGradient>
        <radialGradient id="lit_${idPrefix}" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stop-color="${litColorStart}" />
          <stop offset="68%" stop-color="${litColorMid}" />
          <stop offset="100%" stop-color="${litColorEdge}" />
        </radialGradient>
        <clipPath id="clip_${idPrefix}">
          <path d="${pathD}" />
        </clipPath>
      </defs>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#dark_${idPrefix})" stroke="rgba(201,169,110,0.28)" stroke-width="1.2" />
      ${renderCraterDetails(cx, cy, R, 0.14)}
      ${pathD ? `<g clip-path="url(#clip_${idPrefix})">
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#lit_${idPrefix})" />
        ${renderCraterDetails(cx, cy, R, 0.34)}
      </g>` : ''}
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1" />
    </svg>`;
  }

  function buildCompositeMoonSVG(angleA, angleB, mergePct) {
    const size = 240;
    const cy = 120, R = 88;
    const offset = (1 - mergePct / 100) * 34;
    const cxA = 120 - offset;
    const cxB = 120 + offset;
    const pathA = getTerminatorPath(cxA, cy, R, angleA);
    const pathB = getTerminatorPath(cxB, cy, R, angleB);

    return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="comp_dark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#171924" />
          <stop offset="100%" stop-color="#090A10" />
        </radialGradient>
        <radialGradient id="comp_litA" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#F7FAFF" />
          <stop offset="100%" stop-color="#B0BCD4" />
        </radialGradient>
        <radialGradient id="comp_litB" cx="60%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#FFF3D6" />
          <stop offset="100%" stop-color="#C9A96E" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="${cy}" r="${R + 8}" fill="none" stroke="rgba(201,169,110,0.22)" stroke-dasharray="3 5" />
      <circle cx="${cxA}" cy="${cy}" r="${R}" fill="url(#comp_dark)" opacity="0.9" />
      <circle cx="${cxB}" cy="${cy}" r="${R}" fill="url(#comp_dark)" opacity="0.65" />
      ${renderCraterDetails(120, cy, R, 0.18)}
      ${pathA ? `<path d="${pathA}" fill="url(#comp_litA)" opacity="0.86" />` : ''}
      ${pathB ? `<path d="${pathB}" fill="url(#comp_litB)" opacity="0.82" style="mix-blend-mode: screen;" />` : ''}
      <circle cx="120" cy="${cy}" r="${R}" fill="none" stroke="rgba(201,169,110,0.55)" stroke-width="1.5" />
    </svg>`;
  }
  function computeSoulmateMetrics(moonA, moonB) {
    const a1 = moonA.phaseAngle;
    const a2 = moonB.phaseAngle;
    let angleDiff = Math.abs(a1 - a2);
    if (angleDiff > 180) angleDiff = 360 - angleDiff;

    // Numeryczna integracja oświetlenia złożonej tarczy po 360 południkach
    let litUnionBins = 0;
    const N = 180;
    for (let i = 0; i < N; i++) {
      const lon = -90 + (180 * (i + 0.5)) / N; // widoczna półkula [-90, +90]
      const litA = isMeridianLit(lon, a1);
      const litB = isMeridianLit(lon, a2);
      if (litA || litB) litUnionBins++;
    }
    const unionCoveragePct = Math.round((litUnionBins / N) * 100);

    // Indeks Dopełnienia Tarczy (uwzględnia opozycję faz 180° + rezonans znaków Księżyca)
    const oppositionCloseness = 1 - Math.abs(180 - angleDiff) / 180; // 1.0 gdy różnica 180°
    const twinCloseness = 1 - angleDiff / 180; // 1.0 gdy ta sama faza

    let compositeKey = 'quarter_bridge';
    if (angleDiff >= 135 && ((a1 < 180 && a2 >= 180) || (a2 < 180 && a1 >= 180))) {
      compositeKey = 'yin_yang_full';
    } else if (angleDiff <= 32) {
      compositeKey = 'twin_phase';
    } else if ((moonA.illumFraction < 0.2 && moonB.illumFraction > 0.8) || (moonB.illumFraction < 0.2 && moonA.illumFraction > 0.8)) {
      compositeKey = 'axis_new_full';
    } else if (moonA.illumFraction > 0.68 && moonB.illumFraction > 0.68) {
      compositeKey = 'double_luminance';
    } else if (moonA.illumFraction < 0.35 && moonB.illumFraction < 0.35) {
      compositeKey = 'crescent_sanctuary';
    }

    // Wyliczenie uczciwego, zróżnicowanego wyniku rezonansu (62% – 99%)
    const baseHarmony = Math.max(oppositionCloseness * 96, twinCloseness * 91, (unionCoveragePct / 100) * 94);
    const signDiff = Math.abs(ZODIAC_SIGNS.indexOf(moonA.moonSign) - ZODIAC_SIGNS.indexOf(moonB.moonSign));
    const signMod = (signDiff === 4 || signDiff === 8 || signDiff === 6 || signDiff === 2 || signDiff === 10) ? 5 : (signDiff === 0 ? 4 : -2);
    const resonanceScore = Math.min(99, Math.max(62, Math.round(baseHarmony * 0.65 + unionCoveragePct * 0.3 + signMod)));

    const composites = (window.MOON_PHASE_DATA && window.MOON_PHASE_DATA.composites) || {};
    return {
      angleDiff: Math.round(angleDiff),
      unionCoveragePct,
      resonanceScore,
      compositeKey,
      composite: composites[compositeKey] || composites.quarter_bridge
    };
  }

  function isMeridianLit(lonDeg, phaseAngle) {
    const psi = norm360(phaseAngle);
    if (psi <= 1 || psi >= 359) return false;
    if (Math.abs(psi - 180) <= 1) return true;
    const termLon = psi < 180 ? 90 - psi : 270 - psi;
    if (psi < 180) {
      return lonDeg >= termLon;
    } else {
      return lonDeg <= termLon;
    }
  }
  function drawCanvasMoon(ctx, cx, cy, R, phaseAngle, isGold) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = '#12141E';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201, 169, 110, 0.35)';
    ctx.lineWidth = 2;
    ctx.stroke();

    const psi = norm360(phaseAngle);
    if (psi > 1.5 && psi < 358.5) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      const steps = 160;
      const grad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.1, cx, cy, R);
      if (isGold) {
        grad.addColorStop(0, '#FFF5DC');
        grad.addColorStop(0.7, '#E0BD7C');
        grad.addColorStop(1, '#9E7B3B');
      } else {
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.75, '#D5DCEE');
        grad.addColorStop(1, '#8D98B3');
      }
      ctx.fillStyle = grad;

      for (let i = 0; i < steps; i++) {
        const y = cy - R + (2 * R * i) / steps;
        const dy = (y - cy) / R;
        const halfChord = Math.sqrt(Math.max(0, 1 - dy * dy)) * R;
        const termX = Math.cos(d2r(psi)) * halfChord;
        let xStart, xEnd;
        if (psi < 180) {
          xStart = cx + termX;
          xEnd = cx + halfChord;
        } else {
          xStart = cx - halfChord;
          xEnd = cx - termX;
        }
        if (xEnd > xStart) {
          ctx.fillRect(xStart, y, xEnd - xStart, (2 * R) / steps + 1.5);
        }
      }
      ctx.restore();
    }
    ctx.restore();
  }

  function downloadSoulmatePoster(state) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    const bg = ctx.createLinearGradient(0, 0, 0, 1920);
    bg.addColorStop(0, '#07070C');
    bg.addColorStop(0.5, '#10111C');
    bg.addColorStop(1, '#06060A');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1920);

    ctx.strokeStyle = 'rgba(201, 169, 110, 0.32)';
    ctx.lineWidth = 2;
    ctx.strokeRect(48, 48, 984, 1824);

    ctx.fillStyle = '#C9A96E';
    ctx.font = '600 24px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NEOROMANTYCZNY.PL  •  SOULMATE MOON PHASE', 540, 130);

    ctx.fillStyle = '#F4EFEA';
    ctx.font = '500 54px "Playfair Display", Georgia, serif';
    ctx.fillText(`${state.nameA}  &  ${state.nameB}`, 540, 220);

    // Dwie tarcze osobiste
    drawCanvasMoon(ctx, 310, 470, 135, state.moonA.phaseAngle, false);
    drawCanvasMoon(ctx, 770, 470, 135, state.moonB.phaseAngle, true);

    ctx.fillStyle = '#E5C384';
    ctx.font = '600 28px "Playfair Display", Georgia, serif';
    ctx.fillText(state.nameA, 310, 660);
    ctx.fillText(state.nameB, 770, 660);

    ctx.fillStyle = 'rgba(244,239,234,0.75)';
    ctx.font = '400 22px Montserrat, sans-serif';
    ctx.fillText(`${state.moonA.phase.name} (${state.moonA.illuminationPct}%)`, 310, 700);
    ctx.fillText(`${state.moonB.phase.name} (${state.moonB.illuminationPct}%)`, 770, 700);
    ctx.fillText(`Księżyc: ${state.moonA.moonSign} ${state.moonA.moonDeg}°`, 310, 735);
    ctx.fillText(`Księżyc: ${state.moonB.moonSign} ${state.moonB.moonDeg}°`, 770, 735);

    // Złożona tarcza w centrum
    ctx.save();
    drawCanvasMoon(ctx, 540, 1060, 210, state.moonA.phaseAngle, false);
    ctx.globalCompositeOperation = 'screen';
    drawCanvasMoon(ctx, 540, 1060, 210, state.moonB.phaseAngle, true);
    ctx.restore();

    ctx.fillStyle = '#C9A96E';
    ctx.font = '600 26px Montserrat, sans-serif';
    ctx.fillText(`WSPÓLNA TARCZA: ${state.metrics.unionCoveragePct}% BLASKU PEŁNI`, 540, 1355);

    ctx.fillStyle = '#F4EFEA';
    ctx.font = '600 44px "Playfair Display", Georgia, serif';
    ctx.fillText(state.metrics.composite.title.split('(')[0].trim(), 540, 1425);

    ctx.fillStyle = '#E5C384';
    ctx.font = '600 68px "Playfair Display", Georgia, serif';
    ctx.fillText(`Rezonans Nocy: ${state.metrics.resonanceScore}%`, 540, 1545);

    ctx.fillStyle = 'rgba(244,239,234,0.6)';
    ctx.font = '400 22px Montserrat, sans-serif';
    ctx.fillText('Sprawdź Wasze Księżyce: neoromantyczny.pl/kalkulator-faz-ksiezyca', 540, 1795);

    const link = document.createElement('a');
    link.download = `ksiezyce-${state.nameA.toLowerCase()}-${state.nameB.toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
  let currentState = null;

  function renderAppResults() {
    const nameA = (document.getElementById('nameA').value || 'Osoba 1').trim();
    const dateA = document.getElementById('dateA').value;
    const timeA = document.getElementById('timeA').value || '12:00';

    const nameB = (document.getElementById('nameB').value || 'Osoba 2').trim();
    const dateB = document.getElementById('dateB').value;
    const timeB = document.getElementById('timeB').value || '12:00';

    if (!dateA || !dateB) {
      return;
    }

    const moonA = calculateLunarProfile(dateA, timeA);
    const moonB = calculateLunarProfile(dateB, timeB);
    const metrics = computeSoulmateMetrics(moonA, moonB);

    currentState = { nameA, dateA, timeA, nameB, dateB, timeB, moonA, moonB, metrics };

    document.getElementById('svgMoonA').innerHTML = buildMoonSVG(moonA.phaseAngle, 'personA', false);
    document.getElementById('svgMoonB').innerHTML = buildMoonSVG(moonB.phaseAngle, 'personB', true);
    document.getElementById('svgComposite').innerHTML = buildCompositeMoonSVG(moonA.phaseAngle, moonB.phaseAngle, 100);

    const slider = document.getElementById('mergeSlider');
    if (slider) slider.value = 100;

    document.getElementById('lblNameA').textContent = nameA;
    document.getElementById('lblPhaseA').textContent = `${moonA.phase.icon} ${moonA.phase.name}`;
    document.getElementById('lblMetaA').textContent = `Oświetlenie: ${moonA.illuminationPct}% • Księżyc: ${moonA.moonSign} ${moonA.moonDeg}° • Słońce: ${moonA.sunSign}`;

    document.getElementById('lblNameB').textContent = nameB;
    document.getElementById('lblPhaseB').textContent = `${moonB.phase.icon} ${moonB.phase.name}`;
    document.getElementById('lblMetaB').textContent = `Oświetlenie: ${moonB.illuminationPct}% • Księżyc: ${moonB.moonSign} ${moonB.moonDeg}° • Słońce: ${moonB.sunSign}`;

    document.getElementById('valResonance').textContent = `${metrics.resonanceScore}%`;
    document.getElementById('valUnionLight').textContent = `${metrics.unionCoveragePct}%`;
    document.getElementById('valAngleDiff').textContent = `${metrics.angleDiff}°`;

    // Archetyp Pary
    document.getElementById('compBadge').textContent = metrics.composite.badge;
    document.getElementById('compTitle').textContent = metrics.composite.title;
    document.getElementById('compBody').innerHTML = `
      <p><strong>Geometria Waszej Nocy:</strong> ${metrics.composite.summary}</p>
      <p><strong>Jak to działa między Wami na co dzień:</strong> ${metrics.composite.dynamic}</p>
      <p><strong>Punkt Równowagi:</strong> ${metrics.composite.advice}</p>
    `;

    // Indywidualne portrety
    const signDataA = (window.MOON_PHASE_DATA.moonSigns && window.MOON_PHASE_DATA.moonSigns[moonA.moonSign]) || {};
    const signDataB = (window.MOON_PHASE_DATA.moonSigns && window.MOON_PHASE_DATA.moonSigns[moonB.moonSign]) || {};

    document.getElementById('cardTitleA').textContent = `${nameA}: ${moonA.phase.name} (${moonA.phase.archetype})`;
    document.getElementById('cardBodyA').innerHTML = `
      <p>${moonA.phase.loveStyle}</p>
      <p><strong>Odruch obronny w stresie:</strong> ${moonA.phase.shadowHabit}</p>
      <p><strong>Księżyc w znaku ${moonA.moonSign}:</strong> ${signDataA.need || ''}</p>
    `;

    document.getElementById('cardTitleB').textContent = `${nameB}: ${moonB.phase.name} (${moonB.phase.archetype})`;
    document.getElementById('cardBodyB').innerHTML = `
      <p>${moonB.phase.loveStyle}</p>
      <p><strong>Odruch obronny w stresie:</strong> ${moonB.phase.shadowHabit}</p>
      <p><strong>Księżyc w znaku ${moonB.moonSign}:</strong> ${signDataB.need || ''}</p>
    `;

    // Dynamiczne przekazanie danych pary wprost do Synastrii
    const synLink = document.getElementById('synastryCrossLink');
    if (synLink) {
      const q = new URLSearchParams();
      if (nameA && nameA !== 'Osoba 1') q.set('nA', nameA);
      if (dateA) q.set('dA', dateA);
      if (timeA) q.set('tA', timeA);
      if (nameB && nameB !== 'Osoba 2') q.set('nB', nameB);
      if (dateB) q.set('dB', dateB);
      if (timeB) q.set('tB', timeB);
      const qs = q.toString();
      synLink.href = qs ? `/kalkulator-synastrii/?${qs}` : `/kalkulator-synastrii/`;
    }

    const resWrap = document.getElementById('moonResults');
    resWrap.classList.add('visible');
    resWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('moonPhaseForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        renderAppResults();
      });
    }

    const slider = document.getElementById('mergeSlider');
    if (slider) {
      slider.addEventListener('input', function () {
        if (!currentState) return;
        const pct = Number(slider.value);
        document.getElementById('svgComposite').innerHTML = buildCompositeMoonSVG(
          currentState.moonA.phaseAngle,
          currentState.moonB.phaseAngle,
          pct
        );
      });
    }

    const btnPoster = document.getElementById('btnDownloadPoster');
    if (btnPoster) {
      btnPoster.addEventListener('click', function () {
        if (currentState) downloadSoulmatePoster(currentState);
      });
    }
  });
})();
