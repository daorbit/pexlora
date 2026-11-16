import { DAILY_LIMITS } from "@/config/limits";

export type AuthMode = "signin" | "signup";

export const authCopy = {
  close: "Close and go back to Pexlora",
  stage: {
    eyebrow: "Location",
    headline: "Share the photo.",
    highlight: "Not the location.",
  },
  perks: {
    limit: { from: `${DAILY_LIMITS.anonymous}`, to: `${DAILY_LIMITS.user} files a day` },
    card: "No card",
    stored: "Files never stored",
  },
  signin: {
    title: "Welcome back",
    description: `Sign in to pick up your ${DAILY_LIMITS.user} files a day.`,
    google: "Continue with Google",
    submit: "Sign In",
  },
  signup: {
    title: "Create your account",
    description: `Free, in one click. Your limit goes from ${DAILY_LIMITS.anonymous} to ${DAILY_LIMITS.user} files a day.`,
    google: "Continue with Google",
    submit: "Create Account",
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
  tabs: { label: "Sign in or create account", signin: "Sign In", signup: "Sign Up" },
  divider: "or with email",
};

export const authLegal = {
  before: "By continuing you agree to the",
  terms: "Terms",
  and: "and",
  privacy: "Privacy Policy",
  after: ".",
};
