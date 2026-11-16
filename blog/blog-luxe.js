/**
 * Neoromantyzm Midnight Luxe Editorial Enhancements
 * - Reading Progress Bar & Reading Pulse Indicator
 * - Astro-Psychological Knowledge Tooltips
 */
(function() {
  'use strict';

  // 1. INJECT STYLES
  const style = document.createElement('style');
  style.id = 'luxe-editorial-styles';
  style.textContent = `
    #reading-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 2.5px;
      width: 0%;
      background: linear-gradient(90deg, #C9A96E 0%, #FDE68A 100%);
      z-index: 99999;
      pointer-events: none;
      box-shadow: 0 0 10px rgba(201, 169, 110, 0.45);
      transition: width 0.12s ease-out;
    }
    #reading-pulse-pill {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(12px);
      background: rgba(13, 13, 18, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(201, 169, 110, 0.32);
      border-radius: 9999px;
      padding: 0.55rem 1.15rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      letter-spacing: 0.08em;
      color: rgba(250, 248, 245, 0.9);
      z-index: 9998;
      display: flex;
      align-items: center;
      gap: 0.55rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.55), 0 0 15px rgba(201, 169, 110, 0.15);
      opacity: 0;
      white-space: nowrap;
      pointer-events: none;
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    #reading-pulse-pill.visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .luxe-term {
      color: #FAF8F5;
      border-bottom: 1px dashed rgba(201, 169, 110, 0.7);
      cursor: pointer;
      text-decoration: none;
      transition: color 0.2s ease, border-color 0.2s ease;
    }
    .luxe-term:hover, .luxe-term.active {
      color: #C9A96E;
      border-bottom-color: #FDE68A;
    }
    #luxe-tooltip-popover {
      position: absolute;
      max-width: 320px;
      background: rgba(15, 15, 20, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(201, 169, 110, 0.35);
      border-radius: 1.25rem;
      padding: 1.15rem 1.25rem;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.75), 0 0 20px rgba(201, 169, 110, 0.15);
      z-index: 100000;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.25s ease, transform 0.25s ease;
      pointer-events: none;
      color: #FAF8F5;
    }
    #luxe-tooltip-popover.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    #luxe-tooltip-popover h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14px;
      font-weight: 700;
      color: #C9A96E;
      margin: 0 0 0.45rem 0;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    #luxe-tooltip-popover p {
      font-family: 'Inter', sans-serif;
      font-size: 11.5px;
      line-height: 1.55;
      color: rgba(250, 248, 245, 0.78);
      margin: 0 0 0.85rem 0;
    }
    #luxe-tooltip-popover a {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #0D0D12;
      background: #C9A96E;
      padding: 0.35rem 0.8rem;
      border-radius: 9999px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s ease, transform 0.2s ease;
    }
    #luxe-tooltip-popover a:hover {
      background: #FDE68A;
      transform: scale(1.02);
    }
    @media (max-width: 768px) {
      #reading-pulse-pill {
        bottom: 1.25rem;
        padding: 0.4rem 0.9rem;
        font-size: 9.5px;
      }
      #luxe-tooltip-popover {
        max-width: 280px;
        font-size: 11px;
      }
    }
    nav.navbar-scrolled {
      background-color: rgba(250, 248, 245, 0.92) !important;
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
      border-color: rgba(0, 0, 0, 0.06) !important;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08) !important;
    }
    nav.navbar-scrolled span, nav.navbar-scrolled .hidden.md\\:flex {
      color: #0D0D12 !important;
    }
    nav.navbar-scrolled div.hidden.md\\:flex a:not(.bg-champagne) {
      color: rgba(13, 13, 18, 0.7) !important;
    }
    nav.navbar-scrolled div.hidden.md\\:flex a:not(.bg-champagne):hover {
      color: #C9A84C !important;
    }
  `;
  document.head.appendChild(style);

  // 2. MOUNT PROGRESS BAR & PULSE PILL
  const progressBar = document.createElement('div');
  progressBar.id = 'reading-progress-bar';
  document.body.appendChild(progressBar);

  const pulsePill = document.createElement('div');
  pulsePill.id = 'reading-pulse-pill';
  pulsePill.innerHTML = '<span><svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0" aria-hidden="true"><path d="M8.5 5.2h15M8.5 26.8h15" stroke-width="1.65"/><path d="M9.8 5.2v21.6M22.2 5.2v21.6" stroke-width="0.8" opacity="0.45"/><path d="M11.8 5.2c0 5.4 4.2 8.2 4.2 10.8c0-2.6 4.2-5.4 4.2-10.8" stroke-width="1.45"/><path d="M11.8 26.8c0-5.4 4.2-8.2 4.2-10.8c0 2.6 4.2 5.4 4.2 10.8" stroke-width="1.45"/><path d="M13.5 26.8L16 23.2l2.5 3.6Z" stroke="none" fill="currentColor" fill-opacity="0.42"/></svg></span><span id="reading-pulse-time">~0 min lektury</span><span style="opacity:0.35;">•</span><span id="reading-pulse-pct" style="color:#C9A96E;">0%</span>';
  document.body.appendChild(pulsePill);

  // 3. READING PROGRESS LISTENER
  const articleEl = document.querySelector('article') || document.querySelector('main');
  function onScroll() {
    if (!articleEl) return;
    const rect = articleEl.getBoundingClientRect();
    const articleTop = rect.top + window.scrollY;
    const articleHeight = articleEl.offsetHeight;
    const windowH = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY < articleTop - 100) {
      progressBar.style.width = '0%';
      pulsePill.classList.remove('visible');
      return;
    }

    const totalScrollable = articleHeight - windowH;
    if (totalScrollable <= 0) return;
    const currentScroll = scrollY - articleTop;
    const pct = Math.min(100, Math.max(0, Math.round((currentScroll / totalScrollable) * 100)));

    progressBar.style.width = pct + '%';

    // Update pulse pill
    const remainingPct = 100 - pct;
    const estWords = 1400; // Average article words
    const wordsLeft = Math.round((remainingPct / 100) * estWords);
    const minsLeft = Math.max(1, Math.ceil(wordsLeft / 220));

    const timeEl = document.getElementById('reading-pulse-time');
    const pctEl = document.getElementById('reading-pulse-pct');
    if (timeEl) timeEl.textContent = minsLeft > 0 && pct < 95 ? ('~' + minsLeft + ' min do końca') : 'Koniec artykułu';
    if (pctEl) pctEl.textContent = pct + '%';

    if (pct >= 5 && pct <= 90) {
      pulsePill.classList.add('visible');
    } else {
      pulsePill.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  setTimeout(onScroll, 400);

  // 3b. STICKY GLASSMORPHIC NAVBAR SCROLL LISTENER
  const navEl = document.getElementById('navbar') || document.querySelector('nav');
  function updateNavbar() {
    if (!navEl) return;
    const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPos > 50) {
      navEl.classList.add('navbar-scrolled');
    } else {
      navEl.classList.remove('navbar-scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // 4. ASTRO-PSYCHOLOGICAL GLOSSARY DEFINITIONS
  const GLOSSARY = {
    'ascendent': {
      title: 'Ascendent (Maska Relacyjna)',
      glyphHtml: '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.3em 0 0;color:#C9A96E" aria-hidden="true"><path d="M18.2 4.5L9 16.5h6.5l-2 11L23 14.5h-6.5l1.7-10Z" stroke-width="1.65" fill="currentColor" fill-opacity="0.14"/></svg>',
      desc: 'Znak wschodzący na horyzoncie w chwili narodzin. Twój filtr pierwszego wrażenia, styl wchodzenia w bliskość i mechanizm obronny w nowych sytuacjach.',
      linkText: 'Oblicz Ascendent ➔',
      url: '/kalkulator-ascendentu/'
    },
    'znak księżycowy': {
      title: 'Znak Księżycowy (Układ Nerwowy)',
      glyphHtml: '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.3em 0 0;color:#C9A96E" aria-hidden="true"><path d="M21.2 21.4A8.6 8.6 0 0 1 11.5 11a8.8 8.8 0 0 1 3-6.6A9.5 9.5 0 1 0 26.8 18a8.4 8.4 0 0 1-5.6 3.4Z" stroke-width="1.7"/><path d="M23.5 6.5v5M21 9h5" stroke-width="1.2"/><circle cx="23.5" cy="9" r="1" stroke="none" fill="currentColor"/></svg>',
      desc: 'Odpowiada za Twój nieuświadomiony świat emocjonalny, styl przywiązania oraz to, czego bezwzględnie potrzebujesz, by w relacji poczuć bezpieczeństwo.',
      linkText: 'Oblicz Księżyc ➔',
      url: '/kalkulator-ascendentu/'
    },
    'wielka trójka': {
      title: 'Wielka Trójka (Kod Osobowości)',
      glyphHtml: '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.3em 0 0;color:#C9A96E" aria-hidden="true"><polygon points="15.5,4 17.3,14.2 25.5,16 17.3,17.8 15.5,28 13.7,17.8 5.5,16 13.7,14.2" stroke-width="1.25" fill="currentColor" fill-opacity="0.18"/><path d="M10.8 11.3l9.4 9.4M20.2 11.3l-9.4 9.4" stroke-width="0.85" opacity="0.75"/><circle cx="24.5" cy="7.5" r="1.1" stroke="none" fill="currentColor"/></svg>',
      desc: 'Synergia Słońca (świadome ego), Księżyca (emocje) i Ascendentu (ekspresja zewnętrzna). Stanowi fundament 90% dynamiki relacyjnej.',
      linkText: 'Poznaj Wielką Trójkę ➔',
      url: '/kalkulator-ascendentu/'
    },
    'synastria': {
      title: 'Synastria (Horoskop Porównawczy)',
      glyphHtml: '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.3em 0 0;color:#C9A96E" aria-hidden="true"><circle cx="16" cy="13.5" r="7.2" stroke-width="1.7"/><ellipse cx="16" cy="13.5" rx="11.2" ry="3.4" transform="rotate(-20 16 13.5)" stroke-width="0.95" opacity="0.75"/><circle cx="16" cy="13.5" r="1.4" stroke="none" fill="currentColor"/><path d="M11 26.8h10M16 20.8v6" stroke-width="1.35"/></svg>',
      desc: 'Analiza astrologiczna nakładająca kosmogramy dwóch osób. Pokazuje chemię (Wenus-Mars), bezpieczeństwo emocjonalne oraz punkty tarcia i lekcje karmiczne.',
      linkText: 'Oblicz Synastrię ➔',
      url: '/kalkulator-synastrii/'
    },
    'lilith': {
      title: 'Lilith (Cień i Magnetyzm)',
      glyphHtml: '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.3em 0 0;color:#C9A96E" aria-hidden="true"><circle cx="16" cy="16" r="9.2" stroke-width="1.2" stroke-dasharray="1.6 2.8" opacity="0.72"/><circle cx="16" cy="16" r="11.4" stroke-width="0.65" opacity="0.35"/><circle cx="16" cy="16" r="1.3" stroke="none" fill="currentColor" opacity="0.85"/></svg>',
      desc: 'Czarny Księżyc – symbol pierwotnej, nieoswojonej energii i prawdy. Wskazuje na relacyjny magnetyzm, stłumione pragnienia oraz punkty zapalne w związku.',
      linkText: 'Sprawdź w Synastrii ➔',
      url: '/kalkulator-synastrii/'
    },
    'saturn': {
      title: 'Saturn (Klucz Trwałości i Karmy)',
      glyphHtml: '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.3em 0 0;color:#C9A96E" aria-hidden="true"><circle cx="16" cy="16" r="5.2" stroke-width="1.75"/><ellipse cx="16" cy="16" rx="12.2" ry="3.5" transform="rotate(-24 16 16)" stroke-width="1.1"/><circle cx="25.5" cy="8.5" r="1" stroke="none" fill="currentColor"/></svg>',
      desc: 'Zasada rzeczywistości, granic i dojrzałości. W horoskopie partnerskim decyduje o tym, czy więź przetrwa próbę czasu, czy rozpadnie się pod ciężarem iluzji.',
      linkText: 'Sprawdź Aspekty ➔',
      url: '/kalkulator-synastrii/'
    },
    'wenus': {
      title: 'Wenus (Język Miłości i Przyjemności)',
      glyphHtml: '<svg width="1.12em" height="1.12em" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0;margin:0 0.3em 0 0;color:#C9A96E" aria-hidden="true"><circle cx="16" cy="11.8" r="5.6" stroke-width="1.8"/><circle cx="16" cy="11.8" r="3.4" stroke-width="0.75" opacity="0.45"/><path d="M16 17.5v9.8M11.5 22.8h9" stroke-width="1.6"/></svg>',
      desc: 'Archetyp estetyki, pożądania i wartości. Określa to, jak okazujesz uczucia, co uważasz za luksusowe oraz jaki styl obdarowywania trafia do Twojego serca.',
      linkText: 'Poznaj Twoją Wenus ➔',
      url: '/kalkulator-prezentowy/'
    },
    'mars': {
      title: 'Mars (Popęd i Asertywność)',
      glyph: '♂\uFE0E',
      desc: 'Planeta ognia, energii seksualnej i sposobu dochodzenia swoich racji. W synastrii z Wenus tworzy iskry magnetyzmu lub destrukcyjne konflikty.',
      linkText: 'Analizuj Chemię ➔',
      url: '/kalkulator-synastrii/'
    }
  };

  // 5. TOOLTIP POPOVER ELEMENT
  const popover = document.createElement('div');
  popover.id = 'luxe-tooltip-popover';
  popover.innerHTML = '<h4 id="lt-title"></h4><p id="lt-desc"></p><a id="lt-link" href="#"></a>';
  document.body.appendChild(popover);

  let activeTermEl = null;

  function showTooltip(el, key) {
    const data = GLOSSARY[key];
    if (!data) return;
    const _esc = (x) => String(x || '').replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); document.getElementById('lt-title').innerHTML = (data.glyphHtml || (_esc(data.glyph) + ' ')) + _esc(data.title);
    document.getElementById('lt-desc').textContent = data.desc;
    const linkEl = document.getElementById('lt-link');
    linkEl.textContent = data.linkText;
    linkEl.href = data.url;

    const rect = el.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    let top = rect.bottom + scrollY + 8;
    let left = rect.left + scrollX + (rect.width / 2) - 160;

    // Boundary check
    if (left < 16) left = 16;
    if (left + 330 > window.innerWidth) left = window.innerWidth - 340;

    popover.style.top = top + 'px';
    popover.style.left = left + 'px';
    popover.classList.add('visible');
    if (activeTermEl) activeTermEl.classList.remove('active');
    activeTermEl = el;
    activeTermEl.classList.add('active');
  }

  function hideTooltip() {
    popover.classList.remove('visible');
    if (activeTermEl) {
      activeTermEl.classList.remove('active');
      activeTermEl = null;
    }
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#luxe-tooltip-popover') && !e.target.closest('.luxe-term')) {
      hideTooltip();
    }
  });

  // 6. WRAP FIRST OCCURRENCE IN ARTICLE PARAGRAPHS
  function initGlossary() {
    if (!articleEl) return;
    const paragraphs = articleEl.querySelectorAll('p');
    const matchedTerms = new Set();

    paragraphs.forEach(function(p) {
      // Skip paragraphs inside aside, tables, faq, buttons
      if (p.closest('aside') || p.closest('.rag-table-wrapper') || p.closest('details') || p.closest('nav') || p.closest('header')) return;

      Object.keys(GLOSSARY).forEach(function(termKey) {
        if (matchedTerms.has(termKey)) return;

        // Create case-insensitive regex for term
        const regex = new RegExp('\\b(' + termKey + ')(u|owi|em|ie|y|a|e|ach|om)?\\b', 'i');
        const text = p.innerHTML;

        // Ensure not inside an existing tag or link
        if (regex.test(text) && !p.querySelector('.luxe-term') && !p.querySelector('a')) {
          p.innerHTML = text.replace(regex, function(match) {
            matchedTerms.add(termKey);
            return '<span class="luxe-term" data-term="' + termKey + '">' + match + '</span>';
          });
        }
      });
    });

    // Attach click and hover listeners to wrapped terms
    document.querySelectorAll('.luxe-term').forEach(function(el) {
      const termKey = el.getAttribute('data-term');
      el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (activeTermEl === el) {
          hideTooltip();
        } else {
          showTooltip(el, termKey);
        }
      });
      el.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
          showTooltip(el, termKey);
        }
      });
    });
  }

  setTimeout(initGlossary, 500);

  // 7. LIVE CMS EDITOR LOADER (0s Redeploy)
  function loadLiveEditor() {
    if (document.getElementById('neo-live-editor-script')) return;
    var s = document.createElement('script');
    s.id = 'neo-live-editor-script';
    s.src = '/blog/live-editor.js';
    document.body.appendChild(s);
  }
  if (location.search.indexOf('edit=1') !== -1 || localStorage.getItem('neo_cms_ui') === '1' || localStorage.getItem('neo_admin_token')) {
    loadLiveEditor();
  }
  window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
      e.preventDefault();
      loadLiveEditor();
    }
  });
})();
