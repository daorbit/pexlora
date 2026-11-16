import { Check, LoaderCircle } from "lucide-react";
import { AiTagIcon } from "@/components/icons/AiTagIcon";
import type { QueueItem } from "@/hooks/useFileQueue";
import { formatBytes, sizeChangePercent } from "@/lib/utils/format-bytes";
import { Badge } from "@/components/ui/Badge";

function Pending({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-secondary">
      <LoaderCircle className="size-3.5 animate-spin" aria-hidden />
      {label}
    </span>
  );
}

function ReportSummary({ item }: { item: QueueItem }) {
  if (!item.report) return <span className="text-secondary">Ready</span>;
  const { aiTags, totalTags } = item.report;
  if (!totalTags) return <Badge tone="success">No metadata</Badge>;

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      {aiTags > 0 && (
        <Badge tone="warning">
          <AiTagIcon className="size-3.5" />
          {aiTags} AI {aiTags === 1 ? "tag" : "tags"}
        </Badge>
      )}
      <span className="text-secondary">{totalTags} fields</span>
    </span>
  );
}

function doneBadgeLabel(result: NonNullable<QueueItem["result"]>, doneLabel: string) {
  if (result.leftoverTags === null) return doneLabel;
  return result.leftoverTags === 0 ? "Clean" : `${result.leftoverTags} left`;
}

function DoneSummary({ item, doneLabel }: { item: QueueItem; doneLabel: string }) {
  const result = item.result!;
  const change = sizeChangePercent(item.file.size, result.blob.size);
  const label = doneBadgeLabel(result, doneLabel);

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <Badge tone="success">
        <Check className="size-3" strokeWidth={3} aria-hidden />
        {label}
      </Badge>
      {result.dimensions && (
        <span className="tabular-nums text-secondary">
          {result.dimensions.width} × {result.dimensions.height}
        </span>
      )}
      <span className="tabular-nums text-secondary">
        {formatBytes(item.file.size)} → {formatBytes(result.blob.size)}
        <span className={change < 0 ? "text-success" : undefined}>
          {" "}
          ({change > 0 ? "+" : ""}
          {change}%)
        </span>
      </span>
    </span>
  );
}

export function FileStatus({ item, doneLabel = "Done" }: { item: QueueItem; doneLabel?: string }) {
  switch (item.status) {
    case "inspecting":
      return <Pending label="Reading metadata…" />;
    case "processing":
      return <Pending label="Processing…" />;
    case "error":
      return <span className="text-danger">{item.error}</span>;
    case "done":
      return <DoneSummary item={item} doneLabel={doneLabel} />;
    default:
      return <ReportSummary item={item} />;
  }
}
