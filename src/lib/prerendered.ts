/**
 * True when the page arrived with its content already in #root (scripts/prerender.mjs). The hero
 * then skips its entrance fade: the words are on screen from the first paint, and fading them out
 * and back in on load would only flicker and delay the largest paint.
 */
export const PRERENDERED = typeof document !== "undefined" && Boolean(document.getElementById("root")?.hasChildNodes());
