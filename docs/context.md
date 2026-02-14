# Contexto del Proyecto - BusinessOS

## Producto

BusinessOS es un sistema integral que combina:

- Fast Page (captacion y conversion web)
- Leads Widget (captura y calificacion)
- ContApp (orden operativo/financiero)

El producto se comercializa como pack operativo completo.

## Objetivo del Proyecto

La web tiene dos objetivos de negocio:

- Agendar demos del sistema BusinessOS.
- Captar demanda organica SEO y convertirla a conversaciones por WhatsApp.

## Stack Tecnologico

- Vite + React + TypeScript.
- TailwindCSS + shadcn/ui.
- React Router DOM.
- Cal.com embed react SDK (`@calcom/embed-react`).
- Frontend-first sin backend propio.

## Arquitectura de Contenido

- Blog file-based: `content/blog/*.mdx`.
- Archivos blog que empiezan con `_` son plantillas internas y no se publican en `/blog` ni en sitemap.
- Landings estaticas: `content/landings/*.json`.
- Landings programaticas (50): catalogo en `content/seo/landing-catalog.json`.
- Loader reutilizable en `src/lib/content`.

## Rutas

- `/`
- `/es`
- `/en`
- `/agendar-demo`
- `/agenda-confirmada`
- `/blog`
- `/blog/:slug`
- `/soluciones`
- `/:landingSlug`

`/:landingSlug` soporta slugs de landings estaticas y programaticas.

## Flujos Principales

### Demo

1. CTA de demo -> `/agendar-demo`.
2. Reserva con Cal inline embed.
3. Si no hay horario, fallback a WhatsApp.
4. `bookingSuccessfulV2` -> `/agenda-confirmada`.

### Blog

1. Usuario entra a `/blog`.
2. Lista de posts desde MDX.
3. Detalle en `/blog/:slug`.
4. CTA automatico al final de todos los posts.
5. CTA inline opcional por frontmatter (`ctaVariant: soft`).

### Landings SEO

1. Usuario llega a una landing de nicho/ciudad.
2. Landing renderiza H1 keyword exacta + intro + problema + incluye + beneficios + 3 pasos + FAQs.
3. CTA WhatsApp en hero y boton flotante persistente.

### Soluciones

- `/soluciones` lista las 50 landings programaticas con filtros por rubro y ciudad.

## SEO Tecnico

- Metadata completa por pagina (title, description, canonical).
- OpenGraph + Twitter Cards.
- JSON-LD:
  - `BlogPosting` en `/blog/:slug`.
  - `Service`/`WebPage` en landings.
- `prebuild` genera:
  - `public/sitemap.xml`
  - `public/robots.txt`

Sitemap incluye rutas estaticas, blog y landings estaticas + programaticas.

## Tracking

Si existe tracking (`window.gtag` o `window.dataLayer`):

- Evento: `cta_whatsapp_click`
- Landings: `{ page, variant }`
- Blog: `{ page, variant: blog_end|blog_inline, source: blog, slug }`

## Variables de Entorno

Requeridas:

- Ninguna.

Opcionales:

- `VITE_SITE_URL`
- `VITE_WhatsAppNumber` o `VITE_WHATSAPP_NUMBER`
- `VITE_WhatsAppDefaultMessage` o `VITE_WHATSAPP_DEFAULT_MESSAGE`

## Seguridad

- No se manejan secretos en frontend.
- No se ejecuta codigo desde contenido persistido.
- No se exponen claves privadas.

## Cambios Recientes

- 2026-02-14: Se estandarizaron mensajes de CTA WhatsApp con formato `Hola, quiero implementar BusinessOS para [nicho] en [ciudad]` y numero por defecto `+51 924 464 410`.
- 2026-02-14: CTA automatico de blog (fin obligatorio + inline opcional por frontmatter) con tracking.
- 2026-02-14: Generador de 50 landings SEO (nicho x ciudad Peru) desde catalogo de archivos.
- 2026-02-14: Nueva ruta `/soluciones` con filtros y listado de landings programaticas.
- 2026-02-14: Mejora profunda de contenidos en posts existentes (estructura, enlaces internos y valor practico).
- 2026-02-14: Sitemap/robots ampliados para cubrir rutas programaticas.
