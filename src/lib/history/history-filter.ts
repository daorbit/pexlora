import { getWorkspaceTool, type ToolCategory, type WorkspaceToolSlug } from "@/config/tools";
import type { RecentResult } from "@/lib/storage/workspace-sessions";

export const HISTORY_SORTS = ["newest", "oldest", "largest"] as const;
export type HistorySort = (typeof HISTORY_SORTS)[number];
export type HistoryCategory = ToolCategory | "all";

export type HistoryFilter = {
  query: string;
  category: HistoryCategory;
  tool: WorkspaceToolSlug | null;
  sort: HistorySort;
};

export type HistorySummary = {
  count: number;
  bytes: number;
  tools: { tool: WorkspaceToolSlug; count: number }[];
  categories: Partial<Record<ToolCategory, number>>;
};

export const defaultHistoryFilter: HistoryFilter = { query: "", category: "all", tool: null, sort: "newest" };

const sorters: Record<HistorySort, (a: RecentResult, b: RecentResult) => number> = {
  newest: (a, b) => b.savedAt - a.savedAt,
  oldest: (a, b) => a.savedAt - b.savedAt,
  largest: (a, b) => b.blob.size - a.blob.size,
};

export function filterHistory(results: RecentResult[], { query, category, tool, sort }: HistoryFilter) {
  const needle = query.trim().toLowerCase();
  return results
    .filter(
      (result) =>
        (!needle || result.name.toLowerCase().includes(needle)) &&
        (category === "all" || getWorkspaceTool(result.tool).category === category) &&
        (!tool || result.tool === tool),
    )
    .sort(sorters[sort]);
}

export function summarizeHistory(results: RecentResult[]): HistorySummary {
  const tools = new Map<WorkspaceToolSlug, number>();
  const categories: Partial<Record<ToolCategory, number>> = {};
  let bytes = 0;

  for (const result of results) {
    const category = getWorkspaceTool(result.tool).category;
    bytes += result.blob.size;
    tools.set(result.tool, (tools.get(result.tool) ?? 0) + 1);
    categories[category] = (categories[category] ?? 0) + 1;
  }

  return {
    count: results.length,
    bytes,
    tools: [...tools].map(([tool, count]) => ({ tool, count })).sort((a, b) => b.count - a.count),
    categories,
  };
}
