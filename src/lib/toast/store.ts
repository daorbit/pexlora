export type ToastTone = "success" | "error" | "info";
export type ToastAction = { label: string; onAction: () => void };
export type Toast = { id: number; tone: ToastTone; message: string; action?: ToastAction };

const MAX_TOASTS = 3;
const UNDO_LABEL = "Undo";

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function push(tone: ToastTone, message: string, action?: ToastAction) {
  const duplicate = !action && toasts.find((item) => item.message === message && item.tone === tone && !item.action);
  if (duplicate) return duplicate.id;
  const id = nextId++;
  toasts = [...toasts, { id, tone, message, action }].slice(-MAX_TOASTS);
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
  undo: (message: string, onUndo: () => void) => push("info", message, { label: UNDO_LABEL, onAction: onUndo }),
  link: (message: string, label: string, href: string) =>
    push("success", message, { label, onAction: () => window.open(href, "_blank", "noopener,noreferrer") }),
};
