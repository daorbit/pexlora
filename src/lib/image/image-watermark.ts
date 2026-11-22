import { IMAGE_WATERMARK_ALPHA, type ImageWatermarkOptions } from "@/lib/image/options";

export type WatermarkMark = { x: number; y: number; angle: number; anchor: "end" | "middle" };

export type WatermarkLayout = {
  fontSize: number;
  strokeWidth: number;
  alpha: number;
  fill: string;
  stroke: string;
  marks: WatermarkMark[];
};

const FONT_SCALE = { corner: 0.045, diagonal: 0.1, tiled: 0.05 } as const;
const MIN_FONT_SIZE = 12;
const CHAR_WIDTH = 0.6;
const DIAGONAL = -30;
const INK = { white: "#ffffff", black: "#000000" } as const;

export const WATERMARK_FONT_WEIGHT = 600;
export const WATERMARK_FONT_FAMILY = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

export function watermarkFont(fontSize: number) {
  return `${WATERMARK_FONT_WEIGHT} ${fontSize}px ${WATERMARK_FONT_FAMILY}`;
}

function tiledMarks(width: number, height: number, fontSize: number, textLength: number): WatermarkMark[] {
  const stepX = Math.max(fontSize * CHAR_WIDTH * textLength * 1.6, fontSize * 6);
  const stepY = fontSize * 4;
  const marks: WatermarkMark[] = [];
  for (let row = 0, y = stepY / 2; y < height + stepY; row++, y += stepY) {
    const offset = row % 2 ? stepX / 2 : 0;
    for (let x = -stepX + offset; x < width + stepX; x += stepX) marks.push({ x, y, angle: DIAGONAL, anchor: "middle" });
  }
  return marks;
}

export function imageWatermarkLayout(width: number, height: number, options: ImageWatermarkOptions): WatermarkLayout {
  const text = options.text.trim();
  const fontSize = Math.max(MIN_FONT_SIZE, Math.round(Math.min(width, height) * FONT_SCALE[options.position]));
  const margin = fontSize * 0.9;
  const opposite = options.color === "white" ? INK.black : INK.white;

  const marks: WatermarkMark[] =
    options.position === "corner"
      ? [{ x: width - margin, y: height - margin - fontSize / 2, angle: 0, anchor: "end" }]
      : options.position === "diagonal"
        ? [{ x: width / 2, y: height / 2, angle: DIAGONAL, anchor: "middle" }]
        : tiledMarks(width, height, fontSize, text.length);

  return {
    fontSize,
    strokeWidth: Math.max(1, fontSize * 0.05),
    alpha: IMAGE_WATERMARK_ALPHA[options.opacity],
    fill: INK[options.color],
    stroke: opposite,
    marks,
  };
}
