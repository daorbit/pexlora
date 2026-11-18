export type PaletteColor = { hex: string; rgb: [number, number, number]; share: number };

type Pixel = [number, number, number];

const MAX_SAMPLES = 24000;
const MIN_ALPHA = 125;

function samplePixels(data: Uint8ClampedArray) {
  const total = data.length / 4;
  const step = Math.max(1, Math.floor(total / MAX_SAMPLES));
  const pixels: Pixel[] = [];
  for (let index = 0; index < total; index += step) {
    const offset = index * 4;
    if (data[offset + 3] >= MIN_ALPHA) pixels.push([data[offset], data[offset + 1], data[offset + 2]]);
  }
  return pixels;
}

function widestChannel(box: Pixel[]) {
  const ranges = [0, 1, 2].map((channel) => {
    let min = 255;
    let max = 0;
    for (const pixel of box) {
      min = Math.min(min, pixel[channel]);
      max = Math.max(max, pixel[channel]);
    }
    return max - min;
  });
  const range = Math.max(...ranges);
  return { channel: ranges.indexOf(range), range };
}

function average(box: Pixel[]): Pixel {
  const sum = box.reduce((total, pixel) => [total[0] + pixel[0], total[1] + pixel[1], total[2] + pixel[2]], [0, 0, 0]);
  return sum.map((value) => Math.round(value / box.length)) as Pixel;
}

export function toHex([r, g, b]: Pixel) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export function isDark([r, g, b]: Pixel) {
  return 0.299 * r + 0.587 * g + 0.114 * b < 150;
}

export function extractPalette(data: Uint8ClampedArray, count: number): PaletteColor[] {
  const pixels = samplePixels(data);
  if (!pixels.length) return [];

  const boxes: Pixel[][] = [pixels];
  while (boxes.length < count) {
    let target = -1;
    let best = 0;
    boxes.forEach((box, index) => {
      if (box.length < 2) return;
      const score = widestChannel(box).range * Math.sqrt(box.length);
      if (score > best) {
        best = score;
        target = index;
      }
    });
    if (target < 0) break;

    const box = boxes[target];
    const { channel } = widestChannel(box);
    box.sort((a, b) => a[channel] - b[channel]);
    const middle = Math.floor(box.length / 2);
    boxes.splice(target, 1, box.slice(0, middle), box.slice(middle));
  }

  return boxes
    .filter((box) => box.length)
    .map((box) => {
      const rgb = average(box);
      return { hex: toHex(rgb), rgb, share: box.length / pixels.length };
    })
    .sort((a, b) => b.share - a.share);
}
