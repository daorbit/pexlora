const delays = [
  "[--row-delay:0ms]",
  "[--row-delay:45ms]",
  "[--row-delay:90ms]",
  "[--row-delay:135ms]",
  "[--row-delay:180ms]",
  "[--row-delay:225ms]",
  "[--row-delay:270ms]",
  "[--row-delay:315ms]",
  "[--row-delay:360ms]",
  "[--row-delay:405ms]",
];

export const ANIMATED_ROWS = delays.length;

export function rowDelay(index: number) {
  return delays[Math.min(index, delays.length - 1)];
}
