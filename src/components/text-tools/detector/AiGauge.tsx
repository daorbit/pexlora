"use client";

import { textToolCopy } from "@/content/ai";
import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils/cn";
import { verdictFor } from "@/lib/ai/verdict";
import { verdictStyles } from "@/components/text-tools/detector/verdict-styles";

const ARC = "M20 100 A80 80 0 0 1 180 100";
const LENGTH = Math.PI * 80;
const TICKS = [0, 35, 65, 100];

function tickPoint(percent: number, radius: number) {
  const angle = Math.PI * (1 - percent / 100);
  return { x: 100 + radius * Math.cos(angle), y: 100 - radius * Math.sin(angle) };
}

export function AiGauge({ score }: { score: number }) {
  const value = useCountUp(score);
  const style = verdictStyles[verdictFor(value)];

  return (
    <div className="relative w-[200px] shrink-0">
      <svg viewBox="0 0 200 112" className="w-full" aria-hidden>
        <path d={ARC} fill="none" strokeWidth="14" strokeLinecap="round" className="stroke-fill-strong" />
        <path
          d={ARC}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={LENGTH}
          strokeDashoffset={LENGTH * (1 - value / 100)}
          className={cn("transition-[stroke] duration-500", style.stroke)}
        />
        {TICKS.map((tick) => {
          const inner = tickPoint(tick, 62);
          const outer = tickPoint(tick, 67);
          return (
            <line key={tick} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} strokeWidth="2" strokeLinecap="round" className="stroke-border-strong" />
          );
        })}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <span className="text-[40px] leading-none font-bold tracking-[-0.03em] tabular-nums">{value}%</span>
        <span className="mt-1 text-[11px] font-medium tracking-wide text-tertiary uppercase">{textToolCopy.scoreLabel}</span>
      </div>
    </div>
  );
}
