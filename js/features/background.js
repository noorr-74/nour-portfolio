import { $, prefersReducedMotion } from '../core/dom.js';

/** Slow-drifting network of dots behind the page. Pauses when the tab is hidden. */
export function initBackground() {
  const canvas = $('#bg-canvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  if (!ctx) return;

  const reduce = prefersReducedMotion();
  const LINK = 150;
  let w = 0, h = 0, nodes = [], raf = 0, rgb = '176,132,255', alpha = 0.5;

  function readTheme() {
    const styles = getComputedStyle(document.documentElement);
    rgb = styles.getPropertyValue('--node-rgb').trim() || rgb;
    alpha = parseFloat(styles.getPropertyValue('--node-alpha')) || alpha;
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(70, Math.max(24, (w * h) / 22000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.3 + 0.6,
    }));
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK) {
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - dist / LINK) * alpha * 0.45})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.9})`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step() {
    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
      if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
    });
    draw();
    raf = requestAnimationFrame(step);
  }

  function start() { if (!reduce && !raf) raf = requestAnimationFrame(step); }
  function stop() { cancelAnimationFrame(raf); raf = 0; }

  readTheme();
  resize();
  start();

  let resizeTimer;
  let lastW = w, lastH = h;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Ignore the small height changes caused by mobile browser toolbars.
      if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 150) return;
      lastW = window.innerWidth; lastH = window.innerHeight;
      resize();
    }, 150);
  });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  window.addEventListener('themechange', () => { readTheme(); if (reduce) draw(); });
}
