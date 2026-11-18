import type { CellValue } from "@/lib/files/sheet/types";

const PLAIN = /^-?\d+(\.\d+)?$/;
const GROUPED = /^-?\d{1,3}(,\d{2})*(,\d{3})+(\.\d+)?$/;
const LEADING_ZERO = /^-?0\d/;
const MAX_SAFE_DIGITS = 15;
const MAX_WHOLE_DIGITS = 11;

export function toNumber(text: string): number | null {
  let value = text.trim();
  const negative = value.startsWith("(") && value.endsWith(")");
  if (negative) value = value.slice(1, -1).trim();
  if (!PLAIN.test(value) && !GROUPED.test(value)) return null;
  if (LEADING_ZERO.test(value)) return null;
  const digits = value.replace(/\D/g, "").length;
  if (digits > (value.includes(".") ? MAX_SAFE_DIGITS : MAX_WHOLE_DIGITS)) return null;
  const number = Number(value.replace(/,/g, ""));
  if (!Number.isFinite(number)) return null;
  return negative ? -number : number;
}

export function toCellValue(text: string): CellValue {
  if (!text.trim()) return null;
  return toNumber(text) ?? text;
}
