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
  pulsePill.innerHTML = '<span>⏱️</span><span id="reading-pulse-time">~0 min lektury</span><span style="opacity:0.35;">•</span><span id="reading-pulse-pct" style="color:#C9A96E;">0%</span>';
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
      glyph: '⚡',
      desc: 'Znak wschodzący na horyzoncie w chwili narodzin. Twój filtr pierwszego wrażenia, styl wchodzenia w bliskość i mechanizm obronny w nowych sytuacjach.',
      linkText: 'Oblicz Ascendent ➔',
      url: '/kalkulator-ascendentu/'
    },
    'znak księżycowy': {
      title: 'Znak Księżycowy (Układ Nerwowy)',
      glyph: '🌙',
      desc: 'Odpowiada za Twój nieuświadomiony świat emocjonalny, styl przywiązania oraz to, czego bezwzględnie potrzebujesz, by w relacji poczuć bezpieczeństwo.',
      linkText: 'Oblicz Księżyc ➔',
      url: '/kalkulator-ascendentu/'
    },
    'wielka trójka': {
      title: 'Wielka Trójka (Kod Osobowości)',
      glyph: '✨',
      desc: 'Synergia Słońca (świadome ego), Księżyca (emocje) i Ascendentu (ekspresja zewnętrzna). Stanowi fundament 90% dynamiki relacyjnej.',
      linkText: 'Poznaj Wielką Trójkę ➔',
      url: '/kalkulator-ascendentu/'
    },
    'synastria': {
      title: 'Synastria (Horoskop Porównawczy)',
      glyph: '🔮',
      desc: 'Analiza astrologiczna nakładająca kosmogramy dwóch osób. Pokazuje chemię (Wenus-Mars), bezpieczeństwo emocjonalne oraz punkty tarcia i lekcje karmiczne.',
      linkText: 'Oblicz Synastrię ➔',
      url: '/kalkulator-synastrii/'
    },
    'lilith': {
      title: 'Lilith (Cień i Magnetyzm)',
      glyph: '🌑',
      desc: 'Czarny Księżyc – symbol pierwotnej, nieoswojonej energii i prawdy. Wskazuje na relacyjny magnetyzm, stłumione pragnienia oraz punkty zapalne w związku.',
      linkText: 'Sprawdź w Synastrii ➔',
      url: '/kalkulator-synastrii/'
    },
    'saturn': {
      title: 'Saturn (Klucz Trwałości i Karmy)',
      glyph: '🪐',
      desc: 'Zasada rzeczywistości, granic i dojrzałości. W horoskopie partnerskim decyduje o tym, czy więź przetrwa próbę czasu, czy rozpadnie się pod ciężarem iluzji.',
      linkText: 'Sprawdź Aspekty ➔',
      url: '/kalkulator-synastrii/'
    },
    'wenus': {
      title: 'Wenus (Język Miłości i Przyjemności)',
      glyph: '♀',
      desc: 'Archetyp estetyki, pożądania i wartości. Określa to, jak okazujesz uczucia, co uważasz za luksusowe oraz jaki styl obdarowywania trafia do Twojego serca.',
      linkText: 'Poznaj Twoją Wenus ➔',
      url: '/kalkulator-prezentowy/'
    },
    'mars': {
      title: 'Mars (Popęd i Asertywność)',
      glyph: '♂',
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
    document.getElementById('lt-title').textContent = data.glyph + ' ' + data.title;
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
})();
