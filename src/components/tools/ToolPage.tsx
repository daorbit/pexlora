import { otherTools } from "@/config/tool-hub";
import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { seoPagesBySlug } from "@/content/seo-pages";
import { toolGuides } from "@/content/tool-guides";
import { toolPageCopy } from "@/content/tool-pages";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { InspectorShowcase } from "@/components/landing/InspectorShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { CompressTargetLinksSection } from "@/components/tools/CompressTargetLinksSection";
import { FormPresetLinksSection } from "@/components/tools/FormPresetLinksSection";
import { ConversionLinksSection } from "@/components/tools/ConversionLinksSection";
import { HubGridSection } from "@/components/tools/HubGridSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoIntroSection } from "@/components/tools/SeoIntroSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolHero } from "@/components/tools/ToolHero";

const metadataTools: WorkspaceToolSlug[] = ["remove-metadata", "view-metadata", "edit-metadata"];

export function ToolPage({ slug }: { slug: WorkspaceToolSlug }) {
  const tool = getWorkspaceTool(slug);
  const guide = toolGuides[slug];

  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name: tool.name,
          path: tool.href,
          description: tool.description,
          faqs: guide.faqs,
          category: metadataTools.includes(slug) || tool.category === "pdf" ? "UtilitiesApplication" : "MultimediaApplication",
        })}
      />
      <ToolHero
        headline={tool.headline}
        description={tool.description}
        tool={slug}
      />
      {slug === "convert-format" && <ConversionLinksSection />}
      {slug === "compress-image" && <CompressTargetLinksSection />}
      {slug === "form-photo" && <FormPresetLinksSection />}
      <SeoIntroSection heading={guide.intro.heading} paragraphs={guide.intro.paragraphs} />
      <SeoStepsSection title={`How to use the ${tool.name}`} steps={guide.steps} />
      {metadataTools.includes(slug) ? <InspectorShowcase /> : tool.category !== "pdf" && <FeaturesSection />}
      <FaqSection items={guide.faqs} />
      <RelatedToolsSection pages={seoPagesBySlug(guide.relatedGuides)} />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools(slug)} />
      <AccountBand />
    </>
  );
}
