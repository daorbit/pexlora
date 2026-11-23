import { conversionPath, type Conversion } from "@/config/conversions";
import { toolPageCopy } from "@/content/tool-pages";
import { seoPagesBySlug } from "@/content/seo-pages";
import { conversionFaqs, conversionGuides, conversionSteps } from "@/content/variant-guides";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { workspaceToolFacts } from "@/lib/seo/tool-facts";
import { ToolFactsSection } from "@/components/seo/ToolFactsSection";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ConversionLinksSection } from "@/components/tools/ConversionLinksSection";
import { MoreToolsSection } from "@/components/tools/MoreToolsSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolPostsSection } from "@/components/tools/ToolPostsSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function ConversionPage({ conversion }: { conversion: Conversion }) {
  const faqs = conversionFaqs(conversion);
  const description = toolPageCopy.conversionDescription(conversion.from, conversion.toLabel);
  const name = `${conversion.name} Converter`;
  const path = conversionPath(conversion.slug);

  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name,
          path,
          description,
          faqs,
          category: "MultimediaApplication",
        })}
      />
      <ToolHero
        headline={toolPageCopy.conversionHeadline(conversion.from, conversion.toLabel)}
        description={description}
        tool="convert-format"
        initialOptions={{ convert: { format: conversion.to } }}
        conversion={conversion}
      />
      <SeoStepsSection title={`How to convert ${conversion.from} to ${conversion.toLabel}`} steps={conversionSteps(conversion)} />
      <ConversionLinksSection current={conversion.slug} />
      <FeaturesSection />
      <ToolFactsSection name={name} description={description} path={path} rows={workspaceToolFacts("convert-format")} />
      <FaqSection items={faqs} />
      <ToolPostsSection tool="convert-format" />
      <RelatedToolsSection pages={seoPagesBySlug(conversionGuides)} />
      <MoreToolsSection current="convert-format" />
      <AccountBand />
    </>
  );
}
