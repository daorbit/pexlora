const delays = [
  "[animation-delay:0ms]",
  "[animation-delay:40ms]",
  "[animation-delay:80ms]",
  "[animation-delay:120ms]",
  "[animation-delay:160ms]",
  "[animation-delay:200ms]",
  "[animation-delay:240ms]",
  "[animation-delay:280ms]",
  "[animation-delay:320ms]",
  "[animation-delay:360ms]",
  "[animation-delay:400ms]",
  "[animation-delay:440ms]",
  "[animation-delay:480ms]",
  "[animation-delay:520ms]",
];

export function staggerDelay(index: number) {
  return delays[Math.min(index, delays.length - 1)];
}
