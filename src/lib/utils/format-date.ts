const formats = {
  short: { day: "numeric", month: "short", year: "numeric" },
  long: { day: "numeric", month: "long", year: "numeric" },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

export function formatTimeAgo(timestamp: number, now = Date.now()) {
  const minutes = Math.round((timestamp - now) / 60000);
  if (Math.abs(minutes) < 60) return relative.format(minutes, "minute");
  return relative.format(Math.round(minutes / 60), "hour");
}

export function formatDate(value: string | Date, style: keyof typeof formats = "short") {
  return new Date(value).toLocaleDateString("en-GB", formats[style]);
}
