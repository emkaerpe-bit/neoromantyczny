/**
 * NEOROMANTYCZNY — THE CHRONOS PROTOCOL (PART 1)
 * Standard Human Voice Engine v2.0 (Zafón Noir & Implicit Jung)
 */
(function () {
  window.SATURN_PROTOCOL_PART1 = {
    meta: {
      title: 'The Chronos Protocol: Protokół Przetrwania Powrotu Saturna',
      subtitle: 'Mapa wyjścia z progu 28–30 r.ż. bez strat w bliskości i własnym dorobku',
      author: 'Neoromantyczny Astra Engine',
      readingTime: '18 min lektury operacyjnej'
    },

    chapter1: {
      number: 'Rozdział I',
      title: 'Anatomia Kryzysu 28–30 Lat: Dlaczego Dawne Życie Musi Odejść',
      subtitle: 'Koniec pożyczonego czasu młodości i cichy rachunek pod nocną lampą',
      lead: 'Powrót Saturna nie jest ślepą zemstą losu. Jest chwilą, w której wygasa gwarancja na wszystkie pożyczone kompromisy i na stole zostaje tylko to, co stoi o własnych siłach.',
      sections: [
        {
          heading: '1. Koniec taryfy ulgowej wobec starych złudzeń',
          text: 'Przez pierwszą ćwierć wieku świat wybacza prowizorkę. Możesz wracać do mieszkania, w którym czujesz chłód obcego człowieka, albo podpisywać listy obecności w miejscu zjadającym Twoją dumę i nazywać to „etapem przejściowym”. Około dwudziestego dziewiątego roku życia Saturn zamyka jednak stary okrąg zegara dokładnie na tym samym stopniu nieba, na którym stał podczas Twojego pierwszego krzyku. Zrywa kredyt zaufania dany na wyrost i pyta cicho w półmroku korytarza, czy zamierzasz wreszcie zamieszkać we własnym życiu, czy dalej wynajmować pokój w cudzych oczekiwaniach.'
        },
        {
          heading: '2. Kiedy pożyczony kostium pęka w szwach',
          text: 'Między dwudziestym ósmym a trzydziestym rokiem życia wielu ludzi budzi się nagle w dobrze urządzonym salonie jak obcy gość po długim śnie. Patrzysz na klucze w przedpokoju, na partnera śpiącego obok albo na ekran biurowego monitora i czujesz zimny ucisk pod żebrami: „Czy to naprawdę moje imię widnieje na tych drzwiach?”. Wyćwiczony uśmiech noszony do ludzi i gładkie role szyte pod oklaski rodziców oraz szefów stają się za ciasne w ramionach. Saturn nie niszczy niczego, co było żywe — spala jedynie papierową dekorację, którą latami znieczulałeś własny niepokój.'
        },
        {
          heading: '3. Prawo czystego cięcia: oddaj dobrowolnie to, co już umarło',
          text: 'Najdroższym błędem tego przejścia jest paniczne trzymanie klamki za wszelką cenę: podtrzymywanie martwego związku ze strachu przed pustą niedzielą, wiązanie się długim kredytem z kimś, przy kim stygną Ci ręce, albo znoszenie upokorzeń przy biurku dla marnego spokoju. Czas ma jedną prostą regułę — czego sam nie odłożysz z honorem na półkę, to wiatr wyrwie z murów razem z oknami. Dojrzałość zaczyna się od wyprzedzenia ciosu i zamknięcia drzwi, zanim runie sufit.'
        }
      ]
    },

    chapter2: {
      number: 'Rozdział II',
      title: 'Pole Próby: Operacyjny Protokół dla Twojego Domu Kosmogramu',
      subtitle: 'Gdzie uderza ciężar zegara i jaki warunek otwiera bramę do nowego rozdziału',
      getHouseGuidelines: function (houseNum, houseData) {
        const hInfo = houseData || {};
        return {
          houseNumber: houseNum,
          houseName: hInfo.title || `${houseNum}. Dom`,
          battlefield: hInfo.area || 'Główny obszar życiowego rachunku',
          auditMandate: hInfo.audit || 'Bezlitosna próba fundamentów.',
          dangerZone: 'Ucieczka w stare uniki, zamykanie oczu na fakty pod warstwą taniej pociechy albo szukanie winnych na klatce schodowej zamiast przed własnym lustrem.',
          strategicVictory: hInfo.gift || 'Cichy autorytet, czyste granice i własny kręgosłup odporny na cudzy szantaż.'
        };
      }
    }
  };
})();
