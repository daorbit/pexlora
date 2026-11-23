import { allToolsHref, relatedTools } from "@/config/tool-hub";
import { navCopy } from "@/content/navigation";
import { toolPageCopy } from "@/content/tool-pages";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { HubCardGrid } from "@/components/home/HubCardGrid";

const PHONE_TILES = 6;

export function MoreToolsSection({ current }: { current: string }) {
  const { eyebrow, title } = toolPageCopy.moreTools;

  return (
    <Section eyebrow={eyebrow} title={title} tone="surface">
      <div className="flex flex-col items-center gap-3 sm:gap-8">
        <HubCardGrid label={title} items={relatedTools(current)} phoneLimit={PHONE_TILES} />
        <ButtonLink href={allToolsHref()} variant="secondary" size="md" arrow className="max-sm:w-full">
          {navCopy.viewAll}
        </ButtonLink>
      </div>
    </Section>
  );
}
