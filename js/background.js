/**
 * Fondo animado tecnológico: red de nodos cuánticos + partículas Fox Orange (#FF6B35)
 * Respeta prefers-reduced-motion y escala según DevicePixelRatio.
 */
(function () {
  const canvas = document.getElementById('tech-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let pulses = [];
  let mouse = { x: -9999, y: -9999, active: false };
  let animId = null;

  const COLORS = [
    '255, 107, 53',  // Fox Orange (#FF6B35)
    '255, 162, 76',  // Fox Amber (#FFA24C)
    '255, 134, 88',  // Warm Coral
  ];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
  }

  function initParticles() {
    const count = Math.max(26, Math.min(72, Math.floor((width * height) / 22000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      radius: Math.random() * 2.1 + 1.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.45 + 0.35,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function spawnPulse(x, y) {
    pulses.push({ x, y, r: 6, maxR: 130, alpha: 0.45 });
  }

  function step(time) {
    ctx.clearRect(0, 0, width, height);

    const linkDist = Math.min(165, Math.max(110, width * 0.12));

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      if (!reducedMotion) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150 && dist > 1) {
            const force = (150 - dist) / 150;
            p.x -= (dx / dist) * force * 0.85;
            p.y -= (dy / dist) * force * 0.85;
          }
        }
      }

      const twinkle = 0.78 + 0.22 * Math.sin(time * 0.002 + p.phase);

      // Conexiones entre nodos cercanos
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < linkDist) {
          const opacity = (1 - dist / linkDist) * 0.2;
          ctx.strokeStyle = `rgba(255, 107, 53, ${opacity.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // Conexión al cursor
      if (mouse.active) {
        const md = Math.hypot(mouse.x - p.x, mouse.y - p.y);
        if (md < 185) {
          const opacity = (1 - md / 185) * 0.34;
          ctx.strokeStyle = `rgba(255, 162, 76, ${opacity.toFixed(3)})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // Halo y núcleo del nodo
      ctx.fillStyle = `rgba(${p.color}, ${(p.alpha * twinkle * 0.28).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 3.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(${p.color}, ${(p.alpha * twinkle).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ondas de pulso al hacer clic
    for (let k = pulses.length - 1; k >= 0; k--) {
      const pulse = pulses[k];
      pulse.r += 2.6;
      pulse.alpha *= 0.96;
      ctx.strokeStyle = `rgba(255, 107, 53, ${pulse.alpha.toFixed(3)})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, pulse.r, 0, Math.PI * 2);
      ctx.stroke();
      if (pulse.r >= pulse.maxR || pulse.alpha <= 0.02) {
        pulses.splice(k, 1);
      }
    }

    if (!reducedMotion) {
      animId = requestAnimationFrame(step);
    }
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });
  window.addEventListener('click', (e) => {
    if (!reducedMotion) spawnPulse(e.clientX, e.clientY);
  });

  resize();
  if (reducedMotion) {
    step(0);
  } else {
    animId = requestAnimationFrame(step);
  }
})();
