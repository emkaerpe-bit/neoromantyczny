/**
 * NEOROMANTYCZNY — SATURN RETURN REPORT RENDERER
 * Standard: Condition Stack + Conflict Resolver + Anti-Barnum + Guard bez godziny
 */
(function () {
  const SIGN_DYNAMICS = {
    Aries: { element: 'żywioł Ognia', mode: 'jakość kardynalna', brake: 'impulsywny pośpiech albo wahanie przed pierwszym ruchem' },
    Taurus: { element: 'żywioł Ziemi', mode: 'jakość stała', brake: 'kurczowe trzymanie się bezpiecznej rutyny mimo braku rozwoju' },
    Gemini: { element: 'żywioł Powietrza', mode: 'jakość zmienna', brake: 'rozpraszanie decyzji na dziesiątki wariantów bez zamknięcia tematu' },
    Cancer: { element: 'żywioł Wody', mode: 'jakość kardynalna', brake: 'branie odpowiedzialności za cudze emocje zamiast dbania o własne siły' },
    Leo: { element: 'żywioł Ognia', mode: 'jakość stała', brake: 'uzależnianie decyzji twórczych od zewnętrznej oceny otoczenia' },
    Virgo: { element: 'żywioł Ziemi', mode: 'jakość zmienna', brake: 'odsuwanie ważnego kroku do chwili osiągnięcia nierealnej perfekcji' },
    Libra: { element: 'żywioł Powietrza', mode: 'jakość kardynalna', brake: 'godzenie się na niekorzystne warunki w imię unikania sporu' },
    Scorpio: { element: 'żywioł Wody', mode: 'jakość stała', brake: 'zamykanie się w nieufnej kontroli z obawy przed utratą pozycji' },
    Sagittarius: { element: 'żywioł Ognia', mode: 'jakość zmienna', brake: 'ucieczka w nowy kierunek zawsze wtedy, gdy temat wymaga cierpliwości' },
    Capricorn: { element: 'żywioł Ziemi', mode: 'jakość kardynalna', brake: 'mierzenie własnej wartości wyłącznie nadgodzinami i surową dyscypliną' },
    Aquarius: { element: 'żywioł Powietrza', mode: 'jakość stała', brake: 'chowanie się w chłodnym dystansie obserwatora przy rosnącej bliskości' },
    Pisces: { element: 'żywioł Wody', mode: 'jakość zmienna', brake: 'odsuwanie twardych rachunków i terminów w strefę mglistych założeń' }
  };

  function buildSaturnSignHouseSynthesis(satPlanet, houseNum, dispInfo, hInfo, signData, ctx) {
    const dyn = SIGN_DYNAMICS[satPlanet.signKey] || { element: 'charakter znaku', mode: 'indywidualny rytm', brake: 'dawny schemat unikania konfrontacji' };
    const signLoc = (window.SaturnDispositor && window.SaturnDispositor.SIGN_LOCATIVE && window.SaturnDispositor.SIGN_LOCATIVE[satPlanet.signKey]) || satPlanet.signName;
    const hasTime = ctx ? ctx.facts.hasTime : true;
    const tier = ctx ? ctx.axes.resource.tier : 'moderate';
    const intensityAdj = tier === 'dominant' ? 'z pełną wyrazistością' : (tier === 'borderline' ? 'w łagodnym, zrównoważonym stopniu' : 'wyraźnie');

    const dispClause = dispInfo && dispInfo.isSelfRuled
      ? 'Twój Saturn stoi we własnym władztwie, więc cały mechanizm korekty zależy bezpośrednio od Twojej codziennej konsekwencji bez pośredników.'
      : dispInfo
        ? `Dźwignią zmiany pozostaje <strong>${dispInfo.name} w ${dispInfo.signLocative}</strong>${hasTime ? ` (${dispInfo.house}. Dom)` : ''} — obszar „${dispInfo.power}” rozstrzyga, czy stary mechanizm obronny ustąpi miejsca dojrzałej decyzji.`
        : 'Kluczową dźwignią weryfikacji staje się praktyczne uporządkowanie spraw na konkretnych liczbach i terminach.';

    const dirText = ctx && ctx.directives && ctx.directives[0] ? `<p style="font-size:0.88rem; line-height:1.68; color:rgba(250,248,245,0.88); margin:0 0 0.7rem;"><strong style="color:#C9A96E;">Rozwiązanie napięcia (${ctx.directives[0].title}):</strong> ${ctx.directives[0].text}</p>` : '';
    const giftText = hasTime && hInfo.gift
      ? `${signData.matureGift || ''} W obszarze tego domu zyskujesz konkretny efekt: ${hInfo.gift.charAt(0).toLowerCase() + hInfo.gift.slice(1)}`
      : (signData.matureGift || '');

    const coreLine = hasTime
      ? `Kiedy <strong>${dyn.element}</strong> i <strong>${dyn.mode}</strong> Saturna w ${signLoc} spotykają się ${intensityAdj} z materią <strong>${houseNum}. Domu (${hInfo.title})</strong>, podczas Powrotu Saturna przestaje działać ${dyn.brake}.`
      : `Kiedy <strong>${dyn.element}</strong> i <strong>${dyn.mode}</strong> Saturna w ${signLoc} uruchamiają się ${intensityAdj} podczas Powrotu Saturna, przestaje działać ${dyn.brake}.`;

    return `
      <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.9); margin:0 0 0.75rem;">${coreLine} ${dispClause}</p>
      ${dirText}
      <p style="font-size:0.92rem; line-height:1.7; color:#E5CC7C; margin:0;"><strong>Dar dojrzałości:</strong> ${giftText.trim()}</p>
    `;
  }

  function tipWrap(labelHtml, tipKey, extraClass) {
    const T = window.SaturnTooltips;
    if (!T || !T.GLOSSARY) return extraClass ? `<span class="${extraClass}">${labelHtml}</span>` : labelHtml;
    const g = T.GLOSSARY;
    let obj = g[tipKey];
    if (!obj && tipKey && tipKey.startsWith('dignity_') && g.dignity) obj = g.dignity[tipKey.slice(8)];
    if (!obj) return extraClass ? `<span class="${extraClass}">${labelHtml}</span>` : labelHtml;
    return T.renderTipBadge(labelHtml, obj.title, obj.def, obj.basis || '', extraClass || '');
  }

  function renderMainDiagnosisCard(satPlanet, signData, houseData, dignityData, isRetro, dispInfo, ctx) {
    const f = ctx ? ctx.facts : { hasTime: true, cycleNum: 1 };
    const rxTag = isRetro ? '<span class="disp-rx-tag" style="margin-left:0.4rem;" title="Ruch wsteczny w chwili narodzin">Rx</span>' : '';
    const houseNum = satPlanet.house || 1;
    const hInfo = houseData || { title: `${houseNum} Dom`, area: 'Sektor życiowy.', meaning: 'Weryfikacja fundamentów.', audit: 'Próba dojrzałości.', gift: 'Trwały autorytet.' };
    const signLoc = (window.SaturnDispositor && window.SaturnDispositor.SIGN_LOCATIVE && window.SaturnDispositor.SIGN_LOCATIVE[satPlanet.signKey]) || satPlanet.signName;

    const headLoc = f.hasTime ? `Saturn w ${signLoc} w ${houseNum}. Domu ${rxTag}` : `Saturn w ${signLoc} ${rxTag}`;
    const digBadge = tipWrap(dignityData.type || 'Godność', 'dignity_' + (f.dignityKey || 'peregrine'), 'sat-tip-clean');
    const modeLabel = ctx ? ` • ${ctx.profile.role.name}` : '';
    const evChipsHtml = (ctx && ctx.evidenceChips)
      ? `<div style="display:flex; flex-wrap:wrap; align-items:center; gap:0.4rem; margin-top:0.45rem;"><span style="font-size:0.73rem; color:rgba(250,248,245,0.58);">Podstawa oceny:</span>${ctx.evidenceChips.map(c => tipWrap(c.label, c.tipKey, 'sat-ev-chip sat-tip-clean')).join('')}</div>`
      : '';
    const caveats = [];
    if (!f.hasTime) {
      let msg = '<strong>Tryb bez godziny urodzenia:</strong> Ascendent, domy, kątowość, sekta, Punkt Szczęścia oraz Roczna Profekcja zostały celowo ukryte, ponieważ wykres na 12:00 przekłamałby te parametry.';
      if (f.moonBoundary && f.moonBoundary.uncertain) msg += ` Dodatkowo w dniu narodzin Księżyc zmieniał znak (${f.moonBoundary.signStart} → ${f.moonBoundary.signEnd}).`;
      caveats.push(msg);
    }
    if (f.pre1970) caveats.push('<strong>Uwaga dla dat sprzed 1970 r.:</strong> historyczne strefy czasowe IANA mogą zawierać niejednorodne zapisy czasu lokalnego (LMT).');
    if (f.polarFallback) caveats.push('<strong>Strefa podbiegunowa (≥66°33′):</strong> system Placidusa jest tam matematycznie nieokreślony — zastosowano bezpieczny tryb Whole Sign.');

    const caveatHtml = caveats.length
      ? `<div style="margin-bottom:1.15rem; padding:0.85rem 1rem; border-radius:8px; background:rgba(251,191,36,0.08); border:1px solid rgba(251,191,36,0.35); font-size:0.83rem; line-height:1.55; color:rgba(250,248,245,0.9);">${caveats.join('<br>')}</div>`
      : '';

    const houseBlockHtml = f.hasTime
      ? `<h4 style="font-family:'Playfair Display', serif; font-size:1.18rem; color:#FAF8F5; margin:0 0 0.6rem;">2. Co oznacza Saturn w Twoim ${houseNum}. Domu? (${hInfo.title})</h4>
         <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;"><strong style="color:#C9A96E;">Obszar wystawiony na próbę:</strong> ${hInfo.area}</p>
         <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;"><strong style="color:#C9A96E;">Cichy mechanizm:</strong> ${hInfo.meaning}</p>
         <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0;"><strong style="color:#C9A96E;">Egzamin dojrzałości:</strong> ${hInfo.audit}</p>`
      : `<h4 style="font-family:'Playfair Display', serif; font-size:1.18rem; color:#FAF8F5; margin:0 0 0.6rem;">2. Sektor Domowy (Wymaga Godziny Urodzenia)</h4>
         <p style="font-size:0.9rem; line-height:1.68; color:rgba(250,248,245,0.78); margin:0;">Aby uniknąć losowego przypisania domu z godziny 12:00, opis sektora życiowego zostaje pominięty. Wpisz godzinę z aktu urodzenia, aby zobaczyć dom Saturna, kątowość, sektę oraz Roczną Profekcję.</p>`;

    return `
      <div class="disp-card disp-card-gold" style="border-color:rgba(201,169,110,0.45); margin-bottom:1.75rem; background:linear-gradient(135deg, rgba(25,24,35,0.85) 0%, rgba(15,15,22,0.95) 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
          <div class="disp-badge" style="background:rgba(201,169,110,0.2); color:#FAF8F5; margin:0;">GŁÓWNA DIAGNOZA • THE CHRONOS PROTOCOL</div>
          <span class="sat-badge ${dignityData.badgeClass || 'badge-gold'}">${digBadge}${modeLabel}</span>
        </div>
        <div style="display:flex; align-items:center; gap:1.15rem; margin-bottom:1.25rem; flex-wrap:wrap;">
          <div class="disp-glyph-box" style="width:3.8rem; height:3.8rem; font-size:2.2rem; border-color:#C9A96E; color:#FAF8F5; box-shadow:0 0 25px rgba(201,169,110,0.25);">♄</div>
          <div>
            <h2 style="font-family:'Playfair Display', serif; font-size:clamp(1.5rem, 3vw, 2.1rem); color:#FAF8F5; margin:0 0 0.25rem;">${headLoc}</h2>
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.82rem; color:#C9A96E;">
              Pozycja: ${satPlanet.degreeInSign || ''} • ${signData.archetype || ''}${ctx ? ` • Styl: ${ctx.profile.strategy.name}` : ''}
            </div>
            ${evChipsHtml}
          </div>
        </div>
        ${caveatHtml}
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.25rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.18rem; color:#FAF8F5; margin:0 0 0.6rem;">1. Co oznacza Twój Saturn w Znaku ${satPlanet.signName}?</h4>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;"><strong style="color:#C9A96E;">Dawna pamięć napięcia:</strong> ${signData.wound}</p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;"><strong style="color:#C9A96E;">Nawyk obronny przed przełomem:</strong> ${signData.preReturnArmor}</p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0;"><strong style="color:#C9A96E;">Przełom Powrotu Saturna:</strong> ${signData.auditCrisis}</p>
        </div>
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.25rem; margin-bottom:1.2rem;">
          ${houseBlockHtml}
        </div>
        <div style="background:rgba(201,169,110,0.08); border:1px solid rgba(201,169,110,0.3); border-radius:10px; padding:1.25rem; margin-bottom:1rem;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.15rem; color:#FAF8F5; margin:0 0 0.5rem;">3. Synteza: Co to oznacza w praktyce?</h4>
          ${buildSaturnSignHouseSynthesis(satPlanet, houseNum, dispInfo, hInfo, signData, ctx)}
        </div>
        <blockquote style="margin:1rem 0 0; padding:0.85rem 1.25rem; border-left:3px solid #C9A96E; background:rgba(255,255,255,0.02); font-style:italic; color:#FAF8F5; font-size:0.95rem;">„${signData.lifeLesson}”</blockquote>
      </div>
    `;
  }

  window.SaturnRender = { buildSaturnSignHouseSynthesis, renderMainDiagnosisCard };
})();
