import type { WorkSheet } from "xlsx";
import { SHEET_CELL_LIMIT } from "@/config/limits";
import { converterErrors, converterOutput } from "@/content/converters";
import { detectFormat } from "@/lib/files/detect";
import { UnreadableFileError } from "@/lib/files/processors/types";
import { parseCsv } from "@/lib/files/sheet/csv";
import { toNumber } from "@/lib/files/sheet/number-cell";
import { formatNumberFallback } from "@/lib/files/sheet/number-format";
import { emptyGrid, trimTable } from "@/lib/files/sheet/trim-table";
import type { SheetCell, SheetTable } from "@/lib/files/sheet/types";
import { decodeText } from "@/lib/utils/decode-text";
import { baseName } from "@/lib/utils/file-name";

function checkCellCount(rows: number, columns: number) {
  if (rows * columns > SHEET_CELL_LIMIT) throw new UnreadableFileError(converterErrors.tooManyCells);
}

async function readCsv(file: File): Promise<SheetTable[]> {
  const rows = parseCsv(decodeText(await file.arrayBuffer()));
  checkCellCount(rows.length, rows.reduce((widest, row) => Math.max(widest, row.length), 0));
  const cells = rows.map((row) => row.map((text) => ({ text, numeric: toNumber(text) !== null })));
  return [{ name: baseName(file.name), rows: trimTable(cells) }];
}

async function sheetRows(sheet: WorkSheet): Promise<SheetCell[][]> {
  const { utils } = await import("xlsx");
  const filled = Object.keys(sheet)
    .filter((key) => !key.startsWith("!"))
    .flatMap((address) => {
      const cell = sheet[address];
      const text = cell.w ?? (typeof cell.v === "number" ? formatNumberFallback(cell.v, cell.z) : String(cell.v ?? ""));
      return text.trim() ? [{ ...utils.decode_cell(address), cell: { text, numeric: cell.t === "n" } }] : [];
    });
  if (!filled.length) return [];
  const bounds = filled.reduce(
    (box, { r, c }) => ({
      top: Math.min(box.top, r),
      left: Math.min(box.left, c),
      bottom: Math.max(box.bottom, r),
      right: Math.max(box.right, c),
    }),
    { top: Infinity, left: Infinity, bottom: 0, right: 0 },
  );
  const { top, left } = bounds;
  const height = bounds.bottom - top + 1;
  const width = bounds.right - left + 1;
  checkCellCount(height, width);
  const rows = emptyGrid(height, width);
  filled.forEach(({ r, c, cell }) => {
    rows[r - top][c - left] = cell;
  });
  return rows;
}

function isEncryptionError(error: unknown) {
  return error instanceof Error && /password|encrypt/i.test(error.message);
}

async function readWorkbook(file: File): Promise<SheetTable[]> {
  const { read } = await import("xlsx");
  let book;
  try {
    book = read(new Uint8Array(await file.arrayBuffer()), { type: "array", cellText: true, cellNF: true, cellDates: false });
  } catch (error) {
    if (isEncryptionError(error)) throw new UnreadableFileError(converterErrors.encryptedSheet);
    throw error;
  }
  const hidden = new Set(
    (book.Workbook?.Sheets ?? []).filter((sheet) => sheet.Hidden).map((sheet) => sheet.name),
  );
  const tables: SheetTable[] = [];
  for (const [index, name] of book.SheetNames.entries()) {
    if (hidden.has(name)) continue;
    tables.push({ name: name || converterOutput.sheetFallback(index + 1), rows: await sheetRows(book.Sheets[name]) });
  }
  return tables;
}

export async function readSheets(file: File) {
  const tables = detectFormat(file)?.id === "csv" ? await readCsv(file) : await readWorkbook(file);
  const filled = tables.filter((table) => table.rows.length);
  if (!filled.length) throw new UnreadableFileError(converterErrors.emptySheet);
  return filled;
}
