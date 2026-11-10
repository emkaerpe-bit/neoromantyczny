/**
 * NEOROMANTYCZNY — SATURN CHRONOS PROTOCOL RENDERER
 * Prezentacja raportu w wersji Free / Curiosity Gap / Odblokowanej (47 PLN)
 */
(function () {
  function renderChronosProtocol(satPlanet, signData, houseData, dignityData, dispInfo, passes, isUnlocked = false) {
    const p1 = window.SATURN_PROTOCOL_PART1 || {};
    const ch1 = p1.chapter1 || {};
    const houseTitle = houseData.title || (satPlanet.house + '. Dom');
    const satSignLoc = (dispInfo && dispInfo.satSignLocative) || satPlanet.signName;

    return `
      <section id="chronos-protocol-report" class="disp-card disp-card-gold" style="margin-top:2.5rem; padding:clamp(1.2rem, 3vw, 2.2rem); border-color:${isUnlocked ? 'rgba(52,211,153,0.45)' : 'rgba(201,169,110,0.5)'}; background:linear-gradient(180deg, rgba(22,20,32,0.98) 0%, rgba(12,12,18,0.99) 100%);">
        <!-- Nagłówek Raportu -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.25rem;">
          <div class="disp-badge" style="background:${isUnlocked ? 'rgba(52,211,153,0.22); color:#A7F3D0;' : 'rgba(201,169,110,0.25); color:#FAF8F5;'}; margin:0;">
            ${isUnlocked ? '✨ THE CHRONOS PROTOCOL • PEŁNY RAPORT ODBLOKOWANY' : 'THE CHRONOS PROTOCOL • ZAMKNIĘTY RAPORT TRANSFORMACJI'}
          </div>
          <span style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:${isUnlocked ? '#34D399' : '#C9A96E'};">
            ${isUnlocked ? 'Status: Autoryzowany (5/5 Rozdziałów)' : 'Standard Midnight Luxe • 47 PLN'}
          </span>
        </div>

        <h3 style="font-family:'Playfair Display', serif; font-size:clamp(1.6rem, 3.2vw, 2.3rem); color:#FAF8F5; margin:0 0 0.5rem; line-height:1.25;">
          Protokół Przetrwania Powrotu Saturna
        </h3>
        <p style="font-size:0.95rem; color:rgba(250,248,245,0.7); margin:0 0 1.5rem; line-height:1.6; max-width:680px;">
          Indywidualna, dojrzała instrukcja przejścia tranzytu 28–30 r.ż. dla Saturna w <strong>${satSignLoc}</strong> w <strong>${satPlanet.house}. Domu</strong> kosmogramu.
        </p>

        <!-- Pasek Metadanych Kosmogramu -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; margin-bottom:1.75rem; padding:1rem; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px;">
          <div>
            <span style="font-size:0.72rem; color:rgba(250,248,245,0.5); text-transform:uppercase; font-family:'JetBrains Mono', monospace;">Pozycja Saturna</span>
            <div style="color:#FAF8F5; font-weight:700; font-size:0.9rem;">♄ ${satPlanet.signName} (${satPlanet.degreeInSign})</div>
          </div>
          <div>
            <span style="font-size:0.72rem; color:rgba(250,248,245,0.5); text-transform:uppercase; font-family:'JetBrains Mono', monospace;">Sektor Próby (Placidus)</span>
            <div style="color:#C9A96E; font-weight:700; font-size:0.9rem;">${houseTitle}</div>
          </div>
          <div>
            <span style="font-size:0.72rem; color:rgba(250,248,245,0.5); text-transform:uppercase; font-family:'JetBrains Mono', monospace;">Klucz Dyspozytora</span>
            <div style="color:#60A5FA; font-weight:700; font-size:0.9rem;">${dispInfo ? (dispInfo.isSelfRuled ? 'Władca Ostateczny (Saturn)' : `${dispInfo.glyph} ${dispInfo.name} w ${dispInfo.signLocative || dispInfo.signName} (${dispInfo.house}. Dom)`) : 'Saturn'}</div>
          </div>
        </div>

        <!-- Spis Treści Raportu -->
        <div style="margin-bottom:2rem; padding:1.25rem; background:${isUnlocked ? 'rgba(52,211,153,0.05)' : 'rgba(201,169,110,0.05)'}; border:1px solid ${isUnlocked ? 'rgba(52,211,153,0.2)' : 'rgba(201,169,110,0.18)'}; border-radius:10px;">
          <h4 style="font-family:'Playfair Display', serif; font-size:1.1rem; color:#FAF8F5; margin:0 0 0.85rem;">
            Struktura Operacyjna Protokołu:
          </h4>
          <div style="font-family:'JetBrains Mono', monospace; font-size:0.8rem; color:rgba(250,248,245,0.8); line-height:1.9;">
            <div><span style="color:#C9A96E;">[01]</span> Rozdział I: Anatomia Kryzysu 28–30 Lat • <span style="color:#4ADE80;">ODBLOKOWANY</span></div>
            <div><span style="color:#C9A96E;">[02]</span> Rozdział II: Pole Bitwy w Twoim Domu • <span style="color:${isUnlocked ? '#4ADE80' : '#FB7185'};">${isUnlocked ? 'ODBLOKOWANY' : '🔒 Wersja Pełna'}</span></div>
            <div><span style="color:#C9A96E;">[03]</span> Rozdział III: Strategia 3 Fal Tranzytu • <span style="color:${isUnlocked ? '#4ADE80' : '#FB7185'};">${isUnlocked ? 'ODBLOKOWANY' : '🔒 Wersja Pełna'}</span></div>
            <div><span style="color:#C9A96E;">[04]</span> Rozdział IV: Dźwignia Dyspozytora jako Bezpiecznika • <span style="color:${isUnlocked ? '#4ADE80' : '#FB7185'};">${isUnlocked ? 'ODBLOKOWANY' : '🔒 Wersja Pełna'}</span></div>
            <div><span style="color:#C9A96E;">[05]</span> Rozdział V: Kodeks Rezyliencji Chronosa (7 Reguł) • <span style="color:${isUnlocked ? '#4ADE80' : '#FB7185'};">${isUnlocked ? 'ODBLOKOWANY' : '🔒 Wersja Pełna'}</span></div>
          </div>
        </div>

        <!-- ROZDZIAŁ 1: FUNDAMENTALNY (ZAWSZE ODBLOKOWANY) -->
        <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
          <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#C9A96E; font-weight:700; margin-bottom:0.35rem;">
            ${ch1.number || 'Rozdział I'} • PRZEWODNIK FUNDAMENTALNY
          </div>
          <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">
            ${ch1.title || ''}
          </h4>
          <p style="font-size:0.92rem; color:#E5CC7C; font-style:italic; margin:0 0 1.25rem; line-height:1.6;">
            „${ch1.lead || ''}”
          </p>

          ${(ch1.sections || []).map(s => `
            <div style="margin-bottom:1.15rem;">
              <h5 style="font-family:'Playfair Display', serif; font-size:1.05rem; color:#FAF8F5; margin:0 0 0.35rem;">
                ${s.heading}
              </h5>
              <p style="font-size:0.88rem; line-height:1.75; color:rgba(250,248,245,0.85); margin:0;">
                ${s.text}
              </p>
            </div>
          `).join('')}
        </div>

        <!-- CZĘŚĆ OPERACYJNA: ODBLOKOWANA LUB ZAMGLONA -->
        ${isUnlocked && window.SaturnProtocolFull ? `
          ${window.SaturnProtocolFull.renderUnlockedChapters(satPlanet, houseData, dispInfo, passes)}

          <!-- Panel Akcji Odblokowanego Raportu -->
          <div style="margin-top:2rem; padding:1.25rem; background:rgba(52,211,153,0.08); border:1px solid rgba(52,211,153,0.3); border-radius:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
            <div>
              <div style="font-weight:700; color:#34D399; font-size:0.95rem;">✨ Pełny Raport Chronosa jest Aktywny</div>
              <div style="font-size:0.8rem; color:rgba(250,248,245,0.7);">Wszystkie 5 rozdziałów zostało pomyślnie odblokowane.</div>
            </div>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
              <button type="button" onclick="window.print()" class="sat-btn-gold" style="padding:0.6rem 1.2rem; font-size:0.82rem; cursor:pointer;">
                🖨️ Zapisz / Drukuj PDF
              </button>
            </div>
          </div>
        ` : `
          <div class="sat-paywall-locked" style="position:relative; border-radius:12px; overflow:hidden;">
            <div class="sat-blurred-content" style="filter:blur(6px); opacity:0.35; pointer-events:none; user-select:none;">
              <div style="margin-bottom:1.5rem; padding:1.25rem; background:rgba(255,255,255,0.03); border-radius:8px;">
                <h4 style="font-family:'Playfair Display', serif; font-size:1.2rem; color:#FAF8F5;">Rozdział II: Pole Bitwy w Twoim Domu</h4>
                <p>Szczegółowa mapa pola bitwy: ${houseTitle}. Mandat audytu i 3 miny operacyjne w Twoim ${satPlanet.house}. Domu.</p>
              </div>
              <div style="margin-bottom:1.5rem; padding:1.25rem; background:rgba(255,255,255,0.03); border-radius:8px;">
                <h4 style="font-family:'Playfair Display', serif; font-size:1.2rem; color:#FAF8F5;">Rozdział III: Strategia 3 Fal Tranzytu</h4>
                <p>Kalendarz trzech przejść kątowych 0°00'. Procedura operacyjna na czas retrogradacji Saturna (Korytarz Cienia).</p>
              </div>
              <div style="padding:1.25rem; background:rgba(255,255,255,0.03); border-radius:8px;">
                <h4 style="font-family:'Playfair Display', serif; font-size:1.2rem; color:#FAF8F5;">Rozdział V: Kodeks Rezyliencji Chronosa</h4>
                <p>7 Żelaznych Reguł Dojrzałości Chronosa. Instrukcja krystalizacji nowej tożsamości na kolejne 29 lat życia.</p>
              </div>
            </div>

            <!-- Karta Konwersji Midnight Luxe (Bezpośredni Checkout / Odblokowanie) -->
            <div class="sat-paywall-overlay" style="position:absolute; top:0; left:0; right:0; bottom:0; width:100%; height:100%; z-index:10; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.5rem; background:radial-gradient(circle, rgba(15,15,22,0.92) 0%, rgba(10,10,14,0.98) 100%);">
              <span class="disp-badge" style="background:rgba(201,169,110,0.25); color:#FAF8F5; margin-bottom:0.75rem;">
                🔒 POUFNA INSTRUKCJA OPERACYJNA
              </span>
              <h4 style="font-family:'Playfair Display', serif; font-size:clamp(1.35rem, 2.8vw, 1.85rem); color:#FAF8F5; margin:0 0 0.5rem; text-align:center;">
                Odblokuj Kompletny Protokół Przetrwania (Części II – V)
              </h4>
              <p style="color:rgba(250,248,245,0.85); max-width:540px; font-size:0.88rem; line-height:1.6; text-align:center; margin:0 0 1.25rem;">
                Konkretne procedury postępowania dla Twojego <strong>${satPlanet.house}. Domu</strong>, instrukcja na czas retrogradacji oraz Kodeks 7 Reguł Rezyliencji.
              </p>

              <button type="button" id="sat-unlock-btn" class="sat-btn-gold" style="margin-bottom:0.6rem; cursor:pointer; border:none; padding:0.95rem 2rem; font-size:0.95rem; font-weight:700;">
                <span>Odblokuj Raport Przetrwania — 47 PLN</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>

              <span style="font-size:0.75rem; color:rgba(250,248,245,0.5); font-family:'JetBrains Mono', monospace;">
                Płatność jednorazowa Stripe (BLIK / Apple Pay / Karta) • Natychmiastowy dostęp
              </span>
            </div>
          </div>
        `}
      </section>
    `;
  }

  window.SaturnRenderProtocol = {
    renderChronosProtocol
  };
})();
