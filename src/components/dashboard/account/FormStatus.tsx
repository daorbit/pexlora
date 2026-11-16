import { Alert } from "@/components/ui/Alert";

type FormStatusProps = {
  state: { status: "success" | "error"; message?: string } | undefined;
};

export function FormStatus({ state }: FormStatusProps) {
  if (!state?.message) return null;
  return <Alert tone={state.status === "success" ? "success" : "danger"} message={state.message} />;
}
