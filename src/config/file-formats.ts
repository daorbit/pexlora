import {
  FileChartPie,
  FileImage,
  FileMusic,
  FileSpreadsheet,
  FileText,
  FileVideoCamera,
  PenTool,
  type LucideIcon,
} from "lucide-react";

export type FileKind = "image" | "vector" | "pdf" | "office" | "sheet" | "audio" | "video";

export type FileEngine =
  | "image"
  | "raster"
  | "heif"
  | "svg"
  | "pdf"
  | "ooxml"
  | "sheet"
  | "id3"
  | "riff"
  | "flac"
  | "isobmff"
  | "ebml";

export type FileFormat = {
  id: string;
  kind: FileKind;
  engine: FileEngine;
  label: string;
  extensions: string[];
  mimeTypes: string[];
  icon: LucideIcon;
  serverReadable?: false;
};

export const fileKinds: Record<FileKind, { label: string; noun: string; icon: LucideIcon }> = {
  image: { label: "Images", noun: "image", icon: FileImage },
  vector: { label: "SVG", noun: "SVG file", icon: PenTool },
  pdf: { label: "PDF", noun: "PDF", icon: FileText },
  office: { label: "Word, Excel, PowerPoint", noun: "document", icon: FileText },
  sheet: { label: "Spreadsheets", noun: "spreadsheet", icon: FileSpreadsheet },
  audio: { label: "Audio", noun: "audio file", icon: FileMusic },
  video: { label: "Video", noun: "video", icon: FileVideoCamera },
};

export const ALL_KINDS: FileKind[] = ["image", "pdf", "office", "audio", "video"];

export const fileFormats: FileFormat[] = [
  { id: "jpeg", kind: "image", engine: "raster", label: "JPG", extensions: ["jpg", "jpeg"], mimeTypes: ["image/jpeg"], icon: FileImage },
  { id: "png", kind: "image", engine: "raster", label: "PNG", extensions: ["png"], mimeTypes: ["image/png"], icon: FileImage },
  { id: "webp", kind: "image", engine: "raster", label: "WebP", extensions: ["webp"], mimeTypes: ["image/webp"], icon: FileImage },
  { id: "avif", kind: "image", engine: "image", label: "AVIF", extensions: ["avif"], mimeTypes: ["image/avif"], icon: FileImage },
  { id: "tiff", kind: "image", engine: "image", label: "TIFF", extensions: ["tif", "tiff"], mimeTypes: ["image/tiff"], icon: FileImage },
  { id: "gif", kind: "image", engine: "image", label: "GIF", extensions: ["gif"], mimeTypes: ["image/gif"], icon: FileImage },
  {
    id: "heic",
    kind: "image",
    engine: "heif",
    label: "HEIC",
    extensions: ["heic", "heif"],
    mimeTypes: ["image/heic", "image/heif"],
    icon: FileImage,
    serverReadable: false,
  },
  {
    id: "svg",
    kind: "vector",
    engine: "svg",
    label: "SVG",
    extensions: ["svg"],
    mimeTypes: ["image/svg+xml"],
    icon: PenTool,
    serverReadable: false,
  },
  { id: "pdf", kind: "pdf", engine: "pdf", label: "PDF", extensions: ["pdf"], mimeTypes: ["application/pdf"], icon: FileText },
  {
    id: "docx",
    kind: "office",
    engine: "ooxml",
    label: "DOCX",
    extensions: ["docx"],
    mimeTypes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    icon: FileText,
  },
  {
    id: "xlsx",
    kind: "office",
    engine: "ooxml",
    label: "XLSX",
    extensions: ["xlsx"],
    mimeTypes: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    icon: FileSpreadsheet,
  },
  {
    id: "pptx",
    kind: "office",
    engine: "ooxml",
    label: "PPTX",
    extensions: ["pptx"],
    mimeTypes: ["application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    icon: FileChartPie,
  },
  {
    id: "xls",
    kind: "sheet",
    engine: "sheet",
    label: "XLS",
    extensions: ["xls"],
    mimeTypes: ["application/vnd.ms-excel"],
    icon: FileSpreadsheet,
  },
  {
    id: "ods",
    kind: "sheet",
    engine: "sheet",
    label: "ODS",
    extensions: ["ods"],
    mimeTypes: ["application/vnd.oasis.opendocument.spreadsheet"],
    icon: FileSpreadsheet,
  },
  { id: "csv", kind: "sheet", engine: "sheet", label: "CSV", extensions: ["csv"], mimeTypes: ["text/csv"], icon: FileSpreadsheet },
  { id: "mp3", kind: "audio", engine: "id3", label: "MP3", extensions: ["mp3"], mimeTypes: ["audio/mpeg", "audio/mp3"], icon: FileMusic },
  {
    id: "wav",
    kind: "audio",
    engine: "riff",
    label: "WAV",
    extensions: ["wav"],
    mimeTypes: ["audio/wav", "audio/x-wav", "audio/wave", "audio/vnd.wave"],
    icon: FileMusic,
  },
  { id: "flac", kind: "audio", engine: "flac", label: "FLAC", extensions: ["flac"], mimeTypes: ["audio/flac", "audio/x-flac"], icon: FileMusic },
  {
    id: "m4a",
    kind: "audio",
    engine: "isobmff",
    label: "M4A",
    extensions: ["m4a"],
    mimeTypes: ["audio/mp4", "audio/x-m4a", "audio/m4a"],
    icon: FileMusic,
  },
  { id: "mp4", kind: "video", engine: "isobmff", label: "MP4", extensions: ["mp4", "m4v"], mimeTypes: ["video/mp4", "video/x-m4v"], icon: FileVideoCamera },
  { id: "mov", kind: "video", engine: "isobmff", label: "MOV", extensions: ["mov"], mimeTypes: ["video/quicktime"], icon: FileVideoCamera },
  { id: "webm", kind: "video", engine: "ebml", label: "WebM", extensions: ["webm"], mimeTypes: ["video/webm", "audio/webm"], icon: FileVideoCamera },
  { id: "mkv", kind: "video", engine: "ebml", label: "MKV", extensions: ["mkv"], mimeTypes: ["video/x-matroska"], icon: FileVideoCamera },
];

export function formatMime(id: string) {
  return fileFormats.find((format) => format.id === id)?.mimeTypes[0] ?? "application/octet-stream";
}

export function formatsOfKind(kind: FileKind) {
  return fileFormats.filter((format) => format.kind === kind);
}

export function formatsOfKinds(kinds: FileKind[], localCapable = true, only?: string[]) {
  return fileFormats.filter(
    (format) =>
      kinds.includes(format.kind) &&
      (localCapable || format.serverReadable !== false) &&
      (!only || only.includes(format.id)),
  );
}

export function acceptAttribute(kinds: FileKind[], localCapable = true, only?: string[]) {
  return formatsOfKinds(kinds, localCapable, only)
    .flatMap((format) => [...format.mimeTypes, ...format.extensions.map((extension) => `.${extension}`)])
    .join(",");
}
