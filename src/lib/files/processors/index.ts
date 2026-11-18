import type { FileEngine } from "@/config/file-formats";
import type { FileProcessor } from "@/lib/files/processors/types";

export type LocalEngine = Exclude<FileEngine, "image" | "svg" | "sheet">;

const loaders: Record<LocalEngine, () => Promise<FileProcessor>> = {
  raster: () => import("@/lib/files/processors/raster").then((module) => module.rasterProcessor),
  heif: () => import("@/lib/files/processors/heif").then((module) => module.heifProcessor),
  pdf: () => import("@/lib/files/processors/pdf").then((module) => module.pdfProcessor),
  ooxml: () => import("@/lib/files/processors/ooxml").then((module) => module.ooxmlProcessor),
  id3: () => import("@/lib/files/processors/mp3").then((module) => module.mp3Processor),
  riff: () => import("@/lib/files/processors/riff").then((module) => module.riffProcessor),
  flac: () => import("@/lib/files/processors/flac").then((module) => module.flacProcessor),
  isobmff: () => import("@/lib/files/processors/isobmff").then((module) => module.isobmffProcessor),
  ebml: () => import("@/lib/files/processors/ebml").then((module) => module.ebmlProcessor),
};

export function loadProcessor(engine: LocalEngine) {
  return loaders[engine]();
}
