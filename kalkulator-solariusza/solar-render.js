/**
 * NEOROMANTYCZNY — SOLAR RETURN REPORT RENDERER (FREE LAYER + 6-CHAPTER PAYWALL)
 */
(function () {
  function fmtDatePl(dateObj) {
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZone: 'Europe/Warsaw'
    }).format(dateObj);
  }
  function fmtShortPl(dateObj) {
    return new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric', month: 'long', day: 'numeric',
      timeZone: 'Europe/Warsaw'
    }).format(dateObj);
  }

  function renderFreeLayer(res) {
    const D = window.SOLAR_DATA;
    const sunH = D.SUN_HOUSES[res.srSun.house] || D.SUN_HOUSES[1];
    const ascS = D.ASC_SIGNS[res.srAscInfo.signKey] || D.ASC_SIGNS.Aries;
    const ovH = D.NATAL_OVERLAY_HOUSES[res.srAscInNatalHouse] || D.NATAL_OVERLAY_HOUSES[1];
    const tl = D.TIME_LORDS[res.timeLordKey] || D.TIME_LORDS.sun;
    const hardCount = res.srToNatalAspects.filter(a => a.tone === 'hard' || a.tone === 'intense').length;
    const hardLabel = hardCount === 1 ? 'punkt zapalny' : (hardCount >= 2 && hardCount <= 4 ? 'punkty zapalne' : 'punktów zapalnych');

    const years = [res.targetYear - 3, res.targetYear - 2, res.targetYear - 1, res.targetYear, res.targetYear + 1, res.targetYear + 2]
      .filter(y => y >= res.birthYear && y <= 2035);

    const relocList = window.SolarEngine.previewRelocationCities(res.srJd, res.natalCusps, D.RELOCATION_PRESETS || []);

    return `
      <div class="disp-card" style="margin-bottom:1.5rem;border-color:rgba(201,168,76,0.35);">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;">
          <div>
            <div class="disp-badge">DOKŁADNY MOMENT POWROTU SŁOŃCA • NEWTON-RAPHSON</div>
            <h2 style="font-family:'Playfair Display',serif;font-size:clamp(1.45rem,3vw,2.1rem);color:#FAF8F5;margin:0.35rem 0 0.25rem;">
              Solariusz ${res.targetYear}: ${sunH.title}
            </h2>
            <p style="font-family:'JetBrains Mono',monospace;font-size:0.84rem;color:#C9A84C;margin:0;">
              ${fmtDatePl(res.srDateUtc)} (Warszawa) &bull; UTC: ${res.srDateUtc.toISOString().replace('T', ' ').slice(0, 19)} &bull; Wiek w cyklu: ${res.age} lat
            </p>
          </div>
          <div style="background:rgba(244,63,94,0.12);border:1px solid rgba(244,63,94,0.35);padding:0.55rem 0.9rem;border-radius:10px;text-align:right;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:#FDA4AF;text-transform:uppercase;">Alerty Roku (SR → Radix)</div>
            <div style="font-family:'Playfair Display',serif;font-size:1.15rem;color:#FAF8F5;font-weight:700;">${hardCount} ${hardLabel}</div>
          </div>
        </div>
        <div class="solar-flashback-bar no-print">
          <span style="font-size:0.74rem;font-family:'JetBrains Mono',monospace;color:rgba(250,248,245,0.55);">SOLAR FLASHBACK / PODGLĄD LAT:</span>
          ${years.map(y => `<button type="button" class="solar-year-pill ${y === res.targetYear ? 'is-active' : ''}" data-solar-year="${y}">${y}</button>`).join('')}
        </div>
      </div>

      <div class="solar-kpi-grid">
        <div class="solar-kpi-card">
          <div class="solar-kpi-label">1. Słońce w Domu Solariusza</div>
          <div class="solar-kpi-val">${res.srSun.house}. Dom &bull; ${res.srSun.signName}</div>
          <div class="solar-kpi-sub">${sunH.freeDiag}</div>
        </div>
        <div class="solar-kpi-card">
          <div class="solar-kpi-label">2. Ascendent Roku (${res.input.relocCoords.name})</div>
          <div class="solar-kpi-val">${res.srAscInfo.glyph} ${res.srAscInfo.signName} (${res.srAscInfo.deg}°)</div>
          <div class="solar-kpi-sub">${ascS.freeSummary}</div>
        </div>
        <div class="solar-kpi-card">
          <div class="solar-kpi-label">3. Nakładka na Radix</div>
          <div class="solar-kpi-val">${res.srAscInNatalHouse}. Dom Urodzeniowy</div>
          <div class="solar-kpi-sub">${ovH.stage}</div>
        </div>
        <div class="solar-kpi-card">
          <div class="solar-kpi-label">4. Władca Roku (Profekcja ${res.profectionHouse}. Domu)</div>
          <div class="solar-kpi-val">${res.timeLordSrPlanet.glyph} ${res.timeLordSrPlanet.name} (w ${res.timeLordSrPlanet.house}. Domu)</div>
          <div class="solar-kpi-sub">${tl.title}. Znak profekcji: ${res.profectionSign.name}.</div>
        </div>
      </div>

      <div class="disp-lab-grid" style="margin-bottom:1.5rem;">
        <div class="disp-lab-visual">
          <div class="disp-card disp-wheel-card" style="padding:1.25rem 1rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <span class="disp-badge" style="margin:0;">KOŁO SOLARIUSZA • ${res.targetYear}</span>
              <span style="font-size:0.74rem;font-family:'JetBrains Mono',monospace;color:#C9A84C;">Placidus (${res.input.relocCoords.name})</span>
            </div>
            ${window.SolarWheel.renderSolarReturnWheel(res)}
          </div>
        </div>
        <div class="disp-lab-analysis">
          <div class="disp-card" style="margin-bottom:1.25rem;">
            <h3 style="font-family:'Playfair Display',serif;color:#FAF8F5;font-size:1.15rem;margin:0 0 0.75rem;">Pozycje Planet w Solariuszu</h3>
            <table class="disp-table" style="width:100%;">
              <thead><tr><th>Planeta</th><th>Znak i Stopień</th><th>Dom SR</th></tr></thead>
              <tbody>
                ${res.srPlanets.slice(0, 7).map(p => `
                  <tr>
                    <td style="color:#FAF8F5;font-weight:600;">${p.glyph} ${p.name}${p.key === res.timeLordKey ? ' <span style="color:#C9A84C;font-size:0.7rem;">(WŁADCA ROKU)</span>' : ''}</td>
                    <td style="font-family:'JetBrains Mono',monospace;font-size:0.82rem;">${p.formatted}</td>
                    <td style="color:#C9A84C;font-weight:700;">${p.house}. Dom</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div class="disp-card no-print">
            <div class="disp-badge">SYMULATOR RELOKACJI URODZINOWEJ</div>
            <p style="font-size:0.82rem;color:rgba(250,248,245,0.72);margin:0.35rem 0 0.65rem;">Kliknij miasto spędzania urodzin w ${res.targetYear} roku, aby zobaczyć zmianę Ascendentu i Domu Radixu:</p>
            <div class="solar-reloc-row">
              ${relocList.map(c => `<button type="button" class="solar-year-pill ${c.name === res.input.relocCoords.name ? 'is-active' : ''}" data-reloc-city="${c.name} (${c.country})">${c.name} &rarr; ${c.ascInfo.signName} (${c.srAscInNatalHouse}. dom)</button>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  function renderPaywallOrReport(res, unlocked) {
    const D = window.SOLAR_DATA;
    const sunH = D.SUN_HOUSES[res.srSun.house] || D.SUN_HOUSES[1];
    const ascS = D.ASC_SIGNS[res.srAscInfo.signKey] || D.ASC_SIGNS.Aries;
    const ovH = D.NATAL_OVERLAY_HOUSES[res.srAscInNatalHouse] || D.NATAL_OVERLAY_HOUSES[1];
    const tl = D.TIME_LORDS[res.timeLordKey] || D.TIME_LORDS.sun;
    const moonText = D.MOON_SIGNS[res.srMoon.signKey] || '';
    const relocAdvice = D.getRelocHouseVerdict(res.srAscInNatalHouse);

    const crossSell = `
      <div class="disp-card no-print" style="margin-top:1.75rem;border-color:rgba(201,168,76,0.38);background:linear-gradient(135deg,rgba(201,168,76,0.08),rgba(20,20,27,0.95));text-align:center;">
        <div class="disp-badge">PREZENT NA NOWY CYKL SŁONECZNY</div>
        <h3 style="font-family:'Playfair Display',serif;color:#FAF8F5;font-size:1.35rem;margin:0.4rem 0;">Sprawdzasz Solariusz dla siebie lub przed czyimiś urodzinami?</h3>
        <p style="font-size:0.9rem;color:rgba(250,248,245,0.75);max-width:620px;margin:0 auto 1rem;">
          Zodiakalny Prezentownik (47 PLN) rozpisuje psychologię obdarowywania dla każdego z 12 znaków — żeby prezent na nowy rok życia nie trafił na dno szafy.
        </p>
        <button type="button" class="disp-btn-submit" data-luxe-checkout="prezentownik" style="display:inline-flex;width:auto;padding:0.85rem 1.8rem;">
          <span>Odbierz Zodiakalny Prezentownik (47 PLN)</span>
        </button>
      </div>
    `;

    if (!unlocked) {
      return `
        <div id="solar-unlocked-start" class="solar-paywall-wrap">
          <div class="solar-blur-preview">
            <div class="solar-chapter"><h3>Rozdział I: ${sunH.title} &amp; Nakładka na ${res.srAscInNatalHouse}. Dom Radixu</h3><p>${sunH.paidDeep} ${ovH.meaning}</p></div>
            <div class="solar-chapter"><h3>Rozdział II: Wyrok Władcy Roku — ${tl.title}</h3><p>${tl.verdict} ${tl.dorotheusRule}</p></div>
          </div>
          <div class="solar-paywall-overlay">
            <div class="disp-badge">PEŁNY RAPORT SOLARIUSZA ${res.targetYear} (6 ROZDZIAŁÓW + PDF A4)</div>
            <h3 style="font-family:'Playfair Display',serif;font-size:1.6rem;color:#FAF8F5;margin:0.5rem 0;">Odblokuj Pełną Architekturę Roku ${res.targetYear}</h3>
            <p style="font-size:0.92rem;color:rgba(250,248,245,0.76);max-width:640px;margin:0 auto 1.25rem;line-height:1.6;">
              Zobacz szczegółową analizę Słońca i Ascendentu w ${res.srAscInNatalHouse}. domu urodzeniowym, wyrok Władcy Roku (${res.timeLordSrPlanet.name}) wg praw Dorotheusa, listę ${res.srToNatalAspects.length} ścisłych aspektów do Radixu, ocenę relokacji (${res.input.relocCoords.name}) oraz kalendarz 4 przesileń roku.
            </p>
            <button type="button" id="solar-unlock-btn" class="disp-btn-submit" style="display:inline-flex;width:auto;padding:1rem 2.2rem;">
              <span>Odblokuj Pełny Raport Solariusza — 39,00 PLN (BLIK / Karta)</span>
            </button>
            <p style="margin-top:0.75rem;font-size:0.76rem;color:rgba(250,248,245,0.5);">Odblokowanie przypisane 1:1 do tego wykresu i roku &bull; Faktura / natychmiastowy dostęp + PDF A4</p>
          </div>
        </div>
        ${crossSell}
      `;
    }

    const aspectsHtml = res.srToNatalAspects.length
      ? res.srToNatalAspects.map(a => `
          <div style="padding:0.85rem;border:1px solid rgba(255,255,255,0.08);border-radius:10px;margin-bottom:0.65rem;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:${a.tone === 'hard' ? '#FDA4AF' : '#C9A84C'};font-weight:700;">
              SR ${a.srPlanet.name} (${a.srPlanet.signName}) ${a.symbol} ${a.aspectName} Natal ${a.natalPlanet.name} (${a.natalPlanet.signName}) &bull; orb ${a.orb}°
            </div>
            <p style="font-size:0.86rem;color:rgba(250,248,245,0.82);margin:0.35rem 0 0;">${D.ASPECT_TONES[a.aspectKey] || ''}</p>
          </div>`).join('')
      : '<p style="color:rgba(250,248,245,0.75);">Brak bardzo ścisłych aspektów (poniżej 5°) — rok płynie przede wszystkim przez pozycje domów Solariusza.</p>';

    return `
      <div id="solar-unlocked-start" style="margin-top:1.75rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1.25rem;">
          <div class="disp-badge" style="background:rgba(52,211,153,0.16);border-color:rgba(52,211,153,0.45);color:#34D399;">RAPORT ODBLOKOWANY 1:1 • SOLARIUSZ ${res.targetYear}</div>
          <button type="button" id="solar-print-btn" class="solar-year-pill no-print">Drukuj / Zapisz PDF A4</button>
        </div>

        <div class="solar-chapter">
          <h3>Rozdział I: Scena Główna Roku i Nakładka na Radix</h3>
          <p>${sunH.paidDeep}</p>
          <p><strong style="color:#C9A84C;">Nakładka osi (${ovH.stage}):</strong> ${ovH.meaning}</p>
          <p><strong style="color:#FDA4AF;">Pułapka roku (${res.srAscInfo.signName} na ASC):</strong> ${ascS.deepTrap} ${sunH.shadowRisk}</p>
          <p><strong style="color:#34D399;">Dyrektywa strategiczna:</strong> ${sunH.directive}</p>
        </div>

        <div class="solar-chapter">
          <h3>Rozdział II: Wyrok Władcy Czasu (Hellenistyczna Profekcja Roczna)</h3>
          <p><strong style="color:#C9A84C;">${tl.title}</strong> (Profekcja ${res.profectionHouse}. domu urodzeniowego — znak ${res.profectionSign.name}): ${tl.verdict}</p>
          <p>${tl.dorotheusRule}</p>
          <p style="font-family:'JetBrains Mono',monospace;font-size:0.84rem;color:#C9A84C;">Pozycja Władcy Roku w tym Solariuszu: ${res.timeLordSrPlanet.name} w znaku ${res.timeLordSrPlanet.signName} (${res.timeLordSrPlanet.house}. Dom Solariusza).</p>
        </div>

        <div class="solar-chapter">
          <h3>Rozdział III: Podziemny Nurt Emocji — Księżyc Solariusza</h3>
          <p><strong style="color:#C9A84C;">Księżyc w znaku ${res.srMoon.signName} (${res.srMoon.house}. Dom Solariusza):</strong> ${moonText}</p>
        </div>

        <div class="solar-chapter">
          <h3>Rozdział IV: Zderzenie z Radixem — Ścisłe Aspekty Roczne</h3>
          ${aspectsHtml}
        </div>

        <div class="solar-chapter">
          <h3>Rozdział V: Geografia Przeznaczenia — Analiza Relokacji (${res.input.relocCoords.name})</h3>
          <p><strong style="color:#C9A84C;">${relocAdvice.badge}:</strong> ${relocAdvice.text}</p>
          <p>Dla miejsca urodzenia (${res.input.birthCoords.name}) Ascendentem roku byłby <strong>${res.srNatalLocAscInfo.signName}</strong>; w wybranej lokalizacji (${res.input.relocCoords.name}) wchodzi znak <strong>${res.srAscInfo.signName}</strong>, a Medium Coeli (oś kariery i statusu) ląduje w znaku <strong>${res.srMcInfo.signName}</strong> (w Twoim ${res.srMcInNatalHouse}. domu urodzeniowym).</p>
        </div>

        <div class="solar-chapter">
          <h3>Rozdział VI: Kalendarz 4 Przesileń Słonecznych &amp; Protokół Urodzinowy</h3>
          <p>Rok solarny nie działa jednostajnie — kluczowe korekty zapadają w okolicach kwadr i opozycji Słońca do pozycji urodzeniowej:</p>
          <ul style="line-height:1.8;color:rgba(250,248,245,0.88);">
            <li><strong>Start Cyklu (Solariusz 0°):</strong> ${fmtShortPl(res.srDateUtc)} — wyznacz jeden cel główny i chroń spokój w ciągu 24 godzin przed i po dokładnej minucie powrotu.</li>
            ${res.quarters.map(q => `<li><strong>${q.label}:</strong> ok. ${fmtShortPl(q.date)}</li>`).join('')}
          </ul>
        </div>
      </div>
      ${crossSell}
    `;
  }

  window.SolarRender = { renderFreeLayer, renderPaywallOrReport };
})();
