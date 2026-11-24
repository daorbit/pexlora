"use client";

import { useCallback, useState } from "react";
import { zipExtractCopy } from "@/content/utility-tools";
import { useEntryPreview } from "@/hooks/useEntryPreview";
import { useFileInput } from "@/hooks/useFileInput";
import { useScrollToResult } from "@/hooks/useScrollToResult";
import { useUnzip } from "@/hooks/useUnzip";
import type { ZipEntry } from "@/lib/files/zip/read-zip";
import { firstPreviewable, savableEntries } from "@/lib/files/zip/zip-entries";
import { cn } from "@/lib/utils/cn";
import { downloadEach } from "@/lib/utils/download";
import { baseName } from "@/lib/utils/file-name";
import { canSaveToPhotos, isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { Alert } from "@/components/ui/Alert";
import { workspaceCard } from "@/components/workspace/layouts/styles";
import { ZipArchiveCard } from "@/components/utility/zip/ZipArchiveCard";
import { ZipDropCard } from "@/components/utility/zip/ZipDropCard";
import { ZipFilesPanel } from "@/components/utility/zip/ZipFilesPanel";
import { ZipFilesPlaceholder } from "@/components/utility/zip/ZipFilesPlaceholder";
import { ZipPreviewCard } from "@/components/utility/zip/ZipPreviewCard";
import { ZipSteps } from "@/components/utility/zip/ZipSteps";
import { ZipWorkingCard } from "@/components/utility/zip/ZipWorkingCard";

const ZIP_ACCEPT = ".zip,application/zip,application/x-zip-compressed";

export function ZipExtractor() {
  const { preview, show, close } = useEntryPreview();
  const [picked, setPicked] = useState<string | null>(null);

  const onOpened = useCallback(
    (entries: ZipEntry[]) => {
      const first = firstPreviewable(entries);
      setPicked(null);
      if (first) show(first);
      else close();
    },
    [show, close],
  );

  const { archive, opening, error, phase, openZip, reset } = useUnzip(onOpened);
  const { open, inputProps, isDragging, dropProps } = useFileInput(openZip, ZIP_ACCEPT, !opening);
  const previewRef = useScrollToResult(picked);

  const select = (entry: ZipEntry) => {
    setPicked(entry.name);
    show(entry);
  };

  const closePreview = () => {
    setPicked(null);
    close();
  };

  const startOver = () => {
    closePreview();
    reset();
  };

  const save = (entries: ZipEntry[]) => {
    const files = savableEntries(entries);
    const toPhotos = canSaveToPhotos() && files.every((file) => isGalleryMedia(file.blob.type));
    if (toPhotos || files.length === 1) return saveFiles(files, `${baseName(archive?.name ?? "")}.zip`);
    return downloadEach(files);
  };

  return (
    <div {...dropProps} className="flex flex-col gap-3 text-left sm:gap-4">
      <input {...inputProps} multiple={false} />
      <ZipSteps
        mode="extract"
        phase={phase}
        fileCount={archive || opening ? 1 : 0}
        doneCount={opening?.done ?? 0}
        total={opening?.total || 1}
        chooseLabel={zipExtractCopy.step}
        doneLabel={zipExtractCopy.stepDone}
        onStartOver={startOver}
      />
      {error && <Alert message={error} />}
      <div className={cn("grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2", archive || opening ? "lg:h-160 lg:grid-rows-[minmax(0,1fr)]" : "lg:min-h-105")}>
        <div className="flex min-h-0 min-w-0 flex-col gap-3 sm:gap-4">
          {opening ? (
            <div className={cn("flex flex-1 flex-col", workspaceCard)}>
              <ZipWorkingCard direction="out" title={zipExtractCopy.working} detail={opening.name} done={opening.done} total={opening.total} />
            </div>
          ) : archive ? (
            <>
              <ZipArchiveCard archive={archive} onOpenAnother={open} />
              <div ref={previewRef} className={cn("flex min-h-0 flex-1 scroll-mt-20 flex-col", !picked && "max-lg:hidden")}>
                <ZipPreviewCard preview={preview} onClose={closePreview} />
              </div>
            </>
          ) : (
            <ZipDropCard
              isDragging={isDragging}
              onBrowse={open}
              onFiles={openZip}
              accept={ZIP_ACCEPT}
              multiple={false}
              override={zipExtractCopy.drop}
            />
          )}
        </div>
        <section
          aria-label={zipExtractCopy.listLabel}
          className={cn("flex min-h-0 min-w-0 flex-col overflow-clip", workspaceCard, !archive && "max-lg:hidden")}
        >
          {archive ? (
            <ZipFilesPanel archive={archive} selected={preview?.entry.name ?? null} onSelect={select} onSave={save} />
          ) : (
            <ZipFilesPlaceholder loading={Boolean(opening)} />
          )}
        </section>
      </div>
    </div>
  );
}
