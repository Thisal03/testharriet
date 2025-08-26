import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { eventEmitter } from "@/lib/utils/event-emitter";
import {
  Product,
  CatQueryOptionsType,
  CatQueryStatusOptionsType,
  FilterCategory,
} from "../types";

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

export interface FetchProductsResponse {
  products: Product[];
  categories: FilterCategory[];
  total: number;
}

export const fetchProductsByCategory = async (
  options: CatQueryOptionsType & Partial<CatQueryStatusOptionsType>,
  page: number = 1,
  perPage: number = 30
): Promise<FetchProductsResponse> => {
  try {
    // Build the base URL
    let url = `wp-json/wc/v3/products/by-category/${options.slug}?`;

    // Add stock status if provided
    if ("stock_status" in options && options.stock_status) {
      url += `stock_status=${options.stock_status}&`;
    }

    // Add price filters if provided
    if (options.minPrice !== undefined) {
      url += `minPrice=${options.minPrice}&`;
    }
    if (options.maxPrice !== undefined) {
      url += `maxPrice=${options.maxPrice}&`;
    }

    // Add sorting if provided
    if (options.sortOption) {
      url += `orderby=${
        options.sortOption === "low-high"
          ? "price&order=asc"
          : options.sortOption === "high-low"
          ? "price&order=desc"
          : "date&order=desc"
      }&`;
    }

    // Add pagination parameters
    const finalPerPage = options.perPage || perPage;
    const finalPage = options.page || page;
    url += `per_page=${finalPerPage}&page=${finalPage}`;

    // Clean up any trailing & or ? if no parameters were added
    url = url.replace(/[&?]$/, "");

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
    const categories: FilterCategory[] = Array.from(categoriesSet).map(
      (category) => JSON.parse(category)
    );

    return { products, categories, total };
  } catch (error) {
    throw new Error("No products found in this category");
  }
};

export const useProductsByCategory = (
  options: CatQueryOptionsType & Partial<CatQueryStatusOptionsType>,
  page: number = 1,
  perPage: number = 30
) => {
  return useQuery<FetchProductsResponse, Error>({
    queryKey: [
      "products",
      "by-category",
      options.slug,
      { ...options, page, perPage },
    ],
    queryFn: async () => fetchProductsByCategory(options, page, perPage),
  });
};

// Example usages:

// // With price filters
// useProductsByCategory({ slug: 'clothing', minPrice: 10, maxPrice: 100 });

// // With stock status
// useProductsByCategory({ slug: 'electronics', stock_status: 'instock' });

// // With sorting
// useProductsByCategory({ slug: 'books', sortOption: 'high-low' });

// // With pagination
// useProductsByCategory({ slug: 'furniture' }, 2, 20);
