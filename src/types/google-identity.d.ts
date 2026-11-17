type GoogleCredentialResponse = { credential: string };

type GoogleIdConfiguration = {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  nonce?: string;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  itp_support?: boolean;
  use_fedcm_for_prompt?: boolean;
  context?: "signin" | "signup" | "use";
};

type TranslateElementOptions = {
  pageLanguage: string;
  includedLanguages: string;
  autoDisplay: boolean;
};

interface Window {
  googleTranslateElementInit?: () => void;
  google?: {
    translate?: {
      TranslateElement: new (options: TranslateElementOptions, elementId: string) => unknown;
    };
    accounts: {
      id: {
        initialize: (config: GoogleIdConfiguration) => void;
        prompt: () => void;
        cancel: () => void;
      };
    };
  };
}
