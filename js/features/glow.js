/** Soft highlight that follows the pointer across a card. */
export function initGlow() {
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest && e.target.closest('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, { passive: true });
}
