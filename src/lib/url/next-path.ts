export const NEXT_PARAM = "next";

export function safeNextPath(value: unknown): string | null {
  if (typeof value !== "string" || !value.startsWith("/")) return null;
  if (value.startsWith("//") || value.startsWith("/\\") || value.includes("://")) return null;
  return value.length > 512 ? null : value;
}

export function withNextParam(href: string, next: string | null) {
  const safe = safeNextPath(next);
  if (!safe) return href;
  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}${NEXT_PARAM}=${encodeURIComponent(safe)}`;
}
