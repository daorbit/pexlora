import { ArrowLeft, ArrowRight } from "lucide-react";
import { adminCopy } from "@/content/admin";
import { ButtonLink } from "@/components/ui/Button";
import { LinkPendingSpinner } from "@/components/ui/LinkPendingSpinner";

type AdminPaginationProps = { page: number; pageCount: number; hrefFor: (page: number) => string };

export function AdminPagination({ page, pageCount, hrefFor }: AdminPaginationProps) {
  if (pageCount <= 1) return null;
  const copy = adminCopy.users;

  return (
    <nav aria-label={copy.page(page, pageCount)} className="flex items-center justify-between gap-3">
      {page > 1 ? (
        <ButtonLink href={hrefFor(page - 1)} variant="secondary" size="sm">
          <ArrowLeft className="size-3.5" aria-hidden />
          {copy.previous}
          <LinkPendingSpinner className="size-3.5" />
        </ButtonLink>
      ) : (
        <span />
      )}
      <span className="text-[13px] text-secondary tabular-nums">{copy.page(page, pageCount)}</span>
      {page < pageCount ? (
        <ButtonLink href={hrefFor(page + 1)} variant="secondary" size="sm">
          <LinkPendingSpinner className="size-3.5" />
          {copy.next}
          <ArrowRight className="size-3.5" aria-hidden />
        </ButtonLink>
      ) : (
        <span />
      )}
    </nav>
  );
}
