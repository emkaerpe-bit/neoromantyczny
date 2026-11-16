/**
 * NEOROMANTYCZNY — SOLAR RETURN ZODIAC WHEEL ENGINE (ASTRA ENGINE)
 */
(function () {
  const S = 600;
  const CX = 300, CY = 300;
  const R_OUTER = 274;
  const R_ZODIAC_IN = 236;
  const R_PLANET = 192;
  const R_INNER = 98;
  const R_CENTER = 50;

  const SIGN_SVG_PATHS = [
    '<path d="M 8.5 13.5 C 7.5 8.5, 14 7.5, 16 14.5 L 16 25 M 23.5 13.5 C 24.5 8.5, 18 7.5, 16 14.5"/>',
    '<circle cx="16" cy="19" r="5.2"/><path d="M 8.5 9.5 C 10.5 14, 21.5 14, 23.5 9.5"/>',
    '<path d="M 8.5 9 C 12.5 11.2, 19.5 11.2, 23.5 9 M 8.5 23 C 12.5 20.8, 19.5 20.8, 23.5 23 M 12.8 10.3 L 12.8 21.7 M 19.2 10.3 L 19.2 21.7"/>',
    '<circle cx="10.2" cy="13.5" r="3.2"/><circle cx="21.8" cy="18.5" r="3.2"/><path d="M 7.5 11.7 C 11 7.6, 19.5 7.6, 25 11 M 24.5 20.3 C 21 24.4, 12.5 24.4, 7 21"/>',
    '<circle cx="10.5" cy="18.5" r="3"/><path d="M 12.8 16.2 C 11.5 9.5, 19.5 7.5, 20.5 13.5 C 21.2 17.5, 18.5 22, 22 22.5 C 23.5 22.7, 24.5 21.5, 24.5 20.2"/>',
    '<path d="M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20.5 C 18.4 23.5, 21 24.5, 23 23 M 18.4 15 C 21.5 12.5, 24.5 14.5, 22.5 18.5 C 21 21, 17.5 22.5, 15.8 24"/>',
    '<path d="M 7.5 18.5 L 12.2 18.5 A 4.8 4.8 0 1 1 19.8 18.5 L 24.5 18.5 M 7.5 22.5 L 24.5 22.5"/>',
    '<path d="M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20 C 18.4 23, 21.5 23, 24 19.5 M 21.2 19.2 L 24.2 19.2 L 24.2 22.2"/>',
    '<path d="M 8.5 23.5 L 23.5 8.5 M 16.5 8.5 L 23.5 8.5 L 23.5 15.5 M 11.5 14.5 L 17.5 20.5"/>',
    '<path d="M 7.5 11.5 L 10 10 L 13.2 20.5 L 16.8 11.5 C 18 9, 21.5 9.5, 21.5 13.5 C 21.5 18, 24.2 21, 21 23.5 C 18.5 25, 16.2 23, 17.2 20.5 C 18.2 18.5, 21.5 18.8, 24 21"/>',
    '<path d="M 7.5 14.5 L 10.5 11.5 L 13.2 14.5 L 16 11.5 L 18.8 14.5 L 21.5 11.5 L 24.5 14.5 M 7.5 20.5 L 10.5 17.5 L 13.2 20.5 L 16 17.5 L 18.8 20.5 L 21.5 17.5 L 24.5 20.5"/>',
    '<path d="M 10 8.5 C 14.5 12.5, 14.5 19.5, 10 23.5 M 22 8.5 C 17.5 12.5, 17.5 19.5, 22 23.5 M 7.5 16 L 24.5 16"/>'
  ];

  const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
  const COLORS = {
    sun: '#C9971E', moon: '#4B5563', mercury: '#D97706', venus: '#059669', mars: '#DC2626',
    jupiter: '#7C3AED', saturn: '#92400E', uranus: '#0891B2', neptune: '#2563EB', pluto: '#6D28D9'
  };
  const TEXT_GLYPHS = {
    sun: '☉', moon: '☽', mercury: '☿', venus: '♀', mars: '♂',
    jupiter: '♃', saturn: '♄', uranus: '♅', neptune: '♆', pluto: '♇'
  };

  function polar(r, deg) {
    const rad = (deg * Math.PI) / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
  }
  function toSVG(lng, asc) {
    return (((asc - lng + 180) % 360) + 360) % 360;
  }
  function angDist(a, b) {
    const d = Math.abs(a - b) % 360;
    return d > 180 ? 360 - d : d;
  }

  function placePlanets(planets, asc) {
    const items = planets.map(p => ({ ...p, sa: toSVG(p.longitude, asc), r: R_PLANET }))
      .sort((a, b) => a.sa - b.sa);
    const levels = [R_PLANET, R_PLANET - 34, R_PLANET - 68];
    items.forEach((it, idx) => {
      if (idx > 0 && angDist(it.sa, items[idx - 1].sa) < 14) {
        it.r = levels[(items[idx - 1].r === levels[0] ? 1 : items[idx - 1].r === levels[1] ? 2 : 0)];
      }
    });
    return items;
  }
  function renderSolarReturnWheel(result) {
    const asc = result.srAsc;
    const cusps = result.srCusps;
    const placed = placePlanets(result.srPlanets, asc);

    const bg = `
      <circle cx="${CX}" cy="${CY}" r="${R_OUTER}" fill="#FBF7F1" stroke="#C9BEB1" stroke-width="1.5"/>
      <circle cx="${CX}" cy="${CY}" r="${R_ZODIAC_IN}" fill="#F1E9DE" stroke="#C9BEB1" stroke-width="1"/>
      <circle cx="${CX}" cy="${CY}" r="${R_INNER}" fill="#FBF7F1" stroke="#C9A96E" stroke-width="1.2"/>
      <circle cx="${CX}" cy="${CY}" r="${R_CENTER}" fill="#14141B" stroke="#C9A96E" stroke-width="1.4"/>
    `;

    let signsHtml = '';
    for (let i = 0; i < 12; i++) {
      const a0 = toSVG(i * 30, asc);
      const aMid = toSVG(i * 30 + 15, asc);
      const p1 = polar(R_ZODIAC_IN, a0);
      const p2 = polar(R_OUTER, a0);
      const pm = polar((R_OUTER + R_ZODIAC_IN) / 2, aMid);
      signsHtml += `
        <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#C9BEB1" stroke-width="1"/>
        <g transform="translate(${(pm.x - 11).toFixed(1)},${(pm.y - 11).toFixed(1)}) scale(0.68)" fill="none" stroke="#6B5E4C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${SIGN_SVG_PATHS[i]}
        </g>
      `;
    }

    let housesHtml = '';
    for (let h = 1; h <= 12; h++) {
      const sa = toSVG(cusps[h], asc);
      const nextSa = toSVG(cusps[h === 12 ? 1 : h + 1], asc);
      let diff = (sa - nextSa + 360) % 360;
      const midSa = (sa - diff / 2 + 360) % 360;
      const pIn = polar(R_INNER, sa);
      const pOut = polar(R_ZODIAC_IN, sa);
      const pLbl = polar(R_INNER + 14, midSa);
      const isAngle = h === 1 || h === 4 || h === 7 || h === 10;
      housesHtml += `
        <line x1="${pIn.x.toFixed(1)}" y1="${pIn.y.toFixed(1)}" x2="${pOut.x.toFixed(1)}" y2="${pOut.y.toFixed(1)}" stroke="${isAngle ? '#997328' : '#D5CBBF'}" stroke-width="${isAngle ? '1.8' : '0.9'}"/>
        <text x="${pLbl.x.toFixed(1)}" y="${(pLbl.y + 3.5).toFixed(1)}" text-anchor="middle" font-size="9" font-family="'JetBrains Mono', monospace" font-weight="700" fill="${isAngle ? '#997328' : '#7A7165'}">${ROMAN[h - 1]}</text>
      `;
    }

    const natalAscSa = toSVG(result.natalAsc, asc);
    const nIn = polar(R_CENTER + 4, natalAscSa);
    const nOut = polar(R_ZODIAC_IN - 4, natalAscSa);
    const natalAscMarker = `
      <line x1="${nIn.x.toFixed(1)}" y1="${nIn.y.toFixed(1)}" x2="${nOut.x.toFixed(1)}" y2="${nOut.y.toFixed(1)}" stroke="#2563EB" stroke-width="1.4" stroke-dasharray="4,3"/>
      <text x="${nOut.x.toFixed(1)}" y="${(nOut.y - 6).toFixed(1)}" text-anchor="middle" font-size="7.5" font-family="'JetBrains Mono', monospace" font-weight="700" fill="#1D4ED8">ASC RADIX</text>
    `;

    let planetsHtml = '';
    placed.forEach(p => {
      const pt = polar(p.r, p.sa);
      const pRim = polar(R_ZODIAC_IN, p.sa);
      const isTL = p.key === result.timeLordKey;
      const col = COLORS[p.key] || '#1F2226';
      planetsHtml += `
        <line x1="${pRim.x.toFixed(1)}" y1="${pRim.y.toFixed(1)}" x2="${pt.x.toFixed(1)}" y2="${pt.y.toFixed(1)}" stroke="rgba(153,115,40,0.28)" stroke-width="0.9"/>
        ${isTL ? `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="15.5" fill="rgba(201,168,76,0.2)" stroke="#C9A84C" stroke-width="1.5" stroke-dasharray="2.5,2"/>` : ''}
        <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="11.5" fill="#FFFFFF" stroke="${isTL ? '#C9A84C' : col}" stroke-width="${isTL ? '2.2' : '1.4'}"/>
        <text x="${pt.x.toFixed(1)}" y="${(pt.y + 4).toFixed(1)}" text-anchor="middle" font-size="13" fill="${col}" font-weight="700">${TEXT_GLYPHS[p.key] || '*'}</text>
      `;
    });

    const centerHtml = `
      <text x="${CX}" y="${CY - 10}" text-anchor="middle" font-size="9" font-family="'JetBrains Mono', monospace" fill="#C9A84C" letter-spacing="1.2">SOLARIUSZ</text>
      <text x="${CX}" y="${CY + 8}" text-anchor="middle" font-size="15" font-family="'Playfair Display', serif" font-weight="700" fill="#FAF8F5">${result.targetYear}</text>
      <text x="${CX}" y="${CY + 22}" text-anchor="middle" font-size="7.5" font-family="'JetBrains Mono', monospace" fill="rgba(250,248,245,0.65)">${result.srAscInfo.signName.toUpperCase()}</text>
    `;

    return `
      <svg viewBox="0 0 ${S} ${S}" width="100%" height="100%" style="display:block;margin:0 auto;max-width:520px;" xmlns="http://www.w3.org/2000/svg">
        ${bg}${signsHtml}${housesHtml}${natalAscMarker}${planetsHtml}${centerHtml}
      </svg>
    `;
  }

  window.SolarWheel = { renderSolarReturnWheel };
})();
