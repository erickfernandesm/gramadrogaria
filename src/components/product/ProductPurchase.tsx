"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { Button, ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { messages, whatsappUrl } from "@/lib/whatsapp";
import type { Product } from "@/types";

/** Bloco de compra da página de produto. */
export function ProductPurchase({ product }: { product: Product }) {
  const { add, open, quantityOf } = useCart();
  const [quantity, setQuantity] = useState(1);
  const inOrder = quantityOf(product.id);

  if (product.requiresPrescription) {
    return (
      <div className="rounded-lg border border-line bg-sand p-5">
        <p className="font-semibold">Este produto pode exigir apresentação de receita.</p>
        <p className="mt-1 text-sm text-ink-soft">
          Fale com nossa equipe para verificar a disponibilidade e as condições de compra.
        </p>
        <ButtonLink
          href={whatsappUrl(messages.prescription(product))}
          external
          variant="whatsapp"
          size="lg"
          full
          className="mt-4"
        >
          <WhatsAppIcon className="size-[1.125rem]" />
          Consultar pelo WhatsApp
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <QuantityStepper
          value={quantity}
          min={1}
          onChange={(value) => setQuantity(Math.min(Math.max(value, 1), 99))}
          label={product.name}
        />
        <Button
          size="md"
          className="flex-1"
          onClick={() => {
            add(product.id, quantity);
            setQuantity(1);
            open();
          }}
        >
          Adicionar ao pedido
        </Button>
      </div>

      <ButtonLink href={whatsappUrl(messages.product(product))} external variant="outline" full>
        <WhatsAppIcon className="size-[1.125rem] text-wa" />
        Comprar pelo WhatsApp
      </ButtonLink>

      {inOrder > 0 ? (
        <p className="flex items-center gap-1.5 text-sm text-ink-soft" aria-live="polite">
          <Check className="size-4 text-wa" aria-hidden="true" />
          {inOrder} {inOrder === 1 ? "unidade" : "unidades"} no seu pedido.
          <button type="button" onClick={open} className="font-semibold text-ink underline underline-offset-2">
            Ver pedido
          </button>
        </p>
      ) : null}
    </div>
  );
}
