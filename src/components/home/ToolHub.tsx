"use client";

import { hubCategories, hubItems, type HubCategory } from "@/config/tool-hub";
import { hubCopy } from "@/content/landing";
import { useSearchParamState } from "@/hooks/useSearchParamState";
import { cn } from "@/lib/utils/cn";
import { staggerDelay } from "@/lib/utils/stagger";
import { Segmented } from "@/components/ui/Segmented";
import { HubCard, hubGridClass } from "@/components/home/HubCard";

type Filter = HubCategory | "all";

const filterOptions = hubCategories.map((category) => ({ value: category.id, label: category.label }));
const filterIds = hubCategories.map((category) => category.id);

export function ToolHub() {
  const [filter, setFilter] = useSearchParamState<Filter>("tools", filterIds, "all");
  const items = filter === "all" ? hubItems : hubItems.filter((item) => item.category === filter);

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-8">
      <Segmented<Filter>
        label={hubCopy.filterLabel}
        value={filter}
        options={filterOptions}
        onChange={setFilter}
        layout="chips"
      />
      <ul key={filter} className={hubGridClass}>
        {items.map((item, index) => (
          <li key={item.key} className={cn("motion-safe:animate-fade-up", staggerDelay(index))}>
            <HubCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
