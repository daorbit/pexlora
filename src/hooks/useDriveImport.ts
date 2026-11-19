"use client";

import { useCallback, useState } from "react";
import { googleDrive } from "@/config/google-drive";
import { driveCopy } from "@/content/google-drive";
import { useWorkspacePerks } from "@/hooks/useWorkspacePerks";
import { reportDriveError } from "@/lib/google-drive/errors";
import { downloadDriveFile, pickerMimeTypes } from "@/lib/google-drive/files";
import { pickDriveFiles } from "@/lib/google-drive/picker";
import { getDriveToken, loadDriveScripts } from "@/lib/google-drive/token";
import { acceptedMimeTypes, collectFiles } from "@/lib/import/collect-files";

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
      await collectFiles(
        docs.map((doc) => downloadDriveFile(token, doc, accepted)),
        onFiles,
        (error) => reportDriveError(error),
      );
    } catch (error) {
      reportDriveError(error);
    } finally {
      setBusy(false);
    }
  }, [accept, filesPerBatch, multiple, onFiles]);

  return { enabled: googleDrive.enabled, busy, open, prepare };
}
