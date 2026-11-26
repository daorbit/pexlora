import Link from "next/link";
import { adminReviewsPath } from "@/config/admin";
import { ADMIN_REVIEW_FILTERS, type AdminReviewFilter } from "@/config/reviews";
import { adminReviewCopy } from "@/content/reviews";
import { LinkPendingSpinner } from "@/components/ui/LinkPendingSpinner";
import { segmentedChip, segmentedChipsTrack } from "@/components/ui/segmented-styles";

type AdminReviewFiltersProps = { current: AdminReviewFilter; counts: Record<AdminReviewFilter, number> };

export function AdminReviewFilters({ current, counts }: AdminReviewFiltersProps) {
  return (
    <nav aria-label={adminReviewCopy.filterLabel} className="self-start">
      <ul className={segmentedChipsTrack}>
        {ADMIN_REVIEW_FILTERS.map((filter) => (
          <li key={filter}>
            <Link
              href={adminReviewsPath({ filter })}
              aria-current={filter === current ? "page" : undefined}
              className={segmentedChip(filter === current)}
            >
              {adminReviewCopy.filters[filter]}
              <span className="tabular-nums opacity-70">{counts[filter]}</span>
              <LinkPendingSpinner className="size-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
