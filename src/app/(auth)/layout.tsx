import Link from "next/link";
import { X } from "lucide-react";
import { routes } from "@/config/site";
import { authCopy } from "@/content/auth";
import { AuthStage, AuthStageCompact } from "@/components/auth/AuthStage";
import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh flex-1 bg-background text-foreground lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-4 lg:p-4">
      <AuthStage />
      <div className="flex min-w-0 flex-col">
        <header className="flex h-12 items-center justify-between px-4 lg:h-16 lg:justify-end lg:px-2">
          <span className="lg:hidden">
            <Logo size="md" />
          </span>
          <Link
            href={routes.home}
            aria-label={authCopy.close}
            title={authCopy.close}
            className="inline-flex size-9 items-center justify-center rounded-full border border-separator bg-surface text-secondary transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:size-10"
          >
            <X className="size-4.5" aria-hidden />
          </Link>
        </header>
        <div className="px-3 lg:hidden">
          <AuthStageCompact />
        </div>
        <main className="flex flex-1 justify-center px-4 pt-5 pb-4 lg:items-center lg:pt-0 lg:pb-16">{children}</main>
      </div>
    </div>
  );
}
