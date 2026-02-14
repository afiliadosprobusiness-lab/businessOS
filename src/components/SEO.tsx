import { useEffect } from "react";
import { buildAbsoluteUrl } from "@/lib/site";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
  schema?: Record<string, unknown>;
}

const MANAGED_ATTR = "data-seo-managed";

const clearManagedTags = () => {
  document
    .querySelectorAll(`meta[${MANAGED_ATTR}], link[${MANAGED_ATTR}], script[${MANAGED_ATTR}]`)
    .forEach((node) => node.remove());
};

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  const meta = document.createElement("meta");
  meta.setAttribute(attribute, key);
  meta.setAttribute("content", content);
  meta.setAttribute(MANAGED_ATTR, "true");
  document.head.appendChild(meta);
};

const upsertCanonical = (url: string) => {
  const canonical = document.createElement("link");
  canonical.setAttribute("rel", "canonical");
  canonical.setAttribute("href", url);
  canonical.setAttribute(MANAGED_ATTR, "true");
  document.head.appendChild(canonical);
};

const upsertSchema = (schema: Record<string, unknown>) => {
  const script = document.createElement("script");
  script.setAttribute("type", "application/ld+json");
  script.setAttribute(MANAGED_ATTR, "true");
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
};

const SEO = ({ title, description, path, image = "/favicon.svg", type = "website", robots = "index, follow", schema }: SEOProps) => {
  useEffect(() => {
    const canonicalUrl = buildAbsoluteUrl(path);
    const imageUrl = buildAbsoluteUrl(image);

    clearManagedTags();
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);

    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    upsertCanonical(canonicalUrl);

    if (schema) {
      upsertSchema(schema);
    }
  }, [description, image, path, robots, schema, title, type]);

  return null;
};

export default SEO;