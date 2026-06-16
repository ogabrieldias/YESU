import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yesubrasil.com.br";

  const productPages = products.map((p) => ({
    url: `${baseUrl}/produtos/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...productPages,
  ];
}
