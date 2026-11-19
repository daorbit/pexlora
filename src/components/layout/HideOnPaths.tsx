"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

export function HideOnPaths({ prefixes, children }: { prefixes: string[]; children: ReactNode }) {
  const pathname = usePathname();
  const hidden = prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  return hidden ? null : children;
}
