/**
 * NEOROMANTYCZNY — SATURN RETURN UI CONTROLLER (PLACIDUS & NATAL/TRANSIT WHEEL)
 */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('disp-form');
  const resultsContainer = document.getElementById('disp-results');

  // Autocomplete Miast
  function setupCityAutocomplete() {
    const inputEl = document.getElementById('disp-city');
    const dropdownEl = document.getElementById('dispCityDropdown');
    if (!inputEl || !dropdownEl) return;

    let currentMatches = [];
    function norm(s) {
      return String(s || '').toLowerCase().trim()
        .replace(/ł/g, 'l').replace(/ą/g, 'a').replace(/ę/g, 'e')
        .replace(/ś/g, 's').replace(/ć/g, 'c').replace(/ń/g, 'n')
        .replace(/ó/g, 'o').replace(/ź/g, 'z').replace(/ż/g, 'z')
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    function renderList(query) {
      const q = norm(query);
      const allCities = (window.ACG_CITIES_DB && Array.isArray(window.ACG_CITIES_DB.allCities))
        ? window.ACG_CITIES_DB.allCities
        : (window.__DISPOSITOR_ENGINE__ && window.__DISPOSITOR_ENGINE__.CITIES) || [];

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
        currentMatches = starts.concat(contains).slice(0, 15);
      }

      if (!currentMatches.length) {
        dropdownEl.innerHTML = `<div class="disp-autocomplete-empty">Wpisz miasto ręcznie</div>`;
        dropdownEl.classList.add('is-open');
        return;
      }

      dropdownEl.innerHTML = currentMatches.map((c, idx) => `
        <div class="disp-autocomplete-item ${idx === 0 ? 'is-active' : ''}" data-idx="${idx}">
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
          if (chosen) {
            inputEl.value = `${chosen.name} (${chosen.shortCountry || chosen.country || 'Polska'})`;
            dropdownEl.classList.remove('is-open');
          }
        });
      });
    }

    inputEl.addEventListener('focus', () => renderList(inputEl.value));
    inputEl.addEventListener('input', () => renderList(inputEl.value));
    document.addEventListener('mousedown', (e) => {
      if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
        dropdownEl.classList.remove('is-open');
      }
    });
  }

  setupCityAutocomplete();
  if (!form) return;

  let lastCalculatedData = null;

  function isSaturnUnlocked() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset') === '1' || params.get('lock') === '1') {
        localStorage.removeItem('neo_saturn_unlocked');
        try { window.history.replaceState({}, '', window.location.pathname); } catch (e) {}
        return false;
      }
      if (params.get('unlocked') === 'true' || params.get('paid') === 'true') {
        try { localStorage.setItem('neo_saturn_unlocked', 'true'); } catch (e) {}
        return true;
      }
      return localStorage.getItem('neo_saturn_unlocked') === 'true';
    } catch (e) {
      return false;
    }
  }

  function bindProtocolEvents() {
    const unlockBtn = document.getElementById('sat-unlock-btn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (typeof window.openLuxeCheckout === 'function') {
          window.openLuxeCheckout('saturn', function () {
            try { localStorage.setItem('neo_saturn_unlocked', 'true'); } catch (err) {}
            reRenderSaturnReport();
          });
        } else {
          window.location.href = 'https://buy.stripe.com/bJecMY8iRe2jdgy9uGcwg03';
        }
      });
    }

    const quickUnlockBtn = document.getElementById('sat-quick-unlock-btn');
    if (quickUnlockBtn) {
      quickUnlockBtn.addEventListener('click', function (e) {
        e.preventDefault();
        try { localStorage.setItem('neo_saturn_unlocked', 'true'); } catch (err) {}
        reRenderSaturnReport();
      });
    }

    const resetBtn = document.getElementById('sat-lock-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function (e) {
        e.preventDefault();
        try { localStorage.removeItem('neo_saturn_unlocked'); } catch (err) {}
        reRenderSaturnReport();
      });
    }
  }

  function reRenderSaturnReport() {
    if (!lastCalculatedData) return;
    const container = document.getElementById('chronos-protocol-report');
    if (!container) return;
    const unlocked = isSaturnUnlocked();
    const newHtml = window.SaturnRenderProtocol.renderChronosProtocol(
      lastCalculatedData.satPlanet,
      lastCalculatedData.signData,
      lastCalculatedData.houseData,
      lastCalculatedData.dignityData,
      lastCalculatedData.dispInfo,
      lastCalculatedData.passes,
      unlocked
    );
    container.outerHTML = newHtml;
    bindProtocolEvents();
  }
  window.reRenderSaturnReport = reRenderSaturnReport;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const dateStr = document.getElementById('disp-date').value;
    const timeStr = document.getElementById('disp-time').value || '12:00';
    const cityStr = document.getElementById('disp-city').value || '';
    if (!dateStr) return;

    // 1. Obliczenia planetarne
    const currentChart = window.__DISPOSITOR_ENGINE__.calcAllPlanets(dateStr, timeStr, cityStr);
    const satPlanet = currentChart.planets.find(p => p.key === 'saturn');
    if (!satPlanet) return;

    // 2. OBLICZENIA W SYSTEMIE PLACIDUSA (Precyzja matematyczna NASA / Swiss Ephemeris)
    const jd = currentChart.jd;
    const cityObj = currentChart.city || { lat: 52.23, lon: 21.01 };
    const placidusCusps = window.SaturnPlacidus.calcPlacidusCusps(jd, cityObj.lat, cityObj.lon);

    // Dom Saturna w Placidusie
    const satHouse = currentChart.hasTime 
      ? window.SaturnPlacidus.getPlanetHousePlacidus(satPlanet.longitude, placidusCusps, cityObj.lat, placidusCusps.armc, placidusCusps.eps)
      : 1;
    satPlanet.house = satHouse;

    currentChart.houses = { cusps: placidusCusps, system: 'Placidus' };
    if (currentChart.ascendant) {
      currentChart.ascendant.longitude = placidusCusps[1];
    }

    // 3. Pozycja Tranzytowego Saturna
    const now = new Date();
    const curJd = window.SaturnMath.getJdFromDate(now);
    const currentTransitSatLon = window.SaturnMath.calcSaturnGeocentricLon(curJd);

    // 4. Dane merytoryczne
    const signData = window.SATURN_SIGNS_DATA[satPlanet.signKey] || {};
    const houseData = window.SATURN_HOUSES_DATA[satHouse] || {};
    const dignityKey = window.SaturnEngine.getDignityKey(satPlanet.signKey);
    const dignityData = window.SATURN_DIGNITY_DATA[dignityKey] || {};

    // 4b. Dyspozytor Saturna (Władca Znaku Saturna w Placidusie)
    const dispInfo = window.SaturnDispositor
      ? window.SaturnDispositor.getSaturnDispositorInfo(satPlanet, currentChart.planets, placidusCusps, cityObj.lat)
      : null;

    const planetsMap = {};
    currentChart.planets.forEach(p => { planetsMap[p.key] = p.longitude; });
    const aspects = window.SaturnEngine.findAspects(satPlanet.longitude, planetsMap);

    const utcDate = new Date((jd - 2440587.5) * 86400000);
    const userAge = (now.getTime() - utcDate.getTime()) / (365.25 * 86400000);
    const cycleNum = userAge > 42 ? 2 : 1;
    const passes = window.SaturnEngine.findSaturnReturns(utcDate, satPlanet.longitude, cycleNum);

    // 5. Render Koła Zodiakalnego (Czysty Natal / Tranzyt bez śladów po dyspozytorach)
    const svgWheelHtml = window.SaturnWheel.renderSaturnReturnWheel(currentChart, currentTransitSatLon);

    // 6. Składanie Raportu: Raport ZACZYNA SIĘ OD ZNAKU I DOMU
    const diagnosisHtml = window.SaturnRender.renderMainDiagnosisCard(satPlanet, signData, houseData, dignityData, satPlanet.isRetrograde);
    const passesHtml = window.SaturnRenderDetails.renderPassesHtml(passes);
    const aspectsHtml = window.SaturnRenderDetails.renderAspectsList(aspects);

    resultsContainer.innerHTML = `
      <!-- 1. GŁÓWNA DIAGNOZA: SATURN W ZNAKU I DOMU (PLACIDUS) -->
      ${diagnosisHtml}

      <!-- 2. KOŁO ZODIAKALNE NATAL / TRANZYT + CHRONOS LAB -->
      <div class="disp-lab-grid" style="margin-bottom:1.75rem;">
        <div class="disp-lab-visual">
          <div class="disp-card disp-wheel-card" style="padding:1.25rem 1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <div class="disp-badge" style="margin:0;">KOŁO ZODIAKALNE • ASTRA ENGINE</div>
              <span style="font-size:0.75rem; font-family:'JetBrains Mono', monospace; color:#C9A96E;">
                System Domów: Placidus
              </span>
            </div>
            <div id="disp-wheel-container">
              ${svgWheelHtml}
            </div>
            <div style="margin-top:0.85rem; padding:0.75rem; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; font-size:0.78rem; line-height:1.55; color:rgba(250,248,245,0.7);">
              <strong style="color:#C9A96E;">Nawigacja po kole:</strong> Złota tarcza wewnątrz = Twój Natalny Saturn. Błękitny znacznik na zewnątrz = Aktualny Tranzyt. Złota świetlista linia wyznacza dystans zodiakalny, jaki tranzyt musi przebyć do dopełnienia Powrotu.
            </div>
          </div>
        </div>

        <div class="disp-lab-analysis">
          <!-- Licznik Czasu Rzeczywistego -->
          <div class="disp-card" style="margin-bottom:1.25rem; border-color:rgba(201,169,110,0.35);">
            <div class="disp-badge" style="background:rgba(201,169,110,0.18);">CHRONOMETR TRANZYTU (0°00')</div>
            <div id="chronoSlot" class="chrono-container" style="margin:1rem 0;"></div>
            <p style="font-size:0.8rem; color:rgba(250,248,245,0.6); margin:0; text-align:center;">
              Czas do najbliższego uderzenia fali Powrotu Saturna
            </p>
          </div>

          <!-- Harmonogram 3 Fal -->
          <div class="disp-card" style="margin-bottom:1.25rem;">
            <h4 style="font-family:'Playfair Display', serif; font-size:1.2rem; color:#FAF8F5; margin:0 0 0.4rem;">
              Harmonogram 3 Fal Tranzytu
            </h4>
            <p style="font-size:0.8rem; color:rgba(250,248,245,0.6); margin:0 0 0.85rem;">
              Ścisłe koniunkcje kątowe 0°00' (Pętla Retrogradacyjna):
            </p>
            ${passesHtml}
          </div>

          <!-- Kondycja Godnościowa & Dyspozytor Saturna -->
          <div class="disp-card">
            <h4 style="font-family:'Playfair Display', serif; font-size:1.15rem; color:#FAF8F5; margin:0 0 0.4rem;">
              Kondycja Godnościowa (Ibn Ezra)
            </h4>
            <p style="font-size:0.86rem; line-height:1.6; color:rgba(250,248,245,0.85); margin:0 0 0.6rem;">
              ${dignityData.meaning || ''}
            </p>
            <p style="font-size:0.82rem; color:#FB7185; margin:0 0 0.85rem;">
              <strong>Ryzyko cienia:</strong> ${dignityData.risk || ''}
            </p>
            ${dispInfo ? `
              <div style="margin-top:0.85rem; padding:0.85rem; background:rgba(201,169,110,0.06); border:1px solid rgba(201,169,110,0.22); border-radius:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem; flex-wrap:wrap; gap:0.3rem;">
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#C9A96E; font-weight:700; text-transform:uppercase;">
                    Dyspozytor Saturna • ${dispInfo.isSelfRuled ? 'Władca Ostateczny' : 'Planeta Zarządzająca'}
                  </span>
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#60A5FA; font-weight:700;">
                    ${dispInfo.glyph} ${dispInfo.name} w ${dispInfo.signLocative || dispInfo.signName} (${dispInfo.degreeInSign}) • ${dispInfo.house}. Dom (Placidus)
                  </span>
                </div>
                <p style="font-size:0.84rem; line-height:1.55; color:rgba(250,248,245,0.9); margin:0 0 0.45rem;">
                  <strong style="color:#FAF8F5;">Rola w tranzycie:</strong> ${dispInfo.lesson}
                </p>
                <p style="font-size:0.8rem; line-height:1.5; color:#C9A96E; margin:0 0 0.75rem;">
                  <strong>Dźwignia wyjścia:</strong> ${dispInfo.actionTip}
                </p>
                <div style="margin-top:0.75rem; padding-top:0.65rem; border-top:1px dashed rgba(201,169,110,0.22); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                  <span style="font-size:0.78rem; color:rgba(250,248,245,0.7);">
                    Hierarchia władzy psychiki:
                  </span>
                  <a href="/kalkulator-dyspozytorow/?date=${encodeURIComponent(dateStr)}&time=${encodeURIComponent(timeStr)}&city=${encodeURIComponent(cityStr)}" class="sat-disp-cta" style="display:inline-flex; align-items:center; gap:0.4rem; color:#C9A96E; font-size:0.78rem; font-weight:700; text-decoration:none; padding:0.35rem 0.75rem; background:rgba(201,169,110,0.1); border:1px solid rgba(201,169,110,0.3); border-radius:9999px; transition:all 0.2s ease;">
                    <span>Zbadaj Drzewo Dyspozytorów</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- 3. MATRYCA ASPEKTÓW -->
      ${aspectsHtml}

      <!-- 4. PROTOKÓŁ PRZETRWANIA POWROTU SATURNA (CURIOSITY GAP & DIRECT CHECKOUT 47 PLN) -->
      ${window.SaturnRenderProtocol ? window.SaturnRenderProtocol.renderChronosProtocol(satPlanet, signData, houseData, dignityData, dispInfo, passes, isSaturnUnlocked()) : ''}

      <!-- Konsultacja VIP High-Ticket -->
      <div style="margin-top:1.5rem; text-align:center;">
        <a href="mailto:kontakt@neoromantyczny.pl?subject=Indywidualna%20Analiza%20Powrotu%20Saturna" style="color:#C9A96E; font-size:0.82rem; text-decoration:underline;">
          Potrzebujesz indywidualnego prowadzenia przez tranzyt? Zamów prywatną konsultację analizy kosmogramu &rarr;
        </a>
      </div>
    `;

    lastCalculatedData = { satPlanet, signData, houseData, dignityData, dispInfo, passes };
    resultsContainer.style.display = 'block';
    bindProtocolEvents();

    // Start odliczania czasu rzeczywistego
    let targetDate = passes.length > 0 ? passes[0].date : new Date(now.getTime() + 86400000 * 30);
    const futurePass = passes.find(p => p.date.getTime() > now.getTime());
    if (futurePass) targetDate = futurePass.date;

    const chronoSlot = document.getElementById('chronoSlot');
    if (chronoSlot) window.SaturnClock.startCountdown(targetDate, chronoSlot);

    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
