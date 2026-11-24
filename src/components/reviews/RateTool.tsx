"use client";

import { X } from "lucide-react";
import type { WorkspaceToolSlug } from "@/config/tools";
import { reviewCopy } from "@/content/reviews";
import { useToolRating } from "@/hooks/useToolRating";
import { Button } from "@/components/ui/Button";
import { ReviewCommentForm } from "@/components/reviews/ReviewCommentForm";
import { StarPicker } from "@/components/reviews/StarPicker";

export function RateTool({ tool }: { tool: WorkspaceToolSlug }) {
  const { step, rating, pending, rate, comment, skip, close } = useToolRating(tool);
  if (step === "closed") return null;

  const asking = step === "ask";

  return (
    <section
      aria-label={reviewCopy.groupLabel}
      className="flex flex-col gap-2 rounded-2xl bg-fill p-3.5 motion-safe:animate-fade-up motion-safe:[animation-duration:0.4s]"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">{asking ? reviewCopy.title : reviewCopy.commentTitle}</p>
        <Button variant="icon" size="sm" aria-label={reviewCopy.dismiss} onClick={close}>
          <X className="size-4" aria-hidden />
        </Button>
      </div>
      {asking ? (
        <StarPicker value={rating} disabled={pending} onPick={rate} />
      ) : (
        <ReviewCommentForm pending={pending} onSend={comment} onSkip={skip} />
      )}
    </section>
  );
}
