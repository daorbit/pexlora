import { formatMime } from "@/config/file-formats";
import { converterOutput } from "@/content/converters";
import type { CellValue, OutputSheet } from "@/lib/files/sheet/types";

const SHEET_NAME_LENGTH = 31;
const EXCEL_TEXT_LIMIT = 32_767;
const COLUMN_WIDTH = { min: 8, max: 60, padding: 2 };

function sheetName(name: string, index: number, used: Set<string>) {
  const clean = name.replace(/[[\]:*?/\\]/g, " ").trim().slice(0, SHEET_NAME_LENGTH) || converterOutput.sheetFallback(index + 1);
  let candidate = clean;
  for (let suffix = 2; used.has(candidate.toLowerCase()); suffix += 1) {
    const tail = ` (${suffix})`;
    candidate = `${clean.slice(0, SHEET_NAME_LENGTH - tail.length)}${tail}`;
  }
  used.add(candidate.toLowerCase());
  return candidate;
}

function columnWidths(rows: CellValue[][]) {
  const widths: number[] = [];
  rows.forEach((row) =>
    row.forEach((value, index) => {
      const length = value === null ? 0 : String(value).length;
      widths[index] = Math.max(widths[index] ?? 0, length);
    }),
  );
  return widths.map((width) => ({
    wch: Math.min(COLUMN_WIDTH.max, Math.max(COLUMN_WIDTH.min, width + COLUMN_WIDTH.padding)),
  }));
}

function fitText(rows: CellValue[][]) {
  return rows.map((row) => row.map((value) => (typeof value === "string" ? value.slice(0, EXCEL_TEXT_LIMIT) : value)));
}

export async function writeXlsx(sheets: OutputSheet[]) {
  const { utils, write } = await import("xlsx");
  const book = utils.book_new();
  const used = new Set<string>();
  sheets.forEach((sheet, index) => {
    const rows = fitText(sheet.rows);
    const worksheet = utils.aoa_to_sheet(rows.length ? rows : [[]]);
    worksheet["!cols"] = columnWidths(rows);
    utils.book_append_sheet(book, worksheet, sheetName(sheet.name, index, used));
  });
  const data: ArrayBuffer = write(book, { type: "array", bookType: "xlsx", compression: true });
  return new Blob([data], { type: formatMime("xlsx") });
}
