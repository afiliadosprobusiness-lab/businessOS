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
La accion principal es abrir una ventana popup de Cal.com para agendar la demo.

---

## Stack Tecnologico

- Vite + React + TypeScript
- TailwindCSS + shadcn/ui
- Deploy objetivo en Vercel
- Arquitectura frontend-first
- Sin backend propio en el MVP

---

## Arquitectura General

- Landing estatica optimizada para conversion
- Pricing configurable desde archivo local
- Estructura de ruta actual:
  - /
- Sin base de datos en esta fase
- Integracion de agenda con Cal.com abriendo popup de navegador (sin iframe embebido)

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
