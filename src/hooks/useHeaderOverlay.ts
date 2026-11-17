"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/config/site";
import { HEADER_OVERLAY_ATTRIBUTE } from "@/lib/header-overlay";

const HEADER_HEIGHT = 56;

export function useHeaderOverlay() {
  const enabled = usePathname() === routes.home;
  const [covered, setCovered] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const band = document.querySelector(`[${HEADER_OVERLAY_ATTRIBUTE}]`);
        setCovered(Boolean(band) && band!.getBoundingClientRect().bottom > HEADER_HEIGHT);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [enabled]);

  return enabled && covered;
}
