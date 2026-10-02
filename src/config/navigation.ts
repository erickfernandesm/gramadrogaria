import { getOffers } from "@/lib/catalog";

export type NavItem = { label: string; href: string };

const hasOffers = getOffers().length > 0;

/** Menu principal. "Ofertas" só aparece quando há promoção real cadastrada. */
export const mainNav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  ...(hasOffers ? [{ label: "Ofertas", href: "/produtos?ofertas=1" }] : []),
  { label: "Entrega e retirada", href: "/#como-pedir" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export const legalNav: NavItem[] = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos de Uso", href: "/termos" },
  { label: "Trocas e devoluções", href: "/trocas" },
];
