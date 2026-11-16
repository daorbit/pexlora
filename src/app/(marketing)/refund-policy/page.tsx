import { refundPolicy } from "@/content/legal/refund-policy";
import { legalMetadata } from "@/lib/seo/legal-metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = legalMetadata(refundPolicy);

export default function RefundPolicyPage() {
  return <LegalPage doc={refundPolicy} />;
}
