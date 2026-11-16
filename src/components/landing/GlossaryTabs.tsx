"use client";

import { useId, useState } from "react";
import { glossary, learnCopy } from "@/content/landing";
import { cn } from "@/lib/utils/cn";

export function GlossaryTabs() {
  const [active, setActive] = useState(0);
  const id = useId();

  return (
    <>
      <div role="tablist" aria-label={learnCopy.tabsLabel} className="flex flex-wrap items-baseline gap-x-5 lg:gap-x-7">
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
                "text-[48px] leading-[1.05] font-extrabold tracking-[-0.06em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:text-[88px]",
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
          className="grid grid-cols-1 items-end gap-8 border-t border-separator pt-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-14"
        >
          <p className="text-[22px] leading-[1.3] font-medium tracking-[-0.02em] lg:text-[32px]">{entry.body}</p>
          <div className="flex flex-col gap-2 rounded-[20px] bg-surface p-5.5 font-mono">
            <span className="text-[13px] text-tertiary">{entry.sample.key}</span>
            <span className="text-lg break-all">{entry.sample.value}</span>
          </div>
        </div>
      ))}
    </>
  );
}
