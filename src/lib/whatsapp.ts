import { buildBusinessOSWhatsAppMessage } from "@/lib/copy";

export const WhatsAppNumber =
  import.meta.env.VITE_WhatsAppNumber || import.meta.env.VITE_WHATSAPP_NUMBER || "51924464410";

export const WhatsAppDefaultMessage =
  import.meta.env.VITE_WhatsAppDefaultMessage ||
  import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE ||
  buildBusinessOSWhatsAppMessage("mi negocio", "peru");

const cleanPhoneNumber = (value: string) => value.replace(/[^\d]/g, "");

export const buildBusinessOSMessage = (niche: string, city: string) =>
  buildBusinessOSWhatsAppMessage(niche, city);

export const buildWhatsAppUrl = (customMessage?: string) => {
  const phone = cleanPhoneNumber(WhatsAppNumber);
  const message = customMessage?.trim() || WhatsAppDefaultMessage;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
