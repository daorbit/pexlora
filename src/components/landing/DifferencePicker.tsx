import Image from "next/image";
import { differenceCopy, type DifferenceCard } from "@/content/landing";
import { cn } from "@/lib/utils/cn";

type DifferencePickerProps = {
  cards: DifferenceCard[];
  selected: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function DifferencePicker({ cards, selected, onSelect, className }: DifferencePickerProps) {
  return (
    <div role="group" aria-label={differenceCopy.samplesLabel} className={cn("flex justify-center gap-2.5 sm:gap-3", className)}>
      {cards.map((card, index) => {
        const active = index === selected;
        return (
          <button
            key={card.src}
            type="button"
            aria-pressed={active}
            aria-label={differenceCopy.pick(card.title)}
            onClick={() => onSelect(index)}
            className={cn(
              "relative size-12 shrink-0 overflow-hidden rounded-xl transition-opacity focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring sm:size-15",
              active ? "outline-2 outline-offset-3 outline-primary" : "opacity-55 hover:opacity-90",
            )}
          >
            <Image src={card.src} alt="" fill sizes="60px" className="object-cover" />
          </button>
        );
      })}
    </div>
  );
}
