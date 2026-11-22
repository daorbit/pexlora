import { Check, X } from "lucide-react";
import { fileHandlingCopy } from "@/content/file-handling";
import { NoteListCard } from "@/components/ui/NoteListCard";

export function HandlingNotes() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
      <NoteListCard
        id="extras-title"
        title={fileHandlingCopy.extrasTitle}
        items={fileHandlingCopy.extras}
        icon={Check}
        iconClassName="text-success"
      />
      <NoteListCard
        id="never-title"
        title={fileHandlingCopy.neverTitle}
        items={fileHandlingCopy.never}
        icon={X}
        iconClassName="text-danger"
      />
    </div>
  );
}
