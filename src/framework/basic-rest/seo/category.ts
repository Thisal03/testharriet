export async function fetchCategorySEOData(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/category-info/${slug}`);
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch category SEO data:", error);
    return null;
  }
}
