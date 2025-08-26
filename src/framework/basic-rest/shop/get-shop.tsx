import { Shop } from "@/framework/basic-rest/types";
import http from "@/framework/basic-rest/utils/http";
import { API_ENDPOINTS } from "@/framework/basic-rest/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchShop = async (_slug: string) => {
  const { data } = await http.get(`${API_ENDPOINTS.SHOP}`);
  return data;
};
export const useShopQuery = (slug: string) => {
  return useQuery<Shop, Error>({
    queryKey: [API_ENDPOINTS.SHOP, slug],
    queryFn: () => fetchShop(slug),
  });
};
