import type { CategorySlug } from "@/types";

/**
 * Cor de fundo de cada categoria. São as mesmas cores das ilustrações em
 * /public/produtos, para o bloco e a imagem formarem uma peça só.
 */
export const categoryTint: Record<CategorySlug, string> = {
  medicamentos: "bg-[#FCEBE8]",
  genericos: "bg-[#FFF3D1]",
  "higiene-pessoal": "bg-[#E6F1F7]",
  perfumaria: "bg-[#F5EBF5]",
  cosmeticos: "bg-[#FDEEDD]",
};

export const categoryImage = (slug: CategorySlug) => `/produtos/${slug}.svg`;
