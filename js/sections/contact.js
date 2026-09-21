import { esc } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { cvButtons } from './shared.js';

function tile({ iconName, label, value, href, external = true }) {
  const inner = `
    <span class="tile__icon">${icon(iconName)}</span>
    <span class="tile__text"><span class="tile__label">${esc(label)}</span><span class="tile__value">${esc(value).replace('@', '<wbr>@')}</span></span>`;
  if (!href) return `<li class="reveal"><div class="tile">${inner}</div></li>`;
  const ext = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<li class="reveal"><a class="tile" href="${esc(href)}"${ext}>${inner}${icon('external', 'tile__arrow')}</a></li>`;
}

export function renderContact(root, { person, socials, cv, contact }) {
  const tiles = [
    tile({ iconName: 'mail', label: 'Email', value: person.email, href: `mailto:${person.email}`, external: false }),
    person.phone?.show
      ? tile({ iconName: 'phone', label: 'Phone', value: person.phone.display, href: `tel:${person.phone.href}`, external: false })
      : '',
    ...socials.map((s) => tile({ iconName: s.id, label: s.label, value: s.handle, href: s.url })),
    tile({ iconName: 'pin', label: 'Location', value: person.location }),
  ].join('');

  root.innerHTML = `
    <div class="card contact__card reveal">
      <div class="contact__intro">
        <h3 class="contact__title">${esc(contact.heading)}</h3>
        <p class="contact__text">${esc(contact.text)}</p>
        <div class="contact__actions">
          <a class="btn btn--primary" href="mailto:${esc(person.email)}">${icon('mail')}<span>Send an email</span></a>
          <button class="btn btn--secondary" type="button" data-copy="${esc(person.email)}">${icon('copy')}<span class="btn__label">Copy email</span></button>
        </div>
        <div class="contact__cv">${cvButtons(cv)}</div>
      </div>
      <ul class="contact__tiles">${tiles}</ul>
    </div>`;
}
