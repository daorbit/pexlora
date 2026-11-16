"use client";

import { LoaderCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

type QueueToolbarProps = {
  fileCount: number;
  readyCount: number;
  doneCount: number;
  quotaRemaining: number | null;
  isProcessing: boolean;
  canAddMore: boolean;
  actionLabel?: string;
  actionDisabled?: boolean;
  downloadAllLabel: string;
  onAdd: () => void;
  onClear: () => void;
  onRun: () => void;
  onDownloadAll: () => void;
};

export function QueueToolbar({
  fileCount,
  readyCount,
  doneCount,
  quotaRemaining,
  isProcessing,
  canAddMore,
  actionLabel,
  actionDisabled = false,
  downloadAllLabel,
  onAdd,
  onClear,
  onRun,
  onDownloadAll,
}: QueueToolbarProps) {
  return (
    <div className="sticky bottom-0 z-10 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-separator bg-subtle/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:px-5">
      <Button variant="secondary" size="sm" onClick={onAdd} disabled={!canAddMore || isProcessing}>
        <Plus className="size-4" aria-hidden />
        Add Files
      </Button>
      <Button variant="nav" className="px-2 text-[13px]" onClick={onClear} disabled={isProcessing}>
        Clear All
      </Button>
      <span className="hidden text-[13px] text-secondary sm:inline">
        {fileCount} {fileCount === 1 ? "file" : "files"}
        {quotaRemaining !== null && ` · ${quotaRemaining} free left today`}
      </span>
      <div className="flex w-full items-center gap-2 sm:ml-auto sm:w-auto">
        {doneCount > 1 && (
          <Button variant="secondary" onClick={onDownloadAll} className="flex-1 sm:flex-none">
            {downloadAllLabel}
          </Button>
        )}
        {actionLabel && (
          <Button onClick={onRun} disabled={!readyCount || isProcessing || actionDisabled} className="flex-1 sm:flex-none">
            {isProcessing && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
            {actionLabel}
            {readyCount > 1 && ` (${readyCount})`}
          </Button>
        )}
      </div>
    </div>
  );
}
