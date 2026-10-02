import { ButtonLink } from "@/components/ui/Button";
import { storeConfig } from "@/config/store";
import { messages, whatsappUrl } from "@/lib/whatsapp";

/**
 * Estrutura das páginas institucionais (privacidade, termos, trocas).
 * O texto jurídico deve ser fornecido pela drogaria ou por seu responsável
 * legal: passe o conteúdo em `children` e a página deixa de exibir o aviso.
 */
export function LegalPlaceholder({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="container-page py-10 lg:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {children ?? (
          <>
            <p className="mt-5 text-lg text-ink-soft">
              Este documento está sendo preparado pela {storeConfig.name} e será publicado aqui
              em breve.
            </p>
            <p className="mt-3 text-ink-soft">
              Enquanto isso, qualquer dúvida sobre este assunto pode ser tratada diretamente com
              a nossa equipe.
            </p>
            <ButtonLink
              href={whatsappUrl(messages.general)}
              external
              variant="outline"
              className="mt-6"
            >
              Falar com a equipe
            </ButtonLink>
          </>
        )}
      </div>
    </div>
  );
}
