/**
 * NEOROMANTYCZNY — SOLAR RETURN UI CONTROLLER & NEO CHART LOCK 1:1
 */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('solar-form');
  const resultsEl = document.getElementById('solar-results');
  const yearEl = document.getElementById('solar-year');
  if (yearEl && !yearEl.value) yearEl.value = String(new Date().getFullYear());

  function norm(s) {
    return String(s || '').toLowerCase().trim()
      .replace(/ł/g, 'l').replace(/ą/g, 'a').replace(/ę/g, 'e')
      .replace(/ś/g, 's').replace(/ć/g, 'c').replace(/ń/g, 'n')
      .replace(/ó/g, 'o').replace(/ź/g, 'z').replace(/ż/g, 'z')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function bindCityAutocomplete(inputId, dropdownId) {
    const inputEl = document.getElementById(inputId);
    const dropdownEl = document.getElementById(dropdownId);
    if (!inputEl || !dropdownEl) return;

    function renderList(query) {
      const q = norm(query);
      const allCities = (window.ACG_CITIES_DB && Array.isArray(window.ACG_CITIES_DB.allCities))
        ? window.ACG_CITIES_DB.allCities
        : (window.__DISPOSITOR_ENGINE__ && window.__DISPOSITOR_ENGINE__.CITIES) || [];
      const matches = !q ? allCities.slice(0, 12) : allCities.filter(c =>
        norm(c.name).includes(q) || norm(c.country || 'Polska').includes(q)
      ).slice(0, 12);

      if (!matches.length) {
        dropdownEl.innerHTML = '<div class="disp-autocomplete-empty">Wpisz miasto ręcznie</div>';
      } else {
        dropdownEl.innerHTML = matches.map((c, idx) => `
          <div class="disp-autocomplete-item" data-idx="${idx}">
            <div><span class="disp-autocomplete-name">${c.name}</span> <span class="disp-autocomplete-country">(${c.country || 'Polska'})</span></div>
            <span class="disp-autocomplete-coords">${Math.abs(c.lat).toFixed(1)}°, ${Math.abs(c.lon).toFixed(1)}°</span>
          </div>`).join('');
        dropdownEl.querySelectorAll('.disp-autocomplete-item').forEach(item => {
          item.addEventListener('mousedown', e => {
            e.preventDefault();
            const c = matches[Number(item.getAttribute('data-idx'))];
            if (c) {
              inputEl.value = `${c.name} (${c.country || 'Polska'})`;
              dropdownEl.classList.remove('is-open');
            }
          });
        });
      }
      dropdownEl.classList.add('is-open');
    }

    inputEl.addEventListener('focus', () => renderList(inputEl.value));
    inputEl.addEventListener('input', () => renderList(inputEl.value));
    document.addEventListener('mousedown', e => {
      if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
        dropdownEl.classList.remove('is-open');
      }
    });
  }

  bindCityAutocomplete('solar-birth-city', 'solarBirthDropdown');
  bindCityAutocomplete('solar-reloc-city', 'solarRelocDropdown');
  if (!form || !resultsEl) return;

  let lastResult = null;
  let currentSolarHash = '';

  function isUnlocked() {
    return Boolean(window.NeoChartLock && window.NeoChartLock.isUnlocked('solariusz', currentSolarHash));
  }
  function renderReportBlock() {
    if (!lastResult) return;
    const html = window.SolarRender.renderFreeLayer(lastResult)
      + window.SolarRender.renderPaywallOrReport(lastResult, isUnlocked());
    resultsEl.innerHTML = html;
    resultsEl.style.display = 'block';
    bindDynamicEvents();
  }

  function bindDynamicEvents() {
    resultsEl.querySelectorAll('[data-solar-year]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (yearEl) yearEl.value = btn.getAttribute('data-solar-year');
        runCalculation(false);
      });
    });

    resultsEl.querySelectorAll('[data-reloc-city]').forEach(btn => {
      btn.addEventListener('click', () => {
        const relEl = document.getElementById('solar-reloc-city');
        if (relEl) relEl.value = btn.getAttribute('data-reloc-city');
        runCalculation(false);
      });
    });

    const unlockBtn = document.getElementById('solar-unlock-btn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', e => {
        e.preventDefault();
        if (typeof window.openLuxeCheckout === 'function') {
          window.openLuxeCheckout('solariusz', renderReportBlock, { chartHash: currentSolarHash });
        }
      });
    }

    const printBtn = document.getElementById('solar-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }
  }

  function runCalculation(shouldScroll) {
    const birthDate = (document.getElementById('solar-date') || {}).value;
    const birthTime = (document.getElementById('solar-time') || {}).value || '12:00';
    const birthCity = (document.getElementById('solar-birth-city') || {}).value || 'Warszawa';
    const targetYear = (yearEl && yearEl.value) ? Number(yearEl.value) : new Date().getFullYear();
    const relocCity = (document.getElementById('solar-reloc-city') || {}).value || '';
    if (!birthDate) return;

    try {
      localStorage.setItem('neo_solar_last_input', JSON.stringify({
        birthDate, birthTime, birthCity, targetYear, relocCity
      }));
    } catch (_e) {}

    lastResult = window.SolarEngine.calculateSolarReturn({
      birthDate, birthTime, birthCity, targetYear, relocCity
    });

    currentSolarHash = window.NeoChartLock
      ? window.NeoChartLock.buildHash('solariusz', {
          date: birthDate,
          time: birthTime,
          city: birthCity,
          lat: lastResult.input.birthCoords.lat,
          lon: lastResult.input.birthCoords.lon,
          targetYear,
          relocCity: relocCity || birthCity,
          relocLat: lastResult.input.relocCoords.lat,
          relocLon: lastResult.input.relocCoords.lon
        })
      : '';

    renderReportBlock();

    if (shouldScroll && !window.__SOLAR_SUPPRESS_SCROLL__) {
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.__SOLAR_SUPPRESS_SCROLL__ = false;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    runCalculation(true);
  });

  try {
    const savedRaw = localStorage.getItem('neo_solar_last_input');
    if (savedRaw) {
      const saved = JSON.parse(savedRaw);
      if (saved && saved.birthDate) {
        if (document.getElementById('solar-date')) document.getElementById('solar-date').value = saved.birthDate;
        if (document.getElementById('solar-time') && saved.birthTime) document.getElementById('solar-time').value = saved.birthTime;
        if (document.getElementById('solar-birth-city') && saved.birthCity) document.getElementById('solar-birth-city').value = saved.birthCity;
        if (yearEl && saved.targetYear) yearEl.value = String(saved.targetYear);
        if (document.getElementById('solar-reloc-city') && saved.relocCity) document.getElementById('solar-reloc-city').value = saved.relocCity;

        const justUnlocked = sessionStorage.getItem('neo_just_unlocked') === 'solariusz';
        if (justUnlocked) window.__SOLAR_SUPPRESS_SCROLL__ = true;
        setTimeout(() => {
          runCalculation(false);
          if (justUnlocked) {
            sessionStorage.removeItem('neo_just_unlocked');
            setTimeout(() => {
              const target = document.getElementById('solar-unlocked-start') || resultsEl;
              if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
            }, 80);
          }
        }, 60);
      }
    }
  } catch (_e) {}
});
