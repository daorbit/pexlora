import { proofCopy } from "@/content/social-proof";
import { getRatingSummary } from "@/lib/stats/social-proof";
import { ProofRow, type ProofItem } from "@/components/social-proof/ProofRow";
import { RatingSummary } from "@/components/social-proof/RatingSummary";

const ITEMS_SHOWN = 2;

export async function SiteProof({ items }: { items: ProofItem[] }) {
  const rating = await getRatingSummary();
  const all = rating ? [{ id: "rating", content: <RatingSummary rating={rating} /> }, ...items] : items;
  return <ProofRow label={proofCopy.label} items={all.slice(0, ITEMS_SHOWN)} />;
}
