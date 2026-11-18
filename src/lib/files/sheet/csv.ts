const DELIMITERS = [",", ";", "\t", "|"];
const SAMPLE_LINES = 10;
const QUOTE = '"';

function countOutsideQuotes(line: string, delimiter: string) {
  let count = 0;
  let quoted = false;
  for (const char of line) {
    if (char === QUOTE) quoted = !quoted;
    else if (char === delimiter && !quoted) count += 1;
  }
  return count;
}

export function detectDelimiter(text: string) {
  const lines = text.split(/\r\n|\n|\r/).filter((line) => line.trim()).slice(0, SAMPLE_LINES);
  let best = DELIMITERS[0];
  let bestScore = 0;
  for (const delimiter of DELIMITERS) {
    const counts = lines.map((line) => countOutsideQuotes(line, delimiter));
    const consistent = counts.filter((count) => count > 0 && count === counts[0]).length;
    const score = consistent * 1000 + counts.reduce((total, count) => total + count, 0);
    if (counts[0] > 0 && score > bestScore) {
      best = delimiter;
      bestScore = score;
    }
  }
  return best;
}

export function parseCsv(text: string, delimiter = detectDelimiter(text)): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  const endField = () => {
    row.push(field);
    field = "";
  };
  const endRow = () => {
    endField();
    rows.push(row);
    row = [];
  };

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === QUOTE && text[index + 1] === QUOTE) {
        field += QUOTE;
        index += 1;
      } else if (char === QUOTE) {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === QUOTE && field === "") {
      quoted = true;
    } else if (char === delimiter) {
      endField();
    } else if (char === "\r" || char === "\n") {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      endRow();
    } else {
      field += char;
    }
  }
  if (field !== "" || row.length) endRow();
  return rows;
}

function escapeField(value: string) {
  return /[",\r\n]/.test(value) ? `${QUOTE}${value.replaceAll(QUOTE, QUOTE + QUOTE)}${QUOTE}` : value;
}

export function formatCsv(rows: string[][]) {
  return rows.map((row) => row.map(escapeField).join(",")).join("\r\n");
}
