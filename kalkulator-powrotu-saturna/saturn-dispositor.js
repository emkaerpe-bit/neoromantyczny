/**
 * NEOROMANTYCZNY — SATURN DISPOSITOR ENGINE & SYNTHESIS
 * Wyznaczanie władcy znaku Saturna, jego lokalizacji (Placidus) i roli w powrocie Saturna
 */
(function () {
  const TRAD_RULERS = {
    Aries: 'mars', Taurus: 'venus', Gemini: 'mercury', Cancer: 'moon', Leo: 'sun', Virgo: 'mercury',
    Libra: 'venus', Scorpio: 'mars', Sagittarius: 'jupiter', Capricorn: 'saturn', Aquarius: 'saturn', Pisces: 'jupiter'
  };

  const SIGN_LOCATIVE = {
    Aries: 'Baranie', Taurus: 'Byku', Gemini: 'Bliźniętach', Cancer: 'Raku', Leo: 'Lwie', Virgo: 'Pannie',
    Libra: 'Wadze', Scorpio: 'Skorpionie', Sagittarius: 'Strzelcu', Capricorn: 'Koziorożcu', Aquarius: 'Wodniku', Pisces: 'Rybach'
  };

  const RULER_THEMES = {
    mars: {
      power: 'Ostrze Woli i Odwaga Własnych Granic',
      lesson: 'Twoja wytrzymałość wyrasta ze zdecydowania Marsa. Zamiast tłumić złość lub działać w pośpiechu, przekuwasz energię w spokojną, precyzyjną asertywność.',
      actionTip: 'Rozstrzygnij stare spory, nazwij głośno swoje granice i skieruj inicjatywę w czyn w domu, w którym mieszka Twój Mars.'
    },
    venus: {
      power: 'Wartość Własna, Bliskość i Zaufanie do Piękna',
      lesson: 'Twoja dorosłość dojrzewa poprzez uczciwą wymianę, zdrowe poczucie estetyki oraz przywiązanie wolne od lęku przed odrzuceniem.',
      actionTip: 'Przejrzyj zawarte po cichu kompromisy, umowy finansowe i wierność sobie w domu zajmowanym przez Twoją Wenus.'
    },
    mercury: {
      power: 'Rzemiosło Słowa i Czystość Myśli',
      lesson: 'Saturn wymaga tu trzeźwych faktów, rzetelnych notatek i rozmowy bez krętactwa. Jedno dane przez Ciebie słowo powinno ważyć więcej niż sterta papierów.',
      actionTip: 'Zamknij rozgrzebane sprawy na biurku, przeczytaj drobny druk w umowach i wycisz szum informacyjny w domu Twojego Merkurego.'
    },
    moon: {
      power: 'Pamięć Domu i Emocjonalne Oparcie',
      lesson: 'Stabilna dorosłość zaczyna się od pojednania z własną wrażliwością oraz wyjścia spod wpływu dawnych rodzinnych lęków.',
      actionTip: 'Zadbaj o prywatną przestrzeń, spokój codzienności i równowagę emocjonalną tam, gdzie w horoskopie pracuje Twój Księżyc.'
    },
    sun: {
      power: 'Cicha Godność i Odwaga Stania w Świetle',
      lesson: 'Twój kręgosłup wyrasta ze świadomego szacunku do własnego nazwiska. Czas przestać chować głowę w cieniu zespołu i czekać na pozwolenie innych.',
      actionTip: 'Weź pełny ciężar swojej drogi na własne barki i przestań zmniejszać się dla cudzej wygody w domu Twojego Słońca.'
    },
    jupiter: {
      power: 'Kierunek Sumienia i Długi Oddech',
      lesson: 'Bez głębszego sensu zwykła dyscyplina szybko zamienia się w nużący obowiązek. Wybierz prawdę, za którą pójdziesz konsekwentnie w zwykłe robocze poranki.',
      actionTip: 'Sprawdź, czy codzienna praca zgadza się z tym, w co naprawdę wierzysz, w sektorze rządzonym przez Twojego Jowisza.'
    },
    saturn: {
      power: 'Władca Ostateczny (Samodzielny Standard)',
      lesson: 'Twój Saturn rządzi samym sobą i nikomu nie składa pustych meldunków. Masz w sobie surowy zegar sumienia oraz wrodzony zmysł długiej gry.',
      actionTip: 'Przestań szukać zewnętrznego sędziego dla swoich wyborów — to Ty jesteś ostateczną instancją, przed którą zatwierdzasz własne decyzje.'
    }
  };

  function getSaturnDispositorInfo(satPlanet, planets, cusps, lat) {
    if (!satPlanet || !planets) return null;
    const rulerKey = TRAD_RULERS[satPlanet.signKey] || 'saturn';
    const isSelfRuled = (satPlanet.signKey === 'Capricorn' || satPlanet.signKey === 'Aquarius');
    const rulerPlanet = planets.find(p => p.key === rulerKey) || satPlanet;

    // Dom Placidusa dla dyspozytora
    let rulerHouse = rulerPlanet.house || 1;
    if (window.SaturnPlacidus && cusps) {
      rulerHouse = window.SaturnPlacidus.getPlanetHousePlacidus(rulerPlanet.longitude, cusps, lat, cusps.armc, cusps.eps);
      rulerPlanet.house = rulerHouse;
    }

    const theme = RULER_THEMES[rulerKey] || RULER_THEMES.saturn;
    const signLoc = SIGN_LOCATIVE[rulerPlanet.signKey] || rulerPlanet.signName;
    const satSignLoc = SIGN_LOCATIVE[satPlanet.signKey] || satPlanet.signName;

    return {
      rulerKey,
      isSelfRuled,
      name: rulerPlanet.name,
      glyph: rulerPlanet.glyph,
      signKey: rulerPlanet.signKey,
      signName: rulerPlanet.signName,
      signLocative: signLoc,
      satSignLocative: satSignLoc,
      degreeInSign: rulerPlanet.degreeInSign || `${rulerPlanet.deg || 0}°`,
      house: rulerHouse,
      isRetrograde: Boolean(rulerPlanet.isRetrograde),
      power: theme.power,
      lesson: theme.lesson,
      actionTip: theme.actionTip
    };
  }

  window.SaturnDispositor = {
    getSaturnDispositorInfo,
    SIGN_LOCATIVE
  };
})();
