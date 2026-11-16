import { termsOfService } from "@/content/legal/terms";
import { legalMetadata } from "@/lib/seo/legal-metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = legalMetadata(termsOfService);

export default function TermsPage() {
  return <LegalPage doc={termsOfService} />;
}
