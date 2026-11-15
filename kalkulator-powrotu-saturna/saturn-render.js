/**
 * NEOROMANTYCZNY — SATURN RETURN REPORT RENDERER
 * Układ: Saturn w Znaku i Domu (Pierwsze miejsce) -> Koło Zodiakalne -> Aspekty -> Paywall
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
    Sagittarius: { element: 'żywioł Ognia', mode: 'jakość zmienna', brake: 'ucieczka w nowy kierunek zawsze wtedy, gdy temat wymaga mozolnej cierpliwości' },
    Capricorn: { element: 'żywioł Ziemi', mode: 'jakość kardynalna', brake: 'mierzenie własnej wartości wyłącznie nadgodzinami i surową dyscypliną' },
    Aquarius: { element: 'żywioł Powietrza', mode: 'jakość stała', brake: 'chowanie się w chłodnym dystansie obserwatora przy rosnącej bliskości' },
    Pisces: { element: 'żywioł Wody', mode: 'jakość zmienna', brake: 'odsuwanie twardych rachunków i terminów w strefę mglistych założeń' }
  };

  function buildSaturnSignHouseSynthesis(satPlanet, houseNum, dispInfo, hInfo, signData) {
    const dyn = SIGN_DYNAMICS[satPlanet.signKey] || { element: 'charakter znaku', mode: 'indywidualny rytm', brake: 'dawny schemat unikania konfrontacji' };
    const houseTitle = hInfo.title || (houseNum + ' Dom');
    const signLoc = (window.SaturnDispositor && window.SaturnDispositor.SIGN_LOCATIVE && window.SaturnDispositor.SIGN_LOCATIVE[satPlanet.signKey]) || satPlanet.signName;

    const dispClause = dispInfo && dispInfo.isSelfRuled
      ? `Twój Saturn stoi we własnym władztwie, przez co cały mechanizm korekty zależy bezpośrednio od Twojej codziennej konsekwencji bez pośredników.`
      : dispInfo
        ? `Dźwignią zmiany pozostaje <strong>${dispInfo.name} w ${dispInfo.signLocative}</strong> (${dispInfo.house}. Dom) — właśnie obszar „${dispInfo.power}” decyduje, czy stary mechanizm obronny pęknie w stronę realnej dojrzałości.`
        : `Kluczową dźwignią weryfikacji staje się praktyczne uporządkowanie spraw tego domu na konkretnych liczbach i terminach.`;

    const giftLine = `${hInfo.gift || ''} ${signData.matureGift || ''}`.trim();

    return `
      <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.9); margin:0 0 0.75rem;">
        Kiedy <strong>${dyn.element}</strong> i <strong>${dyn.mode}</strong> Saturna w ${signLoc} spotykają się z materią <strong>${houseNum}. Domu (${houseTitle})</strong>, w wieku 28–30 lat przestaje działać ${dyn.brake}. Właśnie na tym odcinku życia masz dziś zastąpić prowizoryczne kompromisy twardym standardem działania. ${dispClause}
      </p>
      <p style="font-size:0.92rem; line-height:1.7; color:#E5CC7C; margin:0;">
        <strong>Dar dojrzałości:</strong> ${giftLine}
      </p>
    `;
  }

  function renderMainDiagnosisCard(satPlanet, signData, houseData, dignityData, isRetro, dispInfo) {
    const rxTag = isRetro ? '<span class="disp-rx-tag" style="margin-left:0.4rem;" title="Ruch wsteczny w chwili narodzin">Rx</span>' : '';
    const houseNum = satPlanet.house || 1;
    const hInfo = houseData || { title: `${houseNum} Dom`, area: 'Sektor życiowy', meaning: 'Weryfikacja fundamentów.', audit: 'Próba dojrzałości.', gift: 'Trwały autorytet.' };
    const signLoc = (window.SaturnDispositor && window.SaturnDispositor.SIGN_LOCATIVE && window.SaturnDispositor.SIGN_LOCATIVE[satPlanet.signKey]) || satPlanet.signName;

    return `
      <div class="disp-card disp-card-gold" style="border-color:rgba(201,169,110,0.45); margin-bottom:1.75rem; background:linear-gradient(135deg, rgba(25,24,35,0.85) 0%, rgba(15,15,22,0.95) 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
          <div class="disp-badge" style="background:rgba(201,169,110,0.2); color:#FAF8F5; margin:0;">
            GŁÓWNA DIAGNOZA KOSMOGRAMU • THE CHRONOS PROTOCOL
          </div>
          <span class="sat-badge ${dignityData.badgeClass || 'badge-gold'}">${dignityData.type || 'Godność'}</span>
        </div>

        <div style="display:flex; align-items:center; gap:1.15rem; margin-bottom:1.5rem; flex-wrap:wrap;">
          <div class="disp-glyph-box" style="width:3.8rem; height:3.8rem; font-size:2.2rem; border-color:#C9A96E; color:#FAF8F5; box-shadow:0 0 25px rgba(201,169,110,0.25);">♄</div>
          <div>
            <h2 style="font-family:'Playfair Display', serif; font-size:clamp(1.5rem, 3vw, 2.1rem); color:#FAF8F5; margin:0 0 0.25rem;">
              Saturn w ${signLoc} w ${houseNum}. Domu ${rxTag}
            </h2>
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.85rem; color:#C9A96E;">
              Pozycja natalna: ${satPlanet.degreeInSign || satPlanet.degInSign + '°'} • ${signData.archetype || ''}
            </div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.25rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.18rem; color:#FAF8F5; margin:0 0 0.6rem;">1. Co oznacza Twój Saturn w Znaku ${satPlanet.signName}?</h4>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;"><strong style="color:#C9A96E;">Dawna rana i pamięć napięcia:</strong> ${signData.wound}</p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;"><strong style="color:#C9A96E;">Strategia obronna przed 28. r.ż.:</strong> ${signData.preReturnArmor}</p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0;"><strong style="color:#C9A96E;">Przełom Powrotu Saturna:</strong> ${signData.auditCrisis}</p>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.25rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.18rem; color:#FAF8F5; margin:0 0 0.6rem;">2. Co oznacza Saturn w Twoim ${houseNum}. Domu? (${hInfo.title})</h4>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;"><strong style="color:#C9A96E;">Obszar wystawiony na próbę:</strong> ${hInfo.area}</p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;"><strong style="color:#C9A96E;">Cichy mechanizm:</strong> ${hInfo.meaning}</p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0;"><strong style="color:#C9A96E;">Egzamin dojrzałości:</strong> ${hInfo.audit}</p>
        </div>

        <div style="background:rgba(201,169,110,0.08); border:1px solid rgba(201,169,110,0.3); border-radius:10px; padding:1.25rem; margin-bottom:1rem;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.15rem; color:#FAF8F5; margin:0 0 0.5rem;">3. Synteza: Co to oznacza dla Ciebie w praktyce?</h4>
          ${buildSaturnSignHouseSynthesis(satPlanet, houseNum, dispInfo, hInfo, signData)}
        </div>

        <blockquote style="margin:1rem 0 0; padding:0.85rem 1.25rem; border-left:3px solid #C9A96E; background:rgba(255,255,255,0.02); font-style:italic; color:#FAF8F5; font-size:0.95rem;">
          „${signData.lifeLesson}”
        </blockquote>
      </div>
    `;
  }

  window.SaturnRender = {
    buildSaturnSignHouseSynthesis,
    renderMainDiagnosisCard
  };
})();
