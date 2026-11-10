/**
 * NEOROMANTYCZNY — THE CHRONOS PROTOCOL: FULL UNLOCKED CHAPTERS (2-5)
 * Złoty standard Midnight Luxe dla odblokowanego raportu
 */
(function () {
  function renderUnlockedChapters(satPlanet, houseData, dispInfo, passes) {
    const p1 = window.SATURN_PROTOCOL_PART1 || {};
    const p2 = window.SATURN_PROTOCOL_PART2 || {};
    const ch2 = p1.chapter2 || {};
    const ch3 = p2.chapter3 || {};
    const ch4 = p2.chapter4 || {};
    const ch5 = p2.chapter5 || {};
    const hGuide = (ch2.getHouseGuidelines && ch2.getHouseGuidelines(satPlanet.house, houseData)) || {};

    return `
      <!-- ROZDZIAŁ II: POLE BITWY W TWOIM DOMU -->
      <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#4ADE80; font-weight:700; margin-bottom:0.35rem;">
          ${ch2.number || 'Rozdział II'} • PEŁNA INSTRUKCJA OPERACYJNA • ODBLOKOWANY
        </div>
        <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">
          ${ch2.title || ''}: ${hGuide.houseName}
        </h4>
        <p style="font-size:0.9rem; color:#C9A96E; margin:0 0 1.25rem;">
          <strong>Pole walki i audytu:</strong> ${hGuide.battlefield}
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
          <div style="background:rgba(201,169,110,0.06); border:1px solid rgba(201,169,110,0.2); border-radius:8px; padding:1rem;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#C9A96E; font-weight:700; margin-bottom:0.35rem;">MANDAT AUDYTU SATURNA</div>
            <p style="font-size:0.85rem; line-height:1.6; color:rgba(250,248,245,0.9); margin:0;">${hGuide.auditMandate}</p>
          </div>
          <div style="background:rgba(251,113,133,0.06); border:1px solid rgba(251,113,133,0.25); border-radius:8px; padding:1rem;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#FB7185; font-weight:700; margin-bottom:0.35rem;">GŁÓWNA PUŁAPKA CIENIA</div>
            <p style="font-size:0.85rem; line-height:1.6; color:rgba(250,248,245,0.9); margin:0;">${hGuide.dangerZone}</p>
          </div>
        </div>

        <div style="background:rgba(52,211,153,0.06); border:1px solid rgba(52,211,153,0.25); border-radius:8px; padding:1rem;">
          <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#34D399; font-weight:700; margin-bottom:0.35rem;">STRATEGICZNE ZWYCIĘSTWO (DAR TRANZYTU)</div>
          <p style="font-size:0.85rem; line-height:1.6; color:rgba(250,248,245,0.9); margin:0;">${hGuide.strategicVictory}</p>
        </div>
      </div>

      <!-- ROZDZIAŁ III: STRATEGIA 3 FAL TRANZYTU -->
      <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#4ADE80; font-weight:700; margin-bottom:0.35rem;">
          ${ch3.number || 'Rozdział III'} • HARMONOGRAM PRZETRWANIA • ODBLOKOWANY
        </div>
        <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">
          ${ch3.title || ''}
        </h4>
        <p style="font-size:0.9rem; color:rgba(250,248,245,0.7); margin:0 0 1.25rem;">${ch3.subtitle || ''}</p>

        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${(ch3.waves || []).map((w, idx) => `
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:1.15rem;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#C9A96E; font-weight:700; margin-bottom:0.4rem;">
                ${w.phase}
              </div>
              <p style="font-size:0.88rem; line-height:1.6; color:rgba(250,248,245,0.9); margin:0 0 0.75rem;">
                <strong>Ogniskowa:</strong> ${w.focus}
              </p>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.75rem; font-size:0.82rem; line-height:1.55;">
                <div style="color:#A7F3D0; background:rgba(16,185,129,0.08); padding:0.6rem; border-radius:6px;">
                  <strong>DO:</strong> ${w.dos}
                </div>
                <div style="color:#FECDD3; background:rgba(244,63,94,0.08); padding:0.6rem; border-radius:6px;">
                  <strong>DON'T:</strong> ${w.donts}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ROZDZIAŁ IV: DŹWIGNIA DYSPOZYTORA -->
      <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#4ADE80; font-weight:700; margin-bottom:0.35rem;">
          ${ch4.number || 'Rozdział IV'} • ZASILANIE ODPORNOŚCI • ODBLOKOWANY
        </div>
        <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">
          ${ch4.title || ''}
        </h4>
        <p style="font-size:0.88rem; line-height:1.7; color:rgba(250,248,245,0.85); margin:0 0 1.25rem;">
          ${ch4.corePrinciple || ''}
        </p>
        ${dispInfo ? `
          <div style="padding:1rem; background:rgba(96,165,250,0.08); border:1px solid rgba(96,165,250,0.25); border-radius:8px;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#93C5FD; font-weight:700; margin-bottom:0.35rem;">
              TWÓJ KLUCZ DYSPOZYTORA: ${dispInfo.glyph} ${dispInfo.name.toUpperCase()} W ${dispInfo.signLocative ? dispInfo.signLocative.toUpperCase() : dispInfo.signName.toUpperCase()} (${dispInfo.house}. DOM)
            </div>
            <p style="font-size:0.86rem; line-height:1.6; color:rgba(250,248,245,0.9); margin:0 0 0.5rem;">
              <strong>Zarządzanie energią:</strong> ${dispInfo.lesson}
            </p>
            <p style="font-size:0.82rem; color:#C9A96E; margin:0 0 0.85rem;">
              <strong>Rekomendacja operacyjna:</strong> ${dispInfo.actionTip}
            </p>
            <div style="border-top:1px solid rgba(96,165,250,0.2); padding-top:0.75rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <span style="font-size:0.8rem; color:rgba(250,248,245,0.75);">
                Odkryj Władcę Ostatecznego i zamknięte pętle podświadomości:
              </span>
              <a href="/kalkulator-dyspozytorow/" style="display:inline-flex; align-items:center; gap:0.4rem; background:rgba(96,165,250,0.15); border:1px solid rgba(96,165,250,0.35); color:#93C5FD; padding:0.4rem 0.85rem; border-radius:9999px; font-size:0.8rem; font-weight:600; text-decoration:none;">
                <span>Zbadaj Pełne Drzewo Dyspozytorów &rarr;</span>
              </a>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ROZDZIAŁ V: KODEKS REZYLIENCJI CHRONOSA -->
      <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#4ADE80; font-weight:700; margin-bottom:0.35rem;">
          ${ch5.number || 'Rozdział V'} • 7 ŻELAZNYCH REGUŁ DOJRZAŁOŚCI • ODBLOKOWANY
        </div>
        <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">
          ${ch5.title || ''}
        </h4>
        <p style="font-size:0.9rem; color:rgba(250,248,245,0.7); margin:0 0 1.25rem;">${ch5.subtitle || ''}</p>

        <div style="display:flex; flex-direction:column; gap:0.85rem;">
          ${(ch5.rules || []).map(r => `
            <div style="padding:0.9rem 1.15rem; background:rgba(255,255,255,0.025); border-left:3px solid #C9A96E; border-radius:0 8px 8px 0;">
              <div style="font-family:'Playfair Display', serif; font-size:1.05rem; color:#FAF8F5; margin-bottom:0.25rem;">
                <span style="color:#C9A96E; font-family:'JetBrains Mono', monospace; font-size:0.85rem; margin-right:0.4rem;">${r.num}.</span> ${r.title}
              </div>
              <p style="font-size:0.86rem; line-height:1.65; color:rgba(250,248,245,0.85); margin:0;">${r.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  window.SaturnProtocolFull = {
    renderUnlockedChapters
  };
})();
