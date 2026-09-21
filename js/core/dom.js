// Small DOM + string helpers shared by every module.

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escape text before inserting it into an HTML template. */
export const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** True for a non-empty string (used to skip optional fields such as a live demo URL). */
export const hasText = (value) => typeof value === 'string' && value.trim() !== '';
