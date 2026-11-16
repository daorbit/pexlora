"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { dashboardNav, isNavItemActive } from "@/config/dashboard";
import { cn } from "@/lib/utils/cn";
import { SidebarLink } from "@/components/dashboard/SidebarLink";
import { whenCollapsed } from "@/components/dashboard/sidebar-styles";

export function SidebarNav({ extra }: { extra?: ReactNode }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Dashboard" className="flex flex-col gap-4">
      {dashboardNav.map((section, index) => (
        <div key={section.title ?? index} className="flex flex-col gap-0.5">
          {section.title && (
            <>
              <p
                className={cn(
                  "px-3 pb-1 text-[11px] font-semibold tracking-[0.06em] text-tertiary uppercase",
                  whenCollapsed.hidden,
                )}
              >
                {section.title}
              </p>
              <span className={cn("mx-auto mb-1 h-px w-7 bg-separator", whenCollapsed.visible)} aria-hidden />
            </>
          )}
          {section.items.map((item) => (
            <SidebarLink key={item.href} item={item} active={isNavItemActive(item, pathname)} />
          ))}
        </div>
      ))}
      {extra && <div className="flex flex-col gap-0.5">{extra}</div>}
    </nav>
  );
}
