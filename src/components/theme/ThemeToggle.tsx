"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/Button";

type ThemeToggleProps = { variant?: "icon" | "tile"; size?: "sm" | "md" | "lg" };

export function ThemeToggle({ variant = "icon", size = "sm" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Button variant={variant} size={size} onClick={toggleTheme} aria-label={label} title={label}>
      {isDark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </Button>
  );
}
