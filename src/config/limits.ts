import type { FileKind } from "@/config/file-formats";

export const DAILY_LIMITS = {
  anonymous: 10,
  user: 100,
} as const;

export const MAX_FILES_PER_BATCH = 10;

export const FILE_SIZE_LIMITS_MB: Record<FileKind, number> = {
  image: 4,
  pdf: 100,
  office: 100,
  audio: 300,
  video: 2048,
};

export const MAX_IMAGE_SIZE_MB = FILE_SIZE_LIMITS_MB.image;
export const MAX_IMAGE_SIZE = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export function maxFileSize(kind: FileKind) {
  return FILE_SIZE_LIMITS_MB[kind] * 1024 * 1024;
}
