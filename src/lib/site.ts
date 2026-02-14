const normalizeUrl = (url: string) => url.replace(/\/$/, "");

const fallbackSiteUrl = "https://businessos.pe";

export const SITE_URL = normalizeUrl(
  import.meta.env.VITE_SITE_URL || import.meta.env.VITE_SITEURL || fallbackSiteUrl,
);

export const buildAbsoluteUrl = (path: string) => {
  if (!path) {
    return SITE_URL;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};