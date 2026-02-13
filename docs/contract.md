# Contrato del Proyecto - BusinessOS Landing
Version: 2.0.0

Este documento es la fuente de verdad mecanica del sistema.
Ningun cambio puede romper este contrato sin versionado explicito.

---

## Primary Action

El usuario agenda una demo mediante popup/modal de Cal.com embebido.

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

/
  /es
  /en

No se deben modificar rutas existentes sin version bump.

---

## Demo Booking Flow

1. Usuario hace click en cualquier boton "Agendar demo".
2. Frontend abre popup/modal de Cal.com.
3. Usuario selecciona fecha y hora en el widget embebido.
4. Confirmacion y gestion de agenda ocurren en Cal.com.

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
- Cambio: Reemplazo de redireccion a Leads Widget por popup/modal embebido de Cal.com para agendamiento de demo.
- Tipo: Breaking
- Impacto: frontend, widget
