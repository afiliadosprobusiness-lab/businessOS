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

- Standard conversion event: `cta_whatsapp_click`.
- `cta_whatsapp_click` payload:
  - `page_path`
  - `page_title`
  - `source` (`landing|blog|header|footer|unknown`)
  - `variant` (`hero|floating|blog_end|blog_inline|unknown`)
  - `landing_key` (when applicable)
  - `blog_slug` (when applicable)
  - `whatsapp_number` (optional)
  - `whatsapp_message` (optional, max 100 chars)
- Implementation uses a single global click delegation listener for:
  - `wa.me` links
  - `api.whatsapp.com` links
  - `[data-cta="whatsapp"]` elements
- Reusable landing/blog CTA templates expose `data-cta`, `data-source`, `data-variant`, `data-landing-key`, and `data-blog-slug`.
- GTM is globally loaded in `index.html` with `NEXT_PUBLIC_GTM_ID`.
- SPA pageviews are pushed on every route change with `event: "page_view"`, `page_path`, and `page_title`.
- GA4 is configured from GTM (no direct GA4 tracking code), with `NEXT_PUBLIC_GA4_ID` available for future use.

## Environment Variables

Required:

- None.

Optional:

- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA4_ID`
- `VITE_SITE_URL`
- `VITE_WhatsAppNumber` or `VITE_WHATSAPP_NUMBER`
- `VITE_WhatsAppDefaultMessage` or `VITE_WHATSAPP_DEFAULT_MESSAGE`

## How To Verify GA4 Is Working In BusinessOS

1. Set `NEXT_PUBLIC_GTM_ID=GTM-PHMJ4Z9Q` and `NEXT_PUBLIC_GA4_ID=G-6RFTYPV9JK` in preview and production envs.
2. Open GTM Preview (Tag Assistant) against the BusinessOS domain.
3. Test direct and internal SPA navigation on `/blog`, `/blog/:slug`, and SEO landings.
4. Confirm in Tag Assistant:
   - container `GTM-PHMJ4Z9Q` loads on every route,
   - `page_view` fires on each route change,
   - no duplicate `page_view` for one navigation.
5. In GTM, configure GA4 (`G-6RFTYPV9JK`) with `All Pages` and `History Change` triggers for SPA flows.
6. Prevent duplicate pageviews:
   - use `send_page_view: false` when manual `page_view` is sent via `dataLayer`.
7. Validate in `GA4 > Realtime` that pageviews arrive with the expected `page_path`.

## How To Configure WhatsApp Conversion In GTM/GA4

1. In GTM create a `Custom Event` trigger with event name `cta_whatsapp_click`.
2. Create a `GA4 Event` tag:
   - Event name: `cta_whatsapp_click`
   - Configuration tag: existing Google tag (`G-6RFTYPV9JK`)
   - Map parameters: `page_path`, `page_title`, `source`, `variant`, `landing_key`, `blog_slug`, `whatsapp_number`, `whatsapp_message`
   - Trigger: `cta_whatsapp_click`
3. Publish the GTM container.
4. In GA4 (`Admin > Events`), mark `cta_whatsapp_click` as a Conversion.

## How To Validate cta_whatsapp_click

1. Open GTM Preview (Tag Assistant).
2. Validate clicks on:
   - landing hero WhatsApp CTA,
   - landing floating WhatsApp CTA,
   - blog end CTA,
   - blog inline CTA (when available),
   - any `wa.me` / `api.whatsapp.com` link.
3. Confirm `cta_whatsapp_click` includes at least `page_path`, `source`, and `variant`.
4. Confirm the event in `GA4 > Realtime`.

## Security Notes

- No secrets should be committed.
- No client-side execution from persisted content.
- No private key exposure in frontend.

## Recent Changes

- 2026-02-14: Normalized content slug extraction to support Windows path separators and prevent template posts from being published.
- 2026-02-14: Added Vercel SPA fallback (`vercel.json`) to avoid server-side 404 on deep links (blog and landing routes).
- 2026-02-14: Removed legacy branding references (meta tags, Vite plugin, dev dependency, legacy favicon) and kept custom 404 UI.
- 2026-02-14: Standardized WhatsApp CTA message format to `Hola, quiero implementar BusinessOS para [niche] in [city]` with default number `+51 924 464 410`.
- 2026-02-14: Added automatic blog CTA system (mandatory end CTA + optional inline CTA via frontmatter).
- 2026-02-14: Added programmatic generator for 50 niche+city SEO landings.
- 2026-02-14: Added `/soluciones` index page with filters and links to generated landings.
- 2026-02-14: Upgraded existing blog content quality (deeper structure, internal links, conversion intent).
- 2026-02-14: Extended sitemap/robots generation to include programmatic routes.
- 2026-02-14: Added global GTM install (`NEXT_PUBLIC_GTM_ID`) and SPA `page_view` route tracking via `dataLayer`; GA4 setup is managed in GTM with `NEXT_PUBLIC_GA4_ID`.
- 2026-02-14: Migrated WhatsApp conversion tracking to global delegation and standardized `cta_whatsapp_click` payload across landing/blog templates.
