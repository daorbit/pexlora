import Link from "next/link";
import { legalDocuments, type LegalDocument } from "@/content/legal";
import { segmentedItem, segmentedTrack } from "@/components/ui/segmented-styles";

export function LegalNav({ current }: { current: LegalDocument["slug"] }) {
  return (
    <nav aria-label="Legal pages" className="max-w-full overflow-x-auto">
      <div className={segmentedTrack}>
        {legalDocuments.map((doc) => (
          <Link
            key={doc.slug}
            href={doc.path}
            aria-current={doc.slug === current ? "page" : undefined}
            className={segmentedItem(doc.slug === current)}
          >
            {doc.navLabel}
          </Link>
        ))}
      </div>
    </nav>
  );
}
