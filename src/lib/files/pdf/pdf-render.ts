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

export async function pdfToImages(file: File): Promise<NamedBlob[]> {
  const doc = await openDocument(file);
  try {
    if (doc.numPages > PDF_PAGE_LIMIT) {
      throw new UnreadableFileError(`PDFs over ${PDF_PAGE_LIMIT} pages aren't supported yet.`);
    }
    const stem = baseName(file.name);
    const images: NamedBlob[] = [];
    for (let number = 1; number <= doc.numPages; number += 1) {
      const page = await doc.getPage(number);
      const base = page.getViewport({ scale: 1 });
      const scale = Math.min(RENDER_SCALE, PDF_RENDER_MAX_SIDE / Math.max(base.width, base.height));
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      await page.render({ canvas, viewport, background: "#ffffff" }).promise;
      images.push({ blob: await canvasToBlob(canvas, "image/jpeg"), name: `${stem}-page-${number}.jpg` });
      page.cleanup();
    }
    return images;
  } finally {
    await doc.destroy();
  }
}
