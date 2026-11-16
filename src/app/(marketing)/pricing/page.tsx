import type { Metadata } from "next";
import { routes } from "@/config/site";
import { pricingCopy } from "@/content/pricing";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { pricingStructuredData } from "@/lib/seo/structured-data";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqSection } from "@/components/landing/FaqSection";
import { PricingCompare } from "@/components/pricing/PricingCompare";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata(pricingCopy.metaTitle, pricingCopy.description, routes.pricing);

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingStructuredData()} />
      <section className="py-14 sm:py-20">
        <Container className="flex flex-col gap-10 sm:gap-14">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Eyebrow>{pricingCopy.eyebrow}</Eyebrow>
            <h1 className="text-[36px] leading-[1.1] font-bold tracking-[-0.035em] sm:text-[52px]">
              {pricingCopy.title} <Highlight>{pricingCopy.highlight}</Highlight>
            </h1>
            <p className="max-w-lg text-[17px] leading-relaxed text-secondary">{pricingCopy.lead}</p>
          </div>
          <PricingPlans />
          <div className="flex flex-col items-center gap-1.5 text-center text-[13.5px] text-tertiary">
            <p>{pricingCopy.trust}</p>
            <p>{pricingCopy.extend}</p>
          </div>
        </Container>
      </section>
      <section className="pb-6">
        <Container size="narrow" className="flex flex-col gap-8">
          <SectionHeading title={pricingCopy.compareTitle} centered className="mx-auto" />
          <PricingCompare />
        </Container>
      </section>
      <FaqSection items={pricingCopy.faqs} />
    </>
  );
}
