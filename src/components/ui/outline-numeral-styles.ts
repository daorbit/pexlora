export const outlineNumeralClass =
  "text-transparent [-webkit-text-stroke:1px_var(--foreground)] lg:[-webkit-text-stroke:1.5px_var(--foreground)]";

export const numeral = (index: number) => String(index + 1).padStart(2, "0");
