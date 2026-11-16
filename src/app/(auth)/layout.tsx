import { AuthMedia } from "@/components/auth/AuthMedia";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh flex-1 gap-4 bg-background p-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
      <AuthMedia />
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center justify-between px-2 pt-2">
          <span className="lg:hidden">
            <Logo size="md" />
          </span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        <main className="flex flex-1 items-center justify-center px-2 pt-8 pb-12">{children}</main>
      </div>
    </div>
  );
}
