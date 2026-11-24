import { SIGNUP_CODE } from "@/config/security";
import { AI_NAME } from "@/config/brand";
import { AI_DAILY_LIMITS, DAILY_LIMITS } from "@/config/limits";

export type AuthMode = "signin" | "signup";

export const authCopy = {
  backToTools: "Back to tools",
  google: "Continue with Google",
  signin: {
    title: "Welcome back",
    description: "Sign in to pick up where you left off.",
    submit: "Sign In",
    invalid: "Incorrect email or password. If you signed up with Google, use Continue with Google.",
    switchPrompt: "New here?",
    switchAction: "Create an account",
  },
  signup: {
    title: "Create your account",
    description: "We'll email you a code to confirm it's you.",
    submit: "Create Account",
    switchPrompt: "Have an account?",
    switchAction: "Sign in",
  },
  forgot: {
    title: "Forgot your password?",
    description: "Enter your email and we’ll send you a link to choose a new one.",
    submit: "Send Reset Link",
    link: "Forgot password?",
    sent: "If an account with a password exists for that email, a reset link is on its way. It works for 60 minutes.",
    back: "Back to sign in",
  },
  reset: {
    title: "Choose a new password",
    description: "At least 8 characters, with a letter and a number.",
    submit: "Save Password",
    invalid: "This reset link is invalid or has expired. Ask for a new one.",
    missing: "This page needs the link from your reset email.",
    requestNew: "Get a new link",
  },
  verify: {
    title: "Check your email",
    description: (email: string) => `We sent a ${SIGNUP_CODE.length}-digit code to ${email}. Enter it below to finish creating your account.`,
    codeLabel: "Verification code",
    submit: "Verify and Create Account",
    resendPrompt: "Didn't get it? Check your spam folder or",
    resend: "send a new code",
    resent: "If the address can receive email, a new code is on its way.",
    wait: (seconds: number) => `You can request a new code in ${seconds} seconds.`,
    sendLimit: "Too many codes requested for this address. Please try again in an hour.",
    wrongCode: (left: number) =>
      left > 0 ? `That code isn't right. ${left} ${left === 1 ? "attempt" : "attempts"} left.` : "That code isn't right. Request a new one.",
    expired: "This code has expired or was used too many times. Request a new one.",
    sessionExpired: "Your sign-up session has expired. Please start again.",
    startOver: "Use a different email",
  },
  divider: "or",
};

export const signupProof = {
  text: `Every tool stays free, with ${AI_DAILY_LIMITS.user} ${AI_NAME} requests a day.`,
};

export const authLegal = {
  freeNote: `Free: ${DAILY_LIMITS.user} files a day, no card.`,
  before: "By continuing you agree to the",
  terms: "Terms",
  and: "and",
  privacy: "Privacy Policy",
  after: ".",
};
