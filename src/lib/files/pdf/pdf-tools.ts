import { degrees, type PDFDocument, type PDFImage } from "pdf-lib";
import { decodeImage, bitmapToBlob } from "@/lib/files/convert/image-decode";
import { detectFormat } from "@/lib/files/detect";
import { loadPdf, pdfProcessor } from "@/lib/files/processors/pdf";
import { UnreadableFileError } from "@/lib/files/processors/types";
import { fileFormats } from "@/config/file-formats";
import { PDF_PAGE_LIMIT } from "@/config/limits";
import { resolvePages } from "@/lib/files/pdf/page-spec";
import { baseName } from "@/lib/utils/file-name";
import { newPdfDocument as newDocument, pdfBlob } from "@/lib/files/pdf/pdf-blob";

export type NamedBlob = { blob: Blob; name: string };

const POINTS_PER_INCH = 72;
const pdfFormat = fileFormats.find((format) => format.id === "pdf")!;
const A4 = { width: 595.28, height: 841.89 };
const PAGE_MARGIN = 24;

function checkPageCount(count: number) {
  if (count > PDF_PAGE_LIMIT) throw new UnreadableFileError(`PDFs over ${PDF_PAGE_LIMIT} pages aren't supported yet.`);
}

export async function saveClean(doc: PDFDocument) {
  return pdfProcessor.clean(pdfBlob(await doc.save()), pdfFormat);
}

export async function loadPagedPdf(file: File) {
  const doc = await loadPdf(file);
  checkPageCount(doc.getPageCount());
  return doc;
}

export async function mergePdfs(files: File[]) {
  const merged = await newDocument();
  for (const file of files) {
    const source = await loadPdf(file);
    const pages = await merged.copyPages(source, source.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }
  checkPageCount(merged.getPageCount());
  return pdfBlob(await merged.save());
}

export async function splitPdf(file: File): Promise<NamedBlob[]> {
  const source = await loadPdf(file);
  const count = source.getPageCount();
  checkPageCount(count);
  const stem = baseName(file.name);
  const parts: NamedBlob[] = [];
  for (const index of source.getPageIndices()) {
    const part = await newDocument();
    const [page] = await part.copyPages(source, [index]);
    part.addPage(page);
    parts.push({ blob: pdfBlob(await part.save()), name: `${stem}-page-${index + 1}.pdf` });
  }
  return parts;
}

export async function rotatePdf(file: File, angle: number) {
  const doc = await loadPdf(file);
  doc.getPages().forEach((page) => page.setRotation(degrees((page.getRotation().angle + angle) % 360)));
  return saveClean(doc);
}

export async function organizePdf(file: File, spec: string) {
  const source = await loadPagedPdf(file);
  const pages = resolvePages(spec, source.getPageCount());
  if (!pages.length) throw new UnreadableFileError("None of the chosen pages are in this PDF.");
  const organized = await newDocument();
  const copies = await organized.copyPages(source, pages.map((page) => page - 1));
  copies.forEach((page) => organized.addPage(page));
  return pdfBlob(await organized.save());
}

export async function jpegToPdfPage(jpeg: Blob, sizeMm: { width: number; height: number }) {
  const doc = await newDocument();
  const image = await doc.embedJpg(await jpeg.arrayBuffer());
  const width = (sizeMm.width / 25.4) * POINTS_PER_INCH;
  const height = (sizeMm.height / 25.4) * POINTS_PER_INCH;
  doc.addPage([width, height]).drawImage(image, { x: 0, y: 0, width, height });
  return pdfBlob(await doc.save());
}

async function embedImage(doc: PDFDocument, file: File): Promise<PDFImage> {
  const id = detectFormat(file)?.id;
  if (id === "jpeg") return doc.embedJpg(await file.arrayBuffer());
  if (id === "png") return doc.embedPng(await file.arrayBuffer());
  const bitmap = await decodeImage(file);
  try {
    return doc.embedJpg(await (await bitmapToBlob(bitmap, "image/jpeg")).arrayBuffer());
  } finally {
    bitmap.close();
  }
}

function fitOnA4(image: PDFImage) {
  const landscape = image.width > image.height;
  const page = landscape ? { width: A4.height, height: A4.width } : A4;
  const scale = Math.min((page.width - PAGE_MARGIN * 2) / image.width, (page.height - PAGE_MARGIN * 2) / image.height, 1);
  const width = image.width * scale;
  const height = image.height * scale;
  return { page, box: { x: (page.width - width) / 2, y: (page.height - height) / 2, width, height } };
}

export async function imagesToPdf(files: File[]) {
  checkPageCount(files.length);
  const doc = await newDocument();
  for (const file of files) {
    const image = await embedImage(doc, file);
    const { page, box } = fitOnA4(image);
    doc.addPage([page.width, page.height]).drawImage(image, box);
  }
  return pdfBlob(await doc.save());
}
