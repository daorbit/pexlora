"use client";

import { useRef, type ReactNode } from "react";
import { useFitsViewport } from "@/hooks/useFitsViewport";
import { cn } from "@/lib/utils/cn";

const STICKY_RESERVE_PX = 96;

export function SettingsPanel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const fits = useFitsViewport(ref, STICKY_RESERVE_PX);

  return (
    <aside
      ref={ref}
      aria-label="Settings"
      className={cn(
        "flex flex-col gap-3.5 rounded-[20px] bg-surface p-4 shadow-card sm:gap-4 sm:rounded-[22px] sm:p-5",
        fits && "lg:sticky lg:top-(--panel-top,5rem)",
      )}
    >
      {children}
    </aside>
  );
}
