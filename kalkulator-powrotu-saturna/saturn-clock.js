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
      const glyphPaths = ["M 8.5 13.5 C 7.5 8.5, 14 7.5, 16 14.5 L 16 25 M 23.5 13.5 C 24.5 8.5, 18 7.5, 16 14.5","M 8.5 9.5 C 10.5 14, 21.5 14, 23.5 9.5 M10.8 19a5.2 5.2 0 1 0 10.4 0a5.2 5.2 0 1 0 -10.4 0","M 8.5 9 C 12.5 11.2, 19.5 11.2, 23.5 9 M 8.5 23 C 12.5 20.8, 19.5 20.8, 23.5 23 M 12.8 10.3 L 12.8 21.7 M 19.2 10.3 L 19.2 21.7","M 7.5 11.7 C 11 7.6, 19.5 7.6, 25 11 M 24.5 20.3 C 21 24.4, 12.5 24.4, 7 21 M6.999999999999999 13.5a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0 M18.6 18.5a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0","M 12.8 16.2 C 11.5 9.5, 19.5 7.5, 20.5 13.5 C 21.2 17.5, 18.5 22, 22 22.5 C 23.5 22.7, 24.5 21.5, 24.5 20.2 M7.5 18.5a3 3 0 1 0 6 0a3 3 0 1 0 -6 0","M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20.5 C 18.4 23.5, 21 24.5, 23 23 M 18.4 15 C 21.5 12.5, 24.5 14.5, 22.5 18.5 C 21 21, 17.5 22.5, 15.8 24","M 7.5 18.5 L 12.2 18.5 A 4.8 4.8 0 1 1 19.8 18.5 L 24.5 18.5 M 7.5 22.5 L 24.5 22.5","M 7.5 11.5 C 8.5 9.5, 10 9.5, 10 12 L 10 21 M 10 13 C 10 9.5, 14.2 9.5, 14.2 13 L 14.2 21 M 14.2 13 C 14.2 9.5, 18.4 9.5, 18.4 13 L 18.4 20 C 18.4 23, 21.5 23, 24 19.5 M 21.2 19.2 L 24.2 19.2 L 24.2 22.2","M 8.5 23.5 L 23.5 8.5 M 16.5 8.5 L 23.5 8.5 L 23.5 15.5 M 11.5 14.5 L 17.5 20.5","M 7.5 11.5 L 10 10 L 13.2 20.5 L 16.8 11.5 C 18 9, 21.5 9.5, 21.5 13.5 C 21.5 18, 24.2 21, 21 23.5 C 18.5 25, 16.2 23, 17.2 20.5 C 18.2 18.5, 21.5 18.8, 24 21","M 7.5 14.5 L 10.5 11.5 L 13.2 14.5 L 16 11.5 L 18.8 14.5 L 21.5 11.5 L 24.5 14.5 M 7.5 20.5 L 10.5 17.5 L 13.2 20.5 L 16 17.5 L 18.8 20.5 L 21.5 17.5 L 24.5 20.5","M 10 8.5 C 14.5 12.5, 14.5 19.5, 10 23.5 M 22 8.5 C 17.5 12.5, 17.5 19.5, 22 23.5 M 7.5 16 L 24.5 16"];
      ctx.strokeStyle = 'rgba(250, 248, 245, 0.52)';
      ctx.lineWidth = 2.1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < 12; i++) {
        const ang = (i * 30 - 90) * (Math.PI / 180);
        const gx = cx + (rOuter - 19) * Math.cos(ang);
        const gy = cy + (rOuter - 19) * Math.sin(ang);
        ctx.save(); ctx.translate(gx - 6.5, gy - 6.5); ctx.scale(0.40625, 0.40625); ctx.stroke(new Path2D(glyphPaths[i])); ctx.restore();

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
