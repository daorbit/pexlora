import Link from "next/link";
import { routes } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/UserAvatar";

export function UserMenu({ name, avatarUrl }: { name: string; avatarUrl?: string }) {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5">
      <ButtonLink href={routes.dashboard} size="sm" arrow className="h-7.5 text-xs sm:h-8 sm:text-[13px]">
        Dashboard
      </ButtonLink>
      <Link href={routes.dashboardSettings} aria-label="Account settings" title={name}>
        <UserAvatar name={name} avatarUrl={avatarUrl} size="sm" />
      </Link>
    </div>
  );
}
