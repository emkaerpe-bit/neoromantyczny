/**
 * NEOROMANTYCZNY — DISPOSITOR ZODIAC WHEEL SVG ENGINE
 * Adapted from Astra Engine v4.0 Territory Edition
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
  const SIGN_KEYS   = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

  const PLANET_COLORS = {
    sun: '#FFD700', moon: '#E8E6E3', mercury: '#FFA726', venus: '#66BB6A', mars: '#EF5350',
    jupiter: '#AB47BC', saturn: '#BCAAA4', uranus: '#26C6DA', neptune: '#42A5F5', pluto: '#BA68C8',
    chiron: '#B8A456', lilith: '#BA68C8', node: '#7986CB', fortune: '#E5CC7C'
  };

  const SIGN_RULERS_MODERN = {
    Aries: 'mars', Taurus: 'venus', Gemini: 'mercury', Cancer: 'moon', Leo: 'sun', Virgo: 'mercury',
    Libra: 'venus', Scorpio: 'pluto', Sagittarius: 'jupiter', Capricorn: 'saturn', Aquarius: 'uranus', Pisces: 'neptune'
  };

  const SIGN_RULERS_TRAD = {
    Aries: 'mars', Taurus: 'venus', Gemini: 'mercury', Cancer: 'moon', Leo: 'sun', Virgo: 'mercury',
    Libra: 'venus', Scorpio: 'mars', Sagittarius: 'jupiter', Capricorn: 'saturn', Aquarius: 'saturn', Pisces: 'jupiter'
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
    
    // 1. Initial mapping to SVG angles (True Positions)
    const items = planets.map(p => {
      const trueSa = toSVG(p.longitude, asc);
      return {
        ...p,
        trueSa,
        sa: trueSa,
        nudgedSa: trueSa,
        r: R_PLANET
      };
    });

    // 2. Sort zodiacally along the wheel
    items.sort((a, b) => a.trueSa - b.trueSa);

    // 3. Multi-level concentric orbits with large clearance (42px between levels)
    const R_LEVELS = [R_PLANET, R_PLANET - 42, R_PLANET - 78];

    // 4. Group adjacent planets into conjunction clusters (within 13 degrees)
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
    // Check 360 wrap-around between last and first
    if (clusters.length > 0 && angDist(items[items.length - 1].trueSa, items[0].trueSa) < 13.0) {
      if (cur !== clusters[0]) clusters[0] = cur.concat(clusters[0]);
    } else {
      clusters.push(cur);
    }

    // 5. Intelligent staggering: Alternate radius levels and add tangential separation
    clusters.forEach(cluster => {
      if (cluster.length === 1) {
        cluster[0].r = R_LEVELS[0];
        cluster[0].nudgedSa = cluster[0].trueSa;
      } else if (cluster.length === 2) {
        const p1 = cluster[0];
        const p2 = cluster[1];
        p1.r = R_LEVELS[0]; // outer level
        p2.r = R_LEVELS[1]; // inner level (42px radial clearance)
        const diff = angDist(p2.trueSa, p1.trueSa);
        if (diff < 7.0) {
          const spread = (7.0 - diff) / 2;
          p1.nudgedSa = (p1.trueSa - spread + 360) % 360;
          p2.nudgedSa = (p2.trueSa + spread) % 360;
        }
      } else {
        const n = cluster.length;
        cluster.forEach((p, idx) => {
          p.r = R_LEVELS[idx % R_LEVELS.length];
          const spread = (idx - (n - 1) / 2) * 5.5;
          p.nudgedSa = (p.trueSa + spread + 360) % 360;
        });
      }
    });

    // 6. Physics relaxation pass: guarantee min 38px Euclidean distance between all pairs
    const MIN_DIST = 38.0;
    for (let pass = 0; pass < 30; pass++) {
      let moved = false;
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const p1 = items[i];
          const p2 = items[j];
          const pos1 = polar(p1.r, p1.nudgedSa);
          const pos2 = polar(p2.r, p2.nudgedSa);
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MIN_DIST) {
            const push = 1.2;
            p1.nudgedSa = (p1.nudgedSa - push + 360) % 360;
            p2.nudgedSa = (p2.nudgedSa + push) % 360;
            moved = true;
          }
        }
      }
      if (!moved) break;
    }

    return items.map(p => {
      const pos = polar(p.r, p.nudgedSa);
      return {
        ...p,
        px: pos.x,
        py: pos.y
      };
    });
  }
  function describeSignSector(rIn, rOut, signIdx, asc) {
    const a1 = toSVG(signIdx * 30, asc);
    const a2 = toSVG((signIdx + 1) * 30, asc);
    const p1 = polar(rIn, a1);
    const p2 = polar(rOut, a1);
    const p3 = polar(rOut, a2);
    const p4 = polar(rIn, a2);
    // a1 to a2 decreases in angle (counter-clockwise in SVG coordinates) -> sweep=0
    // a2 to a1 increases in angle (clockwise) -> sweep=1
    // 30 degree arc -> largeArc is always 0
    return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} L ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} A ${rOut} ${rOut} 0 0 0 ${p3.x.toFixed(1)} ${p3.y.toFixed(1)} L ${p4.x.toFixed(1)} ${p4.y.toFixed(1)} A ${rIn} ${rIn} 0 0 1 ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} Z`;
  }

  function renderZodiacWheelSvg(chartData, options = {}) {
    if (!chartData || !chartData.planets) return '';
    const asc = chartData.ascendant ? chartData.ascendant.longitude : 0;
    const selectedKey = options.selectedPlanet || null;
    const useModern = options.useModern === true;
    const rulersMap = useModern ? SIGN_RULERS_MODERN : SIGN_RULERS_TRAD;
    const dispData = window.__DISPOSITOR_ENGINE__.calculateDispositorChain(chartData.planets, useModern);

    // Identify territories
    let directSigns = [];
    let indirectSigns = [];
    if (selectedKey) {
      SIGN_KEYS.forEach((sKey, idx) => {
        if (rulersMap[sKey] === selectedKey) directSigns.push(idx);
      });
      // Indirect: Signs ruled by direct subjects (Astra Engine Standard)
      const directSubs = (dispData.summaryMap[selectedKey] && dispData.summaryMap[selectedKey].directSubjects) || [];
      directSubs.forEach(subKey => {
        SIGN_KEYS.forEach((sKey, idx) => {
          if (rulersMap[sKey] === subKey && !directSigns.includes(idx) && !indirectSigns.includes(idx)) {
            indirectSigns.push(idx);
          }
        });
      });
    }

    const selColor = selectedKey ? (PLANET_COLORS[selectedKey] || '#C9A96E') : '#C9A96E';
    const placed = placePlanets(chartData.planets, asc);

    // 1. Defs & patterns (Exact Astra Engine Territory Engine)
    let defs = `
      <defs>
        ${selectedKey ? `
          <pattern id="territoryPattern-${selectedKey}" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="${selColor}" stroke-width="2.5" opacity="0.22" />
          </pattern>
          <pattern id="indirectPattern-${selectedKey}" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="${selColor}" stroke-width="2" opacity="0.35" />
          </pattern>
        ` : ''}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <marker id="arrowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#B8A456" />
        </marker>
        <marker id="arrowHeadSel" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="${selColor}" />
        </marker>
      </defs>
    `;

    // 2. Wheel background circles (Astra Engine Light Luxury Ivory & Pure White Core)
    let bg = `
      <circle cx="${CX}" cy="${CY}" r="${R_OUTER}" fill="#FAF8F5" stroke="#C8B57A" stroke-width="1.5" />
      <circle cx="${CX}" cy="${CY}" r="${R_ZODIAC_IN}" fill="#FAF6EE" stroke="#B8A456" stroke-width="0.8" />
      <circle cx="${CX}" cy="${CY}" r="${R_INNER}" fill="#ffffff" stroke="#C9BEB1" stroke-width="0.6" />
      <circle cx="${CX}" cy="${CY}" r="${R_CENTER}" fill="#FAF8F5" stroke="#C8B57A" stroke-width="1.2" />
    `;

    // 2b. Inner Pie Sector Territories (Exact Astra Engine Territory Engine)
    let innerTerritoriesHtml = '';
    if (selectedKey) {
      // Direct territory: Solid color fill across the entire house/sector
      directSigns.forEach(signIdx => {
        innerTerritoriesHtml += `
          <path d="${describeSignSector(R_INNER, R_ZODIAC_IN, signIdx, asc)}"
                fill="${selColor}" fill-opacity="0.14" stroke="${selColor}" stroke-width="1.6" stroke-opacity="0.75"/>
        `;
      });

      // Indirect territory: Zakreśla cały sektor horoskopu przerywaną linią + wzór kreskowania Astra Engine
      indirectSigns.forEach(signIdx => {
        innerTerritoriesHtml += `
          <path d="${describeSignSector(R_INNER, R_ZODIAC_IN, signIdx, asc)}"
                fill="url(#territoryPattern-${selectedKey})"
                stroke="${selColor}" stroke-width="1.8" stroke-dasharray="5,4" stroke-opacity="0.85"/>
        `;
      });
    }

    // 3. Precision degree ticks (Astra Engine Standard)
    let ticks = '';
    for (let deg = 0; deg < 360; deg += 2.5) {
      const sa = toSVG(deg, asc);
      const is10 = deg % 10 === 0;
      const is5 = deg % 5 === 0;
      const len = is10 ? 8 : (is5 ? 5 : 2.5);
      const strokeW = is10 ? 0.9 : 0.45;
      const opacity = is10 ? 0.8 : (is5 ? 0.5 : 0.3);
      const p1 = polar(R_ZODIAC_IN, sa);
      const p2 = polar(R_ZODIAC_IN + len, sa);
      ticks += `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#B8A456" stroke-width="${strokeW}" opacity="${opacity}"/>`;
    }

    // 4. 12 Zodiac sign segments (Exact Astra Engine Zodiac Rim Highlighting)
    let signsHtml = '';
    for (let i = 0; i < 12; i++) {
      const aStart = toSVG(i * 30, asc);
      const aMid = toSVG(i * 30 + 15, asc);
      const isDirect = directSigns.includes(i);
      const isIndirect = indirectSigns.includes(i);
      const isOccupied = isDirect || isIndirect;

      let territoryAccent = '';
      if (isDirect) {
        territoryAccent = `<path d="${describeSignSector(R_ZODIAC_IN, R_OUTER, i, asc)}" fill="${selColor}" fill-opacity="0.16" stroke="${selColor}" stroke-width="0.8" stroke-opacity="0.5"/>`;
      } else if (isIndirect) {
        territoryAccent = `<path d="${describeSignSector(R_ZODIAC_IN, R_OUTER, i, asc)}" fill="url(#territoryPattern-${selectedKey})" stroke="${selColor}" stroke-width="0.8" stroke-dasharray="3,3" stroke-opacity="0.6"/>`;
      }

      const pMid = polar((R_OUTER + R_ZODIAC_IN) / 2, aMid);
      const pLine1 = polar(R_ZODIAC_IN, aStart);
      const pLine2 = polar(R_OUTER, aStart);

      const glyphColor = isOccupied && selectedKey ? selColor : '#5A4E3A';

      signsHtml += `
        <g class="disp-wheel-sign" data-sign-idx="${i}">
          ${territoryAccent}
          <line x1="${pLine1.x.toFixed(1)}" y1="${pLine1.y.toFixed(1)}" x2="${pLine2.x.toFixed(1)}" y2="${pLine2.y.toFixed(1)}" stroke="#B8A456" stroke-width="0.6"/>
          <text x="${pMid.x.toFixed(1)}" y="${(pMid.y + 5).toFixed(1)}" text-anchor="middle" font-size="14" fill="${glyphColor}" font-family="'Playfair Display', serif" font-weight="${isDirect ? 'bold' : 'normal'}" style="pointer-events:none;">
            ${SIGN_GLYPHS[i]}
          </text>
        </g>
      `;
    }

    // 5. Horoscope Axes & 12 Houses
    let housesHtml = '';
    // Cardinal Axes in Polar Coordinates:
    // Left (180°) is Ascendant (AC)
    // Right (0°) is Descendant (DC)
    // Top (270°) is Medium Coeli (MC)
    // Bottom (90°) is Imum Coeli (IC)
    const axes = [
      { name: 'AC', sa: 180 },
      { name: 'DC', sa: 0 },
      { name: 'MC', sa: 270 },
      { name: 'IC', sa: 90 }
    ];

    axes.forEach(ax => {
      const p1 = polar(R_CENTER, ax.sa);
      const p2 = polar(R_ZODIAC_IN, ax.sa);
      const pTick1 = polar(R_ZODIAC_IN, ax.sa);
      const pTick2 = polar(R_OUTER, ax.sa);
      const pLabel = polar(R_OUTER + 15, ax.sa);
      housesHtml += `
        <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="#8C6E2D" stroke-width="1.8" />
        <line x1="${pTick1.x.toFixed(1)}" y1="${pTick1.y.toFixed(1)}" x2="${pTick2.x.toFixed(1)}" y2="${pTick2.y.toFixed(1)}" stroke="#8C6E2D" stroke-width="2.2" />
        <text x="${pLabel.x.toFixed(1)}" y="${(pLabel.y + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-family="'JetBrains Mono', monospace" font-weight="900" fill="#D4AF37">
          ${ax.name}
        </text>
      `;
    });

    // 12 House Cusps & House Numbers
    for (let h = 1; h <= 12; h++) {
      const cuspDegOffset = (h - 1) * 30;
      const cuspSa = toSVG(asc + cuspDegOffset, asc);

      // Intermediate cusp lines (non-cardinal axes)
      if (Math.round(cuspSa) % 90 !== 0) {
        const p1 = polar(R_INNER, cuspSa);
        const p2 = polar(R_ZODIAC_IN, cuspSa);
        housesHtml += `
          <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="rgba(160,125,65,0.35)" stroke-width="0.8" stroke-dasharray="3,3" />
        `;
      }

      // House number inside the house wedge
      const midSa = toSVG(asc + cuspDegOffset + 15, asc);
      const pNum = polar(R_INNER - 12, midSa);
      housesHtml += `
        <text x="${pNum.x.toFixed(1)}" y="${(pNum.y + 3.5).toFixed(1)}" text-anchor="middle" font-size="8.5" font-family="'JetBrains Mono', monospace" fill="#5A4720" font-weight="bold">
          ${h}
        </text>
      `;
    }

    // 6. Dispositor Vector Arrows (Directed Graph traversal)
    let vectorsHtml = '';
    const chainMap = dispData.chainMap;
    placed.forEach(p => {
      const masterKey = chainMap[p.key];
      if (!masterKey) return;
      const master = placed.find(m => m.key === masterKey);
      if (!master) return;

      const isSelf = p.key === masterKey; // Domicile
      const isRelToSelected = selectedKey && (p.key === selectedKey || masterKey === selectedKey);
      const isDimmed = selectedKey && !isRelToSelected;

      if (isSelf) {
        // Domicile planet gets a glowing golden halo
        const haloColor = isRelToSelected || !selectedKey ? '#C9A96E' : 'rgba(180,145,80,0.3)';
        vectorsHtml += `
          <circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="18" fill="none" stroke="${haloColor}" stroke-width="1.8" stroke-dasharray="2,2" filter="url(#goldGlow)">
            <animateTransform attributeName="transform" type="rotate" from="0 ${p.px.toFixed(1)} ${p.py.toFixed(1)}" to="360 ${p.px.toFixed(1)} ${p.py.toFixed(1)}" dur="14s" repeatCount="indefinite"/>
          </circle>
        `;
      } else {
        // Directed curved line from subject to master
        const dx = master.px - p.px;
        const dy = master.py - p.py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 15) {
          // Curvature towards center
          const midX = (p.px + master.px) / 2 + (CY - (p.py + master.py) / 2) * 0.15;
          const midY = (p.py + master.py) / 2 + ((p.px + master.px) / 2 - CX) * 0.15;
          const strokeColor = isRelToSelected ? selColor : (isDimmed ? 'rgba(160,125,65,0.2)' : 'rgba(140,105,45,0.65)');
          const strokeWidth = isRelToSelected ? 2.2 : (isDimmed ? 0.7 : 1.2);
          const marker = isRelToSelected ? 'url(#arrowHeadSel)' : 'url(#arrowHead)';

          vectorsHtml += `
            <path d="M ${p.px.toFixed(1)} ${p.py.toFixed(1)} Q ${midX.toFixed(1)} ${midY.toFixed(1)} ${master.px.toFixed(1)} ${master.py.toFixed(1)}"
                  fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" marker-end="${marker}"
                  stroke-dasharray="${isRelToSelected ? 'none' : '4,2'}" />
          `;
        }
      }
    });

    // 7. Natal Planets with Precise Degree Labels
    let planetsHtml = '';
    placed.forEach(p => {
      const isSelected = selectedKey === p.key;
      const isDirect = selectedKey && dispData.summaryMap[selectedKey]?.directSubjects?.includes(p.key);
      const isIndirect = selectedKey && dispData.summaryMap[selectedKey]?.indirectSubjects?.includes(p.key) && !isDirect;
      const pColor = PLANET_COLORS[p.key] || '#C9A96E';
      const degStr = p.degreeInSign || `${p.deg || p.degInSign || 0}°${(p.min || p.minInSign || 0) < 10 ? '0' : ''}${p.min || p.minInSign || 0}'`;

      const rimPos = polar(R_ZODIAC_IN, p.trueSa);
      const tickPos = polar(R_ZODIAC_IN - 4, p.trueSa);
      const ctrlPos = polar((R_ZODIAC_IN + p.r) / 2, p.trueSa);
      const leaderHtml = `
        <line x1="${rimPos.x.toFixed(1)}" y1="${rimPos.y.toFixed(1)}" x2="${tickPos.x.toFixed(1)}" y2="${tickPos.y.toFixed(1)}" stroke="#B8A456" stroke-width="1.2"/>
        <path d="M ${tickPos.x.toFixed(1)} ${tickPos.y.toFixed(1)} Q ${ctrlPos.x.toFixed(1)} ${ctrlPos.y.toFixed(1)} ${p.px.toFixed(1)} ${p.py.toFixed(1)}"
              fill="none" stroke="${isSelected ? selColor : 'rgba(140,110,60,0.45)'}" stroke-width="${isSelected ? 1.4 : 0.75}" stroke-dasharray="1.5,2"/>
      `;

      let ringHtml = '';
      if (isSelected) {
        ringHtml = `<circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="16" fill="${selColor}" fill-opacity="0.25" stroke="${selColor}" stroke-width="2" filter="url(#goldGlow)"/>`;
      } else if (isDirect) {
        ringHtml = `<circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="14" fill="${selColor}" fill-opacity="0.2" stroke="${selColor}" stroke-width="1.2"/>`;
      } else if (isIndirect) {
        ringHtml = `<circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="14" fill="url(#indirectPattern-${selectedKey})" fill-opacity="1" stroke="${selColor}" stroke-width="1" stroke-dasharray="2,2"/>`;
      }

      let glyphHtml = '';
      if (p.key === 'jupiter') {
        // Astra Engine: Precision vector glyph for Jupiter (fixes inverted/rotated Windows Unicode font bug)
        glyphHtml = `
          <g transform="translate(${p.px.toFixed(1)}, ${p.py.toFixed(1)}) translate(-0.8, -0.8) scale(0.85)" style="pointer-events:none;">
            <path d="M-5,-4 C-5,-8 1,-8 1,-4 C1,1 -5,1 -5,4 L7,4 M3,-4 L3,10"
                  stroke="${isSelected ? selColor : pColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          </g>
        `;
      } else {
        glyphHtml = `
          <text x="${p.px.toFixed(1)}" y="${(p.py + 4.5).toFixed(1)}" text-anchor="middle" font-size="13" fill="${isSelected ? selColor : pColor}" font-family="'JetBrains Mono', 'Segoe UI Symbol', 'Apple Symbols', sans-serif" font-weight="bold" style="pointer-events:none;">
            ${p.glyph}
          </text>
        `;
      }

      planetsHtml += `
        <g class="disp-wheel-planet disp-planet-hit" data-planet-key="${p.key}" style="cursor:pointer;">
          ${leaderHtml}
          ${ringHtml}
          <circle cx="${p.px.toFixed(1)}" cy="${p.py.toFixed(1)}" r="12" fill="#FFFFFF" stroke="${isSelected ? selColor : pColor}" stroke-width="${isSelected ? 2.2 : 1.4}"/>
          ${glyphHtml}
          <g style="pointer-events:none;">
            <rect x="${(p.px - 16).toFixed(1)}" y="${(p.py + 14).toFixed(1)}" width="32" height="10" rx="3" fill="rgba(255,255,255,0.96)" stroke="rgba(160,125,65,0.4)" stroke-width="0.6"/>
            <text x="${p.px.toFixed(1)}" y="${(p.py + 21.5).toFixed(1)}" text-anchor="middle" font-size="7.2" fill="#181822" font-family="'JetBrains Mono', monospace" font-weight="800">
              ${degStr}
            </text>
          </g>
        </g>
      `;
    });

    // 8. Center Hub
    const centerTitle = selectedKey ? (chartData.planets.find(pl => pl.key === selectedKey)?.name || selectedKey) : 'ASTRA';
    const centerSub = selectedKey ? 'WYBRANA PLANETA' : 'DISPOSITOR';
    const centerHtml = `
      <g style="pointer-events:none;">
        <text x="${CX}" y="${CY - 6}" text-anchor="middle" font-size="11" font-family="'Playfair Display', serif" font-weight="bold" fill="#3A2E1A" letter-spacing="1.5">
          ${centerTitle.toUpperCase()}
        </text>
        <text x="${CX}" y="${CY + 9}" text-anchor="middle" font-size="6.5" font-family="'JetBrains Mono', monospace" fill="#7A6848" font-weight="bold" letter-spacing="2">
          ${centerSub}
        </text>
      </g>
    `;

    return `
      <svg viewBox="0 0 ${S} ${S}" class="disp-wheel-svg" style="width:100%;max-width:540px;height:auto;display:block;margin:0 auto;">
        ${defs}
        ${bg}
        ${innerTerritoriesHtml}
        ${ticks}
        ${signsHtml}
        ${housesHtml}
        ${vectorsHtml}
        ${planetsHtml}
        ${centerHtml}
      </svg>
    `;
  }

  function getTerritoryDetails(chartData, planetKey, useModern = false) {
    if (!chartData || !planetKey) return null;
    const rulersMap = useModern ? SIGN_RULERS_MODERN : SIGN_RULERS_TRAD;
    const dispData = window.__DISPOSITOR_ENGINE__.calculateDispositorChain(chartData.planets, useModern);
    const planet = chartData.planets.find(p => p.key === planetKey);
    if (!planet) return null;

    const directSigns = [];
    const indirectSigns = [];

    SIGN_KEYS.forEach((sKey, idx) => {
      if (rulersMap[sKey] === planetKey) {
        const planetsHere = chartData.planets.filter(p => (p.signKey === sKey || p.sign === sKey));
        directSigns.push({ idx, name: SIGN_NAMES[idx], glyph: SIGN_GLYPHS[idx], planetsHere });
      }
    });

    const directSubs = (dispData.summaryMap[planetKey] && dispData.summaryMap[planetKey].directSubjects) || [];
    const indirectSubs = (dispData.summaryMap[planetKey] && dispData.summaryMap[planetKey].indirectSubjects) || [];

    // Astra Engine: Indirect territories are strictly signs ruled by direct subjects
    directSubs.forEach(subKey => {
      SIGN_KEYS.forEach((sKey, idx) => {
        if (rulersMap[sKey] === subKey && !directSigns.some(d => d.idx === idx) && !indirectSigns.some(ind => ind.idx === idx)) {
          const planetsHere = chartData.planets.filter(p => (p.signKey === sKey || p.sign === sKey));
          indirectSigns.push({ idx, name: SIGN_NAMES[idx], glyph: SIGN_GLYPHS[idx], planetsHere });
        }
      });
    });

    return {
      planet,
      directSigns,
      indirectSigns,
      directSubjects: directSubs.map(k => chartData.planets.find(p => p.key === k)).filter(Boolean),
      indirectSubjects: indirectSubs.map(k => chartData.planets.find(p => p.key === k)).filter(Boolean),
      percentage: (dispData.summaryMap[planetKey] && dispData.summaryMap[planetKey].percentage) || 0,
      rulerColor: PLANET_COLORS[planetKey] || '#C9A96E'
    };
  }

  window.__DISPOSITOR_WHEEL__ = {
    renderZodiacWheelSvg,
    getTerritoryDetails,
    PLANET_COLORS,
    SIGN_RULERS_MODERN,
    SIGN_RULERS_TRAD
  };
})();
