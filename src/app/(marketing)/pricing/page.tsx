import type { Metadata } from "next";
import { formatPrice } from "@/config/plans";
import { routes } from "@/config/site";
import { pricingCopy } from "@/content/pricing";
import { env } from "@/lib/env";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { pricingStructuredData } from "@/lib/seo/structured-data";
import { Alert } from "@/components/ui/Alert";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Highlight } from "@/components/ui/Highlight";
import { Section } from "@/components/ui/Section";
import { FaqSection } from "@/components/landing/FaqSection";
import { PricingCompare } from "@/components/pricing/PricingCompare";
import { PricingFreeNote } from "@/components/pricing/PricingFreeNote";
import { PricingGuarantees } from "@/components/pricing/PricingGuarantees";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata(pricingCopy.metaTitle, pricingCopy.description, routes.pricing);

export default function PricingPage() {
  const testAmount = env.paymentTestAmountPaise;

  return (
    <>
      <JsonLd data={pricingStructuredData()} />
      <section>
        <Container className="flex flex-col gap-8 pt-10 pb-4 sm:gap-12 sm:pt-20 sm:pb-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center sm:gap-4">
            <Eyebrow>{pricingCopy.eyebrow}</Eyebrow>
            <h1 className="text-[34px] leading-[1.1] font-bold tracking-[-0.035em] sm:text-[56px]">
              {pricingCopy.title} <Highlight>{pricingCopy.highlight}</Highlight>
            </h1>
            <p className="max-w-lg text-[15px] leading-relaxed text-secondary sm:text-[17px]">{pricingCopy.lead}</p>
          </div>
          {testAmount !== null && <Alert message={pricingCopy.testMode(formatPrice(testAmount))} />}
          <PricingPlans />
          <PricingGuarantees />
        </Container>
      </section>
      <Section
        tone="surface"
        eyebrow={pricingCopy.compareEyebrow}
        title={pricingCopy.compareTitle}
        description={pricingCopy.compareDescription}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 sm:gap-5">
          <PricingCompare />
          <PricingFreeNote />
        </div>
      </Section>
      <FaqSection items={pricingCopy.faqs} description={pricingCopy.faqDescription} />
    </>
  );
}
