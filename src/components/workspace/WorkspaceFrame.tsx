import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function WorkspaceFrame({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("w-full rounded-3xl border border-separator bg-surface p-2 shadow-card sm:rounded-[28px] sm:p-2.5", className)}>
      {children}
    </div>
  );
}
