"use client";

import { useCallback, useMemo, type ReactNode } from "react";
import type { Conversion } from "@/config/conversions";
import { acceptAttribute, type FileKind } from "@/config/file-formats";
import type { SampleImage } from "@/config/samples";
import type { WorkspaceToolSlug } from "@/config/tools";
import { toastCopy } from "@/content/toasts";
import { panelNotes, saveCopy } from "@/content/workspace";
import { housePromos, resultsPromoTools } from "@/config/house-promos";
import { useCanSaveToPhotos } from "@/hooks/useCanSaveToPhotos";
import { useFileDrop } from "@/hooks/useFileDrop";
import { useFileQueue } from "@/hooks/useFileQueue";
import { useFilePicker } from "@/hooks/useFilePicker";
import { useToolOptions } from "@/hooks/useToolOptions";
import { useWorkspaceSession } from "@/hooks/useWorkspaceSession";
import type { MetadataFields, ToolOptions } from "@/lib/image/options";
import { fetchAsFile } from "@/lib/utils/fetch-file";
import { isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { cn } from "@/lib/utils/cn";
import { toast } from "@/lib/toast/store";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { ActionBar } from "@/components/workspace/ActionBar";
import { ConversionSummary } from "@/components/workspace/ConversionSummary";
import { DownloadGateProvider } from "@/components/workspace/DownloadGate";
import { Dropzone } from "@/components/workspace/Dropzone";
import { FileRow } from "@/components/workspace/FileRow";
import { FilesCard } from "@/components/workspace/FilesCard";
import { NextSteps } from "@/components/workspace/NextSteps";
import { HousePromoCard } from "@/components/promo/HousePromoCard";
import { ToolOptionsBar } from "@/components/workspace/options/ToolOptionsBar";
import { PanelChecklist } from "@/components/workspace/PanelChecklist";
import { ResultSummary } from "@/components/workspace/ResultSummary";
import { SettingsPanel } from "@/components/workspace/SettingsPanel";
import { toolBehaviors } from "@/components/workspace/toolBehaviors";

export type WorkspacePanelProps = {
  tool: WorkspaceToolSlug;
  accepts?: FileKind[];
  initialOptions?: Partial<ToolOptions>;
  conversion?: Conversion;
  panelFooter?: ReactNode;
};

export function WorkspacePanel({
  tool,
  accepts: acceptsOverride,
  initialOptions,
  conversion,
  panelFooter,
}: WorkspacePanelProps) {
  const behavior = toolBehaviors[tool];
  const action = behavior.action;
  const accepts = acceptsOverride ?? behavior.accepts;
  const { localCapable } = behavior;
  const queue = useFileQueue({
    inspectOnAdd: behavior.inspectOnAdd,
    accepts,
    localCapable,
  });
  const { addFiles, resetResults, process } = queue;
  const [options, setOptions, patchOptions] = useToolOptions(tool, initialOptions);
  const optionsError = action?.validate?.(options) ?? null;
  const restoreMetadata = useCallback((metadata: MetadataFields) => patchOptions({ metadata }), [patchOptions]);
  useWorkspaceSession(tool, queue, {
    metadata: options.metadata,
    restoreMetadata,
    scope: conversion?.slug,
  });

  const accept = useMemo(() => acceptAttribute(accepts, localCapable), [accepts, localCapable]);
  const picker = useFilePicker(addFiles, accept);
  const { isDragging, dropProps } = useFileDrop(addFiles, !queue.isProcessing);
  const hasItems = queue.items.length > 0;
  const hasPanel = Boolean(action || panelFooter);
  const note = panelNotes[tool];

  const changeOptions = useCallback(
    (next: ToolOptions) => {
      setOptions(next);
      resetResults();
    },
    [resetResults, setOptions],
  );

  const run = useCallback(async () => {
    if (!action || optionsError) return;
    const { done, failed } = await process((file) => action.run(file, options));
    if (done) toast.success(action.doneToast?.(done) ?? toastCopy.filesDone(done, action.doneLabel));
    if (failed) toast.error(toastCopy.filesFailed(failed));
  }, [action, optionsError, options, process]);

  const addSample = useCallback(
    async (sample: SampleImage) => {
      addFiles([await fetchAsFile(sample.src, sample.fileName)]);
    },
    [addFiles],
  );

  const results = useMemo(() => queue.doneItems.map((item) => item.result!), [queue.doneItems]);
  const totalBytes = useMemo(() => queue.items.reduce((total, item) => total + item.file.size, 0), [queue.items]);
  const allToPhotos = useCanSaveToPhotos() && results.every((result) => isGalleryMedia(result.blob.type));

  const downloadAll = useCallback(() => {
    saveFiles(results, action?.zipName ?? "files.zip");
  }, [action?.zipName, results]);

  const actionBar = (className: string) =>
    action && (
      <ActionBar
        label={action.label}
        note={action.note}
        readyCount={queue.readyCount}
        doneCount={queue.doneItems.length}
        hasItems={hasItems}
        isProcessing={queue.isProcessing}
        disabled={Boolean(optionsError)}
        quotaRemaining={queue.quotaRemaining}
        downloadAllLabel={allToPhotos ? saveCopy.photosAll : saveCopy.downloadAll}
        onRun={run}
        onDownloadAll={downloadAll}
        className={className}
      />
    );

  return (
    <DownloadGateProvider>
      <div {...dropProps} className={cn("grid items-start gap-3 sm:gap-4", hasPanel && "lg:grid-cols-[minmax(0,1fr)_340px]")}>
        <input {...picker.inputProps} />

        <div className="flex min-w-0 flex-col gap-3">
          <UpsellAlert message={queue.notice?.message ?? null} upsell={queue.notice?.upsell ?? null} />
          {hasItems ? (
            <FilesCard
              fileCount={queue.items.length}
              totalBytes={totalBytes}
              isDragging={isDragging}
              canAddMore={queue.canAddMore}
              disabled={queue.isProcessing}
              onAdd={picker.open}
              onClear={queue.reset}
            >
              {queue.items.map((item, index) => (
                <FileRow
                  key={item.id}
                  item={item}
                  comparable={action?.compare}
                  compareOpen={index === 0}
                  onRemove={queue.remove}
                  disabled={queue.isProcessing}
                />
              ))}
            </FilesCard>
          ) : (
            <div className="rounded-[20px] bg-surface p-2 shadow-card sm:rounded-[22px] sm:p-2.5">
              <Dropzone
                accepts={accepts}
                localCapable={localCapable}
                isDragging={isDragging}
                onBrowse={picker.open}
                onSample={addSample}
              />
            </div>
          )}
        </div>

        {hasPanel && (
          <SettingsPanel>
            {conversion ? (
              <ConversionSummary conversion={conversion} />
            ) : (
              <ToolOptionsBar
                tool={tool}
                options={options}
                onChange={changeOptions}
                disabled={queue.isProcessing}
                sourceFile={queue.items.find((item) => item.format.kind === "image")?.file}
              />
            )}
            {note && <PanelChecklist title={note.title} items={note.items} />}
            {action && !queue.isProcessing && queue.doneItems.length > 0 && (
              <ResultSummary items={queue.doneItems} doneLabel={action.doneLabel} />
            )}
            {actionBar(cn(hasItems && "max-lg:hidden"))}
            {!queue.isProcessing && results.length > 0 && <NextSteps current={tool} results={results} />}
            {!queue.isProcessing && results.length > 0 && resultsPromoTools.includes(tool) && (
              <HousePromoCard promo={housePromos.results} placement="results" dismissible />
            )}
            {panelFooter}
          </SettingsPanel>
        )}

        {hasItems &&
          actionBar(
            "sticky bottom-0 z-10 -mx-1 rounded-t-3xl bg-background/90 px-1 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden",
          )}
      </div>
    </DownloadGateProvider>
  );
}
