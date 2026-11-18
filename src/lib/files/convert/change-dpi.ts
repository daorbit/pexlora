import { localToolsCopy } from "@/content/workspace";
import { readBytes } from "@/lib/files/bytes";
import { convertImage } from "@/lib/files/convert/image-decode";
import { detectFormat } from "@/lib/files/detect";
import { UnreadableFileError } from "@/lib/files/processors/types";
import { setDensity } from "@/lib/image/density";
import { keepOrientation } from "@/lib/image/orientation";
import { stripLossless } from "@/lib/image/strip";
import { orientationOf, readExifSegments } from "@/lib/metadata/exif-report";

type DpiFormat = "jpeg" | "png";
type DpiResult = { blob: Blob; format: DpiFormat };

const LOSSLESS_FORMATS = new Set(["jpeg", "png"]);
const CONVERTED_FORMATS = new Set(["webp", "heic"]);
const MIME_TYPES: Record<DpiFormat, string> = { jpeg: "image/jpeg", png: "image/png" };

function withDensity(format: DpiFormat, bytes: Uint8Array, dpi: number) {
  const output = setDensity(format, bytes, dpi);
  if (!output) throw new UnreadableFileError("This image couldn't be read. It may be damaged.");
  return output;
}

async function losslessDpi(file: File, format: DpiFormat, dpi: number) {
  const bytes = await readBytes(file);
  const orientation = orientationOf(await readExifSegments(bytes));
  const stripped = stripLossless(format, bytes);
  if (!stripped) throw new UnreadableFileError("This image couldn't be read. It may be damaged.");

  const dense = withDensity(format, stripped, dpi);
  return orientation > 1 ? (keepOrientation(format, dense, orientation) ?? dense) : dense;
}

async function convertedDpi(file: File, dpi: number) {
  const jpeg = await convertImage(file, "image/jpeg");
  return withDensity("jpeg", await readBytes(jpeg), dpi);
}

export async function changeImageDpi(file: File, dpi: number): Promise<DpiResult> {
  const id = detectFormat(file)?.id ?? "";

  if (LOSSLESS_FORMATS.has(id)) {
    const format = id as DpiFormat;
    return { blob: new Blob([(await losslessDpi(file, format, dpi)) as BlobPart], { type: MIME_TYPES[format] }), format };
  }
  if (CONVERTED_FORMATS.has(id)) {
    return { blob: new Blob([(await convertedDpi(file, dpi)) as BlobPart], { type: MIME_TYPES.jpeg }), format: "jpeg" };
  }
  throw new UnreadableFileError(localToolsCopy.browserFormatsOnly);
}
