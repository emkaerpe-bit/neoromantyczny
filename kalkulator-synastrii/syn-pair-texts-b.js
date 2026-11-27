(function () {
  window.__SYN_PAIR_TEXTS__ = window.__SYN_PAIR_TEXTS__ || {};
  const P = window.__SYN_PAIR_TEXTS__;
  const u = (ctx) => ctx.reactor.nom ? `u ${ctx.reactor.gen}` : 'po drugiej stronie';
  const aN = (ctx) => ctx.actor.nom || 'Pierwsza osoba';
  const rN = (ctx) => ctx.reactor.nom || 'druga osoba';

  P['venus-venus'] = (ctx, h) => h
    ? `Zgodność smaku, dotyku i tempa wieczoru. Lubicie podobne światło w pokoju, wspólny stół i sposób okazywania czułości.`
    : `Cicha rywalizacja o drobne przywileje albo inna miara tego, jak w praktyce wygląda uważny gest na co dzień.`;

  P['mars-venus'] = (ctx, h) => h
    ? `Klasyczny magnes przyciągania: inicjatywa ${ctx.actor.gen} i magnetyzm ${u(ctx)} nakręcają się bez jednego zbędnego słowa.`
    : `Wysokie napięcie w sypialni miesza się z zazdrością i tarciem o to, kto w tym tańcu nadaje tempo.`;

  P['jupiter-venus'] = (ctx, h) => h
    ? `Szczodrość serca, śmiech i chęć do wspólnego świętowania ponad szary tydzień.`
    : `Pokusa ucieczki przed zwykłym rachunkiem za mieszkanie i twardą rozmową w łatwe rozrywki na kredyt.`;

  P['saturn-venus'] = (ctx, h) => h
    ? `Wierność sprawdzona w trudniejszy czas, nie tylko latem. Uczucie nabiera tu ciężaru słowa danego na lata.`
    : `Lęk przed zranieniem chowa się za chłodną rezerwą — ${aN(ctx)} każe czekać z pełnym zaufaniem na twarde dowody.`;

  P['node-venus'] = (ctx, h) => h
    ? `Spotkanie otwierające serce po długiej ostrożności. Przy ${ctx.actor.ins} łatwiej uwierzyć, że warto odłożyć gardę na progu.`
    : `Łatwo tu pomylić dawny głód czułości z dorosłym wyborem — bliskość uczy Was odróżniać tęsknotę od faktów.`;

  P['mars-mars'] = (ctx, h) => h
    ? `Ten sam rytm kroku i apetytu w łóżku. Gdy ruszacie po wspólny cel, iskry lecą w dokładnie tę samą stronę.`
    : `Dwa uparte charaktery na jednym wąskim moście — bez wspólnego zadania szybko obracacie energię przeciw sobie.`;

  P['jupiter-mars'] = (ctx, h) => h
    ? `Odwaga podkręcona o stopień wyżej: razem skaczecie dalej i mniej boicie się śmiałych decyzji.`
    : `Brawura ponad miarę — w gniewie lub ryzyku podbijacie stawkę tak wysoko, że brakuje hamulców przed zakrętem.`;

  P['mars-saturn'] = (ctx, h) => h
    ? `Rozpęd dostaje wreszcie pewny ster i długi oddech: to układ zdolny przejść trudny okres bez pęknięcia.`
    : `Noga na gazie przy zaciągniętym hamulcu — zapał ${ctx.actor.gen} zderza się z kamienną ostrożnością ${u(ctx)}.`;

  P['mars-node'] = (ctx, h) => h
    ? `Impuls do ruchu naprzód dokładnie wtedy, gdy od dawna odkładało się jedną ważną decyzję.`
    : `Gorące spięcie uczy mówić „nie” prosto w oczy, bez chowania urazy za uprzejmym uśmiechem.`;

  P['jupiter-jupiter'] = (ctx, h) => h
    ? `Patrzycie z tego samego okna na ten sam horyzont — podobne zasady honoru, smaku wolności i sensu drogi.`
    : `Każde broni własnej racji z poczuciem wyższości zamiast sprawdzić, jak sprawa wygląda z drugiego krzesła.`;

  P['jupiter-saturn'] = (ctx, h) => h
    ? `Jedna osoba wnosi wiatr w żagle, druga trzyma mocny ster — rzadka równowaga marzenia z realnym planem.`
    : `Ciągłe przeciąganie liny między rozmachem a lękiem o jutro, dopóki obu stronom nie zabraknie cierpliwości.`;

  P['jupiter-node'] = (ctx, h) => h
    ? `Cichy pomyślny wiatr w dobrych drzwiach: obecność ${ctx.actor.gen} otwiera szerszy krąg ludzi i lepsze okazje.`
    : `Pokusa wiary w szczęśliwy traf bez odrobienia własnej, żmudnej lekcji przyziemnej konsekwencji.`;

  P['saturn-saturn'] = (ctx, h) => h
    ? `Ten sam szacunek dla czasu, rzetelnej pracy i słowa dotrzymanego bez świadków. Zero złudzeń, za to spokojne oparcie.`
    : `Podwójna surowość w czterech ścianach — bez świadomego wpuszczenia śmiechu życie łatwo zamienia się w sam obowiązek.`;

  P['node-saturn'] = (ctx, h) => h
    ? `Przymierze budujące kręgosłup na lata. Czas oddziela tu chwilowy zapał od prawdziwej lojalności.`
    : `Ciężar dawnych niedomkniętych spraw zmusza do wzięcia odpowiedzialności bez szukania drogi na skróty.`;

  P['node-node'] = (ctx, h) => h
    ? `Ten sam puls pokolenia i kierunek drogi: wyczuwacie podskórnie, przed czym uciekacie i czego szukacie za zakrętem.`
    : `Opozycja kierunków — to, co dla jednego jest bezpiecznym wczoraj, dla drugiego staje się progiem do nowego etapu.`;

  P['pluto-venus'] = (ctx, h) => h
    ? `Gęste przyciąganie fizyczne bez bezpiecznego dystansu. Kontakt, który głęboko zmienia spojrzenie na bliskość.`
    : `Silna wrażliwość na punkcie wyłączności i wpływu — intensywność wymaga tu jasnych granic oraz wzajemnego szacunku.`;

  P['mars-pluto'] = (ctx, h) => h
    ? `Mocny charakter i niegasnąca namiętność. Razem potraficie zachować zimną krew nawet w bardzo trudnej próbie.`
    : `Starcie dwóch bardzo silnych woli w łóżku i na co dzień — bez otwartej szczerości pasja zamienia się w ciche siłowanie.`;

  P['moon-pluto'] = (ctx, h) => h
    ? `Wzrok wyczuwający zmianę nastroju szybciej niż pytanie. Rozumiecie swoje lęki jeszcze zanim zapadnie cisza.`
    : `Silny głód wyłączności emocjonalnej: niepokój o zaufanie skłania ${ctx.actor.acc} do kontroli zamiast spokojnej rozmowy.`;

  P['pluto-sun'] = (ctx, h) => h
    ? `Spotkanie oczyszczające z pozorów. Przy ${ctx.actor.ins} łatwiej odłożyć udawane role i odkryć własną siłę.`
    : `Twardy opór dumy przed oddaniem choćby cala pola silniejszemu magnetyzmowi ${ctx.actor.gen}.`;

  P['lilith-venus'] = (ctx, h) => h
    ? `Klucz do skrywanej zmysłowości — przy zgaszonym świetle opadają sztywne konwenanse oraz wstydliwe bariery.`
    : `Napięcie między grzeczną rolą pokazywaną rodzinie a głodem bliskości, który domaga się uwagi po zmroku.`;

  P['lilith-mars'] = (ctx, h) => h
    ? `Surowy, autentyczny magnetyzm ciał bez zbędnej dyplomacji. Bliskość rodzi się tu spontanicznie i z pełną szczerością.`
    : `Wyraźny opór i prowokacja ze strony ${ctx.actor.gen}, gdy powtarzalny tydzień zaczyna odbierać Wam swobodę.`;

  P['lilith-moon'] = (ctx, h) => h
    ? `Przyjęcie tego, co trudne i niewypowiedziane — przy sobie możecie pozwolić na łzy i słabość bez wstydu.`
    : `Zderzenie potrzeby bezpiecznego domu z dzikim lękiem przed odrzuceniem, który wraca wieczorem.`;

  P['lilith-sun'] = (ctx, h) => h
    ? `Przyciąga tu bezkompromisowa niezależność od cudzych opinii i niechęć do grania grzecznej roli na pokaz.`
    : `Ciche sprawdzanie granic cierpliwości oraz prowokowanie dumy, zanim padnie szczere „dość”.`;

  P['lilith-pluto'] = (ctx, h) => h
    ? `Rzadka głębia porozumienia bez zasłon i bez lęku przed nazwaniem najtrudniejszych pragnień po imieniu.`
    : `Silne napięcie oparte na dyskrecji i niewypowiedzianych do końca emocjach, które wciągają od pierwszego wieczoru.`;
})();
