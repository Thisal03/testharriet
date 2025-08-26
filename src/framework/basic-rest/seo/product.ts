export async function fetchProductSEOData(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/product-info/${slug}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch SEO data:", error);
    return null;
  }
}
