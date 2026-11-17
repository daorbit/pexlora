import { cn } from "@/lib/utils/cn";

type CarouselDotsProps = {
  count: number;
  selected: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function CarouselDots({ count, selected, onSelect, className }: CarouselDotsProps) {
  if (count < 2) return null;

  return (
    <div className={cn("flex justify-center gap-1.5 pt-3", className)}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === selected}
          onClick={() => onSelect(index)}
          className={cn(
            "h-1.5 rounded-full transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            index === selected ? "w-5 bg-foreground" : "w-1.5 bg-border-strong",
          )}
        />
      ))}
    </div>
  );
}
