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

  const IS_LOCAL = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  let localTestBypass = false;
  let lastCalculatedData = null;
  let currentSatHash = '';

  function isSaturnUnlocked() {
    if (localTestBypass) return true;
    return Boolean(window.NeoChartLock && window.NeoChartLock.isUnlocked('saturn', currentSatHash));
  }

  function ensureLocalTestBar() {
    if (!IS_LOCAL || !document.body) return;
    let bar = document.getElementById('sat-local-test-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'sat-local-test-bar';
      bar.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:9998;display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:999px;background:rgba(14,12,18,0.94);border:1px solid rgba(212,175,55,0.45);box-shadow:0 10px 28px rgba(0,0,0,0.45);font-family:Inter,system-ui,sans-serif;font-size:12px;color:#f4efe6;backdrop-filter:blur(10px);';
      bar.innerHTML = '<span id="sat-test-status" style="color:#d4af37;font-weight:600;letter-spacing:0.03em;"></span><button type="button" id="sat-test-toggle" style="cursor:pointer;border:1px solid rgba(212,175,55,0.55);background:rgba(212,175,55,0.14);color:#f7e7b4;padding:5px 11px;border-radius:999px;font-size:11px;font-weight:600;"></button>';
      document.body.appendChild(bar);
      const toggleBtn = document.getElementById('sat-test-toggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          localTestBypass = !localTestBypass;
          ensureLocalTestBar();
          reRenderSaturnReport();
        });
      }
    }
    const statusEl = document.getElementById('sat-test-status');
    const toggleBtn = document.getElementById('sat-test-toggle');
    if (statusEl) {
      statusEl.textContent = localTestBypass ? 'LOCALHOST · ODBLOKOWANY' : 'LOCALHOST · PAYWALL';
    }
    if (toggleBtn) {
      toggleBtn.textContent = localTestBypass ? 'Symuluj Paywall (47 PLN)' : 'Odblokuj testowo';
    }
  }

  if (IS_LOCAL) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', ensureLocalTestBar);
    } else {
      ensureLocalTestBar();
    }
  }

  function bindProtocolEvents() {
    const unlockBtn = document.getElementById('sat-unlock-btn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const opts = { chartHash: currentSatHash };
        if (typeof window.openLuxeCheckout === 'function') {
          window.openLuxeCheckout('saturn', function () {
            reRenderSaturnReport();
          }, opts);
        } else {
          setTimeout(function () {
            if (typeof window.openLuxeCheckout === 'function') {
              window.openLuxeCheckout('saturn', function () {
                reRenderSaturnReport();
              }, opts);
            }
          }, 300);
        }
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
      unlocked,
      lastCalculatedData.satCtx
    );
    container.outerHTML = newHtml;
    bindProtocolEvents();
  }
  window.reRenderSaturnReport = reRenderSaturnReport;

  // Opcjonalne zaczytanie parametrów z URL (np. przy przejściu z innego kalkulatora)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const hadPii = Boolean(urlParams.get('date') || urlParams.get('time') || urlParams.get('city'));
    if (urlParams.get('date')) document.getElementById('disp-date').value = urlParams.get('date');
    if (urlParams.get('time')) document.getElementById('disp-time').value = urlParams.get('time');
    if (urlParams.get('city')) document.getElementById('disp-city').value = urlParams.get('city');
    if (hadPii) {
      ['date', 'time', 'city'].forEach((k) => urlParams.delete(k));
      const cleanQs = urlParams.toString();
      window.history.replaceState({}, '', window.location.pathname + (cleanQs ? '?' + cleanQs : '') + window.location.hash);
    }
  } catch (e) {}

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const dateStr = document.getElementById('disp-date').value;
    const rawTimeStr = document.getElementById('disp-time').value || '';
    const timeStr = rawTimeStr || '12:00';
    const cityStr = document.getElementById('disp-city').value || '';
    if (!dateStr) return;

    try {
      localStorage.setItem('neo_saturn_last_input', JSON.stringify({ date: dateStr, time: rawTimeStr, city: cityStr }));
    } catch (err) {}

    // 1. Obliczenia planetarne
    const currentChart = window.__DISPOSITOR_ENGINE__.calcAllPlanets(dateStr, rawTimeStr, cityStr);
    const satPlanet = currentChart.planets.find(p => p.key === 'saturn');
    if (!satPlanet) return;

    // 2. OBLICZENIA W SYSTEMIE PLACIDUSA (z fallbackiem Whole Sign ≥66°33′)
    const jd = currentChart.jd;
    const cityObj = currentChart.city || { lat: 52.23, lon: 21.01 };
    currentSatHash = window.NeoChartLock
      ? window.NeoChartLock.buildHash('saturn', { date: dateStr, time: timeStr, city: cityStr, lat: cityObj.lat, lon: cityObj.lon })
      : '';
    const placidusCusps = window.SaturnPlacidus.calcPlacidusCusps(jd, cityObj.lat, cityObj.lon);

    const isPolar = Math.abs(Number(cityObj.lat) || 0) >= 66.55;
    const satHouse = !currentChart.hasTime
      ? 1
      : (isPolar
          ? (((Math.floor(satPlanet.longitude / 30) - Math.floor(placidusCusps[1] / 30) + 12) % 12) + 1)
          : window.SaturnPlacidus.getPlanetHousePlacidus(satPlanet.longitude, placidusCusps, cityObj.lat, placidusCusps.armc, placidusCusps.eps));
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
    const cycleNum = userAge > 72 ? 3 : (userAge > 42 ? 2 : 1);
    const passes = window.SaturnEngine.findSaturnReturns(utcDate, satPlanet.longitude, cycleNum);
    const satCtx = window.SaturnContext
      ? window.SaturnContext.buildContext({
          chart: currentChart, satPlanet, dispInfo, aspects, passes,
          transitLon: currentTransitSatLon, userAge, cycleNum, dateStr
        })
      : null;

    // 5. Render Koła Zodiakalnego (Czysty Natal / Tranzyt bez śladów po dyspozytorach)
    const svgWheelHtml = window.SaturnWheel.renderSaturnReturnWheel(currentChart, currentTransitSatLon);

    // 6. Składanie Raportu: Raport ZACZYNA SIĘ OD ZNAKU I DOMU
    const diagnosisHtml = window.SaturnRender.renderMainDiagnosisCard(satPlanet, signData, houseData, dignityData, satPlanet.isRetrograde, dispInfo, satCtx);
    const passesHtml = window.SaturnRenderDetails.renderPassesHtml(passes, satCtx);
    const aspectsHtml = window.SaturnRenderDetails.renderAspectsList(aspects, satCtx);

    const hasTime = satCtx ? satCtx.facts.hasTime : currentChart.hasTime;
    const wheelSysLabel = !hasTime ? 'Brak (Tryb Bez Godziny)' : (satCtx ? satCtx.facts.houseSystemLabel : 'Placidus');
    const passesHeading = passes.length <= 1 ? 'Harmonogram Przejścia Tranzytu' : 'Harmonogram 3 Fal Tranzytu';
    const passesSub = passes.length <= 1 ? 'Pojedyncza koniunkcja ścisła 0°00′ (ruch prosty):' : 'Ścisłe koniunkcje kątowe 0°00′ (Pętla Retrogradacyjna):';
    const digRoot = window.SATURN_DIGNITY_DATA || {};
    const retroObj = digRoot.retrograde ? (satPlanet.isRetrograde ? digRoot.retrograde.natalRx : digRoot.retrograde.direct) : null;
    const sectObj = (hasTime && satCtx && satCtx.facts.sect && digRoot.sect) ? digRoot.sect[satCtx.facts.sect] : null;
    const T = window.SaturnTooltips;
    const tip = (lbl, key, extraCls, pillTxt) => {
      if (!T || !T.GLOSSARY) return lbl;
      let o = T.GLOSSARY[key];
      if (!o && key && key.startsWith('dignity_') && T.GLOSSARY.dignity) o = T.GLOSSARY.dignity[key.slice(8)];
      return o ? T.renderTipBadge(lbl, o.title, o.def, o.basis || '', extraCls || 'sat-tip-clean', pillTxt) : lbl;
    };
    const wheelSysBadge = tip(`System Domów: ${wheelSysLabel} `, 'houseSystem', 'sat-tip-clean');
    const condInfoPill = tip('', 'dignity_' + (satCtx ? satCtx.facts.dignityKey : dignityKey), 'sat-tip-clean', 'ⓘ ZNACZENIE');
    const sectInfoPill = sectObj ? tip('', 'sect_' + satCtx.facts.sect, 'sat-tip-clean', 'ⓘ ZNACZENIE') : '';
    const retroInfoPill = retroObj ? tip('', satPlanet.isRetrograde ? 'natal_rx' : 'natal_direct', 'sat-tip-clean', 'ⓘ ZNACZENIE') : '';
    const dispInfoPill = tip('', 'dispositor', 'sat-tip-clean', 'ⓘ ZNACZENIE');

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
                ${wheelSysBadge}
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

          <!-- Harmonogram Przejść -->
          <div class="disp-card" style="margin-bottom:1.25rem;">
            <h4 style="font-family:'Playfair Display', serif; font-size:1.2rem; color:#FAF8F5; margin:0 0 0.4rem;">
              ${passesHeading}
            </h4>
            <p style="font-size:0.8rem; color:rgba(250,248,245,0.6); margin:0 0 0.85rem;">
              ${passesSub}
            </p>
            ${passesHtml}
          </div>

          <!-- Kondycja Godnościowa, Sekta, Retrogradacja & Dyspozytor Saturna -->
          <div class="disp-card">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.55rem; flex-wrap:wrap;">
              <h4 style="font-family:'Playfair Display', serif; font-size:1.2rem; color:#FAF8F5; margin:0;">
                Kondycja: ${dignityData.type || 'Zodiakalna'}
              </h4>
              ${condInfoPill}
            </div>
            <p style="font-size:0.86rem; line-height:1.62; color:rgba(250,248,245,0.85); margin:0 0 0.75rem;">
              ${dignityData.meaning || ''}
            </p>
            <div style="padding:0.72rem 0.9rem; background:rgba(251,113,133,0.06); border:1px solid rgba(251,113,133,0.22); border-radius:8px; font-size:0.82rem; line-height:1.55; color:#FECDD3; margin-bottom:0.8rem;">
              <strong style="color:#FB7185;">Ryzyko:</strong> ${dignityData.risk || ''}
            </div>
            ${sectObj ? `
              <div style="padding:0.8rem 0.9rem; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:8px; margin-bottom:0.75rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.4rem; margin-bottom:0.35rem; flex-wrap:wrap;">
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#C9A96E; font-weight:700; text-transform:uppercase;">${sectObj.label}</span>
                  ${sectInfoPill}
                </div>
                <p style="font-size:0.83rem; line-height:1.58; color:rgba(250,248,245,0.86); margin:0;">${sectObj.text}</p>
              </div>
            ` : ''}
            ${retroObj ? `
              <div style="padding:0.8rem 0.9rem; background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07); border-radius:8px; margin-bottom:0.75rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:0.4rem; margin-bottom:0.35rem; flex-wrap:wrap;">
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#E5CC7C; font-weight:700; text-transform:uppercase;">${retroObj.title} • ${retroObj.status}</span>
                  ${retroInfoPill}
                </div>
                <p style="font-size:0.83rem; line-height:1.58; color:rgba(250,248,245,0.86); margin:0;">${retroObj.explanation}</p>
              </div>
            ` : ''}
            ${dispInfo ? `
              <div style="padding:0.85rem 0.9rem; background:rgba(201,169,110,0.06); border:1px solid rgba(201,169,110,0.22); border-radius:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.45rem; flex-wrap:wrap; gap:0.35rem;">
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.72rem; color:#C9A96E; font-weight:700; text-transform:uppercase; display:inline-flex; align-items:center; gap:0.4rem;">
                    <span>Dyspozytor Saturna • ${dispInfo.isSelfRuled ? 'Władca Ostateczny' : 'Planeta Zarządzająca'}</span>
                    ${dispInfoPill}
                  </span>
                  <span style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#60A5FA; font-weight:700;">
                    ${dispInfo.glyph} ${dispInfo.name} w ${dispInfo.signLocative || dispInfo.signName} (${dispInfo.degreeInSign})${hasTime ? ` • ${dispInfo.house}. Dom` : ''}
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
                  <a href="/kalkulator-dyspozytorow/" class="sat-disp-cta" data-handoff-dispositor="1" style="display:inline-flex; align-items:center; gap:0.4rem; color:#C9A96E; font-size:0.78rem; font-weight:700; text-decoration:none; padding:0.35rem 0.75rem; background:rgba(201,169,110,0.1); border:1px solid rgba(201,169,110,0.3); border-radius:9999px; transition:all 0.2s ease;">
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
      ${window.SaturnRenderProtocol ? window.SaturnRenderProtocol.renderChronosProtocol(satPlanet, signData, houseData, dignityData, dispInfo, passes, isSaturnUnlocked(), satCtx) : ''}

      <!-- Konsultacja VIP High-Ticket -->
      <div style="margin-top:1.5rem; text-align:center;">
        <a href="mailto:kontakt@neoromantyczny.pl?subject=Indywidualna%20Analiza%20Powrotu%20Saturna" style="color:#C9A96E; font-size:0.82rem; text-decoration:underline;">
          Potrzebujesz indywidualnego prowadzenia przez tranzyt? Zamów prywatną konsultację analizy kosmogramu &rarr;
        </a>
      </div>
    `;

    lastCalculatedData = { satPlanet, signData, houseData, dignityData, dispInfo, passes, satCtx };
    resultsContainer.style.display = 'block';
    bindProtocolEvents();
    resultsContainer.querySelectorAll('[data-handoff-dispositor]').forEach(link => {
      link.addEventListener('click', () => {
        try {
          localStorage.setItem('neo_dispositor_last_input', JSON.stringify({ date: dateStr, time: rawTimeStr, city: cityStr }));
        } catch (err) {}
      });
    });

    // Start odliczania czasu rzeczywistego
    let targetDate = passes.length > 0 ? passes[0].date : new Date(now.getTime() + 86400000 * 30);
    const futurePass = passes.find(p => p.date.getTime() > now.getTime());
    if (futurePass) targetDate = futurePass.date;

    const chronoSlot = document.getElementById('chronoSlot');
    if (chronoSlot) window.SaturnClock.startCountdown(targetDate, chronoSlot);

    if (!window.__SATURN_SUPPRESS_SUBMIT_SCROLL__) {
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.__SATURN_SUPPRESS_SUBMIT_SCROLL__ = false;
  });

  try {
    const savedSat = localStorage.getItem('neo_saturn_last_input');
    if (savedSat) {
      const parsed = JSON.parse(savedSat);
      if (parsed && parsed.date) {
        const dateEl = document.getElementById('disp-date');
        const timeEl = document.getElementById('disp-time');
        const cityEl = document.getElementById('disp-city');
        if (dateEl) dateEl.value = parsed.date;
        if (timeEl && parsed.time) timeEl.value = parsed.time;
        if (cityEl && parsed.city) cityEl.value = parsed.city;
        const justUnlocked = sessionStorage.getItem('neo_just_unlocked') === 'saturn';
        if (justUnlocked) {
          window.__SATURN_SUPPRESS_SUBMIT_SCROLL__ = true;
        }
        setTimeout(() => {
          form.dispatchEvent(new Event('submit'));
          if (justUnlocked) {
            sessionStorage.removeItem('neo_just_unlocked');
            setTimeout(() => {
              const proto = document.getElementById('chronos-protocol-report') || resultsContainer;
              if (proto) proto.scrollIntoView({ behavior: 'auto', block: 'start' });
            }, 80);
          }
        }, 60);
      }
    }
  } catch (err) {}
});
