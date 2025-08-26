import { QueryOptionsType, Brand } from "@/framework/basic-rest/types";
import http from "@/framework/basic-rest/utils/http";
import { API_ENDPOINTS } from "@/framework/basic-rest/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchBrands = async () => {
  const { data } = await http.get(API_ENDPOINTS.BRANDS);
  return data;
};
const fetchAncientBrands = async () => {
  const { data } = await http.get(API_ENDPOINTS.BRANDS_ANCIENT);
  return data;
};

export const useBrandsQuery = (options: QueryOptionsType) => {
  const isAncient = options.demoVariant === "ancient";

  return useQuery<
    { brands: Brand[]; brandsGrid: Brand[]; brandsTimer: Brand[] },
    Error
  >({
    queryKey: [
      isAncient ? API_ENDPOINTS.BRANDS_ANCIENT : API_ENDPOINTS.BRANDS,
      options,
    ],
    queryFn: isAncient ? fetchAncientBrands : fetchBrands,
    enabled: typeof options.demoVariant !== "undefined",
  });
};
