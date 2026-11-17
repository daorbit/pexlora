"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "pexlora-recent-tools";
const MAX_RECENT = 3;
const listeners = new Set<() => void>();

function readRaw() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw || "[]");
    return Array.isArray(value) ? value.filter((key): key is string => typeof key === "string") : [];
  } catch {
    return [];
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useRecentTools() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  return useMemo(() => parse(raw), [raw]);
}

export function useRememberTool(key: string) {
  useEffect(() => {
    const next = [key, ...parse(readRaw()).filter((item) => item !== key)].slice(0, MAX_RECENT);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    listeners.forEach((listener) => listener());
  }, [key]);
}
