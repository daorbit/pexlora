import { compressTargetPath, type CompressTarget } from "@/config/compress-targets";
import { compressTargetHubKey } from "@/config/tool-hub";
import { compressTargetIntros } from "@/content/compress-target-guides";
import { toolPageCopy } from "@/content/tool-pages";
import { seoPagesBySlug } from "@/content/seo-pages";
import { compressTargetFaqs, compressTargetGuides, compressTargetSteps } from "@/content/variant-guides";
import { DEFAULT_TOOL_OPTIONS } from "@/lib/image/options";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { workspaceToolFacts } from "@/lib/seo/tool-facts";
import { ToolFactsSection } from "@/components/seo/ToolFactsSection";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { CompressFormsSection } from "@/components/tools/CompressFormsSection";
import { CompressTestedSection } from "@/components/tools/CompressTestedSection";
import { CompressTargetLinksSection } from "@/components/tools/CompressTargetLinksSection";
import { MoreToolsSection } from "@/components/tools/MoreToolsSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolPostsSection } from "@/components/tools/ToolPostsSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function CompressTargetPage({ target }: { target: CompressTarget }) {
  const faqs = compressTargetFaqs(target);
  const description = toolPageCopy.compressTargetDescription(target.label);
  const name = toolPageCopy.compressTargetName(target.label);
  const path = compressTargetPath(target.slug);

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
        headline={toolPageCopy.compressTargetHeadline(target.label)}
        description={description}
        tool="compress-image"
        initialOptions={{ compress: { ...DEFAULT_TOOL_OPTIONS.compress, mode: "target", targetKb: target.kb } }}
      />
      <SeoStepsSection
        title={`How to compress an image to ${target.label}`}
        steps={compressTargetSteps(target)}
        intro={compressTargetIntros[target.slug]}
      />
      <CompressTestedSection target={target} />
      <CompressFormsSection target={target} />
      <CompressTargetLinksSection current={target.slug} />
      <ToolFactsSection name={name} description={description} path={path} rows={workspaceToolFacts("compress-image")} />
      <FaqSection items={faqs} />
      <ToolPostsSection tool="compress-image" />
      <RelatedToolsSection pages={seoPagesBySlug(compressTargetGuides)} />
      <MoreToolsSection current={compressTargetHubKey} />
      <AccountBand />
    </>
  );
}
