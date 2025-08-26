import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Product,
  CatQueryStatusOptionsType,
} from "@/framework/basic-rest/types";
import { eventEmitter } from "@/lib/utils/event-emitter";

// Define the base URL for your WooCommerce site
const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;
const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY!;
const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET!;

const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  auth: {
    username: WOOCOMMERCE_CONSUMER_KEY,
    password: WOOCOMMERCE_CONSUMER_SECRET,
  },
});

interface FetchProductsResponse {
  products: Product[];
  categories: string[];
  total: number;
}

export const fetchProductsByStatus = async (
  options: CatQueryStatusOptionsType
): Promise<FetchProductsResponse> => {
  try {
    // Build the base URL with stock status
    let url = `wp-json/wc/v3/products/by-category/${options.slug}?`;

    if (options.stock_status) {
      url += `stock_status=${options.stock_status}`;
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

    // Add `per_page` and `page` for pagination
    const perPage = options.perPage || 100;
    const page = options.page || 1;
    url += `&per_page=${perPage}&page=${page}`;

    const { data, headers } = await WooCommerce.get(url);
    const products = data as Product[];
    const total = parseInt(headers["x-wp-total"], 10);

    eventEmitter.emit("updateProductCount", total);

    const categoriesSet = new Set<string>();
    products.forEach((product) => {
      product.categories?.forEach((category) => {
        categoriesSet.add(JSON.stringify(category));
      });
    });
    const categories = Array.from(categoriesSet).map((category) =>
      JSON.parse(category)
    );

    return { products, categories, total };
  } catch (error) {
    throw new Error("No products found in this category");
  }
};

export const useProductsByStatusQuery = (
  options: CatQueryStatusOptionsType,
  enabled: boolean = true
) => {
  return useQuery<FetchProductsResponse, Error>({
    queryKey: ["productsByCategory", options],
    queryFn: () => fetchProductsByStatus(options),
    staleTime: 1000 * 60 * 5,
    enabled: typeof enabled === "boolean" ? enabled : !!enabled,
  });
};

export const useDataFetching = (options: CatQueryStatusOptionsType) => {
  const { data } = useProductsByStatusQuery(options);

  useEffect(() => {
    if (data) {
      eventEmitter.emit("updateProductCount", data.total);
    }
  }, [data]);
};
