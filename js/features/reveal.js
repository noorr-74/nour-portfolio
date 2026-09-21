import { $$, prefersReducedMotion } from '../core/dom.js';

/** Fade elements with the "reveal" class into view as they scroll on screen. */
export function initReveal(root = document) {
  const items = $$('.reveal', root);
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  items.forEach((el) => observer.observe(el));
}
