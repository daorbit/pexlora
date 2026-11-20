import { aboutCopy } from "@/content/about";
import { LegalBlockView } from "@/components/legal/LegalBlockView";

export function AboutSections() {
  return (
    <article className="flex max-w-3xl flex-col gap-9 sm:gap-10">
      {aboutCopy.sections.map((section) => (
        <section key={section.id} id={section.id} className="flex scroll-mt-24 flex-col gap-3.5 sm:gap-4">
          <h2 className="text-[22px] font-semibold tracking-[-0.02em] sm:text-2xl">{section.heading}</h2>
          {section.blocks.map((block, index) => (
            <LegalBlockView key={`${section.id}-${index}`} block={block} />
          ))}
        </section>
      ))}
    </article>
  );
}
