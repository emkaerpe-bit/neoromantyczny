/**
 * NEOROMANTYCZNY — SOLAR RETURN INTERPRETATION DATABASE (PART 3: MOON SIGNS, ASPECTS & RELOCATION)
 */
window.SOLAR_DATA = window.SOLAR_DATA || {};

window.SOLAR_DATA.MOON_SIGNS = {
  Aries: 'Księżyc Solariusza w Baranie daje nerwową niecierpliwość emocjonalną — reagujesz ostro i natychmiast, ale szybko puszczasz urazę, jeśli pozwolisz sobie na ruch i sport.',
  Taurus: 'Księżyc w Byku szuka w tym roku spokoju, dobrego jedzenia, dotyku i stabilności konta. Wyprowadzi Cię z równowagi każdy, kto próbuje na Tobie wymuszać pośpiech.',
  Gemini: 'Emocje wędrują przez głowę i rozmowy: potrzebujesz ludzi, z którymi można przegadać noc przy kuchennym stole, bo inaczej lęki kręcą się w kółko.',
  Cancer: 'Głęboka wrażliwość na dom, rodzinę i pamięć ciała. W tym roku bardziej niż zwykle czujesz atmosferę w pokoju, zanim ktokolwiek otworzy usta.',
  Leo: 'Księżyc w Lwie potrzebuje dumy, uznania i ciepła w miłości — nic nie boli w tym roku tak bardzo jak chłód i bycie traktowanym jak oczywistość.',
  Virgo: 'Układ nerwowy szuka kontroli przez porządek, listy zadań i dbanie o detale. Uważaj na zamartwianie się drobiazgami, na które nie masz wpływu.',
  Libra: 'Twoja emocjonalna równowaga w tym roku zależy od jakości codziennego dialogu i estetyki otoczenia — brzydkie konflikty odbierają Ci siły szybciej niż ciężka praca.',
  Scorpio: 'Rok głębokich emocjonalnych rewizji: powierzchowne relacje nudzą albo drażnią, rośnie intuicja i potrzeba absolutnej szczerości bez zasłony dymnej.',
  Sagittarius: 'Potrzebujesz przestrzeni, sensu i śmiechu nawet w trudnych tygodniach — zamknięcie w monotonii dusi Cię szybciej niż zwykle.',
  Capricorn: 'Chłodniejsza samokontrola: nawet w kryzysie trzymasz fason i załatwiasz sprawy, pamiętaj jednak, komu naprawdę możesz odłożyć zbroję.',
  Aquarius: 'Emocjonalny dystans i potrzeba niezależności: reagujesz alergicznie na kontrolę, a najlepszy oddech dają przyjaźnie bez ciężkich zobowiązań.',
  Pisces: 'Księżyc w Rybach otwiera sny, twórczość i empatię — granica między Twoim nastrojem a cudzym staje się cienka, więc pilnuj ciszy wieczorami.'
};

window.SOLAR_DATA.ASPECT_TONES = {
  conjunction: 'Fuzja energii (Koniunkcja): ten punkt Radixu jest włączony przez cały rok pod pełnym napięciem — bez miejsca na obojętność.',
  opposition: 'Polaryzacja i Lustro (Opozycja): napięcie rozgrywa się w relacji z drugim człowiekiem lub między pracą a domem; wymaga równowagi obu stron.',
  square: 'Tarcie i Kryzys Decyzyjny (Kwadratura): stara konstrukcja uwiera tak długo, aż zmienisz kurs. Tu leży główny przełom lub cena za bierność.',
  trine: 'Naturalny Przepływ (Trygon): drzwi otwierają się przy mniejszym oporze — wykorzystaj ten kanał świadomie, zamiast liczyć, że zrobi się sam.',
  sextile: 'Okno Szansy (Sekstyl): sprzyjająca okazja w kontaktach lub projektach, która zadziała, jeśli sam wykonasz pierwszy telefon.'
};

window.SOLAR_DATA.RELOCATION_PRESETS = [
  { name: 'Warszawa', country: 'Polska', lat: 52.2297, lon: 21.0122 },
  { name: 'Kraków', country: 'Polska', lat: 50.0647, lon: 19.9450 },
  { name: 'Gdańsk', country: 'Polska', lat: 54.3520, lon: 18.6466 },
  { name: 'Rzym', country: 'Włochy', lat: 41.9028, lon: 12.4964 },
  { name: 'Paryż', country: 'Francja', lat: 48.8566, lon: 2.3522 },
  { name: 'Lizbona', country: 'Portugalia', lat: 38.7223, lon: -9.1393 },
  { name: 'Londyn', country: 'Wielka Brytania', lat: 51.5074, lon: -0.1278 },
  { name: 'Nowy Jork', country: 'USA', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokio', country: 'Japonia', lat: 35.6762, lon: 139.6503 },
  { name: 'Denpasar (Bali)', country: 'Indonezja', lat: -8.6705, lon: 115.2126 }
];

window.SOLAR_DATA.getRelocHouseVerdict = function (srAscNatalHouse) {
  if ([1, 5, 9, 10, 11].includes(srAscNatalHouse)) {
    return {
      badge: 'Kąt Ekspansji i Widoczności',
      text: `Lokalizacja ustawia Ascendent roku w Twoim ${srAscNatalHouse}. domu urodzeniowym — to układ sprzyjający inicjatywie, rozpoznawalności i wyjściu z cienia.`
    };
  }
  if ([2, 3, 4, 7].includes(srAscNatalHouse)) {
    return {
      badge: 'Kąt Budowania Fundamentów',
      text: `Miasto pobytu kieruje oś roku w Twój ${srAscNatalHouse}. dom natalny — ciężar przesuwa się na konkretne zasoby, dom, umowy i relacje jeden-na-jeden.`
    };
  }
  return {
    badge: 'Kąt Pracy Wewnętrznej i Korekty (VI / VIII / XII)',
    text: `W tej szerokości geograficznej Ascendent roku wpada w Twój ${srAscNatalHouse}. dom urodzeniowy. Wymaga to wysokiej higieny psychicznej i porządkowania spraw zakulisowych — możesz sprawdzić sąsiednie strefy w symulatorze relokacji powyżej.`
  };
};
