import { popularToolsCopy } from "@/content/landing";
import { Band } from "@/components/ui/Band";
import { BandTitle } from "@/components/landing/BandTitle";
import { ToolFinder } from "@/components/landing/ToolFinder";

export function PopularToolsSection() {
  return (
    <Band id="tools" tone="pearl" containerClassName="flex max-w-235 flex-col items-center gap-6 sm:gap-10">
      <BandTitle className="text-center">{popularToolsCopy.title}</BandTitle>
      <ToolFinder />
    </Band>
  );
}
