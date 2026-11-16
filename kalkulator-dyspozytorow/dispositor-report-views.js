(function () {
  'use strict';

  function renderAxisPopupHtml(ax) {
    const p = ax.popup || { title: ax.label, formula: '', facts: [] };
    const factsHtml = (p.facts || []).map(f => `<div class="disp-tt-fact">${f}</div>`).join('');
    return `
      <div class="disp-tooltip-pop" role="tooltip">
        <span class="disp-tt-label">✦ ${p.title}</span>
        ${p.formula ? `<div class="disp-tt-formula">${p.formula}</div>` : ''}
        <div class="disp-tt-def">${factsHtml}</div>
      </div>
    `;
  }

  function renderAxesGrid(axes) {
    return (axes || []).map(ax => {
      const popupHtml = renderAxisPopupHtml(ax);
      if (!ax.available) {
        return `
          <div class="disp-axis-row disp-has-tooltip is-disabled" data-axis-id="${ax.id}" tabindex="0">
            <div class="disp-axis-top">
              <span class="disp-axis-title">${ax.label}</span>
              <div class="disp-axis-badges">
                <span class="disp-axis-badge is-muted">Wymaga godziny</span>
                <span class="disp-info-pill">ⓘ Jak to policzono?</span>
              </div>
            </div>
            <div class="disp-axis-spectrum">
              <span class="disp-pole-left">${ax.leftPole}</span>
              <div class="disp-axis-track is-disabled"><div class="disp-axis-midline"></div></div>
              <span class="disp-pole-right">${ax.rightPole}</span>
            </div>
            <p class="disp-axis-note">${ax.narrative}</p>
            ${popupHtml}
          </div>
        `;
      }
      const pct = Math.max(0, Math.min(100, Number(ax.pct) || 0));
      const rightPct = Math.round(pct);
      const leftPct = Math.max(0, 100 - rightPct);
      const leftWon = rightPct < 50;
      const winPct = leftWon ? leftPct : rightPct;
      const winLabel = leftWon ? ax.leftPole : ax.rightPole;
      const badgeHtml = ax.isBorderline
        ? `<span class="disp-axis-badge is-borderline">Równowaga • ${rightPct}%</span>`
        : `<span class="disp-axis-badge">${winPct}% • ${winLabel}</span>`;
      const fillLeft = leftWon ? pct : 50;
      const fillWidth = Math.max(1, Math.abs(pct - 50));
      return `
        <div class="disp-axis-row disp-has-tooltip" data-axis-id="${ax.id}" tabindex="0">
          <div class="disp-axis-top">
            <span class="disp-axis-title">${ax.label}</span>
            <div class="disp-axis-badges">
              ${badgeHtml}
              <span class="disp-info-pill">ⓘ Jak to policzono?</span>
            </div>
          </div>
          <div class="disp-axis-spectrum">
            <span class="disp-pole-left ${leftWon && !ax.isBorderline ? 'is-winner' : ''}"><strong>${leftPct}%</strong> ${ax.leftPole}</span>
            <div class="disp-axis-track">
              <div class="disp-axis-midline" title="Środek skali: 50%"></div>
              <div class="disp-axis-fill ${leftWon ? 'is-left' : 'is-right'}" style="left:${fillLeft}%;width:${fillWidth}%;"></div>
              <div class="disp-axis-dot" style="left:${pct}%;"></div>
            </div>
            <span class="disp-pole-right ${!leftWon && !ax.isBorderline ? 'is-winner' : ''}"><strong>${rightPct}%</strong> ${ax.rightPole}</span>
          </div>
          <p class="disp-axis-note">${ax.narrative}</p>
          ${popupHtml}
        </div>
      `;
    }).join('');
  }

  function renderBlocksList(blocks) {
    return (blocks || []).map(blk => `
      <div class="disp-nlg-block">
        <div class="disp-nlg-block-head">
          <span class="disp-nlg-badge">${blk.badge}</span>
          ${blk.sourceEdges ? `
            <button type="button" class="disp-source-trace" data-focus-planet="${blk.focusPlanet || ''}" title="Pokaż na kole zodiakalnym">
              <span>Źródło: ${blk.sourceEdges}</span>
              <span aria-hidden="true">&nearr;</span>
            </button>
          ` : ''}
        </div>
        <p class="disp-nlg-text">${blk.text}</p>
      </div>
    `).join('');
  }

  function renderSectionCard(sec, extrasHtml, isVisibleOnScreen) {
    const questionsHtml = (sec.questions && sec.questions.length) ? `
      <div class="disp-nlg-questions">
        <div class="disp-nlg-badge">3 PYTANIA PRZED WAŻNYM KROKIEM</div>
        <ul>
          ${sec.questions.map(q => `<li><span class="disp-q-star">✦</span><span>${q}</span></li>`).join('')}
        </ul>
        ${sec.axiom ? `
          <div class="disp-nlg-axiom">
            <div class="disp-nlg-badge">CYTAT PROFILU</div>
            <blockquote>„${typeof sec.axiom === 'object' ? sec.axiom.quote : sec.axiom}”</blockquote>
            ${typeof sec.axiom === 'object' && sec.axiom.author ? `<div class="disp-axiom-author">— ${sec.axiom.author}</div>` : ''}
          </div>
        ` : ''}
      </div>
    ` : '';

    const itcHtml = sec.itcNotice ? `
      <div class="disp-itc-box">
        <strong>Nota metodologiczna:</strong> ${sec.itcNotice}
      </div>
    ` : '';

    return `
      <section id="disp-sec-${sec.id}" class="disp-report-section is-active" data-section-id="${sec.id}">
        <div class="disp-nlg-sec-kicker">ROZDZIAŁ ${sec.num} • ${sec.tabLabel.replace(/^\d+\.\s*/, '').toUpperCase()}</div>
        <h3 class="disp-nlg-sec-heading">${sec.heading}</h3>
        ${renderBlocksList(sec.blocks)}
        ${extrasHtml || ''}
        ${questionsHtml}
        ${itcHtml}
      </section>
    `;
  }

  function renderBannerHeader(data, birthInfo, unlocked, activeGender) {
    const statusLine = unlocked
      ? '<span style="color:#34D399;">● Status: Odblokowany (8 Rozdziałów • Dostęp Dożywotni)</span>'
      : '<span style="color:#FB7185;">● Wersja Demonstracyjna • Rozdział 01 z 08 Odsłonięty</span>';

    const genderBtns = [
      { id: 'n', label: 'Neutralnie' },
      { id: 'f', label: 'Kobieta' },
      { id: 'm', label: 'Mężczyzna' }
    ].map(g => `
      <button type="button" class="disp-gender-btn ${activeGender === g.id ? 'active' : ''}" data-gender="${g.id}">
        ${g.label}
      </button>
    `).join('');

    return `
      <div class="disp-report-banner">
        <div>
          <div class="disp-report-kicker">
            ARCHITEKTURA PSYCHIKI • ${data.modeLabel.toUpperCase()}
          </div>
          <div class="disp-report-title-row">
            <span class="disp-code-pill">${data.profileCode}</span>
            <h2 class="disp-report-title">${data.title}</h2>
          </div>
          <div class="disp-report-meta">
            ${statusLine}
            ${birthInfo ? `<span class="disp-birth-pill">${birthInfo}</span>` : ''}
          </div>
        </div>
        <div class="disp-banner-controls">
          <div class="disp-gender-switch" role="group" aria-label="Forma gramatyczna raportu">
            ${genderBtns}
          </div>
          ${unlocked ? `
            <button type="button" onclick="window.print()" class="disp-print-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect width="12" height="8" x="6" y="14"></rect></svg>
              <span>Zapisz / Drukuj PDF A4</span>
            </button>
          ` : ''}
        </div>
      </div>

      <div class="disp-axes-panel">
        <div class="disp-axes-header">
          <div>
            <div class="disp-nlg-badge">5 WYMIARÓW TWOJEGO PROFILU (NAJEDŹ LUB KLIKNIJ PO SZCZEGÓŁY)</div>
            <p class="disp-axes-sub">Konfiguracja: <strong>${data.archetype}</strong> — ${data.subtitle}</p>
            ${data.astroChips && data.astroChips.length ? `<div class="disp-astro-chips">${data.astroChips.map(c => `<span class="disp-astro-chip">${c}</span>`).join('')}</div>` : ''}
          </div>
        </div>
        <div class="disp-axes-grid">
          ${renderAxesGrid(data.axes)}
        </div>
      </div>
    `;
  }

  window.__DISPOSITOR_REPORT_VIEWS__ = { renderAxesGrid, renderBlocksList, renderSectionCard, renderBannerHeader };
})();
