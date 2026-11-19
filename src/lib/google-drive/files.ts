import { DRIVE_EXPORTS, DRIVE_FOLDER_TYPE, DRIVE_NATIVE_PREFIX, googleDrive } from "@/config/google-drive";
import { DriveError } from "@/lib/google-drive/errors";
import { forgetDriveToken } from "@/lib/google-drive/token";
import { ImportSkip } from "@/lib/import/collect-files";
import type { SavableFile } from "@/lib/utils/save-file";

export function pickerMimeTypes(accepted: string[]) {
  if (!accepted.length) return [];
  const natives = Object.keys(DRIVE_EXPORTS).filter((native) =>
    DRIVE_EXPORTS[native].some((target) => accepted.includes(target.mimeType)),
  );
  return [...accepted, ...natives];
}

function exportFor(mimeType: string, accepted: string[]) {
  const targets = DRIVE_EXPORTS[mimeType] ?? [];
  return accepted.length ? targets.find((target) => accepted.includes(target.mimeType)) : targets[0];
}

async function driveFetch(token: string, url: string, init: RequestInit = {}) {
  const response = await fetch(url, { ...init, headers: { Authorization: `Bearer ${token}`, ...init.headers } });
  if (response.status === 401) forgetDriveToken();
  if (!response.ok) throw new DriveError(response.status === 401 || response.status === 403 ? "denied" : "failed");
  return response;
}

export async function downloadDriveFile(token: string, doc: GooglePickerDoc, accepted: string[]) {
  if ((doc.sizeBytes ?? 0) > googleDrive.maxDownloadMb * 1024 * 1024) throw new ImportSkip(doc.name, "tooLarge", googleDrive.maxDownloadMb);

  const native = doc.mimeType.startsWith(DRIVE_NATIVE_PREFIX);
  const target = native ? exportFor(doc.mimeType, accepted) : undefined;
  if (native && !target) throw new ImportSkip(doc.name, "unsupported");

  const id = encodeURIComponent(doc.id);
  const url = target
    ? `${googleDrive.filesUrl}/${id}/export?mimeType=${encodeURIComponent(target.mimeType)}`
    : `${googleDrive.filesUrl}/${id}?alt=media&supportsAllDrives=true`;
  const blob = await (await driveFetch(token, url)).blob();
  const name = target ? `${doc.name}.${target.extension}` : doc.name;
  return new File([blob], name, { type: target?.mimeType ?? (doc.mimeType || blob.type) });
}

let folderId: string | null = null;

async function pexloraFolder(token: string) {
  if (folderId) return folderId;
  const query = `name='${googleDrive.folderName}' and mimeType='${DRIVE_FOLDER_TYPE}' and trashed=false`;
  const list = await driveFetch(token, `${googleDrive.filesUrl}?q=${encodeURIComponent(query)}&fields=files(id)&spaces=drive`);
  const found = ((await list.json()) as { files: { id: string }[] }).files[0]?.id;
  if (found) return (folderId = found);

  const created = await driveFetch(token, `${googleDrive.filesUrl}?fields=id`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: googleDrive.folderName, mimeType: DRIVE_FOLDER_TYPE }),
  });
  return (folderId = ((await created.json()) as { id: string }).id);
}

async function uploadOne(token: string, file: SavableFile, parent: string) {
  const type = file.blob.type || "application/octet-stream";
  const session = await driveFetch(token, `${googleDrive.uploadUrl}?uploadType=resumable&fields=id`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8", "X-Upload-Content-Type": type },
    body: JSON.stringify({ name: file.name, parents: [parent] }),
  });
  const location = session.headers.get("Location");
  if (!location) throw new DriveError("failed");
  await driveFetch(token, location, { method: "PUT", headers: { "Content-Type": type }, body: file.blob });
}

export async function uploadToDrive(token: string, files: SavableFile[]) {
  try {
    const parent = await pexloraFolder(token);
    for (const file of files) await uploadOne(token, file, parent);
    return `https://drive.google.com/drive/folders/${parent}`;
  } catch (error) {
    folderId = null;
    throw error;
  }
}
