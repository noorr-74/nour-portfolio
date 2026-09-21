import { showToast } from '../core/toast.js';

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) { /* fall through to the legacy method */ }
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch (e) {
    return false;
  }
}

/** Any element with data-copy="text" copies that text when clicked. */
export function initCopy() {
  document.addEventListener('click', async (e) => {
    const button = e.target.closest('[data-copy]');
    if (!button) return;
    const ok = await copyText(button.dataset.copy);
    showToast(ok ? 'Email copied to clipboard' : `Could not copy. My email is ${button.dataset.copy}`);
    if (!ok) return;

    const label = button.querySelector('.btn__label');
    if (label && !button.classList.contains('is-copied')) {
      const previous = label.textContent;
      label.textContent = 'Copied';
      button.classList.add('is-copied');
      setTimeout(() => { label.textContent = previous; button.classList.remove('is-copied'); }, 1800);
    }
  });
}
