"use client";

import { useCallback, useMemo } from "react";
import { acceptAttribute, type FileKind } from "@/config/file-formats";
import type { SampleImage } from "@/config/samples";
import type { WorkspaceToolSlug } from "@/config/tools";
import { useFileDrop } from "@/hooks/useFileDrop";
import { useFileQueue } from "@/hooks/useFileQueue";
import { useFilePicker } from "@/hooks/useFilePicker";
import { useToolOptions } from "@/hooks/useToolOptions";
import { useWorkspaceSession } from "@/hooks/useWorkspaceSession";
import type { MetadataFields, ToolOptions } from "@/lib/image/options";
import { saveCopy } from "@/content/workspace";
import { useCanSaveToPhotos } from "@/hooks/useCanSaveToPhotos";
import { cn } from "@/lib/utils/cn";
import { fetchAsFile } from "@/lib/utils/fetch-file";
import { isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { Dropzone } from "@/components/workspace/Dropzone";
import { FileRow } from "@/components/workspace/FileRow";
import { ToolOptionsBar } from "@/components/workspace/options/ToolOptionsBar";
import { QueueToolbar } from "@/components/workspace/QueueToolbar";
import { ResultSummary } from "@/components/workspace/ResultSummary";
import { toolBehaviors } from "@/components/workspace/toolBehaviors";

export type WorkspacePanelProps = {
  tool: WorkspaceToolSlug;
  accepts?: FileKind[];
  initialOptions?: Partial<ToolOptions>;
  conversion?: string;
};

export function WorkspacePanel({ tool, accepts: acceptsOverride, initialOptions, conversion }: WorkspacePanelProps) {
  const behavior = toolBehaviors[tool];
  const accepts = acceptsOverride ?? behavior.accepts;
  const queue = useFileQueue({ inspectOnAdd: behavior.inspectOnAdd, accepts });
  const { addFiles, resetResults, process } = queue;
  const [options, setOptions, patchOptions] = useToolOptions(tool, initialOptions);
  const optionsError = behavior.action?.validate?.(options) ?? null;
  const restoreMetadata = useCallback((metadata: MetadataFields) => patchOptions({ metadata }), [patchOptions]);
  useWorkspaceSession(tool, queue, { metadata: options.metadata, restoreMetadata, scope: conversion });

  const accept = useMemo(() => acceptAttribute(accepts), [accepts]);
  const picker = useFilePicker(addFiles, accept);
  const { isDragging, dropProps } = useFileDrop(addFiles, !queue.isProcessing);
  const hasItems = queue.items.length > 0;

  const changeOptions = useCallback(
    (next: ToolOptions) => {
      setOptions(next);
      resetResults();
    },
    [resetResults, setOptions],
  );

  const run = useCallback(() => {
    if (behavior.action && !optionsError) process((file) => behavior.action!.run(file, options));
  }, [behavior.action, optionsError, options, process]);

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

      {!conversion && (
        <ToolOptionsBar
          tool={tool}
          options={options}
          onChange={changeOptions}
          disabled={queue.isProcessing}
          sourceFile={queue.items.find((item) => item.format.kind === "image")?.file}
        />
      )}

      <UpsellAlert message={queue.notice?.message ?? null} upsell={Boolean(queue.notice?.upsell)} />

      {behavior.action && !queue.isProcessing && queue.doneItems.length > 0 && (
        <ResultSummary items={queue.doneItems} doneLabel={behavior.action.doneLabel} />
      )}

      {hasItems ? (
        <div
          className={cn(
            "overflow-clip rounded-2xl border border-separator transition-colors",
            isDragging && "border-foreground bg-fill",
          )}
        >
          <ul className="divide-y divide-separator">
            {queue.items.map((item) => (
              <FileRow
                key={item.id}
                item={item}
                defaultExpanded={behavior.expandReports}
                doneLabel={behavior.action?.doneLabel}
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
            actionDisabled={Boolean(optionsError)}
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
