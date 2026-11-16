import { company, legalUpdated } from "@/config/company";
import { legalCopy, type LegalDocument } from "@/content/legal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LegalBlockView } from "@/components/legal/LegalBlockView";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { LegalNav } from "@/components/legal/LegalNav";
import { LegalToc } from "@/components/legal/LegalToc";

export function LegalPage({ doc }: { doc: LegalDocument }) {
  return (
    <section className="py-12 sm:py-16">
      <Container className="flex max-w-6xl flex-col gap-10">
        <header className="flex flex-col items-start gap-5">
          <Eyebrow>{legalCopy.eyebrow}</Eyebrow>
          <h1 className="text-[36px] leading-[1.06] font-bold tracking-[-0.035em] sm:text-[52px]">{doc.title}</h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-secondary">{doc.lead}</p>
          <div className="flex flex-wrap items-center gap-2 text-[13px]">
            <span className="rounded-md bg-fill px-2.5 py-1 font-medium">{legalCopy.updated(legalUpdated)}</span>
            <span className="rounded-md bg-fill px-2.5 py-1 font-medium text-secondary">
              {legalCopy.operatedBy(company.legalName)}
            </span>
          </div>
          <LegalNav current={doc.slug} />
        </header>

        <section aria-labelledby="key-points" className="flex flex-col gap-4">
          <h2 id="key-points" className="text-xs font-semibold tracking-[0.12em] text-tertiary uppercase">
            {legalCopy.keyPoints}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {doc.highlights.map((highlight) => (
              <li key={highlight.title} className="flex flex-col gap-2 rounded-[22px] bg-surface p-5 shadow-card">
                <span className="size-2 rounded-full bg-primary" aria-hidden />
                <h3 className="text-[15px] font-semibold">{highlight.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{highlight.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <LegalToc sections={doc.sections} />
          <article className="flex max-w-3xl flex-col gap-10">
            {doc.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="flex scroll-mt-24 flex-col gap-4">
                <h2 className="text-[22px] font-semibold tracking-[-0.02em] sm:text-2xl">
                  <span className="mr-2 text-tertiary tabular-nums">{index + 1}.</span>
                  {section.heading}
                </h2>
                {section.blocks.map((block, blockIndex) => (
                  <LegalBlockView key={`${section.id}-${blockIndex}`} block={block} />
                ))}
              </section>
            ))}
          </article>
        </div>

        <LegalContactCard />
      </Container>
    </section>
  );
}
