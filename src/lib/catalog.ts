import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { services } from "@/data/services";
import type { Category, CategorySlug, Product, Service } from "@/types";

/**
 * Camada de acesso ao catálogo. Hoje lê os arquivos em /src/data.
 * Ao integrar ERP, estoque ou banco de dados, basta trocar a implementação
 * destas funções: nenhum componente importa /src/data diretamente.
 */

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

/** Ofertas reais: exigem preço atual e preço anterior maior. */
export function getOffers(): Product[] {
  return products.filter(isOffer);
}

export function isOffer(product: Product): boolean {
  return (
    product.price !== undefined &&
    product.oldPrice !== undefined &&
    product.oldPrice > product.price
  );
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, limit);
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryName(slug: CategorySlug): string {
  return getCategory(slug)?.name ?? slug;
}

export function getServices(): Service[] {
  return services;
}
