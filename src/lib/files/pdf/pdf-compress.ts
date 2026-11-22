import { PDFArray, PDFDict, PDFName, PDFNumber, PDFRawStream, PDFRef, type PDFDocument } from "pdf-lib";
import { PDF_COMPRESS_MIN_SAVING, PDF_COMPRESS_SETTINGS } from "@/config/limits";
import { canvasToBlob } from "@/lib/files/convert/image-decode";
import { createCanvas } from "@/lib/files/convert/canvas-cover";
import { loadPagedPdf, saveClean } from "@/lib/files/pdf/pdf-tools";
import type { CompressionLevel } from "@/lib/image/options";

type Settings = (typeof PDF_COMPRESS_SETTINGS)[CompressionLevel];

const name = (value: string) => PDFName.of(value);

function isJpeg(dict: PDFDict) {
  const filter = dict.get(name("Filter"));
  if (filter instanceof PDFName) return filter === name("DCTDecode");
  return filter instanceof PDFArray && filter.size() === 1 && filter.get(0) === name("DCTDecode");
}

function channelCount(doc: PDFDocument, space: unknown): number | null {
  const resolved = space instanceof PDFRef ? doc.context.lookup(space) : space;
  if (resolved === name("DeviceRGB")) return 3;
  if (resolved === name("DeviceGray")) return 1;
  if (resolved instanceof PDFArray && resolved.get(0) === name("ICCBased")) {
    const profile = doc.context.lookup(resolved.get(1));
    const channels = profile instanceof PDFRawStream ? profile.dict.get(name("N")) : null;
    return channels instanceof PDFNumber ? channels.asNumber() : null;
  }
  return null;
}

function canRecompress(doc: PDFDocument, dict: PDFDict) {
  if (dict.get(name("Subtype")) !== name("Image") || !isJpeg(dict)) return false;
  if (dict.get(name("Decode")) || dict.get(name("ImageMask"))) return false;
  const channels = channelCount(doc, dict.get(name("ColorSpace")));
  return channels === 1 || channels === 3;
}

async function recompress(bytes: Uint8Array, settings: Settings) {
  const bitmap = await createImageBitmap(new Blob([bytes as BlobPart], { type: "image/jpeg" }));
  try {
    const scale = Math.min(1, settings.maxSide / Math.max(bitmap.width, bitmap.height));
    const size = { width: Math.max(1, Math.round(bitmap.width * scale)), height: Math.max(1, Math.round(bitmap.height * scale)) };
    const { canvas, context } = createCanvas(size);
    context.drawImage(bitmap, 0, 0, size.width, size.height);
    const blob = await canvasToBlob(canvas, "image/jpeg", settings.quality);
    return { bytes: new Uint8Array(await blob.arrayBuffer()), ...size };
  } finally {
    bitmap.close();
  }
}

async function shrinkImages(doc: PDFDocument, settings: Settings) {
  for (const [ref, object] of doc.context.enumerateIndirectObjects()) {
    if (!(object instanceof PDFRawStream) || !canRecompress(doc, object.dict)) continue;
    const original = object.contents;
    const next = await recompress(original, settings).catch(() => null);
    if (!next || next.bytes.length >= original.length * PDF_COMPRESS_MIN_SAVING) continue;

    const dict = object.dict;
    dict.set(name("Width"), PDFNumber.of(next.width));
    dict.set(name("Height"), PDFNumber.of(next.height));
    dict.set(name("ColorSpace"), name("DeviceRGB"));
    dict.set(name("BitsPerComponent"), PDFNumber.of(8));
    dict.set(name("Filter"), name("DCTDecode"));
    dict.delete(name("DecodeParms"));
    dict.set(name("Length"), PDFNumber.of(next.bytes.length));
    doc.context.assign(ref, PDFRawStream.of(dict, next.bytes));
  }
}

export async function compressPdf(file: File, level: CompressionLevel) {
  const doc = await loadPagedPdf(file);
  await shrinkImages(doc, PDF_COMPRESS_SETTINGS[level]);
  const compressed = await saveClean(doc);
  return compressed.size < file.size ? compressed : null;
}
