import Image from "next/image";
import Link from "next/link";
import { AddToOrder } from "@/components/product/AddToOrder";
import { ProductPrice } from "@/components/product/ProductPrice";
import { getCategoryName, isOffer } from "@/lib/catalog";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const badge = isOffer(product) ? "Oferta" : product.badge;

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-md bg-sand">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {badge ? (
          <span
            className={`absolute left-2 top-2 rounded-sm px-1.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide ${
              badge === "Genérico" ? "bg-sun text-ink" : "bg-brand text-white"
            }`}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <p className="text-xs text-ink-mute">
          {product.brand ? `${product.brand} · ` : ""}
          {getCategoryName(product.category)}
        </p>
        <h3 className="mt-1 font-sans text-[0.9375rem] font-semibold leading-snug tracking-normal text-ink">
          {/* O link cobre o card inteiro; o botão fica acima dele. */}
          <Link
            href={`/produtos/${product.slug}`}
            className="after:absolute after:inset-0 hover:underline"
          >
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
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
