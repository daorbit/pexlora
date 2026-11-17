"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes } from "@/config/site";

const TOP_THRESHOLD = 4;

export function useHeaderOverlay() {
  const enabled = usePathname() === routes.home;
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const update = () => setAtTop(window.scrollY <= TOP_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [enabled]);

  return enabled && atTop;
}
