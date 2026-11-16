"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AI_TEXT_LIMITS } from "@/config/limits";
import { textHandoffKey } from "@/config/text-tools";
import { aiCopy, textToolCopy } from "@/content/ai";
import { useAiAction } from "@/hooks/useAiAction";
import { useHandOff } from "@/hooks/useHandOff";
import { countWords } from "@/lib/ai/text-stats";
import { handOff } from "@/lib/utils/file-handoff";
import { detectAiText } from "@/services/ai-api";
import { Button } from "@/components/ui/Button";
import { UpsellAlert } from "@/components/ui/UpsellAlert";
import { AiButton } from "@/components/ai/AiButton";
import { DetectorResult } from "@/components/text-tools/DetectorResult";
import { TextInput } from "@/components/text-tools/TextInput";
import { WorkspaceFrame } from "@/components/workspace/WorkspaceFrame";

export function AiDetectorWorkspace({ peerHref }: { peerHref: string }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [checkedText, setCheckedText] = useState("");
  const detector = useAiAction(detectAiText);
  const { reset } = detector;

  const changeText = useCallback(
    (value: string) => {
      setText(value);
      reset();
    },
    [reset],
  );

  useHandOff<string>(textHandoffKey("ai-text-detector"), changeText);

  const check = async () => {
    setCheckedText(text);
    await detector.run(text);
  };

  const humanize = () => {
    handOff(textHandoffKey("ai-humanizer"), text);
    router.push(peerHref);
  };

  const enoughWords = countWords(text) >= AI_TEXT_LIMITS.minWords;

  return (
    <WorkspaceFrame>
      <div className="flex flex-col gap-3 p-1">
        <TextInput label={textToolCopy.placeholder} value={text} onChange={changeText} disabled={detector.pending} />
        <UpsellAlert message={detector.error} upsell={detector.upsell} />
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[13px] text-secondary">{enoughWords ? aiCopy.limitNote : textToolCopy.minimum}</p>
          <AiButton
            size="lg"
            pending={detector.pending}
            label={textToolCopy.detect}
            pendingLabel={textToolCopy.detecting}
            disabled={!enoughWords}
            onClick={check}
            className="ml-auto"
          />
        </div>
        {detector.data && (
          <>
            <DetectorResult report={detector.data} text={checkedText} />
            {detector.data.verdict !== "likely-human" && (
              <Button variant="ink" arrow onClick={humanize} className="self-center">
                {textToolCopy.toHumanizer}
              </Button>
            )}
          </>
        )}
      </div>
    </WorkspaceFrame>
  );
}
