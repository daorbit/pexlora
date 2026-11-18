"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ComponentProps, type ReactNode } from "react";
import { History, LayoutGrid, Menu, Search, type LucideIcon } from "lucide-react";
import { historyNavItem, isNavItemActive, isToolRoute, overviewNavItem } from "@/config/dashboard";
import { tabBarCopy } from "@/content/dashboard";
import { cn } from "@/lib/utils/cn";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { ToolSearchDialog } from "@/components/dashboard/ToolSearchDialog";

const tabClass =
  "flex h-full flex-1 items-center justify-center rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-ring";

function TabIcon({ icon: Icon, active }: { icon: LucideIcon; active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 w-12 items-center justify-center rounded-full transition-colors",
        active ? "bg-primary text-primary-foreground" : "text-secondary",
      )}
    >
      <Icon className="size-5" strokeWidth={2.1} aria-hidden />
    </span>
  );
}

type TabButtonProps = ComponentProps<"button"> & { icon: LucideIcon; label: string; active: boolean };

function TabButton({ icon, label, active, ...props }: TabButtonProps) {
  return (
    <button type="button" aria-label={label} className={tabClass} {...props}>
      <TabIcon icon={icon} active={active} />
    </button>
  );
}

function TabLink({ href, icon, label, active }: { href: string; icon: LucideIcon; label: string; active: boolean }) {
  return (
    <Link href={href} aria-label={label} aria-current={active ? "page" : undefined} className={tabClass}>
      <TabIcon icon={icon} active={active} />
    </Link>
  );
}

export function MobileTabBar({ menu }: { menu: ReactNode }) {
  const pathname = usePathname();
  const [searching, setSearching] = useState(false);

  const onHome = isNavItemActive(overviewNavItem, pathname);
  const onHistory = isNavItemActive(historyNavItem, pathname);
  const onTool = isToolRoute(pathname);
  const onOther = !onHome && !onHistory && !onTool;

  return (
    <>
      <nav
        aria-label={tabBarCopy.label}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-separator bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        <div className="flex h-12 gap-1 px-2">
          <TabLink href={overviewNavItem.href} icon={LayoutGrid} label={tabBarCopy.home} active={onHome} />
          <TabButton icon={Search} label={tabBarCopy.tools} active={onTool || searching} onClick={() => setSearching(true)} />
          <TabLink href={historyNavItem.href} icon={History} label={tabBarCopy.history} active={onHistory} />
          <MobileNav
            renderTrigger={({ open, openMenu }) => (
              <TabButton
                icon={Menu}
                label={tabBarCopy.more}
                active={open || onOther}
                aria-expanded={open}
                aria-haspopup="dialog"
                onClick={openMenu}
              />
            )}
          >
            {menu}
          </MobileNav>
        </div>
      </nav>
      {searching && <ToolSearchDialog onClose={() => setSearching(false)} />}
    </>
  );
}
