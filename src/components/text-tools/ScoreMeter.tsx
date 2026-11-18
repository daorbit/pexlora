import { textToolCopy } from "@/content/ai";
import type { TextVerdict } from "@/lib/ai/types";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { barWidth } from "@/components/text-tools/bar-widths";

const verdictStyles: Record<TextVerdict, { bar: string; badge: "warning" | "neutral" | "success" }> = {
  "likely-ai": { bar: "bg-warning", badge: "warning" },
  mixed: { bar: "bg-tertiary", badge: "neutral" },
  "likely-human": { bar: "bg-success", badge: "success" },
};

export function ScoreMeter({ score, verdict }: { score: number; verdict: TextVerdict }) {
  const style = verdictStyles[verdict];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-tertiary">{textToolCopy.scoreLabel}</span>
          <span className="text-[44px] leading-none font-bold tracking-[-0.03em] tabular-nums motion-safe:animate-pop">
            {score}%
          </span>
        </div>
        <Badge tone={style.badge} className="text-[13px]">
          {textToolCopy.verdicts[verdict]}
        </Badge>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-fill">
        <div
          className={cn(
            "h-full origin-left rounded-full motion-safe:animate-grow-x",
            style.bar,
            barWidth(score),
          )}
        />
      </div>
    </div>
  );
}
