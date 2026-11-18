import { formatMime } from "@/config/file-formats";
import type { NamedBlob } from "@/lib/files/pdf/pdf-tools";
import { formatCsv } from "@/lib/files/sheet/csv";
import { toCellValue } from "@/lib/files/sheet/number-cell";
import { readSheets } from "@/lib/files/sheet/read-sheets";
import { writeXlsx } from "@/lib/files/sheet/write-xlsx";
import { UTF8_BOM } from "@/lib/utils/decode-text";
import { baseName } from "@/lib/utils/file-name";

const safeName = (name: string) => name.replace(/[\\/:*?"<>|]+/g, "-").trim();

export async function csvToXlsx(file: File) {
  const tables = await readSheets(file);
  return writeXlsx(
    tables.map((table) => ({ name: table.name, rows: table.rows.map((row) => row.map((cell) => toCellValue(cell.text))) })),
  );
}

export async function workbookToCsv(file: File): Promise<NamedBlob[]> {
  const tables = await readSheets(file);
  const stem = baseName(file.name);
  return tables.map((table) => ({
    name: tables.length === 1 ? `${stem}.csv` : `${stem}-${safeName(table.name)}.csv`,
    blob: new Blob([UTF8_BOM + formatCsv(table.rows.map((row) => row.map((cell) => cell.text)))], { type: formatMime("csv") }),
  }));
}
