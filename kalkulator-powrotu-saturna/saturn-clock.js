/**
 * NEOROMANTYCZNY — SATURN CHRONOS VISUAL CLOCK COMPONENT
 * Widowiskowy Zegar Orbitalny Canvas 2D + Licznik Czasu Rzeczywistego
 */
(function () {
  let animationFrameId = null;
  let countdownTimerId = null;

  function renderClock(canvas, natalLon, transitLon, state) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth || 360;
    const h = canvas.clientHeight || 360;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const cx = w / 2;
    const cy = h / 2;
    const rOuter = Math.min(cx, cy) - 18;
    const rInner = rOuter - 38;

    let rotOffset = 0;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      rotOffset += 0.0008;

      // 1. Tło i winieta kosmiczna
      const gradBg = ctx.createRadialGradient(cx, cy, 10, cx, cy, rOuter + 15);
      gradBg.addColorStop(0, '#151522');
      gradBg.addColorStop(0.7, '#0d0d14');
      gradBg.addColorStop(1, '#08080c');
      ctx.fillStyle = gradBg;
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter + 14, 0, Math.PI * 2);
      ctx.fill();

      // 2. Pierścień zewnętrzny (Złota orbita zodiakalna)
      ctx.strokeStyle = 'rgba(201, 169, 110, 0.22)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(201, 169, 110, 0.12)';
      ctx.beginPath();
      ctx.arc(cx, cy, rInner, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Znaki zodiaku i podziałka 12 sektorów
      const glyphs = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
      ctx.font = '12px "Playfair Display", serif';
      ctx.fillStyle = 'rgba(201, 169, 110, 0.45)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < 12; i++) {
        const ang = (i * 30 - 90) * (Math.PI / 180);
        const gx = cx + (rOuter - 19) * Math.cos(ang);
        const gy = cy + (rOuter - 19) * Math.sin(ang);
        ctx.fillText(glyphs[i], gx, gy);

        // Kreska podziałki
        const tx1 = cx + (rOuter - 4) * Math.cos(ang);
        const ty1 = cy + (rOuter - 4) * Math.sin(ang);
        const tx2 = cx + (rOuter + 3) * Math.cos(ang);
        const ty2 = cy + (rOuter + 3) * Math.sin(ang);
        ctx.beginPath();
        ctx.moveTo(tx1, ty1);
        ctx.lineTo(tx2, ty2);
        ctx.stroke();
      }

      // 4. Łuk relacji kątowej (gdy odległość < 45°)
      const diff = Math.abs(transitLon - natalLon);
      const isClose = diff < 30 || diff > 330;
      if (isClose) {
        ctx.strokeStyle = 'rgba(235, 198, 125, 0.35)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        const a1 = (natalLon - 90) * (Math.PI / 180);
        const a2 = (transitLon - 90) * (Math.PI / 180);
        ctx.arc(cx, cy, rInner + 10, a1, a2, false);
        ctx.stroke();
      }

      // 5. Pozycja Natalnego Saturna (Złoty Talizman ♄)
      const aNat = (natalLon - 90) * (Math.PI / 180);
      const nx = cx + (rInner - 12) * Math.cos(aNat);
      const ny = cy + (rInner - 12) * Math.sin(aNat);

      // Poświata natalna
      const glowNat = ctx.createRadialGradient(nx, ny, 2, nx, ny, 16);
      glowNat.addColorStop(0, 'rgba(218, 178, 103, 0.8)');
      glowNat.addColorStop(1, 'rgba(218, 178, 103, 0)');
      ctx.fillStyle = glowNat;
      ctx.beginPath();
      ctx.arc(nx, ny, 16, 0, Math.PI * 2);
      ctx.fill();

      // Kropka natalna
      ctx.fillStyle = '#f3dd9e';
      ctx.beginPath();
      ctx.arc(nx, ny, 5, 0, Math.PI * 2);
      ctx.fill();

      // 6. Pozycja Tranzytowego Saturna (Pulsar Czasu)
      const aTra = (transitLon - 90) * (Math.PI / 180);
      const tx = cx + (rOuter - 19) * Math.cos(aTra);
      const ty = cy + (rOuter - 19) * Math.sin(aTra);

      // Promień tranzytowy
      ctx.strokeStyle = 'rgba(120, 170, 255, 0.4)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#7db4ff';
      ctx.beginPath();
      ctx.arc(tx, ty, 4, 0, Math.PI * 2);
      ctx.fill();

      // 7. Centrum zegara: Pieczęć Chronosa
      ctx.fillStyle = 'rgba(201, 169, 110, 0.08)';
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '22px serif';
      ctx.fillStyle = '#e4c48a';
      ctx.fillText('♄', cx, cy + 2);

      animationFrameId = requestAnimationFrame(draw);
    }

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    draw();
  }

  function startCountdown(targetDate, domContainer) {
    if (!domContainer) return;
    if (countdownTimerId) clearInterval(countdownTimerId);

    function update() {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        domContainer.innerHTML = '<span class="chrono-active">TRANZYT W TOKU (0°00\' APOGEUM)</span>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      domContainer.innerHTML = `
        <div class="chrono-slot"><span class="chrono-num">${days}</span><span class="chrono-lbl">DNI</span></div>
        <div class="chrono-sep">:</div>
        <div class="chrono-slot"><span class="chrono-num">${hours < 10 ? '0' + hours : hours}</span><span class="chrono-lbl">GODZ</span></div>
        <div class="chrono-sep">:</div>
        <div class="chrono-slot"><span class="chrono-num">${minutes < 10 ? '0' + minutes : minutes}</span><span class="chrono-lbl">MIN</span></div>
        <div class="chrono-sep">:</div>
        <div class="chrono-slot"><span class="chrono-num">${seconds < 10 ? '0' + seconds : seconds}</span><span class="chrono-lbl">SEK</span></div>
      `;
    }

    update();
    countdownTimerId = setInterval(update, 1000);
  }

  window.SaturnClock = {
    renderClock,
    startCountdown
  };
})();
