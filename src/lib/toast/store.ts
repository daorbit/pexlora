export type ToastTone = "success" | "error" | "info";
export type Toast = { id: number; tone: ToastTone; message: string };

const MAX_TOASTS = 3;

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function push(tone: ToastTone, message: string) {
  const duplicate = toasts.find((item) => item.message === message && item.tone === tone);
  if (duplicate) return duplicate.id;
  const id = nextId++;
  toasts = [...toasts, { id, tone, message }].slice(-MAX_TOASTS);
  emit();
  return id;
}

export function dismissToast(id: number) {
  toasts = toasts.filter((item) => item.id !== id);
  emit();
}

export function subscribeToasts(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getToasts() {
  return toasts;
}

const EMPTY: Toast[] = [];

export function getServerToasts() {
  return EMPTY;
}

export const toast = {
  success: (message: string) => push("success", message),
  error: (message: string) => push("error", message),
  info: (message: string) => push("info", message),
};
