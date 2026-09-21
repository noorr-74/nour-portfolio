import { $, esc } from './dom.js';
import { icon } from './icons.js';

let timer;

/** Show a short confirmation message at the bottom of the screen. */
export function showToast(message) {
  const el = $('#toast');
  if (!el) return;
  el.innerHTML = `${icon('check')}<span>${esc(message)}</span>`;
  el.classList.add('is-visible');
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('is-visible'), 2400);
}
