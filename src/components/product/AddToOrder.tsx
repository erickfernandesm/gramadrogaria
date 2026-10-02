"use client";

import { Plus } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { Button, ButtonLink } from "@/components/ui/Button";
import { messages, whatsappUrl } from "@/lib/whatsapp";
import type { Product } from "@/types";

/**
 * Ação principal do card. Vira um seletor de quantidade depois que o
 * produto entra no pedido. Itens que exigem receita vão para o WhatsApp.
 */
export function AddToOrder({ product }: { product: Product }) {
  const { quantityOf, add, setQuantity } = useCart();
  const quantity = quantityOf(product.id);

  if (product.requiresPrescription) {
    return (
      <ButtonLink
        href={whatsappUrl(messages.prescription(product))}
        external
        variant="outline"
        size="sm"
        full
        aria-label={`Consultar ${product.name} pelo WhatsApp`}
      >
        Consultar
      </ButtonLink>
    );
  }

  if (quantity > 0) {
    return (
      <QuantityStepper
        value={quantity}
        onChange={(value) => setQuantity(product.id, value)}
        label={product.name}
        size="sm"
        full
      />
    );
  }

  return (
    <Button
      variant="primary"
      size="sm"
      full
      onClick={() => add(product.id)}
      aria-label={`Adicionar ${product.name} ao pedido`}
    >
      <Plus className="size-4" aria-hidden="true" />
      Adicionar
    </Button>
  );
}
