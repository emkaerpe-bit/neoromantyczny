(function () {
  'use strict';

  let currentReportData = null;
  let currentHierarchy = null;
  let currentPlanets = null;
  let currentChart = null;
  let currentChartHash = '';
  let activeTabId = 'intro';
  let activeGender = 'n';
  try {
    const savedG = localStorage.getItem('neo_disp_gender');
    if (savedG === 'f' || savedG === 'm' || savedG === 'n') activeGender = savedG;
  } catch (e) {}

  function isUnlocked(chart) {
    const h = (chart && chart.chartHash) || currentChartHash;
    return Boolean(window.NeoChartLock && window.NeoChartLock.isUnlocked('dyspozytorzy', h));
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
    const L = window.__DISPOSITOR_LEXICON__;
    const govRetroPlanets = getGoverningRetrogradePlanets(hierarchy || currentHierarchy, chart);
    if (!govRetroPlanets.length) return '';
    const profiles = (window.__DISPOSITOR_RETRO_DATA__ && window.__DISPOSITOR_RETRO_DATA__.PROFILES) || {};

    return govRetroPlanets.map(p => {
      const prof = profiles[p.key] || {
        name: L ? L.planetCase(p.key, 'D') : p.name,
        archetype: `${p.name} (Rx)`,
        summary: `Planeta ${p.name} porusza się ruchem wstecznym, przenosząc decyzje do wnętrza.`,
        mechanics: 'Każda decyzja podlega wewnętrznej weryfikacji przed działaniem.',
        shadowWarning: 'Ryzyko ruminacji i tłumienia potrzeb.',
        somaticReset: 'Uziemienie zmysłowe i spisanie myśli na papierze.'
      };
      const res = (txt) => (L ? L.resolveGender(txt, activeGender) : txt);
      const locSign = L ? L.signIn(p.signKey) : p.signName;

      return `
        <div class="disp-retro-box">
          <div class="disp-retro-head">
            <span class="disp-retro-kicker">RETROGRADACJA WŁADCY • ${p.name.toUpperCase()} (Rx)</span>
            <span class="disp-retro-tag">${locSign} ${p.degreeInSign} • RUCH WSTECZNY</span>
          </div>
          <h4>${prof.archetype}</h4>
          <p>${res(prof.summary)}</p>
          <div class="disp-retro-mech"><strong>✦ Wpływ na mechanikę wyboru:</strong> ${res(prof.mechanics)}</div>
          <div class="disp-retro-shadow">
            <div><strong style="color:#FB7185;">Wektor Cienia:</strong> ${res(prof.shadowWarning)}</div>
            <div style="margin-top:0.35rem;"><strong style="color:#34D399;">Kotwica somatyczna:</strong> ${res(prof.somaticReset)}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  function buildChainFlowNarrative(chart, hierarchy) {
    if (!chart || !hierarchy || !hierarchy.chainMap) return '';
    const L = window.__DISPOSITOR_LEXICON__;
    const pByKey = Object.fromEntries((chart.planets || []).map(p => [p.key, p]));
    let longestPath = [];

    for (const p of (hierarchy.activePlanets || chart.planets || [])) {
      const path = [p.key];
      const seen = new Set([p.key]);
      let curr = p.key;
      for (let step = 0; step < 12; step++) {
        const next = hierarchy.chainMap[curr];
        if (!next || next === curr || seen.has(next)) {
          if (next && next !== curr && seen.has(next)) path.push(next);
          break;
        }
        path.push(next);
        seen.add(next);
        curr = next;
      }
      if (path.length > longestPath.length) longestPath = path;
    }

    if (longestPath.length < 2) return '';
    const startP = pByKey[longestPath[0]];
    const endP = pByKey[longestPath[longestPath.length - 1]];
    const labels = longestPath.map(k => pByKey[k] ? `${pByKey[k].glyph} ${pByKey[k].name}` : k);
    const ruledByEnd = (hierarchy.summaryMap && hierarchy.summaryMap[endP.key]) || { directSubjects: [], indirectSubjects: [] };
    const totalSub = ruledByEnd.directSubjects.length + ruledByEnd.indirectSubjects.length;

    const startGen = L ? L.planetCase(startP.key, 'D') : startP.name;
    const startLoc = L ? L.signIn(startP.signKey) : startP.signName;
    const endGen = L ? L.planetCase(endP.key, 'D') : endP.name;
    const endLoc = L ? L.signIn(endP.signKey) : endP.signName;
    const countTxt = L ? L.cldrPlural(totalSub, { one: '# ciało', few: '# ciała', many: '# ciał', other: '# ciała' }) : `${totalSub} planet`;
    const stepLbl = L ? L.cldrPlural(longestPath.length, { one: '# KROK', few: '# KROKI', many: '# KROKÓW', other: '# KROKU' }) : `${longestPath.length} KROKÓW`;
    const relPronoun = L && L.PLANETS[endP.key] ? L.gSelect(L.PLANETS[endP.key].g, { f: 'której', m: 'któremu', n: 'któremu' }) : 'któremu';

    return `
      <div class="disp-chain-narrative">
        <div class="disp-nlg-badge">NAJDŁUŻSZY ŁAŃCUCH ZALEŻNOŚCI (${stepLbl})</div>
        <p class="disp-chain-seq">${labels.join(' &rarr; ')}</p>
        <p class="disp-nlg-text">
          Pierwszy impuls od <strong>${startGen}</strong> (${startLoc}) nie działa samodzielnie — przechodzi po kolei przez dalsze ogniwa, aż zatrzymuje się u <strong>${endGen}</strong> ${endLoc}, ${relPronoun} podlega łącznie ${countTxt}. Dlatego Twoja pierwsza reakcja na stres po chwili ustępuje stylowi planety stojącej na końcu tej ścieżki.
        </p>
      </div>
    `;
  }

  function renderView() {
    const container = document.getElementById('dispositor-report-container');
    const V = window.__DISPOSITOR_REPORT_VIEWS__;
    const NLG = window.__DISPOSITOR_REPORT_NLG__;
    if (!container || !V || !NLG || !currentChart || !currentHierarchy) return;

    currentReportData = NLG.buildReportDocument(currentChart, currentHierarchy, {
      gender: activeGender,
      useModern: Boolean(currentHierarchy.useModern)
    });

    const data = currentReportData;
    const unlocked = isUnlocked(currentChart);
    const birthInfo = `Dane: ${currentChart.hasTime ? 'z godziną' : 'bez godziny (12:00)'} • ${currentChart.city && currentChart.city.name ? currentChart.city.name : 'Polska'}`;
    const bannerHtml = V.renderBannerHeader(data, birthInfo, unlocked, activeGender);
    const introExtras = renderRetrogradeChapter1(currentChart, currentHierarchy) + buildChainFlowNarrative(currentChart, currentHierarchy);

    if (!unlocked) {
      const sec1 = V.renderSectionCard(data.sections[0], introExtras, true);
      const lockedSecs = data.sections.slice(1).map(s => V.renderSectionCard(s, '', true)).join('');
      container.innerHTML = `
        <article class="disp-full-report-card">
          ${bannerHtml}
          <div class="disp-report-body">${sec1}</div>
          <div class="disp-paywall-gate">
            <div class="disp-blurred-zone" id="disp-unlocked-start">${lockedSecs}</div>
            <div class="disp-paywall-overlay">
              <div class="disp-lock-card">
                <div style="margin-bottom:0.6rem;color:#C9A84C;"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                <div style="font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.2em;color:#C9A84C;text-transform:uppercase;margin-bottom:0.5rem;font-weight:700;">PEŁNE STUDIUM PSYCHOLOGII GŁĘBI • 29,00 PLN</div>
                <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.35rem,3.8vw,1.85rem);color:#FAF8F5;margin:0 0 0.65rem;line-height:1.25;">Odblokuj Pozostałe 7 Rozdziałów</h3>
                <p style="font-size:0.9rem;line-height:1.6;color:rgba(250,248,245,0.75);max-width:480px;margin:0 auto 1.25rem;">
                  Zobacz, jak ten układ planet steruje Twoimi wyborami w miłości, pracy i kryzysach — gdzie tracisz energię na własnych nawykach i co przywraca Ci równowagę. Pełny raport pobierzesz także w PDF A4.
                </p>
                <button type="button" id="disp-unlock-btn" class="disp-report-btn" style="background:#C9A84C;color:#0D0D12;font-weight:700;padding:1rem 1.4rem;border-radius:9999px;border:none;cursor:pointer;font-size:14px;box-shadow:0 0 35px rgba(201,168,76,0.35);display:inline-flex;align-items:center;justify-content:center;gap:0.6rem;">
                  <span>Odblokuj Pełny Raport (29 PLN • BLIK)</span>
                  <span style="font-size:18px;">&rarr;</span>
                </button>
                <div style="margin-top:1rem;font-size:11px;color:rgba(250,248,245,0.45);font-family:'JetBrains Mono',monospace;">● Natychmiastowy dostęp po opłaceniu • Szyfrowanie Stripe</div>
              </div>
            </div>
          </div>
        </article>
      `;
    } else {
      const tabsHtml = data.sections.map(s => `
        <button type="button" class="disp-nlg-tab ${activeTabId === s.id ? 'active' : ''}" data-tab-id="${s.id}">
          ${s.tabLabel}
        </button>
      `).join('');
      const allSecsHtml = data.sections.map((s, idx) => {
        const cardHtml = V.renderSectionCard(s, idx === 0 ? introExtras : '', true);
        if (idx === 1) return `<div id="disp-unlocked-start" style="scroll-margin-top:90px;">${cardHtml}</div>`;
        return cardHtml;
      }).join('');

      container.innerHTML = `
        <article class="disp-full-report-card">
          ${bannerHtml}
          <div class="disp-nlg-tabs-wrap">
            <div class="disp-nlg-tabs" role="navigation" aria-label="Spis rozdziałów raportu">${tabsHtml}</div>
          </div>
          <div class="disp-report-body">${allSecsHtml}</div>
        </article>
      `;
    }
    bindReportEvents(container);
  }

  function bindReportEvents(container) {
    const unlockBtn = document.getElementById('disp-unlock-btn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        const h = (currentChart && currentChart.chartHash) || currentChartHash;
        if (typeof window.openLuxeCheckout === 'function') {
          window.openLuxeCheckout('dyspozytorzy', () => {
            activeTabId = 'strengths';
            renderView();
          }, { chartHash: h });
        }
      });
    }
    container.querySelectorAll('.disp-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const g = btn.getAttribute('data-gender');
        if (g && g !== activeGender) {
          activeGender = g;
          try { localStorage.setItem('neo_disp_gender', g); } catch (e) {}
          renderView();
        }
      });
    });
    container.querySelectorAll('.disp-nlg-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const tid = btn.getAttribute('data-tab-id');
        if (!tid) return;
        activeTabId = tid;
        container.querySelectorAll('.disp-nlg-tab').forEach(b => b.classList.toggle('active', b.getAttribute('data-tab-id') === tid));
        const target = document.getElementById('disp-sec-' + tid);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    container.querySelectorAll('.disp-source-trace').forEach(btn => {
      btn.addEventListener('click', () => {
        const pKey = btn.getAttribute('data-focus-planet');
        if (pKey && typeof window.__DISP_HIGHLIGHT_PLANET__ === 'function') {
          window.__DISP_HIGHLIGHT_PLANET__(pKey);
        }
      });
    });
    initDispPortalTooltip();
  }

  function initDispPortalTooltip() {
    if (window.__DISP_PORTAL_BOUND__ || !document.body) return;
    window.__DISP_PORTAL_BOUND__ = true;
    let portal = document.getElementById('disp-portal-tooltip');
    if (!portal) {
      portal = document.createElement('div');
      portal.id = 'disp-portal-tooltip';
      document.body.appendChild(portal);
    }
    let activeAnchor = null;

    function positionPortal(anchor) {
      if (!portal || !anchor) return;
      const rect = anchor.getBoundingClientRect();
      const pRect = portal.getBoundingClientRect();
      let left = rect.left + (rect.width / 2) - (pRect.width / 2);
      const minLeft = 14;
      const maxLeft = Math.max(minLeft, window.innerWidth - pRect.width - 14);
      left = Math.max(minLeft, Math.min(maxLeft, left));

      let top;
      const fitsAbove = rect.top >= pRect.height + 16;
      if (fitsAbove) {
        top = rect.top - pRect.height - 10;
        portal.classList.remove('is-below');
      } else {
        top = rect.bottom + 10;
        portal.classList.add('is-below');
      }
      top = Math.max(12, Math.min(window.innerHeight - pRect.height - 12, top));
      portal.style.left = `${Math.round(left)}px`;
      portal.style.top = `${Math.round(top)}px`;
    }

    function showTooltip(anchor) {
      const tipEl = anchor && anchor.querySelector('.disp-tooltip-pop');
      if (!tipEl) return;
      activeAnchor = anchor;
      portal.innerHTML = tipEl.innerHTML;
      portal.classList.add('is-visible');
      positionPortal(anchor);
    }

    function hideTooltip(target) {
      if (activeAnchor && (!target || activeAnchor === target || activeAnchor.contains(target))) {
        portal.classList.remove('is-visible');
        activeAnchor = null;
      }
    }

    document.addEventListener('mouseover', (e) => {
      const anchor = e.target.closest('.disp-axis-row.disp-has-tooltip');
      if (anchor) showTooltip(anchor);
    });
    document.addEventListener('mouseout', (e) => {
      const anchor = e.target.closest('.disp-axis-row.disp-has-tooltip');
      if (anchor && (!e.relatedTarget || !anchor.contains(e.relatedTarget))) hideTooltip(anchor);
    });
    document.addEventListener('focusin', (e) => {
      const anchor = e.target.closest('.disp-axis-row.disp-has-tooltip');
      if (anchor) showTooltip(anchor);
    });
    document.addEventListener('focusout', (e) => {
      const anchor = e.target.closest('.disp-axis-row.disp-has-tooltip');
      if (anchor) hideTooltip(anchor);
    });
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('.disp-axis-row.disp-has-tooltip');
      if (anchor) {
        if (activeAnchor === anchor && portal.classList.contains('is-visible')) {
          portal.classList.remove('is-visible');
          activeAnchor = null;
        } else {
          showTooltip(anchor);
        }
      } else if (activeAnchor) {
        portal.classList.remove('is-visible');
        activeAnchor = null;
      }
    });
    window.addEventListener('scroll', () => {
      if (activeAnchor) {
        portal.classList.remove('is-visible');
        activeAnchor = null;
      }
    }, { passive: true });
    window.addEventListener('resize', () => {
      if (activeAnchor) positionPortal(activeAnchor);
    }, { passive: true });
  }

  function renderPaywallTeaser(hierarchy, planets, chart, attempts) {
    attempts = attempts || 0;
    if (hierarchy) currentHierarchy = hierarchy;
    if (planets) currentPlanets = planets;
    if (chart) currentChart = chart;
    if (chart && chart.chartHash) currentChartHash = chart.chartHash;

    const container = document.getElementById('dispositor-report-container');
    const ready = container && window.__DISPOSITOR_LEXICON__ && window.__DISPOSITOR_REPORT_ENGINE__ &&
      window.__DISPOSITOR_REPORT_NLG__ && window.__DISPOSITOR_REPORT_VIEWS__;

    if (!ready) {
      if (attempts < 80) setTimeout(() => renderPaywallTeaser(hierarchy, planets, chart, attempts + 1), 80);
      return;
    }
    if (isUnlocked(currentChart) && (window.__DISP_JUST_UNLOCKED__ || sessionStorage.getItem('neo_just_unlocked') === 'dyspozytorzy')) {
      activeTabId = 'strengths';
      window.__DISP_JUST_UNLOCKED__ = false;
    }
    renderView();
  }

  window.__DISPOSITOR_REPORT_UI__ = {
    renderPaywallTeaser,
    renderFullReport: renderView,
    buildChainFlowNarrative
  };
})();
