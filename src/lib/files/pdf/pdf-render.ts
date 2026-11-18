import { PDF_IMAGE_DPI, PDF_PRINT_MAX_SIDE, PDF_RENDER_MAX_SIDE } from "@/config/limits";
import { canvasToBlob } from "@/lib/files/convert/image-decode";
import { resolvePages } from "@/lib/files/pdf/page-spec";
import { checkPages, openDocument, type PdfJsDocument } from "@/lib/files/pdf/pdfjs";
import type { PdfImageOptions } from "@/lib/image/options";
import { baseName } from "@/lib/utils/file-name";
import type { NamedBlob } from "@/lib/files/pdf/pdf-tools";

const POINTS_PER_INCH = 72;

async function renderPage(
  doc: PdfJsDocument,
  number: number,
  scaleFor: (width: number, height: number) => number,
  type: "image/jpeg" | "image/png" = "image/jpeg",
) {
  const page = await doc.getPage(number);
  try {
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: scaleFor(base.width, base.height) });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    await page.render({ canvas, viewport, background: "#ffffff" }).promise;
    return await canvasToBlob(canvas, type);
  } finally {
    page.cleanup();
  }
}

export async function pdfToImages(file: File, { pages, format, quality }: PdfImageOptions): Promise<NamedBlob[]> {
  const doc = await openDocument(file);
  try {
    checkPages(doc);
    const stem = baseName(file.name);
    const scale = PDF_IMAGE_DPI[quality] / POINTS_PER_INCH;
    const maxSide = quality === "print" ? PDF_PRINT_MAX_SIDE : PDF_RENDER_MAX_SIDE;
    const sized = (width: number, height: number) => Math.min(scale, maxSide / Math.max(width, height));
    const type = format === "png" ? "image/png" : "image/jpeg";
    const extension = format === "png" ? "png" : "jpg";
    const images: NamedBlob[] = [];
    for (const number of [...new Set(resolvePages(pages, doc.numPages))]) {
      images.push({ blob: await renderPage(doc, number, sized, type), name: `${stem}-page-${number}.${extension}` });
    }
    return images;
  } finally {
    await doc.destroy();
  }
}

type ThumbnailHandlers = {
  onCount: (count: number) => void;
  onThumbnail: (index: number, blob: Blob) => void;
  isCancelled: () => boolean;
};

export async function renderThumbnails(file: Blob, side: number, { onCount, onThumbnail, isCancelled }: ThumbnailHandlers) {
  const doc = await openDocument(file);
  try {
    checkPages(doc);
    onCount(doc.numPages);
    const thumbnail = (width: number, height: number) => side / Math.max(width, height);
    for (let number = 1; number <= doc.numPages && !isCancelled(); number += 1) {
      onThumbnail(number - 1, await renderPage(doc, number, thumbnail));
    }
  } finally {
    await doc.destroy();
  }
}
