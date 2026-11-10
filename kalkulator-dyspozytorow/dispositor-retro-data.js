/**
 * NEOROMANTYZM — ARCHITEKTURA DYSPOZYTORÓW: PROFIL RETROGRADACJI WŁADCY (Rx)
 * Standard: Psychologia głębi C.G. Junga, Marc Edmund Jones, Robert Hand
 */
(function () {
  'use strict';

  window.__DISPOSITOR_RETRO_DATA__ = window.__DISPOSITOR_RETRO_DATA__ || {};

  const PROFILES = {
    mars: {
      name: 'Mars (Rx)',
      archetype: 'Wojownik Skupionego Ognia • Zinternalizowana Wola',
      summary: 'W Twoim horoskopie Mars — ostateczny dyspozytor / władca decyzyjny — porusza się w ruchu wstecznym. Twoja wola, odwaga i napęd życiowy nie operują w trybie prymitywnego ataku czy natychmiastowej ekspresji w świecie.',
      mechanics: 'Podczas gdy klasyczny Mars natychmiast forsuje przeszkodę, Mars Rx bada teren, wycofuje się na z góry upatrzone pozycje i uderza z chirurgiczną precyzją dopiero wtedy, gdy ma 100% pewności. Nie tracisz sił na bezsensowne awantury i demonstracje siły. Twoja sprawczość jest skumulowana, strategiczna i niepodatna na prowokacje.',
      shadowWarning: 'Głównym zagrożeniem Marsa Rx jest autoagresja i tłumienie słusznego gniewu. Niewyrażona złość obraca się przeciwko ciału (napięcia karku, żołądka, stany zapalne), wywołując paraliż decyzyjny lub nagłe wybuchy po tygodniach milczenia.',
      somaticReset: 'Nigdy nie duś frustracji w nadziei, że sama zniknie. Wykorzystaj intensywny, uziemiający ruch fizyczny (krótki sprint, siłownia, zimny prysznic) lub spisz gniew na kartce bez cenzury, by rozładować układ nerwowy.'
    },
    venus: {
      name: 'Wenus (Rx)',
      archetype: 'Suwerenna Estetyka & Miłość Introwertyczna',
      summary: 'Wenus — instancja wartości i stylu więzi — cofa się po ekliptyce. Twój styl kochania, poczucie piękna i definicja godności są całkowicie uniezależnione od trendów społecznych i cudzego poklasku.',
      mechanics: 'Nie potrafisz wchodzić w powierzchowne sojusze towarzyskie ani uprawiać sztucznego flirtu. Uczucia dojrzewają powoli, w ciszy, i wymagają absolutnego zaufania. Cenisz jakość ponad ilość i wybierasz relacje, które rezonują z Twoją duszą.',
      shadowWarning: 'Cieniem Wenus Rx jest podświadomy lęk przed emocjonalnym odrzuceniem i poczucie bycia „nieprzystosowanym do współczesnej miłości”. Ucieczka w emocjonalny chłód z obawy przed zranieniem.',
      somaticReset: 'Nie zmuszaj się do towarzyskiego konformizmu. Zapewnij sobie bezpieczną, kojącą przestrzeń zmysłową i pielęgnuj relacje z ludźmi, którzy nie wywierają na Ciebie pośpiechu.'
    },
    mercury: {
      name: 'Merkury (Rx)',
      archetype: 'Architekt Autonomicznego Umysłu • Głęboka Synteza',
      summary: 'Merkury — filtr poznawczy i logiczny — znajduje się w retrogradacji. Twój intelekt nie działa w trybie powierzchownej paplaniny ani szablonowego przyswajania faktów.',
      mechanics: 'Zanim odpowiesz, Twój umysł przetwarza bodźce na wielu poziomach podświadomości. Tworzysz własny, precyzyjny aparat pojęciowy. Posiadasz dar widzenia anomalii i ukrytego fałszu, których inni nie dostrzegają.',
      shadowWarning: 'Ruminacje i paraliż analityczny. Odtwarzanie minionych rozmów w nieskończoność w głowie, analizując co można było ująć lepiej. Wątpienie we własny głos przez nieliniowy styl myślenia.',
      somaticReset: 'Żelazna zasada: zero analiz po 21:00. Każdy natłok myśli wyrzucaj na papier techniką strumienia świadomości, zamykając notes przed snem.'
    },
    jupiter: {
      name: 'Jowisz (Rx)',
      archetype: 'Wewnętrzny Filozof & Suwerenny Kompas Moralny',
      summary: 'Główna oś ekspansji i poczucia sensu (Jowisz) jest zorientowana do wewnątrz. Nie potrzebujesz zewnętrznych instytucji ani poradników sukcesu, by wiedzieć, co jest słuszne.',
      mechanics: 'Szczęście i rozwój są dla Ciebie stanem wewnętrznej spójności, a nie liczbą polubień czy statusem. Posiadasz wrodzony sceptycyzm wobec taniego optymizmu i łatwych recept na życie.',
      shadowWarning: 'Poczucie duchowego wyobcowania, cynizm wobec ludzkich aspiracji oraz trudność w czerpaniu radości ze zwykłych, doczesnych sukcesów.',
      somaticReset: 'Dziel się swoim wglądem bez poczucia wyższości. Pozwól sobie na beztroskę i celebrację małych, fizycznych przyjemności dnia codziennego.'
    },
    saturn: {
      name: 'Saturn (Rx)',
      archetype: 'Wewnętrzny Sędzia & Autonomia Odpowiedzialności',
      summary: 'Saturn jako dyspozytor przenosi cały ciężar dyscypliny i prawa do wnętrza Twojej psychiki. Nie potrzebujesz zewnętrznego nadzorcy — Twój własny krytyk jest surowszy niż ktokolwiek z zewnątrz.',
      mechanics: 'Niezrównana wytrwałość, etyka i szacunek dla prawdy budowanej latami. Tworzysz fundamenty obliczone na pokolenia. Posiadasz żelazną odporność na presję otoczenia.',
      shadowWarning: 'Chroniczny syndrom oszusta, niezdolność do odpuszczenia kontroli, poczucie winy przy każdym odpoczynku oraz dźwiganie problemów innych ludzi.',
      somaticReset: 'Odpoczynek to obowiązek higieniczny, a nie nagroda za wycieńczenie. Zaplanuj w kalendarzu nienaruszalne bloki bezruchu i naucz się delegować odpowiedzialność.'
    },
    uranus: {
      name: 'Uran (Rx)',
      archetype: 'Cichy Rewolucjonista & Suwerenna Oryginalność',
      summary: 'Ostateczna siła wolności (Uran) nie manifestuje się przez krzykliwy bunt. Rewolucja odbywa się w fundamentach Twojej psychiki.',
      mechanics: 'Absolutna niezależność intelektualna. Widzisz trendy lata przed ich nadejściem, zachowując chłodny dystans do mód i zachowań stadnych.',
      shadowWarning: 'Nagłe odcinanie bliskich ludzi bez wyjaśnienia w panicznej obronie wolności; alienacja i lęk przed trwałym zobowiązaniem.',
      somaticReset: 'Prawdziwa suwerenność nie wymaga ucieczki w samotność. Buduj relacje oparte na przejrzystych regułach przestrzeni osobistej.'
    },
    neptune: {
      name: 'Neptun (Rx)',
      archetype: 'Przenikacz Iluzji & Autentyczny Mistyk',
      summary: 'Neptun w retrogradacji jako dyspozytor nie pozwala Ci uciekać w naiwne mrzonki. Jesteś żywym detektorem duchowej i emocjonalnej hipokryzji.',
      mechanics: 'Niezwykła intuicja i zdolność do czytania podtekstów. Wyobraźnia staje się precyzyjnym narzędziem psychologicznego wglądu w motywacje drugiego człowieka.',
      shadowWarning: 'Emocjonalne przebodźcowanie, wchłanianie cierpienia otoczenia jak gąbka i ucieczka w zgorzknienie lub odrętwienie.',
      somaticReset: 'Woda i samotność: kąpiel w soli, spacery nad wodą i całkowity detoks od mediów społecznościowych w chwilach przeciążenia.'
    },
    pluto: {
      name: 'Pluton (Rx)',
      archetype: 'Wewnętrzny Alchemik & Mistrz Samokontroli',
      summary: 'Pluton jako władca w retrogradacji skupia całą energię regeneracji wewnątrz ego. Twoim celem jest absolutna suwerenność nad własnym cieniem.',
      mechanics: 'Niewiarygodna siła odradzania się po życiowych kataklizmach. Kryzysy nie łamią Cię, lecz wypalają to, co fałszywe, dając podwojoną siłę.',
      shadowWarning: 'Paranoiczna podejrzliwość, niezdolność do okazania bezbronności nawet wobec najbliższych oraz lęk przed utratą kontroli nad emocjami.',
      somaticReset: 'Bezbronność to odwaga, nie słabość. Znajdź jedną zaufaną przestrzeń, w której możesz odłożyć zbroję bez walki o przetrwanie.'
    },
    chiron: {
      name: 'Chiron (Rx)',
      archetype: 'Zintegrowany Uzdrowiciel • Mądrość Rany',
      summary: 'Chiron w retrogradacji jako szczyt struktury psychiki przetrawia zranienie w intymnej ciszy, stając się źródłem niewyczerpanej empatii.',
      mechanics: 'Potrafisz prowadzić innych przez najciemniejsze zakamarki ich psychiki, ponieważ znasz ten ból od podszewki.',
      shadowWarning: 'Zamykanie się w twierdzy dumy i odmowa przyjęcia wsparcia, gdy sam jesteś wyczerpany.',
      somaticReset: 'Pozwól sobie na przyjęcie opieki. Przełamanie schematu „muszę radzić sobie sam” jest Twoim kluczem do pełni.'
    }
  };

  window.__DISPOSITOR_RETRO_DATA__.PROFILES = PROFILES;
})();
