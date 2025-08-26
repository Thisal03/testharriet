import { QueryOptionsType, Product } from "@/framework/basic-rest/types";
import {
  useInfiniteQuery,
  QueryKey,
  QueryFunctionContext,
} from "@tanstack/react-query";
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

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};

const fetchProducts = async ({ pageParam = 1 }: { pageParam?: number }) => {
  try {
    const { data } = await WooCommerce.get(
      `wp-json/wc/v3/products?per_page=50&page=${pageParam}&status=publish`
    );
    // Assuming the API returns a total count of products and the current page is less than 300
    const nextPageUrl =
      pageParam < 300
        ? `wp-json/wc/v3/products?per_page=50status=publish&page=${
            pageParam + 1
          }`
        : null;
    return {
      data: data,
      paginatorInfo: {
        nextPageUrl,
      },
    };
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>({
    queryKey: [options],
    queryFn: async ({
      pageParam = 1,
    }: QueryFunctionContext<QueryKey, unknown>) => {
      // You can use queryKey here if needed
      return fetchProducts({ pageParam: pageParam as number | undefined });
    },
    initialPageParam: 1, // Start from page 1
    getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
  });
};

export { useProductsQuery, fetchProducts };
