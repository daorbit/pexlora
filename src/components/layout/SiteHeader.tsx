import { Suspense } from "react";
import { navLinks } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { HeaderAuth, HeaderAuthFallback } from "@/components/layout/HeaderAuth";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-separator bg-surface/90 text-foreground backdrop-blur-md">
      <Container className="grid h-14 grid-cols-[1fr_auto] items-center gap-3 sm:gap-6 md:grid-cols-[1fr_auto_1fr]">
        <Logo size="md" />
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-secondary transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-1 sm:gap-1.5">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Suspense fallback={<HeaderAuthFallback />}>
            <HeaderAuth />
          </Suspense>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
