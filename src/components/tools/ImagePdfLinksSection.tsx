import { imagePdfPath, imagePdfVariants } from "@/config/image-pdf-variants";
import { getWorkspaceTool, toolIconSrc } from "@/config/tools";
import { toolPageCopy } from "@/content/tool-pages";
import { Section } from "@/components/ui/Section";
import { LinkTile } from "@/components/tools/LinkTile";

const links = [
  { href: getWorkspaceTool("jpg-to-pdf").href, label: toolPageCopy.imagePdfName("JPG") },
  ...imagePdfVariants.map((variant) => ({
    href: imagePdfPath(variant.slug),
    label: toolPageCopy.imagePdfName(variant.from),
  })),
];

export function ImagePdfLinksSection({ current }: { current: string }) {
  return (
    <Section eyebrow={toolPageCopy.imagePdfLinks.eyebrow} title={toolPageCopy.imagePdfLinks.title}>
      <ul className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {links.map((link) => (
          <li key={link.href}>
            <LinkTile href={link.href} iconSrc={toolIconSrc("jpg-to-pdf")} label={link.label} active={link.href === current} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
