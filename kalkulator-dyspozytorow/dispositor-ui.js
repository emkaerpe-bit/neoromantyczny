/**
 * NEOROMANTYCZNY — DISPOSITOR UI & LABORATORY CONTROLLER
 * Integrates Astra Engine v4.0 Territory Edition & Interactive Zodiac Wheel
 */
(function () {
  const RULER_INTERPRETATIONS = {
    sun: 'Nie znosisz cudzego cienia. Wchodzisz do pokoju i mimowolnie mierzysz temperaturę spojrzeń — nie z próżności, lecz z głodu suwerenności. Twoje życie to bezkompromisowe wykuwanie tożsamości; każda próba wciśnięcia Cię w cudzy szablon kończy się cichym buntem lub powolnym wypaleniem.',
    moon: 'Żyjesz pod dyktando podskórnych prądów. Wyczuwasz napięcie w milczeniu partnera, zanim on sam je nazwie. Twoją siłą i przekleństwem jest pamięć emocjonalna — dom i intymność to dla Ciebie twierdza, a zdrada zaufania zamraża relację bezpowrotnie.',
    mercury: 'Twój umysł nigdy nie śpi. Łączysz fakty szybciej, niż otoczenie zdąży sformułować pytanie. Słowo jest dla Ciebie skalpelem i tarczą, a największym lękiem — nuda i uwięzienie w powtarzalnej, pozbawionej intelektualnego nerwu codzienności.',
    venus: 'Instynktowny zmysł proporcji, stylu i relacyjnego taktu. Nie tolerujesz wulgarności, chaosu ani emocjonalnego niechlujstwa. Twój los rozstrzyga się w jakości więzi — potrafisz stworzyć oazę spokoju, lecz gdy ktoś depcze Twoje poczucie godności, odchodzisz chłodno, bez krzyku.',
    mars: 'Czysta wola działania i awersja do bezradności. Kiedy inni tkwią w paraliżu analitycznym, Ty już podejmujesz decyzję i płacisz za nią własną krwią. Buntujesz się przeciwko bezsilności, a Twój instynkt walki potrafi ocalić sytuacje, które inni uznali za stracone.',
    jupiter: 'Horyzont to Twoja jedyna granica. Dusisz się w małych formatach, drobiazgowych kłótniach i jałowej asekuracji. Nosisz w sobie nieuleczalną wiarę w sens i rozwój, choć bywa, że obietnice Twojej wyobraźni przerastają ziemskie realia.',
    saturn: 'Ciężar odpowiedzialności, który dźwigasz z cichą godnością. W Twoim życiu nic nie przyszło za darmo — wiesz, ile kosztuje każda pomyłka i nie wierzysz w drogi na skróty. Z wiekiem zyskujesz magnetyczny autorytet kogoś, kto przetrwał własną zimę.',
    uranus: 'Wrodzony wstręt do konformizmu. Zrywasz umowy społeczne z chirurgiczną precyzją, jeśli tylko poczujesz zapach klatki. Twoja samotność bywa ceną za suwerenność, ale to właśnie Twoja bezkompromisowa inność wyznacza nowe kierunki.',
    neptune: 'Zanurzenie w świecie niewidzialnym. Chłoniesz emocje innych jak gąbka, często gubiąc granicę między własnym bólem a cierpieniem świata. Twoją siłą jest intuicja sięgająca poza logikę; Twoim wyzwaniem — nie uciekać w iluzje, gdy rzeczywistość staje się zbyt szorstka.',
    pluto: 'Radykalna odmowa powierzchowności. Widzisz to, co ludzie desperacko próbują ukryć za uśmiechem i uprzejmością. Żyjesz w cyklach całkowitej destrukcji i odrodzenia — w kryzysie nie pękasz, bo w ciemności czujesz się paradoksalnie u siebie.'
  };

  let currentChart = null;
  let useModernMode = false;
  let selectedPlanetKey = null;

  function setupCityAutocomplete() {
    const inputEl = document.getElementById('disp-city');
    const dropdownEl = document.getElementById('dispCityDropdown');
    if (!inputEl || !dropdownEl) return;

    function norm(s) {
      return String(s || '').toLowerCase().trim()
        .replace(/ł/g, 'l').replace(/ą/g, 'a').replace(/ę/g, 'e')
        .replace(/ś/g, 's').replace(/ć/g, 'c').replace(/ń/g, 'n')
        .replace(/ó/g, 'o').replace(/ź/g, 'z').replace(/ż/g, 'z')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    let allCities = [];
    if (window.ACG_CITIES_DB && Array.isArray(window.ACG_CITIES_DB.allCities)) {
      allCities = window.ACG_CITIES_DB.allCities;
    } else {
      allCities = (window.__DISPOSITOR_ENGINE__ && window.__DISPOSITOR_ENGINE__.CITIES) || [];
    }

    let currentMatches = [];
    let activeIdx = -1;

    function renderList(query) {
      const q = norm(query);
      if (!q) {
        currentMatches = allCities.slice(0, 15);
      } else {
        const starts = [];
        const contains = [];
        allCities.forEach(c => {
          const nName = norm(c.name);
          const nCountry = norm(c.country || 'Polska');
          if (nName.startsWith(q)) starts.push(c);
          else if (nName.includes(q) || nCountry.includes(q)) contains.push(c);
        });
        currentMatches = starts.concat(contains).slice(0, 20);
      }

      activeIdx = currentMatches.length ? 0 : -1;
      if (!currentMatches.length) {
        dropdownEl.innerHTML = `<div class="disp-autocomplete-empty">Nie znaleziono miasta „${query}”. Wpisz ręcznie lub wybierz najbliższe większe miasto.</div>`;
        dropdownEl.classList.add('is-open');
        return;
      }

      dropdownEl.innerHTML = currentMatches.map((c, idx) => `
        <div class="disp-autocomplete-item ${idx === 0 ? 'is-active' : ''}" data-idx="${idx}" role="option">
          <div>
            <span class="disp-autocomplete-name">${c.name}</span>
            <span class="disp-autocomplete-country">(${c.country || 'Polska'})</span>
          </div>
          <span class="disp-autocomplete-coords">${Math.abs(c.lat).toFixed(1)}°, ${Math.abs(c.lon).toFixed(1)}°</span>
        </div>
      `).join('');
      dropdownEl.classList.add('is-open');

      dropdownEl.querySelectorAll('.disp-autocomplete-item').forEach(item => {
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          const chosen = currentMatches[Number(item.getAttribute('data-idx'))];
          if (chosen) selectItem(chosen);
        });
      });
    }

    function selectItem(city) {
      inputEl.value = `${city.name} (${city.shortCountry || city.country || 'Polska'})`;
      dropdownEl.classList.remove('is-open');
    }

    inputEl.addEventListener('focus', () => {
      renderList(inputEl.value);
    });

    inputEl.addEventListener('input', () => {
      renderList(inputEl.value);
    });

    inputEl.addEventListener('keydown', (e) => {
      if (!dropdownEl.classList.contains('is-open')) return;
      const items = dropdownEl.querySelectorAll('.disp-autocomplete-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(currentMatches.length - 1, activeIdx + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(0, activeIdx - 1);
      } else if (e.key === 'Enter' && activeIdx >= 0 && currentMatches[activeIdx]) {
        e.preventDefault();
        selectItem(currentMatches[activeIdx]);
        return;
      } else if (e.key === 'Escape') {
        dropdownEl.classList.remove('is-open');
        return;
      }
      items.forEach((el, i) => el.classList.toggle('is-active', i === activeIdx));
      if (items[activeIdx]) items[activeIdx].scrollIntoView({ block: 'nearest' });
    });

    document.addEventListener('mousedown', (e) => {
      if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
        dropdownEl.classList.remove('is-open');
      }
    });
  }

  function init() {
    setupCityAutocomplete();
    const form = document.getElementById('disp-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const date = document.getElementById('disp-date').value;
      const time = document.getElementById('disp-time').value;
      const city = document.getElementById('disp-city').value || '';

      if (!date) {
        alert('Podaj datę urodzenia');
        return;
      }

      currentChart = window.__DISPOSITOR_ENGINE__.calcAllPlanets(date, time, city);
      const dispData = window.__DISPOSITOR_ENGINE__.calculateDispositorChain(currentChart.planets, useModernMode);
      if (dispData.finalDispositors && dispData.finalDispositors.length > 0) {
        selectedPlanetKey = dispData.finalDispositors[0];
      } else if (currentChart.ascSign) {
        const rulers = useModernMode ? window.__DISPOSITOR_ENGINE__.MODERN_RULERS : window.__DISPOSITOR_ENGINE__.TRADITIONAL_RULERS;
        selectedPlanetKey = rulers[currentChart.ascSign.key] || currentChart.planets[0].key;
      } else {
        selectedPlanetKey = dispData.summary && dispData.summary.length > 0 ? dispData.summary[0].planet : currentChart.planets[0].key;
      }
      renderAll(true);
    });
  }

  function selectPlanet(planetKey) {
    selectedPlanetKey = (selectedPlanetKey === planetKey) ? null : planetKey;
    renderAll(false);
  }
  function renderAll(shouldScroll = false) {
    if (!currentChart) return;
    const resultBox = document.getElementById('disp-results');
    resultBox.style.display = 'block';

    const dispData = window.__DISPOSITOR_ENGINE__.calculateDispositorChain(currentChart.planets, useModernMode);
    const rulers = useModernMode ? window.__DISPOSITOR_ENGINE__.MODERN_RULERS : window.__DISPOSITOR_ENGINE__.TRADITIONAL_RULERS;

    // 1. Interactive Wheel SVG
    const svgWheelHtml = window.__DISPOSITOR_WHEEL__.renderZodiacWheelSvg(currentChart, {
      selectedPlanet: selectedPlanetKey,
      useModern: useModernMode
    });

    // 2. Chart Ruler (Ascendant)
    let chartRulerHtml = '';
    if (currentChart.ascSign) {
      const ascKey = currentChart.ascSign.key;
      const rulerKey = rulers[ascKey];
      const rulerPlanet = currentChart.planets.find(p => p.key === rulerKey);
      const desc = RULER_INTERPRETATIONS[rulerKey] || '';

      const isRulerRx = rulerPlanet && rulerPlanet.isRetrograde;
      chartRulerHtml = `
        <div class="disp-card disp-card-gold" style="margin-bottom:1.25rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
            <div class="disp-badge" style="margin-bottom:0;">WŁADCA HOROSKOPU • KIEROWNIK ŻYCIA</div>
            ${isRulerRx ? '<span class="disp-badge disp-badge-rx" style="margin-bottom:0;font-size:0.65rem;">RETROGRADACJA (Rx)</span>' : ''}
          </div>
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
            <div class="disp-glyph-box" style="width:3.25rem;height:3.25rem;font-size:1.85rem;border-color:rgba(201,169,110,0.5);">${rulerPlanet.glyph}</div>
            <div>
              <h3 style="font-family:'Playfair Display',serif;font-size:1.45rem;margin:0;color:#FAF8F5;display:flex;align-items:center;gap:0.45rem;flex-wrap:wrap;">
                <span>${rulerPlanet.name}</span>
                ${isRulerRx ? '<span class="disp-rx-tag" title="Władca w ruchu wstecznym">Rx</span>' : ''}
                <span style="font-size:0.92rem;color:#C9A96E;font-family:'JetBrains Mono',monospace;">(w znaku ${rulerPlanet.signName} ${rulerPlanet.degreeInSign})</span>
              </h3>
              <p style="font-size:0.8rem;color:rgba(250,248,245,0.6);margin:0.2rem 0 0;font-family:'JetBrains Mono',monospace;">
                Władca Ascendentu w znaku ${currentChart.ascSign.name} ${currentChart.ascSign.glyph}
              </p>
            </div>
          </div>
          <p style="font-size:0.9rem;line-height:1.65;color:rgba(250,248,245,0.85);margin:0;font-style:italic;">
            „${desc}”
          </p>
          ${isRulerRx ? `
            <div style="margin-top:0.85rem;padding:0.65rem 0.85rem;border-radius:8px;background:rgba(251,113,133,0.08);border:1px solid rgba(251,113,133,0.25);font-size:0.82rem;line-height:1.55;color:rgba(250,248,245,0.85);">
              <strong style="color:#FB7185;">Wpływ Retrogradacji na Władcę:</strong> Twoja energia życiowa nie jest zorientowana na natychmiastową, impulsywną ekspresję w świecie. Każda reakcja przechodzi przez wewnętrzny filtr introspekcji i rewizji. Potrzebujesz więcej czasu na wejście w nowe otoczenie, lecz Twoje decyzje są znacznie trwalsze i odporniejsze na manipulację.
            </div>
          ` : ''}
        </div>
      `;
    }

    // 3. Final Dispositor / Mutual Reception
    let finalBoxHtml = '';
    if (dispData.finalDispositors.length > 0) {
      const fdKeys = dispData.finalDispositors;
      const fdNames = fdKeys.map(k => {
        const p = currentChart.planets.find(pl => pl.key === k);
        const data = dispData.summaryMap[k] || { percentage: 0 };
        return `
          <div style="display:inline-flex;align-items:center;gap:0.5rem;background:rgba(201,169,110,0.12);padding:0.4rem 0.8rem;border-radius:6px;border:1px solid rgba(201,169,110,0.3);margin:0.25rem;">
            <span style="font-size:1.2rem;color:#C9A96E;">${p.glyph}</span>
            <strong style="color:#FAF8F5;font-size:0.95rem;">${p.name}</strong>${p.isRetrograde ? ' <span class="disp-rx-tag" title="Władca w ruchu wstecznym">Rx</span>' : ''}
            <span style="font-size:0.75rem;color:#C9A96E;font-family:'JetBrains Mono',monospace;">${Math.round(data.percentage)}%</span>
          </div>
        `;
      }).join('');

      finalBoxHtml = `
        <div class="disp-card" style="border-color:rgba(201,169,110,0.45);margin-bottom:1.25rem;">
          <div class="disp-badge" style="background:rgba(201,169,110,0.2);">WŁADCA OSTATECZNY • INSTANCJA KOŃCOWA</div>
          <div style="margin:0.5rem 0 0.85rem;display:flex;flex-wrap:wrap;gap:0.4rem;">
            ${fdNames}
          </div>
          <p style="font-size:0.88rem;line-height:1.6;color:rgba(250,248,245,0.8);margin:0;">
            Twój wewnętrzny monarcha. To jedyna siła w Twojej psychice, która nie musi pytać nikogo o zgodę. Gdy opadają pozory, a kryzys zmusza Cię do ostatecznego wyboru — to właśnie tutaj zapada bezapelacyjny wyrok. To Twój rdzeń sprawczości, ale też punkt, w którym najłatwiej o ślepy upór.
          </p>
        </div>
      `;
    } else if (dispData.mutualReceptions.length > 0) {
      const mrPairs = dispData.mutualReceptions.map(pair => {
        const p1 = currentChart.planets.find(pl => pl.key === pair[0]);
        const p2 = currentChart.planets.find(pl => pl.key === pair[1]);
        return `${p1.name} ${p1.glyph}${p1.isRetrograde ? ' <span class="disp-rx-tag">Rx</span>' : ''} (w ${p1.signName}) ↔ ${p2.name} ${p2.glyph}${p2.isRetrograde ? ' <span class="disp-rx-tag">Rx</span>' : ''} (w ${p2.signName})`;
      }).join('<br>');

      finalBoxHtml = `
        <div class="disp-card" style="border-color:rgba(201,169,110,0.4);margin-bottom:1.25rem;">
          <div class="disp-badge" style="background:rgba(201,169,110,0.15);">WZAJEMNA RECEPCJA • DUET WŁADZY</div>
          <h4 style="font-family:'Playfair Display',serif;font-size:1.15rem;color:#FAF8F5;margin:0 0 0.5rem;">
            ${mrPairs}
          </h4>
          <p style="font-size:0.88rem;line-height:1.6;color:rgba(250,248,245,0.8);margin:0;">
            Zamiast pojedynczego monarchy, Twoim życiem zarządza zsynchronizowany duet dwóch energii. Nieustanny dialog wewnętrzny: jedna planeta trzyma klucze do skarbca drugiej. Gdy współpracują — masz wielką elastyczność. W kryzysie — grozi Ci przeciąganie liny i paraliż decyzyjny.
          </p>
        </div>
      `;
    } else if (dispData.loops.length > 0) {
      finalBoxHtml = `
        <div class="disp-card" style="margin-bottom:1.25rem;">
          <div class="disp-badge">PĘTLA PLANETARNA • RADA NADZORCZA</div>
          <p style="font-size:0.88rem;line-height:1.6;color:rgba(250,248,245,0.8);margin:0;">
            Rada cieni w Twojej podświadomości. Zamknięty obieg energii, w którym każda motywacja wędruje przez kilka instancji psychiki. Złożona, wielowątkowa osobowość — rzadko podejmujesz impulsywne kroki, bo każda decyzja musi zostać przegłosowana przez kilka sfer Twojego życia.
          </p>
        </div>
      `;
    }

    // 4. Atmakaraka (Soul Planet)
    const atmakaraka = [...currentChart.planets]
      .filter(p => !['chiron', 'lilith', 'node', 'fortune'].includes(p.key))
      .sort((a, b) => (b.longitude % 30) - (a.longitude % 30))[0];
    let atmakarakaHtml = '';
    if (atmakaraka) {
      atmakarakaHtml = `
        <div class="disp-card" style="margin-bottom:1.25rem;border-color:rgba(201,169,110,0.25);">
          <div class="disp-badge" style="background:rgba(201,169,110,0.12);">ATMAKARAKA • PLANETA DUSZY</div>
          <div style="display:flex;align-items:center;gap:0.85rem;margin:0.4rem 0;">
            <div class="disp-glyph-box" style="width:2.6rem;height:2.6rem;font-size:1.4rem;">${atmakaraka.glyph}</div>
            <div>
              <strong style="color:#FAF8F5;font-size:1.1rem;font-family:'Playfair Display',serif;">${atmakaraka.name}</strong>
              <span style="display:block;font-size:0.75rem;color:#C9A96E;font-family:'JetBrains Mono',monospace;">
                ${atmakaraka.degInSign}° w ${atmakaraka.signName} (najwyższy stopień w znaku)
              </span>
            </div>
          </div>
          <p style="font-size:0.82rem;color:rgba(250,248,245,0.7);margin:0.25rem 0 0;line-height:1.5;">
            Król Duszy w tradycji wedyjskiej. Wskazuje na najgłębsze pragnienie Twojego ego oraz karmiczny punkt zwrotny. To tutaj życie zadaje Ci najtrudniejsze pytania, dopóki nie nauczysz się odpuszczać przymusu kontroli.
          </p>
        </div>
      `;
    }

    // 4b. Status Retrogradacji (Introspekcja i Rewizja Wewnętrzna wg C.G. Junga)
    let retroBoxHtml = '';
    const retroPlanets = currentChart.retrogradePlanets || [];
    if (retroPlanets.length > 0) {
      const retroItemsHtml = retroPlanets.map(p => `
        <div style="display:inline-flex;align-items:center;gap:0.45rem;background:rgba(251,113,133,0.08);border:1px solid rgba(251,113,133,0.25);padding:0.35rem 0.65rem;border-radius:6px;margin:0.2rem;">
          <span style="color:#FB7185;font-size:1rem;">${p.glyph}</span>
          <strong style="color:#FAF8F5;font-size:0.85rem;">${p.name}</strong>
          <span class="disp-rx-tag">Rx</span>
          <span style="font-size:0.75rem;color:rgba(250,248,245,0.6);font-family:'JetBrains Mono',monospace;">w ${p.signName} ${p.degreeInSign}</span>
        </div>
      `).join('');

      retroBoxHtml = `
        <div class="disp-card" style="margin-bottom:1.25rem;border-color:rgba(251,113,133,0.35);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
            <div class="disp-badge disp-badge-rx" style="margin:0;">
              WEKTOR INTROSPEKCJI • RETROGRADACJA (Rx)
            </div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:#FB7185;">
              ${retroPlanets.length} ${retroPlanets.length === 1 ? 'planeta w ruchu wstecznym' : (retroPlanets.length < 5 ? 'planety w ruchu wstecznym' : 'planet w ruchu wstecznym')}
            </span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.25rem;margin-bottom:0.85rem;">
            ${retroItemsHtml}
          </div>
          <p style="font-size:0.88rem;line-height:1.65;color:rgba(250,248,245,0.8);margin:0;">
            W psychologii analitycznej C.G. Junga ruch wsteczny oznacza introwersję funkcji psychicznej: dana energia nie realizuje się bezrefleksyjnie w świecie zewnętrznym, lecz jest nieustannie weryfikowana, kwestionowana i pogłębiana od wewnątrz. W łańcuchu dyspozytorów planety Rx stanowią wewnętrzne filtry — sprawiają, że nie przyjmujesz gotowych schematów społecznych, lecz budujesz własne, bezkompromisowe kryteria prawdy.
          </p>
        </div>
      `;
    }

    // 5. Ranking w psychice (Tabela)
    let rankingRows = dispData.summary.map((item, idx) => {
      const p = currentChart.planets.find(pl => pl.key === item.planet);
      const isSelected = selectedPlanetKey === item.planet;
      return `
        <tr class="disp-rank-row ${isSelected ? 'is-selected' : ''}" data-planet-key="${item.planet}" style="cursor:pointer;">
          <td style="font-family:'JetBrains Mono',monospace;color:#C9A96E;font-size:0.82rem;">#${idx + 1}</td>
          <td>
            <div style="display:flex;align-items:center;gap:0.45rem;">
              <span class="disp-glyph-box" style="width:1.8rem;height:1.8rem;font-size:1.05rem;border-color:${isSelected ? '#C9A96E' : 'rgba(255,255,255,0.1)'};">${p.glyph}</span>
              <strong style="color:${isSelected ? '#C9A96E' : '#FAF8F5'};">${p.name}</strong>${p.isRetrograde ? ' <span class="disp-rx-tag" title="Planeta w retrogradacji (ruch wsteczny)">Rx</span>' : ''}
            </div>
          </td>
          <td style="color:rgba(250,248,245,0.7);font-size:0.82rem;">${p.signName} <span style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;opacity:0.65;">${p.degreeInSign}</span></td>
          <td style="text-align:center;font-family:'JetBrains Mono',monospace;font-size:0.82rem;">${item.totalSubjects}</td>
          <td style="text-align:right;">
            <div style="display:flex;align-items:center;justify-content:flex-end;gap:0.4rem;">
              <div style="background:rgba(201,169,110,0.15);border-radius:4px;width:50px;height:5px;overflow:hidden;">
                <div style="background:#C9A96E;height:100%;width:${item.percentage}%;"></div>
              </div>
              <span style="font-family:'JetBrains Mono',monospace;color:#C9A96E;font-size:0.82rem;min-width:32px;">${item.percentage}%</span>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Active territory intelligence map
    let territoryMapHtml = '';
    if (selectedPlanetKey && window.__DISPOSITOR_WHEEL__.getTerritoryDetails) {
      const details = window.__DISPOSITOR_WHEEL__.getTerritoryDetails(currentChart, selectedPlanetKey, useModernMode);
      if (details) {
        const directList = details.directSigns.length > 0
          ? details.directSigns.map(s => {
              const pls = s.planetsHere.length > 0 
                ? `— goszczą tu: ${s.planetsHere.map(p => `<strong style="color:#FAF8F5;">${p.name} ${p.glyph}</strong>`).join(', ')}`
                : '— puste pole';
              return `<li style="margin-bottom:0.35rem;"><span style="color:${details.rulerColor};font-weight:bold;">${s.name} ${s.glyph}</span> <span style="font-size:0.75rem;color:rgba(250,248,245,0.7);">${pls}</span></li>`;
            }).join('')
          : '<li>Brak znaków bezpośrednich w wybranym systemie</li>';

        const indirectList = details.indirectSigns.length > 0
          ? details.indirectSigns.map(s => {
              const pls = s.planetsHere.length > 0 
                ? `— goszczą tu: ${s.planetsHere.map(p => `<strong style="color:#FAF8F5;">${p.name} ${p.glyph}</strong>`).join(', ')}`
                : '— puste pole';
              return `<li style="margin-bottom:0.35rem;"><span style="color:#FAF8F5;font-style:italic;">${s.name} ${s.glyph}</span> <span style="font-size:0.75rem;color:rgba(250,248,245,0.7);">${pls}</span></li>`;
            }).join('')
          : '<li>Brak terytoriów pośrednich (łańcuch zamyka się bezpośrednio)</li>';

        const dirSubsText = details.directSubjects.length > 0
          ? details.directSubjects.map(p => `<span class="disp-badge" style="background:${details.rulerColor}22;border-color:${details.rulerColor}55;color:${details.rulerColor};margin:0.15rem 0.2rem;font-size:0.75rem;">${p.glyph} ${p.name}</span>`).join('')
          : '<span style="font-size:0.78rem;color:rgba(250,248,245,0.45);">Brak bezpośrednich poddanych</span>';

        const indSubsText = details.indirectSubjects.length > 0
          ? details.indirectSubjects.map(p => `<span class="disp-badge" style="background:rgba(255,255,255,0.06);margin:0.15rem 0.2rem;font-size:0.75rem;">${p.glyph} ${p.name}</span>`).join('')
          : '<span style="font-size:0.78rem;color:rgba(250,248,245,0.45);">Brak pośrednich poddanych</span>';

        territoryMapHtml = `
          <div class="disp-territory-map-panel" style="margin-top:1rem;padding:1.15rem;border-radius:12px;background:rgba(18,18,26,0.9);border:1.5px solid ${details.rulerColor};box-shadow:0 0 25px ${details.rulerColor}25;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:0.75rem;">
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <div class="disp-glyph-box" style="width:2.8rem;height:2.8rem;font-size:1.6rem;border-color:${details.rulerColor};color:${details.rulerColor};">
                  ${details.planet.glyph}
                </div>
                <div>
                  <div style="display:flex;align-items:center;gap:0.4rem;flex-wrap:wrap;">
                    <h4 style="font-family:'Playfair Display',serif;font-size:1.25rem;color:#FAF8F5;margin:0;">
                      ${details.planet.name}
                    </h4>
                    <span class="disp-badge" style="background:${details.rulerColor}22;color:${details.rulerColor};border-color:${details.rulerColor}55;margin:0;font-size:0.6rem;">
                      MAPA TERYTORIÓW
                    </span>
                  </div>
                  <p style="font-size:0.78rem;color:rgba(250,248,245,0.65);margin:0.2rem 0 0;font-family:'JetBrains Mono',monospace;">
                    w znaku ${details.planet.signName} (${details.planet.degInSign}°) • Wpływ na psychikę: <strong style="color:${details.rulerColor};">${Math.round(details.percentage)}%</strong>
                  </p>
                </div>
              </div>
              <button type="button" id="disp-reset-sel" class="disp-btn-sm" style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2);padding:0.35rem 0.75rem;font-size:0.72rem;">
                ✕ Zresetuj mapę
              </button>
            </div>

            <div style="display:grid;grid-template-columns:1fr;gap:0.85rem;">
              <div style="background:rgba(255,255,255,0.02);border:1px solid ${details.rulerColor}44;border-radius:8px;padding:0.85rem;">
                <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.45rem;">
                  <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${details.rulerColor};"></span>
                  <strong style="font-size:0.88rem;color:#FAF8F5;">Władztwo Bezpośrednie</strong>
                  <span style="font-size:0.65rem;font-family:'JetBrains Mono',monospace;color:${details.rulerColor};margin-left:auto;">[PEŁNY KOLOR NA KOLE]</span>
                </div>
                <p style="font-size:0.75rem;line-height:1.45;color:rgba(250,248,245,0.65);margin:0 0 0.5rem;">
                  Znaki, w których ${details.planet.name} jest gospodarzem (domicyl):
                </p>
                <ul style="margin:0 0 0.6rem;padding-left:1.1rem;font-size:0.78rem;line-height:1.45;">
                  ${directList}
                </ul>
                <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:0.4rem;font-size:0.75rem;">
                  <span style="color:rgba(250,248,245,0.5);display:block;margin-bottom:0.2rem;">Poddani bezpośredni:</span>
                  <div style="display:flex;flex-wrap:wrap;gap:0.2rem;">${dirSubsText}</div>
                </div>
              </div>

              <div style="background:rgba(255,255,255,0.02);border:1px dashed ${details.rulerColor}55;border-radius:8px;padding:0.85rem;">
                <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.45rem;">
                  <span style="display:inline-block;width:12px;height:2px;border-top:2px dashed ${details.rulerColor};"></span>
                  <strong style="font-size:0.88rem;color:#FAF8F5;">Wpływ Pośredni (Strefa Wasalna)</strong>
                  <span style="font-size:0.65rem;font-family:'JetBrains Mono',monospace;color:${details.rulerColor};margin-left:auto;">[LINIA PRZERYWANA NA KOLE]</span>
                </div>
                <p style="font-size:0.75rem;line-height:1.45;color:rgba(250,248,245,0.65);margin:0 0 0.5rem;">
                  Znaki podległe energiom zależnym od ${details.planet.name} (jej wola przenika przez łańcuch):
                </p>
                <ul style="margin:0 0 0.6rem;padding-left:1.1rem;font-size:0.78rem;line-height:1.45;">
                  ${indirectList}
                </ul>
                <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:0.4rem;font-size:0.75rem;">
                  <span style="color:rgba(250,248,245,0.5);display:block;margin-bottom:0.2rem;">Poddani w dalszym łańcuchu:</span>
                  <div style="display:flex;flex-wrap:wrap;gap:0.2rem;">${indSubsText}</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
    // 6. Pełna sieć powiązań (Drzewo relacji)
    let relationsHtml = dispData.chain.map(item => {
      const p = currentChart.planets.find(pl => pl.key === item.planet);
      const ruler = currentChart.planets.find(pl => pl.key === item.ruler);
      const isFinal = dispData.finalDispositors.includes(item.planet);
      const isDignified = item.planet === item.ruler;
      const isSelected = selectedPlanetKey === item.planet;

      let statusBadge = '';
      if (isFinal) {
        statusBadge = '<span class="disp-badge" style="background:rgba(201,169,110,0.25);margin:0;">WŁADCA OSTATECZNY</span>';
      } else if (isDignified) {
        statusBadge = '<span class="disp-badge" style="background:rgba(201,169,110,0.15);margin:0;">W DOMICYLU</span>';
      }

      const subjectsText = item.subjects.length > 0 
        ? item.subjects.map(sKey => {
            const sp = currentChart.planets.find(pl => pl.key === sKey);
            return `<span style="display:inline-block;background:rgba(255,255,255,0.06);padding:0.15rem 0.45rem;border-radius:4px;margin:0.1rem;font-size:0.78rem;">${sp.glyph} ${sp.name}</span>`;
          }).join(' ')
        : '<span style="color:rgba(250,248,245,0.4);font-size:0.78rem;">Brak bezpośrednich poddanych</span>';

      return `
        <div class="disp-chain-item ${isSelected ? 'is-selected' : ''}" data-planet-key="${p.key}" style="background:rgba(18,18,26,0.6);border:1px solid ${isSelected ? '#C9A96E' : 'rgba(255,255,255,0.06)'};border-radius:8px;padding:0.85rem 1.1rem;cursor:pointer;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.5rem;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
              <span class="disp-glyph-box" style="width:1.9rem;height:1.9rem;font-size:1.05rem;">${p.glyph}</span>
              <strong style="font-size:0.98rem;color:#FAF8F5;">${p.name}</strong>${p.isRetrograde ? ' <span class="disp-rx-tag">Rx</span>' : ''}
              <span style="color:rgba(250,248,245,0.6);font-size:0.8rem;margin-left:0.35rem;">w znaku ${p.signName} (${p.degInSign}°)</span>
            </div>
            ${statusBadge}
          </div>
          <div style="font-size:0.82rem;color:rgba(250,248,245,0.75);margin-bottom:0.35rem;">
            Władca (Dyspozytor): <strong style="color:#C9A96E;">${ruler.name} ${ruler.glyph}</strong>
          </div>
          <div style="font-size:0.8rem;color:rgba(250,248,245,0.65);">
            Poddani: ${subjectsText}
          </div>
        </div>
      `;
    }).join('');

    resultBox.innerHTML = `
      <div style="margin-top:2rem;">
        <div style="display:flex;justify-content:center;gap:0.75rem;margin-bottom:1.5rem;flex-wrap:wrap;">
          <button type="button" id="disp-mode-trad" class="disp-tab-btn ${!useModernMode ? 'active' : ''}">
            Tradycyjne władztwa (Septener)
          </button>
          <button type="button" id="disp-mode-modern" class="disp-tab-btn ${useModernMode ? 'active' : ''}">
            Nowoczesne władztwa (Pluton, Uran, Neptun)
          </button>
        </div>

        <!-- Główna Sekcja Laboratoryjna: Koło Zodiakalne (Lewa) + Analiza (Prawa) -->
        <div class="disp-lab-grid">
          <!-- Lewa Kolumna: Koło Zodiakalne SVG -->
          <div class="disp-lab-visual">
            <div class="disp-card disp-wheel-card" style="padding:1.25rem 1rem;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
                <div class="disp-badge" style="margin:0;">KOŁO ZODIAKALNE • ASTRA ENGINE</div>
                <span style="font-size:0.72rem;font-family:'JetBrains Mono',monospace;color:rgba(250,248,245,0.5);">Tryb Terytorium</span>
              </div>
              <div id="disp-wheel-container">
                ${svgWheelHtml}
              </div>
              ${territoryMapHtml}
              <div style="margin-top:0.85rem;padding:0.75rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;font-size:0.76rem;line-height:1.5;color:rgba(250,248,245,0.65);">
                <strong style="color:#C9A96E;">Jak czytać koło:</strong> Kliknij dowolną planetę na kole lub w tabeli. Znaki, którymi włada, zostaną natychmiast rozświetlone (kolor = władztwo bezpośrednie, linia przerywana = pośrednie, złote strzałki = wektory dyspozycji).
              </div>
            </div>
          </div>

          <!-- Prawa Kolumna: Inteligencja Analityczna -->
          <div class="disp-lab-analysis">
            ${chartRulerHtml}
            ${finalBoxHtml}
            ${atmakarakaHtml}
            ${retroBoxHtml}

            <div class="disp-card" style="margin-bottom:1.25rem;">
              <h4 style="font-family:'Playfair Display',serif;font-size:1.25rem;color:#FAF8F5;margin:0 0 0.4rem;">
                Hierarchia Wpływów w Psychice
              </h4>
              <p style="font-size:0.82rem;color:rgba(250,248,245,0.6);margin:0 0 1rem;">
                Wybierz planetę z listy, aby aktywować jej terytorium na kole zodiakalnym.
              </p>
              <div style="width:100%;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;">
                <table class="disp-table" style="width:100%;">
                  <thead>
                    <tr>
                      <th style="width:36px;">#</th>
                      <th>Planeta</th>
                      <th>Znak</th>
                      <th style="text-align:center;">Poddani</th>
                      <th style="text-align:right;">Wpływ</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rankingRows}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Drzewo Przepływu Energii (Cała szerokość) -->
        <div class="disp-card" style="margin-top:1.5rem;">
          <h3 style="font-family:'Playfair Display',serif;font-size:1.35rem;color:#FAF8F5;margin:0 0 0.4rem;">
            Drzewo Dyspozytorów (Przepływ Energii)
          </h3>
          <p style="font-size:0.85rem;color:rgba(250,248,245,0.65);margin:0 0 1.25rem;">
            Łańcuch zależności psychicznych. Kliknij dowolne ogniwo, aby zobaczyć powiązane wektory na kole zodiakalnym.
          </p>
          <div class="disp-chain-grid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:0.75rem;width:100%;max-width:100%;box-sizing:border-box;">
            ${relationsHtml}
          </div>
        </div>

        <!-- Paywalled Spersonalizowany Raport Władcy (20 PLN) Container -->
        <div id="dispositor-report-container"></div>

        <!-- CTA Konsultacji -->
        <div class="disp-card" style="margin-top:2rem;background:linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(13,13,18,0.9) 100%);border-color:rgba(201,169,110,0.4);text-align:center;padding:2.75rem 1.75rem;">
          <div class="disp-badge" style="background:rgba(201,169,110,0.2);">PRYWATNA KONSULTACJA • ANALIZA KOSMOGRAMU</div>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.6rem;color:#FAF8F5;margin:0.5rem 0 1rem;">
            Chcesz zrozumieć, dlaczego wciąż sabotujesz własne decyzje?
          </h3>
          <p style="font-size:0.92rem;line-height:1.75;color:rgba(250,248,245,0.85);max-width:620px;margin:0 auto 1.5rem;">
            Drzewo dyspozytorów obnaża to, czego nie widać na powierzchni: nieświadome sojusze planet, uwikłania emocjonalne i punkty, w których Twoja wola traci ster. Umów się na intymną analizę psychologiczną swojego kosmogramu z autorem Neoromantyzmu.
          </p>
          <a href="mailto:kontakt@neoromantyczny.pl?subject=Konsultacja%20-%20Analiza%20Drzewa%20Dyspozytorow" class="disp-btn disp-btn-consultation" style="text-decoration:none;display:inline-block;padding:0.95rem 1.5rem;color:#0D0D12;max-width:100%;box-sizing:border-box;word-break:break-word;">
            Zarezerwuj konsultację: kontakt@neoromantyczny.pl
          </a>
        </div>
      </div>
    `;

    // Render Paywalled Custom Dispositor Report (20 PLN)
    function triggerPaywallRender(attempts) {
      attempts = attempts || 0;
      if (window.__DISPOSITOR_REPORT_UI__ && typeof window.__DISPOSITOR_REPORT_UI__.renderPaywallTeaser === 'function') {
        window.__DISPOSITOR_REPORT_UI__.renderPaywallTeaser(dispData, currentChart.planets, currentChart);
      } else if (attempts < 80) {
        setTimeout(function () { triggerPaywallRender(attempts + 1); }, 80);
      } else {
        console.warn('Nie udało się załadować modułu __DISPOSITOR_REPORT_UI__ po 80 próbach.');
      }
    }
    triggerPaywallRender(0);

    // Bind event handlers
    document.querySelectorAll('.disp-planet-hit, .disp-rank-row, .disp-chain-item').forEach(el => {
      el.addEventListener('click', function () {
        const pKey = this.getAttribute('data-planet-key');
        if (pKey) selectPlanet(pKey);
      });
    });

    const resetBtn = document.getElementById('disp-reset-sel');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        selectPlanet(null);
      });
    }

    const btnModern = document.getElementById('disp-mode-modern');
    const btnTrad = document.getElementById('disp-mode-trad');
    if (btnModern && btnTrad) {
      btnModern.addEventListener('click', function () {
        if (!useModernMode) {
          useModernMode = true;
          renderAll(false);
        }
      });
      btnTrad.addEventListener('click', function () {
        if (useModernMode) {
          useModernMode = false;
          renderAll(false);
        }
      });
    }

    if (shouldScroll) {
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
