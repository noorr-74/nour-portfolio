import { $ } from '../core/dom.js';

const COLORS = { dark: '#08060f', light: '#f7f5fc' };

export function initTheme() {
  const root = document.documentElement;
  const button = $('#theme-toggle');
  const meta = $('meta[name="theme-color"]');
  if (!button) return;

  function apply(theme, { persist = false, animate = false } = {}) {
    if (animate) {
      root.classList.add('theme-transition');
      setTimeout(() => root.classList.remove('theme-transition'), 450);
    }
    root.dataset.theme = theme;
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    button.title = button.getAttribute('aria-label');
    if (meta) meta.setAttribute('content', COLORS[theme]);
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  apply(root.dataset.theme === 'light' ? 'light' : 'dark');
  button.addEventListener('click', () =>
    apply(root.dataset.theme === 'dark' ? 'light' : 'dark', { persist: true, animate: true })
  );
}
