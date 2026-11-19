import { allToolsHref, type HubItem } from "@/config/tool-hub";
import { navCopy } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { HubCard } from "@/components/home/HubCard";

const PHONE_TILE_LIMIT = 9;

export function HubCardGrid({ label, items }: { label: string; items: HubItem[] }) {
  const phoneItems = items.slice(0, PHONE_TILE_LIMIT);

  return (
    <>
      <div className="flex flex-col gap-3 sm:hidden">
        <ul aria-label={label} className="grid grid-cols-3 gap-2">
          {phoneItems.map((item) => (
            <li key={item.key} className="min-w-0">
              <HubCard item={item} tile className="h-full" />
            </li>
          ))}
        </ul>
        {items.length > PHONE_TILE_LIMIT && (
          <ButtonLink href={allToolsHref()} variant="secondary" size="md" arrow className="w-full">
            {navCopy.viewAll}
          </ButtonLink>
        )}
      </div>
      <ul aria-label={label} className="grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.key} className="min-w-0">
            <HubCard item={item} />
          </li>
        ))}
      </ul>
    </>
  );
}
