"use client";

import { aiCopy } from "@/content/ai";
import { useAiAction } from "@/hooks/useAiAction";
import type { FindingLevel } from "@/lib/ai/types";
import type { MetadataReport } from "@/lib/metadata/types";
import { explainReport } from "@/services/ai-api";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { OrbitMark } from "@/components/ai/OrbitMark";
import { OrbitPromptButton } from "@/components/ai/OrbitPromptButton";

const levelTones: Record<FindingLevel, "danger" | "neutral" | "success"> = {
  high: "danger",
  medium: "neutral",
  low: "success",
};

export function AiExplainPanel({ report }: { report: MetadataReport }) {
  const { data, error, pending, run } = useAiAction(explainReport);

  if (!data) {
    return (
      <div className="flex flex-col gap-3">
        {error && <Alert message={error} />}
        <OrbitPromptButton
          label={aiCopy.explain}
          hint={aiCopy.explainHint}
          pending={pending}
          pendingLabel={aiCopy.explaining}
          onClick={() => run(report)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-subtle p-4 motion-safe:animate-fade-up sm:p-5">
      <div className="flex flex-col gap-1.5">
        <p className="flex items-center gap-1.5 text-xs font-medium text-tertiary">
          <OrbitMark size={20} className="size-5" />
          {aiCopy.explanationTitle}
        </p>
        <p className="text-[15px] leading-relaxed">{data.summary}</p>
      </div>
      {data.findings.length > 0 && (
        <ul className="flex flex-col gap-2.5">
          {data.findings.map((finding) => (
            <li key={finding.title} className="flex flex-col gap-1 rounded-xl bg-surface p-3.5">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{finding.title}</span>
                <Badge tone={levelTones[finding.level] ?? "neutral"}>{aiCopy.levels[finding.level] ?? finding.level}</Badge>
              </span>
              <span className="text-[13.5px] leading-relaxed text-secondary">{finding.detail}</span>
            </li>
          ))}
        </ul>
      )}
      {data.advice && (
        <p className="text-[13.5px] text-secondary">
          <span className="font-semibold text-foreground">{aiCopy.advice}: </span>
          {data.advice}
        </p>
      )}
    </div>
  );
}
