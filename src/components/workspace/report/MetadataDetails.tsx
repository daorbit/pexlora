"use client";

import { useState } from "react";
import { reportCopy } from "@/content/workspace";
import type { QueueItem } from "@/hooks/useFileQueue";
import { useResultReport } from "@/hooks/useResultReport";
import { detectFormat, isLocalFormat } from "@/lib/files/detect";
import type { MetadataReport as Report } from "@/lib/metadata/types";
import { Segmented } from "@/components/ui/Segmented";
import { Skeleton } from "@/components/ui/Skeleton";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { MetadataReport } from "@/components/workspace/MetadataReport";

type Version = "original" | "result";

function canReadResult({ status, result }: QueueItem) {
  if (status !== "done" || !result) return false;
  const format = detectFormat({ name: result.name, type: result.blob.type });
  return Boolean(format && isLocalFormat(format));
}

export function MetadataDetails({ item, report }: { item: QueueItem; report: Report }) {
  const [version, setVersion] = useState<Version>("original");
  const comparable = canReadResult(item);
  const showResult = comparable && version === "result";
  const cleaned = useResultReport(item.result, showResult);
  const aiNote = item.format.kind === "image";

  const options = [
    { value: "original" as const, label: reportCopy.original(report.totalTags) },
    { value: "result" as const, label: reportCopy.cleaned(cleaned.report?.totalTags ?? null) },
  ];

  return (
    <div className="flex flex-col gap-3">
      {comparable && (
        <Segmented label={reportCopy.versionsLabel} value={version} options={options} onChange={setVersion} size="sm" />
      )}
      {!showResult && <MetadataReport report={report} fileName={item.file.name} aiNote={aiNote} />}
      {showResult && cleaned.loading && (
        <div role="status" className="flex flex-col gap-2">
          <span className="sr-only">{reportCopy.cleanedLoading}</span>
          <Skeleton className="h-32 w-full rounded-2xl" />
        </div>
      )}
      {showResult && cleaned.error && <OptionHint tone="danger">{reportCopy.cleanedError}</OptionHint>}
      {showResult && cleaned.report && item.result && (
        <MetadataReport key="result" report={cleaned.report} fileName={item.result.name} />
      )}
    </div>
  );
}
