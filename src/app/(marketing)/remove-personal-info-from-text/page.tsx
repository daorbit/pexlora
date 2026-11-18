import { UtilityToolPage } from "@/components/utility/UtilityToolPage";
import { utilityToolMetadata } from "@/lib/seo/tool-metadata";

export const metadata = utilityToolMetadata("remove-personal-info");

export default function RemovePersonalInfoPage() {
  return <UtilityToolPage slug="remove-personal-info" />;
}
