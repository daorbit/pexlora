"use client";

import { useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Link2, LoaderCircle, X } from "lucide-react";
import { urlImportCopy } from "@/content/import-sources";
import { useModalDismiss } from "@/hooks/useModalDismiss";
import { useUrlImport } from "@/hooks/useUrlImport";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";

type UrlImportDialogProps = { onFiles: (files: File[]) => void; onClose: () => void };

const TITLE_ID = "url-import-title";
const FIELD_NAME = "file-url";

export function UrlImportDialog({ onFiles, onClose }: UrlImportDialogProps) {
  const [value, setValue] = useState("");
  const { busy, error, submit, reset } = useUrlImport(onFiles);
  useModalDismiss(onClose);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await submit(value)) onClose();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID}
      onClick={(event) => event.stopPropagation()}
      className="fixed inset-0 z-50 flex items-end justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-4"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label={urlImportCopy.close}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] motion-safe:animate-fade-in"
      />
      <form
        onSubmit={onSubmit}
        className="relative flex w-full max-w-110 flex-col gap-5 rounded-3xl bg-surface p-6 text-foreground shadow-card motion-safe:animate-pop"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-fill">
              <Link2 className="size-5" aria-hidden />
            </span>
            <h2 id={TITLE_ID} className="text-[19px] font-semibold tracking-[-0.02em]">
              {urlImportCopy.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={urlImportCopy.close}
            className="-m-1.5 inline-flex size-8 items-center justify-center rounded-lg text-tertiary transition-colors hover:bg-fill hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <FormField
          name={FIELD_NAME}
          type="url"
          inputMode="url"
          label={urlImportCopy.label}
          labelPosition="above"
          placeholder={urlImportCopy.placeholder}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            reset();
          }}
          errors={error ? [error] : undefined}
          autoFocus
          required
        />
        <p className="text-[13px] leading-relaxed text-secondary">{urlImportCopy.note}</p>

        <Button type="submit" variant="ink" size="lg" disabled={busy || !value.trim()} className="w-full">
          {busy && <LoaderCircle className="size-4 animate-spin" aria-hidden />}
          {busy ? urlImportCopy.working : urlImportCopy.submit}
        </Button>
      </form>
    </div>,
    document.body,
  );
}
