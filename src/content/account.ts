export const accountCopy = {
  unavailable: "We couldn't reach the database. Please try again in a moment.",
  signedOut: "Your session has ended. Sign in again.",
  profile: {
    title: "Profile",
    description: "Your account details.",
    nameLabel: "Name",
    save: "Save Name",
    saved: "Name updated.",
  },
  security: {
    title: "Sign-in & security",
    description: "Choose how you sign in to Pexlora.",
  },
  google: {
    label: "Google",
    connected: "Connected",
    connect: "Connect Google",
    description: {
      connected: "Sign in with one click using your Google account.",
      disconnected: "Connect Google to sign in with one click.",
    },
  },
  password: {
    label: "Password",
    description: {
      set: "Sign in with your email and password.",
      unset: "Add a password to sign in with your email as well as Google.",
    },
    change: "Change Password",
    set: "Set Password",
    cancel: "Cancel",
    fields: {
      currentPassword: "Current password",
      newPassword: "New password",
      confirmPassword: "Confirm new password",
    },
    changed: "Password changed.",
    added: "Password set. You can now sign in with your email and password.",
    wrongCurrent: "Current password is incorrect",
    reused: "Choose a different password from your current one",
  },
  googleLink: {
    linked: "Google is now connected to your account.",
    taken: "That Google account is already linked to another Pexlora account.",
    error: "We couldn't connect Google. Please try again.",
  },
};

export type GoogleLinkResult = keyof typeof accountCopy.googleLink;
