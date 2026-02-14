# Contrato del Proyecto - BusinessOS Landing
Version: 3.2.0

Este documento es la fuente de verdad mecanica del sistema.
Ningun cambio puede romper este contrato sin versionado explicito.

---

## Primary Actions

1. El usuario agenda una demo mediante pagina interna con embed inline de Cal.com.
2. En landings SEO y blog, el usuario inicia conversacion por WhatsApp como conversion principal.

---

## Form Data

Campos permitidos:

- name: string (required)
- email: string (required)
- company: string (optional)
- language: "es" | "en"

Reglas:

- Nuevos campos deben ser optional.
- No se pueden eliminar campos existentes sin version bump.
- No se puede cambiar el tipo de dato sin version bump.

---

## Pricing Configuration

Estructura obligatoria:

{
  "setup_price": number,
  "monthly_price": number,
  "upgrade_price": number,
  "currency": string
}

Reglas:

- No se pueden renombrar claves.
- Nuevas claves deben ser optional.
- Cualquier cambio estructural requiere version bump.

---

## URL Structure

Rutas permitidas:

- `/`
- `/es`
- `/en`
- `/agendar-demo`
- `/agenda-confirmada`
- `/blog`
- `/blog/:slug`
- `/soluciones`
- `/:landingSlug`

Reglas:

- No se deben eliminar ni renombrar rutas existentes sin version bump.
- `/:landingSlug` solo puede resolver slugs definidos por contenido en:
  - `content/landings/*.json`
  - `content/seo/landing-catalog.json`

---

## SEO Content Contract

### Blog

Fuente de contenido:

- `content/blog/*.mdx`

Frontmatter base por post:

- `title`
- `description`
- `date` (YYYY-MM-DD)
- `author`
- `category`
- `tags` (lista separada por comas)

Frontmatter opcional de conversion:

- `ctaVariant`: `default` | `soft` | `none`
- `ctaLanding`: ruta recomendada (ej: `/crm-para-odontologos`)
- `ctaMessage`: mensaje WhatsApp especifico del post

Regla:

- Todos los posts deben renderizar CTA final automaticamente desde template (sin edicion manual por post).
- Archivos con prefijo `_` en `content/blog` se consideran plantillas y no deben publicarse en `/blog` ni en sitemap.

### Landings

Fuentes de contenido:

- `content/landings/*.json` (estaticas)
- `content/seo/landing-catalog.json` (programaticas)

Regla minima por landing:

- H1 keyword exacta
- Intro
- Problema
- Seccion "Que incluye BusinessOS"
- Beneficios
- "Como funciona en 3 pasos"
- FAQs
- CTA WhatsApp en hero + flotante

---

## WhatsApp Configuration

Variables opcionales soportadas:

- `VITE_WhatsAppNumber` o `VITE_WHATSAPP_NUMBER`
- `VITE_WhatsAppDefaultMessage` o `VITE_WHATSAPP_DEFAULT_MESSAGE`

Reglas:

- Si no se define mensaje especifico (post o landing), usar mensaje por defecto.
- Mensaje objetivo para CTA: `Hola, quiero implementar BusinessOS para [nicho] en [ciudad]`.
- Numero por defecto fallback: `+51 924 464 410` (`51924464410`).
- CTA WhatsApp debe existir en:
  - landings SEO (hero + flotante)
  - blog detail (CTA final automatico)

---

## SEO Technical Outputs

- Metadata por pagina: title, description, canonical.
- OpenGraph + Twitter Cards.
- JSON-LD:
  - `BlogPosting` para `/blog/:slug`.
  - `Service` o `WebPage` para landings.
- Archivos publicos obligatorios:
  - `/sitemap.xml`
  - `/robots.txt`

Sitemap debe incluir al menos:

- `/blog`
- todos los `/blog/:slug`
- todas las landings estaticas de `content/landings/*.json`
- todas las landings programaticas derivadas del catalogo (`10 x 5 = 50`)
- `/soluciones`

---

## Demo Booking Flow

1. Usuario hace click en CTA de demo.
2. Frontend navega a `/agendar-demo`.
3. Se renderiza selector inline de Cal.com (`afiliados-pro-business/meet-demo-businessos`).
4. Si no hay disponibilidad, se ofrece fallback a WhatsApp.
5. Evento `bookingSuccessfulV2` redirige a `/agenda-confirmada`.
6. Confirmacion final ocurre en Cal.com.

---

## Tracking Contract (Conditional)

Si existe tracking (`window.gtag` o `window.dataLayer`):

Evento: `cta_whatsapp_click`

- Landings params: `{ page, variant }`
- Blog params: `{ page, variant, source, slug }`
  - `variant`: `blog_end` | `blog_inline`
  - `source`: `blog`

---

## Backward Compatibility

Nuevas funcionalidades no deben romper:

- Form Data
- Pricing Configuration
- URL Structure
- Demo Booking Flow

Breaking changes requieren:

- Versionado explicito.
- Registro en changelog del contrato.

---

## Changelog del Contrato

- Fecha: 2026-02-14
- Cambio: Se excluyen archivos plantilla con prefijo `_` del blog publico y del sitemap.
- Tipo: Non-breaking
- Impacto: frontend, SEO, contenido
- Fecha: 2026-02-14
- Cambio: Se estandariza formato de mensaje de CTA WhatsApp por nicho/ciudad y se define fallback de numero `+51 924 464 410`.
- Tipo: Non-breaking
- Impacto: frontend, conversion, contenido
- Fecha: 2026-02-14
- Cambio: Se agrega CTA automatico en blog (final obligatorio + inline opcional por frontmatter), nueva ruta `/soluciones` y catalogo programatico de 50 landings SEO.
- Tipo: Non-breaking
- Impacto: frontend, routing, SEO, contenido, tracking
- Fecha: 2026-02-14
- Cambio: Se agrega modulo Blog SEO (`/blog`, `/blog/:slug`), landings SEO dinamicas por archivo y contrato de metadata/sitemap/robots.
- Tipo: Non-breaking
- Impacto: frontend, routing, SEO, contenido
- Fecha: 2026-02-13
- Cambio: Se agrega fallback no bloqueante por WhatsApp en `/agendar-demo` cuando no hay horarios disponibles.
- Tipo: Non-breaking
- Impacto: frontend, booking flow
- Fecha: 2026-02-13
- Cambio: Reemplazo de popup de Cal.com por ruta interna `/agendar-demo` con embed react inline y nueva ruta de confirmacion `/agenda-confirmada`.
- Tipo: Breaking
- Impacto: frontend, routing, booking flow
