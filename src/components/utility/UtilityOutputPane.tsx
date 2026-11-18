import type { ReactNode } from "react";
import { OutputActions } from "@/components/text-tools/OutputActions";
import { TextPane } from "@/components/text-tools/TextPane";

type UtilityOutputPaneProps = {
  title: string;
  text: string;
  shareTitle: string;
  summary?: ReactNode;
  emptyMessage: string;
  details?: ReactNode;
};

export function UtilityOutputPane({ title, text, shareTitle, summary, emptyMessage, details }: UtilityOutputPaneProps) {
  return (
    <TextPane
      title={title}
      meta={summary}
      footer={text ? <OutputActions text={text} shareTitle={shareTitle} /> : undefined}
    >
      {text ? (
        <div className="flex flex-1 flex-col gap-4 px-5 py-4">
          <p translate="no" className="notranslate text-[15.5px] leading-relaxed break-words whitespace-pre-wrap">
            {text}
          </p>
          {details}
        </div>
      ) : (
        <p className="m-auto max-w-xs px-6 py-10 text-center text-sm text-tertiary">{emptyMessage}</p>
      )}
    </TextPane>
  );
}
