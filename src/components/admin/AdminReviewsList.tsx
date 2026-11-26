"use client";

import { useActionState, useState } from "react";
import { moderateSelectedReviews } from "@/actions/admin-reviews";
import { adminReviewCopy } from "@/content/reviews";
import type { ReviewIntent } from "@/lib/validations/reviews";
import type { ReviewItem } from "@/services/review.service";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { FormStatus } from "@/components/dashboard/account/FormStatus";
import { AdminReviewRow } from "@/components/admin/AdminReviewRow";
import { ReviewIntentButtons } from "@/components/admin/ReviewIntentButtons";

const bulkIntents: ReviewIntent[] = ["publish", "hide", "delete"];

export function AdminReviewsList({ reviews }: { reviews: ReviewItem[] }) {
  const [picked, setPicked] = useState<ReadonlySet<string>>(new Set());
  const [state, formAction, pending] = useActionState(moderateSelectedReviews, undefined);
  const [handled, setHandled] = useState(state);

  if (state !== handled) {
    setHandled(state);
    if (state?.status === "success") setPicked(new Set());
  }

  const selected = reviews.filter((review) => picked.has(review.id)).map((review) => review.id);
  const allSelected = selected.length === reviews.length;

  const toggle = (id: string, on: boolean) =>
    setPicked((current) => {
      const next = new Set(current);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });

  return (
    <Card className="overflow-hidden">
      <form
        action={formAction}
        className="flex flex-col gap-3 border-b border-separator bg-subtle px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"
      >
        {selected.map((id) => (
          <input key={id} type="hidden" name="id" value={id} />
        ))}
        <div className="flex items-center gap-3">
          <Checkbox
            label={adminReviewCopy.selectPage}
            hideLabel
            checked={allSelected}
            indeterminate={selected.length > 0}
            onChange={(on) => setPicked(new Set(on ? reviews.map((review) => review.id) : []))}
          />
          <span className="text-[13px] font-medium text-secondary tabular-nums">{adminReviewCopy.selected(selected.length)}</span>
          {selected.length > 0 && (
            <Button variant="plain" size="sm" onClick={() => setPicked(new Set())}>
              {adminReviewCopy.clear}
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <FormStatus state={state} />
          <ReviewIntentButtons intents={bulkIntents} pending={pending} disabled={!selected.length} />
        </div>
      </form>
      <ul className="divide-y divide-separator">
        {reviews.map((review) => (
          <AdminReviewRow
            key={review.id}
            review={review}
            selected={picked.has(review.id)}
            onSelect={(on) => toggle(review.id, on)}
          />
        ))}
      </ul>
    </Card>
  );
}
