"use client";

import { useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { REVIEW_TEXT_LIMITS } from "@/config/reviews";
import { reviewCopy } from "@/content/reviews";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { CheckboxOption } from "@/components/workspace/options/CheckboxOption";
import { OptionGroup } from "@/components/workspace/options/OptionsBar";
import { optionFieldShell } from "@/components/workspace/options/styles";
import { TextOption } from "@/components/workspace/options/TextOption";

type ReviewCommentFormProps = {
  pending: boolean;
  onSend: (details: { comment: string; name: string; consent: boolean }) => void;
  onSkip: () => void;
};

export function ReviewCommentForm({ pending, onSend, onSkip }: ReviewCommentFormProps) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (comment.trim()) onSend({ comment, name, consent });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 motion-safe:animate-fade-in">
      <OptionGroup as="label" label={reviewCopy.commentLabel}>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder={reviewCopy.commentPlaceholder}
          maxLength={REVIEW_TEXT_LIMITS.comment}
          rows={3}
          disabled={pending}
          className={cn(optionFieldShell, "h-auto resize-none px-3.5 py-2.5 text-sm outline-none placeholder:text-secondary")}
        />
      </OptionGroup>
      <TextOption
        label={reviewCopy.nameLabel}
        value={name}
        placeholder={reviewCopy.namePlaceholder}
        maxLength={REVIEW_TEXT_LIMITS.name}
        disabled={pending}
        onChange={setName}
      />
      <CheckboxOption label={reviewCopy.consent} checked={consent} disabled={pending} onChange={setConsent} />
      <div className="flex gap-2">
        <Button type="submit" size="md" disabled={pending || !comment.trim()} className="flex-1">
          {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
          {reviewCopy.send}
        </Button>
        <Button variant="secondary" size="md" onClick={onSkip} disabled={pending}>
          {reviewCopy.skip}
        </Button>
      </div>
    </form>
  );
}
