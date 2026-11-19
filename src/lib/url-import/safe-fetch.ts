import "server-only";
import { lookup, type LookupAddress, type LookupOptions } from "node:dns";
import http, { type IncomingMessage } from "node:http";
import https from "node:https";
import { isIP } from "node:net";
import { urlImport } from "@/config/import-sources";
import { isBlockedAddress } from "@/lib/url-import/blocked-address";
import { parseHttpUrl, UrlImportError } from "@/lib/url-import/errors";
import { mimeOf, remoteFileName } from "@/lib/url-import/file-name";

const BYTES_PER_MB = 1024 * 1024;
const ALLOWED_PORTS = ["", "80", "443"];
const BLOCKED_TYPES = ["text/html", "application/xhtml+xml"];
const USER_AGENT = "Mozilla/5.0 (compatible; PexloraFileFetcher/1.0)";

type LookupCallback = (error: NodeJS.ErrnoException | null, address: string | LookupAddress[], family?: number) => void;

function safeLookup(hostname: string, options: LookupOptions, callback: LookupCallback) {
  lookup(hostname, { ...options, all: true }, (error, addresses) => {
    if (error) return callback(error, "");
    if (!addresses.length || addresses.some((entry) => isBlockedAddress(entry.address))) {
      return callback(new UrlImportError("blocked"), "");
    }
    if (options.all) return callback(null, addresses);
    callback(null, addresses[0].address, addresses[0].family);
  });
}

function allowedUrl(raw: string) {
  const url = parseHttpUrl(raw);
  if (url.username || url.password || !ALLOWED_PORTS.includes(url.port)) throw new UrlImportError("blocked");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (isIP(host) && isBlockedAddress(host)) throw new UrlImportError("blocked");
  return url;
}

function requestOnce(url: URL, signal: AbortSignal) {
  const client = url.protocol === "https:" ? https : http;
  return new Promise<IncomingMessage>((resolve, reject) => {
    const request = client.get(url, { lookup: safeLookup, signal, headers: { "user-agent": USER_AGENT, accept: "*/*" } }, resolve);
    request.on("error", (error) => reject(error instanceof UrlImportError ? error : new UrlImportError("failed")));
  });
}

async function readCapped(response: IncomingMessage, maxBytes: number) {
  if (Number(response.headers["content-length"] ?? 0) > maxBytes) {
    response.destroy();
    throw new UrlImportError("tooLarge");
  }
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of response) {
    size += (chunk as Buffer).length;
    if (size > maxBytes) {
      response.destroy();
      throw new UrlImportError("tooLarge");
    }
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks);
}

export async function fetchRemoteFile(raw: string) {
  let url = allowedUrl(raw);
  const signal = AbortSignal.timeout(urlImport.serverTimeoutMs);

  for (let hop = 0; hop <= urlImport.maxRedirects; hop++) {
    const response = await requestOnce(url, signal);
    const status = response.statusCode ?? 0;
    const location = response.headers.location;

    if (status >= 300 && status < 400 && location) {
      response.resume();
      url = allowedUrl(new URL(location, url).toString());
      continue;
    }
    if (status < 200 || status >= 300) {
      response.resume();
      throw new UrlImportError("failed");
    }

    const type = mimeOf(response.headers["content-type"] ?? null);
    if (BLOCKED_TYPES.includes(type)) {
      response.destroy();
      throw new UrlImportError("notFile");
    }
    const body = await readCapped(response, urlImport.maxServerMb * BYTES_PER_MB);
    return { body, type, name: remoteFileName(url, response.headers["content-disposition"] ?? null, type) };
  }

  throw new UrlImportError("failed");
}
