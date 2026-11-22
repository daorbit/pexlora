import { aboutCopy } from "@/content/about";
import { PageHeader } from "@/components/ui/PageHeader";

export function AboutHeader() {
  return <PageHeader eyebrow={aboutCopy.eyebrow} title={aboutCopy.title} highlight={aboutCopy.highlight} lead={aboutCopy.lead} />;
}
