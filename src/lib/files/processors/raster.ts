import { ascii, decodeText, readBytes, view } from "@/lib/files/bytes";
import { PNG_XMP_KEYWORD, readPngText } from "@/lib/files/tags/png-text";
import { addXmp } from "@/lib/files/xmp";
import { jpegHeaderSegments, pngChunks, webpChunks } from "@/lib/image/chunks";
import type { OutputFormat } from "@/lib/image/formats";
import { keepOrientation } from "@/lib/image/orientation";
import { stripLossless } from "@/lib/image/strip";
import { webpSize } from "@/lib/image/webp-canvas";
import {
  addC2paMarker,
  addColorProfile,
  addExifSegments,
  orientationOf,
  readExifSegments,
  readLocation,
  type ExifSegments,
} from "@/lib/metadata/exif-report";
import { createReport, toEntry, type ReportBuilder } from "@/lib/metadata/report";
import { UnreadableFileError, type FileProcessor } from "@/lib/files/processors/types";

type RasterFormat = Extract<OutputFormat, "jpeg" | "png" | "webp">;
type Size = { width: number; height: number };

const RASTER_FORMATS: Record<string, RasterFormat> = { jpeg: "jpeg", png: "png", webp: "webp" };
const SOF_MARKERS = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
const EXIF_PREFIX = "Exif\0\0";

function rasterFormat(id: string) {
  const format = RASTER_FORMATS[id];
  if (!format) throw new UnreadableFileError("Unsupported image type.");
  return format;
}

function webpChunk(bytes: Uint8Array, type: string) {
  const chunk = [...webpChunks(bytes)].find((candidate) => candidate.type === type);
  return chunk ? bytes.subarray(chunk.start + 8, chunk.end) : null;
}

async function readSegments(format: RasterFormat, bytes: Uint8Array): Promise<ExifSegments> {
  if (format !== "webp") return readExifSegments(bytes);
  const exif = webpChunk(bytes, "EXIF");
  if (!exif) return {};
  return readExifSegments(ascii(exif, 0, 6) === EXIF_PREFIX ? exif.subarray(6) : exif);
}

function hasColorProfile(format: RasterFormat, bytes: Uint8Array) {
  if (format === "png") return [...pngChunks(bytes)].some((chunk) => chunk.type === "iCCP");
  if (format === "webp") return webpChunk(bytes, "ICCP") !== null;
  return [...jpegHeaderSegments(bytes)].some(
    (segment) => segment.marker === 0xe2 && ascii(bytes, segment.start + 4, 12) === "ICC_PROFILE\0",
  );
}

function rawSize(format: RasterFormat, bytes: Uint8Array): Size | undefined {
  if (format === "png") return { width: view(bytes).getUint32(16), height: view(bytes).getUint32(20) };
  if (format === "webp") {
    const first = webpChunks(bytes).next().value;
    return first ? webpSize(bytes, first) : undefined;
  }
  const sof = [...jpegHeaderSegments(bytes)].find((segment) => SOF_MARKERS.has(segment.marker));
  return sof ? { width: view(bytes).getUint16(sof.start + 7), height: view(bytes).getUint16(sof.start + 5) } : undefined;
}

function displaySize(size: Size | undefined, orientation: number) {
  if (!size) return {};
  return orientation >= 5 ? { width: size.height, height: size.width } : size;
}

async function addPngText(report: ReportBuilder, bytes: Uint8Array, hasXmp: boolean) {
  const entries = await readPngText(bytes);
  const xmp = entries.find((entry) => entry.keyword === PNG_XMP_KEYWORD);
  if (xmp && !hasXmp) addXmp(report, xmp.text);
  report.add(
    "png-text",
    entries.filter((entry) => entry.keyword !== PNG_XMP_KEYWORD).map((entry) => toEntry(entry.keyword, entry.text)),
  );
}

export const rasterProcessor: FileProcessor = {
  async inspect(file, fileFormat) {
    const format = rasterFormat(fileFormat.id);
    const bytes = await readBytes(file);
    const segments = await readSegments(format, bytes);
    const report = createReport();

    addExifSegments(report, segments);
    if (format === "png") await addPngText(report, bytes, Boolean(segments.xmp));
    if (format === "webp") {
      const xmp = webpChunk(bytes, "XMP ");
      if (xmp) addXmp(report, decodeText(xmp));
    }
    addC2paMarker(report, bytes);
    addColorProfile(report, hasColorProfile(format, bytes));

    return report.build({
      format: fileFormat.label,
      ...displaySize(rawSize(format, bytes), orientationOf(segments)),
      location: readLocation(segments.gps),
    });
  },

  async clean(file, fileFormat) {
    const format = rasterFormat(fileFormat.id);
    const bytes = await readBytes(file);
    const orientation = orientationOf(await readSegments(format, bytes));
    const stripped = stripLossless(format, bytes);
    if (!stripped) throw new UnreadableFileError("This image couldn't be read. It may be damaged.");

    const output = orientation > 1 ? (keepOrientation(format, stripped, orientation) ?? stripped) : stripped;
    return new Blob([output as BlobPart], { type: fileFormat.mimeTypes[0] });
  },
};
