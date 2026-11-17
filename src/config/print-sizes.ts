import type { PassportSize, PrintSheet } from "@/lib/image/options";

export type SizeMm = { width: number; height: number };

export const PRINT_DPI = 300;

export const PASSPORT_PHOTO_MM: Record<PassportSize, SizeMm> = {
  "35x45": { width: 35, height: 45 },
  "51x51": { width: 51, height: 51 },
  "20x25": { width: 20, height: 25 },
};

export const PRINT_SHEET_MM: Record<PrintSheet, SizeMm> = {
  "4x6": { width: 101.6, height: 152.4 },
  a4: { width: 210, height: 297 },
};

export const SHEET_MARGIN_MM = 3;

export const SHEET_GAP_MM = 1.5;

export const PASSPORT_JPEG_QUALITY = 0.95;
