import type { CompressTarget } from "@/config/compress-targets";
import { compressGuideCopy } from "@/content/compress-target-guides";
import { measuredRows } from "@/lib/seo/compress-guide";
import { FactsSection } from "@/components/seo/FactsSection";

export function CompressTestedSection({ target }: { target: CompressTarget }) {
  const rows = measuredRows(target);
  if (!rows.length) return null;

  const { tested } = compressGuideCopy;
  return (
    <FactsSection
      id="tested"
      eyebrow={tested.eyebrow}
      title={tested.title(target.label)}
      summary={tested.summary(target.label)}
      caption={tested.caption(target.label)}
      rows={rows}
    />
  );
}
