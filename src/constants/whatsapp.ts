export const WHATSAPP_NUMBER = "447721770779";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function buildWhatsAppMessageUrl(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}
