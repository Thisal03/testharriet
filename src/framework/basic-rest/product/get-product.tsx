import { Product } from "@/framework/basic-rest/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the base URL for your WooCommerce site
const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!;

interface Variation {
  id: number;
}

const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  auth: {
    username: WOOCOMMERCE_CONSUMER_KEY,
    password: WOOCOMMERCE_CONSUMER_SECRET,
  },
});

export const fetchProductBySlug = async (slug: string): Promise<Product> => {
  try {
    const { data } = await WooCommerce.get(
      `wp-json/wc/v3/products?status=publish&slug=${slug}`
    );
    if (Array.isArray(data) && data.length > 0) {
      const product = data[0];
      if (product.type === "variable") {
        const allVariations: Variation[] = [];
        let currentPage = 1;
        let hasMorePages = true;

        while (hasMorePages) {
          const response = await WooCommerce.get(
            `wp-json/wc/v3/products/${product.id}/variations?page=${currentPage}`
          );
          const variations = response.data;
          allVariations.push(...variations);
          hasMorePages = variations.length === 10;
          currentPage++;
        }

        product.variations = allVariations;
      }
      return product;
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Error fetching product");
  }
};

export const fetchProductVariation = async (
  product_id: string | number,
  variation_id: string | number
): Promise<Product> => {
  try {
    return await WooCommerce.get(
      `wp-json/wc/v3/products/${product_id}/variations/${variation_id}`
    );
  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Error fetching product");
  }
};

export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", slug],
    queryFn: () => fetchProductBySlug(slug),
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });
};

export const useProductVariationQuery = (
  product_id: string | number,
  variation_id: string | number | undefined
) => {
  return useQuery<Product, Error>({
    queryKey: ["product", product_id, "variation", variation_id],
    queryFn: () => fetchProductVariation(product_id, variation_id!),
    staleTime: 1000 * 60 * 2,
    enabled: !!variation_id && !!product_id,
  });
};
