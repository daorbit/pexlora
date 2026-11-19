"use client";

import type { MouseEvent } from "react";
import { Upload } from "lucide-react";
import { acceptAttribute, type FileKind } from "@/config/file-formats";
import type { SampleImage } from "@/config/samples";
import { dropzoneCopy, type DropzoneOverride } from "@/content/workspace";
import { useWorkspacePerks } from "@/hooks/useWorkspacePerks";
import { describeAccepted } from "@/lib/files/detect";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ImportSources } from "@/components/import/ImportSources";
import { SampleChips } from "@/components/workspace/SampleChips";

type DropzoneProps = {
  accepts: FileKind[];
  formats?: string[];
  localCapable: boolean;
  isDragging: boolean;
  onBrowse: () => void;
  onFiles?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  onSample: (sample: SampleImage) => void;
  compact?: boolean;
  short?: boolean;
  override?: DropzoneOverride;
  className?: string;
};

function isOwnControl(target: EventTarget) {
  return target instanceof Element && target.closest("button, a, input") !== null;
}

export function Dropzone({
  accepts,
  formats,
  localCapable,
  isDragging,
  onBrowse,
  onFiles,
  accept,
  multiple = true,
  onSample,
  compact = false,
  short = false,
  override,
  className,
}: DropzoneProps) {
  const perks = useWorkspacePerks();
  const note = override?.note ?? dropzoneCopy.onDevice;
  const showSamples = accepts.includes("image") && override?.samples !== false;
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isOwnControl(event.target)) onBrowse();
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "group/drop flex cursor-pointer flex-col items-center justify-center rounded-2xl border-[1.5px] border-dashed px-5 text-center transition-[background-color,border-color,scale] duration-300 active:bg-fill sm:px-8",
        short ? "min-h-44 gap-4 py-6 sm:min-h-52 sm:gap-5 sm:py-8" : "min-h-56 gap-5 py-8 sm:min-h-80 sm:gap-8 sm:py-14",
        isDragging ? "border-foreground bg-accent-soft motion-safe:scale-[1.01]" : "border-border-strong bg-surface sm:hover:border-foreground/40",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3.5 sm:gap-5">
        <span
          className={cn(
            "flex size-16 items-center justify-center rounded-full transition-colors duration-300 sm:size-20",
            isDragging ? "bg-primary text-primary-foreground" : "bg-fill text-foreground group-hover/drop:bg-fill-strong",
          )}
        >
          <Upload className="size-8 stroke-[1.5] motion-safe:animate-float-y sm:size-9" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-col gap-2 sm:gap-3">
          <p className="text-[18px] font-semibold tracking-[-0.02em] sm:text-[22px]">
            <span className="sm:hidden">{override?.mobileTitle ?? dropzoneCopy.mobileTitle(accepts)}</span>
            <span className="hidden sm:inline">
              {isDragging ? dropzoneCopy.dragging : (override?.title ?? dropzoneCopy.browseTitle(accepts))}
            </span>
          </p>
          <p className="font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-tertiary uppercase sm:text-[11.5px]">
            {describeAccepted(accepts, localCapable, perks, override?.formats, formats)}
            {override?.batch !== false && <span className="hidden sm:inline"> · {perks.filesPerBatch} at a time</span>}
          </p>
        </div>
      </div>
      <Button variant="ink" size="md" arrow onClick={onBrowse} className="sr-only">
        {dropzoneCopy.button(accepts)}
      </Button>
      {onFiles && (
        <ImportSources
          size="labelled"
          onFiles={onFiles}
          accept={accept ?? acceptAttribute(accepts, localCapable, formats)}
          multiple={multiple}
        />
      )}
      {localCapable && !compact && <p className="hidden max-w-md text-[13px] text-secondary sm:block">{note}</p>}
      {showSamples && <SampleChips onSelect={onSample} />}
    </div>
  );
}
