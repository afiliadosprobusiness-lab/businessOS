const normalizeCopyToken = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();

export const BUSINESSOS_POSITIONING = {
  primary: "Sistema 360 para captacion, seguimiento y cierre",
  secondary: "Alternativa moderna al CRM tradicional",
} as const;

export const BUSINESSOS_MODULES_COPY = {
  hero:
    "Incluye Leads Widget, Fast Page y ContApp para ordenar leads, automatizar seguimiento y cerrar por WhatsApp.",
  includes: [
    "Leads Widget: captura y ordena leads en un flujo unico para responder mas rapido.",
    "Fast Page: convierte trafico en oportunidades reales con paginas enfocadas en accion.",
    "ContApp: ordena finanzas, facturacion e impuestos del negocio.",
  ],
} as const;

export const buildLandingHeadline = (niche: string, city: string) =>
  `Sistema de captacion y seguimiento para ${normalizeCopyToken(niche)} en ${normalizeCopyToken(city)}`;

export const buildLandingCrmSecondary = (niche: string, city: string) =>
  `Alternativa al CRM tradicional para ${normalizeCopyToken(niche)} en ${normalizeCopyToken(city)}.`;

export const buildBusinessOSWhatsAppMessage = (niche: string, city: string) =>
  `Hola, vi el sistema BusinessOS para ${normalizeCopyToken(niche)} en ${normalizeCopyToken(city)} y quiero instalar Leads Widget + Fast Page + ContApp. Mi nombre es: ___`;
