function waitTime(seconds: number) {
  if (seconds < 60) return `${seconds} seconds`;
  const minutes = Math.ceil(seconds / 60);
  return minutes === 1 ? "a minute" : `${minutes} minutes`;
}

export const securityCopy = {
  tooManyRequests: (seconds: number) => `Too many requests. Please try again in ${waitTime(seconds)}.`,
  tooManyAttempts: (seconds: number) => `Too many attempts. Please try again in ${waitTime(seconds)}.`,
};
