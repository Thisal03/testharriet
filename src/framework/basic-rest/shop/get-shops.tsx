import { Shop } from "@/framework/basic-rest/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// export const fetchShops = async () => {
//   const { data } = await http.get(API_ENDPOINTS.SHOPS);
//   return { shop: { data } };
// };

const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;

const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const fetchShops = async (
  options: { id?: number },
  page: number = 1,
  perPage: number = 30
) => {
  try {
    let url = `wp-json/dokan/v1/stores?`;

    url += `enabled=true&featured=true`;

    // Add pagination parameters
    const finalPerPage = perPage;
    const finalPage = page;
    url += `per_page=${finalPerPage}&page=${finalPage}`;

    // Clean up any trailing & or ? if no parameters were added
    url = url.replace(/[&?]$/, "");

    const { data, headers } = await WooCommerce.get(url);
    return { shops: data, total: parseInt(headers["x-wp-total"] || "0") };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Response Error:", error);
    }
    throw new Error("Store details not found");
  }
};

export const useShopsQuery = (
  options: { id?: number },
  page: number = 1,
  perPage: number = 30
) => {
  return useQuery<{ shops: Shop[]; total: number }, Error>({
    queryKey: ["shops", options, { ...options, page, perPage }],
    queryFn: () => fetchShops(options, page, perPage),
  });
};
