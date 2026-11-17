"use client";

import { useEffect, useState } from "react";
import { PDF_THUMBNAIL_SIDE } from "@/config/limits";
import { renderThumbnails } from "@/lib/files/pdf/pdf-render";
import { UnreadableFileError } from "@/lib/files/processors/types";

type ThumbnailState = { file: File; count: number; urls: string[]; error: string | null };

const FALLBACK_ERROR = "This PDF couldn't be read. It may be damaged.";

export function usePdfThumbnails(file: File) {
  const [state, setState] = useState<ThumbnailState | null>(null);

  useEffect(() => {
    let cancelled = false;
    const urls: string[] = [];
    const update = (patch: Partial<ThumbnailState>) => {
      if (!cancelled) setState((current) => ({ file, count: 0, urls: [], error: null, ...(current?.file === file ? current : {}), ...patch }));
    };

    renderThumbnails(file, PDF_THUMBNAIL_SIDE, {
      onCount: (count) => update({ count }),
      onThumbnail: (index, blob) => {
        urls[index] = URL.createObjectURL(blob);
        update({ urls: [...urls] });
      },
      isCancelled: () => cancelled,
    }).catch((error: unknown) => update({ error: error instanceof UnreadableFileError ? error.message : FALLBACK_ERROR }));

    return () => {
      cancelled = true;
      urls.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [file]);

  const current = state?.file === file ? state : null;
  return { count: current?.count ?? 0, urls: current?.urls ?? [], error: current?.error ?? null };
}
