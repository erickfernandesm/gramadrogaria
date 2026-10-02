"use client";

import { ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { QuantityStepper } from "@/components/cart/QuantityStepper";
import { Button, buttonClass } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatPrice } from "@/lib/format";
import type { OrderLine } from "@/lib/whatsapp";

/** Linha de item do pedido, usada no painel e na página de finalização. */
export function CartLine({ line, onNavigate }: { line: OrderLine; onNavigate?: () => void }) {
  const { setQuantity, remove } = useCart();
  const { product, quantity } = line;

  return (
    <li className="flex gap-3 py-4">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-sand">
        <Image src={product.image} alt="" fill sizes="64px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <Link
          href={`/produtos/${product.slug}`}
          onClick={onNavigate}
          className="block text-sm font-semibold leading-snug hover:underline"
        >
          {product.name}
        </Link>
        {product.presentation ? (
          <p className="text-sm text-ink-soft">{product.presentation}</p>
        ) : null}

        <div className="mt-2 flex items-center justify-between gap-2">
          <QuantityStepper
            value={quantity}
            min={1}
            onChange={(value) => setQuantity(product.id, value)}
            label={product.name}
            size="sm"
          />
          <p className="text-sm font-semibold tabular-nums">
            {product.price !== undefined ? formatPrice(product.price * quantity) : null}
          </p>
          <button
            type="button"
            onClick={() => remove(product.id)}
            className="flex size-9 items-center justify-center rounded-md text-ink-mute transition-colors hover:bg-sand hover:text-brand"
            aria-label={`Remover ${product.name} do pedido`}
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
}

/** Resumo de valores. Sem preços cadastrados, explica que o valor vem depois. */
export function CartTotal() {
  const { subtotal } = useCart();

  if (subtotal === null) {
    return (
      <p className="text-sm text-ink-soft">
        Os valores são confirmados pela nossa equipe no WhatsApp antes de fechar o pedido.
      </p>
    );
  }

  return (
    <div className="flex items-baseline justify-between">
      <p className="text-sm text-ink-soft">Subtotal</p>
      <p className="font-display text-xl font-bold tabular-nums">{formatPrice(subtotal)}</p>
    </div>
  );
}

export function CartDrawer() {
  const { lines, count, isOpen, close } = useCart();

  return (
    <Modal
      open={isOpen}
      onClose={close}
      label="Seu pedido"
      className="inset-y-0 left-auto right-0 h-dvh w-full animate-panel-right sm:w-[26rem]"
    >
      <div className="flex h-full flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-line px-4 sm:px-5">
          <h2 className="font-display text-lg font-bold">
            Seu pedido
            {count > 0 ? (
              <span className="ml-2 font-sans text-sm font-normal text-ink-mute">
                {count} {count === 1 ? "item" : "itens"}
              </span>
            ) : null}
          </h2>
          <button
            type="button"
            onClick={close}
            className="-mr-2 flex size-11 items-center justify-center rounded-md hover:bg-sand"
            aria-label="Fechar pedido"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="size-8 text-line-strong" aria-hidden="true" />
            <p className="mt-4 font-semibold">Seu pedido está vazio</p>
            <p className="mt-1 text-sm text-ink-soft">
              Adicione produtos e finalize pelo WhatsApp, com entrega ou retirada na loja.
            </p>
            <Link
              href="/produtos"
              onClick={close}
              className={buttonClass({ variant: "primary", className: "mt-6" })}
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-4 sm:px-5">
              {lines.map((line) => (
                <CartLine key={line.product.id} line={line} onNavigate={close} />
              ))}
            </ul>

            <footer className="shrink-0 space-y-3 border-t border-line px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:px-5">
              <CartTotal />
              <Link
                href="/pedido"
                onClick={close}
                className={buttonClass({ variant: "primary", size: "lg", full: true })}
              >
                Finalizar pedido
              </Link>
              <Button variant="ghost" full onClick={close}>
                Continuar comprando
              </Button>
            </footer>
          </>
        )}
      </div>
    </Modal>
  );
}
