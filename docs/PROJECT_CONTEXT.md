# Project Context

Keep this doc short and current. It exists to help contributors and agents quickly understand the project.

## What This Project Is

- Product: BusinessOS marketing landing page.
- Target users: SMB founders and teams evaluating an all-in-one business system.
- Primary use cases: Explain the 3-product pack and drive demo bookings.

## Tech Stack

- Frontend: Vite, React, TypeScript, TailwindCSS, shadcn/ui.
- Routing: `react-router-dom`.
- Booking integration: `@calcom/embed-react` (namespace `meet-demo-businessos`).
- Backend/services: No backend in this repo (frontend-only MVP).
- Auth: None.
- Data store: None.
- Hosting/deploy: Intended for Vercel/static hosting.

## Key Flows

- Signup/login: Not applicable.
- Core user flow: User lands on homepage, reviews sections (problem, solution, pricing), then clicks `Agendar demo`.
- Demo booking flow:
  1. Any `Agendar demo` CTA navigates to `/agendar-demo`.
  2. The Cal inline selector renders inside that page.
  3. On Cal event `bookingSuccessfulV2`, app redirects to `/agenda-confirmada`.
- Payments/subscriptions (if any): Informational pricing only; no checkout in this repo.

## Architecture Notes

- High-level modules: Page sections under `src/components`, assembled in `src/pages/Index.tsx`.
- Routes:
  - `/` -> landing
  - `/agendar-demo` -> inline Cal scheduler
  - `/agenda-confirmada` -> post-booking confirmation/next-steps page
- Caching/perf considerations: Static content; booking happens via Cal embed in dedicated route.

## Environment Variables

- Required: None.
- Optional: None currently (Cal namespace/link are hardcoded in `src/pages/ScheduleDemo.tsx`).

## Operational Notes

- Environments (dev/staging/prod): Local dev via Vite, production as static frontend deployment.
- Rollout/deploy: Build with `npm run build` and deploy static assets.
- Monitoring/logging: None configured in this repo.

## Recent Changes

- 2026-02-13: Replaced popup-based Cal booking with internal route `/agendar-demo` using `@calcom/embed-react`.
- 2026-02-13: Added booking confirmation page `/agenda-confirmada` and redirect on Cal `bookingSuccessfulV2`.
- 2026-02-13: Fixed hero CTA `Ver como funciona` to scroll to `#como-funciona` (with `scroll-mt-24` in section).
