"use client";

import { useCallback, useState } from "react";
import { zipExtractCopy } from "@/content/utility-tools";
import { useLeaveGuard } from "@/hooks/useLeaveGuard";
import { pickFolder, saveEntriesToFolder } from "@/lib/files/zip/save-to-folder";
import type { ZipEntry } from "@/lib/files/zip/read-zip";
import { toast } from "@/lib/toast/store";
import { vibrate } from "@/lib/utils/haptics";

const PROGRESS_UPDATES = 50;

export type FolderProgress = { done: number; total: number };

export function useSaveToFolder() {
  const [progress, setProgress] = useState<FolderProgress | null>(null);
  useLeaveGuard(progress !== null);

  const save = useCallback(async (entries: ZipEntry[], folderName: string) => {
    const total = entries.length;
    const report = (done: number) => {
      if (done === total || done % Math.ceil(total / PROGRESS_UPDATES) === 0) setProgress({ done, total });
    };

    try {
      const parent = await pickFolder();
      if (!parent) return;
      setProgress({ done: 0, total });
      const { folder, saved, failed } = await saveEntriesToFolder(parent, folderName, entries, report);
      if (failed) toast.error(zipExtractCopy.savedSome(saved, failed));
      else toast.success(zipExtractCopy.savedTo(saved, folder));
      vibrate(failed ? "error" : "success");
    } catch {
      toast.error(zipExtractCopy.folderFailed);
      vibrate("error");
    } finally {
      setProgress(null);
    }
  }, []);

  return { progress, save };
}
