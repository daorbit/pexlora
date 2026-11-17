import Link from "next/link";
import { legalDocuments, type LegalDocument } from "@/content/legal";
import { segmentedChip, segmentedChipsTrack } from "@/components/ui/segmented-styles";

export function LegalNav({ current }: { current: LegalDocument["slug"] }) {
  return (
    <nav aria-label="Legal pages" className="max-w-full">
      <div className={segmentedChipsTrack}>
        {legalDocuments.map((doc) => (
          <Link
            key={doc.slug}
            href={doc.path}
            aria-current={doc.slug === current ? "page" : undefined}
            className={segmentedChip(doc.slug === current)}
          >
            {doc.navLabel}
          </Link>
        ))}
      </div>
    </nav>
  );
}
