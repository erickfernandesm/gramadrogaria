import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Finalizar pedido",
  description: "Escolha entrega ou retirada na loja e envie seu pedido pelo WhatsApp.",
  robots: { index: false, follow: true },
};

export default function OrderPage() {
  return (
    <div className="container-page py-8 lg:py-12">
      <h1 className="sr-only">Finalizar pedido</h1>
      <CheckoutForm />
    </div>
  );
}
