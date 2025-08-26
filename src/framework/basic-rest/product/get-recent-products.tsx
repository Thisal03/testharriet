import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product, QueryOptionsType } from "@/framework/basic-rest/types";

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

interface FetchProductsProps {
  products: Product[];
}

export const fetchRecentProducts = async (
  options: QueryOptionsType,
  _page: number
): Promise<FetchProductsProps> => {
  try {
    let url = `wp-json/wc/v3/products?per_page=${options.limit}&status=publish`;

    // Append minPrice and maxPrice to the URL if provided
    if (options.minPrice !== undefined) {
      url += `&min_price=${options.minPrice}`;
    }
    if (options.maxPrice !== undefined) {
      url += `&max_price=${options.maxPrice}`;
    }

    if (options.sortOption) {
      url += `&orderby=${
        options.sortOption === "low-high"
          ? "price&order=asc"
          : options.sortOption === "high-low"
          ? "price&order=desc"
          : "date&order=desc"
      }`;
    }

    const { data } = await WooCommerce.get(url);

    const productsWithVariations = await Promise.all(
      data.map(async (product: Product) => {
        if (product.type === "variable") {
          const { data: variations } = await WooCommerce.get(
            `wp-json/wc/v3/products/${product.id}/variations`
          );
          return { ...product, variations };
        }
        return product;
      })
    );

    return { products: productsWithVariations as Product[] };
  } catch (error) {
    console.error("Error fetching new arrival products:", error);
    throw new Error("Error fetching new arrival products");
  }
};

export const useRecentProductsQuery = (
  options: QueryOptionsType,
  page: number = 1
) => {
  return useQuery<FetchProductsProps, Error>({
    queryKey: ["recent_products", options, page],
    queryFn: () => fetchRecentProducts(options, page),
    staleTime: 1000 * 60 * 5,
  });
};
