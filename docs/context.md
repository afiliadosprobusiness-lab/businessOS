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
- Deploy SPA en Vercel con fallback configurado en `vercel.json` hacia `index.html`.

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
6. Enlaces internos dentro del markdown navegan con React Router (sin recarga completa).

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

- Evento estandar de conversion: `cta_whatsapp_click`.
- Payload de `cta_whatsapp_click`:
  - `page_path` (pathname actual)
  - `page_title` (document.title)
  - `source` (`landing|blog|header|footer|unknown`)
  - `variant` (`hero|floating|blog_end|blog_inline|unknown`)
  - `landing_key` (si aplica)
  - `blog_slug` (si aplica)
  - `whatsapp_number` (opcional)
  - `whatsapp_message` (opcional, truncado a 100 chars)
- Implementacion activa: delegacion global de clicks para `wa.me`, `api.whatsapp.com` y `[data-cta="whatsapp"]` con `dataLayer.push`.
- Los templates reutilizables de CTA (landing y blog) exponen `data-cta`, `data-source`, `data-variant` y metadatos de contexto (`data-landing-key`, `data-blog-slug`) para clasificar eventos sin editar 50+ archivos.
- GTM se instala globalmente desde `index.html` usando `NEXT_PUBLIC_GTM_ID`.
- Los pageviews SPA se empujan en cada cambio de ruta con `event: "page_view"`, `page_path` y `page_title`.
- GA4 se configura via GTM (sin tracking GA4 directo en codigo), con `NEXT_PUBLIC_GA4_ID` disponible para extensiones futuras.

## Variables de Entorno

Requeridas:

- Ninguna.

Opcionales:

- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GA4_ID`
- `VITE_SITE_URL`
- `VITE_WhatsAppNumber` o `VITE_WHATSAPP_NUMBER`
- `VITE_WhatsAppDefaultMessage` o `VITE_WHATSAPP_DEFAULT_MESSAGE`

## Como verificar que GA4 esta funcionando en BusinessOS

1. Definir `NEXT_PUBLIC_GTM_ID=GTM-PHMJ4Z9Q` y `NEXT_PUBLIC_GA4_ID=G-6RFTYPV9JK` en el entorno (preview y produccion).
2. En GTM, abrir Preview (Tag Assistant) para el dominio de BusinessOS y conectar la sesion.
3. Probar navegacion directa e interna SPA en rutas clave: `/blog`, `/blog/:slug` y landings SEO.
4. Validar en Tag Assistant:
   - carga del contenedor `GTM-PHMJ4Z9Q` en todas las rutas,
   - evento `page_view` en cada cambio de ruta,
   - ausencia de doble disparo por una sola navegacion.
5. En GTM configurar GA4:
   - Google tag / GA4 Configuration con `G-6RFTYPV9JK`,
   - trigger `All Pages`,
   - trigger `History Change` para SPA cuando aplique.
6. Evitar doble pageview:
   - usar `send_page_view: false` cuando se mantenga envio manual de `page_view` via `dataLayer`.
7. Validar en `GA4 > Realtime` que llegan los `page_view` con `page_path` correcto.

## Configuracion de conversion WhatsApp en GTM/GA4

1. En GTM crear Trigger:
   - Tipo: `Custom Event`
   - Event name: `cta_whatsapp_click`
2. En GTM crear Tag:
   - Tipo: `Google Analytics: GA4 Event`
   - Configuration Tag: Google tag existente (`G-6RFTYPV9JK`)
   - Event Name: `cta_whatsapp_click`
   - Event Parameters: `page_path`, `page_title`, `source`, `variant`, `landing_key`, `blog_slug`, `whatsapp_number`, `whatsapp_message`
   - Trigger: Custom Event `cta_whatsapp_click`
3. Publicar contenedor GTM.
4. En GA4:
   - `Admin > Events`
   - Marcar `cta_whatsapp_click` como `Conversion`.

## Validacion del evento cta_whatsapp_click

1. Abrir GTM Preview (Tag Assistant) y navegar por el sitio.
2. Validar clicks:
   - boton hero en landing SEO,
   - boton flotante en landing SEO,
   - CTA final de blog,
   - CTA inline de blog (cuando exista),
   - cualquier boton/link que abra `wa.me` o `api.whatsapp.com`.
3. Confirmar en Tag Assistant que entra `cta_whatsapp_click` con `page_path`, `source` y `variant`.
4. Confirmar en `GA4 > Realtime` que llega `cta_whatsapp_click` con esos parametros.

## Seguridad

- No se manejan secretos en frontend.
- No se ejecuta codigo desde contenido persistido.
- No se exponen claves privadas.

## Cambios Recientes

- 2026-02-14: Se normalizo extraccion de slugs de contenido para soportar rutas Windows y evitar publicar plantillas por error en el blog.
- 2026-02-14: Se agrego fallback SPA en Vercel (`vercel.json`) para evitar 404 de servidor en rutas internas (blog y landings).
- 2026-02-14: Se removio branding heredado (meta tags, plugin de Vite, dependencia dev y favicon legado) y se actualizo la pagina 404 personalizada.
- 2026-02-14: Se estandarizaron mensajes de CTA WhatsApp con formato `Hola, quiero implementar BusinessOS para [nicho] en [ciudad]` y numero por defecto `+51 924 464 410`.
- 2026-02-14: CTA automatico de blog (fin obligatorio + inline opcional por frontmatter) con tracking.
- 2026-02-14: Generador de 50 landings SEO (nicho x ciudad Peru) desde catalogo de archivos.
- 2026-02-14: Nueva ruta `/soluciones` con filtros y listado de landings programaticas.
- 2026-02-14: Mejora profunda de contenidos en posts existentes (estructura, enlaces internos y valor practico).
- 2026-02-14: Sitemap/robots ampliados para cubrir rutas programaticas.
- 2026-02-14: Integracion global de GTM (`NEXT_PUBLIC_GTM_ID`) y tracking SPA de `page_view` por cambio de ruta; GA4 preparado via GTM con `NEXT_PUBLIC_GA4_ID`.
- 2026-02-14: Tracking de conversion WhatsApp migrado a delegacion global con payload estandar `cta_whatsapp_click` y clasificacion via `data-*` en templates de landing/blog.
