import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { conversionIconSrc, conversionPath, conversions } from "@/config/conversions";
import { toolPageCopy } from "@/content/tool-pages";
import { cn } from "@/lib/utils/cn";
import { Section } from "@/components/ui/Section";
import { HubItemIcon } from "@/components/tools/HubItemIcon";

export function ConversionLinksSection({ current }: { current?: string }) {
  return (
    <Section eyebrow={toolPageCopy.conversions.eyebrow} title={toolPageCopy.conversions.title}>
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {conversions.map((conversion) => {
          const active = conversion.slug === current;
          return (
            <li key={conversion.slug}>
              <Link
                href={conversionPath(conversion.slug)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl border p-2 pr-3.5 text-sm font-semibold transition-colors",
                  active
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-separator bg-surface hover:border-border-strong",
                )}
              >
                <HubItemIcon src={conversionIconSrc(conversion.slug)} size="sm" />
                <span className="flex-1">{conversion.name}</span>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
