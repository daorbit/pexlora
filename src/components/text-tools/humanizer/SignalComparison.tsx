import { humanizerCopy } from "@/content/ai";
import { HUMAN_SIGNALS, type HumanScore } from "@/lib/ai/human-score";
import { cn } from "@/lib/utils/cn";
import { barWidth } from "@/components/text-tools/bar-widths";

const delays = [
  "",
  "motion-safe:[animation-delay:90ms]",
  "motion-safe:[animation-delay:180ms]",
  "motion-safe:[animation-delay:270ms]",
  "motion-safe:[animation-delay:360ms]",
  "motion-safe:[animation-delay:450ms]",
];

const percent = (value: number) => Math.round(value * 100);

export function SignalComparison({ before, after }: { before: HumanScore; after: HumanScore }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">{humanizerCopy.signalsTitle}</p>
        <div className="flex items-center gap-3 text-xs text-tertiary">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-tertiary/45" aria-hidden />
            {humanizerCopy.before}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" aria-hidden />
            {humanizerCopy.after}
          </span>
        </div>
      </div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {HUMAN_SIGNALS.map((key, index) => {
          const from = percent(before.signals[key]);
          const to = percent(after.signals[key]);
          return (
            <div key={key} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="text-[13px] text-secondary">{humanizerCopy.signals[key]}</dt>
                <dd className="text-xs font-semibold tabular-nums">
                  <span className="text-tertiary">{from}</span>
                  <span className="px-1 text-tertiary">/</span>
                  {to}
                </dd>
              </div>
              <div className="flex flex-col gap-1" aria-hidden>
                <span className="h-1.5 overflow-hidden rounded-full bg-fill">
                  <span className={cn("block h-full origin-left rounded-full bg-tertiary/45 motion-safe:animate-grow-x", barWidth(from), delays[index])} />
                </span>
                <span className="h-1.5 overflow-hidden rounded-full bg-fill">
                  <span className={cn("block h-full origin-left rounded-full bg-primary motion-safe:animate-grow-x", barWidth(to), delays[index])} />
                </span>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
