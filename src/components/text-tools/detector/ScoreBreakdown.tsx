import { textToolCopy } from "@/content/ai";
import { cn } from "@/lib/utils/cn";
import { barWidth } from "@/components/text-tools/bar-widths";

export function ScoreBreakdown({ model, pattern }: { model: number; pattern: number }) {
  const rows = [
    { label: textToolCopy.breakdown.model, value: model, delay: "" },
    { label: textToolCopy.breakdown.pattern, value: pattern, delay: "motion-safe:[animation-delay:150ms]" },
  ];

  return (
    <div className="flex flex-col gap-2.5 rounded-xl bg-subtle p-3.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
        <p className="text-[13px] font-semibold">{textToolCopy.breakdownTitle}</p>
        <span className="text-[11.5px] text-tertiary">{textToolCopy.breakdownNote}</span>
      </div>
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
          <span className="text-[12.5px] text-secondary">{row.label}</span>
          <span className="text-[12.5px] font-semibold tabular-nums">{row.value}%</span>
          <span className="col-span-2 h-1.5 overflow-hidden rounded-full bg-fill-strong">
            <span className={cn("block h-full origin-left rounded-full bg-warning motion-safe:animate-grow-x", barWidth(row.value), row.delay)} />
          </span>
        </div>
      ))}
    </div>
  );
}
