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
      <div className="container-page py-14 lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Entrega</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Receba em casa</h2>
          <p className="mt-3 text-lg text-ink-soft">
            Do pedido à sua porta em cinco passos, sempre com uma pessoa da nossa equipe do
            outro lado.
          </p>
        </div>

        {/* Linha do tempo: vertical no celular, horizontal no desktop. */}
        <ol className="relative mt-10 grid gap-7 lg:grid-cols-5 lg:gap-6">
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[1.3125rem] top-6 w-0.5 bg-line-strong lg:bottom-auto lg:left-6 lg:right-[10%] lg:top-[1.3125rem] lg:h-0.5 lg:w-auto"
          />
          {deliverySteps.map((step, index) => (
            <li key={step.title} className="relative flex gap-4 lg:block">
              <span
                aria-hidden="true"
                className={`flex size-11 shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold ${
                  index === deliverySteps.length - 1
                    ? "bg-sun text-ink"
                    : "bg-brand text-white"
                }`}
              >
                {index + 1}
              </span>
              <div className="lg:mt-4 lg:pr-2">
                <p className="font-display text-lg font-bold leading-tight tracking-tight">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-sm text-ink-soft">
          {deliveryFacts.length > 0
            ? deliveryFacts.join(" · ")
            : "Área de entrega, taxa e prazo são informados pela equipe na confirmação do pedido."}
        </p>

        <div className="mt-10 grid items-center gap-8 rounded-2xl bg-ink p-6 text-white sm:p-9 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:p-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-sun">Retirada</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Prefere retirar?</h2>
            <p className="mt-3 max-w-md text-lg text-white/80">
              Faça seu pedido pelo site e combine a retirada diretamente com a nossa equipe.
            </p>
          </div>

          <div>
            <address className="flex gap-3 not-italic">
              <MapPin className="mt-0.5 size-5 shrink-0 text-sun" aria-hidden="true" />
              <span>
                <span className="block text-lg font-semibold">{address.street}</span>
                <span className="block text-white/70">
                  {address.neighborhood}, {address.city} - {address.state}
                </span>
              </span>
            </address>
            <div className="mt-6 flex flex-col gap-3 min-[420px]:flex-row lg:flex-col xl:flex-row">
              <ButtonLink href={storeConfig.mapsUrl} external variant="sun" className="flex-1">
                Como chegar
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl(messages.general)}
                external
                variant="outlineLight"
                className="flex-1"
              >
                <WhatsAppIcon className="size-[1.125rem]" />
                Pedir pelo WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
