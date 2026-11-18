import type { PDFFont } from "pdf-lib";

function splitLongWord(word: string, font: PDFFont, size: number, maxWidth: number) {
  const parts: string[] = [];
  let part = "";
  for (const char of word) {
    if (part && font.widthOfTextAtSize(part + char, size) > maxWidth) {
      parts.push(part);
      part = char;
    } else {
      part += char;
    }
  }
  if (part) parts.push(part);
  return parts;
}

export function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const lines: string[] = [];
  for (const paragraph of text.split(/\r\n|\n|\r/)) {
    let line = "";
    for (const word of paragraph.split(/ +/)) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      if (font.widthOfTextAtSize(word, size) <= maxWidth) {
        line = word;
        continue;
      }
      const parts = splitLongWord(word, font, size, maxWidth);
      lines.push(...parts.slice(0, -1));
      line = parts.at(-1) ?? "";
    }
    lines.push(line);
  }
  return lines;
}
