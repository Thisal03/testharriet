import { Product } from "@/framework/basic-rest/types";
import { useInfiniteQuery } from "@tanstack/react-query";
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

type PaginatedSaleProduct = {
  products: Product[];
  paginatorInfo: {
    currentPage: number;
    totalPages: number;
  };
  total: number;
};

const onsellingfetchProducts = async (
  page: number = 1,
  perPage: number = 50,
  options?: { sortOption?: string }
): Promise<PaginatedSaleProduct> => {
  try {
    let url = `wp-json/wc/v3/products?on_sale=true&page=${page}&per_page=${perPage}`;

    if (options?.sortOption) {
      url += `&orderby=${
        options.sortOption === "low-high"
          ? "price&order=asc"
          : options.sortOption === "high-low"
          ? "price&order=desc"
          : "date&order=desc"
      }`;
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

const useOnSellingProductsQuery = (options: {
  limit: number;
  minPrice: number | undefined;
  maxPrice: number | undefined;
  sortOption: string;
}) => {
  return useInfiniteQuery<PaginatedSaleProduct, Error>({
    queryKey: ["onSellingProducts", options],
    queryFn: async ({ pageParam = 1 }) =>
      onsellingfetchProducts(pageParam as number, options.limit, options),
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

export { useOnSellingProductsQuery, onsellingfetchProducts };
