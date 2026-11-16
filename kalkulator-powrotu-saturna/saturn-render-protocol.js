/**
 * NEOROMANTYCZNY — SATURN CHRONOS PROTOCOL RENDERER
 * Dynamiczny Rozdział I (Free) + brama odblokowania bez twardego 28-30 r.ż.
 */
(function () {
  function renderChronosProtocol(satPlanet, signData, houseData, dignityData, dispInfo, passes, isUnlocked = false, ctx) {
    const p1 = window.SATURN_PROTOCOL_PART1 || {};
    const ch1 = (p1.getChapter1 && ctx) ? p1.getChapter1(ctx, satPlanet) : { number: 'Rozdział I', title: 'Mechanika Powrotu Saturna', lead: '', sections: [] };
    const f = ctx ? ctx.facts : { hasTime: true, cycleNum: 1, timeline: { passPattern: 'triple_retrograde' }, houseSystemLabel: 'Placidus' };
    const hasTime = f.hasTime;
    const isSingle = !passes || passes.length <= 1;
    const satSignLoc = (dispInfo && dispInfo.satSignLocative) || satPlanet.signName;
    const houseTitle = hasTime ? (houseData.title || (satPlanet.house + '. Dom')) : 'Wymaga godziny urodzenia';
    const cycleDesc = (window.SATURN_CYCLES_DATA && window.SATURN_CYCLES_DATA.cycles[f.cycleNum]) ? window.SATURN_CYCLES_DATA.cycles[f.cycleNum].ageLabel : 'Powrót Saturna';
    const ch3Title = isSingle ? 'Strategia Pojedynczego Przejścia (~12 Tygodni)' : 'Strategia 3 Fal Tranzytu (Pętla Retrogradacji)';

    const dispLabel = dispInfo
      ? (dispInfo.isSelfRuled ? 'Władca Ostateczny (Saturn)' : `${dispInfo.glyph} ${dispInfo.name} w ${dispInfo.signLocative || dispInfo.signName}${hasTime ? ` (${dispInfo.house}. Dom)` : ''}`)
      : 'Saturn';

    const lockSvg = '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><path d="M7.5 13.5h17l-1 12.2a1.8 1.8 0 0 1-1.8 1.6h-11.4a1.8 1.8 0 0 1-1.8-1.6l-1-12.2Z" stroke-width="1.65"/><path d="M11.2 13.5v-3.2a4.8 4.8 0 0 1 9.6 0v3.2" stroke-width="1.6"/><circle cx="16" cy="18.8" r="1.3" stroke="none" fill="currentColor"/><line x1="16" y1="20" x2="16" y2="22.8" stroke-width="1.2"/></svg>';
    const starSvg = '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.28em 0 0" aria-hidden="true"><polygon points="15.5,4 17.3,14.2 25.5,16 17.3,17.8 15.5,28 13.7,17.8 5.5,16 13.7,14.2" stroke-width="1.25" fill="currentColor" fill-opacity="0.18"/><path d="M10.8 11.3l9.4 9.4M20.2 11.3l-9.4 9.4" stroke-width="0.85" opacity="0.75"/><circle cx="24.5" cy="7.5" r="1.1" stroke="none" fill="currentColor"/></svg>';

    return `
      <section id="chronos-protocol-report" class="disp-card disp-card-gold" style="margin-top:2.5rem; padding:clamp(1.2rem, 3vw, 2.2rem); border-color:${isUnlocked ? 'rgba(52,211,153,0.45)' : 'rgba(201,169,110,0.5)'}; background:linear-gradient(180deg, rgba(22,20,32,0.98) 0%, rgba(12,12,18,0.99) 100%);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.25rem;">
          <div class="disp-badge" style="background:${isUnlocked ? 'rgba(52,211,153,0.22); color:#A7F3D0;' : 'rgba(201,169,110,0.25); color:#FAF8F5;'}; margin:0;">
            ${isUnlocked ? `${starSvg}THE CHRONOS PROTOCOL • PEŁNY RAPORT ODBLOKOWANY` : 'THE CHRONOS PROTOCOL • ZAMKNIĘTY RAPORT TRANSFORMACJI'}
          </div>
          <span style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:${isUnlocked ? '#34D399' : '#C9A96E'};">
            ${isUnlocked ? 'Status: Odblokowany (5/5 Rozdziałów)' : 'Pełny Protokół • 47 PLN'}
          </span>
        </div>

        <h3 style="font-family:'Playfair Display', serif; font-size:clamp(1.6rem, 3.2vw, 2.3rem); color:#FAF8F5; margin:0 0 0.5rem; line-height:1.25;">
          Protokół Przejścia Powrotu Saturna
        </h3>
        <p style="font-size:0.95rem; color:rgba(250,248,245,0.72); margin:0 0 1.5rem; line-height:1.6; max-width:680px;">
          Indywidualna instrukcja dla cyklu <strong>${cycleDesc}</strong> — Saturn w <strong>${satSignLoc}</strong>${hasTime ? ` w <strong>${satPlanet.house}. Domu</strong>` : ' (tryb bez godziny urodzenia)'}.
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; margin-bottom:1.75rem; padding:1rem; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px;">
          <div>
            <span style="font-size:0.72rem; color:rgba(250,248,245,0.5); text-transform:uppercase; font-family:'JetBrains Mono', monospace;">Pozycja &amp; Styl</span>
            <div style="color:#FAF8F5; font-weight:700; font-size:0.9rem;">♄ ${satPlanet.signName} (${satPlanet.degreeInSign})${ctx ? ` • ${ctx.profile.role.name}` : ''}</div>
          </div>
          <div>
            <span style="font-size:0.72rem; color:rgba(250,248,245,0.5); text-transform:uppercase; font-family:'JetBrains Mono', monospace;">${window.SaturnTooltips && window.SaturnTooltips.GLOSSARY ? window.SaturnTooltips.renderTipBadge(`Sektor (${f.houseSystemLabel || 'Placidus'}) `, window.SaturnTooltips.GLOSSARY.houseSystem.title, window.SaturnTooltips.GLOSSARY.houseSystem.def, window.SaturnTooltips.GLOSSARY.houseSystem.basis, 'sat-tip-clean') : `Sektor (${f.houseSystemLabel || 'Placidus'})`}</span>
            <div style="color:#C9A96E; font-weight:700; font-size:0.9rem;">${houseTitle}</div>
          </div>
          <div>
            <span style="font-size:0.72rem; color:rgba(250,248,245,0.5); text-transform:uppercase; font-family:'JetBrains Mono', monospace;">${window.SaturnTooltips && window.SaturnTooltips.GLOSSARY ? window.SaturnTooltips.renderTipBadge('Klucz Dyspozytora ', window.SaturnTooltips.GLOSSARY.dispositor.title, window.SaturnTooltips.GLOSSARY.dispositor.def, window.SaturnTooltips.GLOSSARY.dispositor.basis, 'sat-tip-clean') : 'Klucz Dyspozytora'}</span>
            <div style="color:#60A5FA; font-weight:700; font-size:0.9rem;">${dispLabel}</div>
          </div>
        </div>

        <div style="margin-bottom:2rem; padding:1.25rem; background:${isUnlocked ? 'rgba(52,211,153,0.05)' : 'rgba(201,169,110,0.05)'}; border:1px solid ${isUnlocked ? 'rgba(52,211,153,0.2)' : 'rgba(201,169,110,0.18)'}; border-radius:10px;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.1rem; color:#FAF8F5; margin:0 0 0.85rem;">Struktura Operacyjna Protokołu:</h4>
          <div style="font-family:'JetBrains Mono', monospace; font-size:0.8rem; color:rgba(250,248,245,0.8); line-height:1.9;">
            <div><span style="color:#C9A96E;">[01]</span> ${ch1.number}: ${ch1.title} • <span style="color:#4ADE80;">ODBLOKOWANY</span></div>
            <div><span style="color:#C9A96E;">[02]</span> Rozdział II: ${hasTime ? 'Operacyjna Mapa Sektora Domowego' : 'Strategia Znaku i Aspektów (Tryb Bez Godziny)'} • <span style="color:${isUnlocked ? '#4ADE80' : '#FB7185'};">${isUnlocked ? 'ODBLOKOWANY' : lockSvg + 'Wersja Pełna'}</span></div>
            <div><span style="color:#C9A96E;">[03]</span> Rozdział III: ${ch3Title} • <span style="color:${isUnlocked ? '#4ADE80' : '#FB7185'};">${isUnlocked ? 'ODBLOKOWANY' : lockSvg + 'Wersja Pełna'}</span></div>
            <div><span style="color:#C9A96E;">[04]</span> Rozdział IV: Dźwignia Dyspozytora i 4 Obszary Życia • <span style="color:${isUnlocked ? '#4ADE80' : '#FB7185'};">${isUnlocked ? 'ODBLOKOWANY' : lockSvg + 'Wersja Pełna'}</span></div>
            <div><span style="color:#C9A96E;">[05]</span> Rozdział V: 7 Żelaznych Reguł i Perspektywa Po Cyklu • <span style="color:${isUnlocked ? '#4ADE80' : '#FB7185'};">${isUnlocked ? 'ODBLOKOWANY' : lockSvg + 'Wersja Pełna'}</span></div>
          </div>
        </div>

        <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
          <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#C9A96E; font-weight:700; margin-bottom:0.35rem;">${ch1.number} • PRZEWODNIK BAZOWY</div>
          <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">${ch1.title}</h4>
          <p style="font-size:0.9rem; color:#E5CC7C; font-style:italic; margin:0 0 1.25rem; line-height:1.6;">${ch1.lead}</p>
          ${(ch1.sections || []).map(s => `
            <div style="margin-bottom:1.15rem;">
              <h5 style="font-family:'Playfair Display', serif; font-size:1.05rem; color:#FAF8F5; margin:0 0 0.35rem;">${s.heading}</h5>
              <p style="font-size:0.88rem; line-height:1.75; color:rgba(250,248,245,0.85); margin:0;">${s.text}</p>
            </div>`).join('')}
        </div>

        ${isUnlocked && window.SaturnProtocolFull ? `
          ${window.SaturnProtocolFull.renderUnlockedChapters(satPlanet, houseData, dispInfo, passes, ctx)}
          <div style="margin-top:2rem; padding:1.25rem; background:rgba(52,211,153,0.08); border:1px solid rgba(52,211,153,0.3); border-radius:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="font-weight:700; color:#34D399; font-size:0.95rem;">${starSvg}Pełny Raport Chronosa jest Aktywny</div>
              <div style="font-size:0.8rem; color:rgba(250,248,245,0.7);">Wszystkie 5 rozdziałów dopasowano do Twojego kosmogramu.</div>
            </div>
            <button type="button" onclick="window.print()" class="sat-btn-gold" style="padding:0.6rem 1.2rem; font-size:0.82rem; cursor:pointer;">Zapisz / Drukuj PDF</button>
          </div>
        ` : `
          <div class="sat-paywall-locked" style="position:relative; border-radius:12px; overflow:hidden;">
            <div class="sat-blurred-content" style="filter:blur(6px); opacity:0.35; pointer-events:none; user-select:none;">
              <div style="margin-bottom:1.5rem; padding:1.25rem; background:rgba(255,255,255,0.03); border-radius:8px;">
                <h4 style="font-family:'Playfair Display', serif; font-size:1.2rem; color:#FAF8F5;">Rozdział II: Operacyjna Mapa Sektora</h4>
                <p>Objawy kryzysu, najdroższe błędy decyzyjne oraz konkretny protokół postępowania dla tego wykresu.</p>
              </div>
              <div style="margin-bottom:1.5rem; padding:1.25rem; background:rgba(255,255,255,0.03); border-radius:8px;">
                <h4 style="font-family:'Playfair Display', serif; font-size:1.2rem; color:#FAF8F5;">Rozdział III: ${ch3Title}</h4>
                <p>Wskazówki na czas szczytu orbu ±1°–2° oraz kolejne etapy zamykania tranzytu.</p>
              </div>
              <div style="padding:1.25rem; background:rgba(255,255,255,0.03); border-radius:8px;">
                <h4 style="font-family:'Playfair Display', serif; font-size:1.2rem; color:#FAF8F5;">Rozdział V: 7 Reguł &amp; Perspektywa Po Cyklu</h4>
                <p>Analiza Relacji, Społeczności, Korzeni, Kariery oraz wytyczne na kolejną dekadę.</p>
              </div>
            </div>
            <div class="sat-paywall-overlay" style="position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%; z-index:10; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; background:radial-gradient(circle, rgba(15,15,22,0.92) 0%, rgba(10,10,14,0.98) 100%);">
              <span class="disp-badge" style="background:rgba(201,169,110,0.25); color:#FAF8F5; margin-bottom:0.75rem;">${lockSvg}POUFNA INSTRUKCJA OPERACYJNA</span>
              <h4 style="font-family:'Playfair Display', serif; font-size:clamp(1.35rem, 2.8vw, 1.85rem); color:#FAF8F5; margin:0 0 0.5rem; text-align:center;">Odblokuj Kompletny Protokół (Części II – V)</h4>
              <p style="color:rgba(250,248,245,0.85); max-width:540px; font-size:0.88rem; line-height:1.6; text-align:center; margin:0 0 1.25rem;">
                Spersonalizowane wytyczne dla cyklu <strong>${cycleDesc}</strong>, strategia fal tranzytu, 4 obszary życia oraz kodeks dojrzałości.
              </p>
              <button type="button" id="sat-unlock-btn" data-luxe-checkout="saturn" class="sat-btn-gold" style="margin-bottom:0.6rem; cursor:pointer; border:none; display:inline-flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.95rem 2rem; font-size:0.95rem; font-weight:700;">
                <span>Odblokuj Raport Przejścia — 47 PLN</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <span style="font-size:0.75rem; color:rgba(250,248,245,0.5); font-family:'JetBrains Mono', monospace;">Płatność jednorazowa Stripe (BLIK / Apple Pay / Karta) • Natychmiastowy dostęp</span>
            </div>
          </div>
        `}
      </section>
    `;
  }

  window.SaturnRenderProtocol = { renderChronosProtocol };
})();
