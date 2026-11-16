import Link from "next/link";
import { routes } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/UserAvatar";

export function UserMenu({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <ButtonLink href={routes.dashboard} size="sm" arrow>
        Dashboard
      </ButtonLink>
      <Link href={routes.dashboardSettings} aria-label="Account settings" title={name}>
        <UserAvatar name={name} avatarUrl={avatarUrl} size="xs" />
      </Link>
    </div>
  );
}
