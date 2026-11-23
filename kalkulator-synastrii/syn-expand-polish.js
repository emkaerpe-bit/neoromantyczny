(function () {
  'use strict';
  const esc = (x) => String(x || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const EL_GEN = { Ogień: 'Ognia', Ziemia: 'Ziemi', Powietrze: 'Powietrza', Woda: 'Wody' };
  const SIGN_UP_GEN = {
    BARAN: 'BARANA', BYK: 'BYKA', 'BLIŹNIĘTA': 'BLIŹNIĄT', RAK: 'RAKA', LEW: 'LWA', PANNA: 'PANNY',
    WAGA: 'WAGI', SKORPION: 'SKORPIONA', STRZELEC: 'STRZELCA', 'KOZIOROŻEC': 'KOZIOROŻCA', WODNIK: 'WODNIKA', RYBY: 'RYB'
  };
  const inferFem = (name, g) => {
    const t = String(name || '').trim().toLowerCase();
    if (t.length < 2) return g === 'f';
    if (['kuba', 'barnaba', 'kosma', 'bonawentura', 'jarema', 'zawisza'].includes(t)) return false;
    if (['noemi', 'inez', 'carmen', 'miriam', 'beatrycze'].includes(t)) return true;
    return t.endsWith('a');
  };
  const plHits = (n) => n === 0 ? 'brak ścisłych zetknięć' : n === 1 ? '1 ścisłe zetknięcie' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) ? `${n} ścisłe zetknięcia` : `${n} ścisłych zetknięć`;
  const LILITH_NOTE = {
    Ogień: 'Potrzebuje swobody decyzji i źle znosi narzucanie cudzej woli — im mniej kontroli, tym silniejsza bliskość.',
    Ziemia: 'Ceni wolność wyboru przy pełnej konkretności czynów — nie lubi pustych obietnic ani nerwowego nacisku w codziennych sprawach.',
    Powietrze: 'Broni prawa do własnych myśli i znajomości; zamiast zakazów najlepiej działa tu szczera rozmowa bez cenzury.',
    Woda: 'Nosi silny instynkt granic i wyczuwa każdą nieszczerość — ufa dopiero wtedy, gdy nie musi ukrywać trudnych emocji.'
  };

  function polishTopCards(res, d, dos) {
    if (!res) return;
    const nA = esc(d.nameA), nB = esc(d.nameB);
    const heroBox = res.querySelector('.syn-jungian-hero-card div[style*="border-left"] > div:first-child');
    if (heroBox) heroBox.innerHTML = heroBox.innerHTML.replace('Głęboka Osmoza Nastrojów', 'Wspólna Wrażliwość i Ciche Wyczucie');
    const heroP = heroBox && heroBox.nextElementSibling;
    if (heroP) heroP.textContent = heroP.textContent.replace('Kluczem jest dopasowanie tempa reakcji.', 'Pomaga tu proste dopasowanie tempa rozmowy.');

    const cards = Array.from(res.querySelectorAll('.syn-card'));
    const coldCard = cards.find((c) => (c.querySelector('.syn-card-heading')?.textContent || '').includes('Gdzie rodzi się'));
    if (coldCard) {
      const hdrs = coldCard.querySelectorAll(':scope > div[style*="margin-bottom:1.25rem"] > div:first-child');
      if (hdrs[0]) hdrs[0].innerHTML = `<strong>${nA}</strong> &bull; Księżyc w znaku ${dos.posA.moon.gen} <span class="syn-glyph">${dos.posA.moon.glyph}</span> &bull; Mars w znaku ${dos.posA.mars.gen}`;
      if (hdrs[1]) hdrs[1].innerHTML = `<strong>${nB}</strong> &bull; Księżyc w znaku ${dos.posB.moon.gen} <span class="syn-glyph">${dos.posB.moon.glyph}</span> &bull; Mars w znaku ${dos.posB.mars.gen}`;
      const loopBox = Array.from(coldCard.children).find((el) => (el.textContent || '').includes('PĘTLA WYZWALACZ'));
      const loopP = loopBox && loopBox.querySelector('p');
      if (loopP) {
        let txt = loopP.textContent;
        const elA = dos.posA.moon.element, elB = dos.posB.moon.element;
        const airFem = elA === 'Powietrze' ? inferFem(d.nameA, d.genderA) : elB === 'Powietrze' ? inferFem(d.nameB, d.genderB) : false;
        if (airFem) txt = txt.replace('czuje się przesłuchiwany.', 'czuje się przesłuchiwana.');
        txt = txt.replace(/w żywiole (Ogień|Ziemia|Powietrze|Woda)/g, (_, e) => `w żywiole ${EL_GEN[e] || e}`);
        txt = txt.replace(/żywiołów (Ogień|Ziemia|Powietrze|Woda) i (Ogień|Ziemia|Powietrze|Woda)/g, (_, a, b) => `żywiołów ${EL_GEN[a] || a} i ${EL_GEN[b] || b}`);
        txt = txt.replace('kluczowe ryzyko', 'największe ryzyko').replace('Przy dwóch modalnościach kardynalnych', 'Gdy oboje macie Księżyc w znakach kardynalnych');
        loopP.textContent = txt;
      }
    }
  }

  function polishChapterOneAndGate(sec, d, dos) {
    if (!sec) return;
    const nA = esc(d.nameA), nB = esc(d.nameB);
    const ch1 = sec.querySelector('.syn-report-chapter');
    if (ch1) {
      const vp = ch1.querySelector(':scope > p');
      if (vp) {
        if (vp.textContent.includes('ścisłe zetknięcia')) {
          vp.textContent = `W zestawieniu ${d.nameA} (${d.sunA.name}) i ${d.nameB} (${d.sunB.name}) działa rzadki rezonans Węzła Północnego ☊ (${plHits(dos.karmaHits)}) połączony z wysokim przyciąganiem (${d.syn.chemistry}%). To spotkanie rzadko zostawia obojętnym — otwiera dawne wspomnienia i przestawia kierunek dalszej drogi.`;
        } else if (vp.textContent.includes('odmienne natury')) {
          vp.textContent = `Złożony układ obu horoskopów (Indeks Całkowity: ${dos.totalIndex}%), w którym odmienne temperamenty — ${d.nameA} (${d.sunA.name}, Księżyc w znaku ${dos.posA.moon.gen}) oraz ${d.nameB} (${d.sunB.name}, Księżyc w znaku ${dos.posB.moon.gen}) — wybijają Was z bezpiecznej rutyny ku większej szczerości wobec siebie.`;
        }
      }
      ch1.querySelectorAll('.syn-tooltip-pop').forEach((pop) => {
        pop.innerHTML = pop.innerHTML
          .replace('budują trwały cement', 'wzmacniają trwałość więzi')
          .replace('unikalną tożsamość i przeznaczenie', 'odrębny charakter i kierunek')
          .replace('więź, z której nie sposób się wyzwolić.', 'więź o bardzo silnym, trudnym do zignorowania przyciąganiu.');
      });
    }
    const gateP = sec.querySelector('#syn-loss-gate .syn-loss-desc');
    if (gateP) gateP.innerHTML = gateP.innerHTML.replace('Aż 86% kluczowych danych', 'Aż 86% analizy');
  }

  function polishAspectCells(root) {
    if (!root) return;
    root.querySelectorAll('td[data-label="Znaczenie:"]').forEach((td) => {
      let s = td.textContent.replace(/^(Harmonijny przepływ|Dynamiczne tarcie) między sferą „[^”]+” \([^)]+\) a „[^”]+” \([^)]+\)\.\s*/, '');
      s = s.replace(/Naturalna synergia żywiołów \(([^) ]+) i ([^)]+)\)/, (_, a, b) => `Naturalna synergia żywiołów (${EL_GEN[a] || a} i ${EL_GEN[b] || b})`);
      s = s.replace(/Konfrontacja odmiennych jakości \(([^) ]+) i ([^)]+)\)/, (_, a, b) => `Konfrontacja odmiennych jakości (${EL_GEN[a] || a} i ${EL_GEN[b] || b})`);
      s = s.replace('nie zostaniesz z zagrożeniem sam.', 'nie zostaniesz bez wsparcia w trudnej chwili.')
        .replace('wtedy, gdy sam stałeś od lat na peronie z walizką pełną wahań.', 'wtedy, gdy od lat odkładało się jedną ważną decyzję.')
        .replace('staje się twardym drzwiami w przyszłość.', 'staje się progiem do czegoś zupełnie nowego.')
        .replace('Pociąga Cię w niej lub w nim bezczelna wolność', 'Pociąga tu bezkompromisowa wolność')
        .replace('namiętność bez znieczulenia.', 'głęboka namiętność bez półśrodków.')
        .replace('łatwo tu pomylić stary głód za opiekuńczą ręką', 'łatwo tu pomylić dawny brak bliskości');
      td.textContent = s;
    });
  }

  function polishUnlockedChapters(dossier, d, dos) {
    if (!dossier) return;
    const chaps = dossier.querySelectorAll('.syn-report-chapter');
    const nA = esc(d.nameA), nB = esc(d.nameB);
    polishAspectCells(chaps[0]);
    polishAspectCells(chaps[3]);

    [chaps[1], chaps[2]].forEach((ch) => {
      if (!ch) return;
      ch.querySelectorAll('.syn-tooltip-pop').forEach((pop) => {
        pop.innerHTML = pop.innerHTML
          .replace(/✦ W ZNAKU (BARAN|BYK|BLIŹNIĘTA|RAK|LEW|PANNA|WAGA|SKORPION|STRZELEC|KOZIOROŻEC|WODNIK|RYBY)(?=\s|<|\(|$)/g, (_, sg) => `✦ W ZNAKU ${SIGN_UP_GEN[sg] || sg}`)
          .replace('Cicha osmoza snów i przeczuć', 'Ciche wyczucie nastrojów i intuicji')
          .replace('rozpala go siła charakteru', 'rozpala tu siła charakteru')
          .replace('tabu i noc bez znieczulenia.', 'silne napięcie, które wciąga od pierwszego spojrzenia.');
      });
    });

    if (chaps[1]) {
      const c1 = chaps[1].querySelector('.syn-stat-box');
      if (c1) c1.innerHTML = c1.innerHTML.replace(`Żywioł ${dos.compSun.element} (${dos.compSun.modality}):`, `Żywioł: ${dos.compSun.element} &bull; Jakość: ${dos.compSun.modality.toLowerCase()} &mdash;`);
    }
    if (chaps[2]) {
      const cards = chaps[2].querySelectorAll('.syn-stat-box');
      const eb = [
        { sub: `Wzorzec stałego partnerstwa i zaufania: ${nA}.`, def: `Punkt spotkania woli z nocną potrzebą bezpiecznego domu. Odsłania cichy wzorzec miłości (${nA}) oraz warunek, bez którego w tym związku zaczyna brakować tlenu.` },
        { sub: `Punkt czuły więzi małżeńskiej i zaufania intymnego: ${nB}.`, def: `Punkt spotkania świadomego wyboru z głodem czułości. Pokazuje cichy wzorzec więzi (${nB}) i to, przy kim naprawdę można odłożyć codzienną ostrożność na lata.` },
        { def: `Punkt napięcia między pragnieniem bliskości a sposobem działania (midpoint Wenus i Marsa). Wskazuje bodziec, który najszybciej przełamuje rezerwę (${nA}) i uruchamia fizyczne przyciąganie.` },
        { def: `Bezpośredni klucz temperamentu seksualnego (punkt środkowy Wenus i Marsa). Określa styl inicjatywy, tempa i dotyku, na który ${nB} reaguje najmocniej.` }
      ];
      cards.forEach((card, i) => {
        if (!eb[i]) return;
        const sub = eb[i].sub && card.querySelector('.syn-tag-row + div + div');
        if (sub) sub.innerHTML = eb[i].sub;
        const def = card.querySelector('.syn-tooltip-pop .syn-tt-def > div:first-child');
        if (def) def.innerHTML = eb[i].def;
      });
      chaps[2].innerHTML = chaps[2].innerHTML.replace('reaktywności zmysłowej', 'temperamentu');
    }
    if (chaps[3]) {
      const p0 = chaps[3].querySelector(':scope > p');
      if (p0) p0.innerHTML = `Podczas gdy Wenus i Mars odpowiadają za widoczny flirt, <strong>Pluton (♇)</strong> oraz <strong>Czarny Księżyc Lilith (⚸ — apogeum księżycowe)</strong> rządzą podświadomym przyciąganiem, dominacją, zazdrością i pragnieniami, o których rzadko mówi się wprost. <strong>${nA}</strong> ma Lilith w znaku <strong>${dos.posA.lilith.gen} (${dos.posA.lilith.formatted})</strong> i Plutona w znaku <strong>${dos.posA.pluto.gen} (${dos.posA.pluto.formatted})</strong>, natomiast <strong>${nB}</strong> ma Lilith w znaku <strong>${dos.posB.lilith.gen} (${dos.posB.lilith.formatted})</strong> i Plutona w znaku <strong>${dos.posB.pluto.gen} (${dos.posB.pluto.formatted})</strong>.`;
      const lCards = chaps[3].querySelectorAll('.syn-stat-box > p');
      if (lCards[0]) lCards[0].textContent = `Czuły punkt niezależności i zmysłowego cienia (${d.nameA}) w znaku ${dos.posA.lilith.gen} (${dos.posA.lilith.element}). ${LILITH_NOTE[dos.posA.lilith.element] || ''}`;
      if (lCards[1]) lCards[1].textContent = `Ukryty wyzwalacz pożądania (${d.nameB}) w znaku ${dos.posB.lilith.gen} (${dos.posB.lilith.element}). Aby utrzymać silne przyciąganie, ta relacja potrzebuje własnej tajemnicy, przestrzeni i niedopowiedzenia — przewidywalna rutyna szybko chłodzi tu zmysły.`;
    }
    if (chaps[5]) {
      const p5 = chaps[5].querySelector(':scope > p');
      if (p5) p5.innerHTML = `W chwilach przeciążenia <strong>${nA}</strong> reaguje odruchami Księżyca w znaku <strong>${dos.posA.moon.gen}</strong> i Marsa w znaku <strong>${dos.posA.mars.gen} (${dos.posA.mars.element})</strong>, natomiast <strong>${nB}</strong> uruchamia obronę typową dla Księżyca w znaku <strong>${dos.posB.moon.gen}</strong> oraz Marsa w znaku <strong>${dos.posB.mars.gen} (${dos.posB.mars.element})</strong>. Zamiast nakręcać spór, użyjcie poniższego sposobu na szybkie wyciszenie napięcia:`;
      chaps[5].querySelectorAll('.syn-card-tag').forEach((tg) => { tg.textContent = tg.textContent.replace('KLUCZ OTWARCIA DLA:', 'KLUCZ DO ROZMOWY —'); });
    }
    if (chaps[6]) {
      const p6 = chaps[6].querySelector(':scope > p');
      if (p6) p6.innerHTML = `Kierunek spotkania wyznacza Węzeł Północny: <strong>${nA}</strong> ma go w znaku <strong>${dos.posA.node.gen} (${dos.posA.node.formatted})</strong>, a <strong>${nB}</strong> w znaku <strong>${dos.posB.node.gen} (${dos.posB.node.formatted})</strong> (${plHits(dos.karmaHits)}). Trwałość i granice pokazuje Saturn (♄): <strong>${nA}</strong> w znaku <strong>${dos.posA.saturn.gen} (${dos.posA.saturn.formatted})</strong>, <strong>${nB}</strong> w znaku <strong>${dos.posB.saturn.gen} (${dos.posB.saturn.formatted})</strong>, co daje wynik stabilności <strong>${dos.saturnFinal}%</strong>. To fundament lojalności, szacunku dla granic i słowności, który utrzymuje więź długo po pierwszym zauroczeniu.`;
    }
    if (chaps[7]) {
      chaps[7].querySelectorAll('.syn-card-tag').forEach((tg) => { tg.textContent = tg.textContent.replace('ZŁOTY PREZENT DLA:', 'ZŁOTY PREZENT —'); });
    }
  }

  function polishAll(d, dos, isUnl) {
    polishTopCards(document.getElementById('syn-results'), d, dos);
    polishChapterOneAndGate(document.getElementById('syn-dossier-section'), d, dos);
    if (isUnl) polishUnlockedChapters(document.getElementById('syn-locked-dossier'), d, dos);
  }

  window.__SYN_EXPAND_POLISH__ = { polishAll };
})();
