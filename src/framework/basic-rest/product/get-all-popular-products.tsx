import { QueryOptionsType, Product } from "@/framework/basic-rest/types";
import http from "@/framework/basic-rest/utils/http";
import { API_ENDPOINTS } from "@/framework/basic-rest/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchNewArrivalProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.POPULAR_PRODUCTS);
  return data as Product[];
};

export const usePopularProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.POPULAR_PRODUCTS, options],
    queryFn: fetchNewArrivalProducts,
  });
};
