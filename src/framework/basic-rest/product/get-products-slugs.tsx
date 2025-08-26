import axios from "axios";

// Define the base URL for your WooCommerce site
const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!;

// Set up Axios with authentication
const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  auth: {
    username: WOOCOMMERCE_CONSUMER_KEY,
    password: WOOCOMMERCE_CONSUMER_SECRET,
  },
});

export const fetchProductsSlugs = async () => {
  try {
    // First request to get total items
    const initialResponse = await WooCommerce.get(
      `wp-json/wc/v3/products?per_page=1&_fields=slug`
    );

    const totalItems = parseInt(
      initialResponse.headers["x-wp-total"] || "0",
      10
    );
    const perPage = 100;
    const totalPages = Math.ceil(totalItems / perPage);
    const batchSize = 10; // Number of concurrent requests
    let allSlugs: string[] = [];

    // Process in batches
    for (let i = 0; i < totalPages; i += batchSize) {
      const batchPages = Array.from(
        { length: Math.min(batchSize, totalPages - i) },
        (_, j) => i + j + 1
      );

      const batchPromises = batchPages.map((page) =>
        WooCommerce.get(
          `wp-json/wc/v3/products?per_page=${perPage}&page=${page}&_fields=slug&status=publish`
        )
      );

      const batchResponses = await Promise.all(batchPromises);
      const batchSlugs = batchResponses.flatMap((response) =>
        response.data.map((product: { slug: string }) => product.slug)
      );

      allSlugs = [...allSlugs, ...batchSlugs];
    }

    return allSlugs;
  } catch (error: any) {
    console.error("Error fetching product slugs:", error.message);
  }
};
