import { textToolCopy } from "@/content/ai";
import type { AiTextReport, TextStats } from "@/lib/ai/types";
import { HighlightedText } from "@/components/text-tools/HighlightedText";
import { ScoreMeter } from "@/components/text-tools/ScoreMeter";

const statKeys: (keyof Omit<TextStats, "words">)[] = ["sentences", "averageSentenceLength", "variation", "vocabulary"];

export function DetectorResult({ report, text }: { report: AiTextReport; text: string }) {
  return (
    <div className="flex flex-col gap-6 rounded-[20px] border border-separator bg-surface p-5 motion-safe:animate-fade-up sm:p-6">
      <ScoreMeter score={report.score} verdict={report.verdict} />
      {report.summary && <p className="text-[15px] leading-relaxed text-secondary">{report.summary}</p>}

      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {statKeys.map((key) => (
          <div key={key} className="flex flex-col gap-0.5 rounded-xl bg-subtle px-3.5 py-3">
            <dt className="text-xs text-tertiary">{textToolCopy.stats[key]}</dt>
            <dd className="text-[17px] font-semibold tabular-nums">{report.stats[key]}</dd>
          </div>
        ))}
      </dl>

      {report.signals.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">{textToolCopy.signals}</p>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[14px] leading-relaxed text-secondary">
            {report.signals.map((signal) => (
              <li key={signal}>{signal}</li>
            ))}
          </ul>
        </div>
      )}

      {report.phrases.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">{textToolCopy.highlighted}</p>
          <div className="max-h-80 overflow-y-auto rounded-xl bg-subtle p-4">
            <HighlightedText text={text} phrases={report.phrases} />
          </div>
        </div>
      )}

      <p className="text-[12.5px] text-tertiary">{textToolCopy.disclaimer}</p>
    </div>
  );
}
