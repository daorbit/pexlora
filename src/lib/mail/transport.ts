import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { env } from "@/lib/env";

const globalForMail = globalThis as typeof globalThis & {
  mailTransport?: Transporter;
};

export function getMailTransport() {
  if (!globalForMail.mailTransport) {
    const { host, port, secure, user, pass } = env.smtp;
    globalForMail.mailTransport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
  }
  return globalForMail.mailTransport;
}
