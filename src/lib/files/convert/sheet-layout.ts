import { PASSPORT_PHOTO_MM, PRINT_SHEET_MM, SHEET_GAP_MM, SHEET_MARGIN_MM, type SizeMm } from "@/config/print-sizes";
import type { PassportOptions } from "@/lib/image/options";

export type SheetLayout = { sheet: SizeMm; photo: SizeMm; columns: number; rows: number; count: number };

const fitAlong = (length: number, item: number) =>
  Math.max(0, Math.floor((length - SHEET_MARGIN_MM * 2 + SHEET_GAP_MM) / (item + SHEET_GAP_MM)));

function gridOn(sheet: SizeMm, photo: SizeMm) {
  const columns = fitAlong(sheet.width, photo.width);
  const rows = fitAlong(sheet.height, photo.height);
  return { sheet, columns, rows, fits: columns * rows };
}

export type SheetCell = { x: number; y: number; width: number; height: number };

export function sheetCells({ sheet, photo, columns, rows, count }: SheetLayout): SheetCell[] {
  const gridWidth = columns * photo.width + (columns - 1) * SHEET_GAP_MM;
  const gridHeight = rows * photo.height + (rows - 1) * SHEET_GAP_MM;
  const left = (sheet.width - gridWidth) / 2;
  const top = (sheet.height - gridHeight) / 2;
  return Array.from({ length: count }, (_, index) => ({
    x: left + (index % columns) * (photo.width + SHEET_GAP_MM),
    y: top + Math.floor(index / columns) * (photo.height + SHEET_GAP_MM),
    width: photo.width,
    height: photo.height,
  }));
}

export function sheetLayout({ size, sheet, copies }: Pick<PassportOptions, "size" | "sheet" | "copies">): SheetLayout {
  const photo = PASSPORT_PHOTO_MM[size];
  const portrait = PRINT_SHEET_MM[sheet];
  const landscape = { width: portrait.height, height: portrait.width };
  const best = [gridOn(portrait, photo), gridOn(landscape, photo)].reduce((a, b) => (b.fits > a.fits ? b : a));
  const count = copies === "fill" ? best.fits : Math.min(Number(copies), best.fits);
  const rows = best.columns ? Math.ceil(count / best.columns) : 0;
  return { sheet: best.sheet, photo, columns: best.columns, rows, count };
}
