import type { CategorySlug, Product } from "@/types";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * CATÁLOGO DEMONSTRATIVO
 * ─────────────────────────────────────────────────────────────────────────
 * Os itens abaixo NÃO são o estoque real da Drogaria Grama. São produtos
 * comuns de drogaria, sem marca e sem preço, usados para demonstrar o
 * funcionamento do site até o catálogo real ser conectado.
 *
 * Regras ao substituir pelos dados reais:
 * - `price`/`oldPrice`: preencher apenas com valores reais. Sem `price`, o
 *   site mostra "Consulte o preço" e o pedido segue para confirmação.
 * - `requiresPrescription`: marcar `true` para todo medicamento que exija
 *   receita. Esses itens não entram no carrinho: vão direto ao WhatsApp.
 * - `description`: apenas informação comercial. Nunca indicação, posologia
 *   ou promessa de tratamento.
 * - `image`: trocar o placeholder pela foto real em /public/produtos.
 *
 * Enquanto esta flag estiver `true`, o site exibe um aviso de catálogo
 * demonstrativo na vitrine.
 */
export const IS_DEMO_CATALOG = true;

const placeholder = (category: CategorySlug) => `/produtos/${category}.svg`;

type Seed = Omit<Product, "id" | "image" | "availableForDelivery" | "availableForPickup">;

const seeds: Seed[] = [
  // Genéricos
  {
    slug: "dipirona-monoidratada-500mg-10-comprimidos",
    name: "Dipirona Monoidratada 500 mg",
    presentation: "10 comprimidos",
    category: "genericos",
    badge: "Genérico",
    keywords: ["dipirona", "analgesico", "comprimido"],
    featured: true,
  },
  {
    slug: "dipirona-monoidratada-gotas-20ml",
    name: "Dipirona Monoidratada 500 mg/mL gotas",
    presentation: "Frasco 20 mL",
    category: "genericos",
    badge: "Genérico",
    keywords: ["dipirona", "gotas"],
  },
  {
    slug: "paracetamol-750mg-20-comprimidos",
    name: "Paracetamol 750 mg",
    presentation: "20 comprimidos",
    category: "genericos",
    badge: "Genérico",
    keywords: ["paracetamol", "comprimido"],
    featured: true,
  },
  {
    slug: "ibuprofeno-400mg-10-capsulas",
    name: "Ibuprofeno 400 mg",
    presentation: "10 cápsulas",
    category: "genericos",
    badge: "Genérico",
    keywords: ["ibuprofeno"],
  },
  {
    slug: "losartana-potassica-50mg-30-comprimidos",
    name: "Losartana Potássica 50 mg",
    presentation: "30 comprimidos",
    category: "genericos",
    badge: "Genérico",
    requiresPrescription: true,
    keywords: ["losartana"],
  },
  {
    slug: "amoxicilina-500mg-21-capsulas",
    name: "Amoxicilina 500 mg",
    presentation: "21 cápsulas",
    category: "genericos",
    badge: "Genérico",
    requiresPrescription: true,
    keywords: ["amoxicilina", "antibiotico"],
  },

  // Medicamentos e itens de farmácia
  {
    slug: "soro-fisiologico-500ml",
    name: "Soro Fisiológico 0,9%",
    presentation: "Frasco 500 mL",
    category: "medicamentos",
    keywords: ["soro", "cloreto de sodio"],
    featured: true,
  },
  {
    slug: "vitamina-c-1g-efervescente-10-comprimidos",
    name: "Vitamina C 1 g efervescente",
    presentation: "10 comprimidos",
    category: "medicamentos",
    keywords: ["vitamina", "acido ascorbico", "efervescente"],
    featured: true,
  },
  {
    slug: "sais-para-reidratacao-oral",
    name: "Sais para Reidratação Oral",
    presentation: "Envelope 27,9 g",
    category: "medicamentos",
    keywords: ["soro caseiro", "reidratante"],
  },
  {
    slug: "curativo-adesivo-40-unidades",
    name: "Curativo adesivo",
    presentation: "40 unidades",
    category: "medicamentos",
    keywords: ["curativo", "band", "machucado"],
  },
  {
    slug: "termometro-clinico-digital",
    name: "Termômetro clínico digital",
    presentation: "1 unidade",
    category: "medicamentos",
    keywords: ["termometro", "febre"],
  },

  // Higiene pessoal
  {
    slug: "creme-dental-90g",
    name: "Creme dental",
    presentation: "90 g",
    category: "higiene-pessoal",
    keywords: ["pasta de dente", "dental"],
    featured: true,
  },
  {
    slug: "sabonete-liquido-250ml",
    name: "Sabonete líquido",
    presentation: "250 mL",
    category: "higiene-pessoal",
    keywords: ["sabonete", "banho"],
  },
  {
    slug: "fralda-descartavel-tamanho-m",
    name: "Fralda descartável tamanho M",
    presentation: "Pacote",
    category: "higiene-pessoal",
    keywords: ["fralda", "bebe", "infantil"],
    featured: true,
  },
  {
    slug: "lenco-umedecido-48-unidades",
    name: "Lenço umedecido",
    presentation: "48 unidades",
    category: "higiene-pessoal",
    keywords: ["lenco", "bebe", "toalha umedecida"],
  },
  {
    slug: "alcool-70-500ml",
    name: "Álcool etílico 70%",
    presentation: "500 mL",
    category: "higiene-pessoal",
    keywords: ["alcool", "antisseptico"],
  },

  // Perfumaria
  {
    slug: "desodorante-aerosol-150ml",
    name: "Desodorante aerosol",
    presentation: "150 mL",
    category: "perfumaria",
    keywords: ["desodorante", "antitranspirante"],
    featured: true,
  },
  {
    slug: "colonia-100ml",
    name: "Colônia",
    presentation: "100 mL",
    category: "perfumaria",
    keywords: ["perfume", "colonia", "fragrancia"],
  },
  {
    slug: "hidratante-corporal-200ml",
    name: "Hidratante corporal",
    presentation: "200 mL",
    category: "perfumaria",
    keywords: ["hidratante", "locao", "creme"],
  },

  // Cosméticos
  {
    slug: "protetor-solar-fps-50",
    name: "Protetor solar FPS 50",
    presentation: "120 mL",
    category: "cosmeticos",
    keywords: ["protetor", "filtro solar", "sol"],
    featured: true,
  },
  {
    slug: "shampoo-anticaspa-200ml",
    name: "Shampoo anticaspa",
    presentation: "200 mL",
    category: "cosmeticos",
    keywords: ["shampoo", "xampu", "cabelo"],
  },
  {
    slug: "condicionador-200ml",
    name: "Condicionador",
    presentation: "200 mL",
    category: "cosmeticos",
    keywords: ["condicionador", "cabelo"],
  },
];

export const products: Product[] = seeds.map((seed, index) => ({
  ...seed,
  id: `demo-${String(index + 1).padStart(3, "0")}`,
  image: placeholder(seed.category),
  availableForDelivery: true,
  availableForPickup: true,
}));
