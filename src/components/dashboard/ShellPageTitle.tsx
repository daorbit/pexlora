"use client";

import { usePathname } from "next/navigation";
import { findActiveNavItem } from "@/config/dashboard";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

export function ShellPageTitle() {
  const item = findActiveNavItem(usePathname());
  const Icon = item.icon;

  return (
    <div className="flex min-w-0 items-center gap-3.5">
      {item.iconSrc ? (
        <HubItemIcon src={item.iconSrc} size="md" />
      ) : (
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface shadow-thumb">
          <Icon className="size-5" aria-hidden />
        </span>
      )}
      <div className="flex min-w-0 flex-col gap-0.5">
        <h1 className="truncate text-2xl font-semibold tracking-[-0.028em]">{item.description}</h1>
        <p className="truncate text-sm text-secondary">{item.subtitle}</p>
      </div>
    </div>
  );
}
