import { seoPagePath, type SeoPage } from "@/content/seo-pages";
import { Section } from "@/components/ui/Section";
import { ToolCard } from "@/components/tools/ToolCard";

export function RelatedToolsSection({ pages }: { pages: SeoPage[] }) {
  if (!pages.length) return null;

  return (
    <Section eyebrow="Related tools" title="More ways to clean your files." className="border-t border-separator">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pages.map((page) => (
          <ToolCard key={page.slug} icon={page.icon} name={page.name} description={page.description} href={seoPagePath(page)} />
        ))}
      </div>
    </Section>
  );
}
