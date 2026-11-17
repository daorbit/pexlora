import { PDF_PAGE_LIMIT, PDF_RENDER_MAX_SIDE } from "@/config/limits";
import { canvasToBlob } from "@/lib/files/convert/image-decode";
import { UnreadableFileError } from "@/lib/files/processors/types";
import { baseName } from "@/lib/utils/file-name";
import type { NamedBlob } from "@/lib/files/pdf/pdf-tools";

const RENDER_SCALE = 2;

async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc ||= new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
  return pdfjs;
}

async function openDocument(file: File) {
  const pdfjs = await loadPdfJs();
  try {
    return await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  } catch (error) {
    if (error instanceof Error && error.name === "PasswordException") {
      throw new UnreadableFileError("Password-protected PDFs can't be opened here. Remove the password first.");
    }
    throw new UnreadableFileError("This PDF couldn't be read. It may be damaged.");
  }
}

type PdfJsDocument = Awaited<ReturnType<typeof openDocument>>;

function checkPages(doc: PdfJsDocument) {
  if (doc.numPages > PDF_PAGE_LIMIT) {
    throw new UnreadableFileError(`PDFs over ${PDF_PAGE_LIMIT} pages aren't supported yet.`);
  }
}

async function renderPage(doc: PdfJsDocument, number: number, scaleFor: (width: number, height: number) => number) {
  const page = await doc.getPage(number);
  try {
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: scaleFor(base.width, base.height) });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(viewport.width));
    canvas.height = Math.max(1, Math.floor(viewport.height));
    await page.render({ canvas, viewport, background: "#ffffff" }).promise;
    return await canvasToBlob(canvas, "image/jpeg");
  } finally {
    page.cleanup();
  }
}

export async function pdfToImages(file: File): Promise<NamedBlob[]> {
  const doc = await openDocument(file);
  try {
    checkPages(doc);
    const stem = baseName(file.name);
    const fullSize = (width: number, height: number) => Math.min(RENDER_SCALE, PDF_RENDER_MAX_SIDE / Math.max(width, height));
    const images: NamedBlob[] = [];
    for (let number = 1; number <= doc.numPages; number += 1) {
      images.push({ blob: await renderPage(doc, number, fullSize), name: `${stem}-page-${number}.jpg` });
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

export async function renderThumbnails(file: File, side: number, { onCount, onThumbnail, isCancelled }: ThumbnailHandlers) {
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
