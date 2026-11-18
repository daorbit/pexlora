import { PDFDocument } from "pdf-lib";

const PDF_TYPE = "application/pdf";

export function pdfBlob(bytes: Uint8Array) {
  return new Blob([bytes as BlobPart], { type: PDF_TYPE });
}

export function newPdfDocument() {
  return PDFDocument.create({ updateMetadata: false });
}
