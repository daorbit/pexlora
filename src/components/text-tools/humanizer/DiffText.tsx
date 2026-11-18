import type { DiffSegment } from "@/lib/ai/word-diff";
import { cn } from "@/lib/utils/cn";

export function DiffText({ segments, highlight }: { segments: DiffSegment[]; highlight: boolean }) {
  return (
    <p className="text-[15.5px] leading-relaxed whitespace-pre-wrap motion-safe:ink-mask motion-safe:animate-ink-reveal">
      {segments.map((segment, index) =>
        segment.changed ? (
          <span
            key={index}
            className={cn("rounded-[4px] transition-colors duration-300", highlight && "bg-primary/30 text-foreground")}
          >
            {segment.text}
          </span>
        ) : (
          segment.text
        ),
      )}
    </p>
  );
}
