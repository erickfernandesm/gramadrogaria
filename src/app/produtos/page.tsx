import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/product/CatalogBrowser";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Medicamentos, genéricos, perfumaria, cosméticos e higiene pessoal na Drogaria Grama, em Juiz de Fora. Monte seu pedido e finalize pelo WhatsApp.",
  alternates: { canonical: "/produtos/" },
};

export default function ProductsPage() {
  return (
    // Os filtros vêm da URL e são lidos no navegador (site estático).
    <Suspense fallback={<div className="container-page min-h-[60vh] py-12" />}>
      <CatalogBrowser />
    </Suspense>
  );
}
