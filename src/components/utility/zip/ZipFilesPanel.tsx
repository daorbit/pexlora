"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { ZIP_LIST_PAGE } from "@/config/limits";
import { zipCopy, zipExtractCopy } from "@/content/utility-tools";
import type { FolderProgress } from "@/hooks/useSaveToFolder";
import type { Archive } from "@/hooks/useUnzip";
import type { ZipEntry } from "@/lib/files/zip/read-zip";
import { entryFileName, entryFolder, searchEntries } from "@/lib/files/zip/zip-entries";
import { formatBytes } from "@/lib/utils/format-bytes";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { ANIMATED_ROWS } from "@/components/utility/zip/row-delays";
import { ZipSaveBar } from "@/components/utility/zip/ZipSaveBar";
import { ZipFileRow } from "@/components/utility/zip/ZipFileRow";

type ZipFilesPanelProps = {
  archive: Archive;
  selected: string | null;
  saving: FolderProgress | null;
  onSelect: (entry: ZipEntry) => void;
  onSave: (entries: ZipEntry[]) => void;
};

export function ZipFilesPanel({ archive, selected, saving, onSelect, onSave }: ZipFilesPanelProps) {
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(ZIP_LIST_PAGE);
  const { entries } = archive;
  const matches = useMemo(() => searchEntries(entries, query), [entries, query]);
  const total = matches.reduce((sum, entry) => sum + entry.blob.size, 0);
  const searching = query.trim() !== "";
  const hidden = matches.length - limit;

  const search = (next: string) => {
    setQuery(next);
    setLimit(ZIP_LIST_PAGE);
  };

  return (
    <>
      <div className="flex flex-col gap-3 border-b border-separator p-3.5 sm:p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-[15px] font-semibold">{zipExtractCopy.listLabel}</h2>
          <span role="status" className="text-[13px] text-secondary tabular-nums">
            {searching ? zipExtractCopy.matches(matches.length, entries.length) : zipCopy.files(matches.length, formatBytes(total))}
          </span>
        </div>
        <SearchInput value={query} onChange={search} label={zipExtractCopy.search} />
      </div>

      <ul className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-x-clip overflow-y-auto overscroll-contain p-2 max-lg:max-h-104">
        {matches.slice(0, limit).map((entry, index) => (
          <ZipFileRow
            key={entry.name}
            name={entryFileName(entry.name)}
            folder={entryFolder(entry.name)}
            size={entry.blob.size}
            order={!searching && index < ANIMATED_ROWS ? index : undefined}
            active={entry.name === selected}
            selectLabel={zipExtractCopy.preview(entry.name)}
            onSelect={() => onSelect(entry)}
            action={
              <Button variant="icon" size="sm" aria-label={zipExtractCopy.save(entry.name)} onClick={() => onSave([entry])}>
                <Download className="size-4" aria-hidden />
              </Button>
            }
          />
        ))}
        {hidden > 0 && (
          <li className="p-2">
            <Button variant="secondary" className="w-full" onClick={() => setLimit((current) => current + ZIP_LIST_PAGE)}>
              {zipExtractCopy.more(Math.min(hidden, ZIP_LIST_PAGE))}
            </Button>
          </li>
        )}
        {!matches.length && <li className="m-auto py-10 text-sm text-tertiary">{zipExtractCopy.noMatches}</li>}
      </ul>

      {matches.length > 0 && <ZipSaveBar entries={matches} searching={searching} saving={saving} onSave={onSave} />}
    </>
  );
}
