"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PEEK_DELAY_MS = 450;

export function useSidebarPeek(enabled: boolean) {
  const [peeking, setPeeking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const start = useCallback(() => {
    if (!enabled) return;
    cancel();
    timer.current = setTimeout(() => setPeeking(true), PEEK_DELAY_MS);
  }, [cancel, enabled]);

  const stop = useCallback(() => {
    cancel();
    setPeeking(false);
  }, [cancel]);

  useEffect(() => cancel, [cancel]);

  return { peeking: enabled && peeking, start, stop };
}
