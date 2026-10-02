"use client";

import { ChevronRight, MapPin, Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Logo } from "@/components/layout/Logo";
import { SearchBox } from "@/components/search/SearchBox";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Modal } from "@/components/ui/Modal";
import { mainNav } from "@/config/navigation";
import { storeConfig } from "@/config/store";
import { getCategories } from "@/lib/catalog";
import { messages, whatsappUrl } from "@/lib/whatsapp";

const iconButton =
  "relative flex size-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-sand";

export function Header() {
  const { count, ready, open: openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const categories = getCategories();

  const closeMenu = () => setMenuOpen(false);
  const closeSearch = () => setSearchOpen(false);
  const cartLabel =
    ready && count > 0
      ? `Abrir pedido, ${count} ${count === 1 ? "item" : "itens"}`
      : "Abrir pedido";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="container-page flex h-14 items-center gap-2 lg:h-[4.5rem] lg:gap-8">
        <Logo />

        {/* Desktop: a busca é o elemento central do cabeçalho. */}
        <div className="hidden max-w-xl flex-1 lg:block">
          <SearchBox />
        </div>

        <div className="ml-auto flex items-center lg:gap-2">
          <a
            href={whatsappUrl(messages.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 hidden items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-sand lg:flex"
          >
            <WhatsAppIcon className="size-5 text-wa" />
            <span className="leading-tight">
              <span className="block text-xs text-ink-mute">Peça pelo WhatsApp</span>
              <span className="block text-sm font-semibold tabular-nums">
                {storeConfig.whatsapp.display}
              </span>
            </span>
          </a>

          <button
            type="button"
            className={`${iconButton} lg:hidden`}
            onClick={() => setSearchOpen(true)}
            aria-label="Buscar produtos"
          >
            <Search className="size-[1.375rem]" aria-hidden="true" />
          </button>

          <button type="button" className={iconButton} onClick={openCart} aria-label={cartLabel}>
            <ShoppingBag className="size-[1.375rem]" aria-hidden="true" />
            {ready && count > 0 ? (
              <span
                aria-hidden="true"
                className="absolute right-0.5 top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-brand px-1 text-[0.6875rem] font-bold leading-none text-white"
              >
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            className={`${iconButton} -mr-2 lg:hidden`}
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav aria-label="Principal" className="hidden border-t border-line lg:block">
        <ul className="container-page flex items-center gap-7">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block border-b-2 border-transparent py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-brand hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li aria-hidden="true" className="h-4 w-px bg-line-strong" />
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/produtos?categoria=${category.slug}`}
                className="block border-b-2 border-transparent py-2.5 text-sm text-ink-soft transition-colors hover:border-brand hover:text-ink"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Celular: busca em tela cheia, com o teclado já aberto. */}
      <Modal
        open={searchOpen}
        onClose={closeSearch}
        label="Buscar produtos"
        className="inset-0 h-dvh w-full animate-fade"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-line pl-4 pr-2">
            <h2 className="font-display text-lg font-bold">Buscar</h2>
            <button
              type="button"
              className={iconButton}
              onClick={closeSearch}
              aria-label="Fechar busca"
            >
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <SearchBox layout="inline" autoFocus onNavigate={closeSearch} />
            <p className="eyebrow mt-7">Ou vá direto a uma categoria</p>
            <ul className="mt-2 divide-y divide-line">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/produtos?categoria=${category.slug}`}
                    onClick={closeSearch}
                    className="flex items-center justify-between py-3 font-medium"
                  >
                    {category.name}
                    <ChevronRight className="size-5 text-line-strong" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>

      {/* Celular: menu próprio, com contato e categorias à mão. */}
      <Modal
        open={menuOpen}
        onClose={closeMenu}
        label="Menu"
        className="inset-y-0 left-auto right-0 h-dvh w-full max-w-[22rem] animate-panel-right"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-line pl-4 pr-2">
            <Logo onClick={closeMenu} />
            <button type="button" className={iconButton} onClick={closeMenu} aria-label="Fechar menu">
              <X className="size-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6">
            <nav aria-label="Menu principal">
              <ul className="divide-y divide-line">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between py-3.5 font-display text-lg font-bold"
                    >
                      {item.label}
                      <ChevronRight className="size-5 text-line-strong" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <p className="eyebrow mt-7">Categorias</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/produtos?categoria=${category.slug}`}
                    onClick={closeMenu}
                    className="block rounded-md border border-line-strong px-3 py-2 text-sm font-medium"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0 space-y-3 border-t border-line bg-sand px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
            <ButtonLink href={whatsappUrl(messages.general)} external variant="whatsapp" full>
              <WhatsAppIcon className="size-[1.125rem]" />
              Pedir pelo WhatsApp
            </ButtonLink>
            <a
              href={storeConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm text-ink-soft"
            >
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {storeConfig.address.street}, {storeConfig.address.neighborhood}
                <span className="block font-semibold text-ink underline underline-offset-2">
                  Como chegar
                </span>
              </span>
            </a>
          </div>
        </div>
      </Modal>
    </header>
  );
}
