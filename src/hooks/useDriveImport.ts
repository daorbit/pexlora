"use client";

import { useCallback, useState } from "react";
import { googleDrive } from "@/config/google-drive";
import { driveCopy } from "@/content/google-drive";
import { useWorkspacePerks } from "@/hooks/useWorkspacePerks";
import { reportDriveError } from "@/lib/google-drive/errors";
import { acceptedMimeTypes, downloadDriveFile, DriveSkip, pickerMimeTypes } from "@/lib/google-drive/files";
import { pickDriveFiles } from "@/lib/google-drive/picker";
import { getDriveToken, loadDriveScripts } from "@/lib/google-drive/token";
import { toast } from "@/lib/toast/store";

function reportSkip(skip: DriveSkip) {
  toast.error(skip.why === "tooLarge" ? driveCopy.tooLarge(skip.fileName, googleDrive.maxDownloadMb) : driveCopy.unsupported(skip.fileName));
}

export function useDriveImport(onFiles: (files: File[]) => void, accept: string, multiple = true) {
  const { filesPerBatch } = useWorkspacePerks();
  const [busy, setBusy] = useState(false);

  const prepare = useCallback(() => {
    loadDriveScripts().catch(() => {});
  }, []);

  const open = useCallback(async () => {
    setBusy(true);
    try {
      const token = await getDriveToken();
      const accepted = acceptedMimeTypes(accept);
      const docs = await pickDriveFiles({
        token,
        mimeTypes: pickerMimeTypes(accepted),
        maxItems: multiple ? filesPerBatch : 1,
        title: driveCopy.pickerTitle,
      });
      if (!docs.length) return;

      const results = await Promise.allSettled(docs.map((doc) => downloadDriveFile(token, doc, accepted)));
      const files = results.flatMap((result) => (result.status === "fulfilled" ? [result.value] : []));
      const failed = results.flatMap((result) => (result.status === "rejected" ? [result.reason] : []));

      failed.filter((reason) => reason instanceof DriveSkip).forEach(reportSkip);
      const other = failed.find((reason) => !(reason instanceof DriveSkip));
      if (other) reportDriveError(other);
      if (files.length) onFiles(files);
    } catch (error) {
      reportDriveError(error);
    } finally {
      setBusy(false);
    }
  }, [accept, filesPerBatch, multiple, onFiles]);

  return { enabled: googleDrive.enabled, busy, open, prepare };
}
