"use client";

import { useEffect, useState } from "react";
import { isOfferActive } from "@/lib/offers/offer-pricing";

const START_DELAY_MS = 800;
const DURATION_MS = 12_000;

let started = false;

export function useChristmasIntro() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (started || !isOfferActive(Date.now())) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;

    const start = () => {
      if (document.hidden) return;
      document.removeEventListener("visibilitychange", start);
      timer = window.setTimeout(() => {
        started = true;
        setPlaying(true);
      }, START_DELAY_MS);
    };

    document.addEventListener("visibilitychange", start);
    start();

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setPlaying(false), DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [playing]);

  return playing;
}
