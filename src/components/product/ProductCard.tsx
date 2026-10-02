import Image from "next/image";
import Link from "next/link";
import { AddToOrder } from "@/components/product/AddToOrder";
import { ProductPrice } from "@/components/product/ProductPrice";
import { getCategoryName, isOffer } from "@/lib/catalog";
import { categoryTint } from "@/lib/categoryTheme";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const badge = isOffer(product) ? "Oferta" : product.badge;

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-paper p-2.5 transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-pop sm:p-3">
      <div
        className={`relative aspect-square overflow-hidden rounded-lg ${categoryTint[product.category]}`}
      >
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badge ? (
          <span
            className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide ${
              badge === "Genérico" ? "bg-ink text-sun" : "bg-brand text-white"
            }`}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-mute">
          {product.brand ? `${product.brand} · ` : ""}
          {getCategoryName(product.category)}
        </p>
        <h3 className="mt-1 font-sans text-[0.9375rem] font-semibold leading-snug tracking-normal text-ink">
          {/* O link cobre o card inteiro; o botão fica acima dele. */}
          <Link href={`/produtos/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        {product.presentation ? (
          <p className="mt-0.5 text-sm text-ink-soft">{product.presentation}</p>
        ) : null}

        <div className="mt-auto pt-3">
          <ProductPrice product={product} />
          {product.requiresPrescription ? (
            <p className="mt-1 text-xs text-ink-mute">Pode exigir receita</p>
          ) : null}
        </div>

        <div className="relative z-10 mt-3">
          <AddToOrder product={product} />
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
