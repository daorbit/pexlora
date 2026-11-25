"use client";

import type { ReactNode } from "react";
import { useHeaderOverlay } from "@/hooks/useHeaderOverlay";
import { cn } from "@/lib/utils/cn";

export function SiteHeaderFrame({ children }: { children: ReactNode }) {
  const overlay = useHeaderOverlay();

  return (
    <header
      className={cn(
        "sticky top-0 z-45 text-foreground transition-colors duration-300",
        overlay ? "bg-transparent has-[[aria-expanded=true]]:bg-background" : "bg-background sm:bg-background/85 sm:backdrop-blur-md",
      )}
    >
      {children}
    </header>
  );
}
