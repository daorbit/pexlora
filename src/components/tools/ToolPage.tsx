import { otherTools } from "@/config/tool-hub";
import { getWorkspaceTool, toolIconSrc, type WorkspaceToolSlug } from "@/config/tools";
import { toolPageCopy } from "@/content/tool-pages";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { InspectorShowcase } from "@/components/landing/InspectorShowcase";
import { CompressTargetLinksSection } from "@/components/tools/CompressTargetLinksSection";
import { ConversionLinksSection } from "@/components/tools/ConversionLinksSection";
import { HubGridSection } from "@/components/tools/HubGridSection";
import { ToolHero } from "@/components/tools/ToolHero";

const metadataTools: WorkspaceToolSlug[] = ["remove-metadata", "view-metadata", "edit-metadata"];

export function ToolPage({ slug }: { slug: WorkspaceToolSlug }) {
  const tool = getWorkspaceTool(slug);

  return (
    <>
      <ToolHero
        icon={tool.icon}
        iconSrc={toolIconSrc(slug)}
        headline={tool.headline}
        description={tool.description}
        tool={slug}
      />
      {slug === "convert-format" && <ConversionLinksSection />}
      {slug === "compress-image" && <CompressTargetLinksSection />}
      {metadataTools.includes(slug) ? <InspectorShowcase /> : <FeaturesSection />}
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools(slug)} />
      <FaqSection />
      <AccountBand />
    </>
  );
}
