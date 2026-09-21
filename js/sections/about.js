import { esc } from '../core/dom.js';
import { icon } from '../core/icons.js';

export function renderAbout(root, { about }) {
  const facts = about.facts
    .map(
      (f, i) => `
      <li class="reveal" style="--delay:${i * 70}ms">
        <div class="card fact">
          <span class="fact__icon">${icon(f.icon)}</span>
          <span class="fact__label">${esc(f.label)}</span>
          <span class="fact__value">${esc(f.value)}</span>
          ${f.note ? `<span class="fact__note">${esc(f.note)}</span>` : ''}
        </div>
      </li>`
    )
    .join('');

  root.innerHTML = `
    <div class="about__grid">
      <div class="about__text reveal">
        ${about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
        <div class="learning">
          <span class="learning__label">${esc(about.learningLabel)}</span>
          <ul class="learning__list">${about.learning.map((l) => `<li class="chip">${esc(l)}</li>`).join('')}</ul>
        </div>
      </div>
      <ul class="about__facts">${facts}</ul>
    </div>`;
}
