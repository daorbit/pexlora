import type { RunStyle, TextRun } from "@/lib/files/pdf-write/rich-text";
import { trimTable } from "@/lib/files/sheet/trim-table";
import type { SheetCell } from "@/lib/files/sheet/types";

export type ListMarker = { level: number; marker: string };

export type DocBlock =
  | { kind: "paragraph"; runs: TextRun[]; heading: number | null; list: ListMarker | null }
  | { kind: "table"; rows: SheetCell[][]; header: boolean }
  | { kind: "image"; src: string };

export const BODY_SIZE = 11;

const HEADING_SIZES = [20, 16, 13.5, 12, 11, 11];
const SCRIPT_SCALE = 0.75;
const BULLET = "•";

export const headingSize = (level: number) => HEADING_SIZES[level - 1] ?? BODY_SIZE;

const plainStyle = (size: number): RunStyle => ({ bold: false, italic: false, underline: false, link: false, size });

function inlineRuns(node: Node, style: RunStyle, images: string[]): TextRun[] {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = (node.textContent ?? "").replace(/\s+/g, " ");
    return text ? [{ text, style }] : [];
  }
  if (!(node instanceof Element)) return [];
  const tag = node.tagName.toLowerCase();
  if (tag === "br") return [{ text: "\n", style }];
  if (tag === "img") {
    const src = node.getAttribute("src");
    if (src?.startsWith("data:")) images.push(src);
    return [];
  }
  if (tag === "ul" || tag === "ol" || tag === "table") return [];
  const next: RunStyle = {
    ...style,
    bold: style.bold || tag === "strong" || tag === "b",
    italic: style.italic || tag === "em" || tag === "i",
    underline: style.underline || tag === "u",
    link: style.link || (tag === "a" && node.hasAttribute("href")),
    size: tag === "sup" || tag === "sub" ? style.size * SCRIPT_SCALE : style.size,
  };
  return [...node.childNodes].flatMap((child) => inlineRuns(child, next, images));
}

function trimRuns(runs: TextRun[]) {
  const trimmed = runs.map((run) => ({ ...run }));
  if (trimmed[0]) trimmed[0].text = trimmed[0].text.trimStart();
  if (trimmed.at(-1)) trimmed.at(-1)!.text = trimmed.at(-1)!.text.trimEnd();
  return trimmed.filter((run) => run.text);
}

function paragraphBlocks(element: Element, style: RunStyle, heading: number | null, list: ListMarker | null): DocBlock[] {
  const images: string[] = [];
  const runs = trimRuns([...element.childNodes].flatMap((child) => inlineRuns(child, style, images)));
  const text: DocBlock[] = runs.length ? [{ kind: "paragraph", runs, heading, list }] : [];
  return [...text, ...images.map((src): DocBlock => ({ kind: "image", src }))];
}

function listBlocks(list: Element, level: number): DocBlock[] {
  const ordered = list.tagName.toLowerCase() === "ol";
  return [...list.children]
    .filter((item) => item.tagName.toLowerCase() === "li")
    .flatMap((item, index) => [
      ...paragraphBlocks(item, plainStyle(BODY_SIZE), null, { level, marker: ordered ? `${index + 1}.` : BULLET }),
      ...[...item.children]
        .filter((child) => ["ul", "ol"].includes(child.tagName.toLowerCase()))
        .flatMap((child) => listBlocks(child, level + 1)),
    ]);
}

function cellText(cell: Element) {
  const paragraphs = [...cell.querySelectorAll("p")].map((paragraph) => paragraph.textContent?.trim() ?? "");
  return paragraphs.length ? paragraphs.join("\n") : (cell.textContent ?? "").trim();
}

function tableBlock(table: Element): DocBlock {
  const rows = [...table.querySelectorAll("tr")].filter((row) => row.closest("table") === table);
  const cells = rows.map((row) => [...row.children].filter((cell) => ["td", "th"].includes(cell.tagName.toLowerCase())));
  return {
    kind: "table",
    header: Boolean(cells[0]?.length && cells[0].every((cell) => cell.tagName.toLowerCase() === "th")),
    rows: cells.map((row) =>
      row.map((cell) => ({
        text: [...cell.querySelectorAll("p")].map((paragraph) => paragraph.textContent?.trim() ?? "").join("\n") || (cell.textContent ?? "").trim(),
        numeric: false,
      })),
    ),
  };
}

function elementBlocks(element: Element): DocBlock[] {
  const tag = element.tagName.toLowerCase();
  const heading = /^h([1-6])$/.exec(tag);
  if (heading) {
    const level = Number(heading[1]);
    return paragraphBlocks(element, { ...plainStyle(headingSize(level)), bold: true }, level, null);
  }
  if (tag === "p") return paragraphBlocks(element, plainStyle(BODY_SIZE), null, null);
  if (tag === "ul" || tag === "ol") return listBlocks(element, 0);
  if (tag === "table") return [tableBlock(element)];
  return [...element.children].flatMap(elementBlocks);
}

export function htmlToBlocks(html: string): DocBlock[] {
  const body = new DOMParser().parseFromString(`<!doctype html><html><body>${html}</body></html>`, "text/html").body;
  return [...body.children].flatMap(elementBlocks);
}
