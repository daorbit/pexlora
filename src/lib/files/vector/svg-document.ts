import { UnreadableFileError } from "@/lib/files/processors/types";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const FALLBACK_SIZE = { width: 300, height: 150 } as const;

export type SvgSize = { width: number; height: number };

function pixels(value: string | null) {
  if (!value) return null;
  const match = /^\s*([\d.]+)\s*(px)?\s*$/i.exec(value);
  const number = match ? Number(match[1]) : Number.NaN;
  return Number.isFinite(number) && number > 0 ? number : null;
}

function viewBoxSize(root: Element): SvgSize | null {
  const parts = (root.getAttribute("viewBox") ?? "").trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isFinite(part))) return null;
  const [, , width, height] = parts;
  return width > 0 && height > 0 ? { width, height } : null;
}

export function parseSvg(text: string) {
  const document = new DOMParser().parseFromString(text, "image/svg+xml");
  const root = document.documentElement;
  if (document.getElementsByTagName("parsererror").length || root.namespaceURI !== SVG_NAMESPACE || root.localName !== "svg") {
    throw new UnreadableFileError("This SVG couldn't be read. It may be damaged.");
  }
  return root;
}

export function intrinsicSize(root: Element): SvgSize {
  const width = pixels(root.getAttribute("width"));
  const height = pixels(root.getAttribute("height"));
  const box = viewBoxSize(root);
  if (width && height) return { width, height };
  if (box && width) return { width, height: (width * box.height) / box.width };
  if (box && height) return { width: (height * box.width) / box.height, height };
  return box ?? { ...FALLBACK_SIZE };
}

export function sizedSvg(root: Element, natural: SvgSize, target: SvgSize) {
  const copy = root.cloneNode(true) as Element;
  if (!viewBoxSize(copy)) copy.setAttribute("viewBox", `0 0 ${natural.width} ${natural.height}`);
  copy.setAttribute("width", String(target.width));
  copy.setAttribute("height", String(target.height));
  copy.setAttribute("preserveAspectRatio", copy.getAttribute("preserveAspectRatio") ?? "xMidYMid meet");
  return new XMLSerializer().serializeToString(copy);
}
