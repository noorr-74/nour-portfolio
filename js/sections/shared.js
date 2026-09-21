// Markup helpers reused by several sections.
import { esc, hasText } from '../core/dom.js';
import { icon } from '../core/icons.js';

/** "Download CV" and "View CV" buttons, according to the cv settings in the data file. */
export function cvButtons(cv, sizeClass = '') {
  const parts = [];
  if (cv.showDownload) {
    parts.push(
      `<a class="btn btn--secondary${sizeClass}" href="${esc(cv.file)}" download="${esc(cv.downloadName)}">${icon('download')}<span>Download CV</span></a>`
    );
  }
  if (cv.showView) {
    parts.push(
      `<a class="btn btn--ghost${sizeClass}" href="${esc(cv.file)}" target="_blank" rel="noopener">${icon('eye')}<span>View CV</span></a>`
    );
  }
  return parts.join('');
}

/** A skill badge icon: a masked SVG from assets/icons/tech, or a small dot if there is none. */
export function techIcon(item) {
  if (item && hasText(item.icon)) {
    // The URL is set inline (not via a CSS variable) so it resolves relative to index.html.
    const url = `url('assets/icons/tech/${esc(item.icon)}.svg')`;
    return `<span class="tech-icon" style="-webkit-mask-image:${url}; mask-image:${url}" aria-hidden="true"></span>`;
  }
  return '<span class="tech-dot" aria-hidden="true"></span>';
}

/** Round icon links for the social profiles. */
export function socialIconLinks(socials) {
  return socials
    .map(
      (s) =>
        `<a class="icon-btn" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)} (opens in a new tab)" title="${esc(s.label)}">${icon(s.id)}</a>`
    )
    .join('');
}
