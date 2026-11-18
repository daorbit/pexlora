"use client";

import { Check, Download, LoaderCircle } from "lucide-react";
import { queueCopy } from "@/content/workspace";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { BatchProgress } from "@/components/workspace/BatchProgress";
import { useDownloadGate } from "@/components/workspace/DownloadGate";

type ActionBarProps = {
  label: string;
  note?: string;
  readyCount: number;
  doneCount: number;
  totalCount?: number;
  hasItems: boolean;
  isProcessing: boolean;
  disabled: boolean;
  quotaRemaining: number | null;
  downloadAllLabel: string;
  onRun: () => void;
  onDownloadAll: () => void;
  className?: string;
};

const bigButton = "h-13 w-full rounded-2xl";

export function ActionBar({
  label,
  note,
  readyCount,
  doneCount,
  totalCount = 0,
  hasItems,
  isProcessing,
  disabled,
  quotaRemaining,
  downloadAllLabel,
  onRun,
  onDownloadAll,
  className,
}: ActionBarProps) {
  const guardDownload = useDownloadGate();
  const finished = doneCount > 0 && readyCount === 0 && !isProcessing;
  const save = () => guardDownload(onDownloadAll, doneCount);

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      {finished ? (
        <Button variant="ink" size="xl" onClick={save} className={cn(bigButton, "motion-safe:animate-pop")}>
          <Download className="size-4.5" aria-hidden />
          {downloadAllLabel}
        </Button>
      ) : (
        <Button
          variant="ink"
          size="xl"
          arrow={!isProcessing}
          onClick={onRun}
          disabled={!readyCount || isProcessing || disabled}
          className={cn(bigButton, "transition-transform motion-safe:active:scale-[0.98]")}
        >
          {isProcessing && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
          {hasItems ? label : queueCopy.addToStart}
          {readyCount > 1 && ` (${readyCount})`}
        </Button>
      )}
      {isProcessing && totalCount > 1 && <BatchProgress done={doneCount} total={totalCount} />}
      {!finished && doneCount > 1 && (
        <Button variant="secondary" size="xl" onClick={save} className={bigButton}>
          {downloadAllLabel}
        </Button>
      )}
      {note && (
        <p className="flex items-center justify-center gap-1.5 text-xs text-secondary">
          <Check className="size-3.5 text-accent-text" strokeWidth={2.6} aria-hidden />
          {note}
        </p>
      )}
      {quotaRemaining !== null && (
        <p className="text-center text-xs text-secondary">{queueCopy.freeLeft(quotaRemaining)}</p>
      )}
    </div>
  );
}
