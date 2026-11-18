export type TextRun = { text: string; x: number; y: number; width: number; size: number };

export type TextSegment = { text: string; x0: number; x1: number };

export type TextLine = { y: number; size: number; x0: number; segments: TextSegment[] };

const SAME_LINE_EM = 0.45;

export const TEXT_GAP_EM = 1;
export const TABLE_GAP_EM = 0.55;

const WORD_GAP_EM = 0.12;
const OVERPRINT_EM = 0.3;

function buildSegments(runs: TextRun[], size: number, gapEm: number) {
  const segments: TextSegment[] = [];
  let previous: TextRun | null = null;
  for (const run of [...runs].sort((left, right) => left.x - right.x)) {
    const current = segments.at(-1);
    const gap = previous ? run.x - (previous.x + previous.width) : Infinity;
    if (previous && current && gap < -size * OVERPRINT_EM && run.text === previous.text) continue;
    if (!current || gap > size * gapEm) {
      segments.push({ text: run.text, x0: run.x, x1: run.x + run.width });
    } else {
      const spaced = gap > size * WORD_GAP_EM && !current.text.endsWith(" ") && !run.text.startsWith(" ");
      current.text += (spaced ? " " : "") + run.text;
      current.x1 = Math.max(current.x1, run.x + run.width);
    }
    previous = run;
  }
  return segments
    .map((segment) => ({ ...segment, text: segment.text.replace(/\s+/g, " ").trim() }))
    .filter((segment) => segment.text);
}

export function groupLines(runs: TextRun[], gapEm = TEXT_GAP_EM): TextLine[] {
  const sorted = [...runs].sort((left, right) => left.y - right.y || left.x - right.x);
  const groups: { y: number; size: number; runs: TextRun[] }[] = [];
  for (const run of sorted) {
    const group = groups.at(-1);
    if (group && Math.abs(run.y - group.y) <= Math.max(1.5, Math.min(run.size, group.size) * SAME_LINE_EM)) {
      group.runs.push(run);
      group.size = Math.max(group.size, run.size);
    } else {
      groups.push({ y: run.y, size: run.size, runs: [run] });
    }
  }
  return groups
    .map((group) => {
      const segments = buildSegments(group.runs, group.size, gapEm);
      return { y: group.y, size: group.size, x0: segments[0]?.x0 ?? 0, segments };
    })
    .filter((line) => line.segments.length);
}

export function lineText(line: TextLine, separator = "  ") {
  return line.segments.map((segment) => segment.text).join(separator);
}
