import { resultPreviewCopy } from "@/content/workspace";
import type { ZipPreviewEntry } from "@/hooks/useZipEntries";
import { cn } from "@/lib/utils/cn";
import { formatBytes } from "@/lib/utils/format-bytes";

type ZipEntryListProps = {
  entries: ZipPreviewEntry[];
  selected: string;
  onSelect: (index: number) => void;
};

export function ZipEntryList({ entries, selected, onSelect }: ZipEntryListProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="px-1 text-[13px] font-semibold text-secondary">{resultPreviewCopy.zipFiles(entries.length)}</span>
      <ul className="flex max-h-48 flex-col gap-1 overflow-y-auto rounded-2xl bg-fill p-1.5">
        {entries.map((entry, index) => {
          const active = entry.url === selected;
          return (
            <li key={entry.url}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(index)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-ring",
                  active ? "bg-primary font-semibold text-primary-foreground" : "hover:bg-surface",
                )}
              >
                <span translate="no" className="notranslate min-w-0 truncate">{entry.name}</span>
                <span className="shrink-0 tabular-nums opacity-70">{formatBytes(entry.blob.size)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
