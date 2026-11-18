export const PII_KINDS = ["email", "phone", "card", "aadhaar", "pan", "upi", "ip"] as const;
export type PiiKind = (typeof PII_KINDS)[number];

export const MASK_STYLES = ["partial", "label"] as const;
export type MaskStyle = (typeof MASK_STYLES)[number];

export type RedactOptions = { kinds: PiiKind[]; style: MaskStyle; labels: Record<PiiKind, string> };
export type RedactResult = { text: string; counts: Partial<Record<PiiKind, number>>; total: number };

type Match = { start: number; end: number; kind: PiiKind; value: string };

const DOT = "•";
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+/g;
const UPI = /[A-Za-z0-9._-]{2,}@[A-Za-z]{2,}(?![\w.@-])/g;
const NUMBER_RUN = /(?<![\w+])\+?\d[\d\s().-]{6,}\d(?![\w])/g;
const PAN = /\b[A-Z]{3}[ABCFGHLJPT][A-Z]\d{4}[A-Z]\b/g;
const IPV4 = /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g;
const AADHAAR_SHAPE = /^[2-9]\d{3}[\s-]?\d{4}[\s-]?\d{4}$/;
const DATE_LIKE = /\d{4}[./-]\d{1,2}[./-]\d{1,2}|\d{1,2}[./-]\d{1,2}[./-]\d{2,4}/;

const VERHOEFF_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];
const VERHOEFF_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

function verhoeffValid(digits: string) {
  let check = 0;
  [...digits].reverse().forEach((digit, index) => {
    check = VERHOEFF_D[check][VERHOEFF_P[index % 8][Number(digit)]];
  });
  return check === 0;
}

function luhnValid(digits: string) {
  let sum = 0;
  [...digits].reverse().forEach((char, index) => {
    let value = Number(char);
    if (index % 2 === 1) {
      value *= 2;
      if (value > 9) value -= 9;
    }
    sum += value;
  });
  return sum % 10 === 0;
}

function numberKind(value: string): PiiKind | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 12 && AADHAAR_SHAPE.test(value.trim()) && verhoeffValid(digits)) return "aadhaar";
  if (digits.length >= 13 && digits.length <= 19 && luhnValid(digits)) return "card";
  if (digits.length >= 10 && digits.length <= 13 && !DATE_LIKE.test(value)) return "phone";
  return null;
}

function collect(text: string, pattern: RegExp, kind: (value: string) => PiiKind | null) {
  return [...text.matchAll(pattern)].flatMap((match): Match[] => {
    const found = kind(match[0]);
    return found ? [{ start: match.index, end: match.index + match[0].length, kind: found, value: match[0] }] : [];
  });
}

function findMatches(text: string, kinds: Set<PiiKind>) {
  const candidates = [
    ...collect(text, EMAIL, () => "email"),
    ...collect(text, UPI, () => "upi"),
    ...collect(text, NUMBER_RUN, numberKind),
    ...collect(text, PAN, () => "pan"),
    ...collect(text, IPV4, () => "ip"),
  ];

  const taken: Match[] = [];
  for (const match of candidates) {
    if (taken.some((other) => match.start < other.end && other.start < match.end)) continue;
    taken.push(match);
  }
  return taken.filter((match) => kinds.has(match.kind)).sort((a, b) => a.start - b.start);
}

function keepLast(value: string, keep: number) {
  const total = value.replace(/\D/g, "").length;
  let seen = 0;
  return value.replace(/\d/g, (digit) => {
    seen += 1;
    return seen > total - keep ? digit : DOT;
  });
}

function maskEmail(value: string) {
  const [user, domain] = value.split("@");
  const dot = domain.lastIndexOf(".");
  return `${user[0]}${DOT.repeat(3)}@${domain[0]}${DOT.repeat(3)}${domain.slice(dot)}`;
}

function partialMask(match: Match) {
  switch (match.kind) {
    case "email":
      return maskEmail(match.value);
    case "upi":
      return `${match.value[0]}${DOT.repeat(3)}@${match.value.split("@")[1]}`;
    case "pan":
      return `${DOT.repeat(5)}${match.value.slice(5, 9)}${DOT}`;
    case "ip":
      return `${match.value.split(".")[0]}.${DOT}.${DOT}.${DOT}`;
    default:
      return keepLast(match.value, 4);
  }
}

export function redactText(text: string, { kinds, style, labels }: RedactOptions): RedactResult {
  const matches = findMatches(text, new Set(kinds));
  const counts: Partial<Record<PiiKind, number>> = {};
  let output = "";
  let cursor = 0;

  for (const match of matches) {
    output += text.slice(cursor, match.start) + (style === "label" ? `[${labels[match.kind]}]` : partialMask(match));
    cursor = match.end;
    counts[match.kind] = (counts[match.kind] ?? 0) + 1;
  }

  return { text: output + text.slice(cursor), counts, total: matches.length };
}
