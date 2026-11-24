"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/config/site";
import { getUtilityTool } from "@/config/utility-tools";
import { zipCopy } from "@/content/utility-tools";
import { cn } from "@/lib/utils/cn";
import { segmentedItem, segmentedTrack } from "@/components/ui/segmented-styles";

export type ZipMode = keyof typeof zipCopy.modes;

const tabs: { mode: ZipMode; tool: ReturnType<typeof getUtilityTool> }[] = [
  { mode: "create", tool: getUtilityTool("zip-files") },
  { mode: "extract", tool: getUtilityTool("unzip-files") },
];

export function ZipModeTabs({ active }: { active: ZipMode }) {
  const inDashboard = usePathname().startsWith(routes.dashboard);

  return (
    <nav aria-label={zipCopy.modeLabel} className={cn(segmentedTrack, "max-sm:w-full")}>
      {tabs.map(({ mode, tool }) => (
        <Link
          key={mode}
          href={inDashboard ? tool.dashboardHref : tool.href}
          scroll={false}
          aria-current={mode === active ? "page" : undefined}
          className={cn(segmentedItem(mode === active, "sm"), "text-[13px] max-sm:flex-1")}
        >
          {zipCopy.modes[mode]}
        </Link>
      ))}
    </nav>
  );
}
