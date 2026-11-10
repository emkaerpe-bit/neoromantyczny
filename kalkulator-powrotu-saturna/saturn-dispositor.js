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
      power: 'Napęd Wolitywny i Odwaga Granic',
      lesson: 'Twoja odporność i dyscyplina zależą bezpośrednio od energii Marsa. Impuls do działania i obrony własnego terytorium musi zostać przekuty w strategiczną cierpliwość.',
      actionTip: 'Uporządkuj kwestie sporne, asertywność i zarządzanie gniewem w sektorze, w którym przebywa Twój Mars.'
    },
    venus: {
      power: 'Wartość Własna, Relacje i Finanse',
      lesson: 'Twoja dojrzałość nie powstanie z samotnej walki, lecz z harmonii, smaku, zaufania do siebie i uczciwych kontraktów relacyjnych.',
      actionTip: 'Sprawdź stan swoich sojuszy, umów partnerskich i finansowej suwerenności w sektorze Twojej Wenus.'
    },
    mercury: {
      power: 'Precyzja Myślenia i Rzemiosło Słowa',
      lesson: 'Saturn buduje strukturę w oparciu o fakty, chłodną logikę i eliminację chaosu informacyjnego. Słowo jest Twoim podpisem i pieczęcią.',
      actionTip: 'Doprowadź do porządku dokumenty, umowy i zapanuj nad rozproszeniem uwagi w domu rządzonym przez Merkurego.'
    },
    moon: {
      power: 'Pamięć Emocjonalna i Bezpieczeństwo Rdzenne',
      lesson: 'Dojrzałość Saturna wymaga od Ciebie integracji uczuć i odcięcia pępowiny rodowej. Ucieczka w chłód i pancerz nie rozwiąże głodu bliskości.',
      actionTip: 'Zaopiekuj się swoimi podstawowymi potrzebami emocjonalnymi i zdefiniuj, czym jest dla Ciebie prawdziwy dom.'
    },
    sun: {
      power: 'Suwerenność Tożsamości i Autorytet Lidera',
      lesson: 'Saturn czerpie siłę z Twojego rdzennego poczucia godności. Masz stać się autorytetem dla samego siebie, nie czekając na brawa i poklask otoczenia.',
      actionTip: 'Weź 100% odpowiedzialności za to, kim jesteś i przestań przepraszać za swoją widzialność w świecie.'
    },
    jupiter: {
      power: 'Wizja Moralna, Filozofia i Wyższy Sens',
      lesson: 'Saturn wymaga oparcia wysiłku na solidnym fundamencie etycznym. Bez głębszej wiary w sens Twoja dyscyplina zamieni się w jałowy ciężar.',
      actionTip: 'Zweryfikuj swoje życiowe drogowskazy i połącz ciężką pracę z wielką, długoterminową wizją.'
    },
    saturn: {
      power: 'Władca Ostateczny (Final Sovereign Dispositor)',
      lesson: 'Twój Saturn przebywa we własnym królestwie. Nie podlega żadnej zewnętrznej instancji odwoławczej. Nosisz w sobie wrodzony kompas hierarchii i czasu.',
      actionTip: 'Nie szukaj mistrza na zewnątrz — Saturn wymaga, abyś sam stał się ostatecznym punktem odniesienia.'
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
