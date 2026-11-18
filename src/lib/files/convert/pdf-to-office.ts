import { converterOutput } from "@/content/converters";
import { writeDocx } from "@/lib/files/docx/write-docx";
import { readPdfText } from "@/lib/files/pdf/pdf-text";
import { groupLines, lineText, TABLE_GAP_EM } from "@/lib/files/pdf/text-lines";
import { bodyFontSize, headingSizes, linesToBlocks } from "@/lib/files/pdf/text-paragraphs";
import { linesToRows } from "@/lib/files/pdf/text-table";
import { toCellValue } from "@/lib/files/sheet/number-cell";
import type { CellValue, OutputSheet } from "@/lib/files/sheet/types";
import { writeXlsx } from "@/lib/files/sheet/write-xlsx";
import type { PdfSheetOptions } from "@/lib/image/options";
import { baseName } from "@/lib/utils/file-name";

const PARAGRAPH_GAP_RATIO = 1.8;
const PAGE_SEPARATOR = "\n\n\n";
const TEXT_TYPE = "text/plain";

export async function pdfToXlsx(file: File, { layout }: PdfSheetOptions) {
  const pages = (await readPdfText(file)).map((page) => ({
    number: page.number,
    rows: linesToRows(groupLines(page.runs, TABLE_GAP_EM)).map((row) => row.map(toCellValue)),
  }));
  const sheets: OutputSheet[] =
    layout === "page"
      ? pages.filter((page) => page.rows.length).map((page) => ({ name: converterOutput.pageSheet(page.number), rows: page.rows }))
      : [
          {
            name: baseName(file.name),
            rows: pages.flatMap((page, index): CellValue[][] => (index && page.rows.length ? [[], ...page.rows] : page.rows)),
          },
        ];
  return writeXlsx(sheets);
}

async function readPdfLines(file: File) {
  return (await readPdfText(file)).map((page) => groupLines(page.runs));
}

export async function pdfToDocx(file: File) {
  const pages = await readPdfLines(file);
  const lines = pages.flat();
  const body = bodyFontSize(lines);
  const sizes = headingSizes(lines, body);
  return writeDocx(
    pages.flatMap((page, pageIndex) =>
      linesToBlocks(page, body, sizes).map((block, index) => ({ ...block, pageBreakBefore: pageIndex > 0 && index === 0 })),
    ),
  );
}

export async function pdfToPlainText(file: File) {
  const pages = await readPdfLines(file);
  const text = pages
    .map((lines) =>
      lines
        .map((line, index) => {
          const previous = lines[index - 1];
          const gap = previous && line.y - previous.y > previous.size * PARAGRAPH_GAP_RATIO;
          return (gap ? "\n" : "") + lineText(line);
        })
        .join("\n"),
    )
    .join(PAGE_SEPARATOR);
  return new Blob([`${text}\n`], { type: TEXT_TYPE });
}
