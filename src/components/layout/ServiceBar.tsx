import { storeConfig } from "@/config/store";

/** Faixa com as formas de atendimento confirmadas. */
export function ServiceBar() {
  const { delivery, pickup } = storeConfig.fulfillment;

  const items = [
    delivery ? `Entrega em ${storeConfig.address.city}` : null,
    pickup ? "Retire na loja" : null,
    "Atendimento pelo WhatsApp",
  ].filter((item): item is string => item !== null);

  return (
    <div className="bg-ink text-white">
      <ul className="container-page flex items-center justify-center gap-x-3 py-2 text-center text-[0.8125rem] sm:gap-x-5">
        {items.map((item, index) => (
          <li
            key={item}
            className={`items-center gap-x-3 sm:gap-x-5 ${
              // No celular mais estreito cabem duas mensagens; a terceira entra a partir de 480px.
              index === 2 ? "hidden min-[480px]:flex" : "flex"
            }`}
          >
            {index > 0 ? <span aria-hidden="true" className="size-1 rounded-full bg-sun" /> : null}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
