import { fetchProductsSlugs } from "@/framework/basic-rest/product/get-products-slugs";
import { SITE_URL } from "@/lib/metadata.config";
import { extractUrls, getPriority } from "@/lib/sitemap-helpers";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = extractUrls(SITE_URL);
  const productSlugs = await fetchProductsSlugs();
  const productUrls = productSlugs?.map(
    (slug) => `${SITE_URL}/product/${slug}`
  );

  return [
    ...urls.map((url) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: getPriority(url),
    })),
    ...(productUrls ?? []).map((url) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: getPriority(url),
    })),
  ];
}
