import { esc } from '../core/dom.js';
import { icon } from '../core/icons.js';
import { techIcon } from './shared.js';

// Column spans for the bento layout (6-column grid). The pattern repeats if you add groups.
const SPANS = [3, 3, 2, 2, 2];

export function renderSkills(root, { skills }) {
  root.innerHTML = `<ul class="skills__grid">${skills
    .map(
      (group, i) => `
      <li class="skills__item reveal" style="--span:${SPANS[i % SPANS.length]}; --delay:${i * 70}ms">
        <article class="card card--lift skill-card">
          <header class="skill-card__head">
            <span class="skill-card__icon">${icon(group.icon)}</span>
            <h3 class="skill-card__title">${esc(group.title)}</h3>
          </header>
          <ul class="skill-card__list">${group.items
            .map((item, n) => `<li class="chip skill-chip" style="--n:${n}">${techIcon(item)}<span>${esc(item.name)}</span></li>`)
            .join('')}</ul>
        </article>
      </li>`
    )
    .join('')}</ul>`;
}
