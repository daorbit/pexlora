import exifr from "exifr";
import { containsAscii } from "@/lib/files/bytes";
import { decodeEntities } from "@/lib/files/xml";
import { toEntry, type ReportBuilder } from "@/lib/metadata/report";
import type { GeoLocation, MetadataEntry, MetadataGroupId } from "@/lib/metadata/types";

export type ExifSegments = Record<string, Record<string, unknown>>;

const EXIF_SEGMENTS = new Set(["ifd0", "exif", "interop", "makerNote", "userComment"]);
const IGNORED_SEGMENTS = new Set(["ifd1", "thumbnail", "jfif", "ihdr", "icc"]);
const C2PA_MARKERS = ["c2pa", "jumb"];

const EXIFR_OPTIONS = {
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
};

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

export async function readExifSegments(input: Uint8Array): Promise<ExifSegments> {
  try {
    return ((await exifr.parse(input, EXIFR_OPTIONS)) ?? {}) as ExifSegments;
  } catch {
    return {};
  }
}

export function addExifSegments(report: ReportBuilder, segments: ExifSegments) {
  for (const [segment, values] of Object.entries(segments)) {
    const group = segmentGroup(segment);
    if (!group || !values || typeof values !== "object") continue;
    report.add(group, flatten(group === "xmp" && segment !== "xmp" ? segment : "", values));
  }
}

export function readLocation(gps: Record<string, unknown> | undefined): GeoLocation | undefined {
  const latitude = Number(gps?.latitude);
  const longitude = Number(gps?.longitude);
  return gps && Number.isFinite(latitude) && Number.isFinite(longitude) ? { latitude, longitude } : undefined;
}

const ORIENTATION_LABELS = [
  "Horizontal (normal)",
  "Mirror horizontal",
  "Rotate 180",
  "Mirror vertical",
  "Mirror horizontal and rotate 270 CW",
  "Rotate 90 CW",
  "Mirror horizontal and rotate 90 CW",
  "Rotate 270 CW",
];

export function orientationOf(segments: ExifSegments) {
  const raw = segments.ifd0?.Orientation;
  const value = typeof raw === "string" ? ORIENTATION_LABELS.indexOf(raw) + 1 : Number(raw);
  return Number.isInteger(value) && value >= 1 && value <= 8 ? value : 1;
}

export function addC2paMarker(report: ReportBuilder, bytes: Uint8Array) {
  if (C2PA_MARKERS.some((marker) => containsAscii(bytes, marker))) {
    report.entry("c2pa", "manifest", "Content Credentials manifest embedded", true);
  }
}

export function addColorProfile(report: ReportBuilder, hasProfile: boolean) {
  if (hasProfile) report.entry("icc", "profile", "Embedded ICC color profile");
}
