import type { PdfPageSize } from "@/lib/image/options";

export const PDF_FONT_FILES = {
  regular: "/fonts/LiberationSans-Regular.ttf",
  bold: "/fonts/LiberationSans-Bold.ttf",
  italic: "/fonts/LiberationSans-Italic.ttf",
  boldItalic: "/fonts/LiberationSans-BoldItalic.ttf",
} as const;

export const PDF_PAGE_POINTS: Record<PdfPageSize, { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

export const PDF_PAGE_MARGIN = 40;

export const PDF_COLORS = {
  ink: [0.063, 0.071, 0.051],
  muted: [0.373, 0.388, 0.349],
  border: [0.8, 0.79, 0.75],
  headerFill: [0.945, 0.941, 0.918],
  link: [0.247, 0.384, 0.071],
} as const;
