import { metadataFeed, type FeedTone } from "@/content/landing";

const keyTones: Record<FeedTone, string> = {
  location: "text-danger",
  ai: "text-warning",
  plain: "text-secondary",
};

function FeedRows({ hidden }: { hidden?: boolean }) {
  return (
    <dl className="flex flex-col" aria-hidden={hidden || undefined}>
      {metadataFeed.map((row) => (
        <div key={row.key} className="flex justify-between gap-6 border-b border-fill py-3.5 text-[14px] sm:text-base">
          <dt className={keyTones[row.tone]}>{row.key}</dt>
          <dd className="text-right text-foreground/80">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function MetadataTicker() {
  return (
    <div className="fade-y relative h-100 overflow-hidden font-mono lg:h-130">
      <div className="motion-safe:animate-ticker-y">
        <FeedRows />
        <FeedRows hidden />
      </div>
    </div>
  );
}
