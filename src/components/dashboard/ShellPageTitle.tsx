"use client";

import { usePathname } from "next/navigation";
import { findActiveNavItem } from "@/config/dashboard";

export function ShellPageTitle() {
  const item = findActiveNavItem(usePathname());

  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <h1 className="truncate text-[19px] font-semibold tracking-[-0.028em] sm:text-2xl">{item.description}</h1>
      <p className="truncate text-sm text-secondary max-sm:hidden">{item.subtitle}</p>
    </div>
  );
}
