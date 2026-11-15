(function () {
  window.SATURN_SIGNS_DATA = window.SATURN_SIGNS_DATA || {};

  const SIGNS_PART_1 = {
    Aries: {
      sign: 'Baran',
      archetype: 'Archetyp: Wojownik',
      dignityStatus: 'Upadek (Fall)',
      wound: 'Od dziecka słyszałeś, że Twój gniew psuje atmosferę, a samodzielna inicjatywa bez pytania starszych kończy się upokorzeniem. Nauczyłeś się więc dławić pierwszy impuls zanim zdążysz powiedzieć „chcę”.',
      preReturnArmor: 'Przed trzydziestką uciekasz w dwie skrajności: albo paraliżuje Cię lęk przed porażką na starcie, albo rzucasz się na oślep w konflikty zawodowe, żeby udowodnić otoczeniu, że nie boisz się nikogo.',
      auditCrisis: 'Między 28. a 30. rokiem życia rozpadają się projekty prowadzone wyłącznie z przekory i układy, w których oddawałeś stery innym ludziom. Zostajesz sam wobec decyzji, której nikt za Ciebie nie podpisze.',
      matureGift: 'Zamiast udowadniać swoją rację głośnym uporem, podejmujesz pierwszą trudną rozmowę w pracy lub relacji na trzeźwo i bierzesz pełną odpowiedzialność za wynik.',
      lifeLesson: 'Prawdziwa odwaga polega na konsekwentnym dokończeniu własnego kroku, nawet gdy serce bije szybciej ze strachu przed oceną.'
    },
    Taurus: {
      sign: 'Byk',
      archetype: 'Archetyp: Budowniczy',
      dignityStatus: 'Neutralny (Przegrzanie Materialne)',
      wound: 'W Twoim domu pieniądze, jedzenie albo stabilność emocjonalna bywały niestabilne, co zaszczepiło chroniczny niepokój o jutro. Spokój zacząłeś utożsamiać z pełnym kontem i przewidywalnym grafikiem.',
      preReturnArmor: 'Do 28. roku życia trzymasz się kurczowo niesatysfakcjonującej posady, wygodnej rutyny albo wygasłego związku wyłącznie dlatego, że zmiana pachnie ryzykiem finansowym i utratą kontroli nad codziennością.',
      auditCrisis: 'Powrót Saturna ucina źródła dochodu lub przywiązania oparte na leniwym kompromisie. Życie stawia Cię pod ścianą dokładnie tam, gdzie kupowałeś święty spokój za cenę własnego rozwoju.',
      matureGift: 'Budujesz prywatny bufor finansowy i spokojną niezależność, dzięki której nikt nie kupi Twojej lojalności strachem przed brakiem.',
      lifeLesson: 'Własna wartość powstaje z Twoich realnych kompetencji i umiejętności budowania od zera, a nigdy z kurczowego pilnowania stanu posiadania.'
    },
    Gemini: {
      sign: 'Bliźnięta',
      archetype: 'Archetyp: Analityk',
      dignityStatus: 'Peregryny (Dyscyplina Intelektu)',
      wound: 'Czułeś kiedyś wstyd za pochopnie wypowiedziane zdanie albo brak wiedzy przy ludziach uznawanych za mądrzejszych. Od tamtej pory ważysz każde słowo dziesięć razy i unikasz zabierania głosu bez twardych dowodów.',
      preReturnArmor: 'Zamiast mówić wprost o swoich potrzebach czy stawiać diagnozę problemowi, zasypujesz otoczenie ironią, żartem albo dziesięcioma pobocznymi dygresjami, byle nikt nie dotknął Twojej niepewności.',
      auditCrisis: 'Około dwudziestego dziewiątego roku życia rozmyte ustalenia w firmie i niedopowiedziane obietnice w relacjach wybuchają jednym żądaniem konkretu. Błyskotliwe wymówki przestają działać.',
      matureGift: 'Twoje słowa zyskują wagę konkretnego dokumentu — mówisz krótko, rzeczowo, bez przepraszającego tonu i dotrzymujesz terminów co do godziny.',
      lifeLesson: 'Jedna uczciwa rozmowa nazwana po imieniu rozwiązuje więcej niż miesiące dyplomatycznego kluczenia między wierszami.'
    },
    Cancer: {
      sign: 'Rak',
      archetype: 'Archetyp: Opiekun',
      dignityStatus: 'Wygnanie (Detriment)',
      wound: 'W dzieciństwie zbyt wcześnie przejąłeś nastroje dorosłych i poczułeś, że na miłość trzeba zapracować bezbłędnym opanowaniem. Okazywanie słabości lub płaczu kojarzy Ci się podświadomie z odrzuceniem.',
      preReturnArmor: 'Przed trzydziestką grasz rolę niezawodnego ratownika dla partnerów, przyjaciół i rodziny, jednocześnie budując wysoki mur wokół własnego zmęczenia. Nigdy pierwszy nie prosisz o pomoc.',
      auditCrisis: 'Pod naporem Powrotu Saturna ciężar jednostronnych relacji i cudzych problemów zaczyna Cię fizycznie wypalać. Okazuje się, że nikt z podopiecznych nie potrafi odwzajemnić Twojej opieki.',
      matureGift: 'Zakładasz zdrowe granice w domu i przestajesz mylić miłość z poświęceniem. Pozwalasz sobie na normalną kruchość bez wstydu.',
      lifeLesson: 'Bezpieczeństwo emocjonalne zaczyna się wtedy, gdy sam traktujesz własne potrzeby równie poważnie jak kryzysy swoich bliskich.'
    },
    Leo: {
      sign: 'Lew',
      archetype: 'Archetyp: Suweren',
      dignityStatus: 'Wygnanie (Detriment)',
      wound: 'Radość, zabawa i naturalna potrzeba wyróżnienia spotykały się z chłodnym przywołaniem do porządku. Uwierzyłeś, że zasługujesz na uwagę dopiero po wykonaniu nadludzkiej pracy bez cienia błędu.',
      preReturnArmor: 'Albo chowasz swoje talenty w cieniu zespołu, oddając zasługi innym ze strachu przed publiczną krytyką, albo obsesyjnie kontrolujesz wizerunek, byle nikt nie zobaczył za nim zwykłego zmęczenia.',
      auditCrisis: 'Saturn odbiera Ci oklaski za role, w których udawałeś kogoś innego, i konfrontuje Cię z pustką codziennej pracy pozbawionej zewnętrznej widowni. Musisz wyjść na scenę z własnym imieniem.',
      matureGift: 'Tworzysz rzetelne projekty z autentyczną charyzmą, bo przestajesz uzależniać swoją godność od chwilowej aprobaty publiczności.',
      lifeLesson: 'Prawdziwy autorytet wyrasta z cichej dumy ze swojej codziennej roboty, a nie z gorączkowego szukania uznania w oczach innych.'
    },
    Virgo: {
      sign: 'Panna',
      archetype: 'Archetyp: Rzemieślnik',
      dignityStatus: 'Ziemny Rzemieślnik',
      wound: 'Chaos otoczenia wywoływał w Tobie napięcie, więc nauczyłeś się naprawiać rzeczywistość nadmierną kontrolą detalu. Błąd w rachunkach czy spóźnienie wywołują w Tobie nieproporcjonalnie ostry samokrytycyzm.',
      preReturnArmor: 'Odkładasz ważne decyzje zawodowe pod pretekstem wiecznego doszkalania i dopinania szczegółów, które nikogo poza Tobą nie obchodzą. Oczekujesz też bezbłędności od partnera.',
      auditCrisis: 'Około dwudziestego dziewiątego roku życia ciało lub kalendarz mówią stop przez przepracowanie i bezsenność. Nadmiar obowiązków wymusza delegowanie zadań oraz rezygnację z mikrozarządzania.',
      matureGift: 'Odróżniasz sprawy krytyczne od szumu, łącząc mistrzowski warsztat zawodowy ze spokojną wyrozumiałością wobec ludzkich niedoskonałości.',
      lifeLesson: 'Rzeczy ukończone na osiemdziesiąt procent w terminie zmieniają życie o wiele skuteczniej niż wiecznie polerowany projekt w szufladzie.'
    }
  };

  Object.assign(window.SATURN_SIGNS_DATA, SIGNS_PART_1);
})();
