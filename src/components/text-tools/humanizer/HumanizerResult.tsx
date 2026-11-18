"use client";

import { useMemo, useState } from "react";
import { humanizerCopy } from "@/content/ai";
import { humanScore } from "@/lib/ai/human-score";
import { countWords } from "@/lib/ai/text-stats";
import { wordDiff } from "@/lib/ai/word-diff";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { DiffText } from "@/components/text-tools/humanizer/DiffText";
import { RemovedPhrases } from "@/components/text-tools/humanizer/RemovedPhrases";
import { ScoreComparison } from "@/components/text-tools/humanizer/ScoreComparison";
import { SignalComparison } from "@/components/text-tools/humanizer/SignalComparison";

export function HumanizerResult({ source, output }: { source: string; output: string }) {
  const [highlight, setHighlight] = useState(false);
  const before = useMemo(() => humanScore(source), [source]);
  const after = useMemo(() => humanScore(output), [output]);
  const diff = useMemo(() => wordDiff(source, output), [source, output]);
  const removed = before.phrases.filter((phrase) => !after.phrases.includes(phrase));

  const stats = [
    { label: humanizerCopy.stats.changed, value: `${Math.round(diff.changedRatio * 100)}%` },
    { label: humanizerCopy.stats.readingEase, value: `${before.readingEase} / ${after.readingEase}` },
    { label: humanizerCopy.stats.words, value: `${countWords(source)} / ${countWords(output)}` },
  ];

  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="motion-safe:animate-fade-up">
        <ScoreComparison key={output} before={before.score} after={after.score} />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-end">
          <ToggleSwitch label={humanizerCopy.showChanges} checked={highlight} onChange={setHighlight} />
        </div>
        <div key={output} className="rounded-xl bg-subtle p-4">
          <DiffText segments={diff.segments} highlight={highlight} />
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-2.5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-0.5 rounded-xl bg-subtle px-3.5 py-3">
            <dt className="text-xs text-tertiary">{stat.label}</dt>
            <dd className="text-[16px] font-semibold tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <SignalComparison before={before} after={after} />
      <RemovedPhrases phrases={removed} />

      <p className="rounded-xl bg-accent-soft px-4 py-3 text-[13px] leading-relaxed text-accent-text">{humanizerCopy.personalTip}</p>
      <p className="text-[12.5px] text-tertiary">{humanizerCopy.disclaimer}</p>
    </div>
  );
}
