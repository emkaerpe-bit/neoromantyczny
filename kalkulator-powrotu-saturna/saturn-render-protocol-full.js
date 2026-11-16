/**
 * NEOROMANTYCZNY — THE CHRONOS PROTOCOL: FULL UNLOCKED CHAPTERS (II-V)
 * Zero powtórzeń z warstwy darmowej • Pełne 8 domen życia • Polskie oznaczenia
 */
(function () {
  function renderUnlockedChapters(satPlanet, houseData, dispInfo, passes, ctx) {
    const p1 = window.SATURN_PROTOCOL_PART1 || {};
    const p2 = window.SATURN_PROTOCOL_PART2 || {};
    const p3 = window.SATURN_PROTOCOL_PART3 || {};
    const hasTime = ctx ? ctx.facts.hasTime : true;

    const ch2 = p1.chapter2 || {};
    const hGuide = (ch2.getHouseGuidelines && ch2.getHouseGuidelines(satPlanet.house, houseData, ctx)) || {};
    const ch3 = (p2.getChapter3 && p2.getChapter3(ctx, passes)) || {};
    const ch4 = (p2.getChapter4 && p2.getChapter4(ctx, dispInfo, satPlanet)) || {};
    const domains = (p3.buildLifeDomains && p3.buildLifeDomains(ctx, satPlanet)) || [];
    const ch5 = (p3.getChapter5 && p3.getChapter5(ctx)) || {};

    return `
      <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#4ADE80; font-weight:700; margin-bottom:0.35rem;">
          ${ch2.number || 'Rozdział II'} • INSTRUKCJA OPERACYJNA • ODBLOKOWANY
        </div>
        <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">${ch2.title || ''}: ${hGuide.houseName}</h4>
        <p style="font-size:0.9rem; color:#C9A96E; margin:0 0 1.25rem; line-height:1.6;"><strong>Scenariusz pola próby:</strong> ${hGuide.battlefield}</p>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
          <div style="background:rgba(251,113,133,0.06); border:1px solid rgba(251,113,133,0.25); border-radius:8px; padding:1rem;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#FB7185; font-weight:700; margin-bottom:0.35rem;">NAJDROŻSZY BŁĄD DECYZYJNY</div>
            <p style="font-size:0.85rem; line-height:1.6; color:rgba(250,248,245,0.9); margin:0;">${hGuide.auditMandate}</p>
          </div>
          <div style="background:rgba(201,169,110,0.06); border:1px solid rgba(201,169,110,0.22); border-radius:8px; padding:1rem;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#C9A96E; font-weight:700; margin-bottom:0.35rem;">PROCEDURA NAPRAWCZA</div>
            <p style="font-size:0.85rem; line-height:1.6; color:rgba(250,248,245,0.9); margin:0;">${hGuide.dangerZone}</p>
          </div>
        </div>
        <div style="background:rgba(52,211,153,0.06); border:1px solid rgba(52,211,153,0.25); border-radius:8px; padding:1rem;">
          <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#34D399; font-weight:700; margin-bottom:0.35rem;">WPŁYW NA RELACJE &amp; SYNTEZA</div>
          <p style="font-size:0.85rem; line-height:1.6; color:rgba(250,248,245,0.9); margin:0;">${hGuide.strategicVictory}</p>
        </div>
      </div>

      <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#4ADE80; font-weight:700; margin-bottom:0.35rem;">
          ${ch3.number || 'Rozdział III'} • HARMONOGRAM PRZETRWANIA • ODBLOKOWANY
        </div>
        <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">${ch3.title || ''}</h4>
        <p style="font-size:0.9rem; color:rgba(250,248,245,0.75); margin:0 0 1.25rem;">${ch3.subtitle || ''}</p>
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${(ch3.waves || []).map(w => `
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:1.15rem;">
              <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#C9A96E; font-weight:700; margin-bottom:0.4rem;">${w.phase}</div>
              <p style="font-size:0.88rem; line-height:1.6; color:rgba(250,248,245,0.9); margin:0 0 0.75rem;"><strong>Cel etapu:</strong> ${w.focus}</p>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:0.75rem; font-size:0.82rem; line-height:1.55;">
                <div style="color:#A7F3D0; background:rgba(16,185,129,0.08); padding:0.65rem; border-radius:6px;"><strong>ZALECENIE:</strong> ${w.dos}</div>
                <div style="color:#FECDD3; background:rgba(244,63,94,0.08); padding:0.65rem; border-radius:6px;"><strong>UNIKAJ:</strong> ${w.donts}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#4ADE80; font-weight:700; margin-bottom:0.35rem;">
          ${ch4.number || 'Rozdział IV'} • ZASILANIE &amp; 4 OBSZARY ŻYCIA • ODBLOKOWANY
        </div>
        <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">${ch4.title || ''}</h4>
        <p style="font-size:0.88rem; line-height:1.7; color:rgba(250,248,245,0.88); margin:0 0 1.15rem;">${ch4.corePrinciple || ''}</p>
        ${dispInfo ? `
          <div style="padding:1rem; background:rgba(96,165,250,0.08); border:1px solid rgba(96,165,250,0.25); border-radius:8px; margin-bottom:1.15rem;">
            <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#93C5FD; font-weight:700; margin-bottom:0.35rem;">
              KLUCZ OPERACYJNY: ${dispInfo.glyph} ${dispInfo.name.toUpperCase()} W ${(dispInfo.signLocative || dispInfo.signName).toUpperCase()}${hasTime ? ` (${dispInfo.house}. DOM)` : ''}
            </div>
            <p style="font-size:0.86rem; line-height:1.6; color:rgba(250,248,245,0.92); margin:0 0 0.75rem;">${ch4.deepAction}</p>
            <div style="border-top:1px solid rgba(96,165,250,0.2); padding-top:0.75rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <span style="font-size:0.8rem; color:rgba(250,248,245,0.75);">Pełna mapa hierarchii decyzji w całym kosmogramie:</span>
              <a href="/kalkulator-dyspozytorow/" style="display:inline-flex; align-items:center; gap:0.4rem; background:rgba(96,165,250,0.15); border:1px solid rgba(96,165,250,0.35); color:#93C5FD; padding:0.4rem 0.85rem; border-radius:9999px; font-size:0.8rem; font-weight:600; text-decoration:none;">
                <span>Zbadaj Drzewo Dyspozytorów &rarr;</span>
              </a>
            </div>
          </div>` : ''}
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.75rem;">
          ${domains.map(d => `<div style="padding:0.9rem; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:8px; font-size:0.84rem; line-height:1.6; color:rgba(250,248,245,0.88);">${d}</div>`).join('')}
        </div>
      </div>

      <div class="chronos-chapter-unlocked" style="margin-bottom:2rem; padding:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px;">
        <div style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#4ADE80; font-weight:700; margin-bottom:0.35rem;">
          ${ch5.number || 'Rozdział V'} • KODEKS &amp; DOMKNIĘCIE • ODBLOKOWANY
        </div>
        <h4 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">${ch5.title || ''}</h4>
        <p style="font-size:0.9rem; color:rgba(250,248,245,0.75); margin:0 0 1.25rem;">${ch5.subtitle || ''}</p>
        <div style="display:flex; flex-direction:column; gap:0.85rem; margin-bottom:1.25rem;">
          ${(ch5.rules || []).map(r => `
            <div style="padding:0.9rem 1.15rem; background:rgba(255,255,255,0.025); border-left:3px solid #C9A96E; border-radius:0 8px 8px 0;">
              <div style="font-family:'Playfair Display', serif; font-size:1.05rem; color:#FAF8F5; margin-bottom:0.25rem;">
                <span style="color:#C9A96E; font-family:'JetBrains Mono', monospace; font-size:0.85rem; margin-right:0.4rem;">${r.num}.</span> ${r.title}
              </div>
              <p style="font-size:0.86rem; line-height:1.65; color:rgba(250,248,245,0.85); margin:0;">${r.desc}</p>
            </div>`).join('')}
        </div>
        <div style="padding:1rem 1.15rem; background:rgba(201,169,110,0.08); border:1px solid rgba(201,169,110,0.3); border-radius:8px;">
          <div style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#C9A96E; font-weight:700; margin-bottom:0.35rem;">PERSPEKTYWA PO ZAMKNIĘCIU CYKLU</div>
          <p style="font-size:0.88rem; line-height:1.65; color:#FAF8F5; margin:0;">${ch5.closingSummary || ''}</p>
        </div>
      </div>
    `;
  }

  window.SaturnProtocolFull = { renderUnlockedChapters };
})();
