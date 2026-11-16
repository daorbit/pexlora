"use client";

import { useId, useState } from "react";
import { glossary, learnCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";

export function GlossaryTabs() {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <>
      <div role="tablist" aria-label={learnCopy.tabsLabel} className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1 sm:gap-x-5 lg:gap-x-7">
        {glossary.map((entry, index) => {
          const selected = index === active;
          return (
            <button
              key={entry.term}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${index}`}
              onClick={() => setActive(index)}
              className={cn(
                "text-[30px] leading-[1.1] font-extrabold tracking-[-0.05em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-[52px] lg:text-[88px] lg:leading-[1.05] lg:tracking-[-0.06em]",
                selected ? "text-primary" : "text-border-strong hover:text-foreground",
              )}
            >
              {entry.term}
            </button>
          );
        })}
      </div>
      {glossary.map((entry, index) => (
        <div
          key={entry.term}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={index !== active}
          className="grid grid-cols-1 items-end gap-4 border-t border-separator pt-5 sm:gap-8 sm:pt-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14"
        >
          <p className="text-[16px] leading-[1.45] font-medium tracking-[-0.01em] sm:text-[22px] sm:leading-[1.3] lg:text-[32px] lg:tracking-[-0.02em]">
            {entry.body}
          </p>
          <div className="flex flex-col gap-1 rounded-2xl bg-surface p-4 font-mono sm:gap-2 sm:rounded-[20px] sm:p-5.5">
            <span className="text-xs text-tertiary sm:text-[13px]">{entry.sample.key}</span>
            <span className="text-[14px] break-all sm:text-lg">{entry.sample.value}</span>
          </div>
        </div>
      ))}
    </>
  );
}
