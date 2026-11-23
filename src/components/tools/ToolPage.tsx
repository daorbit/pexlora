import { getWorkspaceTool, type ToolCategory, type WorkspaceToolSlug } from "@/config/tools";
import { seoPagesBySlug } from "@/content/seo-pages";
import { toolGuides } from "@/content/tool-guides";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { workspaceToolFacts } from "@/lib/seo/tool-facts";
import { ToolFactsSection } from "@/components/seo/ToolFactsSection";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { InspectorShowcase } from "@/components/landing/InspectorShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { CompressTargetLinksSection } from "@/components/tools/CompressTargetLinksSection";
import { FormPresetLinksSection } from "@/components/tools/FormPresetLinksSection";
import { ConversionLinksSection } from "@/components/tools/ConversionLinksSection";
import { ImagePdfLinksSection } from "@/components/tools/ImagePdfLinksSection";
import { MoreToolsSection } from "@/components/tools/MoreToolsSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoStepsSection } from "@/components/tools/SeoStepsSection";
import { ToolPostsSection } from "@/components/tools/ToolPostsSection";
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
      {slug === "jpg-to-pdf" && <ImagePdfLinksSection current={tool.href} />}
      <SeoStepsSection title={`How to use the ${tool.name}`} steps={guide.steps} intro={guide.intro} />
      {metadataTools.includes(slug) ? <InspectorShowcase /> : !documentCategories.includes(tool.category) && <FeaturesSection />}
      <ToolFactsSection name={tool.name} description={tool.description} path={tool.href} rows={workspaceToolFacts(slug)} />
      <FaqSection items={guide.faqs} />
      <ToolPostsSection tool={slug} />
      <RelatedToolsSection pages={seoPagesBySlug(guide.relatedGuides)} />
      <MoreToolsSection current={slug} />
      <AccountBand />
    </>
  );
}
