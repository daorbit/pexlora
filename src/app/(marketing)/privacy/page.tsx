import { privacyPolicy } from "@/content/legal/privacy";
import { legalMetadata } from "@/lib/seo/legal-metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = legalMetadata(privacyPolicy);

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
