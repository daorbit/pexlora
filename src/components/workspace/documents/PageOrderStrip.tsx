import { documentsCopy } from "@/content/workspace";
import { cn } from "@/lib/utils/cn";
import { docColor } from "@/components/workspace/documents/doc-colors";

export type DocumentPages = { id: string; name: string; pages: number };

const CHIP_LIMIT = 40;

export function PageOrderStrip({ documents }: { documents: DocumentPages[] }) {
  const total = documents.reduce((sum, doc) => sum + doc.pages, 0);
  if (!total) return null;
  const chips = documents.flatMap((doc, index) => Array.from({ length: doc.pages }, () => index));
  const starts = documents.map((_, index) => documents.slice(0, index).reduce((sum, doc) => sum + doc.pages, 0));

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-[13px] font-semibold text-secondary">{documentsCopy.order}</span>
      {total <= CHIP_LIMIT ? (
        <ol className="grid grid-cols-8 gap-1.5">
          {chips.map((docIndex, page) => (
            <li
              key={page}
              className={cn(
                "flex h-8 items-center justify-center rounded-md font-mono text-[11px] font-medium tabular-nums motion-safe:animate-pop",
                docColor(docIndex).chip,
              )}
            >
              {page + 1}
            </li>
          ))}
        </ol>
      ) : (
        <svg className="h-3 w-full overflow-hidden rounded-full" aria-hidden>
          {documents.map((doc, index) => {
            return <rect key={doc.id} x={`${(starts[index] / total) * 100}%`} y="0" width={`${(doc.pages / total) * 100}%`} height="12" className={docColor(index).fill} />;
          })}
        </svg>
      )}
      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-secondary">
        {documents.map((doc, index) => (
          <li key={doc.id} className="inline-flex min-w-0 items-center gap-1.5">
            <span className={cn("size-2.5 shrink-0 rounded-[3px]", docColor(index).chip)} aria-hidden />
            <span translate="no" className="notranslate max-w-40 truncate">{doc.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
