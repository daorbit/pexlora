"use client";

import { useEffect, useState } from "react";

const easeOut = (progress: number) => 1 - (1 - progress) ** 3;

export function useCountUp(target: number, from = 0, duration = 1400) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const span = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : duration;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = span ? Math.min(1, (now - start) / span) : 1;
      setValue(Math.round(from + (target - from) * easeOut(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, from, duration]);

  return value;
}
