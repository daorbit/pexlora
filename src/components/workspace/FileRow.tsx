"use client";

import { useState } from "react";
import { ChevronDown, ChevronsLeftRight, X } from "lucide-react";
import { compareCopy } from "@/content/workspace";
import type { QueueItem } from "@/hooks/useFileQueue";
import { cn } from "@/lib/utils/cn";
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

type FileRowProps = {
  item: QueueItem;
  defaultExpanded: boolean;
  doneLabel?: string;
  comparable?: boolean;
  onRemove: (id: string) => void;
  disabled: boolean;
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

export function FileRow({ item, defaultExpanded, doneLabel, comparable = false, onRemove, disabled }: FileRowProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [comparing, setComparing] = useState(false);
  const { file, report, result } = item;
  const canCompare = comparable && Boolean(result && item.previewUrl && result.blob.type.startsWith("image/"));

  return (
    <li className="relative flex flex-col overflow-clip rounded-2xl bg-subtle motion-safe:animate-fade-up motion-safe:[animation-duration:0.35s]">
      {(item.status === "processing" || item.status === "inspecting") && <ProgressBar />}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 p-2.5 sm:flex-nowrap sm:gap-x-4 sm:pr-3">
        <FileThumb item={item} />
        <div className="min-w-0 flex-1 basis-40">
          <p className="truncate text-[15px] font-medium">{file.name}</p>
          <p className="text-[13px] tabular-nums text-secondary">{fileDetails(item)}</p>
        </div>
        <div className="order-last w-full text-[13px] sm:order-none sm:w-auto sm:flex-1">
          <FileStatus item={item} doneLabel={doneLabel} />
        </div>
        <div className="ml-auto flex items-center gap-1">
          {canCompare && (
            <Button
              variant="plain"
              className="mr-2 text-[13px]"
              onClick={() => setComparing((value) => !value)}
              aria-expanded={comparing}
            >
              <ChevronsLeftRight className="size-3.5" aria-hidden />
              {compareCopy.toggle}
            </Button>
          )}
          {report && (
            <Button
              variant="plain"
              className="mr-2 text-[13px]"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
            >
              Details
              <ChevronDown
                className={cn("size-3.5 transition-transform", expanded && "rotate-180")}
                aria-hidden
              />
            </Button>
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
          {report.totalTags > 0 && <AiExplainPanel report={report} />}
          <MetadataReport report={report} />
        </div>
      )}
    </li>
  );
}
