"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ZipEntry } from "@/lib/files/zip/read-zip";
import { safePreviewBlob } from "@/lib/files/zip/zip-entries";

export type EntryPreview = { entry: ZipEntry; source: { blob: Blob; url: string } | null };

export function useEntryPreview() {
  const [preview, setPreview] = useState<EntryPreview | null>(null);
  const urlRef = useRef<string | null>(null);

  const release = useCallback(() => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
  }, []);

  const close = useCallback(() => {
    release();
    setPreview(null);
  }, [release]);

  const show = useCallback(
    (entry: ZipEntry) => {
      release();
      const blob = safePreviewBlob(entry);
      if (!blob) return setPreview({ entry, source: null });
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      setPreview({ entry, source: { blob, url } });
    },
    [release],
  );

  useEffect(() => release, [release]);

  return { preview, show, close };
}
