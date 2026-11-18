import { rgb, type PDFDocument, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import { PDF_PAGE_LIMIT } from "@/config/limits";
import { PDF_COLORS, PDF_PAGE_MARGIN, PDF_PAGE_POINTS } from "@/config/pdf-output";
import { converterErrors } from "@/content/converters";
import { UnreadableFileError } from "@/lib/files/processors/types";
import type { PdfPageSize } from "@/lib/image/options";

export type PageFrame = { width: number; height: number; margin: number };

export type Color = readonly [number, number, number];

const toRgb = ([red, green, blue]: Color) => rgb(red, green, blue);

export function pageFrame(size: PdfPageSize, landscape: boolean): PageFrame {
  const { width, height } = PDF_PAGE_POINTS[size];
  return landscape
    ? { width: height, height: width, margin: PDF_PAGE_MARGIN }
    : { width, height, margin: PDF_PAGE_MARGIN };
}

export class PdfFlow {
  page: PDFPage | null = null;
  top = 0;
  frame: PageFrame;
  private readonly doc: PDFDocument;

  constructor(doc: PDFDocument, frame: PageFrame) {
    this.doc = doc;
    this.frame = frame;
  }

  get left() {
    return this.frame.margin;
  }

  get contentWidth() {
    return this.frame.width - this.frame.margin * 2;
  }

  get contentHeight() {
    return this.frame.height - this.frame.margin * 2;
  }

  get remaining() {
    return this.frame.height - this.frame.margin - this.top;
  }

  get atPageTop() {
    return this.page !== null && this.top === this.frame.margin;
  }

  newPage(frame = this.frame) {
    if (this.doc.getPageCount() >= PDF_PAGE_LIMIT) throw new UnreadableFileError(converterErrors.tooManyPages);
    this.frame = frame;
    this.page = this.doc.addPage([frame.width, frame.height]);
    this.top = frame.margin;
    return this.page;
  }

  ensure(height: number) {
    if (!this.page || (height > this.remaining && !this.atPageTop)) this.newPage();
    return this.page!;
  }

  advance(height: number) {
    this.top += height;
  }

  private y(top: number) {
    return this.frame.height - top;
  }

  text(text: string, x: number, baseline: number, font: PDFFont, size: number, color: Color = PDF_COLORS.ink) {
    if (text) this.ensure(0).drawText(text, { x, y: this.y(baseline), font, size, color: toRgb(color) });
  }

  line(x1: number, top1: number, x2: number, top2: number, thickness: number, color: Color) {
    this.ensure(0).drawLine({
      start: { x: x1, y: this.y(top1) },
      end: { x: x2, y: this.y(top2) },
      thickness,
      color: toRgb(color),
    });
  }

  rect(x: number, top: number, width: number, height: number, { fill, border }: { fill?: Color; border?: Color }) {
    this.ensure(0).drawRectangle({
      x,
      y: this.y(top + height),
      width,
      height,
      color: fill ? toRgb(fill) : undefined,
      borderColor: border ? toRgb(border) : undefined,
      borderWidth: border ? 0.5 : 0,
    });
  }

  image(image: PDFImage, x: number, top: number, width: number, height: number) {
    this.ensure(0).drawImage(image, { x, y: this.y(top + height), width, height });
  }
}
