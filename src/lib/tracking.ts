export const META_PIXEL_ID = "1154719256863460";
export const KIWIFY_CHECKOUT_URL = "https://pay.kiwify.com.br/hluBo69";

const STORAGE_KEY = "fossa_tracking_attribution";

const CAPTURE_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
  "src",
  "sck",
  "s1",
  "s2",
  "s3",
] as const;

const KIWIFY_FORWARD_KEYS = [
  "src",
  "sck",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "s1",
  "s2",
  "s3",
] as const;

export type AttributionData = Partial<Record<(typeof CAPTURE_KEYS)[number], string>> & {
  referrer?: string;
  landing_page?: string;
  first_page?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function readAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionData) : {};
  } catch {
    return {};
  }
}

export function captureAttribution(): AttributionData {
  if (typeof window === "undefined") return {};

  const current = readAttribution();
  const params = new URLSearchParams(window.location.search);

  for (const key of CAPTURE_KEYS) {
    const value = params.get(key);
    if (value) current[key] = value;
  }

  if (!current.first_page) current.first_page = window.location.href;
  current.landing_page = window.location.href;

  if (!current.referrer && document.referrer) {
    current.referrer = document.referrer;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Tracking must never block the purchase flow.
  }

  return current;
}

export function buildKiwifyCheckoutUrl(
  attribution: AttributionData = readAttribution(),
  baseUrl = KIWIFY_CHECKOUT_URL,
): string {
  const url = new URL(baseUrl);

  for (const key of KIWIFY_FORWARD_KEYS) {
    const value = attribution[key];
    if (value) url.searchParams.set(key, value);
  }

  return url.toString();
}

export function getTrackedKiwifyCheckoutUrl(): string {
  return buildKiwifyCheckoutUrl(captureAttribution());
}

export function trackMetaEvent(
  eventName: "ViewContent" | "InitiateCheckout",
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  if (params) {
    window.fbq("track", eventName, params);
  } else {
    window.fbq("track", eventName);
  }
}
