"use client";

import { useEffect, useState } from "react";

export function useCycle(length: number, interval = 1700) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => Math.min(current + 1, length - 1)), interval);
    return () => window.clearInterval(timer);
  }, [length, interval]);

  return index;
}
