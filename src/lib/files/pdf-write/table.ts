import { PDF_COLORS } from "@/config/pdf-output";
import { printableLines, type FontSet } from "@/lib/files/pdf-write/fonts";
import type { PdfFlow } from "@/lib/files/pdf-write/pdf-flow";
import { wrapText } from "@/lib/files/pdf-write/text-wrap";

export type TableCell = { text: string; bold?: boolean; align?: "left" | "right" };

export type TableLayout = { columnWidths: number[]; fontSize: number; headerRows: number };

const LINE_HEIGHT = 1.25;
const BASELINE = 0.82;
const PADDING_EM = { x: 0.45, y: 0.35 };

type MeasuredRow = { cells: { lines: string[]; cell: TableCell }[]; height: number };

export const cellPadding = (fontSize: number) => fontSize * PADDING_EM.x;

function measureRow(row: TableCell[], fonts: FontSet, layout: TableLayout, maxHeight: number): MeasuredRow {
  const { fontSize, columnWidths } = layout;
  const lineHeight = fontSize * LINE_HEIGHT;
  const padY = fontSize * PADDING_EM.y;
  const maxLines = Math.max(1, Math.floor((maxHeight - padY * 2) / lineHeight));
  const cells = columnWidths.map((width, index) => {
    const cell = row[index] ?? { text: "" };
    const font = cell.bold ? fonts.bold : fonts.regular;
    const inner = Math.max(1, width - cellPadding(fontSize) * 2);
    return { cell, lines: wrapText(printableLines(font, cell.text), font, fontSize, inner).slice(0, maxLines) };
  });
  const lines = cells.reduce((most, { lines: cellLines }) => Math.max(most, cellLines.length), 1);
  return { cells, height: lines * lineHeight + padY * 2 };
}

function drawRow(flow: PdfFlow, fonts: FontSet, layout: TableLayout, row: MeasuredRow, header: boolean) {
  const { fontSize, columnWidths } = layout;
  const lineHeight = fontSize * LINE_HEIGHT;
  const padX = cellPadding(fontSize);
  const padY = fontSize * PADDING_EM.y;
  let x = flow.left;
  row.cells.forEach(({ cell, lines }, index) => {
    const width = columnWidths[index];
    flow.rect(x, flow.top, width, row.height, { fill: header ? PDF_COLORS.headerFill : undefined, border: PDF_COLORS.border });
    const font = cell.bold ? fonts.bold : fonts.regular;
    lines.forEach((text, lineIndex) => {
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const textX = cell.align === "right" ? x + width - padX - textWidth : x + padX;
      flow.text(text, textX, flow.top + padY + lineIndex * lineHeight + fontSize * BASELINE, font, fontSize);
    });
    x += width;
  });
  flow.advance(row.height);
}

export function drawTable(flow: PdfFlow, fonts: FontSet, rows: TableCell[][], layout: TableLayout) {
  const maxHeight = flow.contentHeight;
  const headers = rows.slice(0, layout.headerRows).map((row) => measureRow(row, fonts, layout, maxHeight));
  const headerHeight = headers.reduce((total, row) => total + row.height, 0);
  const drawHeaders = () => headers.forEach((row) => drawRow(flow, fonts, layout, row, true));

  flow.ensure(headerHeight + (rows[layout.headerRows] ? measureRow(rows[layout.headerRows], fonts, layout, maxHeight).height : 0));
  drawHeaders();
  for (const row of rows.slice(layout.headerRows)) {
    const measured = measureRow(row, fonts, layout, maxHeight - headerHeight);
    if (measured.height > flow.remaining) {
      flow.newPage();
      drawHeaders();
    }
    drawRow(flow, fonts, layout, measured, false);
  }
}
