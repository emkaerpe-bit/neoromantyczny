/**
 * NEOROMANTYCZNY — SATURN RETURN ZODIAC WHEEL ENGINE
 * Wierny design z Kalkulatora Dyspozytorów (Astra Engine Ivory & Gold)
 * + Logika Natal/Tranzyt: Estetyczna obwoluta Saturna & Złoty Łuk Dystansu
 */
(function () {
  const S = 600;
  const CX = 300, CY = 300;
  const R_OUTER     = 275;
  const R_ZODIAC_IN = 236;
  const R_PLANET    = 192;
  const R_INNER     = 100;
  const R_CENTER    = 52;

  const SIGN_GLYPHS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
  const SIGN_NAMES  = ['Baran','Byk','Bliźnięta','Rak','Lew','Panna','Waga','Skorpion','Strzelec','Koziorożec','Wodnik','Ryby'];
  const ROMAN_HOUSES = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];

  const PLANET_COLORS = {
    sun: '#FFD700', moon: '#E8E6E3', mercury: '#FFA726', venus: '#66BB6A', mars: '#EF5350',
    jupiter: '#AB47BC', saturn: '#C9A96E', uranus: '#26C6DA', neptune: '#42A5F5', pluto: '#BA68C8',
    chiron: '#B8A456', lilith: '#BA68C8', node: '#7986CB', fortune: '#E5CC7C'
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
    if (!planets || !planets.length) return [];
    const items = planets.map(p => {
      const trueSa = toSVG(p.longitude, asc);
      return { ...p, trueSa, sa: trueSa, nudgedSa: trueSa, r: R_PLANET };
    });
    items.sort((a, b) => a.trueSa - b.trueSa);

    const R_LEVELS = [R_PLANET, R_PLANET - 38, R_PLANET - 72];
    const clusters = [];
    let cur = [items[0]];
    for (let i = 1; i < items.length; i++) {
      if (angDist(items[i].trueSa, items[i - 1].trueSa) < 13.0) {
        cur.push(items[i]);
      } else {
        clusters.push(cur);
        cur = [items[i]];
      }
    }
    if (clusters.length > 0 && angDist(items[items.length - 1].trueSa, items[0].trueSa) < 13.0) {
      if (cur !== clusters[0]) clusters[0] = cur.concat(clusters[0]);
    } else {
      clusters.push(cur);
    }

    clusters.forEach(cluster => {
      if (cluster.length === 1) {
        cluster[0].r = R_LEVELS[0];
      } else {
        cluster.forEach((p, idx) => {
          p.r = R_LEVELS[idx % R_LEVELS.length];
          const spread = (idx - (cluster.length - 1) / 2) * 5.5;
          p.nudgedSa = (p.trueSa + spread + 360) % 360;
        });
      }
    });

    return items.map(p => {
      const pos = polar(p.r, p.nudgedSa);
      return { ...p, px: pos.x, py: pos.y };
    });
  }

  function describeSignSector(rIn, rOut, signIdx, asc) {
    const a1 = toSVG(signIdx * 30, asc);
    const a2 = toSVG((signIdx + 1) * 30, asc);
    const p1 = polar(rIn, a1);
    const p2 = polar(rOut, a1);
    const p3 = polar(rOut, a2);
    const p4 = polar(rIn, a2);
    return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} A ${rOut} ${rOut} 0 0 0 ${p3.x.toFixed(1)} ${p3.y.toFixed(1)} L ${p4.x.toFixed(1)} ${p4.y.toFixed(1)} A ${rIn} ${rIn} 0 0 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`;
  }

  function renderSaturnReturnWheel(chartData, transitSatLon) {
    if (!chartData || !chartData.planets) return '';
    const asc = chartData.ascendant ? chartData.ascendant.longitude : 0;
    const cusps = chartData.houses && chartData.houses.cusps ? chartData.houses.cusps : null;

    const satNatal = chartData.planets.find(p => p.key === 'saturn');
    const satNatalLon = satNatal ? satNatal.longitude : 0;

    const svgAngleNatal = toSVG(satNatalLon, asc);
    const svgAngleTransit = toSVG(transitSatLon, asc);
    const zodiacDistRemaining = ((satNatalLon - transitSatLon + 360) % 360);

    const placed = placePlanets(chartData.planets, asc);

    // Defs & Filters (Light Luxury Style)
    let defs = `
      <defs>
        <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="sapphireGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="goldArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3B82F6" />
          <stop offset="60%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#C9A96E" />
        </linearGradient>
      </defs>
    `;

    // 1. Tło i Koncentryczne Kręgi (Wierny styl z Kalkulatora Dyspozytorów — Czyste Białe Koło)
    let bg = `
      <circle cx="${CX}" cy="${CY}" r="${R_OUTER}" fill="#FAF8F5" stroke="#C8B57A" stroke-width="1.5" />
      <circle cx="${CX}" cy="${CY}" r="${R_ZODIAC_IN}" fill="#FAF6EE" stroke="#B8A456" stroke-width="0.8" />
      <circle cx="${CX}" cy="${CY}" r="${R_INNER}" fill="#FFFFFF" stroke="#C9BEB1" stroke-width="0.6" />
      <circle cx="${CX}" cy="${CY}" r="${R_CENTER}" fill="#FAF8F5" stroke="#C8B57A" stroke-width="1.2" />
    `;

    // 2. Podziałka stopniowa co 2.5 stopnia
    let ticks = '';
    for (let deg = 0; deg < 360; deg += 2.5) {
      const sa = toSVG(deg, asc);
      const is10 = deg % 10 === 0, is5 = deg % 5 === 0;
      const len = is10 ? 8 : (is5 ? 5 : 2.5);
      const strokeW = is10 ? 0.9 : 0.45;
      const opacity = is10 ? 0.8 : (is5 ? 0.5 : 0.3);
      const p1 = polar(R_ZODIAC_IN, sa);
      const p2 = polar(R_ZODIAC_IN + len, sa);
      ticks += `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#B8A456" stroke-width="${strokeW}" opacity="${opacity}"/>`;
    }

    // 3. 12 Sektorów Zodiaku (Design z Dyspozytorów)
    let signsHtml = '';
    const satSignIdx = Math.floor(satNatalLon / 30);
    for (let i = 0; i < 12; i++) {
      const aStart = toSVG(i * 30, asc);
      const aMid = toSVG(i * 30 + 15, asc);
      const isSatSign = (i === satSignIdx);

      let satSignAccent = '';
      if (isSatSign) {
        satSignAccent = `<path d="${describeSignSector(R_ZODIAC_IN, R_OUTER, i, asc)}" fill="#C9A96E" fill-opacity="0.22" stroke="#C9A96E" stroke-width="1.2"/>`;
      }

      const pMid = polar((R_OUTER + R_ZODIAC_IN) / 2, aMid);
      const pLine1 = polar(R_ZODIAC_IN, aStart);
      const pLine2 = polar(R_OUTER, aStart);

      signsHtml += `
        <g class="disp-wheel-sign">
          ${satSignAccent}
          <line x1="${pLine1.x.toFixed(1)}" y1="${pLine1.y.toFixed(1)}" x2="${pLine2.x.toFixed(1)}" y2="${pLine2.y.toFixed(1)}" stroke="#B8A456" stroke-width="0.6"/>
          <text x="${pMid.x.toFixed(1)}" y="${(pMid.y + 5).toFixed(1)}" text-anchor="middle" font-size="14" fill="${isSatSign ? '#997328' : '#5A4E3A'}" font-family="'Playfair Display', serif" font-weight="${isSatSign ? 'bold' : 'normal'}">
            ${SIGN_GLYPHS[i]}
          </text>
        </g>
      `;
    }

    // 4. Osie Główne i Domy Placidusa
    let housesHtml = '';
    if (cusps) {
      for (let h = 1; h <= 12; h++) {
        const cLon = cusps[h] || ((h - 1) * 30);
        const aCusp = toSVG(cLon, asc);
        const pIn = polar(R_CENTER, aCusp);
        const pOut = polar(R_ZODIAC_IN, aCusp);
        const isAxis = (h === 1 || h === 4 || h === 7 || h === 10);
        const strokeColor = isAxis ? '#B8A456' : 'rgba(180,160,130,0.35)';
        const strokeW = isAxis ? 1.6 : 0.75;
        housesHtml += `<line x1="${pIn.x.toFixed(1)}" y1="${pIn.y.toFixed(1)}" x2="${pOut.x.toFixed(1)}" y2="${pOut.y.toFixed(1)}" stroke="${strokeColor}" stroke-width="${strokeW}"/>`;

        const nextLon = cusps[h === 12 ? 1 : h + 1] || (h * 30);
        let midLon = (cLon + ((nextLon - cLon + 360) % 360) / 2) % 360;
        const aMid = toSVG(midLon, asc);
        const pNum = polar(R_INNER - 18, aMid);
        housesHtml += `<text x="${pNum.x.toFixed(1)}" y="${(pNum.y + 3.5).toFixed(1)}" text-anchor="middle" font-size="9" fill="rgba(90,78,58,0.5)" font-family="'JetBrains Mono', monospace">${ROMAN_HOUSES[h - 1]}</text>`;
      }
    }

    // 5. ZŁOTA LINIA DYSTANSU (TRANZYT -> NATAL) — DOPASOWANA DO BIAŁEGO KOŁA
    const rArc = R_OUTER - 2;
    const pArcTra = polar(rArc, svgAngleTransit);
    const pArcNat = polar(rArc, svgAngleNatal);
    const arcPath = `M ${pArcTra.x.toFixed(1)} ${pArcTra.y.toFixed(1)} A ${rArc} ${rArc} 0 ${zodiacDistRemaining > 180 ? 1 : 0} 0 ${pArcNat.x.toFixed(1)} ${pArcNat.y.toFixed(1)}`;
    let trajectoryHtml = `
      <path d="${arcPath}" fill="none" stroke="url(#goldArcGrad)" stroke-width="3" stroke-linecap="round" filter="url(#goldGlow)" />
      <path d="${arcPath}" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-dasharray="3,3" opacity="0.9" />
      <circle cx="${pArcNat.x.toFixed(1)}" cy="${pArcNat.y.toFixed(1)}" r="4.5" fill="#C9A96E" stroke="#FFFFFF" stroke-width="1.2" />
    `;

    // 6. Planety Natalne z Designem Dyspozytorów
    let planetsHtml = '';
    placed.forEach(p => {
      const isSaturn = (p.key === 'saturn');
      const pColor = PLANET_COLORS[p.key] || '#C9A96E';
      const degStr = p.degreeInSign || `${p.deg || p.degInSign || 0}°${(p.min || p.minInSign || 0) < 10 ? '0' : ''}${p.min || p.minInSign || 0}'`;

      const rimPos = polar(R_ZODIAC_IN, p.trueSa);
      const tickPos = polar(R_ZODIAC_IN - 4, p.trueSa);
      const ctrlPos = polar((R_ZODIAC_IN + p.r) / 2, p.trueSa);

      const leaderHtml = `
        <line x1="${rimPos.x.toFixed(1)}" y1="${rimPos.y.toFixed(1)}" x2="${tickPos.x.toFixed(1)}" y2="${tickPos.y.toFixed(1)}" stroke="#B8A456" stroke-width="1.2"/>
        <path d="M ${tickPos.x.toFixed(1)} ${tickPos.y.toFixed(1)} Q ${ctrlPos.x.toFixed(1)} ${ctrlPos.y.toFixed(1)} ${p.px.toFixed(1)} ${p.py.toFixed(1)}"
              fill="none" stroke="${isSaturn ? '#C9A96E' : 'rgba(140,110,60,0.45)'}" stroke-width="${isSaturn ? 1.8 : 0.75}" stroke-dasharray="${isSaturn ? 'none' : '1.5,2'}"/>
      `;

      let ringHtml = '';
      if (isSaturn) {
        // ESTETYCZNA ZŁOTA OBWOLUTA DLA NATALNEGO SATURNA
        ringHtml = `
          <circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="18" fill="rgba(201,169,110,0.22)" stroke="#C9A96E" stroke-width="2.2" stroke-dasharray="3,2" filter="url(#goldGlow)"/>
        `;
      }

      let glyphHtml = '';
      if (p.key === 'jupiter') {
        glyphHtml = `
          <g transform="translate(${p.px.toFixed(1)}, ${p.py.toFixed(1)}) translate(-0.8, -0.8) scale(0.85)" style="pointer-events:none;">
            <path d="M-5,-4 C-5,-8 1,-8 1,-4 C1,1 -5,1 -5,4 L7,4 M3,-4 L3,10"
                  stroke="${pColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </g>
        `;
      } else {
        glyphHtml = `
          <text x="${p.px.toFixed(1)}" y="${(p.py + 4.5).toFixed(1)}" text-anchor="middle" font-size="${isSaturn ? 15 : 13}" fill="${isSaturn ? '#997328' : pColor}" font-family="'JetBrains Mono', sans-serif" font-weight="bold" style="pointer-events:none;">
            ${p.glyph}
          </text>
        `;
      }

      planetsHtml += `
        <g class="disp-wheel-planet">
          ${leaderHtml}
          ${ringHtml}
          <circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="${isSaturn ? 14 : 12}" fill="#FFFFFF" stroke="${isSaturn ? '#C9A96E' : pColor}" stroke-width="${isSaturn ? 2.5 : 1.4}"/>
          ${glyphHtml}
          <g style="pointer-events:none;">
            <rect x="${(p.px - 18).toFixed(1)}" y="${(p.py + (isSaturn ? 16 : 14)).toFixed(1)}" width="36" height="11" rx="3" fill="${isSaturn ? '#C9A96E' : 'rgba(255,255,255,0.96)'}" stroke="rgba(160,125,65,0.4)" stroke-width="0.6"/>
            <text x="${p.px.toFixed(1)}" y="${(p.py + (isSaturn ? 24 : 22)).toFixed(1)}" text-anchor="middle" font-size="7.2" fill="${isSaturn ? '#0B0B0E' : '#181822'}" font-family="'JetBrains Mono', monospace" font-weight="800">
              ${isSaturn ? '♄ ' + degStr : degStr}
            </text>
          </g>
        </g>
      `;
    });

    // 7. ZNACZNIK TRANZYTOWEGO SATURNA — ODBICIE NATALNEGO SATURNA (SAPPHIRE LUXE)
    const degInSign = Math.floor(transitSatLon % 30);
    const minInSign = Math.floor((transitSatLon % 1) * 60);
    const traDegStr = `${degInSign}°${minInSign < 10 ? '0' : ''}${minInSign}'`;

    const rTra = 312;
    const pTra = polar(rTra, svgAngleTransit);
    const pRimTra = polar(rArc, svgAngleTransit);

    let transitMarkerHtml = `
      <g class="sat-transit-planet">
        <!-- Linia łącząca krawędź koła ze znacznikiem tranzytu -->
        <line x1="${pRimTra.x.toFixed(1)}" y1="${pRimTra.y.toFixed(1)}" x2="${pTra.x.toFixed(1)}" y2="${pTra.y.toFixed(1)}" stroke="#3B82F6" stroke-width="1.8" stroke-dasharray="2.5,2"/>
        <circle cx="${pRimTra.x.toFixed(1)}" cy="${pRimTra.y.toFixed(1)}" r="4" fill="#3B82F6" stroke="#FFFFFF" stroke-width="1.2" />

        <!-- Estetyczna błękitna obwoluta (odbicie złotego Saturna natalnego) -->
        <circle cx="${pTra.x.toFixed(1)}" cy="${pTra.y.toFixed(1)}" r="18" fill="rgba(59,130,246,0.22)" stroke="#3B82F6" stroke-width="2.2" stroke-dasharray="3,2" filter="url(#sapphireGlow)"/>

        <!-- Biała tarcza z szafirowym obwodem -->
        <circle cx="${pTra.x.toFixed(1)}" cy="${pTra.y.toFixed(1)}" r="14" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2.5"/>

        <!-- Symbol Saturna ♄ w kolorze szafiru -->
        <text x="${pTra.x.toFixed(1)}" y="${(pTra.y + 4.5).toFixed(1)}" text-anchor="middle" font-size="15" fill="#1D4ED8" font-family="'JetBrains Mono', sans-serif" font-weight="bold" style="pointer-events:none;">
          ♄
        </text>

        <!-- Górna etykieta TRANZYT -->
        <g style="pointer-events:none;">
          <rect x="${(pTra.x - 20).toFixed(1)}" y="${(pTra.y - 25).toFixed(1)}" width="40" height="9.5" rx="3" fill="#0C1322" stroke="#3B82F6" stroke-width="0.8"/>
          <text x="${pTra.x.toFixed(1)}" y="${(pTra.y - 17.5).toFixed(1)}" text-anchor="middle" font-size="6" fill="#93C5FD" font-family="'JetBrains Mono', monospace" font-weight="800" letter-spacing="0.6">TRANZYT</text>
        </g>

        <!-- Dolna pigułka z aktualnym stopniem (odbicie pigułki natalnej) -->
        <g style="pointer-events:none;">
          <rect x="${(pTra.x - 20).toFixed(1)}" y="${(pTra.y + 16).toFixed(1)}" width="40" height="11.5" rx="3" fill="#2563EB" stroke="rgba(147,197,253,0.6)" stroke-width="0.6"/>
          <text x="${pTra.x.toFixed(1)}" y="${(pTra.y + 24.5).toFixed(1)}" text-anchor="middle" font-size="7.2" fill="#FFFFFF" font-family="'JetBrains Mono', monospace" font-weight="800">
            ♄ ${traDegStr}
          </text>
        </g>
      </g>
    `;

    // 8. Centrum Koła (Pieczęć Chronosa i Dystans)
    let centerHtml = `
      <g style="pointer-events:none;">
        <text x="${CX}" y="${CY - 8}" text-anchor="middle" font-size="10" font-family="'Playfair Display', serif" font-weight="bold" fill="#3A2E1A" letter-spacing="1">POWRÓT ♄</text>
        <text x="${CX}" y="${CY + 12}" text-anchor="middle" font-size="12" font-family="'JetBrains Mono', monospace" font-weight="800" fill="#997328">Δ ${zodiacDistRemaining.toFixed(1)}°</text>
      </g>
    `;

    return `
      <svg viewBox="-48 -48 696 696" width="100%" height="100%" style="display:block;margin:0 auto;max-width:540px;" xmlns="http://www.w3.org/2000/svg">
        ${defs}
        ${bg}
        ${ticks}
        ${signsHtml}
        ${housesHtml}
        ${trajectoryHtml}
        ${planetsHtml}
        ${transitMarkerHtml}
        ${centerHtml}
      </svg>
    `;
  }

  window.SaturnWheel = {
    renderSaturnReturnWheel
  };
})();
