import type { SheetCell } from "@/lib/files/sheet/types";

const EMPTY_CELL: SheetCell = { text: "", numeric: false };

export function trimTable(rows: SheetCell[][]) {
  let lastRow = -1;
  let lastColumn = -1;
  rows.forEach((row, rowIndex) =>
    row.forEach((cell, columnIndex) => {
      if (!cell.text.trim()) return;
      lastRow = Math.max(lastRow, rowIndex);
      lastColumn = Math.max(lastColumn, columnIndex);
    }),
  );
  return rows
    .slice(0, lastRow + 1)
    .map((row) => Array.from({ length: lastColumn + 1 }, (_, index) => row[index] ?? EMPTY_CELL));
}

export function emptyGrid(height: number, width: number) {
  return Array.from({ length: height }, () => Array<SheetCell>(width).fill(EMPTY_CELL));
}
