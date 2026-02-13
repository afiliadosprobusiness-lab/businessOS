# Contrato del Proyecto – BusinessOS Landing
Versión: 1.0.0

Este documento es la fuente de verdad mecánica del sistema.
Ningún cambio puede romper este contrato sin versionado explícito.

---

## Primary Action

El usuario agenda una demo mediante redirección a Leads Widget.

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

Configuración actual:

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

## Redirection Flow

1. Usuario completa formulario.
2. Frontend procesa validación básica.
3. Se redirige a Leads Widget.
4. La precalificación ocurre fuera de esta landing.

La landing no almacena datos.

---

## Backward Compatibility

- Clientes existentes no deben verse afectados.
- Nuevas funcionalidades no deben romper:
  - Form Data
  - Pricing Configuration
  - URL Structure

Breaking changes requieren:

- Actualización de versión mayor.
- Registro explícito del cambio en este documento.
