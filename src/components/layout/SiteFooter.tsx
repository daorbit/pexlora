import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerColumns, footerCopy } from "@/content/footer";
import { Container } from "@/components/ui/Container";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { Logo } from "@/components/layout/Logo";

const linkClasses = "text-[15px] text-secondary transition-colors hover:text-foreground";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.includes("#")) {
    return (
      <a href={href} className={linkClasses}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClasses}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="theme-dark overflow-hidden bg-background pb-[env(safe-area-inset-bottom)] text-foreground">
      <Container className="border-b border-separator py-16 sm:py-20">
        <div className="flex max-w-xl flex-col gap-5">
          <Logo size="lg" />
          <h2 className="text-[32px] leading-[1.06] font-semibold tracking-[-0.03em] sm:text-[44px]">{footerCopy.title}</h2>
          <p className="text-[17px] leading-relaxed text-secondary">{footerCopy.description}</p>
        </div>
      </Container>

      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:py-16 lg:grid-cols-4">
        {footerColumns.map((column) => (
          <div key={column.title} className="flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-[0.12em] text-primary uppercase">{column.title}</p>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <Container className="flex flex-col-reverse items-start justify-between gap-4 border-t border-separator py-7 sm:flex-row sm:items-center">
        <p className="text-[13px] text-secondary">
          © <CurrentYear /> {siteConfig.name}. {footerCopy.legal}
        </p>
        <ThemeSwitcher />
      </Container>

      <Container aria-hidden className="pt-2 pb-8 sm:pb-12">
        <p className="text-center text-[21vw] leading-[1.1] font-bold tracking-[-0.05em] text-fill-strong select-none lg:text-[17rem]">
          {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
