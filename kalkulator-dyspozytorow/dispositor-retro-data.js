(function () {
  'use strict';
  window.__DISPOSITOR_RETRO_DATA__ = {
    PROFILES: {
      mars: {
        name: 'Marsa',
        archetype: 'Mars (Rx) • Wojownik',
        summary: 'Twoja złość nie wybucha od razu przy stole — cofa się do środka i zamienia w zimny, precyzyjny plan działania. Ludzie myślą, że odpuściłeś temat, tymczasem Ty właśnie przeliczasz długoterminowy koszt odwetu.',
        mechanics: 'Unikasz otwartego wrzasku, bo szkoda Ci energii na puste przepychanki słowne. Gdy ktoś wielokrotnie narusza Twoje granice, po prostu wycofujesz swoje wsparcie dokładnie w chwili, gdy druga strona najbardziej na nie liczy.',
        shadowWarning: 'Przełknięty sprzeciw osiada w spiętych barkach, zaciskaniu szczęki nocą i pasywnej agresji, która potrafi zamrozić atmosferę w całym zespole.',
        somaticReset: 'Mocny wysiłek fizyczny o krótkim interwale — sprint, podciąganie albo boksowanie worka, które rozładuje adrenalinę, zanim zamieni się w zawiść.'
      },
      venus: {
        name: 'Wenus',
        archetype: 'Wenus (Rx) • Dyplomata',
        summary: 'Nie kupujesz głośnych deklaracji ani szybkiej ekscytacji na pierwszej randce. Twoja sympatia dojrzewa powoli, często po cichu i z dala od oczu wspólnych znajomych.',
        mechanics: 'Zanim dopuścisz kogoś do prywatnego życia lub wspólnego budżetu, testujesz jego konsekwencję w zwykłych sytuacjach. Odpycha Cię sztuczny entuzjazm, który wyparowuje przy pierwszym prawdziwym problemie.',
        shadowWarning: 'Chroniczne sprawdzanie lojalności partnera i zamykanie emocji przed sobą samą w obawie przed wyjściem na naiwną.',
        somaticReset: 'Zadbaj o fizyczny komfort bez pośpiechu: spokojna kolacja bez telefonu i jedno proste zdanie o tym, czego realnie potrzebujesz w relacji.'
      },
      mercury: {
        name: 'Merkurego',
        archetype: 'Merkury (Rx) • Strateg',
        summary: 'Analizujesz cudze argumenty od końca i natychmiast widzisz luki logiczne, których reszta nie zauważa. Hałaśliwe spotkania grupowe wyłączają Twoją jasność myślenia.',
        mechanics: 'Najlepsza riposta przychodzi Ci do głowy dwadzieścia minut po wyjściu ze spotkania. Twoja pamięć archiwizuje dawne rozmowy niemal słowo po słowie, wyłapując różnicę między tym, co ktoś obiecał, a tym, co zrobił.',
        shadowWarning: 'Wielokrotne przepisywanie krótkiego maila z lęku przed nieścisłością oraz nocne odtwarzanie starych sporów w głowie.',
        somaticReset: 'Zostaw ekran, spisz trzy najważniejsze wnioski na zwykłej kartce, zamknij temat i wyjdź na kwadrans szybkiego spaceru.'
      },
      jupiter: {
        name: 'Jowisza',
        archetype: 'Jowisz (Rx) • Wizjoner',
        summary: 'Gotowe recepty na szczęście i modne hasła motywacyjne budzą w Tobie wyłącznie sceptycyzm. Twój kompas moralny musiał powstać na własnych błędach, inaczej mu nie ufasz.',
        mechanics: 'Rozwijasz się najlepiej wtedy, gdy nie musisz nikomu imponować na pokaz. Potrafisz zobaczyć szansę w projektach lub relacjach, które inni już skreślili, bo patrzysz przez własny system wartości.',
        shadowWarning: 'Poczucie cichej wyższości wobec osób żyjących bardziej konwencjonalnie, które w gruncie rzeczy maskuje strach przed publiczną porażką.',
        somaticReset: 'Wyjedź na dzień w miejsce, gdzie nikt Cię nie kojarzy, bez planu zwiedzania — przypomnij sobie skalę wykraczającą poza bieżące obowiązki.'
      },
      saturn: {
        name: 'Saturna',
        archetype: 'Saturn (Rx) • Architekt',
        summary: 'Twój najsurowszy szef nie pracuje w Twojej firmie — siedzi w Twojej własnej głowie i co wieczór wystawia Ci rachunek za każdą niedoróbkę.',
        mechanics: 'Na zewnątrz sprawiasz wrażenie osoby opanowanej i samowystarczalnej, ale w środku stale negocjujesz prawo do odpoczynku. Gdy oddzielasz realną odpowiedzialność od cudzych oczekiwań, zyskujesz niezłomny autorytet.',
        shadowWarning: 'Branie winy za cudze zaniedbania oraz sztywna surowość wobec własnych słabszych dni.',
        somaticReset: 'Świadomie rozluźnij kark, wypuść powietrze i zostaw dziś jedno zadanie celowo niedokończone do jutra.'
      },
      uranus: {
        name: 'Urana',
        archetype: 'Uran (Rx) • Reformator',
        summary: 'Nie ostrzegasz otoczenia przed zmianą kursu głośnymi kłótniami. Twoja potrzeba wolności zbiera napięcie pod skórą, aż podejmujesz nagłą, nieodwracalną decyzję.',
        mechanics: 'Potrafisz tygodniami znosić niewygodne zasady bez skargi, ale jednego poranka po prostu wypowiadasz umowę, zamykasz projekt albo zmieniasz plany bez konsultacji z kimkolwiek.',
        shadowWarning: 'Nagłe zrywanie bliskich relacji w momencie, gdy więź staje się bardziej przewidywalna i wymaga codziennej obecności.',
        somaticReset: 'Zimny prysznic na przedramiona i celowa zmiana jednego drobnego nawyku w ciągu dnia, by rozładować napięcie przed wybuchem.'
      },
      neptune: {
        name: 'Neptuna',
        archetype: 'Neptun (Rx) • Mistyk',
        summary: 'Szybko wyczuwasz fałsz w grzecznych uśmiechach i potrafisz przejrzeć manipulację, zanim ktokolwiek zda sobie sprawę, co się dzieje.',
        mechanics: 'Masz naturalną odporność na zbiorową panikę, choć własne lęki i niespełnione oczekiwania przeżywasz bardzo głęboko. Praca twórcza albo odosobnienie przywracają Ci równowagę po kontakcie z ludźmi.',
        shadowWarning: 'Branie własnego niepokoju za nieomylną intuicję oraz odkładanie trudnej rozmowy z obawy przed rozbiciem iluzji.',
        somaticReset: 'Zrób prostą czynność fizyczną od początku do końca — posprzątaj biurko albo ugotuj ciepły posiłek bez włączania rozpraszaczy.'
      },
      pluto: {
        name: 'Plutona',
        archetype: 'Pluton (Rx) • Alchemik',
        summary: 'Prawdziwe decyzje podejmujesz po cichu, bez świadków i zbędnych zwierzeń. Wiesz o swoich motywacjach rzeczy, których inni boją się przyznać nawet przed sobą.',
        mechanics: 'W sytuacjach kryzysowych nie panikujesz — rozkładasz problem na czynniki pierwsze i wyciągasz z niego pełną lekcję, nawet jeśli oznacza to bolesne zerwanie ze starym życiem.',
        shadowWarning: 'Szukanie ukrytych intencji w każdym geście partnera oraz trzymanie starych urazów jako argumentu na czarną godzinę.',
        somaticReset: 'Zapisz na kartce sytuację, na którą nie masz wpływu, przekreśl ją grubą linią i zamknij ten wątek przed snem.'
      },
      chiron: {
        name: 'Chirona',
        archetype: 'Chiron (Rx) • Uzdrowiciel',
        summary: 'Najbardziej wrażliwy obszar swojej historii chronisz za podwójną ścianą ironii albo nadmiernej opiekuńczości wobec innych ludzi.',
        mechanics: 'W ułamku sekundy rozpoznajesz cudzy kompleks czy wstyd, ponieważ znasz jego mechanizm z własnej przeszłości. Prawdziwy spokój odzyskujesz wtedy, gdy przestajesz leczyć wszystkich dokoła kosztem własnych granic.',
        shadowWarning: 'Wchodzenie w rolę cichego ratownika osób, które wolą Twoją pomoc od wzięcia odpowiedzialności za własne wybory.',
        somaticReset: 'Wypowiedz na głos jedną spokojną granicę bez dopisywania pięciu zdań usprawiedliwienia.'
      }
    }
  };
})();
