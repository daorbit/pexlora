import { getTextTool, type TextToolSlug } from "@/config/text-tools";
import { otherTools } from "@/config/tool-hub";
import { aiToolFaqs, aiToolRelatedGuides } from "@/content/ai";
import { seoPagesBySlug } from "@/content/seo-pages";
import { toolPageCopy } from "@/content/tool-pages";
import { toolStructuredData } from "@/lib/seo/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { HubGridSection } from "@/components/tools/HubGridSection";
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
      <FaqSection items={aiToolFaqs[slug]} />
      <RelatedToolsSection pages={seoPagesBySlug(aiToolRelatedGuides[slug])} />
      <HubGridSection {...toolPageCopy.moreTools} items={otherTools(slug)} />
      <AccountBand />
    </>
  );
}
