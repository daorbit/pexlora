import { historyCopy } from "@/content/dashboard";
import type { RecentResult } from "@/lib/storage/workspace-sessions";
import { Button } from "@/components/ui/Button";
import { HistoryRow } from "@/components/dashboard/history/HistoryRow";

type HistoryListProps = {
  results: RecentResult[];
  total: number;
  onReset: () => void;
  onRemove: (result: RecentResult) => void;
};

export function HistoryList({ results, total, onReset, onRemove }: HistoryListProps) {
  return (
    <section aria-label={historyCopy.showing(results.length, total)} className="flex flex-col gap-2">
      <p className="px-1 text-[12.5px] font-medium text-secondary">{historyCopy.showing(results.length, total)}</p>
      {results.length ? (
        <ul className="divide-y divide-separator overflow-hidden rounded-[22px] bg-surface shadow-card">
          {results.map((result) => (
            <HistoryRow key={result.id} result={result} onRemove={onRemove} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-[22px] bg-surface px-6 py-12 text-center shadow-card">
          <p className="text-sm text-secondary">{historyCopy.noMatch}</p>
          <Button variant="secondary" size="sm" onClick={onReset}>
            {historyCopy.resetFilters}
          </Button>
        </div>
      )}
    </section>
  );
}
