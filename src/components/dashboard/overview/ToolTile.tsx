import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

export type ToolTileItem = { key: string; href: string; iconSrc: string; name: string; description?: string };

export function ToolTile({ item, compact = false }: { item: ToolTileItem; compact?: boolean }) {
  return (
    <Link
      href={item.href}
      prefetch={compact ? false : undefined}
      className={cn(
        "group flex h-full items-center gap-3 rounded-2xl border border-separator bg-surface px-3.5 transition-colors hover:border-border-strong hover:bg-subtle focus-visible:outline-2 focus-visible:outline-ring",
        compact ? "py-2.5" : "py-3",
      )}
    >
      <HubItemIcon src={item.iconSrc} size={compact ? "xs" : "sm"} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold">{item.name}</span>
        {item.description && <span className="truncate text-[12.5px] text-secondary">{item.description}</span>}
      </span>
    </Link>
  );
}
