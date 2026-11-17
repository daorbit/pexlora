import type { HubItem } from "@/config/tool-hub";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { HubCard } from "@/components/home/HubCard";

export function HubCardCarousel({ label, items }: { label: string; items: HubItem[] }) {
  return (
    <MobileCarousel label={label} trackClassName="gap-2 p-px sm:grid sm:grid-cols-2 sm:gap-4 sm:p-0 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.key} className="min-w-0 shrink-0 grow-0 basis-[84%] sm:basis-auto">
          <HubCard item={item} />
        </li>
      ))}
    </MobileCarousel>
  );
}
