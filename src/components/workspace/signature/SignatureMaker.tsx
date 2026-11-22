"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { signatureCopy, type SignMode } from "@/content/workspace";
import { SIGN_INKS, type SignPdfOptions } from "@/lib/image/options";
import { typedSignature } from "@/lib/signature/signature-image";
import { Segmented } from "@/components/ui/Segmented";
import { Button } from "@/components/ui/Button";
import { TextOption } from "@/components/workspace/options/TextOption";
import { SignaturePad } from "@/components/workspace/signature/SignaturePad";
import { SignatureUpload } from "@/components/workspace/signature/SignatureUpload";

const SIGN_MODES: SignMode[] = ["draw", "type", "upload"];
const modeOptions = SIGN_MODES.map((value) => ({ value, label: signatureCopy.modes[value] }));
const inkOptions = SIGN_INKS.map((value) => ({ value, label: signatureCopy.inks[value] }));
const TYPED_MAX_LENGTH = 40;

type SignatureMakerProps = {
  options: SignPdfOptions;
  disabled: boolean;
  onChange: (patch: Partial<SignPdfOptions>) => void;
};

export function SignatureMaker({ options, disabled, onChange }: SignatureMakerProps) {
  const [mode, setMode] = useState<SignMode>("draw");
  const [typed, setTyped] = useState("");
  const setSignature = (signature: string | null) => onChange({ signature });

  const changeTyped = (value: string, ink = options.ink) => {
    setTyped(value);
    onChange({ signature: typedSignature(value, ink), ink });
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Segmented label={signatureCopy.modeLabel} value={mode} options={modeOptions} onChange={setMode} disabled={disabled} size="sm" />
        {mode !== "upload" && (
          <Segmented
            label={signatureCopy.inkLabel}
            value={options.ink}
            options={inkOptions}
            onChange={(ink) => (mode === "type" ? changeTyped(typed, ink) : onChange({ ink }))}
            disabled={disabled}
            size="sm"
          />
        )}
      </div>

      {mode === "draw" && <SignaturePad ink={options.ink} disabled={disabled} onChange={setSignature} />}
      {mode === "type" && (
        <TextOption
          label={signatureCopy.typeLabel}
          value={typed}
          placeholder={signatureCopy.typePlaceholder}
          maxLength={TYPED_MAX_LENGTH}
          disabled={disabled}
          onChange={(value) => changeTyped(value)}
        />
      )}
      {mode === "upload" && <SignatureUpload disabled={disabled} onChange={setSignature} />}

      {options.signature && (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface p-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="text-[13px] font-semibold text-success">{signatureCopy.ready}</span>
            <Image
              src={options.signature}
              alt={signatureCopy.preview}
              width={160}
              height={56}
              unoptimized
              className="h-12 w-auto max-w-40 object-contain"
            />
          </div>
          <Button type="button" variant="icon" size="sm" onClick={() => setSignature(null)} disabled={disabled} aria-label={signatureCopy.clear}>
            <X className="size-4" aria-hidden />
          </Button>
        </div>
      )}
    </div>
  );
}
