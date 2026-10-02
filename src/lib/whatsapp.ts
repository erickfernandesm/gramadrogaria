import { fullAddress, storeConfig } from "@/config/store";
import { formatPrice } from "@/lib/format";
import type { FulfillmentMethod, OrderCustomer, Product } from "@/types";

/** Link wa.me com a mensagem codificada corretamente. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${storeConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const messages = {
  general: `Olá! Vim pelo site da ${storeConfig.name} e gostaria de atendimento.`,
  hours: `Olá! Qual é o horário de atendimento da ${storeConfig.name} hoje?`,
  notFound: (term: string) =>
    `Olá! Procurei por "${term}" no site e não encontrei. Vocês têm esse produto?`,
  product: (product: Product) =>
    `Olá! Gostaria de saber sobre a disponibilidade do produto ${productLabel(product)}.`,
  prescription: (product: Product) =>
    `Olá! Tenho interesse no produto ${productLabel(product)}. Podem me informar a disponibilidade e as condições de compra?`,
};

export function productLabel(product: Product): string {
  return [product.name, product.presentation].filter(Boolean).join(", ");
}

export type OrderLine = { product: Product; quantity: number };

type OrderInput = {
  lines: OrderLine[];
  method: FulfillmentMethod;
  customer: OrderCustomer;
};

/** Monta o texto do pedido enviado ao WhatsApp da loja. */
export function buildOrderMessage({ lines, method, customer }: OrderInput): string {
  const parts: string[] = [
    `Olá! Gostaria de fazer um pedido na ${storeConfig.name}.`,
    "",
    "*PEDIDO*",
  ];

  for (const { product, quantity } of lines) {
    const unit = quantity === 1 ? "unidade" : "unidades";
    const price =
      product.price !== undefined ? ` (${formatPrice(product.price * quantity)})` : "";
    parts.push(`• ${productLabel(product)}: ${quantity} ${unit}${price}`);
  }

  const allPriced = lines.every(({ product }) => product.price !== undefined);
  if (allPriced && lines.length > 0) {
    const subtotal = lines.reduce(
      (sum, { product, quantity }) => sum + (product.price ?? 0) * quantity,
      0,
    );
    parts.push("", `Subtotal: ${formatPrice(subtotal)}`);
  }

  parts.push("", "*Forma de recebimento*");

  if (method === "entrega") {
    parts.push("Entrega", "", "*Endereço*");
    parts.push(`${customer.street}, ${customer.number}`);
    if (customer.complement) parts.push(`Complemento: ${customer.complement}`);
    parts.push(`Bairro: ${customer.neighborhood}`);
    if (customer.reference) parts.push(`Referência: ${customer.reference}`);
  } else {
    parts.push("Retirada na loja", fullAddress);
  }

  parts.push("", "*Cliente*", customer.name);
  if (customer.phone) parts.push(`WhatsApp: ${customer.phone}`);

  if (customer.notes) parts.push("", "*Observação*", customer.notes);

  return parts.join("\n");
}
