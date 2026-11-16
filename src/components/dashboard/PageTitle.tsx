"use client";

import { usePathname } from "next/navigation";
import { findNavItem } from "@/config/dashboard";

export function PageTitle() {
  const item = findNavItem(usePathname());

  return (
    <div className="flex min-w-0 items-center gap-2 text-sm">
      <span className="hidden text-secondary sm:inline">Dashboard</span>
      <span className="hidden text-border-strong sm:inline">/</span>
      <span className="truncate font-medium">{item?.label ?? "Overview"}</span>
    </div>
  );
}
