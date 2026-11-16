import { seoPageIconSrc, seoPagePath, type SeoPage } from "@/content/seo-pages";
import { Section } from "@/components/ui/Section";
import { HubCard } from "@/components/home/HubCard";

export function RelatedToolsSection({ pages }: { pages: SeoPage[] }) {
  if (!pages.length) return null;

  return (
    <Section eyebrow="Related tools" title="More ways to clean your files." className="border-t border-separator">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pages.map((page) => (
          <li key={page.slug}>
            <HubCard
              item={{
                key: page.slug,
                name: page.name,
                description: page.description,
                href: seoPagePath(page),
                iconSrc: seoPageIconSrc(page),
                category: "metadata",
              }}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
