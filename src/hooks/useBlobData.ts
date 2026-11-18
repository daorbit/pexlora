"use client";

import { useEffect, useState } from "react";

type BlobDataState<T> = { source: Blob; data: T | null; error: boolean };

export function useBlobData<T>(blob: Blob, name: string, load: (blob: Blob, name: string) => Promise<T>) {
  const [state, setState] = useState<BlobDataState<T> | null>(null);

  useEffect(() => {
    let cancelled = false;
    load(blob, name)
      .then((data) => {
        if (!cancelled) setState({ source: blob, data, error: false });
      })
      .catch(() => {
        if (!cancelled) setState({ source: blob, data: null, error: true });
      });
    return () => {
      cancelled = true;
    };
  }, [blob, name, load]);

  const current = state?.source === blob ? state : null;
  return { data: current?.data ?? null, error: current?.error ?? false };
}
