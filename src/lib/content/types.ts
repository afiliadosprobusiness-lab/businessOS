export interface SeoContent {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  schemaType?: "Service" | "WebPage";
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  ctaVariant: "default" | "soft" | "none";
  ctaLanding?: string;
  ctaMessage?: string;
  body: string;
}

export interface LandingStep {
  title: string;
  description: string;
}

export interface LandingFaq {
  question: string;
  answer: string;
}

export interface LandingContent {
  slug: string;
  keyword: string;
  variant: string;
  source?: "static" | "catalog";
  nicheSlug?: string;
  citySlug?: string;
  niche?: string;
  city?: string;
  seo: SeoContent;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    ctaLabel: string;
    ctaMessage?: string;
  };
  problem: {
    title: string;
    description: string;
    bullets: string[];
  };
  benefits: {
    title: string;
    items: string[];
  };
  intro?: {
    title: string;
    paragraphs: string[];
  };
  includes?: {
    title: string;
    items: string[];
  };
  steps: {
    title: string;
    items: LandingStep[];
  };
  faqs: LandingFaq[];
}
