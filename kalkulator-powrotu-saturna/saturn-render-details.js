/**
 * NEOROMANTYCZNY — SATURN RETURN DETAILS & ASPECTS RENDERER
 * Luksusowa prezentacja relacji kątowych i tranzytów (Midnight Luxe Standard)
 */
(function () {
  const ASPECT_SYMBOLS = {
    'Koniunkcja': '☌',
    'Opozycja': '☍',
    'Kwadratura': '□',
    'Trygon': '△',
    'Sekstyl': '⚹'
  };

  function renderPassesHtml(passes) {
    if (!passes || passes.length === 0) {
      return '<p style="color:rgba(250,248,245,0.5);">Trwa obliczanie orbity tranzytowej...</p>';
    }

    return passes.map((p) => {
      const dateStr = p.date.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
      const isRetro = p.isRetro;
      const badgeBg = isRetro ? 'rgba(251,113,133,0.15)' : 'rgba(201,169,110,0.15)';
      const badgeBorder = isRetro ? 'rgba(251,113,133,0.35)' : 'rgba(201,169,110,0.35)';
      const textColor = isRetro ? '#FB7185' : '#C9A96E';

      return `
        <div style="background:rgba(18,18,26,0.7); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:0.85rem 1rem; margin-bottom:0.65rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <span class="disp-badge" style="background:${badgeBg}; border-color:${badgeBorder}; color:${textColor}; margin-bottom:0.25rem;">
              ${p.type}
            </span>
            <p style="margin:0; color:rgba(250,248,245,0.65); font-size:0.78rem; font-family:'JetBrains Mono', monospace;">
              Koniunkcja ścisła 0°00' (orb dokładny)
            </p>
          </div>
          <span style="font-family:'Playfair Display', serif; font-size:1.15rem; color:#FAF8F5; font-weight:600;">
            ${dateStr}
          </span>
        </div>
      `;
    }).join('');
  }

  function renderAspectsList(aspects) {
    if (!aspects || aspects.length === 0) {
      return `
        <div class="disp-card" style="margin-bottom:1.75rem;">
          <h3 style="font-family:'Playfair Display', serif; font-size:1.35rem; color:#FAF8F5; margin:0 0 0.5rem;">Aspekty do Natalnego Saturna</h3>
          <p style="color:rgba(250,248,245,0.6); font-size:0.88rem; margin:0;">Twój Saturn nie tworzy ścisłych aspektów z planetami osobistymi (wysoka suwerenność i izolacja energii).</p>
        </div>
      `;
    }

    const aspectDataMap = (typeof window.getSaturnAspectsData === 'function')
      ? window.getSaturnAspectsData()
      : (window.SATURN_ASPECTS_DATA || {});

    const items = aspects.map(a => {
      const data = aspectDataMap[a.planet] || {
        name: a.planet,
        genitive: 'z ' + a.planet,
        glyph: '✦',
        color: '#C9A96E',
        hard: {
          archetype: 'Próba Napięcia & Weryfikacja Siły',
          core: 'Napięcie kątowe zmuszające do zintegrowania przeciwstawnych energii i wypracowania dojrzałości.',
          shadow: 'Opór przed konieczną dyscypliną i lęk przed niepowodzeniem.',
          maturePower: 'Niezłomna integracja i mistrzowskie panowanie nad własnym losem.'
        },
        soft: {
          archetype: 'Harmonijna Integracja & Spokój',
          core: 'Naturalny przepływ i wsparcie dla energii Saturna, ułatwiające osiąganie stabilizacji.',
          shadow: 'Zbytnia bierność w strefie komfortu.',
          maturePower: 'Stabilny, organiczny wzrost prestiżu i wewnętrznego autorytetu.'
        }
      };

      const isHard = (a.aspectType === 'hard');
      const branch = isHard ? data.hard : data.soft;
      const sym = ASPECT_SYMBOLS[a.aspectName] || '∠';
      const cleanTitle = `${a.aspectName}: Saturn ${data.genitive} (♄ ${sym} ${data.glyph})`;
      const borderAccent = isHard ? '#FB7185' : '#34D399';
      const tagBg = isHard ? 'rgba(251,113,133,0.12)' : 'rgba(52,211,153,0.12)';
      const tagBorder = isHard ? 'rgba(251,113,133,0.35)' : 'rgba(52,211,153,0.35)';
      const tagColor = isHard ? '#FB7185' : '#34D399';
      const orbVal = Math.abs(parseFloat(a.exactOrb)).toFixed(1);

      return `
        <div style="background:rgba(18,18,26,0.75); border:1px solid rgba(255,255,255,0.07); border-left:3.5px solid ${borderAccent}; border-radius:0 10px 10px 0; padding:1.2rem 1.3rem; margin-bottom:1rem; box-shadow:0 4px 20px rgba(0,0,0,0.35);">
          <!-- Nagłówek Aspektu -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.65rem;">
            <div style="display:flex; align-items:center; gap:0.65rem;">
              <div style="width:34px; height:34px; border-radius:50%; background:rgba(255,255,255,0.04); border:1px solid ${data.color}50; display:flex; align-items:center; justify-content:center; font-size:1.15rem; color:${data.color}; flex-shrink:0;">
                ${data.glyph}
              </div>
              <div>
                <h4 style="font-family:'Playfair Display', serif; font-size:1.08rem; color:#FAF8F5; margin:0 0 0.15rem; font-weight:600;">
                  ${cleanTitle}
                </h4>
                <div style="font-size:0.78rem; color:#C9A96E; font-style:italic;">
                  ${branch.archetype}
                </div>
              </div>
            </div>
            <span style="font-size:0.73rem; text-transform:uppercase; padding:0.25rem 0.65rem; border-radius:9999px; background:${tagBg}; border:1px solid ${tagBorder}; color:${tagColor}; font-family:'JetBrains Mono', monospace; font-weight:700; letter-spacing:0.04em;">
              ${sym} ${a.aspectName.toUpperCase()} • ORB ${orbVal}°
            </span>
          </div>

          <!-- Treść Psychologiczna -->
          <p style="font-size:0.87rem; line-height:1.65; color:rgba(250,248,245,0.85); margin:0 0 0.55rem;">
            ${branch.core}
          </p>

          ${branch.shadow ? `
            <p style="font-size:0.82rem; line-height:1.55; color:#FB7185; margin:0 0 0.45rem;">
              <strong>Ryzyko cienia:</strong> ${branch.shadow}
            </p>
          ` : ''}

          <p style="font-size:0.84rem; line-height:1.55; color:#E5CC7C; margin:0;">
            <strong style="color:#C9A96E;">Mądrość dojrzała:</strong> ${branch.maturePower}
          </p>
        </div>
      `;
    }).join('');

    return `
      <div class="disp-card" style="margin-bottom:2rem; padding:clamp(1.2rem, 3vw, 2rem);">
        <div class="disp-badge" style="margin-bottom:0.5rem;">MATRYCA ASPEKTÓW • ASTRA ENGINE</div>
        <h3 style="font-family:'Playfair Display', serif; font-size:clamp(1.35rem, 3vw, 1.85rem); color:#FAF8F5; margin:0 0 0.4rem;">
          Relacje Kątowe z Planetami Natalnymi
        </h3>
        <p style="color:rgba(250,248,245,0.7); font-size:0.9rem; margin:0 0 1.25rem; line-height:1.6; max-width:680px;">
          Planety aspektujące Twojego Saturna modyfikują architekturę wewnętrznych granic i definiują obszary najcięższych prób podczas Powrotu Saturna:
        </p>
        ${items}
      </div>
    `;
  }

  window.SaturnRenderDetails = {
    renderPassesHtml,
    renderAspectsList
  };
})();
