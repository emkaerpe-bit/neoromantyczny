/**
 * NEOROMANTYCZNY — SATURN RETURN REPORT RENDERER
 * Układ: Saturn w Znaku i Domu (Pierwsze miejsce) -> Koło Zodiakalne -> Aspekty -> Paywall
 */
(function () {
  function renderMainDiagnosisCard(satPlanet, signData, houseData, dignityData, isRetro) {
    const rxTag = isRetro ? '<span class="disp-rx-tag" style="margin-left:0.4rem;" title="Ruch wsteczny w chwili narodzin">Rx</span>' : '';
    const houseNum = satPlanet.house || 1;
    const hInfo = houseData || { title: `${houseNum} Dom`, area: 'Sektor życiowy', meaning: 'Weryfikacja fundamentów.', audit: 'Próba dojrzałości.', gift: 'Trwały autorytet.' };

    return `
      <div class="disp-card disp-card-gold" style="border-color:rgba(201,169,110,0.45); margin-bottom:1.75rem; background:linear-gradient(135deg, rgba(25,24,35,0.85) 0%, rgba(15,15,22,0.95) 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
          <div class="disp-badge" style="background:rgba(201,169,110,0.2); color:#FAF8F5; margin:0;">
            GŁÓWNA DIAGNOZA KOSMOGRAMU • THE CHRONOS PROTOCOL
          </div>
          <span class="sat-badge ${dignityData.badgeClass || 'badge-gold'}">
            ${dignityData.type || 'Godność'} (${dignityData.score || '0'})
          </span>
        </div>

        <div style="display:flex; align-items:center; gap:1.15rem; margin-bottom:1.5rem; flex-wrap:wrap;">
          <div class="disp-glyph-box" style="width:3.8rem; height:3.8rem; font-size:2.2rem; border-color:#C9A96E; color:#FAF8F5; box-shadow:0 0 25px rgba(201,169,110,0.25);">
            ♄
          </div>
          <div>
            <h2 style="font-family:'Playfair Display', serif; font-size:clamp(1.5rem, 3vw, 2.1rem); color:#FAF8F5; margin:0 0 0.25rem;">
              Saturn w ${(window.SaturnDispositor && window.SaturnDispositor.SIGN_LOCATIVE && window.SaturnDispositor.SIGN_LOCATIVE[satPlanet.signKey]) || satPlanet.signName} w ${houseNum}. Domu ${rxTag}
            </h2>
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.85rem; color:#C9A96E;">
              Pozycja natalna: ${satPlanet.degreeInSign || satPlanet.degInSign + '°'} • ${signData.archetype || ''}
            </div>
          </div>
        </div>

        <!-- 1. Co oznacza Saturn w Znaku -->
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.25rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.18rem; color:#FAF8F5; margin:0 0 0.6rem;">
            1. Co oznacza Twój Saturn w Znaku ${satPlanet.signName}?
          </h4>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;">
            <strong style="color:#C9A96E;">Pierwotna rana i lęk:</strong> ${signData.wound}
          </p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;">
            <strong style="color:#C9A96E;">Pancerz przed 28. r.ż.:</strong> ${signData.preReturnArmor}
          </p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0;">
            <strong style="color:#C9A96E;">Kryzys audytu w Powrocie Saturna:</strong> ${signData.auditCrisis}
          </p>
        </div>

        <!-- 2. Co oznacza Saturn w Domu -->
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.25rem; margin-bottom:1.2rem;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.18rem; color:#FAF8F5; margin:0 0 0.6rem;">
            2. Co oznacza Saturn w Twoim ${houseNum}. Domu? (${hInfo.title})
          </h4>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;">
            <strong style="color:#C9A96E;">Sektor życiowy pod ostrzałem:</strong> ${hInfo.area}
          </p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 0.8rem;">
            <strong style="color:#C9A96E;">Psychologiczne znaczenie:</strong> ${hInfo.meaning}
          </p>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0;">
            <strong style="color:#C9A96E;">Próba ognia:</strong> ${hInfo.audit}
          </p>
        </div>

        <!-- 3. Synteza Psychologiczna -->
        <div style="background:rgba(201,169,110,0.08); border:1px solid rgba(201,169,110,0.3); border-radius:10px; padding:1.25rem; margin-bottom:1rem;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.15rem; color:#FAF8F5; margin:0 0 0.5rem;">
            3. Synteza: Co to oznacza dla Ciebie w praktyce?
          </h4>
          <p style="font-size:0.92rem; line-height:1.7; color:rgba(250,248,245,0.9); margin:0 0 0.75rem;">
            Kiedy archetyp <strong>${satPlanet.signName}</strong> łączy się z <strong>${houseNum}. Domem</strong>, Saturn domaga się przekucia energii znaku w namacalne struktury tego sektora życia. Nie możesz dłużej uciekać w wyuczone mechanizmy obronne. Saturn wymaga, abyś wziął 100% odpowiedzialności za ten obszar.
          </p>
          <p style="font-size:0.92rem; line-height:1.7; color:#E5CC7C; margin:0;">
            <strong>Dar dojrzałości:</strong> ${hInfo.gift} ${signData.matureGift}
          </p>
        </div>

        <blockquote style="margin:1rem 0 0; padding:0.85rem 1.25rem; border-left:3px solid #C9A96E; background:rgba(255,255,255,0.02); font-style:italic; color:#FAF8F5; font-size:0.95rem;">
          „${signData.lifeLesson}”
        </blockquote>
      </div>
    `;
  }

  window.SaturnRender = {
    renderMainDiagnosisCard
  };
})();
