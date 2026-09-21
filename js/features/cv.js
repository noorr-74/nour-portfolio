import { $$ } from '../core/dom.js';

/** Point the CV link in the header at the file defined in the data file. */
export function applyCvLinks(cv) {
  $$('[data-cv]').forEach((a) => {
    a.href = cv.file;
    if (a.dataset.cv === 'view') a.hidden = !cv.showView;
  });
}
