"use client";

import { useEffect, useSyncExternalStore } from "react";
import { CHANGELOG_NEW_DAYS } from "@/config/limits";
import { latestChangelogDate } from "@/content/changelog";

const STORAGE_KEY = "pexlora-changelog-seen";
const DAY_MS = 86_400_000;
const listeners = new Set<() => void>();

function readUnseen() {
  if (Date.now() - Date.parse(latestChangelogDate) > CHANGELOG_NEW_DAYS * DAY_MS) return false;
  try {
    return (window.localStorage.getItem(STORAGE_KEY) ?? "") < latestChangelogDate;
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

export function useChangelogUnseen() {
  return useSyncExternalStore(subscribe, readUnseen, () => false);
}

export function useMarkChangelogSeen() {
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, latestChangelogDate);
    } catch {}
    listeners.forEach((listener) => listener());
  }, []);
}
