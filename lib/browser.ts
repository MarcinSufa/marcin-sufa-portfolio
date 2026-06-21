/** Small client-only platform helpers shared by the hero canvas components. */

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * True on phone-sized viewports (<=720px). Used to skip the heavy hero
 * animations on mobile (perf: no three.js, no canvas loops, no continuous
 * motion that wrecks Speed Index). Desktop keeps the full experience.
 */
export function isSmallScreen(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 720px)").matches
  );
}

/** Device pixel ratio, clamped so we never allocate oversized canvases. */
export function clampDpr(max = 2): number {
  if (typeof window === "undefined") return 1;
  return Math.min(max, window.devicePixelRatio || 1);
}

/**
 * Invokes `onChange(visible)` whenever `el` enters or leaves the viewport.
 * Lets expensive animation loops pause while scrolled off-screen.
 * Returns a disconnect function.
 */
export function watchVisibility(
  el: Element,
  onChange: (visible: boolean) => void,
  threshold = 0,
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    onChange(true);
    return () => {};
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) onChange(entry.isIntersecting);
    },
    { threshold },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
