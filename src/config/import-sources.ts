import { SERVER_IMAGE_SIZE_MB } from "@/config/limits";

const dropboxAppKey = process.env.NEXT_PUBLIC_DROPBOX_APP_KEY ?? "";

export const dropboxChooser = {
  appKey: dropboxAppKey,
  script: "https://www.dropbox.com/static/api/2/dropins.js",
  scriptId: "dropboxjs",
  maxDownloadMb: 250,
  enabled: Boolean(dropboxAppKey),
};

export const urlImport = {
  endpoint: "/api/files/fetch-url",
  browserTimeoutMs: 20_000,
  serverTimeoutMs: 15_000,
  maxServerMb: SERVER_IMAGE_SIZE_MB,
  maxRedirects: 3,
  maxUrlLength: 2048,
};
