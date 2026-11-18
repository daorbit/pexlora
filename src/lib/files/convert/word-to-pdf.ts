import type { PDFDocument, PDFImage } from "pdf-lib";
import { converterErrors } from "@/content/converters";
import { BODY_SIZE, htmlToBlocks, type DocBlock } from "@/lib/files/convert/docx-blocks";
import { bitmapToBlob } from "@/lib/files/convert/image-decode";
import { naturalWidths } from "@/lib/files/convert/sheet-columns";
import { drawSheetTable } from "@/lib/files/convert/sheet-table";
import { newPdfDocument, pdfBlob } from "@/lib/files/pdf/pdf-blob";
import { embedFonts, printable, type FontSet } from "@/lib/files/pdf-write/fonts";
import { pageFrame, PdfFlow } from "@/lib/files/pdf-write/pdf-flow";
import { drawRichLine, layoutRich, lineHeightOf } from "@/lib/files/pdf-write/rich-text";
import { UnreadableFileError } from "@/lib/files/processors/types";
import type { PdfPageOptions } from "@/lib/image/options";
import { dataUriToBlob } from "@/lib/utils/data-uri";

const LIST_INDENT = 18;
const MARKER_GAP = 5;
const PARAGRAPH_SPACING = BODY_SIZE * 0.55;
const LIST_SPACING = BODY_SIZE * 0.2;
const HEADING_SPACING_BEFORE = 0.7;
const KEEP_WITH_NEXT_LINES = 2;
const PX_TO_PT = 0.75;

type Paragraph = Extract<DocBlock, { kind: "paragraph" }>;

function drawParagraph(flow: PdfFlow, fonts: FontSet, block: Paragraph) {
  const indent = block.list ? (block.list.level + 1) * LIST_INDENT : 0;
  const lines = layoutRich(block.runs, fonts, flow.contentWidth - indent, BODY_SIZE);
  if (block.heading && !flow.atPageTop) flow.advance(lines[0].size * HEADING_SPACING_BEFORE);
  if (block.heading) flow.ensure(lineHeightOf(lines[0]) + BODY_SIZE * 1.35 * KEEP_WITH_NEXT_LINES);

  lines.forEach((line, index) => {
    const height = lineHeightOf(line);
    flow.ensure(height);
    if (block.list && index === 0) {
      const marker = printable(fonts.regular, block.list.marker);
      const markerWidth = fonts.regular.widthOfTextAtSize(marker, BODY_SIZE);
      const baseline = flow.top + height * 0.5 + BODY_SIZE * 0.32;
      flow.text(marker, flow.left + indent - MARKER_GAP - markerWidth, baseline, fonts.regular, BODY_SIZE);
    }
    drawRichLine(flow, line, flow.left + indent);
    flow.advance(height);
  });
  flow.advance(block.list ? LIST_SPACING : PARAGRAPH_SPACING);
}

async function embedDataImage(doc: PDFDocument, src: string): Promise<PDFImage> {
  const blob = dataUriToBlob(src);
  if (blob.type === "image/png") return doc.embedPng(await blob.arrayBuffer());
  if (blob.type === "image/jpeg") return doc.embedJpg(await blob.arrayBuffer());
  const bitmap = await createImageBitmap(blob);
  try {
    return doc.embedPng(await (await bitmapToBlob(bitmap, "image/png")).arrayBuffer());
  } finally {
    bitmap.close();
  }
}

async function drawImage(flow: PdfFlow, doc: PDFDocument, src: string) {
  let image: PDFImage;
  try {
    image = await embedDataImage(doc, src);
  } catch {
    return;
  }
  const scale = Math.min(1, flow.contentWidth / (image.width * PX_TO_PT), flow.contentHeight / (image.height * PX_TO_PT));
  const width = image.width * PX_TO_PT * scale;
  const height = image.height * PX_TO_PT * scale;
  flow.ensure(height);
  flow.image(image, flow.left, flow.top, width, height);
  flow.advance(height + PARAGRAPH_SPACING);
}

export async function wordToPdf(file: File, { size, orientation }: PdfPageOptions) {
  const { default: mammoth } = await import("mammoth");
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
  const blocks = htmlToBlocks(html);
  if (!blocks.length) throw new UnreadableFileError(converterErrors.emptyDocument);

  const doc = await newPdfDocument();
  const fonts = await embedFonts(doc, ["bold", "italic", "boldItalic"]);
  const flow = new PdfFlow(doc, pageFrame(size, orientation === "landscape"));
  flow.newPage();
  let afterList = false;
  for (const block of blocks) {
    if (block.kind === "paragraph") drawParagraph(flow, fonts, block);
    else if (block.kind === "image") await drawImage(flow, doc, block.src);
    else if (block.rows.length) {
      if (afterList) flow.advance(PARAGRAPH_SPACING - LIST_SPACING);
      drawSheetTable(flow, fonts, block.rows, { header: block.header, natural: naturalWidths(block.rows, fonts, block.header) });
      flow.advance(PARAGRAPH_SPACING);
    }
    afterList = block.kind === "paragraph" && block.list !== null;
  }
  return pdfBlob(await doc.save());
}
