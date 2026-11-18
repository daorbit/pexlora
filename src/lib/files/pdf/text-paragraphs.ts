import { lineText, type TextLine } from "@/lib/files/pdf/text-lines";

export type HeadingLevel = 1 | 2 | 3;

export type TextBlock = { text: string; heading: HeadingLevel | null };

const HEADING_RATIO = 1.2;
const HEADING_MAX_LENGTH = 160;
const LINE_GAP_RATIO = 1.65;
const INDENT_EM = 1.5;
const SIZE_TOLERANCE = 0.6;

export function bodyFontSize(lines: TextLine[]) {
  const weights = new Map<number, number>();
  lines.forEach((line) => {
    const size = Math.round(line.size * 2) / 2;
    weights.set(size, (weights.get(size) ?? 0) + lineText(line).length);
  });
  let body = 0;
  let most = -1;
  weights.forEach((weight, size) => {
    if (weight > most) {
      body = size;
      most = weight;
    }
  });
  return body || 10;
}

export function headingSizes(lines: TextLine[], body: number) {
  return [...new Set(lines.filter((line) => line.size >= body * HEADING_RATIO).map((line) => Math.round(line.size)))].sort(
    (left, right) => right - left,
  );
}

function headingLevel(line: TextLine, body: number, sizes: number[]): HeadingLevel | null {
  if (line.size < body * HEADING_RATIO || lineText(line).length > HEADING_MAX_LENGTH) return null;
  return Math.min(3, sizes.indexOf(Math.round(line.size)) + 1) as HeadingLevel;
}

function joinLines(text: string, next: string) {
  if (/\p{L}-$/u.test(text) && /^\p{Ll}/u.test(next)) return text.slice(0, -1) + next;
  return `${text} ${next}`;
}

export function linesToBlocks(lines: TextLine[], body: number, sizes: number[], separator = "\t"): TextBlock[] {
  const blocks: TextBlock[] = [];
  let previous: TextLine | null = null;
  for (const line of lines) {
    const heading = headingLevel(line, body, sizes);
    const text = lineText(line, separator);
    const current = blocks.at(-1);
    const continues =
      previous &&
      current &&
      current.heading === heading &&
      line.segments.length === 1 &&
      previous.segments.length === 1 &&
      Math.abs(line.size - previous.size) <= SIZE_TOLERANCE &&
      line.y - previous.y <= previous.size * LINE_GAP_RATIO &&
      line.x0 <= previous.x0 + line.size * INDENT_EM;
    if (continues) current.text = joinLines(current.text, text);
    else blocks.push({ text, heading });
    previous = line;
  }
  return blocks;
}
