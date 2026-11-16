import { securityPage } from "@/content/legal/security";
import { legalMetadata } from "@/lib/seo/legal-metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = legalMetadata(securityPage);

export default function SecurityPage() {
  return <LegalPage doc={securityPage} />;
}
