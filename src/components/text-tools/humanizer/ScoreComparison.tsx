"use client";

import { ArrowRight } from "lucide-react";
import { humanizerCopy } from "@/content/ai";
import { useCountUp } from "@/hooks/useCountUp";
import { humanLevel } from "@/lib/ai/human-score";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { levelStyles } from "@/components/text-tools/humanizer/level-styles";
import { ScoreRing } from "@/components/text-tools/humanizer/ScoreRing";

export function ScoreComparison({ before, after }: { before: number; after: number }) {
  const value = useCountUp(after, before);
  const level = humanLevel(value);
  const finalLevel = humanLevel(after);
  const delta = after - before;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
      <ScoreRing value={value} level={level} label={humanizerCopy.scoreLabel} />
      <div className="flex flex-col items-center gap-3 sm:items-start">
        <Badge tone={levelStyles[finalLevel].badge} className="text-[13px] motion-safe:animate-pop">
          {humanizerCopy.levels[finalLevel]}
        </Badge>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xs text-tertiary">{humanizerCopy.before}</span>
            <span className="text-xl font-semibold text-secondary tabular-nums line-through decoration-border-strong decoration-2">
              {before}%
            </span>
          </div>
          <ArrowRight className="size-4 text-tertiary" aria-hidden />
          <div className="flex flex-col">
            <span className="text-xs text-tertiary">{humanizerCopy.after}</span>
            <span className={cn("text-xl font-semibold tabular-nums", levelStyles[level].text)}>{value}%</span>
          </div>
        </div>
        {delta !== 0 && (
          <Badge tone={delta > 0 ? "accent" : "neutral"} className="tabular-nums motion-safe:animate-fade-in">
            {humanizerCopy.points(delta)}
          </Badge>
        )}
      </div>
    </div>
  );
}
