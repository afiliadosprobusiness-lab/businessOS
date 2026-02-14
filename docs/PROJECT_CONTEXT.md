# Project Context

Keep this document current so contributors and agents can ship safely.

## What This Project Is

- Product: BusinessOS conversion website.
- Audience: SMB owners and commercial teams in Peru/LATAM.
- Goals: book demos and capture organic demand through SEO landings.

## Tech Stack

- Frontend: Vite, React, TypeScript, TailwindCSS, shadcn/ui.
- Routing: `react-router-dom`.
- Demo booking: `@calcom/embed-react`.
- Architecture: frontend-only MVP (no backend service in this repo).
- Deployment: Vercel SPA fallback is configured via `vercel.json` to serve `index.html` on internal routes.

## Content Architecture

- Blog posts: `content/blog/*.mdx`.
- Blog files prefixed with `_` are treated as templates and excluded from `/blog` and sitemap.
- Static SEO landings: `content/landings/*.json`.
- Programmatic SEO catalog: `content/seo/landing-catalog.json`.
- Content loaders: `src/lib/content`.

## Routes

- `/`
- `/es`
- `/en`
- `/agendar-demo`
- `/agenda-confirmada`
- `/blog`
- `/blog/:slug`
- `/soluciones`
- `/:landingSlug`

`/:landingSlug` supports both static and catalog-generated landing slugs.

## Key Flows

### Demo Flow

1. User clicks demo CTA.
2. App navigates to `/agendar-demo`.
3. Cal inline booking widget is rendered.
4. If no slots are available, WhatsApp fallback is shown.
5. On `bookingSuccessfulV2`, app redirects to `/agenda-confirmada`.

### Blog Flow

1. User opens `/blog` (file-based index).
2. User opens `/blog/:slug`.
3. Every post renders an automatic end CTA.
4. Optional inline CTA is enabled via frontmatter (`ctaVariant: soft`).
5. Internal markdown links are intercepted and routed via React Router (no full reload).

### SEO Landing Flow

1. User opens a niche/city landing (`/:landingSlug`).
2. Landing includes keyword H1, intro, problem, BusinessOS includes, benefits, 3 steps, FAQs.
3. WhatsApp CTA appears in hero and persistent floating button.

### Solutions Directory

- `/soluciones` lists all 50 programmatic landings with niche/city filters.

## SEO & Indexability

- Per-page metadata: title, description, canonical.
- OG + Twitter card tags.
- JSON-LD:
  - `BlogPosting` for blog detail pages.
  - `Service`/`WebPage` for landing pages.
- Build pipeline generates:
  - `public/sitemap.xml`
  - `public/robots.txt`

Sitemap includes static routes, blog pages, static landings, and catalog-generated landings.

## Tracking

If tracking is present (`window.gtag` or `window.dataLayer`):

- Event: `cta_whatsapp_click`
- Landing params: `{ page, variant }`
- Blog params: `{ page, variant: blog_end|blog_inline, source: blog, slug }`

## Environment Variables

Required:

- None.

Optional:

- `VITE_SITE_URL`
- `VITE_WhatsAppNumber` or `VITE_WHATSAPP_NUMBER`
- `VITE_WhatsAppDefaultMessage` or `VITE_WHATSAPP_DEFAULT_MESSAGE`

## Security Notes

- No secrets should be committed.
- No client-side execution from persisted content.
- No private key exposure in frontend.

## Recent Changes

- 2026-02-14: Normalized content slug extraction to support Windows path separators and prevent template posts from being published.
- 2026-02-14: Added Vercel SPA fallback (`vercel.json`) to avoid server-side 404 on deep links (blog and landing routes).
- 2026-02-14: Removed legacy branding references (meta tags, Vite plugin, dev dependency, legacy favicon) and kept custom 404 UI.
- 2026-02-14: Standardized WhatsApp CTA message format to `Hola, quiero implementar BusinessOS para [niche] en [city]` with default number `+51 924 464 410`.
- 2026-02-14: Added automatic blog CTA system (mandatory end CTA + optional inline CTA via frontmatter).
- 2026-02-14: Added programmatic generator for 50 niche+city SEO landings.
- 2026-02-14: Added `/soluciones` index page with filters and links to generated landings.
- 2026-02-14: Upgraded existing blog content quality (deeper structure, internal links, conversion intent).
- 2026-02-14: Extended sitemap/robots generation to include programmatic routes.
