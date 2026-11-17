"use client";

import { useState } from "react";
import { Columns2, X } from "lucide-react";
import { compareCopy } from "@/content/workspace";
import type { QueueItem } from "@/hooks/useFileQueue";
import { formatBytes } from "@/lib/utils/format-bytes";
import { formatDuration } from "@/lib/utils/format-duration";
import { Button } from "@/components/ui/Button";
import { AiExplainPanel } from "@/components/ai/AiExplainPanel";
import { InsightsPanel } from "@/components/ai/InsightsPanel";
import { CompareSlider } from "@/components/workspace/CompareSlider";
import { FileStatus } from "@/components/workspace/FileStatus";
import { LocationCard } from "@/components/workspace/LocationCard";
import { FileThumb } from "@/components/workspace/FileThumb";
import { ProgressBar } from "@/components/workspace/ProgressBar";
import { SaveFileButton } from "@/components/workspace/SaveFileButton";
import { MetadataReport } from "@/components/workspace/MetadataReport";
import { ReorderButtons } from "@/components/workspace/ReorderButtons";
import { RevealSummary } from "@/components/workspace/RevealSummary";
import { RowToggle } from "@/components/workspace/RowToggle";
import { useSwipeToDismiss } from "@/hooks/useSwipeToDismiss";

type FileRowProps = {
  item: QueueItem;
  comparable?: boolean;
  compareOpen?: boolean;
  onRemove: (id: string) => void;
  disabled: boolean;
  onDevice?: boolean;
  onMove?: (id: string, offset: number) => void;
  position?: { first: boolean; last: boolean };
};

function fileDetails({ file, format, report }: QueueItem) {
  return [
    formatBytes(file.size),
    format.label,
    report?.width && report.height ? `${report.width} × ${report.height}` : null,
    report?.duration ? formatDuration(report.duration) : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export function FileRow({
  item,
  comparable = false,
  compareOpen = false,
  onRemove,
  disabled,
  onDevice = false,
  onMove,
  position = { first: true, last: true },
}: FileRowProps) {
  const [expanded, setExpanded] = useState(true);
  const { ref: swipeRef, swipeProps } = useSwipeToDismiss<HTMLDivElement>(() => onRemove(item.id), !disabled);
  const [comparing, setComparing] = useState(compareOpen);
  const { file, report, result } = item;
  const canCompare = comparable && Boolean(result && item.previewUrl && result.blob.type.startsWith("image/"));

  return (
    <li className="relative flex flex-col overflow-clip rounded-2xl bg-subtle motion-safe:animate-fade-up motion-safe:[animation-duration:0.35s]">
      {(item.status === "processing" || item.status === "inspecting") && <ProgressBar />}
      <div
        ref={swipeRef}
        {...swipeProps}
        className="flex touch-pan-y flex-wrap items-center gap-x-3 gap-y-2.5 p-2.5 sm:flex-nowrap sm:gap-x-4 sm:pr-3"
      >
        <FileThumb item={item} />
        <div className="flex min-w-0 flex-1 basis-40 flex-col gap-1">
          <p translate="no" className="notranslate truncate text-[15px] font-medium">{file.name}</p>
          <p className="text-[13px] tabular-nums text-secondary">{fileDetails(item)}</p>
          <div className="text-[13px]">
            <FileStatus item={item} onDevice={onDevice && item.status === "done"} />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {onMove && item.status === "ready" && (
            <ReorderButtons
              id={item.id}
              name={file.name}
              first={position.first}
              last={position.last}
              disabled={disabled}
              onMove={onMove}
            />
          )}
          {canCompare && (
            <RowToggle
              label={compareCopy.toggle}
              icon={Columns2}
              open={comparing}
              onToggle={() => setComparing((value) => !value)}
            />
          )}
          {report && (
            <RowToggle label={compareCopy.details} open={expanded} onToggle={() => setExpanded((value) => !value)} />
          )}
          {result && <SaveFileButton file={result} />}
          <Button
            variant="icon"
            size="sm"
            aria-label={`Remove ${file.name}`}
            onClick={() => onRemove(item.id)}
            disabled={disabled}
          >
            <X className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
      {report?.location && (
        <div className="px-2.5 pb-2.5">
          <LocationCard location={report.location} removed={Boolean(result)} />
        </div>
      )}
      {canCompare && comparing && result && item.previewUrl && (
        <div className="px-2.5 pb-2.5">
          <CompareSlider
            beforeSrc={item.previewUrl}
            afterSrc={result.url}
            beforeBytes={file.size}
            afterBytes={result.blob.size}
          />
        </div>
      )}
      {result?.insights && (
        <div className="px-3 pb-4 sm:px-5 sm:pb-5">
          <InsightsPanel insights={result.insights} fileName={result.name} />
        </div>
      )}
      {expanded && report && (
        <div className="flex flex-col gap-3 px-3 pb-4 sm:px-5 sm:pb-5">
          <RevealSummary report={report} removed={item.status === "done"} />
          {report.totalTags > 0 && <AiExplainPanel report={report} />}
          <MetadataReport report={report} />
        </div>
      )}
    </li>
  );
}
