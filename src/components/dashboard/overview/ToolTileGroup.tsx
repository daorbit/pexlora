import { cn } from "@/lib/utils/cn";
import { ToolTile, type ToolTileItem } from "@/components/dashboard/overview/ToolTile";

type ToolTileGroupProps = { title: string; items: ToolTileItem[]; compact?: boolean };

export function ToolTileGroup({ title, items, compact = false }: ToolTileGroupProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="text-[11px] font-semibold tracking-[0.06em] text-tertiary uppercase">{title}</h3>
      <ul
        className={cn(
          "grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3",
          compact ? "2xl:grid-cols-5 xl:grid-cols-4" : "2xl:grid-cols-4",
        )}
      >
        {items.map((item) => (
          <li key={item.key} className="min-w-0">
            <ToolTile item={item} compact={compact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
