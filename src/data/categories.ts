import type { Category } from "@/types";

/**
 * Categorias confirmadas em fontes públicas: o Instagram oficial cita
 * "Medicamentos e perfumaria"; o cadastro da empresa inclui cosméticos,
 * perfumaria e higiene pessoal. Novas categorias (vitaminas, mamãe e bebê
 * etc.) devem ser adicionadas aqui e em `CategorySlug` quando confirmadas.
 */
export const categories: Category[] = [
  {
    slug: "medicamentos",
    name: "Medicamentos",
    description: "De referência e similares, com atendimento da nossa equipe.",
  },
  {
    slug: "genericos",
    name: "Genéricos",
    description: "A mesma substância ativa, na versão genérica.",
  },
  {
    slug: "higiene-pessoal",
    name: "Higiene pessoal",
    description: "O básico do dia a dia para a família toda.",
  },
  {
    slug: "perfumaria",
    name: "Perfumaria",
    description: "Colônias, desodorantes e cuidados com o corpo.",
  },
  {
    slug: "cosmeticos",
    name: "Cosméticos",
    description: "Pele, cabelo e proteção solar.",
  },
];
