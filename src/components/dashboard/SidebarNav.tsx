"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { dashboardNav, isNavItemActive, type DashboardNavItem } from "@/config/dashboard";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/layout/Logo";

const itemClasses =
  "flex h-10 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-colors";

function NavItem({ item, active }: { item: DashboardNavItem; active: boolean }) {
  const Icon = item.icon;
  const content = (
    <>
      <Icon className="size-4 shrink-0" aria-hidden />
      <span className="flex-1 truncate">{item.label}</span>
      {item.soon && <Badge>Soon</Badge>}
      {active && <span className="size-1.5 rounded-full bg-accent" aria-hidden />}
    </>
  );

  if (!item.href) {
    return (
      <span className={cn(itemClasses, "cursor-not-allowed text-secondary/60")} aria-disabled>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        itemClasses,
        active
          ? "bg-fill text-foreground"
          : "text-secondary hover:bg-fill hover:text-foreground",
      )}
    >
      {content}
    </Link>
  );
}

export function SidebarNav({ footer }: { footer: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center border-b border-separator px-5">
        <Logo />
      </div>
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-5">
        {dashboardNav.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <p className="px-3 pb-1 text-xs font-medium text-secondary">{section.title}</p>
            {section.items.map((item) => (
              <NavItem key={item.label} item={item} active={isNavItemActive(item, pathname)} />
            ))}
          </div>
        ))}
      </nav>
      <div className="shrink-0 border-t border-separator p-3">{footer}</div>
    </div>
  );
}
