/**
 * NEOROMANTYCZNY — THE CHRONOS PROTOCOL (PART 1)
 * Psychologiczny raport przetrwania i transformacji w Powrocie Saturna (28–30 r.ż.)
 * Ramy: Psychologia humanistyczna C.G. Junga, Liz Greene i stoicyzm Marka Aureliusza
 */
(function () {
  window.SATURN_PROTOCOL_PART1 = {
    meta: {
      title: 'The Chronos Protocol: Protokół Przetrwania Powrotu Saturna',
      subtitle: 'Operacyjna mapa wyjścia z kryzysu 28–30 r.ż. bez strat relacyjnych i finansowych',
      author: 'Neoromantyczny Astra Engine',
      readingTime: '18 min lektury operacyjnej'
    },

    chapter1: {
      number: 'Rozdział I',
      title: 'Anatomia Kryzysu 28–30 Lat: Dlaczego Twoje Dawne Życie Musi Umrzeć',
      subtitle: 'Koniec 29-letniego cyklu dzieciństwa i bezwzględny rachunek rzeczywistości',
      lead: 'Powrót Saturna nie jest złośliwą karą kosmosu. Jest mechanicznym końcem gwarancji na Twoją młodość. Wszystko, co zbudowałeś na kompromisie z lękiem, zaczyna pękać.',
      sections: [
        {
          heading: '1. Zasada Rzeczywistości kontra Neurotyczne Iluzje',
          text: 'Do 28. roku życia społeczeństwo i Twoja psychika wybaczają Ci tymczasowość. Możesz tkwić w pracy, która Cię upokarza, tłumacząc sobie, że to tylko etap. Możesz spać z kimś, kogo nie szanujesz, udając, że to „skomplikowana relacja”. Około 29. roku życia Saturn (archetyp Chronosa — nieubłaganego Władcy Czasu) staje w tym samym stopniu zodiaku, w którym był w chwili Twojego pierwszego oddechu. Odcina kredyt zaufania. Odbiera złudzenie, że masz nieskończenie wiele czasu na zostanie tym, kim miałeś być.'
        },
        {
          heading: '2. Pęknięcie Pancerza Społecznego (Persona Cracking)',
          text: 'Pomiędzy 28. a 30. rokiem życia większość ludzi doświadcza nagłego, dojmującego poczucia obcości we własnym życiu. Rozglądasz się po swoim mieszkaniu, patrzysz na twarz partnera w łóżku, otwierasz arkusz kalkulacyjny w pracy i czujesz lodowaty ucisk w klatce piersiowej: „Czy to naprawdę wszystko? Czy to jestem ja?”. Jung nazywał to załamaniem Persony. Maski, które zakładałeś, by zadowolić rodziców, partnerów i przełożonych, stają się za ciasne. Saturn nie niszczy Twojego życia — niszczy jedynie kłamstwa, którymi się znieczulałeś.'
        },
        {
          heading: '3. Reguła Złotego Cięcia: Kto nie odejdzie dobrowolnie, zostanie odcięty',
          text: 'Podstawowy błąd popełniany w trakcie powrotu Saturna to paniczne próby ratowania tego, co gnije: kurczowe trzymanie się toksycznego związku ze strachu przed samotnością, branie kredytu hipotecznego z niewłaściwą osobą lub przymykanie oczu na manipulacje w pracy. Saturn ma jedną żelazną zasadę: jeśli sam nie odetniesz tego, co nieautentyczne, tranzyt wyrwie to z korzeniami, zostawiając zgliszcza. Dojrzałość polega na wyprzedzeniu ciosu i dobrowolnej rezygnacji z infantylnych korzyści.'
        }
      ]
    },

    chapter2: {
      number: 'Rozdział II',
      title: 'Pole Bitwy: Operacyjny Protokół dla Twojego Domu Kosmogramu',
      subtitle: 'Gdzie uderza fala audytu i jaki jest jedyny warunek zaliczenia egzaminu dojrzałości',
      getHouseGuidelines: function (houseNum, houseData) {
        const hInfo = houseData || {};
        return {
          houseNumber: houseNum,
          houseName: hInfo.title || `${houseNum}. Dom`,
          battlefield: hInfo.area || 'Główny sektor egzystencjalny',
          auditMandate: hInfo.audit || 'Próba ognia fundamentów.',
          dangerZone: 'Próba ucieczki w stare nawyki obronne, przerzucanie winy na otoczenie lub pudrowanie kryzysu powierzchownym optymizmem.',
          strategicVictory: hInfo.gift || 'Trwały autorytet, niezłomna suwerenność i zaufanie do własnych granic.'
        };
      }
    }
  };
})();
