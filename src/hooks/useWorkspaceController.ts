"use client";

import { useCallback, useMemo } from "react";
import type { Conversion } from "@/config/conversions";
import { acceptAttribute, type FileKind } from "@/config/file-formats";
import type { SampleImage } from "@/config/samples";
import type { WorkspaceToolSlug } from "@/config/tools";
import { saveCopy } from "@/content/workspace";
import { useAutoRun } from "@/hooks/useAutoRun";
import { useBatchTitle } from "@/hooks/useBatchTitle";
import { useCanSaveToPhotos } from "@/hooks/useCanSaveToPhotos";
import { useClearWithUndo } from "@/hooks/useClearWithUndo";
import { useFileDrop } from "@/hooks/useFileDrop";
import { useFilePicker } from "@/hooks/useFilePicker";
import { useFileQueue } from "@/hooks/useFileQueue";
import { useLeaveGuard } from "@/hooks/useLeaveGuard";
import { useRememberTool } from "@/hooks/useRecentTools";
import { useToolOptions } from "@/hooks/useToolOptions";
import { useToolRunner } from "@/hooks/useToolRunner";
import { useWorkspacePerks } from "@/hooks/useWorkspacePerks";
import { useWorkspaceSession } from "@/hooks/useWorkspaceSession";
import type { MetadataFields, ToolOptions } from "@/lib/image/options";
import { fetchAsFile } from "@/lib/utils/fetch-file";
import { isGalleryMedia, saveFiles } from "@/lib/utils/save-file";
import { toolBehaviors } from "@/components/workspace/toolBehaviors";

type ControllerProps = {
  tool: WorkspaceToolSlug;
  accepts?: FileKind[];
  initialOptions?: Partial<ToolOptions>;
  conversion?: Conversion;
};

export function useWorkspaceController({ tool, accepts: acceptsOverride, initialOptions, conversion }: ControllerProps) {
  const behavior = toolBehaviors[tool];
  const action = behavior.action;
  const accepts = acceptsOverride ?? behavior.accepts;
  const { localCapable, formats } = behavior;
  const perks = useWorkspacePerks();
  const queue = useFileQueue({ inspectOnAdd: behavior.inspectOnAdd, accepts, formats, localCapable, perks });
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

  const accept = useMemo(() => acceptAttribute(accepts, localCapable, formats), [accepts, formats, localCapable]);
  const picker = useFilePicker(addFilesAndRun, accept);
  const { isDragging, dropProps } = useFileDrop(addFilesAndRun, !queue.isProcessing);
  const batchTotal = queue.items.filter((item) => item.status !== "error").length;
  const clearAll = useClearWithUndo(queue);
  useBatchTitle({ isProcessing: queue.isProcessing, done: queue.doneItems.length, total: batchTotal });
  useLeaveGuard(queue.isProcessing);

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
  const resultBytes = useMemo(() => results.reduce((total, result) => total + result.blob.size, 0), [results]);
  const allToPhotos = useCanSaveToPhotos() && results.every((result) => isGalleryMedia(result.blob.type));

  const downloadAll = useCallback(() => {
    saveFiles(results, action?.zipName ?? "files.zip");
  }, [action?.zipName, results]);

  return {
    tool,
    behavior,
    action,
    accepts,
    formats,
    localCapable,
    queue,
    options,
    optionsError,
    changeOptions,
    run,
    picker,
    isDragging,
    dropProps,
    batchTotal,
    clearAll,
    addSample,
    results,
    totalBytes,
    resultBytes,
    downloadAll,
    downloadAllLabel: saveCopy.label(results.length, allToPhotos),
    hasItems: queue.items.length > 0,
  };
}

export type WorkspaceController = ReturnType<typeof useWorkspaceController>;
