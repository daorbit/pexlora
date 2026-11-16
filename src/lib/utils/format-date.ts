const formats = {
  short: { day: "numeric", month: "short", year: "numeric" },
  long: { day: "numeric", month: "long", year: "numeric" },
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export function formatDate(value: string | Date, style: keyof typeof formats = "short") {
  return new Date(value).toLocaleDateString("en-GB", formats[style]);
}
