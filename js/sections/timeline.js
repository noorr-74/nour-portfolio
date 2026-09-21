import { esc, hasText } from '../core/dom.js';
import { icon } from '../core/icons.js';

const TYPES = {
  education: { label: 'Education', icon: 'graduation' },
  training: { label: 'Training', icon: 'code' },
  internship: { label: 'Internship', icon: 'terminal' },
  work: { label: 'Work', icon: 'briefcase' },
};

export function renderTimeline(root, { timeline }) {
  root.innerHTML = `<ol class="timeline">${timeline
    .map((item, i) => {
      const type = TYPES[item.type] || TYPES.work;
      const tags = (item.tags || []).map((t) => `<li class="chip chip--mono">${esc(t)}</li>`).join('');
      return `
      <li class="tl-item reveal" style="--delay:${i * 70}ms">
        <span class="tl-item__marker" aria-hidden="true">${icon(type.icon)}</span>
        <article class="card tl-card">
          <div class="tl-card__meta">
            <span class="badge">${type.label}</span>
            ${hasText(item.period) ? `<span class="tl-card__period mono">${esc(item.period)}</span>` : ''}
          </div>
          <h3 class="tl-card__title">${esc(item.title)}</h3>
          <p class="tl-card__org">${esc(item.org)}</p>
          ${hasText(item.description) ? `<p class="tl-card__desc">${esc(item.description)}</p>` : ''}
          ${tags ? `<ul class="tl-card__tags" aria-label="Topics">${tags}</ul>` : ''}
        </article>
      </li>`;
    })
    .join('')}</ol>`;
}
