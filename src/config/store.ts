import type { DayHours } from "@/types";

type StoreConfig = {
  name: string;
  legalName: string;
  cnpj: string;
  tagline: string;
  logo: string;
  siteUrl: string;
  whatsapp: { number: string; display: string };
  phone: { number: string; display: string } | null;
  instagram: { handle: string; url: string };
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
    geo: { lat: number; lng: number };
  };
  mapsUrl: string;
  hours: DayHours[] | null;
  fulfillment: {
    delivery: boolean;
    pickup: boolean;
    deliveryArea: string | null;
    deliveryFee: string | null;
    deliveryTime: string | null;
  };
};

/**
 * Fonte única de dados da loja. Tudo o que aparece no site sobre a
 * Drogaria Grama (contato, endereço, horários, links) sai daqui.
 *
 * Origem dos dados (pesquisa de out/2026):
 * - WhatsApp e telefone fixo: bio do Instagram oficial @drogariagrama.
 * - Endereço e CEP: Instagram + cadastro público do CNPJ + Google.
 * - Entrega em casa: publicação do Instagram oficial ("Entregamos em casa").
 */
export const storeConfig: StoreConfig = {
  name: "Drogaria Grama",
  legalName: "Drogaria Hauck Grama e Drugstore Ltda",
  cnpj: "03.741.284/0001-65",
  /** Frase usada pela própria drogaria no Instagram. */
  tagline: "Nós cuidamos de você",
  logo: "/logo.jpg",

  /**
   * Domínio final do site. AJUSTAR quando o domínio for definido
   * (ou definir a variável NEXT_PUBLIC_SITE_URL no Cloudflare).
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://drogariagrama.com.br",

  whatsapp: {
    /** Formato internacional, só dígitos, usado no link wa.me. */
    number: "5532988473141",
    display: "(32) 98847-3141",
  },

  /**
   * Telefone fixo. O Instagram oficial e o Google informam (32) 3082-8282.
   * Diretórios antigos listam (32) 3221-3327, que não foi usado por não vir
   * de fonte oficial. Use `null` para ocultar.
   */
  phone: {
    number: "+553230828282",
    display: "(32) 3082-8282",
  },

  instagram: {
    handle: "@drogariagrama",
    url: "https://www.instagram.com/drogariagrama/",
  },

  address: {
    street: "Rua Diomar Monteiro, 88",
    neighborhood: "Grama",
    city: "Juiz de Fora",
    state: "MG",
    zip: "36048-310",
    /** Coordenadas do cadastro público da loja no Google. */
    geo: { lat: -21.6907742, lng: -43.348998 },
  },

  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Drogaria+Grama%2C+Rua+Diomar+Monteiro%2C+88+-+Grama%2C+Juiz+de+Fora+-+MG",

  /**
   * HORÁRIOS: NÃO CONFIRMADOS.
   * Diretórios públicos divergem (alguns: seg a sex 8h–21h, sáb 8h–20h,
   * dom 8h–12h) e a drogaria não publica horário oficial no Instagram.
   * Enquanto estiver `null`, o site orienta confirmar pelo WhatsApp e o
   * Schema.org não publica horário. Para ativar, preencher assim:
   *
   * hours: [
   *   { label: "Segunda a sexta", days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "21:00" },
   *   { label: "Sábado", days: ["Saturday"], opens: "08:00", closes: "20:00" },
   * ],
   */
  hours: null,

  fulfillment: {
    delivery: true,
    pickup: true,
    /** Área, taxa e prazo de entrega não são públicos: combinados no WhatsApp. */
    deliveryArea: null,
    deliveryFee: null,
    deliveryTime: null,
  },
};

const { address } = storeConfig;

export const fullAddress = `${address.street} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zip}`;
