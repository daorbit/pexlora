import { conversionPath, type Conversion } from "@/config/conversions";
import { otherTools } from "@/config/tool-hub";
import { toolPageCopy } from "@/content/tool-pages";
import { conversionFaqs, conversionSteps } from "@/content/variant-guides";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ConversionLinksSection } from "@/components/tools/ConversionLinksSection";
import { HubGridSection } from "@/components/tools/HubGridSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function ConversionPage({ conversion }: { conversion: Conversion }) {
  const faqs = conversionFaqs(conversion);
  const description = toolPageCopy.conversionDescription(conversion.from, conversion.toLabel);

  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name: `${conversion.name} Converter`,
          path: conversionPath(conversion.slug),
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
      <FaqSection items={faqs} />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools("convert-format")} />
      <AccountBand />
    </>
  );
}
