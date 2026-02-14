import type { LandingContent, LandingFaq, LandingStep } from "@/lib/content/types";

const landingModules = import.meta.glob("../../../content/landings/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

const catalogModules = import.meta.glob("../../../content/seo/landing-catalog.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

interface CatalogNiche {
  slug: string;
  label: string;
  businessLabel: string;
  painPoints: string[];
  benefits: string[];
  faq: LandingFaq[];
}

interface CatalogCity {
  slug: string;
  name: string;
  marketContext: string;
}

interface LandingCatalog {
  niches: CatalogNiche[];
  cities: CatalogCity[];
  introTemplates: string[];
  introSupportTemplates: string[];
  problemDescriptionTemplates: string[];
  cityFaqTemplates: LandingFaq[];
  stepTemplates: LandingStep[];
  includes: string[];
  heroCtaLabel: string;
}

const extractSlugFromPath = (filePath: string) => {
  const match = filePath.match(/\/([^/]+)\.json$/);
  return match?.[1] || "";
};

const ensureStringArray = (value: unknown) => (Array.isArray(value) ? value.filter((item) => typeof item === "string") : []);

const ensureFaqArray = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((faq) => typeof faq?.question === "string" && typeof faq?.answer === "string")
    : [];

const replaceTokens = (value: string, tokens: Record<string, string>) =>
  Object.entries(tokens).reduce((acc, [key, replacement]) => acc.replaceAll(`{${key}}`, replacement), value);

const humanizeSlug = (value: string) => value.replaceAll("-", " ").trim();

const deriveNicheCity = (slug: string, keyword: string) => {
  const crmPattern = slug.match(/^crm-para-(.+)-en-(.+)$/);
  if (crmPattern) {
    return {
      nicheSlug: crmPattern[1],
      citySlug: crmPattern[2],
      niche: humanizeSlug(crmPattern[1]),
      city: humanizeSlug(crmPattern[2]),
    };
  }

  const crmSimplePattern = slug.match(/^crm-para-(.+)$/);
  if (crmSimplePattern) {
    return {
      nicheSlug: crmSimplePattern[1],
      citySlug: "peru",
      niche: humanizeSlug(crmSimplePattern[1]),
      city: "peru",
    };
  }

  const peruPattern = slug.match(/^(.+)-peru$/);
  if (peruPattern) {
    return {
      nicheSlug: peruPattern[1],
      citySlug: "peru",
      niche: humanizeSlug(peruPattern[1]),
      city: "peru",
    };
  }

  const keywordPattern = keyword.toLowerCase().match(/^.+para\s+(.+?)\s+en\s+(.+)$/);
  if (keywordPattern) {
    return {
      nicheSlug: keywordPattern[1].replace(/\s+/g, "-"),
      citySlug: keywordPattern[2].replace(/\s+/g, "-"),
      niche: keywordPattern[1].trim(),
      city: keywordPattern[2].trim(),
    };
  }

  return {
    nicheSlug: slug,
    citySlug: "peru",
    niche: keyword.toLowerCase().replace(/^.+para\s+/, "").trim() || "negocio",
    city: "peru",
  };
};

const hashSeed = (value: string) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
};

const rotateBySeed = <T,>(items: T[], seed: number) => {
  if (items.length === 0) {
    return items;
  }

  const offset = seed % items.length;
  return [...items.slice(offset), ...items.slice(0, offset)];
};

const sanitizeCatalog = (value: unknown): LandingCatalog => {
  if (!value || typeof value !== "object") {
    return {
      niches: [],
      cities: [],
      introTemplates: [],
      introSupportTemplates: [],
      problemDescriptionTemplates: [],
      cityFaqTemplates: [],
      stepTemplates: [],
      includes: [],
      heroCtaLabel: "Hablar por WhatsApp",
    };
  }

  const source = value as Partial<LandingCatalog>;

  const niches = Array.isArray(source.niches)
    ? source.niches.filter(
        (niche) =>
          typeof niche?.slug === "string" &&
          typeof niche?.label === "string" &&
          typeof niche?.businessLabel === "string" &&
          Array.isArray(niche?.painPoints) &&
          Array.isArray(niche?.benefits),
      )
    : [];

  const cities = Array.isArray(source.cities)
    ? source.cities.filter(
        (city) =>
          typeof city?.slug === "string" && typeof city?.name === "string" && typeof city?.marketContext === "string",
      )
    : [];

  return {
    niches,
    cities,
    introTemplates: ensureStringArray(source.introTemplates),
    introSupportTemplates: ensureStringArray(source.introSupportTemplates),
    problemDescriptionTemplates: ensureStringArray(source.problemDescriptionTemplates),
    cityFaqTemplates: ensureFaqArray(source.cityFaqTemplates),
    stepTemplates: Array.isArray(source.stepTemplates)
      ? source.stepTemplates.filter((step) => typeof step?.title === "string" && typeof step?.description === "string")
      : [],
    includes: ensureStringArray(source.includes),
    heroCtaLabel: source.heroCtaLabel || "Hablar por WhatsApp",
  };
};

const catalogSource = sanitizeCatalog(Object.values(catalogModules)[0]);

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
  const targeting = deriveNicheCity(slug, source.keyword);

  return {
    slug,
    source: "static",
    nicheSlug: targeting.nicheSlug,
    citySlug: targeting.citySlug,
    niche: targeting.niche,
    city: targeting.city,
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
    intro: source.intro,
    problem: {
      title: source.problem.title || "Problema",
      description: source.problem.description || "",
      bullets: ensureStringArray(source.problem.bullets),
    },
    includes: source.includes,
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

const createLandingFromCatalog = (niche: CatalogNiche, city: CatalogCity): LandingContent => {
  const seedBase = `${niche.slug}-${city.slug}`;
  const seed = hashSeed(seedBase);
  const tokens = {
    city: city.name,
    citySlug: city.slug,
    niche: niche.label,
    businessLabel: niche.businessLabel,
    marketContext: city.marketContext,
  };

  const introTemplates = rotateBySeed(catalogSource.introTemplates, seed);
  const supportTemplates = rotateBySeed(catalogSource.introSupportTemplates, seed + 2);
  const problemTemplates = rotateBySeed(catalogSource.problemDescriptionTemplates, seed + 5);

  const introParagraphs = [
    replaceTokens(introTemplates[0] || "", tokens),
    replaceTokens(supportTemplates[0] || "", tokens),
    replaceTokens(introTemplates[1] || supportTemplates[1] || "", tokens),
  ].filter(Boolean);

  const faqItems = [...niche.faq, ...catalogSource.cityFaqTemplates]
    .map((faq) => ({
      question: replaceTokens(faq.question, tokens),
      answer: replaceTokens(faq.answer, tokens),
    }))
    .slice(0, 5);

  const rotatingBenefits = rotateBySeed(niche.benefits, seed).slice(0, 3);
  const rotatingPainPoints = rotateBySeed(niche.painPoints, seed).slice(0, 3);

  const slug = `crm-para-${niche.slug}-en-${city.slug}`;
  const keyword = `crm para ${niche.label} en ${city.name.toLowerCase()}`;

  return {
    slug,
    source: "catalog",
    nicheSlug: niche.slug,
    citySlug: city.slug,
    niche: niche.label,
    city: city.name.toLowerCase(),
    keyword,
    variant: `${niche.slug}-${city.slug}`,
    seo: {
      title: `CRM para ${niche.label} en ${city.name} | BusinessOS`,
      description: `Implementa un CRM para ${niche.label} en ${city.name} y ordena captacion, seguimiento y cierre con BusinessOS.`,
      canonicalPath: `/${slug}`,
      schemaType: "Service",
    },
    hero: {
      eyebrow: `BusinessOS para ${niche.label} en ${city.name}`,
      headline: keyword,
      subheadline: replaceTokens(supportTemplates[0] || introTemplates[0] || "", tokens),
      ctaLabel: catalogSource.heroCtaLabel || "Hablar por WhatsApp",
      ctaMessage: `Hola, quiero implementar BusinessOS para ${niche.label} en ${city.name.toLowerCase()}`,
    },
    intro: {
      title: `Como mejorar tu conversion comercial en ${city.name}`,
      paragraphs: introParagraphs,
    },
    problem: {
      title: `Problemas frecuentes de ${niche.label} en ${city.name}`,
      description: replaceTokens(problemTemplates[0] || "", tokens),
      bullets: rotatingPainPoints,
    },
    includes: {
      title: "Que incluye BusinessOS",
      items: catalogSource.includes,
    },
    benefits: {
      title: `Beneficios de BusinessOS para ${niche.label}`,
      items: [
        ...rotatingBenefits,
        `Visibilidad de conversion por canal y etapa comercial en ${city.name}.`,
      ].slice(0, 4),
    },
    steps: {
      title: "Como funciona en 3 pasos",
      items: catalogSource.stepTemplates.map((step) => ({
        title: step.title,
        description: replaceTokens(step.description, tokens),
      })),
    },
    faqs: faqItems,
  };
};

const staticLandings: LandingContent[] = Object.entries(landingModules)
  .map(([filePath, value]) => toLanding(filePath, value))
  .filter((landing): landing is LandingContent => Boolean(landing));

const generatedLandings: LandingContent[] = catalogSource.niches.flatMap((niche) =>
  catalogSource.cities.map((city) => createLandingFromCatalog(niche, city)),
);

const usedSlugs = new Set(staticLandings.map((landing) => landing.slug));

const landingCache: LandingContent[] = [...staticLandings, ...generatedLandings.filter((landing) => !usedSlugs.has(landing.slug))].sort(
  (a, b) => a.slug.localeCompare(b.slug),
);

export const getAllLandings = () => landingCache;

export const getLandingBySlug = (slug?: string) => {
  if (!slug) {
    return null;
  }

  return landingCache.find((landing) => landing.slug === slug) || null;
};

export const getCatalogNiches = () =>
  catalogSource.niches.map((niche) => ({
    slug: niche.slug,
    label: niche.label,
  }));

export const getCatalogCities = () =>
  catalogSource.cities.map((city) => ({
    slug: city.slug,
    name: city.name,
  }));

export const getProgrammaticLandings = () => landingCache.filter((landing) => landing.source === "catalog");
