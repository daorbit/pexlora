"use client";

import { Check } from "lucide-react";
import type { SiteLanguage } from "@/config/languages";
import { languageCopy } from "@/content/language";
import { cn } from "@/lib/utils/cn";
import { LanguageFlag } from "@/components/language/LanguageFlag";

type LanguageListProps = {
  items: SiteLanguage[];
  active: string;
  onSelect: (code: string) => void;
  className?: string;
};

export function LanguageList({ items, active, onSelect, className }: LanguageListProps) {
  if (!items.length) return <p className="px-3 py-6 text-center text-[13px] text-secondary">{languageCopy.noResults}</p>;

  return (
    <div role="radiogroup" aria-label={languageCopy.listLabel} className={cn("flex flex-col gap-0.5", className)}>
      {items.map((language) => {
        const selected = language.code === active;
        return (
          <button
            key={language.code}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(language.code)}
            className={cn(
              "flex min-w-0 items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-fill focus-visible:outline-2 focus-visible:outline-ring",
              selected && "bg-fill",
            )}
          >
            <LanguageFlag code={language.flag} />
            <span lang={language.code} className="min-w-0 flex-1 truncate text-[13.5px] font-medium">
              {language.native}
            </span>
            <span className="shrink-0 text-[12px] text-tertiary">{language.label}</span>
            {selected && <Check className="size-3.5 shrink-0 text-accent-text" aria-hidden />}
          </button>
        );
      })}
    </div>
  );
}
