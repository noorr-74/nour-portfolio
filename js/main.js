// Entry point: renders every section from the data file, then switches on the interactions.
import { portfolio } from './data/portfolio.js';
import { $ } from './core/dom.js';
import { hydrateIcons } from './core/icons.js';
import { renderHero } from './sections/hero.js';
import { renderAbout } from './sections/about.js';
import { renderSkills } from './sections/skills.js';
import { renderProjects, initProjects } from './sections/projects.js';
import { renderTimeline } from './sections/timeline.js';
import { renderContact } from './sections/contact.js';
import { renderFooter } from './sections/footer.js';
import { initTheme } from './features/theme.js';
import { initNav } from './features/nav.js';
import { initScrollUI } from './features/scroll.js';
import { initTyping } from './features/typing.js';
import { initReveal } from './features/reveal.js';
import { initGlow } from './features/glow.js';
import { initCopy } from './features/copy.js';
import { applyCvLinks } from './features/cv.js';
import { initBackground } from './features/background.js';

function boot() {
  hydrateIcons();

  renderHero($('#hero-root'), portfolio);
  renderAbout($('#about-root'), portfolio);
  renderSkills($('#skills-root'), portfolio);
  renderProjects($('#projects-root'), portfolio);
  renderTimeline($('#timeline-root'), portfolio);
  renderContact($('#contact-root'), portfolio);
  renderFooter($('#footer-root'), portfolio);

  applyCvLinks(portfolio.cv);
  initTheme();
  initNav();
  initScrollUI();
  initGlow();
  initCopy();
  initProjects($('#projects-root'), portfolio.projects);
  initTyping($('#typed'), portfolio.hero.typingWords);
  initBackground();
  initReveal();
}

try {
  boot();
} catch (error) {
  // If anything fails, make sure the content is still visible.
  console.error('Portfolio failed to start:', error);
  document.documentElement.classList.remove('js');
}
