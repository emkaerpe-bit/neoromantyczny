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
      lesson: 'Twoja wytrzymałość nie pochodzi z biernego czekania, lecz z energii Marsa. Ogień złości i pośpiech muszą zmienić się w spokojną, stalową precyzję cięcia.',
      actionTip: 'Rozstrzygnij stare spory, nazwij głośno swoje granice i skieruj gniew w czyn w domu, w którym mieszka Twój Mars.'
    },
    venus: {
      power: 'Wartość Własna, Bliskość i Zaufanie do Piękna',
      lesson: 'Twoja dorosłość nie rodzi się w samotnej twierdzy, lecz w uczciwej wymianie, dobrym smaku oraz przywiązaniu wolnym od strachu przed stratą.',
      actionTip: 'Przejrzyj zawarte po cichu kompromisy, umowy finansowe i wierność sobie w domu zajmowanym przez Twoją Wenus.'
    },
    mercury: {
      power: 'Rzemiosło Słowa i Czystość Myśli',
      lesson: 'Saturn stawia tu ściany z faktów, rzetelnych notatek i rozmowy bez krętactwa. Jedno dane przez Ciebie słowo powinno ważyć więcej niż sterta papierów.',
      actionTip: 'Zamknij rozgrzebane sprawy na biurku, przeczytaj drobny druk w umowach i wycisz szum w sprawach domu Twojego Merkurego.'
    },
    moon: {
      power: 'Pamięć Domu i Schronienie Wewnątrz',
      lesson: 'Nie wybudujesz trwałego życia na lodzie. Dojrzałość żąda tu pojednania z własną wrażliwością i wyjścia spod cienia dawnych rodzinnych lęków.',
      actionTip: 'Zadbaj o prywatną przestrzeń, ciepło codzienności i własne emocje tam, gdzie w horoskopie oddycha Twój Księżyc.'
    },
    sun: {
      power: 'Cicha Godność i Odwaga Stania w Świetle',
      lesson: 'Twój kręgosłup wyrasta ze świadomego szacunku do własnego nazwiska. Koniec chowania głowy w kołnierz i czekania na pozwolenie obcych osób przy stole.',
      actionTip: 'Weź pełny ciężar swojej drogi na własne barki i przestań zmniejszać się dla cudzej wygody w domu Twojego Słońca.'
    },
    jupiter: {
      power: 'Kierunek Sumienia i Długi Oddech',
      lesson: 'Bez głębszego sensu zwykła dyscyplina szybko zamienia się w ciężkie jarzmo. Szukaj prawdy, za którą pójdziesz bez wahania nawet w deszczowy poranek.',
      actionTip: 'Sprawdź, czy codzienna praca zgadza się z tym, w co naprawdę wierzysz, w sektorze rządzonym przez Twojego Jowisza.'
    },
    saturn: {
      power: 'Władca Ostateczny (Samotny Tron Czasu)',
      lesson: 'Twój Saturn siedzi we własnym pokoju i nikomu nie składa meldunków. Masz w sobie surowy, nieprzekupny zegar sumienia i wrodzony zmysł długiej gry.',
      actionTip: 'Przestań szukać mistrza w obcych drzwiach — to Ty jesteś ostateczną instancją, przed którą podpisujesz swój własny wyrok.'
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
