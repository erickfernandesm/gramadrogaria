import { storeConfig } from "@/config/store";
import type { Product } from "@/types";

export function absoluteUrl(path = "/"): string {
  return new URL(path, storeConfig.siteUrl).toString();
}

/** Schema.org da loja física. Horário só é publicado quando confirmado. */
export function pharmacyJsonLd() {
  const { address, hours, phone } = storeConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": absoluteUrl("/#loja"),
    name: storeConfig.name,
    legalName: storeConfig.legalName,
    url: absoluteUrl("/"),
    image: absoluteUrl(storeConfig.logo),
    logo: absoluteUrl(storeConfig.logo),
    telephone: phone?.number ?? `+${storeConfig.whatsapp.number}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.geo.lat,
      longitude: address.geo.lng,
    },
    areaServed: { "@type": "City", name: address.city },
    hasMap: storeConfig.mapsUrl,
    sameAs: [storeConfig.instagram.url],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${storeConfig.whatsapp.number}`,
      availableLanguage: "Portuguese",
    },
    ...(hours
      ? {
          openingHoursSpecification: hours.map((entry) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: entry.days,
            opens: entry.opens,
            closes: entry.closes,
          })),
        }
      : {}),
  };
}

/** Schema.org do produto. A oferta só entra quando há preço real. */
export function productJsonLd(product: Product, categoryName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: [product.name, product.presentation].filter(Boolean).join(", "),
    category: categoryName,
    image: absoluteUrl(product.image),
    url: absoluteUrl(`/produtos/${product.slug}/`),
    ...(product.description ? { description: product.description } : {}),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    ...(product.price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: product.price.toFixed(2),
            priceCurrency: "BRL",
            seller: { "@id": absoluteUrl("/#loja") },
          },
        }
      : {}),
  };
}

/** Serializa JSON-LD escapando "<" para não fechar a tag <script>. */
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
