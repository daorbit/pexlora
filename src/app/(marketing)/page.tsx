import type { Metadata } from "next";
import { AccountBand } from "@/components/landing/AccountBand";
import { DifferenceSection } from "@/components/landing/DifferenceSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FormatsSection } from "@/components/landing/FormatsSection";
import { LearnSection } from "@/components/landing/LearnSection";
import { PopularToolsSection } from "@/components/landing/PopularToolsSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { RisksSection } from "@/components/landing/RisksSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { StepsSection } from "@/components/landing/StepsSection";
import { UseCasesSection } from "@/components/landing/UseCasesSection";
import { HomeHero } from "@/components/home/HomeHero";
import { ToolHubSection } from "@/components/home/ToolHubSection";
import { GlanceSection } from "@/components/seo/glance/GlanceSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { seo } from "@/config/seo";
import { routes } from "@/config/site";
import { factsCopy } from "@/content/facts";
import { pageMetadata } from "@/lib/seo/page-metadata";
import { homeStructuredData } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  ...pageMetadata(seo.defaultTitle, seo.description, "/"),
  title: { absolute: seo.defaultTitle },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <HomeHero />
      <ToolHubSection />
      <DifferenceSection />
      <FeaturesSection />
      <StepsSection />
      <RisksSection />
      <PrivacySection />
      <FormatsSection />
      <PopularToolsSection />
      <LearnSection />
      <UseCasesSection />
      <StatsSection />
      <GlanceSection
        eyebrow={factsCopy.eyebrow}
        title={factsCopy.title}
        summary={factsCopy.summary}
        caption={factsCopy.tableCaption}
        rows={factsCopy.rows}
        path={routes.home}
      />
      <FaqSection />
      <AccountBand />
    </>
  );
}
