import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

export function ProofCard({ compact, className, ...props }: ComponentProps<"div"> & { compact?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col bg-surface text-left",
        compact ? "gap-3 rounded-2xl p-4 shadow-card sm:p-5" : "gap-4 rounded-3xl border border-separator p-5 sm:gap-5 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}
