import {
  FileChartPie,
  FileImage,
  FileMusic,
  FileSpreadsheet,
  FileText,
  FileVideoCamera,
  type LucideIcon,
} from "lucide-react";

export type FileKind = "image" | "pdf" | "office" | "audio" | "video";

export type FileEngine = "image" | "pdf" | "ooxml" | "id3" | "riff" | "flac" | "isobmff" | "ebml";

export type FileFormat = {
  id: string;
  kind: FileKind;
  engine: FileEngine;
  label: string;
  extensions: string[];
  mimeTypes: string[];
  icon: LucideIcon;
};

export const fileKinds: Record<FileKind, { label: string; noun: string; icon: LucideIcon }> = {
  image: { label: "Images", noun: "image", icon: FileImage },
  pdf: { label: "PDF", noun: "PDF", icon: FileText },
  office: { label: "Word, Excel, PowerPoint", noun: "document", icon: FileText },
  audio: { label: "Audio", noun: "audio file", icon: FileMusic },
  video: { label: "Video", noun: "video", icon: FileVideoCamera },
};

export const ALL_KINDS = Object.keys(fileKinds) as FileKind[];

export const fileFormats: FileFormat[] = [
  { id: "jpeg", kind: "image", engine: "image", label: "JPG", extensions: ["jpg", "jpeg"], mimeTypes: ["image/jpeg"], icon: FileImage },
  { id: "png", kind: "image", engine: "image", label: "PNG", extensions: ["png"], mimeTypes: ["image/png"], icon: FileImage },
  { id: "webp", kind: "image", engine: "image", label: "WebP", extensions: ["webp"], mimeTypes: ["image/webp"], icon: FileImage },
  { id: "avif", kind: "image", engine: "image", label: "AVIF", extensions: ["avif"], mimeTypes: ["image/avif"], icon: FileImage },
  { id: "tiff", kind: "image", engine: "image", label: "TIFF", extensions: ["tif", "tiff"], mimeTypes: ["image/tiff"], icon: FileImage },
  { id: "gif", kind: "image", engine: "image", label: "GIF", extensions: ["gif"], mimeTypes: ["image/gif"], icon: FileImage },
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

export function formatsOfKind(kind: FileKind) {
  return fileFormats.filter((format) => format.kind === kind);
}

export function formatsOfKinds(kinds: FileKind[]) {
  return fileFormats.filter((format) => kinds.includes(format.kind));
}

export function acceptAttribute(kinds: FileKind[]) {
  return formatsOfKinds(kinds)
    .flatMap((format) => [...format.mimeTypes, ...format.extensions.map((extension) => `.${extension}`)])
    .join(",");
}
