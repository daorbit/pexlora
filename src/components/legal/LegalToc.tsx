import type { LegalDocument } from "@/content/legal";
import { legalCopy } from "@/content/legal";
import { TableOfContents } from "@/components/ui/TableOfContents";

export function LegalToc({ sections }: { sections: LegalDocument["sections"] }) {
  return (
    <TableOfContents
      label={legalCopy.contents}
      items={sections.map((section) => ({ id: section.id, label: section.heading }))}
      numbered
      className="sticky top-24 hidden self-start lg:flex"
    />
  );
}
