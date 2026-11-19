import { otherTools } from "@/config/tool-hub";
import { getWorkspaceTool, type ToolCategory, type WorkspaceToolSlug } from "@/config/tools";
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
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolHero } from "@/components/tools/ToolHero";

const metadataTools: WorkspaceToolSlug[] = ["remove-metadata", "view-metadata", "edit-metadata"];
const documentCategories: ToolCategory[] = ["pdf", "convert"];

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
          category:
            metadataTools.includes(slug) || documentCategories.includes(tool.category) ? "UtilitiesApplication" : "MultimediaApplication",
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
      <SeoStepsSection title={`How to use the ${tool.name}`} steps={guide.steps} intro={guide.intro} />
      {metadataTools.includes(slug) ? <InspectorShowcase /> : !documentCategories.includes(tool.category) && <FeaturesSection />}
      <FaqSection items={guide.faqs} />
      <RelatedToolsSection pages={seoPagesBySlug(guide.relatedGuides)} />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools(slug)} />
      <AccountBand />
    </>
  );
}
