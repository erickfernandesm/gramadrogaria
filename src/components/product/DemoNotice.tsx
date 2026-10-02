import { IS_DEMO_CATALOG } from "@/data/products";

/** Aviso exibido enquanto o catálogo real não está conectado. */
export function DemoNotice() {
  if (!IS_DEMO_CATALOG) return null;

  return (
    <p className="border-l-2 border-sun pl-3 text-sm text-ink-soft">
      Catálogo em montagem: os itens abaixo são exemplos. Disponibilidade e preços são
      confirmados pela nossa equipe no WhatsApp.
    </p>
  );
}
