"use client";

import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { WhatsAppIcon } from "@/components/ui/icons";
import { messages, whatsappUrl } from "@/lib/whatsapp";

/**
 * Atalho fixo para o WhatsApp no celular e no tablet. No desktop o número já
 * fica visível no cabeçalho. Some na finalização do pedido e com o painel do
 * pedido aberto, para não cobrir os botões principais.
 */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const { isOpen } = useCart();

  if (isOpen || pathname.startsWith("/pedido")) return null;

  return (
    <a
      href={whatsappUrl(messages.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Drogaria Grama no WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex size-[3.25rem] items-center justify-center rounded-full bg-wa text-white shadow-pop transition-colors hover:bg-wa-dark lg:hidden"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
