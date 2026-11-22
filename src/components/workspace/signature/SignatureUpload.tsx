"use client";

import { useCallback } from "react";
import { ImageUp } from "lucide-react";
import { signatureCopy } from "@/content/workspace";
import { useFilePicker } from "@/hooks/useFilePicker";
import { uploadedSignature } from "@/lib/signature/signature-image";
import { toast } from "@/lib/toast/store";
import { Button } from "@/components/ui/Button";

type SignatureUploadProps = {
  disabled?: boolean;
  onChange: (signature: string | null) => void;
};

export function SignatureUpload({ disabled, onChange }: SignatureUploadProps) {
  const read = useCallback(
    async ([file]: File[]) => {
      if (!file) return;
      try {
        onChange(await uploadedSignature(file));
      } catch {
        toast.error(signatureCopy.uploadFailed);
      }
    },
    [onChange],
  );
  const picker = useFilePicker(read, "image/*");

  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-dashed border-border-strong bg-surface px-4 py-6 text-center">
      <input {...picker.inputProps} multiple={false} />
      <Button type="button" variant="secondary" onClick={picker.open} disabled={disabled}>
        <ImageUp className="size-4" aria-hidden />
        {signatureCopy.upload}
      </Button>
      <p className="max-w-sm text-[13px] leading-snug text-secondary">{signatureCopy.uploadHint}</p>
    </div>
  );
}
