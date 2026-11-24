"use client";

import { Download } from "lucide-react";
import { zipExtractCopy } from "@/content/utility-tools";
import type { FolderProgress } from "@/hooks/useSaveToFolder";
import type { ZipEntry } from "@/lib/files/zip/read-zip";
import { canSaveToFolder } from "@/lib/files/zip/save-to-folder";
import { savableEntries } from "@/lib/files/zip/zip-entries";
import { Button } from "@/components/ui/Button";
import { SaveToDriveButton } from "@/components/drive/SaveToDriveButton";
import { BatchProgress } from "@/components/workspace/BatchProgress";

type ZipSaveBarProps = {
  entries: ZipEntry[];
  searching: boolean;
  saving: FolderProgress | null;
  onSave: (entries: ZipEntry[]) => void;
};

export function ZipSaveBar({ entries, searching, saving, onSave }: ZipSaveBarProps) {
  const toFolder = entries.length > 1 && canSaveToFolder();

  return (
    <div className="flex flex-col gap-2.5 border-t border-separator p-3.5 sm:p-4">
      {saving ? (
        <BatchProgress done={saving.done} total={saving.total} />
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <Button size="lg" onClick={() => onSave(entries)} className="flex-1 transition-transform motion-safe:active:scale-[0.98]">
              <Download className="size-4" aria-hidden />
              {searching ? zipExtractCopy.saveMatches(entries.length) : zipExtractCopy.saveAll(entries.length)}
            </Button>
            <SaveToDriveButton files={savableEntries(entries)} size="lg" className="flex-1" />
          </div>
          {toFolder && <p className="text-center text-xs text-secondary">{zipExtractCopy.folderHint}</p>}
        </>
      )}
    </div>
  );
}
