import { SIGN_PDF } from "@/config/limits";
import { drawVisualImage, pageFrame } from "@/lib/files/pdf/page-geometry";
import { loadPagedPdf, saveClean } from "@/lib/files/pdf/pdf-tools";
import { UnreadableFileError } from "@/lib/files/processors/types";
import type { SignPages, SignPdfOptions } from "@/lib/image/options";

function pickPages(count: number, pages: SignPages) {
  if (pages === "all") return Array.from({ length: count }, (_, index) => index);
  return [pages === "first" ? 0 : count - 1];
}

export async function signPdf(file: File, { signature, position, size, pages }: SignPdfOptions) {
  if (!signature) throw new UnreadableFileError("Add your signature first.");
  const doc = await loadPagedPdf(file);
  const image = await doc.embedPng(await (await fetch(signature)).arrayBuffer());
  const [vertical, horizontal] = position.split("-");
  const all = doc.getPages();

  for (const index of pickPages(all.length, pages)) {
    const page = all[index];
    const frame = pageFrame(page);
    let width = SIGN_PDF.widths[size];
    let height = (width * image.height) / image.width;
    const maxHeight = frame.height * SIGN_PDF.maxHeightShare;
    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }
    const x =
      horizontal === "left" ? SIGN_PDF.margin : horizontal === "right" ? frame.width - SIGN_PDF.margin - width : (frame.width - width) / 2;
    const y = vertical === "top" ? frame.height - SIGN_PDF.margin - height : SIGN_PDF.margin;
    drawVisualImage(page, frame, image, { x, y, width, height });
  }

  return saveClean(doc);
}
