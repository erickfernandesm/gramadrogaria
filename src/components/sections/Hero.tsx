import Link from "next/link";
import { SearchBox } from "@/components/search/SearchBox";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { storeConfig } from "@/config/store";
import { getCategories } from "@/lib/catalog";
import { messages, whatsappUrl } from "@/lib/whatsapp";

export function Hero() {
  const categories = getCategories();

  return (
    <section className="container-page grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
      <div>
        <p className="eyebrow">
          Farmácia no {storeConfig.address.neighborhood} · {storeConfig.address.city}
        </p>
        <h1 className="mt-4 text-[2.25rem] font-extrabold sm:text-5xl lg:text-[3.5rem]">
          Sua farmácia no Grama, do balcão ao{" "}
          <span className="relative inline-block whitespace-nowrap">
            WhatsApp
            {/* O "sorriso" amarelo da logo, usado como sublinhado. */}
            <svg
              viewBox="0 0 200 14"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute -bottom-2 left-0 h-3 w-full text-sun"
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
        <p className="mt-6 max-w-xl text-lg text-ink-soft">
          Medicamentos, perfumaria e higiene para o dia a dia. Monte seu pedido aqui e combine
          com a nossa equipe: entregamos em casa ou você retira na loja.
        </p>
        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
          <ButtonLink href="/produtos" size="lg">
            Comprar agora
          </ButtonLink>
          <ButtonLink href={whatsappUrl(messages.general)} external variant="outline" size="lg">
            <WhatsAppIcon className="size-[1.125rem] text-wa" />
            Falar no WhatsApp
          </ButtonLink>
        </div>
      </div>

      {/* A busca é o caminho mais curto até o produto, então ela é o destaque. */}
      <div className="rounded-lg bg-sand p-5 sm:p-7">
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
                className="block rounded-md border border-line-strong bg-paper px-3 py-1.5 text-sm font-medium transition-colors hover:border-ink"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
