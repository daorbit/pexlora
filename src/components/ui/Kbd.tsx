import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5.5 min-w-5.5 items-center justify-center rounded-md border border-separator bg-background px-1.5 font-sans text-[11px] font-semibold text-secondary",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
