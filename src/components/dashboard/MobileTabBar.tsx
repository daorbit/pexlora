"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { History, LayoutGrid, Search, UserRound, type LucideIcon } from "lucide-react";
import { historyNavItem, isNavItemActive, overviewNavItem, settingsNavItem } from "@/config/dashboard";
import { tabBarCopy } from "@/content/dashboard";
import { cn } from "@/lib/utils/cn";
import { ToolSearchDialog } from "@/components/dashboard/ToolSearchDialog";

const tabClass =
  "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-ring";

function TabContent({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active: boolean }) {
  return (
    <>
      <span
        className={cn(
          "inline-flex h-7 w-12 items-center justify-center rounded-full transition-colors",
          active && "bg-primary text-primary-foreground",
        )}
      >
        <Icon className="size-4.5" aria-hidden />
      </span>
      {label}
    </>
  );
}

const links = [
  { item: overviewNavItem, icon: LayoutGrid, label: tabBarCopy.home },
  { item: historyNavItem, icon: History, label: tabBarCopy.history },
  { item: settingsNavItem, icon: UserRound, label: tabBarCopy.account },
];

function TabLink({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn(tabClass, active ? "text-foreground" : "text-secondary")}>
      {children}
    </Link>
  );
}

export function MobileTabBar() {
  const pathname = usePathname();
  const [searching, setSearching] = useState(false);
  const [home, history, account] = links;

  const renderLink = ({ item, icon, label }: (typeof links)[number]) => {
    const active = isNavItemActive(item, pathname);
    return (
      <TabLink key={item.href} href={item.href} active={active}>
        <TabContent icon={icon} label={label} active={active} />
      </TabLink>
    );
  };

  return (
    <>
      <nav
        aria-label={tabBarCopy.label}
        className="fixed inset-x-0 bottom-0 z-40 flex gap-1 border-t border-separator bg-background/95 px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
      >
        {renderLink(home)}
        <button type="button" onClick={() => setSearching(true)} className={cn(tabClass, "text-secondary")}>
          <TabContent icon={Search} label={tabBarCopy.tools} active={searching} />
        </button>
        {renderLink(history)}
        {renderLink(account)}
      </nav>
      {searching && <ToolSearchDialog onClose={() => setSearching(false)} />}
    </>
  );
}
