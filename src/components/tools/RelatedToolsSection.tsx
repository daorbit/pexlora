import type { HubItem } from "@/config/tool-hub";
import { seoPageIconSrc, seoPagePath, type SeoPage } from "@/content/seo-pages";
import { Section } from "@/components/ui/Section";
import { HubCard } from "@/components/home/HubCard";

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
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.key}>
            <HubCard item={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
