// fetchingstoredetails.tsx

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { VendorQueryOptionsType } from "../types";

const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL!;

const WooCommerce = axios.create({
  baseURL: WOOCOMMERCE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Function to fetch store details
export const fetchStoreDetails = async (storeId: string | number) => {
  try {
    const url = `wp-json/dokan/v1/stores/${storeId}`;
    const { data } = await WooCommerce.get(url);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Response Error:", error);
    }
    throw new Error("Store details not found");
  }
};

// Hook to use store details
export const useStoreDetails = (storeId: string | number) => {
  return useQuery<VendorQueryOptionsType, Error>({
    queryKey: ["storeDetails", storeId],
    queryFn: () => fetchStoreDetails(storeId),
    staleTime: 1000 * 60 * 5,
  });
};
