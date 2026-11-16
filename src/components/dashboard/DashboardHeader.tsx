import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { routes } from "@/config/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { UsagePill } from "@/components/dashboard/UsagePill";

export function DashboardHeader({ mobileNav }: { mobileNav: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-separator bg-background px-4 sm:px-8">
      <div className="flex min-w-0 items-center gap-2">
        {mobileNav}
        <PageTitle />
      </div>
      <div className="flex items-center gap-2">
        <Suspense fallback={null}>
          <UsagePill />
        </Suspense>
        <Link
          href={routes.home}
          className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] text-secondary transition-colors hover:bg-fill hover:text-foreground md:inline-flex"
        >
          Website
          <ExternalLink className="size-3.5" aria-hidden />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
