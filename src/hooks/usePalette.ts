"use client";

import { useEffect, useState } from "react";
import { extractPalette, type PaletteColor } from "@/lib/image/palette";

const SAMPLE_SIDE = 200;

function readColors(image: HTMLImageElement, count: number) {
  const scale = Math.min(1, SAMPLE_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return [];
  context.drawImage(image, 0, 0, width, height);
  return extractPalette(context.getImageData(0, 0, width, height).data, count);
}

export function usePalette(url: string | undefined, count: number) {
  const [state, setState] = useState<{ key: string; colors: PaletteColor[] } | null>(null);
  const key = url ? `${url}:${count}` : "";

  useEffect(() => {
    if (!url) return;
    const image = new Image();
    image.onload = () => setState({ key: `${url}:${count}`, colors: readColors(image, count) });
    image.src = url;
    return () => {
      image.onload = null;
    };
  }, [url, count]);

  return state?.key === key ? state.colors : null;
}
