import { isOffer } from "@/lib/catalog";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/types";

type ProductPriceProps = {
  product: Product;
  size?: "sm" | "lg";
};

/** Preço do produto. Sem preço cadastrado, orienta a consultar. */
export function ProductPrice({ product, size = "sm" }: ProductPriceProps) {
  const { price, oldPrice } = product;

  if (price === undefined) {
    return (
      <p className={size === "lg" ? "text-base text-ink-soft" : "text-sm text-ink-mute"}>
        Consulte o preço
      </p>
    );
  }

  const offer = isOffer(product) && oldPrice !== undefined;

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <p
        className={`font-display font-bold tabular-nums text-ink ${size === "lg" ? "text-3xl" : "text-lg"}`}
      >
        {formatPrice(price)}
      </p>
      {offer ? (
        <>
          <p className="text-sm text-ink-mute tabular-nums">
            <span className="sr-only">Preço anterior: </span>
            <s>{formatPrice(oldPrice)}</s>
          </p>
          <p className="rounded-sm bg-sun px-1.5 py-0.5 text-xs font-bold text-ink">
            -{discountPercent(price, oldPrice)}%
          </p>
        </>
      ) : null}
    </div>
  );
}
