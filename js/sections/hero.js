import { esc } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { cvButtons, socialIconLinks } from './shared.js';

export function renderHero(root, { person, hero, socials, cv }) {
  const words = hero.typingWords || [];

  const visual = person.photo
    ? `<picture>
         <source srcset="${esc(person.photo.webp)}" type="image/webp">
         <img src="${esc(person.photo.jpg)}" alt="${esc(person.photo.alt)}" width="${person.photo.width}" height="${person.photo.height}" decoding="async" fetchpriority="high">
       </picture>`
    : `<div class="window__monogram" aria-hidden="true">${esc(person.fullName.split(' ').map((w) => w[0]).join(''))}</div>`;

  const chips = (hero.chips || [])
    .map((c, i) => `<span class="float-chip float-chip--${i === 0 ? 'a' : 'b'}">${icon(c.icon)}<span>${esc(c.text)}</span></span>`)
    .join('');

  root.innerHTML = `
    <div class="hero__copy">
      <h1 class="hero__title reveal" id="hero-title">${esc(hero.greeting)} ${esc(person.firstName)}</h1>

      <p class="hero__typed reveal" style="--delay:120ms">
        <span class="hero__prompt mono" aria-hidden="true">&gt;</span>
        <span class="sr-only">${esc(hero.typingLabel)}: ${esc(words.join(', '))}</span>
        <span aria-hidden="true"><span id="typed"></span><span class="caret"></span></span>
      </p>

      <p class="hero__subtitle reveal" style="--delay:180ms">${esc(person.title)}</p>
      <p class="hero__tagline reveal" style="--delay:240ms">${esc(person.tagline)}</p>

      <div class="hero__actions reveal" style="--delay:300ms">
        <a class="btn btn--primary" href="#projects">View my projects</a>
        <a class="btn btn--secondary" href="#contact">Get in touch</a>
      </div>
      <div class="hero__actions reveal" style="--delay:340ms; margin-top:0.75rem">${cvButtons(cv)}</div>

      <div class="hero__socials reveal" style="--delay:400ms">
        ${socialIconLinks(socials)}
        <button class="icon-btn" type="button" data-copy="${esc(person.email)}" aria-label="Copy email address" title="Copy email address">${icon('copy')}</button>
        <span class="hero__location">${icon('pin')}<span>${esc(person.location)}</span></span>
      </div>
    </div>

    <div class="hero__visual reveal" style="--delay:200ms">
      <figure class="window">
        <div class="window__bar">
          <span class="window__dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="window__title mono">${esc(person.firstName.toLowerCase())}.profile</span>
        </div>
        ${visual}
        <figcaption class="window__foot mono"><span class="prompt">$</span> whoami: ${esc(person.fullName)}</figcaption>
      </figure>
      ${chips}
    </div>`;
}
