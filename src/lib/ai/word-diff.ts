export type DiffSegment = { text: string; changed: boolean };

export type WordDiff = { segments: DiffSegment[]; changedRatio: number };

const MAX_CELLS = 4_000_000;

const normalise = (word: string) => word.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "");

export function wordDiff(before: string, after: string): WordDiff {
  const tokens = after.match(/\S+|\s+/g) ?? [];
  const afterWords = tokens.filter((token) => token.trim()).map(normalise);
  const beforeWords = (before.match(/\S+/g) ?? []).map(normalise);
  const rows = beforeWords.length;
  const cols = afterWords.length;

  if (!cols) return { segments: [], changedRatio: 0 };
  if ((rows + 1) * (cols + 1) > MAX_CELLS) {
    return { segments: [{ text: after, changed: false }], changedRatio: 1 };
  }

  const width = cols + 1;
  const table = new Uint16Array((rows + 1) * width);
  for (let row = rows - 1; row >= 0; row -= 1) {
    for (let col = cols - 1; col >= 0; col -= 1) {
      table[row * width + col] =
        beforeWords[row] === afterWords[col]
          ? table[(row + 1) * width + col + 1] + 1
          : Math.max(table[(row + 1) * width + col], table[row * width + col + 1]);
    }
  }

  const kept = new Array<boolean>(cols).fill(false);
  let row = 0;
  let col = 0;
  while (row < rows && col < cols) {
    if (beforeWords[row] === afterWords[col]) {
      kept[col] = true;
      row += 1;
      col += 1;
    } else if (table[(row + 1) * width + col] >= table[row * width + col + 1]) {
      row += 1;
    } else {
      col += 1;
    }
  }

  const segments: DiffSegment[] = [];
  let wordIndex = 0;
  for (const token of tokens) {
    const isWord = Boolean(token.trim());
    const changed = isWord ? !kept[wordIndex++] : (segments.at(-1)?.changed ?? false);
    const last = segments.at(-1);
    if (last && last.changed === changed) last.text += token;
    else segments.push({ text: token, changed });
  }

  for (const segment of segments) {
    if (!segment.changed) continue;
    const trailing = segment.text.match(/\s+$/)?.[0];
    if (!trailing) continue;
    segment.text = segment.text.slice(0, -trailing.length);
    const index = segments.indexOf(segment);
    const next = segments[index + 1];
    if (next) next.text = trailing + next.text;
    else segments.push({ text: trailing, changed: false });
  }

  return { segments, changedRatio: 1 - kept.filter(Boolean).length / cols };
}
