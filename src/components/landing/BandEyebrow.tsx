import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function BandEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("font-mono text-xs sm:text-[13px]", className)}>{children}</p>;
}
