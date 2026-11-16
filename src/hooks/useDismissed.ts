"use client";

import { useCallback, useSyncExternalStore } from "react";

const PREFIX = "pexlora-dismissed:";
const listeners = new Set<() => void>();

function read(key: string) {
  try {
    return window.localStorage.getItem(PREFIX + key) === "1";
  } catch {
    return false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useDismissed(key: string) {
  const dismissed = useSyncExternalStore(subscribe, () => read(key), () => true);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(PREFIX + key, "1");
    } catch {}
    listeners.forEach((listener) => listener());
  }, [key]);

  return [dismissed, dismiss] as const;
}
