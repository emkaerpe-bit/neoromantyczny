/**
 * NEOROMANTYCZNY — SATURN RETURN DETAILS & ASPECTS RENDERER
 * Różnicowanie pojedynczego przejścia vs pętli, fazy orbu oraz konkretnych aspektów
 */
(function () {
  const ASPECT_SYMBOLS = { 'Koniunkcja': '☌', 'Opozycja': '☍', 'Kwadratura': '□', 'Trygon': '△', 'Sekstyl': '⚹' };

  function renderPassesHtml(passes, ctx) {
    if (!passes || passes.length === 0) {
      return '<p style="color:rgba(250,248,245,0.5);">Trwa obliczanie orbity tranzytowej...</p>';
    }
    const C = window.SATURN_CYCLES_DATA || {};
    const f = ctx ? ctx.facts : null;
    const isSingle = passes.length === 1;
    const subCaption = isSingle
      ? 'Przejście bezpośrednie 0°00′ (okno ±5° trwa ok. 12 tygodni)'
      : 'Koniunkcja ścisła 0°00′ w ramach pętli retrogradacyjnej';

    const T = window.SaturnTooltips;
    const orbLabel = (T && T.GLOSSARY && T.GLOSSARY.orb)
      ? T.renderTipBadge(`Aktualny stan orbu (Δ ${f ? f.timeline.orb : 0}°)`, T.GLOSSARY.orb.title, T.GLOSSARY.orb.def, T.GLOSSARY.orb.basis)
      : `Aktualny stan orbu (Δ ${f ? f.timeline.orb : 0}°)`;

    const phaseBanner = f && C.timelinePhases ? `
      <div style="margin-bottom:0.85rem; padding:0.75rem 0.9rem; border-radius:8px; background:rgba(201,169,110,0.07); border:1px solid rgba(201,169,110,0.22); font-size:0.82rem; line-height:1.55; color:rgba(250,248,245,0.88);">
        <strong style="color:#C9A96E;">${orbLabel}:</strong> ${C.timelinePhases[f.timeline.phase] || ''}
        ${f.timeline.nearEdge && C.edgeWarning ? `<div style="margin-top:0.35rem; color:#E5CC7C;">${C.edgeWarning[f.timeline.nearEdge]}</div>` : ''}
      </div>` : '';

    const cards = passes.map((p) => {
      const dateStr = p.date.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
      const badgeBg = p.isRetro ? 'rgba(251,113,133,0.15)' : 'rgba(201,169,110,0.15)';
      const badgeBorder = p.isRetro ? 'rgba(251,113,133,0.35)' : 'rgba(201,169,110,0.35)';
      const textColor = p.isRetro ? '#FB7185' : '#C9A96E';
      return `
        <div style="background:rgba(18,18,26,0.7); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.85rem 1rem; margin-bottom:0.65rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <span class="disp-badge" style="background:${badgeBg}; border-color:${badgeBorder}; color:${textColor}; margin-bottom:0.25rem;">${p.type}</span>
            <p style="margin:0; color:rgba(250,248,245,0.65); font-size:0.78rem; font-family:'JetBrains Mono', monospace;">${subCaption}</p>
          </div>
          <span style="font-family:'Playfair Display', serif; font-size:1.15rem; color:#FAF8F5; font-weight:600;">${dateStr}</span>
        </div>`;
    }).join('');

    return phaseBanner + cards;
  }

  function renderAspectsList(aspects, ctx) {
    const list = (ctx && ctx.facts && ctx.facts.visibleAspects) ? ctx.facts.visibleAspects : (aspects || []);
    if (!list.length) {
      return `
        <div class="disp-card" style="margin-bottom:1.75rem;">
          <h3 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">Aspekty do Natalnego Saturna</h3>
          <p style="color:rgba(250,248,245,0.68); font-size:0.88rem; margin:0;">Twój Saturn nie tworzy ścisłych głównych aspektów z pozostałymi planetami — jego lekcja działa w dużej niezależności od reszty wykresu.</p>
        </div>`;
    }

    const aspectDataMap = (typeof window.getSaturnAspectsData === 'function') ? window.getSaturnAspectsData() : (window.SATURN_ASPECTS_DATA || {});
    const f = ctx ? ctx.facts : {};

    const items = list.map(a => {
      const data = aspectDataMap[a.planet] || {
        name: a.planet, genitive: 'z ' + a.planet, glyph: '✦', color: '#C9A96E',
        hard: { text: 'Wyraźne tarcie dwóch sił wymusza porzucenie starych uników wobec odpowiedzialności.', integration: 'Spokojny kręgosłup decyzyjny i trzeźwe panowanie nad czasem.' },
        soft: { text: 'Naturalne wsparcie dla ciężaru Saturna, układające plany w trwały kształt.', integration: 'Cichy, wieloletni wzrost pozycji i zaufania w relacjach.' }
      };

      const isHard = (a.aspectType === 'hard');
      const branch = isHard ? data.hard : data.soft;
      const sym = ASPECT_SYMBOLS[a.aspectName] || '∠';
      const orbNum = Math.abs(parseFloat(a.exactOrb));
      const orbVal = orbNum.toFixed(1);
      const orbIntensity = orbNum <= 2.2 ? 'ŚCISŁY RDZEŃ' : (orbNum >= 4.5 ? 'ŁAGODNE TŁO' : 'AKTYWNY');

      let angleNote = '';
      if (isHard) {
        if (a.aspectName === 'Koniunkcja' && branch.conjunctionNote) angleNote = branch.conjunctionNote;
        else if (a.aspectName === 'Opozycja' && branch.oppositionNote) angleNote = branch.oppositionNote;
        else if (a.aspectName === 'Kwadratura' && branch.squareNote) angleNote = branch.squareNote;
      }

      let sunSpec = '';
      if (a.planet === 'sun' && a.aspectName === 'Koniunkcja') {
        if (f.sunProximity === 'cazimi') sunSpec = ' <strong style="color:#E5CC7C;">(Cazimi ≤0°17′:</strong> wyjątkowa jasność celu po oddzieleniu presji otoczenia).';
        else if (f.sunProximity === 'under_beams') sunSpec = ' <strong style="color:#E5CC7C;">(Pod promieniami Słońca ≤17°:</strong> zewnętrzna manifestacja potrzebuje cierpliwego wyjścia z cienia autorytetu).';
      }

      const tightNote = (orbNum <= 2.2 && branch.tightBoost) ? ` ${branch.tightBoost}` : '';
      const borderAccent = isHard ? '#FB7185' : '#34D399';
      const tagBg = isHard ? 'rgba(251,113,133,0.12)' : 'rgba(52,211,153,0.12)';
      const tagBorder = isHard ? 'rgba(251,113,133,0.35)' : 'rgba(52,211,153,0.35)';
      const tagColor = isHard ? '#FB7185' : '#34D399';

      const T = window.SaturnTooltips;
      const aspBadgeText = `${sym} ${a.aspectName.toUpperCase()} • ORB ${orbVal}° • ${orbIntensity}`;
      const aspTipDesc = (T && T.GLOSSARY && T.GLOSSARY.aspects[a.aspectName])
        ? `${T.GLOSSARY.aspects[a.aspectName]} ${T.GLOSSARY.orb ? T.GLOSSARY.orb.def : ''}`
        : '';
      const aspBadgeHtml = (T && aspTipDesc)
        ? T.renderTipBadge(aspBadgeText, `${a.aspectName} (orb ${orbVal}° — ${orbIntensity.toLowerCase()})`, aspTipDesc, T.GLOSSARY.orb ? T.GLOSSARY.orb.basis : '', 'sat-tip-clean')
        : aspBadgeText;

      return `
        <div style="background:rgba(18,18,26,0.75); border:1px solid rgba(255,255,255,0.07); border-left:3.5px solid ${borderAccent}; border-radius:0 10px 10px 0; padding:1.2rem 1.3rem; margin-bottom:1rem; box-shadow:0 4px 20px rgba(0,0,0,0.35);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.65rem;">
            <div style="display:flex; align-items:center; gap:0.65rem;">
              <div style="width:34px; height:34px; border-radius:50%; background:rgba(255,255,255,0.04); border:1px solid ${data.color}50; display:flex; align-items:center; justify-content:center; font-size:1.15rem; color:${data.color}; flex-shrink:0;">${data.glyph}</div>
              <h4 style="font-family:'Playfair Display', serif; font-size:1.08rem; color:#FAF8F5; margin:0; font-weight:600;">${a.aspectName}: Saturn ${data.genitive} (♄ ${sym} ${data.glyph})</h4>
            </div>
            <span style="font-size:0.73rem; text-transform:uppercase; padding:0.25rem 0.65rem; border-radius:9999px; background:${tagBg}; border:1px solid ${tagBorder}; color:${tagColor}; font-family:'JetBrains Mono', monospace; font-weight:700; letter-spacing:0.04em;">
              ${aspBadgeHtml}
            </span>
          </div>
          <p style="font-size:0.87rem; line-height:1.65; color:rgba(250,248,245,0.85); margin:0 0 0.65rem;">${branch.text || ''}${angleNote ? ' ' + angleNote : ''}${sunSpec}${tightNote}</p>
          <p style="font-size:0.84rem; line-height:1.6; color:#E5CC7C; margin:0; padding-top:0.45rem; border-top:1px solid rgba(255,255,255,0.06);"><strong style="color:#C9A96E; font-family:'Playfair Display', serif;">Mądrość dojrzała:</strong> ${branch.integration || ''}</p>
        </div>`;
    }).join('');

    return `
      <div class="disp-card" style="margin-bottom:2rem; padding:clamp(1.2rem, 3vw, 2rem);">
        <div class="disp-badge" style="margin-bottom:0.5rem;">MATRYCA ASPEKTÓW • ASTRA ENGINE</div>
        <h3 style="font-family:'Playfair Display', serif; font-size:clamp(1.35rem, 3vw, 1.85rem); color:#FAF8F5; margin:0 0 0.4rem;">Relacje Kątowe z Planetami Natalnymi</h3>
        <p style="color:rgba(250,248,245,0.7); font-size:0.9rem; margin:0 0 1.25rem; line-height:1.6; max-width:680px;">Planety aspektujące Twojego Saturna różnicują napięcie cyklu — im mniejszy orb, tym wyraźniej dany temat kształtuje główne decyzje:</p>
        ${items}
      </div>`;
  }

  window.SaturnRenderDetails = { renderPassesHtml, renderAspectsList };
})();
