/**
 * NEOROMANTYCZNY — DISPOSITOR UI & LABORATORY CONTROLLER
 * Integrates Astra Engine v4.0 Territory Edition & Interactive Zodiac Wheel
 */
(function () {
  const RULER_INTERPRETATIONS = {
    sun: 'W nowym towarzystwie w ciągu pięciu minut przejmujesz rolę osoby, od której zależy rytm rozmowy. Czujesz fizyczny spadek energii w sytuacjach, w których Twój wkład ginie w zbiorowej anonimowości. Gdy ktoś próbuje ustawić Cię w szeregu bez wyraźnego powodu, odruchowo wycofujesz zaangażowanie albo budujesz własną scenę obok.',
    moon: 'Skanujesz nastrój w pokoju zanim ktokolwiek zda sobie sprawę, że coś jest nie tak. Pamiętasz ton głosu sprzed miesięcy znacznie dokładniej niż same argumenty, a na chłód lub niedopowiedzenie partnera reagujesz natychmiastowym zamknięciem emocjonalnym. Bliskość budujesz powoli, sprawdzając najpierw, czy druga strona potrafi unieść Twoją wrażliwość.',
    mercury: 'Porządkujesz rzeczywistość przez pytania, notatki i wyłapywanie niespójności w cudzych zdaniach. Nuda intelektualna męczy Cię bardziej niż nadmiar pracy, dlatego szybko tracisz cierpliwość do spotkań bez puenty. Pod presją zaczynasz analizować każdą sylabę drugiej osoby, zamiast po prostu zapytać, o co jej chodzi.',
    venus: 'Twoim kompasem jest jakość relacji, proporcja i estetyka codziennego wyboru — od sposobu prowadzenia sporu po to, jak wydajesz pieniądze. Nie robisz publicznych scen: kiedy ktoś wielokrotnie ignoruje Twoje granice, po prostu wygaszasz obecność i odcinasz dostęp do swojej uwagi bez zbędnych tłumaczeń.',
    mars: 'Działasz szybko, bo bierne czekanie na cudzą decyzję podnosi Ci ciśnienie bardziej niż samo ryzyko pomyłki. W sporze wolisz ostrą, otwartą konfrontację niż wielodniowe obrażanie się, a przy pierwszym kryzysie odruchowo bierzesz stery na siebie, zanim reszta zdąży ustalić plan.',
    jupiter: 'Potrzebujesz przestrzeni do ruchu, długiego horyzontu i poczucia, że to, co robisz, otwiera kolejne drzwi. Drobiazgowe rozliczanie cudzych potknięć zabija Twój zapał w kilka dni. W relacjach i pracy dajesz dużo zaufania na start, choć czasem obiecujesz więcej czasu lub zasobów, niż faktycznie mieści Twój kalendarz.',
    saturn: 'Wchodzisz w zobowiązania z ołówkiem w ręku: liczysz koszty, czas i realną trwałość, zanim złożysz deklarację. Trudno kupić Cię tanim entuzjazmem, bo z doświadczenia wiesz, kto sprząta po cudzych obietnicach. Z zewnątrz sprawiasz wrażenie osoby niedostępnej, choć wobec zaufanych ludzi wykazujesz żelazną lojalność.',
    uranus: 'Nienawidzisz sztucznych konwenansów i układów podtrzymywanych wyłącznie z przyzwyczajenia. Kiedy środowisko zaczyna Cię formatować pod jeden szablon, ucinasz kontakt jednym krótkim komunikatem i zmieniasz kierunek bez oglądania się za siebie. Prawdziwą bliskość tworzysz tylko tam, gdzie druga osoba szanuje Twoją autonomię.',
    neptune: 'Wychwytujesz intencje i ukryte motywy ludzi znacznie szybciej, niż wynika to z ich słów. Granica między Twoim nastrojem a emocjami partnera bywa bardzo cienka, przez co łatwo bierzesz na siebie cudzy ciężar. Gdy świat robi się zbyt brutalny lub hałaśliwy, uciekasz w odkładanie decyzji i prywatny świat wyobraźni.',
    pluto: 'Od pierwszej minuty wyczuwasz, kto w pokoju rozdaje karty, a kto tylko udaje pewność siebie. Półśrodki i grzecznościowa gra męczą Cię do tego stopnia, że wolisz pełne zerwanie od letniego kompromisu. W sytuacjach granicznych, gdy inni tracą rezon, zyskujesz chłodną, bezkompromisową trzeźwość.'
  };

  function traceChainPath(startKey, chainMap) {
    const path = [startKey];
    let curr = startKey;
    const seen = new Set([startKey]);
    for (let step = 0; step < 12; step++) {
      const next = chainMap[curr];
      if (!next || next === curr || seen.has(next)) {
        if (next && next !== curr && seen.has(next)) path.push(next);
        break;
      }
      path.push(next);
      seen.add(next);
      curr = next;
    }
    return path;
  }

  function buildMaskVsSovereignSynthesis(rulerPlanet, currentChart, dispData) {
    if (!rulerPlanet || !dispData) return '';
    const pByKey = Object.fromEntries(currentChart.planets.map(p => [p.key, p]));
    const pathKeys = traceChainPath(rulerPlanet.key, dispData.chainMap || {});
    const pathNames = pathKeys.map(k => pByKey[k] ? `${pByKey[k].glyph} ${pByKey[k].name}` : k).join(' → ');
    const fdKeys = dispData.finalDispositors || [];
    let verdictTitle = '';
    let verdictBody = '';

    if (fdKeys.includes(rulerPlanet.key)) {
      verdictTitle = 'Spójność Monolityczna: Maska i Suweren to ta sama siła';
      verdictBody = `Twój Władca Ascendentu (${rulerPlanet.name} w znaku ${rulerPlanet.signName}) jest jednocześnie Twoim Władcą Ostatecznym. Ludzie dostają na starcie dokładnie tę energię, która zarządza Twoimi decyzjami w kryzysie — bez ukrytej agendy. Ryzyko tego układu to tunelowe widzenie: gdy przychodzi presja, podkręcasz swoje domyślne zachowanie zamiast zmienić strategię.`;
    } else if (fdKeys.length > 0) {
      const sov = pByKey[fdKeys[0]];
      const subData = dispData.summaryMap[fdKeys[0]] || { percentage: 0 };
      verdictTitle = `Dwie Instancje: ${rulerPlanet.name} otwiera drzwi, ${sov.name} podpisuje wyrok`;
      verdictBody = `Świat poznaje Cię przez styl, jaki narzuca ${rulerPlanet.name} w znaku ${rulerPlanet.signName}, ale za zamkniętymi drzwiami każda ważna decyzja wędruje ścieżką: <strong style="color:#C9A96E;">${pathNames}</strong>. Tam stery przejmuje ${sov.name} w znaku ${sov.signName} (${Math.round(subData.percentage)}% wpływu w psychice). Kiedy otoczenie bierze Twoje pierwsze wrażenie za cały Twój charakter, często bywa zaskoczone, jak twardo lub niespodziewanie stawiasz ostateczną granicę.`;
    } else if (dispData.mutualReceptions && dispData.mutualReceptions.length > 0) {
      const pair = dispData.mutualReceptions[0].map(k => pByKey[k] ? pByKey[k].name : k).join(' ↔ ');
      verdictTitle = `Maska deleguje władzę do Duetu (${pair})`;
      verdictBody = `Pierwszy impuls (${rulerPlanet.name}) wpada w ścieżkę <strong style="color:#C9A96E;">${pathNames}</strong> i kończy w dwuwładzy ${pair}. Z zewnątrz możesz wydawać się bardziej zdecydowany niż czujesz się w środku, bo finalna decyzja wymaga zgody dwóch przeciwnych potrzeb naraz.`;
    } else {
      verdictTitle = `Maska w obiegu Rady Nadzorczej (Pętla Decyzyjna)`;
      verdictBody = `Twój styl wejścia w relacje (${rulerPlanet.name}) przekazuje impuls w głąb zamkniętego obiegu: <strong style="color:#C9A96E;">${pathNames}</strong>. Zanim podejmiesz kluczowy ruch życiowy, sprawdzasz sprawę pod kilkoma kątami naraz — to chroni przed naiwnością, ale w momentach stresu potrafi przeciągać decyzję w nieskończoność.`;
    }

    return `
      <div class="disp-card" style="border-color:rgba(201,169,110,0.38);background:rgba(201,169,110,0.04);margin-bottom:1.25rem;">
        <div class="disp-badge" style="background:rgba(201,169,110,0.18);">SYNTEZA KOMBINATORYCZNA • ZDERZENIE MASKI Z SUWERENEM</div>
        <h4 style="font-family:'Playfair Display',serif;font-size:1.12rem;color:#FAF8F5;margin:0.2rem 0 0.5rem;">${verdictTitle}</h4>
        <p style="font-size:0.86rem;line-height:1.62;color:rgba(250,248,245,0.82);margin:0;">${verdictBody}</p>
      </div>
    `;
  }

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
        dropdownEl.innerHTML = `<div class="disp-autocomplete-empty">Nie znaleziono miasta „${String(query || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}”. Wpisz ręcznie lub wybierz najbliższe większe miasto.</div>`;
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

      try {
        localStorage.setItem('neo_dispositor_last_input', JSON.stringify({ date, time, city }));
      } catch (err) {}

      currentChart = window.__DISPOSITOR_ENGINE__.calcAllPlanets(date, time, city);
      currentChart.chartHash = window.NeoChartLock
        ? window.NeoChartLock.buildHash('dyspozytorzy', {
            date,
            time: time || '12:00',
            city,
            lat: currentChart.city && currentChart.city.lat,
            lon: currentChart.city && currentChart.city.lon
          })
        : '';
      const dispData = window.__DISPOSITOR_ENGINE__.calculateDispositorChain(currentChart.planets, useModernMode);
      if (dispData.finalDispositors && dispData.finalDispositors.length > 0) {
        selectedPlanetKey = dispData.finalDispositors[0];
      } else if (currentChart.ascSign) {
        const rulers = useModernMode ? window.__DISPOSITOR_ENGINE__.MODERN_RULERS : window.__DISPOSITOR_ENGINE__.TRADITIONAL_RULERS;
        selectedPlanetKey = rulers[currentChart.ascSign.key] || currentChart.planets[0].key;
      } else {
        selectedPlanetKey = dispData.summary && dispData.summary.length > 0 ? dispData.summary[0].planet : currentChart.planets[0].key;
      }
      renderAll(!window.__DISP_SUPPRESS_SUBMIT_SCROLL__);
      window.__DISP_SUPPRESS_SUBMIT_SCROLL__ = false;
    });

    try {
      const params = new URLSearchParams(window.location.search);
      const pDate = params.get('date');
      if (pDate) {
        const dateEl = document.getElementById('disp-date');
        const timeEl = document.getElementById('disp-time');
        const cityEl = document.getElementById('disp-city');
        if (dateEl) dateEl.value = pDate;
        if (timeEl && params.get('time')) timeEl.value = params.get('time');
        if (cityEl && params.get('city')) cityEl.value = params.get('city');
        setTimeout(() => { form.dispatchEvent(new Event('submit')); }, 120);
      } else {
        const savedRaw = localStorage.getItem('neo_dispositor_last_input');
        if (savedRaw) {
          const saved = JSON.parse(savedRaw);
          if (saved && saved.date) {
            const dateEl = document.getElementById('disp-date');
            const timeEl = document.getElementById('disp-time');
            const cityEl = document.getElementById('disp-city');
            if (dateEl) dateEl.value = saved.date;
            if (timeEl && saved.time) timeEl.value = saved.time;
            if (cityEl && saved.city) cityEl.value = saved.city;
            const justUnlocked = sessionStorage.getItem('neo_just_unlocked') === 'dyspozytorzy';
            if (justUnlocked) {
              window.__DISP_SUPPRESS_SUBMIT_SCROLL__ = true;
            }
            setTimeout(() => {
              form.dispatchEvent(new Event('submit'));
              if (justUnlocked) {
                sessionStorage.removeItem('neo_just_unlocked');
                const scrollToUnlocked = (tries) => {
                  const target = document.getElementById('disp-unlocked-start') || document.getElementById('dispositor-report-container');
                  if (target) {
                    target.scrollIntoView({ behavior: 'auto', block: 'start' });
                  } else if (tries < 30) {
                    setTimeout(() => scrollToUnlocked(tries + 1), 60);
                  }
                };
                setTimeout(() => scrollToUnlocked(0), 60);
              }
            }, 60);
          }
        }
      }
    } catch (e) {}
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
    let rulerPlanet = null;
    if (currentChart.ascSign) {
      const ascKey = currentChart.ascSign.key;
      const rulerKey = rulers[ascKey];
      rulerPlanet = currentChart.planets.find(p => p.key === rulerKey);
      const desc = RULER_INTERPRETATIONS[rulerKey] || '';

      chartRulerHtml = `
        <div class="disp-card disp-card-gold" style="margin-bottom:1.25rem;">
          <div class="disp-badge">WŁADCA HOROSKOPU • KIEROWNIK ŻYCIA</div>
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
            <div class="disp-glyph-box" style="width:3.25rem;height:3.25rem;font-size:1.85rem;border-color:rgba(201,169,110,0.5);">${rulerPlanet.glyph}</div>
            <div>
              <h3 style="font-family:'Playfair Display',serif;font-size:1.45rem;margin:0;color:#FAF8F5;">
                ${rulerPlanet.name} <span style="font-size:0.92rem;color:#C9A96E;font-family:'JetBrains Mono',monospace;">(w znaku ${rulerPlanet.signName})</span>
              </h3>
              <p style="font-size:0.8rem;color:rgba(250,248,245,0.6);margin:0.2rem 0 0;font-family:'JetBrains Mono',monospace;">
                Ascendent w znaku ${currentChart.ascSign.name}
              </p>
            </div>
          </div>
          <p style="font-size:0.9rem;line-height:1.65;color:rgba(250,248,245,0.85);margin:0;font-style:italic;">
            „${desc}”
          </p>
        </div>
      `;
    }

    // 3. Final Dispositor / Mutual Reception
    let finalBoxHtml = '';
    if (dispData.finalDispositors.length > 0) {
      const fdKeys = dispData.finalDispositors;
      const primaryFd = currentChart.planets.find(pl => pl.key === fdKeys[0]);
      const primarySub = dispData.summaryMap[fdKeys[0]] || { directSubjects: [], indirectSubjects: [] };
      const ruledCount = primarySub.directSubjects.length + primarySub.indirectSubjects.length;
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
            ${primaryFd ? `${primaryFd.name} w znaku ${primaryFd.signName} podporządkowuje sobie ${ruledCount} instancji Twojego horoskopu i nie podlega żadnej innej planecie.` : ''} Gdy opadają argumenty innych ludzi, a kryzys zmusza Cię do wyboru bez asekuracji — to dokładnie tutaj zapada ostateczna decyzja. W integracji to źródło sprawczości; w stresie punkt ślepego uporu.
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
            Zamiast pojedynczego decydenta, Twoją psychiką zarządza duet dwóch planet, które wymieniają się uprawnieniami: żadna nie ruszy naprzód bez zgody drugiej. Na poziomie integracji daje to rzadką elastyczność w negocjacjach i umiejętność patrzenia z dwóch stron naraz. Pod presją grozi Ci wielogodzinne ważenie za i przeciw oraz odkładanie cięcia.
          </p>
        </div>
      `;
    } else if (dispData.loops.length > 0) {
      const loopNames = dispData.loops[0].map(k => {
        const p = currentChart.planets.find(pl => pl.key === k);
        return p ? `${p.name} (${p.signName})` : k;
      }).join(' → ');
      finalBoxHtml = `
        <div class="disp-card" style="margin-bottom:1.25rem;">
          <div class="disp-badge">PĘTLA PLANETARNA • RADA NADZORCZA</div>
          <p style="font-size:0.88rem;line-height:1.6;color:rgba(250,248,245,0.8);margin:0;">
            Zamknięty obieg decyzji: <strong style="color:#C9A96E;">${loopNames}</strong>. Każdy ważny impuls krąży między kilkoma kryteriami naraz — zanim powiesz „tak” w relacji lub pracy, musisz uzyskać zgodę wszystkich instancji w tej pętli. To chroni przed naiwnością, lecz w zmęczeniu wywołuje paraliż analityczny.
          </p>
        </div>
      `;
    }

    const maskVsSovereignHtml = buildMaskVsSovereignSynthesis(rulerPlanet, currentChart, dispData);

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
            ${atmakaraka.name} na ${atmakaraka.degInSign}° znaku ${atmakaraka.signName} wyznacza obszar, w którym najtrudniej odpuścić Ci potrzebę kontroli. To tutaj najmocniej reagujesz na krytykę, ponieważ tu mieści się główna lekcja zaufania do własnej drogi bez ciągłego udowadniania swojej wartości.
          </p>
        </div>
      `;
    }

    // 4b. Status Retrogradacji (Dotyczy wyłącznie Ostatecznego Dyspozytora, Wzajemnej Recepcji i Pętli)
    let retroBoxHtml = '';
    const governingKeys = new Set([
      ...(dispData.finalDispositors || []),
      ...(dispData.mutualReceptions ? dispData.mutualReceptions.flat() : []),
      ...(dispData.loops ? dispData.loops.flat() : [])
    ]);
    const governingRetroPlanets = currentChart.planets.filter(p => governingKeys.has(p.key) && p.isRetrograde);

    if (governingRetroPlanets.length > 0) {
      const retroItemsHtml = governingRetroPlanets.map(p => `
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
              WEKTOR INTROSPEKCJI DYSPOZYCJI • RETROGRADACJA (Rx)
            </div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:#FB7185;">
              ${governingRetroPlanets.length} ${governingRetroPlanets.length === 1 ? 'władca w ruchu wstecznym' : 'władców w ruchu wstecznym'}
            </span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:0.25rem;margin-bottom:0.85rem;">
            ${retroItemsHtml}
          </div>
          <p style="font-size:0.88rem;line-height:1.65;color:rgba(250,248,245,0.8);margin:0;">
            Główna instancja decyzyjna Twojego horoskopu (${governingRetroPlanets.map(p => p.name).join(', ')}) cofa się po niebie jak ktoś, kto przed wyjściem z domu jeszcze raz ogląda pokój w lustrze. Twoja siła życiowa nie ulega tłumowi ani chwilowym modom na ulicy. Każda decyzja dojrzewa w ciszy za zamkniętymi okiennicami, zanim w ogóle nabierze kształtu przed światem.
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
              <strong style="color:${isSelected ? '#C9A96E' : '#FAF8F5'};">${p.name}</strong>${(governingKeys.has(p.key) && p.isRetrograde) ? ' <span class="disp-rx-tag" title="Władca w retrogradacji (ruch wsteczny)">Rx</span>' : ''}
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
              return `<li style="margin-bottom:0.35rem;"><span style="color:${details.rulerColor};font-weight:bold;">${s.name}</span> <span style="font-size:0.75rem;color:rgba(250,248,245,0.7);">${pls}</span></li>`;
            }).join('')
          : '<li>Brak znaków bezpośrednich w wybranym systemie</li>';

        const indirectList = details.indirectSigns.length > 0
          ? details.indirectSigns.map(s => {
              const pls = s.planetsHere.length > 0 
                ? `— goszczą tu: ${s.planetsHere.map(p => `<strong style="color:#FAF8F5;">${p.name} ${p.glyph}</strong>`).join(', ')}`
                : '— puste pole';
              return `<li style="margin-bottom:0.35rem;"><span style="color:#FAF8F5;font-style:italic;">${s.name}</span> <span style="font-size:0.75rem;color:rgba(250,248,245,0.7);">${pls}</span></li>`;
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
            ${maskVsSovereignHtml}
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

        <!-- Paywalled Spersonalizowany Raport Władcy (29 PLN) Container -->
        <div id="dispositor-report-container"></div>

        <!-- CTA Konsultacji -->
        <div class="disp-card" style="margin-top:2rem;background:linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(13,13,18,0.9) 100%);border-color:rgba(201,169,110,0.4);text-align:center;padding:2.75rem 1.75rem;">
          <div class="disp-badge" style="background:rgba(201,169,110,0.2);">PRYWATNA KONSULTACJA • ANALIZA KOSMOGRAMU</div>
          <h3 style="font-family:'Playfair Display',serif;font-size:1.6rem;color:#FAF8F5;margin:0.5rem 0 1rem;">
            Chcesz zrozumieć, dlaczego wciąż sabotujesz własne decyzje?
          </h3>
          <p style="font-size:0.92rem;line-height:1.75;color:rgba(250,248,245,0.85);max-width:620px;margin:0 auto 1.5rem;">
            Drzewo dyspozytorów obnaża to, czego nie widać za dnia: podskórne sojusze planet, ukryte uwikłania i miejsca, w których Twoja wola cicho oddaje ster. Umów się na intymną analizę swojego kosmogramu z autorem Neoromantyzmu.
          </p>
          <a href="mailto:kontakt@neoromantyczny.pl?subject=Konsultacja%20-%20Analiza%20Drzewa%20Dyspozytorow" class="disp-btn disp-btn-consultation" style="text-decoration:none;display:inline-block;padding:0.95rem 1.5rem;color:#0D0D12;max-width:100%;box-sizing:border-box;word-break:break-word;">
            Zarezerwuj konsultację: kontakt@neoromantyczny.pl
          </a>
        </div>
      </div>
    `;

    // Render Paywalled Custom Dispositor Report (29 PLN)
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
