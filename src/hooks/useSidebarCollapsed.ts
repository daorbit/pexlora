"use client";

import { useCallback, useSyncExternalStore } from "react";
import { readSidebarCollapsed, saveSidebarCollapsed } from "@/lib/sidebar";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSidebarCollapsed() {
  const collapsed = useSyncExternalStore(subscribe, readSidebarCollapsed, () => false);

  const toggle = useCallback(() => {
    saveSidebarCollapsed(!readSidebarCollapsed());
    listeners.forEach((listener) => listener());
  }, []);

  return { collapsed, toggle };
}
