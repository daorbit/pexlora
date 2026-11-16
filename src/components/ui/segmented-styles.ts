import { cn } from "@/lib/utils/cn";

export const segmentedTrack = "inline-flex gap-1 rounded-full bg-fill p-1";

export function segmentedItem(active: boolean, size: "sm" | "md" = "md") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:opacity-50",
    size === "sm" ? "h-8 px-3.5 text-xs" : "h-9 px-4 text-sm",
    active ? "bg-primary font-semibold text-primary-foreground" : "font-medium text-secondary hover:text-foreground",
  );
}
