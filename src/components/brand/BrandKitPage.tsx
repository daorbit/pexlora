import { Check, X } from "lucide-react";
import { brandAssetsList, brandColorList, brandKitCopy } from "@/content/brand-kit";
import { Container } from "@/components/ui/Container";
import { NoteListCard } from "@/components/ui/NoteListCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalContactCard } from "@/components/legal/LegalContactCard";
import { BrandAssetCard } from "@/components/brand/BrandAssetCard";
import { BrandSection } from "@/components/brand/BrandSection";
import { BrandTypeList } from "@/components/brand/BrandTypeList";
import { ColorSwatch } from "@/components/brand/ColorSwatch";

export function BrandKitPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="flex max-w-5xl flex-col gap-10 sm:gap-14">
        <PageHeader
          eyebrow={brandKitCopy.eyebrow}
          title={brandKitCopy.title}
          highlight={brandKitCopy.highlight}
          lead={brandKitCopy.lead}
        />
        <BrandSection id="logos" title={brandKitCopy.logosTitle}>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {brandAssetsList.map((asset) => (
              <BrandAssetCard key={asset.id} asset={asset} />
            ))}
          </ul>
        </BrandSection>
        <BrandSection id="colours" title={brandKitCopy.colorsTitle}>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {brandColorList.map((color) => (
              <ColorSwatch key={color.id} color={color} />
            ))}
          </ul>
        </BrandSection>
        <BrandSection id="type" title={brandKitCopy.typeTitle}>
          <BrandTypeList />
        </BrandSection>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          <NoteListCard id="brand-do" title={brandKitCopy.doTitle} items={brandKitCopy.dos} icon={Check} iconClassName="text-success" />
          <NoteListCard id="brand-dont" title={brandKitCopy.dontTitle} items={brandKitCopy.donts} icon={X} iconClassName="text-danger" />
        </div>
        <LegalContactCard title={brandKitCopy.contactTitle} body={brandKitCopy.contactBody} />
      </Container>
    </section>
  );
}
