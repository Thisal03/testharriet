import { QueryOptionsType, Order } from "@/framework/basic-rest/types";
import http from "@/framework/basic-rest/utils/http";
import { API_ENDPOINTS } from "@/framework/basic-rest/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchOrders = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.ORDERS);
  return { orders: { data: data.data as Order[] } };
};
export const useOrdersQuery = (options: QueryOptionsType) => {
  return useQuery<{ orders: { data: Order[] } }, Error>({
    queryKey: [API_ENDPOINTS.ORDERS, options],
    queryFn: fetchOrders,
  });
};
