import { Clock, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { storeConfig } from "@/config/store";
import { messages, whatsappUrl } from "@/lib/whatsapp";

function mapEmbedUrl(): string {
  const { lat, lng } = storeConfig.address.geo;
  const bbox = [lng - 0.004, lat - 0.0025, lng + 0.004, lat + 0.0025].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lng}`;
}

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3.5 py-4">
      <span className="mt-0.5 shrink-0 text-brand">{icon}</span>
      <div className="min-w-0">
        <dt className="text-sm text-ink-mute">{label}</dt>
        <dd className="font-semibold">{children}</dd>
      </div>
    </div>
  );
}

export function Location() {
  const { address, hours, phone } = storeConfig;

  return (
    <section id="contato" className="bg-sand">
      <div className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_1.2fr] lg:gap-14 lg:py-20">
        <div>
          <p className="eyebrow">Localização e contato</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Estamos no Grama</h2>

          <dl className="mt-5 divide-y divide-line-strong/60">
            <InfoRow icon={<MapPin className="size-5" aria-hidden="true" />} label="Endereço">
              <address className="not-italic">
                {address.street}
                <span className="block font-normal text-ink-soft">
                  {address.neighborhood}, {address.city} - {address.state}
                  <br />
                  CEP {address.zip}
                </span>
              </address>
            </InfoRow>

            <InfoRow icon={<WhatsAppIcon className="size-5" />} label="WhatsApp">
              <a
                href={whatsappUrl(messages.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                {storeConfig.whatsapp.display}
              </a>
            </InfoRow>

            {phone ? (
              <InfoRow icon={<Phone className="size-5" aria-hidden="true" />} label="Telefone">
                <a href={`tel:${phone.number}`} className="underline-offset-2 hover:underline">
                  {phone.display}
                </a>
              </InfoRow>
            ) : null}

            <InfoRow icon={<Clock className="size-5" aria-hidden="true" />} label="Horário">
              {hours ? (
                <ul className="font-normal">
                  {hours.map((entry) => (
                    <li key={entry.label}>
                      <span className="font-semibold">{entry.label}:</span> {entry.opens} às{" "}
                      {entry.closes}
                    </li>
                  ))}
                </ul>
              ) : (
                <a
                  href={whatsappUrl(messages.hours)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  Consulte o horário de hoje pelo WhatsApp
                </a>
              )}
            </InfoRow>
          </dl>

          <div className="mt-4 flex flex-col gap-3 min-[420px]:flex-row">
            <ButtonLink href={storeConfig.mapsUrl} external>
              Como chegar
            </ButtonLink>
            <ButtonLink href={whatsappUrl(messages.general)} external variant="outline">
              Chamar no WhatsApp
            </ButtonLink>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-line bg-paper">
          <iframe
            src={mapEmbedUrl()}
            title={`Mapa: ${storeConfig.name}, ${address.street}`}
            loading="lazy"
            className="block h-72 w-full sm:h-96 lg:h-full lg:min-h-[26rem]"
          />
        </div>
      </div>
    </section>
  );
}
