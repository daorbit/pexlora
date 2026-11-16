import { reportCopy } from "@/content/workspace";
import type { MetadataReport as Report } from "@/lib/metadata/types";
import { Badge } from "@/components/ui/Badge";

export function MetadataReport({ report }: { report: Report }) {
  if (!report.groups.length) {
    return (
      <p className="rounded-xl bg-background px-4 py-3 text-[13px] text-secondary">{reportCopy.empty}</p>
    );
  }

  return (
    <div className="flex max-h-[420px] flex-col gap-4 overflow-y-auto rounded-2xl bg-background p-3">
      {report.groups.map((group) => (
        <section key={group.id} className="flex flex-col gap-1.5">
          <h4 className="px-3 text-[11px] font-medium uppercase tracking-wide text-secondary">
            {group.label} · {group.entries.length}
          </h4>
          <dl className="divide-y divide-separator overflow-hidden rounded-xl bg-surface">
            {group.entries.map((entry, index) => (
              <div
                key={`${entry.key}-${index}`}
                className="grid grid-cols-1 gap-1 px-3.5 py-2.5 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-4"
              >
                <dt className="flex min-w-0 items-center gap-2 text-[13px] text-secondary">
                  <span className="truncate">{entry.key}</span>
                  {entry.ai && <Badge tone="warning">AI</Badge>}
                </dt>
                <dd className="break-all font-mono text-xs leading-5">{entry.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
