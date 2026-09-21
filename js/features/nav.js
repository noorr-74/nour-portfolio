import { $, $$ } from '../core/dom.js';
import { icon } from '../core/icons.js';

export function initNav() {
  const toggle = $('#nav-toggle');
  const list = $('#nav-links');
  const iconSlot = $('#nav-toggle-icon');
  if (!toggle || !list) return;

  function setOpen(open) {
    list.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (iconSlot) iconSlot.innerHTML = icon(open ? 'x' : 'menu');
  }

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  list.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && list.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  const header = $('.site-header');
  document.addEventListener('click', (e) => {
    // composedPath() still works after the clicked icon was swapped out of the DOM.
    if (list.classList.contains('is-open') && !e.composedPath().includes(header)) setOpen(false);
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });

  // Highlight the link of the section currently in view.
  const links = $$('.nav__link', list);
  const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const sections = $$('main section[id]').filter((s) => byId.has(s.id));
  if (!('IntersectionObserver' in window)) return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        byId.get(entry.target.id).setAttribute('aria-current', 'true');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spy.observe(s));

  // Clear the highlight while the hero is in view.
  const hero = $('#home');
  if (hero) {
    new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) links.forEach((a) => a.removeAttribute('aria-current')); },
      { rootMargin: '-45% 0px -50% 0px' }
    ).observe(hero);
  }
}
