(function () {
  window.SATURN_HOUSES_DATA = window.SATURN_HOUSES_DATA || {};

  const HOUSES_PART_1 = {
    1: {
      house: 1,
      title: 'Tożsamość, Ciało i Pierwsze Wrażenie',
      area: 'Postawa życiowa, granice fizyczne, sposób wchodzenia w pokój oraz energia organizmu.',
      meaning: 'Długo nosisz napięcie nakazujące kontrolować każde wrażenie na swój temat. Spontaniczność bywa tłumiona przez cenzurę wizerunku i obawę przed śmiesznością.',
      audit: 'Tranzyt rozmontowuje role przyjęte dla świętego spokoju lub awansu. Spadek energii i kryzys dotychczasowej marki osobistej wymuszają pokazanie prawdziwej twarzy.',
      gift: 'Odzyskujesz spokojną obecność w ciele, naturalny ciężar głosu i jasność co do tego, kim jesteś poza cudzymi oczekiwaniami.',
      battlefieldScenario: 'Wizerunek przestaje działać jak tarcza: organizm reaguje napięciem karku lub zmęczeniem zawsze wtedy, gdy zgadzasz się na rolę niezgodną z temperamentem.',
      costlyMistake: 'Podkręcanie dyscypliny na pokaz i branie kolejnych zobowiązań wyłącznie po to, żeby utrzymać pozory niezłomnej dyspozycyjności.',
      operationalProtocol: 'Wprowadź stały rytm snu i regeneracji, zanim wyznaczysz nowy cel zawodowy; w pierwszych minutach spotkań mów wprost o własnych warunkach.',
      relationalImpact: 'Bliscy przestają obcować z perfekcyjnym awatarem, co na początku budzi zdziwienie, ale wreszcie dopuszcza prawdziwą ulgę i zaufanie.'
    },
    2: {
      house: 2,
      title: 'Pieniądze, Zasoby i Poczucie Wartości',
      area: 'Zarobki własne, wycena pracy, budżet osobisty i materialne poczucie bezpieczeństwa.',
      meaning: 'W relacji z pieniędzmi pojawia się wahanie między zaniżaniem stawek ze strachu przed odmową a nerwowym chomikowaniem oszczędności bez ulgi.',
      audit: 'Przychodzi twardy egzamin z wyceny własnego czasu: zaniżone kontrakty, darmowe nadgodziny lub zależność finansowa od otoczenia przestają być znośne.',
      gift: 'Budujesz stabilną autonomię opartą na uczciwych stawkach, płynności finansowej oraz szacunku do efektów swojej pracy.',
      battlefieldScenario: 'Koszty życia i presja płynności bezlitośnie obnażają projekty robione poniżej progu opłacalności oraz lęk przed podaniem konkretnej kwoty.',
      costlyMistake: 'Zaciąganie pośpiesznych zobowiązań albo łatanie stresu impulsywnymi zakupami zamiast policzenia realnego bilansu miesiąca.',
      operationalProtocol: 'Zaktualizuj cennik swoich usług do stawek rynkowych, odetnij niedochodowe zlecenia i odłóż żelazną rezerwę na minimum pół roku wydatków.',
      relationalImpact: 'Rozmowy o podziale kosztów i wspólnym budżecie wychodzą ze strefy milczenia; znikają ciche pretensje o niedocenienie wkładu.'
    },
    3: {
      house: 3,
      title: 'Komunikacja, Umysł i Bliskie Otoczenie',
      area: 'Codzienne rozmowy, pisemne ustalenia, więzi z rodzeństwem oraz higiena uwagi.',
      meaning: 'Obawa przed powiedzeniem czegoś nieścisłego sprawia, że w ważnych dyskusjach milkniesz albo uciekasz w dygresje i wielokrotne poprawianie krótkiej wiadomości.',
      audit: 'Saturn w tym sektorze wymusza uporządkowanie korespondencji, wyjaśnienie zadawnionych sporów sąsiedzkich lub rodzinnych i naukę krótkiej odmowy.',
      gift: 'Każde zdanie zyskuje precyzję zobowiązania, a umysł utrzymuje długie skupienie bez rozpraszania na dziesiątki bodźców.',
      battlefieldScenario: 'Niedomówienia w mailach, chaos w papierach i przewlekłe plotki w najbliższym kręgu wywołują kryzys wymagający stanowczego ucięcia.',
      costlyMistake: 'Tłumaczenie każdej odmowy na trzy strony lub szukanie idealnego sformułowania tak długo, aż termin sam przepadnie.',
      operationalProtocol: 'Zapisuj warunki współpracy w punktach zaraz po rozmowie, wycisz zbędne powiadomienia i zamknij zaległą korespondencję urzędową.',
      relationalImpact: 'Otoczenie wie dokładnie, na czym stoi; powierzchowne znajomości oparte na samym gadaniu ustępują miejsca konkretnym rozmowom.'
    },
    4: {
      house: 4,
      title: 'Dom, Korzenie i Emocjonalne Fundamenty',
      area: 'Prywatna przestrzeń życia, historia rodzinna, wzorce z dzieciństwa i poczucie zakorzenienia.',
      meaning: 'Dźwigasz niewidoczny dług wobec przekonań wyniesionych z domu: bierzesz na siebie cudze nastroje lub masz kłopot z uznaniem własnego mieszkania za bezpieczny azyl.',
      audit: 'Okres przejścia przynosi przełom wokół adresu, własności albo granic wobec rodziców. Rodzinne nawyki lojalności przechodzą sprawdzian dorosłej niezależności.',
      gift: 'Stawiasz własny dom psychiczny i fizyczny na klarownych zasadach, uwalniając się od powielania dawnych kryzysów rodu.',
      battlefieldScenario: 'Napięcia w sprawie nieruchomości, przeprowadzki lub oczekiwań starszego pokolenia wyciągają na wierzch dawne poczucie winy dziecka.',
      costlyMistake: 'Poświęcanie własnego spokoju pod dachem w imię niepisanej zasady, że dobremu członkowi rodziny nie wypada stawiać oporu.',
      operationalProtocol: 'Ureguluj kwestie najmu, kredytu lub własności na papierze i wprowadź konkretne zasady częstotliwości oraz tematyki kontaktów rodzinnych.',
      relationalImpact: 'Przestajesz przenosić stare domowe napięcia na aktualnego partnera; mieszkanie zamienia się w realną bazę odpoczynku.'
    },
    5: {
      house: 5,
      title: 'Twórczość, Bliskość i Prawo do Radości',
      area: 'Osobista ekspresja, randkowanie, własne dzieła oraz odpowiedzialność za opiekę i zabawę.',
      meaning: 'Wewnętrzny cenzor blokuje beztroskę: trudno robić coś dla czystej radości bez natychmiastowego sprawdzania, czy to ma zysk, sens albo wysoką ocenę.',
      audit: 'Sprawdzian dotyka układów bez przyszłości, odkładanych na później projektów autorskich albo dojrzałych decyzji dotyczących rodzicielstwa.',
      gift: 'Odkrywasz głęboką, spokojną satysfakcję z własnego dzieła i relacji, potrafiąc cieszyć się bliskością bez poczucia winy.',
      battlefieldScenario: 'Ulatuje lekkość z relacji utrzymywanych z nudy, a odkładana latami twórczość zaczyna uwierać jako niespełniona obietnica wobec siebie.',
      costlyMistake: 'Zamienianie każdej pasji w wyczerpujący egzamin z perfekcji albo trwanie w jednostronnym zauroczeniu dla podbicia samooceny.',
      operationalProtocol: 'Zarezerwuj stały blok w tygodniu wyłącznie na własny projekt bez oceniania rezultatu i angażuj się wyłącznie tam, gdzie widać wzajemność.',
      relationalImpact: 'Randkowanie i bliskość tracą cechy gry o uwagę; miejsce przelotnych uniesień zajmuje szczera obecność.'
    },
    6: {
      house: 6,
      title: 'Codzienna Praca, Zdrowie i Nawyki',
      area: 'Organizacja dnia, rytm obowiązków, kondycja fizyczna, profilaktyka oraz relacje w zespole.',
      meaning: 'Łatwo wpadasz w pracoholizm napędzany poczuciem winy albo w odwrotny paraliż, gdy lista zadań na biurku wydaje się zbyt przytłaczająca.',
      audit: 'Organizm wystawia rachunek za lata krótkiego snu, ignorowania stresu i brania na siebie pracy całego działu. Konieczna staje się przebudowa kalendarza.',
      gift: 'Zdobywasz warsztat rzemieślnika i spokojną dyscyplinę, która chroni zdrowie oraz pozwala dowozić złożone zadania bez wypalenia.',
      battlefieldScenario: 'Przewlekłe zmęczenie, konflikty o podział zadań w firmie lub spadek odporności zmuszają do zatrzymania chaotycznego trybu pracy.',
      costlyMistake: 'Dokładanie kolejnych godzin przy biurku kosztem badań lekarskich i snu w złudnej nadziei, że ciało wytrzyma wszystko.',
      operationalProtocol: 'Ustal twardą godzinę zamknięcia komputera, przekaż zadania rutynowe innym osobom i wpisz badania profilaktyczne w stały kalendarz.',
      relationalImpact: 'Współpracownicy uczą się szanować Twoje granice dostępności, a po pracy zostaje prawdziwa uwaga dla domu.'
    }
  };

  Object.assign(window.SATURN_HOUSES_DATA, HOUSES_PART_1);
})();
