import { routes } from "@/config/site";
import { getCurrentUser } from "@/lib/auth/dal";
import { ButtonLink } from "@/components/ui/Button";
import { UserMenu } from "@/components/layout/UserMenu";

export async function HeaderAuth() {
  const user = await getCurrentUser().catch(() => null);

  if (user) return <UserMenu name={user.name} avatarUrl={user.avatarUrl} />;

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <ButtonLink href={routes.signIn} variant="nav" className="hidden px-3 sm:inline-flex">
        Sign In
      </ButtonLink>
      <ButtonLink href={routes.signUp} size="sm" arrow>
        Get Started
      </ButtonLink>
    </div>
  );
}

export function HeaderAuthFallback() {
  return <div className="h-8 w-36 animate-pulse rounded-full bg-fill" />;
}
