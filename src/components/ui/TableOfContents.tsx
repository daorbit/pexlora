import { cn } from "@/lib/utils/cn";

export type TocItem = { id: string; label: string; nested?: boolean };

type TableOfContentsProps = {
  label: string;
  items: TocItem[];
  numbered?: boolean;
  className?: string;
};

export function TableOfContents({ label, items, numbered, className }: TableOfContentsProps) {
  return (
    <nav aria-label={label} className={cn("flex flex-col gap-3", className)}>
      <p className="text-xs font-semibold tracking-[0.12em] text-tertiary uppercase">{label}</p>
      <ol className="flex flex-col gap-0.5 border-l border-separator">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px flex gap-2 border-l border-transparent py-1.5 pl-4 text-[13.5px] leading-snug text-secondary transition-colors hover:border-foreground hover:text-foreground",
                item.nested && "pl-7 text-[13px]",
              )}
            >
              {numbered && <span className="w-5 shrink-0 tabular-nums text-tertiary">{index + 1}.</span>}
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
