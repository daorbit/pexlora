"use client";

import { Moon, Sun } from "lucide-react";
import { navCopy } from "@/content/navigation";
import { useThemeReveal } from "@/hooks/useThemeReveal";
import { Button } from "@/components/ui/Button";

type ThemeToggleProps = { variant?: "icon" | "tile"; size?: "sm" | "md" | "lg" };

export function ThemeToggle({ variant = "icon", size = "sm" }: ThemeToggleProps) {
  const { isDark, toggleFrom } = useThemeReveal();
  const label = isDark ? navCopy.toLight : navCopy.toDark;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={(event) => toggleFrom(event.currentTarget)}
      aria-label={label}
      title={label}
    >
      {isDark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
    </Button>
  );
}
