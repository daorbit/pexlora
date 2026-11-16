"use client";

import { useCallback, useMemo, useState } from "react";
import { acceptAttribute, type FileKind } from "@/config/file-formats";
import type { SampleImage } from "@/config/samples";
import { routes } from "@/config/site";
import type { WorkspaceToolSlug } from "@/config/tools";
import { useFileDrop } from "@/hooks/useFileDrop";
import { useFileQueue } from "@/hooks/useFileQueue";
import { useFilePicker } from "@/hooks/useFilePicker";
import { useHandedOffFiles } from "@/hooks/useHandedOffFiles";
import { DEFAULT_TOOL_OPTIONS, type ToolOptions } from "@/lib/image/options";
import { saveCopy } from "@/content/workspace";
import { useCanSaveToPhotos } from "@/hooks/useCanSaveToPhotos";
import { cn } from "@/lib/utils/cn";
import { fetchAsFile } from "@/lib/utils/fetch-file";
import { isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
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
};

export function WorkspacePanel({ tool, accepts: acceptsOverride, initialOptions }: WorkspacePanelProps) {
  const behavior = toolBehaviors[tool];
  const accepts = acceptsOverride ?? behavior.accepts;
  const queue = useFileQueue({ inspectOnAdd: behavior.inspectOnAdd, accepts });
  const { addFiles, resetResults, process } = queue;
  const [options, setOptions] = useState<ToolOptions>(() => ({ ...DEFAULT_TOOL_OPTIONS, ...initialOptions }));
  const optionsError = behavior.action?.validate?.(options) ?? null;
  useHandedOffFiles(tool, addFiles);

  const accept = useMemo(() => acceptAttribute(accepts), [accepts]);
  const picker = useFilePicker(addFiles, accept);
  const { isDragging, dropProps } = useFileDrop(addFiles, !queue.isProcessing);
  const hasItems = queue.items.length > 0;

  const changeOptions = useCallback(
    (next: ToolOptions) => {
      setOptions(next);
      resetResults();
    },
    [resetResults],
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

      <ToolOptionsBar tool={tool} options={options} onChange={changeOptions} disabled={queue.isProcessing} />

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

      {behavior.action && !queue.isProcessing && queue.doneItems.length > 0 && (
        <ResultSummary items={queue.doneItems} doneLabel={behavior.action.doneLabel} />
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
