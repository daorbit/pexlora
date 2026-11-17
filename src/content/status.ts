export const statusCopy = {
  notFound: {
    title: "This page doesn't exist",
    body: "The link may be old or mistyped. Every tool is still one click away.",
    home: "Go to Homepage",
    popular: "Popular tools",
  },
  error: {
    code: "Something went wrong",
    title: "We couldn't load this page",
    body: "This is on our side, not yours. Try again, and if it keeps happening, come back in a few minutes.",
    retry: "Try Again",
    home: "Go to Homepage",
    dashboard: "Back to Dashboard",
    reference: (digest: string) => `Reference: ${digest}`,
  },
};
