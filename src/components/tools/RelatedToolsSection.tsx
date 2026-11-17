import type { HubItem } from "@/config/tool-hub";
import { seoPageIconSrc, seoPagePath, type SeoPage } from "@/content/seo-pages";
import { Section } from "@/components/ui/Section";
import { HubCardCarousel } from "@/components/home/HubCardCarousel";

type RelatedToolsSectionProps = { pages: SeoPage[]; leading?: HubItem };

function guideItem(page: SeoPage): HubItem {
  return {
    key: page.slug,
    name: page.name,
    description: page.description,
    href: seoPagePath(page),
    iconSrc: seoPageIconSrc(page),
    category: "metadata",
  };
}

export function RelatedToolsSection({ pages, leading }: RelatedToolsSectionProps) {
  const items = [...(leading ? [leading] : []), ...pages.map(guideItem)];
  if (!items.length) return null;

  return (
    <Section eyebrow="Related tools" title="More ways to clean your files." className="border-t border-separator">
      <HubCardCarousel label="Related tools" items={items} />
    </Section>
  );
}
