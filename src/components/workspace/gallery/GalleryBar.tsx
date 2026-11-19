"use client";

import { Download, LoaderCircle } from "lucide-react";
import { galleryCopy, queueCopy } from "@/content/workspace";
import type { WorkspaceController } from "@/hooks/useWorkspaceController";
import { formatBytes } from "@/lib/utils/format-bytes";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { SaveToDriveButton } from "@/components/drive/SaveToDriveButton";
import { BatchProgress } from "@/components/workspace/BatchProgress";
import { useDownloadGate } from "@/components/workspace/DownloadGate";

type GalleryBarProps = {
  controller: WorkspaceController;
  target: string;
  className?: string;
};

export function GalleryBar({ controller, target, className }: GalleryBarProps) {
  const { queue, totalBytes, resultBytes, results, batchTotal } = controller;
  const guardDownload = useDownloadGate();
  const doneCount = queue.doneItems.length;
  const finished = doneCount > 0 && queue.readyCount === 0 && !queue.isProcessing;
  const save = () => guardDownload(controller.downloadAll, doneCount);
  const sizes = results.length
    ? galleryCopy.sizesInOut(formatBytes(totalBytes), formatBytes(resultBytes))
    : galleryCopy.sizesIn(formatBytes(totalBytes));

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[15px] font-semibold">{galleryCopy.summary(batchTotal, target)}</span>
        <span key={sizes} className="font-mono text-xs text-secondary tabular-nums motion-safe:animate-fade-in">
          {sizes}
        </span>
        {queue.isProcessing && batchTotal > 1 && <BatchProgress done={doneCount} total={batchTotal} className="mt-1.5 w-56 max-w-full" />}
        {queue.quotaRemaining !== null && <span className="text-xs text-tertiary">{queueCopy.freeLeft(queue.quotaRemaining)}</span>}
      </div>
      <div className="flex flex-wrap items-center gap-2 max-sm:[&>*]:flex-1">
        {doneCount > 0 && !queue.isProcessing && <SaveToDriveButton files={results} size="lg" />}
        {doneCount > 0 && (
          <Button
            variant={finished ? "primary" : "secondary"}
            size="lg"
            onClick={save}
            className={cn(finished && "motion-safe:animate-pop")}
          >
            <Download className="size-4" aria-hidden />
            {controller.downloadAllLabel}
          </Button>
        )}
        {!finished && (
          <Button
            variant="primary"
            size="lg"
            arrow={!queue.isProcessing}
            onClick={controller.run}
            disabled={!queue.readyCount || queue.isProcessing || Boolean(controller.optionsError)}
            className="transition-transform motion-safe:active:scale-[0.98]"
          >
            {queue.isProcessing && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
            {galleryCopy.run(target)}
          </Button>
        )}
      </div>
    </div>
  );
}
