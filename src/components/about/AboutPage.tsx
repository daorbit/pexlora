import { routes } from "@/config/site";
import { aboutCopy } from "@/content/about";
import { factsCopy } from "@/content/facts";
import { pageUpdatedAt } from "@/lib/seo/page-updated";
import { Container } from "@/components/ui/Container";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { FactsTable } from "@/components/seo/FactsTable";
import { UpdatedDate } from "@/components/seo/UpdatedDate";
import { AboutHeader } from "@/components/about/AboutHeader";
import { AboutLinks } from "@/components/about/AboutLinks";
import { AboutSections } from "@/components/about/AboutSections";

export function AboutPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="flex max-w-5xl flex-col gap-10 sm:gap-14">
        <div className="flex flex-col gap-4">
          <AboutHeader />
          <UpdatedDate date={pageUpdatedAt(routes.about)} />
        </div>
        <section aria-labelledby="about-facts" className="flex flex-col gap-4">
          <h2 id="about-facts" className="text-[22px] font-semibold tracking-[-0.02em] sm:text-2xl">
            {aboutCopy.factsTitle}
          </h2>
          <FactsTable caption={factsCopy.tableCaption} rows={factsCopy.rows} />
        </section>
        <AboutSections />
        <AboutLinks />
        <LegalContactCard />
      </Container>
    </section>
  );
}
