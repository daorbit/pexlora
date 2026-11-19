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

type GoogleTokenResponse = { access_token?: string; expires_in?: number | string; error?: string };

type GoogleTokenClientConfig = {
  client_id: string;
  scope: string;
  callback: (response: GoogleTokenResponse) => void;
  error_callback?: (error: { type: string }) => void;
};

type GoogleTokenClient = { requestAccessToken: (options?: { prompt?: string }) => void };

type GooglePickerDoc = { id: string; name: string; mimeType: string; sizeBytes?: number };
type GooglePickerResult = { action: string; docs?: GooglePickerDoc[] };

interface GooglePickerDocsView {
  setMimeTypes: (mimeTypes: string) => GooglePickerDocsView;
  setIncludeFolders: (include: boolean) => GooglePickerDocsView;
}

interface GooglePickerBuilder {
  setAppId: (appId: string) => GooglePickerBuilder;
  setOAuthToken: (token: string) => GooglePickerBuilder;
  setDeveloperKey: (key: string) => GooglePickerBuilder;
  setOrigin: (origin: string) => GooglePickerBuilder;
  setTitle: (title: string) => GooglePickerBuilder;
  addView: (view: GooglePickerDocsView) => GooglePickerBuilder;
  enableFeature: (feature: string) => GooglePickerBuilder;
  setMaxItems: (count: number) => GooglePickerBuilder;
  setCallback: (callback: (result: GooglePickerResult) => void) => GooglePickerBuilder;
  build: () => { setVisible: (visible: boolean) => void };
}

type GooglePickerNamespace = {
  PickerBuilder: new () => GooglePickerBuilder;
  DocsView: new (viewId?: string) => GooglePickerDocsView;
  ViewId: { DOCS: string };
  Feature: { MULTISELECT_ENABLED: string; SUPPORT_DRIVES: string };
  Action: { PICKED: string; CANCEL: string };
};

interface Window {
  googleTranslateElementInit?: () => void;
  gapi?: {
    load: (name: string, options: { callback: () => void; onerror?: () => void }) => void;
  };
  google?: {
    translate?: {
      TranslateElement: new (options: TranslateElementOptions, elementId: string) => unknown;
    };
    picker?: GooglePickerNamespace;
    accounts: {
      id: {
        initialize: (config: GoogleIdConfiguration) => void;
        prompt: () => void;
        cancel: () => void;
      };
      oauth2?: {
        initTokenClient: (config: GoogleTokenClientConfig) => GoogleTokenClient;
      };
    };
  };
}
