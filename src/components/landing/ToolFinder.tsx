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
    <div className="w-full overflow-hidden rounded-[28px] bg-surface shadow-[0_1px_2px_rgb(16_18_13/0.05),0_40px_80px_-40px_rgb(16_18_13/0.35)]">
      <label className="flex items-center gap-3.5 border-b border-fill px-5 py-5 sm:px-7 sm:py-6">
        <Search className="size-6 shrink-0 text-tertiary" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={popularToolsCopy.placeholder}
          aria-label={popularToolsCopy.searchLabel}
          className="min-w-0 flex-1 bg-transparent text-xl font-medium tracking-[-0.02em] outline-none placeholder:text-tertiary sm:text-2xl"
        />
        <span className="shrink-0 font-mono text-xs text-tertiary" aria-live="polite">
          {popularToolsCopy.count(matches.length, seoPages.length)}
        </span>
      </label>
      <ul className="flex min-h-100 flex-col p-2.5">
        {matches.slice(0, MAX_RESULTS).map((page) => (
          <li key={page.slug}>
            <Link
              href={seoPagePath(page)}
              className="group flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <HubItemIcon src={seoPageIconSrc(page)} size="md" />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-[17px] font-semibold">{page.name}</span>
                <span className="truncate text-sm text-secondary">{page.description}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-tertiary" aria-hidden />
            </Link>
          </li>
        ))}
        {!matches.length && <li className="p-12 text-center text-base text-tertiary">{popularToolsCopy.empty}</li>}
      </ul>
    </div>
  );
}
