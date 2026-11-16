import "server-only";

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  get mongodbUri() {
    return required("MONGODB_URI");
  },
  get mongodbDbName() {
    return process.env.MONGODB_DB_NAME ?? "pexlora";
  },
  get sessionSecret() {
    return required("SESSION_SECRET");
  },
  get appUrl() {
    return (process.env.APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
  },
  get smtp() {
    return {
      host: required("SMTP_HOST"),
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      user: required("SMTP_USER"),
      pass: required("SMTP_PASS"),
      from: process.env.SMTP_FROM ?? required("SMTP_USER"),
    };
  },
  get googleClientId() {
    return process.env.GCP_CLIENT_ID ?? null;
  },
  get google() {
    return {
      clientId: required("GCP_CLIENT_ID"),
      clientSecret: required("GCP_CLIENT_SECRET"),
    };
  },
  isProduction: process.env.NODE_ENV === "production",
};
