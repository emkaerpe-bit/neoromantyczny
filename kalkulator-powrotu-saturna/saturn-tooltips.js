/**
 * NEOROMANTYCZNY — SATURN EXPLANATORY PORTAL TOOLTIPS (SYNASTRIA STANDARD)
 */
(function () {
  const GLOSSARY = {
    sect_day: {
      title: 'Co to znaczy, że Saturn jest w sekcie? (Wykres dzienny)',
      def: 'W klasycznej astrologii planety dzielą się na dzienne (Słońce, Jowisz, Saturn) oraz nocne (Księżyc, Wenus, Mars). Gdy podczas Twoich narodzin Słońce znajdowało się nad horyzontem, Saturn trafia do swojej naturalnej drużyny czasowej — mówimy wtedy, że jest „w sekcie”.',
      basis: 'Praktyczny skutek: jego chłód i wymagania działają bardziej przewidywalnie, sprzyjając stabilnej budowie bez zbędnego chaosu.'
    },
    sect_night: {
      title: 'Co znaczy Saturn poza sektą? (Wykres nocny)',
      def: 'Gdy Słońce w chwili urodzenia znajdowało się pod horyzontem, dzienny Saturn pracuje w nocnej drużynie („poza sektą”). W tradycji uchodzi wtedy za trudniejszy punkt wykresu.',
      basis: 'Praktyczny skutek: lekcje dojrzałości wymagają większej odporności i cierpliwości na tarcie, ale przynoszą równie trwałe rezultaty.'
    },
    house_angular: {
      title: 'Dom kątowy (1, 4, 7 lub 10)',
      def: 'Domy kątowe to cztery główne osie kosmogramu. Zdarzenia w tych sektorach są widoczne publicznie i trudno je przeczekać na bocznym torze.',
      basis: 'Dotyczy tożsamości (1), domu rodzinnego (4), relacji jeden na jeden (7) albo kariery i nazwiska (10).'
    },
    house_succedent: {
      title: 'Dom następujący (2, 5, 8 lub 11)',
      def: 'Domy następujące odpowiadają za to, co gromadzisz, budujesz i chronisz w dłuższym okresie: pieniądze, własne dzieła, wspólny kapitał i krąg sojuszników.',
      basis: 'Nacisk pada tu na stabilność materialną oraz konsekwentne utrzymanie zasobów.'
    },
    house_cadent: {
      title: 'Dom upadający (3, 6, 9 lub 12)',
      def: 'Domy upadające (zmienne) kierują ciężar pracy na sposób myślenia, codzienne nawyki, formalności, wiedzę albo ciche porządki w psychice.',
      basis: 'Przełom zachodzi najpierw w decyzjach, grafiku dnia i przekonaniach, zanim stanie się głośny na zewnątrz.'
    },
    natal_direct: {
      title: 'Natalny Saturn prosty (Direct)',
      def: 'W dniu Twoich narodzin Saturn poruszał się na tle zodiaku ruchem prostym (do przodu).',
      basis: 'Praktyczny skutek: presja zmian przejawia się wprost poprzez konkretne okoliczności zewnętrzne — umowy, rachunki, terminy i granice w relacjach.'
    },
    natal_rx: {
      title: 'Natalny Saturn w retrogradacji (Rx)',
      def: 'Z perspektywy Ziemi Saturn sprawiał w dniu urodzenia wrażenie ruchu wstecznego.',
      basis: 'Praktyczny skutek: surowy sędzia pracuje głównie od środka (samokrytycyzm, wątpliwości przed startem, potrzeba wypracowania własnego wzorca autorytetu).'
    },
    pass_triple: {
      title: 'Pętla 3 przejść (ruch wsteczny tranzytu)',
      def: 'Tranzytujący Saturn mija Twój urodzeniowy stopień trzy razy w ciągu ok. 8–12 miesięcy: wejście proste, cofnięcie w retrogradacji oraz finalne domknięcie.',
      basis: 'Środkowe przejście daje czas na rewizję pierwszych wniosków i poprawienie decyzji bez pośpiechu.'
    },
    pass_single: {
      title: 'Pojedyncze przejście bezpośrednie',
      def: 'Saturn mija Twój natalny stopień wyłącznie raz, poruszając się cały czas ruchem prostym.',
      basis: 'Najintensywniejsze okno (±5°) trwa około 12 tygodni — rozstrzygnięcia przychodzą szybciej i bez drugiej rundy poprawkowej.'
    },
    dignity: {
      domicile: { title: 'Godność: Domicyl', def: 'Saturn stoi we własnym znaku (Koziorożec lub Wodnik). Ma pełny dostęp do swoich narzędzi porządku i konsekwencji.' },
      exaltation: { title: 'Godność: Wywyższenie', def: 'Saturn w Wadze działa jak gość honorowy — świetnie wspiera wyczucie proporcji, sprawiedliwość oraz trwałe umowy.' },
      peregrine: { title: 'Godność: Peregryn', def: 'Saturn przebywa w znaku bez własnego władztwa ani wygnania: zamiast gotowej instrukcji wykuwa własną metodę poprzez praktykę i współpracę ze swoim dyspozytorem.' },
      detriment: { title: 'Godność: Wygnanie', def: 'Saturn stoi naprzeciw własnego domu (Rak lub Lew). Godność mierzy tu wyłącznie wygodę narzędzi, nie wartość człowieka — uczy granic bez chłodu ani grania pod oklaski.' },
      fall: { title: 'Godność: Upadek', def: 'Saturn w Baranie łączy pośpiech ognia z wolnym zegarem. Wymaga oszlifowania cierpliwości na starcie, ale nagradza rzadką precyzją działania.' }
    },
    aspects: {
      Koniunkcja: 'Połączenie dwóch planet w jednym punkcie (0°): ich tematy zlewają się na stałe w jeden mechanizm.',
      Opozycja: 'Napięcie naprzeciwko siebie (180°): temat często widzisz w lustrze partnerów, szefów lub zewnętrznych zdarzeń.',
      Kwadratura: 'Kąt prosty (90°): dynamiczne tarcie wymuszające ruch, zmianę nawyku i podjęcie decyzji.',
      Trygon: 'Harmonia 120°: naturalne, płynne wsparcie ułatwiające utrzymanie kursu bez oporu.',
      Sekstyl: 'Współpraca 60°: szansa, która otwiera się wtedy, gdy sam wykonasz pierwszy konkretny krok.'
    },
    orb: {
      title: 'Czym jest orb i dokładność aspektu?',
      def: 'Orb to odległość kątowa w stopniach od idealnego kąta geometrycznego. Im bliżej 0,0°, tym silniej i bardziej bezpośrednio ten układ kształtuje Twój charakter.',
      basis: 'Ścisły rdzeń (≤2,2°) działa na pierwszym planie; szerszy orb (>4,5°) tworzy tło.'
    },
    dispositor: {
      title: 'Kim jest Dyspozytor Saturna?',
      def: 'To planeta, która tradycyjnie rządzi znakiem zodiaku zajmowanym przez Twojego Saturna (np. dla Saturna w Byku jest to Wenus).',
      basis: 'Działa jak kierownik zaplecza: pokazuje, przez jaki obszar życia najłatwiej uporządkować napięcie tranzytu.'
    },
    houseSystem: {
      title: 'System Domów (Placidus / Whole Sign)',
      def: 'Sposób podziału nieba na 12 sektorów życia na podstawie dokładnej godziny i miejsca urodzenia.',
      basis: 'Domyślnie używamy systemu Placidusa; powyżej 66°33′ szerokości geograficznej przełączamy automatycznie na Whole Sign, ponieważ podziały czasowe tracą tam ciągłość.'
    },
    profection: {
      title: 'Podwójna aktywacja Roczną Profekcją',
      def: 'Starożytna technika wyznaczająca główny sektor danego roku życia według wzoru (wiek % 12) + 1.',
      basis: 'Gdy Twój aktualny rok aktywuje dom Saturna lub znaki Koziorożca/Wodnika, Saturn staje się jednocześnie Władcą Roku i wzmacnia wagę decyzji zawodowych.'
    }
  };

  function escHtml(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function renderTipBadge(labelHtml, title, def, basis, extraClass, pillText) {
    const pTxt = pillText || 'ⓘ';
    return `<span class="sat-tip-badge ${extraClass || ''}" tabindex="0">${labelHtml}<span class="sat-info-pill" aria-hidden="true">${pTxt}</span><span class="sat-tip-pop" role="tooltip" style="display:none;"><span class="sat-tt-label">✦ ${escHtml(title)}</span><span class="sat-tt-def">${escHtml(def)}</span>${basis ? `<span class="sat-tt-basis">${escHtml(basis)}</span>` : ''}</span></span>`;
  }

  function initSaturnPortalTooltip() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    let portal = document.getElementById('sat-portal-tooltip');
    if (!portal) {
      if (!document.body) return;
      portal = document.createElement('div');
      portal.id = 'sat-portal-tooltip';
      document.body.appendChild(portal);
    }

    let activeAnchor = null;
    function pos(anchor) {
      if (!portal || !anchor) return;
      const r = anchor.getBoundingClientRect();
      const pr = portal.getBoundingClientRect();
      let left = r.left + r.width / 2 - pr.width / 2;
      left = Math.max(14, Math.min(Math.max(14, window.innerWidth - pr.width - 14), left));
      const top = r.top >= pr.height + 16 ? r.top - pr.height - 10 : Math.min(window.innerHeight - pr.height - 12, r.bottom + 10);
      portal.style.left = `${Math.round(left)}px`;
      portal.style.top = `${Math.round(Math.max(12, top))}px`;
    }

    function show(anchor) {
      const tip = anchor && anchor.querySelector('.sat-tip-pop');
      if (!tip) return;
      activeAnchor = anchor;
      portal.innerHTML = tip.innerHTML;
      portal.classList.add('is-visible');
      pos(anchor);
    }

    function hide(target) {
      if (activeAnchor && (!target || activeAnchor === target || activeAnchor.contains(target))) {
        portal.classList.remove('is-visible');
        activeAnchor = null;
      }
    }

    document.addEventListener('mouseover', (e) => { const a = e.target.closest('.sat-tip-badge'); if (a) show(a); });
    document.addEventListener('mouseout', (e) => { const a = e.target.closest('.sat-tip-badge'); if (a && (!e.relatedTarget || !a.contains(e.relatedTarget))) hide(a); });
    document.addEventListener('focusin', (e) => { const a = e.target.closest('.sat-tip-badge'); if (a) show(a); });
    document.addEventListener('focusout', (e) => { const a = e.target.closest('.sat-tip-badge'); if (a) hide(a); });
    document.addEventListener('click', (e) => {
      const a = e.target.closest('.sat-tip-badge');
      if (a) { show(a); } else if (activeAnchor) { portal.classList.remove('is-visible'); activeAnchor = null; }
    });
    window.addEventListener('scroll', () => { if (activeAnchor) portal.classList.remove('is-visible'); }, { passive: true });
    window.addEventListener('resize', () => { if (activeAnchor) pos(activeAnchor); }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSaturnPortalTooltip);
  else initSaturnPortalTooltip();

  window.SaturnTooltips = { GLOSSARY, renderTipBadge, initSaturnPortalTooltip };
})();
