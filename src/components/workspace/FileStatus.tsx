import { ArrowRight, LoaderCircle, ShieldCheck, X } from "lucide-react";
import { AiTagIcon } from "@/components/icons/AiTagIcon";
import { resultCopy, revealCopy } from "@/content/workspace";
import type { QueueItem } from "@/hooks/useFileQueue";
import { formatBytes, formatKilobytes, sizeChangePercent } from "@/lib/utils/format-bytes";
import { Badge } from "@/components/ui/Badge";
import { TargetMissedNote } from "@/components/workspace/TargetMissedNote";

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

type QueueResult = NonNullable<QueueItem["result"]>;

function problemLabel(result: QueueResult) {
  if (result.target && !result.target.met) return resultCopy.targetMissed(formatKilobytes(result.target.bytes / 1024));
  if (result.leftoverTags) return resultCopy.tagsLeft(result.leftoverTags);
  return null;
}

function TagCount({ before, after }: { before: number; after: number }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap tabular-nums text-secondary">
      <span className="line-through decoration-primary decoration-2">{revealCopy.tagsBefore(before)}</span>
      <ArrowRight className="size-3 shrink-0" aria-label="to" />
      <span className={after ? "text-warning" : "font-medium text-success"}>{revealCopy.tagsAfter(after)}</span>
    </span>
  );
}

function DoneSummary({ item, onDevice }: { item: QueueItem; onDevice: boolean }) {
  const result = item.result!;
  const tagsBefore = item.report?.totalTags ?? 0;
  const showTagCount = tagsBefore > 0 && result.leftoverTags !== null;
  const change = sizeChangePercent(item.file.size, result.blob.size);
  const problem = showTagCount && result.leftoverTags ? null : problemLabel(result);
  const missedTarget = result.target && !result.target.met ? result.target : null;

  return (
    <span className="inline-flex flex-wrap items-center gap-2 motion-safe:animate-fade-up motion-safe:[animation-duration:0.4s]">
      {problem && (
        <Badge tone={missedTarget ? "danger" : "warning"} className="motion-safe:animate-pop">
          <X className="size-3" strokeWidth={3} aria-hidden />
          {problem}
        </Badge>
      )}
      {showTagCount && <TagCount before={tagsBefore} after={result.leftoverTags ?? 0} />}
      {onDevice && (
        <Badge tone="accent">
          <ShieldCheck className="size-3" strokeWidth={2.6} aria-hidden />
          {revealCopy.onDevice}
        </Badge>
      )}
      {result.dimensions && (
        <span className="tabular-nums text-secondary">
          {result.dimensions.width} × {result.dimensions.height}
        </span>
      )}
      {result.blob.size !== item.file.size && (
        <span className="inline-flex items-center gap-1 whitespace-nowrap tabular-nums text-secondary">
          {formatBytes(item.file.size)}
          <ArrowRight className="size-3 shrink-0" aria-label="to" />
          {formatBytes(result.blob.size)}
          <span className={change < 0 ? "text-success" : undefined}>
            {" "}
            ({change > 0 ? "+" : ""}
            {change}%)
          </span>
        </span>
      )}
      {missedTarget && <TargetMissedNote targetBytes={missedTarget.bytes} smallestBytes={result.blob.size} />}
    </span>
  );
}

export function FileStatus({ item, onDevice = false }: { item: QueueItem; onDevice?: boolean }) {
  switch (item.status) {
    case "inspecting":
      return <Pending label="Reading metadata…" />;
    case "processing":
      return <Pending label="Processing…" />;
    case "error":
      return <span className="text-danger">{item.error}</span>;
    case "done":
      return <DoneSummary item={item} onDevice={onDevice} />;
    default:
      return <ReportSummary item={item} />;
  }
}
