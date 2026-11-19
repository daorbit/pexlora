"use client";

import type { ReactNode } from "react";
import { Plus, Upload } from "lucide-react";
import { queueCopy, resultCopy } from "@/content/workspace";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format-bytes";
import { Button } from "@/components/ui/Button";

type FilesCardProps = {
  fileCount: number;
  totalBytes: number;
  doneCount?: number;
  isDragging: boolean;
  canAddMore: boolean;
  disabled: boolean;
  onAdd: () => void;
  onClear: () => void;
  importSlot?: ReactNode;
  children: ReactNode;
};

export function FilesCard({
  fileCount,
  totalBytes,
  doneCount = 0,
  isDragging,
  canAddMore,
  disabled,
  onAdd,
  onClear,
  importSlot,
  children,
}: FilesCardProps) {
  return (
    <section
      aria-label={resultCopy.files(fileCount)}
      className={cn(
        "overflow-clip rounded-[22px] bg-surface shadow-card ring-1 ring-transparent transition-[box-shadow,scale] duration-300",
        isDragging && "ring-foreground motion-safe:scale-[1.005]",
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3.5 sm:px-5">
        <span className="text-[15px] font-semibold">{resultCopy.files(fileCount)}</span>
        <span className="text-sm text-secondary tabular-nums">{formatBytes(totalBytes)}</span>
        {doneCount > 0 && (
          <span key={doneCount} className="rounded-md bg-accent-soft px-1.5 py-0.5 text-xs font-medium text-accent-text tabular-nums motion-safe:animate-pop">
            {queueCopy.progress(doneCount, fileCount)}
          </span>
        )}
        <span className="flex-1" />
        <Button variant="nav" className="px-2 text-[13px]" onClick={onClear} disabled={disabled}>
          {queueCopy.clearAll}
        </Button>
        {importSlot}
        <Button
          variant="secondary"
          size="sm"
          onClick={onAdd}
          disabled={!canAddMore || disabled}
          className="border-transparent bg-fill hover:bg-fill-strong"
        >
          <Plus className="size-4" aria-hidden />
          {queueCopy.addFiles}
        </Button>
      </div>
      <ul className={cn("flex flex-col gap-1 px-2.5", !canAddMore && "pb-2.5")}>{children}</ul>
      {canAddMore && (
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className="m-3 flex w-[calc(100%-1.5rem)] items-center justify-center gap-2 rounded-2xl border-[1.5px] border-dashed border-border-strong px-4 py-4 text-sm text-secondary transition-colors hover:border-foreground/40 hover:text-foreground disabled:opacity-50 sm:m-4 sm:w-[calc(100%-2rem)]"
        >
          <Upload className="size-4" aria-hidden />
          {queueCopy.dropMore}
        </button>
      )}
    </section>
  );
}
