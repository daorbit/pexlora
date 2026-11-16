"use client";

import { useCallback, useSyncExternalStore } from "react";
import { readTheme, saveTheme, THEME_STORAGE_KEY, THEMES, type Theme } from "@/lib/theme";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY || !THEMES.includes(event.newValue as Theme)) return;
    document.documentElement.dataset.theme = event.newValue as Theme;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as const);

  const setTheme = useCallback((next: Theme) => {
    saveTheme(next);
    listeners.forEach((listener) => listener());
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
