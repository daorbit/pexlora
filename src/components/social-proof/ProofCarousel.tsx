import { Children, type ReactNode } from "react";
import { MobileCarousel } from "@/components/ui/MobileCarousel";

type ProofCarouselProps = {
  label: string;
  children: ReactNode;
};

export function ProofCarousel({ label, children }: ProofCarouselProps) {
  return (
    <MobileCarousel label={label} until="md" trackClassName="gap-3 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {Children.map(children, (child) => (
        <li className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[55%] md:basis-auto">{child}</li>
      ))}
    </MobileCarousel>
  );
}
