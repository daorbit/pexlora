import type { HubItem } from "@/config/tool-hub";
import { cn } from "@/lib/utils/cn";
import { HubCard, hubTileGridClass } from "@/components/home/HubCard";

const PHONE_TILE_LIMIT = 9;

type HubCardGridProps = { label: string; items: HubItem[]; phoneLimit?: number };

export function HubCardGrid({ label, items, phoneLimit = PHONE_TILE_LIMIT }: HubCardGridProps) {
  return (
    <ul aria-label={label} className={cn(hubTileGridClass, "lg:grid-cols-4")}>
      {items.map((item, index) => (
        <li key={item.key} className={cn("min-w-0", index >= phoneLimit && "max-sm:hidden")}>
          <HubCard item={item} />
        </li>
      ))}
    </ul>
  );
}
