import { authCopy, type AuthMode } from "@/content/auth";

type AuthModeSwitchProps = {
  mode: AuthMode;
  onSwitch: () => void;
};

export function AuthModeSwitch({ mode, onSwitch }: AuthModeSwitchProps) {
  const copy = authCopy[mode];

  return (
    <p className="text-center text-sm text-secondary">
      {copy.switchPrompt}{" "}
      <button
        type="button"
        onClick={onSwitch}
        className="font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        {copy.switchAction}
      </button>
    </p>
  );
}
