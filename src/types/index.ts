export type CategorySlug =
  | "medicamentos"
  | "genericos"
  | "perfumaria"
  | "cosmeticos"
  | "higiene-pessoal";

export type Category = {
  slug: CategorySlug;
  name: string;
  /** Frase curta exibida nos blocos de categoria. */
  description: string;
};

export type ProductBadge = "Genérico" | "Novo" | "Oferta";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  category: CategorySlug;
  /** Preço em reais. Ausente = "consulte o preço pelo WhatsApp". */
  price?: number;
  /** Preço anterior. Só preencher com promoção real. */
  oldPrice?: number;
  image: string;
  images?: string[];
  description?: string;
  /** Apresentação comercial, ex.: "10 comprimidos". */
  presentation?: string;
  badge?: ProductBadge;
  /** Termos extras para a busca (sinônimos, nome popular). */
  keywords?: string[];
  requiresPrescription?: boolean;
  availableForDelivery?: boolean;
  availableForPickup?: boolean;
  featured?: boolean;
};

export type Service = {
  id: string;
  title: string;
  description: string;
};

export type DayHours = {
  /** Rótulo exibido, ex.: "Segunda a sexta". */
  label: string;
  /** Dias no formato schema.org, ex.: ["Monday", "Tuesday"]. */
  days: string[];
  opens: string;
  closes: string;
};

export type FulfillmentMethod = "entrega" | "retirada";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderCustomer = {
  name: string;
  phone: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  reference: string;
  notes: string;
};
