import { prefersReducedMotion } from '../core/dom.js';

/** Types each word, pauses, deletes it, then moves to the next one. */
export function initTyping(el, words, { typeMs = 65, deleteMs = 32, holdMs = 1700, pauseMs = 350 } = {}) {
  if (!el || !words || !words.length) return;
  if (prefersReducedMotion()) { el.textContent = words[0]; return; }

  let word = 0;
  let count = 0;
  let deleting = false;

  function tick() {
    const current = words[word];
    count += deleting ? -1 : 1;
    el.textContent = current.slice(0, count);

    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && count === current.length) { deleting = true; delay = holdMs; }
    else if (deleting && count === 0) { deleting = false; word = (word + 1) % words.length; delay = pauseMs; }
    setTimeout(tick, delay);
  }

  el.textContent = '';
  setTimeout(tick, 700);
}
