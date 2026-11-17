import { PDF_PAGE_LIMIT } from "@/config/limits";

const TOKEN = /^(\d+)(?:\s*-\s*(\d+))?$/;

function expand(token: string): number[] | null {
  const match = token.match(TOKEN);
  if (!match) return null;
  const from = Number(match[1]);
  const to = match[2] === undefined ? from : Number(match[2]);
  if (from < 1 || to < 1 || Math.abs(to - from) >= PDF_PAGE_LIMIT) return null;
  const step = to >= from ? 1 : -1;
  return Array.from({ length: Math.abs(to - from) + 1 }, (_, index) => from + index * step);
}

export function parsePageSpec(spec: string): number[] | null {
  const pages: number[] = [];
  for (const token of spec.split(",").map((part) => part.trim()).filter(Boolean)) {
    const expanded = expand(token);
    if (!expanded) return null;
    pages.push(...expanded);
    if (pages.length > PDF_PAGE_LIMIT) return null;
  }
  return pages;
}

export function allPages(count: number) {
  return Array.from({ length: count }, (_, index) => index + 1);
}

export function resolvePages(spec: string, count: number) {
  const pages = parsePageSpec(spec);
  if (!pages?.length) return allPages(count);
  return pages.filter((page) => page <= count);
}

function isIdentity(pages: number[], count: number) {
  return pages.length === count && pages.every((page, index) => page === index + 1);
}

function runLabel(start: number, end: number) {
  return start === end ? String(start) : `${start}-${end}`;
}

export function formatPageSpec(pages: number[], count: number) {
  if (isIdentity(pages, count)) return "";
  const parts: string[] = [];
  let start = 0;
  while (start < pages.length) {
    const step = pages[start + 1] - pages[start];
    let end = start;
    if (step === 1 || step === -1) {
      while (end + 1 < pages.length && pages[end + 1] - pages[end] === step) end += 1;
    }
    parts.push(runLabel(pages[start], pages[end]));
    start = end + 1;
  }
  return parts.join(", ");
}
