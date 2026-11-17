"use client";

import { useEffect, useState } from "react";

export type ImagePreview = { url: string; width: number; height: number };

export function useImagePreview(file?: Blob | null) {
  const [state, setState] = useState<{ file: Blob; preview: ImagePreview } | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => setState({ file, preview: { url, width: image.naturalWidth, height: image.naturalHeight } });
    image.src = url;
    return () => {
      image.onload = null;
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return file && state?.file === file ? state.preview : null;
}
