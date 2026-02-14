const MAX_WHATSAPP_MESSAGE_LENGTH = 100;
const LOCAL_BASE_URL = "https://businessos.local";
const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const LONG_NUMBER_PATTERN = /\d{7,}/;

const KNOWN_SOURCES = ["landing", "blog", "header", "footer", "unknown"] as const;
const KNOWN_VARIANTS = ["hero", "floating", "blog_end", "blog_inline", "unknown"] as const;
const RESERVED_PATHS = new Set(["", "es", "en", "agendar-demo", "agenda-confirmada", "blog", "soluciones"]);

export type WhatsAppSource = (typeof KNOWN_SOURCES)[number];
export type WhatsAppVariant = (typeof KNOWN_VARIANTS)[number];

export interface WhatsAppTrackingDataset {
  cta?: string;
  source?: string;
  variant?: string;
  landingKey?: string;
  blogSlug?: string;
}

export interface WhatsAppTrackingContext {
  href?: string | null;
  pathname: string;
  pageTitle: string;
  dataset?: WhatsAppTrackingDataset;
}

export interface WhatsAppClickPayload {
  event: "cta_whatsapp_click";
  page_path: string;
  page_title: string;
  source: WhatsAppSource;
  variant: WhatsAppVariant;
  landing_key?: string;
  blog_slug?: string;
  whatsapp_number?: string;
  whatsapp_message?: string;
}

const cleanValue = (value?: string | null) => value?.trim() || undefined;
const cleanPhoneNumber = (value?: string | null) => value?.replace(/[^\d]/g, "") || undefined;

const normalizeSource = (value?: string): WhatsAppSource => {
  if (!value) {
    return "unknown";
  }

  return KNOWN_SOURCES.includes(value as WhatsAppSource) ? (value as WhatsAppSource) : "unknown";
};

const normalizeVariant = (value?: string): WhatsAppVariant => {
  if (!value) {
    return "unknown";
  }

  return KNOWN_VARIANTS.includes(value as WhatsAppVariant) ? (value as WhatsAppVariant) : "unknown";
};

const parseHrefAsUrl = (href?: string | null) => {
  const normalizedHref = cleanValue(href);
  if (!normalizedHref) {
    return null;
  }

  try {
    return new URL(normalizedHref, LOCAL_BASE_URL);
  } catch {
    return null;
  }
};

const isWhatsAppUrl = (url: URL | null) => {
  if (!url) {
    return false;
  }

  const hostname = url.hostname.toLowerCase();
  return hostname === "wa.me" || hostname === "api.whatsapp.com";
};

const sanitizeMessage = (message?: string | null) => {
  const normalized = message?.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return undefined;
  }

  if (EMAIL_PATTERN.test(normalized) || LONG_NUMBER_PATTERN.test(normalized)) {
    return undefined;
  }

  return normalized.slice(0, MAX_WHATSAPP_MESSAGE_LENGTH);
};

const inferBlogSlugFromPath = (pathname: string) => {
  const match = pathname.match(/^\/blog\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : undefined;
};

const inferLandingKeyFromPath = (pathname: string) => {
  const cleanedPath = pathname.replace(/^\/+|\/+$/g, "");
  if (!cleanedPath || cleanedPath.includes("/") || RESERVED_PATHS.has(cleanedPath)) {
    return undefined;
  }

  return cleanedPath;
};

const extractWhatsAppMetadata = (url: URL | null) => {
  if (!isWhatsAppUrl(url) || !url) {
    return { whatsappNumber: undefined, whatsappMessage: undefined };
  }

  const hostname = url.hostname.toLowerCase();
  if (hostname === "wa.me") {
    const rawNumber = cleanValue(url.pathname.split("/").filter(Boolean)[0]);
    return {
      whatsappNumber: cleanPhoneNumber(rawNumber),
      whatsappMessage: sanitizeMessage(url.searchParams.get("text")),
    };
  }

  return {
    whatsappNumber: cleanPhoneNumber(url.searchParams.get("phone")),
    whatsappMessage: sanitizeMessage(url.searchParams.get("text")),
  };
};

export const buildWhatsAppClickPayload = (context: WhatsAppTrackingContext): WhatsAppClickPayload | null => {
  const url = parseHrefAsUrl(context.href);
  const hasWhatsAppHref = isWhatsAppUrl(url);
  const hasWhatsAppMarker = context.dataset?.cta === "whatsapp";

  if (!hasWhatsAppHref && !hasWhatsAppMarker) {
    return null;
  }

  const source = normalizeSource(context.dataset?.source);
  const variant = normalizeVariant(context.dataset?.variant);
  const landingKey = cleanValue(context.dataset?.landingKey) || inferLandingKeyFromPath(context.pathname);
  const blogSlug = cleanValue(context.dataset?.blogSlug) || inferBlogSlugFromPath(context.pathname);
  const metadata = extractWhatsAppMetadata(url);
  const payload: WhatsAppClickPayload = {
    event: "cta_whatsapp_click",
    page_path: context.pathname || "/",
    page_title: context.pageTitle || "",
    source,
    variant,
  };

  if (landingKey) {
    payload.landing_key = landingKey;
  }

  if (blogSlug) {
    payload.blog_slug = blogSlug;
  }

  if (metadata.whatsappNumber) {
    payload.whatsapp_number = metadata.whatsappNumber;
  }

  if (metadata.whatsappMessage) {
    payload.whatsapp_message = metadata.whatsappMessage;
  }

  return payload;
};
