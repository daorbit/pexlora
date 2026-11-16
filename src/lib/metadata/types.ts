import type { ImageInsights } from "@/lib/ai/types";

export type MetadataGroupId =
  | "c2pa"
  | "png-text"
  | "xmp"
  | "iptc"
  | "gps"
  | "document"
  | "people"
  | "device"
  | "tags"
  | "custom"
  | "software"
  | "dates"
  | "attachments"
  | "exif"
  | "icc";

export type MetadataEntry = {
  key: string;
  value: string;
  ai: boolean;
};

export type MetadataGroup = {
  id: MetadataGroupId;
  label: string;
  entries: MetadataEntry[];
};

export type GeoLocation = { latitude: number; longitude: number };

export type ReportDetails = {
  format: string;
  width?: number;
  height?: number;
  duration?: number;
  location?: GeoLocation;
};

export type MetadataReport = ReportDetails & {
  groups: MetadataGroup[];
  totalTags: number;
  aiTags: number;
};

export type ImageDimensions = { width: number; height: number };

export type SizeTarget = { bytes: number; met: boolean };

export type ProcessedFile = {
  blob: Blob;
  name: string;
  leftoverTags: number | null;
  quotaRemaining: number | null;
  dimensions?: ImageDimensions | null;
  target?: SizeTarget | null;
  insights?: ImageInsights;
};
