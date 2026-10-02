import { getCategoryName } from "@/lib/catalog";
import { normalize } from "@/lib/format";
import type { Product } from "@/types";

/**
 * Busca local por nome, marca, categoria e termos relacionados.
 * Todas as palavras digitadas precisam aparecer no produto; resultados
 * cujo nome começa com o termo vêm primeiro.
 */
export function searchProducts(list: Product[], query: string): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const scored: { product: Product; score: number }[] = [];

  for (const product of list) {
    const name = normalize(product.name);
    const haystack = [
      name,
      normalize(product.brand ?? ""),
      normalize(getCategoryName(product.category)),
      normalize(product.presentation ?? ""),
      ...(product.keywords ?? []).map(normalize),
    ].join(" ");

    if (!terms.every((term) => haystack.includes(term))) continue;

    let score = 0;
    if (name.startsWith(terms[0])) score += 3;
    if (terms.every((term) => name.includes(term))) score += 2;
    scored.push({ product, score });
  }

  return scored.sort((a, b) => b.score - a.score).map((entry) => entry.product);
}
