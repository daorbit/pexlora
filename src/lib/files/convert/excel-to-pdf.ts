import { converterOutput } from "@/content/converters";
import { fitsWidth, hasHeaderRow, naturalWidths } from "@/lib/files/convert/sheet-columns";
import { drawSheetTable } from "@/lib/files/convert/sheet-table";
import { newPdfDocument, pdfBlob } from "@/lib/files/pdf/pdf-blob";
import { embedFonts, printable, type FontSet } from "@/lib/files/pdf-write/fonts";
import { pageFrame, PdfFlow, type PageFrame } from "@/lib/files/pdf-write/pdf-flow";
import { readSheets } from "@/lib/files/sheet/read-sheets";
import type { PdfPageOptions } from "@/lib/image/options";

const TITLE_SIZE = 12;
const TITLE_SPACING = 1.7;

function chooseFrame({ size, orientation }: PdfPageOptions, natural: number[]): PageFrame {
  if (orientation !== "auto") return pageFrame(size, orientation === "landscape");
  const portrait = pageFrame(size, false);
  return fitsWidth(natural, portrait.width - portrait.margin * 2) ? portrait : pageFrame(size, true);
}

function drawTitle(flow: PdfFlow, fonts: FontSet, title: string) {
  flow.text(printable(fonts.bold, title), flow.left, flow.top + TITLE_SIZE, fonts.bold, TITLE_SIZE);
  flow.advance(TITLE_SIZE * TITLE_SPACING);
}

export async function excelToPdf(file: File, options: PdfPageOptions) {
  const sheets = await readSheets(file);
  const doc = await newPdfDocument();
  const fonts = await embedFonts(doc, ["bold"]);
  const flow = new PdfFlow(doc, pageFrame(options.size, options.orientation === "landscape"));
  const titled = sheets.length > 1;

  for (const sheet of sheets) {
    const header = hasHeaderRow(sheet.rows);
    const natural = naturalWidths(sheet.rows, fonts, header);
    flow.newPage(chooseFrame(options, natural));
    if (titled) drawTitle(flow, fonts, sheet.name);
    drawSheetTable(flow, fonts, sheet.rows, {
      header,
      natural,
      beforeChunk: (index) => {
        if (!index) return;
        flow.newPage();
        drawTitle(flow, fonts, converterOutput.continued(sheet.name));
      },
    });
  }
  return pdfBlob(await doc.save());
}
