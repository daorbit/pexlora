"use client";

import { navCopy } from "@/content/navigation";
import { useThemeReveal } from "@/hooks/useThemeReveal";
import { cn } from "@/lib/utils/cn";
import { SunMoonIcon } from "@/components/icons/SunMoonIcon";

export function HeaderThemeSwitch() {
  const { isDark, toggleFrom } = useThemeReveal();
  const label = isDark ? navCopy.toLight : navCopy.toDark;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      onClick={(event) => toggleFrom(event.currentTarget)}
      className="group relative inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-fill-strong p-0.5 transition-colors duration-500 hover:bg-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-8 sm:w-14"
    >
      <span
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-thumb transition-[translate,scale] duration-700 ease-[cubic-bezier(0.34,1.45,0.5,1)] group-active:scale-90 sm:size-7",
          isDark ? "translate-x-5 sm:translate-x-6" : "translate-x-0",
        )}
      >
        <SunMoonIcon moon={isDark} className="size-4 sm:size-[18px]" />
      </span>
    </button>
  );
}
