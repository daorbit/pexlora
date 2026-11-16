import { compressTargetIconSrc, compressTargetPath, compressTargets } from "@/config/compress-targets";
import { toolPageCopy } from "@/content/tool-pages";
import { Section } from "@/components/ui/Section";
import { LinkTile } from "@/components/tools/LinkTile";

export function CompressTargetLinksSection({ current }: { current?: string }) {
  return (
    <Section eyebrow={toolPageCopy.compressTargets.eyebrow} title={toolPageCopy.compressTargets.title}>
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        {compressTargets.map((target) => (
          <li key={target.slug}>
            <LinkTile
              href={compressTargetPath(target.slug)}
              iconSrc={compressTargetIconSrc}
              label={toolPageCopy.compressTargetLink(target.label)}
              active={target.slug === current}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
