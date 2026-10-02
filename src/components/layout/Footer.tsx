import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { legalNav, type NavItem } from "@/config/navigation";
import { fullAddress, storeConfig } from "@/config/store";
import { messages, whatsappUrl } from "@/lib/whatsapp";

type FooterLink = NavItem & { external?: boolean };
type FooterGroup = { title: string; links: FooterLink[] };

const groups: FooterGroup[] = [
  {
    title: storeConfig.name,
    links: [
      { label: "Sobre", href: "/#sobre" },
      { label: "Produtos", href: "/produtos" },
      { label: "Contato", href: "/#contato" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "WhatsApp", href: whatsappUrl(messages.general), external: true },
      { label: "Horários", href: "/#contato" },
      { label: "Endereço", href: "/#contato" },
      { label: "Como chegar", href: storeConfig.mapsUrl, external: true },
    ],
  },
  {
    title: "Compra",
    links: [
      { label: "Entrega", href: "/#como-pedir" },
      { label: "Retirada na loja", href: "/#como-pedir" },
      { label: "Meu pedido", href: "/pedido" },
    ],
  },
  { title: "Institucional", links: legalNav },
];

const linkClass = "text-sm text-white/75 transition-colors hover:text-white";

function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-2.5">
      {links.map((link) => (
        <li key={link.label}>
          {link.external ? (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {link.label}
            </a>
          ) : (
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.2fr_2fr] lg:py-16">
        <div>
          <Logo inverted />
          <address className="mt-5 max-w-xs text-sm not-italic leading-relaxed text-white/75">
            {fullAddress}
          </address>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
            <a
              href={whatsappUrl(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-sun"
            >
              <WhatsAppIcon className="size-4" />
              {storeConfig.whatsapp.display}
            </a>
            <a
              href={storeConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-sun"
            >
              <InstagramIcon className="size-4" />
              {storeConfig.instagram.handle}
            </a>
          </div>
        </div>

        {/* Celular: grupos recolhíveis. */}
        <div className="divide-y divide-white/15 border-y border-white/15 md:hidden">
          {groups.map((group) => (
            <details key={group.title} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-semibold [&::-webkit-details-marker]:hidden">
                {group.title}
                <ChevronDown
                  className="size-5 text-white/60 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-5">
                <FooterLinks links={group.links} />
              </div>
            </details>
          ))}
        </div>

        {/* Tablet e desktop: colunas. */}
        <div className="hidden grid-cols-4 gap-8 md:grid">
          {groups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-4 font-sans text-sm font-bold tracking-normal">{group.title}</h2>
              <FooterLinks links={group.links} />
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page space-y-2 py-6 pb-24 text-xs leading-relaxed text-white/60 md:pb-6">
          <p>
            {storeConfig.legalName} · CNPJ {storeConfig.cnpj}
          </p>
          <p>
            A venda de medicamentos está sujeita às exigências legais aplicáveis, incluindo a
            apresentação de receita quando necessária. As informações deste site têm caráter
            comercial e não substituem a orientação de médico ou farmacêutico.
          </p>
        </div>
      </div>
    </footer>
  );
}
