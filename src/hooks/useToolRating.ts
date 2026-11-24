"use client";

import { useState, useTransition } from "react";
import { submitRating, submitReviewComment, type ReviewResult } from "@/actions/reviews";
import type { WorkspaceToolSlug } from "@/config/tools";
import { reviewCopy } from "@/content/reviews";
import { useDismissed } from "@/hooks/useDismissed";
import { toast } from "@/lib/toast/store";

export type RatingStep = "ask" | "comment" | "closed";

export function useToolRating(tool: WorkspaceToolSlug) {
  const [rated, markRated] = useDismissed(`rated:${tool}`);
  const [step, setStep] = useState<RatingStep>("ask");
  const [rating, setRating] = useState(0);
  const [submissionKey, setSubmissionKey] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const send = (request: () => Promise<ReviewResult>, onDone: (result: ReviewResult) => void) =>
    startTransition(async () => {
      try {
        onDone(await request());
      } catch {
        onDone({ ok: false, message: reviewCopy.failed });
      }
    });

  const close = () => {
    markRated();
    setStep("closed");
  };

  const rate = (value: number) => {
    const key = submissionKey ?? crypto.randomUUID();
    setSubmissionKey(key);
    setRating(value);
    send(
      () => submitRating({ key, tool, rating: value }),
      (result) => {
        if (!result.ok) {
          setRating(0);
          toast.error(result.message);
        } else if (result.saved) {
          markRated();
          setStep("comment");
        } else {
          toast.info(reviewCopy.notSaved);
          close();
        }
      },
    );
  };

  const comment = (details: { comment: string; name: string; consent: boolean }) => {
    if (!submissionKey) return;
    send(
      () => submitReviewComment({ key: submissionKey, ...details }),
      (result) => {
        if (!result.ok) return void toast.error(result.message);
        toast.success(reviewCopy.thanks);
        close();
      },
    );
  };

  const skip = () => {
    toast.success(reviewCopy.thanks);
    close();
  };

  return { step: rated && step === "ask" && !rating ? "closed" : step, rating, pending, rate, comment, skip, close };
}
