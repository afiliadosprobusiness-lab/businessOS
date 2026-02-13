# Contexto del Proyecto – BusinessOS Landing

## Producto

BusinessOS es un sistema integral que incluye:

- FastPage → creación de landing pages optimizadas
- Leads Widget → sistema de precalificación de leads
- ContApp → sistema de gestión contable

BusinessOS se comercializa como un pack completo, no como herramientas individuales.

---

## Objetivo del Proyecto

Desarrollar una landing page orientada a conversión cuyo objetivo principal es:

→ Agendar demos del pack completo BusinessOS.

La landing no vende productos por separado.
La acción principal es la redirección hacia Leads Widget para precalificación.

---

## Stack Tecnológico

- Next.js (App Router)
- Deploy en Vercel
- Internacionalización con next-intl
- Arquitectura frontend-first
- Sin backend propio en el MVP

---

## Arquitectura General

- Landing estática optimizada para conversión
- Pricing configurable desde archivo local
- Estructura multi-idioma:
  - /es
  - /en
- Sin base de datos en esta fase
- Redirección hacia Leads Widget para manejo de leads

---

## Seguridad

- El frontend no maneja secretos.
- No se almacenan datos sensibles.
- La validación y sanitización de datos ocurre en Leads Widget.
- Está prohibida la ejecución de código desde datos persistidos.
- No existe exposición de claves privadas en el cliente.

---

## Modelo Comercial

- Setup: 279 soles (pago único)
- Plan Base: 79 soles / mes (mantenimiento)
- Plan Upgrade: 129 soles / mes (funcionalidades avanzadas)

---

## Métrica Principal

- Demos agendadas

---

## Diseño

- Estilo minimalista
- Uso de whitespace amplio
- Tipografía sans-serif moderna
- Un color principal sobrio
- Jerarquía visual clara orientada a conversión

---

## Escalabilidad Futura

Posibles evoluciones sin romper arquitectura:

- Implementación de API Routes si se requiere backend
- Integración futura de tracking (GA4, Meta Pixel)
- Automatización de emails
- Landing por segmento (agencias, ecommerce, SaaS)
