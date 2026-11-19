"use client";

import type { ReactNode } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { useSplitDrag, type SplitDragFrom } from "@/hooks/useSplitDrag";
import { cn } from "@/lib/utils/cn";

type BeforeAfterSliderProps = {
  before: ReactNode;
  after: ReactNode;
  label: string;
  dragFrom?: SplitDragFrom;
  initialSplit?: InitialSplit;
  className?: string;
  knobClassName?: string;
  children?: ReactNode;
};

type InitialSplit = 50 | 60;

const splitClasses: Record<InitialSplit, string> = { 50: "[--split:50%]", 60: "[--split:60%]" };

export function BeforeAfterSlider({
  before,
  after,
  label,
  dragFrom = "anywhere",
  initialSplit = 50,
  className,
  knobClassName,
  children,
}: BeforeAfterSliderProps) {
  const { frameRef, inputRef, setSplit } = useSplitDrag(dragFrom);

  return (
    <div
      ref={frameRef}
      className={cn("relative touch-pan-y overflow-hidden select-none", splitClasses[initialSplit], dragFrom === "anywhere" && "cursor-ew-resize", className)}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0 [clip-path:inset(0_calc(100%-var(--split))_0_0)]">{before}</div>
      {children}
      <input
        ref={inputRef}
        type="range"
        min={0}
        max={100}
        defaultValue={initialSplit}
        aria-label={label}
        onChange={(event) => setSplit(Number(event.target.value))}
        className="peer sr-only"
      />
      <span className="pointer-events-none absolute inset-y-0 left-(--split) w-0.5 -translate-x-1/2 bg-white shadow-thumb" />
      <span
        className={cn(
          "absolute top-1/2 left-(--split) inline-flex size-9 -translate-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-black shadow-card peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
          knobClassName,
        )}
      >
        <ChevronsLeftRight className="size-4" aria-hidden />
      </span>
    </div>
  );
}
