"use client";

import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { getCategoryName, getProducts } from "@/lib/catalog";
import { searchProducts } from "@/lib/search";
import { messages, whatsappUrl } from "@/lib/whatsapp";

const MAX_QUICK_RESULTS = 5;

type SearchBoxProps = {
  /**
   * "dropdown": resultados flutuam sob o campo (header e hero).
   * "inline": resultados ocupam o espaço abaixo (tela de busca do celular).
   */
  layout?: "dropdown" | "inline";
  size?: "md" | "lg";
  autoFocus?: boolean;
  placeholder?: string;
  /** Chamado ao navegar para um resultado, para fechar o painel que contém a busca. */
  onNavigate?: () => void;
};

export function SearchBox({
  layout = "dropdown",
  size = "md",
  autoFocus = false,
  placeholder = "Buscar produto, marca ou categoria",
  onNavigate,
}: SearchBoxProps) {
  const router = useRouter();
  const inputId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const term = query.trim();
  const results = useMemo(() => searchProducts(getProducts(), term), [term]);
  const quick = results.slice(0, MAX_QUICK_RESULTS);
  const showResults = term.length >= 2 && (layout === "inline" || focused);

  // Fecha o dropdown ao clicar fora.
  useEffect(() => {
    if (layout !== "dropdown" || !focused) return;
    function handlePointer(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setFocused(false);
    }
    document.addEventListener("pointerdown", handlePointer);
    return () => document.removeEventListener("pointerdown", handlePointer);
  }, [layout, focused]);

  function finish() {
    setFocused(false);
    setQuery("");
    onNavigate?.();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!term) return;
    router.push(`/produtos?q=${encodeURIComponent(term)}`);
    finish();
  }

  const panel = showResults ? (
    <div
      className={
        layout === "dropdown"
          ? "absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-md border border-line bg-paper shadow-pop animate-panel-up"
          : "mt-2"
      }
    >
      {quick.length > 0 ? (
        <>
          <ul className="divide-y divide-line">
            {quick.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/produtos/${product.slug}`}
                  onClick={finish}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-sand focus-visible:bg-sand"
                >
                  <span className="relative size-11 shrink-0 overflow-hidden rounded-sm bg-sand">
                    <Image src={product.image} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{product.name}</span>
                    <span className="block truncate text-xs text-ink-mute">
                      {[product.presentation, getCategoryName(product.category)]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/produtos?q=${encodeURIComponent(term)}`}
            onClick={finish}
            className="flex items-center justify-between border-t border-line px-3 py-3 text-sm font-semibold text-brand hover:bg-sand"
          >
            Ver {results.length === 1 ? "o resultado" : `os ${results.length} resultados`}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </>
      ) : (
        <div className="px-3 py-4 text-sm">
          <p className="font-semibold">Nada encontrado para “{term}”</p>
          <p className="mt-1 text-ink-soft">
            Nem tudo o que temos na loja está no site.{" "}
            <a
              href={whatsappUrl(messages.notFound(term))}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-wa underline underline-offset-2"
            >
              Perguntar no WhatsApp
            </a>
          </p>
        </div>
      )}
    </div>
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      <form role="search" onSubmit={handleSubmit}>
        <label htmlFor={inputId} className="sr-only">
          Buscar produtos
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-[1.125rem] -translate-y-1/2 text-ink-mute"
            aria-hidden="true"
          />
          <input
            id={inputId}
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            data-autofocus={autoFocus ? "" : undefined}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && layout === "dropdown") setFocused(false);
            }}
            placeholder={placeholder}
            className={`field pl-10 [&::-webkit-search-cancel-button]:appearance-none ${
              size === "lg" ? "h-[3.25rem]" : ""
            }`}
          />
        </div>
      </form>
      <div aria-live="polite">{panel}</div>
    </div>
  );
}
