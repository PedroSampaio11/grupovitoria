import { siteConfig } from '@/constants/site';

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Vitória Transportes e gostaria de mais informações sobre os serviços de logística de veículos especiais.";

export function buildWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  const phone = siteConfig.links.whatsapp.replace("https://wa.me/", "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
