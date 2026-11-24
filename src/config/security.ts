export type RateLimitRule = { limit: number; windowSeconds: number };

const MINUTE = 60;
const HOUR = 60 * MINUTE;

export const RATE_LIMITS = {
  signInIp: { limit: 20, windowSeconds: 15 * MINUTE },
  signInAccount: { limit: 5, windowSeconds: 15 * MINUTE },
  signUpIp: { limit: 5, windowSeconds: HOUR },
  verifyCodeIp: { limit: 10, windowSeconds: 15 * MINUTE },
  resendCodeIp: { limit: 5, windowSeconds: HOUR },
  forgotPasswordIp: { limit: 5, windowSeconds: HOUR },
  resetPasswordIp: { limit: 10, windowSeconds: HOUR },
  googleAuthIp: { limit: 30, windowSeconds: 15 * MINUTE },
  accountNotice: { limit: 1, windowSeconds: HOUR },
  imageApi: { limit: 60, windowSeconds: MINUTE },
  aiApi: { limit: 15, windowSeconds: MINUTE },
  urlImport: { limit: 20, windowSeconds: MINUTE },
  createOrder: { limit: 10, windowSeconds: HOUR },
  review: { limit: 10, windowSeconds: HOUR },
  verifyPayment: { limit: 30, windowSeconds: HOUR },
} satisfies Record<string, RateLimitRule>;

export type RateLimitScope = keyof typeof RATE_LIMITS;

export const SIGNUP_CODE = {
  length: 6,
  ttlMinutes: 10,
  maxAttempts: 5,
  maxSends: 5,
  resendCooldownSeconds: 60,
} as const;

export const MAX_INPUT_PIXELS = 100_000_000;
