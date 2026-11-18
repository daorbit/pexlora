import { textToolCopy } from "@/content/ai";
import type { FindingLevel, SentenceFinding } from "@/lib/ai/types";
import { cn } from "@/lib/utils/cn";
import { sentenceStyles } from "@/components/text-tools/detector/verdict-styles";

type Piece = { text: string; level: FindingLevel | null };

function locate(text: string, sentences: SentenceFinding[]) {
  const pieces: Piece[] = [];
  let cursor = 0;
  for (const sentence of sentences) {
    const start = text.indexOf(sentence.text, cursor);
    if (start === -1) continue;
    if (start > cursor) pieces.push({ text: text.slice(cursor, start), level: null });
    pieces.push({ text: sentence.text, level: sentence.level });
    cursor = start + sentence.text.length;
  }
  if (cursor < text.length) pieces.push({ text: text.slice(cursor), level: null });
  return pieces;
}

const levels: FindingLevel[] = ["high", "medium", "low"];

export function SentenceHeatmap({ text, sentences }: { text: string; sentences: SentenceFinding[] }) {
  const pieces = locate(text, sentences);
  const counts = Object.fromEntries(levels.map((level) => [level, sentences.filter((s) => s.level === level).length]));

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold">{textToolCopy.sentencesTitle}</p>
        <p className="text-[12.5px] text-secondary">{textToolCopy.sentenceSummary(counts.high, sentences.length)}</p>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-secondary">
        {levels.map((level) => (
          <li key={level} className="inline-flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", sentenceStyles[level].dot)} aria-hidden />
            {textToolCopy.sentenceLevels[level]}
            <span className="text-tertiary tabular-nums">{counts[level]}</span>
          </li>
        ))}
      </ul>
      <div className="max-h-96 overflow-y-auto rounded-xl bg-subtle p-4">
        <p className="text-[15px] leading-[1.85] whitespace-pre-wrap motion-safe:ink-mask motion-safe:animate-ink-reveal">
          {pieces.map((piece, index) =>
            piece.level && piece.level !== "low" ? (
              <mark
                key={index}
                title={textToolCopy.sentenceLevels[piece.level]}
                className={cn("rounded-[4px] box-decoration-clone px-0.5", sentenceStyles[piece.level].mark)}
              >
                {piece.text}
              </mark>
            ) : (
              piece.text
            ),
          )}
        </p>
      </div>
    </div>
  );
}
