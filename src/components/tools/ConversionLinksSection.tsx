import { conversionIconSrc, conversionPath, conversions } from "@/config/conversions";
import { toolPageCopy } from "@/content/tool-pages";
import { Section } from "@/components/ui/Section";
import { LinkTile } from "@/components/tools/LinkTile";

export function ConversionLinksSection({ current }: { current?: string }) {
  return (
    <Section eyebrow={toolPageCopy.conversions.eyebrow} title={toolPageCopy.conversions.title}>
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {conversions.map((conversion) => (
          <li key={conversion.slug}>
            <LinkTile
              href={conversionPath(conversion.slug)}
              iconSrc={conversionIconSrc(conversion.slug)}
              label={conversion.name}
              active={conversion.slug === current}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
