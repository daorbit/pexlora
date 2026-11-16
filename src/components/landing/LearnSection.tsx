import { learnCopy } from "@/content/landing";
import { Band } from "@/components/ui/Band";
import { GlossaryTabs } from "@/components/landing/GlossaryTabs";

export function LearnSection() {
  return (
    <Band id="learn" tone="ink" containerClassName="flex flex-col gap-5 sm:gap-10 lg:gap-12">
      <h2 className="font-mono text-[13px] text-tertiary">{learnCopy.title}</h2>
      <GlossaryTabs />
    </Band>
  );
}
