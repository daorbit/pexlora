import { getUtilityTool, type UtilityToolSlug } from "@/config/utility-tools";
import { seoPagesBySlug } from "@/content/seo-pages";
import { utilityFaqs, utilityRelatedGuides } from "@/content/utility-tools";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { utilityToolFacts } from "@/lib/seo/tool-facts";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolFactsSection } from "@/components/seo/ToolFactsSection";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { MoreToolsSection } from "@/components/tools/MoreToolsSection";
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
      <ToolFactsSection name={tool.name} description={tool.description} path={tool.href} rows={utilityToolFacts(slug)} />
      <FaqSection items={utilityFaqs[slug]} />
      <RelatedToolsSection pages={seoPagesBySlug(utilityRelatedGuides[slug])} />
      <MoreToolsSection current={slug} />
      <AccountBand />
    </>
  );
}
