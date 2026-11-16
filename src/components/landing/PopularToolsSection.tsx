import { popularToolsCopy } from "@/content/landing";
import { seoPageIconSrc, seoPagePath, seoPages } from "@/content/seo-pages";
import { Section } from "@/components/ui/Section";
import { ToolLinkCard } from "@/components/tools/ToolLinkCard";

export function PopularToolsSection() {
  return (
    <Section
      id="tools"
      align="left"
      eyebrow={popularToolsCopy.eyebrow}
      title={popularToolsCopy.title}
      description={popularToolsCopy.description}
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {seoPages.map((page) => (
          <li key={page.slug} className="min-w-0">
            <ToolLinkCard
              href={seoPagePath(page)}
              iconSrc={seoPageIconSrc(page)}
              name={page.name}
              description={page.description}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
