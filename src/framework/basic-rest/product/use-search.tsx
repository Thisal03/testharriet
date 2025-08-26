import { Product } from "@/framework/basic-rest/types";
import { eventEmitter } from "@/lib/utils/event-emitter";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { PaginatedSaleProduct } from "./get-all-deals-on-sale";

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

const fetchSearchedProducts = async (
  searchText: string,
  page: number = 1,
  perPage: number = 50,
  options?: {
    searchText: string;
    sortOption?: string;
    minPrice?: number;
    maxPrice?: number;
  }
): Promise<PaginatedSaleProduct> => {
  try {
    let url = `wp-json/wc/v3/products?search=${encodeURIComponent(
      searchText
    )}&status=publish&page=${page}&per_page=${perPage}`;

    if (options?.sortOption) {
      url += `&orderby=${
        options.sortOption === "low-high"
          ? "price&order=asc"
          : options.sortOption === "high-low"
          ? "price&order=desc"
          : "date&order=desc"
      }`;
    }

    if (options?.minPrice !== undefined) {
      url += `&min_price=${options.minPrice}`;
    }

    if (options?.maxPrice !== undefined) {
      url += `&max_price=${options.maxPrice}`;
    }

    const { data, headers } = await WooCommerce.get(url);

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

    return {
      products: productsWithVariations,
      paginatorInfo: {
        currentPage: page,
        totalPages: parseInt(headers["x-wp-totalpages"], 10),
      },
      total: parseInt(headers["x-wp-total"], 10),
    };
  } catch (error) {
    console.error("Error fetching products on sale:", error);
    throw new Error("Error fetching products on sale");
  }
};

const useSearchQuery = (options: {
  searchText: string;
  limit: number;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  sortOption: string;
}) => {
  return useInfiniteQuery<PaginatedSaleProduct, Error>({
    queryKey: ["searched-products", options],
    queryFn: async ({ pageParam = 1 }) =>
      fetchSearchedProducts(
        options.searchText,
        pageParam as number,
        options.limit,
        options
      ),
    getNextPageParam: (lastPage) => {
      if (
        lastPage.paginatorInfo.currentPage < lastPage.paginatorInfo.totalPages
      ) {
        return lastPage.paginatorInfo.currentPage + 1;
      } else {
        return undefined;
      }
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });
};

export const useDataFetching = (options: any) => {
  const { data } = useSearchQuery(options);

  useEffect(() => {
    if (data) {
      eventEmitter.emit("updateProductCount", data.pages[0].total);
    }
  }, [data]);
};

export { useSearchQuery, fetchSearchedProducts };
