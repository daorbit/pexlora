import { getWorkspaceTool, type WorkspaceToolSlug } from "@/config/tools";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { InspectorShowcase } from "@/components/landing/InspectorShowcase";
import { ToolsSection } from "@/components/landing/ToolsSection";
import { ToolHero } from "@/components/tools/ToolHero";

const metadataTools: WorkspaceToolSlug[] = ["remove-metadata", "view-metadata"];

export function ToolPage({ slug }: { slug: WorkspaceToolSlug }) {
  const tool = getWorkspaceTool(slug);

  return (
    <>
      <ToolHero icon={tool.icon} headline={tool.headline} description={tool.description} tool={slug} />
      {metadataTools.includes(slug) ? <InspectorShowcase /> : <FeaturesSection />}
      <ToolsSection />
      <FaqSection />
      <AccountBand />
    </>
  );
}
