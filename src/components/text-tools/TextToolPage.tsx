import { getTextTool, type TextToolSlug } from "@/config/text-tools";
import { aiToolFaqs, aiToolRelatedGuides } from "@/content/ai";
import { seoPagesBySlug } from "@/content/seo-pages";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { textToolFacts } from "@/lib/seo/tool-facts";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolFactsSection } from "@/components/seo/ToolFactsSection";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { MoreToolsSection } from "@/components/tools/MoreToolsSection";
import { ToolPostsSection } from "@/components/tools/ToolPostsSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { PageIntroHero } from "@/components/tools/PageIntroHero";
import { TextToolWorkspace } from "@/components/text-tools/TextToolWorkspace";

export function TextToolPage({ slug }: { slug: TextToolSlug }) {
  const tool = getTextTool(slug);

  return (
    <>
      <JsonLd
        data={toolStructuredData({
          name: tool.name,
          path: tool.href,
          description: tool.description,
          faqs: aiToolFaqs[slug],
        })}
      />
      <PageIntroHero
        headline={tool.headline}
        description={tool.description}
        wide
      >
        <TextToolWorkspace slug={slug} context="site" />
      </PageIntroHero>
      <ToolFactsSection name={tool.name} description={tool.description} path={tool.href} rows={textToolFacts()} />
      <FaqSection items={aiToolFaqs[slug]} />
      <ToolPostsSection tool={slug} />
      <RelatedToolsSection pages={seoPagesBySlug(aiToolRelatedGuides[slug])} />
      <MoreToolsSection current={slug} />
      <AccountBand />
    </>
  );
}
