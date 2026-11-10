/**
 * NEOROMANTYZM — ARCHITEKTURA PODŚWIADOMOŚCI: GENERATOR RAPORTU & PAYWALL UI (20 PLN)
 * Standard: Human Voice 2026, C.G. Jung Depth Psychology, 6 Rozdziałów Głębi
 */
(function () {
  'use strict';

  let currentReportData = null;
  let currentHierarchy = null;

  function isUnlocked() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset') === '1' || params.get('lock') === '1') {
        localStorage.removeItem('neo_dispositor_unlocked');
        return false;
      }
      return localStorage.getItem('neo_dispositor_unlocked') === 'true' ||
             params.get('unlocked') === 'true';
    } catch (e) {
      return false;
    }
  }

  function getGoverningRetrogradePlanets(hierarchy, chart) {
    const h = hierarchy || currentHierarchy;
    if (!h || !chart || !chart.planets) return [];
    const governingKeys = new Set([
      ...(h.finalDispositors || []),
      ...(h.mutualReceptions ? h.mutualReceptions.flat() : []),
      ...(h.loops ? h.loops.flat() : [])
    ]);
    return chart.planets.filter(p => governingKeys.has(p.key) && p.isRetrograde);
  }

  function renderRetrogradeChapter1(chart, hierarchy) {
    const h = hierarchy || currentHierarchy;
    const govRetroPlanets = getGoverningRetrogradePlanets(h, chart);
    if (!govRetroPlanets.length) return '';

    const profiles = (window.__DISPOSITOR_RETRO_DATA__ && window.__DISPOSITOR_RETRO_DATA__.PROFILES) || {};

    const retroSectionsHtml = govRetroPlanets.map(p => {
      const prof = profiles[p.key] || {
        name: p.name + ' (Rx)',
        archetype: 'Władca w Ruchu Wstecznym • Głęboka Introspekcja',
        summary: 'W Twoim horoskopie ' + p.name + ' porusza się ruchem wstecznym, przenosząc energię sprawczą do wnętrza psychiki.',
        mechanics: 'Każda decyzja podlega rygorystycznej, wewnętrznej weryfikacji. Nie ulegasz presji zewnętrznego świata.',
        shadowWarning: 'Ryzyko paraliżu decyzyjnego, ruminacji i tłumienia autentycznych potrzeb.',
        somaticReset: 'Uziemienie zmysłowe, kontakt z naturą i spisanie myśli na papier bez autocenzury.'
      };

      return `
        <div style="margin-top:1.25rem;background:rgba(251,113,133,0.05);border:1px solid rgba(251,113,133,0.3);border-radius:0.85rem;padding:1.35rem 1.45rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;color:#FB7185;text-transform:uppercase;font-weight:700;">
              DIAGNOZA RETROGRADACJI WŁADCY • ${p.name.toUpperCase()} (Rx)
            </div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:#FB7185;background:rgba(251,113,133,0.12);padding:0.25rem 0.6rem;border-radius:4px;font-weight:600;">
              ${p.signName} ${p.degreeInSign} • RUCH WSTECZNY
            </span>
          </div>

          <h4 style="font-family:'Playfair Display',serif;font-size:1.25rem;color:#FAF8F5;margin:0 0 0.65rem;line-height:1.35;">
            ${prof.archetype}
          </h4>

          <p style="font-size:0.95rem;line-height:1.75;color:rgba(250,248,245,0.9);margin:0 0 0.85rem;">
            ${prof.summary}
          </p>

          <div style="background:rgba(0,0,0,0.25);border:1px solid rgba(251,113,133,0.2);border-radius:0.75rem;padding:1rem 1.15rem;margin-bottom:0.85rem;">
            <strong style="color:#C9A84C;font-size:0.92rem;display:block;margin-bottom:0.35rem;">
              ✦ Wpływ Retrogradacji na Wynik Raportu (${prof.name}):
            </strong>
            <p style="font-size:0.91rem;line-height:1.68;color:rgba(250,248,245,0.85);margin:0;">
              ${prof.mechanics}
            </p>
          </div>

          <div style="background:rgba(251,113,133,0.06);border:1px dashed rgba(251,113,133,0.3);border-radius:0.75rem;padding:1rem 1.15rem;">
            <strong style="color:#FB7185;font-size:0.92rem;display:block;margin-bottom:0.35rem;">
              Wektor Cienia & Pułapka ${prof.name}:
            </strong>
            <p style="font-size:0.91rem;line-height:1.68;color:rgba(250,248,245,0.85);margin:0 0 0.5rem;">
              ${prof.shadowWarning}
            </p>
            <p style="font-size:0.88rem;line-height:1.6;color:rgba(250,248,245,0.8);margin:0;">
              <strong style="color:#34D399;">Złota Zasada Równowagi:</strong> ${prof.somaticReset}
            </p>
          </div>
        </div>
      `;
    }).join('');

    return retroSectionsHtml;
  }

  function renderPaywallTeaser(hierarchy, planets, chart, attempts) {
    attempts = attempts || 0;
    if (hierarchy) currentHierarchy = hierarchy;
    const container = document.getElementById('dispositor-report-container');
    if (!container) {
      if (attempts < 80) {
        setTimeout(function () { renderPaywallTeaser(hierarchy, planets, chart, attempts + 1); }, 80);
        return;
      }
      return;
    }

    if (!window.__DISPOSITOR_REPORT_DATA__ || !window.__DISPOSITOR_REPORT_DATA__.getReportForHierarchy) {
      if (attempts === 0) {
        container.innerHTML = `
          <div style="text-align:center;padding:2.5rem 1rem;background:rgba(201,169,110,0.03);border:1px dashed rgba(201,169,110,0.25);border-radius:1.5rem;margin-top:2rem;">
            <div style="font-size:24px;margin-bottom:0.5rem;animation:spin 2s linear infinite;display:inline-block;">✦</div>
            <p style="font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.1em;color:#C9A84C;margin:0;">
              KOMPILOWANIE STUDIUM ARCHITEKTURY WEWNĘTRZNEJ...
            </p>
          </div>
        `;
      }
      if (attempts < 80) {
        setTimeout(function () { renderPaywallTeaser(hierarchy, planets, chart, attempts + 1); }, 80);
        return;
      }
      console.warn('Baza wiedzy raportu nie została jeszcze załadowana.');
      return;
    }

    currentReportData = window.__DISPOSITOR_REPORT_DATA__.getReportForHierarchy(hierarchy, planets);

    if (isUnlocked()) {
      renderFullReport(currentReportData, chart);
      return;
    }

    const data = currentReportData;
    const diag = data.coreDiagnosis || {};
    const birthInfo = chart ? `Data: ${chart.hasTime ? 'z godziną' : 'bez godziny'} • ${chart.city && chart.city.name ? chart.city.name : 'Polska'}` : '';

    container.innerHTML = `
      <article class="disp-full-report-card" style="margin-top:2.5rem;padding:2.5rem 2rem;background:linear-gradient(165deg, rgba(18,18,26,0.98) 0%, rgba(10,10,16,0.99) 100%);border:1px solid rgba(201,169,110,0.5);border-radius:2rem;box-shadow:0 35px 80px rgba(0,0,0,0.9), 0 0 50px rgba(201,169,110,0.15);color:#FAF8F5;">
        
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:2rem;padding-bottom:1.25rem;border-bottom:1px solid rgba(255,255,255,0.1);">
          <div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.25em;color:#C9A84C;text-transform:uppercase;font-weight:700;">
              SPERSONALIZOWANE STUDIUM ARCHITEKTURY WEWNĘTRZNEJ • 20 PLN
            </div>
            <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.5rem, 4vw, 2.2rem);color:#FAF8F5;margin:0.25rem 0 0.15rem;line-height:1.25;">
              ${data.title}
            </h2>
            <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#FB7185;margin-top:0.35rem;">
              ● Wersja Demonstracyjna • 1 z 6 Rozdziałów Odsłonięty
            </div>
          </div>
          ${birthInfo ? `<div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(250,248,245,0.6);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:0.4rem 0.85rem;border-radius:9999px;">${birthInfo}</div>` : ''}
        </div>

        ${data.structureTheory ? `
        <!-- DIAGNOZA STRUKTURY DRZEWA (MARC EDMUND JONES & ROBERT HAND) -->
        <section style="margin-bottom:2.25rem;background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.3);border-radius:1rem;padding:1.4rem 1.35rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;color:#C9A84C;text-transform:uppercase;margin-bottom:0.45rem;font-weight:700;">
            DIAGNOZA STRUKTURALNA (MARC EDMUND JONES & ROBERT HAND)
          </div>
          <p style="font-size:0.95rem;line-height:1.75;color:rgba(250,248,245,0.9);margin:0;font-style:italic;">
            ${data.structureTheory}
          </p>
        </section>
        ` : ''}

        <!-- ROZDZIAŁ 1: RDZEŃ TOŻSAMOŚCI & ARCHETYP (ODSŁONIĘTY DLA UŻYTKOWNIKA) -->
        <section style="margin-bottom:2.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#C9A84C;margin-bottom:0.4rem;font-weight:700;">
            ROZDZIAŁ 01 • RDZEŃ TOŻSAMOŚCI & ARCHETYP [ODSŁONIĘTY]
          </div>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.35rem;color:#FAF8F5;margin:0 0 0.85rem;line-height:1.35;">
            ${data.archetype}
          </h3>
          <p style="font-size:1rem;line-height:1.75;color:rgba(250,248,245,0.85);margin:0 0 1rem;">
            ${diag.psychDynamics || ''}
          </p>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:0.85rem;padding:1rem 1.25rem;font-size:0.92rem;line-height:1.65;color:rgba(250,248,245,0.75);">
            <strong style="color:#C9A84C;">Prawda o Twojej suwerenności:</strong> ${diag.sovereigntyRole || ''}
          </div>
          ${renderRetrogradeChapter1(chart, hierarchy)}
        </section>

        <!-- STREFA ROZDZIAŁÓW 2–6 Z MECHANIZMEM CURIOSITY GAP (PAYWALL 20 PLN) -->
        <div class="disp-paywall-gate">
          <div class="disp-blurred-zone">
            ${renderChapters2To6(data, chart, hierarchy)}
          </div>
          <div class="disp-paywall-overlay">
            <div class="disp-lock-card">
              <div style="margin-bottom:0.6rem;color:#C9A84C;"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.2em;color:#C9A84C;text-transform:uppercase;margin-bottom:0.5rem;font-weight:700;">
                PEŁNE STUDIUM PSYCHOLOGII GŁĘBI • 20,00 PLN
              </div>
              <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.35rem, 3.8vw, 1.85rem);color:#FAF8F5;margin:0 0 0.65rem;line-height:1.25;">
                Odblokuj Pozostałe 5 Rozdziałów
              </h3>
              <p style="font-size:0.9rem;line-height:1.6;color:rgba(250,248,245,0.75);max-width:480px;margin:0 auto 1.25rem;">
                Poznaj protokół somatyczny zasilania Twojego władcy, anatomię nieświadomego sabotażu, reguły granic w miłości oraz pobierz pełny raport w formacie PDF A4.
              </p>

              <div style="display:flex;justify-content:center;gap:0.45rem;flex-wrap:wrap;margin-bottom:1.5rem;">
                <span style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:9999px;padding:0.25rem 0.75rem;font-size:11px;color:rgba(250,248,245,0.9);font-family:'JetBrains Mono',monospace;">6 Rozdziałów Głębi</span>
                <span style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:9999px;padding:0.25rem 0.75rem;font-size:11px;color:rgba(250,248,245,0.9);font-family:'JetBrains Mono',monospace;">Somatyka & Reset 24h</span>
                <span style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.12);border-radius:9999px;padding:0.25rem 0.75rem;font-size:11px;color:rgba(250,248,245,0.9);font-family:'JetBrains Mono',monospace;">Eksport PDF A4</span>
                <span style="background:rgba(52,211,153,0.1);border:1px solid rgba(52,211,153,0.35);border-radius:9999px;padding:0.25rem 0.75rem;font-size:11px;color:#34D399;font-weight:700;font-family:'JetBrains Mono',monospace;">BLIK • 20,00 PLN</span>
              </div>

              <button type="button" id="disp-unlock-btn" class="disp-report-btn" style="background:#C9A84C;color:#0D0D12;font-weight:700;padding:1rem 1.4rem;border-radius:9999px;border:none;cursor:pointer;font-size:14px;box-shadow:0 0 35px rgba(201,168,76,0.35);transition:all 0.2s ease;display:inline-flex;align-items:center;justify-content:center;gap:0.6rem;max-width:100%;box-sizing:border-box;white-space:normal;text-align:center;">
                <span>Odblokuj Pełne Studium (20 PLN • BLIK)</span>
                <span style="font-size:18px;">&rarr;</span>
              </button>

              <div style="margin-top:1rem;font-size:11px;color:rgba(250,248,245,0.45);font-family:'JetBrains Mono',monospace;">
                ● Natychmiastowy dostęp po opłaceniu • Bezpieczne szyfrowanie Stripe
              </div>
            </div>
          </div>
        </div>
      </article>
    `;

    bindUnlockEvents(chart);
  }

  function bindUnlockEvents(chart) {
    const unlockBtn = document.getElementById('disp-unlock-btn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        if (typeof window.openLuxeCheckout === 'function') {
          window.openLuxeCheckout('dyspozytorzy', () => {
            try { localStorage.setItem('neo_dispositor_unlocked', 'true'); } catch (e) {}
            renderFullReport(currentReportData, chart);
          });
        }
      });
    }
  }

  function renderFullReport(data, chart) {
    const container = document.getElementById('dispositor-report-container');
    if (!container || !data) return;

    const diag = data.coreDiagnosis || {};
    const birthInfo = chart ? `Data: ${chart.hasTime ? 'z godziną' : 'bez godziny'} • ${chart.city && chart.city.name ? chart.city.name : 'Polska'}` : '';

    container.innerHTML = `
      <article class="disp-full-report-card" style="margin-top:2.5rem;padding:2.5rem 2rem;background:linear-gradient(165deg, rgba(18,18,26,0.98) 0%, rgba(10,10,16,0.99) 100%);border:1px solid rgba(201,169,110,0.5);border-radius:2rem;box-shadow:0 35px 80px rgba(0,0,0,0.9), 0 0 50px rgba(201,169,110,0.15);color:#FAF8F5;">
        
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:2rem;padding-bottom:1.25rem;border-bottom:1px solid rgba(255,255,255,0.1);">
          <div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.25em;color:#C9A84C;text-transform:uppercase;font-weight:700;">
              SPERSONALIZOWANE STUDIUM ARCHITEKTURY WEWNĘTRZNEJ
            </div>
            <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.5rem, 4vw, 2.2rem);color:#FAF8F5;margin:0.25rem 0 0.15rem;line-height:1.25;">
              ${data.title}
            </h2>
            <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:#34D399;margin-top:0.35rem;">
              ● Status: Odblokowany (Dostęp Dożywotni)
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            ${birthInfo ? `<div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(250,248,245,0.6);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:0.4rem 0.85rem;border-radius:9999px;">${birthInfo}</div>` : ''}
            <button type="button" onclick="window.print()" class="disp-print-btn" style="background:transparent;border:1px solid #C9A84C;color:#C9A84C;font-family:'JetBrains Mono',monospace;font-size:12px;padding:0.65rem 1.25rem;border-radius:9999px;cursor:pointer;display:inline-flex;align-items:center;gap:0.5rem;transition:all 0.2s ease;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect width="12" height="8" x="6" y="14"></rect></svg>
              <span>Zapisz / Drukuj PDF A4</span>
            </button>
          </div>
        </div>

        ${data.structureTheory ? `
        <!-- DIAGNOZA STRUKTURY DRZEWA (MARC EDMUND JONES & ROBERT HAND) -->
        <section style="margin-bottom:2.25rem;background:rgba(201,168,76,0.06);border:1px solid rgba(201,168,76,0.3);border-radius:1rem;padding:1.4rem 1.35rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;color:#C9A84C;text-transform:uppercase;margin-bottom:0.45rem;font-weight:700;">
            DIAGNOZA STRUKTURALNA (MARC EDMUND JONES & ROBERT HAND)
          </div>
          <p style="font-size:0.95rem;line-height:1.75;color:rgba(250,248,245,0.9);margin:0;font-style:italic;">
            ${data.structureTheory}
          </p>
        </section>
        ` : ''}

        <!-- ROZDZIAŁ 1: RDZEŃ TOŻSAMOŚCI & ARCHETYP -->
        <section style="margin-bottom:2.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#C9A84C;margin-bottom:0.4rem;font-weight:700;">
            ROZDZIAŁ 01 • RDZEŃ TOŻSAMOŚCI & ARCHETYP
          </div>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.35rem;color:#FAF8F5;margin:0 0 0.85rem;line-height:1.35;">
            ${data.archetype}
          </h3>
          <p style="font-size:1rem;line-height:1.75;color:rgba(250,248,245,0.85);margin:0 0 1rem;">
            ${diag.psychDynamics || ''}
          </p>
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:0.85rem;padding:1rem 1.25rem;font-size:0.92rem;line-height:1.65;color:rgba(250,248,245,0.75);">
            <strong style="color:#C9A84C;">Prawda o Twojej suwerenności:</strong> ${diag.sovereigntyRole || ''}
          </div>
          ${renderRetrogradeChapter1(chart, currentHierarchy)}
        </section>

        <div class="disp-unlocked-zone">
          ${renderChapters2To6(data, chart, currentHierarchy)}
        </div>
      </article>
    `;
  }

  function renderChapters2To6(data, chart, hierarchy) {
    const nour = data.nourishmentProtocol || {};
    const shadow = data.shadowAndEmergency || {};
    const rel = data.relationshipDynamics || {};
    const car = data.careerAndWealth || {};
    const filt = data.decisionalFilter || {};

    const exhaustLi = (shadow.exhaustionSignals || []).map(s => `
      <li style="margin-bottom:0.65rem;padding-left:1.5rem;position:relative;">
        <span style="position:absolute;left:0;color:#FB7185;font-size:11px;line-height:1.6;">●</span>
        <span>${s}</span>
      </li>
    `).join('');

    const questLi = (filt.questions || []).map(q => `
      <li style="margin-bottom:0.75rem;padding-left:1.5rem;position:relative;color:#FAF8F5;font-weight:500;">
        <span style="position:absolute;left:0;color:#C9A84C;font-size:14px;">✦</span>
        <span>${q}</span>
      </li>
    `).join('');

    return `
        <!-- ROZDZIAŁ 2: PROTOKÓŁ CIAŁA & CODZIENNE ZASILANIE -->
        <section style="margin-bottom:2.25rem;background:rgba(201,168,76,0.04);border-left:3px solid #C9A84C;padding:1.5rem 1.25rem;border-radius:0 1rem 1rem 0;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#C9A84C;margin-bottom:0.4rem;font-weight:700;">
            ROZDZIAŁ 02 • PROTOKÓŁ CIAŁA & CODZIENNE ZASILANIE
          </div>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.35rem;color:#FAF8F5;margin:0 0 1rem;line-height:1.35;">
            Jak dbać o siebie: ciało, przestrzeń i zmysły
          </h3>
          <div style="margin-bottom:1rem;">
            <strong style="color:#FAF8F5;font-size:0.95rem;display:block;margin-bottom:0.35rem;">✦ Ciało & Somatyka:</strong>
            <p style="font-size:0.925rem;line-height:1.65;color:rgba(250,248,245,0.8);margin:0;">${nour.somatic || ''}</p>
          </div>
          <div style="margin-bottom:1rem;">
            <strong style="color:#FAF8F5;font-size:0.95rem;display:block;margin-bottom:0.35rem;">✦ Środowisko & Bodźce:</strong>
            <p style="font-size:0.925rem;line-height:1.65;color:rgba(250,248,245,0.8);margin:0;">${nour.environment || ''}</p>
          </div>
          <div>
            <strong style="color:#FAF8F5;font-size:0.95rem;display:block;margin-bottom:0.35rem;">✦ Rytuał Codzienny:</strong>
            <p style="font-size:0.925rem;line-height:1.65;color:rgba(250,248,245,0.8);margin:0;">${nour.dailyRitual || ''}</p>
          </div>
        </section>

        <!-- ROZDZIAŁ 3: ANATOMIA CIENIA & PROTOKÓŁ RESETU -->
        <section style="margin-bottom:2.25rem;background:rgba(251,113,133,0.04);border-left:3px solid #FB7185;padding:1.5rem 1.25rem;border-radius:0 1rem 1rem 0;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#FB7185;margin-bottom:0.4rem;font-weight:700;">
            ROZDZIAŁ 03 • ANATOMIA CIENIA & PROTOKÓŁ RESETU
          </div>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.35rem;color:#FAF8F5;margin:0 0 1rem;line-height:1.35;">
            Kiedy kończą się zasoby: wczesne sygnały i odzyskiwanie równowagi
          </h3>
          <div style="margin-bottom:1rem;">
            <strong style="color:#FAF8F5;font-size:0.95rem;display:block;margin-bottom:0.5rem;">Sygnały alarmowe wyczerpania:</strong>
            <ul style="list-style:none;padding:0;margin:0;font-size:0.92rem;line-height:1.65;color:rgba(250,248,245,0.85);">
              ${exhaustLi}
            </ul>
          </div>
          <div style="margin-bottom:1rem;">
            <strong style="color:#FB7185;font-size:0.95rem;display:block;margin-bottom:0.35rem;">Wzorzec sabotażu (Jung):</strong>
            <p style="font-size:0.92rem;line-height:1.65;color:rgba(250,248,245,0.8);margin:0;">${shadow.sabotagePattern || ''}</p>
          </div>
          <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(251,113,133,0.3);border-radius:0.75rem;padding:0.85rem 1rem;">
            <strong style="color:#FB7185;font-size:0.9rem;display:block;margin-bottom:0.25rem;">Protokół Resetu 24h (Gdy przytłacza Cię świat):</strong>
            <p style="font-size:0.9rem;line-height:1.6;color:rgba(250,248,245,0.85);margin:0;">${shadow.emergency24h || ''}</p>
          </div>
          ${(() => {
            const h = hierarchy || currentHierarchy;
            const govRetro = getGoverningRetrogradePlanets(h, chart);
            if (!govRetro.length) return '';
            const profiles = (window.__DISPOSITOR_RETRO_DATA__ && window.__DISPOSITOR_RETRO_DATA__.PROFILES) || {};
            const shadowItems = govRetro.map(p => {
              const prof = profiles[p.key] || {};
              return `
                <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px dashed rgba(251,113,133,0.25);">
                  <strong style="color:#FAF8F5;font-size:0.9rem;display:block;margin-bottom:0.25rem;">✦ ${p.name} (Rx) w przeciążeniu:</strong>
                  <p style="font-size:0.9rem;line-height:1.65;color:rgba(250,248,245,0.85);margin:0 0 0.45rem;">
                    ${prof.shadowWarning || 'Zamiast skomunikować potrzebę, analizujesz sytuację w nieskończoność w ciszy.'}
                  </p>
                  <p style="font-size:0.88rem;line-height:1.6;color:rgba(250,248,245,0.75);margin:0;">
                    <strong style="color:#C9A84C;">Antidotum Somatyczne:</strong> ${prof.somaticReset || 'Uziemienie stóp i gwałtowna zmiana bodźców sensorycznych.'}
                  </p>
                </div>
              `;
            }).join('');

            return `
              <div style="margin-top:1rem;background:rgba(251,113,133,0.06);border:1px dashed rgba(251,113,133,0.35);border-radius:0.75rem;padding:0.95rem 1.15rem;">
                <strong style="color:#FB7185;font-size:0.92rem;display:block;margin-bottom:0.35rem;">
                  Wektor Cienia Władcy w Retrogradacji (${govRetro.map(p => p.name).join(', ')}):
                </strong>
                ${shadowItems}
              </div>
            `;
          })()}
        </section>

        <!-- ROZDZIAŁ 4: BLISKOŚĆ, MIŁOŚĆ & GRANICE -->
        <section style="margin-bottom:2.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#C9A84C;margin-bottom:0.4rem;font-weight:700;">
            ROZDZIAŁ 04 • BLISKOŚĆ, MIŁOŚĆ & GRANICE
          </div>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.35rem;color:#FAF8F5;margin:0 0 0.85rem;line-height:1.35;">
            Czego potrzebujesz w relacji i gdzie leży Twoja nienaruszalna granica
          </h3>
          <p style="font-size:0.95rem;line-height:1.7;color:rgba(250,248,245,0.85);margin:0 0 0.75rem;">
            <strong style="color:#C9A84C;">Czego szukasz w drugim człowieku:</strong> ${rel.intimateNeed || ''}
          </p>
          <p style="font-size:0.95rem;line-height:1.7;color:rgba(250,248,245,0.85);margin:0 0 0.75rem;">
            <strong style="color:#FB7185;">Ukryty lęk przed bezbronnością:</strong> ${rel.vulnerabilityFear || ''}
          </p>
          <p style="font-size:0.95rem;line-height:1.7;color:rgba(250,248,245,0.85);margin:0;">
            <strong style="color:#34D399;">Złota reguła granic:</strong> ${rel.boundaryRule || ''}
          </p>
        </section>

        <!-- ROZDZIAŁ 5: MIEJSCE W ŚWIECIE & POWOŁANIE -->
        <section style="margin-bottom:2.25rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);padding:1.5rem 1.25rem;border-radius:1rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#C9A84C;margin-bottom:0.4rem;font-weight:700;">
            ROZDZIAŁ 05 • MIEJSCE W ŚWIECIE & POWOŁANIE
          </div>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.35rem;color:#FAF8F5;margin:0 0 0.85rem;line-height:1.35;">
            Naturalna strefa wpływu i niebezpieczeństwa wypalenia
          </h3>
          <div style="margin-bottom:0.85rem;">
            <strong style="color:#34D399;font-size:0.925rem;display:block;margin-bottom:0.25rem;">✦ Gdzie Twoja praca przynosi największą wartość:</strong>
            <p style="font-size:0.92rem;line-height:1.65;color:rgba(250,248,245,0.8);margin:0;">${car.wealthLever || ''}</p>
          </div>
          <div>
            <strong style="color:#FB7185;font-size:0.925rem;display:block;margin-bottom:0.25rem;">Środowiska, które niszczą Twoje siły:</strong>
            <p style="font-size:0.92rem;line-height:1.65;color:rgba(250,248,245,0.8);margin:0;">${car.careerTrap || ''}</p>
          </div>
        </section>

        <!-- ROZDZIAŁ 6: ZŁOTY FILTR DECYZYJNY -->
        <section style="margin-bottom:2rem;background:linear-gradient(135deg, rgba(201,168,76,0.14) 0%, rgba(201,168,76,0.03) 100%);border:1px solid rgba(201,168,76,0.4);padding:1.75rem 1.5rem;border-radius:1.25rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;color:#C9A84C;text-transform:uppercase;margin-bottom:0.5rem;font-weight:700;text-align:center;">
            ROZDZIAŁ 06 • ZŁOTY FILTR DECYZYJNY
          </div>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.25rem;color:#FAF8F5;margin:0 0 1rem;text-align:center;">
            3 Pytania Oczyszczające Przed Kluczowym Wyborem
          </h3>
          <ul style="list-style:none;padding:0;margin:0 0 1.5rem;font-size:0.95rem;line-height:1.7;">
            ${questLi}
          </ul>
          <div style="border-top:1px solid rgba(201,168,76,0.3);padding-top:1.25rem;text-align:center;">
            <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.18em;color:#C9A84C;text-transform:uppercase;margin-bottom:0.35rem;">
              AKSJOMAT MOCY NA CAŁE ŻYCIE
            </div>
            <blockquote style="font-family:'Playfair Display',serif;font-size:clamp(1.15rem, 3.5vw, 1.4rem);color:#FAF8F5;margin:0;font-style:italic;line-height:1.5;">
              „${filt.powerAxiom || ''}”
            </blockquote>
          </div>
        </section>
    `;
  }

  window.__DISPOSITOR_REPORT_UI__ = {
    renderPaywallTeaser: renderPaywallTeaser,
    renderFullReport: renderFullReport
  };
})();
