import { humanizerCopy } from "@/content/ai";
import { humanLevel } from "@/lib/ai/human-score";
import { cn } from "@/lib/utils/cn";
import { levelStyles } from "@/components/text-tools/humanizer/level-styles";

const RADIUS = 7;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function LiveScoreChip({ score }: { score: number }) {
  const style = levelStyles[humanLevel(score)];

  return (
    <span
      title={humanizerCopy.liveScoreLabel}
      className="mr-1 inline-flex items-center gap-1.5 rounded-md bg-subtle px-2 py-1 text-xs font-semibold tabular-nums"
    >
      <svg viewBox="0 0 18 18" className="size-3.5" aria-hidden>
        <circle cx="9" cy="9" r={RADIUS} fill="none" strokeWidth="2.5" className="stroke-fill-strong" />
        <circle
          cx="9"
          cy="9"
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - score / 100)}
          transform="rotate(-90 9 9)"
          className={cn("transition-[stroke-dashoffset] duration-500", style.stroke)}
        />
      </svg>
      <span className={style.text}>{humanizerCopy.liveScore(score)}</span>
    </span>
  );
}
