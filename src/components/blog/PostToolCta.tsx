import { routes } from "@/config/site";
import { blogCopy } from "@/content/blog";
import { ButtonLink } from "@/components/ui/Button";

export function PostToolCta() {
  return (
    <aside className="theme-dark ink-panel flex flex-col gap-4 rounded-3xl p-6 text-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-10">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-[11px] tracking-[0.12em] text-secondary uppercase">{blogCopy.cta.eyebrow}</p>
        <h2 className="text-[22px] leading-[1.15] font-semibold tracking-[-0.028em] sm:text-[30px]">{blogCopy.cta.title}</h2>
        <p className="max-w-lg text-[14.5px] leading-relaxed text-secondary sm:text-base">{blogCopy.cta.body}</p>
      </div>
      <ButtonLink href={routes.removeMetadata} variant="primary" size="lg" arrow className="shrink-0 max-sm:w-full">
        {blogCopy.cta.action}
      </ButtonLink>
    </aside>
  );
}
