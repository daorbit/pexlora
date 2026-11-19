import { driveCopy } from "@/content/google-drive";
import { toast } from "@/lib/toast/store";

export type DriveErrorReason = "cancelled" | "denied" | "failed";

export class DriveError extends Error {
  constructor(public reason: DriveErrorReason) {
    super(`Google Drive: ${reason}`);
  }
}

export function reportDriveError(error: unknown, fallback = driveCopy.failed) {
  const reason = error instanceof DriveError ? error.reason : "failed";
  if (reason === "cancelled") return;
  toast.error(reason === "denied" ? driveCopy.denied : fallback);
}
