import { $, $$, esc, hasText, prefersReducedMotion } from '../core/dom.js';
import { icon } from '../core/icons.js';

// Purple-family gradient pairs used for project cards that have no screenshot.
const PALETTES = [
  ['#a855f7', '#6366f1'],
  ['#c084fc', '#818cf8'],
  ['#8b5cf6', '#d946ef'],
];

function media(project, index, extraClass = '') {
  if (hasText(project.image)) {
    return `<div class="project-card__media ${extraClass}"><img src="${esc(project.image)}" alt="Screenshot of ${esc(project.name)}" loading="lazy" decoding="async"></div>`;
  }
  const [m1, m2] = PALETTES[index % PALETTES.length];
  return `<div class="project-card__media project-card__media--art ${extraClass}" style="--m1:${m1}; --m2:${m2}" aria-hidden="true">
      <span class="project-card__glyph mono">&lt;/&gt;</span>
      <span class="project-card__lang mono">${esc(project.tech[0] || '')}</span>
    </div>`;
}

function links(project, className = 'btn--ghost btn--sm') {
  const out = [];
  if (hasText(project.github)) {
    out.push(`<a class="btn ${className}" href="${esc(project.github)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(project.name)} source code on GitHub (opens in a new tab)">${icon('github')}<span>GitHub</span></a>`);
  }
  if (hasText(project.demo)) {
    out.push(`<a class="btn ${className}" href="${esc(project.demo)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(project.name)} live demo (opens in a new tab)">${icon('external')}<span>Live demo</span></a>`);
  }
  return out.join('');
}

function card(project, index) {
  return `
    <li class="project-grid__item reveal" style="--delay:${index * 80}ms" data-categories="${esc((project.categories || []).join('|'))}">
      <article class="card card--lift project-card" data-project="${esc(project.id)}">
        ${media(project, index)}
        <div class="project-card__body">
          <h3 class="project-card__title">${esc(project.name)}</h3>
          <p class="project-card__desc">${esc(project.short)}</p>
          <ul class="project-card__tags" aria-label="Technologies used">${project.tech.map((t) => `<li class="chip chip--mono">${esc(t)}</li>`).join('')}</ul>
          <div class="project-card__actions">
            <button class="btn btn--primary btn--sm" type="button" data-open-project="${esc(project.id)}">View details</button>
            ${links(project)}
          </div>
        </div>
      </article>
    </li>`;
}

function modalContent(project, index) {
  const cats = (project.categories || []).map((c) => `<li class="badge">${esc(c)}</li>`).join('');
  return `
    <div class="modal__panel">
      <div class="modal__bar">
        <span class="modal__path mono">projects/${esc(project.id)}</span>
        <button class="icon-btn" type="button" data-close-modal aria-label="Close project details">${icon('x')}</button>
      </div>
      ${media(project, index, 'modal__media')}
      <div class="modal__content">
        <header>
          <h3 class="modal__title" id="project-dialog-title">${esc(project.name)}</h3>
          ${cats ? `<ul class="modal__cats" aria-label="Categories">${cats}</ul>` : ''}
        </header>
        <p class="modal__desc">${esc(project.description)}</p>
        ${project.features?.length ? `<section><h4 class="modal__h">Main features</h4><ul class="feature-list">${project.features.map((f) => `<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul></section>` : ''}
        <section><h4 class="modal__h">Technologies</h4><ul class="modal__tech">${project.tech.map((t) => `<li class="chip chip--mono">${esc(t)}</li>`).join('')}</ul></section>
        ${hasText(project.role) ? `<section><h4 class="modal__h">My role</h4><p class="modal__desc">${esc(project.role)}</p></section>` : ''}
        <div class="modal__actions">${links(project, 'btn--secondary')}</div>
      </div>
    </div>`;
}

export function renderProjects(root, { projects, socials }) {
  const categories = [...new Set(projects.flatMap((p) => p.categories || []))];
  const count = (c) => projects.filter((p) => (p.categories || []).includes(c)).length;
  const github = socials.find((s) => s.id === 'github');

  const filters =
    categories.length > 1
      ? `<div class="filters reveal" role="group" aria-label="Filter projects by category">
          <button class="filter" type="button" data-filter="all" aria-pressed="true">All<span class="filter__count">${projects.length}</span></button>
          ${categories.map((c) => `<button class="filter" type="button" data-filter="${esc(c)}" aria-pressed="false">${esc(c)}<span class="filter__count">${count(c)}</span></button>`).join('')}
        </div>`
      : '';

  root.innerHTML = `
    ${filters}
    <p class="sr-only" id="project-status" role="status"></p>
    <ul class="project-grid" id="project-grid">${projects.map(card).join('')}</ul>
    ${github ? `<div class="projects__more reveal"><a class="btn btn--secondary" href="${esc(github.url)}?tab=repositories" target="_blank" rel="noopener noreferrer">${icon('github')}<span>See all repositories on GitHub</span></a></div>` : ''}`;
}

/** Wire up filtering and the details modal. Call after renderProjects(). */
export function initProjects(root, projects) {
  const reduce = prefersReducedMotion();
  const items = $$('.project-grid__item', root);
  const buttons = $$('.filter', root);
  const status = $('#project-status', root);

  function applyFilter(value) {
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === value)));
    let visible = 0;
    items.forEach((li) => {
      const cats = (li.dataset.categories || '').split('|');
      const show = value === 'all' || cats.includes(value);
      const cardEl = li.firstElementChild;
      clearTimeout(li._timer);
      if (show) {
        visible += 1;
        if (li.hidden) {
          li.hidden = false;
          cardEl.classList.add('is-hiding');
          requestAnimationFrame(() => requestAnimationFrame(() => cardEl.classList.remove('is-hiding')));
        } else {
          cardEl.classList.remove('is-hiding');
        }
      } else {
        cardEl.classList.add('is-hiding');
        li._timer = setTimeout(() => { li.hidden = true; }, reduce ? 0 : 280);
      }
    });
    if (status) status.textContent = `Showing ${visible} of ${items.length} projects`;
  }

  buttons.forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  /* ----- Details modal ----- */
  const dialog = $('#project-dialog');
  if (!dialog) return;
  let opener = null;

  function open(id, trigger) {
    const index = projects.findIndex((p) => p.id === id);
    if (index < 0) return;
    opener = trigger || document.activeElement;
    dialog.innerHTML = modalContent(projects[index], index);
    document.body.classList.add('modal-open');
    dialog.showModal();
    const panel = $('.modal__panel', dialog);
    if (panel) panel.scrollTop = 0;
  }

  function close() {
    if (!dialog.open) return;
    if (reduce) { dialog.close(); return; }
    dialog.classList.add('is-closing');
    setTimeout(() => { dialog.classList.remove('is-closing'); dialog.close(); }, 200);
  }

  root.addEventListener('click', (e) => {
    const button = e.target.closest('[data-open-project]');
    if (button) { open(button.dataset.openProject, button); return; }
    // Clicking anywhere else on a card (but not on a link or button) also opens it.
    const cardEl = e.target.closest('.project-card');
    if (cardEl && !e.target.closest('a, button')) open(cardEl.dataset.project, cardEl.querySelector('[data-open-project]'));
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target.closest('[data-close-modal]')) close();
  });
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); close(); }); // Escape key
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (opener && typeof opener.focus === 'function') opener.focus();
  });
}
