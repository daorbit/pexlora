import type { PDFDocument, PDFFont } from "pdf-lib";
import { PDF_FONT_FILES } from "@/config/pdf-output";
import { converterOutput } from "@/content/converters";

export type FontStyle = keyof typeof PDF_FONT_FILES;

export type FontSet = Record<FontStyle, PDFFont>;

const FALLBACKS: Record<FontStyle, FontStyle[]> = {
  regular: [],
  bold: ["regular"],
  italic: ["regular"],
  boldItalic: ["bold", "italic", "regular"],
};

const INVISIBLE = /[­​-‏⁠﻿]/;
const CONTROL = /[\u0000-\u001F\u007F-\u009F]/;
const RUPEE = "₹";

const downloads = new Map<string, Promise<ArrayBuffer>>();
const characterSets = new WeakMap<PDFFont, Set<number>>();

function fontBytes(path: string) {
  let download = downloads.get(path);
  if (!download) {
    download = fetch(path).then((response) => {
      if (!response.ok) throw new Error(`Font ${path} failed to load`);
      return response.arrayBuffer();
    });
    download.catch(() => downloads.delete(path));
    downloads.set(path, download);
  }
  return download;
}

export async function embedFonts(doc: PDFDocument, styles: FontStyle[]): Promise<FontSet> {
  const { default: fontkit } = await import("@pdf-lib/fontkit");
  doc.registerFontkit(fontkit);
  const wanted = [...new Set<FontStyle>(["regular", ...styles])];
  const embedded = new Map<FontStyle, PDFFont>();
  await Promise.all(
    wanted.map(async (style) => {
      embedded.set(style, await doc.embedFont(await fontBytes(PDF_FONT_FILES[style]), { subset: true }));
    }),
  );
  const pick = (style: FontStyle) =>
    embedded.get(style) ?? embedded.get(FALLBACKS[style].find((fallback) => embedded.has(fallback))!)!;
  return { regular: pick("regular"), bold: pick("bold"), italic: pick("italic"), boldItalic: pick("boldItalic") };
}

export function fontFor(fonts: FontSet, bold: boolean, italic: boolean) {
  if (bold && italic) return fonts.boldItalic;
  if (bold) return fonts.bold;
  return italic ? fonts.italic : fonts.regular;
}

function characterSet(font: PDFFont) {
  let set = characterSets.get(font);
  if (!set) {
    set = new Set(font.getCharacterSet());
    characterSets.set(font, set);
  }
  return set;
}

export function printable(font: PDFFont, text: string) {
  const supported = characterSet(font);
  let output = "";
  for (const char of text) {
    if (char === "\t") output += "    ";
    else if (INVISIBLE.test(char) || CONTROL.test(char)) continue;
    else if (supported.has(char.codePointAt(0)!)) output += char;
    else if (char === RUPEE) output += converterOutput.rupee;
    else if (/\s/.test(char)) output += " ";
    else output += converterOutput.missingGlyph;
  }
  return output;
}

export function printableLines(font: PDFFont, text: string) {
  return text
    .split(/\r\n|\n|\r/)
    .map((line) => printable(font, line))
    .join("\n");
}
