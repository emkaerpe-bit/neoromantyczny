(function () {
  window.SATURN_PROTOCOL_PART1 = {
    meta: {
      title: 'The Chronos Protocol — Diagnostyka Powrotu Saturna',
      subtitle: 'Pełny plan operacyjny na przełom 28–30 roku życia',
      version: '2.0'
    },
    chapter1: {
      number: 'Rozdział I',
      title: 'Mechanika Pierwszego Powrotu Saturna (28–30 lat)',
      lead: 'Saturn zamyka pierwszy pełny obieg wokół Słońca co 29,4 roku i sprawdza, które decyzje podjąłeś świadomie, a które narzuciły Ci lęk, nawyk albo presja domu.',
      sections: [
        {
          heading: '1. Koniec życia na kredyt cudzych oczekiwań',
          text: 'W trzeciej dekadzie życia rozpadają się wyłącznie te konstrukcje zawodowe i relacyjne, które powstały z chęci zyskania cudzej aprobaty. Powrót Saturna wyłącza motywację opartą na unikaniu winy i zmusza do nazwania własnych priorytetów bez wymówek.'
        },
        {
          heading: '2. Rzeczywista cena spokoju i dyscypliny',
          text: 'Kryzys około dwudziestego dziewiątego roku życia dotyka konkretnych liczb: Twoich zarobków, kondycji kręgosłupa, jasności granic w związku oraz jakości codziennego kalendarza. Każdy niedomówiony kompromis domaga się teraz uczciwej wyceny.'
        },
        {
          heading: '3. Trzy etapy przejścia przez tranzyt',
          text: 'Najpierw wychodzą na jaw pęknięcia starych układów, potem podczas ruchu wstecznego porządkujesz zaległości, a w trzeciej fali zatwierdzasz nowe zasady dorosłości na następną dekadę.'
        }
      ]
    },
    chapter2: {
      number: 'Rozdział II',
      title: 'Analiza Sektora Życiowego',
      getHouseGuidelines: function (houseNum, houseData) {
        const h = houseData || {};
        return {
          houseName: h.title || ('Dom ' + houseNum + '.'),
          battlefield: h.area || 'Obszar codziennej odpowiedzialności i konkretnych decyzji.',
          auditMandate: h.meaning || 'W tym miejscu nawykowy lęk blokuje Twój naturalny autorytet do czasu postawienia wyraźnych granic.',
          dangerZone: h.audit || 'Utrzymywanie wygodnego kompromisu lub bezczynne odkładanie koniecznej rozmowy na później.',
          strategicVictory: h.gift || 'Trwała niezależność zbudowana na rzetelnych wynikach, spokojnych nerwach i szacunku do własnego czasu.'
        };
      }
    }
  };
})();
