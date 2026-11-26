"use client";

import { OVERVIEW_RECENT_FILES } from "@/config/dashboard";
import { routes } from "@/config/site";
import { getWorkspaceTool } from "@/config/tools";
import { historyCopy, overviewCopy } from "@/content/dashboard";
import type { RecentResult } from "@/lib/storage/workspace-sessions";
import { formatTimeAgo } from "@/lib/utils/format-date";
import { ButtonLink } from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/Skeleton";
import { SaveFileButton } from "@/components/workspace/SaveFileButton";
import { GroupCard } from "@/components/dashboard/overview/GroupCard";
import { HistoryThumb } from "@/components/dashboard/history/HistoryThumb";

const copy = overviewCopy.recentFiles;

export function RecentFilesCard({ results }: { results: RecentResult[] | null }) {
  if (!results) return <SkeletonCard lines={4} className="min-h-64" />;
  const shown = results.slice(0, OVERVIEW_RECENT_FILES);

  return (
    <GroupCard title={copy.title} className="h-full">
      {shown.length ? (
        <ul className="divide-y divide-separator">
          {shown.map((result) => (
            <li key={result.id} className="flex items-center gap-3 px-4 py-2.5">
              <HistoryThumb result={result} />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <p translate="no" className="notranslate truncate text-sm font-medium">
                  {result.name}
                </p>
                <p className="truncate text-[12.5px] text-secondary">
                  {getWorkspaceTool(result.tool).shortName} · {historyCopy.savedAt(formatTimeAgo(result.savedAt))}
                </p>
              </div>
              <SaveFileButton file={result} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 pb-2 text-sm text-secondary">{copy.empty}</p>
      )}
      <div className="mt-auto px-4 pt-2 pb-4">
        <ButtonLink href={routes.dashboardHistory} variant="plain" arrow>
          {copy.viewAll}
        </ButtonLink>
      </div>
    </GroupCard>
  );
}
