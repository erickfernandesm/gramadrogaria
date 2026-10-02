"use client";

import { Check, Store, Truck } from "lucide-react";
import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { CartLine, CartTotal } from "@/components/cart/CartDrawer";
import { useCart } from "@/components/cart/CartProvider";
import { Button, ButtonLink, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { fullAddress, storeConfig } from "@/config/store";
import { maskPhone } from "@/lib/format";
import { buildOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import type { FulfillmentMethod, OrderCustomer } from "@/types";

const emptyCustomer: OrderCustomer = {
  name: "",
  phone: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  reference: "",
  notes: "",
};

type FieldProps = {
  label: string;
  optional?: boolean;
  className?: string;
  children: (id: string) => ReactNode;
};

function Field({ label, optional = false, className = "", children }: FieldProps) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional ? <span className="ml-1 font-normal text-ink-mute">(opcional)</span> : null}
      </label>
      {children(id)}
    </div>
  );
}

type MethodOptionProps = {
  value: FulfillmentMethod;
  current: FulfillmentMethod;
  onSelect: (value: FulfillmentMethod) => void;
  icon: ReactNode;
  title: string;
  text: string;
};

function MethodOption({ value, current, onSelect, icon, title, text }: MethodOptionProps) {
  const checked = value === current;
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
        checked ? "border-brand bg-brand-soft" : "border-line-strong bg-paper hover:border-ink-mute"
      }`}
    >
      <input
        type="radio"
        name="recebimento"
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        className="sr-only"
      />
      <span className={`mt-0.5 shrink-0 ${checked ? "text-brand" : "text-ink-mute"}`}>{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-ink-soft">{text}</span>
      </span>
      <span
        aria-hidden="true"
        className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border ${
          checked ? "border-brand bg-brand text-white" : "border-line-strong bg-paper"
        }`}
      >
        {checked ? <Check className="size-3" strokeWidth={3} /> : null}
      </span>
    </label>
  );
}

export function CheckoutForm() {
  const { lines, ready, clear } = useCart();
  const { delivery, pickup } = storeConfig.fulfillment;
  const [method, setMethod] = useState<FulfillmentMethod>(delivery ? "entrega" : "retirada");
  const [customer, setCustomer] = useState<OrderCustomer>(emptyCustomer);
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function update(field: keyof OrderCustomer, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = Object.fromEntries(
      Object.entries(customer).map(([key, value]) => [key, value.trim()]),
    ) as OrderCustomer;

    const url = whatsappUrl(buildOrderMessage({ lines, method, customer: trimmed }));
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
    window.scrollTo({ top: 0 });
  }

  if (!ready) {
    return <div className="min-h-[50vh]" aria-busy="true" />;
  }

  // Depois de abrir o WhatsApp: confirma e oferece reabrir a conversa.
  if (sentUrl) {
    return (
      <div className="mx-auto max-w-xl py-6 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-wa text-white">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-3xl font-extrabold">Falta só enviar a mensagem</h1>
        <p className="mt-3 text-ink-soft">
          Abrimos o WhatsApp com o seu pedido pronto. Envie a mensagem para a nossa equipe
          confirmar os itens, os valores e {method === "entrega" ? "a entrega" : "a retirada"}.
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <ButtonLink href={sentUrl} external variant="whatsapp" size="lg" full>
            <WhatsAppIcon className="size-[1.125rem]" />
            Abrir o WhatsApp de novo
          </ButtonLink>
          <Link
            href="/produtos"
            onClick={clear}
            className={buttonClass({ variant: "outline", size: "lg", full: true })}
          >
            Já enviei, limpar meu pedido
          </Link>
          <Button variant="ghost" full onClick={() => setSentUrl(null)}>
            Voltar e corrigir o pedido
          </Button>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md py-10 text-center">
        <h1 className="text-3xl font-extrabold">Seu pedido está vazio</h1>
        <p className="mt-3 text-ink-soft">
          Escolha os produtos e volte aqui para definir entrega ou retirada.
        </p>
        <ButtonLink href="/produtos" size="lg" className="mt-6">
          Ver produtos
        </ButtonLink>
      </div>
    );
  }

  const isDelivery = method === "entrega";

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <form onSubmit={handleSubmit} className="order-2 space-y-9 lg:order-1">
        <fieldset>
          <legend className="font-display text-xl font-bold">Como você quer receber?</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {delivery ? (
              <MethodOption
                value="entrega"
                current={method}
                onSelect={setMethod}
                icon={<Truck className="size-5" aria-hidden="true" />}
                title="Entrega"
                text="Receba no seu endereço."
              />
            ) : null}
            {pickup ? (
              <MethodOption
                value="retirada"
                current={method}
                onSelect={setMethod}
                icon={<Store className="size-5" aria-hidden="true" />}
                title="Retirada na loja"
                text="Busque na Drogaria Grama."
              />
            ) : null}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-xl font-bold">Seus dados</legend>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Nome">
              {(id) => (
                <input
                  id={id}
                  className="field"
                  required
                  autoComplete="name"
                  value={customer.name}
                  onChange={(event) => update("name", event.target.value)}
                />
              )}
            </Field>
            <Field label="WhatsApp">
              {(id) => (
                <input
                  id={id}
                  className="field"
                  type="tel"
                  inputMode="numeric"
                  required
                  autoComplete="tel-national"
                  placeholder="(32) 90000-0000"
                  pattern="\(\d{2}\) \d{4,5}-\d{4}"
                  title="Informe o DDD e o número"
                  value={customer.phone}
                  onChange={(event) => update("phone", maskPhone(event.target.value))}
                />
              )}
            </Field>
          </div>
        </fieldset>

        {isDelivery ? (
          <fieldset>
            <legend className="font-display text-xl font-bold">Endereço de entrega</legend>
            <div className="mt-4 grid grid-cols-6 gap-4">
              <Field label="Endereço" className="col-span-6 sm:col-span-4">
                {(id) => (
                  <input
                    id={id}
                    className="field"
                    required
                    autoComplete="address-line1"
                    placeholder="Rua, avenida..."
                    value={customer.street}
                    onChange={(event) => update("street", event.target.value)}
                  />
                )}
              </Field>
              <Field label="Número" className="col-span-2">
                {(id) => (
                  <input
                    id={id}
                    className="field"
                    required
                    inputMode="numeric"
                    value={customer.number}
                    onChange={(event) => update("number", event.target.value)}
                  />
                )}
              </Field>
              <Field label="Complemento" optional className="col-span-4 sm:col-span-3">
                {(id) => (
                  <input
                    id={id}
                    className="field"
                    autoComplete="address-line2"
                    placeholder="Apto, bloco, casa"
                    value={customer.complement}
                    onChange={(event) => update("complement", event.target.value)}
                  />
                )}
              </Field>
              <Field label="Bairro" className="col-span-6 sm:col-span-3">
                {(id) => (
                  <input
                    id={id}
                    className="field"
                    required
                    autoComplete="address-level3"
                    value={customer.neighborhood}
                    onChange={(event) => update("neighborhood", event.target.value)}
                  />
                )}
              </Field>
              <Field label="Ponto de referência" optional className="col-span-6">
                {(id) => (
                  <input
                    id={id}
                    className="field"
                    placeholder="Ex.: perto da padaria"
                    value={customer.reference}
                    onChange={(event) => update("reference", event.target.value)}
                  />
                )}
              </Field>
            </div>
          </fieldset>
        ) : (
          <div className="rounded-lg bg-sand p-5">
            <h2 className="font-display text-xl font-bold">Retirada na {storeConfig.name}</h2>
            <address className="mt-2 not-italic text-ink-soft">{fullAddress}</address>
            <p className="mt-2 text-sm text-ink-soft">
              Nossa equipe avisa pelo WhatsApp quando o pedido puder ser retirado.
            </p>
            <a
              href={storeConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold underline underline-offset-2"
            >
              Como chegar
            </a>
          </div>
        )}

        <Field label="Observação" optional>
          {(id) => (
            <textarea
              id={id}
              className="field"
              rows={3}
              maxLength={400}
              placeholder="Ex.: troco para R$ 50, preferência de marca"
              value={customer.notes}
              onChange={(event) => update("notes", event.target.value)}
            />
          )}
        </Field>

        <div>
          <Button type="submit" variant="whatsapp" size="lg" full>
            <WhatsAppIcon className="size-[1.125rem]" />
            Enviar pedido pelo WhatsApp
          </Button>
          <p className="mt-3 text-sm text-ink-mute">
            Seus dados são usados apenas para montar a mensagem do pedido e não ficam salvos no
            site. Medicamentos que exigem receita são tratados diretamente com a equipe.
          </p>
        </div>
      </form>

      <section aria-labelledby="resumo" className="order-1 lg:order-2 lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-lg border border-line p-4 sm:p-6">
          <div className="flex items-baseline justify-between">
            <h2 id="resumo" className="font-display text-xl font-bold">
              Seu pedido
            </h2>
            <Link href="/produtos" className="text-sm font-semibold text-brand hover:underline">
              Continuar comprando
            </Link>
          </div>
          <ul className="mt-2 divide-y divide-line">
            {lines.map((line) => (
              <CartLine key={line.product.id} line={line} />
            ))}
          </ul>
          <div className="border-t border-line pt-4">
            <CartTotal />
          </div>
        </div>
      </section>
    </div>
  );
}
