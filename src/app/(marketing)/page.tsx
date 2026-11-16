import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FormatsSection } from "@/components/landing/FormatsSection";
import { LearnSection } from "@/components/landing/LearnSection";
import { PageHero } from "@/components/landing/PageHero";
import { PopularToolsSection } from "@/components/landing/PopularToolsSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { RisksSection } from "@/components/landing/RisksSection";
import { StepsSection } from "@/components/landing/StepsSection";
import { heroCopy } from "@/content/landing";
import { JsonLd } from "@/components/seo/JsonLd";
import { Highlight } from "@/components/ui/Highlight";
import { homeStructuredData } from "@/lib/seo/structured-data";

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <PageHero
        title={
          <>
            {heroCopy.title} <Highlight>{heroCopy.highlight}</Highlight>
          </>
        }
        description={heroCopy.description}
      />
      <StepsSection />
      <RisksSection />
      <PrivacySection />
      <FormatsSection />
      <PopularToolsSection />
      <LearnSection />
      <FaqSection />
      <AccountBand />
    </>
  );
}
