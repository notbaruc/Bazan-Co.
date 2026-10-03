import { site } from '@/lib/site';

/** Construye un enlace de WhatsApp con el mensaje pre-llenado. */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
