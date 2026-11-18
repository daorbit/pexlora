import { PDF_PAGE_LIMIT } from "@/config/limits";
import { UnreadableFileError } from "@/lib/files/processors/types";

export async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc ||= new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
  return pdfjs;
}

export async function openDocument(file: Blob) {
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

export type PdfJsDocument = Awaited<ReturnType<typeof openDocument>>;

export function checkPages(doc: PdfJsDocument) {
  if (doc.numPages > PDF_PAGE_LIMIT) {
    throw new UnreadableFileError(`PDFs over ${PDF_PAGE_LIMIT} pages aren't supported yet.`);
  }
}
