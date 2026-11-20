import { CornerDownLeft } from "lucide-react";
import type { DashboardNavItem } from "@/config/dashboard";
import { cn } from "@/lib/utils/cn";
import { NavIcon } from "@/components/dashboard/NavIcon";

type SearchResultRowProps = {
  item: DashboardNavItem;
  id: string;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
};

export function SearchResultRow({ item, id, active, onHover, onSelect }: SearchResultRowProps) {
  return (
    <li role="presentation">
      <button
        id={id}
        type="button"
        role="option"
        tabIndex={-1}
        aria-selected={active}
        onMouseMove={onHover}
        onClick={onSelect}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors",
          active ? "bg-fill" : "hover:bg-fill/60",
        )}
      >
        <NavIcon item={item} />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-[14px] leading-tight font-semibold">{item.label}</span>
          <span className="truncate text-[12.5px] leading-tight text-secondary">{item.subtitle}</span>
        </span>
        <CornerDownLeft
          className={cn("size-3.5 shrink-0 text-tertiary transition-opacity max-sm:hidden", active ? "opacity-100" : "opacity-0")}
          aria-hidden
        />
      </button>
    </li>
  );
}
