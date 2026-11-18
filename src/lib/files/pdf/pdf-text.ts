import { converterErrors } from "@/content/converters";
import { UnreadableFileError } from "@/lib/files/processors/types";
import { checkPages, loadPdfJs, openDocument } from "@/lib/files/pdf/pdfjs";
import type { TextRun } from "@/lib/files/pdf/text-lines";

const MAX_SLANT = 0.3;
const SPACED_WORDS = /\S+(?: \S+)*/g;

export type PageRuns = { number: number; runs: TextRun[] };

function splitWideGaps(run: TextRun): TextRun[] {
  const parts = [...run.text.matchAll(SPACED_WORDS)];
  if (parts.length < 2) return [run];
  const perChar = run.width / run.text.length;
  return parts.map((part) => ({ ...run, text: part[0], x: run.x + (part.index ?? 0) * perChar, width: part[0].length * perChar }));
}

export async function readPdfText(file: Blob): Promise<PageRuns[]> {
  const { Util } = await loadPdfJs();
  const doc = await openDocument(file);
  try {
    checkPages(doc);
    const pages: PageRuns[] = [];
    for (let number = 1; number <= doc.numPages; number += 1) {
      const page = await doc.getPage(number);
      try {
        const viewport = page.getViewport({ scale: 1 });
        const content = await page.getTextContent();
        const runs = content.items.flatMap((item): TextRun[] => {
          if (!("str" in item) || !item.str.trim()) return [];
          const [a, b, c, d, x, y] = Util.transform(viewport.transform, item.transform);
          if (Math.abs(b) > Math.abs(a) * MAX_SLANT) return [];
          const size = Math.hypot(c, d) || Math.hypot(a, b) || 1;
          return splitWideGaps({ text: item.str, x, y, width: item.width, size });
        });
        pages.push({ number, runs });
      } finally {
        page.cleanup();
      }
    }
    if (pages.every((page) => !page.runs.length)) throw new UnreadableFileError(converterErrors.noText);
    return pages;
  } finally {
    await doc.destroy();
  }
}
