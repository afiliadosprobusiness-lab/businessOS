export const WhatsAppNumber =
  import.meta.env.VITE_WhatsAppNumber || import.meta.env.VITE_WHATSAPP_NUMBER || "51999999999";

export const WhatsAppDefaultMessage =
  import.meta.env.VITE_WhatsAppDefaultMessage ||
  import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE ||
  "Hola, quiero informacion de BusinessOS";

const cleanPhoneNumber = (value: string) => value.replace(/[^\d]/g, "");

export const buildWhatsAppUrl = (customMessage?: string) => {
  const phone = cleanPhoneNumber(WhatsAppNumber);
  const message = customMessage?.trim() || WhatsAppDefaultMessage;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};