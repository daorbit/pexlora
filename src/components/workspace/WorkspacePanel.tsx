"use client";

import { useCallback, useMemo, useState } from "react";
import { acceptAttribute, type FileKind } from "@/config/file-formats";
import type { SampleImage } from "@/config/samples";
import { routes } from "@/config/site";
import type { WorkspaceToolSlug } from "@/config/tools";
import { useFileDrop } from "@/hooks/useFileDrop";
import { useFileQueue } from "@/hooks/useFileQueue";
import { useFilePicker } from "@/hooks/useFilePicker";
import { DEFAULT_OUTPUT_FORMAT, DEFAULT_QUALITY } from "@/lib/image/formats";
import { saveCopy } from "@/content/workspace";
import { useCanSaveToPhotos } from "@/hooks/useCanSaveToPhotos";
import { cn } from "@/lib/utils/cn";
import { fetchAsFile } from "@/lib/utils/fetch-file";
import { isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { ConvertOptionsBar } from "@/components/workspace/ConvertOptionsBar";
import { Dropzone } from "@/components/workspace/Dropzone";
import { FileRow } from "@/components/workspace/FileRow";
import { QueueToolbar } from "@/components/workspace/QueueToolbar";
import { toolBehaviors, type ConvertOptions } from "@/components/workspace/toolBehaviors";

type WorkspacePanelProps = {
  tool: WorkspaceToolSlug;
  accepts?: FileKind[];
};

export function WorkspacePanel({ tool, accepts: acceptsOverride }: WorkspacePanelProps) {
  const behavior = toolBehaviors[tool];
  const accepts = acceptsOverride ?? behavior.accepts;
  const queue = useFileQueue({ inspectOnAdd: behavior.inspectOnAdd, accepts });
  const { addFiles, resetResults, process } = queue;
  const [options, setOptions] = useState<ConvertOptions>({
    format: DEFAULT_OUTPUT_FORMAT,
    quality: DEFAULT_QUALITY,
  });

  const accept = useMemo(() => acceptAttribute(accepts), [accepts]);
  const picker = useFilePicker(addFiles, accept);
  const { isDragging, dropProps } = useFileDrop(addFiles, !queue.isProcessing);
  const hasItems = queue.items.length > 0;

  const changeOptions = useCallback(
    (next: ConvertOptions) => {
      setOptions(next);
      resetResults();
    },
    [resetResults],
  );

  const run = useCallback(() => {
    if (behavior.action) process((file) => behavior.action!.run(file, options));
  }, [behavior.action, options, process]);

  const addSample = useCallback(
    async (sample: SampleImage) => {
      addFiles([await fetchAsFile(sample.src, sample.fileName)]);
    },
    [addFiles],
  );

  const results = useMemo(() => queue.doneItems.map((item) => item.result!), [queue.doneItems]);
  const allToPhotos = useCanSaveToPhotos() && results.every((result) => isGalleryMedia(result.blob.type));

  const downloadAll = useCallback(() => {
    saveFiles(results, behavior.action?.zipName ?? "files.zip");
  }, [behavior.action?.zipName, results]);

  return (
    <div {...dropProps} className="relative flex flex-col gap-2.5">
      <input {...picker.inputProps} />

      {tool === "convert-format" && (
        <ConvertOptionsBar options={options} onChange={changeOptions} disabled={queue.isProcessing} />
      )}

      {queue.notice && (
        <Alert
          message={queue.notice.message}
          action={
            queue.notice.upsell && (
              <ButtonLink href={routes.signUp} size="sm">
                Create Free Account
              </ButtonLink>
            )
          }
        />
      )}

      {hasItems ? (
        <div
          className={cn(
            "overflow-clip rounded-[20px] border border-separator transition-colors",
            isDragging && "border-foreground bg-fill",
          )}
        >
          <ul className="divide-y divide-separator">
            {queue.items.map((item) => (
              <FileRow
                key={item.id}
                item={item}
                defaultExpanded={behavior.expandReports}
                onRemove={queue.remove}
                disabled={queue.isProcessing}
              />
            ))}
          </ul>
          <QueueToolbar
            fileCount={queue.items.length}
            readyCount={queue.readyCount}
            doneCount={queue.doneItems.length}
            quotaRemaining={queue.quotaRemaining}
            isProcessing={queue.isProcessing}
            canAddMore={queue.canAddMore}
            actionLabel={behavior.action?.label}
            onAdd={picker.open}
            onClear={queue.reset}
            onRun={run}
            onDownloadAll={downloadAll}
            downloadAllLabel={allToPhotos ? saveCopy.photosAll : saveCopy.downloadAll}
          />
        </div>
      ) : (
        <Dropzone accepts={accepts} isDragging={isDragging} onBrowse={picker.open} onSample={addSample} />
      )}
    </div>
  );
}
