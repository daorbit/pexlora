"use client";

import type { MouseEvent } from "react";
import { Upload } from "lucide-react";
import { fileKinds, type FileKind } from "@/config/file-formats";
import { MAX_FILES_PER_BATCH } from "@/config/limits";
import type { SampleImage } from "@/config/samples";
import { dropzoneCopy } from "@/content/workspace";
import { describeAccepted } from "@/lib/files/detect";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { SampleChips } from "@/components/workspace/SampleChips";

type DropzoneProps = {
  accepts: FileKind[];
  isDragging: boolean;
  onBrowse: () => void;
  onSample: (sample: SampleImage) => void;
};

function isOwnControl(target: EventTarget) {
  return target instanceof Element && target.closest("button, a, input") !== null;
}

export function Dropzone({ accepts, isDragging, onBrowse, onSample }: DropzoneProps) {
  const acceptsLocal = accepts.some((kind) => kind !== "image");

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isOwnControl(event.target)) onBrowse();
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex min-h-72 cursor-pointer flex-col items-center justify-center gap-5 rounded-[20px] border-[1.5px] border-dashed px-5 py-10 text-center transition-colors sm:min-h-80 sm:gap-6 sm:px-6 sm:py-14",
        isDragging ? "border-foreground bg-fill" : "border-border-strong bg-subtle hover:border-foreground/40 hover:bg-fill/60",
      )}
    >
      <span className="inline-flex size-14 items-center justify-center rounded-[18px] bg-primary text-primary-foreground">
        <Upload className="size-6" strokeWidth={2} aria-hidden />
      </span>
      <div className="flex flex-col gap-1.5">
        <p className="font-display text-[22px] font-semibold tracking-[-0.02em] sm:text-2xl">
          <span className="sm:hidden">{dropzoneCopy.mobileTitle(accepts)}</span>
          <span className="hidden sm:inline">{isDragging ? dropzoneCopy.dragging : dropzoneCopy.title(accepts)}</span>
        </p>
        <p className="text-[15px] text-secondary">
          <span className="hidden sm:inline">{dropzoneCopy.paste} · </span>
          {MAX_FILES_PER_BATCH} at a time
        </p>
      </div>
      <Button variant="ink" size="lg" arrow onClick={onBrowse} className="w-full max-w-xs justify-between pl-6 sm:w-auto sm:justify-center">
        {dropzoneCopy.button(accepts)}
      </Button>
      <ul className="flex flex-wrap justify-center gap-1.5" aria-label={describeAccepted(accepts)}>
        {accepts.map((kind) => (
          <li
            key={kind}
            className="rounded-full border border-separator bg-surface px-3 py-1 text-[12.5px] font-medium text-secondary"
          >
            {fileKinds[kind].label}
          </li>
        ))}
      </ul>
      {acceptsLocal && <p className="max-w-md text-[13px] text-secondary">{dropzoneCopy.onDevice}</p>}
      {accepts.includes("image") && <SampleChips onSelect={onSample} />}
    </div>
  );
}
