"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDown, Languages, Search } from "lucide-react";
import { languages } from "@/config/languages";
import { languageCopy } from "@/content/language";
import { useActiveLanguage, useLanguageSelect } from "@/hooks/useActiveLanguage";
import { useDismissOutside } from "@/hooks/useDismissOutside";
import { cn } from "@/lib/utils/cn";
import { matchesQuery } from "@/lib/utils/match-query";
import { LanguageList } from "@/components/language/LanguageList";

export function LanguageMenu({ className }: { className?: string }) {
  const active = useActiveLanguage();
  const current = languages.find((language) => language.code === active) ?? languages[0];
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);
  const select = useLanguageSelect(active, close);
  useDismissOutside(rootRef, open, close);

  const results = useMemo(
    () => languages.filter((language) => matchesQuery(query, [language.native, language.label, language.code])),
    [query],
  );

  return (
    <div ref={rootRef} translate="no" className={cn("notranslate relative", className)}>
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={languageCopy.trigger}
        className="inline-flex h-10 items-center gap-2 rounded-xl px-2.5 text-[13px] font-semibold text-secondary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        <Languages className="size-4" aria-hidden />
        <span>{current.native}</span>
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-20 mb-2 flex w-72 flex-col overflow-hidden rounded-2xl border border-separator bg-surface text-foreground shadow-card motion-safe:animate-fade-up motion-safe:[animation-duration:0.2s]">
          <label className="flex items-center gap-2 border-b border-separator px-3">
            <Search className="size-4 shrink-0 text-tertiary" aria-hidden />
            <input
              autoFocus
              type="search"
              value={query}
              placeholder={languageCopy.search}
              aria-label={languageCopy.search}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && results[0]) select(results[0].code);
              }}
              className="h-11 min-w-0 flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-tertiary"
            />
          </label>
          <LanguageList
            items={results}
            active={active}
            onSelect={select}
            className="scrollbar-none max-h-72 overflow-y-auto p-1.5"
          />
        </div>
      )}
    </div>
  );
}
