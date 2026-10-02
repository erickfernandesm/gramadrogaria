"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { DemoNotice } from "@/components/product/DemoNotice";
import { ProductGrid } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { getCategories, getCategory, getOffers, getProducts } from "@/lib/catalog";
import { searchProducts } from "@/lib/search";
import { messages, whatsappUrl } from "@/lib/whatsapp";

function chipClass(active: boolean): string {
  return `block whitespace-nowrap rounded-md border px-3.5 py-2 text-sm font-medium transition-colors ${
    active
      ? "border-ink bg-ink text-white"
      : "border-line-strong bg-paper text-ink hover:border-ink"
  }`;
}

/**
 * Listagem do catálogo. Os filtros vivem na URL (?q=, ?categoria=, ?ofertas=1),
 * então qualquer resultado pode ser compartilhado ou salvo.
 */
export function CatalogBrowser() {
  const params = useSearchParams();
  const query = params.get("q")?.trim() ?? "";
  const category = getCategory(params.get("categoria") ?? "");
  const offersOnly = params.get("ofertas") === "1";
  const hasOffers = getOffers().length > 0;

  const products = useMemo(() => {
    let list = offersOnly ? getOffers() : getProducts();
    if (category) list = list.filter((product) => product.category === category.slug);
    if (query) list = searchProducts(list, query);
    return list;
  }, [query, category, offersOnly]);

  const title = query
    ? `Resultados para “${query}”`
    : offersOnly
      ? "Ofertas"
      : (category?.name ?? "Todos os produtos");

  /** Monta o link de um filtro preservando a busca atual. */
  function filterHref(next: { categoria?: string; ofertas?: boolean }): string {
    const search = new URLSearchParams();
    if (query) search.set("q", query);
    if (next.categoria) search.set("categoria", next.categoria);
    if (next.ofertas) search.set("ofertas", "1");
    const value = search.toString();
    return value ? `/produtos?${value}` : "/produtos";
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-ink-soft" aria-live="polite">
        {products.length} {products.length === 1 ? "produto" : "produtos"}
        {query && category ? ` em ${category.name}` : ""}
        {query ? (
          <Link
            href={category ? `/produtos?categoria=${category.slug}` : "/produtos"}
            className="ml-3 inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-2"
          >
            <X className="size-3.5" aria-hidden="true" />
            Limpar busca
          </Link>
        ) : null}
      </p>

      {/* Categorias: rolagem horizontal no celular, sem quebrar o layout. */}
      <nav
        aria-label="Filtrar por categoria"
        className="-mx-4 mt-6 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          <li>
            <Link
              href={filterHref({})}
              className={chipClass(!category && !offersOnly)}
              aria-current={!category && !offersOnly ? "true" : undefined}
            >
              Todos
            </Link>
          </li>
          {hasOffers ? (
            <li>
              <Link
                href={filterHref({ ofertas: true })}
                className={chipClass(offersOnly)}
                aria-current={offersOnly ? "true" : undefined}
              >
                Ofertas
              </Link>
            </li>
          ) : null}
          {getCategories().map((item) => {
            const active = category?.slug === item.slug;
            return (
              <li key={item.slug}>
                <Link
                  href={filterHref({ categoria: item.slug })}
                  className={chipClass(active)}
                  aria-current={active ? "true" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6">
        <DemoNotice />
      </div>

      {products.length > 0 ? (
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      ) : (
        <div className="mt-10 max-w-lg rounded-lg bg-sand p-6 sm:p-8">
          <h2 className="text-xl font-bold">
            {offersOnly && !query ? "Nenhuma oferta publicada no momento" : "Não encontramos esse produto no site"}
          </h2>
          <p className="mt-2 text-ink-soft">
            Nem tudo o que temos na loja está aqui. Chame a nossa equipe e a gente verifica para
            você.
          </p>
          <div className="mt-5 flex flex-col gap-3 min-[420px]:flex-row">
            <ButtonLink
              href={whatsappUrl(query ? messages.notFound(query) : messages.general)}
              external
              variant="whatsapp"
            >
              <WhatsAppIcon className="size-[1.125rem]" />
              Perguntar no WhatsApp
            </ButtonLink>
            <ButtonLink href="/produtos" variant="outline">
              Ver todos os produtos
            </ButtonLink>
          </div>
        </div>
      )}
    </div>
  );
}
