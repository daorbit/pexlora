const patterns = {
  success: [18, 60, 28],
  error: [40, 50, 40],
} as const;

export function vibrate(kind: keyof typeof patterns) {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  navigator.vibrate(patterns[kind]);
}
