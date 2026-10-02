import { Store, Truck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { SearchBox } from "@/components/search/SearchBox";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { storeConfig } from "@/config/store";
import { getCategories } from "@/lib/catalog";
import { messages, whatsappUrl } from "@/lib/whatsapp";

function Benefit({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <li className="flex items-center gap-3.5 px-1 py-4 sm:px-6 sm:py-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-semibold leading-tight">{title}</span>
        <span className="block text-sm text-ink-soft">{text}</span>
      </span>
    </li>
  );
}

export function Hero() {
  const categories = getCategories();
  const { address, fulfillment } = storeConfig;

  return (
    <>
      <section className="relative z-10 bg-brand text-white">
        {/* A cruz da logo, grande e discreta, como marca d'água. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <svg
            viewBox="0 0 100 100"
            className="absolute -right-24 -top-16 size-[28rem] text-brand-dark/60 lg:-right-10 lg:size-[40rem]"
          >
            <path d="M36 0h28v36h36v28H64v36H36V64H0V36h36z" fill="currentColor" />
          </svg>
        </div>

        <div className="container-page relative grid items-center gap-9 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-sun">
              Farmácia no {address.neighborhood} · {address.city}
            </p>
            <h1 className="mt-4 text-[2.375rem] font-extrabold sm:text-5xl lg:text-[3.75rem]">
              Sua farmácia no Grama, do balcão ao{" "}
              <span className="relative inline-block whitespace-nowrap">
                WhatsApp
                {/* O "sorriso" amarelo da logo, usado como sublinhado. */}
                <svg
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute -bottom-2.5 left-0 h-3.5 w-full text-sun"
                >
                  <path
                    d="M3 4c58 9 136 9 194 0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-7 max-w-xl text-lg text-white/85">
              Medicamentos, perfumaria e higiene para o dia a dia. Monte seu pedido aqui e
              combine com a nossa equipe: entregamos em casa ou você retira na loja.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <ButtonLink href="/produtos" size="lg" variant="sun">
                Comprar agora
              </ButtonLink>
              <ButtonLink
                href={whatsappUrl(messages.general)}
                external
                variant="outlineLight"
                size="lg"
              >
                <WhatsAppIcon className="size-[1.125rem]" />
                Falar no WhatsApp
              </ButtonLink>
            </div>
          </div>

          {/* A busca é o caminho mais curto até o produto, então ela é o destaque. */}
          <div className="rounded-xl bg-paper p-5 text-ink shadow-panel sm:p-7">
            <h2 className="text-xl font-bold sm:text-2xl">O que você precisa hoje?</h2>
            <p className="mt-1.5 text-sm text-ink-soft">
              Busque pelo nome do produto, pela marca ou pela categoria.
            </p>
            <div className="mt-4">
              <SearchBox size="lg" placeholder="Ex.: dipirona, protetor solar" />
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/produtos?categoria=${category.slug}`}
                    className="block rounded-full bg-sand px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-sun-soft"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-b border-line">
        <ul className="container-page grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {fulfillment.delivery ? (
            <Benefit
              icon={<Truck className="size-5" aria-hidden="true" />}
              title="Entrega em casa"
              text={`Em ${address.city}, combinada pelo WhatsApp`}
            />
          ) : null}
          {fulfillment.pickup ? (
            <Benefit
              icon={<Store className="size-5" aria-hidden="true" />}
              title="Retire na loja"
              text={`${address.street}, ${address.neighborhood}`}
            />
          ) : null}
          <Benefit
            icon={<WhatsAppIcon className="size-5" />}
            title="Atendimento pelo WhatsApp"
            text={storeConfig.whatsapp.display}
          />
        </ul>
      </div>
    </>
  );
}
