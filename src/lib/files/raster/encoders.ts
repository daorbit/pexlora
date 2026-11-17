import type { BrowserFormat } from "@/lib/files/raster/types";
import { readPixels } from "@/lib/files/raster/surface";

export const LOSSLESS_QUALITY = 100;

const PALETTE_COLORS = { min: 16, max: 256 } as const;

export const OPAQUE_BACKGROUND: Record<BrowserFormat, string | null> = {
  jpeg: "#ffffff",
  png: null,
  webp: null,
};

function paletteColors(quality: number) {
  const colors = Math.round((PALETTE_COLORS.max * quality) / 100);
  return Math.min(PALETTE_COLORS.max, Math.max(PALETTE_COLORS.min, colors));
}

async function loadUpng() {
  const loaded = await import("upng-js");
  return "default" in loaded ? (loaded.default as typeof loaded) : loaded;
}

async function encodePalettePng(canvas: OffscreenCanvas, quality: number) {
  const pixels = readPixels(canvas);
  const upng = await loadUpng();
  const rgba = pixels.data.buffer.slice(pixels.data.byteOffset, pixels.data.byteOffset + pixels.data.byteLength);
  return upng.encode([rgba], pixels.width, pixels.height, paletteColors(quality));
}

export async function encodeCanvas(canvas: OffscreenCanvas, format: BrowserFormat, quality: number): Promise<ArrayBuffer> {
  switch (format) {
    case "jpeg": {
      const { default: encode } = await import("@jsquash/jpeg/encode");
      return encode(readPixels(canvas), { quality });
    }
    case "webp": {
      const { default: encode } = await import("@jsquash/webp/encode");
      return encode(readPixels(canvas), { quality });
    }
    case "png":
      if (quality >= LOSSLESS_QUALITY) return (await canvas.convertToBlob({ type: "image/png" })).arrayBuffer();
      return encodePalettePng(canvas, quality);
  }
}
