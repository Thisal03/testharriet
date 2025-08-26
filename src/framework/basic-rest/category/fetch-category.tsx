import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product, CatQueryOptionsType } from "@/framework/basic-rest/types";
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

export const fetchProductsByCategory = async (
  options: CatQueryOptionsType,
  page: number = 1,
  perPage: number = 30
): Promise<FetchProductsResponse> => {
  try {
    let url = `wp-json/wc/v3/products/by-category/${options.slug}?per_page=${perPage}&page=${page}`;

    // Append minPrice and maxPrice to the URL if provided
    if (options.minPrice !== undefined) {
      url += `&minPrice=${options.minPrice}`;
    }
    if (options.maxPrice !== undefined) {
      url += `&maxPrice=${options.maxPrice}`;
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

export const useProductsByCategoryQuery = (
  options: CatQueryOptionsType,
  page?: number,
  perPage?: number,
  enabled?: boolean
) => {
  return useQuery<FetchProductsResponse, Error>({
    queryKey: ["productsByCategory", options, page],
    queryFn: () => fetchProductsByCategory(options, page, perPage),
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};

export const useDataFetching = (
  options: CatQueryOptionsType,
  page: number,
  perPage: number
) => {
  const { data } = useProductsByCategoryQuery(options, page, perPage);

  useEffect(() => {
    if (data) {
      eventEmitter.emit("updateProductCount", data.total);
    }
  }, [data]);
};
