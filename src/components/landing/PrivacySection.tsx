import { privacyBadges, privacyCopy, privacyRows } from "@/content/landing";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function PrivacySection() {
  return (
    <section id="privacy" className="scroll-mt-20 pb-16 sm:pb-22">
      <Container>
        <div className="theme-dark grid grid-cols-1 gap-12 rounded-[32px] bg-brand-surface p-8 text-brand-foreground sm:p-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="flex min-w-0 flex-col gap-5">
            <Eyebrow>{privacyCopy.eyebrow}</Eyebrow>
            <h2 className="text-[32px] leading-[1.05] font-semibold tracking-[-0.03em] sm:text-[44px]">
              {privacyCopy.title} <span className="text-primary">{privacyCopy.highlight}</span>
            </h2>
            <p className="max-w-md text-[17px] leading-relaxed text-secondary">{privacyCopy.description}</p>
          </div>
          <ul className="flex min-w-0 flex-col border-t border-separator">
            {privacyRows.map((row) => (
              <li key={row.title} className="flex items-center justify-between gap-5 border-b border-separator py-5">
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="text-base font-semibold">{row.title}</span>
                  <span className="truncate font-mono text-[12.5px] text-secondary">{row.formats}</span>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1.5 text-[13px] font-semibold",
                    row.local ? "bg-primary text-primary-foreground" : "border border-border-strong",
                  )}
                >
                  {row.local ? privacyBadges.local : privacyBadges.server}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
