"use client";

import { useRef, type PointerEvent } from "react";
import { Eraser } from "lucide-react";
import { SIGNATURE_IMAGE } from "@/config/limits";
import { signatureCopy } from "@/content/workspace";
import type { SignInk } from "@/lib/image/options";
import { trimSignature } from "@/lib/signature/signature-image";
import { Button } from "@/components/ui/Button";

type SignaturePadProps = {
  ink: SignInk;
  disabled?: boolean;
  onChange: (signature: string | null) => void;
};

export function SignaturePad({ ink, disabled, onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const point = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height,
      scale: canvas.width / rect.width,
    };
  };

  const start = (event: PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const { x, y, scale } = point(event);
    drawing.current = true;
    context.strokeStyle = SIGNATURE_IMAGE.inks[ink];
    context.lineWidth = SIGNATURE_IMAGE.stroke * scale;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y);
    context.stroke();
  };

  const move = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const context = event.currentTarget.getContext("2d");
    const { x, y } = point(event);
    context?.lineTo(x, y);
    context?.stroke();
  };

  const end = () => {
    if (!drawing.current || !canvasRef.current) return;
    drawing.current = false;
    onChange(trimSignature(canvasRef.current));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative w-full overflow-hidden rounded-2xl border border-dashed border-border-strong bg-surface">
        <canvas
          ref={canvasRef}
          width={SIGNATURE_IMAGE.padWidth}
          height={SIGNATURE_IMAGE.padHeight}
          aria-label={signatureCopy.padLabel}
          role="img"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          className="block aspect-[3/1] w-full cursor-crosshair touch-none"
        />
        <span aria-hidden className="pointer-events-none absolute inset-x-6 bottom-6 border-b border-separator" />
        <span aria-hidden className="pointer-events-none absolute bottom-1.5 left-6 text-[11px] text-tertiary">
          {signatureCopy.padHint}
        </span>
      </div>
      <Button type="button" variant="secondary" size="sm" onClick={clear} disabled={disabled} className="self-end">
        <Eraser className="size-3.5" aria-hidden />
        {signatureCopy.clear}
      </Button>
    </div>
  );
}
