"use client";

import { useCallback, useEffect, useState } from "react";
import { clearAllSessions, restoreSessions, snapshotSessions, type SessionSnapshot } from "@/lib/storage/session-store";
import { loadRecentResults, removeRecentResult, type RecentResult } from "@/lib/storage/workspace-sessions";

export function useRecentResults() {
  const [results, setResults] = useState<RecentResult[] | null>(null);

  const reload = useCallback(() => loadRecentResults().then(setResults), []);

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
    const snapshot = await snapshotSessions();
    await clearAllSessions();
    setResults([]);
    return snapshot;
  }, []);

  const remove = useCallback(
    async (result: RecentResult) => {
      const snapshot = await removeRecentResult(result);
      await reload();
      return snapshot;
    },
    [reload],
  );

  const restore = useCallback(
    async (snapshot: SessionSnapshot) => {
      await restoreSessions(snapshot);
      await reload();
    },
    [reload],
  );

  return { results, clear, remove, restore };
}
