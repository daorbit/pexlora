"use client";

import { useState } from "react";
import { differenceCards, differenceCopy } from "@/content/landing";
import { DifferencePhoto } from "@/components/landing/DifferencePhoto";
import { DifferencePicker } from "@/components/landing/DifferencePicker";
import { DifferenceTagList } from "@/components/landing/DifferenceTagList";

export function DifferenceStage() {
  const [selected, setSelected] = useState(0);
  const card = differenceCards[selected];

  return (
    <div className="grid w-full grid-cols-1 items-center gap-5 sm:gap-6 lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)_minmax(0,17.5rem)] lg:gap-8">
      <DifferencePhoto key={card.src} card={card} className="lg:col-start-2 lg:row-start-1" />
      <DifferencePicker
        cards={differenceCards}
        selected={selected}
        onSelect={setSelected}
        className="lg:col-span-3 lg:row-start-2"
      />
      <DifferenceTagList
        title={differenceCopy.beforeCount(card.tags.length)}
        tags={card.tags}
        className="lg:col-start-1 lg:row-start-1"
      />
      <DifferenceTagList
        title={differenceCopy.afterCount}
        tags={card.tags}
        removed
        className="hidden lg:col-start-3 lg:row-start-1 lg:flex"
      />
    </div>
  );
}
