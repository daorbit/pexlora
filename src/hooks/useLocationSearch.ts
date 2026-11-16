"use client";

import { useMemo, useSyncExternalStore } from "react";
import { subscribeToSearch } from "@/lib/url/search-params";

export function useLocationSearch() {
  const search = useSyncExternalStore(
    subscribeToSearch,
    () => window.location.search,
    () => "",
  );
  return useMemo(() => new URLSearchParams(search), [search]);
}
