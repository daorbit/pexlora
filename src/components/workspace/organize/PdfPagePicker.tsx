"use client";

import { organizeCopy } from "@/content/workspace";
import { usePdfThumbnails } from "@/hooks/usePdfThumbnails";
import { formatPageSpec, resolvePages } from "@/lib/files/pdf/page-spec";
import { missingPages, movePage, removePageAt, restorePage } from "@/lib/files/pdf/page-order";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { OptionHint } from "@/components/workspace/options/OptionsBar";
import { PdfPageTile } from "@/components/workspace/organize/PdfPageTile";

type PdfPagePickerProps = {
  file: File;
  spec: string;
  disabled: boolean;
  onChange: (spec: string) => void;
};

const gridClass = "grid grid-cols-3 gap-x-2 gap-y-1 sm:grid-cols-4 xl:grid-cols-5";

export function PdfPagePicker({ file, spec, disabled, onChange }: PdfPagePickerProps) {
  const { count, urls, error } = usePdfThumbnails(file);

  if (error) return <OptionHint tone="danger">{error}</OptionHint>;
  if (!count) return <Skeleton className="h-40 w-full rounded-2xl" />;

  const kept = resolvePages(spec, count);
  const removed = missingPages(kept, count);
  const commit = (pages: number[]) => onChange(formatPageSpec(pages, count));

  return (
    <section className="flex flex-col gap-2.5" aria-label={organizeCopy.title}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-col">
          <span className="text-[13px] font-semibold text-secondary">{organizeCopy.title}</span>
          <span className="text-xs text-tertiary">{organizeCopy.kept(kept.length, count)}</span>
        </div>
        <div className="flex gap-1.5">
          <Button variant="secondary" size="sm" disabled={disabled || kept.length < 2} onClick={() => commit([...kept].reverse())}>
            {organizeCopy.reverse}
          </Button>
          <Button variant="secondary" size="sm" disabled={disabled || !spec} onClick={() => onChange("")}>
            {organizeCopy.reset}
          </Button>
        </div>
      </div>

      <div className="flex max-h-[34rem] flex-col gap-3 overflow-y-auto rounded-2xl bg-fill p-2">
        <ol className={gridClass}>
          {kept.map((page, index) => (
            <PdfPageTile
              key={`${page}-${index}`}
              page={page}
              src={urls[page - 1]}
              disabled={disabled || kept.length === 1}
              onToggle={() => commit(removePageAt(kept, index))}
              onEarlier={index > 0 && !disabled ? () => commit(movePage(kept, index, -1)) : undefined}
              onLater={index < kept.length - 1 && !disabled ? () => commit(movePage(kept, index, 1)) : undefined}
            />
          ))}
        </ol>
        {removed.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="px-1 text-xs font-semibold text-tertiary">{organizeCopy.removed}</span>
            <ul className={gridClass}>
              {removed.map((page) => (
                <PdfPageTile
                  key={page}
                  page={page}
                  src={urls[page - 1]}
                  removed
                  disabled={disabled}
                  onToggle={() => commit(restorePage(kept, page))}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
