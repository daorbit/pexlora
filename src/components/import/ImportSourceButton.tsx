"use client";

import type { ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type ImportSourceSize = "md" | "sm";

type ImportSourceButtonProps = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  onPrepare?: () => void;
  busy?: boolean;
  disabled?: boolean;
  size?: ImportSourceSize;
};

const sizes: Record<ImportSourceSize, string> = {
  md: "size-11 rounded-xl border border-border-strong bg-surface hover:bg-fill",
  sm: "size-8 rounded-xl bg-fill hover:bg-fill-strong",
};

export function ImportSourceButton({ label, icon, onClick, onPrepare, busy = false, disabled = false, size = "md" }: ImportSourceButtonProps) {
  return (
    <span className="group/source relative inline-flex">
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        onPointerEnter={onPrepare}
        onFocus={onPrepare}
        disabled={disabled || busy}
        className={cn(
          "inline-flex items-center justify-center text-foreground transition-[background-color,scale] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-40 motion-safe:active:scale-95",
          sizes[size],
        )}
      >
        {busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : icon}
      </button>
      <span
        aria-hidden
        className="pointer-events-none absolute top-full left-1/2 z-20 mt-1.5 -translate-x-1/2 rounded-md bg-ink px-2 py-1 text-xs font-medium whitespace-nowrap text-ink-foreground opacity-0 transition-opacity group-hover/source:opacity-100 group-has-focus-visible/source:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
