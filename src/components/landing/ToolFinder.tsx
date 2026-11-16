"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { popularToolsCopy } from "@/content/landing";
import { seoPageIconSrc, seoPagePath, seoPages } from "@/content/seo-pages";
import { matchesQuery } from "@/lib/utils/match-query";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

const MAX_RESULTS = 6;

export function ToolFinder() {
  const [query, setQuery] = useState("");
  const matches = useMemo(
    () => seoPages.filter((page) => matchesQuery(query, [page.name, page.description, page.keywords])),
    [query],
  );

  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-surface shadow-[0_1px_2px_rgb(16_18_13/0.05),0_40px_80px_-40px_rgb(16_18_13/0.35)] sm:rounded-[28px]">
      <label className="flex items-center gap-2.5 border-b border-fill px-4 py-3.5 sm:gap-3.5 sm:px-7 sm:py-6">
        <Search className="size-[18px] shrink-0 text-tertiary sm:size-6" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={popularToolsCopy.placeholder}
          aria-label={popularToolsCopy.searchLabel}
          className="min-w-0 flex-1 bg-transparent text-base font-medium tracking-[-0.01em] outline-none placeholder:text-tertiary sm:text-2xl sm:tracking-[-0.02em]"
        />
        <span className="shrink-0 font-mono text-[11px] text-tertiary sm:text-xs" aria-live="polite">
          {popularToolsCopy.count(matches.length, seoPages.length)}
        </span>
      </label>
      <ul className="flex flex-col p-1.5 sm:min-h-100 sm:p-2.5">
        {matches.slice(0, MAX_RESULTS).map((page) => (
          <li key={page.slug}>
            <Link
              href={seoPagePath(page)}
              className="group flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-3.5"
            >
              <HubItemIcon src={seoPageIconSrc(page)} size="sm" className="sm:size-11" />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-[14.5px] font-semibold sm:text-[17px]">{page.name}</span>
                <span className="truncate text-[12.5px] text-secondary sm:text-sm">{page.description}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-tertiary" aria-hidden />
            </Link>
          </li>
        ))}
        {!matches.length && (
          <li className="p-8 text-center text-sm text-tertiary sm:p-12 sm:text-base">{popularToolsCopy.empty}</li>
        )}
      </ul>
    </div>
  );
}
