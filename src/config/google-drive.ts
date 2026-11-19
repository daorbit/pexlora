export const GOOGLE_IDENTITY_SCRIPT = "https://accounts.google.com/gsi/client";
export const GOOGLE_API_SCRIPT = "https://apis.google.com/js/api.js";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY ?? "";

export const googleDrive = {
  clientId,
  apiKey,
  appId: clientId.split("-")[0],
  scope: "https://www.googleapis.com/auth/drive.file",
  folderName: "Pexlora",
  filesUrl: "https://www.googleapis.com/drive/v3/files",
  uploadUrl: "https://www.googleapis.com/upload/drive/v3/files",
  maxDownloadMb: 250,
  enabled: Boolean(clientId && apiKey),
};

export const DRIVE_NATIVE_PREFIX = "application/vnd.google-apps.";
export const DRIVE_FOLDER_TYPE = "application/vnd.google-apps.folder";

type DriveExport = { mimeType: string; extension: string };

const PDF: DriveExport = { mimeType: "application/pdf", extension: "pdf" };

export const DRIVE_EXPORTS: Record<string, DriveExport[]> = {
  "application/vnd.google-apps.document": [
    { mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", extension: "docx" },
    PDF,
  ],
  "application/vnd.google-apps.spreadsheet": [
    { mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", extension: "xlsx" },
    { mimeType: "text/csv", extension: "csv" },
    PDF,
  ],
  "application/vnd.google-apps.presentation": [
    { mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation", extension: "pptx" },
    PDF,
  ],
  "application/vnd.google-apps.drawing": [
    { mimeType: "image/png", extension: "png" },
    { mimeType: "image/jpeg", extension: "jpg" },
    PDF,
  ],
};
