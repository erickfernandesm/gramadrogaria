import type { Metadata, Viewport } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ServiceBar } from "@/components/layout/ServiceBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { storeConfig } from "@/config/store";
import { jsonLdString, pharmacyJsonLd } from "@/lib/seo";
import "./globals.css";

const heading = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Farmácia no bairro Grama, em Juiz de Fora. Medicamentos, genéricos, perfumaria e higiene. Monte seu pedido no site e finalize pelo WhatsApp, com entrega em casa ou retirada na loja.";

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.siteUrl),
  title: {
    default: `${storeConfig.name} | Farmácia no Grama, Juiz de Fora`,
    template: `%s | ${storeConfig.name}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: storeConfig.name,
    title: `${storeConfig.name} | Farmácia no Grama, Juiz de Fora`,
    description,
    url: "/",
    images: [{ url: storeConfig.logo, width: 150, height: 150, alt: storeConfig.name }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${heading.variable} ${body.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <CartProvider>
          <Header />
          <ServiceBar />
          <main id="conteudo">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(pharmacyJsonLd()) }}
        />
      </body>
    </html>
  );
}
