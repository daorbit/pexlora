import { getUtilityTool, type UtilityToolSlug } from "@/config/utility-tools";
import { otherTools } from "@/config/tool-hub";
import { seoPagesBySlug } from "@/content/seo-pages";
import { toolPageCopy } from "@/content/tool-pages";
import { utilityFaqs, utilityRelatedGuides } from "@/content/utility-tools";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { HubGridSection } from "@/components/tools/HubGridSection";
import { PageIntroHero } from "@/components/tools/PageIntroHero";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { UtilityWorkspace } from "@/components/utility/UtilityWorkspace";

export function UtilityToolPage({ slug }: { slug: UtilityToolSlug }) {
  const tool = getUtilityTool(slug);

  return (
    <>
      <JsonLd data={toolStructuredData({ name: tool.name, path: tool.href, description: tool.description, faqs: utilityFaqs[slug] })} />
      <PageIntroHero headline={tool.headline} description={tool.description} wide>
        <UtilityWorkspace slug={slug} />
      </PageIntroHero>
      <FaqSection items={utilityFaqs[slug]} />
      <RelatedToolsSection pages={seoPagesBySlug(utilityRelatedGuides[slug])} />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools(slug)} />
      <AccountBand />
    </>
  );
}
