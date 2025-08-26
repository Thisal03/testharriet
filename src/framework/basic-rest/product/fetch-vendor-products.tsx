import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product, VendorQueryOptionsType } from "@/framework/basic-rest/types";

const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;

const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const fetchProductsByVendor = async (option: VendorQueryOptionsType) => {
  try {
    const page = option.page || 1;
    const perPage = option.perPage || 100;

    const response = await WooCommerce.get(`wp-json/dokan/v1/stores/${option.slug}/products`, {
      params: {
        per_page: perPage,
        page,
      },
    });

    const data = response.data;
    const headers = response.headers;

    // Ensure every product has a stock_status field
    const mappedProducts = data.map((product: any) => {
      if (typeof product.in_stock !== "undefined") {
        product.stock_status = product.in_stock ? "instock" : "outofstock";
      } else if (typeof product.stock_quantity === "number") {
        product.stock_status = product.stock_quantity > 0 ? "instock" : "outofstock";
      } else {
        product.stock_status = "unknown";
      }
      return product;
    });

    let totalCount = data.length;
    const totalHeader = headers["x-wp-total"];

    if (totalHeader) {
      totalCount = parseInt(totalHeader, 10);
    } else if (data.length < perPage) {
      // Less than perPage means likely last page
      totalCount = (page - 1) * perPage + data.length;
    } else {
      // Fallback estimate
      totalCount = page * perPage + perPage;
    }

    return {
      products: mappedProducts,
      totalCount,
      currentPage: page,
      perPage,
      totalPages: Math.ceil(totalCount / perPage),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Vendor product fetch error:", error.message);
    }
    throw new Error("No products found in this store");
  }
};

// Hook to use products by vendor with pagination
export const useProductsByVendor = (option: VendorQueryOptionsType) => {
  return useQuery<{
    products: Product[];
    totalCount: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }, Error>({
    queryKey: ["productsByVendor", option],
    queryFn: () => fetchProductsByVendor(option),
    staleTime: 1000 * 60 * 5,
  });
};
