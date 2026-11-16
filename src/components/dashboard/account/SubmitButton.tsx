import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending && <LoaderCircle className="size-3.5 animate-spin" aria-hidden />}
      {label}
    </Button>
  );
}
