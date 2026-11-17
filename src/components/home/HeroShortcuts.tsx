"use client";

import Link from "next/link";
import { useMemo } from "react";
import { heroShortcuts, hubItems, type HubItem } from "@/config/tool-hub";
import { heroCopy } from "@/content/landing";
import { useRecentTools } from "@/hooks/useRecentTools";
import { HubItemIcon } from "@/components/tools/HubItemIcon";
import { ResponsiveLabel } from "@/components/ui/ResponsiveLabel";

const SHORTCUT_COUNT = heroShortcuts.length;

function useShortcuts() {
  const recent = useRecentTools();
  return useMemo(() => {
    const recentItems = recent.flatMap((key) => hubItems.filter((item) => item.key === key));
    const recentKeys = new Set(recentItems.map((item) => item.key));
    const rest = heroShortcuts.filter((item) => !recentKeys.has(item.key));
    return { items: [...recentItems, ...rest].slice(0, SHORTCUT_COUNT), recentKeys };
  }, [recent]);
}

function ShortcutLink({ item, recent }: { item: HubItem; recent: boolean }) {
  const full = item.shortName ?? item.name;

  return (
    <Link
      href={item.href}
      className="group flex flex-col items-center gap-2 rounded-xl py-1 text-center text-[11.5px] font-medium text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring active:text-foreground sm:gap-2.5 sm:rounded-2xl sm:py-3 sm:text-[13px] sm:hover:bg-surface sm:hover:text-foreground"
    >
      <span className="relative">
        <HubItemIcon src={item.iconSrc} size="md" className="size-12 sm:size-13" />
        {recent && (
          <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary ring-2 ring-background" aria-hidden />
        )}
      </span>
      <span className="w-full truncate px-1">
        <ResponsiveLabel short={heroCopy.shortcutShortLabels[item.key] ?? full} full={full} />
        {recent && <span className="sr-only"> {heroCopy.recentLabel}</span>}
      </span>
    </Link>
  );
}

export function HeroShortcuts() {
  const { items, recentKeys } = useShortcuts();

  return (
    <nav aria-label={heroCopy.shortcutsLabel}>
      <ul className="grid grid-cols-5 gap-1 sm:gap-3">
        {items.map((item) => (
          <li key={item.key} className="min-w-0">
            <ShortcutLink item={item} recent={recentKeys.has(item.key)} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
