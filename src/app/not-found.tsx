import { ButtonLink } from "@/components/ui/Button";
import { messages, whatsappUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <div className="container-page py-16 lg:py-24">
      <div className="max-w-xl">
        <p className="eyebrow">Página não encontrada</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          Esse endereço não existe por aqui.
        </h1>
        <p className="mt-4 text-ink-soft">
          O produto pode ter saído do site. Veja o catálogo ou pergunte para a nossa equipe.
        </p>
        <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
          <ButtonLink href="/produtos">Ver produtos</ButtonLink>
          <ButtonLink href={whatsappUrl(messages.general)} external variant="outline">
            Falar no WhatsApp
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
