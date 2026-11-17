"use client";

import { useEffect, useState, type RefObject } from "react";

export function useFitsViewport(ref: RefObject<HTMLElement | null>, reservePx: number) {
  const [fits, setFits] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => setFits(element.offsetHeight + reservePx <= window.innerHeight);
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, reservePx]);

  return fits;
}
