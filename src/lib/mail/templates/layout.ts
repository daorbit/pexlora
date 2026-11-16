import { brandAssets } from "@/config/brand";
import { company } from "@/config/company";
import { routes, siteConfig } from "@/config/site";

export type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

type EmailLayoutOptions = {
  appUrl: string;
  preheader: string;
  heading: string;
  paragraphs: string[];
  code?: string;
  cta?: { label: string; url: string };
  note?: string;
  reason: string;
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

const colors = {
  page: "#f4f3ee",
  card: "#ffffff",
  border: "#e7e5dd",
  ink: "#10120d",
  body: "#3d4037",
  muted: "#7a7d73",
  codeBg: "#f4f3ee",
};

const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif";
const mono = "'SF Mono',SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace";

const stripTags = (value: string) => value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");

function paragraphHtml(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:24px;color:${colors.body};">${text}</p>`;
}

function codeHtml(code: string) {
  return `<p style="margin:8px 0 24px;"><span style="display:inline-block;padding:14px 22px;background:${colors.codeBg};border-radius:10px;font-family:${mono};font-size:30px;line-height:36px;font-weight:600;letter-spacing:8px;color:${colors.ink};">${escapeHtml(code)}</span></p>`;
}

function buttonHtml({ label, url }: { label: string; url: string }) {
  return `<p style="margin:8px 0 24px;"><a href="${escapeHtml(url)}" style="display:inline-block;background:${colors.ink};color:#ffffff;text-decoration:none;font-size:15px;line-height:20px;font-weight:600;padding:12px 20px;border-radius:10px;">${escapeHtml(label)}</a></p>`;
}

export function renderEmail({ appUrl, preheader, heading, paragraphs, code, cta, note, reason }: EmailLayoutOptions) {
  const privacyUrl = `${appUrl}${routes.privacy}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background:${colors.page};font-family:${font};-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${colors.page};">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
            <tr>
              <td style="padding:0 4px 20px;">
                <a href="${escapeHtml(appUrl)}" style="text-decoration:none;color:${colors.ink};font-size:16px;font-weight:600;">
                  <img src="${escapeHtml(appUrl)}${brandAssets.emailIcon}" width="24" height="24" alt="" style="vertical-align:middle;margin-right:8px;border-radius:6px;border:0;" />${escapeHtml(siteConfig.name)}
                </a>
              </td>
            </tr>
            <tr>
              <td style="background:${colors.card};border:1px solid ${colors.border};border-radius:14px;padding:36px 32px 20px;">
                <h1 style="margin:0 0 16px;font-size:22px;line-height:28px;font-weight:600;color:${colors.ink};">${escapeHtml(heading)}</h1>
                ${paragraphs.map(paragraphHtml).join("")}
                ${code ? codeHtml(code) : ""}
                ${cta ? buttonHtml(cta) : ""}
                ${note ? `<p style="margin:0 0 16px;font-size:13px;line-height:20px;color:${colors.muted};">${note}</p>` : ""}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 4px 0;font-size:12px;line-height:18px;color:${colors.muted};">
                <p style="margin:0 0 6px;">${escapeHtml(reason)}</p>
                <p style="margin:0;">${escapeHtml(siteConfig.name)} by ${escapeHtml(company.legalName)}, ${escapeHtml(company.country)} · <a href="${escapeHtml(privacyUrl)}" style="color:${colors.muted};">Privacy</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    heading,
    "",
    ...paragraphs.map(stripTags).flatMap((paragraph) => [paragraph, ""]),
    ...(code ? [code, ""] : []),
    ...(cta ? [`${cta.label}: ${cta.url}`, ""] : []),
    ...(note ? [stripTags(note), ""] : []),
    "--",
    reason,
    `${siteConfig.name} by ${company.legalName}, ${company.country}`,
    privacyUrl,
  ].join("\n");

  return { html, text };
}
