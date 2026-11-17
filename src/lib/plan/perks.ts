import type { FileKind } from "@/config/file-formats";
import { FILE_SIZE_LIMITS_MB, MAX_FILES_PER_BATCH, PARALLEL_FILE_JOBS } from "@/config/limits";
import { PRO_FILES_PER_BATCH, PRO_LOCAL_FILE_SIZE_LIMITS_MB, PRO_PARALLEL_FILE_JOBS } from "@/config/plans";

export type WorkspacePerks = {
  pro: boolean;
  filesPerBatch: number;
  parallelJobs: number;
  localSizeLimitsMb: Record<FileKind, number>;
};

export const FREE_PERKS: WorkspacePerks = {
  pro: false,
  filesPerBatch: MAX_FILES_PER_BATCH,
  parallelJobs: PARALLEL_FILE_JOBS,
  localSizeLimitsMb: FILE_SIZE_LIMITS_MB,
};

export const PRO_PERKS: WorkspacePerks = {
  pro: true,
  filesPerBatch: PRO_FILES_PER_BATCH,
  parallelJobs: PRO_PARALLEL_FILE_JOBS,
  localSizeLimitsMb: PRO_LOCAL_FILE_SIZE_LIMITS_MB,
};

export function perksFor(pro: boolean) {
  return pro ? PRO_PERKS : FREE_PERKS;
}
