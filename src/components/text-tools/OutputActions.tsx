"use client";

import { useState, type ReactNode } from "react";
import { Download, Share2 } from "lucide-react";
import { textToolCopy } from "@/content/ai";
import { downloadText, shareText } from "@/lib/utils/text-actions";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";

type OutputActionsProps = {
  text: string;
  shareTitle: string;
  fileName?: string;
  children?: ReactNode;
};

export function OutputActions({ text, shareTitle, fileName, children }: OutputActionsProps) {
  const [copiedForShare, setCopiedForShare] = useState(false);

  const share = async () => {
    const result = await shareText(shareTitle, text);
    setCopiedForShare(result === "copied");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <CopyButton value={text} />
      {fileName && (
        <Button variant="secondary" size="sm" onClick={() => downloadText(text, fileName)}>
          <Download className="size-3.5" aria-hidden />
          {textToolCopy.download}
        </Button>
      )}
      <Button variant="secondary" size="sm" onClick={share}>
        <Share2 className="size-3.5" aria-hidden />
        {copiedForShare ? textToolCopy.shared : textToolCopy.share}
      </Button>
      {children && <div className="ml-auto flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}
