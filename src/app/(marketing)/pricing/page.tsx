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
      <section className="pt-4 pb-14 sm:pt-6 sm:pb-20">
        <Container>
          <div className="theme-invert flex flex-col gap-10 rounded-[28px] bg-background px-4 py-12 text-foreground sm:gap-14 sm:rounded-4xl sm:px-10 sm:py-16">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
              <Eyebrow>{pricingCopy.eyebrow}</Eyebrow>
              <h1 className="text-[36px] leading-[1.1] font-bold tracking-[-0.035em] sm:text-[52px]">
                {pricingCopy.title} <Highlight>{pricingCopy.highlight}</Highlight>
              </h1>
              <p className="max-w-lg text-[17px] leading-relaxed text-secondary">{pricingCopy.lead}</p>
            </div>
            <PricingPlans />
            <p className="text-center text-sm text-tertiary">{pricingCopy.extend}</p>
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
