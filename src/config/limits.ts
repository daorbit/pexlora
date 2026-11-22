import type { FileKind } from "@/config/file-formats";

export const DAILY_LIMITS = {
  anonymous: 10,
  user: 100,
} as const;

export const AI_DAILY_LIMITS = {
  anonymous: 5,
  user: 30,
} as const;

export const AI_DAILY_NEURON_BUDGET = 9_500;

export const AI_TEXT_LIMITS = { minWords: 40, maxCharacters: 6000 } as const;

export const MAX_FILES_PER_BATCH = 10;

export const PARALLEL_FILE_JOBS = 3;

export const MAX_RESIZE_DIMENSION = 8000;

export const RESIZE_PERCENT_RANGE = { min: 10, max: 200, step: 5 } as const;

export const COMPRESS_TARGET_KB_RANGE = { min: 5, max: 4096 } as const;

export const FORM_PHOTO_KB_RANGE = { min: 2, max: 2048 } as const;

export const DPI_RANGE = { min: 10, max: 2400 } as const;

export const ZIP_MAX_TOTAL_MB = 500;

export const UTILITY_TEXT_MAX_CHARACTERS = 50000;

export const MAX_METADATA_TEXT_LENGTH = 300;

export const MAX_WATERMARK_LENGTH = 50;

export const PDF_THUMBNAIL_SIDE = 180;
export const PDF_PREVIEW_SIDE = 1000;

export const PDF_PAGE_LIMIT = 200;

export const PDF_RENDER_MAX_SIDE = 2400;

export const PDF_PRINT_MAX_SIDE = 3600;

export const PDF_IMAGE_DPI = { screen: 150, print: 300 } as const;

export const SHEET_CELL_LIMIT = 300_000;

export const PREVIEW_TEXT_LINES = 200;

export const PREVIEW_SHEET_ROWS = 50;

export const PREVIEW_SHEET_MAX_BYTES = 5 * 1024 * 1024;

export const FILE_SIZE_LIMITS_MB: Record<FileKind, number> = {
  image: 10,
  vector: 5,
  pdf: 100,
  office: 100,
  sheet: 50,
  audio: 300,
  video: 2048,
};

export const SERVER_IMAGE_SIZE_MB = 4;

export const SESSION_RETENTION_HOURS = 24;

export const CHANGELOG_NEW_DAYS = 14;

export const MAX_IMAGE_SIZE_MB = SERVER_IMAGE_SIZE_MB;
export const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export const BROWSER_MAX_PIXELS = 40_000_000;

export const BROWSER_COMPRESS_TIME_BUDGET_MS = 20_000;
