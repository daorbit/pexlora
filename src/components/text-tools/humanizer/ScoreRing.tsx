import type { HumanLevel } from "@/lib/ai/human-score";
import { cn } from "@/lib/utils/cn";
import { levelStyles } from "@/components/text-tools/humanizer/level-styles";

const SIZE = 132;
const CENTER = SIZE / 2;
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScoreRing({ value, level, label }: { value: number; level: HumanLevel; label: string }) {
  return (
    <div className="relative size-[132px] shrink-0">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="size-full" aria-hidden>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS + 9}
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
          className="origin-center stroke-border-strong [transform-box:fill-box] motion-safe:animate-orbit-spin"
        />
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" strokeWidth="10" className="stroke-fill-strong" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - value / 100)}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
          className={cn("transition-[stroke] duration-500", levelStyles[level].stroke)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[34px] leading-none font-bold tracking-[-0.03em] tabular-nums">{value}%</span>
        <span className="mt-1 text-[11px] font-medium tracking-wide text-tertiary uppercase">{label}</span>
      </div>
    </div>
  );
}
