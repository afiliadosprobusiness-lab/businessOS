# Contrato del Proyecto - BusinessOS Landing
Version: 3.1.0

Este documento es la fuente de verdad mecanica del sistema.
Ningun cambio puede romper este contrato sin versionado explicito.

---

## Primary Actions

1. El usuario agenda una demo mediante pagina interna con embed inline de Cal.com.
2. En landings SEO, el usuario inicia conversacion por WhatsApp como conversion principal.

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

Configuracion actual:

{
  "setup_price": 279,
  "monthly_price": 79,
  "upgrade_price": 129,
  "currency": "PEN"
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
- `/:landingSlug` (solo slugs definidos por archivos en `content/landings/*.json`)

No se deben modificar rutas existentes sin version bump.

---

## SEO Content Contract

### Blog

- Fuente de contenido: `content/blog/*.mdx`.
- Cada archivo debe incluir frontmatter con:
  - `title`
  - `description`
  - `date` (YYYY-MM-DD)
  - `author`
  - `category`
  - `tags` (lista separada por comas)

### Landings

- Fuente de contenido: `content/landings/*.json`.
- Cada landing debe incluir:
  - `keyword` (H1 exacto)
  - `problem`
  - `benefits`
  - `steps` (3 pasos)
  - `faqs`
  - `hero.ctaMessage` opcional por nicho

---

## WhatsApp Configuration

Variables opcionales soportadas:

- `VITE_WhatsAppNumber` o `VITE_WHATSAPP_NUMBER`
- `VITE_WhatsAppDefaultMessage` o `VITE_WHATSAPP_DEFAULT_MESSAGE`

Reglas:

- Si no se define mensaje por landing, se usa mensaje por defecto.
- CTA de WhatsApp debe existir en hero y boton flotante persistente para landings SEO.

---

## SEO Technical Outputs

- Metadata por pagina: `title`, `description`, canonical.
- OpenGraph + Twitter Cards en todas las paginas.
- JSON-LD:
  - `BlogPosting` para `/blog/:slug`.
  - `Service` o `WebPage` para landings SEO.
- Archivos publicos obligatorios:
  - `/sitemap.xml`
  - `/robots.txt`

Sitemap debe incluir al menos:

- `/blog`
- todos los `/blog/:slug`
- todos los slugs SEO de `content/landings/*.json`

---

## Demo Booking Flow

1. Usuario hace click en cualquier boton "Agendar demo".
2. Frontend navega a `/agendar-demo`.
3. En `/agendar-demo` se muestra selector inline de Cal.com (`afiliados-pro-business/meet-demo-businessos`).
4. Si no hay disponibilidad, frontend ofrece fallback a WhatsApp.
5. Tras evento `bookingSuccessfulV2`, frontend redirige a `/agenda-confirmada`.
6. Confirmacion final de agenda ocurre en Cal.com.

La landing no almacena datos de la agenda.

---

## Tracking Contract (Conditional)

Si existe sistema de tracking (ej: `window.gtag` o `window.dataLayer`), al click en CTA WhatsApp de landings debe emitirse:

- event: `cta_whatsapp_click`
- params: `{ page, variant }`

---

## Backward Compatibility

- Clientes existentes no deben verse afectados en contenido y rutas actuales.
- Nuevas funcionalidades no deben romper:
  - Form Data
  - Pricing Configuration
  - URL Structure
  - Demo Booking Flow

Breaking changes requieren:

- Actualizacion de version mayor.
- Registro explicito del cambio en este documento.

---

## Changelog del Contrato

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
- Fecha: 2026-02-13
- Cambio: Cambio tecnico de modal/iframe embebido a popup de ventana Cal.com para evitar bloqueos de links externos (WhatsApp X-Frame-Options).
- Tipo: Non-breaking
- Impacto: frontend
- Fecha: 2026-02-13
- Cambio: Reemplazo de redireccion a Leads Widget por popup/modal embebido de Cal.com para agendamiento de demo.
- Tipo: Breaking
- Impacto: frontend, widget