import { stepsCopy } from "@/content/landing";
import { Band } from "@/components/ui/Band";
import { BandTitle } from "@/components/landing/BandTitle";
import { StepsList } from "@/components/landing/steps/StepsList";
import { StepsStage } from "@/components/landing/steps/StepsStage";

export function StepsSection() {
  return (
    <Band
      id="how-it-works"
      tone="pearl"
      containerClassName="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-x-16 lg:gap-y-8"
    >
      <BandTitle size="md" className="lg:col-start-1">
        {stepsCopy.title}
      </BandTitle>
      <StepsStage className="lg:col-start-2 lg:row-span-2 lg:row-start-1" />
      <StepsList className="lg:col-start-1" />
    </Band>
  );
}
