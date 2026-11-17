"use client";

import { useCallback, useEffect, useState } from "react";
import { clearAllSessions } from "@/lib/storage/session-store";
import { loadRecentResults, type RecentResult } from "@/lib/storage/workspace-sessions";

export function useRecentResults() {
  const [results, setResults] = useState<RecentResult[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadRecentResults().then((loaded) => {
      if (!cancelled) setResults(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const clear = useCallback(async () => {
    await clearAllSessions();
    setResults([]);
  }, []);

  return { results, clear };
}
