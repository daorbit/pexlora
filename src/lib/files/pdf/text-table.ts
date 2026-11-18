import { lineText, type TextLine, type TextSegment } from "@/lib/files/pdf/text-lines";

type Column = { x0: number; x1: number };

const MERGE_TOLERANCE = 2;

function detectColumns(lines: TextLine[]): Column[] {
  const intervals = lines
    .filter((line) => line.segments.length > 1)
    .flatMap((line) => line.segments.map(({ x0, x1 }) => ({ x0, x1 })))
    .sort((left, right) => left.x0 - right.x0);
  const columns: Column[] = [];
  for (const interval of intervals) {
    const last = columns.at(-1);
    if (last && interval.x0 <= last.x1 + MERGE_TOLERANCE) last.x1 = Math.max(last.x1, interval.x1);
    else columns.push({ ...interval });
  }
  return columns;
}

function columnOf(segment: TextSegment, columns: Column[]) {
  const center = (segment.x0 + segment.x1) / 2;
  const distance = ({ x0, x1 }: Column) => Math.max(0, x0 - center, center - x1);
  return columns.reduce((best, column, index) => (distance(column) < distance(columns[best]) ? index : best), 0);
}

export function linesToRows(lines: TextLine[]): string[][] {
  const columns = detectColumns(lines);
  if (columns.length < 2) return lines.map((line) => [lineText(line, " ")]);
  return lines.map((line) => {
    const row = Array<string>(columns.length).fill("");
    line.segments.forEach((segment) => {
      const index = columnOf(segment, columns);
      row[index] = row[index] ? `${row[index]} ${segment.text}` : segment.text;
    });
    return row;
  });
}
