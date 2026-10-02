import { ButtonLink } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/icons";
import { storeConfig } from "@/config/store";

/**
 * Chamada para o Instagram. Não reproduz publicações: as imagens do perfil
 * só devem entrar aqui com autorização e arquivos fornecidos pela drogaria.
 */
export function InstagramBand() {
  return (
    <section className="bg-sun">
      <div className="container-page flex flex-col items-start gap-5 py-9 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Acompanhe a {storeConfig.name}</h2>
          <p className="mt-1 text-ink/80">
            Novidades e avisos da loja em{" "}
            <span className="font-semibold text-ink">{storeConfig.instagram.handle}</span>.
          </p>
        </div>
        <ButtonLink
          href={storeConfig.instagram.url}
          external
          variant="dark"
        >
          <InstagramIcon className="size-[1.125rem]" />
          Seguir no Instagram
        </ButtonLink>
      </div>
    </section>
  );
}
