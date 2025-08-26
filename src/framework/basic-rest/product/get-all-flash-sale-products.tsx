import { QueryOptionsType } from "@/framework/basic-rest/types";
import http from "@/framework/basic-rest/utils/http";
import { API_ENDPOINTS } from "@/framework/basic-rest/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchFlashSaleProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS);
  return data;
};

const fetchAncientFlashSaleProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT);
  return data;
};

export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {
  // Always call hooks unconditionally at the top level
  const ancientQuery = useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT, options],
    queryFn: fetchAncientFlashSaleProducts,
    enabled: options.demoVariant === "ancient",
  });

  const defaultQuery = useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
    queryFn: fetchFlashSaleProducts,
    enabled: options.demoVariant !== "ancient",
  });

  // Return the appropriate query based on the condition
  return options.demoVariant === "ancient" ? ancientQuery : defaultQuery;
};
