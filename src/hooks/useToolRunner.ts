"use client";

import { useCallback } from "react";
import { toastCopy } from "@/content/toasts";
import type { BatchSummary } from "@/hooks/useFileQueue";
import type { ToolOptions } from "@/lib/image/options";
import type { ProcessedFile } from "@/lib/metadata/types";
import { toast } from "@/lib/toast/store";
import { vibrate } from "@/lib/utils/haptics";
import type { ToolAction } from "@/components/workspace/toolBehaviors";

type RunnerQueue = {
  process: (run: (file: File) => Promise<ProcessedFile>) => Promise<BatchSummary>;
  combine: (run: (files: File[]) => Promise<ProcessedFile>) => Promise<BatchSummary>;
};

export function useToolRunner(action: ToolAction | undefined, options: ToolOptions, blocked: boolean, queue: RunnerQueue) {
  const { process, combine } = queue;

  return useCallback(async () => {
    if (!action || blocked) return;
    const { run: runFile, combine: runAll } = action;
    let summary: BatchSummary | null = null;
    if (runAll) summary = await combine((files) => runAll(files, options));
    else if (runFile) summary = await process((file) => runFile(file, options));
    if (!summary) return;

    const { done, failed } = summary;
    if (done) toast.success(action.doneToast?.(done) ?? toastCopy.filesDone(done, action.doneLabel));
    if (failed) toast.error(toastCopy.filesFailed(failed));
    if (done || failed) vibrate(failed ? "error" : "success");
  }, [action, blocked, combine, options, process]);
}
