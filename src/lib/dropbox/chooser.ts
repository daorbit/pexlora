import { dropboxChooser } from "@/config/import-sources";
import { ImportSkip } from "@/lib/import/collect-files";
import { loadScript } from "@/lib/utils/load-script";

const BYTES_PER_MB = 1024 * 1024;

export function loadDropbox() {
  return loadScript(dropboxChooser.script, () => Boolean(window.Dropbox), {
    id: dropboxChooser.scriptId,
    "data-app-key": dropboxChooser.appKey,
  });
}

export async function chooseDropboxFiles({ extensions, multiple }: { extensions: string[]; multiple: boolean }) {
  await loadDropbox();
  return new Promise<DropboxChooserFile[]>((resolve) => {
    window.Dropbox?.choose({
      success: resolve,
      cancel: () => resolve([]),
      linkType: "direct",
      multiselect: multiple,
      folderselect: false,
      ...(extensions.length ? { extensions } : {}),
    });
  });
}

export async function downloadDropboxFile(file: DropboxChooserFile) {
  if (file.bytes > dropboxChooser.maxDownloadMb * BYTES_PER_MB) {
    throw new ImportSkip(file.name, "tooLarge", dropboxChooser.maxDownloadMb);
  }
  const response = await fetch(file.link, { credentials: "omit" });
  if (!response.ok) throw new Error(`Dropbox download failed: ${response.status}`);
  const blob = await response.blob();
  return new File([blob], file.name, { type: blob.type });
}
