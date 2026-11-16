"use client";

import { workspaceTools, type WorkspaceToolSlug } from "@/config/tools";
import { cn } from "@/lib/utils/cn";
import { segmentedItem, segmentedTrack } from "@/components/ui/segmented-styles";

type ToolTabsProps = {
  value: WorkspaceToolSlug;
  onChange: (slug: WorkspaceToolSlug) => void;
};

export function ToolTabs({ value, onChange }: ToolTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Choose a tool"
      className={cn(segmentedTrack, "scrollbar-none w-full max-w-full overflow-x-auto sm:w-auto")}
    >
      {workspaceTools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.slug}
            type="button"
            role="tab"
            aria-selected={tool.slug === value}
            onClick={() => onChange(tool.slug)}
            className={cn(segmentedItem(tool.slug === value), "shrink-0 grow sm:grow-0")}
          >
            <Icon className="hidden size-4 sm:block" aria-hidden />
            {tool.shortName}
          </button>
        );
      })}
    </div>
  );
}
