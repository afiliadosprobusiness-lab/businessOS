import type { LandingContent } from "@/lib/content/types";

const landingModules = import.meta.glob("../../../content/landings/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

const extractSlugFromPath = (filePath: string) => {
  const match = filePath.match(/\/([^/]+)\.json$/);
  return match?.[1] || "";
};

const ensureStringArray = (value: unknown) => (Array.isArray(value) ? value.filter((item) => typeof item === "string") : []);

const toLanding = (filePath: string, value: unknown): LandingContent | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const source = value as Partial<LandingContent>;
  const slug = source.slug || extractSlugFromPath(filePath);

  if (!slug || !source.keyword || !source.hero || !source.problem || !source.benefits || !source.steps || !source.seo) {
    return null;
  }

  const steps = Array.isArray(source.steps.items)
    ? source.steps.items.filter((step) => typeof step?.title === "string" && typeof step?.description === "string")
    : [];

  const faqs = Array.isArray(source.faqs)
    ? source.faqs.filter((faq) => typeof faq?.question === "string" && typeof faq?.answer === "string")
    : [];

  return {
    slug,
    keyword: source.keyword,
    variant: source.variant || slug,
    seo: {
      title: source.seo.title,
      description: source.seo.description,
      canonicalPath: source.seo.canonicalPath || `/${slug}`,
      ogImage: source.seo.ogImage,
      schemaType: source.seo.schemaType || "Service",
    },
    hero: {
      eyebrow: source.hero.eyebrow || "BusinessOS",
      headline: source.keyword,
      subheadline: source.hero.subheadline || "",
      ctaLabel: source.hero.ctaLabel || "Hablar por WhatsApp",
      ctaMessage: source.hero.ctaMessage,
    },
    problem: {
      title: source.problem.title || "Problema",
      description: source.problem.description || "",
      bullets: ensureStringArray(source.problem.bullets),
    },
    benefits: {
      title: source.benefits.title || "Beneficios",
      items: ensureStringArray(source.benefits.items),
    },
    steps: {
      title: source.steps.title || "Como funciona en 3 pasos",
      items: steps.slice(0, 3),
    },
    faqs,
  };
};

const landingCache: LandingContent[] = Object.entries(landingModules)
  .map(([filePath, value]) => toLanding(filePath, value))
  .filter((landing): landing is LandingContent => Boolean(landing));

export const getAllLandings = () => landingCache;

export const getLandingBySlug = (slug?: string) => {
  if (!slug) {
    return null;
  }

  return landingCache.find((landing) => landing.slug === slug) || null;
};