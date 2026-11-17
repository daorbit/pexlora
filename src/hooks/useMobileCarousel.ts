"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const breakpoints = { sm: "(min-width: 40rem)", md: "(min-width: 48rem)" } as const;

export type CarouselBreakpoint = keyof typeof breakpoints;

const AUTOPLAY_DELAY_MS = 4000;

export function useMobileCarousel(until: CarouselBreakpoint) {
  const [plugins] = useState(() => [
    Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }),
  ]);
  const [viewportRef, api] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      breakpoints: { [breakpoints[until]]: { active: false } },
    },
    plugins,
  );
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSelected(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };
    sync();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) api.plugins().autoplay?.stop();
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api]);

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  return { viewportRef, selected, snapCount, scrollTo };
}
