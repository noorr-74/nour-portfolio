import { esc } from '../core/dom.js';
import { socialIconLinks } from './shared.js';

export function renderFooter(root, { person, socials }) {
  root.innerHTML = `
    <div class="container site-footer__inner">
      <p class="site-footer__copy">&copy; ${new Date().getFullYear()} ${esc(person.fullName)}. All rights reserved.</p>
      <p class="site-footer__built mono">Built with HTML, CSS and JavaScript.</p>
      <div class="site-footer__social">${socialIconLinks(socials)}</div>
    </div>`;
}
