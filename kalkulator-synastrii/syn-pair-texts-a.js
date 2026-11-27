(function () {
  window.__SYN_PAIR_TEXTS__ = window.__SYN_PAIR_TEXTS__ || {};
  const P = window.__SYN_PAIR_TEXTS__;
  const u = (ctx) => ctx.reactor.nom ? `u ${ctx.reactor.gen}` : 'po drugiej stronie';
  const aN = (ctx) => ctx.actor.nom || 'Pierwsza osoba';
  const rN = (ctx) => ctx.reactor.nom || 'druga osoba';

  P['sun-sun'] = (ctx, h) => h
    ? `Dwa wyraźne charaktery przy jednym stole bez walki o krzesło. Pewność siebie ${ctx.actor.gen} naturalnie wzmacnia odwagę ${u(ctx)}.`
    : `Zderzenie dwóch silnych ego o własny wpływ. Gdy brakuje jasnego podziału ról, ${aN(ctx)} i ${rN(ctx)} zaczynają przygaszać swoją inicjatywę.`;

  P['moon-sun'] = (ctx, h) => h
    ? `Spokojne dopełnienie dnia i nocy: pewność ${ctx.actor.gen} daje ciepłe oparcie wrażliwości ${u(ctx)}.`
    : `Twarda duma zderza się z potrzebą troski. Kiedy ${aN(ctx)} idzie po swoje bez słowa wyjaśnienia, ${rN(ctx)} łatwo zamyka się z poczucia chłodu.`;

  P['mercury-sun'] = (ctx, h) => h
    ? `Rozmowa płynie lekko, jakbyście kończyli myśli w pół zdania. Słowo ${ctx.actor.gen} porządkuje to, co ${u(ctx)} jeszcze rano wydawało się mgliste.`
    : `Spór o to, czyje zdanie zamyka rozmowę. Jedna wypowiedź brzmi jak pouczenie, a druga jak lekceważenie faktów.`;

  P['sun-venus'] = (ctx, h) => h
    ? `Naturalna sympatia i ciepło bez udawania kogokolwiek. W tym towarzystwie najzwyklejszy wieczór w domu smakuje jak małe święto.`
    : `Pokusa utrzymania ładnej zgody kosztem przemilczanej zadry. Z pozoru jest miło, dopóki drobna uwaga nie przeleje czary.`;

  P['mars-sun'] = (ctx, h) => h
    ? `Żywa energia i wzajemna mobilizacja od rana do wieczora. Impuls ${ctx.actor.gen} budzi odwagę i chęć działania ${u(ctx)}.`
    : `Iskra rzucona na suche drewno — namiętność szybko przechodzi tu w spór o to, kto tu prowadzi i stawia kropkę.`;

  P['jupiter-sun'] = (ctx, h) => h
    ? `Powiew wolności i wiary we wspólne plany. Przy ${ctx.actor.ins} rośnie poczucie humoru i apetyt na odważniejsze decyzje.`
    : `Hojne obietnice rzucane ponad winem, po których w zwykły wtorek brakuje konkretnego planu i pilnowania rachunków.`;

  P['saturn-sun'] = (ctx, h) => h
    ? `Mocny grunt pod stopami — przy tym układzie słowo ${ctx.actor.gen} nie pęka nawet przy poważnym kryzysie w środku zimy.`
    : `Cień surowej oceny: ${rN(ctx)} może odbierać powagę ${ctx.actor.gen} jak chłodny dystans, który gasi spontaniczną czułość.`;

  P['node-sun'] = (ctx, h) => h
    ? `Ważne spotkanie, które wyraźnie zmienia kierunek dalszej drogi. Obecność ${ctx.actor.gen} budzi ${u(ctx)} gotowość do dojrzałej decyzji.`
    : `Koniec wygodnych wymówek: kontakt z ${ctx.actor.ins} wybija ze starych nawyków szybciej, niż się spodziewacie.`;

  P['moon-moon'] = (ctx, h) => h
    ? `Ten sam rytm ciszy i odpoczynku w mieszkaniu. Bez długich tłumaczeń czujecie, kiedy trzeba porozmawiać, a kiedy posiedzieć obok siebie.`
    : `Dwa różne odruchy w stresie — to, co ${aN(ctx)} chce od razu przegadać, ${rN(ctx)} woli przemilczeć w osobnym pokoju.`;

  P['mercury-moon'] = (ctx, h) => h
    ? `Rzadka zdolność nazwania cudzej tęsknoty bez ranienia. Słowa ${ctx.actor.gen} trafiają prosto w sedno nastroju ${u(ctx)}.`
    : `Rozbieranie łez na suche argumenty. Logika ${ctx.actor.gen} rani tu miękkie serce ${u(ctx)} swoją chłodną precyzją.`;

  P['moon-venus'] = (ctx, h) => h
    ? `Miękka czułość i zapach czystej pościeli po długim dniu. Przy ${ctx.actor.ins} dom naprawdę leczy zmęczenie.`
    : `Inne oczekiwania wobec bliskości: jedno szuka ciepłego uścisku w kuchni, drugie ładnej oprawy i odrobiny dystansu.`;

  P['mars-moon'] = (ctx, h) => h
    ? `Silny instynkt opiekuńczy i żywe pragnienie bliskości. Impuls ${ctx.actor.gen} daje ${ctx.reactor.dat} poczucie, że nie zostanie bez wsparcia.`
    : `Ostre słowo rzucone w nerwach przez ${ctx.actor.acc} trafia prosto w czuły punkt ${u(ctx)}, zanim opadną emocje.`;

  P['jupiter-moon'] = (ctx, h) => h
    ? `Szerokie ramiona i pamięć wolna od małostkowego wypominania błędów. Przy sobie łatwiej oddychać pełną piersią.`
    : `Nadmiar dobrych chęci zalewa cały pokój, a wielkie gesty opieki czasem rozmywają się pod koniec zwykłego tygodnia.`;

  P['moon-saturn'] = (ctx, h) => h
    ? `Pewna kotwica w trudnej pogodzie. Kiedy inni tracą głowę w nerwach, lojalność ${ctx.actor.gen} trzyma Wasz dom w spokoju.`
    : `Obowiązek staje wyżej niż czuła dłoń — pragnienie ciepła odbija się nieraz od chłodnego opanowania ${ctx.actor.gen}.`;

  P['moon-node'] = (ctx, h) => h
    ? `Nagłe poczucie bliskości od pierwszego uścisku dłoni, jakbyście znali swój rytm od dawna.`
    : `Splot dawnych przyzwyczajeń wypycha Was ze starych ról rodzinnych w stronę bardziej świadomej więzi.`;

  P['mercury-mercury'] = (ctx, h) => h
    ? `Te same aluzje w locie i długie rozmowy bez patrzenia na zegarek. Rozumiecie swoje żarty po dwóch słowach.`
    : `W kłótni przerzucacie się celnymi szpilami — bardziej słychać wtedy ton głosu niż prawdziwy żal pod spodem.`;

  P['mercury-venus'] = (ctx, h) => h
    ? `Ciepłe słowa i wiadomości zostające w pamięci na lata. Sama rozmowa między Wami potrafi brzmieć jak pieszczota.`
    : `Owijanie trudnej prawdy w zbyt grzeczne słowa, żeby tylko nie zepsuć nastroju przy wieczornej kolacji.`;

  P['mars-mercury'] = (ctx, h) => h
    ? `Szybki dowcip i myśl, która od razu zamienia się we wspólny krok za drzwi bez długiego wahania.`
    : `Ostra ironia ${ctx.actor.gen} w gniewie tnie głębiej niż krzyk — trudno potem cofnąć zdanie rzucone z uśmiechem.`;

  P['jupiter-mercury'] = (ctx, h) => h
    ? `Nocne dyskusje otwierające głowę na nowe plany. Przy sobie uczycie się patrzeć szerzej na wspólne sprawy.`
    : `Przeskakiwanie zwykłych faktów dla wielkich tez — spór o rację zamiast uważnego słuchania drugiej strony.`;

  P['mercury-saturn'] = (ctx, h) => h
    ? `Słowa mają tu wagę danej umowy: zero pustych plotek, za to trzeźwy osąd i zaufanie do ustaleń na lata.`
    : `Surowy ton ${ctx.actor.gen} poprawiający każde potknięcie szybko studzi zapał i zamyka usta ${u(ctx)}.`;

  P['mercury-node'] = (ctx, h) => h
    ? `Jedno trafne zdanie ${ctx.actor.gen} potrafi przestawić cały plan miesiąca i otworzyć nową decyzję.`
    : `Słowa, przed którymi najpierw pojawia się opór, bo burzą wygodną opowieść o dotychczasowych nawykach.`;
})();
