import Link from "next/link";
import { siteConfig } from "@/config/site";
import { footerColumns, footerCopy, footerLegalLinks } from "@/content/footer";
import { Container } from "@/components/ui/Container";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { Logo } from "@/components/layout/Logo";
import { HousePromoCard } from "@/components/promo/HousePromoCard";
import { LanguageMenu } from "@/components/language/LanguageMenu";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import { housePromos } from "@/config/house-promos";

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
    <footer className="theme-dark overflow-hidden ink-panel pb-[env(safe-area-inset-bottom)] text-foreground">
      <Container className="flex flex-col gap-10 border-b border-separator py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-xl flex-col gap-5">
          <Logo size="lg" />
          <h2 className="text-[32px] leading-[1.06] font-semibold tracking-[-0.03em] sm:text-[44px]">{footerCopy.title}</h2>
          <p className="text-[17px] leading-relaxed text-secondary">{footerCopy.description}</p>
        </div>
        <HousePromoCard promo={housePromos.footer} placement="footer" className="w-full max-w-sm" />
      </Container>

      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:grid-cols-3 sm:py-16 lg:grid-cols-6">
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

      <Container aria-hidden className="pt-2">
        <p className="text-center text-[21vw] leading-[1.1] font-bold tracking-[-0.05em] text-fill-strong select-none lg:text-[17rem]">
          {siteConfig.name}
        </p>
      </Container>

      <Container className="flex flex-col-reverse items-start justify-between gap-4 border-t border-separator py-7 sm:flex-row sm:items-center sm:pb-9">
        <div className="flex flex-col gap-3">
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-[13px] font-medium text-secondary transition-colors hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-[13px] text-secondary">
            © <CurrentYear /> {siteConfig.name} · {footerCopy.productOf}. {footerCopy.legal}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <LanguageMenu className="-ml-2.5" />
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-secondary">{footerCopy.darkMode}</span>
            <ThemeSwitch />
          </div>
        </div>
      </Container>
    </footer>
  );
}
