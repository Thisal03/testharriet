import { QueryOptionsType, Product } from "@/framework/basic-rest/types";
import { useQuery } from "@tanstack/react-query";
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

export const fetchRelatedProducts = async (slug: string) => {
  try {
    const { data } = await WooCommerce.get(
      `wp-json/wc/v3/products?status=publish&slug=${slug}`
    );

    if (!data || !Array.isArray(data) || data.length === 0) {
      // Product not found - return empty results instead of logging error
      return { products: [], type: null };
    }

    const product = data[0] as Product; // Assuming slug is unique, so we take the first product
    const relatedIds = product.related_ids || [];

    let productIds: number[] = [];
    let type: "cross_sell" | "related" | null = null;

    if (product.cross_sell_ids && product.cross_sell_ids.length > 0) {
      productIds = product.cross_sell_ids;
      type = "cross_sell";
    } else if (product.related_ids && product.related_ids.length > 0) {
      productIds = product.related_ids;
      type = "related";
    }

    if (productIds.length === 0) {
      // No related products found - return empty results
      return { products: [], type: null };
    }

    const relatedProducts = await Promise.all(
      productIds.map(async (id: number) => {
        try {
          const { data } = await WooCommerce.get(`wp-json/wc/v3/products/${id}`);
          return data as Product;
        } catch (error) {
          // Skip individual product errors and return null
          return null;
        }
      })
    );

    // Filter out any null products from failed fetches
    const validProducts = relatedProducts.filter(product => product !== null) as Product[];

    return { products: validProducts, type };
  } catch (error) {
    // Return empty results instead of throwing error
    return { products: [], type: null };
  }
};

export const useRelatedProductsQuery = (
  slug: string,
  options: QueryOptionsType
) => {
  return useQuery<
    { products: Product[]; type: "cross_sell" | "related" | null },
    Error
  >({
    queryKey: [slug, options],
    queryFn: () => fetchRelatedProducts(slug),
    ...options,
    staleTime: 1000 * 60 * 5,
  });
};
