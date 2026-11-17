import { PASSPORT_JPEG_QUALITY, PRINT_DPI } from "@/config/print-sizes";
import { createCanvas, drawCovered } from "@/lib/files/convert/canvas-cover";
import { canvasToBlob, decodeImage } from "@/lib/files/convert/image-decode";
import { withJpegDpi } from "@/lib/files/convert/jpeg-density";
import { sheetCells, sheetLayout, type SheetLayout } from "@/lib/files/convert/sheet-layout";
import { UnreadableFileError } from "@/lib/files/processors/types";
import type { PassportOptions } from "@/lib/image/options";

const CUT_LINE_COLOR = "#c9c9c9";

const toPixels = (mm: number) => Math.round((mm / 25.4) * PRINT_DPI);

export type PassportSheet = { blob: Blob; layout: SheetLayout; width: number; height: number };

function drawSheet(photo: HTMLCanvasElement, layout: SheetLayout) {
  const { canvas, context } = createCanvas({ width: toPixels(layout.sheet.width), height: toPixels(layout.sheet.height) });
  context.strokeStyle = CUT_LINE_COLOR;
  context.lineWidth = 1;
  for (const cell of sheetCells(layout)) {
    const x = toPixels(cell.x);
    const y = toPixels(cell.y);
    context.drawImage(photo, x, y);
    context.strokeRect(x - 0.5, y - 0.5, photo.width + 1, photo.height + 1);
  }
  return canvas;
}

export async function makePassportSheet(file: File, options: PassportOptions): Promise<PassportSheet> {
  const layout = sheetLayout(options);
  if (!layout.count) throw new UnreadableFileError("This photo size doesn't fit on the chosen sheet.");

  const bitmap = await decodeImage(file);
  try {
    const photo = drawCovered(bitmap, { width: toPixels(layout.photo.width), height: toPixels(layout.photo.height) });
    const sheet = drawSheet(photo, layout);
    const blob = await withJpegDpi(await canvasToBlob(sheet, "image/jpeg", PASSPORT_JPEG_QUALITY), PRINT_DPI);
    return { blob, layout, width: sheet.width, height: sheet.height };
  } finally {
    bitmap.close();
  }
}
