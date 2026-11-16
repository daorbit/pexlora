import { conversionIconSrc, type Conversion } from "@/config/conversions";
import { ConvertImageIcon } from "@/components/icons/ConvertImageIcon";
import { otherTools } from "@/config/tool-hub";
import { toolPageCopy } from "@/content/tool-pages";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ConversionLinksSection } from "@/components/tools/ConversionLinksSection";
import { HubGridSection } from "@/components/tools/HubGridSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function ConversionPage({ conversion }: { conversion: Conversion }) {
  return (
    <>
      <ToolHero
        icon={ConvertImageIcon}
        iconSrc={conversionIconSrc(conversion.slug)}
        headline={toolPageCopy.conversionHeadline(conversion.from, conversion.toLabel)}
        description={toolPageCopy.conversionDescription(conversion.from, conversion.toLabel)}
        tool="convert-format"
        initialOptions={{ convert: { format: conversion.to } }}
        conversion={conversion.slug}
      />
      <ConversionLinksSection current={conversion.slug} />
      <FeaturesSection />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools("convert-format")} />
      <FaqSection />
      <AccountBand />
    </>
  );
}
