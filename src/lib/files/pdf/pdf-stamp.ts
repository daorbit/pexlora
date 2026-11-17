import { rgb, StandardFonts } from "pdf-lib";
import { WATERMARK_OPACITY_VALUES, type PageNumberOptions, type WatermarkOptions } from "@/lib/image/options";
import { capHeight, centeredStart, drawVisualText, pageFrame } from "@/lib/files/pdf/page-geometry";
import { loadPagedPdf, saveClean } from "@/lib/files/pdf/pdf-tools";
import { watermarkPlacements } from "@/lib/files/pdf/watermark-layout";

export type PageLabel = (page: number, total: number) => string;

const NUMBER = { size: 10, margin: 28, color: rgb(0.25, 0.25, 0.25) };

const WATERMARK_COLOR = rgb(0.45, 0.45, 0.45);

export async function addPageNumbers(file: File, { position, skipFirst }: PageNumberOptions, labelFor: PageLabel) {
  const doc = await loadPagedPdf(file);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const pages = doc.getPages();
  const [vertical, horizontal] = position.split("-");

  pages.forEach((page, index) => {
    if (skipFirst && index === 0) return;
    const frame = pageFrame(page);
    const text = labelFor(index + 1, pages.length);
    const width = font.widthOfTextAtSize(text, NUMBER.size);
    const x =
      horizontal === "left" ? NUMBER.margin : horizontal === "right" ? frame.width - NUMBER.margin - width : (frame.width - width) / 2;
    const y = vertical === "top" ? frame.height - NUMBER.margin - capHeight(NUMBER.size) : NUMBER.margin;
    drawVisualText(page, frame, text, { x, y, angle: 0, size: NUMBER.size, font, color: NUMBER.color, opacity: 1 });
  });

  return saveClean(doc);
}

export async function addWatermark(file: File, { text, layout, opacity }: WatermarkOptions) {
  const doc = await loadPagedPdf(file);
  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const value = text.trim();
  const unitWidth = font.widthOfTextAtSize(value, 1);

  for (const page of doc.getPages()) {
    const frame = pageFrame(page);
    for (const placement of watermarkPlacements(frame.width, frame.height, unitWidth, layout)) {
      const start = centeredStart(placement.x, placement.y, placement.angle, unitWidth * placement.size, placement.size);
      drawVisualText(page, frame, value, {
        ...start,
        angle: placement.angle,
        size: placement.size,
        font,
        color: WATERMARK_COLOR,
        opacity: WATERMARK_OPACITY_VALUES[opacity],
      });
    }
  }

  return saveClean(doc);
}
