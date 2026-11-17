import { getWorkspaceTool } from "@/config/tools";
import { historyCopy } from "@/content/dashboard";
import { SESSION_MAX_AGE_MS } from "@/lib/storage/session-store";
import type { RecentResult } from "@/lib/storage/workspace-sessions";
import { formatBytes } from "@/lib/utils/format-bytes";
import { formatTimeAgo } from "@/lib/utils/format-date";
import { SaveFileButton } from "@/components/workspace/SaveFileButton";
import { HistoryThumb } from "@/components/dashboard/history/HistoryThumb";

export function HistoryRow({ result }: { result: RecentResult }) {
  const tool = getWorkspaceTool(result.tool);

  return (
    <li className="flex items-center gap-3 p-3 sm:gap-4 sm:px-4">
      <HistoryThumb result={result} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p translate="no" className="notranslate truncate text-[14px] font-medium">
          {result.name}
        </p>
        <p className="truncate text-[12.5px] text-secondary">
          {tool.shortName} · {formatBytes(result.blob.size)} · {historyCopy.savedAt(formatTimeAgo(result.savedAt))}
        </p>
        <p className="hidden text-[12px] text-tertiary sm:block">
          {historyCopy.expires(formatTimeAgo(result.savedAt + SESSION_MAX_AGE_MS))}
        </p>
      </div>
      <SaveFileButton file={result} />
    </li>
  );
}
