const INDIAN_GROUPING = /#,##,##/;
const MAX_FRACTION_DIGITS = 10;

export function formatNumberFallback(value: number, format = "") {
  const decimals = /\.(0+)/.exec(format)?.[1].length;
  return new Intl.NumberFormat(INDIAN_GROUPING.test(format) ? "en-IN" : "en-US", {
    useGrouping: format.includes(","),
    minimumFractionDigits: decimals ?? 0,
    maximumFractionDigits: decimals ?? MAX_FRACTION_DIGITS,
  }).format(value);
}
