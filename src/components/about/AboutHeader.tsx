import { aboutCopy } from "@/content/about";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";

export function AboutHeader() {
  return (
    <header className="flex flex-col items-start gap-4 sm:gap-5">
      <Eyebrow>{aboutCopy.eyebrow}</Eyebrow>
      <h1 className="text-[34px] leading-[1.08] font-bold tracking-[-0.035em] sm:text-[52px] sm:leading-[1.06]">
        {aboutCopy.title} <Highlight>{aboutCopy.highlight}</Highlight>
      </h1>
      <p className="max-w-2xl text-[16px] leading-relaxed text-secondary sm:text-[17px]">{aboutCopy.lead}</p>
    </header>
  );
}
