"use client";

import { textToolCopy } from "@/content/ai";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils/cn";

const zones = [
  { x: "0%", width: "35%", fill: "fill-success-soft" },
  { x: "35%", width: "30%", fill: "fill-fill-strong" },
  { x: "65%", width: "35%", fill: "fill-warning-soft" },
];

const labelTones = ["text-success", "text-secondary", "text-warning"];

export function VerdictSpectrum({ score }: { score: number }) {
  const value = useCountUp(score);
  const active = value >= 65 ? 2 : value >= 35 ? 1 : 0;

  return (
    <div className="flex flex-col gap-2">
      <svg className="h-7 w-full overflow-visible" aria-hidden>
        {zones.map((zone) => (
          <rect key={zone.x} x={zone.x} y="8" width={zone.width} height="12" className={zone.fill} />
        ))}
        <rect x="0" y="8" width="100%" height="12" rx="6" fill="none" className="stroke-separator" />
        <line x1={`${value}%`} x2={`${value}%`} y1="2" y2="26" strokeWidth="3" strokeLinecap="round" className="stroke-foreground" />
        <circle cx={`${value}%`} cy="14" r="5" strokeWidth="2.5" className="fill-surface stroke-foreground" />
      </svg>
      <div className="grid grid-cols-[35fr_30fr_35fr] text-xs">
        {textToolCopy.spectrum.map((zone, index) => (
          <div key={zone.label} className={cn("flex flex-col", index === 1 && "items-center", index === 2 && "items-end")}>
            <span className={cn("font-semibold transition-colors", index === active ? labelTones[index] : "text-tertiary")}>
              {zone.label}
            </span>
            <span className="text-tertiary tabular-nums">{zone.range}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
