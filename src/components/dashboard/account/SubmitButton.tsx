import { Button } from "@/components/ui/Button";

export function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <Button type="submit" size="sm" loading={pending}>
      {label}
    </Button>
  );
}
