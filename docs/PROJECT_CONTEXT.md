# Project Context

Keep this doc short and current. It exists to help contributors and agents quickly understand the project.

## What This Project Is

- Product: BusinessOS marketing landing page.
- Target users: SMB founders and teams evaluating an all-in-one business system.
- Primary use cases: Explain the 3-product pack and drive demo bookings.

## Tech Stack

- Frontend: Vite, React, TypeScript, TailwindCSS, shadcn/ui.
- Backend/services: No backend in this repo (frontend-only MVP).
- Auth: None.
- Data store: None.
- Hosting/deploy: Intended for Vercel/static hosting.

## Key Flows

- Signup/login: Not applicable.
- Core user flow: User lands on homepage, reviews sections (problem, solution, pricing), then clicks `Agendar demo`.
- Demo booking flow: `Agendar demo` opens Cal.com popup/modal using `@calcom/embed-react` (`meet-demo-businessos`).
- Payments/subscriptions (if any): Informational pricing only; no checkout in this repo.

## Architecture Notes

- High-level modules: Page sections under `src/components`, assembled in `src/pages/Index.tsx`.
- Critical dependencies/integrations: Cal.com embed React SDK.
- Caching/perf considerations: Static content, lazy-loaded Cal iframe/popup by external SDK.

## Environment Variables

- Required: None.
- Optional: None currently (Cal namespace/link are hardcoded in `src/components/CalBooking.tsx`).

## Operational Notes

- Environments (dev/staging/prod): Local dev via Vite, production as static frontend deployment.
- Rollout/deploy: Build with `npm run build` and deploy static assets.
- Monitoring/logging: None configured in this repo.

## Recent Changes

- 2026-02-13: Added Cal.com popup booking triggers for all `Agendar demo` buttons and initialized Cal API globally.
- 2026-02-13: Updated hero secondary CTA to smooth-scroll to `#solucion`.
- 2026-02-13: Added new SVG favicon and linked it in `index.html`.
- 2026-02-13: Improved final CTA button visual hierarchy and interaction states.
- 2026-02-13: Added handling for Cal `routed` events with `externalRedirectUrl` to open external links (e.g., WhatsApp) in a new tab from the parent window.
