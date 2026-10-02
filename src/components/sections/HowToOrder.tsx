import { MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { storeConfig } from "@/config/store";
import { deliverySteps } from "@/data/content";
import { messages, whatsappUrl } from "@/lib/whatsapp";

export function HowToOrder() {
  const { address, fulfillment } = storeConfig;

  // Só afirma área, taxa e prazo quando esses dados estiverem na configuração.
  const deliveryFacts = [
    fulfillment.deliveryArea,
    fulfillment.deliveryFee,
    fulfillment.deliveryTime,
  ].filter((fact): fact is string => fact !== null);

  return (
    <section id="como-pedir" className="bg-sand">
      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20 lg:py-20">
        <div>
          <p className="eyebrow">Entrega</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Receba em casa</h2>

          <ol className="mt-7 space-y-5">
            {deliverySteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="w-7 shrink-0 font-display text-2xl font-extrabold leading-none text-brand tabular-nums"
                >
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="text-sm text-ink-soft">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-7 max-w-md text-sm text-ink-soft">
            {deliveryFacts.length > 0
              ? deliveryFacts.join(" · ")
              : "Área de entrega, taxa e prazo são informados pela equipe na confirmação do pedido."}
          </p>
        </div>

        <div className="self-start rounded-lg border border-line bg-paper p-6 sm:p-8">
          <p className="eyebrow">Retirada</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Prefere retirar?</h2>
          <p className="mt-4 text-ink-soft">
            Faça seu pedido pelo site e combine a retirada diretamente com a nossa equipe.
          </p>

          <address className="mt-6 flex gap-3 border-t border-line pt-6 not-italic">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
            <span>
              <span className="block font-semibold">{address.street}</span>
              <span className="block text-sm text-ink-soft">
                {address.neighborhood}, {address.city} - {address.state}
              </span>
            </span>
          </address>

          <div className="mt-6 flex flex-col gap-3">
            <ButtonLink href={storeConfig.mapsUrl} external variant="outline" full>
              Como chegar
            </ButtonLink>
            <ButtonLink href={whatsappUrl(messages.general)} external variant="whatsapp" full>
              <WhatsAppIcon className="size-[1.125rem]" />
              Pedir pelo WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
