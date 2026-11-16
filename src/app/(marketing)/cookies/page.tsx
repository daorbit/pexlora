import { cookiePolicy } from "@/content/legal/cookies";
import { legalMetadata } from "@/lib/seo/legal-metadata";
import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = legalMetadata(cookiePolicy);

export default function CookiesPage() {
  return <LegalPage doc={cookiePolicy} />;
}
