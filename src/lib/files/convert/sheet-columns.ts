import { printable, type FontSet } from "@/lib/files/pdf-write/fonts";
import { cellPadding } from "@/lib/files/pdf-write/table";
import type { SheetCell } from "@/lib/files/sheet/types";

export type ColumnChunk = { columns: number[]; widths: number[] };

export type ColumnPlan = { fontSize: number; chunks: ColumnChunk[] };

export const SHEET_FONT_SIZE = 9;

const MIN_FONT_SIZE = 6.5;
const MAX_COLUMN_SHARE = 0.4;
const MIN_COLUMN_EM = 2.5;
const SAMPLE_ROWS = 1000;
const ROUNDING_SLACK = 1;

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

export function hasHeaderRow(rows: SheetCell[][]) {
  if (rows.length < 2) return false;
  const [first] = rows;
  const filled = first.filter((cell) => cell.text.trim());
  return first.every((cell) => !cell.numeric) && filled.length >= Math.ceil(first.length / 2);
}

export function naturalWidths(rows: SheetCell[][], fonts: FontSet, header: boolean) {
  const columns = rows[0]?.length ?? 0;
  const widths = Array<number>(columns).fill(SHEET_FONT_SIZE * MIN_COLUMN_EM);
  rows.slice(0, SAMPLE_ROWS).forEach((row, rowIndex) => {
    const font = header && rowIndex === 0 ? fonts.bold : fonts.regular;
    row.forEach((cell, index) => {
      if (!cell.text) return;
      const longest = cell.text
        .split(/\r\n|\n|\r/)
        .reduce((widest, line) => Math.max(widest, font.widthOfTextAtSize(printable(font, line), SHEET_FONT_SIZE)), 0);
      widths[index] = Math.max(widths[index], longest + cellPadding(SHEET_FONT_SIZE) * 2 + ROUNDING_SLACK);
    });
  });
  return widths;
}

export function fitsWidth(natural: number[], contentWidth: number) {
  return sum(natural.map((width) => Math.min(width, contentWidth * MAX_COLUMN_SHARE))) <= contentWidth;
}

function chunkColumns(widths: number[], contentWidth: number): ColumnChunk[] {
  const chunks: ColumnChunk[] = [];
  let current: ColumnChunk = { columns: [], widths: [] };
  widths.forEach((width, index) => {
    if (current.columns.length && sum(current.widths) + width > contentWidth) {
      chunks.push(current);
      current = { columns: [], widths: [] };
    }
    current.columns.push(index);
    current.widths.push(width);
  });
  if (current.columns.length) chunks.push(current);
  return chunks;
}

export function planColumns(natural: number[], contentWidth: number): ColumnPlan {
  const capped = natural.map((width) => Math.min(width, contentWidth * MAX_COLUMN_SHARE));
  const all = capped.map((_, index) => index);
  const total = sum(capped);
  if (total <= contentWidth) return { fontSize: SHEET_FONT_SIZE, chunks: [{ columns: all, widths: capped }] };

  const fontSize = Math.max(MIN_FONT_SIZE, SHEET_FONT_SIZE * (contentWidth / total));
  const scaled = capped.map((width) => width * (fontSize / SHEET_FONT_SIZE));
  if (sum(scaled) <= contentWidth) return { fontSize, chunks: [{ columns: all, widths: scaled }] };
  return { fontSize, chunks: chunkColumns(scaled, contentWidth) };
}
