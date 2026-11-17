let burst = 0;
const listeners = new Set<() => void>();

export function celebrate() {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  burst += 1;
  listeners.forEach((listener) => listener());
}

export function subscribeCelebrations(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getBurst() {
  return burst;
}

export function getServerBurst() {
  return 0;
}
