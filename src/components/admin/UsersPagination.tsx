import { ArrowLeft, ArrowRight } from "lucide-react";
import { adminUsersPath } from "@/config/admin";
import { adminCopy } from "@/content/admin";
import { ButtonLink } from "@/components/ui/Button";

type UsersPaginationProps = { query: string; page: number; pageCount: number };

export function UsersPagination({ query, page, pageCount }: UsersPaginationProps) {
  if (pageCount <= 1) return null;
  const copy = adminCopy.users;

  return (
    <nav aria-label={copy.page(page, pageCount)} className="flex items-center justify-between gap-3">
      {page > 1 ? (
        <ButtonLink href={adminUsersPath({ query, page: page - 1 })} variant="secondary" size="sm">
          <ArrowLeft className="size-3.5" aria-hidden />
          {copy.previous}
        </ButtonLink>
      ) : (
        <span />
      )}
      <span className="text-[13px] text-secondary tabular-nums">{copy.page(page, pageCount)}</span>
      {page < pageCount ? (
        <ButtonLink href={adminUsersPath({ query, page: page + 1 })} variant="secondary" size="sm">
          {copy.next}
          <ArrowRight className="size-3.5" aria-hidden />
        </ButtonLink>
      ) : (
        <span />
      )}
    </nav>
  );
}
