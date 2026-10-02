import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ProductGrid } from "@/components/product/ProductCard";
import type { Product } from "@/types";

type ProductShelfProps = {
  id?: string;
  title: string;
  products: Product[];
  href: string;
  linkLabel: string;
  notice?: ReactNode;
};

/** Vitrine de produtos da página inicial (destaques e ofertas). */
export function ProductShelf({ id, title, products, href, linkLabel, notice }: ProductShelfProps) {
  if (products.length === 0) return null;

  return (
    <section id={id} className="container-page py-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        <Link
          href={href}
          className="flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      {notice ? <div className="mt-4">{notice}</div> : null}
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
