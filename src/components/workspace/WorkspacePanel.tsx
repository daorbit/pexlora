"use client";

import { useCallback, useMemo, type ReactNode } from "react";
import type { Conversion } from "@/config/conversions";
import { acceptAttribute, type FileKind } from "@/config/file-formats";
import type { SampleImage } from "@/config/samples";
import type { WorkspaceToolSlug } from "@/config/tools";
import { batchTitleCopy, dropzoneOverrides, panelNotes, saveCopy } from "@/content/workspace";
import { housePromos, resultsPromoTools } from "@/config/house-promos";
import { useAutoRun } from "@/hooks/useAutoRun";
import { useBatchTitle } from "@/hooks/useBatchTitle";
import { useClearWithUndo } from "@/hooks/useClearWithUndo";
import { useLeaveGuard } from "@/hooks/useLeaveGuard";
import { useToolRunner } from "@/hooks/useToolRunner";
import { useCanSaveToPhotos } from "@/hooks/useCanSaveToPhotos";
import { useRememberTool } from "@/hooks/useRecentTools";
import { isLocalFormat } from "@/lib/files/detect";
import { useFileDrop } from "@/hooks/useFileDrop";
import { useFileQueue } from "@/hooks/useFileQueue";
import { useFilePicker } from "@/hooks/useFilePicker";
import { useToolOptions } from "@/hooks/useToolOptions";
import { useWorkspacePerks } from "@/hooks/useWorkspacePerks";
import { useWorkspaceSession } from "@/hooks/useWorkspaceSession";
import type { MetadataFields, ToolOptions } from "@/lib/image/options";
import { fetchAsFile } from "@/lib/utils/fetch-file";
import { isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { cn } from "@/lib/utils/cn";
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
import { alwaysStagedTools, ToolStage } from "@/components/workspace/stage/ToolStage";

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
  const perks = useWorkspacePerks();
  const queue = useFileQueue({
    inspectOnAdd: behavior.inspectOnAdd,
    accepts,
    localCapable,
    perks,
  });
  const { addFiles, resetResults } = queue;
  const [options, setOptions, patchOptions] = useToolOptions(tool, initialOptions);
  const optionsError = action?.validate?.(options) ?? null;
  const restoreMetadata = useCallback((metadata: MetadataFields) => patchOptions({ metadata }), [patchOptions]);
  useRememberTool(tool);

  const run = useToolRunner(action, options, Boolean(optionsError), queue);

  const addFilesAndRun = useAutoRun(addFiles, {
    enabled: Boolean(action?.autoRun),
    canRun:
      !queue.isProcessing &&
      queue.readyCount > 0 &&
      !queue.notice &&
      !optionsError &&
      !queue.items.some((item) => item.status === "inspecting"),
    run,
  });

  useWorkspaceSession(tool, { ...queue, addFiles: addFilesAndRun }, {
    metadata: options.metadata,
    restoreMetadata,
    scope: conversion?.slug,
  });

  const accept = useMemo(() => acceptAttribute(accepts, localCapable), [accepts, localCapable]);
  const picker = useFilePicker(addFilesAndRun, accept);
  const { isDragging, dropProps } = useFileDrop(addFilesAndRun, !queue.isProcessing);
  const hasItems = queue.items.length > 0;
  const batchTotal = queue.items.filter((item) => item.status !== "error").length;
  const clearAll = useClearWithUndo(queue);
  useBatchTitle({ isProcessing: queue.isProcessing, done: queue.doneItems.length, total: batchTotal });
  useLeaveGuard(queue.isProcessing);
  const hasPanel = Boolean(action || panelFooter);
  const note = panelNotes[tool];
  const staged = alwaysStagedTools.includes(tool);

  const changeOptions = useCallback(
    (next: ToolOptions) => {
      setOptions(next);
      resetResults();
    },
    [resetResults, setOptions],
  );

  const addSample = useCallback(
    async (sample: SampleImage) => {
      addFilesAndRun([await fetchAsFile(sample.src, sample.fileName)]);
    },
    [addFilesAndRun],
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
        downloadAllLabel={saveCopy.label(results.length, allToPhotos)}
        onRun={run}
        onDownloadAll={downloadAll}
        className={className}
      />
    );

  return (
    <DownloadGateProvider>
      <div {...dropProps} className={cn("grid items-start gap-3 sm:gap-4", hasPanel && "lg:grid-cols-[minmax(0,1fr)_340px]")}>
        <input {...picker.inputProps} />
        <p role="status" className="sr-only">
          {queue.isProcessing ? batchTitleCopy.working(batchTotal) : ""}
        </p>

        <div className="flex min-w-0 flex-col gap-3 lg:self-stretch">
          <UpsellAlert message={queue.notice?.message ?? null} upsell={queue.notice?.upsell ?? null} />
          {hasItems ? (
            <FilesCard
              fileCount={queue.items.length}
              totalBytes={totalBytes}
              isDragging={isDragging}
              canAddMore={queue.canAddMore}
              disabled={queue.isProcessing}
              onAdd={picker.open}
              onClear={clearAll}
            >
              {queue.items.map((item, index) => (
                <FileRow
                  key={item.id}
                  item={item}
                  comparable={action?.compare}
                  compareOpen={index === 0}
                  onRemove={queue.remove}
                  disabled={queue.isProcessing}
                  onDevice={localCapable && isLocalFormat(item.format) && !item.result?.uploaded}
                  onMove={action?.orderable && queue.items.length > 1 ? queue.move : undefined}
                  position={{ first: index === 0, last: index === queue.items.length - 1 }}
                />
              ))}
            </FilesCard>
          ) : (
            <div
              className={cn(
                "flex flex-col rounded-[20px] bg-surface p-2 shadow-card sm:rounded-[22px] sm:p-2.5",
                !staged && hasPanel && "lg:flex-1",
              )}
            >
              <Dropzone
                accepts={accepts}
                localCapable={localCapable}
                isDragging={isDragging}
                onBrowse={picker.open}
                onSample={addSample}
                override={dropzoneOverrides[tool]}
                short={staged}
                className="lg:flex-1"
              />
            </div>
          )}
          {!conversion && (
            <ToolStage
              tool={tool}
              options={options}
              onChange={changeOptions}
              disabled={queue.isProcessing}
              sourceFile={queue.items[0]?.file}
            />
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
                sourceFile={queue.items[0]?.file}
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
            "sticky bottom-(--bottom-bar,0px) z-10 -mx-1 rounded-t-3xl bg-background/90 px-1 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden",
          )}
      </div>
    </DownloadGateProvider>
  );
}
