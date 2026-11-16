"use client";

import { useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";
import { runThemeTransition } from "@/lib/theme-transition";

export function useThemeReveal() {
  const { theme, toggleTheme } = useTheme();

  const toggleFrom = useCallback(
    (origin: HTMLElement | null) => runThemeTransition(origin, toggleTheme),
    [toggleTheme],
  );

  return { theme, isDark: theme === "dark", toggleFrom };
}
