import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/produtos/"), changeFrequency: "weekly", priority: 0.9 },
    ...getProducts().map((product) => ({
      url: absoluteUrl(`/produtos/${product.slug}/`),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
