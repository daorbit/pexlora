"use client";

import { useState } from "react";
import { adminReviewCopy } from "@/content/reviews";
import type { ReviewIntent } from "@/lib/validations/reviews";
import { Button } from "@/components/ui/Button";

type ReviewIntentButtonsProps = { intents: ReviewIntent[]; pending: boolean; disabled?: boolean };

export function ReviewIntentButtons({ intents, pending, disabled }: ReviewIntentButtonsProps) {
  const [clicked, setClicked] = useState<ReviewIntent | null>(null);

  return (
    <div className="flex gap-2">
      {intents.map((intent) => (
        <Button
          key={intent}
          type="submit"
          name="intent"
          value={intent}
          variant={intent === "publish" ? "primary" : "secondary"}
          size="sm"
          loading={pending && clicked === intent}
          disabled={pending || disabled}
          onClick={() => setClicked(intent)}
        >
          {adminReviewCopy[intent]}
        </Button>
      ))}
    </div>
  );
}
