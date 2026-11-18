import type { PDFFont } from "pdf-lib";
import { PDF_COLORS } from "@/config/pdf-output";
import { fontFor, printableLines, type FontSet } from "@/lib/files/pdf-write/fonts";
import type { Color, PdfFlow } from "@/lib/files/pdf-write/pdf-flow";

export type RunStyle = { bold: boolean; italic: boolean; underline: boolean; link: boolean; size: number };

export type TextRun = { text: string; style: RunStyle };

type Piece = { text: string; font: PDFFont; style: RunStyle; width: number };

export type RichLine = { pieces: Piece[]; width: number; size: number };

const LINE_HEIGHT = 1.35;
const BASELINE = 0.8;
const UNDERLINE_OFFSET = 0.12;

const piece = (text: string, font: PDFFont, style: RunStyle): Piece => ({
  text,
  font,
  style,
  width: font.widthOfTextAtSize(text, style.size),
});

function tokens(runs: TextRun[], fonts: FontSet) {
  return runs.flatMap((run) => {
    const font = fontFor(fonts, run.style.bold, run.style.italic);
    return printableLines(font, run.text)
      .split(/(\n| +)/)
      .filter(Boolean)
      .map((text) => ({ text, font, style: run.style }));
  });
}

function splitPiece(source: Piece, maxWidth: number) {
  const parts: Piece[] = [];
  let text = "";
  for (const char of source.text) {
    if (text && source.font.widthOfTextAtSize(text + char, source.style.size) > maxWidth) {
      parts.push(piece(text, source.font, source.style));
      text = char;
    } else {
      text += char;
    }
  }
  if (text) parts.push(piece(text, source.font, source.style));
  return parts;
}

export function layoutRich(runs: TextRun[], fonts: FontSet, maxWidth: number, baseSize: number): RichLine[] {
  const lines: RichLine[] = [];
  let line: Piece[] = [];
  let group: Piece[] = [];

  const lineWidth = (pieces: Piece[]) => pieces.reduce((total, part) => total + part.width, 0);
  const pushLine = () => {
    while (line.length && !line.at(-1)!.text.trim()) line.pop();
    const size = line.reduce((largest, part) => Math.max(largest, part.style.size), line.length ? 0 : baseSize);
    lines.push({ pieces: line, width: lineWidth(line), size });
    line = [];
  };
  const placeGroup = () => {
    if (!group.length) return;
    const width = lineWidth(group);
    if (line.length && lineWidth(line) + width > maxWidth) pushLine();
    if (width > maxWidth) {
      group.flatMap((part) => splitPiece(part, maxWidth)).forEach((part) => {
        if (line.length && lineWidth(line) + part.width > maxWidth) pushLine();
        line.push(part);
      });
    } else {
      line.push(...group);
    }
    group = [];
  };

  for (const token of tokens(runs, fonts)) {
    if (token.text === "\n") {
      placeGroup();
      pushLine();
    } else if (!token.text.trim()) {
      placeGroup();
      if (line.length) line.push(piece(token.text, token.font, token.style));
    } else {
      group.push(piece(token.text, token.font, token.style));
    }
  }
  placeGroup();
  if (line.length || !lines.length) pushLine();
  return lines;
}

export const lineHeightOf = (line: { size: number }) => line.size * LINE_HEIGHT;

export function drawRichLine(flow: PdfFlow, line: RichLine, x: number) {
  const baseline = flow.top + line.size * (BASELINE + (LINE_HEIGHT - 1) / 2);
  let cursor = x;
  for (const part of line.pieces) {
    const color: Color = part.style.link ? PDF_COLORS.link : PDF_COLORS.ink;
    flow.text(part.text, cursor, baseline, part.font, part.style.size, color);
    if ((part.style.underline || part.style.link) && part.text.trim()) {
      const underline = baseline + part.style.size * UNDERLINE_OFFSET;
      flow.line(cursor, underline, cursor + part.width, underline, Math.max(0.4, part.style.size / 18), color);
    }
    cursor += part.width;
  }
}
