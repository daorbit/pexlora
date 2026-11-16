import { metadataFeed, type FeedTone } from "@/content/landing";
import { cn } from "@/lib/utils/cn";

const keyTones: Record<FeedTone, string> = {
  location: "text-danger",
  ai: "text-warning",
  plain: "text-secondary",
};

type MetadataFeedRowsProps = {
  hidden?: boolean;
  offset?: number;
  rowClassName?: string;
  valueClassName?: string;
};

export function MetadataFeedRows({ hidden, offset = 0, rowClassName, valueClassName }: MetadataFeedRowsProps) {
  const rows = [...metadataFeed.slice(offset), ...metadataFeed.slice(0, offset)];

  return (
    <dl className="flex flex-col" aria-hidden={hidden || undefined}>
      {rows.map((row) => (
        <div key={row.key} className={cn("flex justify-between gap-4 border-b border-fill", rowClassName)}>
          <dt className={keyTones[row.tone]}>{row.key}</dt>
          <dd className={cn("truncate text-right", valueClassName)}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function MetadataTicker() {
  const rowClassName = "py-2.5 text-[12.5px] sm:gap-6 sm:py-3.5 sm:text-base";

  return (
    <div className="fade-y relative h-64 overflow-hidden font-mono sm:h-100 lg:h-130">
      <div className="motion-safe:animate-ticker-y">
        <MetadataFeedRows rowClassName={rowClassName} valueClassName="text-foreground/80" />
        <MetadataFeedRows rowClassName={rowClassName} valueClassName="text-foreground/80" hidden />
      </div>
    </div>
  );
}
