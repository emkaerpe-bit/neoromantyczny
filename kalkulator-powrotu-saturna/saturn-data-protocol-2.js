/**
 * NEOROMANTYCZNY — THE CHRONOS PROTOCOL (PART 2: CHAPTER III & IV)
 * Dynamiczna strategia 1 vs 3 przejść oraz dźwignia dyspozytora bez duplikacji
 */
(function () {
  function fmtDate(d) {
    return d instanceof Date ? d.toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
  }

  function getChapter3(ctx, passes) {
    const isSingle = !passes || passes.length <= 1;
    if (isSingle) {
      const hitDate = passes && passes[0] ? fmtDate(passes[0].date) : 'wyznaczona data koniunkcji';
      return {
        number: 'Rozdział III',
        title: 'Strategia Pojedynczego Przejścia (Okno ~12 Tygodni)',
        subtitle: `Twój Saturn tranzytuje bez pętli wstecznej — jedna ścisła koniunkcja (${hitDate}) zamyka główne rozstrzygnięcia w około 3 miesiące.`,
        waves: [
          {
            phase: 'ETAP 1: WEJŚCIE W ORB ±5° (SYGNAŁ OSTRZEGAWCZY)',
            focus: 'Wczesne wychwycenie nieszczelnych zobowiązań, zanim zegar dojdzie do koniunkcji ścisłej.',
            dos: 'Spisz wszystkie otwarte zobowiązania zawodowe i finansowe; odetnij te, które utrzymujesz wyłącznie z przyzwyczajenia.',
            donts: 'Nie licz na powtórną rundę poprawkową z retrogradacji — przy pojedynczym przejściu sprawy zamykają się za pierwszym podejściem.'
          },
          {
            phase: `ETAP 2: SZCZYT KONIUNKCJI ±1°–2° (${hitDate.toUpperCase()})`,
            focus: 'Maksymalna koncentracja decyzji pod presją faktu dokonanego.',
            dos: 'Podejmuj kroki oparte na sprawdzonych liczbach i faktach; większe decyzje o rozstaniu albo zmianie branży odkładaj o 48 godzin na chłodną ocenę.',
            donts: 'Nie pal mostów pod wpływem nagłego wzburzenia w samym tygodniu ścisłego uderzenia.'
          },
          {
            phase: 'ETAP 3: SEPARACJA I WYJŚCIE Z ORBU ±5°',
            focus: 'Utrwalenie nowego układu dnia, stawek i granic w kolejnych miesiącach.',
            dos: 'Przekuj podjęte cięcia w stały rytm kalendarza i zamknij formalności urzędowe lub umowne.',
            donts: 'Nie wracaj do starych układów wyłącznie z sentymentu po opadnięciu pierwszego napięcia.'
          }
        ]
      };
    }

    const d1 = passes[0] ? fmtDate(passes[0].date) : 'Fala 1';
    const d2 = passes[1] ? fmtDate(passes[1].date) : 'Fala 2';
    const d3 = passes[2] ? fmtDate(passes[2].date) : 'Fala 3';
    return {
      number: 'Rozdział III',
      title: 'Strategia 3 Fal Tranzytu (Pętla Retrogradacji ~8–12 Miesięcy)',
      subtitle: 'Pełny cykl z ruchem wstecznym daje trzy oddzielne progi: diagnozę pęknięć, korektę kursu i ostateczną pieczęć.',
      waves: [
        {
          phase: `FALA 1: PIERWSZE WEJŚCIE (${d1.toUpperCase()})`,
          focus: 'Zobaczenie słabych punktów w strukturze życia, zanim sytuacja wymusi gwałtowną korektę.',
          dos: 'Uporządkuj rachunki, terminy oraz realny podział obowiązków w bliskich relacjach na papierze, zamiast opierać się na domysłach.',
          donts: 'Nie podpisuj pospiesznych, wieloletnich zobowiązań wyłącznie po to, by zagłuszyć niepokój pierwszych zmian.'
        },
        {
          phase: `FALA 2: KORYTARZ RETROGRADACJI (${d2.toUpperCase()})`,
          focus: 'Zatrzymanie biegu naprzód i rzetelna rewizja decyzji z ostatnich kilku miesięcy.',
          dos: 'Wróć do niedokończonych projektów, ureguluj zaległe rozliczenia i popraw błędy z pierwszej fali w ciszy roboczej.',
          donts: 'Powstrzymaj się przed trzaskaniem drzwiami w gniewie oraz rzucaniem posady bez przygotowanego zaplecza finansowego.'
        },
        {
          phase: `FALA 3: FINALNE DOMKNIĘCIE (${d3.toUpperCase()})`,
          focus: 'Zatwierdzenie trwałego standardu działania na kolejne lata bez pożyczonych podpórek.',
          dos: 'Spisz nowe zasady współpracy i dbaj o równe warunki w układach, w których stoisz ramię w ramię z drugą osobą.',
          donts: 'Nie zaglądaj wstecz do rozwiązań i znajomości, które definitywnie zamknęły się podczas poprzednich przejść.'
        }
      ]
    };
  }

  function getChapter4(ctx, dispInfo, satPlanet) {
    const f = ctx.facts;
    let principle = '';
    if (f.isSelfRuled) {
      principle = `Twój Saturn w znaku ${satPlanet.signName} włada samym sobą — nikt inny z zewnątrz nie przejmie roli rozjemcy. Cała dźwignia zmiany spoczywa na Twojej konsekwencji, organizacji tygodnia oraz umiejętności podjęcia decyzji bez czekania na zgodę autorytetu.`;
    } else if (f.mutualReception) {
      principle = `W Twoim wykresie zachodzi czynnik łagodzący (wzajemna recepcja z ${dispInfo ? dispInfo.name : 'władcą znaku'}): zamiast ślepej blokady otrzymujesz wyjście przez współpracę, układ dwustronny oraz wsparcie właściwej osoby we właściwej chwili.`;
    } else if (f.dispDignity === 'domicile' || f.dispDignity === 'exaltation') {
      principle = `Choć sam Saturn wymaga dyscypliny, jego władca (${dispInfo ? dispInfo.name : 'dyspozytor'}) ma mocną pozycję godnościową — to on dostarcza sprawczych narzędzi i otwiera drogę mądrych negocjacji.`;
    } else {
      principle = `Sam Saturn przynosi surową miarę, natomiast kierunek odblokowania napięcia wskazuje gospodarz jego znaku (${dispInfo ? dispInfo.name : 'dyspozytor'}). Gdy wzmacniasz tę planetę świadomym działaniem, kryzys przestaje być blokadą, a staje się pracą konstrukcyjną.`;
    }

    return {
      number: 'Rozdział IV',
      title: 'Dźwignia Dyspozytora i Zasilanie Odporności',
      subtitle: f.isSelfRuled ? 'Samodzielna instancja własnego standardu' : 'Skąd płynie realne wsparcie dla Twojego Saturna',
      corePrinciple: principle,
      deepAction: dispInfo ? dispInfo.deepProtocol : ''
    };
  }

  window.SATURN_PROTOCOL_PART2 = { getChapter3, getChapter4 };
})();
