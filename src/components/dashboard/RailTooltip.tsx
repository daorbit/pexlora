import type { Ref } from "react";
import { shellCopy } from "@/content/dashboard";
import type { RailTip } from "@/hooks/useRailTooltip";
import { cn } from "@/lib/utils/cn";

export function RailTooltip({ tip, ref }: { tip: RailTip | null; ref: Ref<HTMLSpanElement> }) {
  return (
    <span
      ref={ref}
      role="tooltip"
      aria-hidden={!tip}
      className={cn(
        "pointer-events-none fixed top-(--tip-top) left-(--tip-left) z-50 inline-flex -translate-y-1/2 items-center gap-2 rounded-lg bg-surface px-2.5 py-1.5 text-[13px] font-semibold whitespace-nowrap text-foreground shadow-card ring-1 ring-fill-strong transition-opacity duration-100",
        tip ? "opacity-100" : "opacity-0",
      )}
    >
      {tip?.label}
      {tip?.isNew && (
        <span className="rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground uppercase">
          {shellCopy.newBadge}
        </span>
      )}
    </span>
  );
}
