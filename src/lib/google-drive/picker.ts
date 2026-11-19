import { googleDrive } from "@/config/google-drive";
import { DriveError } from "@/lib/google-drive/errors";

type PickOptions = { token: string; mimeTypes: string[]; maxItems: number; title: string };

let pickerModule: Promise<GooglePickerNamespace> | null = null;

function loadPicker() {
  pickerModule ??= new Promise<GooglePickerNamespace>((resolve, reject) => {
    window.gapi?.load("picker", {
      callback: () => (window.google?.picker ? resolve(window.google.picker) : reject(new DriveError("failed"))),
      onerror: () => {
        pickerModule = null;
        reject(new DriveError("failed"));
      },
    });
  });
  return pickerModule;
}

export async function pickDriveFiles({ token, mimeTypes, maxItems, title }: PickOptions) {
  const picker = await loadPicker();

  return new Promise<GooglePickerDoc[]>((resolve) => {
    const view = new picker.DocsView(picker.ViewId.DOCS).setIncludeFolders(true);
    if (mimeTypes.length) view.setMimeTypes(mimeTypes.join(","));

    const builder = new picker.PickerBuilder()
      .setAppId(googleDrive.appId)
      .setOAuthToken(token)
      .setDeveloperKey(googleDrive.apiKey)
      .setOrigin(window.location.origin)
      .setTitle(title)
      .addView(view)
      .enableFeature(picker.Feature.SUPPORT_DRIVES)
      .setCallback((result) => {
        if (result.action === picker.Action.PICKED) resolve(result.docs ?? []);
        else if (result.action === picker.Action.CANCEL) resolve([]);
      });

    if (maxItems > 1) builder.enableFeature(picker.Feature.MULTISELECT_ENABLED).setMaxItems(maxItems);
    builder.build().setVisible(true);
  });
}
