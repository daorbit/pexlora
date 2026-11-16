"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { compareCopy } from "@/content/workspace";
import { formatBytes } from "@/lib/utils/format-bytes";

type CompareSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeBytes: number;
  afterBytes: number;
};

const badge = "absolute top-3 rounded-lg bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm";

export function CompareSlider({ beforeSrc, afterSrc, beforeBytes, afterBytes }: CompareSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);

  const move = (value: number) => frameRef.current?.style.setProperty("--split", `${value}%`);

  return (
    <div
      ref={frameRef}
      className="relative h-[min(60vh,440px)] overflow-hidden rounded-2xl bg-fill select-none [--split:50%]"
    >
      <Image src={afterSrc} alt="" fill unoptimized className="object-contain" />
      <div className="absolute inset-0 [clip-path:inset(0_calc(100%-var(--split))_0_0)]">
        <Image src={beforeSrc} alt="" fill unoptimized className="object-contain" />
      </div>
      <span className="pointer-events-none absolute inset-y-0 left-(--split) w-0.5 -translate-x-1/2 bg-white shadow-thumb" />
      <span className="pointer-events-none absolute top-1/2 left-(--split) inline-flex size-9 -translate-1/2 items-center justify-center rounded-full bg-white text-ink shadow-card">
        <ChevronsLeftRight className="size-4" aria-hidden />
      </span>
      <span className={`${badge} left-3`}>
        {compareCopy.before} · {formatBytes(beforeBytes)}
      </span>
      <span className={`${badge} right-3`}>
        {compareCopy.after} · {formatBytes(afterBytes)}
      </span>
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        aria-label={compareCopy.label}
        onChange={(event) => move(Number(event.target.value))}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
