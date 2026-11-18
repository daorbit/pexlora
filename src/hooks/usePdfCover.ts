"use client";

import { useEffect, useState } from "react";
import { PDF_THUMBNAIL_SIDE } from "@/config/limits";
import { renderThumbnails } from "@/lib/files/pdf/pdf-render";

type CoverState = { file: Blob; count: number; url: string | null; failed: boolean };

export function usePdfCover(file: Blob, enabled: boolean, side = PDF_THUMBNAIL_SIDE) {
  const [state, setState] = useState<CoverState | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let rendered = false;
    let url: string | null = null;
    const update = (patch: Partial<CoverState>) => {
      if (!cancelled) setState((current) => ({ file, count: 0, url: null, failed: false, ...(current?.file === file ? current : {}), ...patch }));
    };

    renderThumbnails(file, side, {
      onCount: (count) => update({ count }),
      onThumbnail: (_index, blob) => {
        rendered = true;
        url = URL.createObjectURL(blob);
        update({ url });
      },
      isCancelled: () => cancelled || rendered,
    }).catch(() => update({ failed: true }));

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [file, side, enabled]);

  const current = state?.file === file ? state : null;
  return { count: current?.count ?? 0, url: current?.url ?? null, failed: current?.failed ?? false };
}
