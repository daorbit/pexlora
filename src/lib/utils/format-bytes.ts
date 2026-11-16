const UNITS = ["B", "KB", "MB", "GB"];

export function formatBytes(bytes: number) {
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value < 10 && unit > 0 ? 1 : 0)} ${UNITS[unit]}`;
}

export function formatMegabytes(megabytes: number) {
  return megabytes >= 1024 ? `${megabytes / 1024} GB` : `${megabytes} MB`;
}

export function formatKilobytes(kilobytes: number) {
  return kilobytes >= 1024 ? `${kilobytes / 1024} MB` : `${kilobytes} KB`;
}

export function sizeChangePercent(before: number, after: number) {
  if (!before) return 0;
  return Math.round(((after - before) / before) * 100);
}
