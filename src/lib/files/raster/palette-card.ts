import type { PaletteOptions } from "@/lib/image/options";
import { extractPalette, isDark } from "@/lib/image/palette";
import { encodeCanvas, LOSSLESS_QUALITY } from "@/lib/files/raster/encoders";
import { createSurface, drawScaled, readPixels } from "@/lib/files/raster/surface";
import type { RasterResult } from "@/lib/files/raster/types";

const SAMPLE_SIDE = 200;
const CARD_WIDTH = 1200;
const PHOTO_HEIGHT = 600;
const SWATCH_HEIGHT = 300;
const LABEL_FONT_FAMILY = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const LABEL_MAX_SIZE = 26;
const LABEL_WIDTH_RATIO = 5.4;
const LABEL_INSET = 24;

function labelFont(swatchWidth: number) {
  const size = Math.floor(Math.min(LABEL_MAX_SIZE, swatchWidth / LABEL_WIDTH_RATIO));
  return `600 ${size}px ${LABEL_FONT_FAMILY}`;
}

function sampleSize(bitmap: ImageBitmap) {
  const scale = Math.min(1, SAMPLE_SIDE / Math.max(bitmap.width, bitmap.height));
  return { width: Math.max(1, Math.round(bitmap.width * scale)), height: Math.max(1, Math.round(bitmap.height * scale)) };
}

function drawCover(context: OffscreenCanvasRenderingContext2D, bitmap: ImageBitmap, width: number, height: number) {
  const scale = Math.max(width / bitmap.width, height / bitmap.height);
  const sourceWidth = width / scale;
  const sourceHeight = height / scale;
  context.drawImage(bitmap, (bitmap.width - sourceWidth) / 2, (bitmap.height - sourceHeight) / 2, sourceWidth, sourceHeight, 0, 0, width, height);
}

export async function paletteCardInBrowser(bitmap: ImageBitmap, { size }: PaletteOptions): Promise<RasterResult> {
  const sample = sampleSize(bitmap);
  const colors = extractPalette(readPixels(drawScaled(bitmap, sample.width, sample.height, null)).data, Number(size));

  const height = PHOTO_HEIGHT + SWATCH_HEIGHT;
  const { canvas, context } = createSurface(CARD_WIDTH, height);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, CARD_WIDTH, height);
  drawCover(context, bitmap, CARD_WIDTH, PHOTO_HEIGHT);

  const swatchWidth = CARD_WIDTH / Math.max(1, colors.length);
  context.font = labelFont(swatchWidth);
  context.textAlign = "center";
  context.textBaseline = "bottom";
  colors.forEach((color, index) => {
    const x = Math.round(index * swatchWidth);
    context.fillStyle = color.hex;
    context.fillRect(x, PHOTO_HEIGHT, Math.ceil(swatchWidth), SWATCH_HEIGHT);
    context.fillStyle = isDark(color.rgb) ? "#ffffff" : "#10120d";
    context.fillText(color.hex, x + swatchWidth / 2, height - LABEL_INSET);
  });

  const buffer = await encodeCanvas(canvas, "png", LOSSLESS_QUALITY);
  return { buffer, format: "png", width: CARD_WIDTH, height, targetMet: null };
}
