"use client";

import { getWorkspaceTool } from "@/config/tools";
import { overviewCopy } from "@/content/dashboard";
import { summarizeHistory } from "@/lib/history/history-filter";
import type { RecentResult } from "@/lib/storage/workspace-sessions";
import { formatBytes } from "@/lib/utils/format-bytes";
import { Skeleton } from "@/components/ui/Skeleton";
import { StatTile } from "@/components/dashboard/overview/StatTile";

const copy = overviewCopy.activity;

export function ActivityStats({ results }: { results: RecentResult[] | null }) {
  if (!results) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((key) => (
          <Skeleton key={key} className="h-22 rounded-2xl" />
        ))}
      </div>
    );
  }

  const summary = summarizeHistory(results);
  const top = summary.tools[0];

  return (
    <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <StatTile label={copy.files} value={String(summary.count)} />
      <StatTile label={copy.size} value={summary.count ? formatBytes(summary.bytes) : "0"} />
      <StatTile label={copy.tools} value={String(summary.tools.length)} />
      <StatTile label={copy.top} value={top ? getWorkspaceTool(top.tool).shortName : copy.none} />
    </dl>
  );
}
