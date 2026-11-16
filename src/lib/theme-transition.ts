import { flushSync } from "react-dom";

type ViewTransition = { ready: Promise<void>; finished: Promise<void> };
type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => ViewTransition };

const REVEAL_CLASS = "theme-reveal";
const DURATION_MS = 1000;
const EASING = "cubic-bezier(0.45, 0, 0.15, 1)";

export function runThemeTransition(origin: HTMLElement | null, apply: () => void) {
  const doc = document as ViewTransitionDocument;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduceMotion || !origin) return apply();

  const rect = origin.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const root = document.documentElement;

  root.classList.add(REVEAL_CLASS);
  const transition = doc.startViewTransition(() => flushSync(apply));

  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: DURATION_MS, easing: EASING, pseudoElement: "::view-transition-new(root)" },
    );
  });
  transition.finished.finally(() => root.classList.remove(REVEAL_CLASS));
}
