export const WhatsAppNumber =
  import.meta.env.VITE_WhatsAppNumber || import.meta.env.VITE_WHATSAPP_NUMBER || "51924464410";

export const WhatsAppDefaultMessage =
  import.meta.env.VITE_WhatsAppDefaultMessage ||
  import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE ||
  "Hola, quiero implementar BusinessOS para mi negocio en peru";

const cleanPhoneNumber = (value: string) => value.replace(/[^\d]/g, "");
const normalizeToken = (value: string) => value.trim().replace(/\s+/g, " ").toLowerCase();

export const buildBusinessOSMessage = (niche: string, city: string) =>
  `Hola, quiero implementar BusinessOS para ${normalizeToken(niche)} en ${normalizeToken(city)}`;

export const buildWhatsAppUrl = (customMessage?: string) => {
  const phone = cleanPhoneNumber(WhatsAppNumber);
  const message = customMessage?.trim() || WhatsAppDefaultMessage;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
