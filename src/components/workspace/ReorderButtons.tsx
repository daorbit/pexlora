import { ArrowDown, ArrowUp } from "lucide-react";
import { localToolsCopy } from "@/content/workspace";
import { Button } from "@/components/ui/Button";

type ReorderButtonsProps = {
  id: string;
  name: string;
  first: boolean;
  last: boolean;
  disabled: boolean;
  onMove: (id: string, offset: number) => void;
};

export function ReorderButtons({ id, name, first, last, disabled, onMove }: ReorderButtonsProps) {
  return (
    <span className="flex items-center">
      <Button
        variant="icon"
        size="sm"
        aria-label={localToolsCopy.moveUp(name)}
        disabled={disabled || first}
        onClick={() => onMove(id, -1)}
      >
        <ArrowUp className="size-4" aria-hidden />
      </Button>
      <Button
        variant="icon"
        size="sm"
        aria-label={localToolsCopy.moveDown(name)}
        disabled={disabled || last}
        onClick={() => onMove(id, 1)}
      >
        <ArrowDown className="size-4" aria-hidden />
      </Button>
    </span>
  );
}
