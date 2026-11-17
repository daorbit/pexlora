"use client";

import { useCallback, useState } from "react";
import { defaultHistoryFilter, type HistoryFilter } from "@/lib/history/history-filter";

export function useHistoryFilter() {
  const [filter, setFilter] = useState<HistoryFilter>(defaultHistoryFilter);
  const patch = useCallback((changes: Partial<HistoryFilter>) => setFilter((current) => ({ ...current, ...changes })), []);
  const reset = useCallback(() => setFilter((current) => ({ ...defaultHistoryFilter, sort: current.sort })), []);

  return { filter, patch, reset };
}
