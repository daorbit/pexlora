import { Check } from "lucide-react";
import { resultCopy } from "@/content/workspace";
import type { QueueItem } from "@/hooks/useFileQueue";
import { formatBytes, sizeChangePercent } from "@/lib/utils/format-bytes";

type ResultSummaryProps = {
  items: QueueItem[];
  doneLabel: string;
};

export function ResultSummary({ items, doneLabel }: ResultSummaryProps) {
  const before = items.reduce((total, item) => total + item.file.size, 0);
  const after = items.reduce((total, item) => total + (item.result?.blob.size ?? 0), 0);
  const change = sizeChangePercent(before, after);

  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-2xl bg-success-soft px-4 py-3 text-success motion-safe:animate-fade-up motion-safe:[animation-duration:0.4s]"
    >
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-success text-surface motion-safe:animate-pop">
        <Check className="size-4" strokeWidth={3} aria-hidden />
      </span>
      <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
        <span className="font-semibold">
          {doneLabel} · {resultCopy.files(items.length)}
        </span>
        {before !== after && (
          <span className="tabular-nums">
            {after < before
              ? resultCopy.saved(formatBytes(before - after), change)
              : resultCopy.grew(formatBytes(after - before))}
          </span>
        )}
      </p>
    </div>
  );
}
