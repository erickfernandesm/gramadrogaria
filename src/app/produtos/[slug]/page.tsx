import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductCard";
import { ProductPrice } from "@/components/product/ProductPrice";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { storeConfig } from "@/config/store";
import {
  getCategoryName,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
  getServices,
  isOffer,
} from "@/lib/catalog";
import { categoryTint } from "@/lib/categoryTheme";
import { jsonLdString, productJsonLd } from "@/lib/seo";
import type { CategorySlug } from "@/types";

type PageProps = { params: Promise<{ slug: string }> };

const MEDICINE_CATEGORIES: CategorySlug[] = ["medicamentos", "genericos"];

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const name = [product.name, product.presentation].filter(Boolean).join(", ");

  return {
    title: name,
    description: `${name} na ${storeConfig.name}, em ${storeConfig.address.city}. Peça pelo site e finalize pelo WhatsApp, com entrega ou retirada na loja.`,
    alternates: { canonical: `/produtos/${product.slug}/` },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const categoryName = getCategoryName(product.category);
  const related = getRelatedProducts(product);
  const isMedicine = MEDICINE_CATEGORIES.includes(product.category);
  const badge = isOffer(product) ? "Oferta" : product.badge;

  // Formas de recebimento disponíveis para este produto.
  const services = getServices().filter((service) => {
    if (service.id === "entrega") return product.availableForDelivery !== false;
    if (service.id === "retirada") return product.availableForPickup !== false;
    return true;
  });

  return (
    <div className="container-page py-6 lg:py-10">
      <nav aria-label="Você está em" className="text-sm text-ink-mute">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/produtos" className="hover:text-ink hover:underline">
              Produtos
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-3.5" />
          </li>
          <li>
            <Link
              href={`/produtos?categoria=${product.category}`}
              className="hover:text-ink hover:underline"
            >
              {categoryName}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="mt-5 grid gap-8 md:grid-cols-2 lg:gap-16">
        <div
          className={`relative aspect-square overflow-hidden rounded-2xl md:sticky md:top-32 md:self-start ${categoryTint[product.category]}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          {badge ? (
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${
                badge === "Genérico" ? "bg-ink text-sun" : "bg-brand text-white"
              }`}
            >
              {badge}
            </span>
          ) : null}

          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-ink-soft">
            {[product.brand, product.presentation, categoryName].filter(Boolean).join(" · ")}
          </p>

          <div className="mt-6">
            <ProductPrice product={product} size="lg" />
            {product.price === undefined ? (
              <p className="mt-1 text-sm text-ink-mute">
                O valor é informado pela nossa equipe na confirmação do pedido.
              </p>
            ) : null}
          </div>

          <div className="mt-6">
            <ProductPurchase product={product} />
          </div>

          {product.description ? (
            <div className="mt-8 border-t border-line pt-6">
              <h2 className="font-sans text-base font-bold tracking-normal">Sobre o produto</h2>
              <p className="mt-2 text-ink-soft">{product.description}</p>
            </div>
          ) : null}

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="font-sans text-base font-bold tracking-normal">Como receber</h2>
            <dl className="mt-3 space-y-3">
              {services.map((service) => (
                <div key={service.id}>
                  <dt className="text-sm font-semibold">{service.title}</dt>
                  <dd className="text-sm text-ink-soft">{service.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          {isMedicine ? (
            <p className="mt-8 border-t border-line pt-6 text-xs leading-relaxed text-ink-mute">
              Informações de caráter comercial, que não substituem a orientação de médico ou
              farmacêutico. Leia a bula. A venda de medicamentos está sujeita às exigências
              legais aplicáveis.
            </p>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-14 border-t border-line pt-10 lg:mt-20">
          <h2 className="text-2xl font-bold">Mais em {categoryName}</h2>
          <div className="mt-6">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(productJsonLd(product, categoryName)) }}
      />
    </div>
  );
}
