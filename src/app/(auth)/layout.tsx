import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { routes } from "@/config/site";
import { authCopy } from "@/content/auth";
import { Logo } from "@/components/layout/Logo";
import { noIndexMetadata } from "@/lib/seo/page-metadata";

export const metadata = noIndexMetadata;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-background text-foreground">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-separator px-4 pt-[env(safe-area-inset-top)] sm:h-16 sm:px-8">
        <Logo size="md" />
        <Link
          href={routes.home}
          className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-secondary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {authCopy.backToTools}
        </Link>
      </header>
      <main className="flex flex-1 justify-center px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:items-center sm:pt-10 sm:pb-16">
        {children}
      </main>
    </div>
  );
}
