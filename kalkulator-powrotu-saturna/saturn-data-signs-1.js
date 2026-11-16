(function () {
  window.SATURN_SIGNS_DATA = window.SATURN_SIGNS_DATA || {};

  const SIGNS_PART_1 = {
    Aries: {
      sign: 'Baran',
      archetype: 'Żywioł Ognia • Jakość kardynalna',
      dignityStatus: 'Upadek',
      wound: 'W młodości pojawia się przekaz, że głośny gniew psuje atmosferę, a samodzielna inicjatywa bez zgody starszych kończy się upokorzeniem. Uczysz się dławić pierwszy impuls, zanim zdążysz wypowiedzieć własne „chcę”.',
      preReturnArmor: 'Przed konfrontacją cyklu wahasz się między paraliżem przed porażką na starcie a wchodzeniem na oślep w zawodowe spory, żeby udowodnić otoczeniu brak lęku.',
      auditCrisis: 'Powrót Saturna rozkłada projekty prowadzone z czystej przekory oraz układy, w których oddajesz stery innym osobom. Zostajesz wobec decyzji wymagającej własnego podpisu.',
      matureGift: 'Zaczynasz pierwszą trudną rozmowę na trzeźwo i bierzesz pełną odpowiedzialność za kierunek bez udowadniania racji hałasem.',
      lifeLesson: 'Prawdziwa odwaga oznacza konsekwentne dokończenie kroku mimo przyspieszonego pulsu i obawy przed oceną.'
    },
    Taurus: {
      sign: 'Byk',
      archetype: 'Żywioł Ziemi • Jakość stała',
      dignityStatus: 'Peregryn',
      wound: 'Poczucie bezpieczeństwa materialnego lub codzienny spokój w domu bywały kruche, co zaszczepiło chroniczny niepokój o jutro. Stabilność zaczynasz utożsamiać wyłącznie z przewidywalnym grafikiem i stanem konta.',
      preReturnArmor: 'Przez lata trzymasz się kurczowo wygasłej relacji albo niesatysfakcjonującej posady tylko dlatego, że zmiana pachnie utratą finansowego gruntu pod nogami.',
      auditCrisis: 'Ten cykl ucina źródła dochodu oraz przyzwyczajenia oparte na leniwym kompromisie. Rzeczywistość stawia Cię pod ścianą dokładnie tam, gdzie płacisz rozwojem za święty spokój.',
      matureGift: 'Tworzysz prywatną poduszkę finansową i spokojną samowystarczalność, dzięki której nikt nie kupi Twojej zgody strachem przed brakiem.',
      lifeLesson: 'Własna wartość wyrasta z realnych kompetencji i umiejętności odbudowy od zera, nigdy z kurczowego pilnowania stanu posiadania.'
    },
    Gemini: {
      sign: 'Bliźnięta',
      archetype: 'Żywioł Powietrza • Jakość zmienna',
      dignityStatus: 'Peregryn',
      wound: 'Wstyd za pochopnie rzucone zdanie lub lukę w wiedzy przy osobach uznawanych za mądrzejsze nauczył Cię ważyć każde słowo po dziesięć razy przed zabraniem głosu.',
      preReturnArmor: 'Zamiast nazywać potrzeby wprost, zasypujesz otoczenie ironią, żartem albo kilkoma pobocznymi wątkami naraz, żeby nikt nie dotknął ukrytej niepewności.',
      auditCrisis: 'Podczas tranzytu rozmyte ustalenia i niedopowiedziane obietnice wybuchają jednym żądaniem konkretu. Błyskotliwe uniki w rozmowach tracą ważność.',
      matureGift: 'Każde Twoje słowo zyskuje wagę wiążącego dokumentu: mówisz zwięźle, bez przepraszającego tonu, i dotrzymujesz terminów co do minuty.',
      lifeLesson: 'Jedna uczciwa rozmowa nazwana po imieniu rozwiązuje więcej niż miesiące dyplomatycznego kluczenia między wierszami.'
    },
    Cancer: {
      sign: 'Rak',
      archetype: 'Żywioł Wody • Jakość kardynalna',
      dignityStatus: 'Wygnanie',
      wound: 'Zbyt wczesne przejmowanie nastrojów dorosłych utrwaliło przekonanie, że na bliskość trzeba zasłużyć bezbłędnym opanowaniem. Okazywanie słabości lub łez kojarzy się podświadomie z odrzuceniem.',
      preReturnArmor: 'Grasz rolę niezawodnego ratownika dla partnerów, przyjaciół i rodziny, budując wysoki mur wokół własnego wyczerpania i rzadko prosząc o wsparcie.',
      auditCrisis: 'Pod naciskiem Saturna ciężar jednostronnych relacji zaczyna fizycznie wypalać siły. Okazuje się, że podopieczni nie potrafią odwzajemnić tej samej troski.',
      matureGift: 'Stawiasz czytelne granice w domu i przestajesz mylić miłość z poświęceniem. Pozwalasz sobie na ludzką kruchość bez zażenowania.',
      lifeLesson: 'Bezpieczeństwo emocjonalne zaczyna się wtedy, gdy własne potrzeby traktujesz równie poważnie jak kryzysy bliskich osób.'
    },
    Leo: {
      sign: 'Lew',
      archetype: 'Żywioł Ognia • Jakość stała',
      dignityStatus: 'Wygnanie',
      wound: 'Naturalna potrzeba zabawy i wyróżnienia spotykała się z chłodnym przywołaniem do porządku. Utrwaliło się przekonanie, że na uwagę zasługujesz dopiero po nieludzkim wysiłku bez cienia błędu.',
      preReturnArmor: 'Albo chowasz talenty w cieniu zespołu z obawy przed publiczną krytyką, albo obsesyjnie kontrolujesz wizerunek, żeby nikt nie dostrzegł zwykłego zmęczenia.',
      auditCrisis: 'Saturn odbiera oklaski za role, w których udajesz kogoś innego, i konfrontuje z cichą codzienną pracą bez widowni. Trzeba wyjść na scenę pod własnym nazwiskiem.',
      matureGift: 'Realizujesz autorskie projekty z cichą charyzmą, bo przestajesz uzależniać godność od chwilowej aprobaty sali.',
      lifeLesson: 'Prawdziwy autorytet wyrasta ze spokojnej dumy z własnego warsztatu, a nie z gorączkowego szukania poklasku.'
    },
    Virgo: {
      sign: 'Panna',
      archetype: 'Żywioł Ziemi • Jakość zmienna',
      dignityStatus: 'Peregryn',
      wound: 'Chaos otoczenia wywoływał napięcie, więc uczyłeś się poprawiać rzeczywistość nadmierną kontrolą detalu. Drobne spóźnienie lub pomyłka w papierach uruchamiają nieproporcjonalnie ostry samokrytycyzm.',
      preReturnArmor: 'Odkładasz ważne decyzje zawodowe pod pretekstem wiecznego doszkalania i dopinania szczegółów, które nikogo poza Tobą nie obchodzą, oczekując też bezbłędności od bliskich.',
      auditCrisis: 'Ciało albo przeładowany kalendarz mówią stop przez bezsenność i przemęczenie. Nadmiar obowiązków wymusza delegowanie zadań oraz rezygnację z mikrozarządzania.',
      matureGift: 'Odróżniasz sprawy krytyczne od tła, łącząc wysoką precyzję warsztatu z życzliwą wyrozumiałością wobec ludzkich potknięć.',
      lifeLesson: 'Rzeczy skończone na osiemdziesiąt procent w terminie zmieniają życie skuteczniej niż wiecznie poprawiany brudnopis w szufladzie.'
    }
  };

  Object.assign(window.SATURN_SIGNS_DATA, SIGNS_PART_1);
})();
