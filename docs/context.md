# Contexto del Proyecto - BusinessOS Landing

## Producto

BusinessOS es un sistema integral que incluye:

- FastPage -> creacion de landing pages optimizadas.
- Leads Widget -> sistema de precalificacion de leads.
- ContApp -> sistema de gestion contable.

BusinessOS se comercializa como un pack completo, no como herramientas individuales.

---

## Objetivo del Proyecto

Desarrollar una web orientada a conversion con dos objetivos operativos:

- Agendar demos del pack completo BusinessOS.
- Captar demanda organica SEO por nicho y convertirla a conversaciones por WhatsApp.

---

## Stack Tecnologico

- Vite + React + TypeScript.
- TailwindCSS + shadcn/ui.
- React Router DOM.
- Cal.com embed react SDK (`@calcom/embed-react`).
- Deploy objetivo en Vercel/static hosting.
- Arquitectura frontend-first, sin backend propio en el MVP.

---

## Arquitectura General

- Landing principal estatica optimizada para conversion.
- Modulo Blog SEO con contenido basado en archivos `content/blog/*.mdx`.
- Landings SEO por nicho con contenido basado en archivos `content/landings/*.json`.
- Loader reutilizable de contenido en `src/lib/content`.
- Layout reusable para landings en `src/components/landing/LandingLayout.tsx`.
- Capa SEO reutilizable en cliente (`src/components/SEO.tsx`) para metadata, OpenGraph, Twitter y JSON-LD.
- Generacion automatica de `public/sitemap.xml` y `public/robots.txt` en prebuild (`scripts/generate-seo-assets.mjs`).

---

## Rutas

- `/` -> landing principal.
- `/agendar-demo` -> agenda demo con Cal inline embed.
- `/agenda-confirmada` -> confirmacion post booking.
- `/blog` -> indice de articulos.
- `/blog/:slug` -> detalle de articulo SEO.
- `/:landingSlug` -> landing SEO dinamica por archivo (ej. `/crm-para-odontologos`).

---

## Flujos Principales

### Flujo Demo

1. Usuario hace click en cualquier CTA de demo.
2. Frontend navega a `/agendar-demo`.
3. Cal inline embed permite reservar horario.
4. Si no hay disponibilidad, se ofrece fallback por WhatsApp.
5. En `bookingSuccessfulV2`, redireccion a `/agenda-confirmada`.

### Flujo Blog

1. Usuario entra a `/blog`.
2. Revisa listado de posts generado desde archivos MDX.
3. Navega a `/blog/:slug` con metadata y schema `BlogPosting`.

### Flujo Landings SEO

1. Usuario llega a una landing nichada (`/:landingSlug`).
2. Consume propuesta de valor por secciones (problema, beneficios, 3 pasos, FAQs).
3. Hace click en CTA WhatsApp (hero o boton flotante persistente).
4. Si existe tracking (gtag/dataLayer), se dispara `cta_whatsapp_click` con `{ page, variant }`.

---

## Integraciones Externas

- Cal.com para agenda de demos.
- WhatsApp como mecanismo principal de conversion en landings SEO.
- Tracking opcional compatible con `window.gtag` y/o `window.dataLayer`.

---

## Variables de Entorno

Requeridas:

- Ninguna.

Opcionales:

- `VITE_SITE_URL` -> base URL para canonical/sitemap/robots.
- `VITE_WhatsAppNumber` o `VITE_WHATSAPP_NUMBER` -> numero WhatsApp destino.
- `VITE_WhatsAppDefaultMessage` o `VITE_WHATSAPP_DEFAULT_MESSAGE` -> mensaje por defecto para CTA WhatsApp.

---

## Seguridad

- El frontend no maneja secretos.
- No se almacenan datos sensibles en la landing.
- Esta prohibida la ejecucion de codigo desde contenido persistido.
- No existe exposicion de claves privadas en el cliente.

---

## Cambios Recientes

- 2026-02-14: Se implemento modulo Blog SEO (`/blog` + `/blog/:slug`) con contenido en `content/blog/*.mdx`.
- 2026-02-14: Se implementaron landings SEO dinamicas por archivo con CTA WhatsApp en hero y boton flotante persistente.
- 2026-02-14: Se agrego capa SEO reutilizable para metadata, OG, Twitter y JSON-LD en paginas existentes y nuevas.
- 2026-02-14: Se agrego script de generacion automatica de `sitemap.xml` y `robots.txt` en prebuild.
- 2026-02-13: Se agrego switch de modo oscuro en navbar (desktop y mobile) con aplicacion global tambien en `/agendar-demo`.
- 2026-02-13: Flujo de demo migrado de popup externo a ruta interna `/agendar-demo` con Cal inline embed.
- 2026-02-13: Se agrego ruta `/agenda-confirmada` y redireccion automatica despues de `bookingSuccessfulV2`.