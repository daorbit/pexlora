import { loadScript } from "@/lib/utils/load-script";

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

export type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type RazorpayOptions = {
  key: string;
  order_id: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  prefill?: { name?: string; email?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (response: RazorpaySuccess) => void;
  modal?: { ondismiss?: () => void };
};

export type RazorpayInstance = { open: () => void; on: (event: "payment.failed", listener: () => void) => void };
export type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

let logo: Promise<string | undefined> | null = null;

function readAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

export function loadCheckoutLogo(src: string) {
  logo ??= fetch(src)
    .then((response) => (response.ok ? response.blob() : Promise.reject(new Error("Logo unavailable"))))
    .then(readAsDataUrl)
    .catch(() => {
      logo = null;
      return undefined;
    });
  return logo;
}

export async function loadRazorpayCheckout() {
  await loadScript(CHECKOUT_SRC, () => Boolean(window.Razorpay));
  if (!window.Razorpay) throw new Error("Checkout unavailable");
  return window.Razorpay;
}
