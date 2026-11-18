import { toolItem } from "@/config/tool-hub";
import { blogCopy } from "@/content/blog";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

const CTA_TOOL = "remove-metadata";

export function PostToolCta() {
  const tool = toolItem(CTA_TOOL);
  if (!tool) return null;

  return (
    <Card className="flex flex-col gap-5 rounded-3xl border-0 p-5 shadow-card sm:flex-row sm:items-center sm:gap-6 sm:p-8">
      <HubItemIcon src={tool.iconSrc} size="xl" />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="text-xs font-semibold tracking-[0.12em] text-tertiary uppercase">{blogCopy.cta.eyebrow}</p>
        <h2 className="text-[20px] leading-[1.2] font-semibold tracking-[-0.028em] sm:text-[26px]">{blogCopy.cta.title}</h2>
        <p className="max-w-xl text-[14.5px] leading-relaxed text-secondary sm:text-[15.5px]">{blogCopy.cta.body}</p>
      </div>
      <ButtonLink href={tool.href} variant="ink" size="lg" arrow className="shrink-0 max-sm:w-full">
        {blogCopy.cta.action}
      </ButtonLink>
    </Card>
  );
}
