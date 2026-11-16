"use client";

import { Check, LoaderCircle } from "lucide-react";
import { queueCopy } from "@/content/workspace";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

type ActionBarProps = {
  label: string;
  note?: string;
  readyCount: number;
  doneCount: number;
  hasItems: boolean;
  isProcessing: boolean;
  disabled: boolean;
  quotaRemaining: number | null;
  downloadAllLabel: string;
  onRun: () => void;
  onDownloadAll: () => void;
  className?: string;
};

export function ActionBar({
  label,
  note,
  readyCount,
  doneCount,
  hasItems,
  isProcessing,
  disabled,
  quotaRemaining,
  downloadAllLabel,
  onRun,
  onDownloadAll,
  className,
}: ActionBarProps) {
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <Button
        variant="ink"
        size="xl"
        arrow={!isProcessing}
        onClick={onRun}
        disabled={!readyCount || isProcessing || disabled}
        className="h-13 w-full rounded-2xl"
      >
        {isProcessing && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
        {hasItems ? label : queueCopy.addToStart}
        {readyCount > 1 && ` (${readyCount})`}
      </Button>
      {doneCount > 1 && (
        <Button variant="secondary" size="xl" onClick={onDownloadAll} className="h-13 w-full rounded-2xl">
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
