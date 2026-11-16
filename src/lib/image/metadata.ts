import "server-only";
import exifr from "exifr";
import sharp from "sharp";
import { decodeEntities } from "@/lib/files/xml";
import { createReport, toEntry } from "@/lib/metadata/report";
import type { GeoLocation, MetadataEntry, MetadataGroupId, MetadataReport } from "@/lib/metadata/types";

const EXIF_SEGMENTS = new Set(["ifd0", "exif", "interop", "makerNote", "userComment"]);
const IGNORED_SEGMENTS = new Set(["ifd1", "thumbnail", "jfif", "ihdr", "icc"]);
const C2PA_MARKERS = [Buffer.from("c2pa"), Buffer.from("jumb")];

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof Uint8Array)
  );
}

function isIndexedObject(value: Record<string, unknown>) {
  return Object.keys(value).every((key) => /^\d+$/.test(key));
}

function flatten(prefix: string, source: Record<string, unknown>): MetadataEntry[] {
  return Object.entries(source).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}:${key}` : key;
    if (!isPlainObject(value)) return [toEntry(path, typeof value === "string" ? decodeEntities(value) : value)];
    if (isIndexedObject(value)) return [toEntry(path, Object.values(value))];
    return flatten(path, value);
  });
}

function segmentGroup(segment: string): MetadataGroupId | null {
  if (IGNORED_SEGMENTS.has(segment)) return null;
  if (EXIF_SEGMENTS.has(segment)) return "exif";
  if (segment === "gps") return "gps";
  if (segment === "iptc") return "iptc";
  return "xmp";
}

async function readExifr(buffer: Buffer) {
  try {
    const output = await exifr.parse(buffer, {
      tiff: true,
      exif: true,
      gps: true,
      interop: true,
      xmp: true,
      iptc: true,
      icc: false,
      ifd1: false,
      jfif: false,
      ihdr: false,
      mergeOutput: false,
      sanitize: true,
    });
    return (output ?? {}) as Record<string, Record<string, unknown>>;
  } catch {
    return {};
  }
}

function readLocation(gps: Record<string, unknown> | undefined): GeoLocation | undefined {
  const latitude = Number(gps?.latitude);
  const longitude = Number(gps?.longitude);
  return gps && Number.isFinite(latitude) && Number.isFinite(longitude) ? { latitude, longitude } : undefined;
}

function hasC2pa(buffer: Buffer) {
  return C2PA_MARKERS.some((marker) => buffer.includes(marker));
}

export async function inspectImage(buffer: Buffer): Promise<MetadataReport> {
  const [info, segments] = await Promise.all([sharp(buffer).metadata(), readExifr(buffer)]);
  const location = readLocation(segments.gps);
  const report = createReport();

  for (const [segment, values] of Object.entries(segments)) {
    const group = segmentGroup(segment);
    if (!group || !values || typeof values !== "object") continue;
    report.add(group, flatten(group === "xmp" && segment !== "xmp" ? segment : "", values));
  }

  report.add(
    "png-text",
    (info.comments ?? []).map((comment) => toEntry(comment.keyword, comment.text)),
  );

  if (hasC2pa(buffer)) report.entry("c2pa", "manifest", "Content Credentials manifest embedded", true);
  if (info.hasProfile) report.entry("icc", "profile", "Embedded ICC color profile");

  return report.build({
    format: info.format ?? "unknown",
    width: info.width,
    height: info.height,
    location,
  });
}
