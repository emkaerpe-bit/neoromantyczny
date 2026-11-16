/**
 * NEOROMANTYCZNY — SATURN DISPOSITOR ENGINE & SYNTHESIS
 * Wyznaczanie władcy znaku Saturna, jego godności oraz osobnych warstw Free vs Paid
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
      lesson: 'Twoja wytrzymałość wyrasta ze zdecydowania Marsa: zamiast tłumić złość lub działać w pośpiechu, przekuwasz impet w spokojną, precyzyjną asertywność.',
      actionTip: 'Nazwij głośno własne granice i skieruj inicjatywę w czyn w obszarze swojego Marsa.',
      deepProtocol: 'W kryzysie nie walcz z objawami zmęczenia samą siłą woli. Zidentyfikuj jeden zadawniony konflikt, w którym unikasz konfrontacji, i zamknij go rzeczową rozmową w ciągu siedmiu dni.'
    },
    venus: {
      power: 'Wartość Własna, Bliskość i Zaufanie',
      lesson: 'Dorosłość dojrzewa tu poprzez uczciwą wymianę, wyczucie proporcji oraz więzi wolne od lęku przed odrzuceniem.',
      actionTip: 'Przejrzyj ciche ustępstwa, stawki finansowe i wierność sobie w sektorze Wenus.',
      deepProtocol: 'Każde niedopowiedzenie o pieniądzach albo wzajemności podcina stabilność Saturna. Sprawdź, gdzie zgadzasz się na zaniżoną wycenę czasu, i wyrównaj warunki przed kolejnym krokiem.'
    },
    mercury: {
      power: 'Rzemiosło Słowa i Czystość Myśli',
      lesson: 'Saturn wymaga trzeźwych faktów, uporządkowanych notatek i rozmów bez uników. Jedna obietnica powinna ważyć więcej niż stos deklaracji.',
      actionTip: 'Zamknij rozgrzebane sprawy na biurku i wycisz szum informacyjny w sektorze Merkurego.',
      deepProtocol: 'Kiedy pojawia się chaos decyzyjny, przestań szukać kolejnej opinii z zewnątrz. Wypisz na jednej kartce fakty, terminy i koszty, a potem podejmij najprostszą wykonalną decyzję.'
    },
    moon: {
      power: 'Pamięć Domu i Emocjonalne Oparcie',
      lesson: 'Trwała dorosłość zaczyna się od uszanowania własnej wrażliwości oraz wyjścia spod presji dawnych rodzinnych lęków.',
      actionTip: 'Zadbaj o prywatną przystań, sen i równowagę emocjonalną w sektorze swojego Księżyca.',
      deepProtocol: 'Przeciążenie Saturna najpierw uderza w poczucie bezpieczeństwa i regenerację. Zanim podejmiesz ważny krok zawodowy, ustabilizuj rytm posiłków, ciszy wieczornej oraz granic w mieszkaniu.'
    },
    sun: {
      power: 'Cicha Godność i Odwaga Stania w Świetle',
      lesson: 'Kręgosłup wyrasta ze świadomego szacunku do własnego imienia: pora wyjść z cienia zespołu i przestać czekać na cudze pozwolenie.',
      actionTip: 'Weź odpowiedzialność za kierunek drogi i nie zmniejszaj siebie dla cudzej wygody w sektorze Słońca.',
      deepProtocol: 'Odblokowanie Saturna następuje w chwili, gdy podpisujesz dzieło własnym nazwiskiem zamiast ukrywać się za rolą pomocnika. Wyznacz jeden widoczny cel i broń go konsekwentnie.'
    },
    jupiter: {
      power: 'Kierunek Sumienia i Długi Oddech',
      lesson: 'Bez głębszego sensu surowa dyscyplina szybko zamienia się w ciężki obowiązek. Wybierz kierunek, za którym pójdziesz spokojnie w zwykłe robocze dni.',
      actionTip: 'Sprawdź, czy codzienne zajęcia zgadzają się z Twoimi przekonaniami w sektorze Jowisza.',
      deepProtocol: 'Kiedy rośnie zwątpienie, nie dokładaj sobie samych zakazów — odśwież szerszy cel na kolejną dekadę i odetnij projekty niezgodne z Twoją etyką pracy.'
    },
    saturn: {
      power: 'Władca Ostateczny (Samodzielny Standard)',
      lesson: 'Twój Saturn włada własnym znakiem i nikomu nie składa pustych meldunków: posiadasz surowy zegar sumienia oraz wrodzony zmysł długiej gry.',
      actionTip: 'Przestań szukać zewnętrznego sędziego dla swoich decyzji — zatwierdzasz je samodzielnie.',
      deepProtocol: 'Brak zewnętrznego dyspozytora oznacza pełną odpowiedzialność bez wymówek. Zastąp surowego krytyka spokojnym planem kwartału i mierz postęp wyłącznie realnym rezultatem.'
    }
  };

  function getSaturnDispositorInfo(satPlanet, planets, cusps, lat) {
    if (!satPlanet || !planets) return null;
    const rulerKey = TRAD_RULERS[satPlanet.signKey] || 'saturn';
    const isSelfRuled = (satPlanet.signKey === 'Capricorn' || satPlanet.signKey === 'Aquarius');
    const rulerPlanet = planets.find(p => p.key === rulerKey) || satPlanet;

    let rulerHouse = rulerPlanet.house || 1;
    if (window.SaturnPlacidus && cusps) {
      rulerHouse = window.SaturnPlacidus.getPlanetHousePlacidus(rulerPlanet.longitude, cusps, lat, cusps.armc, cusps.eps);
      rulerPlanet.house = rulerHouse;
    }

    const theme = RULER_THEMES[rulerKey] || RULER_THEMES.saturn;
    return {
      rulerKey, isSelfRuled, name: rulerPlanet.name, glyph: rulerPlanet.glyph,
      signKey: rulerPlanet.signKey, signName: rulerPlanet.signName,
      signLocative: SIGN_LOCATIVE[rulerPlanet.signKey] || rulerPlanet.signName,
      satSignLocative: SIGN_LOCATIVE[satPlanet.signKey] || satPlanet.signName,
      degreeInSign: rulerPlanet.degreeInSign || `${rulerPlanet.deg || 0}°`,
      house: rulerHouse, isRetrograde: Boolean(rulerPlanet.isRetrograde),
      power: theme.power, lesson: theme.lesson, actionTip: theme.actionTip, deepProtocol: theme.deepProtocol
    };
  }

  window.SaturnDispositor = { getSaturnDispositorInfo, SIGN_LOCATIVE };
})();
