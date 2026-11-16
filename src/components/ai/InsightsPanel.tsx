import type { ImageInsights } from "@/lib/ai/types";
import { aiCopy } from "@/content/ai";
import { CopyButton } from "@/components/ui/CopyButton";

function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-xs font-medium text-tertiary">{label}</p>
        <p className="text-[14.5px] leading-relaxed">{value}</p>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

export function InsightsPanel({ insights, fileName }: { insights: ImageInsights; fileName: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-subtle p-4 motion-safe:animate-fade-up sm:p-5">
      <InsightRow label={aiCopy.insights.altText} value={insights.altText} />
      <InsightRow label={aiCopy.insights.description} value={insights.description} />
      <InsightRow label={aiCopy.insights.fileName} value={fileName} />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-tertiary">{aiCopy.insights.keywords}</p>
          <ul className="flex flex-wrap gap-1.5">
            {insights.keywords.map((keyword) => (
              <li key={keyword} className="rounded-full border border-separator bg-surface px-3 py-1 text-[13px] font-medium">
                {keyword}
              </li>
            ))}
          </ul>
        </div>
        <CopyButton value={insights.keywords.join(", ")} />
      </div>
    </div>
  );
}
