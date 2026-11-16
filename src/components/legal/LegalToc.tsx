import type { LegalDocument } from "@/content/legal";
import { legalCopy } from "@/content/legal";

export function LegalToc({ sections }: { sections: LegalDocument["sections"] }) {
  return (
    <nav aria-label={legalCopy.contents} className="sticky top-24 hidden flex-col gap-3 self-start lg:flex">
      <p className="text-xs font-semibold tracking-[0.12em] text-tertiary uppercase">{legalCopy.contents}</p>
      <ol className="flex flex-col gap-0.5 border-l border-separator">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="-ml-px flex gap-2 border-l border-transparent py-1.5 pl-4 text-[13.5px] text-secondary transition-colors hover:border-foreground hover:text-foreground"
            >
              <span className="w-5 shrink-0 tabular-nums text-tertiary">{index + 1}.</span>
              {section.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
