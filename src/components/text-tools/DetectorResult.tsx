"use client";

import { useMemo } from "react";
import { textToolCopy } from "@/content/ai";
import { humanScore } from "@/lib/ai/human-score";
import type { AiTextReport, TextStats } from "@/lib/ai/types";
import { Badge } from "@/components/ui/Badge";
import { HighlightedText } from "@/components/text-tools/HighlightedText";
import { WritingSignals } from "@/components/text-tools/WritingSignals";
import { AiGauge } from "@/components/text-tools/detector/AiGauge";
import { DetectorReasons } from "@/components/text-tools/detector/DetectorReasons";
import { ScoreBreakdown } from "@/components/text-tools/detector/ScoreBreakdown";
import { SentenceHeatmap } from "@/components/text-tools/detector/SentenceHeatmap";
import { VerdictSpectrum } from "@/components/text-tools/detector/VerdictSpectrum";
import { verdictStyles } from "@/components/text-tools/detector/verdict-styles";

const statKeys: (keyof Omit<TextStats, "words">)[] = ["sentences", "averageSentenceLength", "variation", "vocabulary"];

export function DetectorResult({ report, text }: { report: AiTextReport; text: string }) {
  const patterns = useMemo(() => humanScore(text), [text]);

  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="grid grid-cols-1 items-center gap-5 motion-safe:animate-fade-up sm:grid-cols-[auto_1fr]">
        <div className="flex justify-center">
          <AiGauge score={report.score} />
        </div>
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
          <Badge tone={verdictStyles[report.verdict].badge} className="text-[13px] motion-safe:animate-pop">
            {textToolCopy.verdicts[report.verdict]}
          </Badge>
          {report.summary && <p className="text-[14.5px] leading-relaxed text-secondary">{report.summary}</p>}
        </div>
      </div>

      <VerdictSpectrum score={report.score} />

      {report.modelScore !== undefined && report.patternScore !== undefined && (
        <ScoreBreakdown model={report.modelScore} pattern={report.patternScore} />
      )}

      {report.sentences?.length ? (
        <SentenceHeatmap text={text} sentences={report.sentences} />
      ) : (
        report.phrases.length > 0 && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">{textToolCopy.highlighted}</p>
            <div className="max-h-80 overflow-y-auto rounded-xl bg-subtle p-4">
              <HighlightedText text={text} phrases={report.phrases} />
            </div>
          </div>
        )
      )}

      <DetectorReasons signals={report.signals} />

      <WritingSignals title={textToolCopy.patternsTitle} after={patterns} />

      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {statKeys.map((key) => (
          <div key={key} className="flex flex-col gap-0.5 rounded-xl bg-subtle px-3.5 py-3">
            <dt className="text-xs text-tertiary">{textToolCopy.stats[key]}</dt>
            <dd className="text-[17px] font-semibold tabular-nums">{report.stats[key]}</dd>
          </div>
        ))}
      </dl>

      <p className="text-[12.5px] text-tertiary">{textToolCopy.disclaimer}</p>
    </div>
  );
}
