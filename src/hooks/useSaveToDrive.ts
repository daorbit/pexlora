"use client";

import { useCallback, useState } from "react";
import { googleDrive } from "@/config/google-drive";
import { driveCopy } from "@/content/google-drive";
import { reportDriveError } from "@/lib/google-drive/errors";
import { uploadToDrive } from "@/lib/google-drive/files";
import { getDriveToken, loadDriveScripts } from "@/lib/google-drive/token";
import { toast } from "@/lib/toast/store";
import type { SavableFile } from "@/lib/utils/save-file";

export function useSaveToDrive() {
  const [saving, setSaving] = useState(false);

  const prepare = useCallback(() => {
    loadDriveScripts().catch(() => {});
  }, []);

  const save = useCallback(async (files: SavableFile[]) => {
    if (!files.length) return;
    setSaving(true);
    try {
      const token = await getDriveToken();
      const folderUrl = await uploadToDrive(token, files);
      toast.link(driveCopy.saved(files.length), driveCopy.openDrive, folderUrl);
    } catch (error) {
      reportDriveError(error, driveCopy.saveFailed);
    } finally {
      setSaving(false);
    }
  }, []);

  return { enabled: googleDrive.enabled, saving, save, prepare };
}
