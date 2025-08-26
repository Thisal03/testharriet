import { useQuery } from "@tanstack/react-query";

const fetchProductFile = async (productId: number | string) => {
  const response = await fetch(
    `https://harrietshopping.com/wp-json/acf/v1/products/${productId}`
  );
  return response.json();
};

export const useSizeChartQuery = (productId: number | string) => {
  return useQuery({
    queryKey: ["sizeChart", productId],
    queryFn: () => fetchProductFile(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 60,
  });
};
