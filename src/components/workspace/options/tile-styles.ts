import { cn } from "@/lib/utils/cn";

const base =
  "relative border bg-surface text-left transition-[border-color,box-shadow,scale] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 motion-safe:active:scale-[0.97]";

export function tileClasses(active: boolean, className?: string) {
  return cn(base, active ? "border-foreground ring-1 ring-foreground" : "border-separator hover:border-border-strong", className);
}

export const tileHint = "text-secondary";
