import { compressTargetPath, type CompressTarget } from "@/config/compress-targets";
import { otherTools } from "@/config/tool-hub";
import { toolPageCopy } from "@/content/tool-pages";
import { compressTargetFaqs, compressTargetSteps } from "@/content/variant-guides";
import { DEFAULT_TOOL_OPTIONS } from "@/lib/image/options";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { CompressTargetLinksSection } from "@/components/tools/CompressTargetLinksSection";
import { HubGridSection } from "@/components/tools/HubGridSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function CompressTargetPage({ target }: { target: CompressTarget }) {
  const faqs = compressTargetFaqs(target);
  const description = toolPageCopy.compressTargetDescription(target.label);

  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name: toolPageCopy.compressTargetName(target.label),
          path: compressTargetPath(target.slug),
          description,
          faqs,
          category: "MultimediaApplication",
        })}
      />
      <ToolHero
        headline={toolPageCopy.compressTargetHeadline(target.label)}
        description={description}
        tool="compress-image"
        initialOptions={{ compress: { ...DEFAULT_TOOL_OPTIONS.compress, mode: "target", targetKb: target.kb } }}
      />
      <SeoStepsSection title={`How to compress an image to ${target.label}`} steps={compressTargetSteps(target)} />
      <CompressTargetLinksSection current={target.slug} />
      <FeaturesSection />
      <FaqSection items={faqs} />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools("compress-image")} />
      <AccountBand />
    </>
  );
}
