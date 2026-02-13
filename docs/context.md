# Contexto del Proyecto - BusinessOS Landing

## Producto

BusinessOS es un sistema integral que incluye:

- FastPage -> creacion de landing pages optimizadas
- Leads Widget -> sistema de precalificacion de leads
- ContApp -> sistema de gestion contable

BusinessOS se comercializa como un pack completo, no como herramientas individuales.

---

## Objetivo del Proyecto

Desarrollar una landing page orientada a conversion cuyo objetivo principal es:

-> Agendar demos del pack completo BusinessOS.

La landing no vende productos por separado.
La accion principal es llevar al usuario a una pagina interna con embed de Cal.com para agendar la demo.

---

## Stack Tecnologico

- Vite + React + TypeScript
- TailwindCSS + shadcn/ui
- React Router DOM
- Cal.com embed react SDK (`@calcom/embed-react`)
- Deploy objetivo en Vercel
- Arquitectura frontend-first
- Sin backend propio en el MVP

---

## Arquitectura General

- Landing estatica optimizada para conversion
- Secciones clave de conversion: hero, testimonios con scroll horizontal, problema, solucion, como funciona, pricing, CTA, FAQs
- Pricing configurable desde archivo local
- Estructura de rutas actual:
  - `/`
  - `/agendar-demo`
  - `/agenda-confirmada`
- Sin base de datos en esta fase
- Integracion de agenda con Cal.com usando componente inline en ruta dedicada

---

## Seguridad

- El frontend no maneja secretos.
- No se almacenan datos sensibles en la landing.
- La agenda y confirmacion ocurren en Cal.com.
- Esta prohibida la ejecucion de codigo desde datos persistidos.
- No existe exposicion de claves privadas en el cliente.

---

## Modelo Comercial

- Setup: 279 soles (pago unico)
- Plan Base: 79 soles / mes (mantenimiento)
- Plan Upgrade: 129 soles / mes (funcionalidades avanzadas)

---

## Metrica Principal

- Demos agendadas

---

## Diseno

- Estilo minimalista
- Uso de whitespace amplio
- Tipografia sans-serif moderna
- Un color principal sobrio
- Jerarquia visual clara orientada a conversion

---

## Escalabilidad Futura

Posibles evoluciones sin romper arquitectura:

- Implementacion de API Routes si se requiere backend
- Integracion futura de tracking (GA4, Meta Pixel)
- Automatizacion de emails
- Landing por segmento (agencias, ecommerce, SaaS)

---

## Cambios Recientes

- 2026-02-13: Se agregaron fotos reales a las tarjetas de la seccion de testimonios.
- 2026-02-13: Se rediseño `/agendar-demo` con UI alineada a la landing y fallback de WhatsApp (`https://wa.link/wmx5ay`) cuando no hay horarios.
- 2026-02-13: Se agregaron testimonios con scroll horizontal debajo del hero.
- 2026-02-13: Se agrego seccion de FAQs debajo del CTA final y ancla `#faqs` en navbar.
- 2026-02-13: Navbar actualizado para mostrar navegacion tambien en mobile sin ocultar enlaces principales.
- 2026-02-13: Flujo de demo migrado de popup externo a ruta interna `/agendar-demo` con Cal inline embed.
- 2026-02-13: Se agrego ruta `/agenda-confirmada` y redireccion automatica despues de `bookingSuccessfulV2`.
- 2026-02-13: CTA "Ver como funciona" ahora navega al ancla correcta `#como-funciona`.
