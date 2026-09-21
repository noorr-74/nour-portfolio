import { $, prefersReducedMotion } from '../core/dom.js';

/** Header background, scroll-progress bar and the back-to-top button. */
export function initScrollUI() {
  const header = $('.site-header');
  const bar = $('.scroll-progress span');
  const toTop = $('#to-top');
  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    if (toTop) toTop.classList.toggle('is-visible', y > Math.max(600, window.innerHeight * 0.8));
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    });
  }
}
