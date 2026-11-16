import { relatedSeoPages, seoPageIconSrc, type SeoPage } from "@/content/seo-pages";
import { seoPageStructuredData } from "@/lib/seo/structured-data";
import { AccountBand } from "@/components/landing/AccountBand";
import { FaqSection } from "@/components/landing/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ChecklistSection } from "@/components/tools/ChecklistSection";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { SeoIntroSection } from "@/components/tools/SeoIntroSection";
import { ToolHero } from "@/components/tools/ToolHero";

export function SeoToolPage({ page }: { page: SeoPage }) {
  return (
    <>
      <JsonLd data={seoPageStructuredData(page)} />
      <ToolHero
        icon={page.icon}
        iconSrc={seoPageIconSrc(page)}
        headline={page.headline}
        description={page.description}
        tool={page.tool}
        accepts={page.kinds}
      />
      <SeoIntroSection heading={page.intro.heading} paragraphs={page.intro.paragraphs} />
      <ChecklistSection eyebrow={page.list.eyebrow} title={page.list.title} items={page.list.items} />
      <FaqSection items={page.faqs} />
      <RelatedToolsSection pages={relatedSeoPages(page)} />
      <AccountBand />
    </>
  );
}
