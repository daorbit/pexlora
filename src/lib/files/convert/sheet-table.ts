import { planColumns } from "@/lib/files/convert/sheet-columns";
import type { FontSet } from "@/lib/files/pdf-write/fonts";
import type { PdfFlow } from "@/lib/files/pdf-write/pdf-flow";
import { drawTable, type TableCell } from "@/lib/files/pdf-write/table";
import type { SheetCell } from "@/lib/files/sheet/types";

type SheetTableOptions = {
  header: boolean;
  natural: number[];
  beforeChunk?: (index: number) => void;
};

function tableRows(rows: SheetCell[][], columns: number[], header: boolean): TableCell[][] {
  return rows.map((row, rowIndex) =>
    columns.map((column) => {
      const cell = row[column] ?? { text: "", numeric: false };
      const isHeader = header && rowIndex === 0;
      return { text: cell.text, bold: isHeader, align: cell.numeric && !isHeader ? "right" : "left" };
    }),
  );
}

export function drawSheetTable(flow: PdfFlow, fonts: FontSet, rows: SheetCell[][], options: SheetTableOptions) {
  const plan = planColumns(options.natural, flow.contentWidth);
  plan.chunks.forEach((chunk, index) => {
    options.beforeChunk?.(index);
    drawTable(flow, fonts, tableRows(rows, chunk.columns, options.header), {
      columnWidths: chunk.widths,
      fontSize: plan.fontSize,
      headerRows: options.header ? 1 : 0,
    });
  });
}
