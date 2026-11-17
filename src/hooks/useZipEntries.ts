"use client";

import { useEffect, useState } from "react";
import { readZip } from "@/lib/files/zip/read-zip";

export type ZipPreviewEntry = { name: string; blob: Blob; url: string };

type ZipState = { source: Blob; entries: ZipPreviewEntry[]; error: boolean };

export function useZipEntries(blob: Blob) {
  const [state, setState] = useState<ZipState | null>(null);

  useEffect(() => {
    let cancelled = false;
    let urls: string[] = [];

    readZip(blob)
      .then((files) => {
        if (cancelled) return;
        const entries = files.map((file) => ({ ...file, url: URL.createObjectURL(file.blob) }));
        urls = entries.map((entry) => entry.url);
        setState({ source: blob, entries, error: false });
      })
      .catch(() => {
        if (!cancelled) setState({ source: blob, entries: [], error: true });
      });

    return () => {
      cancelled = true;
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [blob]);

  const current = state?.source === blob ? state : null;
  return { entries: current?.entries ?? null, error: current?.error ?? false };
}
