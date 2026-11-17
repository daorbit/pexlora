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

export const MAX_METADATA_TEXT_LENGTH = 300;

export const PDF_PAGE_LIMIT = 200;

export const PDF_RENDER_MAX_SIDE = 2400;

export const FILE_SIZE_LIMITS_MB: Record<FileKind, number> = {
  image: 4,
  pdf: 100,
  office: 100,
  audio: 300,
  video: 2048,
};

export const MAX_IMAGE_SIZE_MB = FILE_SIZE_LIMITS_MB.image;
export const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;
