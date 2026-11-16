"use client";

import { useEffect, useRef } from "react";

export function useScrollToResult(trigger: unknown) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || window.matchMedia("(min-width: 1024px)").matches) return;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [trigger]);

  return ref;
}
