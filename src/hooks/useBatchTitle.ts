"use client";

import { useEffect, useRef } from "react";
import { batchTitleCopy } from "@/content/workspace";

type BatchProgress = { isProcessing: boolean; done: number; total: number };

export function useBatchTitle({ isProcessing, done, total }: BatchProgress) {
  const original = useRef<string | null>(null);
  const wasProcessing = useRef(false);

  useEffect(() => {
    if (isProcessing) {
      original.current ??= document.title;
      wasProcessing.current = true;
      document.title = batchTitleCopy.progress(done, total, original.current);
      return;
    }

    if (!wasProcessing.current || original.current === null) return;
    wasProcessing.current = false;
    const base = original.current;

    if (!document.hidden) {
      document.title = base;
      original.current = null;
      return;
    }

    document.title = batchTitleCopy.done(base);
    const onVisible = () => {
      if (document.hidden) return;
      document.title = base;
      original.current = null;
      document.removeEventListener("visibilitychange", onVisible);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [isProcessing, done, total]);

  useEffect(
    () => () => {
      if (original.current !== null) document.title = original.current;
    },
    [],
  );
}
