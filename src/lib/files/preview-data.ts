import { PREVIEW_SHEET_ROWS, PREVIEW_TEXT_LINES } from "@/config/limits";
import type { SheetCell } from "@/lib/files/sheet/types";
import { decodeText } from "@/lib/utils/decode-text";

export type TextPreview = { lines: string[]; total: number };

export type SheetPreview = { name: string; rows: SheetCell[][]; total: number };

export async function loadTextPreview(blob: Blob): Promise<TextPreview> {
  const lines = decodeText(await blob.arrayBuffer()).replace(/\s+$/, "").split(/\r\n|\n|\r/);
  return { lines: lines.slice(0, PREVIEW_TEXT_LINES), total: lines.length };
}

export async function loadSheetPreview(blob: Blob, name: string): Promise<SheetPreview[]> {
  const { readSheets } = await import("@/lib/files/sheet/read-sheets");
  const sheets = await readSheets(new File([blob], name, { type: blob.type }));
  return sheets.map((sheet) => ({ name: sheet.name, rows: sheet.rows.slice(0, PREVIEW_SHEET_ROWS), total: sheet.rows.length }));
}
