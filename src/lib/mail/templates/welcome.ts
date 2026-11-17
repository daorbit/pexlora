import { DAILY_LIMITS } from "@/config/limits";
import { routes, siteConfig } from "@/config/site";
import { toolItem } from "@/config/tool-hub";
import type { EmailContent } from "@/lib/mail/templates/layout";
import {
  brandLink,
  emailButton,
  emailColors,
  emailDocument,
  emailFooterText,
  escapeHtml,
  firstName,
} from "@/lib/mail/templates/email-parts";

const starterTools = [
  { key: "remove-metadata", note: "Strip location and AI tags from photos" },
  { key: "compress-to-size", note: "Hit 50 KB or 100 KB for any form" },
  { key: "convert-format", note: "HEIC, WebP, PNG and JPG, clean every time" },
];

const heroStyles = `
  .hero-title { font-size: 30px !important; line-height: 34px !important; }
`;

function starterRows(appUrl: string) {
  return starterTools.flatMap(({ key, note }, index) => {
    const item = toolItem(key);
    if (!item) return [];
    const border = index === 0 ? "" : `border-top:1px solid ${emailColors.divider};`;
    return [
      `<tr>
        <td width="56" valign="middle" style="width:56px;padding:12px 0;${border}">
          <a href="${escapeHtml(appUrl + item.href)}"><img src="${escapeHtml(appUrl)}/icons/email/${key}.png" width="40" height="40" alt="" style="display:block;border:0;border-radius:11px;" /></a>
        </td>
        <td valign="middle" style="padding:12px 0;${border}">
          <a href="${escapeHtml(appUrl + item.href)}" style="text-decoration:none;color:${emailColors.ink};">
            <span style="display:block;font-size:14.5px;line-height:20px;font-weight:600;">${escapeHtml(item.name)}</span>
            <span style="display:block;font-size:12.5px;line-height:18px;color:${emailColors.muted};">${escapeHtml(note)}</span>
          </a>
        </td>
      </tr>`,
    ];
  });
}

export function welcomeEmail({ name, appUrl }: { name: string; appUrl: string }): EmailContent {
  const first = firstName(name);
  const dashboardUrl = `${appUrl}${routes.dashboard}`;
  const intro = "Your account is ready. Share photos without the location, AI tags or camera details hiding inside them.";
  const reason = `You received this email because you created a ${siteConfig.name} account.`;

  const content = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
      <tr>
        <td class="pad" style="background:${emailColors.ink};border-radius:18px 18px 0 0;padding:26px 28px 34px;">
          ${brandLink(appUrl, "ink")}
          <h1 class="hero-title" style="margin:28px 0 12px;font-size:38px;line-height:42px;font-weight:700;letter-spacing:-1.2px;color:${emailColors.pearl};">
            Welcome, <span style="background:${emailColors.lime};color:${emailColors.ink};padding:0 6px;border-radius:6px;">${escapeHtml(first)}.</span>
          </h1>
          <p style="margin:0;max-width:420px;font-size:15px;line-height:24px;color:${emailColors.pearlMuted};">${escapeHtml(intro)}</p>
        </td>
      </tr>
      <tr>
        <td class="pad" style="background:${emailColors.card};border:1px solid ${emailColors.border};border-top:0;border-radius:0 0 18px 18px;padding:26px 28px 30px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${emailColors.page};border-radius:14px;">
            <tr>
              <td width="1" valign="middle" style="padding:16px 0 16px 18px;font-size:36px;line-height:36px;font-weight:700;letter-spacing:-1px;color:${emailColors.ink};white-space:nowrap;">${DAILY_LIMITS.user}</td>
              <td valign="middle" style="padding:16px 18px 16px 14px;font-size:13.5px;line-height:19px;color:${emailColors.body};">
                files a day across every tool<br />
                <span style="color:${emailColors.muted};text-decoration:line-through;">${DAILY_LIMITS.anonymous} as a guest</span>
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px;">
            ${starterRows(appUrl).join("")}
          </table>
          <p style="margin:20px 0 0;">${emailButton({ label: "Open Your Dashboard", url: dashboardUrl })}</p>
        </td>
      </tr>
    </table>`;

  const toolLines = starterTools.flatMap(({ key, note }) => {
    const item = toolItem(key);
    return item ? [`- ${item.name}: ${note} (${appUrl}${item.href})`] : [];
  });

  return {
    subject: `Welcome to ${siteConfig.name}, ${first}`,
    html: emailDocument({
      appUrl,
      title: `Welcome to ${siteConfig.name}`,
      preheader: `Your account is ready. ${DAILY_LIMITS.user} files a day, every tool.`,
      content,
      reason,
      styles: heroStyles,
    }),
    text: [
      `Welcome, ${first}.`,
      "",
      intro,
      "",
      `You can now process ${DAILY_LIMITS.user} files a day across every tool (${DAILY_LIMITS.anonymous} as a guest).`,
      "",
      "Good places to start:",
      ...toolLines,
      "",
      `Open your dashboard: ${dashboardUrl}`,
      "",
      ...emailFooterText(appUrl, reason),
    ].join("\n"),
  };
}
