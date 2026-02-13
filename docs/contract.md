# Contrato del Proyecto - BusinessOS Landing
Version: 3.0.0

Este documento es la fuente de verdad mecanica del sistema.
Ningun cambio puede romper este contrato sin versionado explicito.

---

## Primary Action

El usuario agenda una demo mediante una pagina interna con embed inline de Cal.com.

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

No se deben modificar rutas existentes sin version bump.

---

## Demo Booking Flow

1. Usuario hace click en cualquier boton "Agendar demo".
2. Frontend navega a `/agendar-demo`.
3. En `/agendar-demo` se muestra el selector inline de Cal.com (`afiliados-pro-business/meet-demo-businessos`).
4. Tras evento `bookingSuccessfulV2`, frontend redirige a `/agenda-confirmada`.
5. Confirmacion y gestion final de agenda ocurren en Cal.com.

La landing no almacena datos de la agenda.

---

## Backward Compatibility

- Clientes existentes no deben verse afectados en contenido y rutas.
- Nuevas funcionalidades no deben romper:
  - Form Data
  - Pricing Configuration
  - URL Structure

Breaking changes requieren:

- Actualizacion de version mayor.
- Registro explicito del cambio en este documento.

---

## Changelog del Contrato

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
